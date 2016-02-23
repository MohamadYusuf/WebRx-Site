---
layout: docs
title: WebRx - Declaring Data-Bindings
---
# Declaring Data-Bindings

WebRx's declarative binding system provides a concise and powerful way to link data to the UI. 
It's generally easy and obvious to bind to simple data properties or to use a single binding. 
For more complex bindings, it helps to better understand the behavior and syntax of WebRx's binding system.

## The <code>data-bind</code> attribute

The <code>data-bind</code> attribute contains a collection of comma-separated options for how WebRx should bind view-model properties
to an HTML element and optionally its children. 

A binding consists of two items, the binding name and expression, separated by a colon. Here is an example of a single, simple binding:

```html
Today's message is: <span data-bind="text: myMessage"></span>
```

An element can include multiple bindings (related or unrelated), with each binding separated by a comma. Here are some examples:
 
```html
Cellphone: <input data-bind="value: cellphoneNumber, enabled: hasCellphone" />
```

The binding name should generally match a registered binding handler (either built-in or custom) or be a parameter for another binding. If the name matches neither of those, WebRx will throw an error.

## <a id="topic-binding-expressions"></a>Binding Expressions

Binding expressions are JavaScript-like code snippets. For example, these are valid expressions in WebRx:

- <code>1+2</code>
- <code>a+b</code>
- <code>user.name</code>
- <code>items[index]</code>
- <code>foo.@bar</code>

### Binding Expressions vs. JavaScript Expressions

WebRx expressions are like JavaScript expressions with the following differences:

- **Context**: JavaScript expressions are evaluated against the global window. In WebRx, expressions are evaluated against the binding-context object.
- **Forgiving**: In JavaScript, trying to evaluate undefined properties generates ReferenceError or TypeError. In WebRx, expression evaluation is forgiving to undefined and null.
- **No Control Flow Statements**: You cannot use the following in an expression: conditionals, loops, or exceptions.
- **No Function Declarations**: You cannot declare functions in an expression.
- **No RegExp Creation With Literal Notation**: You cannot create regular expressions in an expression.
- **No Comma And Void Operators**: You cannot use , or void in an expression.
- **Filters**: You can use filters within expressions to format data before displaying it.

### Context

WebRx does not use JavaScript's eval() to evaluate expressions. Instead WebRx's ExpressionCompiler processes these expressions.

Expressions do not have access to global variables like window, document or location. This restriction is intentional. It prevents accidental access to the global state – a common source of subtle bugs.

### Forgiving

Expression evaluation is forgiving to undefined and null. In JavaScript, evaluating a.b.c throws an exception if a is not an object. While this makes sense for a general purpose language, the expression evaluations are primarily used for data binding, which often look like this:

```javascript
a.b.c
```

It makes more sense to show nothing than to throw an exception if "a" is undefined (perhaps we are waiting for the server response, and it will become defined soon). If expression evaluation wasn't forgiving we'd have to write bindings that clutter the code, for example:

```javascript
a||{}).b||{}).c
```

### No Control Flow Statements

Apart from the ternary operator <code>(a ? b : c)</code>, you cannot write a control flow statement in an expression. 
The reason behind this is core to the philosophy that application logic should be in view-models, not the views. 

### No function declarations or RegExp creation with literal notation

You can't declare functions or create regular expressions from within expressions. This is to avoid complex model 
transformation logic inside templates. Such logic is better placed in a view-model or in a dedicated filter where it can be tested properly. 

## <a id="topic-expression-filters"></a>Expression Filters

Expression-filters format the result of an expression for display to the user. They can be used in every template 
and can be registered at [module](/docs/module-overview.html)-level.

### Using filters in templates

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

<!-- ### Built-in filters

- <code>currency</code>: Formats a number as a currency (ie $1,234.56). When no currency symbol is provided, default symbol for current locale is used.
-->

<a class="next-topic" href="/docs/binding-context.html">Next: The Binding-Context</a>