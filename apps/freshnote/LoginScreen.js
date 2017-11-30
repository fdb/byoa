import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', loading: false };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('NoteList');
      }
    });
  }

  onLoginPress() {
    this.setState({ error: '', loading: true });

    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(e => {
        console.log(e);
        this.setState({ error: `Login failed: ${e.message}`, loading: false });
      });
  }

  onSignUpPress() {
    this.setState({ error: '', loading: true });

    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(e => {
        console.log(e);
        this.setState({ error: `Sign up failed: ${e.message}`, loading: false });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.formLabel}>Email</Text>
        <TextInput
          style={styles.formInput}
          placeholder="freshnote@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={email => this.setState({ email })}
        />
        <Text style={styles.formLabel}>Password</Text>
        <TextInput
          style={styles.formInput}
          placeholder="********"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />
        {this.renderButtons()}
        <Text style={styles.formError}>{this.state.error}</Text>
      </View>
    );
  }

  renderButtons() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    } else {
      return (
        <View>
          <Button title="Login" onPress={this.onLoginPress.bind(this)} />
          <Button title="Sign Up" onPress={this.onSignUpPress.bind(this)} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  formLabel: {
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20
  },
  formInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10
  },
  formError: {
    textAlign: 'center',
    color: 'red'
  }
});
