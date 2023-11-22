export function waitForElm(selector: string): Promise<HTMLElement | HTMLTextAreaElement | null> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector) as HTMLElement | HTMLTextAreaElement)
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector) as HTMLElement | HTMLTextAreaElement)
        observer.disconnect()
      } else {
        reject()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}
