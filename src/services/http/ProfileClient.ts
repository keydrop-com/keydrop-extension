import AbstractHttpService from '@/services/http/AbstractHttpService'
import {
  BalanceParams,
  BalanceResponse,
  ProfilePageParams,
  ProfilePageResponse,
} from '@/types/API/http/profile'
import { PROFILE_API } from '@/utils/API/http/profile'

class ProfileClient extends AbstractHttpService {
  static async getUserProfile(params: ProfilePageParams): Promise<ProfilePageResponse> {
    return super.fetchWithAuth(PROFILE_API.profileData(params))
  }

  static async getUserBalance(params: BalanceParams): Promise<BalanceResponse> {
    return super.fetchWithAuth(PROFILE_API.balance(params))
  }
}

export default ProfileClient
