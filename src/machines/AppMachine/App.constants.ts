import {
  INIT_APP_DATA,
  INIT_COUNTER_ANIMATIONS,
  INIT_USER_BALANCE,
  INIT_USER_DATA,
  INIT_USER_PROFILE,
} from '@/constants/app'
import { AppMachineContext } from '@/machines/AppMachine/App.types'
import { ActiveView } from '@/types/app'

export const INIT_APP_CONTEXT: AppMachineContext = {
  mirrorUrl: 'https://key-drop.com/',
  userProfile: INIT_USER_PROFILE,
  initUserData: INIT_USER_DATA,
  userBalance: INIT_USER_BALANCE,
  appData: INIT_APP_DATA,
  countersAnimations: INIT_COUNTER_ANIMATIONS,
  activeView: ActiveView.MAIN,
  userBalanceValue: null,
}
