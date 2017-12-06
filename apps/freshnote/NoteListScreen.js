import React from 'react';
import { View, Button, FlatList, ActivityIndicator, Text, TouchableHighlight, StyleSheet } from 'react-native';
import firebase from 'firebase';

const DEFAULT_NOTES = [
  { text: 'Welcome to Freshnote! Use the app for recording thoughts, large and small.' },
  { text: 'These are the default notes but you can delete them.' }
];

export default class NoteListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'All Notes',
      headerLeft: <Button title="Sign Out" onPress={params.onSignOut ? params.onSignOut : () => null} />
    };
  };

  constructor(props) {
    super(props);
    this.state = { loading: true, notes: [] };
  }

  componentDidMount() {
    const currentUser = firebase.auth().currentUser;
    console.assert(currentUser);
    const notesKey = `notes/${currentUser.uid}`;
    this.notesRef = firebase.database().ref(notesKey);
    this.notesRef.on('value', snap => {
      let notes = [];
      snap.forEach(child => {
        notes.push({ key: notesKey + '/' + child.key, text: child.val().text });
      });
      if (notes.length === 0) {
        notes = DEFAULT_NOTES;
        this.notesRef.set(DEFAULT_NOTES);
      }
      this.setState({ notes, loading: false });
    });

    this.props.navigation.setParams({
      onSignOut: this.onSignOut.bind(this)
    });
  }

  onSignOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.goBack();
      });
  }

  onChooseNote(note) {
    const navigate = this.props.navigation.navigate;
    navigate('NoteDetail', { note });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && <ActivityIndicator style={styles.loading} />}
        <FlatList style={styles.noteList} data={this.state.notes} renderItem={this.renderItem.bind(this)} />
      </View>
    );
  }

  renderItem(item) {
    const note = item.item;
    return (
      <TouchableHighlight key={note.key} onPress={this.onChooseNote.bind(this, note)}>
        <View style={styles.noteItem}>
          <Text numberOfLines={1}>{note.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  loading: {
    paddingTop: 50
  },
  noteList: {
    width: '100%'
  },
  noteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white'
  }
});
