export const isStatTrak = (hashName: string): boolean => {
  return hashName?.includes('StatTrak™')
}

export const skinNameWithoutStatTrak = (hashName: string): string => {
  return hashName?.replace('StatTrak™ ', '')
}

export const splitHashName = (
  hashName: string,
): [title: string, subtitle: string, condition: string] => {
  // handle Tournament Stickers
  const nameParts = hashName?.split(' | ')

  if (nameParts?.length === 3) {
    return [
      // Title - Sticker
      nameParts[0],
      // Player | Tournament & Date
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      `${/^[^\(]+/g.exec(nameParts[1])[0]} | ${nameParts[2]}`,
      // Variant
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      /(\(.+\))/g.test(nameParts[1]) ? /(\(.+\))/g.exec(nameParts[1])[0] : '',
    ]
  }

  // handle regular skins
  const result = /\(/g.test(hashName)
    ? /^(.+?)\s?\|\s?(.+?)(\(.+\))$/g.exec(hashName)
    : /^(.+?)\s?\|\s?(.+?)$/g.exec(hashName)

  return result ? [result[1], result[2], result[3]] : [hashName, '', '']
}
