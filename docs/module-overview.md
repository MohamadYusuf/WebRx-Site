---
layout: docs
title: WebRx - Module Overview
---
# Module Overview

When a project grows in size it is often beneficial to break it down into smaller units
that can be developed and tested in isolation. WebRx's built-in solution for this are *Modules*.

You can think of a module as a container for resources utilized by different parts of your project. 

## Advantages of using modules

- **Performance:** Since modules are loaded asynchronously on demand, initial page loading time
may be decreased drastically.
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

Regardless of wether your project is explicitely working with modules or not, there will be always at least one 
module that is always present: **the application module**.

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

## Module Resources

There are three types of resources that can, or rather must be either registered with a custom-module or the application-module: 

- [Components](/docs/component-overview.html#start)
- Binding-handlers
- [Expression-filters](/docs/binding-syntax.html#topic-expression-filters)

WebRx refers to these kinds of resources as *module-scoped-resources*.

The reason for registering these kinds of resources is because they are utilized by WebRx's 
data-binding system which needs to be aware of that a particular binding, filter or component exists.

### Services

Some readers - especially those coming from an Angular background - might wonder why services are not among the list above.

To explain why let's talk about the two most common ways to utilize modules in a WebRx app:

#### Application-Module or pre-loaded modules

In this scenario the app either registers all of its components with the application module or 
a custom module. The registration happens at bootstrap time using script-resources loaded through 
<code>script</code> tags on the page.

Because all required resources are available locally, WebRx's [Injector](/docs/dependency-injection-overview.html#start) can be utilized to inject
all kinds of resources - including services into component view-models and the like.

#### Custom-Modules with external AMD-Modules

This is the recommended approach for medium- to large applications. 

Everything, down from the module itself to the resources it exports will be loaded asynchronously on-demand. 
Since am AMD module loader such as [requirejs](http://requirejs.org) will be involved, the natural solution for injecting services into modules and its
components is to declare them as module dependencies:

```javascript
wx.module('myModule', { require: 'some/module/name' });
```

AMD-Module *some/module/name*:

```javascript
define([""], function() {
  function init(myModule) {
    myModule.component('my-component', {
     viewModel: { require: 'some/module/viewModel' },
     template: { require: 'text!/some/module/template.html' }
    });
  }
 
  return init;
});
```

AMD-Module *some/module/viewModel*:

```javascript
define(["greetService"], function(greetService) {
  function viewModel() {
	this.greet = function(value) {
	  greetServices.greet(value);
	}
  }
 
  return viewModel;
});
```

<a class="next-topic" href="/docs/module-registration.html#start">Next: Defining and registering modules</a>