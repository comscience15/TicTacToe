import React, {Component} from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

export interface IProps {
  backgroundImage: ImageSourcePropType;
  title: string;
  titleStyle?: StyleProp<ViewStyle>;
}

export default class Header extends Component<IProps> {
  render() {
    const {title, titleStyle} = this.props;
    return (
      <View style={styles.root}>
        <ImageBackground source={this.imageSrc()} style={styles.background}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </ImageBackground>
      </View>
    );
  }
  private imageSrc = () => {
    if (this.props.backgroundImage == null) {
      //   return require('../assests/img/bg_dialog_react.png');
      return require('../../assets/img/bg_dialog_react.png');
    } else {
      return this.props.backgroundImage;
    }
  };
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    height: '100%',
  },
  root: {
    backgroundColor: 'blue',
    height: 94,
  },
  title: {
    color: 'white',
    fontSize: 25,
    marginVertical: 30,
  },
});
