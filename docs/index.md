---
layout: docs
title: WebRx - Documentation
---
# Introduction

HTML is great for declaring static documents, but it falters when we try to use it for declaring dynamic views in web-applications. WebRx 
lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop.

## Building Blocks

WebRx is built around these core concepts:

- View-Models using [Observable Properties](/docs/observable-properties.html) and [Commands](/docs/commands.html)
- Templates using [declarative bindings](/docs/binding-syntax.html)
- [Components](/docs/component-overview.html) that combine the aforementioned features into self-contained, reusable chunks
- Client-Side [Routing](/docs/routing-overview.html)

### <a id="topic-mvvm-intro"></a>MVVM and View-Models

Let's take a minute to examine the MVVM pattern and the concept of a view model.

Model-View-View Model (MVVM) is a design pattern for building user interfaces. It describes how you can keep a 
potentially sophisticated UI simple by splitting it into three parts:

- **A model:** your application's stored data. This data represents objects and operations in your business domain 
(e.g., bank accounts that can perform money transfers) and is independent of any UI. When using WebRx, 
you will usually make Ajax calls to some server-side code to read and write this stored model data.
- **A view model:** a pure-code representation of the data and operations on a UI. For example, 
if you're implementing a list editor, your view model would be an object holding a list of items, 
and exposing methods to add and remove items.
Note that this is not the UI itself: it doesn't have any concept of buttons or display styles. 
It's not the persisted data model either - it holds the unsaved data the user is working with. 
When using WebRx, your view models are pure JavaScript objects that hold no knowledge of HTML. 
Keeping the view model abstract in this way lets it stay simple, so you can manage more 
sophisticated behaviors without getting lost.
- **A view:** a visible, interactive UI representing the state of the view model. It displays information 
from the view model, sends commands to the view model (e.g., when the user clicks buttons), and updates 
whenever the state of the view model changes.

### MVVM in WebRx

When using WebRx, your view is simply your HTML document with declarative bindings to link it to the view model. 
Alternatively, you can use templates that generate HTML using data from your view model.

To create a view model with WebRx, just declare any JavaScript object. For example,

```javascript
var myViewModel = {
    personName: 'Bob',
    personAge: 123
};
```

You can then create a very simple view of this view model using a declarative binding. For example, 
the following markup displays the personName value:

```html
The name is <span data-bind="text: personName"></span>
```

## Activating WebRx

The data-bind attribute isn't native to HTML, though it is perfectly OK (it's strictly compliant in HTML 5, 
and causes no problems with HTML 4 even though a validator will point out that it's an unrecognized attribute). 
But since the browser doesn't know what it means, you need to activate WebRx to make it take effect.

To activate WebRx, add the following line to a script block:

```javascript
wx.applyBindings(myViewModel);
```

You can either put the script block at the bottom of your HTML document, or you can put it at the top and wrap the 
contents in a DOM-ready handler such as jQuery's $ function.

That does it! Now, your view will display as if you'd written the following HTML:

```html
The name is <span>Bob</span>
```

In case you're wondering what the parameters to wx.applyBindings do,

- The first parameter says what view model object you want to use with the declarative bindings it activates.
- Optionally, you can pass a second parameter which defines which part of the document you want to search 
for data-bind attributes. For example, wx.applyBindings(myViewModel, document.getElementById('someElementId')). 
This restricts the activation to the element with ID someElementId and its descendants, which is useful if you 
want to have multiple view models and associate each with a different region of the page.

Pretty simple, really.

<a class="next-topic" href="/docs/binding-syntax.html">Next: The Binding-Syntax</a>