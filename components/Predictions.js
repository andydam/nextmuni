import React, { Component } from 'react';
import { ListView, Text, Title, View, Row } from '@shoutem/ui';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions';

class Predictions extends Component {
  constructor(props) {
    super(props);

    this.renderHeader = this.renderHeader.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  renderHeader() {
    return (
      <Row>
        <View styleName="vertical stretch space-between">
          <Title>{this.props.pred_time_msg}</Title>
        </View>
      </Row>
    );
  }

  renderFooter() {
    return (
      <Row>
        <View styleName="vertical stretch space-between">
          <Title>{this.props.gps_accuracy_msg}</Title>
          <Title>{this.props.map_accuracy_msg}</Title>
        </View>
      </Row>
    );
  }

  renderRow(prediction) {
    return (
      <Row>
        <View styleName="vertical stretch space-between">
          <Title>{prediction.route_name}</Title>
          <Text>{prediction.route_dir}</Text>
          <Text>
            {prediction.stop_name} {prediction.stop_distance}
          </Text>
          <Text>{prediction.pred_str}</Text>
        </View>
      </Row>
    );
  }

  render() {
    return (
      <ListView
        renderHeader={this.renderHeader}
        renderFooter={this.renderFooter}
        data={this.props.predictions}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    predictions: state.dataReducer.predictions,
    pred_time_msg: state.dataReducer.pred_time_msg,
    gps_accuracy_msg: state.dataReducer.gps_accuracy_msg,
    map_accuracy_msg: state.dataReducer.map_accuracy_msg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Predictions);
