import React from 'react'
import Button from '@material-ui/core/Button'
import omit from 'lodash/omit'
import keyMirror from 'key-mirror'
import { impactiBlue } from 'constants/inlineStyles'
import style from './style.module.css'

import IcoArrowRight from 'assets/ico-arrow-right.svg'
import IcoArrowLeft from 'assets/ico-arrow-left.svg'

const STYLES = keyMirror({
  BLUE: null,
  BLUE_LIGHT_TEXT: null,
  BLUE_WHITE_FONT: null,
  WHITE: null,
  WHITE_SMALL_DISABLED: null,
  SAVE_FOR_LATER: null
})

export const BUTTON_TYPES = {
  START: {
    label: 'Let’s Go!',
    hasRightArrow: false,
    style: STYLES.BLUE
  },
  NEXT: {
    label: 'Next',
    hasRightArrow: false,
    style: STYLES.BLUE
  },
  BACK: {
    label: 'Back',
    hasLeftArrow: true,
    style: STYLES.BLUE
  },
  FINISHED_SDG: {
    label: 'Finished all SDGs',
    hasRightArrow: false,
    style: STYLES.BLUE
  },
  SIGNUP_HEADER: {
    label: 'Sign Up',
    hasRightArrow: false,
    style: STYLES.BLUE
  },
  SIGN_UP: {
    label: 'Register my profile',
    style: STYLES.BLUE
  },
  SIGNUP: {
    label: 'SIGN UP FREE',
    style: STYLES.BLUE
  },
  LOGIN: {
    label: 'Log In',
    style: STYLES.BLUE_WHITE_FONT
  },
  EXIT: {
    label: 'Exit',
    hasRightArrow: true,
    style: STYLES.BLUE
  },
  SAVE: {
    label: 'Save',
    hasRightArrow: false,
    style: STYLES.BLUE
  },
  SAVE_FOR_LATER: {
    label: 'Save for later',
    hasRightArrow: false,
    style: STYLES.SAVE_FOR_LATER
  },
  CLOSE: {
    label: 'Close',
    hasRightArrow: false,
    style: STYLES.BLUE
  },
  CREATE_PROFILE: {
    label: 'Create your profile',
    hasRightArrow: false,
    style: STYLES.BLUE
  },
  SAVE_AND_PROCEED: {
    label: 'Save and Proceed',
    hasRightArrow: true,
    style: STYLES.BLUE
  },
  UPDATE_DESTINATIONS: {
    label: 'Update destinations',
    hasRightArrow: false,
    style: STYLES.BLUE_LIGHT_TEXT
  },
  YES: {
    label: 'YES',
    hasRightArrow: false,
    style: STYLES.BLUE
  },
  NO: {
    label: 'NO',
    hasRightArrow: false,
    style: STYLES.WHITE
  },
  REGISTER_YOUR_PROFILE: {
    label: 'Join Impacti CONNECT',
    hasRightArrow: false,
    style: STYLES.BLUE
  },
  BASECAMP: {
    label: 'Go to Basecamp',
    style: STYLES.WHITE
  },
  GO_TO_TAB: {
    hasRightArrow: false,
    style: STYLES.WHITE_SMALL
  },
  GO_TO_TAB_DISABLED: {
    hasRightArrow: false,
    style: STYLES.WHITE_SMALL_DISABLED
  },
  BUTTON_WHITE_SMALL_WITH_ARROW: {
    hasRightArrow: false,
    style: STYLES.WHITE_SMALL
  },
  BLANK_BLUE: {
    hasRightArrow: false,
    style: STYLES.BLUE
  },
  BLANK_WHITE: {
    hasRightArrow: false,
    style: STYLES.WHITE
  }
}

const styles = {
  [STYLES.BLUE]: {
    raised: 'true',
    color: 'secondary',
    inline: {
      width: 'auto',
      height: '48px',
      padding: '0 35px',
      minWidth: '48px',
      minHeight: 'auto',
      borderRadius: '24px',
      textTransform: 'capitalize'
    }
  },
  [STYLES.WHITE]: {
    raised: 'false',
    labelClassName: style.whiteButtonLabel,
    inline: {
      border: `2px solid ${impactiBlue[50]}`,
      background: '#fff',
      color: `${impactiBlue[50]} !important`,
      minWidth: '160px'
    }
  },
  [STYLES.SAVE_FOR_LATER]: {
    raised: 'false',
    labelClassName: style.saveForLaterButtonLabel,
    inline: {
      padding: 0
    }
  },
  [STYLES.BLUE_WHITE_FONT]: {
    raised: 'true',
    color: 'secondary',
    inline: {
      width: 'auto',
      height: '48px',
      padding: '0 35px',
      minWidth: '48px',
      minHeight: 'auto',
      borderRadius: '24px',
      textTransform: 'capitalize',
      color: '#fff'
    }
  },
  [STYLES.BLUE_LIGHT_TEXT]: {
    raised: 'true',
    color: 'secondary',
    inline: {
      fontWeight: 300,
      width: 'auto',
      height: '48px',
      padding: '0 35px',
      minWidth: '48px',
      minHeight: 'auto',
      borderRadius: '24px',
      textTransform: 'capitalize'
    }
  },
  [STYLES.WHITE_SMALL]: {
    raised: 'false',
    labelClassName: style.whiteButtonLabel,
    inline: {
      border: `1px solid ${impactiBlue[50]}`,
      background: '#fff',
      color: `${impactiBlue[50]} !important`,
      height: '35px',
      fontSize: '16px',
      fontWeight: 'normal',
      padding: '0 30px',
      textTransform: 'none'
    }
  },
  [STYLES.WHITE_SMALL_DISABLED]: {
    raised: 'false',
    labelClassName: style.whiteButtonLabel,
    inline: {
      border: `1px solid ${impactiBlue[50]}`,
      background: '#fff',
      color: `${impactiBlue[50]} !important`,
      height: '35px',
      fontSize: '16px',
      fontWeight: 'normal',
      padding: '0 30px',
      opacity: 0.3,
      textTransform: 'none',
      pointerEvents: 'none'
    }
  }
}

const optionally = STYLE => property =>
  styles[STYLE] ? styles[STYLE][property] : null

export default props => (
  <Button
    raised={optionally(props.buttonType.style)('raised')}
    color={optionally(props.buttonType.style)('color')}
    style={optionally(props.buttonType.style)('inline')}
    classes={{
      label: optionally(props.buttonType.style)('labelClassName')
    }}
    {...omit(props, ['buttonType'])}
  >
    {props.buttonType.label}
    {props.buttonType.hasRightArrow && (
      <img src={IcoArrowRight} alt="->" className="arrowRightIco" />
    )}
    {props.buttonType.hasLeftArrow && (
      <img src={IcoArrowLeft} alt="->" className="arrowLeftIco" />
    )}
    {props.children}
  </Button>
)
