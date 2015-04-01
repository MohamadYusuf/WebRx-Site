---
layout: docs
title: WebRx - Routing Overview
---
{% include sample-warning.html %}
# Routing Overview

WebRx's Router allows you to organize the parts of your interface into a state machine. WebRx's Router is organized around states, which may optionally have routes, as well as other behavior, attached.

States are bound to named, nested and parallel views, allowing you to powerfully manage your application's interface.

<a target="_blank" class="btn btn-primary example-link" href="/examples/router-demo/index.html">Live Demo</a>

## About states

- A state corresponds to a "place" in the application in terms of the overall UI and navigation.
- A state describes (via the <code>views</code> and <code>params</code> properties) what the UI looks like and does at that place.
- States often have things in common, and the primary way of factoring out these commonalities in this model is via the state hierarchy, i.e. parent/child states aka nested states.

### The simplest form of state

A state in its simplest form can be created like this:

```html
<body>
	<section data-bind="view: 'main'"></section>
</body>
```

```javascript
wx.router.state({
    name: "contacts",
    views: {
        'main': "contact-list-component"
    }
});
```

This declares a state named <code>contacts</code>, that causes the <code>main</code> view to display the <code>contact-list-component</code>
when the state is activated (for simplicity, we assume that the component has been already registered).

Right now, the <code>contacts</code> state won't ever be activated. So let's see how we can activate a state.

### Activating a state

There are three main ways to activate a state:

- Calling <code>wx.router.go()</code>
- Clicking a link which has been transformed by a [sref-binding](/docs/sref-binding.html#start)
- Navigating to the url associated with the state

## State-Hierarchy

States can be nested within each other. The router will automatically infer the state-hierarchy from dots encountered in a state name. 
Below, contacts.list becomes a child of contacts.

```javascript
wx.router
  .state('contacts', {})
  .state('contacts.list', {});
```

When the application is in a particular state—when a state is "active"—all of its ancestor states are implicitly active as well. 
Below, when the <code>contacts.details</code> state is active, the <code>contacts</code> state is implicitly active as well, because it's the parent 
state to <code>contacts.details</code>.

```html
<body>
	<section data-bind="view: 'main'"></section>
	<section data-bind="view: 'details'"></section>
</body>
```

```javascript
wx.router.state({
    name: "contacts",
    views: {
        'main': "header-component",
        'details': "contact-list-component"
    }
}).state({
    name: "contacts.details",
    views: {
        'details': "contact-details-component"
    }
});
```

This example defines the views <code>main</code> and <code>details</code>. Let's see what happens to the contents of both views when we activate
states:

- When the <code>contacts</code> state is activated the <code>main</code> view will display the <code>header-component</code> and the <code>details</code> view will
display the <code>contact-list-component</code>.

- As soon as the <code>contacts.details</code> state is activated the <code>details</code> view will switch to the <code>contact-details-component</code>
while the <code>main</code> view will continue to display the <code>header-component</code> because it is inherited from parent state <code>contacts</code>.

### How routing interacts with the browser's history

Whenever the current routing state changes due to navigation via [sref](/docs/sref-binding.html#start)-links our invoking 
the <code>wx.router.go()</code> method with options containing <code>{ location: true }</code>, the Router will reflect the change in the browser's
history in order to provide the enduser with a seamless browsing-experience that includes <code>back</code>- and <code>forward</code> button support.

This feature relies on the standard [History-API](https://developer.mozilla.org/en-US/docs/Web/API/History) implemented by
all current browsers. If you need to support very old browsers which do not yet implement this API, is is recommended to include 
a Shim such as [history.js](https://github.com/browserstate/history.js/) with your project.

<a class="next-topic" href="/docs/routing-registration.html#start">Next: Defining and registering routing states</a>