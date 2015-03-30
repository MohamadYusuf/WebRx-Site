---
layout: docs
title: WebRx - Module Overview
---
# Module Overview

Modules in WebRx allow for partitioning your projects into managable units. 
You can think of a module as a container for the different parts of your app.

There are three types of module-scoped-resources in WebRx:

- [Components](/docs/component-overview.html#start)
- Binding-handlers
- [Expression-filters](/docs/binding-syntax.html#topic-expression-filters)

Modules implement methods for registration and lookup of these types of resources.

## Why modules?

Most applications have a main method that instantiates and wires together the different parts of the application.

WebRx apps don't have a main method. Instead modules declaratively specify how an application should be bootstrapped. There are several advantages to this approach:

- The declarative process is easier to understand.
- You can package code as reusable modules.
- The modules can be loaded in any order (or even in parallel) because modules delay execution.
- Unit tests only have to load relevant modules, which keeps them fast.
- End-to-end tests can use modules to override configuration.

<a class="next-topic" href="/docs/module-registration.html#start">Next: Defining and registering modules</a>