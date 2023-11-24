import { SORTING_VARIANT } from '@/types/API/http/inventory'

export const WEAPON_TYPE_OPTIONS = [
  {
    value: '',
    name: 'all',
  },
  {
    value: 'rifle',
    name: 'rifle',
  },
  {
    value: 'sniper-rifle',
    name: 'sniper-rifle',
  },
  {
    value: 'pistol',
    name: 'pistol',
  },
  {
    value: 'smg',
    name: 'smg',
  },
  {
    value: 'knife',
    name: 'knife',
  },
  {
    value: 'other',
    name: 'other',
  },
  {
    value: 'shotgun',
    name: 'shotgun',
  },
  {
    value: 'machinegun',
    name: 'machinegun',
  },
]

export const SORTING_OPTIONS: SORTING_VARIANT[] = [
  SORTING_VARIANT.NEWEST,
  SORTING_VARIANT.NEWEST,
  SORTING_VARIANT.PRICE_ASC,
  SORTING_VARIANT.PRICE_DESC,
]

export const CAN_BE_COLLECTED_STATES = [
  'private.skin.status.new',
  'private.skin.status.newFromSkinChanger',
  'private.skin.status.forExchange',
  'private.skin.status.forExchangeFromSkinChanger',
]

export const CAN_BE_UPGRADED_OR_SOLD_STATES = [
  'private.skin.status.new',
  'private.skin.status.forExchange',
]

export const IS_LOADING_STATES = [
  'private.skin.status.selling',
  'private.skin.status.collecting',
  'private.skin.status.exchanging',
]
