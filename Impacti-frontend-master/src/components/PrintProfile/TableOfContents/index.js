import tocImage from 'assets/pdf/tocImage.png'
import React from 'react'
import { Image, View, Text, StyleSheet } from '@react-pdf/renderer'
import PropTypes from 'prop-types'

const intro = `The SDGs provide all businesses with a new lens through which to translate the world's needs and ambitions into business solutions. These solutions will enable companies to better manage their risks, anticipate consumer demand, build positions in growth markets, secure access to needed resources and strengthen their supply chains, while moving the world towards a sustainable and inclusive development path.`

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  tocImage: {
    height: 440,
    width: 440
  },
  tocHeader: {
    position: 'absolute',
    top: 50,
    left: 60,
    width: 240,
    color: '#22ADBC',
    fontFamily: 'Roboto',
    fontSize: 18
  },
  toc: {
    position: 'absolute',
    top: 50,
    left: 420,
    fontFamily: 'Roboto',
    fontSize: 10,
    width: 410,
    maxHeight: 300,
    //border: '1pt solid #ccc',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap'
  },
  tocCol: { paddingLeft: 8, width: 205 }
})

const TableOfContents = ({ sdgs, intro }) => (
  <View style={styles.container} debug={false}>
    <View style={styles.imageContainer}>
      <Image style={styles.tocImage} src={tocImage} />
    </View>
    <Text style={styles.tocHeader}>{intro}</Text>
    <View style={styles.toc}>
      <Text style={styles.tocCol}>Introduction</Text>
      <Text style={styles.tocCol}>Why comment to the SDG?</Text>
      <Text style={styles.tocCol}>
        What are the benefits to aligning with the SDGs?
      </Text>
      <Text style={styles.tocCol}>Assess your priority SDGs</Text>
      <Text style={styles.tocCol}>Your business characteristics</Text>
      <Text style={styles.tocCol}>Ranking factors</Text>
      <Text style={styles.tocCol}>
        Impacti Framework of SDG Impact Opportunities
      </Text>
      <Text style={styles.tocCol}>Identify impact opportunities</Text>
      <Text style={styles.tocCol}>Strategic SDGs</Text>
      {sdgs.map(({ name }, i) => (
        <Text key={i} style={styles.tocCol}>
          Cross-cutting SDGs – {name}
        </Text>
      ))}
      <Text style={styles.tocCol}>Understand the context</Text>
      <Text style={styles.tocCol}>Social context</Text>
      <Text style={styles.tocCol}>Political context</Text>
      <Text style={styles.tocCol}>Sectoral innovations and approaches</Text>
      <Text style={styles.tocCol}>Create an SDG Business Profile</Text>
      <Text style={styles.tocCol}>Manage and improve your impact</Text>
      <Text style={styles.tocCol}>What Next?</Text>
      <Text style={styles.tocCol}>Where here to help</Text>
      <Text style={styles.tocCol}>Bibliography</Text>
    </View>
  </View>
)
TableOfContents.propTypes = {
  sdgs: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired })
  ),
  intro: PropTypes.string
}
TableOfContents.defaultProps = {
  intro
}

export default TableOfContents
