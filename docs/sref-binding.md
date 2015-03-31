---
layout: docs
title: WebRx - The SRef-Binding
---
# The SRef-Binding

The sref-binding binds an anchor element (&lt;a&gt; tag) to a state. The binding will automatically 
generate and update the *href* attribute of the anchor to the route (URI) associated with the state. 

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

You can also specify options to pass to *wx.router.go()*:

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

The shorthand value can also be observable. In this case, if it changes, the sref-binding will immediately update its anchor's *href* attribute.

### Full syntax

To supply parameters to *wx.router.go()*, pass an object with the following properties:

- **name** — the name of a state
- **params** — an object that will be passed on to *wx.router.go()* and get merged with state-parameters specified during registration.
