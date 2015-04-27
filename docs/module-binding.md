---
layout: docs
title: WebRx - The Module-Binding
---
# The Module-Binding

The purpose of the module-binding is make the resources exported by one or more modules 
available to parts of the page.

When a module-binding gets applied to an element the binding will asynchronously load
all of the specified modules. The binding will then merge the exported resources of the loaded
modules into a composite module which will be made available to descendant elements. 

Module-Bindings can be nested. When module-bindings are nested, modules referenced in
child-scope inherit all of the module-exports of their parent scope. 

## Example 1: Parallel module-scopes

<div class="panel panel-default" id="module-example1">
	<div class="panel-body">
		<div data-bind="module: 'module1'">
			<hello></hello>
		</div>
		<div data-bind="module: 'module2'">
			<hello></hello>
			<app-hello></app-hello>
		</div>
	</div>
</div>
  
<script type="text/javascript">
wx.app.component('app-hello', {
    template: '<h3>Hello from Application Module</h3>'
});

wx.module("module1", function(m) { m.component('hello', {
    template: '<h3>Hello from Module 1</h3>'
})});

wx.module("module2", function(m) { m.component('hello', {
    template: '<h3>Hello from Module 2</h3>'
})});


wx.applyBindings(undefined, document.getElementById('module-example1'));
</script>


**Source code: View**

```html
<div data-bind="module: 'module1'">
	<hello></hello>
</div>

<div data-bind="module: 'module2'">
	<hello></hello>

	<!-- demonstrates fall-back to app-module -->
	<app-hello></app-hello>
</div>
```

**Source code: View model**

```javascript
wx.app.component('app-hello', {
    template: '<h3>Hello from Application Module</h3>'
});

wx.module("module1", function(m) { m.component('hello', {
    template: '<h3>Hello from Module 1</h3>'
})});

wx.module("module1", function(m) { m.component('hello', {
    template: '<h3>Hello from Module 2</h3>'
})});

wx.applyBindings();
```

Here we register a component of the same name <code>hello</code> with two different modules. By applying a module-binding
on the enclosing container element, we change how a reference to the <code>&lt;hello&gt;</code> component is handled.

## Example 2: Nested module-scopes

<div class="panel panel-default" id="module-example2">
	<div class="panel-body">
		<div data-bind="module: 'module1'">
			<div data-bind="module: 'module2'">
				<hello1></hello1>
				<hello2></hello2>
			</div>
		</div>
	</div>
</div>
  
<script type="text/javascript">
wx.module("module1", function(m) { m.component('hello1', {
    template: '<h3>Hello from Module 1</h3>'
})});

wx.module("module2", function(m) { m.component('hello2', {
    template: '<h3>Hello from Module 2</h3>'
})});

wx.applyBindings(undefined, document.getElementById('module-example2'));
</script>


**Source code: View**

```html
<div data-bind="module: 'module1'">
	<div data-bind="module: 'module2'">
		<hello1></hello1>
		<hello2></hello2>
	</div>
</div>
```

**Source code: View model**

```javascript
wx.module("module1", function(m) { m.component('hello1', {
    template: '<h3>Hello from Module 1</h3>'
})});

wx.module("module2", function(m) { m.component('hello2', {
    template: '<h3>Hello from Module 2</h3>'
})});

wx.applyBindings();
```

Even though component <code>hello1</code> has been defined in <code>module1</code> which is bound to 
the outer <code>div</code> element, we can use the component inside the inner <code>div</code> because child-scopes inherit the exports of their parent-scope(s).

Of course we could have achieved the same outcome by specifying multiple modules with the inner <code>div</code>'s module-binding:

```html
<div data-bind="module: 'module1 module2'">
	<hello1></hello1>
	<hello2></hello2>
</div>
```

## Parameters

### Main parameter

The binding sets the element's and its descendants module-scope the specified module(s). The parameter must be string containing
one or more module-names separated by a whitespace characters.

If this parameter is an observable value, the binding will update the element's module-scope whenever the value changes. 
If the parameter isn't observable, it will only set the element's module-scope once and will not update it again later.

<a class="next-topic" href="/docs/routing-overview.html">Next: Routing Architecture</a>
