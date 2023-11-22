import { IMAGES } from '@/browser/content-script/constants/base64'
import { waitForElm } from '@/browser/content-script/utils/common'

export async function insertKeydropBanner(): Promise<void> {
  const mainContent = await waitForElm('.maincontent')
  if (!mainContent) return
  mainContent.insertAdjacentHTML(
    'afterbegin',
    `
        <div id="keydrop-banner" class="keydrop-banner">
            <div class="keydrop-banner-content">
                <div class="keydrop-banner-text-wrapper">
                    <div class="keydrop-banner-warning">!</div>
                    <div class="keydrop-banner-text">
                        <p class="keydrop-banner-text-first">Are you waiting for the skin?</p>
                        <p class="keydrop-banner-text-second">transactions may take <span>few minutes.</span></p>
                    </div>
                </div>
                <div>
                    <img src="${IMAGES.KEYDROP_MASCOT}" alt="Keydrop">
                </div>
            </div>
        </div>
      `,
  )
}
