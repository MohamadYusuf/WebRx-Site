---
layout: docs
title: WebRx - The SRef-Binding
---
# The SRef-Binding

The sref-binding binds an anchor element (<code>&lt;a&gt;</code> tag) to a state. The binding will automatically 
generate and update the <code>href</code> attribute of the anchor to the route (URI) associated with the state. 

Clicking the link will trigger a state transition with optional parameters. 

## Example

```javascript
wx.router.state({
    name: "contacts",
    views: {
        'details': "contact-list-component"
    }
});
```

and 

```html
<a data-bind="sref: 'contacts'">Click me</a>
```

will render to ...

```html
<a href='/contacts'>Click me</a>
```

### Passing options

You can also specify options to pass to <code>wx.router.go()</code>:

```javascript
wx.router.state({
    name: "contacts.details",
	route: "details/:contactId"
    views: {
        'details': "contact-details-component"
    }
});
```

and 

```html
<a data-bind="sref: { name: 'contacts.details', params: { contactId: 3 } }">Click me</a>
```

will render to ...

```html
<a href='/contacts/details/3'>Click me</a>
```
 
## Parameters

There are two ways to use the sref-binding:

### Shorthand syntax

If you pass just a string, it is interpreted as a state name.

The shorthand value can also be observable. In this case, if it changes, the sref-binding will immediately update its anchor's <code>href</code> attribute.

### Full syntax

To supply parameters to <code>wx.router.go()</code>, pass an object with the following properties:

- <code>name</code> — the name of a state
- <code>params</code> — an object that will be passed on to <code>wx.router.go()</code> and get merged with state-parameters specified during registration.

<a class="next-topic" href="/docs/sactive-binding.html#start">Next: The SActive-Binding</a>
