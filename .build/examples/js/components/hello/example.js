/// <reference path="../../typings/web.rx.d.ts" />
define(["require", "exports"], function (require, exports) {
    var ViewModel = (function () {
        function ViewModel() {
            this.firstName = wx.property('Bart');
            this.lastName = wx.property('Simpson');
            this.fullName = wx.whenAny(this.firstName, this.lastName, function (firstName, lastName) {
                return firstName + " " + lastName;
            }).toProperty();
        }
        return ViewModel;
    })();
    return ViewModel;
});
//# sourceMappingURL=example.js.map