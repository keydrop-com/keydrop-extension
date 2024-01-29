import AbstractHttpService from '@/services/http/AbstractHttpService'
import { MIRROR_API } from '@/utils/API/http/mirror'

class MirrorClient extends AbstractHttpService {
  static async getMirrorUrl(): Promise<string> {
    return super.fetchWithoutAuth(MIRROR_API.getUrl, {}, true, false, true)
  }
}

export default MirrorClient
