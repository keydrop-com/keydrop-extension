import { IMAGES } from '@/browser/content-script/constants/base64'
import { waitForElm } from '@/browser/content-script/utils/common'

export async function insertKeydropBanner(): Promise<void> {
  const mainContent = await waitForElm('.maincontent')
  if (!mainContent) return
  mainContent.insertAdjacentHTML(
    'afterbegin',
    `
        <div id="extension-banner" class="extension-banner">
            <div class="extension-banner-content">
                <div class="extension-banner-text-wrapper">
                    <div class="extension-banner-warning">!</div>
                    <div class="extension-banner-text">
                        <p class="extension-banner-text-first">Are you waiting for the skin?</p>
                        <p class="extension-banner-text-second">transactions may take <span>few minutes.</span></p>
                    </div>
                </div>
                <div class="extension-banner-img-wrapper">
                    <img src="${IMAGES.KEYDROP_MASCOT}" class="extension-banner-img" alt="Keydrop">
                </div>
            </div>
        </div>
      `,
  )
}
