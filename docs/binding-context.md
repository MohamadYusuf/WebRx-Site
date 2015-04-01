---
layout: docs
title: WebRx - The Binding-Context
---
# The Binding-Context

A binding context is an object that holds data that you can reference from your bindings. While applying bindings, WebRx automatically creates and manages a hierarchy of binding contexts. The root level of the hierarchy refers to the viewModel parameter you supplied to wx.applyBindings(viewModel). Then, each time you use a control flow binding such as with or foreach, that creates a child binding context that refers to the nested view model data.

Bindings contexts offer the following special properties that you can reference in any binding:

### <code>$parent</code>

This is the view model object in the parent context, the one immeditely outside the current context. In the root context, this is undefined. Example:

```html
<h1 data-bind="text: name"></h1>
 
<div data-bind="with: manager">
    <!-- Now we're inside a nested binding context -->
    <span data-bind="text: name"></span> is the
    manager of <span data-bind="text: $parent.name"></span>
</div>
```

### <code>$parents</code>

This is an array representing all of the parent view models:

$parents[0] is the view model from the parent context (i.e., it's the same as $parent)

$parents[1] is the view model from the grandparent context

$parents[2] is the view model from the great-grandparent context

… and so on.

### <code>$root</code>

This is the main view model object in the root context, i.e., the topmost parent context. It's usually the object that was passed to wx.applyBindings. It is equivalent to $parents[$parents.length - 1].

### <code>$data</code>

This is the view model object in the current context. In the root context, <code>$data</code> and <code>$root</code> are equivalent. Inside a nested binding context, this parameter will be set to the current data item (e.g., inside a with: person binding, $data will be set to person). <code>$data</code> is useful when you want to reference the viewmodel itself, rather than a property on the viewmodel. Example:

```html
<ul data-bind="foreach: ['cats', 'dogs', 'fish']">
    <li>The value is <span data-bind="text: $data"></span></li>
</ul>
```

### <code>$index</code> (only available within foreach bindings)

This is the zero-based index of the current array entry being rendered by a foreach binding. Unlike the other binding context properties, $index is an observable and is updated whenever the index of the item changes (e.g., if items are added to or removed from the array).

## Controlling or modifying the binding context in custom bindings

Just like the built-in bindings with and foreach, custom bindings can change the binding context for their descendant elements, or provide special properties by extending the binding context object. This is described in detail under creating custom bindings that control descendant bindings.

<a class="next-topic" href="/docs/observable-properties.html#start">Next: Observable-Properties</a>