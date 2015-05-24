/// <reference path="../../typings/web.rx.d.ts" />
define(["require", "exports"], function (require, exports) {
    var localStorageKey = 'todos-webrx';
    var displayModeAll = 'all';
    var displayModeActive = 'active';
    var displayModeCompleted = 'completed';
    var displayModeStateKey = 'mode';
    var todoStateKey = 'todo';
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
            this.cleanup = new Rx.CompositeDisposable();
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
            this.addCmd = wx.command(function () {
                var current = _this.current().trim();
                if (current) {
                    _this.todos.push(new Todo(current));
                    _this.current('');
                }
            }, this);
            this.changeDisplayModeCmd = wx.command(function (mode) {
                _this.displayMode(mode);
            }, this);
            this.removeCmd = wx.command(function (todo) {
                _this.todos.remove(todo);
            }, this);
            this.completeAllCmd = wx.command(function () {
                _this.todos.forEach(function (todo) {
                    todo.completed(!!_this.remainingCount());
                }, _this);
            }, this);
            this.removeCompletedCmd = wx.command(function () {
                _this.todos.filter(function (todo) {
                    return todo.completed();
                }).forEach(function (item) {
                    _this.todos.remove(item);
                }, _this);
            }, this);
            this.editItemCmd = wx.command(function (item) {
                item.editing(true);
                item.previousTitle = item.title();
            }, this);
            this.cancelEditingCmd = wx.command(function (item) {
                item.editing(false);
                item.title(item.previousTitle);
            }, this);
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
            this.completedCount = Rx.Observable.merge(this.todos.listChanged, this.todos.itemChanged)
                .select(this.countCompleted, this)
                .toProperty(this.countCompleted());
            this.remainingCount = Rx.Observable.merge(this.todos.listChanged, this.todos.itemChanged)
                .select(this.countRemaining, this)
                .toProperty(this.countRemaining());
            this.displayMode(wx.router.current().params[displayModeStateKey] || displayModeAll);
            this.current(wx.router.current().params[todoStateKey] || "");
            var todos = localStorage[localStorageKey] ? JSON.parse(localStorage[localStorageKey]) : [];
            this.todos.addRange(todos.map(function (todo) { return new Todo(todo.title, todo.completed); }));
            this.todos.changeTrackingEnabled = true;
            Rx.Observable.merge(this.todos.listChanged, this.todos.itemChanged)
                .throttle(500)
                .subscribeOnNext(function () {
                localStorage[localStorageKey] = JSON.stringify(_this.todos.map(function (x) { return ({ title: x.title(), completed: x.completed() }); }));
            }, this);
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