import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import PlaceIcon from '@material-ui/icons/Place'
import SettingsIcon from '@material-ui/icons/Settings'
import ArrowIcon from '@material-ui/icons/ArrowUpward'
import RemoveIcon from '@material-ui/icons/Remove'
import LoadIcon from '@material-ui/icons/Cached'
import Tooltip from '@material-ui/core/Tooltip'
import SdgCard from './SdgCard'
import style from './style.module.css'
import rankAndMergeSdgs from '../../rankAndMergeSdgs'

const styles = theme => ({
  paper: {
    padding: '20px',
    width: '14vw',
    position: 'fixed'
  },
  cardsList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  '@media screen and (max-width: 768px)': {
    paper: {
      width: '70vw'
    }
  },
  mark1: {
    position: 'absolute',
    top: 12,
    left: 110,
    width: 250,
    background: '#1F1D1D',
    borderRadius: 0,
    padding: 15,
    fontSize: 12,
    [theme.breakpoints.down('sm')]: {
      top: -115,
      left: -115
    }
  },
  arrowTopLeft: {
    position: 'absolute',
    transform: 'rotate(53deg)',
    bottom: 68,
    right: 231,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderTop: '10px solid transparent',
      borderBottom: '10px solid transparent',
      borderRight: '55px solid #1F1D1D'
    },
    [theme.breakpoints.down('sm')]: {
      right: 6,
      bottom: 0,
      transform: 'rotate(317deg)',
      top: 66
    }
  }
})

class RecommendationsSdgs extends React.Component {
  state = {
    bottomCardsHidden: true,
    isFlipped: false
  }

  componentDidMount = () => {
    const { sectors, countries, countryToSdgs, allSdgs, sdgs } = this.props

    const sortedSdgs = rankAndMergeSdgs({
      countryToSdgs,
      countries,
      sectors,
      allSdgs,
      sdgs
    })
    if (sdgs.length === 0) {
      this.save({ sortedSdgs })
    }
  }

  toggleShowingBottomCards = () => {
    this.setState(({ bottomCardsHidden }) => ({
      bottomCardsHidden: !bottomCardsHidden
    }))
  }

  save = ({ sortedSdgs, newSdg }) => {
    const {
      updateMember,
      setSelectedSdgCount,
      member,
      dashboardMode
    } = this.props

    const selectedSdgs = sortedSdgs.filter(sdg => sdg.selected)

    const allSdgsSelected = sortedSdgs.filter(
      e =>
        selectedSdgs.some(
          selectedSdg => e.shortName === selectedSdg.shortName
        ) ||
        (newSdg && newSdg.shortName === e.shortName)
    )
    dashboardMode
      ? updateMember(member.id, { sdgs: allSdgsSelected })
      : updateMember({ sdgs: allSdgsSelected })

    setSelectedSdgCount(allSdgsSelected.length)
  }

  removeSdg = ({ sdg }) => {
    const {
      updateMember,
      setSelectedSdgCount,
      sdgs,
      member,
      dashboardMode
    } = this.props

    const sdgsFiltered = sdgs.filter(e => sdg && sdg.shortName !== e.shortName)

    dashboardMode
      ? updateMember(member.id, { sdgs: sdgsFiltered })
      : updateMember({ sdgs: sdgsFiltered })

    setSelectedSdgCount(sdgsFiltered.length)
  }

  flipCard = event => {
    event.preventDefault()
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }))
  }

  render() {
    const {
      classes,
      sectors,
      countries,
      countryToSdgs,
      allSdgs,
      sdgs,
      dashboardMode,
      open
    } = this.props
    const { bottomCardsHidden, isFlipped } = this.state

    const sortedSdgs = rankAndMergeSdgs({
      countryToSdgs,
      countries,
      sectors,
      allSdgs,
      sdgs
    })
    return (
      <div className={classes.cardsList}>
        {!dashboardMode && (
          <Card
            className={style.sideCards}
            onClick={this.flipCard}
            square={true}
          >
            <CardActionArea>
              {!isFlipped ? (
                <CardContent className={style.content}>
                  <Typography>
                    Get started with your top SDG Hotspots:
                  </Typography>
                  <Typography className={style.getStarted}>
                    <LoadIcon />
                  </Typography>
                  <Tooltip
                    open={open}
                    classes={{ tooltip: classes.mark1 }}
                    title={
                      <React.Fragment>
                        Click here to find out why these SDGs were prioritized
                        for you.
                        <span className={classes.arrowTopLeft} />
                      </React.Fragment>
                    }
                  >
                    <Typography>What's the methodology?</Typography>
                  </Tooltip>
                </CardContent>
              ) : (
                <CardContent className={style.methodology}>
                  <Typography component="h4">
                    What's the methodology?
                  </Typography>
                  <Typography>
                    Here you’ll find the SDGs listed in order of relevance to
                    your business, considering:{' '}
                  </Typography>
                  <div className={style.left}>
                    <PlaceIcon />
                    <Typography>SDGs at risk where you operate</Typography>
                  </div>
                  <div className={style.left}>
                    <SettingsIcon />
                    <Typography>
                      SDGs negatively impacted by current practices in your
                      sector
                    </Typography>
                  </div>
                  <div className={style.left}>
                    <ArrowIcon />
                    <Typography>
                      SDGs that your sector has expertise to lead innovations
                    </Typography>
                  </div>
                  <CardActions className={style.link}>
                    <Typography
                      component={Link}
                      to="/assessment/business-and-goals/country"
                    >
                      Click here
                    </Typography>
                  </CardActions>
                  <Typography className={style.linkText}>
                    to change your parameters to see how it changes your
                    listing.
                  </Typography>
                </CardContent>
              )}
            </CardActionArea>
          </Card>
        )}
        {sortedSdgs.slice(0, 3).map((sdg, i) => (
          <div key={sdg.shortName}>
            <SdgCard
              index={i}
              sdg={sdg}
              open={open}
              styles={styles}
              toggleCard={
                !sdg.selected
                  ? () => this.save({ sortedSdgs, newSdg: sdg })
                  : () => this.removeSdg({ sdg })
              }
            />
          </div>
        ))}
        {!bottomCardsHidden &&
          sortedSdgs.slice(3, 17).map((sdg, i) => (
            <div key={sdg.shortName}>
              <SdgCard
                index={i}
                sdg={sdg}
                open={open}
                styles={styles}
                toggleCard={
                  !sdg.selected
                    ? () => this.save({ sortedSdgs, newSdg: sdg })
                    : () => this.removeSdg({ sdg })
                }
              />
            </div>
          ))}
        <Card className={style.sideCards} square={true}>
          <CardContent>
            <Typography>
              {!bottomCardsHidden
                ? 'You have selected to see all 17 Sustainability Development Goals.'
                : 'Still curious? You can explore more SDGs.'}
            </Typography>
            <Typography
              className={style.moreOrLess}
              onClick={this.toggleShowingBottomCards}
            >
              {!bottomCardsHidden ? <RemoveIcon /> : <AddIcon />}
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default connect(state => ({
  allSdgs: state.dictionaries.sdg,
  countryToSdgs: state.dictionaries.countrySdg,
  countries: state.assessmentWizard.countries,
  allSectors: state.dictionaries.sector,
  sectors: state.assessmentWizard.sectors,
  industries: state.assessmentWizard.industries,
  member: state.assessmentWizard,
  sdgs: state.assessmentWizard.sdgs
}))(withStyles(styles)(RecommendationsSdgs))
