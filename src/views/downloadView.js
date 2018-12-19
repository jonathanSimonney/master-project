import React, {Component} from "react";
import {ActivityIndicator, Animated, Platform, StyleSheet, Text, TextInput, View} from "react-native";
import DownloadButton from "../components/downloadButton";

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});

export default class DownloadView extends Component<Props>{
	state = {
		loading: false,
		fadeAnim: new Animated.Value(0),
		musicTitle: this.props.musicTitle,
		musicAuthor: this.props.musicAuthor
	}

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
				<Text style={styles.instructions}>title of the music file : </Text>
				<TextInput
					accessibilityLabel={"name of the music filename when the music will be downloaded"}
					style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					onChangeText={(musicTitle) => this.setState({musicTitle})}
					value={this.state.musicTitle}
				/>
				<Text style={styles.instructions}>name of the author : </Text>
				<TextInput
					accessibilityLabel={"name of the author of the music when the music will be downloaded"}
					style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					onChangeText={(musicAuthor) => this.setState({musicAuthor})}
					value={this.state.musicAuthor}
				/>
				<DownloadButton videoUrl={this.props.videoUrl}  fileName={this.state.musicTitle} fileAuthor={this.state.musicAuthor}
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