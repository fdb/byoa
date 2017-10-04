# Building Our First App

We're going to build our first small todo list app that allows us to create new items and mark of items as done. This is a bit the "hello world" of apps but it shows us a good tour of everything we can do: adding items, marking them as complete, deleting items, ... We'll focus on the functionality, not on the visual looks, so our app won't exactly look very sexy. That's why we'll call it **"Quasitodo"**. So let's get started!

To do this we're going to install the Expo XDE on our machine. This is one step up from Expo Snack: we still have the convenience of running everything directly on our phone, but our project is now a self-contained folder on our computer.

Expo Snack is very useful for small one-offs: experimenting with a certain control, trying out small style tweaks without installing anything, building apps on the go. However, for serious app development we need an environment that can contain multiple source files as well as assets such as images or sounds.


## Installing Expo & Visual Studio Code

Visit [expo.io/tools](https://expo.io/tools) and click the download button for your platform. Then, visit [code.visualstudio.com](https://code.visualstudio.com/) and download Visual Studio Code, an open-source, cross-platform editor by Microsoft.

Open the Expo XDE. You should have the option to create a new project. Call it "quasitodo".

![Expo create screen](/assets/quasitodo-create.png)

Let it do its thing for a bit. Click on the "Device" button in the toolbar and choose "Open on iOS Simulator" (or Android if you're on Windows). This should open the emulator with a piece of text in the middle. Then, click the project lightning bolt icon and choose "Open in Editor". This should open the entire project in Visual Studio Code.

If we look in the sidebar we see that we have a lot more than just one file! We now have a directory containing multiple folders (`assets`, `node_modules`) and multiple cryptic files. For now, we're just going to focus on the *entry point* of our application, which is `App.js`. It looks like this:

```
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

This is a good starting point for building out our app, so we'll leave this code in for now.

The first thing I'd like to do when building an application is think about what kind of *data* we're working with. Since we're building a to do list application, we're going to store a list of items. Each item will have the text of the to do, of course, but also some extra information, such as if the item was completed or not. Also, React requires us for each item to have a unique key: for that we're going to use the current date and time (which, since it is stored internally in milliseconds, should never have two duplicate keys).

Let's add some dummy data at the top of our `App.js`, right below our `import` statements:

```js
const items = [
  {key: 1507129580608, text: 'Buy bread', complete: false},
  {key: 1507129597587, text: 'Walk the dog', complete: false},
]
```

Since we don't have any user interface at all, let's start by *rendering* our list of items. In React we're going to use a [FlatList](https://facebook.github.io/react-native/docs/flatlist.html) for this. It requires us to give a list of items (which we have) and a *rendering function*: something React will call for every item (actually, just for the items that are *on screen*; invisible items will not be rendered).

Let's import `FlatList` from `react-native` (add it to the import statement at the top, after `Text` and `View`). Then, replace the `<Text>` component with a `<FlatList>` like this:

```js
<FlatList data={items} renderItem={this.renderItem} />
```

Pretty simple. Let's write this `renderItem` function. Add it below the `render()` function. It will take in an item and return a `<Text>` element for each item.

```js
renderItem(item) {
  return <Text>{item.item.text}</Text>;
}
```



