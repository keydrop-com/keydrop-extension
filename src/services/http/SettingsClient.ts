import AbstractHttpService from '@/services/http/AbstractHttpService'
import { SetLangCurrencyParams, SetLangCurrencyResponse } from '@/types/API/http/settings'
import { SETTINGS_API } from '@/utils/API/http/settings'

class SettingsClient extends AbstractHttpService {
  static async setLangCurrency(
    baseUrl: string,
    params: SetLangCurrencyParams,
  ): Promise<SetLangCurrencyResponse> {
    const formData = new FormData()
    formData.append('lang', params.lang)
    formData.append('currency', params.currency)

    const token = await this.getToken(baseUrl)

    if (!token) return Promise.reject()

    return super.fetchWithAuth(
      baseUrl,
      SETTINGS_API.changeLangAndCurrency(baseUrl),
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
