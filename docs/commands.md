---
layout: docs
title: WebRx - Commands
---
# Commands

Commands represent discrete actions that are taken in the UI - <code>Copy</code>, <code>Open</code>, and <code>Ok</code> are good examples of Commands. 
Usually these Commands are bound to an element that is built to handle Commands, like a Button or an Anchor.

Many Commands are invoked directly by the user, but some operations are also useful to model via Commands 
despite being primarily invoked progmatically. For example, many code paths involving periodically loading 
or refreshing resources (i.e. "LoadTweets") can be modeled well using Commands.

**Note:** For information on how to utilize commands in your views and bindings refer to the [command-binding](/docs/command-binding.html) documentation.

## Creating commands

The simplest form of a command is one that can always execute:

```javascript
var cmd = wx.command(function(x) {
	alert("Hello!");
});
```

To manually execute a command, invoke its <code>execute</code> method:

```javascript
cmd.execute();
```

### Commands that can only execute when certain conditions are met

Except for very simple cases, commands should not be allowed to execute in all situtations.
For example, an imaginary <code>copy</code> command would require an existing selection and a <code>paste</code> command
would require a non-empty clipboard.

```javascript
function ViewModel() {
    this.numberOfClicks = wx.property(0);

	this.fooCmd = wx.command(function() {
        alert("You did it!");
		}, wx.whenAny(this.numberOfClicks, function(numberOfClicks) { 
			return numberOfClicks >= 3;
	}), this);
}
```

In this example we have setup <code>fooCmd</code> to only be executable once the view-model's
<code>numberOfClicks</code> property reaches a value of 3 or higher. 

Once again we take advantage of WebRx's <code>whenAny</code> helper to implement this. <code>whenAny</code> takes 
any number of observable properties as input, subscribes to their <code>changed</code> observables
and returns an observable that can be directly passed as argument to <code>wx.command</code>.

The command will monitor the observable and adjust the command's <code>canExecute</code> status
depending on wether the latest value from the observable evaluates falsy or truthy.

## Commands and the <code>this</code> keyword

Javascript developers often have to deal with the problem of <code>this</code> being redefined by event-handlers or Ajax-Request Callbacks.
This becomes a problem when commands need to interact with or modify their enclosing view-model.
To avoid this, you can pass an additional argument to <code>wx.command</code> that will ensure that the command
will always execute with <code>this</code> being set to the specified value.

```javascript
function ViewModel() {
    this.fooCmd = wx.command(function() {
        alert(this.bar);
    }, this);

    this.bar = "hello";
}
```
If <code>fooCmd</code> would be triggered by a button-click and we hadn't passed <code>this</code> to <code>wx.command</code>,
the alert would display "undefined", because <code>this</code> would point to the windows object instead
our view-model.

<a class="next-topic" href="/docs/visible-binding.html">Next: The Visible-Binding</a>