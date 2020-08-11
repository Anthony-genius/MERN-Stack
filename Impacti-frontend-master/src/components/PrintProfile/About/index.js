import React from 'react'
import { Image, View, Text, StyleSheet } from '@react-pdf/renderer'
import BuildIcon from 'assets/pdf/build_black_96x96.jpg'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  aboutPaper: {
    opacity: 1,
    backgroundColor: '#ffffff',
    border: '1pt solid #ccc',
    margin: 4,
    padding: 16,
    borderRadius: 15
  },
  aboutHeader: {
    color: '#22ADBC',
    fontFamily: 'Roboto',
    fontSize: 14,
    marginBottom: 6
  },
  aboutText: {
    fontFamily: 'Roboto',
    fontSize: 8
  },
  factRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  keyFactPaper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    border: '1pt solid #ccc',
    margin: 4,
    padding: 16,
    borderRadius: 15
  },
  factButton: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ff6d00',
    borderRadius: 5,
    color: '#fff',
    padding: 4
  },
  factText: {
    display: 'flex',
    fontFamily: 'Roboto',
    fontSize: 8
  },
  factImage: {
    flexShrink: 0,
    height: 48,
    width: 48,
    marginBottom: 8
  },
  paperView: {
    width: '100%',
    padding: 4
  },
  mainPage: { padding: 8, display: 'flex' },
  mainRow: { width: '100%', display: 'flex', flexDirection: 'row' }
})

const About = ({ countries, courtryUrls, sectors, mission, description }) => {
  return (
    <View style={styles.mainPage}>
      <View style={styles.paperView} debug={false}>
        <Text style={styles.aboutHeader}>About</Text>
        <View style={styles.aboutPaper}>
          <Text style={styles.aboutText}>
            {description || 'Fill in your About here!'}
          </Text>
        </View>
      </View>

      <View style={styles.paperView}>
        <Text style={styles.aboutHeader}>Mission Statement</Text>
        <View style={styles.aboutPaper}>
          <Text style={styles.aboutText}>
            {mission || "What's your sustainability mission statement?"}
          </Text>
        </View>
      </View>
      <View style={styles.paperView}>
        <Text style={styles.aboutHeader}>Key Facts</Text>
        <View style={styles.factRow}>
          {countries.map(({ name }, i) => (
            <View style={styles.keyFactPaper} wrap={false} key={i}>
              <Image style={styles.factImage} src={courtryUrls[i]} />
              <View style={styles.factButton}>
                <Text style={styles.factText}>{name}</Text>
              </View>
            </View>
          ))}
          {sectors.map(({ name }, i) => (
            <View style={styles.keyFactPaper} wrap={false} key={name}>
              <Image style={styles.factImage} src={BuildIcon} />
              <View style={styles.factButton}>
                <Text style={styles.factText}>{name}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
About.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  courtryUrls: PropTypes.arrayOf(PropTypes.string),
  sectors: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  mission: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default About
