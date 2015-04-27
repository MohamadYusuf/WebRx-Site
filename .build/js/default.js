// hide impressum for international users
if(navigator.language != 'de' && navigator.language.indexOf('de-') != 0) {
	var el = document.querySelector('#impressum');
	if(el) {
		el.parentNode.removeChild(el);
	}
}

if(document.location.pathname === '/') {
    function TicketsViewModel() {
    	var self = this;

        this.tickets = [
            { name: "Economy", price: 199.95 },
            { name: "Business", price: 449.22 },
            { name: "First Class", price: 1199.99 }
        ];
        this.chosenTicket = wx.property();
        this.resetTicketCommand = wx.command(function() { 
        	self.chosenTicket(null);
        }, wx.whenAny(this.chosenTicket, function(ticket) { return ticket != null; }));
    }

    wx.applyBindings(new TicketsViewModel(), document.getElementById("live-demo"));

    $("#share").popover({ html: true, placement: 'top', content: function () { return $("#share-content").html(); } });

    // hide stupid popovers when clicking outside    
    $('html').on('mouseup', function (e) {
        if (!$(e.target).closest('.popover').length) {
            $('.popover').each(function () {
                $(this.previousSibling).popover('hide');
            });
        }
    });
}

// add a few globally available transition
wx.app.animation("fadein", wx.animation("fadein", "run"));
wx.app.animation("fadeout", wx.animation("fadeout", "run"));

// if documentation start lies below doc-index
if ($("#doc-index").length && $("#start").length &&
    $("#start").offset().top - $("#doc-index").offset().top > 200) {
    $('html, body').animate({
        scrollTop: $("#start").offset().top - 15
    }, 100);
}
