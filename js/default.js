// hide impressum for international users
if(navigator.language != 'de' && navigator.language.indexOf('de-') != 0) {
	var el = document.querySelector('#impressum');
	if(el) {
		el.parentNode.removeChild(el);
	}
}

if(document.location.pathname === '/') {
    wx.app.animation('enter', wx.animation("enter", "start"));

    var PlanetsModel = function () {
        this.planets = wx.list([
            { name: "Mercury", type: "rock" },
            { name: "Venus", type: "rock" },
            { name: "Earth", type: "rock" },
            { name: "Mars", type: "rock" },
            { name: "Jupiter", type: "gasgiant" },
            { name: "Saturn", type: "gasgiant" },
            { name: "Uranus", type: "gasgiant" },
            { name: "Neptune", type: "gasgiant" },
        ]);

        this.typeToShow = wx.property("all");
        this.displayAdvancedOptions = wx.property(false);

        this.addPlanetCmd = wx.command(function (type) {
            this.planets.push({ name: "New planet", type: type });
        }, this);

        this.planetsToShow = this.planets.project(function (planet) {
            var desiredType = this.typeToShow();
            return desiredType === "all" || planet.type === desiredType;
        }.bind(this), this.typeToShow.changed);
    };

    wx.applyBindings(new PlanetsModel(), document.getElementById("live-demo"));

    $("#share").popover({ html: true, trigger: 'manual', placement: 'top', content: function() {
         return $("#share-content").html();
    }}).click(function (e) {
        $(this).popover('toggle');
    });
}

$.material.init();

// add a few globally available transition
wx.app.animation("fadein", wx.animation("fadein", "run"));
wx.app.animation("fadeout", wx.animation("fadeout", "run"));

// scroll documentation topic into view if below documentation-index
if ($("#doc-index").length && $("#start").length &&
    $("#start").offset().top - $("#doc-index").offset().top > 200) {
    $('html, body').animate({
        scrollTop: $("#start").offset().top - 15
    }, 100);
}
