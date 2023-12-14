import { Cookies } from 'webextension-polyfill'

export const normalizeCookie = (cookie: Cookies.Cookie): string => {
  return cookie.value
}

export const normalizeCookies = (cookies: Cookies.Cookie[]): { [key: string]: string } => {
  return cookies.reduce((acc, post) => {
    const { name, value } = post
    return { ...acc, [name]: value }
  }, {})
}
