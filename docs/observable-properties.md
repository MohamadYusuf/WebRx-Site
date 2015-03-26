---
layout: docs
title: WebRx - Observable Properties
---
# Observable Properties

You’ve seen how to [create a basic view model](/docs/index.html#topic-mvvm-intro) and how to display one of its properties using a binding. But one of the key benefits of WebRx is that it updates your UI automatically when the view model changes. How can WebRx know when parts of your view model change? Answer: you need to declare your model properties as observable-properties, because these are special JavaScript objects that can notify subscribers about changes.

For example, rewrite the preceding view model object as follows:

```javascript
var myViewModel = {
    personName: wx.property('Bob'),
    personAge: wx.property(123)
};
```

You don’t have to change the view at all - the same data-bind syntax will keep working. The difference is that it’s now capable of detecting changes, and when it does, it will update the view automatically.

## Reading and writing properties

To read the property’s current value, just call the property with no parameters. In this example, myViewModel.personName() will return 'Bob', and myViewModel.personAge() will return 123.

To write a new value to the property, call the property and pass the new value as a parameter. For example, calling myViewModel.personName('Mary') will change the name value to 'Mary'.

The whole point of observable properties is that they can be observed, i.e., other code can say that it wants to be notified of changes. That’s what many of WebRx’s built-in bindings do internally. So, when you wrote data-bind="text: personName", the text binding registered itself to be notified when personName changes (assuming it’s an observable property, which it is now).

When you change the name value to 'Mary' by calling myViewModel.personName('Mary'), the text binding will automatically update the text contents of the associated DOM element. That’s how changes to the view model automatically propagate to the view.


## Observable Properties and Binding Expressions

The syntax for referencing observable-property-values in [binding-expressions](/docs/binding-syntax.html#start) is identical to non observable-properties.

```html
The name is <span data-bind="text: personName"></span>
```

This view template will work without modifications for both of these view-models ...

```javascript
var myViewModel = {
    personName: 'Bob'
};
```

```javascript
var myViewModel = {
    personName: wx.property('Bob')
};
```

### Working with observable-property values

As outlined above, you invoke an observable property as a function with no arguments to read its current value. 

This is **unnecessary** within binding-expressions, because behind the scenes, WebRx's expression compiler 
will **detect** that use-case and will conveniently **dereference the property's value for you**. 

In fact you are not even allowed to explicitely dereference a property in a binding expression, 
because this would involve a function invocation which is prohibited by WebRx's 
[binding syntax](/docs/binding-syntax.html#start) specification. A rule that gets enforced by the expression compiler.

#### Good

```html
The name is <span data-bind="text: personName + 'foo'"></span>
```

#### Bad

```html
The name is <span data-bind="text: personName() + 'foo'"></span>
```

### Property-Object-References or @proprefs

Sometimes when working with certain bindings you don't want the aforementioned automatic deferencing to happen, because 
the binding requires a reference to the property object itself instead of its current value. 

This is the case with basically all two-way bindings which need to update the property's value when reacting to view-changes.

#### Example

```javascript
var myViewModel = {
    personName: wx.property('Bob')
};
```

```html
The name is <input type="text" data-bind="textInput: @personName"></span>
```

The [textInput-Binding](/docs/textinput-binding.html#start) links a text box or textarea with a viewmodel property, 
providing two-way updates between the viewmodel property and the element’s value.

Without the *@* operator in the template above, the textInput binding would receive the current value of
the *personName* property which would be *'Bob'*. Since *'Bob'* is not an observable property, the binding
would update the textbox's or textarea's value a single time, but would not be able to update the
view-model when the user enters text. Effectively turning the textInput binding into a text-binding
which is not really useful.


## Explicitly subscribing to observable-property changes

If you want to register your own subscriptions to be notified of changes to properties, all observable-properties expose two [Rx-Observables](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md):

- *changing* notifies of changes of the property's value before the change
- *changed* notifies of changes of the property's value after the change

If for example you would want to monitor changes to the *personName* property, you would do it like this: 

```javascript
myViewModel.personName.changed.subscribe(function(newValue) {
    alert("The person's new name is " + newValue);
});
```

You can also terminate a subscription if you wish: first capture the return value as a variable, then you can call its dispose function, e.g.:

```javascript
var subscription = myViewModel.personName.changed.subscribe(function(newValue) { /* do stuff */ });
// ...then later...
subscription.dispose(); // I no longer want notifications
```
