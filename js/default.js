// hide impressum for international users
if(navigator.language != 'de' && navigator.language.indexOf('de-') != 0) {
	var el = document.querySelector('#impressum');
	if(el) {
		el.parentNode.removeChild(el);
	}
}

if(document.location.pathname === '/') {
    function TicketsViewModel() {
        this.tickets = [
            { name: "Economy", price: 199.95 },
            { name: "Business", price: 449.22 },
            { name: "First Class", price: 1199.99 }
        ];
        this.chosenTicket = wx.property();
        this.resetTicket = function() { 
        	this.chosenTicket(null);
        }
    }

	wx.applyBindings(new TicketsViewModel(), document.getElementById("live-demo"));
}
