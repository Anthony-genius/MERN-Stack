import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    marginBottom: theme.spacing.unit * 2
  },
  sdgGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  sdgImage: {
    width: 100,
    height: 100,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  expand: {
    display: 'flex',
    '&:hover': {
      cursor: 'pointer'
    }
  }
})

class TopSdgs extends React.Component {
  state = {
    extraSdgsHidden: true
  }

  toggleShowingExtraSdgs = () => {
    this.setState(({ extraSdgsHidden }) => ({
      extraSdgsHidden: !extraSdgsHidden
    }))
  }
  render() {
    const { classes, sdgs } = this.props
    const { extraSdgsHidden } = this.state

    return (
      <div>
        <Paper square className={classes.root} elevation={1}>
          <Typography className={classes.title}>Top 3 SDGs</Typography>
          <div className={classes.sdgGroup}>
            {sdgs.slice(0, 3).map((sdg, i) => (
              <img
                className={classes.sdgImage}
                key={i}
                src={require('assets/E-SDG-goals-icons-full-rgb-' +
                  sdg.shortName +
                  '.png')}
                alt={sdg}
              />
            ))}
          </div>
          {extraSdgsHidden && sdgs.length > 3 && (
            <p onClick={this.toggleShowingExtraSdgs} className={classes.expand}>
              <ExpandMoreIcon />
              See more
            </p>
          )}
          {!extraSdgsHidden && (
            <>
              <div className={classes.sdgGroup}>
                {sdgs.slice(3, 20).map(sdg => (
                  <img
                    className={classes.sdgImage}
                    src={require('assets/E-SDG-goals-icons-full-rgb-' +
                      sdg.shortName +
                      '.png')}
                    alt={sdg}
                  />
                ))}
              </div>
              <p
                onClick={this.toggleShowingExtraSdgs}
                className={classes.expand}
              >
                <ExpandLessIcon />
                See less
              </p>
            </>
          )}
        </Paper>
      </div>
    )
  }
}

TopSdgs.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  connect(state => ({
    auth: state.auth
  }))(TopSdgs)
)
