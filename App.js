import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import Home from './views/Home';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
