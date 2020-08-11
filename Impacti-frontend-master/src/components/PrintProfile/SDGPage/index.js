import React from 'react'
import { Page, Image, View, Text, StyleSheet } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import OperationLocation from 'assets/Operation Location.jpg'
import CurrentPractices from 'assets/Current Practices.jpg'
import LeadInnovation from 'assets/Lead Innovation.jpg'
//import BulletPoint from 'assets/Lead Innovation.jpg'
import BulletPoint from 'assets/pdf/bulletPoint.jpg'
import Footer from '../Footer'
import UserHeader from '../UserHeader'

const reasonMap = {
  country: 'Operation Location',
  opportunity: 'Current Practices',
  leadership: 'Lead Innovation'
}
const imageMap = {
  country: OperationLocation,
  opportunity: CurrentPractices,
  leadership: LeadInnovation
}

const styles = StyleSheet.create({
  titleContainer: {
    marginLeft: 16,
    marginTop: 16,
    width: '100%',
    height: 30
  },
  title: {
    color: '#22ADBC',
    fontFamily: 'Roboto',
    fontSize: 18
  },
  sdgImage: {
    display: 'flex',
    height: 64,
    width: 64,
    marginLeft: 0,
    padding: 0,
    paddingLeft: 0
  },
  reasonImage: { height: 24, width: 24 },
  table: { display: 'flex', width: '100%' },
  tr: {
    flexDirection: 'row',
    padding: 4
  },
  td: {
    width: '25%',
    padding: 2
  },
  tt: {
    marginTop: 5,
    fontFamily: 'Roboto',
    fontSize: 10
  },
  th: {
    marginTop: 5,
    marginLeft: 'auto',
    marginRight: 8,
    fontSize: 12,
    color: '#22adbc',
    fontFamily: 'Roboto-Bold'
  },
  baseAssessmentFocusCardRow: {
    padding: 2,
    width: '70%',
    display: 'flex'
  },
  baseAssessmentFocusCard: {
    width: '70%',
    margin: 8,
    padding: 2
  },
  baseAssessmentFocusByPath: {
    backgroundColor: '#fff',
    padding: 8,
    paddingTop: 0,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    width: '100%'
  },
  header: {
    color: '#22ADBC',
    fontFamily: 'Roboto',
    fontSize: 18
  }
})

const maxLineLength = 120
const maxLines = 10

const SDGPage = ({
  heroImage,
  image,
  username,
  sdg,
  imageUrl,
  baseAssessmentFocuses,
  customFocuses
}) => {
  const { recoWhat, recoWhy, text, reason } = sdg
  const focuses =
    customFocuses.length > 0 ? customFocuses : baseAssessmentFocuses

  const breakpoints = focuses.map(({ focusArea, focusByPath }, i) => {
    let lineCount = 0
    const j = focusByPath.map(({ title }, j) => {
      lineCount += 1 + Math.floor(title.length / maxLineLength)
      if (lineCount > maxLines) {
        lineCount = 0
        return true
      } else return false
    })
    return j
  })
  return focuses.map(({ focusArea, focusByPath }, i) => (
    <Page size="A4" orientation={'landscape'} key={i}>
      <UserHeader heroImage={heroImage} image={image} username={username} />
      <View style={styles.titleContainer} debug={false} fixed>
        <Text style={styles.header}>How we make impact</Text>
      </View>
      <View
        style={{
          paddingLeft: 0,
          marginLeft: 16,
          marginRight: 16,
          width: '90%'
        }}
        fixed
      >
        <Image style={styles.sdgImage} src={imageUrl} />
      </View>
      <View style={styles.table}>
        {i === 0 && (
          <>
            <View style={styles.tr}>
              <View style={styles.td}>
                <Text style={styles.th}>Why it matters</Text>
              </View>
              {reason.map(r => (
                <View style={{ ...styles.td, flexDirection: 'row' }} key={r}>
                  <Image style={styles.reasonImage} src={imageMap[r]} />
                  <Text style={styles.tt}>{reasonMap[r]}</Text>
                </View>
              ))}
              {[...Array(3 - reason.length)].map((n, i) => (
                <View style={styles.td} key={i} />
              ))}
            </View>
            <View style={styles.tr}>
              <View style={styles.td}>
                <Text style={styles.th}>The challenge</Text>
              </View>
              <View style={{ ...styles.td, width: '70%' }}>
                <Text style={styles.tt}>
                  {text ? text : `${recoWhat} ${recoWhy}`}
                </Text>
              </View>
            </View>
          </>
        )}
        <View key={i} style={styles.tr} debug={false}>
          <View style={styles.td} fixed>
            <Text style={{ ...styles.th, marginTop: 30 }}>
              Our Impact Areas
            </Text>
          </View>
          <View style={styles.baseAssessmentFocusCardRow} debug={false}>
            <Text
              debug={false}
              fixed
              style={{
                ...styles.tt,
                marginLeft: 90,
                marginBottom: 16,
                fontSize: 16
              }}
            >
              {focusArea}
            </Text>
            <View debug={false} style={styles.baseAssessmentFocusByPath}>
              {focusByPath.map(({ title }, j) => (
                <View
                  break={i === 0 && breakpoints[i][j]}
                  //break={i === 0 && j === 3}
                  debug={false}
                  wrap={false}
                  key={j}
                  style={{ display: 'flex', flexDirection: 'row' }}
                >
                  <Image
                    debug={false}
                    style={{
                      width: 24,
                      height: 24,
                      paddingTop: 6,
                      paddingBottom: 6,
                      marginRight: 8
                    }}
                    src={BulletPoint}
                  />
                  <Text
                    debug={false}
                    style={{
                      marginTop: 5,
                      fontSize: 10,
                      fontFamily: 'Roboto'
                    }}
                  >
                    {title}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </Page>
  ))
}
SDGPage.propTypes = {
  heroImage: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  sdg: PropTypes.shape({
    shortName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    recoWhat: PropTypes.string.isRequired,
    recoWhy: PropTypes.string.isRequired,
    reason: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  baseAssessmentFocuses: PropTypes.arrayOf(
    PropTypes.shape({
      focusArea: PropTypes.string.isRequired,
      focusByPath: PropTypes.arrayOf(
        PropTypes.shape({ title: PropTypes.string.isRequired })
      ).isRequired
    })
  ).isRequired,
  customFocuses: PropTypes.arrayOf(
    PropTypes.shape({
      focusArea: PropTypes.string.isRequired,
      focusByPath: PropTypes.arrayOf(
        PropTypes.shape({ title: PropTypes.string.isRequired })
      ).isRequired
    })
  ).isRequired,
  imageUrl: PropTypes.string.isRequired
}
SDGPage.defaultProps = {}

export default SDGPage
