import { useEffect, useState } from 'react'

const useIsWindowFocused = (initial?: boolean): boolean => {
  const [focus, setFocus] = useState(initial ?? document.hasFocus())

  useEffect(() => {
    const onFocus = (): void => setFocus(true)
    const onBlur = (): void => setFocus(false)

    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return focus
}

export default useIsWindowFocused
