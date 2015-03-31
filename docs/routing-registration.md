---
layout: docs
title: WebRx - Defining and registering routing states
---
# Defining and registering routing states

So far we've only briefly touched the subject of state-registration. That is about to change.

## Views

One of the fundamental principles behind WebRx's routing engine is that your application partitions
your pages into regions by applying a [view-binding](/docs/view-binding.html#start) to one or more
elements of your page. A state can then define which [component](/docs/component-overview.html#start)
those regions will display when the state is active.

Components will be resolved against the currently active [module](/docs/module-overview.html#start) or alternatively
the application-module.

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

You can also pass parameters to your components which will be merged with any parameters defined at
state-level plus extracted routing parameters:

```javascript
wx.router.state({
    name: "contacts",
    views: {
        'main': { 
			component: "contact-list-component",
			params: {
				mode: 'compact'
			}
		}
    }
});
```

## State Params

Routing-States can optionally configured to carry state-parameters that will be used to configure
components referenced by it:

```javascript
wx.router.state({
    name: "contacts",
    params: {
		'contactId': 42
    },
	views: {
        'main': "contact-list-component"
    }
});
```

In this example the [component-binding](/docs/component-binding.html#start) will receive following object as *params* argument when
instantiating the *"contact-list-component"*:

```javascript
{ 'contactId': 42 }
```

### State-Params inheritance

Just like the parent's view configuration is inherited by child-states, so are state-params:

```javascript
wx.router.state({
    name: "contacts",
    params: {
		'companyId': 3
    }
}).state({
    name: "contacts.details",
    params: {
		'contactId': 42
    },
	views: {
        'main': "contact-list-component"
    }
});
```

In this example the [component-binding](/docs/component-binding.html#start) will receive following object as *params* argument when
instantiating the *"contact-list-component"*:

```javascript
{ 'companyId': 3, 'contactId': 42 }
```

## State Routes

Most states in your application will probably have a route associated with them. State-Routing was not an afterthought 
to the state mechanics, but was figured into the design from the beginning (all while keeping states separate from url routing)

Here's how you configure a state with a basic route:

```javascript
wx.router.state({
    name: "contacts",
	route: "contacts",
    views: {
        'main': "contact-list-component"
    }
});
```

Now when the user accesses */contacts* then the *'contacts'* state would become active and the *main* view will be populated with 
the *'contact-list-component'* component. Alternatively, if the user were to transition to the *'contacts'* state via 
*wx.router.go('contacts')* then the browser's location would be updated to */contacts*.

### Implicit routes

Specifying a route when configuring a state is optional. If you omit the route, WebRx will will automatically assign it a route
that mirrors the state hierarchy.

```javascript
wx.router.state({
    name: "foo.bar.baz"
});
```

The implicit route for state *foo.bar.baz* state will be */foo/bar/baz*.

### Relative- vs. Absolute-Routes

In all of the previous examples we've used relative routes. It is also possible to prepend a route with a '/' to turn it into
an absolute route.

```javascript
wx.router.state({
    name: "foo.bar.baz",
	route: "/bar/foo"
});
```

Now, the route for state *foo.bar.baz* will be */bar/foo*, completely ignoring the state-hierarchy.

### Route Parameters

Often, URLs have dynamic parts to them which are called parameters. There are several options for specifying parameters. 
A basic parameter looks like this:

```javascript
wx.router.state({
    name: "contacts",
	route: "contacts/:contactId",
    views: {
        'main': "contact-list-component"
    }
});
```

#### Examples:

- '/hello/' - Matches only if the path is exactly '/hello/'. There is no special treatment for trailing slashes, 
and patterns have to match the entire path, not just a prefix.
- '/user/:id' - Matches '/user/bob' or '/user/1234!!!' or even '/user/' but not '/user' or '/user/bob/details'. 
The second path segment will be captured as the parameter 'id'.

**Note:** Parameter names may contain only word characters (latin letters, digits, and underscore) and must be unique within the 
pattern (across both path and search parameters).

#### Custom validators for route parameters

If you need more control about route-parameters you can also pass in an object that combines a route
with a set of per-parameter custom validators. 

```javascript
wx.router.state({
    name: "contacts",
	route: wx.route("contacts/:contactId/:other", {
		contactId: /^\d+$/,
		other: function(value) { return value === "" || value === "foo"; }
	}),
    views: {
        'main': "contact-list-component"
    }
});
```

Each validator can be:

- a RegExp to test against 
- a function that accepts a value and returns true or false
- or a value to match against

### Defining routes as regular expression

Alternatively you can pass in a RegExp for the route parameter:

```javascript
wx.router.state({
    name: "contacts",
	route: /^(contacts?)(?:\/(\d+)(?:\.\.(\d+))?)?/,
    views: {
        'main': "contact-list-component"
    }
});
```

### What happens to route parameters

When a state is activated, any parameters captured from the current route will be merged with 
state-parameters specified during registration. 

Once again the state-params merging will follow the state-hierarchy, with route-parameters applied
as the final step to allow for overriding state-params when navigating.

The result of merging all parent states with their child-states and applying the route-parameters
on top will be directly passed to all [components](/docs/component-overview.html#start) instantiated for the current state
via the [component-binding's](/docs/component-binding.html#start) *params* property.

## onEnter and onExit callbacks

There are also optional 'onEnter' and 'onExit' callbacks that get called when a state becomes active and inactive respectively.

```javascript
wx.router.state({
    name: "contacts",
    views: {
        'main': "contact-list-component"
    },
    onEnter: function() { },
    onLeave: function() { }
});
```

<a class="next-topic" href="/docs/view-binding.html#start">Next: The View-Binding</a>