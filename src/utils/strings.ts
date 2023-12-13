export const isStatTrak = (hashName?: string): boolean => {
  return Boolean(hashName?.includes('StatTrak™'))
}

export const skinNameWithoutStatTrak = (hashName: string): string => {
  return hashName.replace('StatTrak™ ', '')
}

export const splitHashName = (
  hashName: string,
): [title: string, subtitle: string, condition: string] => {
  // handle Tournament Stickers
  const nameParts = hashName?.split(' | ')

  if (nameParts?.length === 3) {
    return [
      // Title - Sticker
      (nameParts?.[0] || '').trim(),
      // Player | Tournament & Date
      `${/^[^\(]+/g.exec(nameParts[1])?.[0] || ''} | ${nameParts[2]}`.trim(),
      // Variant
      (/(\(.+\))/g.test(nameParts[1]) ? /(\(.+\))/g.exec(nameParts[1])?.[0] || '' : '').trim(),
    ]
  }

  // handle regular skins
  const result = /\(/g.test(hashName)
    ? /^(.+?)\s?\|\s?(.+?)(\(.+\))$/g.exec(hashName)
    : /^(.+?)\s?\|\s?(.+?)$/g.exec(hashName)

  return result
    ? [result[1].trim(), result[2].trim(), (result[3] || '').trim()]
    : [hashName, '', '']
}
