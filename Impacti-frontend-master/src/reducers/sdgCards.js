import ACTION_KEYS from 'constants/actionKeys/sdgCards'

const initialState = {
  cardAdded: true
}

const sdgCards = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_KEYS.ADD_CARD: {
      return {
        ...state,
        cardAdded: true
      }
    }

    case ACTION_KEYS.REMOVE_CARD: {
      return {
        ...state,
        cardAdded: false
      }
    }

    default:
      return state
  }
}

export default sdgCards
