---
layout: docs
title: WebRx - The Component-Binding
---
# The Component-Binding

The component binding injects a specified component into an element, and optionally passes parameters to it.

<div class="panel panel-default" id="component-binding-example1">
	<div class="panel-heading">
		<h3 class="panel-title">Live example</h3>
	</div>
	<div class="panel-body">
		<h4>First instance, without parameters</h4>
			<div data-bind='component: "message-editor"'></div>
 
			<h4>Second instance, passing parameters</h4>
			<div data-bind='component: {
				name: "message-editor",
				params: { initialText: "Hello, world!" } }'>
			</div>
	</div>
</div>
  
<script type="text/javascript">
wx.app.component('message-editor', {
    viewModel: function(params) {
        this.text = wx.property(params && params.initialText || '');
    },
    template: 'Message: <input data-bind="value: text" /> '
            + '(length: <span data-bind="text: text.length"></span>)'
});
 
wx.applyBindings(undefined, document.getElementById('component-binding-example1'));
</script>

**Source code: View**

```html
<h4>First instance, without parameters</h4>
<div data-bind='component: "message-editor"'></div>
 
<h4>Second instance, passing parameters</h4>
<div data-bind='component: {
    name: "message-editor",
    params: { initialText: "Hello, world!" } 
}'>
</div>
```

**Source code: View model**

```javascript
wx.app.component('message-editor', {
    viewModel: function(params) {
        this.text = wx.property(params && params.initialText || '');
    },
    template: 'Message: <input data-bind="value: text" /> '
            + '(length: <span data-bind="text: text.length"></span>)'
});
 
wx.applyBindings();
```

**Note:** In more realistic cases, you would typically load component view-models and templates from external files, 
instead of hardcoding them into the registration. See an example and registration documentation.

## Parameters

There are two ways to use the component binding:

### Shorthand syntax

If you pass just a string, it is interpreted as a component name. The named component is then injected without supplying any parameters to it. Example:

```html
<div data-bind='component: "my-component"'></div>
```

The shorthand value can also be observable. In this case, if it changes, the component binding will dispose the old 
component instance, and inject the newly-referenced component. Example:

```html
<div data-bind='component: observableWhoseValueIsAComponentName'></div>
```

### Full syntax

To supply parameters to the component, pass an object with the following properties:

- **name** — the name of the component to inject. Again, this can be observable.
- **params** — an object that will be passed on to the component. Typically this is a key-value object containing multiple parameters, and is typically received by the component's view-model constructor.

Example:

```html
<div data-bind='component: {
    name: "shopping-cart",
    params: { mode: "detailed-list", items: productsList }
}'></div>
```

**Note:** that whenever a component is removed (either because the name observable changed, or because an 
enclosing control-flow binding removed the entire element), the removed component is disposed.

## Component lifecycle

When a component binding injects a component,

1. **The component template is cloned and injected into the container element**

	Any existing content is removed and discarded.

2. **If the component has a viewmodel, it is instantiated**

	If the view-model is given as a constructor function, this means WebRx calls *new YourViewModel(params)*.

	This phase always completes synchronously (constructors and factory functions are not allowed to be asynchronous), 
	since it occurs every time a component is instantiated and performance would be unacceptable if it involved waiting 
	for network requests.

3. **The view-model is bound to the view**

	Or, if the component has no view-model, then the view is bound to any params you've supplied to the component binding.

4. **The component is active**

	Now the component is operating, and can remain on-screen for as long as needed.

	If any of the parameters passed to the component is observable, then the component can of course observe any changes, 
	or even write back modified values. This is how it can communicate cleanly with its parent, without tightly coupling the 
	component code to any parent that uses it.

5. **The component is torn down, and the view-model is disposed**

	If the component binding's name value changes observably, or if an enclosing control-flow binding causes the container 
	element to be removed, then any dispose function on the view-model is called just before the container element is removed 
	from the DOM. See also: disposal and memory management.


## Template-only components

Components usually have view-models, but they don't necessarily have to. A component can specify just a template.

In this case, the object to which the component's view is bound is the params object that you passed to the component binding. Example:

```javascript
wx.app.component('special-offer', {
    template: '<div class="offer-box" data-bind="text: productName"></div>'
});
```
… can be injected with:

```html
<div data-bind='component: {
     name: "special-offer-callout",
     params: { productName: someProduct.name }
}'></div>
```

… or, more conveniently, as a custom element:

```html
<special-offer params='productName: someProduct.name'></special-offer>
```

## Disposal and memory management

You **must** implement a *dispose* method on your view-model if your view-model holds references to any resources 
that aren't inherently garbage-collectable, or run the risk of producing memory-leaks:

- *setInterval* callbacks will continue to fire until explicitly cleared.
	Use *clearInterval(handle)* to stop them, otherwise your view-model might be held in memory.
- [output properties](/docs/output-properties.html#start) continue to receive notifications from their dependencies until explicitly disposed.
- Subscriptions to Rx-Observables continue to fire until explicitly disposed.
- Manually-created event handlers on external DOM elements (you shouldn't do that anyway to fit the MVVM pattern)

**Note:** Of course, you don't have to worry about releasing any event handlers created by standard WebRx bindings in your view, 
as WebRx automatically unregisters them when the elements are removed.

### Improving resource management

Fortunately [ReactiveX for Javascript](https://github.com/Reactive-Extensions/RxJS/tree/master/doc) provides us with 
means to make it easier to follow the rules outlined above.

**Centralized resource disposal**

[ReactiveX for Javascript](https://github.com/Reactive-Extensions/RxJS/tree/master/doc) includes the extremly useful
[CompositeDisposable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/disposables/compositedisposable.md) 
class which can be utilized to implement your view-model's *dispose* method like this:

```javascript
function ViewModel() {
	this.cleanup = new Rx.CompositeDisposable();

	this.dispose = function() {
		this.cleanup.dispose();
	};
}
```

Let's combine our view-model with some best-practices for consuming resources using ReactiveX:

- **Timers**: Instead of Javascript's built-in *setInterval*/*clearInterval* functions use *Rx.Observable.interval* or *Rx.Observable.timer*
- **Events**: Instead of Javascript's built-in *addEventListener* function use *Rx.Observable.fromEvent*


```javascript
function ViewModel() {
	this.cleanup = new Rx.CompositeDisposable();

	this.dispose = function() {
		this.cleanup.dispose();
	};

	// consume a timer
	this.cleanup.add(Rx.Observable.timer(1000).subscribe(function() {
		...
	}));

	// consume a DOM event
	var el = document.getElementById('foo');
	this.cleanup.add(Rx.Observable.fromEvent("change", el).subscribe(function(event) {
		...
	}));

	// consume an output property which must be disposed to unsubscribe from its source-observable
	this.someProp = Rx.Observable.timer(5000).toProperty();
	this.cleanup.add(this.someProp);
}
```

Now when our view-model is disposed it will stop both timers and stop listening to *"change"* events from element *'foo'*
with the single invocation of its *cleanup* member's *dispose* method.

WebRx's built-in bindings make extensive use of this approach.

<a class="next-topic" href="/docs/module-overview.html#start">Next: What modules offer</a>