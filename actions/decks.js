import {
  getDecks,
  saveDeckTitle,
  addCardToDeck,
  removeDecks,
  importDecksData
} from "../utils/API";

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
} from "./types";

export function getAllDecks() {
  let type = GET_DECKS;
  let decks = {};
  return dispatch => {
    getDecks()
      .then(result => {
        if (result) {
          decks = JSON.parse(result);
        }
        dispatch({ type, decks });
      })
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
  const payload = null;
  return dispatch => {
    removeDecks()
      .then(result => dispatch({ type, payload }))
      .then(() => dispatch(getAllDecks())) // To refresh redux store
      .catch(error => {
        type = REMOVE_ALL_DECKS_ERROR;
        dispatch({ type, error });
      });
  };
}

export function importDecks(data) {
  let type = IMPORT_DECKS;
  const payload = null;
  return dispatch => {
    importDecksData(data)
      .then(result => dispatch({ type, payload }))
      .then(() => dispatch(getAllDecks()))
      .catch(error => {
        type = IMPORT_DECKS_ERROR;
        dispatch({ type, error });
      });
  };
}
