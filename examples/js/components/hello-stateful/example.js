/// <reference path="../../typings/web.rx.d.ts" />
define(["require", "exports"], function (require, exports) {
    var ViewModel = (function () {
        function ViewModel() {
            this.firstName = wx.property(wx.router.current().params.firstName || 'Homer');
            this.lastName = wx.property(wx.router.current().params.lastName || 'Simpson');
            this.fullName = wx.whenAny(this.firstName, this.lastName, function (firstName, lastName) {
                wx.router.updateCurrentStateParams(function (params) {
                    params.firstName = firstName;
                    params.lastName = lastName;
                });
                return firstName + " " + lastName;
            }).toProperty();
        }
        return ViewModel;
    })();
    return ViewModel;
});
//# sourceMappingURL=example.js.map