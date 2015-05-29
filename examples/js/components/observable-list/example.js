/// <reference path="../../typings/web.rx.d.ts" />
define(["require", "exports"], function (require, exports) {
    var ViewModel = (function () {
        function ViewModel() {
            var _this = this;
            this.items = wx.list(["Alpha", "Beta", "Gamma"]);
            this.itemToAdd = wx.property("");
            this.selectedItem = wx.property(null);
            this.addItemCmd = wx.command(function () {
                if (_this.itemToAdd() != "") {
                    // add the item
                    _this.items.add(_this.itemToAdd());
                    // clear the textbox
                    _this.itemToAdd("");
                }
            }, wx.whenAny(this.itemToAdd, function (itemToAdd) {
                return itemToAdd.length > 0;
            }), this);
            this.removeItemCmd = wx.command(function () {
                // remove the item
                _this.items.remove(_this.selectedItem());
                // clear selection
                _this.selectedItem(null);
            }, wx.whenAny(this.selectedItem, function (selectedItem) {
                return selectedItem != null;
            }), this);
        }
        return ViewModel;
    })();
    return ViewModel;
});
//# sourceMappingURL=example.js.map