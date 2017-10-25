import { IMPORT_DEMO_DECKS } from "../actions/types";

export function options(state = {}, action) {
  const { last } = action;
  switch (action.type) {
    case IMPORT_DEMO_DECKS:
      return { ...state, last };
    default:
      return state;
  }
}
