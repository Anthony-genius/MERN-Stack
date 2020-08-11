import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Header from './Header'
import Footer from './Footer'

const styles = theme => ({
  container: {
    background: '#3b3b3b',
    maxWidth: '100vw',
    margin: '0 auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  },
  content: {
    background: '#fff',
    margin: '60px 0 0 0',
    display: 'flex',
    flex: '1'
  }
})

const Layout = ({ classes, isLoggedIn, emailConfirmed, children }) => (
  <div className={classes.container}>
    <Header isLoggedIn={isLoggedIn} emailConfirmed={emailConfirmed} />
    <div className={classes.content}>{children}</div>
    <Footer />
  </div>
)
export default withStyles(styles)(Layout)
