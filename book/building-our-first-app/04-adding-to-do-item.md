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

Keys in React are used whenever we have lists of something, and they have to be unique. The [`Date.now()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) function returns the current date and time as a value in milliseconds since 1 January 1970. It might be a bit of a weird representation, but is actually very useful since it is guaranteed to be unique \(we can't create two items in the same millisecond\).

The text of the new item comes from the state, so we just pass in `this.state.text`. And since we haven't completed our new item yet, we set `complete` to `false`. We're using a `const` since we don't need to change our `newItem` in this function.

The next line is a bit weird if you're not used to React:

```
const newItems = [...this.state.items, newItem];
```

This makes a _new_ list that contains all of the current values, and tacks on the new item. The `...` is called a _spread operator_ in ES6: it basically spreads out all of the individual items in the old list. Think of it as a copy-paste operator, where it would copy over all of the old items and place them in the position of the `...`.

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

Finally in our Header.js we're going to tell React to call `onAddItem` when we _submit_ our text \(either by pressing the "done" button on the software keyboard or pressing enter\):

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
