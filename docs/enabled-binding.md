---
layout: docs
title: WebRx - The Enabled-Binding
---
# The Enabled-Binding

The enable binding causes the associated DOM element to be enabled only when the parameter value is true. 
This is useful with form elements like input, select, and textarea.

## Example

```html
<p>
    <input type='checkbox' data-bind="checked: hasCellphone" />
    I have a cellphone
</p>
<p>
    Your cellphone number:
    <input type='text' data-bind="value: cellphoneNumber, enable: hasCellphone" />
</p>
```
 
```html
<script type="text/javascript">
    var viewModel = {
        hasCellphone : wx.property(false),
        cellphoneNumber: ""
    };
</script>
```

In this example, the "Your cellphone number" text box will initially be disabled. It will be enabled only when the user checks the box labelled "I have a cellphone".

## Parameters

### Main parameter

A value that controls whether or not the associated DOM element should be enabled.

Non-boolean values are interpreted loosely as boolean. For example, 0 and null are treated as false, whereas 21 and non-null objects are treated as true.

If your parameter references an observable value, the binding will update the enabled/disabled state whenever the observable property value changes.
If the parameter doesn't reference an observable property, it will only set the state once and will not do so again later.
