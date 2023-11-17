import { assign } from '@xstate/immer'
import { actions, createMachine, Sender, sendTo, spawn } from 'xstate'

import { SORTING_OPTIONS, WEAPON_TYPE_OPTIONS } from '@/constants/inventory'
import ItemMachine from '@/machines/InventoryItemMachine/InventoryItem.machine'
import InventoryClient from '@/services/http/InventoryClient'
import {
  CATEGORY_FILTER,
  EqValueResponse,
  Item,
  ItemMarketDataResponse,
  MyWinnerListResponse,
  SellEqResponse,
  SORTING_VARIANT,
  STATE_FILTER,
} from '@/types/API/http/inventory'
import { INVENTORY_EVENT, ItemService, WeaponTypeOption } from '@/types/inventory'

const { pure } = actions

type InventoryContext = {
  filters: {
    state: STATE_FILTER
    weaponType: string
    category: string[]
    perPage: number
    currentPage: number
  }
  weaponTypeOptions: WeaponTypeOption[]
  sortingVariant: SORTING_VARIANT
  sortingOptions: SORTING_VARIANT[]
  eqValue: EqValueResponse
  data: {
    data: Item
    ref: ItemService
  }[]
  marketData: ItemMarketDataResponse[]
  dataResponse: MyWinnerListResponse
}

const loadItemData = async (ctx: InventoryContext): Promise<MyWinnerListResponse> => {
  return await InventoryClient.getUserItems({
    type: ctx.filters.category.length === 1 ? String(ctx.filters.category) : CATEGORY_FILTER.ALL,
    sort: ctx.sortingVariant,
    weaponType: ctx.filters.weaponType,
    state: ctx.filters.state,
    per_page: String(ctx.filters.perPage),
    current_page: String(ctx.filters.currentPage),
  })
}

const loadMarketData = async (): Promise<ItemMarketDataResponse[]> => {
  return await InventoryClient.getUserItemsMarketData()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loadMarketDataInterval = () => (callback: Sender<any>) => {
  const id = setInterval(
    () =>
      loadMarketData()
        .then((data) => {
          callback({ type: 'REFRESH_MARKET_DATA', data })
        })
        .catch(console.error),
    10000,
  )

  return () => clearInterval(id)
}

const loadEqValue = async (): Promise<EqValueResponse> => {
  return await InventoryClient.getUserItemsEqValue()
}

const loadData = async (
  ctx: InventoryContext,
): Promise<{
  dataRes: MyWinnerListResponse
  marketDataRes: ItemMarketDataResponse[]
  eqValue: EqValueResponse
}> => {
  const [dataRes, marketDataRes, eqValue] = await Promise.all([
    loadItemData(ctx),
    loadMarketData(),
    loadEqValue(),
  ])
  return {
    dataRes,
    marketDataRes,
    eqValue,
  }
}

export const sellEq = async (): Promise<SellEqResponse> => {
  const res = await InventoryClient.sellEq()
  if (!res.status) return Promise.reject(res)
  return res
}

const filterEvents = {
  [INVENTORY_EVENT.toggleStateFilter]: {
    actions: ['resetPagination', 'toggleStateFilter', 'saveDataToLocalStorage'],
    target: 'loadingInitialData',
  },
  [INVENTORY_EVENT.setActiveStateFilter]: {
    actions: ['resetPagination', 'setActiveStateFilter', 'saveDataToLocalStorage'],
    target: 'loadingInitialData',
  },
  [INVENTORY_EVENT.setAllStateFilter]: {
    actions: ['resetPagination', 'setAllStateFilter', 'saveDataToLocalStorage'],
    target: 'loadingInitialData',
  },
  [INVENTORY_EVENT.setWeaponTypeFilter]: {
    actions: ['resetPagination', 'setWeaponTypeFilter'],
    target: 'loadingInitialData',
  },
  [INVENTORY_EVENT.setCategoryFilter]: {
    actions: ['resetPagination', 'setCategoryFilter'],
    target: 'loadingInitialData',
  },
  [INVENTORY_EVENT.setSortingVariant]: {
    actions: ['resetPagination', 'setSortingVariant'],
    target: 'loadingInitialData',
  },
  [INVENTORY_EVENT.resetFilters]: {
    actions: ['resetPagination', 'setResetFilters'],
    target: 'loadingInitialData',
  },
}

const INIT_INVENTORY_CONTEXT: InventoryContext = {
  filters: {
    state: STATE_FILTER.ALL,
    weaponType: '',
    category: [],
    perPage: 18,
    currentPage: 1,
  },
  weaponTypeOptions: WEAPON_TYPE_OPTIONS,
  sortingVariant: SORTING_VARIANT.NEWEST,
  sortingOptions: SORTING_OPTIONS,
  eqValue: {
    currency: '',
    fullPrice: '',
  },
  data: [],
  marketData: [],
  dataResponse: {
    status: true,
    message: '',
    total: 0,
    perPage: 0,
    currentPage: 1,
    state: STATE_FILTER.ALL,
    type: CATEGORY_FILTER.ALL,
    data: [],
  },
}

const InventoryMachine = createMachine(
  {
    id: 'InventoryMachine',
    initial: 'initialising',
    schema: {
      context: {} as InventoryContext,
    },
    context: INIT_INVENTORY_CONTEXT,
    invoke: {
      src: 'loadMarketDataInterval',
    },
    on: {
      UPDATE_BALANCE: {
        actions: ['updateBalance'],
        internal: true,
      },
      REFRESH_MARKET_DATA: {
        actions: ['sendMarketDataToRelevantItems', 'updateBalance'],
        internal: true,
      },
    },
    states: {
      initialising: {
        entry: 'getDataFromLocalStorage',
        always: 'loadingInitialData',
      },
      idle: {
        on: {
          [INVENTORY_EVENT.loadMore]: 'loadingNextData',
          [INVENTORY_EVENT.sellEq]: 'sellingEq',
          [INVENTORY_EVENT.refreshEq]: 'refreshingEq',
          ...filterEvents,
        },
      },
      refreshingEq: {
        invoke: {
          src: 'loadEqValue',
          onDone: {
            actions: ['assignEqValue'],
            target: 'routingToProperIdleLikeState',
          },
        },
      },
      routingToProperIdleLikeState: {
        always: [{ cond: 'isLoadedLastPage', target: 'loadedAllItems' }, { target: 'idle' }],
      },
      sellingEq: {
        invoke: {
          src: 'sellEq',
          onDone: {
            actions: ['notifySoldEq', 'updateBalance'],
            target: 'loadingInitialData',
          },
          onError: {
            actions: ['notifyError'],
            target: 'routingToProperIdleLikeState',
          },
        },
      },
      noData: {
        on: {
          ...filterEvents,
        },
      },
      loadedAllItems: {
        on: {
          [INVENTORY_EVENT.sellEq]: 'sellingEq',
          [INVENTORY_EVENT.refreshEq]: 'refreshingEq',
          ...filterEvents,
        },
      },
      loadingInitialData: {
        entry: ['resetPagination'],
        on: {
          [INVENTORY_EVENT.setWeaponTypeFilter]: {
            actions: ['setWeaponTypeFilter'],
          },
        },
        invoke: {
          src: 'loadData',
          onDone: [
            {
              cond: 'hasLoadedLastPage',
              target: 'loadedAllItems',
              actions: ['assignInitialData'],
            },
            { cond: 'hasData', target: 'idle', actions: ['assignInitialData'] },
            { target: 'noData' },
          ],
          onError: {
            target: 'failedLoadingInitialData',
            actions: ['assignLoadingInitialDataError'],
          },
        },
      },
      failedLoadingInitialData: {
        on: {
          [INVENTORY_EVENT.retry]: 'loadingInitialData',
          ...filterEvents,
        },
      },
      loadingNextData: {
        entry: ['assignNextPage'],
        invoke: {
          src: 'loadData',
          onDone: [
            {
              cond: 'hasLoadedLastPage',
              target: 'loadedAllItems',
              actions: ['assignNextData'],
            },
            {
              target: 'idle',
              actions: ['assignNextData'],
            },
          ],
          onError: 'failedLoadingNextData',
        },
      },
      failedLoadingNextData: {
        // entry: 'showFooter',
        on: {
          [INVENTORY_EVENT.retry]: 'loadingNextData',
          ...filterEvents,
        },
      },
    },
  },
  {
    guards: {
      hasData: (_, { data: { dataRes } }) => dataRes.total > 0,
      hasLoadedLastPage: (_, { data: { dataRes } }) =>
        dataRes.currentPage === Math.ceil(dataRes.total / dataRes.perPage),
      isLoadedLastPage: ({ dataResponse: r }) => r.currentPage === Math.ceil(r.total / r.perPage),
    },
    actions: {
      resetPagination: assign((ctx) => {
        ctx.filters.currentPage = 1
      }),
      toggleStateFilter: assign((ctx) => {
        ctx.filters.state =
          ctx.filters.state === STATE_FILTER.ALL ? STATE_FILTER.ACTIVE : STATE_FILTER.ALL
      }),
      setActiveStateFilter: assign((ctx) => {
        ctx.filters.state = STATE_FILTER.ACTIVE
      }),
      setAllStateFilter: assign((ctx) => {
        ctx.filters.state = STATE_FILTER.ALL
      }),
      setWeaponTypeFilter: assign((ctx, e) => {
        ctx.filters.weaponType = e.payload
      }),
      setCategoryFilter: assign((ctx, e) => {
        ctx.filters.category = e.payload
      }),
      setSortingVariant: assign((ctx, e) => {
        ctx.sortingVariant = e.payload
      }),
      setResetFilters: assign((ctx) => {
        ctx.filters = {
          state: STATE_FILTER.ALL,
          weaponType: '',
          category: [],
          perPage: 18,
          currentPage: 1,
        }
      }),
      getDataFromLocalStorage: assign((ctx) => {
        ctx.filters.state = window.localStorage.inventoryStateFilter || STATE_FILTER.ALL
      }),
      assignEqValue: assign((ctx, { data }) => {
        ctx.eqValue = data
      }),
      assignInitialData: assign((ctx, { data }) => {
        const response: {
          dataRes: MyWinnerListResponse
          marketDataRes: ItemMarketDataResponse[]
          eqValue: EqValueResponse
        } = data

        const newData = response.dataRes.data.map((item: Item) => ({
          data: item,
          ref: spawn(
            ItemMachine.withContext({
              isPublic: false,
              data: item,
              marketData: (response.marketDataRes as ItemMarketDataResponse[]).find(
                ({ ID_loser }) => ID_loser == item.id,
              ),
            }),
          ),
        }))

        ctx.eqValue = response.eqValue
        ctx.dataResponse = response.dataRes
        ctx.data = newData
        ctx.marketData = response.marketDataRes
      }),
      assignNextData: assign((ctx, { data: response }) => {
        const newData = response.dataRes.data.map((item: Item) => ({
          data: item,
          ref: spawn(
            ItemMachine.withContext({
              isPublic: false,
              data: item,
              marketData: (response.marketDataRes as ItemMarketDataResponse[]).find(
                ({ ID_loser }) => ID_loser == item.id,
              ),
            }),
          ),
        }))

        ctx.dataResponse = response.dataRes
        ctx.data = [...ctx.data, ...newData]
        ctx.marketData = response.marketDataRes
      }),
      sendMarketDataToRelevantItems: pure<
        InventoryContext,
        { type: 'REFRESH_MARKET_DATA'; data: ItemMarketDataResponse[] }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      >((ctx, { data: marketData }) => {
        return marketData
          .map((itemMarketData) => {
            const itemService = ctx.data.find(({ data }) => data.id === itemMarketData.ID_loser)

            if (!itemService) return

            return sendTo(itemService.ref, { type: 'REFRESH_MARKET_STATUS', data: itemMarketData })
          })
          .filter(Boolean)
      }),
      assignLoadingInitialDataError: assign((ctx, { data: response }) => {
        ctx.dataResponse = response
      }),
      assignNextPage: assign((ctx) => {
        ctx.filters.currentPage += 1
      }),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      notifyError: (_, _e) => {
        // TODO: WINDOW FUNC
        console.log(`
        const e = _e as { type: (typeof _e)['type']; data: { Info?: string; info?: string } }

        window.__layout.toast({
          type: 'error',
          title: 'Error',
          message: e?.data?.Info || e?.data?.info || i18n.t('profile:error.generic'),
        })`)
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      notifySoldEq: (_, e) => {
        // TODO: WINDOW FUNC
        console.log(`window.__layout.toast({
          type: 'success',
          title: 'Sold',
          message: e?.data?.info,
        })`)
      },
      saveDataToLocalStorage: (ctx) => {
        window.localStorage.inventoryStateFilter = ctx.filters.state
      },
      updateBalance: () => {
        window.__refetchBalance?.()
      },
    },
    services: {
      loadMarketDataInterval,
      loadData,
      loadEqValue,
      sellEq,
    },
  },
)

export default InventoryMachine
