import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'

import {
    Text,
    View,
    TouchableOpacity, Button, Linking
} from 'react-native'

export default class Share extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isOpen: true,
            type: '',
            value: ''
        }
    }

    async componentDidMount() {
        try {
            const { type, value } = await ShareExtension.data()
            this.setState({
                type,
                value
            })
            ShareExtension.openURL('mp3managerapp://mp3manager/');
        } catch(e) {
            console.log('errrr', e)
        }
    }

    onClose = () => ShareExtension.close()

    closing = () => this.setState({ isOpen: false });

    render() {
        return (
            <Modal
                backdrop={false}
                style={{ backgroundColor: 'transparent' }}
                position="center"
                isOpen={this.state.isOpen}
                onClosed={this.onClose}
            >
                <View style={{ alignItems: 'center', justifyContent:'center', flex: 1 }}>
                    <View style={{ borderColor: 'green', borderWidth: 1, backgroundColor: 'white', height: 200, width: 300 }}>
                        <TouchableOpacity onPress={this.closing}>
                            <Text>Close</Text>
                            <Text>type: { this.state.type }</Text>
                            <Text>value: { this.state.value }</Text>
                            <Button title="Download it in Mp3Manager" onPress={ ()=>{ Linking.openURL('mp3manager://app/')}} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}