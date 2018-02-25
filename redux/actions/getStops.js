export const STOPS_AVAILABLE = 'STOPS_AVAILABLE';

export function getStops(route) {
  return async (dispatch) => {
    const stops = await fetch(
      `http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=sf-muni&r=${route}`,
    ).then((resp) => resp.json());
    dispatch({ type: STOPS_AVAILABLE, stops: stops.route.stop });
  };
}
