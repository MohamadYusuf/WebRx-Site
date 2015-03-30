---
layout: docs
title: WebRx - The TextInput-Binding
---
# The TextInput-Binding

The textInput binding links a text box (*input*) or *textarea* with a view-model property, providing two-way updates between 
the view-model property and the element's value. Unlike the value binding, textInput provides instant updates from the DOM 
for all types of user input, including autocomplete, drag-and-drop, and clipboard events.

## Example

```html
<p>Login name: <input data-bind="textInput: @userName" /></p>
<p>Password: <input type="password" data-bind="textInput: @userPassword" /></p>
```
 
```html
<script>
    wx.applyBindings({
        userName: wx.property(""),        // Initially blank
        userPassword: wx.property("abc")  // Prepopulate
    });
</script>
```

## Parameters

### Main Parameter

The binding sets the element's text content to your parameter value. Any previous value will be overwritten.

If this parameter is a [property reference](/docs/observable-properties.html#topic-propref) (denoted by the @-operator),
the binding will update the element's value whenever the value changes and vice-versa.
If the parameter something else, it will only set the element's value once and will not update it again later.


## textInput vs. value binding

Although the value binding can also perform two-way binding between text boxes and view-model properties, 
you should prefer textInput whenever you want immediate live updates. The main differences are:

### Immediate updates

value, by default, only updates your model when the user moves focus out of the text box. 
textInput updates your model immediately on each keystroke or other text entry mechanism 
(such as cutting or dragging text, which don't necessarily raise any focus change events).

### Browser event quirks handling

Browsers are highly inconsistent in the events that fire in response to unusual text entry mechanisms 
such as cutting, dragging, or accepting autocomplete suggestions. The value binding, even with extra 
options such as valueUpdate: afterkeydown to get updates on particular events, does not cover 
all text entry scenarios on all browsers.

The textInput binding is specifically designed to handle a wide range of browser quirks, 
to provide consistent and immediate model updates even in response to unusual text entry methods.

Don't try to use the value and textInput bindings together on the same element, 
as that won't achieve anything useful.

<a class="next-topic" href="/docs/hasfocus-binding.html#start">Next: The HasFocus-Binding</a>