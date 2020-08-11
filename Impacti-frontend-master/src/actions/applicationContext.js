import ACTION_KEYS from 'constants/actionKeys/applicationContext'
import DESTINATIONS_ACTION_KEYS from 'constants/actionKeys/destinations'

export const selectMemberByItsId = dispatch => id =>
  dispatch({
    type: ACTION_KEYS.SELECT_MEMBER,
    data: id
  })

export const selectMember = dispatch => member => {
  selectMemberByItsId(dispatch)(member.id)

  dispatch({
    type: DESTINATIONS_ACTION_KEYS.PRESELECT_PATHS,
    data: member.paths.map(p => p._id)
  })
}

export const selectPath = dispatch => path => {
  dispatch({
    type: ACTION_KEYS.SELECT_PATH_CONTEXT,
    data: path
  })
}
