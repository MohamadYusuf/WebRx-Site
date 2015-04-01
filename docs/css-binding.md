---
layout: docs
title: WebRx - The CSS-Binding
---
# The CSS-Binding


The CSS-binding adds or removes one or more named CSS classes to the associated DOM element. This is useful, for example, to highlight some value in red if it becomes negative.

(Note: If you don't want to apply a CSS class but instead want to assign a style attribute value directly, see the [style binding](/docs/style-binding.html#start).)

## Example

```html
<div data-bind="css: { profitWarning: currentProfit < 0 }">
   Profit Information
</div>
```
 
```html
<script type="text/javascript">
    var viewModel = {
        currentProfit: wx.property(150000) // Positive value, so initially we don't apply the "profitWarning" class
    };
    viewModel.currentProfit(-50); // Causes the "profitWarning" class to be applied
</script>
```

This will apply the CSS class <code>profitWarning</code> whenever the <code>currentProfit</code> value dips below zero, and remove that class whenever it goes above zero.

## Parameters

### Main parameter

You should pass a JavaScript object in which the property names are your CSS classes, and their values evaluate to true or false according to whether the class should currently be applied.

You can set multiple CSS classes at once. For example, if your view model has a property called isSevere,

```html
<div data-bind="css: { profitWarning: currentProfit < 0, majorHighlight: isSevere }">
```

You can even set multiple CSS classes based on the same condition by wrapping the names in quotes like:

```html
<div data-bind="css: { profitWarning: currentProfit < 0, 'major highlight': isSevere }">
```

Non-boolean values are interpreted loosely as boolean. For example, <code>0</code> and <code>null</code> are treated as <code>false</code>, 
whereas <code>21</code> and non-null objects are treated as <code>true</code>.

If your parameter references an observable value, the binding will add or remove the CSS class whenever the observable value changes. 
If the parameter doesn't reference an observable value, it will only add or remove the class once and will not do so again later.

As usual, you can use [arbitrary expressions](/docs/binding-syntax.html#topic-binding-expressions) as parameter values. 
WebRx will evaluate them and use the resulting values to determine the appropriate CSS classes to add or remove.

### Note: Applying CSS classes whose names aren't legal JavaScript variable names

If you want to apply the CSS class my-class, you can't write this:

```html
<div data-bind="css: { my-class: someValue }">...</div>
```

… because my-class isn't a legal identifier name at that point. The solution is simple: just wrap the identifier name in quotes so that it becomes a string literal, which is legal in a JavaScript object literal. For example,

```html
<div data-bind="css: { 'my-class': someValue }">...</div>
```

<a class="next-topic" href="/docs/style-binding.html#start">Next: The Style-Binding</a>