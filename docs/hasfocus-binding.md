---
layout: docs
title: WebRx - The HasFocus-Binding
---
{% include sample-warning.html %}
# The HasFocus-Binding

The hasFocus binding links a DOM element's focus state with a viewmodel property. 

It is a two-way binding, so if you set the viewmodel property to true or false, the associated element will become focused or unfocused.
If the user manually focuses or unfocuses the associated element, the view-model property will be set to true or false accordingly.

This is useful if you're building sophisticated forms in which editable elements appear dynamically, 
and you would like to control where the user should start typing, or respond to the location of the caret.

## Example 1: The basics

This example simply displays a message if the textbox currently has focus, and uses a button to show that you can trigger focus programmatically.

<div class="panel panel-default" id="hasfocus-example1">
	<div class="panel-body">
		<input data-bind="hasFocus: @isSelected" />
		<button data-bind="command: setIsSelectedCmd">Focus programmatically</button>
		<span data-bind="visible: isSelected">The textbox has focus</span>
	</div>
</div>
  
<script type="text/javascript">
function ViewModel() {
    this.isSelected = wx.property(false);

    this.setIsSelectedCmd = wx.command(function() { 
		this.isSelected(true);
	}, this);
}

wx.applyBindings(new ViewModel(), document.getElementById('hasfocus-example1'));
</script>

**Source code: View**

```html
<input data-bind="hasFocus: @isSelected" />
<button data-bind="click: setIsSelected">Focus programmatically</button>
<span data-bind="visible: isSelected">The textbox has focus</span>
```

**Source code: View model**

```javascript
function ViewModel() {
    this.isSelected = wx.property(false);

    this.setIsSelectedCmd = wx.command(function() { 
		this.isSelected(true);
	}, this);
}

wx.applyBindings(new ViewModel());
```

## Example 2: Click-to-edit

Because the hasFocus binding works in both directions (setting the associated value focuses or unfocuses the element;
focusing or unfocusing the element sets the associated value), it's a convenient way to toggle an "edit" mode.
In this example, the UI displays either a *span* or an *input* element depending on the model's editing property.
Unfocusing the *input* element sets editing to false, so the UI switches out of "edit" mode.

<div class="panel panel-default" id="hasfocus-example2">
	<div class="panel-body">
		<p>
			Name: 
			<b data-bind="visible: !editing, text: name, command: editCmd">&nbsp;</b>
			<input data-bind="visible: editing, value: @name, hasFocus: @editing" style="display: none;" />
		</p>
		<p><em>Click the name to edit it; click elsewhere to apply changes.</em></p>
	</div>
</div>
  
<script type="text/javascript">
function PersonViewModel(name) {
    // Data
    this.name = wx.property(name);
    this.editing = wx.property(false);
         
    // Behaviors
    this.editCmd = wx.command(function() { 
		this.editing(true);
	}, this);
}
 
wx.applyBindings(new PersonViewModel("Bart Simpson"), document.getElementById('hasfocus-example2'));
</script>

**Source code: View**

```html
<p>
	Name: 
	<b data-bind="visible: !editing, text: name, command: editCmd">&nbsp;</b>
	<input data-bind="visible: editing, value: @name, hasFocus: @editing" style="display: none;" />
</p>
<p><em>Click the name to edit it; click elsewhere to apply changes.</em></p>
```

**Source code: View model**

```javascript
function PersonViewModel(name) {
    // Data
    this.name = wx.property(name);
    this.editing = wx.property(false);
         
    // Behaviors
    this.editCmd = wx.command(function() { 
		this.editing(true);
	}, this);
}
 
wx.applyBindings(new PersonViewModel("Bart Simpson"));
```

## Parameters

### Main parameter

Pass true (or some value that evaluates as true) to focus the associated element. 
Otherwise, the associated element will be unfocused.

If this parameter is a [property reference](/docs/observable-properties.html#topic-propref) (denoted by the @-operator),
the binding will update the element's focus state whenever the value changes and vice-versa.
If the parameter something else, it will only set the element's focus state once and will not update it again later.

<a class="next-topic" href="/docs/checked-binding.html#start">Next: The Checked-Binding</a>