import {
  getDecks,
  saveDeckTitle,
  addCardToDeck,
  removeDecks
} from "../utils/API";

export const GET_DECKS = "GET_DECKS";
export const GET_DECKS_ERROR = "GET_DECKS_ERROR";
export const SAVE_DECK_TITLE = "SAVE_DECK_TITLE";
export const SAVE_DECK_TITLE_ERROR = "SAVE_DECK_TITLE_ERROR";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";
export const ADD_CARD_TO_DECK_ERROR = "ADD_CARD_TO_DECK_ERROR";
export const REMOVE_ALL_DECKS = "REMOVE_ALL_DECKS";
export const REMOVE_ALL_DECKS_ERROR = "REMOVE_ALL_DECKS_ERROR";

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

export function addCardToADeck(title, card) {
  let type = ADD_CARD_TO_DECK;
  return dispatch => {
    addCardToDeck(title, card)
      .then(result => dispatch({ type, title }))
      .then(() => dispatch(getAllDecks()))
      .catch(error => {
        type = ADD_CARD_TO_DECK_ERROR;
        dispatch({ type, error });
      });
  };
}

export function removeAllDecks() {
  let type = REMOVE_ALL_DECKS;
  const payload = {};
  return dispatch => {
    removeDecks()
      .then(result => {
        dispatch({ type, payload });
      })
      .then(() => dispatch(getAllDecks())) // To refresh redux store
      .catch(error => {
        type = REMOVE_ALL_DECKS_ERROR;
        dispatch({ type, payload });
      });
  };
}
