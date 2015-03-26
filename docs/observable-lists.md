---
layout: docs
title: WebRx - Observable Properties
---
{% include sample-warning.html %}
# Observable Lists

If you want to detect and respond to changes on one object, you’d use observable-properties. If you want to detect and respond to changes of a collection of things, use an observable-list. This is useful in many scenarios where you’re displaying or editing multiple values and need repeated sections of UI to appear and disappear as items are added and removed.

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

- length
- get(index)
- set(index, item)
- add(item)
- clear()
- contains(item)
- remove(item)
- indexOf(item)
- insert(index, item)
- removeAt(index)
- isEmpty
- addRange(collection)
- insertRange(index, collection)
- move(oldIndex, newIndex)
- removeAll(items)
- removeRange(index, count)
- sort(comparison: (a, b) => number)
- forEach(callbackfn: (value, index, array) => void, thisArg?)
- map(callbackfn: (value, index, array) => U, thisArg?)
- filter(callbackfn: (value, index, array) => boolean, thisArg?)
- every(callbackfn: (value, index, array) => boolean, thisArg?)
- some(callbackfn: (value, index, array) => boolean, thisArg?)
- reset()
- toArray()


## Subscribing to Changes

**Note:** To display the contents of an observable-list in your UI you don't have to subscribe to any observables exposed by a list because the [forEach-Binding](/docs/forEach-binding.html#start) takes care of that for you. 

WebRx's observable-list provides several useful Observables that can be subscribed to in order to inform you about changes in the list, as well as providing you with notifications that happen before a list is about to change:

- **itemsAdded** - signals when items are added
- **itemsRemoved** - signals when items are removed
- **itemsMoved** - signals when items are moved
- **beforeItemsAdded** - signals when items are about to be added
- **beforeItemsRemoved** - signals when items are about to be removed
- **beforeItemsMoved** - signals when items are about to be moved
- **countChanged** - signals when the number of items in the list changes for any reason
- **countChanging** - signals when the number of items in the list is about to change for any reason
- **listChanged** - signals all changes
- **listChanging** - signals all changes before they happen.
- **shouldReset** - signals that the observer should reread the entire list, as it has changed significantly

### Semantics of Reset

One thing that is particularly important to understand is the meaning of the *shouldReset* Observable. The meaning of this event is, *"This list has changed drastically, you should reread the contents"*. Many people conflate *reset* and *clear*, thinking that this means the list is now empty.

This is important, because if you only subscribe to *itemsAdded* and *itemsRemoved*, you will not be correctly tracking every item in the list. Lists will detect this scenario and attempt to warn you about it.

## Delaying and/or suppressing change notifications

Normally, an observable-list notifies its subscribers immediately, as soon as it’s changed. But if an list is changed repeatedly or triggers expensive updates, you may get better performance by limiting or delaying change notifications. 

This is accomplished calling the list's *suppressChangeNotifications* method which returns a disposable. The list will resume sending change notifications, once the disposable is disposed.

```javascript
var list = wx.list();    						// Initially an empty array
list.push('Some value'); 						// Adds the value and notifies observers
var disp = list.suppressChangeNotifications();
list.push('Some other value');					// no notifications get send now
disp.dispose();								// list resumes sending change notifications
```


## Live Example

<iframe class="hidden-xs" width="100%" height="300" src="http://jsfiddle.net/oliverw/z51a6bsg/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>