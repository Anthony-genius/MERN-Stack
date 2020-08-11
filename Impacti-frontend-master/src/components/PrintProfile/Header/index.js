import React from 'react'
import { Image, View, StyleSheet } from '@react-pdf/renderer'
import connectImage from 'assets/CONNECT.png'
import exploreImage from 'assets/EXPLORE.png'

const headerStyles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-around',
    backgroundColor: '#FF6D00',
    margin: 0,
    padding: 0
  },
  image: { width: '28%', margin: 12 }
})

const Header = () => (
  <View style={headerStyles.header} fixed>
    <Image style={headerStyles.image} src={exploreImage} />
    <Image style={headerStyles.image} src={connectImage} />
    <Image style={headerStyles.image} src={exploreImage} />
  </View>
)
export default Header
