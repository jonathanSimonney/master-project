/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Animated, ActivityIndicator} from 'react-native';
import DownloadButton from './components/downloadButton';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<Props> {
    state = { loading: false, fadeAnim: new Animated.Value(0)}

    startDownload(){
        this.setState({loading: true})
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 10000,              // Make it take a while
            }
        ).start();
    }

    endDownload(){
        console.log("download ended")
        this.setState({loading: false})
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 0,                   // Animate to opacity: 0 (opaque)
                duration: 10000,              // Make it take a while
            }
        ).start();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                <DownloadButton videoUrl={"https://youtu.be/yo-IQEYcQuY"}  fileName={"I want to break free"}
                                startDownload={() => {
                                    this.startDownload()
                                }}
                                endDownload={() => this.endDownload()}
                />

                <Animated.View style={
                    {
                        opacity: this.state.fadeAnim,         // Bind opacity to animated value
                    }
                }>
                    <ActivityIndicator color="#000000" size="large"/>
                </Animated.View>
            </View>
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
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
