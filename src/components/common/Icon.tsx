import React, {Component} from 'react';
import {Image, View} from 'react-native';

export interface IProps {
  image_o?: boolean;
  image_x?: boolean;
}

export default class Icon extends Component<IProps> {
  render() {
    return (
      <View>
        {this.props.image_o ? (
          <Image source={require('../../assets/img/o_icon.png')} />
        ) : (
          <Image source={require('../../assets/img/x_icon.png')} />
        )}
      </View>
    );
  }
}
