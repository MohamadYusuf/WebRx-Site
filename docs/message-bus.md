---
layout: docs
title: WebRx - The Message-Bus
---
# The Message-Bus

Like many other MVVM frameworks, ReactiveUI includes an implementation of the *Message-Bus* pattern. 
This allows you to send and recieve messages between different parts of the code without them directly accessing each other.

## Usage

WebRx's message-bus implementation supports sending and receiving messages on any number of arbitrarily named topics.

Just like the rest of the framework, internally the message-bus relies on Rx-Observables for message publication and
subscription, enabling developers to filter, throttle or otherwise pre-process messages using any of the [operators 
built into RxJs](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/categories.md).

### Sending Messages

```javascript
wx.messageBus.sendMessage("item-deleted", item);
```

Here we send a message to the <code>item-deleted</code> topic which will be received by anyone subscribed to the
same topic.

### Using observables as publishers

It is also possible to pipe any observable into the message-bus by associating at topic name with the
observable and registering with the message-bus.

```javascript
var source = Rx.Observable.interval(5000);

wx.messageBus.registerMessageSource("folks-another-five-seconds-have-passed", source);
```

### Subscribing to topics

```javascript
wx.messageBus.listen("item-deleted")  
    .subscribe(function(x) { console.log(x) });
```

Here we subscribe to the <code>item-deleted</code> topic and log any received messages to the browser's console.
