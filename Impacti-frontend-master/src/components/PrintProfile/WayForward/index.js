import wayForwardImage from 'assets/pdf/wayForward_03.jpg'
import React from 'react'
import { Image, View, Text, StyleSheet } from '@react-pdf/renderer'
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
  wayForwardImage: {
    height: 400,
    width: 400,
    borderTopRightRadius: 180
  },
  wayForwardText: {
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
    fontSize: 10,
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

const WayForward = ({ companyName }) => (
  <View style={styles.container} debug={false}>
    <View style={styles.imageContainer}>
      <Image style={styles.wayForwardImage} src={wayForwardImage} />
    </View>
    <Text style={styles.wayForwardText}>The way forward</Text>
    <View style={styles.card}>
      <Text>{`This SDG Impact Opportunity Report outlines an important first step in ${companyName}’s journey to make sustainability our business. The priority SDGs and Impact Opportunities set out in this Report represent the destinations, or ambitions, towards which we are striving as a sustainable business. We believe it is a compelling and achievable vision of the sustainable business leadership we want to be known for.

Our next priority is to define the routes we will take to reach our destinations. Here at ${companyName}, we are committed to turn our ambitions into action and communicating in credible and trusted ways to our stakeholders on the progress we are making. Doing so means making important decisions on:
`}</Text>
      <Text>{`
• What concrete actions and initiatives can we take to contribute to our priority SDGs?
• What are appropriate and relevant indicators to measure progress?
• What are measurable and achievable targets to set along the journey?
• What data can we collect to show progress - how, when and by who?
• How can we effectively communicate our progress and achievements?
`}</Text>
      <Text>{`
We also know that we can make even greater impact by working together across our industry, and with governments, academics, civil society and communities. We have joined the Impacti CONNECTⒸ network of sustainable business leaders, where we participate in a global business-led movement to crowdsource the cutting-edge of business sustainability. And we invite partners committed to our priority SDGs to propose ways that we can work together to make our sustainability efforts more impactful and effective. 

Building a sustainable business is a step-by-step process. We welcome your comments on our journey and look forward to taking next steps to building a better world.

`}</Text>
    </View>
  </View>
)
WayForward.propTypes = {
  companyName: PropTypes.string
}

export default WayForward
