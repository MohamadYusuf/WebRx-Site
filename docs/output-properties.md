---
layout: docs
title: WebRx - Output Properties
---
{% include sample-warning.html %}
# Output Properties

Output properties are observable properties that are backed by an Rx-Observable. Output properties are **read-only**, but will still fire change notifications.

Output properties are created by calling the <code>toProperty()</code> operator on **any Rx-Observable** instance.

## Example

What if you've got a property for <code>firstName</code>, and another for <code>lastName</code>, and you want to display the full name? 
That's where output properties come in. 

For example, given the following view model class ...

```javascript
function AppViewModel() {
    this.firstName = wx.property('Bob');
    this.lastName = wx.property('Smith');
}
```

… you could add an output property to return the full name:

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

… and they will be updated whenever <code>firstName</code> or <code>lastName</code> changes (your evaluator function will be called once each time any of its dependencies change, 
and whatever value you return will be passed on to the observers such as UI elements or other output properties).

## How it works

So how did the example work?

One of the core features of WebRx is to be able to convert properties to [Rx-Observables](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md), via <code>whenAny</code>, and to convert [Rx-Observables](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md) into properties, via a method called <code>toProperty</code>. 

The <code>whenAny</code> function takes  an **arbitrary combination** of either **observable properties** or **observables** as arguments, in case of observable-properties, subscribes to their <code>changed</code> observable, 
and invokes a user supplied selector function when any (hence the name) of its inputs changes. 
The selector function receives the latest value of all inputs as arguments. 

The result of <code>whenAny</code> is an Rx-Observable representing the results of the selector function.

```javascript
var observable = wx.whenAny(this.firstName, this.lastName, function(firstName, lastName) { 
  return firstName + " " + lastName; 
});
```

So, now that we've got an observable representing <code>fullName</code> we can simply invoke the aforementioned <code>toProperty</code> function and voila, we've turned the observable into a read-only property that can be bound to a view like any other property.

```javascript
this.lastName = observable.toProperty();
```

## Digging deeper

Remember when we've utilized <code>toProperty</code> to turn the result of <code>whenAny</code> into a property? An important detail about toProperty is that it is in no way limited to observables returned by whenAny. In fact <code>toProperty</code> is implemented as a custom Rx-Operator that extends all Rx-Observables. This fact opens up a whole array of possibilities because it enables you to leverage the full spectrum of [Rx's operators](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/which-instance.md) in your UI.
  

### Example

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

## Live Example

<p data-height="268" data-theme-id="0" data-slug-hash="LEombz" data-default-tab="result" data-user="oliverw" class='codepen'>See the Pen <a href='http://codepen.io/oliverw/pen/LEombz/'>LEombz</a> by Oliver Weichhold (<a href='http://codepen.io/oliverw'>@oliverw</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

<a class="next-topic" href="/docs/observable-lists.html">Next: Observable-Lists</a>
