// Created by Judith Kurian (B00940475)

import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { PermissionsAndroid, Platform } from 'react-native';
import { Provider } from 'react-redux';
import {store, persistor} from './Store';
import StackNav from './AppNavigation';

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
              <StackNav />
            </PersistGate>
        </Provider>
    );
  }
}