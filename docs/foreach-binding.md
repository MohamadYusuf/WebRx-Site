---
layout: docs
title: WebRx - The Hidden-Binding
---
## The Foreach-Binding

### Purpose

The foreach binding duplicates a section of markup for each entry in a collection, and binds each copy of that markup to the corresponding array item. This is especially useful for rendering lists or tables.

Assuming your collection is an [observable list](/docs/observable-lists.html#start), whenever you later add, remove, or re-order array entries, the binding will efficiently update the UI to match - inserting or removing more copies of the markup, or re-ordering existing DOM elements, without affecting any other DOM elements. This is far faster than regenerating the entire foreach output after each array change.

Of course, you can arbitrarily nest any number of foreach bindings along with other control-flow bindings such as if and with.

#### Example 1: Iterating over an array

This example uses foreach to produce a read-only table with a row for each array entry.

```html
<table>
    <thead>
        <tr><th>First name</th><th>Last name</th></tr>
    </thead>
    <tbody data-bind="foreach: people">
        <tr>
            <td data-bind="text: firstName"></td>
            <td data-bind="text: lastName"></td>
        </tr>
    </tbody>
</table>
```

```html
<script type="text/javascript">
    wx.applyBindings({
        people: [
            { firstName: 'Bert', lastName: 'Bertington' },
            { firstName: 'Charles', lastName: 'Charlesforth' },
            { firstName: 'Denise', lastName: 'Dentiste' }
        ]
    });
</script>
```

#### Example 2: Live example with add/remove

The following example shows that, if your array is observable, then the UI will be kept in sync with changes to that array.

<div class="panel panel-default" id="foreach-example">
	<div class="panel-heading">
    	<h3 class="panel-title">People</h3>
  	</div>
	<div class="panel-body">
		<ul data-bind="foreach: people">
		    <li>
		        Name at position <span data-bind="text: $index"> </span>:
		        <span data-bind="text: name"> </span>
		        <a href="#" data-bind="command: { command: $parent.removePersonCmd, parameter: $data }">Remove</a>
		    </li>
		</ul>
		<button data-bind="command: addPersonCmd">Add</button>
	</div>
</div>

  
<script type="text/javascript">
function AppViewModel() {
    var self = this;
 
    self.people = wx.list([
        { name: 'Bert' },
        { name: 'Charles' },
        { name: 'Denise' }
    ]);
 
    self.addPersonCmd = wx.command(function() {
        self.people.push({ name: "New at " + new Date() });
    });
 
    self.removePersonCmd = wx.command(function(parameter) {
        self.people.remove(parameter);
    });
}
 
wx.applyBindings(new AppViewModel(), document.getElementById('foreach-example'));
</script>


**Source code: View**

```html
<h4>People</h4>
<ul data-bind="foreach: people">
    <li>
        Name at position <span data-bind="text: $index"> </span>:
        <span data-bind="text: name"> </span>
        <a href="#" data-bind="command: { command: $parent.removePersonCmd, parameter: $data }">Remove</a>
    </li>
</ul>
<button data-bind="command: addPersonCmd">Add</button>
```

**Source code: View model**

```javascript
function AppViewModel() {
    var self = this;
 
    self.people = wx.list([
        { name: 'Bert' },
        { name: 'Charles' },
        { name: 'Denise' }
    ]);
 
    self.addPersonCmd = wx.command(function() {
        self.people.push({ name: "New at " + new Date() });
    });
 
    self.removePersonCmd = wx.command(function(parameter) {
        self.people.remove(parameter);
    });
}
 
wx.applyBindings(new AppViewModel());
```

### Parameters

#### Main parameter

Pass the collection that you wish to iterate over. The binding will output a section of markup for each entry.

Alternatively, pass a JavaScript object literal with a property called data which is the collection you wish to iterate over. The object literal may also have other properties, such as afterAdd or includeDestroyed — see below for details of these extra options and examples of their use.

If the collection you supply is an [observable list](/docs/observable-lists.html#start), the foreach binding will respond to any future changes in the lists’s contents by adding or removing corresponding sections of markup in the DOM.

### Referring to each array entry using $data

As shown in the above examples, bindings within the foreach block can refer to properties on the array entries. For example, Example 1 referenced the firstName and lastName properties on each array entry.

But what if you want to refer to the array entry itself (not just one of its properties)? In that case, you can use the special context property $data. Within a foreach block, it means “the current item”. For example,

```html
<ul data-bind="foreach: months">
    <li>
        The current item is: <b data-bind="text: $data"></b>
    </li>
</ul>
```

```html
<script type="text/javascript">
    wx.applyBindings({
        months: [ 'Jan', 'Feb', 'Mar', 'etc' ]
    });
</script>
```

If you wanted, you could use $data as a prefix when referencing properties on each entry. For example, you could rewrite part of Example 1 as follows:

```html
<td data-bind="text: $data.firstName"></td>
```

… but you don’t have to, because firstName will be evaluated within the context of $data by default anyway.

### Using $index, $parent, and other context properties

As you can see from Example 2 above, it’s possible to use $index to refer to the zero-based index of the current array item. $index is an observable and is updated whenever the index of the item changes (e.g., if items are added to or removed from the array).

Similarly, you can use $parent to refer to data from outside the foreach, e.g.:

```html
<h1 data-bind="text: blogPostTitle"></h1>
<ul data-bind="foreach: likes">
    <li>
        <b data-bind="text: name"></b> likes the blog post <b data-bind="text: $parent.blogPostTitle"></b>
    </li>
</ul>
```

For more information about $index and other context properties such as $parent, see documentation for binding context properties.

### How array changes are detected and handled

- When you add array entries, foreach will render new copies of your template and insert them into the existing DOM
- When you delete array entries, foreach will simply remove the corresponding DOM elements
- When you reorder array entries (retaining the same object instances), foreach will just move the corresponding DOM elements into their new position

### Post-processing or animating the generated DOM elements

If you need to run some further custom logic on the generated DOM elements, you can use any of the afterRender/afterAdd/beforeRemove/beforeMove/afterMove callbacks described below.

**Note:** These callbacks are only intended for triggering animations related to changes in a list. If your goal is actually to attach other behaviors to new DOM elements when they have been added (e.g., event handlers, or to activate third-party UI controls), then your work will be much easier if you implement that new behavior as a custom binding instead, because then you can use that behavior anywhere, independently of the foreach binding.

Here’s a trivial example that uses *afterAdd* to apply the classic “yellow fade” effect to newly-added items. It requires the jQuery Color plugin to enable animation of background colors.

```html
<ul data-bind="foreach: { data: myItems, afterAdd: yellowFadeIn }">
    <li data-bind="text: $data"></li>
</ul>
 
<button data-bind="click: addItem">Add</button>
```
 
```html
<script type="text/javascript">
    wx.applyBindings({
        myItems: wx.list([ 'A', 'B', 'C' ]),
        yellowFadeIn: function(element, index, data) {
            $(element).filter("li")
                      .animate({ backgroundColor: 'yellow' }, 200)
                      .animate({ backgroundColor: 'white' }, 800);
        },
        addItem: function() { this.myItems.push('New item'); }
    });
</script>
```

#### Full details:

- **afterRender** — is invoked each time the foreach block is duplicated and inserted into the document, both when foreach first initializes, and when new entries are added to the associated array later. The binding will supply the following parameters to your callback:
	- An array of the inserted DOM elements
	- The data item against which they are being bound

- **afterAdd** — is like afterRender, except it is invoked only when new entries are added to your array (and not when foreach first iterates over your array’s initial contents). A common use for afterAdd is to call a method such as jQuery’s $(domNode).fadeIn() so that you get animated transitions whenever items are added. The binding will supply the following parameters to your callback:
	- A DOM node being added to the document
	- The index of the added array element
	- The added array element

- **beforeRemove** — is invoked when an array item has been removed, but before the corresponding DOM nodes have been removed. If you specify a beforeRemove callback, then it becomes your responsibility to remove the DOM nodes. The obvious use case here is calling something like jQuery’s $(domNode).fadeOut() to animate the removal of the corresponding DOM nodes — in this case, The binding cannot know how soon it is allowed to physically remove the DOM nodes (who knows how long your animation will take?), so it is up to you to remove them. The binding will supply the following parameters to your callback:
	- A DOM node that you should remove
	- The index of the removed array element
	- The removed array element

- **beforeMove** — is invoked when an array item has changed position in the array, but before the corresponding DOM nodes have been moved. Note that beforeMove applies to all array elements whose indexes have changed, so if you insert a new item at the beginning of an array, then the callback (if specified) will fire for all other elements, since their index position has increased by one. You could use beforeMove to store the original screen coordinates of the affected elements so that you can animate their movements in the afterMove callback. The binding will supply the following parameters to your callback:
	- A DOM node that may be about to move
	- The index of the moved array element
	- The moved array element

- **afterMove** — is invoked after an array item has changed position in the array, and after foreach has updated the DOM to match. Note that afterMove applies to all array elements whose indexes have changed, so if you insert a new item at the beginning of an array, then the callback (if specified) will fire for all other elements, since their index position has increased by one. The binding will supply the following parameters to your callback:
	- A DOM node that may have moved
	- The index of the moved array element
	- The moved array element
