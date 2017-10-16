import { saveDeckTitle, getDecks } from "../utils/API";

export const GET_DECKS = "GET_DECKS";
export const GET_DECK = "GET_DECK";
export const SAVE_DECK_TITLE = "SAVE_DECK_TITLE";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";

export function getAllDecks() {
  const type = GET_DECKS;
  return dispatch => {
    getDecks()
      .then(decks => dispatch({ type, decks }))
      .catch(error => console.log("Error getting decks: ", error));
  };
}

export function getADeck() {
  return {
    type: GET_DECK
  };
}

export function deckTitle(title) {
  const type = SAVE_DECK_TITLE;
  return dispatch => {
    saveDeckTitle(title)
      .then(response => dispatch({ type, title }))
      .then(() => dispatch(getAllDecks()))
      .catch(error => console.log("Error saving title: ", error));
  };
}

export function addCardToDeck() {
  return {
    type: ADD_CARD_TO_DECK
  };
}
