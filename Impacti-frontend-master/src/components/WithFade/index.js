import React from 'react'
import style from './style.module.css'

const DEFAULT_TIMEOUT = 1500
const DEFAULT_TRESHOLD = 300

export default class WithFade extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      isFadingOut: false
    }
  }

  componentDidMount() {
    const timeout = this.props.timeout || DEFAULT_TIMEOUT

    this.animationTimeout = setTimeout(() => {
      this.setState({ isFadingOut: true })
    }, timeout - DEFAULT_TRESHOLD)

    this.actionTimeout = setTimeout(() => {
      this.props.action()
    }, timeout)
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimeout)
    clearTimeout(this.actionTimeout)
  }

  render() {
    return (
      <div
        className={`${style.container} ${this.props.className}
    ${this.state.isFadingOut ? style.isFadingOut : ''}`}
      >
        {this.props.children}
      </div>
    )
  }
}
