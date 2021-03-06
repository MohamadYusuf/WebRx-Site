---
layout: docs
title: WebRx - The Command-Binding
---
{% include sample-warning.html %}
# The Command-Binding

The command-binding adds an event handler so that a [command](/docs/commands.html) will be invoked when the <code>click</code> event 
is raised by the associated DOM element. The binding also takes care of enabling and disabling the element depending on wether the command can currently execute or not.

This binding is most commonly used with elements like button and anchors, but actually works with any visible DOM element.

**Note 1**: When the command-binding is applied to an anchor <code>a</code> element, it will prevent the anchor's default action when clicked.

**Note 2**: Even though the command-binding is the primary way to invoke commands in WebRx, it is not the only one. The [event](/docs/event-binding.html)- 
and the [keypress](/docs/keypress-binding.html)-binding also support invoking commands. 

## Example 1

Each time you click the button, this will invoke incrementClickCounterCmd on the view model, which in turn changes the view model state, which causes the UI to update.

```html
You've clicked <span data-bind="text: numberOfClicks"></span> times
<button data-bind="command: incrementClickCounterCmd">Click me</button>
 ```

```html
<script type="text/javascript">
    function ViewModel() {
        this.numberOfClicks = wx.property(0);

        this.incrementClickCounterCmd = wx.command(function() {
            this.numberOfClicks(this.numberOfClicks() + 1);
        }, this);
    }

wx.applyBindings(new ViewModel());
</script>
```

<div class="panel panel-default" id="command-example1">
	<div class="panel-heading">
    	<h3 class="panel-title">Try it</h3>
  	</div>
	<div class="panel-body">
		<div>
			You've clicked <span data-bind="text: numberOfClicks"></span> times
			<button data-bind="command: incrementClickCounterCmd">Click me</button>
		</div>
	</div>
</div>
  
<script type="text/javascript">
function ViewModel() {
    this.numberOfClicks = wx.property(0);

    this.incrementClickCounterCmd = wx.command(function() {
        this.numberOfClicks(this.numberOfClicks() + 1);
    }, this);
}

wx.applyBindings(new ViewModel(), document.getElementById('command-example1'));
</script>

## Example 2

Okay, this was not really a compelling example for using the command-binding because
it could have been implemented using a simple click-event handler. Let's make things a bit more interesting.

In this example the second button will only unlock after the first button has been clicked
at least three times.

```html
You've clicked <span data-bind="text: numberOfClicks"></span> times
<button data-bind="command: incrementClickCounterCmd">Click me</button>
<button data-bind="command: secretCmd, text: !secretCmdCanExecute ? 'Locked' : 'Unlocked'"></button>
 ```

```javascript
function ViewModel() {
    this.numberOfClicks = wx.property(0);

    this.incrementClickCounterCmd = wx.command(function() {
        this.numberOfClicks(this.numberOfClicks() + 1);
    }, this);

	this.secretCmd = wx.command(function() {
        alert("You did it!");
		}, wx.whenAny(this.numberOfClicks, function(numberOfClicks) { 
			return numberOfClicks >= 3;
	}), this);

	this.secretCmdCanExecute = this.secretCmd.canExecuteObservable.toProperty();
}

wx.applyBindings(new ViewModel());
```

<div class="panel panel-default" id="command-example2">
	<div class="panel-heading">
    	<h3 class="panel-title">Try it</h3>
  	</div>
	<div class="panel-body">
		<div>
			You've clicked <span data-bind="text: numberOfClicks"></span> times
			<button data-bind="command: incrementClickCounterCmd">Click me</button>
			<button data-bind="command: secretCmd, text: !secretCmdCanExecute ? 'Locked' : 'Unlocked'"></button>
		</div>
	</div>
</div>
  
<script type="text/javascript">
function ViewModel() {
    this.numberOfClicks = wx.property(0);

    this.incrementClickCounterCmd = wx.command(function() {
        this.numberOfClicks(this.numberOfClicks() + 1);
    }, this);

	this.secretCmd = wx.command(function() {
        alert("You did it!");
		}, wx.whenAny(this.numberOfClicks, function(numberOfClicks) { 
			return numberOfClicks >= 3;
	}), this);

	this.secretCmdCanExecute = this.secretCmd.canExecuteObservable.toProperty();
}

wx.applyBindings(new ViewModel(), document.getElementById('command-example2'));
</script>

**Note**: You may have noticed that the second button once initially unlocked, will become locked again when clicked,
and unlock again after the alert gets dismissed. This is because by default commands
disable themselves while executing.

## Parameters

### Main parameter

The [command](/docs/commands.html) you want to bind to the element. 
Depending on wether the command can currently execute or not, the element will be enabled or disabled.
Clicking on the element will execute the command.

To supply parameters to the command, pass an object with the following properties:

- <code>command</code>: The [command](/docs/commands.html) you want to bind to the element
- <code>parameter</code>: An optional parameter that will be passed as first argument to the command's <code>execute</code> handler.
The parameter can also be an observable.

<a class="next-topic" href="/docs/keypress-binding.html">Next: The Keypress-Binding</a>