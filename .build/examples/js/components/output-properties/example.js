/// <reference path="../../typings/web.rx.d.ts" />
define(["require", "exports"], function (require, exports) {
    var ViewModel = (function () {
        function ViewModel() {
            var obs = Rx.Observable.timer(0, 1000)
                .select(function (x) { return 10 - x; })
                .take(11)
                .concat(Rx.Observable.return("BOOM"))
                .publish();
            this.countDown = obs.toProperty();
            this.goCmd = wx.command(function () {
                obs.connect();
            });
        }
        return ViewModel;
    })();
    return ViewModel;
});
//# sourceMappingURL=example.js.map