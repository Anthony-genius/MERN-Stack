import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ImpactiButton, { BUTTON_TYPES } from 'components/ImpactiButton'
import moduleStyles from '../../style.module.css'

import AssessmentSdgsAndImpactAreas from '../../../AssessmentSdgsAndImpactAreas'
import ScrollToTop from '../../../ScrollToTop'

const style = theme => ({
  container: {
    width: '75vw',
    margin: '0 auto',
    maxWidth: '1080px',
    [theme.breakpoints.down('xs')]: {
      width: '100vw'
    }
  },
  understanding: {
    padding: '20px',
    '& h2': {
      color: 'var(--secondaryColor)',
      textAlign: 'center',
      margin: '0 auto 50px',
      fontSize: '2.2em',
      [theme.breakpoints.down('xs')]: {
        lineHeight: '1em'
      }
    },
    '& p': {
      fontSize: '1.1em',
      margin: '0',
      fontWeight: '200'
    }
  },

  h3: {
    fontSize: '1.1em',
    fontWeight: '600',
    margin: '0'
  },
  profile: {
    marginBottom: '30px',
    '& section': {
      margin: 0
    },
    '& h2': {
      color: '#fff',
      textAlign: 'center',
      margin: '0 auto',
      padding: 25,
      fontSize: '2.2em',
      background: 'var(--primaryColor)',
      [theme.breakpoints.down('xs')]: {
        lineHeight: '1em'
      }
    },
    '& h4': {
      textAlign: 'left',
      color: 'var(--secondaryColor)',
      width: '10vw',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        textAlign: 'center'
      }
    },
    '& p': {
      textAlign: 'left'
    },
    '& hr': {
      height: 5,
      background: '#f2f2f2',
      border: 'none'
    }
  },
  summary: {
    textAlign: 'center !important',
    fontWeight: 400
  },
  register: {
    display: 'flex',
    padding: 15,
    width: '75%',
    margin: '0 auto',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse'
    },
    '& button': {
      padding: '0 25px',
      margin: '0 15px',
      [theme.breakpoints.down('xs')]: {
        whiteSpace: 'nowrap'
      }
    },
    '& p': {
      fontWeight: 700
    }
  },
  next: {
    marginBottom: '100px'
  },
  greyBox: {
    background: '#f2f2f2',
    padding: '80px 0 20px',
    margin: '15px auto',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column'
    },
    '& h2': {
      textAlign: 'left',
      background: '#3b3b3b',
      fontSize: 40,
      width: 250,
      padding: '15px 10px',
      color: '#fff',
      margin: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        textAlign: 'center'
      }
    },
    '& p': {
      fontWeight: '600'
    },
    '& button': {
      margin: '0 auto 30px',
      display: 'block'
    }
  },
  nextP: {
    position: 'absolute',
    top: 0,
    left: 270,
    margin: 0,
    display: 'inline-block',
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
      left: 0,
      padding: theme.spacing.unit * 2,
      textAlign: 'center'
    }
  },
  list: {
    width: '60%',
    margin: '0 auto',
    fontWeight: '200',
    '& p:first-child': {
      fontWeight: 500,
      marginLeft: 0,
      '&::before': {
        content: '" "'
      }
    },
    '& p': {
      fontWeight: 300,
      marginLeft: 5,
      '&::before': {
        content: '"▣"',
        marginRight: 5
      }
    }
  },
  sdgTitle: {
    fontSize: '24px',
    paddingLeft: '15px'
  }
})

class AssessmentSdgProfile extends Component {
  constructor(props, context) {
    super(props, context)

    const { dictionaries, member } = props
    this.state = {
      questions:
        dictionaries &&
        dictionaries.baseAssessmentQuestion &&
        dictionaries.baseAssessmentQuestion.filter(q => {
          const questionSdgs = q.sdgs.map(({ shortName }) => shortName)

          return questionSdgs.some(e => member.sdgs.includes(e))
        })
    }
  }

  render() {
    const { classes, nextStep, member } = this.props

    return (
      <div className={moduleStyles.paperContainerWrapper}>
        <ScrollToTop />
        <div className={classes.container}>
          <div className={classes.understanding}>
            <h2>Understanding your assessment</h2>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h3>Why commit to the SDGs?</h3>
                <p>
                  The Sustainable Development Goals are expected to open up over
                  US$12 trillion in new market opportunities and create 380
                  million new jobs. It’s a great time to explore opportunities
                  to align your business operations to the SDGs. By doing so,
                  you can access new markets and capital, attract dedicated
                  staff and customers, and make your business more resilient.
                  With this assessment now complete, you’re on your way to being
                  recognized for your SDG actions and leadership.
                </p>
              </Grid>
              <Grid item xs={12} md={6}>
                <h3>How to align your business to the SDGs?</h3>
                <p>
                  No one business can - or should - tackle all 17 SDGs. Instead,
                  companies can prioritize the SDGs most relevant to their
                  operations and identify opportunities to take meaningful
                  actions that create shared value for their business and
                  society. The SDGs can help companies define a resilient,
                  profitable business growth strategy.
                </p>
              </Grid>
              <Grid item xs={12} md={6}>
                <h3>What opportunities make sense for my business?</h3>
                <p>
                  Through this assessment, you received a high-level
                  prioritization of the SDGs most relevant to your business -
                  considering where you operate and your sector’s potential to
                  reduce negative impacts and drive new innovations. But the
                  choice is yours. Your profile highlights areas where you’re
                  already taking action and those you’re interested in setting
                  as a sustainability target to come.
                </p>
              </Grid>
            </Grid>
          </div>
          <div className={classes.profile}>
            <h2>Your Sustainable Business Profile</h2>
            <section>
              <p className={classes.summary}>
                Here is a high-level summary of your business’ SDG
                opportunities.
              </p>
              <hr />
              <div className={classes.register}>
                <ImpactiButton
                  variant="contained"
                  onClick={nextStep}
                  buttonType={BUTTON_TYPES.REGISTER_YOUR_PROFILE}
                />
                <p>
                  Want to add detail and personalize your profile?
                  <br />
                  Join Impacti CONNECT to access these and more features!
                </p>
              </div>
              <hr />
            </section>
            <AssessmentSdgsAndImpactAreas member={member} />
          </div>
          <div className={classes.next}>
            <section className={classes.greyBox}>
              <h2>What’s next?</h2>
              <p className={classes.nextP}>
                Congratulations! <br />
                You’re on your way to building up your business’ SDG leadership.
                Don’t stop now!
              </p>
              <ImpactiButton
                variant="contained"
                onClick={nextStep}
                buttonType={BUTTON_TYPES.REGISTER_YOUR_PROFILE}
              />
              <div className={classes.list}>
                <p>
                  Sign up now for membership in Impacti CONNECT to access these
                  benefits:
                </p>
                <p>
                  Join a network of SDG business leaders & partners to build up
                  collaborations
                </p>
                <p>
                  Keep updated on the latest SDG business news, resources and
                  opportunities
                </p>
                <p>
                  Share your Sustainable Business Profile and expand it with
                  your initiatives & new targets
                </p>
                <p>
                  Receive members-only access to Impacti sustainability business
                  insights & tools
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

AssessmentSdgProfile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(
  state => ({
    member: state.assessmentWizard
  }),
  dispatch => ({
    nextStep: () => dispatch(push('/sign-up/email'))
  })
)(withStyles(style)(AssessmentSdgProfile))
