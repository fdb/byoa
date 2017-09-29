# BYOA — Build Your Own App

This book introduces you to the world of apps, and how to get started writing your own app. Things we'll cover in this book:

* An introduction of the app landscape.
* Using Expo and Expo Snack to get started writing apps, fast.
* An in-depth tutorial of React and React Native. How React Native works to make apps in JavaScript without losing performance.
* A refresher of JavaScript, with a focus on ES6 features and JSX.
* Tooling useful for desiging your app: not just how to configure your code editor, but also how to manage projects, design and test mockups, source control.
* How to communicate with a back-end: in our case, using Firebase.
* A short introduction into guidelines for the App Store; which apps are allowed?
* How to prepare the correct materials for marketing
* How to acquire and retain your users.

# Introduction

Since the introduction of the iPhone, developers and designers have wanted to build apps for it. The sleek design, the smooth UI and the massive reach of the platform means that building a successful app can introduce it to millions of users. It is only through the iPhone and

With the introduction of Android, Google showed that they wanted to be a player in this field as well. And they succeeded massively. They've shown that even being second doesn't really matter: Android sales have far surpassed iPhone sales. However, that doesn't necessarily translate in revenue for developers: people just buy a lot more on iPhone than they do on Android.

## A Fragmented World

Having two different platforms meaning having two different ways of developing apps. And even though externally, all smartphones have more or less settled on the same basic "rectangle of glass" design, on the software side things are very different. iOS apps are written in Swift or Objective-C using Xcode, a tool only available on macOS. Android apps are written in Java using Android Studio. And that's just the language: the way we build the UI, the interactions, the gestures, are completely different on both platforms.

A number of solutions have come up to bridge this gap. The first solution is the one that Steve Jobs himself presented as the only option when he first introduced the iPhone: build an app using web technologies. Using HTML, CSS and JavaScript, we can build a solid application. That solution now lives on in the form of Progressive Web Apps, or PWAs. We won't talk about progressive web apps in this book, but they do provide a very viable alternative on developing native apps.

## React Native

In 2013, Facebook introduced React, a library they were using to simplify user interface development. Later in this book we'll dive deeper into React, but the main idea was to avoid thinking about dependencies by re-rendering the entire interface whenever something changed. Of course this is ridiculously inefficient when done in a naive way, so React provided a smart way to do updates efficiently.

Then in 2015, React Native came along, taking the philosophy of one-way dataflow \(again, we'll go deeper into this later on\) and bringing it to mobile applications; first on iOS, then also on Android. By separating the rendering concepts from what actually got rendered, they could use the same technology but render native controls \(buttons, sliders, pop-ups\) on both iOS and Android.

React Native represents a sea change in the way we think about apps, and brings the fast tooling of the web to native development. Once set up, we can automatically view our changes without restarting the app, even without losing our position inside of the app.

It's still early days, and not all tools work perfectly. But it's an exciting way of bringing app development to people who are familiar with web technologies, and for whom the barrier to entry to native app development was way too high. So if that's you, welcome!

## What We'll Learn

App development brings together a number of skills, and the design of the user interface is just one part. We also need to learn how to onboard new users, how to make our apps talk to online services and other users. Since we're just one app in a sea of other apps, we need to find a way to make our app stand out: we'll think about marketing, differentiation strategies and user acquisition.

To develop our app there are a lot of tools available for us. We will learn about tools for creating interface mockups, tools for project management, editors to write our code in, source control tools, and deployment tools to publish our application on the App Store in one click.

## Requirements

There are a lot of things to learn when developing native apps. For this course, we assume you have some basic knowledge of web technologies: HTML, CSS and JavaScript. Don't worry if you don't know every obscure feature of CSS, or if you're not up to date with the latest JavaScript technologies: we'll cover what we need for writing apps. You'll find that, even though there are a lot of similarities, some things are quite different.





