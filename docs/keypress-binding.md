---
layout: docs
title: WebRx - The KeyPress-Binding
---
# The KeyPress-Binding

The keyPress binding allows you to associate a handler function or a [command](/docs/commands.html) with a single or multiple
key combinations. Whenever the user presses any of the specified key-combinations while the target element or any of its descendants
has the input focus, the keyPress-Binding will execute the specified handler.

One of the many use-cases for the keyPress-Binding is to associate hotkeys with [commands](/docs/commands.html).

## Example

```html
<div>
    <div data-bind="keyPress: { 'enter': method1, 'esc alt-q': command1 }">
		<div>
			<input type='text'/>
		</div>
    </div>
</div>
```
 
```html
<script type="text/javascript">
function ViewModel() {
	this.handlerType = wx.property();

    this.method1 = function() {
        this.handlerType("I'm a method");
    }

    this.command1 = wx.command(function() {
        this.handlerType("I'm a command");
    }, this);
}

wx.applyBindings(new ViewModel());
</script>
```

In this example the <kbd>Enter</kbd> key gets bound to the view-model's <code>method1</code> function
while either <kbd>Escape</kbd> or <kbd>Alt+Q</kbd> can be pressed to invoke <code>command1</code>.

<div class="panel panel-default" id="keypress-example1">
	<div class="panel-heading">
    	<h3 class="panel-title">Try it</h3>
  	</div>
	<div class="panel-body">
		<div>
			<div data-bind="keyPress: { 'enter': method1, 'esc alt-q': command1 }">
				<div>
					<input type='text'/>&nbsp;&nbsp;<b data-bind="text: handlerType"></b>
				</div>
			</div>
		</div>
	</div>
</div>
  
<script type="text/javascript">
    function ViewModel() {
		this.handlerType = wx.property();

        this.method1 = function() {
            this.handlerType("I'm a method");
        }

        this.command1 = wx.command(function() {
            this.handlerType("I'm a command");
        }, this);
    }

    wx.applyBindings(new ViewModel(), document.getElementById('keypress-example1'));
</script>

## Parameters

### Main parameter

You should pass a JavaScript object in which the property names correspond to one or more key combination and the values correspond to a handler. 

#### Key combinations

A key-combination consist of the following components which must be separated by a minus sign:

- An optional qualifier such as <kbd>Alt</kbd>, <kbd>Shift</kbd> or <kbd>Meta</kbd> (ctrl)
- A key identifier which can be:
	- A character such as <kbd>q</kbd> or <kbd>a</kbd>
	- A numeric keycode such as <code>13</code>
	- One of the following named keys: <code>backspace</code>, <code>tab</code>, <code>enter</code>, <code>esc</code>, 
	<code>space</code>, <code>pageup</code>, <code>pagedown</code>, <code>end</code>, <code>home</code>, 
	<code>left</code>, <code>up</code>, <code>right</code>, <code>down</code>, <code>insert</code>, <code>delete</code>

You may assign multiple key combinations to a handler by separating them with whitespace characters.

#### Handlers

- A function that will be invoked when the event fires. 

	**Note**: When invoking the function, the binding will adjust <code>this</code> to point to your view-model and pass the current [binding-context](/docs/binding-context.html) 
as first argument
- A [command](/docs/commands.html) that will be executed when one of the specified key-combinations is pressed
- An object with the following properties:
	- <code>command</code>: [command](/docs/commands.html) that will be executed when one of specified key-combinations is pressed.
	- <code>parameter</code>: The parameter to pass to the command's <code>execute</code> method


<a class="next-topic" href="/docs/event-binding.html">Next: The Event-Binding</a>