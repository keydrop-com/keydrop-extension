import { AppStorage, OpenIn } from '@/types/storage'
import { ActiveView } from '@/types/views'

export const STORAGE_VERSION = '1.0'

export const DEFAULT_APP_STORAGE: AppStorage = {
  auto_creating_trade: false,
  default_view: ActiveView.MAIN,
  disable_offer_edit: true,
  offer_message: '',
  open_in: OpenIn.new_tab,
}
