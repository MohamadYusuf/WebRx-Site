---
layout: docs
title: WebRx - The Module-Binding
---
# The Module-Binding

The purpose of the module-binding is to establish a module-scope over parts of a page or an entire page.

After a module-scope has been established, all resources referenced by descendant elements of the element
the module-binding has been applied to will default to the specified module. If the resource cannot be found, 
the application-module will be consulted.

## Example

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
wx.app.registerComponent('app-hello', {
    template: '<h3>Hello from Application Module</h3>'
});

wx.module("module1").registerComponent('hello', {
    template: '<h3>Hello from Module 1</h3>'
});

wx.module("module2").registerComponent('hello', {
    template: '<h3>Hello from Module 2</h3>'
});

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
wx.app.registerComponent('app-hello', {
    template: '<h3>Hello from Application Module</h3>'
});

wx.module("module1").component('hello', {
    template: '<h3>Hello from Module 1</h3>'
});

wx.module("module2").component('hello', {
    template: '<h3>Hello from Module 2</h3>'
});

wx.applyBindings();
```

Here we register a component of the same name <code>hello</code> with two different modules. By applying a module-binding
on the enclosing container element, we change how a reference to the <code>&lt;hello&gt;</code> component is handled.

**Note:** The primary purpose of the module-binding is of course not the possibility to override components
defined by other modules, but to allow your team to work on different parts of your page or site
without having to qualify each and every access to a module-scoped-resource with a module name.

## Parameters

### Main parameter

The binding sets the element's module-scope the specified module. The value can be either a module name or a module-instance.

If this parameter is an observable value, the binding will update the element's module-scope whenever the value changes. 
If the parameter isn't observable, it will only set the element's module-scope once and will not update it again later.

<a class="next-topic" href="/docs/routing-overview.html#start">Next: Routing Architecture</a>