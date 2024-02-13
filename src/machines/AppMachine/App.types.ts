import { BalanceResponse } from '@/types/API/http/balance'
import { InitUserDataResponse, ProfilePageResponse } from '@/types/API/http/profile'
import { ActiveView, AppData, CountersAnimations } from '@/types/app'

export type AppMachineServices = {
  getAppData: {
    data: AppData
  }
  getUserProfile: {
    data: ProfilePageResponse
  }
  getUserBalance: {
    data: BalanceResponse
  }
  authUser: {
    data: void
  }
  getInitUserData: {
    data: InitUserDataResponse
  }
  userProfileErrorToast: {
    data: void
  }
  getMirrorUrl: {
    data: string
  }
}

export type AppMachineEvent =
  | { type: 'ACTIVE_VIEW_CHANGE'; value: ActiveView }
  | { type: 'LOGIN' }
  | { type: 'REFETCH_BALANCE' }
  | { type: 'HARD_USER_REFRESH' }

export interface AppMachineContext {
  appData: AppData
  activeView: ActiveView
  userProfile: ProfilePageResponse
  initUserData: InitUserDataResponse
  userBalance: BalanceResponse
  countersAnimations: CountersAnimations
  userBalanceValue: null | number
  mirrorUrl: string
}
