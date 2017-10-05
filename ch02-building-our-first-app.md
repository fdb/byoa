# Building Our First App

We're going to build our first small to-do list app that allows us to create new items and mark of items as done. This is a bit the "hello world" of apps but it shows us a good tour of everything we can do: adding items, marking them as complete, deleting items, ... We'll focus on the functionality, not on the visual looks, so our app won't exactly look very sexy. That's why we'll call it **"Quasitodo"**. So let's get started!

To do this we're going to install the Expo XDE on our machine. This is one step up from Expo Snack: we still have the convenience of running everything directly on our phone, but our project is now a self-contained folder on our computer.

Expo Snack is very useful for small one-offs: experimenting with a certain control, trying out small style tweaks without installing anything, building apps on the go. However, for serious app development we need an environment that can contain multiple source files as well as assets such as images or sounds.


## Installing Expo & Visual Studio Code

Visit [expo.io/tools](https://expo.io/tools) and click the download button for your platform. Then, visit [code.visualstudio.com](https://code.visualstudio.com/) and download Visual Studio Code, an open-source, cross-platform editor by Microsoft.

Open the Expo XDE. You should have the option to create a new project. Call it "quasitodo".

![Expo create screen](/assets/quasitodo-create.png)

Let it do its thing for a bit. Click on the "Device" button in the toolbar and choose "Open on iOS Simulator" (or Android if you're on Windows). This should open the emulator with a piece of text in the middle. Then, click the project lightning bolt icon and choose "Open in Editor". This should open the entire project in Visual Studio Code.

## Examining our project

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

## Viewing our to-do items

The first thing I'd like to do when building an application is think about what kind of *data* we're working with. Since we're building a to-do list application, we're going to store a list of items. Each item will have the text of the to-do, of course, but also some extra information, such as if the item was completed or not. Also, React requires us for each item to have a unique key: for that we're going to use the current date and time (which, since it is stored internally in milliseconds, should never have two duplicate keys).

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
<FlatList data={items} renderItem={this.renderItem.bind(this)} />
```

Pretty simple, except for the weird "bind" thing. Ignore that for now — we'll talk about it later. Let's write this `renderItem` function. Add it below the `render()` function. It will take in an item and return a `<Text>` element for each item.

```js
renderItem(item) {
  return <Text>{item.item.text}</Text>;
}
```

If we save our document, the simulator should automatically refresh, showing us this *hideous* view (I told you it wasn't going to be pretty!)

![](/assets/quasitodo-initial.png)

We haven't defined any margins, meaning we just render *over* the status bar on iOS. Let's add a little bit of margin to the container view. In the `container` style properties at the bottom, add `paddingTop: 30,` to the list (if you're adding this after `justifyContent` make sure that line has a trailing comma!).

We're going to do a bit more of styling: we'll make every item align to the left, and add some padding and font styling.

To do that we're going to wrap every item in a `<View>`. Change the code in `renderItem` to look like this:

```js
<View style={styles.item}>
  <Text style={styles.itemText}>{item.item.text}</Text>
</View>
```

Also in the `<FlatList>` tag, add `style={styles.itemList}`. Now let's set those styles:

```js
itemList: {
  width: '100%'
},
item: {
  flex: 1,
  alignItems: 'flex-start',
  flexDirection: 'row',
  padding: 10,
  borderBottomColor: '#eee',
  borderBottomWidth: 1
},
itemText: {
  fontSize: 24,
  color: '#444'
}
```

Here's a short overview of the styling information:
- We set the itemList to a width of 100%, so it takes up the entire page. Note that we have to write this as a string, since this is just regular JavaScript and it doesn't understand values with units like CSS.
- We style an item by adding some flex information. This is currently unnecessary, but will be useful once we start adding additional controls for every row item (like a complete checkbox and a delete icon). The bottom border is similar to how we would it do it in CSS (although we can't use shorthand properties).
- The itemText just has a fontSize and color. We can use named colors ('red', 'green', ...), hexadecimal values, and rgba/hsl combinations, just like in CSS.

Note that this is just one way of styling the controls: experiment with the colors and font sizes to make it your own!

## Adding a to-do item

Add the top of our app we're going to add a text input where we can add new to-do items. We're going to put this in a custom `<Header>` component that we'll store in a separate file.

Create a new file called **Header.js** in the root directory of our project (so next to the **App.js** file). In Visual Studio Code, choose "New File" from the "File" menu and immediately save it with the name Header.js.

Let's fill it up: every component needs three things: a list of imports, a default class, and a style sheet. We're going to make a very basic header to check if it works first, then fill it in with our text input. Here's our basic file:

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Header</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green'
  }
});
```

Note that I've used green as the background color to make the component stand out. I probably don't want to leave that in, but for testing it's immediately clear where this component is.

Now let's import this component in our `App.js` and display it. First, add another import line after the `react` and `react-native` lines:

```js
import Header from './Header';
```

Then, in our render method, add a `<Header />` (note the slash!) right after our opening `<View>` tag (and before the `<FlatList>`). Save and you should see the smallish header appear:

![](/assets/quasitodo-small-header.png)

We're going to have the background of the header span the entire top of our app. Remove the `paddingTop: 30` from the `container` in App.js. Then, go in Header.js and edit the styles:

```js
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
    flexDirection: 'row',
    width: '100%'
  }
});
```

This should put the header across the entire top part of the screen.

Let's replace the `<Text>` with a `<TextInput>` control. Import `TextInput` by adding it to the imports from `react-native`. Replace the `<Text>` tag with a `<TextInput>` tag that looks like this:

```js
<TextInput
  style={styles.input}
  placeholder="Add To-do"
  returnKeyType="done"
/>
```

Add the styling information for the text input. Note that we have to add a comma after the closing bracket of the container styling!

```js
...styling for the container...
},
input: {
  flex: 1
}
```

If we save the file we should see the text input:

![](/assets/quasitodo-input-field.png)

Clicking it allows us to type in something (In the iOS Simulator you might need to go to Hardware > Keyboard and choose "Toggle Software Keyboard" to see the on-screen keyboard).

However once we press done or enter, nothing happens: the item is not saved, and our text is not cleared from the input field. That's because we haven't told our app what to do once the text input is *submitted*. Let's do that now.

## Hooking up the text input field

So far we haven't talked about state yet. Every application needs some *state*: information that describes the particular condition our app is in. In our case that might be which to-do items we have. Later on we're going to add filters to see the active or completed items. Our state will capture which filter is currently selected. 

In React all of that state is captured at the top level, in `App.js`. In addition, all methods that *modify* state, for example the `addItem` method, will also be defined in our top-level `App` class. All necessary state and methods is *passed down* to the components that need it. This method of working is called the [Flux Application Architecture](https://reactjs.org/blog/2014/05/06/flux.html) and we'll talk a bit more about how and why it works later in the book.

So let's begin by setting the *initial* state of our application. When we start up our application, do we already have to-do items? Eventually we're going to save our to-do items so we don't clear out the list every time the application exits, but right now, our initial to-do items are going to be the two items we've created at the top of our App.js file. 

We can specify a class *constructor* that gets run when a component gets created for the first time. In our App.js add the following code right below the `export default class App` line:

```js
constructor(props) {
  super(props);
  this.state = { items, text: '' };
}
```

Ignoring the `super` line (which just passes on information to React's internals) we see that we set the state of the application using `this.state`. The state contains two pieces of information: the list of to-do items (initially those come from the fixed list we've initialized at the top: we'll replace this with the saved list of items later), and the text we're editing.

That last part is a bit weird, so let me explain: all state in React is captured, every very small state like the letters of the text we're typing. When I first started React, it seemed logical to just want to extract data from the text input but that's not the way it works. Instead, think of it as re-rendering the entire application between each key press. If we think of it that way, React has to know what value is in the text input field (our partial to-do item text) otherwise it won't be able to render. So we're remembering this text. In addition, we're going to set this text every time we change it (meaning, again, on every key press). Let's do that now:


Write an `onChangeText` method in our App class, beneath the constructor, that looks like this:

```js
onChangeText(text) {
  this.setState({ text });
}
```

This takes in the text from the input text component (not yet, we still need to hook it up) and sets the state with the text. Note that we need to use `setState` here to let React know we're changing something to the state, and it needs to re-render the application. Also note that we're just writing `text` between the brackets. That's equivalent to writing `{ text: text }`; it's just nicer and shorter.

Go to the `render` method and change the `<Header>` to pass on our `onChangeText` method:

```js
<Header
  text={this.state.text}
  onChangeText={this.onChangeText.bind(this)}
/>
```

Note the weird "bind" thing at the end of `onChangeText`. This is an unfortunate quirk of JavaScript that React can't really work around. So every time we pass a method, we use this `bind` trick to make sure it stays attached to the current class, otherwise things will go wonky.

In our Header.js we'll change the `<TextInput>` to use the input text as its value, and call our `onChangeText` method whenever something changes:

```js
<TextInput
  style={styles.input} 
  placeholder="Add To-do"
  returnKeyType="done"
  value={this.props.text}
  onChangeText={this.props.onChangeText}
/>
```

Note that to access `text` and `onChangeText`, we now use `this.props` instead of `this.state`. That's because once we pass on `this.state.text` from our App to the Header, the Header component no longer cares that this is something we kept in state. It could come from anywhere, for all it knows. The items of state in our App become the *properties* of the Header. In other words, the state is the state of our `App` class, not of our `Header` class. In fact, our `Header` doesn't have any state at all: it just passes on everything to the `App`, and then lets the `App` change *its* state and re-render everything.

We can now type in text and we see it appear just like before. However, now we are re-rendering the app and passing the text as state. We can check this by changing the `onChangeText` method in App.js to look like this:

```js
onChangeText(text) {
  this.setState({ text: text.toUpperCase() });
}
```

Now, whenever we type, all of our incoming text will be converted to upper-case letters. When you're done experimenting, change it back to the previous version (`{text}`).

## Adding the new to-do item

To add the to-do item we'll write an `onAddItem` method in our App.js that looks like this:

```js
onAddItem() {
  const newItem = { key: Date.now(), text: this.state.text, complete: false };
  const newItems = [...this.state.items, newItem];
  this.setState({ items: newItems, text: '' });
}
```

Let's unpack this line by line:

```js
const newItem = { key: Date.now(), text: this.state.text, complete: false };
```

First, we're going to create a new item. This contains the same properties as the other items we've created at the top of our file: a `key`, the `text` of the item and a `complete` flag that indicates whether we've marked off this item.

Keys in React are used whenever we have lists of something, and they have to be unique. The [`Date.now()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) function returns the current date and time as a value in milliseconds since 1 January 1970. It might be a bit of a weird representation, but is actually very useful since it is guaranteed to be unique (we can't create two items in the same millisecond).

The text of the new item comes from the state, so we just pass in `this.state.text`. And since we haven't completed our new item yet, we set `complete` to `false`. We're using a `const` since we don't need to change our `newItem` in this function.

The next line is a bit weird if you're not used to React:

```
const newItems = [...this.state.items, newItem];
```

This makes a *new* list that contains all of the current values, and tacks on the new item. The `...` is called a *spread operator* in ES6: it basically spreads out all of the individual items in the old list. Think of it as a copy-paste operator, where it would copy over all of the old items and place them in the position of the `...`.

The reason we make a new list, instead of just using `push` is because it allows us to do some nifty tricks later on. For example, if we want to support undo, we can keep a history of all of the states of our application. By making a new list every time, we can just point React to that state, and it will render the old list just like it was.

```
this.setState({ items: newItems, text: '' });
```

Finally, this line sets the state with our items now pointing to the `newItems` list. In addition, since we just added the item, we want to clear out our text input by setting the `text` value to the empty string.

Just like with the text input, let's pass on this method to the `<Header>` component:

```js
<Header
  text={this.state.text}
  onChangeText={this.onChangeText.bind(this)}
  onAddItem={this.onAddItem.bind(this)}
/>
```

Again, we use `bind` to make sure the value of our `this` is set correctly. That's important, because we use `this.setState()` and we want the `this` to point to our App object, not some random other thing.

Finally in our Header.js we're going to tell React to call `onAddItem` when we *submit* our text (either by pressing the "done" button on the software keyboard or pressing enter):

```js
<TextInput
  style={styles.input}
  placeholder="Add To-do"
  returnKeyType="done"
  value={this.props.text}
  onChangeText={this.props.onChangeText}
  onSubmitEditing={this.props.onAddItem}
/>
```

And that's it! We should now be able to add new items and see them appear in the list. In addition, our text is cleared out once we press enter.

## Completing an item

We now have a list of to-do items, but we want to be able to mark them off as done once we've actually completed them. To do that we're going to add a [Switch](https://facebook.github.io/react-native/docs/switch.html) component that can be toggled between "on" and "off".

Since our to-do item will be more than a single `<View>` with `<Text>` field we're going to put it in its own file, called `TodoItem.js`. Make that new file and place the following code:

```js
import React from 'react';
import { StyleSheet, Text, View, TextInput, Switch } from 'react-native';

export default class TodoItem extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.text}</Text>
        <Switch value={item.complete} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  itemText: {
    fontSize: 24,
    color: '#444'
  }
});
```

We recognize the structure from the Header class: first some imports, then the default class, and finally some styles. I've already added the `Switch` component, although it doesn't actually work yet: we'll do that later.

Now back in our App.js import the TodoItem at the top:

```js
import TodoItem from './TodoItem';
```

Then in `renderItem` replace all the components with our `<TodoItem>`:

```js
renderItem(item) {
  return <TodoItem item={item.item} />;
}
```

Finally, remove the `item` and `itemText` styles from the App style sheet (we've moved them over to our to-do item class). If you refresh you should see the switches next to each item:

![](/assets/quasitodo-switch.png)

Toggling them doesn't do anything yet, so let's change that. Write a `onToggleItem` in App.js (below `onAddItem` is a good spot):

```js
onToggleItem(key, complete) {
  const newItems = this.state.items.map(item => {
    if (item.key !== key) return item;
    return { ...item, complete };
  });
  this.setState({ items: newItems });
}
```

This looks more complex than just changing a `complete` flag. That's because we want to keep the old value around. The `map` function builds a new list. For each item of the list, we're going to check if it's the one we're changing. If not, we'll just return it. If it is, we copy all properties in it, except for complete which we replace (`{ ...item, complete }`).  Then, we set the state to our new items.

In `renderItem()` we also have to pass in our `onToggleItem` method like this:

```js
renderItem(item) {
  return (
    <TodoItem
      item={item.item}
      onToggleItem={this.onToggleItem.bind(this, item.item.key)}
    />
  );
}
```

Because we also want to know the current key, our `bind` not just includes `this`, but also the `key` of the item we're rendering. We'll talk more about binding in the JavaScript refresher chapter.

Finally, in our `TodoItem.js` file add `onValueChange` to the `<Switch>` component:

```js
<Switch value={item.complete} onValueChange={this.props.onToggleItem} />
```

We should now be able to switch between completed and non-completed. However, our text stays looking just the same. We'll provide some styling changes: it's up to you to make it a bit more fancy.


First define a `complete` style in the TodoItem stylesheet:

```js
complete: {
  textDecorationLine: 'line-through'
},
```

We'll apply this style to the `<Text>` inside of our to-do item. As you can see, it will cross off our item.

In the `<Text>` component change the style to look like this:

```js
<Text style={[styles.itemText, item.complete && styles.complete]}>{item.text}</Text>
```

Our style attribute is now a list containing the original `itemText` style and a conditional style: the double ampersand means: only apply this style if `item.complete` is true.

Save it, check off an item in the app and see how it appears. Experiment with the styling, for example by changing the text color. You can also apply different styles to the `item` view and change the background color.

![](/assets/quasitodo-line-through.png)


