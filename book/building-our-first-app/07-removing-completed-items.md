## Removing completed items

Once items are completed, it is no longer useful to keep them around. We're going to add a button to the footer that removes completed items from our app. Start by hooking up the button in the footer. This code goes in `render`, right before the last closing `</View>`:

```js
<TouchableOpacity onPress={this.props.onClearCompleted}>
  <Text>Clear Completed</Text>
</TouchableOpacity>
```

Just like our filters, this is a `TouchableOpacity` with text inside. We use this instead of a `Button` since on Android, buttons are quite "in-your-face", which is not really necessary for this feature.

In App.js, we'll write the `onClearCompleted` function, then hook it up. It looks like this (put this after the `onFilter` method):

```js
onClearCompleted() {
  const newItems = this.state.items.filter(item => !item.complete);
  this.setState({ items: newItems });
}
```

The first line of this function does all the work: it uses `filter` to create a new list, based on our existing items, where only items are kept that are not complete (the exclamation mark means *not*).

Finally, pass the onClearCompleted method in our `render`:

```js
<Footer
  filter={this.state.filter}
  onFilter={this.onFilter.bind(this)}
  onClearCompleted={this.onClearCompleted.bind(this)}
/>
```

We should now be able to mark some items as completed, then delete them forever by pressing the "Clear Completed" button. Awesome!
