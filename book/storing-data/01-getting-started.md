# Getting Started with Firebase

First we'll create a new Expo project. Open the Expo XDE and create a new blank project, called `freshnote`, or use the command line:

```
exp init freshnote
```

Because our app will have multiple screens we're going to need the `react-navigation` package to navigate between them. Open the command line, use `cd` to go to the project directory, and install the package:

```
cd YOURPROJECTDIRECTORY
npm install
npm install --save react-navigation
```

The blank `npm install` is needed to install the core dependencies like React, Expo, etc. that have been listed in our `package.json` file.

We should now be able to start the application and see the default screen. Now, let's build our base foundation for viewing notes.

## Setting up Navigation

Our app will initially navigate between two screens (later, we'll add the sign up and log in screens as well). We'll use a simple `StackNavigator` to move from one screen to the next.

Open up `App.js` and replace it with the following code:

```js
import React from "react";
import { StackNavigator } from "react-navigation";
import NoteListScreen from "./NoteListScreen";
import NoteDetailScreen from "./NoteDetailScreen";

const AppNavigator = StackNavigator({
  NoteList: { screen: NoteListScreen },
  NoteDetail: { screen: NoteDetailScreen }
});

export default class App extends React.Component {
 render() {
    return <AppNavigator />;
  }
}
```

Note that we split up the navigator and the app component. That's because we'll need to add extra things to our App component once we're integrating Firebase.

The code won't work right now since it references two screens that don't exist yet. We'll create those now.

## Setting up the Note List Screen

The note list screen will initially contain a set of hard-coded, default notes, that we'll replace later with the dynamic data we'll load from Firebase. Note that the default notes are useful since they will appear for new users.

Create a new file called `NoteListScreen.js`. Start with the imports:

```js
import React from 'react';
import { View, FlatList, Text, TouchableHighlight, StyleSheet } from 'react-native';
```

Then we'll create a list of note objects. These will contain a `key` (the creation date) and the `text` of the note:

```js
const DEFAULT_NOTES = [
  {
    key: 1512027663498,
    text: 'Welcome to Freshnote! Use the app for recording thoughts, large and small.'
  },
  {
    key: 1512027698885,
    text: 'These are the default notes but you can delete them.'
  }
];
```

Then we'll move on to our main component. It will take in the `DEFAULT_NOTES` as initial state, then render them using a `FlatList` component:

```js
export default class NoteListScreen extends React.Component {
  static navigationOptions = {
    title: 'All Notes'
  };

  constructor(props) {
    super(props);
    this.state = { notes: DEFAULT_NOTES };
  }

  onChooseNote(note) {
    const navigate = this.props.navigation.navigate;
    navigate('NoteDetail', { note });
  }

  render() {
    return (
      <View style={styles.container}>
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
```

That's a lot of code! However, there are no new or surprising things in here. We already used the `FlatList` in our to do application, and we covered navigation in the previous chapter.

The only difference is in `renderItem` how we show the note. We wrap our `View` in a `TouchableHighlight` so the entire row is touchable. For our `Text` component, we use `numberOfLines={1}` so we only show the first line, even for very long notes (the text will be shown with an ellipsis).

Finally we'll add some styling to the component:

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
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
```

## Setting up the Note Detail Screen

The note detail screen is even simpler, initially, since it just shows the note as a `Text` field.

Create `NoteDetailScreen.js` and add the imports:

```js
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
```

Our component just renders the note it receives from the navigation parameters:

```js
export default class NoteDetailScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { params } = this.props.navigation.state;
    const note = params.note;

    return (
      <View style={styles.container}>
        <Text>{note.text}</Text>
      </View>
    );
  }
}
```

And our styling just provides a bit of padding so the note is not squashed against the side:

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 10
  }
});
```

We should now have a very basic note application that can show a list of notes, and we can navigate around to view each note in detail. We don't have any interaction yet, we'll add that in the next chapter.
