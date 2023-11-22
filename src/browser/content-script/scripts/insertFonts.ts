import { waitForElm } from '@/browser/content-script/utils/common'

export async function insertFonts(): Promise<void> {
  const head = await waitForElm('head')
  if (!head) return
  head.insertAdjacentHTML(
    'beforeend',
    `
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
      `,
  )
}
