import React from 'react'
import { AppRegistry } from 'react-native'

import App from './App.js'
import OriginalShare from './src/components/share.js'
import {name as appName} from './app.json'

AppRegistry.registerComponent(appName, () => App)
AppRegistry.registerComponent('Mp3Manager', () => OriginalShare)