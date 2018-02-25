import { combineReducers } from 'redux';

import { PREDICTIONS_AVAILABLE, START_LOADING } from '../actions/';

let dataState = {
  predictions: [],
  pred_time_msg: '',
  gps_accuracy_msg: '',
  map_accuracy_msg: '',
  loading: true,
};

const dataReducer = (state = dataState, action) => {
  switch (action.type) {
    case START_LOADING:
      state = Object.assign({}, state, { loading: true });
      return state;
    case PREDICTIONS_AVAILABLE:
      // store all incoming predictions data into state
      state = Object.assign({}, state, {
        predictions: action.predictions.preds,
        pred_time_msg: action.predictions.pred_time_msg,
        gps_accuracy_msg: action.predictions.gps_accuracy_msg,
        map_accuracy_msg: action.predictions.map_accuracy_msg,
        loading: false,
      });
      return state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  dataReducer,
});

export default rootReducer;
