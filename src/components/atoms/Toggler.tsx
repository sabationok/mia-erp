import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components'

type Props = {
  active?: boolean
  onChangeValue?: (value: boolean) => void
  mr?: number
  disabled?: boolean
}

function Toggler({
  active = false,
  onChangeValue,
  mr,
  disabled = false,
}: Props) {
  const [_active, setActive] = useState(active ?? false)

  useEffect(() => {
    setActive(disabled ? false : active ?? false)
  }, [active, disabled])
  const onTogglerPress = () => {
    setActive(!_active)
    onChangeValue && onChangeValue(!_active)
  }

  return (
    <Container
      mr={mr}
      onClick={onTogglerPress}
      isActive={_active ?? false}
      disabled={disabled}
      aria-checked={_active}
    >
      <Circle isActive={_active ?? false} />
    </Container>
  )
}

const Container = styled.div<{
  isActive: boolean
  mr?: number
  disabled?: boolean
}>`
  cursor: pointer;
  width: 44px;
  height: 28px;
  background-color: #fff;
  margin-right: ${({ mr = 0 }) => mr}px;
  border-radius: 100px;
  border: 1px solid ${({ isActive }) => (isActive ? '#62C45B' : '#e9e7dd')};

  opacity: ${({ disabled }) => (disabled ? '70%' : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
`

const Circle = styled.div<{ isActive: boolean }>`
  width: 22px;
  height: 22px;
  background-color: ${({ isActive }) => (isActive ? '#62C45B' : '#838383')};
  border-radius: 11px;
  margin-top: 2px;
  transition: all 0.2s;
  margin-left: ${({ isActive }) => (isActive ? 18 : 2)}px;
`

export default memo(Toggler)
