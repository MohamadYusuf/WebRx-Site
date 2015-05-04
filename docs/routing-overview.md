---
layout: docs
title: WebRx - Routing Overview
---
{% include sample-warning.html %}
# Routing Overview

WebRx's Router allows you to organize the parts of your interface into a state machine. WebRx's Router is organized around states, which may optionally have routes, as well as other behavior, attached.

States are bound to named, nested and parallel views, allowing you to powerfully manage your application's interface.

<a target="_blank" class="btn btn-primary btn-xs example-link" href="/examples/router-demo/index.html">Live Demo</a>

## About states

- A state corresponds to a "place" in the application in terms of the overall UI and navigation.
- A state describes (via the <code>views</code> and <code>params</code> properties) what the UI looks like and does at that place.
- States often have things in common, and the primary way of factoring out these commonalities in this model is via the state hierarchy, i.e. parent/child states aka nested states.

### The simplest form of state

A state in its simplest form can be created like this:

```html
<body>
	<section data-bind="view: 'main'"></section>
</body>
```

```javascript
wx.router.state({
    name: "contacts",
    views: {
        'main': "contact-list-component"
    }
});
```

This declares a state named <code>contacts</code>, that causes the <code>main</code> view to display the <code>contact-list-component</code>
when the state is activated (for simplicity, we assume that the component has been already registered).

Right now, the <code>contacts</code> state won't ever be activated. So let's see how we can activate a state.

### Activating a state

There are three main ways to activate a state:

- Calling <code>wx.router.go()</code>
- Clicking a link which has been transformed by a [sref-binding](/docs/sref-binding.html)
- Navigating to the url associated with the state

## State-Hierarchy

States can be nested within each other. The router will automatically infer the state-hierarchy from dots encountered in a state name. 
Below, contacts.list becomes a child of contacts.

```javascript
wx.router
  .state('contacts', {})
  .state('contacts.list', {});
```

When the application is in a particular state—when a state is "active"—all of its ancestor states are implicitly active as well. 
Below, when the <code>contacts.details</code> state is active, the <code>contacts</code> state is implicitly active as well, because it's the parent 
state to <code>contacts.details</code>.

```html
<body>
	<section data-bind="view: 'main'"></section>
	<section data-bind="view: 'details'"></section>
</body>
```

```javascript
wx.router.state({
    name: "contacts",
    views: {
        'main': "header-component",
        'details': "contact-list-component"
    }
}).state({
    name: "contacts.details",
    views: {
        'details': "contact-details-component"
    }
});
```

This example defines the views <code>main</code> and <code>details</code>. Let's see what happens to the contents of both views when we activate
states:

- When the <code>contacts</code> state is activated the <code>main</code> view will display the <code>header-component</code> and the <code>details</code> view will
display the <code>contact-list-component</code>.

- As soon as the <code>contacts.details</code> state is activated the <code>details</code> view will switch to the <code>contact-details-component</code>
while the <code>main</code> view will continue to display the <code>header-component</code> because it is inherited from parent state <code>contacts</code>.

### The root state <code>$</code>

The root-state is a special ambient state that is always present. It sits above all other registered states in the state-hierarchy
and all states inherit it.

By default, root-state maps to the <code>/</code> route and can be accessed using the special name <code>$</code>.

The fact that all states inherit from root-state and that the root state can be overriden by the developer makes it a perfect
target for providing defaults to other states. For example:

- To change the base uri for all states re-register root state with a custom route
- To provide default-parameters to other states re-register root state with additional parameters

#### Example

```javascript
wx.router.state({
    name: "$",
    route: "/foo"
});
```
Here we've overriden root-state for the application and by providing a custom route we effectively 
prefixed alll relative-routes registered by other states with <code>/foo</code>.

### How routing interacts with the browser's history

Whenever the current routing state changes due to navigation via [sref](/docs/sref-binding.html)-links our invoking 
the <code>wx.router.go()</code> method with options containing <code>{ location: true }</code>, the Router will reflect the change in the browser's
history in order to provide the enduser with a seamless browsing-experience that includes <code>back</code>- and <code>forward</code> button support.

This feature relies on the standard [History-API](https://developer.mozilla.org/en-US/docs/Web/API/History) implemented by
all current browsers. If you need to support very old browsers which do not yet implement this API, is is recommended to include 
a Shim such as [history.js](https://github.com/browserstate/history.js/) with your project.

## Server side setup

Because WebRx's router relies on the browser history API to manage routes, the URLs displayed in the brower's
address bar look much nicer but that also requires server side rewrites. Here are some examples:

**Apache Rewrites**

```apache
<VirtualHost *:80>
    ServerName my-app

    DocumentRoot /path/to/app

    <Directory /path/to/app>
        RewriteEngine on

        # Don't rewrite files or directories
        RewriteCond %{REQUEST_FILENAME} -f [OR]
        RewriteCond %{REQUEST_FILENAME} -d
        RewriteRule ^ - [L]

        # Rewrite everything else to index.html to allow html5 state links
        RewriteRule ^ index.html [L]
    </Directory>
</VirtualHost>
```

**Nginx Rewrites**

```nginx
server {
    server_name my-app;

    root /path/to/app;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Azure IIS Rewrites**

```html
<system.webServer>
  <rewrite>
    <rules> 
      <rule name="Main Rule" stopProcessing="true">
        <match url=".*" />
        <conditions logicalGrouping="MatchAll">
          <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />                                 
          <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
        </conditions>
        <action type="Rewrite" url="/" />
      </rule>
    </rules>
  </rewrite>
</system.webServer>
```

**Express Rewrites**

```javascript
var express = require('express');
var app = express();

app.use('/js', express.static(__dirname + '/js'));
app.use('/dist', express.static(__dirname + '/../dist'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/partials', express.static(__dirname + '/partials'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname });
});

app.listen(3006); //the port you want to use
```

**ASP.Net C# Rewrites**

In Global.asax

```C#
private const string ROOT_DOCUMENT = "/default.aspx";

protected void Application_BeginRequest( Object sender, EventArgs e )
{
	string url = Request.Url.LocalPath;
	if ( !System.IO.File.Exists( Context.Server.MapPath( url ) ) )
		Context.RewritePath( ROOT_DOCUMENT );
}
```

### Deep-Links

Users of your application may bookmark pages deeply nested within your state hierarchy. 

In the previous section we've ensured that server will return a page even when the browser requests an URL that is only available
on the client side - as it is the case with deep-linking bookmarks.

To support seamless transition from server- to client-side routing, the router provides the parameterless 
method <code>sync</code>. This method infers the current routing-state from the browser's current location 
(address bar) and transitions to that state. 

**Note:** Calling the <code>sync</code> method is expensive and should only be done once after the application has registered all of its initial states.

<a class="next-topic" href="/docs/routing-registration.html">Next: Defining and registering routing states</a>
