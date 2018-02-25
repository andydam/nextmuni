import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Font, AppLoading } from 'expo';
import { Screen, NavigationBar, Text, Title, Button, Icon } from '@shoutem/ui';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontsAreLoaded: false,
    };

    this.fetchPredictions = this.fetchPredictions.bind(this);
  }

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

  componentDidMount() {
    this.fetchPredictions();
  }

  fetchPredictions() {
    // get user's current location
    navigator.geolocation.getCurrentPosition((position) =>
      // call action to fetch predictions for bus stops near user's current location
      this.props.getPredictions(
        position.coords.latitude,
        position.coords.longitude,
      ),
    );
  }

  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }

    return (
      <Screen>
        <NavigationBar
          centerComponent={<Title>NEXTMUNI</Title>}
          rightComponent={
            <Button styleName="dark" onPress={this.fetchPredictions}>
              <Icon name="refresh" />
            </Button>
          }
          styleName="inline clear"
          style={{ container: { backgroundColor: '#cc0033' } }}
        />
        <Text>{JSON.stringify(this.props.predictions)}</Text>
        <StatusBar
          barStyle="default"
          hidden={false}
          networkActivityIndicatorVisible={this.props.loading}
        />
      </Screen>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    loading: state.dataReducer.loading,
    predictions: state.dataReducer.predictions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
