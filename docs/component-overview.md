---
layout: docs
title: WebRx - Component Overview
---
# Component Overview

Components are a powerful, clean way of organizing your UI code into self-contained, reusable chunks. They:

- …can represent individual controls/widgets, or entire sections of your application
- …contain their own view, and usually (but optionally) their own viewmodel
- …can either be preloaded, or loaded asynchronously (on demand) via AMD or other module systems
- …can receive parameters, and optionally write back changes to them or invoke callbacks
- …can be composed together (nested) or inherited from other components
- …can easily be packaged for reuse across projects
- …let you define your own conventions/logic for configuration and loading

This pattern is beneficial for large applications, because it simplifies development through 
clear organization and encapsulation, and helps to improve runtime performance by incrementally 
loading your application code and templates as needed.

Custom elements are an optional but convenient syntax for consuming components. Instead of needing 
placeholder &lt;div&gt;s into which components are injected with bindings, you can use more self-descriptive 
markup with custom element names. 

## Example: A like/dislike widget

To get started, you can register a component using wx.components.register (technically, registration is optional, 
but it’s the easiest way to get started). A component definition specifies a view-model and template. For example:

```javascript
wx.app.component('like-widget', {
    viewModel: function(params) {
        // Data: value is either null, 'like', or 'dislike'
        this.chosenValue = params.value;
         
        // Behaviors
        this.likeCmd = wx.command(function() { this.chosenValue('like'); }, this);
        this.dislikeCmd = wx.command(function() { this.chosenValue('dislike'); }, this);
    },
    template:
        '<div class="like-or-dislike" data-bind="visible: !chosenValue">\
            <button data-bind="command: likeCmd">Like it</button>\
            <button data-bind="command: dislikeCmd">Dislike it</button>\
        </div>\
        <div class="result" data-bind="visible: chosenValue">\
            You <strong data-bind="text: chosenValue"></strong> it\
        </div>'
});

```

Normally, you’d load the view model and template from external files instead of declaring them inline like this. We’ll get to that later.

Now, to use this component, you can reference it from any other view in your application, either using the 
component binding or using a custom element. Here’s a live example that uses it as a custom element:

<div class="panel panel-default" id="component-example1">
	<div class="panel-body">
		<ul data-bind="foreach: products">
			<li style="list-style: none" class="product">
				<strong data-bind="text: name"></strong>
				<like-widget params="value: @userRating"></like-widget>
			</li>
		</ul>
	</div>
</div>
  
<script type="text/javascript">
wx.app.component('like-widget', {
    viewModel: function(params) {
        // Data: value is either null, 'like', or 'dislike'
        this.chosenValue = params.value;
         
        // Behaviors
        this.likeCmd = wx.command(function() { this.chosenValue('like'); }, this);
        this.dislikeCmd = wx.command(function() { this.chosenValue('dislike'); }, this);
    },
    template:
        '<div class="like-or-dislike" data-bind="visible: !chosenValue">\
            <button data-bind="command: likeCmd">Like it</button>\
            <button data-bind="command: dislikeCmd">Dislike it</button>\
        </div>\
        <div class="result" data-bind="visible: chosenValue">\
            You <strong data-bind="text: chosenValue"></strong> it\
        </div>'
});

function Product(name, rating) {
    this.name = name;
    this.userRating = wx.property(rating || null);
}
 
function MyViewModel() {
    this.products = [
        new Product('Garlic bread'),
        new Product('Pain au chocolat'),
        new Product('Seagull spaghetti', 'like') // This one was already 'liked'
    ];
}

wx.applyBindings(new MyViewModel(), document.getElementById('component-example1'));
</script>


**Source code: View**

```html
<ul data-bind="foreach: products">
    <li class="product">
        <strong data-bind="text: name"></strong>
        <like-widget params="value: @userRating"></like-widget>
    </li>
</ul>
```

**Source code: View model**

```javascript
function Product(name, rating) {
    this.name = name;
    this.userRating = wx.property(rating || null);
}
 
function MyViewModel() {
    this.products = [
        new Product('Garlic bread'),
        new Product('Pain au chocolat'),
        new Product('Seagull spaghetti', 'like') // This one was already 'liked'
    ];
}
 
wx.applyBindings(new MyViewModel());
```

In this example, the component both displays and edits an property property called userRating on the Product view model class.

## Example: Loading the like/dislike widget from external files, on demand

In most applications, you’ll want to keep component view models and templates in external files. 
If you configure WebRx to fetch them via an AMD module loader such as [require.js](http://requirejs.org/), then they 
can either be preloaded (possibly bundled/minified), or incrementally loaded as needed.

Here’s an example configuration:

```javascript
wx.app.component('like-or-dislike', {
    viewModel: { require: 'files/component-like-widget' },
    template: { require: 'text!files/component-like-widget.html' }
});
```

### Requirements

For this to work, the files files/component-like-widget.js and files/component-like-widget.html 
need to exist. Check them out (and view source on the .html one) - as you’ll see, this is 
cleaner and more convenient that including the code inline in the definition.

Also, you need to have referenced a suitable module loader library (such as require.js) or 
implemented a custom component loader that knows how to grab your files.

### Using the component

Now like-or-dislike can be consumed in the same way as before, using either a component binding or a custom element:

**Source code: View**

```html
<ul data-bind="foreach: products">
    <li class="product">
        <strong data-bind="text: name"></strong>
        <like-or-dislike params="value: userRating"></like-or-dislike>
    </li>
</ul>
<button data-bind="click: addProduct">Add a product</button>
```

**Source code: View model**

```javascript
function Product(name, rating) {
    this.name = name;
    this.userRating = wx.property(rating || null);
}
 
function MyViewModel() {
    this.products = wx.list(); // Start empty
}
 
MyViewModel.prototype.addProduct = function() {
    var name = 'Product ' + (this.products().length + 1);
    this.products.push(new Product(name));
};
 
wx.applyBindings(new MyViewModel());
```

If you open your browser developer tools’ Network inspector before your first click on Add product, 
you’ll see that the component’s .js/.html files are fetched on demand when first required, and thereafter retained for reuse.