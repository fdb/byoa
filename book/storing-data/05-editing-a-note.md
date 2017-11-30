# Editing a Note

Our `NoteDetailScreen` shows the content of each note but we can't edit them yet. We need to do a few things to make that work:

- Change our `<Text>` to a multi-line `<TextInput>`.
- Keep the state of the `text` currently being edited.
- Create a Firebase ref to retrieve and set the value of the note.

Let's update the `NoteDetailScreen` constructor first. We want to have it retrieve the params from the navigation, which contains the note to be edited:

```js
constructor(props) {
  super(props);
  const { params } = this.props.navigation.state;
  const note = params.note;
  this.state = { key: note.key, text: note.text };
}
```

Then, whenever the value changes externally, we want to set the text to the new value. (This actually makes it possible, with some extra effort, to allow for multi-user editing!)

```js
componentDidMount() {
  this.noteRef = firebase.database().ref(this.state.key);
  this.noteRef.on('value', snap => {
    const newNote = snap.val();
    this.setState({ text: newNote.text });
  });
}
```

We'll create a new `noteRef` attribute that references the `key` of the note. This key looks like this:

```
notes/MKblPhx4loatGPFvRrGlaaMCfSp2/001
```

(to be extra-certain we have the right key, we'll also show it at the footer of this screen).

Then we'll create a method that gets called when we change the text:

```js
onChangeText(text) {
  this.noteRef.set({ text });
}
```

Every change to the text will be immediately updated in Firebase. Note that we don't set the state here! That's because Firebase will automatically call the "on value" listener that we added in `componentDidMount`, which will set the state for us. Doing it here would be redundant.

Finally, we'll render our input:

```js
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
```

Most of this is adding the correct properties to the [TextInput component](https://facebook.github.io/react-native/docs/textinput.html). Note that we also add an extra line that shows the _key_ of each note. This is just for debugging.

We'll style the components and we're done:

```js
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
```

