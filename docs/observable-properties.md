---
layout: docs
title: WebRx - Observable Properties
---
## Observable Properties

WebRx is built around three core features:

- Rx Observables and Observable Properties
- Declarative bindings
- Templating

On this page, you’ll learn about the first of these three. But before that, let’s examine the MVVM pattern and the concept of a view model.

### MVVM and View Models

Model-View-View Model (MVVM) is a design pattern for building user interfaces. It describes how you can keep a potentially sophisticated UI simple by splitting it into three parts:

- **A model:** your application’s stored data. This data represents objects and operations in your business domain (e.g., bank accounts that can perform money transfers) and is independent of any UI. When using WebRx, you will usually make Ajax calls to some server-side code to read and write this stored model data.
- **A view model:** a pure-code representation of the data and operations on a UI. For example, if you’re implementing a list editor, your view model would be an object holding a list of items, and exposing methods to add and remove items.
Note that this is not the UI itself: it doesn’t have any concept of buttons or display styles. It’s not the persisted data model either - it holds the unsaved data the user is working with. When using WebRx, your view models are pure JavaScript objects that hold no knowledge of HTML. Keeping the view model abstract in this way lets it stay simple, so you can manage more sophisticated behaviors without getting lost.
- **A view:** a visible, interactive UI representing the state of the view model. It displays information from the view model, sends commands to the view model (e.g., when the user clicks buttons), and updates whenever the state of the view model changes.

When using WebRx, your view is simply your HTML document with declarative bindings to link it to the view model. Alternatively, you can use templates that generate HTML using data from your view model.

To create a view model with WebRx, just declare any JavaScript object. For example,

{% highlight javascript %}
var myViewModel = {
    personName: 'Bob',
    personAge: 123
};
{% endhighlight %}

You can then create a very simple view of this view model using a declarative binding. For example, the following markup displays the personName value:

{% highlight html %}
The name is <span data-bind="text: personName"></span>
{% endhighlight %}

### Activating WebRx

The data-bind attribute isn’t native to HTML, though it is perfectly OK (it’s strictly compliant in HTML 5, and causes no problems with HTML 4 even though a validator will point out that it’s an unrecognized attribute). But since the browser doesn’t know what it means, you need to activate WebRx to make it take effect.

To activate WebRx, add the following line to a script block:

{% highlight javascript %}
wx.applyBindings(myViewModel, element);
{% endhighlight %}

You can either put the script block at the bottom of your HTML document, or you can put it at the top and wrap the contents in a DOM-ready handler such as jQuery’s $ function.

That does it! Now, your view will display as if you’d written the following HTML:

{% highlight html %}
The name is <span>Bob</span>
{% endhighlight %}

In case you’re wondering what the parameters to wx.applyBindings do,

The **first parameter** says what view model object you want to use with the declarative bindings it activates.

The **second parameter** defines which part of the document you want to search for data-bind attributes. For example, wx.applyBindings(myViewModel, document.getElementById('someElementId')). This restricts the activation to the element with ID someElementId and its descendants, which is useful if you want to have multiple view models and associate each with a different region of the page.

Pretty simple, really.

### Observable Properties

OK, you’ve seen how to create a basic view model and how to display one of its properties using a binding. But one of the key benefits of WebRx is that it updates your UI automatically when the view model changes. How can WebRx know when parts of your view model change? Answer: you need to declare your model properties as observable-properties, because these are special JavaScript objects that can notify subscribers about changes.

For example, rewrite the preceding view model object as follows:

{% highlight javascript %}
var myViewModel = {
    personName: wx.property('Bob'),
    personAge: wx.property(123)
};
{% endhighlight %}

You don’t have to change the view at all - the same data-bind syntax will keep working. The difference is that it’s now capable of detecting changes, and when it does, it will update the view automatically.

### Reading and writing properties

To read the property’s current value, just call the property with no parameters. In this example, myViewModel.personName() will return 'Bob', and myViewModel.personAge() will return 123.

To write a new value to the property, call the property and pass the new value as a parameter. For example, calling myViewModel.personName('Mary') will change the name value to 'Mary'.

The whole point of observable properties is that they can be observed, i.e., other code can say that it wants to be notified of changes. That’s what many of WebRx’s built-in bindings do internally. So, when you wrote data-bind="text: personName", the text binding registered itself to be notified when personName changes (assuming it’s an observable property, which it is now).

When you change the name value to 'Mary' by calling myViewModel.personName('Mary'), the text binding will automatically update the text contents of the associated DOM element. That’s how changes to the view model automatically propagate to the view.

### Explicitly subscribing to observable-property changes

If you want to register your own subscriptions to be notified of changes to properties, all observable-properties expose two [Rx-Observables](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observable.md):

- *changing* notifies of changes of the property's value before the change
- *changed* notifies of changes of the property's value after the change

If for example you would want to monitor changes to the *personName* property, you would do it like this: 

{% highlight javascript %}
myViewModel.personName.changed.subscribe(function(newValue) {
    alert("The person's new name is " + newValue);
});
{% endhighlight %}

You can also terminate a subscription if you wish: first capture the return value as a variable, then you can call its dispose function, e.g.:

{% highlight javascript %}
var subscription = myViewModel.personName.changed.subscribe(function(newValue) { /* do stuff */ });
// ...then later...
subscription.dispose(); // I no longer want notifications
{% endhighlight %}
