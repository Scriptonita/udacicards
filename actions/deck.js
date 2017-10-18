import { getDeck } from "../utils/API";

export const GET_DECK = "GET_DECK";
export const GET_DECK_ERROR = "GET_DECK_ERROR";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";

export function getADeck(id) {
  let type = GET_DECK;
  return dispatch => {
    getDeck(id)
      .then(deck => dispatch({ type, deck }))
      .catch(error => {
        type = GET_DECK_ERROR;
        dispatch({ type, error });
      });
  };
}

export function addCardToDeck() {
  return {
    type: ADD_CARD_TO_DECK
  };
}
