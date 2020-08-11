import React from 'react'
import { Chip } from '@material-ui/core'
import omit from 'lodash/omit'
import keyMirror from 'key-mirror'

const STYLES = keyMirror({
  IMPACTI: null,
  ALTERNATIVE: null,
  SMALL: null,
  SMALL_COLUMN: null
})

const baseChipStyle = {
  borderRadius: 5,
  fontSize: 16,
  margin: 10,
  padding: 10,
  height: 50
}

const baseStyle = {
  chipInactive: {
    ...baseChipStyle,
    backgroundColor: '#ffffff',
    color: '#000000'
  },
  chipActive: {
    ...baseChipStyle,
    backgroundColor: '#ff6d00',
    color: '#ffffff',
    fontWeight: 'bold'
  },
  closeIcon: {
    backgroundColor: 'transparent',
    order: 1,
    width: 17
  }
}

const stylesJs = {
  [STYLES.IMPACTI]: {
    ...baseStyle
  },
  [STYLES.SMALL]: {
    ...baseStyle,
    chipInactive: {
      ...baseStyle.chipInactive,
      fontSize: 12,
      padding: '3px 10px',
      margin: 2,
      height: 20
    },
    chipActive: {
      ...baseStyle.chipActive,
      fontSize: 12,
      padding: '3px 10px',
      margin: 2,
      height: 20
    }
  },
  [STYLES.ALTERNATIVE]: {
    chipInactive: {
      ...baseStyle.chipInactive,
      padding: 5,
      height: 60
    },
    chipActive: {
      ...baseStyle.chipActive,
      padding: 5,
      height: 60
    }
  }
}

export const CHIP_TYPES = {
  IMPACTI: {
    style: STYLES.IMPACTI,
    hasCloseButton: true
  },
  ALTERNATIVE: {
    style: STYLES.ALTERNATIVE,
    hasCloseButton: false
  },
  SMALL: {
    style: STYLES.SMALL
  }
}

const getChipType = props => props.chipType || CHIP_TYPES.IMPACTI
const getStyleKey = props => getChipType(props).style

export default props => (
  <Chip
    className="chip-default"
    style={
      props.isActive
        ? stylesJs[getStyleKey(props)].chipActive
        : stylesJs[getStyleKey(props)].chipInactive
    }
    {...omit(props, ['isActive', 'chipType'])}
  >
    {props.children}
  </Chip>
)
