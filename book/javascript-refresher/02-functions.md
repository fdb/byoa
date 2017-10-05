# JavaScript Functions

Functions are the backbone of every program. They cause things to happen. We can call them with some arguments, and get a return value back, or cause something to animate on-screen, or pop up a message,...

The way we traditionally write functions is using the `function` keyword, like this:

```js
function add(a, b) {
  return a + b;
}
```

This still works in ES6, and is the best way to write "normal" functions. However, JavaScript has introduced a number of interesting ways to manipulate data inspired by the functional programming world. For example, imagine we want to write a program that adds 1 to every number in a list. We could do this in a very typical way, by looping over list of numbers like so:

```js
const numbers = [10, 20, 30, 40, 50];
const newNumbers = [];
for (let i = 0; i < numbers.length; i++) {
  let v = numbers[i];
  v += 1;
  newNumbers.push(v);
}
```

This works, but we can certainly do better. What functional programming does is remove the work of manually writing a loop. Instead, we just write what needs to be done for every item. So, let's write a single function that adds one to an input value:

```js
function addOne(v) {
  return v + 1;
}
```

Now we can use the `map` method of the JavaScript array to apply this function to every item in the list, returning a new list in the process:

```js
const numbers = [10, 20, 30, 40, 50];
const newNumbers = numbers.map(addOne);
```

That's much shorter! The result is exactly the same: we have a new list of numbers with one added to every item. But because we use the `map` function, looping over items happens for us.

But we can do even better. We now had to create this `addOne` function that is used only once. JavaScript allows us to shorten this to an _anonymous function_. The old way of doing this involved using the `function` keyword inside of `map`:

```js
const numbers = [10, 20, 30, 40, 50];
const newNumbers = numbers.map(function(v) { return v + 1; }); 
```

Since this is such a common pattern, ES6 introduces _arrow functions_, which make this even shorter:

```js
const numbers = [10, 20, 30, 40, 50];
const newNumbers = numbers.map(v => v + 1);
```

This does exactly the same thing as all the others. The `=>`, commonly called a _fat arrow_, represents a function. The item before it is the argument name; the expression after it is the function body. The `return` statement is implied.

We don't have to use arrow functions only in the context of a `map`. We can also use them to create regular functions. For example:

```js
const addOne = v => v + 1;
```

This creates a `addOne` function, just like before. If we have more than one argument, we wrap them using parenthesis:

```js
const add = (a, b) => a + b;
```



