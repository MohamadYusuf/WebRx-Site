---
layout: docs
title: WebRx - The View-Binding
---
# The View-Binding

One of the fundamental principles behind WebRx's [routing engine](/docs/routing-overview.html#start) is that your application partitions
your pages into regions by applying a view-binding to one or more
elements of your page. A state can then define which [component](/docs/component-overview.html#start)
those regions will display when the state is active.

Essentially view-bindings define placeholders on a page that get filled with components defined in the current state.

## Example

```html
<body>
	<section data-bind="view: 'main'"></section>
	<section data-bind="view: 'details'"></section>
</body>
```

This example defines the views <code>main</code> and <code>details</code>. Now let's define a routing-state referencing these views:

```javascript
wx.router.state({
    name: "contacts",
    views: {
        'main': "header-component",
        'details': "contact-list-component"
    }
});
```

Let's see what happens to the contents of both views when the <code>contacts</code> state is activated:

- The <code>main</code> view will display the <code>header-component</code> 
- The <code>details</code> view will display the <code>contact-list-component</code>

## Parameters
 
### Main parameter

You should pass a string that defines the name of the view.

**Note:** View-Names must be **unique** accross a page.

<a class="next-topic" href="/docs/sref-binding.html#start">Next: The SRef-Binding</a>