---
layout: docs
title: WebRx - The selectedValue-Binding
---
{% include sample-warning.html %}
# The selectedValue-Binding

The selectedValue binding links the value of the selected option of a <code>select</code> element, or the value of the checked
element of a group of radio-buttons (<code>input type=radio</code>) with a view-model property.

It is a two-way binding, so if you set the view-model property, the associated element will be selected (when bound to a <code>select</code> element)
or checked (when bound to a group of radio-buttons). If the user manually changes the selected option, the view-model property will be
set to the selected option's value. Likewise, if the user manually checks an element of a radio-group, the view-model property
will reflect the value of the checked radio-button.

## Using the selectedValue binding with a select element

<div class="panel panel-default" id="selectedValue-example1">
	<div class="panel-body">
		<select data-bind="foreach: items, selectedValue: @selection">
			<option data-bind="value: value, text: key"></option>
		</select>
		&nbsp;
		<span>You have selected <b data-bind="text: selection"></b></span>
	</div>
</div>

<script type="text/javascript">
var items = [{ key: "Homer Simpson", value: "homer" }, { key: "Bart Simpson", value: "bart" }, { key: "Apu Nahasapeemapetilon", value: "apu" }];
var model = { items: items, selection: wx.property("bart") };

wx.applyBindings(model, document.getElementById('selectedValue-example1'));
</script>

**Source code: View**

```html
<select data-bind="foreach: items, selectedValue: @selection">
	<option data-bind="value: value, text: key"></option>
</select>

<span>You have selected <b data-bind="text: selection"></b></span>
```

**Source code: View model**

```javascript
var items = [
	{ key: "Homer Simpson", value: "homer" },
	{ key: "Bart Simpson", value: "bart" },
	{ key: "Apu Nahasapeemapetilon", value: "apu" }];

wx.applyBindings({ items: items, selection: wx.property("bart") });
```

## Using the selectedValue binding with a group of radio-buttons

<div class="panel panel-default" id="selectedValue-example2">
	<div class="panel-body">
		<div data-bind="foreach: items">
			<input type="radio" name="radio-group-1" data-bind="value: value, selectedValue: $parent.@selection,
				attr: { id: 'radio-group-1 -' + $index }" />
			<label data-bind="text: key, attr: { for: 'radio-group-1 -' + $index }"></label>
			<br/>
		</div>
		<br/>
		<span>You have selected <b data-bind="text: selection"></b></span>
	</div>
</div>

<script type="text/javascript">
var items = [{ key: "Homer Simpson", value: "homer" }, { key: "Bart Simpson", value: "bart" }, { key: "Apu Nahasapeemapetilon", value: "apu" }];
var model = { items: items, selection: wx.property("bart") };

wx.applyBindings(model, document.getElementById('selectedValue-example2'));
</script>

**Source code: View**

```html
<div data-bind="foreach: items">
	<input type="radio" name="radio-group-1" data-bind="value: value, selectedValue: $parent.@selection,
		attr: { id: 'radio-group-1 -' + $index }" />
	<label data-bind="text: key, attr: { for: 'radio-group-1 -' + $index }"></label>
</div>

<span>You have selected <b data-bind="text: selection"></b></span>
```

**Source code: View model**

```javascript
var items = [
	{ key: "Homer Simpson", value: "homer" },
	{ key: "Bart Simpson", value: "bart" },
	{ key: "Apu Nahasapeemapetilon", value: "apu" }];

wx.applyBindings({ items: items, selection: wx.property("bart") });
```

## Parameters

### Main parameter

Pass the value that should be selected.

If this parameter is a [property reference](/docs/observable-properties.html#topic-propref) (denoted by the <code>@</code>-operator),
the binding will update the selection whenever the value changes and vice-versa.
If the parameter something else, it will only set the selection once and will not update it again later.

<a class="next-topic" href="/docs/expression-filters.html">Next: Expression Filters</a>
