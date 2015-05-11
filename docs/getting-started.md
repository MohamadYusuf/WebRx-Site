---
layout: docs
title: WebRx - Getting Started
---
# Getting Started

Welcome to WebRx! This tutorial will take you through creating a simple application and briefly explain its main concepts. We assume you are familiar with JavaScript, HTML, and CSS. 

To get a quick overview, we recommend you skip down to the section titled [Setting Up The HTML Page](#topic-setting-up-html) so you can see how to use WebRx straight away. 

Then, when you are ready to actually build something, come back and read about [Setting Up a Project and installing WebRx](#topic-setting-up).

## <a id="topic-setting-up"></a>Setting Up a Project and installing WebRx

This tutorial assumes that you've already created a project skeleton in your favorite IDE or Code-Editor. Let's continue with installing the WebRx Framework. 

Depending on the type of project you are working on, there are multiple ways to install WebRx.

### NPM Installation

```bash
npm install webrx
```

WebRx and its dependencies will be installed to the following locations:

- WebRx: <code>&lt;project-folder&gt;/node_modules/webrx/dist</code>
- RxJS: <code>&lt;project-folder&gt;/node_modules/rx/dist</code> 

### Bower Installation

```bash
bower install WebRx
```

WebRx and its dependencies will be installed to the following locations:

- WebRx: <code>&lt;project-folder&gt;/bower_modules/webrx/dist</code>
- RxJS: <code>&lt;project-folder&gt;/bower_modules/rx/dist</code> 

### NuGet Installation

```bash
PM> Install-Package WebRx
```

WebRx and its dependencies will be installed to the following locations:

- WebRx: <code>&lt;project-folder&gt;\content\Scripts</code>
- RxJS: <code>&lt;project-folder&gt;\content\Scripts</code> 

**Note:** This should be the prefered installation method for developers working with Microsoft Visual Studio.

### Manual Installation

If you prefer to work without a package-mananger you can download the latest
WebRx Distribution Archive from [here](/downloads/web.rx.zip).

### Typescript

WebRx is written in [Typescript](http://typescriptlang.org) and as such ships with a
complete Typescript Definition File <code>web.rx.d.ts</code> which gets installed
alongside WebRx's main script files. 

When WebRx is installed using NuGet, this file will will be located in <code>&lt;project-folder&gt;\content\Scripts\typings</code>


## <a id="topic-setting-up-html"></a>Setting Up The HTML Page

If you've followed along this far, you now have all the libraries, build configuration and tools you need to create amazing JavaScript apps with WebRx. The next thing to do is create the <code>index.html</code> file in the root of your project folder. This example file provides a good template for new WebRx-based apps.

#### index.html

```html
<!doctype html>
<html>
  <head>
    <title>WebRx</title>
  </head>
  <body>
	<div data-bind="view: 'main'"></div>
		
	<script src="bower_modules/rx/dist/rx.all.js"></script>
	<script src="bower_modules/webrx/dist/web.rx.js"></script> 
	<script src="js/app.js"></script>
  </body>
</html>
```

Yes, that's it. This is the only HTML page in our application. The head of the document is pretty straight forward. 
So let's ignore that and proceed to the body.

The lonely <code>div</code> element at the very top of the body defines a view-slot for WebRx's [router](/docs/routing-overview.html). 
The view-slot will spring to life when define our first component in one of the upcoming sections.

Let's now focus on the script tags:

- First we have a reference to <code>rx.all.js</code> that loads the 
[RxJS-Library](https://github.com/Reactive-Extensions/RxJS) which is a powerful set of libraries for processing and querying asynchronous data-streams.
- The second script tag loads <code>web.rx.js</code> - the WebRx framework.
- The third script tag loads <code>app.js</code> which we are about to create in the next section

**Note:** This example assumes that WebRx and its dependencies have been installed using [Bower](http://bower.io/) and
therefore the scripts reside inside <code>&lt;project-folder&gt;/bower_modules/</code>. If you chose
one of the other installation methods outlined above you should have no problems correcting 
the script-references accordingly.

## <a id="topic-setting-up-js"></a>Bootstrapping the application

Now that've setup our html page it's time to get things rolling. 

Inside your project create a folder <code>js</code> and inside that folder a file named <code>app.js</code> with the following contents:

#### app.js

```javascript
wx.applyBindings();
```

The call to <code>wx.applyBindings</code> will tell WebRx that is now responsible for controlling the contents of our page
via a concept called [declarative data-binding](/docs/binding-syntax.html). So far our page contains
just a single binding, namely the [view](/docs/view-binding.html) binding on the sole <code>div</code> element of the body.

You could now navigate to <code>index.html></code> inside your browser and would see - well, a blank page.
Not very exciting. Let's fix this.

## Defining our first Component

In WebRx, user interface elements are composed of view and view-model pairs that are refered to as [Components](/docs/component-overview.html). The view is written with HTML and is rendered into the DOM. The view-model is written with JavaScript and provides data and behavior to the view. WebRx's powerful databinding links the two pieces together allowing changes in your data to be reflected in the view and vice versa. This separation of concerns is great for developer/designer collaboration, maintainability, architectural flexibility and even source control.

Let's now focus on the <code>div</code> element at the very top of the body:

```html
<div data-bind="view: 'main'"></div>
```

When we've invoked <code>wx.applyBindings()</code> in the previous step we basically turned
this element into a content placeholder. 

In order to bring these placeholders to life we need to accomplish two things:

- First we need to create a [Component](/docs/component-overview.html) that will provide the content to for the placeholder
- Next we need to map the component to a placeholder slot (WebRx supports unlimited optionally nested placeholders per page).

To do that let's go back to the <code>app.js</code> script we've created in [Step 3](#topic-setting-up-js).

#### app.js

```javascript
wx.app.component('hello', {
  viewModel: function() {
    this.firstName = 'Bart';
    this.lastName = 'Simpson';
  },
  template: 'The name is <span data-bind="text: firstName + lastName"></span>'
});

wx.router.state({
  name: "$",
  views: { 'main': "hello" }
});

wx.router.reload();

wx.applyBindings();
```

Let's examine the final version of the script line by line:

**Line 1-7**: Here we define a very simple component that goes by the moniker <code>hello</code>. Given a <code>firstName</code> and a <code>lastName</code> property
the component will display the resulting full-name.

Even though we've now defined a component for our placeholder, it will be still not visible on the page because we haven't told the framework
*where* to display it. In WebRx it is the [Router's](/docs/routing-overview.html) responsibility to map components to views. We just have to tell it.

**Line 11**: This line tells the [Router](/docs/routing-overview.html) to display the component
<code>hello</code> in the placeholder <code>main</code> whenever the application is in it's
default state (<code>$</code>). 

**Line 14**: Here we reload the router after configuring it in the previous step

## The result

If you have implemented everything correctly, refreshing your browser windows should yield the following output:

```javascript
The name is Bart Simpson 
```

## Conclusion

Even though this example like very basic on the surface, it has touched quite a lot of WebRx's core
concepts. Throughout the tutorial we've learned:

- How to setup a basic HTML page that hosts our application
- How to bootstrap the application
- How to define a basic component consisting of a view-model and a template
- How to display a component using the Router 


<a class="next-topic" href="/docs/index.html">Next: Introduction</a>