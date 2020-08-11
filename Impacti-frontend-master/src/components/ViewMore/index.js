import React from 'react'
import PropTypes from 'prop-types'

class ViewMore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      charLimit: props.charLimit
    }
    this.initialState = this.state
  }

  getViewMoreContent() {
    const { charLimit } = this.state
    const { text, viewMoreText, viewLessText } = this.props
    if (text.length > charLimit) {
      return (
        <span className="short-text">
          {text.substr(0, charLimit)}...
          <span
            className="ViewMoreText"
            style={{ color: '#007bff', cursor: 'pointer' }}
            role="presentation"
            onClick={this.showLongText.bind(this)}
          >
            {viewMoreText}
          </span>
        </span>
      )
    } else if (text.length < charLimit) {
      return <span className="short-text">{text}</span>
    }
    return (
      <span className="short-text">
        {text}
        <span
          className="ViewMoreText"
          style={{ color: '#007bff', cursor: 'pointer' }}
          role="presentation"
          onClick={this.showShortText.bind(this)}
        >
          {viewLessText}
        </span>
      </span>
    )
  }

  showLongText() {
    const { text } = this.props
    this.setState({ charLimit: text.length })
    this.getViewMoreContent()
  }

  showShortText() {
    this.setState(this.initialState)
    this.getViewMoreContent()
  }

  render() {
    return <div>{this.getViewMoreContent()}</div>
  }
}

ViewMore.propTypes = {
  charLimit: PropTypes.number,
  ViewMoreText: PropTypes.string,
  readLessText: PropTypes.string,
  text: PropTypes.string.isRequired
}
ViewMore.defaultProps = {
  charLimit: 150,
  ViewMoreText: 'Read more',
  readLessText: 'Read less'
}
export default ViewMore
