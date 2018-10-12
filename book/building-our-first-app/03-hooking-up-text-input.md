# Hooking up the text input field

So far we haven't talked about state yet. Every application needs some _state_: information that describes the particular condition our app is in. In our case that might be which to-do items we have. Later on we're going to add filters to see the active or completed items. Our state will capture which filter is currently selected.

In React all of that state is captured at the top level, in `App.js`. In addition, all methods that _modify_ state, for example the `addItem` method, will also be defined in our top-level `App` class. All necessary state and methods is _passed down_ to the components that need it. This method of working is called the [Flux Application Architecture](https://reactjs.org/blog/2014/05/06/flux.html) and we'll talk a bit more about how and why it works later in the book.

So let's begin by setting the _initial_ state of our application. When we start up our application, do we already have to-do items? Eventually we're going to save our to-do items so we don't clear out the list every time the application exits, but right now, our initial to-do items are going to be the two items we've created at the top of our App.js file.

We can specify a class _constructor_ that gets run when a component gets created for the first time. In our App.js add the following code right below the `export default class App` line:

```js
constructor(props) {
  super(props);
  this.state = { items: INITIAL_ITEMS, text: '' };
}
```

Ignoring the `super` line \(which just passes on information to React's internals\) we see that we set the state of the application using `this.state`. The state contains two pieces of information: the list of to-do items \(initially those come from the fixed list we've initialized at the top: we'll replace this with the saved list of items later\), and the text we're editing.

To make sure we're actually rendering the updated list, change the `render` method to render the current list of items, not just the `INITIAL_ITEMS`. Change the `<FlatList>` code in `render` like so:

```js
<FlatList data={this.state.items} renderItem={this.renderItem.bind(this)} />
```

That last part is a bit weird, so let me explain: all state in React is captured, every very small state like the letters of the text we're typing. When I first started React, it seemed logical to just want to extract data from the text input but that's not the way it works. Instead, think of it as re-rendering the entire application between each key press. If we think of it that way, React has to know what value is in the text input field \(our partial to-do item text\) otherwise it won't be able to render. So we're remembering this text. In addition, we're going to set this text every time we change it \(meaning, again, on every key press\). Let's do that now:

Write an `onChangeText` method in our App class, beneath the constructor, that looks like this:

```js
onChangeText(text) {
  this.setState({ text });
}
```

This takes in the text from the input text component \(not yet, we still need to hook it up\) and sets the state with the text. Note that we need to use `setState` here to let React know we're changing something to the state, and it needs to re-render the application. Also note that we're just writing `text` between the brackets. That's equivalent to writing `{ text: text }`; it's just nicer and shorter.

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

Note that to access `text` and `onChangeText`, we now use `this.props` instead of `this.state`. That's because once we pass on `this.state.text` from our App to the Header, the Header component no longer cares that this is something we kept in state. It could come from anywhere, for all it knows. The items of state in our App become the _properties_ of the Header. In other words, the state is the state of our `App` class, not of our `Header` class. In fact, our `Header` doesn't have any state at all: it just passes on everything to the `App`, and then lets the `App` change _its_ state and re-render everything.

We can now type in text and we see it appear just like before. However, now we are re-rendering the app and passing the text as state. We can check this by changing the `onChangeText` method in App.js to look like this:

```js
onChangeText(text) {
  this.setState({ text: text.toUpperCase() });
}
```

Now, whenever we type, all of our incoming text will be converted to upper-case letters. When you're done experimenting, change it back to the previous version \(`{text}`\).

