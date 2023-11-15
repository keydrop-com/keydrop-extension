import AbstractHttpService from '@/services/http/AbstractHttpService'
import { ProfilePageParams, ProfilePageResponse } from '@/types/API/http/profile'
import { PROFILE_API } from '@/utils/API/http/profile'

class ProfileClient extends AbstractHttpService {
  static async getUserProfile(params: ProfilePageParams): Promise<ProfilePageResponse> {
    return super.fetchWithAuth(PROFILE_API.profileData(params))
  }
}

export default ProfileClient
