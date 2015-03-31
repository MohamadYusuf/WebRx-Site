---
layout: docs
title: WebRx - The SActive-Binding
---
# The SActive-Binding

The SActive-binding tests if the [router's](/docs/routing-overview.html#start) current state matches its own configuration
and add the Css-Class *active* to its target element if the test succeeds or remove it otherwise. 

The primary use-case is to simplify the special appearance of navigation menus relying on routing-state, by having the "active" state's menu 
button appear different, distinguishing it from the inactive items.

## Example

```html
<a data-bind="sref: 'contacts', sactive: 'contacts'">Contacts</a>
```
 
```javascript
wx.router.state({
    name: "home",
    views: {
        'main': "home"
    }
}).state({
    name: "contacts",
    views: {
        'main': "contact-list"
    }
})

wx.applyBindings();

wx.router.go("home");
```

The anchor will not bear the *active* class because the state does not match.

```javascript
wx.router.go("contacts");
```

Now, the anchor will bear the *active* class because the state matches.


## Parameters

There are two ways to use the sactive-binding:

### Shorthand syntax

If you pass just a string, it is interpreted as a state name. The state-name will be substring-matched against the Router's
current state.

### Full syntax

Alternatively, pass an object with the following properties:

- **name** — the name of a state
- **params** — an object that will have each of its properties compared against the router's current state-params
