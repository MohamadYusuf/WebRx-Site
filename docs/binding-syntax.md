---
layout: docs
title: WebRx - Binding Syntax
---
## The data-bind syntax

WebRx’s declarative binding system provides a concise and powerful way to link data to the UI. It’s generally easy and obvious to bind to simple data properties or to use a single binding. For more complex bindings, it helps to better understand the behavior and syntax of WebRx’s binding system.

### Binding syntax

A binding consists of two items, the binding name and expression, separated by a colon. Here is an example of a single, simple binding:

{% highlight html %}
Today's message is: <span data-bind="text: myMessage"></span>
{% endhighlight %} 

An element can include multiple bindings (related or unrelated), with each binding separated by a comma. Here are some examples:
 
{% highlight html %}
Cellphone: <input data-bind="value: cellphoneNumber, enabled: hasCellphone" />
{% endhighlight %} 

The binding name should generally match a registered binding handler (either built-in or custom) or be a parameter for another binding. If the name matches neither of those, WebRx will throw an error.

## Binding Expressions

Binding expressions are JavaScript-like code snippets. For example, these are valid expressions in WebRx:

- 1+2
- a+b
- user.name
- items[index]

### Binding Expressions vs. JavaScript Expressions

WebRx expressions are like JavaScript expressions with the following differences:

- **Context**: JavaScript expressions are evaluated against the global window. In WebRx, expressions are evaluated against the binding-context object.

- **Forgiving**: In JavaScript, trying to evaluate undefined properties generates ReferenceError or TypeError. In WebRx, expression evaluation is forgiving to undefined and null.

- **No Control Flow Statements**: You cannot use the following in an expression: conditionals, loops, or exceptions.

- **No Function Declarations**: You cannot declare functions in an expression.

- **No Function Invocations**: You cannot invoke functions in an expression.

- **No RegExp Creation With Literal Notation**: You cannot create regular expressions in an expression.

- **No Comma And Void Operators**: You cannot use , or void in an expression.

- **Filters**: You can use filters within expressions to format data before displaying it.


#### Context

WebRx does not use JavaScript's eval() to evaluate expressions. Instead WebRx's ExpressionCompiler processes these expressions.

Expressions do not have access to global variables like window, document or location. This restriction is intentional. It prevents accidental access to the global state – a common source of subtle bugs.

#### Forgiving

Expression evaluation is forgiving to undefined and null. In JavaScript, evaluating a.b.c throws an exception if a is not an object. While this makes sense for a general purpose language, the expression evaluations are primarily used for data binding where it makes more sense to show nothing than to throw an exception if a is undefined (perhaps we are waiting for the server response, and it will become defined soon).

#### No Control Flow Statements

Apart from the ternary operator (a ? b : c), you cannot write a control flow statement in an expression. The reason behind this is core to the philosophy that application logic should be in controllers, not the views. If you need a real conditional, loop, or to throw from a view expression, delegate to a JavaScript method instead.

#### No function declarations or RegExp creation with literal notation

You can't declare functions or create regular expressions from within expressions. This is to avoid complex model transformation logic inside templates. Such logic is better placed in a controller or in a dedicated filter where it can be tested properly.