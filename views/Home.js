import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Font, AppLoading } from 'expo';
import { Screen, NavigationBar, Text, Title, DropDownMenu } from '@shoutem/ui';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions';

class Home extends React.Component {
  state = {
    fontsAreLoaded: false,
    selectedRoute: '',
    selectedStop: '',
  };

  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Black': require('../node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('../node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('../node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('../node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('../node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('../node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('../node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('../node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('../node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('../node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('../node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
    });

    this.setState({ fontsAreLoaded: true });
  }

  getStops(route) {
    this.setState({ selectedRoute: route });
    this.props.getStops(route.tag);
  }

  componentDidMount() {
    this.props.getRoutes();
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    return (
      <Screen>
        <NavigationBar
          centerComponent={<Title>nextmuni</Title>}
          styleName="inline"
        />
        <DropDownMenu
          styleName="horizontal"
          options={this.props.routes}
          selectedOption={
            this.state.selectedRoute
              ? this.state.selectedRoute
              : this.props.routes[0]
          }
          onOptionSelected={(route) => this.getStops(route)}
          titleProperty="title"
          valueProperty="tag"
        />
        <DropDownMenu
          styleName="horizontal"
          options={this.props.stops}
          selectedOption={
            this.state.selectedStop
              ? this.state.selectedStop
              : this.props.stops[0]
          }
          onOptionSelected={(route) => this.setState({ selectedStop: route })}
          titleProperty="title"
          valueProperty="stopId"
        />
        <StatusBar barStyle="default" hidden={false} />
      </Screen>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    loading: state.dataReducer.loading,
    routes: state.dataReducer.routes,
    stops: state.dataReducer.stops,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
