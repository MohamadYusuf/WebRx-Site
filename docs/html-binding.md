---
layout: docs
title: WebRx - The Html-Binding
---
# The Html-Binding


The html binding causes the associated DOM element to display the HTML specified by your parameter.

Typically this is useful when values in your view model are actually strings of HTML markup that you want to render.

## Example

```html
<div data-bind="html: details"></div>
```
 
```html
<script type="text/javascript">
    var viewModel = {
        details: wx.property() // Initially blank
    };
    viewModel.details("<em>For further details, view the report <a href='report.html'>here</a>.</em>"); // HTML content appears
</script>
```

## Parameters

### Main parameter

The binding clears the previous content and then sets the element's content to your parameter value by parsing the string into HTML 
nodes and appending each node as a child of the element.

If this parameter is an observable value, the binding will update the element's content whenever the value changes. 
If the parameter isn't observable, it will only set the element's content once and will not update it again later.

If you supply something other than a number or a string (e.g., you pass an object or an array), the <code>innerHTML</code> 
will be equivalent to <code>yourParameter.toString()</code>

### Note: About HTML encoding

Since this binding sets your element's content using <code>innerHTML</code>, you should be careful not to use it with untrusted model values, 
because that might open the possibility of a script injection attack. If you cannot guarantee that the content is safe to display 
(for example, if it is based on a different user's input that was stored in your database), then you can use the text binding, 
which will set the element's text value using <code>innerText</code> or <code>textContent</code> instead.

<a class="next-topic" href="/docs/css-binding.html">Next: The CSS-Binding</a>
