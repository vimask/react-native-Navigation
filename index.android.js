/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableOpacity,
    BackAndroid,
} from 'react-native';

var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

var PageOne = require('./PageOne.js')
var PageTwo = require('./PageTwo.js')

var _navigator;

var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
    // Make it snap back really quickly after canceling pop
    snapVelocity: 8,
    // Make it so we can drag anywhere on the screen
    edgeHitWidth: SCREEN_WIDTH,
});

var CustomSceneConfig = Object.assign({}, BaseConfig, {
    // A very tighly wound spring will make this transition fast
    springTension: 100,
    springFriction: 1,
    // Use our custom gesture defined above
    gestures: {
        pop: CustomLeftToRightGesture,
    }
});

//When clicking the back button
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});


class ReactNativeNavigationExample extends Component {
  _renderScene(route, navigator) {
    _navigator = navigator;
    if (route.id === 1) {
      return <PageOne navigator={navigator}/>
    } else if (route.id === 2) {
      return <PageTwo navigator={navigator}
                      title={route.title}
                      post={route.post} />
    }
  }

  _configureScene(route) {
    return CustomSceneConfig;
  }

  render() {
    return (
      <Navigator
        initialRoute={{id: 1, }}
        renderScene={this._renderScene}
        configureScene={this._configureScene} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  }
});

AppRegistry.registerComponent('ReactNativeNavigationExample', () => ReactNativeNavigationExample);
