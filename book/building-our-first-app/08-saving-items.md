# Saving Items

So far we've been able to toy around with the application, but items we created didn't stick around. If we force-quit the application (by swiping it away in the iOS or Android recent app list) and start it back up, the application just has our two default items.

We will talk about saving data to the cloud later. Right now, let's save the data locally on our phone. To do that we will use **AsyncStorage**.

AsyncStorage is super-simple: all it can do is take a string, and save it under a name. It doesn't support storing complex objects (like a list of items) at all. So to use it, we will convert our items to a JSON string, then restore them back once the application starts.

First some cleanup. Since we no longer use the `items` array at the top as the definitive collection of items, we will rename it to `INITIAL_ITEMS` (the upper casing indicates that this is a constant and will never change):

```js
const INITIAL_ITEMS = [
  { key: 1507129580608, text: 'Welcome to Quasitodo!', complete: false },
  { key: 1507129597587, text: 'Add new to-do items at the top.', complete: false }
];
```

Then, in the `constructor`, set the items to be an empty array:

```js
constructor(props) {
  super(props);
  this.state = { items: [], text: '', filter: 'all' };
}
```

Now that that's out of the way, let's start by *getting* the items. Add an import to `AsyncStorage` and `Alert` at the top. Then create a `componentWillMount` method right below the `constructor`:

```js
componentWillMount() {
  AsyncStorage.getItem('items').then(json => {
    if (!json) {
      // There are no items yet. We load up the initial items.
      this.setState({ INITIAL_ITEMS });
      return;
    }
    try {
      const items = JSON.parse(json);
      this.setState({ items });
    } catch (e) {
      Alert.alert('Quasitodo', 'Something went wrong when loading your items.');
    }
    this.setState({ INITIAL_ITEMS });
  });
}
```

This does a number of things. First it calls `AsyncStorage` fetching our key (called `items`). This returns a `Promise` object, which means the result will come back later. We attach a `then` method to it to get the result once those come back. Note this might happen several seconds after the app has loaded (we'll add a loading indicator later).

Once we have the JSON, we first check if there is data in it. Perhaps we just started the app for the first time and the application does not contain any data yet: in that case, we just use our initial items. If we *have* JSON data, we're going to parse it, which hopefully converts it to our list of items. We then set this list to the current state. If something goes wrong, we fall in the catch block, where we show an alert that we couldn't load the user's items. We also set the items back to our initial items. Sorry user, we just lost all of your data :-(

Start up the app. You should see our new initial items being loaded:

![](/assets/quasitodo-initial-items.png)

## Persisting changes

We will save the items anytime something changes. We could write this in every function that sets `items`, but that could lead to errors when we accidentally forget one. Instead, every time we change our items we will call a custom function, `setItems` that sets the state like we did before, and then *also* save the items in AsyncStorage. Add this method below `componentWillMount`:

```js
setItems(items) {
  AsyncStorage.setItem('items', JSON.stringify(items));
  this.setState({ items });
}
```

Now all we have to do is change our other methods to call *this* function if we're changing items. Change `onAddItem` to look like this:

```js
onAddItem() {
  const newItem = { key: Date.now(), text: this.state.text, complete: false };
  const newItems = [...this.state.items, newItem];
  this.setItems(newItems);
  this.setState({ text: '' });
}
```

This method also used `setState` to clear out the text field, so here we'll have to call both our `setItems` and the regular `setState`.

Change the two other occurrences of `this.setState({ items: newItems })` to `this.setItems(newItems)`. You will need to change `onToggleItem` and `onClearCompleted`.

## Showing a loading indicator

Since the name is **Async**Storage, we can guess that reading and writing from storage happens asynchronously (that is, not immediately). Our `componentWillMount` function will start loading items, but the results might only come in after a number of seconds (generally it will be much faster). To avoid showing an empty list to the user, we will add a loading spinner that indicates we're still loading the content. When we have our list of items, we will remove the spinner.

The spinner is an actual control, called [`ActivityIndicator`](https://facebook.github.io/react-native/docs/activityindicator.html) that you add to your main view. We will add it after the `<Footer>` and size it up to take over the entire screen. First add `ActivityIndicator` to your list of imports at the top, then create a new `<View>` below the `<Footer>` in the render method (right before the closing `</View> tag):

```js
<View style={styles.loading}>
  <ActivityIndicator animating size="large" />
</View>
```

Then add the `loading` style to the style sheet (don't forget the comma on the previous item!):

```js
loading: {
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)'
}
```






