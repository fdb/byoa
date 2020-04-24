import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, Dimensions } from 'react-native';
import firebase from 'firebase';

export default class NoteDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    const note = params.note;
    console.log('CONSTRUCT ', note);
    this.state = { key: note.key, text: note.text };
  }

  componentDidMount() {
    this.noteRef = firebase.database().ref(this.state.key);
    console.log('NOTE REF', this.noteRef);
    this.noteRef.on('value', snap => {
      console.log('VALUE', snap);
      const newNote = snap.val();
      console.log('NEWNOTE', newNote);
      this.setState({ text: newNote.text });
    });
  }

  onChangeText(text) {
    this.noteRef.set({ text });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.noteInput}
          multiline={true}
          autoGrow={true}
          value={this.state.text}
          onChangeText={this.onChangeText.bind(this)}
        />
        <Text style={styles.noteKey}>{this.state.key}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 10
  },
  noteInput: {
    fontSize: 16,
    flex: 1
  },
  noteKey: {
    fontSize: 10,
    color: '#666'
  }
});
