import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet } from '@react-pdf/renderer'

const tagStyle = {
  backgroundColor: '#F5F5F5',
  color: '#FF6D00',
  borderRadius: 20,
  fontSize: 8,
  margin: 4,
  padding: 4
}
const styles = StyleSheet.create({
  group: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'flex-start',
    border: '1pt solid #ccc',
    borderRadius: 4,
    marginTop: 4,
    marginBottom: 4,
    padding: 4
  },
  tag: tagStyle,
  userTag: { ...tagStyle, color: '#000' }
})

const TagGroup = ({ tags }) => (
  <View style={styles.group}>
    {tags.map(({ label, userCreated }, i) => (
      <Text key={i} style={userCreated ? styles.userTag : styles.tag}>
        #{label}
      </Text>
    ))}
  </View>
)
TagGroup.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      userCreated: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired
}
export default TagGroup
