---
layout: docs
title: WebRx - Expression Filters
---
# Expression Filters

Expression-filters format or convert the result of an expression for display to the user. Once registered, they can be used in every template.

The beauty of expression-filters is that they can often be utilized to augment the functionality if existing bindings without 
having to resort to a [custom-binding](/docs/custom-bindings.html). As a rule of thumb, every time all you want to do is to convert
the result of a binding expression to an alternative representation, an expression filter is most likely a better and much
simpler solution than a custom-binding. Another advantage of filters is that they can be chained using the pipe (<code>|</code>) symbol.   

## Using filters in templates

Filters can be applied to expressions in templates using the following syntax:

```javascript
expression | filter
```

E.g. the markup <code>12 | currency</code> formats the number 12 as a currency using the currency filter. The resulting value is $12.00.

Filters can be applied to the result of another filter. This is called "chaining" and uses the following syntax:

```javascript
expression | filter1 | filter2 | ...
```

Filters may have arguments. The syntax for this is

```javascript
expression | filter:argument1:argument2:...
```

E.g. the markup <code>1234 | number:2</code> formats the number <code>1234</code> with 2 decimal points using the number filter. The resulting value is 1,234.00.

## Registering a filter

An expression filter is a function which is registered by invoking the <code>wx.app.filter</code> function:

```javascript
wx.app.filter('uppercase', function(expressionResult) {
    // The function will be called with the first argument representing 
    // the result of the expression the filter has been applied to
    // or the result of the previous filter in the chain
    return expressionResult.toUpperCase();  
});
```

### Customizing filter behavior

Expression filters can even be configured for individual bindings by supplying additional arguments to it. 

Let's change the <code>uppercase</code> filter into a generic case transformation filter:

```javascript
wx.app.filter('changecase', function(expressionResult, toUpper) {
    return toUpper ? expressionResult.toUpperCase() : expressionResult.toLowerCase();
});
```

Using our filter in a binding would be as simple as:

```html
<span data-bind="text: 'foo' | changecase:true"></span>
```

### Consuming a filter in a view-model

In a perfect world your view-model never has to deal with presentation issues that are normally handled declaratively in 
your view. Since we don't live in such a world just yet, it is possible to retrieve and subsequently use, a registered 
filter function in your view-model in order to avoid duplicate code:

```javascript
var myViewModel = {
    personName: 'Bob',
    personAge: 123,
    caseFilter: wx.app.filter('changecase')
};
```


<a class="next-topic" href="/docs/custom-bindings.html">Next: Custom Bindings</a>
