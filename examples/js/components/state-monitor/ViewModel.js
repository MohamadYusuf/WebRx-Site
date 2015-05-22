/// <reference path="../../typings/web.rx.d.ts" />
define(["require", "exports"], function (require, exports) {
    var ViewModel = (function () {
        function ViewModel(params) {
            this.name = wx.property();
            this.route = wx.property();
            this.params = wx.property();
            this.views = wx.property();
            var self = this;
            wx.router.current.changed.startWith(wx.router.current()).subscribe(function (x) {
                self.name(x.name);
                self.route(typeof x.url === "string" ? x.url : x.url.stringify(x.params));
                self.params(x.params ? JSON.stringify(x.params) : "");
                var views = {};
                if (x.views) {
                    Object.keys(x.views).forEach(function (key) {
                        var view = x.views[key];
                        if (typeof view === "string") {
                            views[key] = view;
                        }
                        else {
                            views[key] = view.component;
                        }
                    });
                }
                self.views(JSON.stringify(views));
            });
        }
        return ViewModel;
    })();
    return ViewModel;
});
//# sourceMappingURL=ViewModel.js.map