import React, { Component } from 'react'
// import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'

import {
	Text,
	View,
	TouchableOpacity,
	Platform
} from 'react-native'
import DownloadView from "../views/downloadView.js";

export default class OriginalShare extends Component<Props> {
	constructor(props, context) {
		console.log("it's called!");
		super(props, context)
		this.state = {
			type: '',
			value: ''
		}
	}

	getPlatform(){
		return Platform.os //should not work, but better than nothing
	}

	async componentDidMount() {
		try {
			const { type, value } = await ShareExtension.data()
			console.log("share called 2", type, value, this.state)
			this.setState({
				type,
				value
			})
		} catch(e) {
			console.log('errrr', e)
		}
	}

	onClose = () => ShareExtension.close()


	render() {
		return (
			<View style={{ borderColor: 'green', borderWidth: 1, backgroundColor: 'white', height: 600, width: 300 }}>
				<DownloadView os={this.getPlatform()} videoUrl={this.state.value} musicTitle={"CHANGE THIS TITLE"} musicAuthor={"CHANGE THIS AUTHOR"}></DownloadView>
				<TouchableOpacity onPress={this.onClose}>
					<Text>Close</Text>
					<Text>type: { this.state.type }</Text>
					<Text>value: { this.state.value }</Text>
				</TouchableOpacity>
			</View>
		)
	}
}