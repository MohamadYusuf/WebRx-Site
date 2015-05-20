---
layout: docs
title: WebRx - Component-Registration
---
# Component-Registration

Just like binding-handlers, and expresion-filters, components are [module-scoped-resources](/docs/module-overview.html)
that can either be registered with the global application-module <code>wx.app</code> or a custom-module.

For WebRx to be able to load and instantiate your components, you must register them using <code>wx.app.component()</code>,
providing a configuration as described here.

You can register a component as follows:

```javascript
wx.app.component('some-component-name', {
    viewModel: <see below>,
    template: <see below>
});
```

or to register the component with a specific [module](/docs/module-overview.html):

```javascript
wx.module("my-module").component('some-component-name', {
    viewModel: <see below>,
    template: <see below>
});
```

The component name can be any non-empty string. It's recommended, but not mandatory, to use 
lowercase dash-separated strings (such as your-component-name) so that the component name is 
valid to use as a custom element.

<code>viewModel</code> is optional, and can take any of the viewModel formats described below.
<code>template</code> is required, and can take any of the template formats described below.
If no viewmodel is given, the component is treated as a simple block of HTML that will be bound 
to any parameters passed to the component.

## Specifying a viewmodel

Viewmodels can be specified in any of the following forms:

### A constructor function

```javascript
function SomeComponentViewModel(params) {
    // 'params' is an object whose key/value pairs are the parameters
    // passed from the component binding or custom element.
    this.someProperty = params.something;
}
 
SomeComponentViewModel.prototype.doSomething = function() { ... };
 
wx.app.component('my-component', {
    viewModel: SomeComponentViewModel,
    template: ...
});
```

WebRx will invoke your constructor once for each instance of the component, producing a separate viewmodel object for each. 
Properties on the resulting object or its prototype chain (e.g., <code>someProperty</code> and <code>doSomething</code> in the example above) 
are available for binding in the component's view.

### An inline-array-annotated constructor function

```javascript

wx.injector.register("greeter", [function() {
  return {
    greet: function(text) {
      ...
    }
  };
}]);

wx.app.component('my-component', {
    viewModel: ["greeter", function(greeter, componentParams) {
		this.otherProperty = greeter.greet;
	    this.someProperty = params.something;
	}],
    template: ...
});
```

### An injectable

Alternatively, you can specifiy the identifier of an injectable which is to be resolved through WebRx's [injector](/docs/dependency-injection-overview.html):

```javascript
wx.app.component('my-component', {
    viewModel: { resolve: "some-injectable-identifier" },
    template: ...
});
```

In this case, the component-binding will pass the inline-annotated array to the [Injector's](/docs/dependency-injection-overview.html) 
<code>resolve</code> method to construct the view-model. Any dependencies listed in the annotated-array will be resolved and passed to your 
constructor function. In the example above the view-model's constructor function will receive a <code>greeter</code> instance as first argument.
The second argument will be the component arguments.

### A promise

A view-model can also be resolved through a [Promises/A+](http://promises-aplus.github.com/promises-spec) compliant or 
[ES6-compliant](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) Promise:

```javascript
wx.app.component('my-component', {
    viewModel: { promise: promiseInstance },
    template: ...
});
```

Compatible implementations can be found in any number of libraries such as Angular, jQuery, Dojo, WinJS, 
and even libraries dedicated to them such as Q or when.js.

**Note**: It is necessary to specify <code>viewModel: { promise: object }</code>, and not just <code>viewModel: object</code>. 
This differentiates from the other cases below.

### A shared object instance

If you want all instances of your component to share the same viewmodel object instance (which is not usually desirable):

```javascript
var sharedViewModelInstance = { ... };
 
wx.app.component('my-component', {
    viewModel: { instance: sharedViewModelInstance },
    template: ...
});
```

**Note**: It is necessary to specify <code>viewModel: { instance: object }</code>, and not just <code>viewModel: object</code>. This differentiates from the other cases below.

### An AMD module

If you have an AMD loader (such as require.js) already in your page, then you can use it to fetch a viewmodel. 
For more details about how this works, see how WebRx loads components via AMD below. Example:

```javascript
wx.app.component('my-component', {
    viewModel: { require: 'some/module/name' },
    template: ...
});
```

The returned AMD module object can be in any of the forms allowed for viewmodels. So, it can be a constructor function, e.g.:

```javascript
// AMD module whose value is a component viewmodel constructor
define(['webrx'], function(wx) {
    function MyViewModel() {
        // ...
    }
 
    return MyViewModel;
});
```

… or a Typescript class:

```javascript
class ViewModel {
	constructor(params: any) {
	}

    public firstName = wx.property();
    public lastName = wx.property();
}

export = ViewModel;
```
**Note:** You need to make sure that your ViewModel is the module's default export, as demonstrated in the last line of this example.

… or a shared object instance, e.g.:

```javascript
// AMD module whose value is a shared component viewmodel instance
define(['webrx'], function(wx) {
    function MyViewModel() {
        // ...
    }
 
    return { instance: new MyViewModel() };
});
```

## Specifying a template

Templates can be specified in any of the following forms. The most commonly useful are existing element IDs and AMD modules.

### An existing element ID

For example, the following element:

```html
<template id='my-component-template'>
    <h1 data-bind='text: title'></h1>
    <button data-bind='click: doSomething'>Click me right now</button>
</template>
```

… can be used as the template for a component by specifying its ID:

```javascript
wx.app.component('my-component', {
    template: { element: 'my-component-template' },
    viewModel: ...
});
```

Note that only the nodes inside the specified element will be cloned into each instance of the component. 
The container element will not be treated as part of the component template.

You're not limited to using template elements, but these are convenient (on browsers that support them) 
since they don't get rendered on their own. Any other element type works too.

### An existing element instance

If you have a reference to a DOM element in your code, you can use it as a container for template markup:

```javascript
var elemInstance = document.getElementById('my-component-template');
 
wx.app.component('my-component', {
    template: { element: elemInstance },
    viewModel: ...
});
```

Again, only the nodes inside the specified element will be cloned for use as the component's template.

### A string of markup

```javascript
wx.app.component('my-component', {
    template: '<h1 data-bind="text: title"></h1>\
               <button data-bind="click: doSomething">Clickety</button>',
    viewModel: ...
});
```

This is mainly useful when you're fetching the markup from somewhere programmatically (e.g., AMD - see below), 
or as a build system output that packages components for distribution, since it's not very convenient to 
manually edit HTML as a JavaScript string literal.

### An array of DOM nodes

If you're building configurations programmatically and you have an array of DOM nodes, you can use them as a component template:

```javascript
var myNodes = [
    document.getElementById('first-node'),
    document.getElementById('second-node'),
    document.getElementById('third-node')
];
 
wx.app.component('my-component', {
    template: myNodes,
    viewModel: ...
});
```

In this case, all the specified nodes (and their descendants) will be cloned and concatenated into each copy of the component that gets instantiated.

### A document fragment

If you're building configurations programmatically and you have a DocumentFragment object, you can use it as a component template:

```javascript
wx.app.component('my-component', {
    template: someDocumentFragmentInstance,
    viewModel: ...
});
```

Since document fragments can have multiple top-level nodes, the entire document fragment (not just descendants of top-level nodes) 
is treated as the component template.

### A promise

A template can also be resolved through a [Promises/A+](http://promises-aplus.github.com/promises-spec) compliant or 
[ES6-compliant](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) Promise:

```javascript
wx.app.component('my-component', {
    template: { promise: promiseInstance },
    viewModel: ...
});
```

Compatible implementations can be found in any number of libraries such as Angular, jQuery, Dojo, WinJS, 
and even libraries dedicated to them such as Q or when.js.

**Note**: It is necessary to specify <code>template: { promise: object }</code>, and not just <code>template: object</code>.

### An injectable

Alternatively, you can specifiy the identifier of an injectable which is to be resolved through WebRx's [injector](/docs/dependency-injection-overview.html):

```javascript
wx.app.component('my-component', {
    template: { resolve: "some-injectable-identifier" },
    viewModel: ...
});
```

In this case it is assumed that the injectable-resolves to an array of Nodes.

### An AMD module

If you have an AMD loader (such as require.js) already in your page, then you can use it to fetch a template. 
For more details about how this works, see how WebRx loads components via AMD below. Example:

```javascript
wx.app.component('my-component', {
    template: { require: 'some/template' },
    viewModel: ...
});
```

The returned AMD module object can be in any of the forms allowed for viewmodels. So, it can be a string of markup, e.g. fetched using require.js's text plugin:

```javascript
wx.app.component('my-component', {
    template: { require: 'text!path/my-html-file.html' },
    viewModel: ...
});
```
… or any of the other forms described here, though it would be unusual for the others to be useful when fetching templates via AMD.

## How WebRx loads components via AMD

When you load a viewmodel or template via require declarations ...

```javascript
wx.app.component('my-component', {
    viewModel: { require: 'some/module/name' },
    template: { require: 'text!some-template.html' }
});
```

all WebRx does is call <code>require(['some/module/name'], callback)</code> and <code>require(['text!some-template.html'], callback)</code>, 
and uses the asynchronously-returned objects as the viewmodel and template definitions. So,

This does not take a strict dependency on require.js or any other particular module loader. Any module loader that provides an 
AMD-style require API will do. 

WebRx does not interpret the module name in any way - it merely passes it through to <code>require()</code>. So of course WebRx does not 
know or care about where your module files are loaded from. That's up to your AMD loader and how you've configured it.
WebRx doesn't know or care whether your AMD modules are anonymous or not. Typically we find it's most convenient for 
components to be defined as anonymous modules, but that concern is entirely separate from WebRx. AMD modules are loaded only on demand.

WebRx does not call <code>require([moduleName], ...)</code> until your component is being instantiated. This is how components get loaded on demand, not up front.

For example, if your component is inside some other element with an if binding (or another control flow binding), 
then it will not cause the AMD module to be loaded until the if condition is true. Of course, if the AMD module was 
already loaded (e.g., in a preloaded bundle) then the require call will not trigger any additional HTTP requests, 
so you can control what is preloaded and what is loaded on demand.

## Registering components as a single AMD module

For even better encapsulation, you can package a component into a single self-describing AMD module. Then you can reference a component as simply as:

```javascript
wx.app.component('my-component', { require: 'some/module' });
```
Notice that no viewmodel/template pair is specified. The AMD module itself can provide a viewmodel/template pair, 
using any of the definition formats listed above. For example, the file <code>some/module.js</code> could be declared as:

```javascript
// AMD module 'some/module.js' encapsulating the configuration for a component
define(['webrx'], function(wx) {
    function MyComponentViewModel(params) {
        this.personName = wx.property(params.name);
    }
 
    return {
        viewModel: MyComponentViewModel,
        template: 'The name is <strong data-bind="text: personName"></strong>'
    };
});
```

## A recommended AMD module pattern

What tends to be most useful in practice is creating AMD modules that have inline viewmodel classes, 
and explicitly take AMD dependencies on external template files.

For example, if the following is in a file at <code>path/my-component.js</code>,

```javascript
// Recommended AMD module pattern for a WebRx component that:
//  - Can be referenced with just a single 'require' declaration
//  - Can be included in a bundle using the r.js optimizer
define(['webrx', 'text!./my-component.html'], function(wx, htmlString) {
    function MyComponentViewModel(params) {
        // Set up properties, etc.
    }
 
    // Use prototype to declare any public methods
    MyComponentViewModel.prototype.doSomething = function() { ... };
 
    // Return component definition
    return { viewModel: MyComponentViewModel, template: htmlString };
});
```
… and the template markup is in the file path/my-component.html, then you have these benefits:

Applications can reference this trivially, i.e., <code>wx.app.component('my-component', { require: 'path/my-component' });</code>

You only need two files for the component - a viewmodel (<code>path/my-component.js</code>) and a template (<code>path/my-component.html</code>) - 
which is a very natural arrangement during development. Since the dependency on the template is explicitly stated in the define call, 
this automatically works with the r.js optimizer or similar bundling tools. The entire component - viewmodel plus template - 
can therefore trivially be included in a bundle file during a build step.

<a class="next-topic" href="/docs/component-binding.html">Next: The Component-Binding</a>
