import { Sender } from 'xstate'

import {
  InventoryContext,
  InventoryMachineEvent,
} from '@/machines/InventoryMachine/Inventory.types'
import InventoryClient from '@/services/http/InventoryClient'
import {
  CATEGORY_FILTER,
  EqValueResponse,
  ItemMarketDataResponse,
  MyWinnerListResponse,
  SellEqResponse,
} from '@/types/API/http/inventory'
import { UserInventoryData } from '@/types/inventory'

export const getUserItems = async (ctx: InventoryContext): Promise<MyWinnerListResponse> => {
  return await InventoryClient.getUserItems(ctx.mirrorUrl, {
    type: ctx.filters.category.length === 1 ? String(ctx.filters.category) : CATEGORY_FILTER.ALL,
    sort: ctx.sortingVariant,
    weaponType: ctx.filters.weaponType,
    state: ctx.filters.state,
    per_page: String(ctx.filters.perPage),
    current_page: String(ctx.filters.currentPage),
  })
}

export const getMarketItemsData = async (
  ctx: InventoryContext,
): Promise<ItemMarketDataResponse[]> => {
  return await InventoryClient.getUserItemsMarketData(ctx.mirrorUrl)
}

export const getMarketItemsDataInterval =
  (ctx: InventoryContext) => (callback: Sender<InventoryMachineEvent>) => {
    const id = setInterval(() => {
      getMarketItemsData(ctx)
        .then((data) => {
          callback({ type: 'REFRESH_MARKET_DATA', data })
        })
        .catch(console.error)
    }, 10000)

    return () => clearInterval(id)
  }

export const getUserEqValue = async (ctx: InventoryContext): Promise<EqValueResponse> => {
  return await InventoryClient.getUserItemsEqValue(ctx.mirrorUrl)
}

export const getUserInventoryData = async (ctx: InventoryContext): Promise<UserInventoryData> => {
  const [dataRes, marketDataRes, eqValue] = await Promise.all([
    getUserItems(ctx),
    getMarketItemsData(ctx),
    getUserEqValue(ctx),
  ])
  return {
    dataRes,
    marketDataRes,
    eqValue,
  }
}

export const sellEq = async (ctx: InventoryContext): Promise<SellEqResponse> => {
  const res = await InventoryClient.sellEq(ctx.mirrorUrl)
  if (!res.status) return Promise.reject(res)
  return res
}
