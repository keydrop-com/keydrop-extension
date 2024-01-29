import AbstractHttpService from '@/services/http/AbstractHttpService'
import {
  InitUserDataResponse,
  ProfilePageParams,
  ProfilePageResponse,
} from '@/types/API/http/profile'
import { PROFILE_API } from '@/utils/API/http/profile'

class ProfileClient extends AbstractHttpService {
  static async getUserProfile(
    baseUrl: string,
    params: ProfilePageParams,
  ): Promise<ProfilePageResponse> {
    return super.fetchWithAuth(baseUrl, PROFILE_API.profileData(baseUrl, params), {}, true, true)
  }

  static async getInitUserData(baseUrl: string): Promise<InitUserDataResponse> {
    return super.fetchWithAuth(baseUrl, PROFILE_API.initData(baseUrl), {}, true, true)
  }
}

export default ProfileClient
