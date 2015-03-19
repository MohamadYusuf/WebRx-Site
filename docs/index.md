---
layout: docs
title: WebRx - Documentation
---
## Introduction

### The documentation

If you are familiar with [Knockout](http://knockoutjs.com), parts of WebRx's documentation (especially when we talk about the bindings) will sound familiar to you. We took the liberty to copy and adapt Knockout's - and for some areas, Angular's - documentation instead of re-inventing the wheel.

### Is WebRx intended to compete with jQuery or work with it?

Everyone loves jQuery! It’s an outstanding replacement for the clunky, inconsistent DOM API we had to put up with in the past. jQuery is an excellent low-level way to manipulate elements and event handlers in a web page. WebRx solves a different problem.

As soon as your UI gets nontrivial and has a few overlapping behaviors, things can get tricky and expensive to maintain if you only use jQuery. Consider an example: you’re displaying a list of items, stating the number of items in that list, and want to enable an ‘Add’ button only when there are fewer than 5 items. jQuery doesn’t have a concept of an underlying data model, so to get the number of items you have to infer it from the number of TRs in a table or the number of DIVs with a certain CSS class. Maybe the number of items is displayed in some SPAN, and you have to remember to update that SPAN’s text when the user adds an item. You also must remember to disable the ‘Add’ button when the number of TRs is 5. Later, you’re asked also to implement a ‘Delete’ button and you have to figure out which DOM elements to change whenever it’s clicked.

### How is WebRx different?

It’s much easier with WebRx. It lets you scale up in complexity without fear of introducing inconsistencies. Just represent your items as a JavaScript array, and then use a foreach binding to transform this array into a TABLE or set of DIVs. Whenever the array changes, the UI changes to match (you don’t have to figure out how to inject new TRs or where to inject them). The rest of the UI stays in sync. For example, you can declaratively bind a SPAN to display the number of items as follows:

{% highlight html %}
There are <span data-bind="text: myItems.length"></span> items
{% endhighlight %} 

That’s it! You don’t have to write code to update it; it updates on its own when the myItems array changes. Similarly, to make the ‘Add’ button enable or disable depending on the number of items, just write:

{% highlight html %}
<button data-bind="enable: myItems.length < 5">Add</button>
{% endhighlight %} 

### WebRx vs Knockout

Even though WebRx shares many similarities with Knockout, the project is not meant to be a drop-in replacement.

- The most prominent difference is WebRx using [Rx Observables](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/creating.md) for change tracking, whereas Knockout uses uses it's own [custom observables](http://knockoutjs.com/documentation/observables.html). 
- Whan evaluating binding-expressions WebRx utilizes [Angular expressions](https://docs.angularjs.org/guide/expression), Knockout in contrast uses Javascript's [eval()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval). As an additional detail, Knockout supports function invocations in [binding expressions](http://knockoutjs.com/documentation/binding-syntax.html), WebRx does not.
