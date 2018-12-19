import React from 'react'
import { AppRegistry } from 'react-native'

import App from './app.android'
import Share from './share.android'
import {name as appName} from './app.json'

AppRegistry.registerComponent(appName, () => App)
AppRegistry.registerComponent('Mp3Manager', () => Share)
