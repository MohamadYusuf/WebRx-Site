---
layout: docs
title: WebRx - Module Registration
---
# Module Registration

The <code>wx.module</code> function is a global place for registering modules. All modules (core or 3rd party) that should be 
available to an application must be registered using this method. 

<code>wx.module</code> expects two arguments:

- **A name**: A descriptive name for your module that should be unique accross your application.
- **An initializer**: The module initializer is a function that will be invoked the first time
a module is referenced through a [module-binding](/docs/module-binding.html). 

	No matter how the initializer function is defined, it will always receive a pristine module-object instance as
	**last** argument.

	The initializer is supposed to register all of the module's resources
	with the provided module-instance. After the initializer has finished executing, the module
	is fully initialized and available for use in your application.

**Note:** It is important to remember that WebRx considers a module to be **immutable** after its been loaded and initialized. 
The application module is the only exception to this rule.

## Specifying a module-initializer

Module-initializers can specified in any of the following forms:

### A function

```javascript
// Create a new module
wx.module('myModule', function(myModule) {
  // Create a component
  var component = createLikeWidget();

  // Register the component with the module
  myModule.component('like-widget', component);
});
```

This example shows one of the most basic forms for module initialization: a function.
Using an initializer-function is fine for simple applications. Large projects though will most likely use 
one of the techniques outlined below.

### An inline-annotated-array

```javascript
wx.module('myModule', ["like-widget", function(likeWidget, myModule) {
  myModule.component('like-widget', likeWidget);
}]);
```

Here we provide an inline-annotated array as module-initializer. The array will be run through
the [Injector's](/docs/dependency-injection-overview.html) <code>resolve</code> method
and receive an empty module-instance as final argument after all its declared dependencies.

### An AMD module

If you have an AMD loader (such as require.js) already in your page, then you can use it to fetch a module. 
For more details about how this works, see how WebRx loads modules via AMD below. Example:

```javascript
wx.module('myModule', { require: 'some/module/name' });
```

AMD-Module *some/module/name*:

```javascript
define(["like-widget"], function(likeWidget) {
  function init(myModule) {
	// register a component loaded as AMD-Module dependency
    myModule.component('like-widget', likeWidget);

	// register another component that will get loaded on-demand
    myModule.component('my-component', {
     viewModel: { require: 'some/module/viewModel' },
     template: { require: 'text!/some/module/template.html' }
    });
  }
 
  return init;
});
```

When the initializer is provided by an AMD module, the module-initializer function **must** be the AMD-module's 
only export.

## Registering resources with a module

In the previous examples we've focused soley on registering component resources. As mentioned in the [module-overview](/docs/module-overview.html)
there are other types of module-scoped resources.

### Registering components

The documentation contains an entire chapter dedicated to [registering components](/docs/component-registration.html). 

### Registering animations

The documentation contains an entire chapter dedicated to [creating animations](/docs/animation-registration.html). 

### Registering expression filters

[Expression-filters](/docs/binding-syntax.html#topic-expression-filters) format the result of an expression for display to the user.

```javascript
wx.module('myModule', function(myModule) {
  myModule.filter('uppercase', function(value) {
	return value.toUpperCase();
})});
```

The module in this example registers an <code>uppercase</code> filter that 
converts the result of a binding-expression to an upper-case string.

<a class="next-topic" href="/docs/module-binding.html">Next: The Module-Binding</a>