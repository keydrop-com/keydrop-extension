import { assign } from '@xstate/immer'
import { toast } from 'react-toastify'
import { createMachine, raise, sendParent } from 'xstate'
import { choose } from 'xstate/lib/actions'

import { Button } from '@/components/Button'
import { KEYDROP_URLS } from '@/constants/urls'
import { translate } from '@/i18n'
import CommonClient from '@/services/browser/CommonClient'
import InventoryClient from '@/services/http/InventoryClient'
import {
  CollectGameResponse,
  CollectSkinResponse,
  Item,
  ITEM_MARKET_STATUS,
  ITEM_SOURCE_TYPE,
  ITEM_STATUS,
  ItemMarketDataResponse,
  SellGameResponse,
  SellItemResponse,
} from '@/types/API/http/inventory'

export type ItemContext = {
  isPublic: boolean
  data: Item
  marketData?: ItemMarketDataResponse
}

export type ItemEvent =
  | { type: 'UPGRADE' }
  | { type: 'SELL' }
  | { type: 'COLLECT' }
  | { type: 'EXCHANGE' }
  | { type: 'SHOW_ACTIVATION_GUIDE' }
  | { type: 'REFRESH_MARKET_STATUS'; data: ItemMarketDataResponse }
  | { type: 'INIT_MARKET_STATUS' }
  | { type: 'YES' }
  | { type: 'NO' }
  | { type: 'SET_SOLD' }

type ItemServices = {
  collectGame: {
    data: CollectGameResponse
  }
  sellSkin: {
    data: SellItemResponse
  }
  collectSkin: {
    data: CollectSkinResponse
  }
  sellGame: {
    data: SellGameResponse
  }
}

const ItemMachine = createMachine(
  {
    id: 'ItemMachine',
    initial: 'determiningState',
    tsTypes: {} as import('./InventoryItem.machine.typegen').Typegen0,
    schema: {
      context: {} as ItemContext,
      events: {} as ItemEvent,
      services: {} as ItemServices,
    },
    context: {
      isPublic: true,
      data: {} as Item,
      marketData: {} as ItemMarketDataResponse,
    },
    states: {
      determiningState: {
        always: [{ cond: 'isPublic', target: 'public' }, { target: 'private' }],
      },
      public: {
        initial: 'determiningState',
        states: {
          determiningState: {
            always: [
              { cond: 'isSkin', target: 'skin' },
              { cond: 'isGame', target: 'game' },
            ],
          },
          skin: {
            initial: 'determiningState',
            states: {
              determiningState: {
                always: [
                  { cond: 'isStatusNew', target: 'new' },
                  { cond: 'isStatusSold', target: 'sold' },
                  { cond: 'isStatusCollected', target: 'collected' },
                  { cond: 'isStatusForExchange', target: 'forExchange' },
                  {
                    cond: 'isStatusExchangedOrBlockedOrUpgraded',
                    target: 'exchangedOrBlocked',
                  },
                  { cond: 'isStatusPending', target: 'pending' },
                  { cond: 'isStatusExchanged', target: 'exchanged' },
                ],
              },
              new: { type: 'final' },
              sold: { type: 'final' },
              collected: { type: 'final' },
              forExchange: { type: 'final' },
              exchangedOrBlocked: { type: 'final' },
              pending: { type: 'final' },
              exchanged: { type: 'final' },
            },
          },
          game: {
            initial: 'determiningState',
            states: {
              determiningState: {
                always: [
                  { cond: 'isStatusNew', target: 'new' },
                  { cond: 'isStatusCollected', target: 'collected' },
                  { cond: 'isStatusSold', target: 'sold' },
                ],
              },
              new: { type: 'final' },
              collected: { type: 'final' },
              sold: { type: 'final' },
            },
          },
        },
      },
      private: {
        initial: 'determiningState',
        states: {
          determiningState: {
            always: [
              { cond: 'isSkin', target: 'skin' },
              { cond: 'isGame', target: 'game' },
            ],
          },
          skin: {
            type: 'parallel',
            states: {
              status: {
                initial: 'determiningState',
                states: {
                  determiningState: {
                    always: [
                      {
                        cond: 'isFromSkinChanger',
                        target: 'newFromSkinChanger',
                      },
                      { cond: 'isStatusNew', target: 'new' },
                      { cond: 'isStatusSold', target: 'sold' },
                      { cond: 'isStatusCollected', target: 'collected' },
                      {
                        cond: 'isStatusForExchangeFromSkinChanger',
                        target: 'forExchangeFromSkinChanger',
                      },
                      { cond: 'isStatusForExchange', target: 'forExchange' },
                      {
                        cond: 'isStatusExchangedOrBlockedOrUpgraded',
                        target: 'exchangedOrBlocked',
                      },
                      { cond: 'isStatusPending', target: 'pending' },
                      { cond: 'isStatusExchanged', target: 'exchanged' },
                    ],
                  },
                  new: {
                    on: {
                      UPGRADE: 'new',
                      SELL: 'selling',
                      COLLECT: 'collecting',
                    },
                  },
                  newFromSkinChanger: {
                    on: {
                      COLLECT: 'collecting',
                    },
                  },
                  selling: {
                    invoke: {
                      src: 'sellSkin',
                      onDone: {
                        actions: ['refreshEq', 'updateBalance', 'updateQuickSellInventory'],
                        target: 'sold',
                      },
                      onError: {
                        actions: ['notifyError'],
                        target: 'new',
                      },
                    },
                  },
                  sold: {
                    type: 'final',
                  },
                  collecting: {
                    invoke: {
                      src: 'collectSkin',
                      onDone: {
                        actions: [
                          'initMarketStatus',
                          'updateQuickSellInventory',
                          () => window?.__refetchBalance?.(),
                        ],
                        target: 'pending',
                      },
                      onError: {
                        actions: choose([
                          { cond: 'requiresKyc', actions: ['showKYCModal'] },
                          { actions: ['notifyError'] },
                        ]),
                        target: 'new',
                      },
                    },
                  },
                  collected: {
                    type: 'final',
                  },
                  forExchange: {
                    on: {
                      UPGRADE: 'forExchange',
                      SELL: 'selling',
                      EXCHANGE: 'exchanging',
                      COLLECT: 'collecting',
                    },
                  },
                  forExchangeFromSkinChanger: {
                    on: {
                      EXCHANGE: 'exchanging',
                      COLLECT: 'collecting',
                    },
                  },
                  exchanging: {
                    entry: ['exchange'],
                    type: 'final', // because it's happening in jQuery land
                  },
                  exchangedOrBlocked: {
                    type: 'final',
                  },
                  pending: {
                    on: {
                      REFRESH_MARKET_STATUS: [
                        { cond: 'isMarketStatusNew' },
                        { cond: 'isMarketStatusProposed' },
                        {
                          cond: 'isMarketStatusAccepted',
                          actions: ['refreshEq', 'updateBalance'],
                          target: 'collected',
                        },
                        {
                          cond: 'isMarketStatusErrorAndCanExchange',
                          actions: ['exchange', 'notifyError'],
                          target: 'forExchange',
                        },
                        {
                          cond: 'isMarketStatusError',
                          actions: ['notifyError'],
                          target: 'determiningState',
                        },
                        {
                          cond: 'isMarketStatusCancelled',
                          target: 'determiningState',
                        },
                      ],
                    },
                  },
                  exchanged: { type: 'final' },
                },
                on: {
                  SET_SOLD: '.sold',
                },
              },
              marketStatus: {
                initial: 'determiningState',
                on: {
                  INIT_MARKET_STATUS: '.new',
                  REFRESH_MARKET_STATUS: {
                    actions: ['assignMarketData'],
                    target: '.determiningState',
                  },
                },
                states: {
                  determiningState: {
                    always: [
                      { cond: 'noMarketData', target: 'undefined' },
                      { cond: 'isMarketStatusNew', target: 'new' },
                      { cond: 'isMarketStatusProposed', target: 'proposed' },
                      { cond: 'isMarketStatusAccepted', target: 'accepted' },
                      { cond: 'isMarketStatusError', target: 'error' },
                      {
                        cond: 'isMarketStatusCancelled',
                        target: 'cancelled',
                      },
                    ],
                  },
                  undefined: {},
                  new: {},
                  proposed: {},
                  accepted: {},
                  error: {},
                  cancelled: {},
                },
              },
            },
          },
          game: {
            initial: 'determiningState',
            states: {
              determiningState: {
                always: [
                  { cond: 'isStatusNew', target: 'new' },
                  { cond: 'isStatusSold', target: 'sold' },
                  { cond: 'isStatusCollected', target: 'collected' },
                ],
              },
              new: {
                on: {
                  SHOW_ACTIVATION_GUIDE: 'new',
                  SELL: { cond: 'gameCanBeSold', target: 'selling' },
                  COLLECT: 'confirmingCollect',
                },
              },
              selling: {
                invoke: {
                  src: 'sellGame',
                  onDone: {
                    actions: ['refreshEq', 'updateBalance'],
                    target: 'sold',
                  },
                  onError: {
                    actions: ['notifyError'],
                    target: 'new',
                  },
                },
              },
              sold: {
                type: 'final',
              },
              confirmingCollect: {
                on: {
                  YES: 'collecting',
                  NO: 'new',
                },
              },
              collecting: {
                invoke: {
                  src: 'collectGame',
                  onDone: {
                    actions: ['assignGameCode'],
                    target: 'collected',
                  },
                  onError: {
                    actions: choose([
                      { cond: 'requiresKyc', actions: ['showKYCModal'] },
                      { actions: ['notifyError'] },
                    ]),
                    target: 'new',
                  },
                },
              },
              collected: {
                on: {
                  SHOW_ACTIVATION_GUIDE: 'collected',
                },
                type: 'final',
              },
            },
          },
        },
      },
    },
  },
  {
    guards: {
      requiresKyc: (_, _e) => {
        const e = _e as { type: (typeof _e)['type']; data: { Kyc: boolean } }
        return e.data.Kyc
      },
      isPublic: (ctx) => ctx.isPublic,
      isSkin: (ctx) => ctx.data.type === 'skin',
      isGame: (ctx) => ctx.data.type === 'game',
      isStatusNew: (ctx) => String(ctx.data.status) === ITEM_STATUS.NEW,
      isStatusCollected: (ctx) => String(ctx.data.status) === ITEM_STATUS.COLLECTED,
      isStatusSold: (ctx) => String(ctx.data.status) === ITEM_STATUS.SOLD,
      isStatusForExchangeFromSkinChanger: (ctx) =>
        String(ctx.data.status) === ITEM_STATUS.FOR_EXCHANGE &&
        ctx.data.sourceType === ITEM_SOURCE_TYPE.skinchanger,
      isStatusForExchange: (ctx) => String(ctx.data.status) === ITEM_STATUS.FOR_EXCHANGE,
      isStatusExchangedOrBlockedOrUpgraded: (ctx) =>
        String(ctx.data.status) === ITEM_STATUS.EXCHANGED_OR_BLOCKED ||
        String(ctx.data.status) === ITEM_STATUS.UPGRADED,
      isStatusPending: (ctx) => String(ctx.data.status) === ITEM_STATUS.PENDING,
      isStatusExchanged: (ctx) => String(ctx.data.status) === ITEM_STATUS.EXCHANGED,
      noMarketData: (ctx) => !ctx.marketData,
      isMarketStatusNew: (ctx) => ctx.marketData?.Stage === ITEM_MARKET_STATUS.NEW,
      isMarketStatusProposed: (ctx) => ctx.marketData?.Stage === ITEM_MARKET_STATUS.PROPOSED,
      isMarketStatusAccepted: (ctx) => ctx.marketData?.Stage === ITEM_MARKET_STATUS.ACCEPTED,
      isMarketStatusErrorAndCanExchange: (ctx, e) =>
        ctx.marketData?.Stage === ITEM_MARKET_STATUS.ERROR && e?.data?.Exchange,
      isMarketStatusError: (ctx) => ctx.marketData?.Stage === ITEM_MARKET_STATUS.ERROR,
      isMarketStatusCancelled: (ctx) => ctx.marketData?.Stage === ITEM_MARKET_STATUS.CANCELLED,
      gameCanBeSold: (ctx) => Boolean(ctx.data.sell),
      isFromSkinChanger: (ctx) =>
        String(ctx.data.status) === ITEM_STATUS.NEW &&
        ctx.data.sourceType === ITEM_SOURCE_TYPE.skinchanger,
    },
    actions: {
      assignMarketData: assign((ctx, { data }) => {
        ctx.marketData = data
      }),
      assignGameCode: assign((ctx, { data }) => {
        ctx.data.code = data.code
      }),
      initMarketStatus: raise('INIT_MARKET_STATUS'),
      refreshEq: sendParent('refreshEq'),
      notifyError: (_, _e) => {
        const e = _e as { type: (typeof _e)['type']; data: { Info?: string; info?: string } }
        toast.error(e?.data?.Info || e?.data?.info || translate('main:common.error.common'))
      },
      exchange: (ctx) => {
        CommonClient.openInNewTab(KEYDROP_URLS.upgradeItem(ctx.data.id))
      },
      updateBalance: sendParent('UPDATE_BALANCE'),
      showKYCModal: () => {
        toast.error(
          <span className="flex flex-col gap-4">
            <span>{translate('main:common.kycConfirmIdentity')}</span>
            <Button href={KEYDROP_URLS.kyc} label="KYC process" className="button--primary" />
          </span>,
          { autoClose: false },
        )
      },
    },
    services: {
      sellSkin: async (ctx: ItemContext): Promise<SellItemResponse> => {
        const id = ctx.data.id
        if (!id) throw new Error('No id provided')
        const res = await InventoryClient.sellSkin({ id })
        if (!res.Status) return Promise.reject(res)
        return res
      },
      sellGame: async (ctx: ItemContext): Promise<SellGameResponse> => {
        const id = ctx.data.id
        if (!id) throw new Error('No id provided')
        const res = await InventoryClient.sellGame({ id })
        if (!res.Status) return Promise.reject(res)
        return res
      },
      collectSkin: async (ctx: ItemContext): Promise<CollectSkinResponse> => {
        const id = ctx.data.id
        if (!id) throw new Error('No id provided')
        const res = await InventoryClient.collectSkin({ id })
        if (!res.Status || res.Kyc === true) return Promise.reject(res)
        return Promise.resolve(res)
      },
      collectGame: async (ctx: ItemContext): Promise<CollectGameResponse> => {
        const id = ctx.data.id
        if (!id) throw new Error('No id provided')
        const res = await InventoryClient.collectGame({ id })
        if (!res.Status || res.Kyc === true) return Promise.reject(res)
        return res
      },
    },
  },
)

export default ItemMachine
