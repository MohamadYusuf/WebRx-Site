---
layout: docs
title: WebRx - Module Registration
---
# Module Registration

The *wx.module* function is a global place for creating, registering and retrieving modules. All modules (core or 3rd party) that should be 
available to an application must be registered using this mechanism.

*wx.module* provides a fluent-API for registering and retrieving modules. When the function encounters a module-name for the first time
it will implicitely create the module as empty container.

```javascript
// Create a new module
var myModule = wx.module('myModule');

// Create a component
var component = createLikeWidget();

// Register a component
myModule.component('like-widget', component);
```


## The application module

Regardless of wether you are actively using modules or not, there will be always at least one module: the application module.

In WebRx, the application-module is a pre-registered module that hosts all built-in bindings, components and expression filters
and can be accessed using ...

```javascript
wx.app
```

or ...

```javascript
wx.module("app")
```

To register a component with the application-module, the first example on this page could be rewritten like this:

```javascript
// Create a component
var component = createLikeWidget();

// Register a component
wx.app.component('like-widget', component);
```

<a class="next-topic" href="/docs/module-binding.html#start">Next: The Module-Binding</a>