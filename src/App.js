import React, {Component} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import Header from './components/common/Header';
import MainGame from './components/MainGame';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView>
        <View>
          <Header title={'Tic Tac Toe'} />
          <ScrollView contentInsetAdjustmentBehavior={true}>
            <MainGame />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
