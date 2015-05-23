/// <reference path="../../typings/web.rx.d.ts" />
define(["require", "exports"], function (require, exports) {
    var ViewModel = (function () {
        function ViewModel() {
            var _this = this;
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
            this.filter = wx.property();
            this.displayAdvancedOptions = wx.property(false);
            this.addPlanetCmd = wx.command(function (type) {
                _this.planets.push({ name: "New planet", type: type });
            }, this);
            this.planetsToShow = this.planets.project(function (planet) {
                var desiredType = this.typeToShow();
                var result = desiredType === "all" || planet.type === desiredType;
                if (result && this.filter())
                    result = planet.name.toLowerCase().indexOf(this.filter().toLowerCase()) !== -1;
                return result;
            }.bind(this), Rx.Observable.merge(this.typeToShow.changed, this.filter.changed));
        }
        return ViewModel;
    })();
    return ViewModel;
});
//# sourceMappingURL=example.js.map