---
layout: docs
title: WebRx - The Checked-Binding
---
# The Checked-Binding

The checked binding links a checkable form control i.e., a checkbox or a radio button with a property on your view model.

When the user checks the associated form control, this updates the value on your view model. 
Likewise, when you update the value in your view model, this checks or unchecks the form control on screen.

**Note:** For text boxes, drop-down lists, and all non-checkable form controls, use the value 
binding to read and write the element's value, not the checked binding.

## Example with checkbox

```html
<p>Send me spam: <input type="checkbox" data-bind="checked: @wantsSpam" /></p>
```
 
```html
<script type="text/javascript">
    var viewModel = {
        wantsSpam: wx.property(true) // Initially checked
    };
 
    // ... then later ...
    viewModel.wantsSpam(false); // The checkbox becomes unchecked
</script>
```

## Example adding radio buttons

```html
<p>Send me spam: <input type="checkbox" data-bind="checked: @wantsSpam" /></p>
<div data-bind="visible: wantsSpam">
    Preferred flavor of spam:
    <div><input type="radio" name="flavorGroup" value="cherry" data-bind="checked: spamFlavor" /> Cherry</div>
    <div><input type="radio" name="flavorGroup" value="almond" data-bind="checked: spamFlavor" /> Almond</div>
    <div><input type="radio" name="flavorGroup" value="msg" data-bind="checked: spamFlavor" /> Monosodium Glutamate</div>
</div>
```
 
```html
<script type="text/javascript">
    var viewModel = {
        wantsSpam: wx.property(true),
        spamFlavor: wx.property("almond") // Initially selects only the Almond radio button
    };
 
    // ... then later ...
    viewModel.spamFlavor("msg"); // Now only Monosodium Glutamate is checked
</script>
```

## Parameters

### Main parameter

The binding sets the element's checked state to match your parameter value. Any previous checked state will be overwritten. 

If this parameter is a [property reference](/docs/observable-properties.html#topic-propref) (denoted by the <code>@</code>-operator),
the binding will update the element's checked-state whenever the value changes and vice-versa.
If the parameter something else, it will only set the element's value once and will not update it again later.

The way your parameter is interpreted depends on what type of element you're binding to ...

#### Checkboxes

For checkboxes, the binding will set the element to be checked when the parameter value is true, 
and unchecked when it is false. If you give a value that isn't actually boolean, it will be interpreted loosely. 
This means that nonzero numbers and non-null objects and non-empty strings will all be interpreted as true, 
whereas zero, null, undefined, and empty strings will be interpreted as false.

When the user checks or unchecks the checkbox, the binding will set your model property to true or false accordingly.

#### Radio-Buttons

For radio buttons, the binding will set the element to be checked if and only if the parameter 
value equals the radio button node's value attribute. In the previous example, the radio button with 
value="almond" was checked only when the view model's spamFlavor property was equal to *"almond"*.

When the user changes which radio button is selected, the binding will set your model property to equal 
the value of the selected radio button. In the preceding example, clicking on the radio button 
with value="cherry" would set <code>viewModel.spamFlavor</code> to be *"cherry"*.

Of course, this is most useful when you have multiple radio button elements bound to a single model property.
To ensure that only one of those radio buttons can be checked at any one time, you should set all of 
their name attributes to an arbitrary common value (e.g., the value flavorGroup in the preceding example) - 
doing this puts them into a group where only one can be selected.

<a class="next-topic" href="/docs/selected-value-binding.html">Next: The SelectedValue-Binding</a>
