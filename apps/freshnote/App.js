import React from 'react';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

import NoteListScreen from './NoteListScreen';
import NoteDetailScreen from './NoteDetailScreen';
import LoginScreen from './LoginScreen';

const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  NoteList: { screen: NoteListScreen },
  NoteDetail: { screen: NoteDetailScreen }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyDMtYW-wjd92qRwJX92mjeg8B0JxP5b0Ws',
      authDomain: 'fdb-freshnote.firebaseapp.com',
      databaseURL: 'https://fdb-freshnote.firebaseio.com',
      projectId: 'fdb-freshnote',
      storageBucket: 'fdb-freshnote.appspot.com',
      messagingSenderId: '683729693275'
    };
    firebase.initializeApp(config);
  }
  render() {
    return <AppNavigator />;
  }
}
