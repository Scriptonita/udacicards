import {
  GET_DECKS,
  GET_DECKS_ERROR,
  SAVE_DECK_TITLE,
  SAVE_DECK_TITLE_ERROR,
  ADD_CARD_TO_DECK,
  ADD_CARD_TO_DECK_ERROR,
  REMOVE_ALL_DECKS,
  REMOVE_ALL_DECKS_ERROR,
  IMPORT_DECKS,
  IMPORT_DECKS_ERROR
} from "../actions/types";

export function decks(state = {}, action) {
  const { error, decks } = action;
  switch (action.type) {
    case GET_DECKS:
      /*
      if (action.decks) {
        return JSON.parse(action.decks);
      } else {
        return {};
      }
      */
      return decks;
    case GET_DECKS_ERROR:
      console.log("Error: ", action.error);
      return state;
    case SAVE_DECK_TITLE:
      return state;
    case SAVE_DECK_TITLE_ERROR:
      console.log("Error: ", action.error);
      return state;
    case ADD_CARD_TO_DECK:
      return state;
    case ADD_CARD_TO_DECK_ERROR:
      console.log("Error: ", action.error);
      return state;
    case REMOVE_ALL_DECKS:
      state = {};
      return state;
    case REMOVE_ALL_DECKS_ERROR:
      console.log("Error: ", action.error);
      state = {};
      return state;
    case IMPORT_DECKS:
      return state;
    case IMPORT_DECKS_ERROR:
      console.log("Error: ", action.error);
      return state;
    default:
      return state;
  }
}

//export default decks;
