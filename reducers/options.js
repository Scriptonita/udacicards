import { IMPORT_DEMO_DECKS } from "../actions/types";

const INITIAL_STATE = {
  last: null
};

export function options(state = INITIAL_STATE, action) {
  const { last } = action;
  switch (action.type) {
    case IMPORT_DEMO_DECKS:
      return { ...state, last };
    default:
      return state;
  }
}
