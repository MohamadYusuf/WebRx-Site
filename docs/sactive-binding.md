---
layout: docs
title: WebRx - The stateActive-Binding
---
# The stateActive-Binding

The stateActive-binding (short form <code>sactive</code>) tests if the [router's](/docs/routing-overview.html) current state matches its own configuration
and add a CSS-Class to its target element if the test succeeds or otherwise remove the class. By default the binding will use
the class name <code>active</code>.

The primary use-case is to simplify the special appearance of navigation menus relying on routing-state, by having the active state's menu 
button appear different, distinguishing it from the inactive items.

**Aliases:** <code>sactive</code>, <code>stateActive</code> and <code>stateactive</code>

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

The anchor will not bear the <code>active</code> class because the state does not match.

```javascript
wx.router.go("contacts");
```

Now, the anchor will bear the <code>active</code> class because the state matches.


## Parameters

There are two ways to use the sactive-binding:

### Shorthand syntax

If you pass just a string, it is interpreted as a state name. The state-name will be substring-matched against the Router's
current state.

### Full syntax

Alternatively, pass an object with the following properties:

- <code>name</code> — the name of a state
- <code>params</code> — an object that will have each of its properties compared against the router's current state-params
- <code>cssClass</code> - the name of one or more whitespace separated css-classes to apply to the element when the current router-state matches the binding's own configuration

<a class="next-topic" href="/docs/dependency-injection-overview.html">Next: Dependency Injection</a>
