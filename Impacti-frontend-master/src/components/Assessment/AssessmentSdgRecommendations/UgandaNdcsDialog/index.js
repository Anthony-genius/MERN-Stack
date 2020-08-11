/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import CloseIcon from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'
import ugandaNdcs from '../../ugandaNdcs.js'
import crossCuttingSdgs from '../../crossCuttingSdgs.js'

function getDialogStyle() {
  return {
    bottom: 0,
    left: 0,
    right: 0
  }
}

const useStyles = makeStyles(theme => ({
  paper: {
    overflow: 'scroll',
    position: 'absolute',
    width: '80vw',
    height: '90vh',
    maxWidth: 1600,
    background: '#eee',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 6),
    borderRadius: 0,
    bottom: 0,
    [theme.breakpoints.down('xs')]: {
      width: '95vw',
      margin: '0 auto',
      bottom: 50
    }
  },
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3)
  },
  closeIcon: {
    float: 'right'
  },
  logoImage: {
    width: 100,
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(20),
    display: 'block'
  },
  oppoList: {
    display: 'flex',
    alignItems: 'flex-start',
    background: '#fff',
    margin: theme.spacing(2, 0),
    padding: theme.spacing(0, 1)
  },
  sdgList: {
    display: 'flex',
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      overflow: 'auto'
    }
  },
  sdgImage: {
    width: 50,
    height: 50,
    margin: theme.spacing(1)
  },
  crossSdg: {
    position: 'relative'
  },
  sdg: {
    height: 170,
    background: '#fff',
    padding: theme.spacing(1, 0, 9, 1)
  },
  crossSdgImage: {
    width: 100,
    position: 'absolute',
    bottom: 0,
    right: 40
  },
  closeButton: {
    display: 'flex',
    margin: '65px auto 25px'
  }
}))

export default function UgandaNdcsDialog(props) {
  const classes = useStyles()
  const [dialogStyle] = React.useState(getDialogStyle)
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <ImpactiButton
        type="button"
        onClick={handleOpen}
        variant="outlined"
        buttonType={BUTTON_TYPES.BLANK_BLUE}
      >
        Show Uganda's NDCs
      </ImpactiButton>
      <Dialog
        classes={{ paper: classes.paper }}
        open={open}
        onClose={handleClose}
      >
        <div style={dialogStyle} className={classes.paper}>
          <IconButton
            className={classes.closeIcon}
            aria-label="delete"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <div>
            <Grid container spacing={3}>
              {ugandaNdcs.map(ndc => (
                <Grid
                  container
                  className={classes.container}
                  spacing={3}
                  key={ndc.sector}
                >
                  <Grid item xs={12} lg={4}>
                    <Typography variant="h3">{ndc.sector}</Typography>
                    <img
                      className={classes.logoImage}
                      src={require('assets/E-SDG-goals-icons-full-rgb-' +
                        ndc.logo +
                        '.png')}
                      alt={ndc.sector}
                    />
                  </Grid>
                  <Grid item xs={12} lg={8} alignContent={'flex-end'}>
                    {ndc.opportunities.map(oppo => (
                      <div className={classes.oppoList}>
                        <div>
                          <Typography variant="h6">{oppo.name}</Typography>
                          {oppo && oppo.subTitle && (
                            <Typography>{oppo.subTitle}</Typography>
                          )}
                        </div>
                        <div className={classes.sdgList}>
                          {oppo.sdgs.map(sdg => (
                            <img
                              className={classes.sdgImage}
                              src={require('assets/E-SDG-goals-icons-full-rgb-' +
                                sdg +
                                '.png')}
                              alt={ndc.sector}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Grid container spacing={6} className={classes.container}>
              <Grid item xs={12}>
                <Typography variant="h3">Cross-cutting SDGs</Typography>
              </Grid>
              {crossCuttingSdgs.map(s => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  key={s.title}
                  className={classes.crossSdg}
                >
                  <div className={classes.sdg}>
                    <Typography variant="h6">{s.title}</Typography>
                    {s && s.subTitle && <Typography>{s.subTitle}</Typography>}
                  </div>
                  <img
                    className={classes.crossSdgImage}
                    src={require('assets/E-SDG-goals-icons-full-rgb-' +
                      s.sdg +
                      '.png')}
                    alt={s.title}
                  />
                </Grid>
              ))}
            </Grid>
            <ImpactiButton
              type="button"
              onClick={handleClose}
              variant="contained"
              buttonType={BUTTON_TYPES.CLOSE}
              className={classes.closeButton}
            >
              <CloseIcon />{' '}
            </ImpactiButton>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
