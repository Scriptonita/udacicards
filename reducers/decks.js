import {
  GET_DECKS,
  GET_DECKS_ERROR,
  GET_DECK,
  SAVE_DECK_TITLE,
  ADD_CARD_TO_DECK,
  SAVE_DECK_TITLE_ERROR
} from "../actions/decks";

export function decks(state = {}, action) {
  const { error } = action;
  switch (action.type) {
    case GET_DECKS:
      if (action.decks) {
        return JSON.parse(action.decks);
      } else {
        return {};
      }
    case GET_DECKS_ERROR:
      return {
        ...state,
        error
      };
    case GET_DECKS:
      return state;
    case SAVE_DECK_TITLE:
      console.log("Deck create with title: ", action.title);
      return state;
    case SAVE_DECK_TITLE_ERROR:
      return {
        ...state,
        error
      };
    case ADD_CARD_TO_DECK:
      return state;
    default:
      return state;
  }
}

//export default decks;
