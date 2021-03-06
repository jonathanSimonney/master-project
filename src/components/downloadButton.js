import {Component} from "react";
import {Button, Alert} from "react-native";
import React from "react";
import RNFetchBlob from 'rn-fetch-blob'
import { PermissionsAndroid, Vibration, NetInfo, AsyncStorage } from 'react-native';

export default class DownloadButton extends Component<Props> {
    //we check that : there is network AND that it is a wifi network
    async checkNetwork(){
        let connectionType = "none"; //one of none (you don't have web access), expensive (your web access isn't wifi) or normal (you have a wifi web access)
        await NetInfo.getConnectionInfo().then(connectionInfo => {
            if (connectionInfo.type !== "none"){
                if (connectionInfo.type === "wifi"){
                    connectionType = "normal"
                }else{
                    connectionType = "expensive"
                }
            }
        })

        return connectionType;
    }

    //we ask for the permission to access the user file storage
    async requestFileStoragePermission() {
        if (this.props.os === 'android'){//so far, I don't know what permission I should be asking for on ios
            try {
                console.log("We're ASKINg for your consent...")
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        'title': 'Cool music App storage Permission',
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

    //helper to handle unexpected errors
    unknownError(err){
        console.warn(err.message);
        Alert.alert("download NOT completed?")
        Vibration.vibrate(1000);
    }

    effectivelyDownloadVideo(youtubeUrl, fileName, fileAuthor){//really does the entire download (NOT responsible for asking permission, checking connection, etc.)
        const apiUrl = `https://master-project-api.herokuapp.com/api/dl/${encodeURIComponent(youtubeUrl)}/${encodeURIComponent(fileName)}/${encodeURIComponent(fileAuthor)}`;
        const { config, fs } = RNFetchBlob;

        //we should have a different musicDirs depending of whether we're on android or on ios
        // (fs.dirs.MusicDir doesn't work on ios. We'll have to interact with itunes in order to make an app useful for ios.
        let musicDirs
        let options

        if (this.props.os === "android"){
            musicDirs = fs.dirs.MusicDir
            options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                    notification: false,
                    path: musicDirs + `/${fileName}.mp3`, // this is the path where your downloaded file will live in
                    description: 'Downloading music.'
                }
            }
        }else if(this.props.os === "ios"){
            musicDirs = fs.dirs.DocumentDir + '/music'
            options = {
                fileCache: true,
                path: musicDirs + `/${fileName}.mp3`, // this is the path where your downloaded file will live in
            }
        }


        console.log(musicDirs);

        this.props.startDownload()

        config(options)
            .fetch('GET', apiUrl)
            .then((res) => {
                //make (or callback ?) what you want once the download is completed.
                this.props.endDownload()

                AsyncStorage.setItem(fileName, "saved")

                Alert.alert("download completed?")
                Vibration.vibrate(1000);
            })
            .catch(err => {
                this.props.endDownload()
                this.unknownError(err)
            })
    }

    async downloadVideo(result, youtubeUrl, fileName, fileAuthor){//does the download if result is true, and display an error message otherwise
        if (result){
            const value = await AsyncStorage.getItem(fileName)
            if (value !== null){
                Alert.alert("this name is already taken, please choose a different name")
                return;
            }

            this.checkNetwork()
                .then(result => {
                    if (result === "none"){
                        Alert.alert("we can't download when network isn't available")
                    }else if(result === "expensive"){
                        //todo ask user because we'll eat on his connection
                        //meanwhile, tell him why we won't dl
                        Alert.alert("we won't download while you're not using wifi, for a file is a heavy thing to download")
                    }else{
                        this.effectivelyDownloadVideo(youtubeUrl, fileName, fileAuthor)
                    }
                    //
                })
                .catch(err => {
                    this.unknownError(err)
                })
        }else{
            Alert.alert("We can't do anything without your consent...")
        }
    }

    // download the video in a mp3 format
    dlVideoToMp3(youtubeUrl, fileName, fileAuthor){
        console.log(this.props.os)
        this.requestFileStoragePermission()
            .then(result => {
                this.downloadVideo(result, youtubeUrl, fileName, fileAuthor).catch(err => this.unknownError(err))
            })
            .catch(error => {
                console.error(error);
                Alert.alert("an error occured, we couldn't download your music.");
            })
    }

    render() {
        return <Button title={"download the music"} onPress={() => this.dlVideoToMp3(this.props.videoUrl, this.props.fileName, this.props.fileAuthor)} accessibilityLabel={"click to download your mp3 file"}/>;
    }
}