import { assign } from '@xstate/immer'
import { toast } from 'react-toastify'
import { actions, createMachine, Sender, sendTo, spawn } from 'xstate'

import { SORTING_OPTIONS, WEAPON_TYPE_OPTIONS } from '@/constants/inventory'
import { translate } from '@/i18n'
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
import { ItemService, UserInventoryData, WeaponTypeOption } from '@/types/inventory'

const { pure } = actions

export type InventoryContext = {
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

export type InventoryMachineServices = {
  getUserItems: {
    data: MyWinnerListResponse
  }
  getMarketItemsData: {
    data: ItemMarketDataResponse[]
  }
  getMarketItemsDataInterval: {
    data: ItemMarketDataResponse[]
  }
  getUserEqValue: {
    data: EqValueResponse
  }
  getUserInventoryData: {
    data: UserInventoryData
  }
  sellEq: {
    data: SellEqResponse
  }
}

export type InventoryMachineEvent =
  | { type: 'TOGGLE_STATE_FILTER' }
  | { type: 'SET_ACTIVE_STATE_FILTER' }
  | { type: 'SET_ALL_STATE_FILTER' }
  | { type: 'SET_WEAPON_TYPE_FILTER'; payload: string }
  | { type: 'SET_CATEGORY_FILTERS'; payload: Array<string | CATEGORY_FILTER> }
  | { type: 'RESET_FILTERS' }
  | { type: 'LOAD_MORE' }
  | { type: 'RETRY' }
  | { type: 'SELL_EQ' }
  | { type: 'REFRESH_EQ' }
  | { type: 'SET_SORTING_VARIANT'; payload: SORTING_VARIANT }
  | { type: 'UPDATE_BALANCE' }
  | { type: 'REFRESH_MARKET_DATA'; data: ItemMarketDataResponse[] }
  | { type: 'HARD_INVENTORY_REFRESH' }

const getUserItems = async (ctx: InventoryContext): Promise<MyWinnerListResponse> => {
  return await InventoryClient.getUserItems({
    type: ctx.filters.category.length === 1 ? String(ctx.filters.category) : CATEGORY_FILTER.ALL,
    sort: ctx.sortingVariant,
    weaponType: ctx.filters.weaponType,
    state: ctx.filters.state,
    per_page: String(ctx.filters.perPage),
    current_page: String(ctx.filters.currentPage),
  })
}

const getMarketItemsData = async (): Promise<ItemMarketDataResponse[]> => {
  return await InventoryClient.getUserItemsMarketData()
}

const getMarketItemsDataInterval = () => (callback: Sender<InventoryMachineEvent>) => {
  const id = setInterval(() => {
    getMarketItemsData()
      .then((data) => {
        callback({ type: 'REFRESH_MARKET_DATA', data })
      })
      .catch(console.error)
  }, 10000)

  return () => clearInterval(id)
}

const getUserEqValue = async (): Promise<EqValueResponse> => {
  return await InventoryClient.getUserItemsEqValue()
}

const getUserInventoryData = async (ctx: InventoryContext): Promise<UserInventoryData> => {
  const [dataRes, marketDataRes, eqValue] = await Promise.all([
    getUserItems(ctx),
    getMarketItemsData(),
    getUserEqValue(),
  ])
  return {
    dataRes,
    marketDataRes,
    eqValue,
  }
}

const sellEq = async (): Promise<SellEqResponse> => {
  const res = await InventoryClient.sellEq()
  if (!res.status) return Promise.reject(res)
  return res
}

const FILTER_EVENTS = {
  TOGGLE_STATE_FILTER: {
    actions: ['resetPagination', 'toggleStateFilter'],
    target: 'loadingInitialData',
  },
  SET_ACTIVE_STATE_FILTER: {
    actions: ['resetPagination', 'setActiveStateFilter'],
    target: 'loadingInitialData',
  },
  SET_ALL_STATE_FILTER: {
    actions: ['resetPagination', 'setAllStateFilter'],
    target: 'loadingInitialData',
  },
  SET_WEAPON_TYPE_FILTER: {
    actions: ['resetPagination', 'setWeaponTypeFilter'],
    target: 'loadingInitialData',
  },
  SET_CATEGORY_FILTERS: {
    actions: ['resetPagination', 'setCategoryFilter'],
    target: 'loadingInitialData',
  },
  SET_SORTING_VARIANT: {
    actions: ['resetPagination', 'setSortingVariant'],
    target: 'loadingInitialData',
  },
  RESET_FILTERS: {
    actions: ['resetPagination', 'setResetFilters'],
    target: 'loadingInitialData',
  },
}

const INIT_INVENTORY_CONTEXT: InventoryContext = {
  filters: {
    state: STATE_FILTER.ACTIVE,
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

export const InventoryMachine = createMachine(
  {
    id: 'InventoryMachine',
    predictableActionArguments: true,
    tsTypes: {} as import('./Inventory.machine.typegen').Typegen0,
    schema: {
      context: {} as InventoryContext,
      events: {} as InventoryMachineEvent,
      services: {} as InventoryMachineServices,
    },
    context: INIT_INVENTORY_CONTEXT,
    invoke: {
      src: 'getMarketItemsDataInterval',
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
      HARD_INVENTORY_REFRESH: {
        actions: ['assignHardRefresh'],
        target: 'loadingInitialData',
      },
    },
    initial: 'initialising',
    states: {
      initialising: {
        always: 'loadingInitialData',
      },
      idle: {
        on: {
          LOAD_MORE: 'loadingNextData',
          SELL_EQ: 'sellingEq',
          REFRESH_EQ: 'refreshingEq',
          ...FILTER_EVENTS,
        },
      },
      refreshingEq: {
        invoke: {
          src: 'getUserEqValue',
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
        on: FILTER_EVENTS,
      },
      loadedAllItems: {
        on: {
          SELL_EQ: 'sellingEq',
          REFRESH_EQ: 'refreshingEq',
          ...FILTER_EVENTS,
        },
      },
      loadingInitialData: {
        entry: ['resetPagination'],
        on: {
          SET_WEAPON_TYPE_FILTER: {
            actions: ['setWeaponTypeFilter'],
          },
        },
        invoke: {
          src: 'getUserInventoryData',
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
          RETRY: 'loadingInitialData',
          ...FILTER_EVENTS,
        },
      },
      loadingNextData: {
        entry: ['assignNextPage'],
        invoke: {
          src: 'getUserInventoryData',
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
        on: {
          RETRY: 'loadingNextData',
          ...FILTER_EVENTS,
        },
      },
    },
  },
  {
    guards: {
      hasData: (_, { data: { dataRes } }) => {
        return dataRes.total > 0
      },
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
      sendMarketDataToRelevantItems: pure((ctx, { data: marketData }) => {
        marketData.forEach((itemMarketData) => {
          const itemService = ctx.data.find(({ data }) => data.id === itemMarketData.ID_loser)

          if (!itemService) {
            return undefined
          }

          sendTo(itemService.ref, {
            type: 'REFRESH_MARKET_STATUS',
            data: itemMarketData,
          })
        })

        return undefined
      }),
      assignLoadingInitialDataError: assign(() => {
        // TODO: action
      }),
      assignNextPage: assign((ctx) => {
        ctx.filters.currentPage += 1
      }),
      notifyError: (_, _e) => {
        const e = _e as { type: (typeof _e)['type']; data: { Info?: string; info?: string } }
        toast.error(e?.data?.Info || e?.data?.info || translate('main:common.error.common'))
      },
      notifySoldEq: (_, _e) => {
        const e = _e as { type: (typeof _e)['type']; data: { Info?: string; info?: string } }
        toast.error(e?.data?.Info || e?.data?.info || translate('main:common.error.common'))
      },
      updateBalance: () => {
        window?.__refetchBalance?.()
      },
      assignHardRefresh: assign((ctx) => {
        ctx.filters = INIT_INVENTORY_CONTEXT.filters
        ctx.weaponTypeOptions = INIT_INVENTORY_CONTEXT.weaponTypeOptions
        ctx.sortingVariant = INIT_INVENTORY_CONTEXT.sortingVariant
        ctx.sortingOptions = INIT_INVENTORY_CONTEXT.sortingOptions
        ctx.eqValue = INIT_INVENTORY_CONTEXT.eqValue
        ctx.data = INIT_INVENTORY_CONTEXT.data
        ctx.marketData = INIT_INVENTORY_CONTEXT.marketData
        ctx.dataResponse = INIT_INVENTORY_CONTEXT.dataResponse
      }),
    },
    services: {
      getMarketItemsDataInterval,
      getUserInventoryData,
      getUserEqValue,
      sellEq,
    },
  },
)
