import introImage from 'assets/pdf/introImageSmall.jpg'
import React from 'react'
import { Image, View, Text, Link, StyleSheet } from '@react-pdf/renderer'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    position: 'absolute',
    top: 80,
    left: -60
  },
  introImage: {
    height: 400,
    width: 400,
    borderTopRightRadius: 180
  },
  introText: {
    position: 'absolute',
    top: 80,
    left: 280,
    color: '#22ADBC',
    fontFamily: 'Roboto',
    fontSize: 18
  },
  card: {
    position: 'absolute',
    top: 50,
    left: 440,
    fontFamily: 'Roboto',
    fontSize: 9,
    width: 360,
    border: '1pt solid #ccc',
    margin: 4,
    padding: 16,
    borderRadius: 15
  },
  link: {
    marginRight: 8,
    marginLeft: 'auto'
  }
})

const Introduction = ({ companyName }) => (
  <View style={styles.container} debug={false}>
    <View style={styles.imageContainer}>
      <Image style={styles.introImage} src={introImage} />
    </View>
    <Text style={styles.introText}>Introduction</Text>
    <View style={styles.card}>
      <Text>
        {`
      The Sustainable Development Goals set out the world’s most pressing challenges. And all of society - governments, civil society, business and all citizens must work together to find solutions. Here at ${companyName}, we are committed to contributing to this global effort to build more prosperous, resilient and fair societies. 

This SDG Impact Opportunity Report outlines our vision for aligning our business to the SDGs. The SDG sets out an ambitious and comprehensive framework with 17 Global Goals and 169 Targets. It offers a guide for businesses to reflect on where they can leverage their expertise and improve their operations to make a meaningful difference in the lives of their staff, clients, consumers and communities at large. The SDGs signal a new era of business sustainability. Being sustainable no longer means just minimizing the negative impacts of doing business, but rather is an opportunity for companies to seek opportunities to be forces for good.

Here at ${companyName}, we have worked to identify the SDGs where we can make the most positive impact, guided by the Impacti EXPLOREⒸ  quick SDG assessment tool. In this Report, we outline a set of priority SDGs and Impact Opportunities that we believe are most relevant to our business operations. To inform our SDG prioritization, we took into consideration the SDGs at risk where we operate and the potential to use our sectoral expertise to correct negative practices and innovate new solutions. For each Impact Opportunity, this Report outlines actions and initiatives that ${companyName} is taking or planning to take to contribute to the Global Goals. 

${companyName} has started the journey to make sustainability our business. We welcome comments and feedback on the SDG prioritization choices outlined in this Report, and ideas on actions, initiatives and collaborations that we can take to create shared value for our business and society at large.`}
      </Text>
    </View>
  </View>
)
Introduction.propTypes = {
  companyName: PropTypes.string.isRequired
}

export default Introduction
