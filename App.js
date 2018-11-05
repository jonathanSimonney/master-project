/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import { PermissionsAndroid } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    async requestFileStoragePermission() {
        if (Platform.os === 'ios'){
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        'title': 'Cool music App Camera Permission',
                        'message': 'Cool music App needs access to your file storage ' +
                            'so we can stock your downloaded files.'
                    }
                )
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err)
                return false
            }
        }
        return true;
    }

    effectivelyDownloadVideo(result, youtubeUrl, fileName){
        if (result){
            const apiUrl = `https://master-project-api.herokuapp.com/api/dl/${encodeURIComponent(youtubeUrl)}/${encodeURIComponent(fileName)}`;
            const { config, fs } = RNFetchBlob;
            // const musicDirs = Platform.select({
            //     ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
            //     android: fs.dirs.MusicDir
            // });
            const musicDirs = fs.dirs.MusicDir;
            console.log(musicDirs);
            let options = {
                fileCache: true,
                addAndroidDownloads : {
                    useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                    notification : false,
                    path:  musicDirs + `/${fileName}.mp3`, // this is the path where your downloaded file will live in
                    description : 'Downloading music.'
                }
            };
            config(options).fetch('GET', apiUrl).then((res) => {
                Alert.alert("download completed?")
            })
        }else{
            Alert.alert("We can't do anything without your consent...")
        }
    }

    dlVideoToMp3(youtubeUrl, fileName){
        this.requestFileStoragePermission()
            .then(result => {
                this.effectivelyDownloadVideo(result, youtubeUrl, fileName)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
                <Button title={"click me"} onPress={() => this.dlVideoToMp3("https://youtu.be/rY0WxgSXdEE", "biteDust")}/>
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
