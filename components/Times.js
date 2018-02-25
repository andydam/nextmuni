import React, { Component } from 'react';
import { ListView, Text, View } from '@shoutem/ui';

export default class Times extends Component {
  renderHeader() {
    return (
      <View>
        <Text>{this.props.times.routeTitle}</Text>
        <Text>{this.props.times.direction.title}</Text>
        <Text>{this.props.times.stopTitle}</Text>
      </View>
    );
  }
  renderFooter() {
    return (
      <View>
        {this.props.times.message.map((message) => <Text>{message.text}</Text>)}
      </View>
    );
  }
  renderLine(line) {
    return (
      <View>
        <Text>{line.minutes}</Text>
      </View>
    );
  }
  render() {
    return (
      <ListView
        data={this.props.times.direction.prediction}
        renderRow={this.renderLine}
        renderHeader={() => this.renderHeader()}
        renderFooter={() => this.renderFooter()}
      />
    );
  }
}
