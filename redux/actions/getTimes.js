export const TIMES_AVAILABLE = 'TIMES_AVAILABLE';

export function getTimes(route, stop) {
  return async (dispatch) => {
    const times = await fetch(
      `http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=sf-muni&stopId=${stop}&routeTag=${route}`,
    ).then((resp) => resp.json());
    dispatch({ type: TIMES_AVAILABLE, times: times.predictions });
  };
}
