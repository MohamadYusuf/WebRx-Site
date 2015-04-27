---
layout: docs
title: WebRx - Dependency-Registration
---
# Dependency-Registration

## Registering components with the injector

Here we pass an array whose elements consist of a list of strings representing the names of the dependencies, 
followed by the constructor function. This is called *Inline Array Annotation*. 
It is important to keep the annotation array in sync with the parameters of the constructor function.

```javascript
wx.injector.register('greeter', ["window-service", function($window) {
  return {
    greet: function(text) {
      $window.alert(text);
    }
  };
}]);
```

We have taught the injector how to build a greeter. Notice that greeter is dependent on the <code>$window</code> service.
The greeter service is an object that contains a <code>greet</code> method which relies on the window-service's <code>alert</code> method.

## Resolving components through the injector

Now we can request our <code>greeter</code> from the injector:

```javascript
var greeter = wx.injector.get('greeter');
```

Asking for dependencies solves the issue of hard coding, but it also means that the injector needs to be passed 
throughout the application. Passing the injector breaks the [Law of Demeter](http://en.wikipedia.org/wiki/Law_of_Demeter). 

To remedy this, WebRx's supports resolving injectables pretty much everywhere.

<a class="next-topic" href="/docs/message-bus.html">Next: Messaging</a>
