import React from 'react'
import PropTypes from 'prop-types'
import {
  BlobProvider,
  Document,
  Page,
  StyleSheet,
  Font
} from '@react-pdf/renderer'
import { connect } from 'react-redux'
import Jimp from 'jimp'
import { chunk } from 'lodash'

import Button from '@material-ui/core/Button'
import PdfIcon from '@material-ui/icons/PictureAsPdfRounded'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import rankAndMergeSdgs from 'components/Assessment/rankAndMergeSdgs'
import RobotoSrc from 'assets/fonts/Roboto-Regular.ttf'
import RobotoBoldSrc from 'assets/fonts/Roboto-Bold.ttf'
import SDGPage from './SDGPage'
import Footer from './Footer'
import About from './About'
import TableOfContents from './TableOfContents'
import OverView from './OverView'
import CoverPage from './CoverPage'
import Introduction from './Introduction'
import WayForward from './WayForward'
import UserHeader from './UserHeader'

Font.register({
  family: 'Roboto',
  src: RobotoSrc
})
Font.register({
  family: 'Roboto-Bold',
  src: RobotoBoldSrc
})

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'flex-start'
  },
  col: {
    flex: 1
  },
  pdfLink: { color: '#000000 !important' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignContent: 'flex-start'
  },
  paperView: {
    flex: 1,
    alignSelf: 'flex-start',
    padding: 12
  },
  aboutHeader: {
    fontFamily: 'Roboto',
    fontSize: 14,
    marginBottom: 6
  },
  mainPage: { padding: 8, display: 'flex' },
  mainRow: { width: '100%', display: 'flex', flexDirection: 'row' }
})

const getBaseAssessmentAnswers = (sdg, baseAssessmentAnswers) => {
  const baseAssessmentAnswer = baseAssessmentAnswers.find(
    baseAssessmentAnswer => baseAssessmentAnswer.sdg._id === sdg._id
  )
  return baseAssessmentAnswer
    ? baseAssessmentAnswer
    : { baseAssessmentFocuses: [{ focusByPath: [] }], customFocuses: [] }
}

const Profile = props => {
  const {
    username,
    heroImage,
    image,
    sdgs,
    imageUrls,
    courtryUrls,
    baseAssessmentAnswers,
    countries,
    description,
    mission,
    sectors
  } = props

  const sdgGroups = chunk(sdgs, 3)
  const imageUrlGroups = chunk(imageUrls, 3)

  return (
    <Document title="Profile Page">
      <Page size="A4" orientation={'landscape'} style={styles.page}>
        <CoverPage image={image} username={username} />
        <Footer invert={true} />
      </Page>
      <Page size="A4" orientation={'landscape'} style={styles.page}>
        <UserHeader heroImage={heroImage} image={image} username={username} />
        <TableOfContents sdgs={sdgs} />
        <Footer />
      </Page>
      <Page size="A4" orientation={'landscape'} style={styles.page}>
        <UserHeader heroImage={heroImage} image={image} username={username} />
        <Introduction companyName={username} />
        <Footer />
      </Page>
      <Page size="A4" orientation={'landscape'} style={styles.page}>
        <UserHeader heroImage={heroImage} image={image} username={username} />
        <About
          countries={countries}
          courtryUrls={courtryUrls}
          sectors={sectors}
          mission={mission}
          description={description}
          username={username}
        />
        <Footer />
      </Page>
      {sdgGroups.map((sdgGroup, i) => {
        return (
          <Page size="A4" orientation={'landscape'} style={styles.page} key={i}>
            <UserHeader
              heroImage={heroImage}
              image={image}
              username={username}
            />
            <OverView key={i} sdgs={sdgGroup} imageUrls={imageUrlGroups[i]} />
            <Footer />
          </Page>
        )
      })}

      {sdgs.map((sdg, i) => {
        return (
          <SDGPage
            key={i}
            heroImage={heroImage}
            image={image}
            username={username}
            sdg={sdg}
            imageUrl={imageUrls[i]}
            baseAssessmentFocuses={
              getBaseAssessmentAnswers(sdg, baseAssessmentAnswers)
                .baseAssessmentFocuses
            }
            customFocuses={
              getBaseAssessmentAnswers(sdg, baseAssessmentAnswers).customFocuses
            }
          />
        )
      })}
      <Page size="A4" orientation={'landscape'} style={styles.page}>
        <UserHeader heroImage={heroImage} image={image} username={username} />
        <WayForward />
        <Footer />
      </Page>
    </Document>
  )
}
Profile.propTypes = {
  sdgs: PropTypes.arrayOf(
    PropTypes.shape({
      sdg: PropTypes.shape({
        shortName: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        recoWhat: PropTypes.string.isRequired,
        reason: PropTypes.arrayOf(PropTypes.string)
      })
    })
  ).isRequired,
  tagGroups: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          userCreated: PropTypes.bool.isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired,
  workersNumber: PropTypes.number,
  countries: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  courtryUrls: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string.isRequired,
  mission: PropTypes.string.isRequired,
  sectors: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  baseAssessmentAnswers: PropTypes.arrayOf(
    PropTypes.shape({
      baseAssessmentFocuses: PropTypes.arrayOf(
        PropTypes.shape({
          focusArea: PropTypes.string.isRequired,
          focusByPath: PropTypes.arrayOf(
            PropTypes.shape({ title: PropTypes.string.isRequired })
          ).isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

const connectedTag = tag =>
  connect(state => ({
    auth: state.auth,
    tagGroups: state.tags.followedTags,
    allSdgs: state.dictionaries.sdg,
    countryToSdgs: state.dictionaries.countrySdg,
    countries: state.assessmentWizard.countries,
    allSectors: state.dictionaries.sector,
    sectors: state.assessmentWizard.sectors,
    workersNumber: state.assessmentWizard.workersNumber,
    baseAssessmentAnswers: state.assessmentWizard.baseAssessmentAnswers,
    customChallenges: state.assessmentWizard.customChallenges,
    description: state.assessmentWizard.description,
    mission: state.assessmentWizard.mission,
    id: state.assessmentWizard.id,
    sdgs: state.assessmentWizard.sdgs
  }))(tag)

export const PDFLink = connectedTag(
  ({
    auth,
    tagGroups,
    sdgs,
    allSdgs,
    countryToSdgs,
    countries,
    sectors,
    workersNumber,
    description,
    mission,
    customChallenges,
    baseAssessmentAnswers,
    id,
    setIsReady
  }) => {
    const [imageUrls, setImageUrls] = React.useState([])
    React.useEffect(() => {
      if (sdgs.length !== imageUrls.length) {
        Promise.all(
          sdgs.map(({ shortName }) =>
            import(`assets/E-SDG-goals-icons-full-rgb-${shortName}.png`)
          )
        )
          .then(data => {
            setImageUrls(data.map(i => i.default))
          })
          .catch(e => console.error(e))
      }
    }, [sdgs, imageUrls])
    const [courtryUrls, setCourtryUrls] = React.useState([])
    React.useEffect(() => {
      if (countries.length !== courtryUrls.length) {
        Promise.all(
          countries.map(({ name }) =>
            import(`assets/countries/${name.toLowerCase()}.jpg`)
          )
        )
          .then(data => {
            setCourtryUrls(data.map(i => i.default))
          })
          .catch(e => console.error(e))
      }
    }, [countries, courtryUrls])

    const [defaultImages, setDefaultImages] = React.useState({
      image: null,
      heroImage: null
    })
    React.useEffect(() => {
      Promise.all([
        import('assets/beach.jpg'),
        import('assets/user-default.png')
      ])
        .then(data => {
          setDefaultImages({
            heroImage: data[0].default,
            image: data[1].default
          })
        })
        .catch(e => console.error(e))
    }, [])
    const [userImages, setUserImages] = React.useState({
      image: null,
      heroImage: null,
      done: false
    })
    React.useEffect(() => {
      const convertImages = async () => {
        const { image, heroImage, username } =
          auth && auth.user ? auth.user : {}
        if (username) {
          let userImage = null
          let userHeroImage = null
          try {
            if (image) {
              userImage = await Jimp.read(
                image.startsWith('data') ? image : `${image}?donotremovethis`
              )
              if (userImage.hasAlpha()) {
                userImage.background(Jimp.cssColorToHex('#ffffff'))
              }
              userImage =
                userImage._originalMime === 'image/png'
                  ? await userImage.getBase64Async(Jimp.MIME_JPEG)
                  : image
            }

            if (heroImage) {
              userHeroImage = await Jimp.read(
                heroImage.startsWith('data')
                  ? heroImage
                  : `${heroImage}?donotremovethis`
              )
              if (userHeroImage.hasAlpha()) {
                userHeroImage.background(Jimp.cssColorToHex('#ffffff'))
              }
              userHeroImage =
                userHeroImage._originalMime === 'image/png'
                  ? await userHeroImage.getBase64Async(Jimp.MIME_JPEG)
                  : heroImage
            }
          } catch (e) {
            console.error(e)
          }

          setUserImages({
            image: userImage,
            heroImage: userHeroImage,
            done: true
          })
        } else {
          setUserImages({
            image: null,
            heroImage: null,
            done: true
          })
        }
      }
      convertImages()
    }, [auth])
    if (
      !(
        imageUrls.length > 0 &&
        courtryUrls.length > 0 &&
        auth &&
        auth.user &&
        id &&
        defaultImages.heroImage &&
        defaultImages.image &&
        userImages.done
      )
    ) {
      return 'Building .pdf'
    }
    const { username } = auth && auth.user ? auth.user : {}

    const allSdgsWithReasons = rankAndMergeSdgs({
      countryToSdgs,
      countries,
      sectors,
      allSdgs,
      sdgs
    })
    const sdgsWithReason = allSdgsWithReasons.filter(i =>
      sdgs.some(j => j._id === i._id)
    )
    const sdgsWithReasonCustomText = sdgsWithReason.map(s => {
      const custom = customChallenges.find(c => c.sdg._id === s._id)
      return custom ? { ...s, text: custom.text } : s
    })

    return (
      <BlobProvider
        document={
          <Profile
            username={username}
            heroImage={userImages.heroImage || defaultImages.heroImage}
            image={userImages.image || defaultImages.image}
            tagGroups={tagGroups}
            sdgs={sdgsWithReasonCustomText}
            imageUrls={imageUrls}
            courtryUrls={courtryUrls}
            baseAssessmentAnswers={baseAssessmentAnswers}
            workersNumber={workersNumber}
            countries={countries}
            sectors={sectors}
            description={description}
            mission={mission}
          />
        }
      >
        {({ url }) => {
          if (!url) return 'Building .pdf'
          else {
            setIsReady(true)
            return (
              <a href={url} target="_blank" rel="noopener noreferrer ">
                Download .pdf
              </a>
            )
          }
        }}
      </BlobProvider>
    )
  }
)
PDFLink.propTypes = {
  setIsReady: PropTypes.func,
  customChallenges: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      sdg: PropTypes.shape({ _id: PropTypes.string.isRequired })
    })
  )
}

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(0),
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12
  }
}))

export const PDFButton = ({ btnClass }) => {
  const classes = useStyles()
  const [buildPdf, setBuildPdf] = React.useState(false)
  const [isReady, setIsReady] = React.useState(false)

  return (
    <div className={classes.wrapper}>
      <Button
        aria-label="Edit Profile"
        variant="contained"
        color="primary"
        className={btnClass}
        disabled={buildPdf && !isReady}
      >
        <>
          <PdfIcon />
          {buildPdf ? (
            <PDFLink setIsReady={setIsReady} />
          ) : (
            <span onClick={() => setBuildPdf(true)}>Create PDF</span>
          )}
        </>
      </Button>
      {buildPdf && !isReady && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  )
}
