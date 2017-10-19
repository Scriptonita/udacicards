import {
  GET_DECK,
  GET_DECK_ERROR,
  ADD_CARD_TO_DECK,
  ADD_CARD_TO_DECK_ERROR
} from "../actions/deck";

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
    default:
      return state;
  }
}

//export default decks;
