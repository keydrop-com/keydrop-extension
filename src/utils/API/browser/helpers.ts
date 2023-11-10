import { Cookies } from 'webextension-polyfill'

export const normalizeCookies = (cookies: Cookies.Cookie[] | []): { [key: string]: string } => {
  return (cookies as Cookies.Cookie[]).reduce((acc, post) => {
    const { name, value } = post
    return { ...acc, [name]: value }
  }, {})
}
