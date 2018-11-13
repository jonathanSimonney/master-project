import {Component} from "react";
import {Button, Alert, Platform} from "react-native";
import React from "react";
import RNFetchBlob from 'rn-fetch-blob'
import { PermissionsAndroid, Vibration } from 'react-native';

export default class DownloadButton extends Component<Props> {
    //we ask for the permission to access the user file storage
    async requestFileStoragePermission() {
        if (Platform.os === 'android'){//so far, I don't know what permission I should be asking for on ios
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

    effectivelyDownloadVideo(result, youtubeUrl, fileName){//does the download if result is true, and display an error message otherwise
        if (result){
            const apiUrl = `https://master-project-api.herokuapp.com/api/dl/${encodeURIComponent(youtubeUrl)}/${encodeURIComponent(fileName)}`;
            const { config, fs } = RNFetchBlob;

            //we should have a different musicDirs depending of whether we're on android or on ios
            // (fs.dirs.MusicDir doesn't work on ios. We'll have to interact with itunes in order to make an app useful for ios.
            const musicDirs = Platform.select({
                ios: fs.dirs.DocumentDir + '/music',
                android: fs.dirs.MusicDir
            });
            console.log(musicDirs);
            let options = Platform.select({
                ios: {
                    fileCache: true,
                    path: musicDirs + `/${fileName}.mp3`, // this is the path where your downloaded file will live in
                },
                android: {
                    fileCache: true,
                    addAndroidDownloads: {
                        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                        notification: false,
                        path: musicDirs + `/${fileName}.mp3`, // this is the path where your downloaded file will live in
                        description: 'Downloading music.'
                    }
                }
            });

            config(options).fetch('GET', apiUrl)
                .then((res) => {
                    //make (or callback ?) what you want once the download is completed.
                    Alert.alert("download completed?")
                    Vibration.vibrate(1000);
                })
                .catch(err => {
                    console.warn(err.message);
                    Alert.alert("download NOT completed?")
                    Vibration.vibrate(1000);
                })
        }else{
            Alert.alert("We can't do anything without your consent...")
        }
    }

    // download the video in a mp3 format
    dlVideoToMp3(youtubeUrl, fileName){
        this.requestFileStoragePermission()
            .then(result => {
                this.effectivelyDownloadVideo(result, youtubeUrl, fileName)
            })
            .catch(error => {
                console.error(error);
                Alert.alert("an error occured, we couldn't download your music.");
            })
    }

    render() {
        return <Button title={"click me"} onPress={() => this.dlVideoToMp3(this.props.videoUrl, this.props.fileName)}/>;
    }
}