---
layout: examples
title: WebRx - Examples
---
{% include sample-warning.html %}
# WebRx Examples

This page provides some code-examples to get you started. Feel free to fork any of the samples at CodePen and tinker with it to your heart's content.

## Hello World

In this example, the two text boxes are bound to observable properties on a view-model. The <code>full name</code> display is bound to 
an [output property](/docs/output-properties.html#start), whose value is calculated in terms of the observables.

Edit either text box to see the <code>full name</code> display update. See the HTML source code and notice there's no need to 
catch <code>onchange</code> events. WebRx knows when to update the UI.

<p data-height="264" data-theme-id="0" data-slug-hash="GgadqB" data-default-tab="result" data-user="oliverw" class='codepen'>See the Pen <a href='http://codepen.io/oliverw/pen/GgadqB/'>GgadqB</a> by Oliver Weichhold (<a href='http://codepen.io/oliverw'>@oliverw</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Output Properties

<code>Output properties</code> are observable properties that are backed by an Rx-Observable. Output properties are read-only, but will still fire change notifications.
This example displays a countdown-timer that counts down from 10 to 1 at a one second interval:

<p data-height="268" data-theme-id="0" data-slug-hash="LEombz" data-default-tab="result" data-user="oliverw" class='codepen'>See the Pen <a href='http://codepen.io/oliverw/pen/LEombz/'>LEombz</a> by Oliver Weichhold (<a href='http://codepen.io/oliverw'>@oliverw</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Observable Lists

If you want to detect and respond to changes on one object, you'd use observable-properties. If you want to detect and respond to changes of a collection of things, use an observable-list. This is useful in many scenarios where you're displaying or editing multiple values and need repeated sections of UI to appear and disappear as items are added and removed.

<p data-height="268" data-theme-id="0" data-slug-hash="KwLRWK" data-default-tab="result" data-user="oliverw" class='codepen'>See the Pen <a href='http://codepen.io/oliverw/pen/KwLRWK/'>KwLRWK</a> by Oliver Weichhold (<a href='http://codepen.io/oliverw'>@oliverw</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Projected Observable Lists combined with animated transitions

This is example demonstrates two of WebRx's features:

- Projected observable lists
- Animated transitions supported by the foreach-binding

<p data-height="500" data-theme-id="0" data-slug-hash="xGKmKo" data-default-tab="result" data-user="oliverw" class='codepen'>See the Pen <a href='http://codepen.io/oliverw/pen/xGKmKo/'>WebRx - Animated collections example</a> by Oliver Weichhold (<a href='http://codepen.io/oliverw'>@oliverw</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Client-Side-Router Demo

This example demonstrates some of the capabilities of WebRx's built-in [client-side router](/docs/routing-overview.html#start).

To observe <code>window.location</code> reflecting state-routes, click here <a target="_blank" href="/examples/router-demo/index.html">to launch this example in another tab</a>.

<p data-height="500" data-theme-id="0" data-slug-hash="OPYZOq" data-default-tab="result" data-user="oliverw" class='codepen'>See the Pen <a href='http://codepen.io/oliverw/pen/OPYZOq/'>OPYZOq</a> by Oliver Weichhold (<a href='http://codepen.io/oliverw'>@oliverw</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Search Engine

Here we utilize [DuckDuckGo's](https://duckduckgo.com/) REST Api to carry out Web-Searches.  

**Implementation Details:**

- No search occurs unless the query has actually changed
- User input is throttled to 200ms to reduce server load
- Only results from the most recently issued request will be displayed
- Results are filtered to only include displayable items
- A maximum of ten items will be shown
  
<p data-height="700" data-theme-id="0" data-slug-hash="ogRydr" data-default-tab="result" data-user="oliverw" class='codepen'>See the Pen <a href='http://codepen.io/oliverw/pen/ogRydr/'>WebRx - DuckDuckGo Search Example</a> by Oliver Weichhold (<a href='http://codepen.io/oliverw'>@oliverw</a>) on <a href='http://codepen.io'>CodePen</a>.</p>


<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
