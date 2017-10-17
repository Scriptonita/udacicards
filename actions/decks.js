import { saveDeckTitle, getDecks } from "../utils/API";

export const GET_DECKS = "GET_DECKS";
export const GET_DECKS_ERROR = "GET_DECKS_ERROR";
export const GET_DECK = "GET_DECK";
export const SAVE_DECK_TITLE = "SAVE_DECK_TITLE";
export const SAVE_DECK_TITLE_ERROR = "SAVE_DECK_TITLE_ERROR";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";

export function getAllDecks() {
  let type = GET_DECKS;
  return dispatch => {
    getDecks()
      .then(decks => dispatch({ type, decks }))
      .catch(error => {
        type = GET_DECKS_ERROR;
        dispatch({ type, error });
      });
  };
}

export function getADeck() {
  return {
    type: GET_DECK
  };
}

export function deckTitle(title) {
  let type = SAVE_DECK_TITLE;
  return dispatch => {
    saveDeckTitle(title)
      .then(response => dispatch({ type, title }))
      .then(() => dispatch(getAllDecks()))
      .catch(error => {
        type = SAVE_DECK_TITLE_ERROR;
        dispatch({ type, error });
      });
  };
}

export function addCardToDeck() {
  return {
    type: ADD_CARD_TO_DECK
  };
}
