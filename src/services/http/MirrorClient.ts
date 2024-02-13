import AbstractHttpService from '@/services/http/AbstractHttpService'
import { MIRROR_API } from '@/utils/API/http/mirror'

class MirrorClient extends AbstractHttpService {
  static async getMirrorUrl(): Promise<string> {
    const urlPrefix = 'https://'
    const domain = await super.fetchWithoutAuth<string>(MIRROR_API.getUrl, {}, true, false, true)
    if (domain.startsWith(urlPrefix)) return domain
    return urlPrefix + domain
  }
}

export default MirrorClient
