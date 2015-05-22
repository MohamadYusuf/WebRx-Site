/// <reference path="../../typings/web.rx.d.ts" />
define(["require", "exports"], function (require, exports) {
    var ViewModel = (function () {
        function ViewModel() {
            this.items = wx.list(["Alpha", "Beta", "Gamma"]);
            this.itemToAdd = wx.property("");
            this.selectedItem = wx.property(null);
            this.addItemCmd = wx.command(function () {
                if (this.itemToAdd() != "") {
                    this.items.add(this.itemToAdd());
                    this.itemToAdd("");
                }
            }, wx.whenAny(this.itemToAdd, function (itemToAdd) {
                return itemToAdd.length > 0;
            }), this);
            this.removeItemCmd = wx.command(function () {
                this.items.remove(this.selectedItem());
                this.selectedItem(null);
            }, wx.whenAny(this.selectedItem, function (selectedItem) {
                return selectedItem != null;
            }), this);
        }
        return ViewModel;
    })();
    return ViewModel;
});
//# sourceMappingURL=example.js.map