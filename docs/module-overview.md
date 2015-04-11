---
layout: docs
title: WebRx - Module Overview
---
# Module Overview

When a project grows in size it is often beneficial to break it down into smaller units
which can be developed and tested in isolation. WebRx's contains built-in support for this
called: *Modules*.

You can think of a module as a container for resources utilized by different parts of your project. 
There are three types of resources that can be registered with a module: 

- [Components](/docs/component-overview.html#start)
- Binding-handlers
- [Expression-filters](/docs/binding-syntax.html#topic-expression-filters)

WebRx referres to these kinds of resources as *module-scoped-resources*.

## Advantages of using modules

- **Performance:** Since modules are loaded asynchronously on demand, initial page loading time
may be drastically decreased.
- **Modularization**: Modularising your applications explicitly outlines the dependencies of your application and 
separates the responsibilities of different parts of your app. Code reuse and separation of concerns are 
fundamental practices in writing maintainable code.

## Livecycle of a Module

1. **Module is registered:** WebRx-Modules are registered through the <code>wx.module</code> function (more
on this in the following chapter). The only immediate effect of registering a module is to announce
the module's existence to the module-loader. 

2. **Module is loaded**: Referencing a module through a [module-binding](/docs/module-binding.html#start) for
the first time, triggers its loading process. Loading a module is an asynchronous operation with the goal 
of obtaining the module's initializer-function which will be used in the next phase. For example: If the 
module has been registered as an external AMD-Module, the module's script file will now be fetched from the server.

3. **Module is initialized**: Now that the module's initializer-function is available, a pristine
module-object will created and handed to the initializer which is now tasked with registering the module's
exported resources with the module-object.

3. **Module is active**: At this point all of the module's registered resources become available for use in the application.

## The application module

Regardless of wether you'll be actively using modules or not, there will be always at least one active module: the application module.

In WebRx, the application-module is a pre-registered module that hosts all built-in bindings, components and expression filters
and can be accessed using ...

```javascript
wx.app
```

or ...

```javascript
wx.module("app")
```

**Note:** The application module is the only module that is immediately available and initialized when your app
launches. All other modules are asynchronously resolved by the [module-binding](/docs/module-binding.html#start).

<a class="next-topic" href="/docs/module-registration.html#start">Next: Defining and registering modules</a>