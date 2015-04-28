/*global wx */
(function () {
	'use strict';
    
    var localStorageKey = 'todos-webrx';
    var displayModeAll = "all";
    var displayModeActive = "active";
    var displayModeCompleted = "completed";

    // represent a single todo item
    var Todo = function (title, completed) {
        this.title = wx.property(title);
        this.completed = wx.property(completed);
        this.editing = wx.property(false);
    };
    
    // our main view model
    var ViewModel = function (todos) {
        // map array of passed in todos to an observableArray of Todo objects
        this.todos = wx.list(todos.map(function (todo) {
            return new Todo(todo.title, todo.completed);
        }));

        this.todos.changeTrackingEnabled = true;
        
        this.current = wx.property();  
        this.showMode = wx.property('all');
        
        this.filteredTodos = this.todos.project(function (todo) {
            switch (this.showMode()) {
                case displayModeActive:
                    return !todo.completed();
                case displayModeCompleted:
                    return todo.completed();
                default:
                    return true;
            }
        }.bind(this), this.showMode.changed);
        
        // add a new entry, when enter key is pressed
        this.addCmd = wx.command(function () {
            var current = this.current().trim();

            if (current) {
                this.todos.push(new Todo(current));
                this.current('');
            }
        }, this);
        
        // remove a single entry
        this.removeCmd = wx.command(function (todo) {
            this.todos.remove(todo);
        }, this);
                
        // writeable computed observable to handle marking all complete/incomplete
        this.completeAllCmd = wx.command(function () {
            this.todos.forEach(function (todo) {
                todo.completed(this.remainingCount());
            }, this);
        }, this);
        
        // remove all completed entries
        this.removeCompletedCmd = wx.command(function () {
            this.todos.filter(function (todo) {
                return todo.completed();
            }).forEach(function(item) {
                this.todos.remove(item);
            }, this);
        }, this);
        
        // edit an item
        this.editItemCmd = wx.command(function(item) {
            item.editing(true);
            item.previousTitle = item.title();
        }, this);
        
        // cancel editing an item and revert to the previous content
        this.cancelEditingCmd = wx.command(function(item) {
            item.editing(false);
            item.title(item.previousTitle);
        }, this);
        
        // stop editing an item, remove the item, if it is now empty
        this.saveEditingCmd = wx.command(function(item) {
            item.editing(false);
            var title = item.title();
            var trimmedTitle = title.trim();

            if (title !== trimmedTitle) {
                item.title(trimmedTitle);
            }

            if (!trimmedTitle) {
                this.todos.remove(item);
            }
        }, this);

        this.countCompleted = function() {
            return this.todos.filter(function(todo) {
                return todo.completed();
            }).length;
        }

        // count of all completed todos
        this.completedCount = Rx.Observable.merge(this.todos.listChanged, this.todos.itemChanged)
            .select(this.countCompleted, this)
            .toProperty(this.countCompleted());
        
        this.countRemaining = function() {
            return this.todos.length() - this.completedCount();
        }
        
        // count of todos that are not complete
        this.remainingCount = Rx.Observable.merge(this.todos.listChanged, this.todos.itemChanged)
            .select(this.countRemaining, this)
            .toProperty(this.countRemaining());
        
        // setup routing
        var self = this;

        wx.router.state({
            name: "$",
            route: "/examples/todomvc",
            onEnter: function() {
                self.showMode(displayModeAll);
            }
        }).state({
            name: "active",
            onEnter: function () {
                self.showMode(displayModeActive);
            }
        }).state({
            name: "completed",
            onEnter: function () {
                self.showMode(displayModeCompleted);
            }
        });

        wx.router.go("$", null, { force: true, location: 2 });
        
        // persistence
        Rx.Observable.merge(this.todos.listChanged, this.todos.itemChanged)
            .throttle(500)
            .subscribeOnNext(function () {
                localStorage.setItem(localStorageKey, JSON.stringify(this.todos.map(function (x) {
                    return { title: x.title(), completed: x.completed() };
            })));
        }, this);
    };    
    
    // check local storage for todos
    var todos = JSON.parse(localStorage.getItem(localStorageKey));
    
    // bind a new instance of our view model to the page
    var viewModel = new ViewModel(todos || []);
    wx.applyBindings(viewModel);
}());
