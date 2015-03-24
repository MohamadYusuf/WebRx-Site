---
layout: docs
title: WebRx - Observable Properties
---
## Computed Observable Properties

What if you’ve got a property for firstName, and another for lastName, and you want to display the full name? That’s where computed observable properties come in. 

For example, given the following view model class ...

```javascript
function AppViewModel() {
    this.firstName = wx.property('Bob');
    this.lastName = wx.property('Smith');
}
```

… you could add a computed observable to return the full name:

```javascript
function AppViewModel() {
    // ... leave firstName and lastName unchanged ...
 
    this.fullName = wx.whenAny(this.firstName, this.lastName, function(firstName, lastName) { 
      return firstName + " " + lastName; }).toProperty();
}
```

... now you could bind UI elements to it, e.g.:

```html
The name is <span data-bind="text: fullName"></span>
```

… and they will be updated whenever *firstName* or *lastName* changes (your evaluator function will be called once each time any of its dependencies change, and whatever value you return will be passed on to the observers such as UI elements or other computed observables).

### How it works

So how did the sample above work?

One of the core features of WebRx is to be able to convert properties to [Rx-Observables](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md), via *whenAny*, and to convert [Rx-Observables](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) into properties, via a method called *toProperty*. 

The *whenAny* function takes any number of properties as input, subscribes to their *changed* observables, and invokes a user supplied selector function when any (hence the name) of its inputs changes. The selector function receives the latest value of all inputs as arguments. The result of *whenAny* is always an Rx Observable.

```javascript
var observable = wx.whenAny(this.firstName, this.lastName, function(firstName, lastName) { 
  return firstName + " " + lastName; 
});
```

So, now that we've got an observable representing *fullName* we can simply invoke the aforementioned *toProperty* function and voila, we've turned the observable into a read-only property that can be bound to a view like any other property.

```javascript
this.lastName = observable.toProperty();
```

### Digging deeper

Remember when we've utilized *toProperty* to turn the result of *whenAny* into a property? An important detail about toProperty is that it is in no way limited to observables returned by whenAny. In fact *toProperty* is implemented as a custom Rx-Operator that extends all Rx-Observables. This fact opens up a whole array of possibilities because it enables you to leverage the full spectrum of [Rx's operators](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/which-instance.md) in your UI.
  

#### Example

Imagine you want to display a countdown-timer in your UI. The timer would count down from 10 to 1 at a one second interval. Implementing that would be as easy as this:

View-Model:

```javascript
function AppViewModel() {
    this.countDown = Rx.Observable.timer(0, 1000)
      .select(function(x) { return 10 - x; })
      .take(11)
      .toProperty();
}
```

View-Template:

```html
Seconds until auto-logout: <span data-bind="text: countDown"></span>
```

#### Live Example

<iframe class="hidden-xs" width="100%" height="300" src="//jsfiddle.net/oliverw/1nwsased/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>