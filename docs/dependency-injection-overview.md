---
layout: docs
title: WebRx - Routing Overview
---
# Dependency Injection Overview

Dependency Injection (DI) is a software design pattern that deals with how components get hold of their dependencies.

The WebRx injector subsystem is in charge of creating components, resolving their dependencies, and providing them 
to other components as requested.

## Why Dependency Injection?

This section motivates and explains WebRx's use of DI. For how to use DI, see above.

For in-depth discussion about DI, see Dependency Injection at Wikipedia, Inversion of Control by Martin Fowler, 
or read about DI in your favorite software design pattern book.

There are only three ways a component (object or function) can get a hold of its dependencies:

- The component can create the dependency, typically using the new operator.
- The component can look up the dependency, by referring to a global variable.
- The component can have the dependency passed to it where it is needed.
- The first two options of creating or looking up dependencies are not optimal because they hard code the dependency to the component. This makes it difficult, if not impossible, to modify the dependencies. This is especially problematic in tests, where it is often desirable to provide mock dependencies for test isolation.

The third option is the most viable, since it removes the responsibility of locating the dependency from the component. The dependency is simply handed to the component.

### Example

```javascript
function SomeClass(greeter) {
  this.greeter = greeter;
}

SomeClass.prototype.doSomething = function(name) {
  this.greeter.greet(name);
}
```

In the above example <code>SomeClass</code> is not concerned with creating or locating the <code>greeter</code> dependency, 
it is simply handed the greeter when it is instantiated.

This is desirable, but it puts the responsibility of getting hold of the dependency on the code that constructs <code>SomeClass</code>. 
To manage the responsibility of dependency creation, each WebRx application has an injector. The injector is a service 
locator that is responsible for construction and lookup of dependencies.

### Example of using the injector

Here we teach the injector how to build a greeter. Notice that greeter is dependent on the <code>$window</code> service.
The greeter service is an object that contains a <code>greet</code> method which relies on the window-service's <code>alert</code> method.

```javascript
wx.injector.register('greeter', ["window-service", function($window) {
  return {
    greet: function(text) {
      $window.alert(text);
    }
  };
}]);
```

Now we can request our <code>greeter</code> from the injector:

```javascript
var greeter = wx.injector.get('greeter');
```

Asking for dependencies solves the issue of hard coding, but it also means that the injector needs to be passed 
throughout the application. Passing the injector breaks the [Law of Demeter](http://en.wikipedia.org/wiki/Law_of_Demeter). 

To remedy this, WebRx's supports resolving injectables pretty much everywhere.

<!-- <a class="next-topic" href="/docs/dependency-registration.html#start">Next: Defining and registering dependencies</a> -->
