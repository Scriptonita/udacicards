import { combineReducers } from "redux";

import {
  GET_DECKS,
  GET_DECK,
  SAVE_DECK_TITLE,
  ADD_CARD_TO_DECK
} from "../actions";

function decks(store = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return store;
    case GET_DECKS:
      return store;
    case SAVE_DECK_TITLE:
      return store;
    case ADD_CARD_TO_DECK:
      return store;
    default:
      return store;
  }
}

export default combineReducers({ decks });
