---
layout: docs
title: WebRx - Defining and registering routing states
---
# Defining and registering routing states

So far we've only briefly touched the subject of state-registration. That is about to change.

## Views

One of the fundamental principles behind WebRx's routing engine is that your application partitions
your pages into regions by applying a [view-binding](/docs/view-binding.html) to one or more
elements of your page. A state can then define which [component](/docs/component-overview.html)
those regions will display when the state is active.

Components will be resolved against the currently active [module](/docs/module-overview.html) or alternatively
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

In this example the [component-binding](/docs/component-binding.html) will receive following object as <code>params</code> argument when
instantiating the <code>contact-list-component</code>:

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

In this example the [component-binding](/docs/component-binding.html) will receive following object as <code>params</code> argument when
instantiating the <code>contact-list-component</code>:

```javascript
{ 'companyId': 3, 'contactId': 42 }
```

## State Routes

Most states in your application will probably have a url associated with them. State-Routing was not an afterthought 
to the state mechanics, but was figured into the design from the beginning (all while keeping states separate from url routing)

Here's how you configure a state with a basic url:

```javascript
wx.router.state({
    name: "contacts",
	url: "contacts",
    views: {
        'main': "contact-list-component"
    }
});
```

Now when the user accesses <code>/contacts</code> then the <code>contacts</code> state would become active and the <code>main</code> view will be populated with 
the <code>contact-list-component</code> component. Alternatively, if the user were to transition to the <code>contacts</code> state via 
<code>wx.router.go('contacts')</code> then the browser's location would be updated to <code>/contacts</code>.

### Implicit routes

Specifying a url when configuring a state is optional. If you omit the url, WebRx will will automatically assign it one
that mirrors the state hierarchy.

```javascript
wx.router.state({
    name: "foo.bar.baz"
});
```

The implicit url for state <code>foo.bar.baz</code> state will be <code>/foo/bar/baz</code>.

### Relative- vs. Absolute-Routes

In all of the previous examples we've used relative routes. It is also possible to prepend a url with a '/' to turn it into
an absolute url.

```javascript
wx.router.state({
    name: "foo.bar.baz",
	url: "/bar/foo"
});
```

Now, the url for state <code>foo.bar.baz</code> will be <code>/bar/foo</code>, completely ignoring the state-hierarchy.

### Route Parameters

Often, URLs have dynamic parts to them which are called parameters. There are several options for specifying parameters. 
A basic parameter looks like this:

```javascript
wx.router.state({
    name: "contacts",
	url: "contacts/:contactId",
    views: {
        'main': "contact-list-component"
    }
});
```

#### Examples:

- <code>/hello/</code> - Matches only if the path is exactly <code>/hello/</code>. There is no special treatment for trailing slashes, 
and patterns have to match the entire path, not just a prefix.
- <code>/user/:id</code> - Matches <code>/user/bob</code> or <code>/user/1234!!!</code> or even <code>/user/</code> but not <code>/user</code> or <code>/user/bob/details</code>. 
The second path segment will be captured as the parameter <code>id</code>.

**Note:** Parameter names may contain only word characters (latin letters, digits, and underscore) and must be unique within the 
pattern (across both path and search parameters).

#### Custom validators for route parameters

If you need more control about route-parameters you can also pass in an object that combines a route
with a set of per-parameter custom validators. 

```javascript
wx.router.state({
    name: "contacts",
	url: wx.route("contacts/:contactId/:other", {
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

Alternatively you can pass in a RegExp for the url parameter:

```javascript
wx.router.state({
    name: "contacts",
	url: /^(contacts?)(?:\/(\d+)(?:\.\.(\d+))?)?/,
    views: {
        'main': "contact-list-component"
    }
});
```

### How route-parameters are handled

When a state is activated, any parameters captured from the current route will be merged with 
state-parameters specified during registration. 

Once again the state-params merging will follow the state-hierarchy, with route-parameters applied
as the final step to allow for overriding state-params when navigating.

The result of merging all parent states with their child-states and applying the route-parameters
on top will be directly passed to all [components](/docs/component-overview.html) instantiated for the current state
via the [component-binding's](/docs/component-binding.html) <code>params</code> property.

## onEnter and onExit callbacks

There are also optional <code>onEnter</code> and <code>onExit</code> callbacks that get called when a state becomes active and inactive respectively.

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

<a class="next-topic" href="/docs/view-binding.html">Next: The View-Binding</a>
