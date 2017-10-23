import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "remote-redux-devtools";

const logger = store => next => action => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd(action.type);
  return result;
};

export default function configureStore() {
  return createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
  );
}
