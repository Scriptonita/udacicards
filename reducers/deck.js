import { GET_DECK, GET_DECK_ERROR, ADD_CARD_TO_DECK } from "../actions/deck";

export function deck(state = {}, action) {
  const { deck, error } = action;
  switch (action.type) {
    case GET_DECK:
      if (deck) {
        return deck;
      } else {
        return state;
      }
    case GET_DECK_ERROR:
      return state;
    case ADD_CARD_TO_DECK:
      return state;
    default:
      return state;
  }
}

//export default decks;
