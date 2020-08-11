import React from 'react'
import { Image, View, Text, StyleSheet } from '@react-pdf/renderer'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 120
  },
  bgImage: {
    objectPosition: '0 0',
    objectFit: 'cover'
  },
  avatarDiv: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'baseline',
    alignItems: 'baseline',
    flexDirection: 'row',
    top: 40,
    left: 80
  },
  avatar: {
    width: 80,
    height: 80,
    objectFit: 'cover'
  }
})

const UserHeader = ({ heroImage, image, username }) => (
  <View style={styles.header} fixed>
    <Image src={heroImage} style={styles.bgImage} />
    <View style={styles.avatarDiv}>
      <Image src={image} style={styles.avatar} />
      <Text style={{ color: '#FFF', padding: 4 }}>{username}</Text>
    </View>
  </View>
)
UserHeader.propTypes = {
  heroImage: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

export default UserHeader
