import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Slider from 'react-slick'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'

import { getMember } from 'actions/assessmentWizard'

import '../../../../../node_modules/slick-carousel/slick/slick.css'
import '../../../../../node_modules/slick-carousel/slick/slick-theme.css'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 4
  },
  carouselOneImage: {
    width: '100%'
  },
  boostImage: {
    width: '100%',
    paddingBottom: theme.spacing.unit * 2
  }
})

class SdgCarousel extends React.Component {
  componentDidMount = () => {
    const { auth, getMember } = this.props
    if (
      auth.user &&
      auth.user.organization &&
      auth.user.organization.rootMember
    ) {
      getMember(auth.user.organization.rootMember)
    }
  }

  render() {
    const settings = {
      autoplay: true,
      autoplaySpeed: 10000,
      arrows: false,
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    const { classes, assessmentWizard } = this.props

    const countriesContainsGhana =
      assessmentWizard &&
      assessmentWizard.countries &&
      assessmentWizard.countries.some(e => e.name === 'Ghana')

    const slideTwoText = countriesContainsGhana ? (
      <Typography>
        Ready to manage and report on your impacts? Interested in being
        recognized across your industry as an SDG business leader setting best
        practice benchmarks and contributing to sustainability management
        systems beyond your own scope? Join our{' '}
        <a href={require('assets/Ghana_Impacti_Ambassador_Program.pdf')}>
          SDG Ambassador Program
        </a>{' '}
        to jointly build more systematic, efficient and digital management tools
        to drive sustainability in Ghana!
      </Typography>
    ) : (
      <Typography>
        Ready to manage and report on your impacts? Interested in being
        recognized across your industry as an SDG business leader setting best
        practice benchmarks and contributing to sustainability management
        systems? <a href="mailto:discover@impacti.solutions">Contact us</a> to
        discuss how we can jointly build more systematic, efficient and digital
        management tools to drive sustainability in your location and sector!
      </Typography>
    )

    return (
      <Paper className={classes.paper}>
        <Slider {...settings}>
          <div>
            <img
              className={classes.carouselOneImage}
              src={require('assets/impacti_tools-connect.png')}
              alt="sectors"
            />
          </div>
          <div>
            <Typography
              className={classes.carouselTwoTitle}
              variant="h6"
              align="center"
            >
              Learn About: Impact and Goals
            </Typography>
            {slideTwoText}
          </div>
          <div>
            <img
              className={classes.boostImage}
              src={require('assets/boost.png')}
              alt="sectors"
            />
            <Typography>
              Interested in customizing tools for your needs? Not sure where to
              start and in need to discuss priorities and scoping sustainability
              management for your purposes? Our Impacti BOOST experts are
              available to support you along your sustainability journey.
            </Typography>
          </div>
        </Slider>
      </Paper>
    )
  }
}

export default withStyles(styles)(
  connect(
    state => ({
      auth: state.auth,
      assessmentWizard: state.assessmentWizard
    }),
    dispatch => ({
      getMember: getMember(dispatch)
    })
  )(SdgCarousel)
)
