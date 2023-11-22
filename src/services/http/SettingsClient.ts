import AbstractHttpService from '@/services/http/AbstractHttpService'
import { SetLangCurrencyParams, SetLangCurrencyResponse } from '@/types/API/http/settings'
import { SETTINGS_API } from '@/utils/API/http/settings'

class SettingsClient extends AbstractHttpService {
  static async setLangCurrency(params: SetLangCurrencyParams): Promise<SetLangCurrencyResponse> {
    const formData = new FormData()
    formData.append('lang', params.lang)
    formData.append('currency', params.currency)

    const token = await this.getToken()

    if (!token) return Promise.reject()

    return super.fetchWithAuth(
      SETTINGS_API.changeLangAndCurrency,
      {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      },
      true,
      true,
    )
  }
}

export default SettingsClient
