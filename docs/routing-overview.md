---
layout: docs
title: WebRx - Routing Overview
---
# Routing Overview

WebRx's Router allows you to organize the parts of your interface into a state machine. WebRx's Router is organized around states, which may optionally have routes, as well as other behavior, attached.

States are bound to named, nested and parallel views, allowing you to powerfully manage your application's interface.

## About states

- A state corresponds to a "place" in the application in terms of the overall UI and navigation.
- A state describes (via the *views* and *params* properties) what the UI looks like and does at that place.
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

This declares a state named *"contacts"*, that causes the *"main"* view to display the *"contact-list-component"*
when the state is activated (for simplicity, we assume that the component has been already registered).

Right now, the *'contacts'* state won't ever be activated. So let's see how we can activate a state.

### Activating a state

There are three main ways to activate a state:

- Calling *wx.router.go()*
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
Below, when the *"contacts.details"* state is active, the *"contacts"* state is implicitly active as well, because it's the parent 
state to *"contacts.details"*.

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
        'main': "header-component"
        'details': "contact-list-component"
    }
}).state({
    name: "contacts.details",
    views: {
        'details': "contact-details-component"
    }
});
```

This example defines the views *main* and *details*. Let's see what happens to the contents of both views when we activate
states:

- When the *contacts* state is activated the *main* view will display the *header-component* and the *details* view will
display the *contact-list-component*.

- As soon as the *contacts.details* state is activated the *details* view will switch to the *contact-details-component*
while the *main* view will continue to display the *header-component* because it is inherited from parent state *contacts*.

<a class="next-topic" href="/docs/routing-registration.html#start">Next: Defining and registering routing states</a>