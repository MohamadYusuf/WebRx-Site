---
layout: docs
title: WebRx - Observable Lists
---
{% include sample-warning.html %}
# Observable Lists

If you want to detect and respond to changes on one object, you'd use observable-properties. If you want to detect and respond to changes of a collection of things, use an observable-list. This is useful in many scenarios where you're displaying or editing multiple values and need repeated sections of UI to appear and disappear as items are added and removed.

#### Example

```javascript
var myObservableList = wx.list();    // Initially an empty array
myObservableList.push('Some value'); // Adds the value and notifies observers
```


### Prepopulating a list

If you want your list not to start empty, but to contain some initial items, pass those items as an array to the constructor. For example,

```javascript
// This observable list initially contains three objects
var anotherObservableList = wx.list([
    { name: "Bungle", type: "Bear" },
    { name: "George", type: "Hippo" },
    { name: "Zippy", type: "Unknown" }
]);
```


## Manipulating an observable-list

WebRx's observable list exposes a familiar set of functions for modifying the contents of the list and notifying listeners.

- <code>length</code>
- <code>get(index)</code>
- <code>set(index, item)</code>
- <code>add(item)</code>
- <code>clear()</code>
- <code>contains(item)</code>
- <code>remove(item)</code>
- <code>indexOf(item)</code>
- <code>insert(index, item)</code>
- <code>removeAt(index)</code>
- <code>isEmpty</code>
- <code>addRange(collection)</code>
- <code>insertRange(index, collection)</code>
- <code>move(oldIndex, newIndex)</code>
- <code>removeAll(items)</code>
- <code>removeRange(index, count)</code>
- <code>sort(comparison: (a, b) => number)</code>
- <code>forEach(callbackfn: (value, index, array) => void, thisArg?)</code>
- <code>map(callbackfn: (value, index, array) => U, thisArg?)</code>
- <code>filter(callbackfn: (value, index, array) => boolean, thisArg?)</code>
- <code>every(callbackfn: (value, index, array) => boolean, thisArg?)</code>
- <code>some(callbackfn: (value, index, array) => boolean, thisArg?)</code>
- <code>reset()</code>
- <code>toArray()</code>


## Subscribing to Changes

**Note:** To display the contents of an observable-list in your UI you don't have to subscribe to any observables exposed by a list because the [forEach-Binding](/docs/forEach-binding.html) takes care of that for you. 

WebRx's observable-list provides several useful Observables that can be subscribed to in order to inform you about changes in the list, as well as providing you with notifications that happen before a list is about to change:

- <code>itemsAdded</code> - signals when items are added
- <code>itemsRemoved</code> - signals when items are removed
- <code>itemsMoved</code> - signals when items are moved
- <code>beforeItemsAdded</code> - signals when items are about to be added
- <code>beforeItemsRemoved</code> - signals when items are about to be removed
- <code>beforeItemsMoved</code> - signals when items are about to be moved
- <code>countChanged</code> - signals when the number of items in the list changes for any reason
- <code>countChanging</code> - signals when the number of items in the list is about to change for any reason
- <code>listChanged</code> - signals all changes
- <code>listChanging</code> - signals all changes before they happen.
- <code>shouldReset</code> - signals that the observer should reread the entire list, as it has changed significantly

### Semantics of Reset

One thing that is particularly important to understand is the meaning of the <code>shouldReset</code> Observable. The meaning of this event is, *"This list has changed drastically, you should reread the contents"*. Many people conflate <code>reset</code> and <code>clear</code>, thinking that this means the list is now empty.

This is important, because if you only subscribe to <code>itemsAdded</code> and <code>itemsRemoved</code>, you will not be correctly tracking every item in the list. Lists will detect this scenario and attempt to warn you about it.

## Delaying and/or suppressing change notifications

Normally, an observable-list notifies its subscribers immediately, as soon as it's changed. But if an list is changed repeatedly or triggers expensive updates, you may get better performance by limiting or delaying change notifications. 

This is accomplished calling the list's <code>suppressChangeNotifications</code> method which returns a disposable. The list will resume sending change notifications, once the disposable is disposed.

```javascript
var list = wx.list();    						// Initially an empty array
list.push('Some value'); 						// Adds the value and notifies observers
var disp = list.suppressChangeNotifications();
list.push('Some other value');					// no notifications get send now
disp.dispose();								// list resumes sending change notifications
```

## Projections

A projected observable list is a read-only view of of a source observable list that is automatically kept in sync with its source. 
What makes projections useful is that list-projections can apply filtering, re-ordering and mapping operations on the fly.

#### Properties of a projection

- A projection stays always in sync with the source list it was created from.
- A projection can exclude items of its source by applying a filter function
- A projection can be arbitrarily re-ordered
- A projection can contain different item types than its source by applying a mapping function

### Creating a filtered projection

A projection of an observable list is created through the list's <code>project</code> instance method.

```javascript
var list = wx.list(["bart", "homer", "apu"]);

var iLikeRs = list.project(function(x) {
	return x.indexOf("r") !== -1;
});
```
Here we've created a projection of <code>list</code> that only likes names containing an "r". Converting <code>iLikeRs</code> to an array yields:

```javascript
iLikeRs.toArray()
["bart", "homer"]
```
Let's add another name to the source list and see what happens to the projection:

```javascript
list.push("marge");

iLikeRs.toArray()
["bart", "homer", "marge"]
```
As expected the projection has picked the new entry added to the source.

### Creating a re-ordered projection 

In addition to filtering its source, a projection can optionally be re-ordered:

```javascript
var list = wx.list([1, 2, 3]);

var reverse = list.project(
	null,	// no filter
	function(a, b) {
		return b - a;	// reverse ordering
	}
);

projection.toArray()
[3, 2, 1]
```
Now the order is reversed.

### Creating a mapping projection

Sometimes it might be desirable to work with a projection that contains list items
that differ from the items found in the source list. This scenario is also supported:

```javascript
var list = wx.list(["bart", "homer", "marge"]);

var iDontLikeRs = list.project(
	null,	// no filter
	null,	// no-orderer
	function(x) {
		return { 
			name: x.replace("r", "") 
		};
	}
);

iDontLikeRs.toArray()
[{ name: "bat" }, { name: "home" }, { name: "mage" }]
```
We've erased the "r" character from all names and have converted the result to an object.

### Manually triggering a refresh

Even though a projection tracks all changes to its source observable list, it is sometimes
necessary to manually trigger a refresh on a projection. An example for this would be a filter function that behaves
differently depending on another condition.

For this reason, the <code>project</code> accepts a fourth argument that can be any Rx.Observable. Whenever
that observable produces a value, the projection will be re-filtered, re-ordered and optionally re-transformed.

### Live Example

The <code>planetsToShow</code> projection used in this example filters the <code>planets</code> list to only include planets 
of a user selected category.

<p data-height="500" data-theme-id="0" data-slug-hash="xGKmKo" data-default-tab="result" data-user="oliverw" class='codepen'>See the Pen <a href='http://codepen.io/oliverw/pen/xGKmKo/'>WebRx - Animated collections example</a> by Oliver Weichhold (<a href='http://codepen.io/oliverw'>@oliverw</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

<a class="next-topic" href="/docs/commands.html">Next: Commands</a>

<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
