import colorWheel from 'assets/pdf/colorWheel.jpg'
import React from 'react'
import { Image, View, Text, StyleSheet } from '@react-pdf/renderer'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  bgImage: {
    position: 'absolute',
    top: 20,
    left: 240,
    width: '80%',
    height: '80%'
  },
  title: {
    position: 'absolute',
    top: 30,
    left: 30,
    color: '#22ADBC',
    fontFamily: 'Roboto',
    fontSize: 18
  },
  sdgContainer: {
    position: 'absolute',
    top: 50,
    left: 50,
    fontFamily: 'Roboto',
    fontSize: 10,
    width: 440,
    margin: 0,
    padding: 0,
    borderRadius: 0
  },
  card: {
    backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'row',
    border: '1pt solid #ccc',
    margin: 4,
    padding: 8,
    borderRadius: 15,
    width: '100%'
  },
  cardText: {
    paddingLeft: 16,
    width: 332
  },
  sdgImage: {
    height: 84,
    width: 84
  }
})

const OverView = ({ sdgs, imageUrls }) => {
  return (
    <View style={styles.container} debug={false}>
      <Image style={styles.bgImage} src={colorWheel} />
      <Text style={styles.title}>Our Priority SDGs</Text>
      <View style={styles.sdgContainer}>
        {sdgs.map((sdg, i) => {
          return (
            <View key={i} style={styles.card}>
              <Image style={styles.sdgImage} src={imageUrls[i]} />
              <Text style={styles.cardText}>{sdg.recoWhat}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}
OverView.propTypes = {
  sdgs: PropTypes.arrayOf(
    PropTypes.shape({
      shortName: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      recoWhat: PropTypes.string.isRequired,
      recoWhy: PropTypes.string.isRequired,
      reason: PropTypes.arrayOf(PropTypes.string)
    }).isRequired
  ).isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}
OverView.defaultProps = {}

export default OverView
