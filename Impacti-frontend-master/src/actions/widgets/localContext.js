export const setLocalContext = dispatch => ({ widgetType }) => id =>
  dispatch({
    type: `${widgetType}_SET_LOCAL_CONTEXT`,
    data: {
      id
    }
  })
