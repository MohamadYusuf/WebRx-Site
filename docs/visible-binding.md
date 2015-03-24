---
layout: docs
title: WebRx - The Visible-Binding
---
## The Visible-Binding

### Purpose

The visible binding causes the associated DOM element to become hidden or visible according to the value you pass to the binding.

### Example

```html
<div data-bind="visible: shouldShowMessage">
    You will see this message only when "shouldShowMessage" holds a true value.
</div>
```
 
```html
<script type="text/javascript">
    var viewModel = {
        shouldShowMessage: wx.property(true) // Message initially visible
    };
    viewModel.shouldShowMessage(false); // ... now it's hidden
    viewModel.shouldShowMessage(true); // ... now it's visible again
</script>
```

### Parameters

#### Main parameter

When the parameter resolves to a false-like value (e.g., the boolean value false, or the numeric value 0, or null, or undefined), the binding sets yourElement.style.display to none, causing it to be hidden. This takes priority over any display style you’ve defined using CSS.

When the parameter resolves to a true-like value (e.g., the boolean value true, or a non-null object or array), the binding removes the yourElement.style.display value, causing it to become visible.

Note that any display style you’ve configured using CSS will then apply (so CSS rules like display:table-row work fine in conjunction with this binding).

If this parameter is an observable value, the binding will update the element’s visibility whenever the value changes. If the parameter isn’t observable, it will only set the element’s visibility once and will not update it again later.
