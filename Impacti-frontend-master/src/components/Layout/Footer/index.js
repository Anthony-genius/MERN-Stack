import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const footerBackground = {
  background: '#eeeeee'
}
const styles = theme => ({
  container: {
    position: 'fixed',
    bottom: '0',
    height: 'var(--footerAndHeaderHeight)',
    backgroundColor: '#eee',
    textAlign: 'center',
    alignItems: 'center',
    zIndex: '2'
  },

  open: {
    color: '#000',
    fontSize: '14px',
    textAlign: 'left',
    padding: '5px 35px',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },

  copyright: {
    color: '#000',
    fontSize: '14px',
    textAlign: 'right',
    padding: '5px 35px',
    '& a': {
      margin: '0 15px'
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      padding: '5px 10px'
    }
  }
})
class Footer extends Component {
  render() {
    const { classes } = this.props
    return (
      <Grid
        container
        className={classes.container}
        spacing={0}
        style={footerBackground}
      >
        <Grid item xs={12} md={6} className={classes.open}>
          Make Sustainability Your Business
        </Grid>
        <Grid item xs={12} md className={classes.copyright}>
          <a href="/terms-conditions" target="_blank">
            Terms & Conditions
          </a>
          &copy; {new Date().getFullYear()} Impacti
        </Grid>
      </Grid>
    )
  }
}
Footer.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Footer)
