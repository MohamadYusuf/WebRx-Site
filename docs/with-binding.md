---
layout: docs
title: WebRx - The With-Binding
---
# The With-Binding

The with binding creates a new binding context, so that descendant elements are bound in the context of a specified object.

Of course, you can arbitrarily nest with bindings along with the other control-flow bindings such as if and foreach.

## Example

Here is a very basic example of switching the binding context to a child object. Notice that in the data-bind attributes, it is not necessary to prefix latitude or longitude with coords., because the binding context is switched to coords.

```html
<h1 data-bind="text: city"></h1>
<p data-bind="with: coords">
    Latitude: <span data-bind="text: latitude"> </span>,
    Longitude: <span data-bind="text: longitude"> </span>
</p>
```
 
```html
<script type="text/javascript">
    wx.applyBindings({
        city: "London",
        coords: {
            latitude:  51.5001524,
            longitude: -0.1262362
        }
    });
</script>
```

## Parameters

### Main parameter

The object that you want to use as the context for binding descendant elements.

If the expression you supply evaluates to null or undefined, descendant elements will not be bound at all, but will instead be removed from the document.

If the expression you supply involves any observable values, the expression will be re-evaluated whenever any of those observables change. Then, descendant elements will be cleared out, and a new copy of the markup will be added to your document and bound in the context of the new evaluation result.

<a class="next-topic" href="/docs/command-binding.html">Next: The Command-Binding</a>
