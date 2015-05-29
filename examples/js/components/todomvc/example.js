/// <reference path="../../typings/web.rx.d.ts" />
define(["require", "exports"], function (require, exports) {
    var localStorageKey = 'todos-webrx';
    var displayModeAll = 'all';
    var displayModeActive = 'active';
    var displayModeCompleted = 'completed';
    var displayModeStateKey = 'mode';
    var todoStateKey = 'todo';
    // represent a single todo item
    var Todo = (function () {
        function Todo(title, completed) {
            this.title = wx.property();
            this.completed = wx.property();
            this.editing = wx.property(false);
            this.title(title);
            this.completed(completed);
        }
        return Todo;
    })();
    var ViewModel = (function () {
        function ViewModel() {
            var _this = this;
            this.todos = wx.list();
            this.current = wx.property();
            this.displayMode = wx.property(displayModeAll);
            // Resource cleanup
            this.cleanup = new Rx.CompositeDisposable();
            // create a live-filtered projection of the todos collection that will update
            // when its source (this.todos) or any of its items changes or when when "displayMode" changes
            this.filteredTodos = this.todos.project(function (todo) {
                switch (_this.displayMode()) {
                    case displayModeActive:
                        return !todo.completed();
                    case displayModeCompleted:
                        return todo.completed();
                    default:
                        return true;
                }
            }, this.displayMode.changed);
            // add a new entry, when enter key is pressed
            this.addCmd = wx.command(function () {
                var current = _this.current().trim();
                if (current) {
                    _this.todos.push(new Todo(current));
                    _this.current('');
                }
            }, this);
            // change display mode
            this.changeDisplayModeCmd = wx.command(function (mode) {
                _this.displayMode(mode);
            }, this);
            // remove a single entry
            this.removeCmd = wx.command(function (todo) {
                _this.todos.remove(todo);
            }, this);
            // mark all todos complete/incomplete
            this.completeAllCmd = wx.command(function () {
                _this.todos.forEach(function (todo) {
                    todo.completed(!!_this.remainingCount());
                }, _this);
            }, this);
            // remove all completed entries
            this.removeCompletedCmd = wx.command(function () {
                _this.todos.filter(function (todo) {
                    return todo.completed();
                }).forEach(function (item) {
                    _this.todos.remove(item);
                }, _this);
            }, this);
            // edit an item
            this.editItemCmd = wx.command(function (item) {
                item.editing(true);
                item.previousTitle = item.title();
            }, this);
            // cancel editing an item and revert to the previous content
            this.cancelEditingCmd = wx.command(function (item) {
                item.editing(false);
                item.title(item.previousTitle);
            }, this);
            // stop editing an item, remove the item, if it is now empty
            this.saveEditingCmd = wx.command(function (item) {
                item.editing(false);
                var title = item.title();
                var trimmedTitle = title.trim();
                if (title !== trimmedTitle) {
                    item.title(trimmedTitle);
                }
                if (!trimmedTitle) {
                    _this.todos.remove(item);
                }
            }, this);
            // create an observable output-property representing all completed todos
            this.completedCount = Rx.Observable.merge(this.todos.listChanged, this.todos.itemChanged)
                .select(this.countCompleted, this)
                .toProperty(this.countCompleted());
            // create an observable output-property representing all todos that are not complete
            this.remainingCount = Rx.Observable.merge(this.todos.listChanged, this.todos.itemChanged)
                .select(this.countRemaining, this)
                .toProperty(this.countRemaining());
            // restore current todo and displayMode from routing-state
            this.displayMode(wx.router.current().params[displayModeStateKey] || displayModeAll);
            this.current(wx.router.current().params[todoStateKey] || "");
            // load todos from localStorage
            var todos = localStorage[localStorageKey] ? JSON.parse(localStorage[localStorageKey]) : [];
            this.todos.addRange(todos.map(function (todo) { return new Todo(todo.title, todo.completed); }));
            // we want to get notified of changes to any of the todos contained in the list
            // not just of structural changes to the list (via "listChanged" obserable).
            // Those changes are then exposed using the list's "itemChanged" obseravable
            this.todos.changeTrackingEnabled = true;
            // persistence
            Rx.Observable.merge(this.todos.listChanged, this.todos.itemChanged)
                .throttle(500)
                .subscribeOnNext(function () {
                localStorage[localStorageKey] = JSON.stringify(_this.todos.map(function (x) { return ({ title: x.title(), completed: x.completed() }); }));
            }, this);
            // preserve current todo and displayMode in routing-state
            this.cleanup.add(this.displayMode.changed.subscribe(function (dm) {
                wx.router.updateCurrentStateParams(function (params) {
                    params[displayModeStateKey] = dm;
                });
            }));
            this.cleanup.add(this.current.changed.subscribe(function (todo) {
                wx.router.updateCurrentStateParams(function (params) {
                    params[todoStateKey] = todo;
                });
            }));
        }
        // The framework will automatically dispose view-models that implement Rx.IDisposable
        ViewModel.prototype.dispose = function () {
            this.cleanup.dispose();
        };
        ViewModel.prototype.countCompleted = function () {
            return this.todos.filter(function (todo) { return todo.completed(); }).length;
        };
        ViewModel.prototype.countRemaining = function () {
            return this.todos.length() - this.completedCount();
        };
        return ViewModel;
    })();
    return ViewModel;
});
//# sourceMappingURL=example.js.map