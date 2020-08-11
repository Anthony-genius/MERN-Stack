import introImage from 'assets/pdf/introImageSmall.jpg'
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
    width: '100%',
    height: '100%'
  },
  card: {
    padding: 16,
    position: 'absolute',
    bottom: 36,
    left: 0,
    backgroundColor: '#fff'
  },
  cardText: {
    color: '#22ADBC',
    fontFamily: 'Roboto',
    fontSize: 18
  },
  avatar: {
    width: 40,
    height: 40
  },
  avatarDiv: {
    marginTop: 12,
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  username: {
    marginLeft: 16,
    fontFamily: 'Roboto',
    fontSize: 18
  }
})

const CoverPage = ({ image, username }) => {
  const date = new Date()
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()
  return (
    <View style={styles.container} debug={false}>
      <Image style={styles.bgImage} src={introImage} />
      <View style={styles.card}>
        <Text style={styles.cardText}>SDG IMPACT OPPORTUNITY REPORT</Text>
        <View style={styles.avatarDiv}>
          <Image src={image} style={styles.avatar} />
          <Text style={styles.username}>{username}</Text>
        </View>
        <Text style={styles.cardText}>
          {month} {year}
        </Text>
      </View>
    </View>
  )
}
CoverPage.propTypes = {
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}
CoverPage.defaultProps = {
  username: 'username'
}

export default CoverPage
