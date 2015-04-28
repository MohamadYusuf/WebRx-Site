---
layout: docs
title: WebRx - The Event-Binding
---
# The Event-Binding

The event binding allows you to associate a handler function or a [command](/docs/commands.html) with events fired 
by a DOM-Element. Whenever the specified event fires, the binding will execute the associated handler.

This can be used to bind to any event, such as keypress, mouseover or mouseout.

## Example

```html
<div>
    <div data-bind="event: { mouseover: enableDetails, mouseout: disableDetails }">
        Mouse over me
    </div>
    <div data-bind="visible: detailsEnabled">
        Details
    </div>
</div>
```
 
```html
<script type="text/javascript">
    var viewModel = {
        detailsEnabled: wx.property(false),
        enableDetails: function() {
            this.detailsEnabled(true);
        },
        disableDetails: function() {
            this.detailsEnabled(false);
        }
    };
    wx.applyBindings(viewModel);
</script>
```

Now, moving your mouse pointer on or off of the first element will invoke methods on the view model to 
toggle the detailsEnabled property. The second element reacts to changes to the value of detailsEnabled 
by either showing or hiding itself.

<div class="panel panel-default" id="event-example1">
	<div class="panel-heading">
    	<h3 class="panel-title">Try it</h3>
  	</div>
	<div class="panel-body">
		<div>
			<div data-bind="event: { mouseover: enableDetails, mouseout: disableDetails }">
				Mouse over me
			</div>
			<div style="display: none;" data-bind="visible: detailsEnabled">
				<br/>
				<h2>Lo and behold!</h2>
			</div>
		</div>
	</div>
</div>
  
<script type="text/javascript">
    var viewModel = {
        detailsEnabled: wx.property(false),
        enableDetails: function() {
            this.detailsEnabled(true);
        },
        disableDetails: function() {
            this.detailsEnabled(false);
        }
    };
    wx.applyBindings(viewModel, document.getElementById('event-example1'));
</script>

## Parameters

### Main parameter

You should pass a JavaScript object in which the property names correspond to event names, and 
the values correspond to either: 

- A function that will be invoked when the event fires. 

	**Note**: When invoking the function, the binding will adjust <code>this</code> to point to your view-model and pass the current [binding-context](/docs/binding-context.html) 
as first argument and the event object as second argument.
- A [command](/docs/commands.html) that will be executed when the corresponding event fires
- An object with the following properties:
	- <code>command</code>: [command](/docs/commands.html) that will be executed when the corresponding event fires.
	- <code>parameter</code>: The parameter to pass to the command's <code>execute</code> method


<a class="next-topic" href="/docs/enabled-binding.html">Next: The Enabled-Binding</a>
