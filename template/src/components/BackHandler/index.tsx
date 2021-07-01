import { useCallback, useEffect } from 'react'
import { BackHandler as BH } from 'react-native'

type BackHandlerProps = {
  onBack?: () => void
  disabled?: boolean
}

export function BackHandler(props: BackHandlerProps) {
  const { onBack, disabled } = props

  const _onBackPress = useCallback(() => {
    if (disabled) {
      return true
    }
    if (onBack) {
      onBack()
      return true
    }
    return false
  }, [disabled, onBack])

  useEffect(() => {
    BH.addEventListener('hardwareBackPress', _onBackPress)

    return () => {
      BH.removeEventListener('hardwareBackPress', _onBackPress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
