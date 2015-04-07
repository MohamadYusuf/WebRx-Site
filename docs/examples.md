---
layout: examples
title: WebRx - Examples
---
{% include sample-warning.html %}
# Examples

## Hello World

In this example, the two text boxes are bound to observable properties on a view-model. The <code>full name</code> display is bound to 
an [output property](/docs/output-properties.html#start), whose value is calculated in terms of the observables.

Edit either text box to see the <code>full name</code> display update. See the HTML source code and notice there's no need to 
catch <code>onchange</code> events. WebRx knows when to update the UI.

<iframe width="100%" height="200" src="//jsfiddle.net/oliverw/amogtocm/embedded/result,js,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


## Output Properties

<code>Output properties</code> are observable properties that are backed by an Rx-Observable. Output properties are read-only, but will still fire change notifications.
This example displays a countdown-timer that counts down from 10 to 1 at a one second interval:

<iframe width="100%" height="200" src="http://jsfiddle.net/oliverw/1nwsased/embedded/result,js,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


## Observable Lists

<iframe class="hidden-xs" width="100%" height="300" src="http://jsfiddle.net/oliverw/z51a6bsg/embedded/result,js,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Router

This example demonstrates some of the capabilities of WebRx's built-in [client-side router](/docs/routing-overview.html#start).

<a target="_blank" class="btn btn-success" href="/examples/router-demo/index.html">Launch</a>&nbsp;or&nbsp;<a target="_blank" class="btn btn-primary" href="https://jsfiddle.net/oliverw/26j1bbnj/">Play with the source</a>
