/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {Platform} from 'react-native'
import DownloadView from "./src/views/downloadView.js";

export default class App extends Component<Props> {
	render() {
        return (
			<DownloadView os={Platform.os} videoUrl={"https://youtu.be/jl0d0Q7MyzA"} musicTitle={"division bell"} musicAuthor={"pink floyd"}></DownloadView>
        );
    }
}
