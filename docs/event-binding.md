---
layout: docs
title: WebRx - The Event-Binding
---
# The Event-Binding

The event binding allows you to add an event handler for a specified event so that your chosen JavaScript function will be 
invoked when that event is triggered for the associated DOM element. This can be used to bind to any event, 
such as keypress, mouseover or mouseout.

## Example

```html
<div>
    <div data-bind="event: { mouseover: enableDetails, mouseout: disableDetails }">
        Mouse over me
    </div>
    <div data-bind="visible: detailsEnabled">
        Details
    </div>
</div>
```
 
```html
<script type="text/javascript">
    var viewModel = {
        detailsEnabled: wx.property(false),
        enableDetails: function() {
            this.detailsEnabled(true);
        },
        disableDetails: function() {
            this.detailsEnabled(false);
        }
    };
    wx.applyBindings(viewModel);
</script>
```

Now, moving your mouse pointer on or off of the first element will invoke methods on the view model to 
toggle the detailsEnabled property. The second element reacts to changes to the value of detailsEnabled 
by either showing or hiding itself.

## Parameters

### Main parameter

You should pass a JavaScript object in which the property names correspond to event names, and 
the values correspond to the function of your view-model that you want to bind to the event.

When invoking an event-handler the binding will adjust *this* to point to your view-model and 
pass the event object as first argument.
