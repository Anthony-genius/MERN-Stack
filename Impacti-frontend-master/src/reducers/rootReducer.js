import { combineReducers } from 'redux'
import auth from './auth'
import memberWizard from './memberWizard'
import organization from './organization'
import dictionaries from './dictionaries'
import destinations from './destinations'
import dashboard from './dashboard'
import applicationContext from './applicationContext'
import treePresentation from './treePresenation'
import widgets from './widgets/widgetsCombined'
import assessmentWizard from './assessmentWizard'
import posts from './posts'
import tags from './tags'
import favorites from './favorites'
import comments from './comments'
import sdgCards from './sdgCards'

export default combineReducers({
  auth,
  memberWizard,
  organization,
  dictionaries,
  destinations,
  applicationContext,
  treePresentation,
  dashboard,
  widgets,
  assessmentWizard,
  posts,
  tags,
  favorites,
  comments,
  sdgCards
})
