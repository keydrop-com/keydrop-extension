export const consoleLog = (text: string, message?: unknown): void =>
  console.log(
    `%c(Key-Drop Extension) | ${text} ${message ? ` - ${message}` : ''}`,
    'background-color: #FFCB77; color: #0B0C0E',
  )
