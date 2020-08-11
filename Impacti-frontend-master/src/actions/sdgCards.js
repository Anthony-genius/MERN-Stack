import ACTION_KEYS from 'constants/actionKeys/sdgCards'

export const addCard = shortName => {
  return { type: ACTION_KEYS.ADD_CARD, shortName }
}

export const removeCard = shortName => {
  return { type: ACTION_KEYS.REMOVE_CARD, shortName }
}
