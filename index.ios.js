import React from 'react'
import { AppRegistry } from 'react-native'

import App from './app.ios'
//import Share from './share.ios'
import Share from './app.ios'
import {name as appName} from './app.json'

AppRegistry.registerComponent(appName, () => App)
AppRegistry.registerComponent('Mp3Manager', () => Share)