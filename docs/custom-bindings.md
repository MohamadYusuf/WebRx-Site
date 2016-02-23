---
layout: docs
title: WebRx - Custom Bindings
---
# Custom Bindings

You're not limited to using the built-in bindings like click, value, and so on — you can create your own ones. This is how to control how observables interact with DOM elements, and gives you a lot of flexibility to encapsulate sophisticated behaviors in an easy-to-reuse way.

For example, you can create interactive components like grids, tabsets, and so on, in the form of custom bindings.

## Registering your binding

A binding is registered by invoking the <code>wx.app.binding</code> function:

```javascript
wx.app.binding('your-binding-name', {
    init: function(element, value, ctx, domManager, state, cleanup, module) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
    },

    update: function(element, value, ctx, domManager, state, cleanup, module) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.
    }
});
```

… and then you can use it on any number of DOM elements:

```html
<div data-bind="your-binding-name: someValue"></div>
```

**Note:** you don't actually have to provide both init and update functions — you can just provide one or the other if that's all you need.

### The <code>init</code> function

WebRx will call your init function once for each DOM element that you use the binding on. There are two main uses for init:

- To set any initial state for the DOM element
- To register any event handlers so that, for example, when the user clicks on or modifies the DOM element, you can change the state of the associated observable

The function will be called with the following parameters:

- <code>element</code>: The DOM element involved in this binding
- <code>value</code>: This parameter will reflect the most recent value of all parameters passed to your binding.  

  **Single Parameter**: If you've declared your binding with a single parameter like this: <code>data-bind="your-binding-name: foo"</code> or 
  <code>data-bind="your-binding-name: 123"</code>, then <code>value</code> will be either a Javascript primitive such as <code>string</code>, 
  <code>number</code> or <code>boolean</code> or in case of a [propref](/docs/observable-properties.html#topic-propref), an accessor function. 
  To easily accept both observable and plain values, call <code>wx.unwrapProperty</code> on value.

  **Object Literal**: If you've declared your binding with multiple parameters contained in an object literal like this: 
  <code>data-bind="your-binding-name: { foo: bar, baz: 123 }"</code> then <code>value</code> will be a Javascript Object containing the same 
  keys as the binding parameter object. Each key's corresponding value will be either a Javascript primitive such as <code>string</code>, <code>number</code> or <code>boolean</code> 
  or in case of a [propref](/docs/observable-properties.html#topic-propref), an accessor function. To easily accept both observable and plain values, 
  call <code>wx.unwrapProperty</code> on a key's value.

- <code>ctx</code>: An object that holds the current [binding context](/docs/binding-context.html) available to this element's bindings.
- <code>domManager</code>: A reference to WebRx's <code>DomManager</code> service.
- <code>state</code>: An initially empty object that you can use to associate state with your binding. The state object will be automatically discarded once the binding
is removed from the DOM.
- <code>cleanup</code>: An [RxJS Composite Disposable](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/disposables/compositedisposable.md) 
which will be automatically <code>disposed</code> once the binding is removed from the DOM. This is the recommended place to store any observable 
subscriptions associated with your binding. Of course you are not limited to observable subscriptions. You can just as easily register custom cleanup logic
by wrapping it using [Rx.Disposable.create](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/disposables/disposable.md#rxdisposablecreateaction).

### The <code>update</code> function

WebRx will call the <code>update</code> function initially when the binding is applied to an element and track any dependend observables that you access.
When any of these dependencies change, the update function will be called once again. 

WebRx will pass exactly the same set of parameters that it passes to the <code>init</code> function.

## Examples

The custom-binding equivalent of WebRx's built-in [text-Binding](/docs/text-binding.html):  

```javascript
wx.app.binding('my-text-binding', { 
    update: function(el, value, ctx, domManager, state, cleanup) {
        if ((value === null) || (value === undefined))
            value = "";
        else
            value = wx.unwrapProperty(value);

        el.textContent = value;
}});
```  

### Two-Way Binding
      
Implementation of a simplified version of WebRx's built-in [textInput-Binding](/docs/textinput-binding.html) as a custom-binding:  

```javascript
wx.app.binding('my-text-input', {
    init: function(el, value, ctx, domManager, state, cleanup) {
        var events = [
          Rx.Observable.fromEvent(el, 'input'),
          Rx.Observable.fromEvent(el, 'change'),
        ];

        // subscribe to input events
        var disp = Rx.Observable.merge(events).subscribe(function(x) {
            // update the model-property
            value(el.value);
        });

        cleanup.add(disp);
    }, 
    
    update: function(el, value, compiled, ctx, domManager, state, cleanup) {
        // update the input element when model-property changes 
        el.value = wx.unwrapProperty(value);
    }
});
```

<a class="next-topic" href="/docs/component-overview.html">Next: What components and custom elements offer</a>
