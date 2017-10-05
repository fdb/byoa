# A Refresher on JavaScript

JavaScript has evolved a lot in recent years. And although you can certainly still plunk some jQuery and a JavaScript file in a website, modern JavaScript is a lot more... well, modern.

"Modern JavaScript" is a bit of an ambiguous name, so we'll refer to it by its official name: ES6. ES6 stands for ECMAScript 6 \(ECMA is the organisation that standardizes JavaScript\), aka JavaScript 2015. Newer versions exist, but browser support is always lagging behind a bit \(more on that later\) so we'll focus on ES6.

This update solves a number of big issues JavaScript historically has, most notably:

* Should I put everything in one big file \(that's really hard to edit\) or spread it out over small modules \(but increase load times\)?
* If I include many small scripts in my project, will that pollute the global namespace? \(e.g. the `$` operator of jQuery that's available everywhere in the window\)
* If I declare a variable in a loop, why is it still available outside of the loop?

We'll go through the solutions to all of these issues. But first what good is a new version if nobody's using it? Let's talk about browser support.

## Browser Support

It's one thing to write up a wish list of features for JavaScript \(e.g. "standards"\). It's another thing to have those be implemented in all common browsers. Sometimes it takes _years_ before all features work on every browser and platform. Clearly, that won't do.

So some developers thought of writing a program that takes your fancy ES6 code, and _transpiles_ it to older code that works everywhere. That means your code can use all the latest features, but is converted down to a version of JavaScript that is supported in all browsers. That way, whenever a new feature comes out, we don't have to wait for every browser vendor \(Internet Explorer, Chrome, Firefox\) to implement it: using a transpiler, we can use all features immediately!

The most famous transpiler is called **Babel**. As the name suggests, it converts from one language into another. Weirdly enough, both of those languages is JavaScript.

![A screenshot of the Babel interactive sandbox](/assets/babel-repl-screenshot.png)

Being a program, Babel needs to be run every time our source code changes. This is often done through [Webpack](https://webpack.js.org/), which combines and packs all your JavaScript files into a single bundle file.

Lucky for us, the React Native tools already have Babel and Webpack set up, so we don't need to worry about any of this: we can just hit save and see the new version on our phones.

We'll be trying out some ES6 features as part of this chapter. All of them should just work in a recent version of Firefox or Chrome, so if we're only running our software on those platforms, we don't need Babel.

## Variables: Let and Const

We now have **three** different ways we can write variables in JavaScript: `var`, `let` and `const`. Here's an example:

```js
var alpha = 12;
let beta = 33;
const gamma = 42;
```

So what's the difference? Well, `let` and `const` are newer and have more logical rules around when a variable is "visible" to the rest of the program. Here's an example. Suppose I have a loop like this:

```js
for (var i = 0; i < dogs.length; i++) {
  dogs[i].bark();
}
```

Looking at this code, you would assume that the variable `i` is only visible inside of the `for` block. *And you would be wrong*. Using `var`, the variable sticks around for the entirety of the function. In fact, the variable is accessible before it is introduced using a phenomenon called *variable hoisting*.

That said: **forget about var**. Using `var` is the old way of doing things, and its rules for when you can see the variable and when you can't ("scoping") are confusing and counter-intuitive. The two new keywords are much more simple: variables are only visible in the block where they are declared. This is useful when your function does multiple things and you want to re-use variables:

```js
for (let i = 0; i < dogs.length; i++) {
  dogs[i].bark();
}
for (let i = 0; i < cats.length; i++) {
  cats[i].meow();
}
```
We can safely re-use variables without fear of one trampling over the other. This also comes up when using asynchronous code, like network requests or animation. The `var` is unstable, but `let` and `const` are stable.

```js
for (let i = 1; i <= 5; i++) {
    setTimeout(function() { console.log(i + '...'); }, i * 1000);
}
```

Running this code will return what we expect:
```
1...
2...
3...
4...
5...
```

However if we would have used `var` here, the result would be totally different:

```
6...
6...
6...
6...
6...
```

Because `var` sticks around long after our block of code has run, the value is still around when `console.log` comes and picks it up. This can result in bugs that are very hard to find.

In general, `let` is used for variables whose contents will change during the course of a function. For example, a loop counter or a running total:

```js
let total = 0;
for (let i = 0; i < cart.length; i++) {
  total += cart[i].price;
} 
```

By contrast, `const` is used for "variables" that don't change. This is useful for things that we're holding in our function, like references to document elements, shopping cart items, or database tables. For example:

```js
const header = document.querySelector('h1');
header.classList.add('bigger');
```

**Important caveat:** `const` only deals with the *variable binding*, not the constant itself. So while this is illegal:

```js
const x = 5;
x = 6; // WILL FAIL
```

This is not:

```js
const x = [1, 2, 3];
x.push(4);
```

In the latter case, we haven't re-assigned something else to x. `x` still contains a list, only we've now added an element to the list.

It's often useful to guarantee that the *contents* of the variable won't change either. For example, when implementing "undo", we might use this to keep a static snapshot of every previous state, so we can roll back to it if the user made a mistake. We can do this with some JavaScript trickery, or alternatively use [Immutable.js](http://facebook.github.io/immutable-js/).

So when should you use `let` and when should you use `const`? I'd say, when in doubt start with `const` first. If you are not sure whether your variable will change during the course of your function, it's safer to set it as const. This way, modifying a variable becomes a *deliberate* act, instead of something that is introduced accidentally.



