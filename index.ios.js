import React from 'react'
import { AppRegistry } from 'react-native'

import App from './App.js'
import Share from './share.ios.js'
import {name as appName} from './app.json'

AppRegistry.registerComponent(appName, () => App)
AppRegistry.registerComponent('Mp3Manager', () => Share)