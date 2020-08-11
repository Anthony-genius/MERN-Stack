import React from 'react'
import { Image, View, Text, StyleSheet, Link } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import logo from 'assets/impacti-logo-without-text.png'
import orangeLogo from 'assets/IMPACTI-orange-logo-shadow-without-text.png'

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: -1,
    backgroundColor: '#FF6D00',
    color: '#FFF',
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Roboto',
    fontSize: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 28
  },
  invert: {
    color: '#FF6D00',
    backgroundColor: '#FFF'
  },
  logo: {
    marginLeft: 8,
    marginRight: 8,
    height: 20,
    width: 20
  },
  link: {
    marginRight: 8,
    marginLeft: 'auto'
  }
})

const Footer = ({ invert }) => (
  <View
    debug={false}
    style={invert ? { ...styles.footer, ...styles.invert } : styles.footer}
    fixed
  >
    <Image style={styles.logo} src={invert ? orangeLogo : logo} />
    <Text>Make Sustainability Your Business</Text>
    <Link src="www.impacti.Solutions" style={styles.link}>
      impacti.Solutions
    </Link>
  </View>
)
Footer.propTypes = {
  invert: PropTypes.bool
}
Footer.defaultProps = {
  invert: false
}
export default Footer
