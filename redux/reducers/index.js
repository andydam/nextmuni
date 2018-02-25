import { combineReducers } from 'redux';

import {
  ROUTES_AVAILABLE,
  STOPS_AVAILABLE,
  TIMES_AVAILABLE,
} from '../actions/';

let dataState = {
  routes: [],
  stops: [],
  times: { direction: { prediction: [] }, message: [] },
  loading: true,
};

const dataReducer = (state = dataState, action) => {
  switch (action.type) {
    case ROUTES_AVAILABLE:
      state = Object.assign({}, state, {
        routes: action.routes,
        loading: false,
      });
      return state;
    case STOPS_AVAILABLE:
      state = Object.assign({}, state, {
        stops: action.stops,
        loading: false,
      });
      return state;
    case TIMES_AVAILABLE:
      state = Object.assign({}, state, {
        times: action.times,
        loading: false,
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  dataReducer,
});

export default rootReducer;
