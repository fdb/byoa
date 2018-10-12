import React from 'react';
import { StatusBar, ActivityIndicator } from 'react-native';
import { Constants, Font } from 'expo';
import SignUpScreen from './SignUpScreen';
import RecipeListScreen from './RecipeListScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontsLoaded: false };
    this._loadFonts();
  }

  async _loadFonts() {
    await Font.loadAsync({
      Rosario: require('./assets/Rosario-Regular.ttf'),
      'Rosario-Italic': require('./assets/Rosario-Italic.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <ActivityIndicator
          size="large"
          style={{ width: '100%', height: '100%' }}
        />
      );
    } else {
      return <RecipeListScreen />;
    }
  }
}
