export const PREDICTIONS_AVAILABLE = 'PREDICTIONS_AVAILABLE';
export const START_LOADING = 'START_LOADING';

export function getPredictions(lat, long) {
  return async (dispatch) => {
    dispatch({ type: START_LOADING });

    try {
      // build param string
      const body = `preds=byLoc&maxDis=2300&accuracy=2400&lat=${lat}&long=${long}`;
      // make POST request to nextbus mobile site
      const predictions = await fetch('http://www.nextbus.com/service/mobile', {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': body.length,
        },
      }).then((resp) => resp.json());

      if (predictions.error && !predictions.pred_time_msg) {
        throw new Error(predictions.error.message);
      } else {
        // dispatch predictions data to reducer
        dispatch({
          type: PREDICTIONS_AVAILABLE,
          predictions: Object.assign({}, predictions, {
            // strip out html tags out of prediction strings
            preds: predictions.preds.map((prediction) => {
              return Object.assign({}, prediction, {
                pred_str: prediction.pred_str.replace(
                  /<(?:[^>=]|='[^']*'|="[^"]*"|=[^'"][^\s>]*)*>/g,
                  '',
                ),
              });
            }),
          }),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}
