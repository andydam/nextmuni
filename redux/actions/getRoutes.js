export const ROUTES_AVAILABLE = 'DATA_AVAILABLE';

export function getRoutes() {
  return async (dispatch) => {
    const routes = await fetch(
      'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni',
    ).then((resp) => resp.json());
    dispatch({ type: ROUTES_AVAILABLE, routes: routes.route });
  };
}
