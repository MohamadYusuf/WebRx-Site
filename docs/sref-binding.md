---
layout: docs
title: WebRx - The stateRef-Binding
---
# The stateRef-Binding

The purpose of the stateRef-Binding is to enable a HTML element to trigger routing-state-transitions.
The binding is usually used with anchor elements (<code>&lt;a&gt;</code>) or buttons but supports any element type.

After the binding has been applied to an element, clicking the element will trigger a transition to the state specified in the binding-options.

When applied to an anchor element, the binding will automatically populate an anchor's <code>href</code> attribute with the route (URI) associated with the state.
Because the binding infers the resulting URI from the State-Name and -Parameters, it eliminates the necessity to hard-code
state URIs in markup.

**Aliases:** <code>sref</code>, <code>stateRef</code> and <code>stateref</code>

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

<a class="next-topic" href="/docs/sactive-binding.html">Next: The SActive-Binding</a>
