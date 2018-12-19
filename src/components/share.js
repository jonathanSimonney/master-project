import React, { Component } from 'react'
// import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'

import {
	Text,
	View,
	TouchableOpacity
} from 'react-native'
import DownloadView from "../views/downloadView.js";

export default class OriginalShare extends Component {
	constructor(props, context) {
		super(props, context)
		this.state = {
			type: '',
			value: ''
		}
	}

	async componentDidMount() {
		try {
			const { type, value } = await ShareExtension.data()
			console.log("share called 2", type, value, this.state)
			this.setState({
				type,
				value
			})
			//ShareExtension.openURL('mp3managerapp://mp3manager/');
		} catch(e) {
			console.log('errrr', e)
		}
	}

	onClose = () => ShareExtension.close()


	render() {
		return (
			<View style={{ borderColor: 'green', borderWidth: 1, backgroundColor: 'white', height: 600, width: 300 }}>
				<DownloadView videoUrl={this.state.value} musicTitle={"CHANGE THIS TITLE"} musicAuthor={"CHANGE THIS AUTHOR"}></DownloadView>
				<TouchableOpacity onPress={this.onClose}>
					<Text>Close</Text>
					<Text>type: { this.state.type }</Text>
					<Text>value: { this.state.value }</Text>
				</TouchableOpacity>
			</View>
		)
	}
}