import React from 'react'
import SubtitlesIcon from '@material-ui/icons/Subtitles'
import EventIcon from '@material-ui/icons/Event'

export const postTypes = [
  { name: 'News', icon: <SubtitlesIcon /> },
  { name: 'Case Studies', icon: <EventIcon /> },
  { name: 'Events', icon: <EventIcon /> },
  { name: 'Learning Resources', icon: <EventIcon /> },
  { name: 'Partnerships', icon: <EventIcon /> },
  { name: 'Reporting Standards', icon: <EventIcon /> }
]

export default ({ category }) =>
  postTypes.find(e => e.name.toLowerCase() === category.toLowerCase()).icon
