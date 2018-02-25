export const PREDICTIONS_AVAILABLE = 'PREDICTIONS_AVAILABLE';

export function getPredictions(lat, long) {
  return async (dispatch) => {
    try {
      // build project
      // const body = `preds=byLoc&maxDis=2300&accuracy=2400&lat=${lat}&long=${long}`;
      const body =
        'preds=byLoc&maxDis=2300&accuracy=2400&lat=37.733629&lon=-122.398864';
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
        dispatch({ type: PREDICTIONS_AVAILABLE, predictions });
      }
    } catch (err) {
      console.log(err);
    }
  };
}
