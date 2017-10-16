import { combineReducers } from "redux";

import {
  GET_DECKS,
  GET_DECK,
  SAVE_DECK_TITLE,
  ADD_CARD_TO_DECK
} from "../actions/decks";

export function decks(state = { decks: {} }, action) {
  switch (action.type) {
    case GET_DECKS:
      const { decks } = action;
      return {
        ...state,
        decks
      };
    case GET_DECKS:
      return state;
    case SAVE_DECK_TITLE:
      console.log("Deck create with title: ", action.title);
      return state;
    case ADD_CARD_TO_DECK:
      return state;
    default:
      return state;
  }
}

//export default decks;
