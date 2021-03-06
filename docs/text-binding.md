---
layout: docs
title: WebRx - The Text-Binding
---
# The Text-Binding

The text binding causes the associated DOM element to display the text value of your parameter.

Typically this is useful with elements like *span* or *em* that traditionally display text, but technically you can use it with any element.

## Example

```html
Today's message is: <span data-bind="text: myMessage"></span>
```
 
```html
<script type="text/javascript">
    var viewModel = {
        myMessage: wx.property() // Initially blank
    };
    viewModel.myMessage("Hello, world!"); // Text appears
</script>
```

## Parameters

### Main parameter

The binding sets the element's content to a text node with your parameter value. Any previous content will be overwritten.

If this parameter is an observable value, the binding will update the element's text whenever the value changes. 
If the parameter isn't observable, it will only set the element's text once and will not update it again later.

If you supply something other than a number or a string (e.g., you pass an object or an array), the displayed text will be equivalent to <code>yourParameter.toString()</code>

<a class="next-topic" href="/docs/html-binding.html">Next: The Html-Binding</a>
