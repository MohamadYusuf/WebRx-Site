---
layout: docs
title: WebRx - Documentation
---
# Introduction

## The documentation

If you are familiar with [Knockout](http://knockoutjs.com), parts of WebRx's documentation (especially when we talk about bindings) will sound familiar to you. We took the liberty to copy and adapt Knockout's - and for some areas, Angular's - documentation instead of re-inventing the wheel.

## Is WebRx intended to compete with jQuery or work with it?

Everyone loves jQuery! It’s an outstanding replacement for the clunky, inconsistent DOM API we had to put up with in the past. jQuery is an excellent low-level way to manipulate elements and event handlers in a web page. WebRx solves a different problem.

As soon as your UI gets nontrivial and has a few overlapping behaviors, things can get tricky and expensive to maintain if you only use jQuery. Consider an example: you’re displaying a list of items, stating the number of items in that list, and want to enable an ‘Add’ button only when there are fewer than 5 items. jQuery doesn’t have a concept of an underlying data model, so to get the number of items you have to infer it from the number of TRs in a table or the number of DIVs with a certain CSS class. Maybe the number of items is displayed in some SPAN, and you have to remember to update that SPAN’s text when the user adds an item. You also must remember to disable the ‘Add’ button when the number of TRs is 5. Later, you’re asked also to implement a ‘Delete’ button and you have to figure out which DOM elements to change whenever it’s clicked.

## How is WebRx different?

It’s much easier with WebRx. It lets you scale up in complexity without fear of introducing inconsistencies. Just represent your items as a JavaScript array, and then use a foreach binding to transform this array into a TABLE or set of DIVs. Whenever the array changes, the UI changes to match (you don’t have to figure out how to inject new TRs or where to inject them). The rest of the UI stays in sync. For example, you can declaratively bind a SPAN to display the number of items as follows:

```html
There are <span data-bind="text: myItems.length"></span> items
```

That’s it! You don’t have to write code to update it; it updates on its own when the myItems array changes. Similarly, to make the ‘Add’ button enable or disable depending on the number of items, just write:

```html
<button data-bind="enable: myItems.length < 5">Add</button>
```

## MVVM and View Models

Model-View-View Model (MVVM) is a design pattern for building user interfaces. It describes how you can keep a potentially sophisticated UI simple by splitting it into three parts:

- **A model:** your application’s stored data. This data represents objects and operations in your business domain (e.g., bank accounts that can perform money transfers) and is independent of any UI. When using WebRx, you will usually make Ajax calls to some server-side code to read and write this stored model data.
- **A view model:** a pure-code representation of the data and operations on a UI. For example, if you’re implementing a list editor, your view model would be an object holding a list of items, and exposing methods to add and remove items.
Note that this is not the UI itself: it doesn’t have any concept of buttons or display styles. It’s not the persisted data model either - it holds the unsaved data the user is working with. When using WebRx, your view models are pure JavaScript objects that hold no knowledge of HTML. Keeping the view model abstract in this way lets it stay simple, so you can manage more sophisticated behaviors without getting lost.
- **A view:** a visible, interactive UI representing the state of the view model. It displays information from the view model, sends commands to the view model (e.g., when the user clicks buttons), and updates whenever the state of the view model changes.

When using WebRx, your view is simply your HTML document with declarative bindings to link it to the view model. Alternatively, you can use templates that generate HTML using data from your view model.

To create a view model with WebRx, just declare any JavaScript object. For example,

```javascript
var myViewModel = {
    personName: 'Bob',
    personAge: 123
};
```

You can then create a very simple view of this view model using a declarative binding. For example, the following markup displays the personName value:

```html
The name is <span data-bind="text: personName"></span>
```

## Activating WebRx

The data-bind attribute isn’t native to HTML, though it is perfectly OK (it’s strictly compliant in HTML 5, and causes no problems with HTML 4 even though a validator will point out that it’s an unrecognized attribute). But since the browser doesn’t know what it means, you need to activate WebRx to make it take effect.

To activate WebRx, add the following line to a script block:

```javascript
wx.applyBindings(myViewModel);
```

You can either put the script block at the bottom of your HTML document, or you can put it at the top and wrap the contents in a DOM-ready handler such as jQuery’s $ function.

That does it! Now, your view will display as if you’d written the following HTML:

```html
The name is <span>Bob</span>
```

In case you’re wondering what the parameters to wx.applyBindings do,

- The first parameter says what view model object you want to use with the declarative bindings it activates.
- Optionally, you can pass a second parameter which defines which part of the document you want to search for data-bind attributes. For example, wx.applyBindings(myViewModel, document.getElementById('someElementId')). This restricts the activation to the element with ID someElementId and its descendants, which is useful if you want to have multiple view models and associate each with a different region of the page.

Pretty simple, really.

## WebRx vs Knockout

Even though WebRx shares many similarities with Knockout, the project is not meant to be a drop-in replacement.

- The most prominent difference is WebRx using [Rx Observables](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/creating.md) for change tracking, whereas Knockout uses uses it's own [custom observables](http://knockoutjs.com/documentation/observables.html). 
- Whan evaluating binding-expressions WebRx utilizes [Angular expressions](https://docs.angularjs.org/guide/expression), Knockout in contrast uses Javascript's [eval()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval). As an additional detail, Knockout supports function invocations in [binding expressions](http://knockoutjs.com/documentation/binding-syntax.html), WebRx does not.
