// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.

;(function (undefined) {

  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  var root = (objectTypes[typeof window] && window) || this,
    freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports,
    freeModule = objectTypes[typeof module] && module && !module.nodeType && module,
    moduleExports = freeModule && freeModule.exports === freeExports && freeExports,
    freeGlobal = objectTypes[typeof global] && global;

  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }

  var Rx = {
      internals: {},
      config: {
        Promise: root.Promise
      },
      helpers: { }
  };

  // Defaults
  var noop = Rx.helpers.noop = function () { },
    notDefined = Rx.helpers.notDefined = function (x) { return typeof x === 'undefined'; },
    identity = Rx.helpers.identity = function (x) { return x; },
    pluck = Rx.helpers.pluck = function (property) { return function (x) { return x[property]; }; },
    just = Rx.helpers.just = function (value) { return function () { return value; }; },
    defaultNow = Rx.helpers.defaultNow = Date.now,
    defaultComparer = Rx.helpers.defaultComparer = function (x, y) { return isEqual(x, y); },
    defaultSubComparer = Rx.helpers.defaultSubComparer = function (x, y) { return x > y ? 1 : (x < y ? -1 : 0); },
    defaultKeySerializer = Rx.helpers.defaultKeySerializer = function (x) { return x.toString(); },
    defaultError = Rx.helpers.defaultError = function (err) { throw err; },
    isPromise = Rx.helpers.isPromise = function (p) { return !!p && typeof p.then === 'function'; },
    asArray = Rx.helpers.asArray = function () { return Array.prototype.slice.call(arguments); },
    not = Rx.helpers.not = function (a) { return !a; },
    isFunction = Rx.helpers.isFunction = (function () {

      var isFn = function (value) {
        return typeof value == 'function' || false;
      }

      // fallback for older versions of Chrome and Safari
      if (isFn(/x/)) {
        isFn = function(value) {
          return typeof value == 'function' && toString.call(value) == '[object Function]';
        };
      }

      return isFn;
    }());

  function cloneArray(arr) { for(var a = [], i = 0, len = arr.length; i < len; i++) { a.push(arr[i]); } return a;}

  Rx.config.longStackSupport = false;
  var hasStacks = false;
  try {
    throw new Error();
  } catch (e) {
    hasStacks = !!e.stack;
  }

  // All code after this point will be filtered from stack traces reported by RxJS
  var rStartingLine = captureLine(), rFileName;

  var STACK_JUMP_SEPARATOR = "From previous event:";

  function makeStackTraceLong(error, observable) {
      // If possible, transform the error stack trace by removing Node and RxJS
      // cruft, then concatenating with the stack trace of `observable`.
      if (hasStacks &&
          observable.stack &&
          typeof error === "object" &&
          error !== null &&
          error.stack &&
          error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
      ) {
        var stacks = [];
        for (var o = observable; !!o; o = o.source) {
          if (o.stack) {
            stacks.unshift(o.stack);
          }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        error.stack = filterStackString(concatedStacks);
    }
  }

  function filterStackString(stackString) {
    var lines = stackString.split("\n"),
        desiredLines = [];
    for (var i = 0, len = lines.length; i < len; i++) {
      var line = lines[i];

      if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
        desiredLines.push(line);
      }
    }
    return desiredLines.join("\n");
  }

  function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
    if (!fileNameAndLineNumber) {
      return false;
    }
    var fileName = fileNameAndLineNumber[0], lineNumber = fileNameAndLineNumber[1];

    return fileName === rFileName &&
      lineNumber >= rStartingLine &&
      lineNumber <= rEndingLine;
  }

  function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
      stackLine.indexOf("(node.js:") !== -1;
  }

  function captureLine() {
    if (!hasStacks) { return; }

    try {
      throw new Error();
    } catch (e) {
      var lines = e.stack.split("\n");
      var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
      var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
      if (!fileNameAndLineNumber) { return; }

      rFileName = fileNameAndLineNumber[0];
      return fileNameAndLineNumber[1];
    }
  }

  function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) { return [attempt1[1], Number(attempt1[2])]; }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) { return [attempt2[1], Number(attempt2[2])]; }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) { return [attempt3[1], Number(attempt3[2])]; }
  }

  var EmptyError = Rx.EmptyError = function() {
    this.message = 'Sequence contains no elements.';
    Error.call(this);
  };
  EmptyError.prototype = Error.prototype;

  var ObjectDisposedError = Rx.ObjectDisposedError = function() {
    this.message = 'Object has been disposed';
    Error.call(this);
  };
  ObjectDisposedError.prototype = Error.prototype;

  var ArgumentOutOfRangeError = Rx.ArgumentOutOfRangeError = function () {
    this.message = 'Argument out of range';
    Error.call(this);
  };
  ArgumentOutOfRangeError.prototype = Error.prototype;

  var NotSupportedError = Rx.NotSupportedError = function (message) {
    this.message = message || 'This operation is not supported';
    Error.call(this);
  };
  NotSupportedError.prototype = Error.prototype;

  var NotImplementedError = Rx.NotImplementedError = function (message) {
    this.message = message || 'This operation is not implemented';
    Error.call(this);
  };
  NotImplementedError.prototype = Error.prototype;

  var notImplemented = Rx.helpers.notImplemented = function () {
    throw new NotImplementedError();
  };

  var notSupported = Rx.helpers.notSupported = function () {
    throw new NotSupportedError();
  };

  // Shim in iterator support
  var $iterator$ = (typeof Symbol === 'function' && Symbol.iterator) ||
    '_es6shim_iterator_';
  // Bug for mozilla version
  if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
    $iterator$ = '@@iterator';
  }

  var doneEnumerator = Rx.doneEnumerator = { done: true, value: undefined };

  var isIterable = Rx.helpers.isIterable = function (o) {
    return o[$iterator$] !== undefined;
  }

  var isArrayLike = Rx.helpers.isArrayLike = function (o) {
    return o && o.length !== undefined;
  }

  Rx.helpers.iterator = $iterator$;

  var bindCallback = Rx.internals.bindCallback = function (func, thisArg, argCount) {
    if (typeof thisArg === 'undefined') { return func; }
    switch(argCount) {
      case 0:
        return function() {
          return func.call(thisArg)
        };
      case 1:
        return function(arg) {
          return func.call(thisArg, arg);
        }
      case 2:
        return function(value, index) {
          return func.call(thisArg, value, index);
        };
      case 3:
        return function(value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };
    }

    return function() {
      return func.apply(thisArg, arguments);
    };
  };

  /** Used to determine if values are of the language type Object */
  var dontEnums = ['toString',
    'toLocaleString',
    'valueOf',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'constructor'],
  dontEnumsLength = dontEnums.length;

  /** `Object#toString` result shortcuts */
  var argsClass = '[object Arguments]',
    arrayClass = '[object Array]',
    boolClass = '[object Boolean]',
    dateClass = '[object Date]',
    errorClass = '[object Error]',
    funcClass = '[object Function]',
    numberClass = '[object Number]',
    objectClass = '[object Object]',
    regexpClass = '[object RegExp]',
    stringClass = '[object String]';

  var toString = Object.prototype.toString,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    supportsArgsClass = toString.call(arguments) == argsClass, // For less <IE9 && FF<4
    supportNodeClass,
    errorProto = Error.prototype,
    objectProto = Object.prototype,
    stringProto = String.prototype,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

  try {
    supportNodeClass = !(toString.call(document) == objectClass && !({ 'toString': 0 } + ''));
  } catch (e) {
    supportNodeClass = true;
  }

  var nonEnumProps = {};
  nonEnumProps[arrayClass] = nonEnumProps[dateClass] = nonEnumProps[numberClass] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
  nonEnumProps[boolClass] = nonEnumProps[stringClass] = { 'constructor': true, 'toString': true, 'valueOf': true };
  nonEnumProps[errorClass] = nonEnumProps[funcClass] = nonEnumProps[regexpClass] = { 'constructor': true, 'toString': true };
  nonEnumProps[objectClass] = { 'constructor': true };

  var support = {};
  (function () {
    var ctor = function() { this.x = 1; },
      props = [];

    ctor.prototype = { 'valueOf': 1, 'y': 1 };
    for (var key in new ctor) { props.push(key); }
    for (key in arguments) { }

    // Detect if `name` or `message` properties of `Error.prototype` are enumerable by default.
    support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');

    // Detect if `prototype` properties are enumerable by default.
    support.enumPrototypes = propertyIsEnumerable.call(ctor, 'prototype');

    // Detect if `arguments` object indexes are non-enumerable
    support.nonEnumArgs = key != 0;

    // Detect if properties shadowing those on `Object.prototype` are non-enumerable.
    support.nonEnumShadows = !/valueOf/.test(props);
  }(1));

  var isObject = Rx.internals.isObject = function(value) {
    var type = typeof value;
    return value && (type == 'function' || type == 'object') || false;
  };

  function keysIn(object) {
    var result = [];
    if (!isObject(object)) {
      return result;
    }
    if (support.nonEnumArgs && object.length && isArguments(object)) {
      object = slice.call(object);
    }
    var skipProto = support.enumPrototypes && typeof object == 'function',
        skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error);

    for (var key in object) {
      if (!(skipProto && key == 'prototype') &&
          !(skipErrorProps && (key == 'message' || key == 'name'))) {
        result.push(key);
      }
    }

    if (support.nonEnumShadows && object !== objectProto) {
      var ctor = object.constructor,
          index = -1,
          length = dontEnumsLength;

      if (object === (ctor && ctor.prototype)) {
        var className = object === stringProto ? stringClass : object === errorProto ? errorClass : toString.call(object),
            nonEnum = nonEnumProps[className];
      }
      while (++index < length) {
        key = dontEnums[index];
        if (!(nonEnum && nonEnum[key]) && hasOwnProperty.call(object, key)) {
          result.push(key);
        }
      }
    }
    return result;
  }

  function internalFor(object, callback, keysFunc) {
    var index = -1,
      props = keysFunc(object),
      length = props.length;

    while (++index < length) {
      var key = props[index];
      if (callback(object[key], key, object) === false) {
        break;
      }
    }
    return object;
  }

  function internalForIn(object, callback) {
    return internalFor(object, callback, keysIn);
  }

  function isNode(value) {
    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
    // methods that are `typeof` "string" and still can coerce nodes to strings
    return typeof value.toString != 'function' && typeof (value + '') == 'string';
  }

  var isArguments = function(value) {
    return (value && typeof value == 'object') ? toString.call(value) == argsClass : false;
  }

  // fallback for browsers that can't detect `arguments` objects by [[Class]]
  if (!supportsArgsClass) {
    isArguments = function(value) {
      return (value && typeof value == 'object') ? hasOwnProperty.call(value, 'callee') : false;
    };
  }

  var isEqual = Rx.internals.isEqual = function (x, y) {
    return deepEquals(x, y, [], []);
  };

  /** @private
   * Used for deep comparison
   **/
  function deepEquals(a, b, stackA, stackB) {
    // exit early for identical values
    if (a === b) {
      // treat `+0` vs. `-0` as not equal
      return a !== 0 || (1 / a == 1 / b);
    }

    var type = typeof a,
        otherType = typeof b;

    // exit early for unlike primitive values
    if (a === a && (a == null || b == null ||
        (type != 'function' && type != 'object' && otherType != 'function' && otherType != 'object'))) {
      return false;
    }

    // compare [[Class]] names
    var className = toString.call(a),
        otherClass = toString.call(b);

    if (className == argsClass) {
      className = objectClass;
    }
    if (otherClass == argsClass) {
      otherClass = objectClass;
    }
    if (className != otherClass) {
      return false;
    }
    switch (className) {
      case boolClass:
      case dateClass:
        // coerce dates and booleans to numbers, dates to milliseconds and booleans
        // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
        return +a == +b;

      case numberClass:
        // treat `NaN` vs. `NaN` as equal
        return (a != +a) ?
          b != +b :
          // but treat `-0` vs. `+0` as not equal
          (a == 0 ? (1 / a == 1 / b) : a == +b);

      case regexpClass:
      case stringClass:
        // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
        // treat string primitives and their corresponding object instances as equal
        return a == String(b);
    }
    var isArr = className == arrayClass;
    if (!isArr) {

      // exit for functions and DOM nodes
      if (className != objectClass || (!support.nodeClass && (isNode(a) || isNode(b)))) {
        return false;
      }
      // in older versions of Opera, `arguments` objects have `Array` constructors
      var ctorA = !support.argsObject && isArguments(a) ? Object : a.constructor,
          ctorB = !support.argsObject && isArguments(b) ? Object : b.constructor;

      // non `Object` object instances with different constructors are not equal
      if (ctorA != ctorB &&
            !(hasOwnProperty.call(a, 'constructor') && hasOwnProperty.call(b, 'constructor')) &&
            !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
            ('constructor' in a && 'constructor' in b)
          ) {
        return false;
      }
    }
    // assume cyclic structures are equal
    // the algorithm for detecting cyclic structures is adapted from ES 5.1
    // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
    var initedStack = !stackA;
    stackA || (stackA = []);
    stackB || (stackB = []);

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == a) {
        return stackB[length] == b;
      }
    }
    var size = 0;
    var result = true;

    // add `a` and `b` to the stack of traversed objects
    stackA.push(a);
    stackB.push(b);

    // recursively compare objects and arrays (susceptible to call stack limits)
    if (isArr) {
      // compare lengths to determine if a deep comparison is necessary
      length = a.length;
      size = b.length;
      result = size == length;

      if (result) {
        // deep compare the contents, ignoring non-numeric properties
        while (size--) {
          var index = length,
              value = b[size];

          if (!(result = deepEquals(a[size], value, stackA, stackB))) {
            break;
          }
        }
      }
    }
    else {
      // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
      // which, in this case, is more costly
      internalForIn(b, function(value, key, b) {
        if (hasOwnProperty.call(b, key)) {
          // count the number of properties.
          size++;
          // deep compare each property value.
          return (result = hasOwnProperty.call(a, key) && deepEquals(a[key], value, stackA, stackB));
        }
      });

      if (result) {
        // ensure both objects have the same number of properties
        internalForIn(a, function(value, key, a) {
          if (hasOwnProperty.call(a, key)) {
            // `size` will be `-1` if `a` has more properties than `b`
            return (result = --size > -1);
          }
        });
      }
    }
    stackA.pop();
    stackB.pop();

    return result;
  }

  var hasProp = {}.hasOwnProperty,
      slice = Array.prototype.slice;

  var inherits = this.inherits = Rx.internals.inherits = function (child, parent) {
    function __() { this.constructor = child; }
    __.prototype = parent.prototype;
    child.prototype = new __();
  };

  var addProperties = Rx.internals.addProperties = function (obj) {
    for(var sources = [], i = 1, len = arguments.length; i < len; i++) { sources.push(arguments[i]); }
    for (var idx = 0, ln = sources.length; idx < ln; idx++) {
      var source = sources[idx];
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  };

  // Rx Utils
  var addRef = Rx.internals.addRef = function (xs, r) {
    return new AnonymousObservable(function (observer) {
      return new CompositeDisposable(r.getDisposable(), xs.subscribe(observer));
    });
  };

  function arrayInitialize(count, factory) {
    var a = new Array(count);
    for (var i = 0; i < count; i++) {
      a[i] = factory();
    }
    return a;
  }

  var errorObj = {e: {}};
  var tryCatchTarget;
  function tryCatcher() {
    try {
      return tryCatchTarget.apply(this, arguments);
    } catch (e) {
      errorObj.e = e;
      return errorObj;
    }
  }
  function tryCatch(fn) {
    if (!isFunction(fn)) { throw new TypeError('fn must be a function'); }
    tryCatchTarget = fn;
    return tryCatcher;
  }
  function thrower(e) {
    throw e;
  }

  // Collections
  function IndexedItem(id, value) {
    this.id = id;
    this.value = value;
  }

  IndexedItem.prototype.compareTo = function (other) {
    var c = this.value.compareTo(other.value);
    c === 0 && (c = this.id - other.id);
    return c;
  };

  // Priority Queue for Scheduling
  var PriorityQueue = Rx.internals.PriorityQueue = function (capacity) {
    this.items = new Array(capacity);
    this.length = 0;
  };

  var priorityProto = PriorityQueue.prototype;
  priorityProto.isHigherPriority = function (left, right) {
    return this.items[left].compareTo(this.items[right]) < 0;
  };

  priorityProto.percolate = function (index) {
    if (index >= this.length || index < 0) { return; }
    var parent = index - 1 >> 1;
    if (parent < 0 || parent === index) { return; }
    if (this.isHigherPriority(index, parent)) {
      var temp = this.items[index];
      this.items[index] = this.items[parent];
      this.items[parent] = temp;
      this.percolate(parent);
    }
  };

  priorityProto.heapify = function (index) {
    +index || (index = 0);
    if (index >= this.length || index < 0) { return; }
    var left = 2 * index + 1,
        right = 2 * index + 2,
        first = index;
    if (left < this.length && this.isHigherPriority(left, first)) {
      first = left;
    }
    if (right < this.length && this.isHigherPriority(right, first)) {
      first = right;
    }
    if (first !== index) {
      var temp = this.items[index];
      this.items[index] = this.items[first];
      this.items[first] = temp;
      this.heapify(first);
    }
  };

  priorityProto.peek = function () { return this.items[0].value; };

  priorityProto.removeAt = function (index) {
    this.items[index] = this.items[--this.length];
    this.items[this.length] = undefined;
    this.heapify();
  };

  priorityProto.dequeue = function () {
    var result = this.peek();
    this.removeAt(0);
    return result;
  };

  priorityProto.enqueue = function (item) {
    var index = this.length++;
    this.items[index] = new IndexedItem(PriorityQueue.count++, item);
    this.percolate(index);
  };

  priorityProto.remove = function (item) {
    for (var i = 0; i < this.length; i++) {
      if (this.items[i].value === item) {
        this.removeAt(i);
        return true;
      }
    }
    return false;
  };
  PriorityQueue.count = 0;

  /**
   * Represents a group of disposable resources that are disposed together.
   * @constructor
   */
  var CompositeDisposable = Rx.CompositeDisposable = function () {
    var args = [], i, len;
    if (Array.isArray(arguments[0])) {
      args = arguments[0];
      len = args.length;
    } else {
      len = arguments.length;
      args = new Array(len);
      for(i = 0; i < len; i++) { args[i] = arguments[i]; }
    }
    for(i = 0; i < len; i++) {
      if (!isDisposable(args[i])) { throw new TypeError('Not a disposable'); }
    }
    this.disposables = args;
    this.isDisposed = false;
    this.length = args.length;
  };

  var CompositeDisposablePrototype = CompositeDisposable.prototype;

  /**
   * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
   * @param {Mixed} item Disposable to add.
   */
  CompositeDisposablePrototype.add = function (item) {
    if (this.isDisposed) {
      item.dispose();
    } else {
      this.disposables.push(item);
      this.length++;
    }
  };

  /**
   * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
   * @param {Mixed} item Disposable to remove.
   * @returns {Boolean} true if found; false otherwise.
   */
  CompositeDisposablePrototype.remove = function (item) {
    var shouldDispose = false;
    if (!this.isDisposed) {
      var idx = this.disposables.indexOf(item);
      if (idx !== -1) {
        shouldDispose = true;
        this.disposables.splice(idx, 1);
        this.length--;
        item.dispose();
      }
    }
    return shouldDispose;
  };

  /**
   *  Disposes all disposables in the group and removes them from the group.
   */
  CompositeDisposablePrototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      var len = this.disposables.length, currentDisposables = new Array(len);
      for(var i = 0; i < len; i++) { currentDisposables[i] = this.disposables[i]; }
      this.disposables = [];
      this.length = 0;

      for (i = 0; i < len; i++) {
        currentDisposables[i].dispose();
      }
    }
  };

  /**
   * Provides a set of static methods for creating Disposables.
   * @param {Function} dispose Action to run during the first call to dispose. The action is guaranteed to be run at most once.
   */
  var Disposable = Rx.Disposable = function (action) {
    this.isDisposed = false;
    this.action = action || noop;
  };

  /** Performs the task of cleaning up resources. */
  Disposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.action();
      this.isDisposed = true;
    }
  };

  /**
   * Creates a disposable object that invokes the specified action when disposed.
   * @param {Function} dispose Action to run during the first call to dispose. The action is guaranteed to be run at most once.
   * @return {Disposable} The disposable object that runs the given action upon disposal.
   */
  var disposableCreate = Disposable.create = function (action) { return new Disposable(action); };

  /**
   * Gets the disposable that does nothing when disposed.
   */
  var disposableEmpty = Disposable.empty = { dispose: noop };

  /**
   * Validates whether the given object is a disposable
   * @param {Object} Object to test whether it has a dispose method
   * @returns {Boolean} true if a disposable object, else false.
   */
  var isDisposable = Disposable.isDisposable = function (d) {
    return d && isFunction(d.dispose);
  };

  var checkDisposed = Disposable.checkDisposed = function (disposable) {
    if (disposable.isDisposed) { throw new ObjectDisposedError(); }
  };

  // Single assignment
  var SingleAssignmentDisposable = Rx.SingleAssignmentDisposable = function () {
    this.isDisposed = false;
    this.current = null;
  };
  SingleAssignmentDisposable.prototype.getDisposable = function () {
    return this.current;
  };
  SingleAssignmentDisposable.prototype.setDisposable = function (value) {
    if (this.current) { throw new Error('Disposable has already been assigned'); }
    var shouldDispose = this.isDisposed;
    !shouldDispose && (this.current = value);
    shouldDispose && value && value.dispose();
  };
  SingleAssignmentDisposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      var old = this.current;
      this.current = null;
    }
    old && old.dispose();
  };

  // Multiple assignment disposable
  var SerialDisposable = Rx.SerialDisposable = function () {
    this.isDisposed = false;
    this.current = null;
  };
  SerialDisposable.prototype.getDisposable = function () {
    return this.current;
  };
  SerialDisposable.prototype.setDisposable = function (value) {
    var shouldDispose = this.isDisposed;
    if (!shouldDispose) {
      var old = this.current;
      this.current = value;
    }
    old && old.dispose();
    shouldDispose && value && value.dispose();
  };
  SerialDisposable.prototype.dispose = function () {
    if (!this.isDisposed) {
      this.isDisposed = true;
      var old = this.current;
      this.current = null;
    }
    old && old.dispose();
  };

  /**
   * Represents a disposable resource that only disposes its underlying disposable resource when all dependent disposable objects have been disposed.
   */
  var RefCountDisposable = Rx.RefCountDisposable = (function () {

    function InnerDisposable(disposable) {
      this.disposable = disposable;
      this.disposable.count++;
      this.isInnerDisposed = false;
    }

    InnerDisposable.prototype.dispose = function () {
      if (!this.disposable.isDisposed && !this.isInnerDisposed) {
        this.isInnerDisposed = true;
        this.disposable.count--;
        if (this.disposable.count === 0 && this.disposable.isPrimaryDisposed) {
          this.disposable.isDisposed = true;
          this.disposable.underlyingDisposable.dispose();
        }
      }
    };

    /**
     * Initializes a new instance of the RefCountDisposable with the specified disposable.
     * @constructor
     * @param {Disposable} disposable Underlying disposable.
      */
    function RefCountDisposable(disposable) {
      this.underlyingDisposable = disposable;
      this.isDisposed = false;
      this.isPrimaryDisposed = false;
      this.count = 0;
    }

    /**
     * Disposes the underlying disposable only when all dependent disposables have been disposed
     */
    RefCountDisposable.prototype.dispose = function () {
      if (!this.isDisposed && !this.isPrimaryDisposed) {
        this.isPrimaryDisposed = true;
        if (this.count === 0) {
          this.isDisposed = true;
          this.underlyingDisposable.dispose();
        }
      }
    };

    /**
     * Returns a dependent disposable that when disposed decreases the refcount on the underlying disposable.
     * @returns {Disposable} A dependent disposable contributing to the reference count that manages the underlying disposable's lifetime.
     */
    RefCountDisposable.prototype.getDisposable = function () {
      return this.isDisposed ? disposableEmpty : new InnerDisposable(this);
    };

    return RefCountDisposable;
  })();

  function ScheduledDisposable(scheduler, disposable) {
    this.scheduler = scheduler;
    this.disposable = disposable;
    this.isDisposed = false;
  }

  function scheduleItem(s, self) {
    if (!self.isDisposed) {
      self.isDisposed = true;
      self.disposable.dispose();
    }
  }

  ScheduledDisposable.prototype.dispose = function () {
    this.scheduler.scheduleWithState(this, scheduleItem);
  };

  var ScheduledItem = Rx.internals.ScheduledItem = function (scheduler, state, action, dueTime, comparer) {
    this.scheduler = scheduler;
    this.state = state;
    this.action = action;
    this.dueTime = dueTime;
    this.comparer = comparer || defaultSubComparer;
    this.disposable = new SingleAssignmentDisposable();
  }

  ScheduledItem.prototype.invoke = function () {
    this.disposable.setDisposable(this.invokeCore());
  };

  ScheduledItem.prototype.compareTo = function (other) {
    return this.comparer(this.dueTime, other.dueTime);
  };

  ScheduledItem.prototype.isCancelled = function () {
    return this.disposable.isDisposed;
  };

  ScheduledItem.prototype.invokeCore = function () {
    return this.action(this.scheduler, this.state);
  };

  /** Provides a set of static properties to access commonly used schedulers. */
  var Scheduler = Rx.Scheduler = (function () {

    function Scheduler(now, schedule, scheduleRelative, scheduleAbsolute) {
      this.now = now;
      this._schedule = schedule;
      this._scheduleRelative = scheduleRelative;
      this._scheduleAbsolute = scheduleAbsolute;
    }

    /** Determines whether the given object is a scheduler */
    Scheduler.isScheduler = function (s) {
      return s instanceof Scheduler;
    }

    function invokeAction(scheduler, action) {
      action();
      return disposableEmpty;
    }

    var schedulerProto = Scheduler.prototype;

    /**
     * Schedules an action to be executed.
     * @param {Function} action Action to execute.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.schedule = function (action) {
      return this._schedule(action, invokeAction);
    };

    /**
     * Schedules an action to be executed.
     * @param state State passed to the action to be executed.
     * @param {Function} action Action to be executed.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleWithState = function (state, action) {
      return this._schedule(state, action);
    };

    /**
     * Schedules an action to be executed after the specified relative due time.
     * @param {Function} action Action to execute.
     * @param {Number} dueTime Relative time after which to execute the action.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleWithRelative = function (dueTime, action) {
      return this._scheduleRelative(action, dueTime, invokeAction);
    };

    /**
     * Schedules an action to be executed after dueTime.
     * @param state State passed to the action to be executed.
     * @param {Function} action Action to be executed.
     * @param {Number} dueTime Relative time after which to execute the action.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleWithRelativeAndState = function (state, dueTime, action) {
      return this._scheduleRelative(state, dueTime, action);
    };

    /**
     * Schedules an action to be executed at the specified absolute due time.
     * @param {Function} action Action to execute.
     * @param {Number} dueTime Absolute time at which to execute the action.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
      */
    schedulerProto.scheduleWithAbsolute = function (dueTime, action) {
      return this._scheduleAbsolute(action, dueTime, invokeAction);
    };

    /**
     * Schedules an action to be executed at dueTime.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Function} action Action to be executed.
     * @param {Number}dueTime Absolute time at which to execute the action.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleWithAbsoluteAndState = function (state, dueTime, action) {
      return this._scheduleAbsolute(state, dueTime, action);
    };

    /** Gets the current time according to the local machine's system clock. */
    Scheduler.now = defaultNow;

    /**
     * Normalizes the specified TimeSpan value to a positive value.
     * @param {Number} timeSpan The time span value to normalize.
     * @returns {Number} The specified TimeSpan value if it is zero or positive; otherwise, 0
     */
    Scheduler.normalize = function (timeSpan) {
      timeSpan < 0 && (timeSpan = 0);
      return timeSpan;
    };

    return Scheduler;
  }());

  var normalizeTime = Scheduler.normalize, isScheduler = Scheduler.isScheduler;

  (function (schedulerProto) {

    function invokeRecImmediate(scheduler, pair) {
      var state = pair[0], action = pair[1], group = new CompositeDisposable();

      function recursiveAction(state1) {
        action(state1, function (state2) {
          var isAdded = false, isDone = false,
          d = scheduler.scheduleWithState(state2, function (scheduler1, state3) {
            if (isAdded) {
              group.remove(d);
            } else {
              isDone = true;
            }
            recursiveAction(state3);
            return disposableEmpty;
          });
          if (!isDone) {
            group.add(d);
            isAdded = true;
          }
        });
      }

      recursiveAction(state);
      return group;
    }

    function invokeRecDate(scheduler, pair, method) {
      var state = pair[0], action = pair[1], group = new CompositeDisposable();
      function recursiveAction(state1) {
        action(state1, function (state2, dueTime1) {
          var isAdded = false, isDone = false,
          d = scheduler[method](state2, dueTime1, function (scheduler1, state3) {
            if (isAdded) {
              group.remove(d);
            } else {
              isDone = true;
            }
            recursiveAction(state3);
            return disposableEmpty;
          });
          if (!isDone) {
            group.add(d);
            isAdded = true;
          }
        });
      };
      recursiveAction(state);
      return group;
    }

    function scheduleInnerRecursive(action, self) {
      action(function(dt) { self(action, dt); });
    }

    /**
     * Schedules an action to be executed recursively.
     * @param {Function} action Action to execute recursively. The parameter passed to the action is used to trigger recursive scheduling of the action.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursive = function (action) {
      return this.scheduleRecursiveWithState(action, function (_action, self) {
        _action(function () { self(_action); }); });
    };

    /**
     * Schedules an action to be executed recursively.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in recursive invocation state.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursiveWithState = function (state, action) {
      return this.scheduleWithState([state, action], invokeRecImmediate);
    };

    /**
     * Schedules an action to be executed recursively after a specified relative due time.
     * @param {Function} action Action to execute recursively. The parameter passed to the action is used to trigger recursive scheduling of the action at the specified relative time.
     * @param {Number}dueTime Relative time after which to execute the action for the first time.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursiveWithRelative = function (dueTime, action) {
      return this.scheduleRecursiveWithRelativeAndState(action, dueTime, scheduleInnerRecursive);
    };

    /**
     * Schedules an action to be executed recursively after a specified relative due time.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in the recursive due time and invocation state.
     * @param {Number}dueTime Relative time after which to execute the action for the first time.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursiveWithRelativeAndState = function (state, dueTime, action) {
      return this._scheduleRelative([state, action], dueTime, function (s, p) {
        return invokeRecDate(s, p, 'scheduleWithRelativeAndState');
      });
    };

    /**
     * Schedules an action to be executed recursively at a specified absolute due time.
     * @param {Function} action Action to execute recursively. The parameter passed to the action is used to trigger recursive scheduling of the action at the specified absolute time.
     * @param {Number}dueTime Absolute time at which to execute the action for the first time.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursiveWithAbsolute = function (dueTime, action) {
      return this.scheduleRecursiveWithAbsoluteAndState(action, dueTime, scheduleInnerRecursive);
    };

    /**
     * Schedules an action to be executed recursively at a specified absolute due time.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in the recursive due time and invocation state.
     * @param {Number}dueTime Absolute time at which to execute the action for the first time.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    schedulerProto.scheduleRecursiveWithAbsoluteAndState = function (state, dueTime, action) {
      return this._scheduleAbsolute([state, action], dueTime, function (s, p) {
        return invokeRecDate(s, p, 'scheduleWithAbsoluteAndState');
      });
    };
  }(Scheduler.prototype));

  (function (schedulerProto) {

    /**
     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be scheduled using window.setInterval for the base implementation.
     * @param {Number} period Period for running the work periodically.
     * @param {Function} action Action to be executed.
     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
     */
    Scheduler.prototype.schedulePeriodic = function (period, action) {
      return this.schedulePeriodicWithState(null, period, action);
    };

    /**
     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be scheduled using window.setInterval for the base implementation.
     * @param {Mixed} state Initial state passed to the action upon the first iteration.
     * @param {Number} period Period for running the work periodically.
     * @param {Function} action Action to be executed, potentially updating the state.
     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
     */
    Scheduler.prototype.schedulePeriodicWithState = function(state, period, action) {
      if (typeof root.setInterval === 'undefined') { throw new NotSupportedError(); }
      period = normalizeTime(period);
      var s = state, id = root.setInterval(function () { s = action(s); }, period);
      return disposableCreate(function () { root.clearInterval(id); });
    };

  }(Scheduler.prototype));

  (function (schedulerProto) {
    /**
     * Returns a scheduler that wraps the original scheduler, adding exception handling for scheduled actions.
     * @param {Function} handler Handler that's run if an exception is caught. The exception will be rethrown if the handler returns false.
     * @returns {Scheduler} Wrapper around the original scheduler, enforcing exception handling.
     */
    schedulerProto.catchError = schedulerProto['catch'] = function (handler) {
      return new CatchScheduler(this, handler);
    };
  }(Scheduler.prototype));

  var SchedulePeriodicRecursive = Rx.internals.SchedulePeriodicRecursive = (function () {
    function tick(command, recurse) {
      recurse(0, this._period);
      try {
        this._state = this._action(this._state);
      } catch (e) {
        this._cancel.dispose();
        throw e;
      }
    }

    function SchedulePeriodicRecursive(scheduler, state, period, action) {
      this._scheduler = scheduler;
      this._state = state;
      this._period = period;
      this._action = action;
    }

    SchedulePeriodicRecursive.prototype.start = function () {
      var d = new SingleAssignmentDisposable();
      this._cancel = d;
      d.setDisposable(this._scheduler.scheduleRecursiveWithRelativeAndState(0, this._period, tick.bind(this)));

      return d;
    };

    return SchedulePeriodicRecursive;
  }());

  /** Gets a scheduler that schedules work immediately on the current thread. */
  var immediateScheduler = Scheduler.immediate = (function () {
    function scheduleNow(state, action) { return action(this, state); }
    return new Scheduler(defaultNow, scheduleNow, notSupported, notSupported);
  }());

  /**
   * Gets a scheduler that schedules work as soon as possible on the current thread.
   */
  var currentThreadScheduler = Scheduler.currentThread = (function () {
    var queue;

    function runTrampoline () {
      while (queue.length > 0) {
        var item = queue.dequeue();
        !item.isCancelled() && item.invoke();
      }
    }

    function scheduleNow(state, action) {
      var si = new ScheduledItem(this, state, action, this.now());

      if (!queue) {
        queue = new PriorityQueue(4);
        queue.enqueue(si);

        var result = tryCatch(runTrampoline)();
        queue = null;
        if (result === errorObj) { return thrower(result.e); }
      } else {
        queue.enqueue(si);
      }
      return si.disposable;
    }

    var currentScheduler = new Scheduler(defaultNow, scheduleNow, notSupported, notSupported);
    currentScheduler.scheduleRequired = function () { return !queue; };

    return currentScheduler;
  }());

  var scheduleMethod, clearMethod;

  var localTimer = (function () {
    var localSetTimeout, localClearTimeout = noop;
    if (!!root.setTimeout) {
      localSetTimeout = root.setTimeout;
      localClearTimeout = root.clearTimeout;
    } else if (!!root.WScript) {
      localSetTimeout = function (fn, time) {
        root.WScript.Sleep(time);
        fn();
      };
    } else {
      throw new NotSupportedError();
    }

    return {
      setTimeout: localSetTimeout,
      clearTimeout: localClearTimeout
    };
  }());
  var localSetTimeout = localTimer.setTimeout,
    localClearTimeout = localTimer.clearTimeout;

  (function () {

    var nextHandle = 1, tasksByHandle = {}, currentlyRunning = false;

    clearMethod = function (handle) {
      delete tasksByHandle[handle];
    };

    function runTask(handle) {
      if (currentlyRunning) {
        localSetTimeout(function () { runTask(handle) }, 0);
      } else {
        var task = tasksByHandle[handle];
        if (task) {
          currentlyRunning = true;
          var result = tryCatch(task)();
          clearMethod(handle);
          currentlyRunning = false;
          if (result === errorObj) { return thrower(result.e); }
        }
      }
    }

    var reNative = RegExp('^' +
      String(toString)
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/toString| for [^\]]+/g, '.*?') + '$'
    );

    var setImmediate = typeof (setImmediate = freeGlobal && moduleExports && freeGlobal.setImmediate) == 'function' &&
      !reNative.test(setImmediate) && setImmediate;

    function postMessageSupported () {
      // Ensure not in a worker
      if (!root.postMessage || root.importScripts) { return false; }
      var isAsync = false, oldHandler = root.onmessage;
      // Test for async
      root.onmessage = function () { isAsync = true; };
      root.postMessage('', '*');
      root.onmessage = oldHandler;

      return isAsync;
    }

    // Use in order, setImmediate, nextTick, postMessage, MessageChannel, script readystatechanged, setTimeout
    if (isFunction(setImmediate)) {
      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        setImmediate(function () { runTask(id); });

        return id;
      };
    } else if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        process.nextTick(function () { runTask(id); });

        return id;
      };
    } else if (postMessageSupported()) {
      var MSG_PREFIX = 'ms.rx.schedule' + Math.random();

      function onGlobalPostMessage(event) {
        // Only if we're a match to avoid any other global events
        if (typeof event.data === 'string' && event.data.substring(0, MSG_PREFIX.length) === MSG_PREFIX) {
          runTask(event.data.substring(MSG_PREFIX.length));
        }
      }

      if (root.addEventListener) {
        root.addEventListener('message', onGlobalPostMessage, false);
      } else if (root.attachEvent) {
        root.attachEvent('onmessage', onGlobalPostMessage);
      } else {
        root.onmessage = onGlobalPostMessage;
      }

      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        root.postMessage(MSG_PREFIX + currentId, '*');
        return id;
      };
    } else if (!!root.MessageChannel) {
      var channel = new root.MessageChannel();

      channel.port1.onmessage = function (e) { runTask(e.data); };

      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        channel.port2.postMessage(id);
        return id;
      };
    } else if ('document' in root && 'onreadystatechange' in root.document.createElement('script')) {

      scheduleMethod = function (action) {
        var scriptElement = root.document.createElement('script');
        var id = nextHandle++;
        tasksByHandle[id] = action;

        scriptElement.onreadystatechange = function () {
          runTask(id);
          scriptElement.onreadystatechange = null;
          scriptElement.parentNode.removeChild(scriptElement);
          scriptElement = null;
        };
        root.document.documentElement.appendChild(scriptElement);
        return id;
      };

    } else {
      scheduleMethod = function (action) {
        var id = nextHandle++;
        tasksByHandle[id] = action;
        localSetTimeout(function () {
          runTask(id);
        }, 0);

        return id;
      };
    }
  }());

  /**
   * Gets a scheduler that schedules work via a timed callback based upon platform.
   */
  var timeoutScheduler = Scheduler.timeout = Scheduler['default'] = (function () {

    function scheduleNow(state, action) {
      var scheduler = this, disposable = new SingleAssignmentDisposable();
      var id = scheduleMethod(function () {
        !disposable.isDisposed && disposable.setDisposable(action(scheduler, state));
      });
      return new CompositeDisposable(disposable, disposableCreate(function () {
        clearMethod(id);
      }));
    }

    function scheduleRelative(state, dueTime, action) {
      var scheduler = this, dt = Scheduler.normalize(dueTime), disposable = new SingleAssignmentDisposable();
      if (dt === 0) { return scheduler.scheduleWithState(state, action); }
      var id = localSetTimeout(function () {
        !disposable.isDisposed && disposable.setDisposable(action(scheduler, state));
      }, dt);
      return new CompositeDisposable(disposable, disposableCreate(function () {
        localClearTimeout(id);
      }));
    }

    function scheduleAbsolute(state, dueTime, action) {
      return this.scheduleWithRelativeAndState(state, dueTime - this.now(), action);
    }

    return new Scheduler(defaultNow, scheduleNow, scheduleRelative, scheduleAbsolute);
  })();

  var CatchScheduler = (function (__super__) {

    function scheduleNow(state, action) {
      return this._scheduler.scheduleWithState(state, this._wrap(action));
    }

    function scheduleRelative(state, dueTime, action) {
      return this._scheduler.scheduleWithRelativeAndState(state, dueTime, this._wrap(action));
    }

    function scheduleAbsolute(state, dueTime, action) {
      return this._scheduler.scheduleWithAbsoluteAndState(state, dueTime, this._wrap(action));
    }

    inherits(CatchScheduler, __super__);

    function CatchScheduler(scheduler, handler) {
      this._scheduler = scheduler;
      this._handler = handler;
      this._recursiveOriginal = null;
      this._recursiveWrapper = null;
      __super__.call(this, this._scheduler.now.bind(this._scheduler), scheduleNow, scheduleRelative, scheduleAbsolute);
    }

    CatchScheduler.prototype._clone = function (scheduler) {
        return new CatchScheduler(scheduler, this._handler);
    };

    CatchScheduler.prototype._wrap = function (action) {
      var parent = this;
      return function (self, state) {
        try {
          return action(parent._getRecursiveWrapper(self), state);
        } catch (e) {
          if (!parent._handler(e)) { throw e; }
          return disposableEmpty;
        }
      };
    };

    CatchScheduler.prototype._getRecursiveWrapper = function (scheduler) {
      if (this._recursiveOriginal !== scheduler) {
        this._recursiveOriginal = scheduler;
        var wrapper = this._clone(scheduler);
        wrapper._recursiveOriginal = scheduler;
        wrapper._recursiveWrapper = wrapper;
        this._recursiveWrapper = wrapper;
      }
      return this._recursiveWrapper;
    };

    CatchScheduler.prototype.schedulePeriodicWithState = function (state, period, action) {
      var self = this, failed = false, d = new SingleAssignmentDisposable();

      d.setDisposable(this._scheduler.schedulePeriodicWithState(state, period, function (state1) {
        if (failed) { return null; }
        try {
          return action(state1);
        } catch (e) {
          failed = true;
          if (!self._handler(e)) { throw e; }
          d.dispose();
          return null;
        }
      }));

      return d;
    };

    return CatchScheduler;
  }(Scheduler));

  /**
   *  Represents a notification to an observer.
   */
  var Notification = Rx.Notification = (function () {
    function Notification(kind, value, exception, accept, acceptObservable, toString) {
      this.kind = kind;
      this.value = value;
      this.exception = exception;
      this._accept = accept;
      this._acceptObservable = acceptObservable;
      this.toString = toString;
    }

    /**
     * Invokes the delegate corresponding to the notification or the observer's method corresponding to the notification and returns the produced result.
     *
     * @memberOf Notification
     * @param {Any} observerOrOnNext Delegate to invoke for an OnNext notification or Observer to invoke the notification on..
     * @param {Function} onError Delegate to invoke for an OnError notification.
     * @param {Function} onCompleted Delegate to invoke for an OnCompleted notification.
     * @returns {Any} Result produced by the observation.
     */
    Notification.prototype.accept = function (observerOrOnNext, onError, onCompleted) {
      return observerOrOnNext && typeof observerOrOnNext === 'object' ?
        this._acceptObservable(observerOrOnNext) :
        this._accept(observerOrOnNext, onError, onCompleted);
    };

    /**
     * Returns an observable sequence with a single notification.
     *
     * @memberOf Notifications
     * @param {Scheduler} [scheduler] Scheduler to send out the notification calls on.
     * @returns {Observable} The observable sequence that surfaces the behavior of the notification upon subscription.
     */
    Notification.prototype.toObservable = function (scheduler) {
      var self = this;
      isScheduler(scheduler) || (scheduler = immediateScheduler);
      return new AnonymousObservable(function (observer) {
        return scheduler.scheduleWithState(self, function (_, notification) {
          notification._acceptObservable(observer);
          notification.kind === 'N' && observer.onCompleted();
        });
      });
    };

    return Notification;
  })();

  /**
   * Creates an object that represents an OnNext notification to an observer.
   * @param {Any} value The value contained in the notification.
   * @returns {Notification} The OnNext notification containing the value.
   */
  var notificationCreateOnNext = Notification.createOnNext = (function () {
      function _accept(onNext) { return onNext(this.value); }
      function _acceptObservable(observer) { return observer.onNext(this.value); }
      function toString() { return 'OnNext(' + this.value + ')'; }

      return function (value) {
        return new Notification('N', value, null, _accept, _acceptObservable, toString);
      };
  }());

  /**
   * Creates an object that represents an OnError notification to an observer.
   * @param {Any} error The exception contained in the notification.
   * @returns {Notification} The OnError notification containing the exception.
   */
  var notificationCreateOnError = Notification.createOnError = (function () {
    function _accept (onNext, onError) { return onError(this.exception); }
    function _acceptObservable(observer) { return observer.onError(this.exception); }
    function toString () { return 'OnError(' + this.exception + ')'; }

    return function (e) {
      return new Notification('E', null, e, _accept, _acceptObservable, toString);
    };
  }());

  /**
   * Creates an object that represents an OnCompleted notification to an observer.
   * @returns {Notification} The OnCompleted notification.
   */
  var notificationCreateOnCompleted = Notification.createOnCompleted = (function () {
    function _accept (onNext, onError, onCompleted) { return onCompleted(); }
    function _acceptObservable(observer) { return observer.onCompleted(); }
    function toString () { return 'OnCompleted()'; }

    return function () {
      return new Notification('C', null, null, _accept, _acceptObservable, toString);
    };
  }());

  var Enumerator = Rx.internals.Enumerator = function (next) {
    this._next = next;
  };

  Enumerator.prototype.next = function () {
    return this._next();
  };

  Enumerator.prototype[$iterator$] = function () { return this; }

  var Enumerable = Rx.internals.Enumerable = function (iterator) {
    this._iterator = iterator;
  };

  Enumerable.prototype[$iterator$] = function () {
    return this._iterator();
  };

  Enumerable.prototype.concat = function () {
    var sources = this;
    return new AnonymousObservable(function (o) {
      var e = sources[$iterator$]();

      var isDisposed, subscription = new SerialDisposable();
      var cancelable = immediateScheduler.scheduleRecursive(function (self) {
        if (isDisposed) { return; }
        try {
          var currentItem = e.next();
        } catch (ex) {
          return o.onError(ex);
        }

        if (currentItem.done) {
          return o.onCompleted();
        }

        // Check if promise
        var currentValue = currentItem.value;
        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

        var d = new SingleAssignmentDisposable();
        subscription.setDisposable(d);
        d.setDisposable(currentValue.subscribe(
          function(x) { o.onNext(x); },
          function(err) { o.onError(err); },
          self)
        );
      });

      return new CompositeDisposable(subscription, cancelable, disposableCreate(function () {
        isDisposed = true;
      }));
    });
  };

  Enumerable.prototype.catchError = function () {
    var sources = this;
    return new AnonymousObservable(function (o) {
      var e = sources[$iterator$]();

      var isDisposed, subscription = new SerialDisposable();
      var cancelable = immediateScheduler.scheduleRecursiveWithState(null, function (lastException, self) {
        if (isDisposed) { return; }

        try {
          var currentItem = e.next();
        } catch (ex) {
          return observer.onError(ex);
        }

        if (currentItem.done) {
          if (lastException !== null) {
            o.onError(lastException);
          } else {
            o.onCompleted();
          }
          return;
        }

        // Check if promise
        var currentValue = currentItem.value;
        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

        var d = new SingleAssignmentDisposable();
        subscription.setDisposable(d);
        d.setDisposable(currentValue.subscribe(
          function(x) { o.onNext(x); },
          self,
          function() { o.onCompleted(); }));
      });
      return new CompositeDisposable(subscription, cancelable, disposableCreate(function () {
        isDisposed = true;
      }));
    });
  };


  Enumerable.prototype.catchErrorWhen = function (notificationHandler) {
    var sources = this;
    return new AnonymousObservable(function (o) {
      var exceptions = new Subject(),
        notifier = new Subject(),
        handled = notificationHandler(exceptions),
        notificationDisposable = handled.subscribe(notifier);

      var e = sources[$iterator$]();

      var isDisposed,
        lastException,
        subscription = new SerialDisposable();
      var cancelable = immediateScheduler.scheduleRecursive(function (self) {
        if (isDisposed) { return; }

        try {
          var currentItem = e.next();
        } catch (ex) {
          return o.onError(ex);
        }

        if (currentItem.done) {
          if (lastException) {
            o.onError(lastException);
          } else {
            o.onCompleted();
          }
          return;
        }

        // Check if promise
        var currentValue = currentItem.value;
        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));

        var outer = new SingleAssignmentDisposable();
        var inner = new SingleAssignmentDisposable();
        subscription.setDisposable(new CompositeDisposable(inner, outer));
        outer.setDisposable(currentValue.subscribe(
          function(x) { o.onNext(x); },
          function (exn) {
            inner.setDisposable(notifier.subscribe(self, function(ex) {
              o.onError(ex);
            }, function() {
              o.onCompleted();
            }));

            exceptions.onNext(exn);
          },
          function() { o.onCompleted(); }));
      });

      return new CompositeDisposable(notificationDisposable, subscription, cancelable, disposableCreate(function () {
        isDisposed = true;
      }));
    });
  };

  var enumerableRepeat = Enumerable.repeat = function (value, repeatCount) {
    if (repeatCount == null) { repeatCount = -1; }
    return new Enumerable(function () {
      var left = repeatCount;
      return new Enumerator(function () {
        if (left === 0) { return doneEnumerator; }
        if (left > 0) { left--; }
        return { done: false, value: value };
      });
    });
  };

  var enumerableOf = Enumerable.of = function (source, selector, thisArg) {
    if (selector) {
      var selectorFn = bindCallback(selector, thisArg, 3);
    }
    return new Enumerable(function () {
      var index = -1;
      return new Enumerator(
        function () {
          return ++index < source.length ?
            { done: false, value: !selector ? source[index] : selectorFn(source[index], index, source) } :
            doneEnumerator;
        });
    });
  };

  /**
   * Supports push-style iteration over an observable sequence.
   */
  var Observer = Rx.Observer = function () { };

  /**
   *  Creates a notification callback from an observer.
   * @returns The action that forwards its input notification to the underlying observer.
   */
  Observer.prototype.toNotifier = function () {
    var observer = this;
    return function (n) { return n.accept(observer); };
  };

  /**
   *  Hides the identity of an observer.
   * @returns An observer that hides the identity of the specified observer.
   */
  Observer.prototype.asObserver = function () {
    return new AnonymousObserver(this.onNext.bind(this), this.onError.bind(this), this.onCompleted.bind(this));
  };

  /**
   *  Checks access to the observer for grammar violations. This includes checking for multiple OnError or OnCompleted calls, as well as reentrancy in any of the observer methods.
   *  If a violation is detected, an Error is thrown from the offending observer method call.
   * @returns An observer that checks callbacks invocations against the observer grammar and, if the checks pass, forwards those to the specified observer.
   */
  Observer.prototype.checked = function () { return new CheckedObserver(this); };

  /**
   *  Creates an observer from the specified OnNext, along with optional OnError, and OnCompleted actions.
   * @param {Function} [onNext] Observer's OnNext action implementation.
   * @param {Function} [onError] Observer's OnError action implementation.
   * @param {Function} [onCompleted] Observer's OnCompleted action implementation.
   * @returns {Observer} The observer object implemented using the given actions.
   */
  var observerCreate = Observer.create = function (onNext, onError, onCompleted) {
    onNext || (onNext = noop);
    onError || (onError = defaultError);
    onCompleted || (onCompleted = noop);
    return new AnonymousObserver(onNext, onError, onCompleted);
  };

  /**
   *  Creates an observer from a notification callback.
   *
   * @static
   * @memberOf Observer
   * @param {Function} handler Action that handles a notification.
   * @returns The observer object that invokes the specified handler using a notification corresponding to each message it receives.
   */
  Observer.fromNotifier = function (handler, thisArg) {
    return new AnonymousObserver(function (x) {
      return handler.call(thisArg, notificationCreateOnNext(x));
    }, function (e) {
      return handler.call(thisArg, notificationCreateOnError(e));
    }, function () {
      return handler.call(thisArg, notificationCreateOnCompleted());
    });
  };

  /**
   * Schedules the invocation of observer methods on the given scheduler.
   * @param {Scheduler} scheduler Scheduler to schedule observer messages on.
   * @returns {Observer} Observer whose messages are scheduled on the given scheduler.
   */
  Observer.prototype.notifyOn = function (scheduler) {
    return new ObserveOnObserver(scheduler, this);
  };

  Observer.prototype.makeSafe = function(disposable) {
    return new AnonymousSafeObserver(this._onNext, this._onError, this._onCompleted, disposable);
  };

  /**
   * Abstract base class for implementations of the Observer class.
   * This base class enforces the grammar of observers where OnError and OnCompleted are terminal messages.
   */
  var AbstractObserver = Rx.internals.AbstractObserver = (function (__super__) {
    inherits(AbstractObserver, __super__);

    /**
     * Creates a new observer in a non-stopped state.
     */
    function AbstractObserver() {
      this.isStopped = false;
      __super__.call(this);
    }

    // Must be implemented by other observers
    AbstractObserver.prototype.next = notImplemented;
    AbstractObserver.prototype.error = notImplemented;
    AbstractObserver.prototype.completed = notImplemented;

    /**
     * Notifies the observer of a new element in the sequence.
     * @param {Any} value Next element in the sequence.
     */
    AbstractObserver.prototype.onNext = function (value) {
      if (!this.isStopped) { this.next(value); }
    };

    /**
     * Notifies the observer that an exception has occurred.
     * @param {Any} error The error that has occurred.
     */
    AbstractObserver.prototype.onError = function (error) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.error(error);
      }
    };

    /**
     * Notifies the observer of the end of the sequence.
     */
    AbstractObserver.prototype.onCompleted = function () {
      if (!this.isStopped) {
        this.isStopped = true;
        this.completed();
      }
    };

    /**
     * Disposes the observer, causing it to transition to the stopped state.
     */
    AbstractObserver.prototype.dispose = function () {
      this.isStopped = true;
    };

    AbstractObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.error(e);
        return true;
      }

      return false;
    };

    return AbstractObserver;
  }(Observer));

  /**
   * Class to create an Observer instance from delegate-based implementations of the on* methods.
   */
  var AnonymousObserver = Rx.AnonymousObserver = (function (__super__) {
    inherits(AnonymousObserver, __super__);

    /**
     * Creates an observer from the specified OnNext, OnError, and OnCompleted actions.
     * @param {Any} onNext Observer's OnNext action implementation.
     * @param {Any} onError Observer's OnError action implementation.
     * @param {Any} onCompleted Observer's OnCompleted action implementation.
     */
    function AnonymousObserver(onNext, onError, onCompleted) {
      __super__.call(this);
      this._onNext = onNext;
      this._onError = onError;
      this._onCompleted = onCompleted;
    }

    /**
     * Calls the onNext action.
     * @param {Any} value Next element in the sequence.
     */
    AnonymousObserver.prototype.next = function (value) {
      this._onNext(value);
    };

    /**
     * Calls the onError action.
     * @param {Any} error The error that has occurred.
     */
    AnonymousObserver.prototype.error = function (error) {
      this._onError(error);
    };

    /**
     *  Calls the onCompleted action.
     */
    AnonymousObserver.prototype.completed = function () {
      this._onCompleted();
    };

    return AnonymousObserver;
  }(AbstractObserver));

  var CheckedObserver = (function (__super__) {
    inherits(CheckedObserver, __super__);

    function CheckedObserver(observer) {
      __super__.call(this);
      this._observer = observer;
      this._state = 0; // 0 - idle, 1 - busy, 2 - done
    }

    var CheckedObserverPrototype = CheckedObserver.prototype;

    CheckedObserverPrototype.onNext = function (value) {
      this.checkAccess();
      var res = tryCatch(this._observer.onNext).call(this._observer, value);
      this._state = 0;
      res === errorObj && thrower(res.e);
    };

    CheckedObserverPrototype.onError = function (err) {
      this.checkAccess();
      var res = tryCatch(this._observer.onError).call(this._observer, err);
      this._state = 2;
      res === errorObj && thrower(res.e);
    };

    CheckedObserverPrototype.onCompleted = function () {
      this.checkAccess();
      var res = tryCatch(this._observer.onCompleted).call(this._observer);
      this._state = 2;
      res === errorObj && thrower(res.e);
    };

    CheckedObserverPrototype.checkAccess = function () {
      if (this._state === 1) { throw new Error('Re-entrancy detected'); }
      if (this._state === 2) { throw new Error('Observer completed'); }
      if (this._state === 0) { this._state = 1; }
    };

    return CheckedObserver;
  }(Observer));

  var ScheduledObserver = Rx.internals.ScheduledObserver = (function (__super__) {
    inherits(ScheduledObserver, __super__);

    function ScheduledObserver(scheduler, observer) {
      __super__.call(this);
      this.scheduler = scheduler;
      this.observer = observer;
      this.isAcquired = false;
      this.hasFaulted = false;
      this.queue = [];
      this.disposable = new SerialDisposable();
    }

    ScheduledObserver.prototype.next = function (value) {
      var self = this;
      this.queue.push(function () { self.observer.onNext(value); });
    };

    ScheduledObserver.prototype.error = function (e) {
      var self = this;
      this.queue.push(function () { self.observer.onError(e); });
    };

    ScheduledObserver.prototype.completed = function () {
      var self = this;
      this.queue.push(function () { self.observer.onCompleted(); });
    };

    ScheduledObserver.prototype.ensureActive = function () {
      var isOwner = false, parent = this;
      if (!this.hasFaulted && this.queue.length > 0) {
        isOwner = !this.isAcquired;
        this.isAcquired = true;
      }
      if (isOwner) {
        this.disposable.setDisposable(this.scheduler.scheduleRecursive(function (self) {
          var work;
          if (parent.queue.length > 0) {
            work = parent.queue.shift();
          } else {
            parent.isAcquired = false;
            return;
          }
          try {
            work();
          } catch (ex) {
            parent.queue = [];
            parent.hasFaulted = true;
            throw ex;
          }
          self();
        }));
      }
    };

    ScheduledObserver.prototype.dispose = function () {
      __super__.prototype.dispose.call(this);
      this.disposable.dispose();
    };

    return ScheduledObserver;
  }(AbstractObserver));

  var ObserveOnObserver = (function (__super__) {
    inherits(ObserveOnObserver, __super__);

    function ObserveOnObserver(scheduler, observer, cancel) {
      __super__.call(this, scheduler, observer);
      this._cancel = cancel;
    }

    ObserveOnObserver.prototype.next = function (value) {
      __super__.prototype.next.call(this, value);
      this.ensureActive();
    };

    ObserveOnObserver.prototype.error = function (e) {
      __super__.prototype.error.call(this, e);
      this.ensureActive();
    };

    ObserveOnObserver.prototype.completed = function () {
      __super__.prototype.completed.call(this);
      this.ensureActive();
    };

    ObserveOnObserver.prototype.dispose = function () {
      __super__.prototype.dispose.call(this);
      this._cancel && this._cancel.dispose();
      this._cancel = null;
    };

    return ObserveOnObserver;
  })(ScheduledObserver);

  var observableProto;

  /**
   * Represents a push-style collection.
   */
  var Observable = Rx.Observable = (function () {

    function Observable(subscribe) {
      if (Rx.config.longStackSupport && hasStacks) {
        try {
          throw new Error();
        } catch (e) {
          this.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
        }

        var self = this;
        this._subscribe = function (observer) {
          var oldOnError = observer.onError.bind(observer);

          observer.onError = function (err) {
            makeStackTraceLong(err, self);
            oldOnError(err);
          };

          return subscribe.call(self, observer);
        };
      } else {
        this._subscribe = subscribe;
      }
    }

    observableProto = Observable.prototype;

    /**
     *  Subscribes an observer to the observable sequence.
     *  @param {Mixed} [observerOrOnNext] The object that is to receive notifications or an action to invoke for each element in the observable sequence.
     *  @param {Function} [onError] Action to invoke upon exceptional termination of the observable sequence.
     *  @param {Function} [onCompleted] Action to invoke upon graceful termination of the observable sequence.
     *  @returns {Diposable} A disposable handling the subscriptions and unsubscriptions.
     */
    observableProto.subscribe = observableProto.forEach = function (observerOrOnNext, onError, onCompleted) {
      return this._subscribe(typeof observerOrOnNext === 'object' ?
        observerOrOnNext :
        observerCreate(observerOrOnNext, onError, onCompleted));
    };

    /**
     * Subscribes to the next value in the sequence with an optional "this" argument.
     * @param {Function} onNext The function to invoke on each element in the observable sequence.
     * @param {Any} [thisArg] Object to use as this when executing callback.
     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
     */
    observableProto.subscribeOnNext = function (onNext, thisArg) {
      return this._subscribe(observerCreate(typeof thisArg !== 'undefined' ? function(x) { onNext.call(thisArg, x); } : onNext));
    };

    /**
     * Subscribes to an exceptional condition in the sequence with an optional "this" argument.
     * @param {Function} onError The function to invoke upon exceptional termination of the observable sequence.
     * @param {Any} [thisArg] Object to use as this when executing callback.
     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
     */
    observableProto.subscribeOnError = function (onError, thisArg) {
      return this._subscribe(observerCreate(null, typeof thisArg !== 'undefined' ? function(e) { onError.call(thisArg, e); } : onError));
    };

    /**
     * Subscribes to the next value in the sequence with an optional "this" argument.
     * @param {Function} onCompleted The function to invoke upon graceful termination of the observable sequence.
     * @param {Any} [thisArg] Object to use as this when executing callback.
     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
     */
    observableProto.subscribeOnCompleted = function (onCompleted, thisArg) {
      return this._subscribe(observerCreate(null, null, typeof thisArg !== 'undefined' ? function() { onCompleted.call(thisArg); } : onCompleted));
    };

    return Observable;
  })();

  var ObservableBase = Rx.ObservableBase = (function (__super__) {
    inherits(ObservableBase, __super__);

    function fixSubscriber(subscriber) {
      return subscriber && isFunction(subscriber.dispose) ? subscriber :
        isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
    }

    function setDisposable(s, state) {
      var ado = state[0], self = state[1];
      var sub = tryCatch(self.subscribeCore).call(self, ado);

      if (sub === errorObj) {
        if(!ado.fail(errorObj.e)) { return thrower(errorObj.e); }
      }
      ado.setDisposable(fixSubscriber(sub));
    }

    function subscribe(observer) {
      var ado = new AutoDetachObserver(observer), state = [ado, this];

      if (currentThreadScheduler.scheduleRequired()) {
        currentThreadScheduler.scheduleWithState(state, setDisposable);
      } else {
        setDisposable(null, state);
      }
      return ado;
    }

    function ObservableBase() {
      __super__.call(this, subscribe);
    }

    ObservableBase.prototype.subscribeCore = notImplemented;

    return ObservableBase;
  }(Observable));

   /**
   *  Wraps the source sequence in order to run its observer callbacks on the specified scheduler.
   *
   *  This only invokes observer callbacks on a scheduler. In case the subscription and/or unsubscription actions have side-effects
   *  that require to be run on a scheduler, use subscribeOn.
   *
   *  @param {Scheduler} scheduler Scheduler to notify observers on.
   *  @returns {Observable} The source sequence whose observations happen on the specified scheduler.
   */
  observableProto.observeOn = function (scheduler) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      return source.subscribe(new ObserveOnObserver(scheduler, observer));
    }, source);
  };

   /**
   *  Wraps the source sequence in order to run its subscription and unsubscription logic on the specified scheduler. This operation is not commonly used;
   *  see the remarks section for more information on the distinction between subscribeOn and observeOn.

   *  This only performs the side-effects of subscription and unsubscription on the specified scheduler. In order to invoke observer
   *  callbacks on a scheduler, use observeOn.

   *  @param {Scheduler} scheduler Scheduler to perform subscription and unsubscription actions on.
   *  @returns {Observable} The source sequence whose subscriptions and unsubscriptions happen on the specified scheduler.
   */
  observableProto.subscribeOn = function (scheduler) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var m = new SingleAssignmentDisposable(), d = new SerialDisposable();
      d.setDisposable(m);
      m.setDisposable(scheduler.schedule(function () {
        d.setDisposable(new ScheduledDisposable(scheduler, source.subscribe(observer)));
      }));
      return d;
    }, source);
  };

  /**
   * Converts a Promise to an Observable sequence
   * @param {Promise} An ES6 Compliant promise.
   * @returns {Observable} An Observable sequence which wraps the existing promise success and failure.
   */
  var observableFromPromise = Observable.fromPromise = function (promise) {
    return observableDefer(function () {
      var subject = new Rx.AsyncSubject();

      promise.then(
        function (value) {
          subject.onNext(value);
          subject.onCompleted();
        },
        subject.onError.bind(subject));

      return subject;
    });
  };

  /*
   * Converts an existing observable sequence to an ES6 Compatible Promise
   * @example
   * var promise = Rx.Observable.return(42).toPromise(RSVP.Promise);
   *
   * // With config
   * Rx.config.Promise = RSVP.Promise;
   * var promise = Rx.Observable.return(42).toPromise();
   * @param {Function} [promiseCtor] The constructor of the promise. If not provided, it looks for it in Rx.config.Promise.
   * @returns {Promise} An ES6 compatible promise with the last value from the observable sequence.
   */
  observableProto.toPromise = function (promiseCtor) {
    promiseCtor || (promiseCtor = Rx.config.Promise);
    if (!promiseCtor) { throw new NotSupportedError('Promise type not provided nor in Rx.config.Promise'); }
    var source = this;
    return new promiseCtor(function (resolve, reject) {
      // No cancellation can be done
      var value, hasValue = false;
      source.subscribe(function (v) {
        value = v;
        hasValue = true;
      }, reject, function () {
        hasValue && resolve(value);
      });
    });
  };

  var ToArrayObservable = (function(__super__) {
    inherits(ToArrayObservable, __super__);
    function ToArrayObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    ToArrayObservable.prototype.subscribeCore = function(observer) {
      return this.source.subscribe(new ToArrayObserver(observer));
    };

    return ToArrayObservable;
  }(ObservableBase));

  function ToArrayObserver(observer) {
    this.observer = observer;
    this.a = [];
    this.isStopped = false;
  }
  ToArrayObserver.prototype.onNext = function (x) { if(!this.isStopped) { this.a.push(x); } };
  ToArrayObserver.prototype.onError = function (e) {
    if (!this.isStopped) {
      this.isStopped = true;
      this.observer.onError(e);
    }
  };
  ToArrayObserver.prototype.onCompleted = function () {
    if (!this.isStopped) {
      this.isStopped = true;
      this.observer.onNext(this.a);
      this.observer.onCompleted();
    }
  };
  ToArrayObserver.prototype.dispose = function () { this.isStopped = true; }
  ToArrayObserver.prototype.fail = function (e) {
    if (!this.isStopped) {
      this.isStopped = true;
      this.observer.onError(e);
      return true;
    }

    return false;
  };

  /**
  * Creates an array from an observable sequence.
  * @returns {Observable} An observable sequence containing a single element with a list containing all the elements of the source sequence.
  */
  observableProto.toArray = function () {
    return new ToArrayObservable(this);
  };

  /**
   *  Creates an observable sequence from a specified subscribe method implementation.
   * @example
   *  var res = Rx.Observable.create(function (observer) { return function () { } );
   *  var res = Rx.Observable.create(function (observer) { return Rx.Disposable.empty; } );
   *  var res = Rx.Observable.create(function (observer) { } );
   * @param {Function} subscribe Implementation of the resulting observable sequence's subscribe method, returning a function that will be wrapped in a Disposable.
   * @returns {Observable} The observable sequence with the specified implementation for the Subscribe method.
   */
  Observable.create = Observable.createWithDisposable = function (subscribe, parent) {
    return new AnonymousObservable(subscribe, parent);
  };

  /**
   *  Returns an observable sequence that invokes the specified factory function whenever a new observer subscribes.
   *
   * @example
   *  var res = Rx.Observable.defer(function () { return Rx.Observable.fromArray([1,2,3]); });
   * @param {Function} observableFactory Observable factory function to invoke for each observer that subscribes to the resulting sequence or Promise.
   * @returns {Observable} An observable sequence whose observers trigger an invocation of the given observable factory function.
   */
  var observableDefer = Observable.defer = function (observableFactory) {
    return new AnonymousObservable(function (observer) {
      var result;
      try {
        result = observableFactory();
      } catch (e) {
        return observableThrow(e).subscribe(observer);
      }
      isPromise(result) && (result = observableFromPromise(result));
      return result.subscribe(observer);
    });
  };

  var EmptyObservable = (function(__super__) {
    inherits(EmptyObservable, __super__);
    function EmptyObservable(scheduler) {
      this.scheduler = scheduler;
      __super__.call(this);
    }

    EmptyObservable.prototype.subscribeCore = function (observer) {
      var sink = new EmptySink(observer, this);
      return sink.run();
    };

    function EmptySink(observer, parent) {
      this.observer = observer;
      this.parent = parent;
    }

    function scheduleItem(s, state) {
      state.onCompleted();
    }

    EmptySink.prototype.run = function () {
      return this.parent.scheduler.scheduleWithState(this.observer, scheduleItem);
    };

    return EmptyObservable;
  }(ObservableBase));

  /**
   *  Returns an empty observable sequence, using the specified scheduler to send out the single OnCompleted message.
   *
   * @example
   *  var res = Rx.Observable.empty();
   *  var res = Rx.Observable.empty(Rx.Scheduler.timeout);
   * @param {Scheduler} [scheduler] Scheduler to send the termination call on.
   * @returns {Observable} An observable sequence with no elements.
   */
  var observableEmpty = Observable.empty = function (scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    return new EmptyObservable(scheduler);
  };

  var FromObservable = (function(__super__) {
    inherits(FromObservable, __super__);
    function FromObservable(iterable, mapper, scheduler) {
      this.iterable = iterable;
      this.mapper = mapper;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    FromObservable.prototype.subscribeCore = function (observer) {
      var sink = new FromSink(observer, this);
      return sink.run();
    };

    return FromObservable;
  }(ObservableBase));

  var FromSink = (function () {
    function FromSink(observer, parent) {
      this.observer = observer;
      this.parent = parent;
    }

    FromSink.prototype.run = function () {
      var list = Object(this.parent.iterable),
          it = getIterable(list),
          observer = this.observer,
          mapper = this.parent.mapper;

      function loopRecursive(i, recurse) {
        try {
          var next = it.next();
        } catch (e) {
          return observer.onError(e);
        }
        if (next.done) {
          return observer.onCompleted();
        }

        var result = next.value;

        if (mapper) {
          try {
            result = mapper(result, i);
          } catch (e) {
            return observer.onError(e);
          }
        }

        observer.onNext(result);
        recurse(i + 1);
      }

      return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
    };

    return FromSink;
  }());

  var maxSafeInteger = Math.pow(2, 53) - 1;

  function StringIterable(str) {
    this._s = s;
  }

  StringIterable.prototype[$iterator$] = function () {
    return new StringIterator(this._s);
  };

  function StringIterator(str) {
    this._s = s;
    this._l = s.length;
    this._i = 0;
  }

  StringIterator.prototype[$iterator$] = function () {
    return this;
  };

  StringIterator.prototype.next = function () {
    return this._i < this._l ? { done: false, value: this._s.charAt(this._i++) } : doneEnumerator;
  };

  function ArrayIterable(a) {
    this._a = a;
  }

  ArrayIterable.prototype[$iterator$] = function () {
    return new ArrayIterator(this._a);
  };

  function ArrayIterator(a) {
    this._a = a;
    this._l = toLength(a);
    this._i = 0;
  }

  ArrayIterator.prototype[$iterator$] = function () {
    return this;
  };

  ArrayIterator.prototype.next = function () {
    return this._i < this._l ? { done: false, value: this._a[this._i++] } : doneEnumerator;
  };

  function numberIsFinite(value) {
    return typeof value === 'number' && root.isFinite(value);
  }

  function isNan(n) {
    return n !== n;
  }

  function getIterable(o) {
    var i = o[$iterator$], it;
    if (!i && typeof o === 'string') {
      it = new StringIterable(o);
      return it[$iterator$]();
    }
    if (!i && o.length !== undefined) {
      it = new ArrayIterable(o);
      return it[$iterator$]();
    }
    if (!i) { throw new TypeError('Object is not iterable'); }
    return o[$iterator$]();
  }

  function sign(value) {
    var number = +value;
    if (number === 0) { return number; }
    if (isNaN(number)) { return number; }
    return number < 0 ? -1 : 1;
  }

  function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) { return 0; }
    if (len === 0 || !numberIsFinite(len)) { return len; }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) { return 0; }
    if (len > maxSafeInteger) { return maxSafeInteger; }
    return len;
  }

  /**
  * This method creates a new Observable sequence from an array-like or iterable object.
  * @param {Any} arrayLike An array-like or iterable object to convert to an Observable sequence.
  * @param {Function} [mapFn] Map function to call on every element of the array.
  * @param {Any} [thisArg] The context to use calling the mapFn if provided.
  * @param {Scheduler} [scheduler] Optional scheduler to use for scheduling.  If not provided, defaults to Scheduler.currentThread.
  */
  var observableFrom = Observable.from = function (iterable, mapFn, thisArg, scheduler) {
    if (iterable == null) {
      throw new Error('iterable cannot be null.')
    }
    if (mapFn && !isFunction(mapFn)) {
      throw new Error('mapFn when provided must be a function');
    }
    if (mapFn) {
      var mapper = bindCallback(mapFn, thisArg, 2);
    }
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new FromObservable(iterable, mapper, scheduler);
  }

  var FromArrayObservable = (function(__super__) {
    inherits(FromArrayObservable, __super__);
    function FromArrayObservable(args, scheduler) {
      this.args = args;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    FromArrayObservable.prototype.subscribeCore = function (observer) {
      var sink = new FromArraySink(observer, this);
      return sink.run();
    };

    return FromArrayObservable;
  }(ObservableBase));

  function FromArraySink(observer, parent) {
    this.observer = observer;
    this.parent = parent;
  }

  FromArraySink.prototype.run = function () {
    var observer = this.observer, args = this.parent.args, len = args.length;
    function loopRecursive(i, recurse) {
      if (i < len) {
        observer.onNext(args[i]);
        recurse(i + 1);
      } else {
        observer.onCompleted();
      }
    }

    return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
  };

  /**
  *  Converts an array to an observable sequence, using an optional scheduler to enumerate the array.
  * @deprecated use Observable.from or Observable.of
  * @param {Scheduler} [scheduler] Scheduler to run the enumeration of the input sequence on.
  * @returns {Observable} The observable sequence whose elements are pulled from the given enumerable sequence.
  */
  var observableFromArray = Observable.fromArray = function (array, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new FromArrayObservable(array, scheduler)
  };

  /**
   *  Generates an observable sequence by running a state-driven loop producing the sequence's elements, using the specified scheduler to send out observer messages.
   *
   * @example
   *  var res = Rx.Observable.generate(0, function (x) { return x < 10; }, function (x) { return x + 1; }, function (x) { return x; });
   *  var res = Rx.Observable.generate(0, function (x) { return x < 10; }, function (x) { return x + 1; }, function (x) { return x; }, Rx.Scheduler.timeout);
   * @param {Mixed} initialState Initial state.
   * @param {Function} condition Condition to terminate generation (upon returning false).
   * @param {Function} iterate Iteration step function.
   * @param {Function} resultSelector Selector function for results produced in the sequence.
   * @param {Scheduler} [scheduler] Scheduler on which to run the generator loop. If not provided, defaults to Scheduler.currentThread.
   * @returns {Observable} The generated sequence.
   */
  Observable.generate = function (initialState, condition, iterate, resultSelector, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new AnonymousObservable(function (o) {
      var first = true;
      return scheduler.scheduleRecursiveWithState(initialState, function (state, self) {
        var hasResult, result;
        try {
          if (first) {
            first = false;
          } else {
            state = iterate(state);
          }
          hasResult = condition(state);
          hasResult && (result = resultSelector(state));
        } catch (e) {
          return o.onError(e);
        }
        if (hasResult) {
          o.onNext(result);
          self(state);
        } else {
          o.onCompleted();
        }
      });
    });
  };

  function observableOf (scheduler, array) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new FromArrayObservable(array, scheduler);
  }

  /**
  *  This method creates a new Observable instance with a variable number of arguments, regardless of number or type of the arguments.
  * @returns {Observable} The observable sequence whose elements are pulled from the given arguments.
  */
  Observable.of = function () {
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    return new FromArrayObservable(args, currentThreadScheduler);
  };

  /**
  *  This method creates a new Observable instance with a variable number of arguments, regardless of number or type of the arguments.
  * @param {Scheduler} scheduler A scheduler to use for scheduling the arguments.
  * @returns {Observable} The observable sequence whose elements are pulled from the given arguments.
  */
  Observable.ofWithScheduler = function (scheduler) {
    var len = arguments.length, args = new Array(len - 1);
    for(var i = 1; i < len; i++) { args[i - 1] = arguments[i]; }
    return new FromArrayObservable(args, scheduler);
  };

  /**
   * Creates an Observable sequence from changes to an array using Array.observe.
   * @param {Array} array An array to observe changes.
   * @returns {Observable} An observable sequence containing changes to an array from Array.observe.
   */
  Observable.ofArrayChanges = function(array) {
    if (!Array.isArray(array)) { throw new TypeError('Array.observe only accepts arrays.'); }
    if (typeof Array.observe !== 'function' && typeof Array.unobserve !== 'function') { throw new TypeError('Array.observe is not supported on your platform') }
    return new AnonymousObservable(function(observer) {
      function observerFn(changes) {
        for(var i = 0, len = changes.length; i < len; i++) {
          observer.onNext(changes[i]);
        }
      }
      
      Array.observe(array, observerFn);

      return function () {
        Array.unobserve(array, observerFn);
      };
    });
  };

  /**
   * Creates an Observable sequence from changes to an object using Object.observe.
   * @param {Object} obj An object to observe changes.
   * @returns {Observable} An observable sequence containing changes to an object from Object.observe.
   */
  Observable.ofObjectChanges = function(obj) {
    if (obj == null) { throw new TypeError('object must not be null or undefined.'); }
    if (typeof Object.observe !== 'function' && typeof Object.unobserve !== 'function') { throw new TypeError('Array.observe is not supported on your platform') }
    return new AnonymousObservable(function(observer) {
      function observerFn(changes) {
        for(var i = 0, len = changes.length; i < len; i++) {
          observer.onNext(changes[i]);
        }
      }

      Object.observe(obj, observerFn);

      return function () {
        Object.unobserve(obj, observerFn);
      };
    });
  };

  var NeverObservable = (function(__super__) {
    inherits(NeverObservable, __super__);
    function NeverObservable() {
      __super__.call(this);
    }

    NeverObservable.prototype.subscribeCore = function (observer) {
      return disposableEmpty;
    };

    return NeverObservable;
  }(ObservableBase));

  /**
   * Returns a non-terminating observable sequence, which can be used to denote an infinite duration (e.g. when using reactive joins).
   * @returns {Observable} An observable sequence whose observers will never get called.
   */
  var observableNever = Observable.never = function () {
    return new NeverObservable();
  };

  var PairsObservable = (function(__super__) {
    inherits(PairsObservable, __super__);
    function PairsObservable(obj, scheduler) {
      this.obj = obj;
      this.keys = Object.keys(obj);
      this.scheduler = scheduler;
      __super__.call(this);
    }

    PairsObservable.prototype.subscribeCore = function (observer) {
      var sink = new PairsSink(observer, this);
      return sink.run();
    };

    return PairsObservable;
  }(ObservableBase));

  function PairsSink(observer, parent) {
    this.observer = observer;
    this.parent = parent;
  }

  PairsSink.prototype.run = function () {
    var observer = this.observer, obj = this.parent.obj, keys = this.parent.keys, len = keys.length;
    function loopRecursive(i, recurse) {
      if (i < len) {
        var key = keys[i];
        observer.onNext([key, obj[key]]);
        recurse(i + 1);
      } else {
        observer.onCompleted();
      }
    }

    return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
  };

  /**
   * Convert an object into an observable sequence of [key, value] pairs.
   * @param {Object} obj The object to inspect.
   * @param {Scheduler} [scheduler] Scheduler to run the enumeration of the input sequence on.
   * @returns {Observable} An observable sequence of [key, value] pairs from the object.
   */
  Observable.pairs = function (obj, scheduler) {
    scheduler || (scheduler = currentThreadScheduler);
    return new PairsObservable(obj, scheduler);
  };

    var RangeObservable = (function(__super__) {
    inherits(RangeObservable, __super__);
    function RangeObservable(start, count, scheduler) {
      this.start = start;
      this.count = count;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    RangeObservable.prototype.subscribeCore = function (observer) {
      var sink = new RangeSink(observer, this);
      return sink.run();
    };

    return RangeObservable;
  }(ObservableBase));

  var RangeSink = (function () {
    function RangeSink(observer, parent) {
      this.observer = observer;
      this.parent = parent;
    }

    RangeSink.prototype.run = function () {
      var start = this.parent.start, count = this.parent.count, observer = this.observer;
      function loopRecursive(i, recurse) {
        if (i < count) {
          observer.onNext(start + i);
          recurse(i + 1);
        } else {
          observer.onCompleted();
        }
      }

      return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
    };

    return RangeSink;
  }());

  /**
  *  Generates an observable sequence of integral numbers within a specified range, using the specified scheduler to send out observer messages.
  * @param {Number} start The value of the first integer in the sequence.
  * @param {Number} count The number of sequential integers to generate.
  * @param {Scheduler} [scheduler] Scheduler to run the generator loop on. If not specified, defaults to Scheduler.currentThread.
  * @returns {Observable} An observable sequence that contains a range of sequential integral numbers.
  */
  Observable.range = function (start, count, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new RangeObservable(start, count, scheduler);
  };

  var RepeatObservable = (function(__super__) {
    inherits(RepeatObservable, __super__);
    function RepeatObservable(value, repeatCount, scheduler) {
      this.value = value;
      this.repeatCount = repeatCount == null ? -1 : repeatCount;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    RepeatObservable.prototype.subscribeCore = function (observer) {
      var sink = new RepeatSink(observer, this);
      return sink.run();
    };

    return RepeatObservable;
  }(ObservableBase));

  function RepeatSink(observer, parent) {
    this.observer = observer;
    this.parent = parent;
  }

  RepeatSink.prototype.run = function () {
    var observer = this.observer, value = this.parent.value;
    function loopRecursive(i, recurse) {
      if (i === -1 || i > 0) {
        observer.onNext(value);
        i > 0 && i--;
      }
      if (i === 0) { return observer.onCompleted(); }
      recurse(i);
    }

    return this.parent.scheduler.scheduleRecursiveWithState(this.parent.repeatCount, loopRecursive);
  };

  /**
   *  Generates an observable sequence that repeats the given element the specified number of times, using the specified scheduler to send out observer messages.
   * @param {Mixed} value Element to repeat.
   * @param {Number} repeatCount [Optiona] Number of times to repeat the element. If not specified, repeats indefinitely.
   * @param {Scheduler} scheduler Scheduler to run the producer loop on. If not specified, defaults to Scheduler.immediate.
   * @returns {Observable} An observable sequence that repeats the given element the specified number of times.
   */
  Observable.repeat = function (value, repeatCount, scheduler) {
    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
    return new RepeatObservable(value, repeatCount, scheduler);
  };

  var JustObservable = (function(__super__) {
    inherits(JustObservable, __super__);
    function JustObservable(value, scheduler) {
      this.value = value;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    JustObservable.prototype.subscribeCore = function (observer) {
      var sink = new JustSink(observer, this);
      return sink.run();
    };

    function JustSink(observer, parent) {
      this.observer = observer;
      this.parent = parent;
    }

    function scheduleItem(s, state) {
      var value = state[0], observer = state[1];
      observer.onNext(value);
      observer.onCompleted();
    }

    JustSink.prototype.run = function () {
      return this.parent.scheduler.scheduleWithState([this.parent.value, this.observer], scheduleItem);
    };

    return JustObservable;
  }(ObservableBase));

  /**
   *  Returns an observable sequence that contains a single element, using the specified scheduler to send out observer messages.
   *  There is an alias called 'just' or browsers <IE9.
   * @param {Mixed} value Single element in the resulting observable sequence.
   * @param {Scheduler} scheduler Scheduler to send the single element on. If not specified, defaults to Scheduler.immediate.
   * @returns {Observable} An observable sequence containing the single specified element.
   */
  var observableReturn = Observable['return'] = Observable.just = Observable.returnValue = function (value, scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    return new JustObservable(value, scheduler);
  };

  var ThrowObservable = (function(__super__) {
    inherits(ThrowObservable, __super__);
    function ThrowObservable(error, scheduler) {
      this.error = error;
      this.scheduler = scheduler;
      __super__.call(this);
    }

    ThrowObservable.prototype.subscribeCore = function (observer) {
      var sink = new ThrowSink(observer, this);
      return sink.run();
    };

    function ThrowSink(observer, parent) {
      this.observer = observer;
      this.parent = parent;
    }

    function scheduleItem(s, state) {
      var error = state[0], observer = state[1];
      observer.onError(error);
    }

    ThrowSink.prototype.run = function () {
      return this.parent.scheduler.scheduleWithState([this.parent.error, this.observer], scheduleItem);
    };

    return ThrowObservable;
  }(ObservableBase));

  /**
   *  Returns an observable sequence that terminates with an exception, using the specified scheduler to send out the single onError message.
   *  There is an alias to this method called 'throwError' for browsers <IE9.
   * @param {Mixed} error An object used for the sequence's termination.
   * @param {Scheduler} scheduler Scheduler to send the exceptional termination call on. If not specified, defaults to Scheduler.immediate.
   * @returns {Observable} The observable sequence that terminates exceptionally with the specified exception object.
   */
  var observableThrow = Observable['throw'] = Observable.throwError = Observable.throwException = function (error, scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    return new ThrowObservable(error, scheduler);
  };

  /**
   * Constructs an observable sequence that depends on a resource object, whose lifetime is tied to the resulting observable sequence's lifetime.
   * @param {Function} resourceFactory Factory function to obtain a resource object.
   * @param {Function} observableFactory Factory function to obtain an observable sequence that depends on the obtained resource.
   * @returns {Observable} An observable sequence whose lifetime controls the lifetime of the dependent resource object.
   */
  Observable.using = function (resourceFactory, observableFactory) {
    return new AnonymousObservable(function (observer) {
      var disposable = disposableEmpty, resource, source;
      try {
        resource = resourceFactory();
        resource && (disposable = resource);
        source = observableFactory(resource);
      } catch (exception) {
        return new CompositeDisposable(observableThrow(exception).subscribe(observer), disposable);
      }
      return new CompositeDisposable(source.subscribe(observer), disposable);
    });
  };

  /**
   * Propagates the observable sequence or Promise that reacts first.
   * @param {Observable} rightSource Second observable sequence or Promise.
   * @returns {Observable} {Observable} An observable sequence that surfaces either of the given sequences, whichever reacted first.
   */
  observableProto.amb = function (rightSource) {
    var leftSource = this;
    return new AnonymousObservable(function (observer) {
      var choice,
        leftChoice = 'L', rightChoice = 'R',
        leftSubscription = new SingleAssignmentDisposable(),
        rightSubscription = new SingleAssignmentDisposable();

      isPromise(rightSource) && (rightSource = observableFromPromise(rightSource));

      function choiceL() {
        if (!choice) {
          choice = leftChoice;
          rightSubscription.dispose();
        }
      }

      function choiceR() {
        if (!choice) {
          choice = rightChoice;
          leftSubscription.dispose();
        }
      }

      leftSubscription.setDisposable(leftSource.subscribe(function (left) {
        choiceL();
        if (choice === leftChoice) {
          observer.onNext(left);
        }
      }, function (err) {
        choiceL();
        if (choice === leftChoice) {
          observer.onError(err);
        }
      }, function () {
        choiceL();
        if (choice === leftChoice) {
          observer.onCompleted();
        }
      }));

      rightSubscription.setDisposable(rightSource.subscribe(function (right) {
        choiceR();
        if (choice === rightChoice) {
          observer.onNext(right);
        }
      }, function (err) {
        choiceR();
        if (choice === rightChoice) {
          observer.onError(err);
        }
      }, function () {
        choiceR();
        if (choice === rightChoice) {
          observer.onCompleted();
        }
      }));

      return new CompositeDisposable(leftSubscription, rightSubscription);
    });
  };

  /**
   * Propagates the observable sequence or Promise that reacts first.
   *
   * @example
   * var = Rx.Observable.amb(xs, ys, zs);
   * @returns {Observable} An observable sequence that surfaces any of the given sequences, whichever reacted first.
   */
  Observable.amb = function () {
    var acc = observableNever(), items = [];
    if (Array.isArray(arguments[0])) {
      items = arguments[0];
    } else {
      for(var i = 0, len = arguments.length; i < len; i++) { items.push(arguments[i]); }
    }

    function func(previous, current) {
      return previous.amb(current);
    }
    for (var i = 0, len = items.length; i < len; i++) {
      acc = func(acc, items[i]);
    }
    return acc;
  };

  function observableCatchHandler(source, handler) {
    return new AnonymousObservable(function (o) {
      var d1 = new SingleAssignmentDisposable(), subscription = new SerialDisposable();
      subscription.setDisposable(d1);
      d1.setDisposable(source.subscribe(function (x) { o.onNext(x); }, function (e) {
        try {
          var result = handler(e);
        } catch (ex) {
          return o.onError(ex);
        }
        isPromise(result) && (result = observableFromPromise(result));

        var d = new SingleAssignmentDisposable();
        subscription.setDisposable(d);
        d.setDisposable(result.subscribe(o));
      }, function (x) { o.onCompleted(x); }));

      return subscription;
    }, source);
  }

  /**
   * Continues an observable sequence that is terminated by an exception with the next observable sequence.
   * @example
   * 1 - xs.catchException(ys)
   * 2 - xs.catchException(function (ex) { return ys(ex); })
   * @param {Mixed} handlerOrSecond Exception handler function that returns an observable sequence given the error that occurred in the first sequence, or a second observable sequence used to produce results when an error occurred in the first sequence.
   * @returns {Observable} An observable sequence containing the first sequence's elements, followed by the elements of the handler sequence in case an exception occurred.
   */
  observableProto['catch'] = observableProto.catchError = observableProto.catchException = function (handlerOrSecond) {
    return typeof handlerOrSecond === 'function' ?
      observableCatchHandler(this, handlerOrSecond) :
      observableCatch([this, handlerOrSecond]);
  };

  /**
   * Continues an observable sequence that is terminated by an exception with the next observable sequence.
   * @param {Array | Arguments} args Arguments or an array to use as the next sequence if an error occurs.
   * @returns {Observable} An observable sequence containing elements from consecutive source sequences until a source sequence terminates successfully.
   */
  var observableCatch = Observable.catchError = Observable['catch'] = Observable.catchException = function () {
    var items = [];
    if (Array.isArray(arguments[0])) {
      items = arguments[0];
    } else {
      for(var i = 0, len = arguments.length; i < len; i++) { items.push(arguments[i]); }
    }
    return enumerableOf(items).catchError();
  };

  /**
   * Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences or Promises produces an element.
   * This can be in the form of an argument list of observables or an array.
   *
   * @example
   * 1 - obs = observable.combineLatest(obs1, obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
   * 2 - obs = observable.combineLatest([obs1, obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
   */
  observableProto.combineLatest = function () {
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    if (Array.isArray(args[0])) {
      args[0].unshift(this);
    } else {
      args.unshift(this);
    }
    return combineLatest.apply(this, args);
  };

  /**
   * Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences or Promises produces an element.
   *
   * @example
   * 1 - obs = Rx.Observable.combineLatest(obs1, obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
   * 2 - obs = Rx.Observable.combineLatest([obs1, obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
   */
  var combineLatest = Observable.combineLatest = function () {
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    var resultSelector = args.pop();
    Array.isArray(args[0]) && (args = args[0]);

    return new AnonymousObservable(function (o) {
      var n = args.length,
        falseFactory = function () { return false; },
        hasValue = arrayInitialize(n, falseFactory),
        hasValueAll = false,
        isDone = arrayInitialize(n, falseFactory),
        values = new Array(n);

      function next(i) {
        hasValue[i] = true;
        if (hasValueAll || (hasValueAll = hasValue.every(identity))) {
          try {
            var res = resultSelector.apply(null, values);
          } catch (e) {
            return o.onError(e);
          }
          o.onNext(res);
        } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
          o.onCompleted();
        }
      }

      function done (i) {
        isDone[i] = true;
        isDone.every(identity) && o.onCompleted();
      }

      var subscriptions = new Array(n);
      for (var idx = 0; idx < n; idx++) {
        (function (i) {
          var source = args[i], sad = new SingleAssignmentDisposable();
          isPromise(source) && (source = observableFromPromise(source));
          sad.setDisposable(source.subscribe(function (x) {
              values[i] = x;
              next(i);
            },
            function(e) { o.onError(e); },
            function () { done(i); }
          ));
          subscriptions[i] = sad;
        }(idx));
      }

      return new CompositeDisposable(subscriptions);
    }, this);
  };

  /**
   * Concatenates all the observable sequences.  This takes in either an array or variable arguments to concatenate.
   * @returns {Observable} An observable sequence that contains the elements of each given sequence, in sequential order.
   */
  observableProto.concat = function () {
    for(var args = [], i = 0, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
    args.unshift(this);
    return observableConcat.apply(null, args);
  };

  /**
   * Concatenates all the observable sequences.
   * @param {Array | Arguments} args Arguments or an array to concat to the observable sequence.
   * @returns {Observable} An observable sequence that contains the elements of each given sequence, in sequential order.
   */
  var observableConcat = Observable.concat = function () {
    var args;
    if (Array.isArray(arguments[0])) {
      args = arguments[0];
    } else {
      args = new Array(arguments.length);
      for(var i = 0, len = arguments.length; i < len; i++) { args[i] = arguments[i]; }
    }
    return enumerableOf(args).concat();
  };

  /**
   * Concatenates an observable sequence of observable sequences.
   * @returns {Observable} An observable sequence that contains the elements of each observed inner sequence, in sequential order.
   */
  observableProto.concatAll = observableProto.concatObservable = function () {
    return this.merge(1);
  };

  var MergeObservable = (function (__super__) {
    inherits(MergeObservable, __super__);

    function MergeObservable(source, maxConcurrent) {
      this.source = source;
      this.maxConcurrent = maxConcurrent;
      __super__.call(this);
    }

    MergeObservable.prototype.subscribeCore = function(observer) {
      var g = new CompositeDisposable();
      g.add(this.source.subscribe(new MergeObserver(observer, this.maxConcurrent, g)));
      return g;
    };

    return MergeObservable;

  }(ObservableBase));

  var MergeObserver = (function () {
    function MergeObserver(o, max, g) {
      this.o = o;
      this.max = max;
      this.g = g;
      this.done = false;
      this.q = [];
      this.activeCount = 0;
      this.isStopped = false;
    }
    MergeObserver.prototype.handleSubscribe = function (xs) {
      var sad = new SingleAssignmentDisposable();
      this.g.add(sad);
      isPromise(xs) && (xs = observableFromPromise(xs));
      sad.setDisposable(xs.subscribe(new InnerObserver(this, sad)));
    };
    MergeObserver.prototype.onNext = function (innerSource) {
      if (this.isStopped) { return; }
        if(this.activeCount < this.max) {
          this.activeCount++;
          this.handleSubscribe(innerSource);
        } else {
          this.q.push(innerSource);
        }
      };
      MergeObserver.prototype.onError = function (e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.o.onError(e);
        }
      };
      MergeObserver.prototype.onCompleted = function () {
        if (!this.isStopped) {
          this.isStopped = true;
          this.done = true;
          this.activeCount === 0 && this.o.onCompleted();
        }
      };
      MergeObserver.prototype.dispose = function() { this.isStopped = true; };
      MergeObserver.prototype.fail = function (e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.o.onError(e);
          return true;
        }

        return false;
      };

      function InnerObserver(parent, sad) {
        this.parent = parent;
        this.sad = sad;
        this.isStopped = false;
      }
      InnerObserver.prototype.onNext = function (x) { if(!this.isStopped) { this.parent.o.onNext(x); } };
      InnerObserver.prototype.onError = function (e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.parent.o.onError(e);
        }
      };
      InnerObserver.prototype.onCompleted = function () {
        if(!this.isStopped) {
          this.isStopped = true;
          var parent = this.parent;
          parent.g.remove(this.sad);
          if (parent.q.length > 0) {
            parent.handleSubscribe(parent.q.shift());
          } else {
            parent.activeCount--;
            parent.done && parent.activeCount === 0 && parent.o.onCompleted();
          }
        }
      };
      InnerObserver.prototype.dispose = function() { this.isStopped = true; };
      InnerObserver.prototype.fail = function (e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.parent.o.onError(e);
          return true;
        }

        return false;
      };

      return MergeObserver;
  }());





  /**
  * Merges an observable sequence of observable sequences into an observable sequence, limiting the number of concurrent subscriptions to inner sequences.
  * Or merges two observable sequences into a single observable sequence.
  *
  * @example
  * 1 - merged = sources.merge(1);
  * 2 - merged = source.merge(otherSource);
  * @param {Mixed} [maxConcurrentOrOther] Maximum number of inner observable sequences being subscribed to concurrently or the second observable sequence.
  * @returns {Observable} The observable sequence that merges the elements of the inner sequences.
  */
  observableProto.merge = function (maxConcurrentOrOther) {
    return typeof maxConcurrentOrOther !== 'number' ?
      observableMerge(this, maxConcurrentOrOther) :
      new MergeObservable(this, maxConcurrentOrOther);
  };

  /**
   * Merges all the observable sequences into a single observable sequence.
   * The scheduler is optional and if not specified, the immediate scheduler is used.
   * @returns {Observable} The observable sequence that merges the elements of the observable sequences.
   */
  var observableMerge = Observable.merge = function () {
    var scheduler, sources = [], i, len = arguments.length;
    if (!arguments[0]) {
      scheduler = immediateScheduler;
      for(i = 1; i < len; i++) { sources.push(arguments[i]); }
    } else if (isScheduler(arguments[0])) {
      scheduler = arguments[0];
      for(i = 1; i < len; i++) { sources.push(arguments[i]); }
    } else {
      scheduler = immediateScheduler;
      for(i = 0; i < len; i++) { sources.push(arguments[i]); }
    }
    if (Array.isArray(sources[0])) {
      sources = sources[0];
    }
    return observableOf(scheduler, sources).mergeAll();
  };

  var MergeAllObservable = (function (__super__) {
    inherits(MergeAllObservable, __super__);

    function MergeAllObservable(source) {
      this.source = source;
      __super__.call(this);
    }

    MergeAllObservable.prototype.subscribeCore = function (observer) {
      var g = new CompositeDisposable(), m = new SingleAssignmentDisposable();
      g.add(m);
      m.setDisposable(this.source.subscribe(new MergeAllObserver(observer, g)));
      return g;
    };

    return MergeAllObservable;
  }(ObservableBase));

  var MergeAllObserver = (function() {

    function MergeAllObserver(o, g) {
      this.o = o;
      this.g = g;
      this.isStopped = false;
      this.done = false;
    }
    MergeAllObserver.prototype.onNext = function(innerSource) {
      if(this.isStopped) { return; }
      var sad = new SingleAssignmentDisposable();
      this.g.add(sad);

      isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));

      sad.setDisposable(innerSource.subscribe(new InnerObserver(this, this.g, sad)));
    };
    MergeAllObserver.prototype.onError = function (e) {
      if(!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
      }
    };
    MergeAllObserver.prototype.onCompleted = function () {
      if(!this.isStopped) {
        this.isStopped = true;
        this.done = true;
        this.g.length === 1 && this.o.onCompleted();
      }
    };
    MergeAllObserver.prototype.dispose = function() { this.isStopped = true; };
    MergeAllObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.o.onError(e);
        return true;
      }

      return false;
    };

    function InnerObserver(parent, g, sad) {
      this.parent = parent;
      this.g = g;
      this.sad = sad;
      this.isStopped = false;
    }
    InnerObserver.prototype.onNext = function (x) { if (!this.isStopped) { this.parent.o.onNext(x); } };
    InnerObserver.prototype.onError = function (e) {
      if(!this.isStopped) {
        this.isStopped = true;
        this.parent.o.onError(e);
      }
    };
    InnerObserver.prototype.onCompleted = function () {
      if(!this.isStopped) {
        var parent = this.parent;
        this.isStopped = true;
        parent.g.remove(this.sad);
        parent.done && parent.g.length === 1 && parent.o.onCompleted();
      }
    };
    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
    InnerObserver.prototype.fail = function (e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.parent.o.onError(e);
        return true;
      }

      return false;
    };

    return MergeAllObserver;

  }());

  /**
  * Merges an observable sequence of observable sequences into an observable sequence.
  * @returns {Observable} The observable sequence that merges the elements of the inner sequences.
  */
  observableProto.mergeAll = observableProto.mergeObservable = function () {
    return new MergeAllObservable(this);
  };

  var CompositeError = Rx.CompositeError = function(errors) {
    this.name = "NotImplementedError";
    this.innerErrors = errors;
    this.message = 'This contains multiple errors. Check the innerErrors';
    Error.call(this);
  }
  CompositeError.prototype = Error.prototype;

  /**
  * Flattens an Observable that emits Observables into one Observable, in a way that allows an Observer to
  * receive all successfully emitted items from all of the source Observables without being interrupted by
  * an error notification from one of them.
  *
  * This behaves like Observable.prototype.mergeAll except that if any of the merged Observables notify of an
  * error via the Observer's onError, mergeDelayError will refrain from propagating that
  * error notification until all of the merged Observables have finished emitting items.
  * @param {Array | Arguments} args Arguments or an array to merge.
  * @returns {Observable} an Observable that emits all of the items emitted by the Observables emitted by the Observable
  */
  Observable.mergeDelayError = function() {
    var args;
    if (Array.isArray(arguments[0])) {
      args = arguments[0];
    } else {
      var len = arguments.length;
      args = new Array(len);
      for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    }
    var source = observableOf(null, args);

    return new AnonymousObservable(function (o) {
      var group = new CompositeDisposable(),
        m = new SingleAssignmentDisposable(),
        isStopped = false,
        errors = [];

      function setCompletion() {
        if (errors.length === 0) {
          o.onCompleted();
        } else if (errors.length === 1) {
          o.onError(errors[0]);
        } else {
          o.onError(new CompositeError(errors));
        }
      }

      group.add(m);

      m.setDisposable(source.subscribe(
        function (innerSource) {
          var innerSubscription = new SingleAssignmentDisposable();
          group.add(innerSubscription);

          // Check for promises support
          isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));

          innerSubscription.setDisposable(innerSource.subscribe(
            function (x) { o.onNext(x); },
            function (e) {
              errors.push(e);
              group.remove(innerSubscription);
              isStopped && group.length === 1 && setCompletion();
            },
            function () {
              group.remove(innerSubscription);
              isStopped && group.length === 1 && setCompletion();
          }));
        },
        function (e) {
          errors.push(e);
          isStopped = true;
          group.length === 1 && setCompletion();
        },
        function () {
          isStopped = true;
          group.length === 1 && setCompletion();
        }));
      return group;
    });
  };

  /**
   * Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
   * @param {Observable} second Second observable sequence used to produce results after the first sequence terminates.
   * @returns {Observable} An observable sequence that concatenates the first and second sequence, even if the first sequence terminates exceptionally.
   */
  observableProto.onErrorResumeNext = function (second) {
    if (!second) { throw new Error('Second observable is required'); }
    return onErrorResumeNext([this, second]);
  };

  /**
   * Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
   *
   * @example
   * 1 - res = Rx.Observable.onErrorResumeNext(xs, ys, zs);
   * 1 - res = Rx.Observable.onErrorResumeNext([xs, ys, zs]);
   * @returns {Observable} An observable sequence that concatenates the source sequences, even if a sequence terminates exceptionally.
   */
  var onErrorResumeNext = Observable.onErrorResumeNext = function () {
    var sources = [];
    if (Array.isArray(arguments[0])) {
      sources = arguments[0];
    } else {
      for(var i = 0, len = arguments.length; i < len; i++) { sources.push(arguments[i]); }
    }
    return new AnonymousObservable(function (observer) {
      var pos = 0, subscription = new SerialDisposable(),
      cancelable = immediateScheduler.scheduleRecursive(function (self) {
        var current, d;
        if (pos < sources.length) {
          current = sources[pos++];
          isPromise(current) && (current = observableFromPromise(current));
          d = new SingleAssignmentDisposable();
          subscription.setDisposable(d);
          d.setDisposable(current.subscribe(observer.onNext.bind(observer), self, self));
        } else {
          observer.onCompleted();
        }
      });
      return new CompositeDisposable(subscription, cancelable);
    });
  };

  /**
   * Returns the values from the source observable sequence only after the other observable sequence produces a value.
   * @param {Observable | Promise} other The observable sequence or Promise that triggers propagation of elements of the source sequence.
   * @returns {Observable} An observable sequence containing the elements of the source sequence starting from the point the other sequence triggered propagation.
   */
  observableProto.skipUntil = function (other) {
    var source = this;
    return new AnonymousObservable(function (o) {
      var isOpen = false;
      var disposables = new CompositeDisposable(source.subscribe(function (left) {
        isOpen && o.onNext(left);
      }, function (e) { o.onError(e); }, function () {
        isOpen && o.onCompleted();
      }));

      isPromise(other) && (other = observableFromPromise(other));

      var rightSubscription = new SingleAssignmentDisposable();
      disposables.add(rightSubscription);
      rightSubscription.setDisposable(other.subscribe(function () {
        isOpen = true;
        rightSubscription.dispose();
      }, function (e) { o.onError(e); }, function () {
        rightSubscription.dispose();
      }));

      return disposables;
    }, source);
  };

  /**
   * Transforms an observable sequence of observable sequences into an observable sequence producing values only from the most recent observable sequence.
   * @returns {Observable} The observable sequence that at any point in time produces the elements of the most recent inner observable sequence that has been received.
   */
  observableProto['switch'] = observableProto.switchLatest = function () {
    var sources = this;
    return new AnonymousObservable(function (observer) {
      var hasLatest = false,
        innerSubscription = new SerialDisposable(),
        isStopped = false,
        latest = 0,
        subscription = sources.subscribe(
          function (innerSource) {
            var d = new SingleAssignmentDisposable(), id = ++latest;
            hasLatest = true;
            innerSubscription.setDisposable(d);

            // Check if Promise or Observable
            isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));

            d.setDisposable(innerSource.subscribe(
              function (x) { latest === id && observer.onNext(x); },
              function (e) { latest === id && observer.onError(e); },
              function () {
                if (latest === id) {
                  hasLatest = false;
                  isStopped && observer.onCompleted();
                }
              }));
          },
          function (e) { observer.onError(e); },
          function () {
            isStopped = true;
            !hasLatest && observer.onCompleted();
          });
      return new CompositeDisposable(subscription, innerSubscription);
    }, sources);
  };

  /**
   * Returns the values from the source observable sequence until the other observable sequence produces a value.
   * @param {Observable | Promise} other Observable sequence or Promise that terminates propagation of elements of the source sequence.
   * @returns {Observable} An observable sequence containing the elements of the source sequence up to the point the other sequence interrupted further propagation.
   */
  observableProto.takeUntil = function (other) {
    var source = this;
    return new AnonymousObservable(function (o) {
      isPromise(other) && (other = observableFromPromise(other));
      return new CompositeDisposable(
        source.subscribe(o),
        other.subscribe(function () { o.onCompleted(); }, function (e) { o.onError(e); }, noop)
      );
    }, source);
  };

  /**
   * Merges the specified observable sequences into one observable sequence by using the selector function only when the (first) source observable sequence produces an element.
   *
   * @example
   * 1 - obs = obs1.withLatestFrom(obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
   * 2 - obs = obs1.withLatestFrom([obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
   */
  observableProto.withLatestFrom = function () {
    var len = arguments.length, args = new Array(len)
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    var resultSelector = args.pop(), source = this;

    if (typeof source === 'undefined') {
      throw new Error('Source observable not found for withLatestFrom().');
    }
    if (typeof resultSelector !== 'function') {
      throw new Error('withLatestFrom() expects a resultSelector function.');
    }
    if (Array.isArray(args[0])) {
      args = args[0];
    }

    return new AnonymousObservable(function (observer) {
      var falseFactory = function () { return false; },
        n = args.length,
        hasValue = arrayInitialize(n, falseFactory),
        hasValueAll = false,
        values = new Array(n);

      var subscriptions = new Array(n + 1);
      for (var idx = 0; idx < n; idx++) {
        (function (i) {
          var other = args[i], sad = new SingleAssignmentDisposable();
          isPromise(other) && (other = observableFromPromise(other));
          sad.setDisposable(other.subscribe(function (x) {
            values[i] = x;
            hasValue[i] = true;
            hasValueAll = hasValue.every(identity);
          }, observer.onError.bind(observer), function () {}));
          subscriptions[i] = sad;
        }(idx));
      }

      var sad = new SingleAssignmentDisposable();
      sad.setDisposable(source.subscribe(function (x) {
        var res;
        var allValues = [x].concat(values);
        if (!hasValueAll) return;
        try {
          res = resultSelector.apply(null, allValues);
        } catch (ex) {
          observer.onError(ex);
          return;
        }
        observer.onNext(res);
      }, observer.onError.bind(observer), function () {
        observer.onCompleted();
      }));
      subscriptions[n] = sad;

      return new CompositeDisposable(subscriptions);
    }, this);
  };

  function zipArray(second, resultSelector) {
    var first = this;
    return new AnonymousObservable(function (observer) {
      var index = 0, len = second.length;
      return first.subscribe(function (left) {
        if (index < len) {
          var right = second[index++], result;
          try {
            result = resultSelector(left, right);
          } catch (e) {
            return observer.onError(e);
          }
          observer.onNext(result);
        } else {
          observer.onCompleted();
        }
      }, function (e) { observer.onError(e); }, function () { observer.onCompleted(); });
    }, first);
  }

  function falseFactory() { return false; }
  function emptyArrayFactory() { return []; }

  /**
   * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences or an array have produced an element at a corresponding index.
   * The last element in the arguments must be a function to invoke for each series of elements at corresponding indexes in the args.
   *
   * @example
   * 1 - res = obs1.zip(obs2, fn);
   * 1 - res = x1.zip([1,2,3], fn);
   * @returns {Observable} An observable sequence containing the result of combining elements of the args using the specified result selector function.
   */
  observableProto.zip = function () {
    if (Array.isArray(arguments[0])) { return zipArray.apply(this, arguments); }
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }

    var parent = this, resultSelector = args.pop();
    args.unshift(parent);
    return new AnonymousObservable(function (observer) {
      var n = args.length,
        queues = arrayInitialize(n, emptyArrayFactory),
        isDone = arrayInitialize(n, falseFactory);

      function next(i) {
        var res, queuedValues;
        if (queues.every(function (x) { return x.length > 0; })) {
          try {
            queuedValues = queues.map(function (x) { return x.shift(); });
            res = resultSelector.apply(parent, queuedValues);
          } catch (ex) {
            observer.onError(ex);
            return;
          }
          observer.onNext(res);
        } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
          observer.onCompleted();
        }
      };

      function done(i) {
        isDone[i] = true;
        if (isDone.every(function (x) { return x; })) {
          observer.onCompleted();
        }
      }

      var subscriptions = new Array(n);
      for (var idx = 0; idx < n; idx++) {
        (function (i) {
          var source = args[i], sad = new SingleAssignmentDisposable();
          isPromise(source) && (source = observableFromPromise(source));
          sad.setDisposable(source.subscribe(function (x) {
            queues[i].push(x);
            next(i);
          }, function (e) { observer.onError(e); }, function () {
            done(i);
          }));
          subscriptions[i] = sad;
        })(idx);
      }

      return new CompositeDisposable(subscriptions);
    }, parent);
  };

  /**
   * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences have produced an element at a corresponding index.
   * @param arguments Observable sources.
   * @param {Function} resultSelector Function to invoke for each series of elements at corresponding indexes in the sources.
   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
   */
  Observable.zip = function () {
    var len = arguments.length, args = new Array(len);
    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
    var first = args.shift();
    return first.zip.apply(first, args);
  };

  /**
   * Merges the specified observable sequences into one observable sequence by emitting a list with the elements of the observable sequences at corresponding indexes.
   * @param arguments Observable sources.
   * @returns {Observable} An observable sequence containing lists of elements at corresponding indexes.
   */
  Observable.zipArray = function () {
    var sources;
    if (Array.isArray(arguments[0])) {
      sources = arguments[0];
    } else {
      var len = arguments.length;
      sources = new Array(len);
      for(var i = 0; i < len; i++) { sources[i] = arguments[i]; }
    }
    return new AnonymousObservable(function (observer) {
      var n = sources.length,
        queues = arrayInitialize(n, function () { return []; }),
        isDone = arrayInitialize(n, function () { return false; });

      function next(i) {
        if (queues.every(function (x) { return x.length > 0; })) {
          var res = queues.map(function (x) { return x.shift(); });
          observer.onNext(res);
        } else if (isDone.filter(function (x, j) { return j !== i; }).every(identity)) {
          observer.onCompleted();
          return;
        }
      };

      function done(i) {
        isDone[i] = true;
        if (isDone.every(identity)) {
          observer.onCompleted();
          return;
        }
      }

      var subscriptions = new Array(n);
      for (var idx = 0; idx < n; idx++) {
        (function (i) {
          subscriptions[i] = new SingleAssignmentDisposable();
          subscriptions[i].setDisposable(sources[i].subscribe(function (x) {
            queues[i].push(x);
            next(i);
          }, function (e) { observer.onError(e); }, function () {
            done(i);
          }));
        })(idx);
      }

      return new CompositeDisposable(subscriptions);
    });
  };

  /**
   *  Hides the identity of an observable sequence.
   * @returns {Observable} An observable sequence that hides the identity of the source sequence.
   */
  observableProto.asObservable = function () {
    var source = this;
    return new AnonymousObservable(function (o) { return source.subscribe(o); }, this);
  };

  /**
   *  Projects each element of an observable sequence into zero or more buffers which are produced based on element count information.
   *
   * @example
   *  var res = xs.bufferWithCount(10);
   *  var res = xs.bufferWithCount(10, 1);
   * @param {Number} count Length of each buffer.
   * @param {Number} [skip] Number of elements to skip between creation of consecutive buffers. If not provided, defaults to the count.
   * @returns {Observable} An observable sequence of buffers.
   */
  observableProto.bufferWithCount = function (count, skip) {
    if (typeof skip !== 'number') {
      skip = count;
    }
    return this.windowWithCount(count, skip).selectMany(function (x) {
      return x.toArray();
    }).where(function (x) {
      return x.length > 0;
    });
  };

  /**
   * Dematerializes the explicit notification values of an observable sequence as implicit notifications.
   * @returns {Observable} An observable sequence exhibiting the behavior corresponding to the source sequence's notification values.
   */
  observableProto.dematerialize = function () {
    var source = this;
    return new AnonymousObservable(function (o) {
      return source.subscribe(function (x) { return x.accept(o); }, function(e) { o.onError(e); }, function () { o.onCompleted(); });
    }, this);
  };

  /**
   *  Returns an observable sequence that contains only distinct contiguous elements according to the keySelector and the comparer.
   *
   *  var obs = observable.distinctUntilChanged();
   *  var obs = observable.distinctUntilChanged(function (x) { return x.id; });
   *  var obs = observable.distinctUntilChanged(function (x) { return x.id; }, function (x, y) { return x === y; });
   *
   * @param {Function} [keySelector] A function to compute the comparison key for each element. If not provided, it projects the value.
   * @param {Function} [comparer] Equality comparer for computed key values. If not provided, defaults to an equality comparer function.
   * @returns {Observable} An observable sequence only containing the distinct contiguous elements, based on a computed key value, from the source sequence.
   */
  observableProto.distinctUntilChanged = function (keySelector, comparer) {
    var source = this;
    comparer || (comparer = defaultComparer);
    return new AnonymousObservable(function (o) {
      var hasCurrentKey = false, currentKey;
      return source.subscribe(function (value) {
        var key = value;
        if (keySelector) {
          try {
            key = keySelector(value);
          } catch (e) {
            o.onError(e);
            return;
          }
        }
        if (hasCurrentKey) {
          try {
            var comparerEquals = comparer(currentKey, key);
          } catch (e) {
            o.onError(e);
            return;
          }
        }
        if (!hasCurrentKey || !comparerEquals) {
          hasCurrentKey = true;
          currentKey = key;
          o.onNext(value);
        }
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, this);
  };

  /**
   *  Invokes an action for each element in the observable sequence and invokes an action upon graceful or exceptional termination of the observable sequence.
   *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
   * @param {Function | Observer} observerOrOnNext Action to invoke for each element in the observable sequence or an observer.
   * @param {Function} [onError]  Action to invoke upon exceptional termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
   * @param {Function} [onCompleted]  Action to invoke upon graceful termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
   * @returns {Observable} The source sequence with the side-effecting behavior applied.
   */
  observableProto['do'] = observableProto.tap = observableProto.doAction = function (observerOrOnNext, onError, onCompleted) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var tapObserver = !observerOrOnNext || isFunction(observerOrOnNext) ?
        observerCreate(observerOrOnNext || noop, onError || noop, onCompleted || noop) :
        observerOrOnNext;

      return source.subscribe(function (x) {
        try {
          tapObserver.onNext(x);
        } catch (e) {
          observer.onError(e);
        }
        observer.onNext(x);
      }, function (err) {
          try {
            tapObserver.onError(err);
          } catch (e) {
            observer.onError(e);
          }
        observer.onError(err);
      }, function () {
        try {
          tapObserver.onCompleted();
        } catch (e) {
          observer.onError(e);
        }
        observer.onCompleted();
      });
    }, this);
  };

  /**
   *  Invokes an action for each element in the observable sequence.
   *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
   * @param {Function} onNext Action to invoke for each element in the observable sequence.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} The source sequence with the side-effecting behavior applied.
   */
  observableProto.doOnNext = observableProto.tapOnNext = function (onNext, thisArg) {
    return this.tap(typeof thisArg !== 'undefined' ? function (x) { onNext.call(thisArg, x); } : onNext);
  };

  /**
   *  Invokes an action upon exceptional termination of the observable sequence.
   *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
   * @param {Function} onError Action to invoke upon exceptional termination of the observable sequence.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} The source sequence with the side-effecting behavior applied.
   */
  observableProto.doOnError = observableProto.tapOnError = function (onError, thisArg) {
    return this.tap(noop, typeof thisArg !== 'undefined' ? function (e) { onError.call(thisArg, e); } : onError);
  };

  /**
   *  Invokes an action upon graceful termination of the observable sequence.
   *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
   * @param {Function} onCompleted Action to invoke upon graceful termination of the observable sequence.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} The source sequence with the side-effecting behavior applied.
   */
  observableProto.doOnCompleted = observableProto.tapOnCompleted = function (onCompleted, thisArg) {
    return this.tap(noop, null, typeof thisArg !== 'undefined' ? function () { onCompleted.call(thisArg); } : onCompleted);
  };

  /**
   *  Invokes a specified action after the source observable sequence terminates gracefully or exceptionally.
   * @param {Function} finallyAction Action to invoke after the source observable sequence terminates.
   * @returns {Observable} Source sequence with the action-invoking termination behavior applied.
   */
  observableProto['finally'] = observableProto.ensure = function (action) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var subscription;
      try {
        subscription = source.subscribe(observer);
      } catch (e) {
        action();
        throw e;
      }
      return disposableCreate(function () {
        try {
          subscription.dispose();
        } catch (e) {
          throw e;
        } finally {
          action();
        }
      });
    }, this);
  };

  /**
   * @deprecated use #finally or #ensure instead.
   */
  observableProto.finallyAction = function (action) {
    //deprecate('finallyAction', 'finally or ensure');
    return this.ensure(action);
  };

  /**
   *  Ignores all elements in an observable sequence leaving only the termination messages.
   * @returns {Observable} An empty observable sequence that signals termination, successful or exceptional, of the source sequence.
   */
  observableProto.ignoreElements = function () {
    var source = this;
    return new AnonymousObservable(function (o) {
      return source.subscribe(noop, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, source);
  };

  /**
   *  Materializes the implicit notifications of an observable sequence as explicit notification values.
   * @returns {Observable} An observable sequence containing the materialized notification values from the source sequence.
   */
  observableProto.materialize = function () {
    var source = this;
    return new AnonymousObservable(function (observer) {
      return source.subscribe(function (value) {
        observer.onNext(notificationCreateOnNext(value));
      }, function (e) {
        observer.onNext(notificationCreateOnError(e));
        observer.onCompleted();
      }, function () {
        observer.onNext(notificationCreateOnCompleted());
        observer.onCompleted();
      });
    }, source);
  };

  /**
   *  Repeats the observable sequence a specified number of times. If the repeat count is not specified, the sequence repeats indefinitely.
   * @param {Number} [repeatCount]  Number of times to repeat the sequence. If not provided, repeats the sequence indefinitely.
   * @returns {Observable} The observable sequence producing the elements of the given sequence repeatedly.
   */
  observableProto.repeat = function (repeatCount) {
    return enumerableRepeat(this, repeatCount).concat();
  };

  /**
   *  Repeats the source observable sequence the specified number of times or until it successfully terminates. If the retry count is not specified, it retries indefinitely.
   *  Note if you encounter an error and want it to retry once, then you must use .retry(2);
   *
   * @example
   *  var res = retried = retry.repeat();
   *  var res = retried = retry.repeat(2);
   * @param {Number} [retryCount]  Number of times to retry the sequence. If not provided, retry the sequence indefinitely.
   * @returns {Observable} An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully.
   */
  observableProto.retry = function (retryCount) {
    return enumerableRepeat(this, retryCount).catchError();
  };

  /**
   *  Repeats the source observable sequence upon error each time the notifier emits or until it successfully terminates. 
   *  if the notifier completes, the observable sequence completes.
   *
   * @example
   *  var timer = Observable.timer(500);
   *  var source = observable.retryWhen(timer);
   * @param {Observable} [notifier] An observable that triggers the retries or completes the observable with onNext or onCompleted respectively.
   * @returns {Observable} An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully.
   */
  observableProto.retryWhen = function (notifier) {
    return enumerableRepeat(this).catchErrorWhen(notifier);
  };
  /**
   *  Applies an accumulator function over an observable sequence and returns each intermediate result. The optional seed value is used as the initial accumulator value.
   *  For aggregation behavior with no intermediate results, see Observable.aggregate.
   * @example
   *  var res = source.scan(function (acc, x) { return acc + x; });
   *  var res = source.scan(0, function (acc, x) { return acc + x; });
   * @param {Mixed} [seed] The initial accumulator value.
   * @param {Function} accumulator An accumulator function to be invoked on each element.
   * @returns {Observable} An observable sequence containing the accumulated values.
   */
  observableProto.scan = function () {
    var hasSeed = false, seed, accumulator, source = this;
    if (arguments.length === 2) {
      hasSeed = true;
      seed = arguments[0];
      accumulator = arguments[1];
    } else {
      accumulator = arguments[0];
    }
    return new AnonymousObservable(function (o) {
      var hasAccumulation, accumulation, hasValue;
      return source.subscribe (
        function (x) {
          !hasValue && (hasValue = true);
          try {
            if (hasAccumulation) {
              accumulation = accumulator(accumulation, x);
            } else {
              accumulation = hasSeed ? accumulator(seed, x) : x;
              hasAccumulation = true;
            }
          } catch (e) {
            o.onError(e);
            return;
          }

          o.onNext(accumulation);
        },
        function (e) { o.onError(e); },
        function () {
          !hasValue && hasSeed && o.onNext(seed);
          o.onCompleted();
        }
      );
    }, source);
  };

  /**
   *  Bypasses a specified number of elements at the end of an observable sequence.
   * @description
   *  This operator accumulates a queue with a length enough to store the first `count` elements. As more elements are
   *  received, elements are taken from the front of the queue and produced on the result sequence. This causes elements to be delayed.
   * @param count Number of elements to bypass at the end of the source sequence.
   * @returns {Observable} An observable sequence containing the source sequence elements except for the bypassed ones at the end.
   */
  observableProto.skipLast = function (count) {
    if (count < 0) { throw new ArgumentOutOfRangeError(); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        q.push(x);
        q.length > count && o.onNext(q.shift());
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, source);
  };

  /**
   *  Prepends a sequence of values to an observable sequence with an optional scheduler and an argument list of values to prepend.
   *  @example
   *  var res = source.startWith(1, 2, 3);
   *  var res = source.startWith(Rx.Scheduler.timeout, 1, 2, 3);
   * @param {Arguments} args The specified values to prepend to the observable sequence
   * @returns {Observable} The source sequence prepended with the specified values.
   */
  observableProto.startWith = function () {
    var values, scheduler, start = 0;
    if (!!arguments.length && isScheduler(arguments[0])) {
      scheduler = arguments[0];
      start = 1;
    } else {
      scheduler = immediateScheduler;
    }
    for(var args = [], i = start, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
    return enumerableOf([observableFromArray(args, scheduler), this]).concat();
  };

  /**
   *  Returns a specified number of contiguous elements from the end of an observable sequence.
   * @description
   *  This operator accumulates a buffer with a length enough to store elements count elements. Upon completion of
   *  the source sequence, this buffer is drained on the result sequence. This causes the elements to be delayed.
   * @param {Number} count Number of elements to take from the end of the source sequence.
   * @returns {Observable} An observable sequence containing the specified number of elements from the end of the source sequence.
   */
  observableProto.takeLast = function (count) {
    if (count < 0) { throw new ArgumentOutOfRangeError(); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        q.push(x);
        q.length > count && q.shift();
      }, function (e) { o.onError(e); }, function () {
        while (q.length > 0) { o.onNext(q.shift()); }
        o.onCompleted();
      });
    }, source);
  };

  /**
   *  Returns an array with the specified number of contiguous elements from the end of an observable sequence.
   *
   * @description
   *  This operator accumulates a buffer with a length enough to store count elements. Upon completion of the
   *  source sequence, this buffer is produced on the result sequence.
   * @param {Number} count Number of elements to take from the end of the source sequence.
   * @returns {Observable} An observable sequence containing a single array with the specified number of elements from the end of the source sequence.
   */
  observableProto.takeLastBuffer = function (count) {
    var source = this;
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        q.push(x);
        q.length > count && q.shift();
      }, function (e) { o.onError(e); }, function () {
        o.onNext(q);
        o.onCompleted();
      });
    }, source);
  };

  /**
   *  Projects each element of an observable sequence into zero or more windows which are produced based on element count information.
   *
   *  var res = xs.windowWithCount(10);
   *  var res = xs.windowWithCount(10, 1);
   * @param {Number} count Length of each window.
   * @param {Number} [skip] Number of elements to skip between creation of consecutive windows. If not specified, defaults to the count.
   * @returns {Observable} An observable sequence of windows.
   */
  observableProto.windowWithCount = function (count, skip) {
    var source = this;
    +count || (count = 0);
    Math.abs(count) === Infinity && (count = 0);
    if (count <= 0) { throw new ArgumentOutOfRangeError(); }
    skip == null && (skip = count);
    +skip || (skip = 0);
    Math.abs(skip) === Infinity && (skip = 0);

    if (skip <= 0) { throw new ArgumentOutOfRangeError(); }
    return new AnonymousObservable(function (observer) {
      var m = new SingleAssignmentDisposable(),
        refCountDisposable = new RefCountDisposable(m),
        n = 0,
        q = [];

      function createWindow () {
        var s = new Subject();
        q.push(s);
        observer.onNext(addRef(s, refCountDisposable));
      }

      createWindow();

      m.setDisposable(source.subscribe(
        function (x) {
          for (var i = 0, len = q.length; i < len; i++) { q[i].onNext(x); }
          var c = n - count + 1;
          c >= 0 && c % skip === 0 && q.shift().onCompleted();
          ++n % skip === 0 && createWindow();
        },
        function (e) {
          while (q.length > 0) { q.shift().onError(e); }
          observer.onError(e);
        },
        function () {
          while (q.length > 0) { q.shift().onCompleted(); }
          observer.onCompleted();
        }
      ));
      return refCountDisposable;
    }, source);
  };

  function concatMap(source, selector, thisArg) {
    var selectorFunc = bindCallback(selector, thisArg, 3);
    return source.map(function (x, i) {
      var result = selectorFunc(x, i, source);
      isPromise(result) && (result = observableFromPromise(result));
      (isArrayLike(result) || isIterable(result)) && (result = observableFrom(result));
      return result;
    }).concatAll();
  }

  /**
   *  One of the Following:
   *  Projects each element of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
   *
   * @example
   *  var res = source.concatMap(function (x) { return Rx.Observable.range(0, x); });
   *  Or:
   *  Projects each element of an observable sequence to an observable sequence, invokes the result selector for the source element and each of the corresponding inner sequence's elements, and merges the results into one observable sequence.
   *
   *  var res = source.concatMap(function (x) { return Rx.Observable.range(0, x); }, function (x, y) { return x + y; });
   *  Or:
   *  Projects each element of the source observable sequence to the other observable sequence and merges the resulting observable sequences into one observable sequence.
   *
   *  var res = source.concatMap(Rx.Observable.fromArray([1,2,3]));
   * @param {Function} selector A transform function to apply to each element or an observable sequence to project each element from the
   * source sequence onto which could be either an observable or Promise.
   * @param {Function} [resultSelector]  A transform function to apply to each element of the intermediate sequence.
   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function collectionSelector on each element of the input sequence and then mapping each of those sequence elements and their corresponding source element to a result element.
   */
  observableProto.selectConcat = observableProto.concatMap = function (selector, resultSelector, thisArg) {
    if (isFunction(selector) && isFunction(resultSelector)) {
      return this.concatMap(function (x, i) {
        var selectorResult = selector(x, i);
        isPromise(selectorResult) && (selectorResult = observableFromPromise(selectorResult));
        (isArrayLike(selectorResult) || isIterable(selectorResult)) && (selectorResult = observableFrom(selectorResult));

        return selectorResult.map(function (y, i2) {
          return resultSelector(x, y, i, i2);
        });
      });
    }
    return isFunction(selector) ?
      concatMap(this, selector, thisArg) :
      concatMap(this, function () { return selector; });
  };

  /**
   * Projects each notification of an observable sequence to an observable sequence and concats the resulting observable sequences into one observable sequence.
   * @param {Function} onNext A transform function to apply to each element; the second parameter of the function represents the index of the source element.
   * @param {Function} onError A transform function to apply when an error occurs in the source sequence.
   * @param {Function} onCompleted A transform function to apply when the end of the source sequence is reached.
   * @param {Any} [thisArg] An optional "this" to use to invoke each transform.
   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function corresponding to each notification in the input sequence.
   */
  observableProto.concatMapObserver = observableProto.selectConcatObserver = function(onNext, onError, onCompleted, thisArg) {
    var source = this,
        onNextFunc = bindCallback(onNext, thisArg, 2),
        onErrorFunc = bindCallback(onError, thisArg, 1),
        onCompletedFunc = bindCallback(onCompleted, thisArg, 0);
    return new AnonymousObservable(function (observer) {
      var index = 0;
      return source.subscribe(
        function (x) {
          var result;
          try {
            result = onNextFunc(x, index++);
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
        },
        function (err) {
          var result;
          try {
            result = onErrorFunc(err);
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        },
        function () {
          var result;
          try {
            result = onCompletedFunc();
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        });
    }, this).concatAll();
  };

    /**
     *  Returns the elements of the specified sequence or the specified value in a singleton sequence if the sequence is empty.
     *
     *  var res = obs = xs.defaultIfEmpty();
     *  2 - obs = xs.defaultIfEmpty(false);
     *
     * @memberOf Observable#
     * @param defaultValue The value to return if the sequence is empty. If not provided, this defaults to null.
     * @returns {Observable} An observable sequence that contains the specified default value if the source is empty; otherwise, the elements of the source itself.
     */
    observableProto.defaultIfEmpty = function (defaultValue) {
      var source = this;
      defaultValue === undefined && (defaultValue = null);
      return new AnonymousObservable(function (observer) {
        var found = false;
        return source.subscribe(function (x) {
          found = true;
          observer.onNext(x);
        },
        function (e) { observer.onError(e); }, 
        function () {
          !found && observer.onNext(defaultValue);
          observer.onCompleted();
        });
      }, source);
    };

  // Swap out for Array.findIndex
  function arrayIndexOfComparer(array, item, comparer) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (comparer(array[i], item)) { return i; }
    }
    return -1;
  }

  function HashSet(comparer) {
    this.comparer = comparer;
    this.set = [];
  }
  HashSet.prototype.push = function(value) {
    var retValue = arrayIndexOfComparer(this.set, value, this.comparer) === -1;
    retValue && this.set.push(value);
    return retValue;
  };

  /**
   *  Returns an observable sequence that contains only distinct elements according to the keySelector and the comparer.
   *  Usage of this operator should be considered carefully due to the maintenance of an internal lookup structure which can grow large.
   *
   * @example
   *  var res = obs = xs.distinct();
   *  2 - obs = xs.distinct(function (x) { return x.id; });
   *  2 - obs = xs.distinct(function (x) { return x.id; }, function (a,b) { return a === b; });
   * @param {Function} [keySelector]  A function to compute the comparison key for each element.
   * @param {Function} [comparer]  Used to compare items in the collection.
   * @returns {Observable} An observable sequence only containing the distinct elements, based on a computed key value, from the source sequence.
   */
  observableProto.distinct = function (keySelector, comparer) {
    var source = this;
    comparer || (comparer = defaultComparer);
    return new AnonymousObservable(function (o) {
      var hashSet = new HashSet(comparer);
      return source.subscribe(function (x) {
        var key = x;

        if (keySelector) {
          try {
            key = keySelector(x);
          } catch (e) {
            o.onError(e);
            return;
          }
        }
        hashSet.push(key) && o.onNext(x);
      },
      function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, this);
  };

  /**
   *  Groups the elements of an observable sequence according to a specified key selector function and comparer and selects the resulting elements by using a specified function.
   *
   * @example
   *  var res = observable.groupBy(function (x) { return x.id; });
   *  2 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; });
   *  3 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; }, function (x) { return x.toString(); });
   * @param {Function} keySelector A function to extract the key for each element.
   * @param {Function} [elementSelector]  A function to map each source element to an element in an observable group.
   * @param {Function} [comparer] Used to determine whether the objects are equal.
   * @returns {Observable} A sequence of observable groups, each of which corresponds to a unique key value, containing all elements that share that same key value.
   */
  observableProto.groupBy = function (keySelector, elementSelector, comparer) {
    return this.groupByUntil(keySelector, elementSelector, observableNever, comparer);
  };

    /**
     *  Groups the elements of an observable sequence according to a specified key selector function.
     *  A duration selector function is used to control the lifetime of groups. When a group expires, it receives an OnCompleted notification. When a new element with the same
     *  key value as a reclaimed group occurs, the group will be reborn with a new lifetime request.
     *
     * @example
     *  var res = observable.groupByUntil(function (x) { return x.id; }, null,  function () { return Rx.Observable.never(); });
     *  2 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; },  function () { return Rx.Observable.never(); });
     *  3 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; },  function () { return Rx.Observable.never(); }, function (x) { return x.toString(); });
     * @param {Function} keySelector A function to extract the key for each element.
     * @param {Function} durationSelector A function to signal the expiration of a group.
     * @param {Function} [comparer] Used to compare objects. When not specified, the default comparer is used.
     * @returns {Observable}
     *  A sequence of observable groups, each of which corresponds to a unique key value, containing all elements that share that same key value.
     *  If a group's lifetime expires, a new group with the same key value can be created once an element with such a key value is encoutered.
     *
     */
    observableProto.groupByUntil = function (keySelector, elementSelector, durationSelector, comparer) {
      var source = this;
      elementSelector || (elementSelector = identity);
      comparer || (comparer = defaultComparer);
      return new AnonymousObservable(function (observer) {
        function handleError(e) { return function (item) { item.onError(e); }; }
        var map = new Dictionary(0, comparer),
          groupDisposable = new CompositeDisposable(),
          refCountDisposable = new RefCountDisposable(groupDisposable);

        groupDisposable.add(source.subscribe(function (x) {
          var key;
          try {
            key = keySelector(x);
          } catch (e) {
            map.getValues().forEach(handleError(e));
            observer.onError(e);
            return;
          }

          var fireNewMapEntry = false,
            writer = map.tryGetValue(key);
          if (!writer) {
            writer = new Subject();
            map.set(key, writer);
            fireNewMapEntry = true;
          }

          if (fireNewMapEntry) {
            var group = new GroupedObservable(key, writer, refCountDisposable),
              durationGroup = new GroupedObservable(key, writer);
            try {
              duration = durationSelector(durationGroup);
            } catch (e) {
              map.getValues().forEach(handleError(e));
              observer.onError(e);
              return;
            }

            observer.onNext(group);

            var md = new SingleAssignmentDisposable();
            groupDisposable.add(md);

            var expire = function () {
              map.remove(key) && writer.onCompleted();
              groupDisposable.remove(md);
            };

            md.setDisposable(duration.take(1).subscribe(
              noop,
              function (exn) {
                map.getValues().forEach(handleError(exn));
                observer.onError(exn);
              },
              expire)
            );
          }

          var element;
          try {
            element = elementSelector(x);
          } catch (e) {
            map.getValues().forEach(handleError(e));
            observer.onError(e);
            return;
          }

          writer.onNext(element);
      }, function (ex) {
        map.getValues().forEach(handleError(ex));
        observer.onError(ex);
      }, function () {
        map.getValues().forEach(function (item) { item.onCompleted(); });
        observer.onCompleted();
      }));

      return refCountDisposable;
    }, source);
  };

  var MapObservable = (function (__super__) {
    inherits(MapObservable, __super__);

    function MapObservable(source, selector, thisArg) {
      this.source = source;
      this.selector = bindCallback(selector, thisArg, 3);
      __super__.call(this);
    }

    MapObservable.prototype.internalMap = function (selector, thisArg) {
      var self = this;
      return new MapObservable(this.source, function (x, i, o) { return selector.call(this, self.selector(x, i, o), i, o); }, thisArg)
    };

    MapObservable.prototype.subscribeCore = function (observer) {
      return this.source.subscribe(new MapObserver(observer, this.selector, this));
    };

    return MapObservable;

  }(ObservableBase));

  function MapObserver(observer, selector, source) {
    this.observer = observer;
    this.selector = selector;
    this.source = source;
    this.i = 0;
    this.isStopped = false;
  }

  MapObserver.prototype.onNext = function(x) {
    if (this.isStopped) { return; }
    var result = tryCatch(this.selector).call(this, x, this.i++, this.source);
    if (result === errorObj) {
      return this.observer.onError(result.e);
    }
    this.observer.onNext(result);
  };
  MapObserver.prototype.onError = function (e) {
    if(!this.isStopped) { this.isStopped = true; this.observer.onError(e); }
  };
  MapObserver.prototype.onCompleted = function () {
    if(!this.isStopped) { this.isStopped = true; this.observer.onCompleted(); }
  };
  MapObserver.prototype.dispose = function() { this.isStopped = true; };
  MapObserver.prototype.fail = function (e) {
    if (!this.isStopped) {
      this.isStopped = true;
      this.observer.onError(e);
      return true;
    }

    return false;
  };

  /**
  * Projects each element of an observable sequence into a new form by incorporating the element's index.
  * @param {Function} selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
  * @param {Any} [thisArg] Object to use as this when executing callback.
  * @returns {Observable} An observable sequence whose elements are the result of invoking the transform function on each element of source.
  */
  observableProto.map = observableProto.select = function (selector, thisArg) {
    var selectorFn = typeof selector === 'function' ? selector : function () { return selector; };
    return this instanceof MapObservable ?
      this.internalMap(selectorFn, thisArg) :
      new MapObservable(this, selectorFn, thisArg);
  };

  /**
   * Retrieves the value of a specified nested property from all elements in
   * the Observable sequence.
   * @param {Arguments} arguments The nested properties to pluck.
   * @returns {Observable} Returns a new Observable sequence of property values.
   */
  observableProto.pluck = function () {
    var args = arguments, len = arguments.length;
    if (len === 0) { throw new Error('List of properties cannot be empty.'); }
    return this.map(function (x) {
      var currentProp = x;
      for (var i = 0; i < len; i++) {
        var p = currentProp[args[i]];
        if (typeof p !== 'undefined') {
          currentProp = p;
        } else {
          return undefined;
        }
      }
      return currentProp;
    });
  };

  function flatMap(source, selector, thisArg) {
    var selectorFunc = bindCallback(selector, thisArg, 3);
    return source.map(function (x, i) {
      var result = selectorFunc(x, i, source);
      isPromise(result) && (result = observableFromPromise(result));
      (isArrayLike(result) || isIterable(result)) && (result = observableFrom(result));
      return result;
    }).mergeAll();
  }

  /**
   *  One of the Following:
   *  Projects each element of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
   *
   * @example
   *  var res = source.selectMany(function (x) { return Rx.Observable.range(0, x); });
   *  Or:
   *  Projects each element of an observable sequence to an observable sequence, invokes the result selector for the source element and each of the corresponding inner sequence's elements, and merges the results into one observable sequence.
   *
   *  var res = source.selectMany(function (x) { return Rx.Observable.range(0, x); }, function (x, y) { return x + y; });
   *  Or:
   *  Projects each element of the source observable sequence to the other observable sequence and merges the resulting observable sequences into one observable sequence.
   *
   *  var res = source.selectMany(Rx.Observable.fromArray([1,2,3]));
   * @param {Function} selector A transform function to apply to each element or an observable sequence to project each element from the source sequence onto which could be either an observable or Promise.
   * @param {Function} [resultSelector]  A transform function to apply to each element of the intermediate sequence.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function collectionSelector on each element of the input sequence and then mapping each of those sequence elements and their corresponding source element to a result element.
   */
  observableProto.selectMany = observableProto.flatMap = function (selector, resultSelector, thisArg) {
    if (isFunction(selector) && isFunction(resultSelector)) {
      return this.flatMap(function (x, i) {
        var selectorResult = selector(x, i);
        isPromise(selectorResult) && (selectorResult = observableFromPromise(selectorResult));
        (isArrayLike(selectorResult) || isIterable(selectorResult)) && (selectorResult = observableFrom(selectorResult));

        return selectorResult.map(function (y, i2) {
          return resultSelector(x, y, i, i2);
        });
      }, thisArg);
    }
    return isFunction(selector) ?
      flatMap(this, selector, thisArg) :
      flatMap(this, function () { return selector; });
  };

  /**
   * Projects each notification of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
   * @param {Function} onNext A transform function to apply to each element; the second parameter of the function represents the index of the source element.
   * @param {Function} onError A transform function to apply when an error occurs in the source sequence.
   * @param {Function} onCompleted A transform function to apply when the end of the source sequence is reached.
   * @param {Any} [thisArg] An optional "this" to use to invoke each transform.
   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function corresponding to each notification in the input sequence.
   */
  observableProto.flatMapObserver = observableProto.selectManyObserver = function (onNext, onError, onCompleted, thisArg) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var index = 0;

      return source.subscribe(
        function (x) {
          var result;
          try {
            result = onNext.call(thisArg, x, index++);
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
        },
        function (err) {
          var result;
          try {
            result = onError.call(thisArg, err);
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        },
        function () {
          var result;
          try {
            result = onCompleted.call(thisArg);
          } catch (e) {
            observer.onError(e);
            return;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        });
    }, source).mergeAll();
  };

  /**
   *  Projects each element of an observable sequence into a new sequence of observable sequences by incorporating the element's index and then
   *  transforms an observable sequence of observable sequences into an observable sequence producing values only from the most recent observable sequence.
   * @param {Function} selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence whose elements are the result of invoking the transform function on each element of source producing an Observable of Observable sequences
   *  and that at any point in time produces the elements of the most recent inner observable sequence that has been received.
   */
  observableProto.selectSwitch = observableProto.flatMapLatest = observableProto.switchMap = function (selector, thisArg) {
    return this.select(selector, thisArg).switchLatest();
  };

  /**
   * Bypasses a specified number of elements in an observable sequence and then returns the remaining elements.
   * @param {Number} count The number of elements to skip before returning the remaining elements.
   * @returns {Observable} An observable sequence that contains the elements that occur after the specified index in the input sequence.
   */
  observableProto.skip = function (count) {
    if (count < 0) { throw new ArgumentOutOfRangeError(); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var remaining = count;
      return source.subscribe(function (x) {
        if (remaining <= 0) {
          o.onNext(x);
        } else {
          remaining--;
        }
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, source);
  };

  /**
   *  Bypasses elements in an observable sequence as long as a specified condition is true and then returns the remaining elements.
   *  The element's index is used in the logic of the predicate function.
   *
   *  var res = source.skipWhile(function (value) { return value < 10; });
   *  var res = source.skipWhile(function (value, index) { return value < 10 || index < 10; });
   * @param {Function} predicate A function to test each element for a condition; the second parameter of the function represents the index of the source element.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.
   */
  observableProto.skipWhile = function (predicate, thisArg) {
    var source = this,
        callback = bindCallback(predicate, thisArg, 3);
    return new AnonymousObservable(function (o) {
      var i = 0, running = false;
      return source.subscribe(function (x) {
        if (!running) {
          try {
            running = !callback(x, i++, source);
          } catch (e) {
            o.onError(e);
            return;
          }
        }
        running && o.onNext(x);
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, source);
  };

  /**
   *  Returns a specified number of contiguous elements from the start of an observable sequence, using the specified scheduler for the edge case of take(0).
   *
   *  var res = source.take(5);
   *  var res = source.take(0, Rx.Scheduler.timeout);
   * @param {Number} count The number of elements to return.
   * @param {Scheduler} [scheduler] Scheduler used to produce an OnCompleted message in case <paramref name="count count</paramref> is set to 0.
   * @returns {Observable} An observable sequence that contains the specified number of elements from the start of the input sequence.
   */
  observableProto.take = function (count, scheduler) {
    if (count < 0) { throw new ArgumentOutOfRangeError(); }
    if (count === 0) { return observableEmpty(scheduler); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var remaining = count;
      return source.subscribe(function (x) {
        if (remaining-- > 0) {
          o.onNext(x);
          remaining === 0 && o.onCompleted();
        }
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, source);
  };

  /**
   *  Returns elements from an observable sequence as long as a specified condition is true.
   *  The element's index is used in the logic of the predicate function.
   * @param {Function} predicate A function to test each element for a condition; the second parameter of the function represents the index of the source element.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence that contains the elements from the input sequence that occur before the element at which the test no longer passes.
   */
  observableProto.takeWhile = function (predicate, thisArg) {
    var source = this,
        callback = bindCallback(predicate, thisArg, 3);
    return new AnonymousObservable(function (o) {
      var i = 0, running = true;
      return source.subscribe(function (x) {
        if (running) {
          try {
            running = callback(x, i++, source);
          } catch (e) {
            o.onError(e);
            return;
          }
          if (running) {
            o.onNext(x);
          } else {
            o.onCompleted();
          }
        }
      }, function (e) { o.onError(e); }, function () { o.onCompleted(); });
    }, source);
  };

  var FilterObservable = (function (__super__) {
    inherits(FilterObservable, __super__);

    function FilterObservable(source, predicate, thisArg) {
      this.source = source;
      this.predicate = bindCallback(predicate, thisArg, 3);
      __super__.call(this);
    }

    FilterObservable.prototype.subscribeCore = function (observer) {
      return this.source.subscribe(new FilterObserver(observer, this.predicate, this));
    };

    FilterObservable.prototype.internalFilter = function(predicate, thisArg) {
      var self = this;
      return new FilterObservable(this.source, function(x, i, o) { return self.predicate(x, i, o) && predicate.call(this, x, i, o); }, thisArg);
    };

    return FilterObservable;

  }(ObservableBase));

  function FilterObserver(observer, predicate, source) {
    this.observer = observer;
    this.predicate = predicate;
    this.source = source;
    this.i = 0;
    this.isStopped = false;
  }

  FilterObserver.prototype.onNext = function(x) {
    if (this.isStopped) { return; }
    var shouldYield = tryCatch(this.predicate).call(this, x, this.i++, this.source);
    if (shouldYield === errorObj) {
      return this.observer.onError(shouldYield.e);
    }
    shouldYield && this.observer.onNext(x);
  };
  FilterObserver.prototype.onError = function (e) {
    if(!this.isStopped) { this.isStopped = true; this.observer.onError(e); }
  };
  FilterObserver.prototype.onCompleted = function () {
    if(!this.isStopped) { this.isStopped = true; this.observer.onCompleted(); }
  };
  FilterObserver.prototype.dispose = function() { this.isStopped = true; };
  FilterObserver.prototype.fail = function (e) {
    if (!this.isStopped) {
      this.isStopped = true;
      this.observer.onError(e);
      return true;
    }
    return false;
  };

  /**
  *  Filters the elements of an observable sequence based on a predicate by incorporating the element's index.
  * @param {Function} predicate A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
  * @param {Any} [thisArg] Object to use as this when executing callback.
  * @returns {Observable} An observable sequence that contains elements from the input sequence that satisfy the condition.
  */
  observableProto.filter = observableProto.where = function (predicate, thisArg) {
    return this instanceof FilterObservable ? this.internalFilter(predicate, thisArg) :
      new FilterObservable(this, predicate, thisArg);
  };

  function extremaBy(source, keySelector, comparer) {
    return new AnonymousObservable(function (o) {
      var hasValue = false, lastKey = null, list = [];
      return source.subscribe(function (x) {
        var comparison, key;
        try {
          key = keySelector(x);
        } catch (ex) {
          o.onError(ex);
          return;
        }
        comparison = 0;
        if (!hasValue) {
          hasValue = true;
          lastKey = key;
        } else {
          try {
            comparison = comparer(key, lastKey);
          } catch (ex1) {
            o.onError(ex1);
            return;
          }
        }
        if (comparison > 0) {
          lastKey = key;
          list = [];
        }
        if (comparison >= 0) { list.push(x); }
      }, function (e) { o.onError(e); }, function () {
        o.onNext(list);
        o.onCompleted();
      });
    }, source);
  }

  function firstOnly(x) {
    if (x.length === 0) { throw new EmptyError(); }
    return x[0];
  }

  /**
   * Applies an accumulator function over an observable sequence, returning the result of the aggregation as a single element in the result sequence. The specified seed value is used as the initial accumulator value.
   * For aggregation behavior with incremental intermediate results, see Observable.scan.
   * @deprecated Use #reduce instead
   * @param {Mixed} [seed] The initial accumulator value.
   * @param {Function} accumulator An accumulator function to be invoked on each element.
   * @returns {Observable} An observable sequence containing a single element with the final accumulator value.
   */
  observableProto.aggregate = function () {
    var hasSeed = false, accumulator, seed, source = this;
    if (arguments.length === 2) {
      hasSeed = true;
      seed = arguments[0];
      accumulator = arguments[1];
    } else {
      accumulator = arguments[0];
    }
    return new AnonymousObservable(function (o) {
      var hasAccumulation, accumulation, hasValue;
      return source.subscribe (
        function (x) {
          !hasValue && (hasValue = true);
          try {
            if (hasAccumulation) {
              accumulation = accumulator(accumulation, x);
            } else {
              accumulation = hasSeed ? accumulator(seed, x) : x;
              hasAccumulation = true;
            }
          } catch (e) {
            return o.onError(e);
          }
        },
        function (e) { o.onError(e); },
        function () {
          hasValue && o.onNext(accumulation);
          !hasValue && hasSeed && o.onNext(seed);
          !hasValue && !hasSeed && o.onError(new EmptyError());
          o.onCompleted();
        }
      );
    }, source);
  };

  /**
   * Applies an accumulator function over an observable sequence, returning the result of the aggregation as a single element in the result sequence. The specified seed value is used as the initial accumulator value.
   * For aggregation behavior with incremental intermediate results, see Observable.scan.
   * @param {Function} accumulator An accumulator function to be invoked on each element.
   * @param {Any} [seed] The initial accumulator value.
   * @returns {Observable} An observable sequence containing a single element with the final accumulator value.
   */
  observableProto.reduce = function (accumulator) {
    var hasSeed = false, seed, source = this;
    if (arguments.length === 2) {
      hasSeed = true;
      seed = arguments[1];
    }
    return new AnonymousObservable(function (o) {
      var hasAccumulation, accumulation, hasValue;
      return source.subscribe (
        function (x) {
          !hasValue && (hasValue = true);
          try {
            if (hasAccumulation) {
              accumulation = accumulator(accumulation, x);
            } else {
              accumulation = hasSeed ? accumulator(seed, x) : x;
              hasAccumulation = true;
            }
          } catch (e) {
            return o.onError(e);
          }
        },
        function (e) { o.onError(e); },
        function () {
          hasValue && o.onNext(accumulation);
          !hasValue && hasSeed && o.onNext(seed);
          !hasValue && !hasSeed && o.onError(new EmptyError());
          o.onCompleted();
        }
      );
    }, source);
  };

  /**
   * Determines whether any element of an observable sequence satisfies a condition if present, else if any items are in the sequence.
   * @param {Function} [predicate] A function to test each element for a condition.
   * @returns {Observable} An observable sequence containing a single element determining whether any elements in the source sequence pass the test in the specified predicate if given, else if any items are in the sequence.
   */
  observableProto.some = function (predicate, thisArg) {
    var source = this;
    return predicate ?
      source.filter(predicate, thisArg).some() :
      new AnonymousObservable(function (observer) {
        return source.subscribe(function () {
          observer.onNext(true);
          observer.onCompleted();
        }, function (e) { observer.onError(e); }, function () {
          observer.onNext(false);
          observer.onCompleted();
        });
      }, source);
  };

  /** @deprecated use #some instead */
  observableProto.any = function () {
    //deprecate('any', 'some');
    return this.some.apply(this, arguments);
  };

  /**
   * Determines whether an observable sequence is empty.
   * @returns {Observable} An observable sequence containing a single element determining whether the source sequence is empty.
   */
  observableProto.isEmpty = function () {
    return this.any().map(not);
  };

  /**
   * Determines whether all elements of an observable sequence satisfy a condition.
   * @param {Function} [predicate] A function to test each element for a condition.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence containing a single element determining whether all elements in the source sequence pass the test in the specified predicate.
   */
  observableProto.every = function (predicate, thisArg) {
    return this.filter(function (v) { return !predicate(v); }, thisArg).some().map(not);
  };

  /** @deprecated use #every instead */
  observableProto.all = function () {
    //deprecate('all', 'every');
    return this.every.apply(this, arguments);
  };

  /**
   * Determines whether an observable sequence includes a specified element with an optional equality comparer.
   * @param searchElement The value to locate in the source sequence.
   * @param {Number} [fromIndex] An equality comparer to compare elements.
   * @returns {Observable} An observable sequence containing a single element determining whether the source sequence includes an element that has the specified value from the given index.
   */
  observableProto.includes = function (searchElement, fromIndex) {
    var source = this;
    function comparer(a, b) {
      return (a === 0 && b === 0) || (a === b || (isNaN(a) && isNaN(b)));
    }
    return new AnonymousObservable(function (o) {
      var i = 0, n = +fromIndex || 0;
      Math.abs(n) === Infinity && (n = 0);
      if (n < 0) {
        o.onNext(false);
        o.onCompleted();
        return disposableEmpty;
      }
      return source.subscribe(
        function (x) {
          if (i++ >= n && comparer(x, searchElement)) {
            o.onNext(true);
            o.onCompleted();
          }
        },
        function (e) { o.onError(e); },
        function () {
          o.onNext(false);
          o.onCompleted();
        });
    }, this);
  };

  /**
   * @deprecated use #includes instead.
   */
  observableProto.contains = function (searchElement, fromIndex) {
    //deprecate('contains', 'includes');
    observableProto.includes(searchElement, fromIndex);
  };

  /**
   * Returns an observable sequence containing a value that represents how many elements in the specified observable sequence satisfy a condition if provided, else the count of items.
   * @example
   * res = source.count();
   * res = source.count(function (x) { return x > 3; });
   * @param {Function} [predicate]A function to test each element for a condition.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence containing a single element with a number that represents how many elements in the input sequence satisfy the condition in the predicate function if provided, else the count of items in the sequence.
   */
  observableProto.count = function (predicate, thisArg) {
    return predicate ?
      this.filter(predicate, thisArg).count() :
      this.reduce(function (count) { return count + 1; }, 0);
  };

  /**
   * Returns the first index at which a given element can be found in the observable sequence, or -1 if it is not present.
   * @param {Any} searchElement Element to locate in the array.
   * @param {Number} [fromIndex] The index to start the search.  If not specified, defaults to 0.
   * @returns {Observable} And observable sequence containing the first index at which a given element can be found in the observable sequence, or -1 if it is not present.
   */
  observableProto.indexOf = function(searchElement, fromIndex) {
    var source = this;
    return new AnonymousObservable(function (o) {
      var i = 0, n = +fromIndex || 0;
      Math.abs(n) === Infinity && (n = 0);
      if (n < 0) {
        o.onNext(-1);
        o.onCompleted();
        return disposableEmpty;
      }
      return source.subscribe(
        function (x) {
          if (i >= n && x === searchElement) {
            o.onNext(i);
            o.onCompleted();
          }
          i++;
        },
        function (e) { o.onError(e); },
        function () {
          o.onNext(-1);
          o.onCompleted();
        });
    }, source);
  };

  /**
   * Computes the sum of a sequence of values that are obtained by invoking an optional transform function on each element of the input sequence, else if not specified computes the sum on each item in the sequence.
   * @param {Function} [selector] A transform function to apply to each element.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence containing a single element with the sum of the values in the source sequence.
   */
  observableProto.sum = function (keySelector, thisArg) {
    return keySelector && isFunction(keySelector) ?
      this.map(keySelector, thisArg).sum() :
      this.reduce(function (prev, curr) { return prev + curr; }, 0);
  };

  /**
   * Returns the elements in an observable sequence with the minimum key value according to the specified comparer.
   * @example
   * var res = source.minBy(function (x) { return x.value; });
   * var res = source.minBy(function (x) { return x.value; }, function (x, y) { return x - y; });
   * @param {Function} keySelector Key selector function.
   * @param {Function} [comparer] Comparer used to compare key values.
   * @returns {Observable} An observable sequence containing a list of zero or more elements that have a minimum key value.
   */
  observableProto.minBy = function (keySelector, comparer) {
    comparer || (comparer = defaultSubComparer);
    return extremaBy(this, keySelector, function (x, y) { return comparer(x, y) * -1; });
  };

  /**
   * Returns the minimum element in an observable sequence according to the optional comparer else a default greater than less than check.
   * @example
   * var res = source.min();
   * var res = source.min(function (x, y) { return x.value - y.value; });
   * @param {Function} [comparer] Comparer used to compare elements.
   * @returns {Observable} An observable sequence containing a single element with the minimum element in the source sequence.
   */
  observableProto.min = function (comparer) {
    return this.minBy(identity, comparer).map(function (x) { return firstOnly(x); });
  };

  /**
   * Returns the elements in an observable sequence with the maximum  key value according to the specified comparer.
   * @example
   * var res = source.maxBy(function (x) { return x.value; });
   * var res = source.maxBy(function (x) { return x.value; }, function (x, y) { return x - y;; });
   * @param {Function} keySelector Key selector function.
   * @param {Function} [comparer]  Comparer used to compare key values.
   * @returns {Observable} An observable sequence containing a list of zero or more elements that have a maximum key value.
   */
  observableProto.maxBy = function (keySelector, comparer) {
    comparer || (comparer = defaultSubComparer);
    return extremaBy(this, keySelector, comparer);
  };

  /**
   * Returns the maximum value in an observable sequence according to the specified comparer.
   * @example
   * var res = source.max();
   * var res = source.max(function (x, y) { return x.value - y.value; });
   * @param {Function} [comparer] Comparer used to compare elements.
   * @returns {Observable} An observable sequence containing a single element with the maximum element in the source sequence.
   */
  observableProto.max = function (comparer) {
    return this.maxBy(identity, comparer).map(function (x) { return firstOnly(x); });
  };

  /**
   * Computes the average of an observable sequence of values that are in the sequence or obtained by invoking a transform function on each element of the input sequence if present.
   * @param {Function} [selector] A transform function to apply to each element.
   * @param {Any} [thisArg] Object to use as this when executing callback.
   * @returns {Observable} An observable sequence containing a single element with the average of the sequence of values.
   */
  observableProto.average = function (keySelector, thisArg) {
    return keySelector && isFunction(keySelector) ?
      this.map(keySelector, thisArg).average() :
      this.reduce(function (prev, cur) {
        return {
          sum: prev.sum + cur,
          count: prev.count + 1
        };
      }, {sum: 0, count: 0 }).map(function (s) {
        if (s.count === 0) { throw new EmptyError(); }
        return s.sum / s.count;
      });
  };

  /**
   *  Determines whether two sequences are equal by comparing the elements pairwise using a specified equality comparer.
   *
   * @example
   * var res = res = source.sequenceEqual([1,2,3]);
   * var res = res = source.sequenceEqual([{ value: 42 }], function (x, y) { return x.value === y.value; });
   * 3 - res = source.sequenceEqual(Rx.Observable.returnValue(42));
   * 4 - res = source.sequenceEqual(Rx.Observable.returnValue({ value: 42 }), function (x, y) { return x.value === y.value; });
   * @param {Observable} second Second observable sequence or array to compare.
   * @param {Function} [comparer] Comparer used to compare elements of both sequences.
   * @returns {Observable} An observable sequence that contains a single element which indicates whether both sequences are of equal length and their corresponding elements are equal according to the specified equality comparer.
   */
  observableProto.sequenceEqual = function (second, comparer) {
    var first = this;
    comparer || (comparer = defaultComparer);
    return new AnonymousObservable(function (o) {
      var donel = false, doner = false, ql = [], qr = [];
      var subscription1 = first.subscribe(function (x) {
        var equal, v;
        if (qr.length > 0) {
          v = qr.shift();
          try {
            equal = comparer(v, x);
          } catch (e) {
            o.onError(e);
            return;
          }
          if (!equal) {
            o.onNext(false);
            o.onCompleted();
          }
        } else if (doner) {
          o.onNext(false);
          o.onCompleted();
        } else {
          ql.push(x);
        }
      }, function(e) { o.onError(e); }, function () {
        donel = true;
        if (ql.length === 0) {
          if (qr.length > 0) {
            o.onNext(false);
            o.onCompleted();
          } else if (doner) {
            o.onNext(true);
            o.onCompleted();
          }
        }
      });

      (isArrayLike(second) || isIterable(second)) && (second = observableFrom(second));
      isPromise(second) && (second = observableFromPromise(second));
      var subscription2 = second.subscribe(function (x) {
        var equal;
        if (ql.length > 0) {
          var v = ql.shift();
          try {
            equal = comparer(v, x);
          } catch (exception) {
            o.onError(exception);
            return;
          }
          if (!equal) {
            o.onNext(false);
            o.onCompleted();
          }
        } else if (donel) {
          o.onNext(false);
          o.onCompleted();
        } else {
          qr.push(x);
        }
      }, function(e) { o.onError(e); }, function () {
        doner = true;
        if (qr.length === 0) {
          if (ql.length > 0) {
            o.onNext(false);
            o.onCompleted();
          } else if (donel) {
            o.onNext(true);
            o.onCompleted();
          }
        }
      });
      return new CompositeDisposable(subscription1, subscription2);
    }, first);
  };

  function elementAtOrDefault(source, index, hasDefault, defaultValue) {
    if (index < 0) { throw new ArgumentOutOfRangeError(); }
    return new AnonymousObservable(function (o) {
      var i = index;
      return source.subscribe(function (x) {
        if (i-- === 0) {
          o.onNext(x);
          o.onCompleted();
        }
      }, function (e) { o.onError(e); }, function () {
        if (!hasDefault) {
          o.onError(new ArgumentOutOfRangeError());
        } else {
          o.onNext(defaultValue);
          o.onCompleted();
        }
      });
    }, source);
  }

  /**
   * Returns the element at a specified index in a sequence.
   * @example
   * var res = source.elementAt(5);
   * @param {Number} index The zero-based index of the element to retrieve.
   * @returns {Observable} An observable sequence that produces the element at the specified position in the source sequence.
   */
  observableProto.elementAt =  function (index) {
    return elementAtOrDefault(this, index, false);
  };

  /**
   * Returns the element at a specified index in a sequence or a default value if the index is out of range.
   * @example
   * var res = source.elementAtOrDefault(5);
   * var res = source.elementAtOrDefault(5, 0);
   * @param {Number} index The zero-based index of the element to retrieve.
   * @param [defaultValue] The default value if the index is outside the bounds of the source sequence.
   * @returns {Observable} An observable sequence that produces the element at the specified position in the source sequence, or a default value if the index is outside the bounds of the source sequence.
   */
  observableProto.elementAtOrDefault = function (index, defaultValue) {
    return elementAtOrDefault(this, index, true, defaultValue);
  };

  function singleOrDefaultAsync(source, hasDefault, defaultValue) {
    return new AnonymousObservable(function (o) {
      var value = defaultValue, seenValue = false;
      return source.subscribe(function (x) {
        if (seenValue) {
          o.onError(new Error('Sequence contains more than one element'));
        } else {
          value = x;
          seenValue = true;
        }
      }, function (e) { o.onError(e); }, function () {
        if (!seenValue && !hasDefault) {
          o.onError(new EmptyError());
        } else {
          o.onNext(value);
          o.onCompleted();
        }
      });
    }, source);
  }

  /**
   * Returns the only element of an observable sequence that satisfies the condition in the optional predicate, and reports an exception if there is not exactly one element in the observable sequence.
   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the single element in the observable sequence that satisfies the condition in the predicate.
   */
  observableProto.single = function (predicate, thisArg) {
    return predicate && isFunction(predicate) ?
      this.where(predicate, thisArg).single() :
      singleOrDefaultAsync(this, false);
  };

  /**
   * Returns the only element of an observable sequence that matches the predicate, or a default value if no such element exists; this method reports an exception if there is more than one element in the observable sequence.
   * @example
   * var res = res = source.singleOrDefault();
   * var res = res = source.singleOrDefault(function (x) { return x === 42; });
   * res = source.singleOrDefault(function (x) { return x === 42; }, 0);
   * res = source.singleOrDefault(null, 0);
   * @memberOf Observable#
   * @param {Function} predicate A predicate function to evaluate for elements in the source sequence.
   * @param [defaultValue] The default value if the index is outside the bounds of the source sequence.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the single element in the observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
   */
  observableProto.singleOrDefault = function (predicate, defaultValue, thisArg) {
    return predicate && isFunction(predicate) ?
      this.filter(predicate, thisArg).singleOrDefault(null, defaultValue) :
      singleOrDefaultAsync(this, true, defaultValue);
  };

  function firstOrDefaultAsync(source, hasDefault, defaultValue) {
    return new AnonymousObservable(function (o) {
      return source.subscribe(function (x) {
        o.onNext(x);
        o.onCompleted();
      }, function (e) { o.onError(e); }, function () {
        if (!hasDefault) {
          o.onError(new EmptyError());
        } else {
          o.onNext(defaultValue);
          o.onCompleted();
        }
      });
    }, source);
  }

  /**
   * Returns the first element of an observable sequence that satisfies the condition in the predicate if present else the first item in the sequence.
   * @example
   * var res = res = source.first();
   * var res = res = source.first(function (x) { return x > 3; });
   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the first element in the observable sequence that satisfies the condition in the predicate if provided, else the first item in the sequence.
   */
  observableProto.first = function (predicate, thisArg) {
    return predicate ?
      this.where(predicate, thisArg).first() :
      firstOrDefaultAsync(this, false);
  };

  /**
   * Returns the first element of an observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
   * @param {Any} [defaultValue] The default value if no such element exists.  If not specified, defaults to null.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the first element in the observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
   */
  observableProto.firstOrDefault = function (predicate, defaultValue, thisArg) {
    return predicate ?
      this.where(predicate).firstOrDefault(null, defaultValue) :
      firstOrDefaultAsync(this, true, defaultValue);
  };

  function lastOrDefaultAsync(source, hasDefault, defaultValue) {
    return new AnonymousObservable(function (o) {
      var value = defaultValue, seenValue = false;
      return source.subscribe(function (x) {
        value = x;
        seenValue = true;
      }, function (e) { o.onError(e); }, function () {
        if (!seenValue && !hasDefault) {
          o.onError(new EmptyError());
        } else {
          o.onNext(value);
          o.onCompleted();
        }
      });
    }, source);
  }

  /**
   * Returns the last element of an observable sequence that satisfies the condition in the predicate if specified, else the last element.
   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the last element in the observable sequence that satisfies the condition in the predicate.
   */
  observableProto.last = function (predicate, thisArg) {
    return predicate ?
      this.where(predicate, thisArg).last() :
      lastOrDefaultAsync(this, false);
  };

  /**
   * Returns the last element of an observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
   * @param {Function} [predicate] A predicate function to evaluate for elements in the source sequence.
   * @param [defaultValue] The default value if no such element exists.  If not specified, defaults to null.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} Sequence containing the last element in the observable sequence that satisfies the condition in the predicate, or a default value if no such element exists.
   */
  observableProto.lastOrDefault = function (predicate, defaultValue, thisArg) {
    return predicate ?
      this.where(predicate, thisArg).lastOrDefault(null, defaultValue) :
      lastOrDefaultAsync(this, true, defaultValue);
  };

  function findValue (source, predicate, thisArg, yieldIndex) {
    var callback = bindCallback(predicate, thisArg, 3);
    return new AnonymousObservable(function (o) {
      var i = 0;
      return source.subscribe(function (x) {
        var shouldRun;
        try {
          shouldRun = callback(x, i, source);
        } catch (e) {
          o.onError(e);
          return;
        }
        if (shouldRun) {
          o.onNext(yieldIndex ? i : x);
          o.onCompleted();
        } else {
          i++;
        }
      }, function (e) { o.onError(e); }, function () {
        o.onNext(yieldIndex ? -1 : undefined);
        o.onCompleted();
      });
    }, source);
  }

  /**
   * Searches for an element that matches the conditions defined by the specified predicate, and returns the first occurrence within the entire Observable sequence.
   * @param {Function} predicate The predicate that defines the conditions of the element to search for.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} An Observable sequence with the first element that matches the conditions defined by the specified predicate, if found; otherwise, undefined.
   */
  observableProto.find = function (predicate, thisArg) {
    return findValue(this, predicate, thisArg, false);
  };

  /**
   * Searches for an element that matches the conditions defined by the specified predicate, and returns
   * an Observable sequence with the zero-based index of the first occurrence within the entire Observable sequence.
   * @param {Function} predicate The predicate that defines the conditions of the element to search for.
   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
   * @returns {Observable} An Observable sequence with the zero-based index of the first occurrence of an element that matches the conditions defined by match, if found; otherwise, –1.
  */
  observableProto.findIndex = function (predicate, thisArg) {
    return findValue(this, predicate, thisArg, true);
  };

  /**
   * Converts the observable sequence to a Set if it exists.
   * @returns {Observable} An observable sequence with a single value of a Set containing the values from the observable sequence.
   */
  observableProto.toSet = function () {
    if (typeof root.Set === 'undefined') { throw new TypeError(); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var s = new root.Set();
      return source.subscribe(
        function (x) { s.add(x); },
        function (e) { o.onError(e); },
        function () {
          o.onNext(s);
          o.onCompleted();
        });
    }, source);
  };

  /**
  * Converts the observable sequence to a Map if it exists.
  * @param {Function} keySelector A function which produces the key for the Map.
  * @param {Function} [elementSelector] An optional function which produces the element for the Map. If not present, defaults to the value from the observable sequence.
  * @returns {Observable} An observable sequence with a single value of a Map containing the values from the observable sequence.
  */
  observableProto.toMap = function (keySelector, elementSelector) {
    if (typeof root.Map === 'undefined') { throw new TypeError(); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var m = new root.Map();
      return source.subscribe(
        function (x) {
          var key;
          try {
            key = keySelector(x);
          } catch (e) {
            o.onError(e);
            return;
          }

          var element = x;
          if (elementSelector) {
            try {
              element = elementSelector(x);
            } catch (e) {
              o.onError(e);
              return;
            }
          }

          m.set(key, element);
        },
        function (e) { o.onError(e); },
        function () {
          o.onNext(m);
          o.onCompleted();
        });
    }, source);
  };

  var fnString = 'function',
      throwString = 'throw',
      isObject = Rx.internals.isObject;

  function toThunk(obj, ctx) {
    if (Array.isArray(obj)) {  return objectToThunk.call(ctx, obj); }
    if (isGeneratorFunction(obj)) { return observableSpawn(obj.call(ctx)); }
    if (isGenerator(obj)) {  return observableSpawn(obj); }
    if (isObservable(obj)) { return observableToThunk(obj); }
    if (isPromise(obj)) { return promiseToThunk(obj); }
    if (typeof obj === fnString) { return obj; }
    if (isObject(obj) || Array.isArray(obj)) { return objectToThunk.call(ctx, obj); }

    return obj;
  }

  function objectToThunk(obj) {
    var ctx = this;

    return function (done) {
      var keys = Object.keys(obj),
          pending = keys.length,
          results = new obj.constructor(),
          finished;

      if (!pending) {
        timeoutScheduler.schedule(function () { done(null, results); });
        return;
      }

      for (var i = 0, len = keys.length; i < len; i++) {
        run(obj[keys[i]], keys[i]);
      }

      function run(fn, key) {
        if (finished) { return; }
        try {
          fn = toThunk(fn, ctx);

          if (typeof fn !== fnString) {
            results[key] = fn;
            return --pending || done(null, results);
          }

          fn.call(ctx, function(err, res) {
            if (finished) { return; }

            if (err) {
              finished = true;
              return done(err);
            }

            results[key] = res;
            --pending || done(null, results);
          });
        } catch (e) {
          finished = true;
          done(e);
        }
      }
    }
  }

  function observableToThunk(observable) {
    return function (fn) {
      var value, hasValue = false;
      observable.subscribe(
        function (v) {
          value = v;
          hasValue = true;
        },
        fn,
        function () {
          hasValue && fn(null, value);
        });
    }
  }

  function promiseToThunk(promise) {
    return function(fn) {
      promise.then(function(res) {
        fn(null, res);
      }, fn);
    }
  }

  function isObservable(obj) {
    return obj && typeof obj.subscribe === fnString;
  }

  function isGeneratorFunction(obj) {
    return obj && obj.constructor && obj.constructor.name === 'GeneratorFunction';
  }

  function isGenerator(obj) {
    return obj && typeof obj.next === fnString && typeof obj[throwString] === fnString;
  }

  /*
   * Spawns a generator function which allows for Promises, Observable sequences, Arrays, Objects, Generators and functions.
   * @param {Function} The spawning function.
   * @returns {Function} a function which has a done continuation.
   */
  var observableSpawn = Rx.spawn = function (fn) {
    var isGenFun = isGeneratorFunction(fn);

    return function (done) {
      var ctx = this,
        gen = fn;

      if (isGenFun) {
        for(var args = [], i = 0, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
        var len = args.length,
          hasCallback = len && typeof args[len - 1] === fnString;

        done = hasCallback ? args.pop() : handleError;
        gen = fn.apply(this, args);
      } else {
        done = done || handleError;
      }

      next();

      function exit(err, res) {
        timeoutScheduler.schedule(done.bind(ctx, err, res));
      }

      function next(err, res) {
        var ret;

        // multiple args
        if (arguments.length > 2) {
          for(var res = [], i = 1, len = arguments.length; i < len; i++) { res.push(arguments[i]); }
        }

        if (err) {
          try {
            ret = gen[throwString](err);
          } catch (e) {
            return exit(e);
          }
        }

        if (!err) {
          try {
            ret = gen.next(res);
          } catch (e) {
            return exit(e);
          }
        }

        if (ret.done)  {
          return exit(null, ret.value);
        }

        ret.value = toThunk(ret.value, ctx);

        if (typeof ret.value === fnString) {
          var called = false;
          try {
            ret.value.call(ctx, function() {
              if (called) {
                return;
              }

              called = true;
              next.apply(ctx, arguments);
            });
          } catch (e) {
            timeoutScheduler.schedule(function () {
              if (called) {
                return;
              }

              called = true;
              next.call(ctx, e);
            });
          }
          return;
        }

        // Not supported
        next(new TypeError('Rx.spawn only supports a function, Promise, Observable, Object or Array.'));
      }
    }
  };

  function handleError(err) {
    if (!err) { return; }
    timeoutScheduler.schedule(function() {
      throw err;
    });
  }

  /**
   * Invokes the specified function asynchronously on the specified scheduler, surfacing the result through an observable sequence.
   *
   * @example
   * var res = Rx.Observable.start(function () { console.log('hello'); });
   * var res = Rx.Observable.start(function () { console.log('hello'); }, Rx.Scheduler.timeout);
   * var res = Rx.Observable.start(function () { this.log('hello'); }, Rx.Scheduler.timeout, console);
   *
   * @param {Function} func Function to run asynchronously.
   * @param {Scheduler} [scheduler]  Scheduler to run the function on. If not specified, defaults to Scheduler.timeout.
   * @param [context]  The context for the func parameter to be executed.  If not specified, defaults to undefined.
   * @returns {Observable} An observable sequence exposing the function's result value, or an exception.
   *
   * Remarks
   * * The function is called immediately, not during the subscription of the resulting sequence.
   * * Multiple subscriptions to the resulting sequence can observe the function's result.
   */
  Observable.start = function (func, context, scheduler) {
    return observableToAsync(func, context, scheduler)();
  };

  /**
   * Converts the function into an asynchronous function. Each invocation of the resulting asynchronous function causes an invocation of the original synchronous function on the specified scheduler.
   * @param {Function} function Function to convert to an asynchronous function.
   * @param {Scheduler} [scheduler] Scheduler to run the function on. If not specified, defaults to Scheduler.timeout.
   * @param {Mixed} [context] The context for the func parameter to be executed.  If not specified, defaults to undefined.
   * @returns {Function} Asynchronous function.
   */
  var observableToAsync = Observable.toAsync = function (func, context, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return function () {
      var args = arguments,
        subject = new AsyncSubject();

      scheduler.schedule(function () {
        var result;
        try {
          result = func.apply(context, args);
        } catch (e) {
          subject.onError(e);
          return;
        }
        subject.onNext(result);
        subject.onCompleted();
      });
      return subject.asObservable();
    };
  };

  /**
   * Converts a callback function to an observable sequence.
   *
   * @param {Function} function Function with a callback as the last parameter to convert to an Observable sequence.
   * @param {Mixed} [context] The context for the func parameter to be executed.  If not specified, defaults to undefined.
   * @param {Function} [selector] A selector which takes the arguments from the callback to produce a single item to yield on next.
   * @returns {Function} A function, when executed with the required parameters minus the callback, produces an Observable sequence with a single value of the arguments to the callback as an array.
   */
  Observable.fromCallback = function (func, context, selector) {
    return function () {
      var len = arguments.length, args = new Array(len)
      for(var i = 0; i < len; i++) { args[i] = arguments[i]; }

      return new AnonymousObservable(function (observer) {
        function handler() {
          var len = arguments.length, results = new Array(len);
          for(var i = 0; i < len; i++) { results[i] = arguments[i]; }

          if (selector) {
            try {
              results = selector.apply(context, results);
            } catch (e) {
              return observer.onError(e);
            }

            observer.onNext(results);
          } else {
            if (results.length <= 1) {
              observer.onNext.apply(observer, results);
            } else {
              observer.onNext(results);
            }
          }

          observer.onCompleted();
        }

        args.push(handler);
        func.apply(context, args);
      }).publishLast().refCount();
    };
  };

  /**
   * Converts a Node.js callback style function to an observable sequence.  This must be in function (err, ...) format.
   * @param {Function} func The function to call
   * @param {Mixed} [context] The context for the func parameter to be executed.  If not specified, defaults to undefined.
   * @param {Function} [selector] A selector which takes the arguments from the callback minus the error to produce a single item to yield on next.
   * @returns {Function} An async function which when applied, returns an observable sequence with the callback arguments as an array.
   */
  Observable.fromNodeCallback = function (func, context, selector) {
    return function () {
      var len = arguments.length, args = new Array(len);
      for(var i = 0; i < len; i++) { args[i] = arguments[i]; }

      return new AnonymousObservable(function (observer) {
        function handler(err) {
          if (err) {
            observer.onError(err);
            return;
          }

          var len = arguments.length, results = [];
          for(var i = 1; i < len; i++) { results[i - 1] = arguments[i]; }

          if (selector) {
            try {
              results = selector.apply(context, results);
            } catch (e) {
              return observer.onError(e);
            }
            observer.onNext(results);
          } else {
            if (results.length <= 1) {
              observer.onNext.apply(observer, results);
            } else {
              observer.onNext(results);
            }
          }

          observer.onCompleted();
        }

        args.push(handler);
        func.apply(context, args);
      }).publishLast().refCount();
    };
  };

  function createListener (element, name, handler) {
    if (element.addEventListener) {
      element.addEventListener(name, handler, false);
      return disposableCreate(function () {
        element.removeEventListener(name, handler, false);
      });
    }
    throw new Error('No listener found');
  }

  function createEventListener (el, eventName, handler) {
    var disposables = new CompositeDisposable();

    // Asume NodeList
    if (Object.prototype.toString.call(el) === '[object NodeList]') {
      for (var i = 0, len = el.length; i < len; i++) {
        disposables.add(createEventListener(el.item(i), eventName, handler));
      }
    } else if (el) {
      disposables.add(createListener(el, eventName, handler));
    }

    return disposables;
  }

  /**
   * Configuration option to determine whether to use native events only
   */
  Rx.config.useNativeEvents = false;

  /**
   * Creates an observable sequence by adding an event listener to the matching DOMElement or each item in the NodeList.
   *
   * @example
   *   var source = Rx.Observable.fromEvent(element, 'mouseup');
   *
   * @param {Object} element The DOMElement or NodeList to attach a listener.
   * @param {String} eventName The event name to attach the observable sequence.
   * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.
   * @returns {Observable} An observable sequence of events from the specified element and the specified event.
   */
  Observable.fromEvent = function (element, eventName, selector) {
    // Node.js specific
    if (element.addListener) {
      return fromEventPattern(
        function (h) { element.addListener(eventName, h); },
        function (h) { element.removeListener(eventName, h); },
        selector);
    }

    // Use only if non-native events are allowed
    if (!Rx.config.useNativeEvents) {
      // Handles jq, Angular.js, Zepto, Marionette, Ember.js
      if (typeof element.on === 'function' && typeof element.off === 'function') {
        return fromEventPattern(
          function (h) { element.on(eventName, h); },
          function (h) { element.off(eventName, h); },
          selector);
      }
    }
    return new AnonymousObservable(function (observer) {
      return createEventListener(
        element,
        eventName,
        function handler (e) {
          var results = e;

          if (selector) {
            try {
              results = selector(arguments);
            } catch (err) {
              return observer.onError(err);
            }
          }

          observer.onNext(results);
        });
    }).publish().refCount();
  };

  /**
   * Creates an observable sequence from an event emitter via an addHandler/removeHandler pair.
   * @param {Function} addHandler The function to add a handler to the emitter.
   * @param {Function} [removeHandler] The optional function to remove a handler from an emitter.
   * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.
   * @returns {Observable} An observable sequence which wraps an event from an event emitter
   */
  var fromEventPattern = Observable.fromEventPattern = function (addHandler, removeHandler, selector) {
    return new AnonymousObservable(function (observer) {
      function innerHandler (e) {
        var result = e;
        if (selector) {
          try {
            result = selector(arguments);
          } catch (err) {
            return observer.onError(err);
          }
        }
        observer.onNext(result);
      }

      var returnValue = addHandler(innerHandler);
      return disposableCreate(function () {
        if (removeHandler) {
          removeHandler(innerHandler, returnValue);
        }
      });
    }).publish().refCount();
  };

  /**
   * Invokes the asynchronous function, surfacing the result through an observable sequence.
   * @param {Function} functionAsync Asynchronous function which returns a Promise to run.
   * @returns {Observable} An observable sequence exposing the function's result value, or an exception.
   */
  Observable.startAsync = function (functionAsync) {
    var promise;
    try {
      promise = functionAsync();
    } catch (e) {
      return observableThrow(e);
    }
    return observableFromPromise(promise);
  }

  var PausableObservable = (function (__super__) {

    inherits(PausableObservable, __super__);

    function subscribe(observer) {
      var conn = this.source.publish(),
        subscription = conn.subscribe(observer),
        connection = disposableEmpty;

      var pausable = this.pauser.distinctUntilChanged().subscribe(function (b) {
        if (b) {
          connection = conn.connect();
        } else {
          connection.dispose();
          connection = disposableEmpty;
        }
      });

      return new CompositeDisposable(subscription, connection, pausable);
    }

    function PausableObservable(source, pauser) {
      this.source = source;
      this.controller = new Subject();

      if (pauser && pauser.subscribe) {
        this.pauser = this.controller.merge(pauser);
      } else {
        this.pauser = this.controller;
      }

      __super__.call(this, subscribe, source);
    }

    PausableObservable.prototype.pause = function () {
      this.controller.onNext(false);
    };

    PausableObservable.prototype.resume = function () {
      this.controller.onNext(true);
    };

    return PausableObservable;

  }(Observable));

  /**
   * Pauses the underlying observable sequence based upon the observable sequence which yields true/false.
   * @example
   * var pauser = new Rx.Subject();
   * var source = Rx.Observable.interval(100).pausable(pauser);
   * @param {Observable} pauser The observable sequence used to pause the underlying sequence.
   * @returns {Observable} The observable sequence which is paused based upon the pauser.
   */
  observableProto.pausable = function (pauser) {
    return new PausableObservable(this, pauser);
  };

  function combineLatestSource(source, subject, resultSelector) {
    return new AnonymousObservable(function (o) {
      var hasValue = [false, false],
        hasValueAll = false,
        isDone = false,
        values = new Array(2),
        err;

      function next(x, i) {
        values[i] = x
        var res;
        hasValue[i] = true;
        if (hasValueAll || (hasValueAll = hasValue.every(identity))) {
          if (err) {
            o.onError(err);
            return;
          }

          try {
            res = resultSelector.apply(null, values);
          } catch (ex) {
            o.onError(ex);
            return;
          }
          o.onNext(res);
        }
        if (isDone && values[1]) {
          o.onCompleted();
        }
      }

      return new CompositeDisposable(
        source.subscribe(
          function (x) {
            next(x, 0);
          },
          function (e) {
            if (values[1]) {
              o.onError(e);
            } else {
              err = e;
            }
          },
          function () {
            isDone = true;
            values[1] && o.onCompleted();
          }),
        subject.subscribe(
          function (x) {
            next(x, 1);
          },
          function (e) { o.onError(e); },
          function () {
            isDone = true;
            next(true, 1);
          })
        );
    }, source);
  }

  var PausableBufferedObservable = (function (__super__) {

    inherits(PausableBufferedObservable, __super__);

    function subscribe(o) {
      var q = [], previousShouldFire;

      var subscription =
        combineLatestSource(
          this.source,
          this.pauser.distinctUntilChanged().startWith(false),
          function (data, shouldFire) {
            return { data: data, shouldFire: shouldFire };
          })
          .subscribe(
            function (results) {
              if (previousShouldFire !== undefined && results.shouldFire != previousShouldFire) {
                previousShouldFire = results.shouldFire;
                // change in shouldFire
                if (results.shouldFire) {
                  while (q.length > 0) {
                    o.onNext(q.shift());
                  }
                }
              } else {
                previousShouldFire = results.shouldFire;
                // new data
                if (results.shouldFire) {
                  o.onNext(results.data);
                } else {
                  q.push(results.data);
                }
              }
            },
            function (err) {
              // Empty buffer before sending error
              while (q.length > 0) {
                o.onNext(q.shift());
              }
              o.onError(err);
            },
            function () {
              // Empty buffer before sending completion
              while (q.length > 0) {
                o.onNext(q.shift());
              }
              o.onCompleted();
            }
          );
      return subscription;
    }

    function PausableBufferedObservable(source, pauser) {
      this.source = source;
      this.controller = new Subject();

      if (pauser && pauser.subscribe) {
        this.pauser = this.controller.merge(pauser);
      } else {
        this.pauser = this.controller;
      }

      __super__.call(this, subscribe, source);
    }

    PausableBufferedObservable.prototype.pause = function () {
      this.controller.onNext(false);
    };

    PausableBufferedObservable.prototype.resume = function () {
      this.controller.onNext(true);
    };

    return PausableBufferedObservable;

  }(Observable));

  /**
   * Pauses the underlying observable sequence based upon the observable sequence which yields true/false,
   * and yields the values that were buffered while paused.
   * @example
   * var pauser = new Rx.Subject();
   * var source = Rx.Observable.interval(100).pausableBuffered(pauser);
   * @param {Observable} pauser The observable sequence used to pause the underlying sequence.
   * @returns {Observable} The observable sequence which is paused based upon the pauser.
   */
  observableProto.pausableBuffered = function (subject) {
    return new PausableBufferedObservable(this, subject);
  };

  var ControlledObservable = (function (__super__) {

    inherits(ControlledObservable, __super__);

    function subscribe (observer) {
      return this.source.subscribe(observer);
    }

    function ControlledObservable (source, enableQueue, scheduler) {
      __super__.call(this, subscribe, source);
      this.subject = new ControlledSubject(enableQueue, scheduler);
      this.source = source.multicast(this.subject).refCount();
    }

    ControlledObservable.prototype.request = function (numberOfItems) {
      return this.subject.request(numberOfItems == null ? -1 : numberOfItems);
    };

    return ControlledObservable;

  }(Observable));

  var ControlledSubject = (function (__super__) {

    function subscribe (observer) {
      return this.subject.subscribe(observer);
    }

    inherits(ControlledSubject, __super__);

    function ControlledSubject(enableQueue, scheduler) {
      enableQueue == null && (enableQueue = true);

      __super__.call(this, subscribe);
      this.subject = new Subject();
      this.enableQueue = enableQueue;
      this.queue = enableQueue ? [] : null;
      this.requestedCount = 0;
      this.requestedDisposable = disposableEmpty;
      this.error = null;
      this.hasFailed = false;
      this.hasCompleted = false;
      this.scheduler = scheduler || currentThreadScheduler;
    }

    addProperties(ControlledSubject.prototype, Observer, {
      onCompleted: function () {
        this.hasCompleted = true;
        if (!this.enableQueue || this.queue.length === 0) {
          this.subject.onCompleted();
        } else {
          this.queue.push(Notification.createOnCompleted());
        }
      },
      onError: function (error) {
        this.hasFailed = true;
        this.error = error;
        if (!this.enableQueue || this.queue.length === 0) {
          this.subject.onError(error);
        } else {
          this.queue.push(Notification.createOnError(error));
        }
      },
      onNext: function (value) {
        var hasRequested = false;

        if (this.requestedCount === 0) {
          this.enableQueue && this.queue.push(Notification.createOnNext(value));
        } else {
          (this.requestedCount !== -1 && this.requestedCount-- === 0) && this.disposeCurrentRequest();
          hasRequested = true;
        }
        hasRequested && this.subject.onNext(value);
      },
      _processRequest: function (numberOfItems) {
        if (this.enableQueue) {
          while ((this.queue.length >= numberOfItems && numberOfItems > 0) ||
          (this.queue.length > 0 && this.queue[0].kind !== 'N')) {
            var first = this.queue.shift();
            first.accept(this.subject);
            if (first.kind === 'N') {
              numberOfItems--;
            } else {
              this.disposeCurrentRequest();
              this.queue = [];
            }
          }

          return { numberOfItems : numberOfItems, returnValue: this.queue.length !== 0};
        }

        return { numberOfItems: numberOfItems, returnValue: false };
      },
      request: function (number) {
        this.disposeCurrentRequest();
        var self = this;

        this.requestedDisposable = this.scheduler.scheduleWithState(number,
        function(s, i) {
          var r = self._processRequest(i), remaining = r.numberOfItems;
          if (!r.returnValue) {
            self.requestedCount = remaining;
            self.requestedDisposable = disposableCreate(function () {
              self.requestedCount = 0;
            });
          }
        });

        return this.requestedDisposable;
      },
      disposeCurrentRequest: function () {
        this.requestedDisposable.dispose();
        this.requestedDisposable = disposableEmpty;
      }
    });

    return ControlledSubject;
  }(Observable));

  /**
   * Attaches a controller to the observable sequence with the ability to queue.
   * @example
   * var source = Rx.Observable.interval(100).controlled();
   * source.request(3); // Reads 3 values
   * @param {bool} enableQueue truthy value to determine if values should be queued pending the next request
   * @param {Scheduler} scheduler determines how the requests will be scheduled
   * @returns {Observable} The observable sequence which is paused based upon the pauser.
   */
  observableProto.controlled = function (enableQueue, scheduler) {

    if (enableQueue && isScheduler(enableQueue)) {
        scheduler = enableQueue;
        enableQueue = true;
    }

    if (enableQueue == null) {  enableQueue = true; }
    return new ControlledObservable(this, enableQueue, scheduler);
  };

  var StopAndWaitObservable = (function (__super__) {

    function subscribe (observer) {
      this.subscription = this.source.subscribe(new StopAndWaitObserver(observer, this, this.subscription));

      var self = this;
      timeoutScheduler.schedule(function () { self.source.request(1); });

      return this.subscription;
    }

    inherits(StopAndWaitObservable, __super__);

    function StopAndWaitObservable (source) {
      __super__.call(this, subscribe, source);
      this.source = source;
    }

    var StopAndWaitObserver = (function (__sub__) {

      inherits(StopAndWaitObserver, __sub__);

      function StopAndWaitObserver (observer, observable, cancel) {
        __sub__.call(this);
        this.observer = observer;
        this.observable = observable;
        this.cancel = cancel;
      }

      var stopAndWaitObserverProto = StopAndWaitObserver.prototype;

      stopAndWaitObserverProto.completed = function () {
        this.observer.onCompleted();
        this.dispose();
      };

      stopAndWaitObserverProto.error = function (error) {
        this.observer.onError(error);
        this.dispose();
      }

      stopAndWaitObserverProto.next = function (value) {
        this.observer.onNext(value);

        var self = this;
        timeoutScheduler.schedule(function () {
          self.observable.source.request(1);
        });
      };

      stopAndWaitObserverProto.dispose = function () {
        this.observer = null;
        if (this.cancel) {
          this.cancel.dispose();
          this.cancel = null;
        }
        __sub__.prototype.dispose.call(this);
      };

      return StopAndWaitObserver;
    }(AbstractObserver));

    return StopAndWaitObservable;
  }(Observable));


  /**
   * Attaches a stop and wait observable to the current observable.
   * @returns {Observable} A stop and wait observable.
   */
  ControlledObservable.prototype.stopAndWait = function () {
    return new StopAndWaitObservable(this);
  };

  var WindowedObservable = (function (__super__) {

    function subscribe (observer) {
      this.subscription = this.source.subscribe(new WindowedObserver(observer, this, this.subscription));

      var self = this;
      timeoutScheduler.schedule(function () {
        self.source.request(self.windowSize);
      });

      return this.subscription;
    }

    inherits(WindowedObservable, __super__);

    function WindowedObservable(source, windowSize) {
      __super__.call(this, subscribe, source);
      this.source = source;
      this.windowSize = windowSize;
    }

    var WindowedObserver = (function (__sub__) {

      inherits(WindowedObserver, __sub__);

      function WindowedObserver(observer, observable, cancel) {
        this.observer = observer;
        this.observable = observable;
        this.cancel = cancel;
        this.received = 0;
      }

      var windowedObserverPrototype = WindowedObserver.prototype;

      windowedObserverPrototype.completed = function () {
        this.observer.onCompleted();
        this.dispose();
      };

      windowedObserverPrototype.error = function (error) {
        this.observer.onError(error);
        this.dispose();
      };

      windowedObserverPrototype.next = function (value) {
        this.observer.onNext(value);

        this.received = ++this.received % this.observable.windowSize;
        if (this.received === 0) {
          var self = this;
          timeoutScheduler.schedule(function () {
            self.observable.source.request(self.observable.windowSize);
          });
        }
      };

      windowedObserverPrototype.dispose = function () {
        this.observer = null;
        if (this.cancel) {
          this.cancel.dispose();
          this.cancel = null;
        }
        __sub__.prototype.dispose.call(this);
      };

      return WindowedObserver;
    }(AbstractObserver));

    return WindowedObservable;
  }(Observable));

  /**
   * Creates a sliding windowed observable based upon the window size.
   * @param {Number} windowSize The number of items in the window
   * @returns {Observable} A windowed observable based upon the window size.
   */
  ControlledObservable.prototype.windowed = function (windowSize) {
    return new WindowedObservable(this, windowSize);
  };

  /**
   * Pipes the existing Observable sequence into a Node.js Stream.
   * @param {Stream} dest The destination Node.js stream.
   * @returns {Stream} The destination stream.
   */
  observableProto.pipe = function (dest) {
    var source = this.pausableBuffered();

    function onDrain() {
      source.resume();
    }

    dest.addListener('drain', onDrain);

    source.subscribe(
      function (x) {
        !dest.write(String(x)) && source.pause();
      },
      function (err) {
        dest.emit('error', err);
      },
      function () {
        // Hack check because STDIO is not closable
        !dest._isStdio && dest.end();
        dest.removeListener('drain', onDrain);
      });

    source.resume();

    return dest;
  };

  /**
   * Multicasts the source sequence notifications through an instantiated subject into all uses of the sequence within a selector function. Each
   * subscription to the resulting sequence causes a separate multicast invocation, exposing the sequence resulting from the selector function's
   * invocation. For specializations with fixed subject types, see Publish, PublishLast, and Replay.
   *
   * @example
   * 1 - res = source.multicast(observable);
   * 2 - res = source.multicast(function () { return new Subject(); }, function (x) { return x; });
   *
   * @param {Function|Subject} subjectOrSubjectSelector
   * Factory function to create an intermediate subject through which the source sequence's elements will be multicast to the selector function.
   * Or:
   * Subject to push source elements into.
   *
   * @param {Function} [selector] Optional selector function which can use the multicasted source sequence subject to the policies enforced by the created subject. Specified only if <paramref name="subjectOrSubjectSelector" is a factory function.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
   */
  observableProto.multicast = function (subjectOrSubjectSelector, selector) {
    var source = this;
    return typeof subjectOrSubjectSelector === 'function' ?
      new AnonymousObservable(function (observer) {
        var connectable = source.multicast(subjectOrSubjectSelector());
        return new CompositeDisposable(selector(connectable).subscribe(observer), connectable.connect());
      }, source) :
      new ConnectableObservable(source, subjectOrSubjectSelector);
  };

  /**
   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence.
   * This operator is a specialization of Multicast using a regular Subject.
   *
   * @example
   * var resres = source.publish();
   * var res = source.publish(function (x) { return x; });
   *
   * @param {Function} [selector] Selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
   */
  observableProto.publish = function (selector) {
    return selector && isFunction(selector) ?
      this.multicast(function () { return new Subject(); }, selector) :
      this.multicast(new Subject());
  };

  /**
   * Returns an observable sequence that shares a single subscription to the underlying sequence.
   * This operator is a specialization of publish which creates a subscription when the number of observers goes from zero to one, then shares that subscription with all subsequent observers until the number of observers returns to zero, at which point the subscription is disposed.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence.
   */
  observableProto.share = function () {
    return this.publish().refCount();
  };

  /**
   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence containing only the last notification.
   * This operator is a specialization of Multicast using a AsyncSubject.
   *
   * @example
   * var res = source.publishLast();
   * var res = source.publishLast(function (x) { return x; });
   *
   * @param selector [Optional] Selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will only receive the last notification of the source.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
   */
  observableProto.publishLast = function (selector) {
    return selector && isFunction(selector) ?
      this.multicast(function () { return new AsyncSubject(); }, selector) :
      this.multicast(new AsyncSubject());
  };

  /**
   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence and starts with initialValue.
   * This operator is a specialization of Multicast using a BehaviorSubject.
   *
   * @example
   * var res = source.publishValue(42);
   * var res = source.publishValue(function (x) { return x.select(function (y) { return y * y; }) }, 42);
   *
   * @param {Function} [selector] Optional selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will receive immediately receive the initial value, followed by all notifications of the source from the time of the subscription on.
   * @param {Mixed} initialValue Initial value received by observers upon subscription.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
   */
  observableProto.publishValue = function (initialValueOrSelector, initialValue) {
    return arguments.length === 2 ?
      this.multicast(function () {
        return new BehaviorSubject(initialValue);
      }, initialValueOrSelector) :
      this.multicast(new BehaviorSubject(initialValueOrSelector));
  };

  /**
   * Returns an observable sequence that shares a single subscription to the underlying sequence and starts with an initialValue.
   * This operator is a specialization of publishValue which creates a subscription when the number of observers goes from zero to one, then shares that subscription with all subsequent observers until the number of observers returns to zero, at which point the subscription is disposed.
   * @param {Mixed} initialValue Initial value received by observers upon subscription.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence.
   */
  observableProto.shareValue = function (initialValue) {
    return this.publishValue(initialValue).refCount();
  };

  /**
   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence replaying notifications subject to a maximum time length for the replay buffer.
   * This operator is a specialization of Multicast using a ReplaySubject.
   *
   * @example
   * var res = source.replay(null, 3);
   * var res = source.replay(null, 3, 500);
   * var res = source.replay(null, 3, 500, scheduler);
   * var res = source.replay(function (x) { return x.take(6).repeat(); }, 3, 500, scheduler);
   *
   * @param selector [Optional] Selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will receive all the notifications of the source subject to the specified replay buffer trimming policy.
   * @param bufferSize [Optional] Maximum element count of the replay buffer.
   * @param windowSize [Optional] Maximum time length of the replay buffer.
   * @param scheduler [Optional] Scheduler where connected observers within the selector function will be invoked on.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
   */
  observableProto.replay = function (selector, bufferSize, windowSize, scheduler) {
    return selector && isFunction(selector) ?
      this.multicast(function () { return new ReplaySubject(bufferSize, windowSize, scheduler); }, selector) :
      this.multicast(new ReplaySubject(bufferSize, windowSize, scheduler));
  };

  /**
   * Returns an observable sequence that shares a single subscription to the underlying sequence replaying notifications subject to a maximum time length for the replay buffer.
   * This operator is a specialization of replay which creates a subscription when the number of observers goes from zero to one, then shares that subscription with all subsequent observers until the number of observers returns to zero, at which point the subscription is disposed.
   *
   * @example
   * var res = source.shareReplay(3);
   * var res = source.shareReplay(3, 500);
   * var res = source.shareReplay(3, 500, scheduler);
   *

   * @param bufferSize [Optional] Maximum element count of the replay buffer.
   * @param window [Optional] Maximum time length of the replay buffer.
   * @param scheduler [Optional] Scheduler where connected observers within the selector function will be invoked on.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence.
   */
  observableProto.shareReplay = function (bufferSize, windowSize, scheduler) {
    return this.replay(null, bufferSize, windowSize, scheduler).refCount();
  };

  var InnerSubscription = function (subject, observer) {
    this.subject = subject;
    this.observer = observer;
  };

  InnerSubscription.prototype.dispose = function () {
    if (!this.subject.isDisposed && this.observer !== null) {
      var idx = this.subject.observers.indexOf(this.observer);
      this.subject.observers.splice(idx, 1);
      this.observer = null;
    }
  };

  /**
   *  Represents a value that changes over time.
   *  Observers can subscribe to the subject to receive the last (or initial) value and all subsequent notifications.
   */
  var BehaviorSubject = Rx.BehaviorSubject = (function (__super__) {
    function subscribe(observer) {
      checkDisposed(this);
      if (!this.isStopped) {
        this.observers.push(observer);
        observer.onNext(this.value);
        return new InnerSubscription(this, observer);
      }
      if (this.hasError) {
        observer.onError(this.error);
      } else {
        observer.onCompleted();
      }
      return disposableEmpty;
    }

    inherits(BehaviorSubject, __super__);

    /**
     *  Initializes a new instance of the BehaviorSubject class which creates a subject that caches its last value and starts with the specified value.
     *  @param {Mixed} value Initial value sent to observers when no other value has been received by the subject yet.
     */
    function BehaviorSubject(value) {
      __super__.call(this, subscribe);
      this.value = value,
      this.observers = [],
      this.isDisposed = false,
      this.isStopped = false,
      this.hasError = false;
    }

    addProperties(BehaviorSubject.prototype, Observer, {
      /**
       * Gets the current value or throws an exception.
       * Value is frozen after onCompleted is called.
       * After onError is called always throws the specified exception.
       * An exception is always thrown after dispose is called.
       * @returns {Mixed} The initial value passed to the constructor until onNext is called; after which, the last value passed to onNext.
       */
      getValue: function () {
          checkDisposed(this);
          if (this.hasError) {
              throw this.error;
          }
          return this.value;
      },
      /**
       * Indicates whether the subject has observers subscribed to it.
       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
       */
      hasObservers: function () { return this.observers.length > 0; },
      /**
       * Notifies all subscribed observers about the end of the sequence.
       */
      onCompleted: function () {
        checkDisposed(this);
        if (this.isStopped) { return; }
        this.isStopped = true;
        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          os[i].onCompleted();
        }

        this.observers.length = 0;
      },
      /**
       * Notifies all subscribed observers about the exception.
       * @param {Mixed} error The exception to send to all observers.
       */
      onError: function (error) {
        checkDisposed(this);
        if (this.isStopped) { return; }
        this.isStopped = true;
        this.hasError = true;
        this.error = error;

        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          os[i].onError(error);
        }

        this.observers.length = 0;
      },
      /**
       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
       * @param {Mixed} value The value to send to all observers.
       */
      onNext: function (value) {
        checkDisposed(this);
        if (this.isStopped) { return; }
        this.value = value;
        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          os[i].onNext(value);
        }
      },
      /**
       * Unsubscribe all observers and release resources.
       */
      dispose: function () {
        this.isDisposed = true;
        this.observers = null;
        this.value = null;
        this.exception = null;
      }
    });

    return BehaviorSubject;
  }(Observable));

  /**
   * Represents an object that is both an observable sequence as well as an observer.
   * Each notification is broadcasted to all subscribed and future observers, subject to buffer trimming policies.
   */
  var ReplaySubject = Rx.ReplaySubject = (function (__super__) {

    var maxSafeInteger = Math.pow(2, 53) - 1;

    function createRemovableDisposable(subject, observer) {
      return disposableCreate(function () {
        observer.dispose();
        !subject.isDisposed && subject.observers.splice(subject.observers.indexOf(observer), 1);
      });
    }

    function subscribe(observer) {
      var so = new ScheduledObserver(this.scheduler, observer),
        subscription = createRemovableDisposable(this, so);
      checkDisposed(this);
      this._trim(this.scheduler.now());
      this.observers.push(so);

      for (var i = 0, len = this.q.length; i < len; i++) {
        so.onNext(this.q[i].value);
      }

      if (this.hasError) {
        so.onError(this.error);
      } else if (this.isStopped) {
        so.onCompleted();
      }

      so.ensureActive();
      return subscription;
    }

    inherits(ReplaySubject, __super__);

    /**
     *  Initializes a new instance of the ReplaySubject class with the specified buffer size, window size and scheduler.
     *  @param {Number} [bufferSize] Maximum element count of the replay buffer.
     *  @param {Number} [windowSize] Maximum time length of the replay buffer.
     *  @param {Scheduler} [scheduler] Scheduler the observers are invoked on.
     */
    function ReplaySubject(bufferSize, windowSize, scheduler) {
      this.bufferSize = bufferSize == null ? maxSafeInteger : bufferSize;
      this.windowSize = windowSize == null ? maxSafeInteger : windowSize;
      this.scheduler = scheduler || currentThreadScheduler;
      this.q = [];
      this.observers = [];
      this.isStopped = false;
      this.isDisposed = false;
      this.hasError = false;
      this.error = null;
      __super__.call(this, subscribe);
    }

    addProperties(ReplaySubject.prototype, Observer.prototype, {
      /**
       * Indicates whether the subject has observers subscribed to it.
       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
       */
      hasObservers: function () {
        return this.observers.length > 0;
      },
      _trim: function (now) {
        while (this.q.length > this.bufferSize) {
          this.q.shift();
        }
        while (this.q.length > 0 && (now - this.q[0].interval) > this.windowSize) {
          this.q.shift();
        }
      },
      /**
       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
       * @param {Mixed} value The value to send to all observers.
       */
      onNext: function (value) {
        checkDisposed(this);
        if (this.isStopped) { return; }
        var now = this.scheduler.now();
        this.q.push({ interval: now, value: value });
        this._trim(now);

        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          var observer = os[i];
          observer.onNext(value);
          observer.ensureActive();
        }
      },
      /**
       * Notifies all subscribed observers about the exception.
       * @param {Mixed} error The exception to send to all observers.
       */
      onError: function (error) {
        checkDisposed(this);
        if (this.isStopped) { return; }
        this.isStopped = true;
        this.error = error;
        this.hasError = true;
        var now = this.scheduler.now();
        this._trim(now);
        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          var observer = os[i];
          observer.onError(error);
          observer.ensureActive();
        }
        this.observers.length = 0;
      },
      /**
       * Notifies all subscribed observers about the end of the sequence.
       */
      onCompleted: function () {
        checkDisposed(this);
        if (this.isStopped) { return; }
        this.isStopped = true;
        var now = this.scheduler.now();
        this._trim(now);
        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
          var observer = os[i];
          observer.onCompleted();
          observer.ensureActive();
        }
        this.observers.length = 0;
      },
      /**
       * Unsubscribe all observers and release resources.
       */
      dispose: function () {
        this.isDisposed = true;
        this.observers = null;
      }
    });

    return ReplaySubject;
  }(Observable));

  var ConnectableObservable = Rx.ConnectableObservable = (function (__super__) {
    inherits(ConnectableObservable, __super__);

    function ConnectableObservable(source, subject) {
      var hasSubscription = false,
        subscription,
        sourceObservable = source.asObservable();

      this.connect = function () {
        if (!hasSubscription) {
          hasSubscription = true;
          subscription = new CompositeDisposable(sourceObservable.subscribe(subject), disposableCreate(function () {
            hasSubscription = false;
          }));
        }
        return subscription;
      };

      __super__.call(this, function (o) { return subject.subscribe(o); });
    }

    ConnectableObservable.prototype.refCount = function () {
      var connectableSubscription, count = 0, source = this;
      return new AnonymousObservable(function (observer) {
          var shouldConnect = ++count === 1,
            subscription = source.subscribe(observer);
          shouldConnect && (connectableSubscription = source.connect());
          return function () {
            subscription.dispose();
            --count === 0 && connectableSubscription.dispose();
          };
      });
    };

    return ConnectableObservable;
  }(Observable));

  var Dictionary = (function () {

    var primes = [1, 3, 7, 13, 31, 61, 127, 251, 509, 1021, 2039, 4093, 8191, 16381, 32749, 65521, 131071, 262139, 524287, 1048573, 2097143, 4194301, 8388593, 16777213, 33554393, 67108859, 134217689, 268435399, 536870909, 1073741789, 2147483647],
      noSuchkey = "no such key",
      duplicatekey = "duplicate key";

    function isPrime(candidate) {
      if ((candidate & 1) === 0) { return candidate === 2; }
      var num1 = Math.sqrt(candidate),
        num2 = 3;
      while (num2 <= num1) {
        if (candidate % num2 === 0) { return false; }
        num2 += 2;
      }
      return true;
    }

    function getPrime(min) {
      var index, num, candidate;
      for (index = 0; index < primes.length; ++index) {
        num = primes[index];
        if (num >= min) { return num; }
      }
      candidate = min | 1;
      while (candidate < primes[primes.length - 1]) {
        if (isPrime(candidate)) { return candidate; }
        candidate += 2;
      }
      return min;
    }

    function stringHashFn(str) {
      var hash = 757602046;
      if (!str.length) { return hash; }
      for (var i = 0, len = str.length; i < len; i++) {
        var character = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash;
      }
      return hash;
    }

    function numberHashFn(key) {
      var c2 = 0x27d4eb2d;
      key = (key ^ 61) ^ (key >>> 16);
      key = key + (key << 3);
      key = key ^ (key >>> 4);
      key = key * c2;
      key = key ^ (key >>> 15);
      return key;
    }

    var getHashCode = (function () {
      var uniqueIdCounter = 0;

      return function (obj) {
        if (obj == null) { throw new Error(noSuchkey); }

        // Check for built-ins before tacking on our own for any object
        if (typeof obj === 'string') { return stringHashFn(obj); }
        if (typeof obj === 'number') { return numberHashFn(obj); }
        if (typeof obj === 'boolean') { return obj === true ? 1 : 0; }
        if (obj instanceof Date) { return numberHashFn(obj.valueOf()); }
        if (obj instanceof RegExp) { return stringHashFn(obj.toString()); }
        if (typeof obj.valueOf === 'function') {
          // Hack check for valueOf
          var valueOf = obj.valueOf();
          if (typeof valueOf === 'number') { return numberHashFn(valueOf); }
          if (typeof valueOf === 'string') { return stringHashFn(valueOf); }
        }
        if (obj.hashCode) { return obj.hashCode(); }

        var id = 17 * uniqueIdCounter++;
        obj.hashCode = function () { return id; };
        return id;
      };
    }());

    function newEntry() {
      return { key: null, value: null, next: 0, hashCode: 0 };
    }

    function Dictionary(capacity, comparer) {
      if (capacity < 0) { throw new ArgumentOutOfRangeError(); }
      if (capacity > 0) { this._initialize(capacity); }

      this.comparer = comparer || defaultComparer;
      this.freeCount = 0;
      this.size = 0;
      this.freeList = -1;
    }

    var dictionaryProto = Dictionary.prototype;

    dictionaryProto._initialize = function (capacity) {
      var prime = getPrime(capacity), i;
      this.buckets = new Array(prime);
      this.entries = new Array(prime);
      for (i = 0; i < prime; i++) {
        this.buckets[i] = -1;
        this.entries[i] = newEntry();
      }
      this.freeList = -1;
    };

    dictionaryProto.add = function (key, value) {
      this._insert(key, value, true);
    };

    dictionaryProto._insert = function (key, value, add) {
      if (!this.buckets) { this._initialize(0); }
      var index3,
        num = getHashCode(key) & 2147483647,
        index1 = num % this.buckets.length;
      for (var index2 = this.buckets[index1]; index2 >= 0; index2 = this.entries[index2].next) {
        if (this.entries[index2].hashCode === num && this.comparer(this.entries[index2].key, key)) {
          if (add) { throw new Error(duplicatekey); }
          this.entries[index2].value = value;
          return;
        }
      }
      if (this.freeCount > 0) {
        index3 = this.freeList;
        this.freeList = this.entries[index3].next;
        --this.freeCount;
      } else {
        if (this.size === this.entries.length) {
          this._resize();
          index1 = num % this.buckets.length;
        }
        index3 = this.size;
        ++this.size;
      }
      this.entries[index3].hashCode = num;
      this.entries[index3].next = this.buckets[index1];
      this.entries[index3].key = key;
      this.entries[index3].value = value;
      this.buckets[index1] = index3;
    };

    dictionaryProto._resize = function () {
      var prime = getPrime(this.size * 2),
        numArray = new Array(prime);
      for (index = 0; index < numArray.length; ++index) {  numArray[index] = -1; }
      var entryArray = new Array(prime);
      for (index = 0; index < this.size; ++index) { entryArray[index] = this.entries[index]; }
      for (var index = this.size; index < prime; ++index) { entryArray[index] = newEntry(); }
      for (var index1 = 0; index1 < this.size; ++index1) {
        var index2 = entryArray[index1].hashCode % prime;
        entryArray[index1].next = numArray[index2];
        numArray[index2] = index1;
      }
      this.buckets = numArray;
      this.entries = entryArray;
    };

    dictionaryProto.remove = function (key) {
      if (this.buckets) {
        var num = getHashCode(key) & 2147483647,
          index1 = num % this.buckets.length,
          index2 = -1;
        for (var index3 = this.buckets[index1]; index3 >= 0; index3 = this.entries[index3].next) {
          if (this.entries[index3].hashCode === num && this.comparer(this.entries[index3].key, key)) {
            if (index2 < 0) {
              this.buckets[index1] = this.entries[index3].next;
            } else {
              this.entries[index2].next = this.entries[index3].next;
            }
            this.entries[index3].hashCode = -1;
            this.entries[index3].next = this.freeList;
            this.entries[index3].key = null;
            this.entries[index3].value = null;
            this.freeList = index3;
            ++this.freeCount;
            return true;
          } else {
            index2 = index3;
          }
        }
      }
      return false;
    };

    dictionaryProto.clear = function () {
      var index, len;
      if (this.size <= 0) { return; }
      for (index = 0, len = this.buckets.length; index < len; ++index) {
        this.buckets[index] = -1;
      }
      for (index = 0; index < this.size; ++index) {
        this.entries[index] = newEntry();
      }
      this.freeList = -1;
      this.size = 0;
    };

    dictionaryProto._findEntry = function (key) {
      if (this.buckets) {
        var num = getHashCode(key) & 2147483647;
        for (var index = this.buckets[num % this.buckets.length]; index >= 0; index = this.entries[index].next) {
          if (this.entries[index].hashCode === num && this.comparer(this.entries[index].key, key)) {
            return index;
          }
        }
      }
      return -1;
    };

    dictionaryProto.count = function () {
      return this.size - this.freeCount;
    };

    dictionaryProto.tryGetValue = function (key) {
      var entry = this._findEntry(key);
      return entry >= 0 ?
        this.entries[entry].value :
        undefined;
    };

    dictionaryProto.getValues = function () {
      var index = 0, results = [];
      if (this.entries) {
        for (var index1 = 0; index1 < this.size; index1++) {
          if (this.entries[index1].hashCode >= 0) {
            results[index++] = this.entries[index1].value;
          }
        }
      }
      return results;
    };

    dictionaryProto.get = function (key) {
      var entry = this._findEntry(key);
      if (entry >= 0) { return this.entries[entry].value; }
      throw new Error(noSuchkey);
    };

    dictionaryProto.set = function (key, value) {
      this._insert(key, value, false);
    };

    dictionaryProto.containskey = function (key) {
      return this._findEntry(key) >= 0;
    };

    return Dictionary;
  }());

  /**
   *  Correlates the elements of two sequences based on overlapping durations.
   *
   *  @param {Observable} right The right observable sequence to join elements for.
   *  @param {Function} leftDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the left observable sequence, used to determine overlap.
   *  @param {Function} rightDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the right observable sequence, used to determine overlap.
   *  @param {Function} resultSelector A function invoked to compute a result element for any two overlapping elements of the left and right observable sequences. The parameters passed to the function correspond with the elements from the left and right source sequences for which overlap occurs.
   *  @returns {Observable} An observable sequence that contains result elements computed from source elements that have an overlapping duration.
   */
  observableProto.join = function (right, leftDurationSelector, rightDurationSelector, resultSelector) {
    var left = this;
    return new AnonymousObservable(function (observer) {
      var group = new CompositeDisposable();
      var leftDone = false, rightDone = false;
      var leftId = 0, rightId = 0;
      var leftMap = new Dictionary(), rightMap = new Dictionary();

      group.add(left.subscribe(
        function (value) {
          var id = leftId++;
          var md = new SingleAssignmentDisposable();

          leftMap.add(id, value);
          group.add(md);

          var expire = function () {
            leftMap.remove(id) && leftMap.count() === 0 && leftDone && observer.onCompleted();
            group.remove(md);
          };

          var duration;
          try {
            duration = leftDurationSelector(value);
          } catch (e) {
            observer.onError(e);
            return;
          }

          md.setDisposable(duration.take(1).subscribe(noop, observer.onError.bind(observer), expire));

          rightMap.getValues().forEach(function (v) {
            var result;
            try {
              result = resultSelector(value, v);
            } catch (exn) {
              observer.onError(exn);
              return;
            }

            observer.onNext(result);
          });
        },
        observer.onError.bind(observer),
        function () {
          leftDone = true;
          (rightDone || leftMap.count() === 0) && observer.onCompleted();
        })
      );

      group.add(right.subscribe(
        function (value) {
          var id = rightId++;
          var md = new SingleAssignmentDisposable();

          rightMap.add(id, value);
          group.add(md);

          var expire = function () {
            rightMap.remove(id) && rightMap.count() === 0 && rightDone && observer.onCompleted();
            group.remove(md);
          };

          var duration;
          try {
            duration = rightDurationSelector(value);
          } catch (e) {
            observer.onError(e);
            return;
          }

          md.setDisposable(duration.take(1).subscribe(noop, observer.onError.bind(observer), expire));

          leftMap.getValues().forEach(function (v) {
            var result;
            try {
              result = resultSelector(v, value);
            } catch (exn) {
              observer.onError(exn);
              return;
            }

            observer.onNext(result);
          });
        },
        observer.onError.bind(observer),
        function () {
          rightDone = true;
          (leftDone || rightMap.count() === 0) && observer.onCompleted();
        })
      );
      return group;
    }, left);
  };

  /**
   *  Correlates the elements of two sequences based on overlapping durations, and groups the results.
   *
   *  @param {Observable} right The right observable sequence to join elements for.
   *  @param {Function} leftDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the left observable sequence, used to determine overlap.
   *  @param {Function} rightDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the right observable sequence, used to determine overlap.
   *  @param {Function} resultSelector A function invoked to compute a result element for any element of the left sequence with overlapping elements from the right observable sequence. The first parameter passed to the function is an element of the left sequence. The second parameter passed to the function is an observable sequence with elements from the right sequence that overlap with the left sequence's element.
   *  @returns {Observable} An observable sequence that contains result elements computed from source elements that have an overlapping duration.
   */
  observableProto.groupJoin = function (right, leftDurationSelector, rightDurationSelector, resultSelector) {
    var left = this;
    return new AnonymousObservable(function (observer) {
      var group = new CompositeDisposable();
      var r = new RefCountDisposable(group);
      var leftMap = new Dictionary(), rightMap = new Dictionary();
      var leftId = 0, rightId = 0;

      function handleError(e) { return function (v) { v.onError(e); }; };

      group.add(left.subscribe(
        function (value) {
          var s = new Subject();
          var id = leftId++;
          leftMap.add(id, s);

          var result;
          try {
            result = resultSelector(value, addRef(s, r));
          } catch (e) {
            leftMap.getValues().forEach(handleError(e));
            observer.onError(e);
            return;
          }
          observer.onNext(result);

          rightMap.getValues().forEach(function (v) { s.onNext(v); });

          var md = new SingleAssignmentDisposable();
          group.add(md);

          var expire = function () {
            leftMap.remove(id) && s.onCompleted();
            group.remove(md);
          };

          var duration;
          try {
            duration = leftDurationSelector(value);
          } catch (e) {
            leftMap.getValues().forEach(handleError(e));
            observer.onError(e);
            return;
          }

          md.setDisposable(duration.take(1).subscribe(
            noop,
            function (e) {
              leftMap.getValues().forEach(handleError(e));
              observer.onError(e);
            },
            expire)
          );
        },
        function (e) {
          leftMap.getValues().forEach(handleError(e));
          observer.onError(e);
        },
        observer.onCompleted.bind(observer))
      );

      group.add(right.subscribe(
        function (value) {
          var id = rightId++;
          rightMap.add(id, value);

          var md = new SingleAssignmentDisposable();
          group.add(md);

          var expire = function () {
            rightMap.remove(id);
            group.remove(md);
          };

          var duration;
          try {
            duration = rightDurationSelector(value);
          } catch (e) {
            leftMap.getValues().forEach(handleError(e));
            observer.onError(e);
            return;
          }
          md.setDisposable(duration.take(1).subscribe(
            noop,
            function (e) {
              leftMap.getValues().forEach(handleError(e));
              observer.onError(e);
            },
            expire)
          );

          leftMap.getValues().forEach(function (v) { v.onNext(value); });
        },
        function (e) {
          leftMap.getValues().forEach(handleError(e));
          observer.onError(e);
        })
      );

      return r;
    }, left);
  };

    /**
     *  Projects each element of an observable sequence into zero or more buffers.
     *
     *  @param {Mixed} bufferOpeningsOrClosingSelector Observable sequence whose elements denote the creation of new windows, or, a function invoked to define the boundaries of the produced windows (a new window is started when the previous one is closed, resulting in non-overlapping windows).
     *  @param {Function} [bufferClosingSelector] A function invoked to define the closing of each produced window. If a closing selector function is specified for the first parameter, this parameter is ignored.
     *  @returns {Observable} An observable sequence of windows.
     */
    observableProto.buffer = function (bufferOpeningsOrClosingSelector, bufferClosingSelector) {
        return this.window.apply(this, arguments).selectMany(function (x) { return x.toArray(); });
    };

  /**
   *  Projects each element of an observable sequence into zero or more windows.
   *
   *  @param {Mixed} windowOpeningsOrClosingSelector Observable sequence whose elements denote the creation of new windows, or, a function invoked to define the boundaries of the produced windows (a new window is started when the previous one is closed, resulting in non-overlapping windows).
   *  @param {Function} [windowClosingSelector] A function invoked to define the closing of each produced window. If a closing selector function is specified for the first parameter, this parameter is ignored.
   *  @returns {Observable} An observable sequence of windows.
   */
  observableProto.window = function (windowOpeningsOrClosingSelector, windowClosingSelector) {
    if (arguments.length === 1 && typeof arguments[0] !== 'function') {
      return observableWindowWithBoundaries.call(this, windowOpeningsOrClosingSelector);
    }
    return typeof windowOpeningsOrClosingSelector === 'function' ?
      observableWindowWithClosingSelector.call(this, windowOpeningsOrClosingSelector) :
      observableWindowWithOpenings.call(this, windowOpeningsOrClosingSelector, windowClosingSelector);
  };

  function observableWindowWithOpenings(windowOpenings, windowClosingSelector) {
    return windowOpenings.groupJoin(this, windowClosingSelector, observableEmpty, function (_, win) {
      return win;
    });
  }

  function observableWindowWithBoundaries(windowBoundaries) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var win = new Subject(),
        d = new CompositeDisposable(),
        r = new RefCountDisposable(d);

      observer.onNext(addRef(win, r));

      d.add(source.subscribe(function (x) {
        win.onNext(x);
      }, function (err) {
        win.onError(err);
        observer.onError(err);
      }, function () {
        win.onCompleted();
        observer.onCompleted();
      }));

      isPromise(windowBoundaries) && (windowBoundaries = observableFromPromise(windowBoundaries));

      d.add(windowBoundaries.subscribe(function (w) {
        win.onCompleted();
        win = new Subject();
        observer.onNext(addRef(win, r));
      }, function (err) {
        win.onError(err);
        observer.onError(err);
      }, function () {
        win.onCompleted();
        observer.onCompleted();
      }));

      return r;
    }, source);
  }

  function observableWindowWithClosingSelector(windowClosingSelector) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var m = new SerialDisposable(),
        d = new CompositeDisposable(m),
        r = new RefCountDisposable(d),
        win = new Subject();
      observer.onNext(addRef(win, r));
      d.add(source.subscribe(function (x) {
          win.onNext(x);
      }, function (err) {
          win.onError(err);
          observer.onError(err);
      }, function () {
          win.onCompleted();
          observer.onCompleted();
      }));

      function createWindowClose () {
        var windowClose;
        try {
          windowClose = windowClosingSelector();
        } catch (e) {
          observer.onError(e);
          return;
        }

        isPromise(windowClose) && (windowClose = observableFromPromise(windowClose));

        var m1 = new SingleAssignmentDisposable();
        m.setDisposable(m1);
        m1.setDisposable(windowClose.take(1).subscribe(noop, function (err) {
          win.onError(err);
          observer.onError(err);
        }, function () {
          win.onCompleted();
          win = new Subject();
          observer.onNext(addRef(win, r));
          createWindowClose();
        }));
      }

      createWindowClose();
      return r;
    }, source);
  }

  /**
   * Returns a new observable that triggers on the second and subsequent triggerings of the input observable.
   * The Nth triggering of the input observable passes the arguments from the N-1th and Nth triggering as a pair.
   * The argument passed to the N-1th triggering is held in hidden internal state until the Nth triggering occurs.
   * @returns {Observable} An observable that triggers on successive pairs of observations from the input observable as an array.
   */
  observableProto.pairwise = function () {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var previous, hasPrevious = false;
      return source.subscribe(
        function (x) {
          if (hasPrevious) {
            observer.onNext([previous, x]);
          } else {
            hasPrevious = true;
          }
          previous = x;
        },
        observer.onError.bind(observer),
        observer.onCompleted.bind(observer));
    }, source);
  };

  /**
   * Returns two observables which partition the observations of the source by the given function.
   * The first will trigger observations for those values for which the predicate returns true.
   * The second will trigger observations for those values where the predicate returns false.
   * The predicate is executed once for each subscribed observer.
   * Both also propagate all error observations arising from the source and each completes
   * when the source completes.
   * @param {Function} predicate
   *    The function to determine which output Observable will trigger a particular observation.
   * @returns {Array}
   *    An array of observables. The first triggers when the predicate returns true,
   *    and the second triggers when the predicate returns false.
  */
  observableProto.partition = function(predicate, thisArg) {
    return [
      this.filter(predicate, thisArg),
      this.filter(function (x, i, o) { return !predicate.call(thisArg, x, i, o); })
    ];
  };

  function enumerableWhile(condition, source) {
    return new Enumerable(function () {
      return new Enumerator(function () {
        return condition() ?
          { done: false, value: source } :
          { done: true, value: undefined };
      });
    });
  }

   /**
   *  Returns an observable sequence that is the result of invoking the selector on the source sequence, without sharing subscriptions.
   *  This operator allows for a fluent style of writing queries that use the same sequence multiple times.
   *
   * @param {Function} selector Selector function which can use the source sequence as many times as needed, without sharing subscriptions to the source sequence.
   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
   */
  observableProto.letBind = observableProto['let'] = function (func) {
    return func(this);
  };

   /**
   *  Determines whether an observable collection contains values. There is an alias for this method called 'ifThen' for browsers <IE9
   *
   * @example
   *  1 - res = Rx.Observable.if(condition, obs1);
   *  2 - res = Rx.Observable.if(condition, obs1, obs2);
   *  3 - res = Rx.Observable.if(condition, obs1, scheduler);
   * @param {Function} condition The condition which determines if the thenSource or elseSource will be run.
   * @param {Observable} thenSource The observable sequence or Promise that will be run if the condition function returns true.
   * @param {Observable} [elseSource] The observable sequence or Promise that will be run if the condition function returns false. If this is not provided, it defaults to Rx.Observabe.Empty with the specified scheduler.
   * @returns {Observable} An observable sequence which is either the thenSource or elseSource.
   */
  Observable['if'] = Observable.ifThen = function (condition, thenSource, elseSourceOrScheduler) {
    return observableDefer(function () {
      elseSourceOrScheduler || (elseSourceOrScheduler = observableEmpty());

      isPromise(thenSource) && (thenSource = observableFromPromise(thenSource));
      isPromise(elseSourceOrScheduler) && (elseSourceOrScheduler = observableFromPromise(elseSourceOrScheduler));

      // Assume a scheduler for empty only
      typeof elseSourceOrScheduler.now === 'function' && (elseSourceOrScheduler = observableEmpty(elseSourceOrScheduler));
      return condition() ? thenSource : elseSourceOrScheduler;
    });
  };

   /**
   *  Concatenates the observable sequences obtained by running the specified result selector for each element in source.
   * There is an alias for this method called 'forIn' for browsers <IE9
   * @param {Array} sources An array of values to turn into an observable sequence.
   * @param {Function} resultSelector A function to apply to each item in the sources array to turn it into an observable sequence.
   * @returns {Observable} An observable sequence from the concatenated observable sequences.
   */
  Observable['for'] = Observable.forIn = function (sources, resultSelector, thisArg) {
    return enumerableOf(sources, resultSelector, thisArg).concat();
  };

   /**
   *  Repeats source as long as condition holds emulating a while loop.
   * There is an alias for this method called 'whileDo' for browsers <IE9
   *
   * @param {Function} condition The condition which determines if the source will be repeated.
   * @param {Observable} source The observable sequence that will be run if the condition function returns true.
   * @returns {Observable} An observable sequence which is repeated as long as the condition holds.
   */
  var observableWhileDo = Observable['while'] = Observable.whileDo = function (condition, source) {
    isPromise(source) && (source = observableFromPromise(source));
    return enumerableWhile(condition, source).concat();
  };

   /**
   *  Repeats source as long as condition holds emulating a do while loop.
   *
   * @param {Function} condition The condition which determines if the source will be repeated.
   * @param {Observable} source The observable sequence that will be run if the condition function returns true.
   * @returns {Observable} An observable sequence which is repeated as long as the condition holds.
   */
  observableProto.doWhile = function (condition) {
    return observableConcat([this, observableWhileDo(condition, this)]);
  };

   /**
   *  Uses selector to determine which source in sources to use.
   *  There is an alias 'switchCase' for browsers <IE9.
   *
   * @example
   *  1 - res = Rx.Observable.case(selector, { '1': obs1, '2': obs2 });
   *  1 - res = Rx.Observable.case(selector, { '1': obs1, '2': obs2 }, obs0);
   *  1 - res = Rx.Observable.case(selector, { '1': obs1, '2': obs2 }, scheduler);
   *
   * @param {Function} selector The function which extracts the value for to test in a case statement.
   * @param {Array} sources A object which has keys which correspond to the case statement labels.
   * @param {Observable} [elseSource] The observable sequence or Promise that will be run if the sources are not matched. If this is not provided, it defaults to Rx.Observabe.empty with the specified scheduler.
   *
   * @returns {Observable} An observable sequence which is determined by a case statement.
   */
  Observable['case'] = Observable.switchCase = function (selector, sources, defaultSourceOrScheduler) {
    return observableDefer(function () {
      isPromise(defaultSourceOrScheduler) && (defaultSourceOrScheduler = observableFromPromise(defaultSourceOrScheduler));
      defaultSourceOrScheduler || (defaultSourceOrScheduler = observableEmpty());

      typeof defaultSourceOrScheduler.now === 'function' && (defaultSourceOrScheduler = observableEmpty(defaultSourceOrScheduler));

      var result = sources[selector()];
      isPromise(result) && (result = observableFromPromise(result));

      return result || defaultSourceOrScheduler;
    });
  };

   /**
   *  Expands an observable sequence by recursively invoking selector.
   *
   * @param {Function} selector Selector function to invoke for each produced element, resulting in another sequence to which the selector will be invoked recursively again.
   * @param {Scheduler} [scheduler] Scheduler on which to perform the expansion. If not provided, this defaults to the current thread scheduler.
   * @returns {Observable} An observable sequence containing all the elements produced by the recursive expansion.
   */
  observableProto.expand = function (selector, scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    var source = this;
    return new AnonymousObservable(function (observer) {
      var q = [],
        m = new SerialDisposable(),
        d = new CompositeDisposable(m),
        activeCount = 0,
        isAcquired = false;

      var ensureActive = function () {
        var isOwner = false;
        if (q.length > 0) {
          isOwner = !isAcquired;
          isAcquired = true;
        }
        if (isOwner) {
          m.setDisposable(scheduler.scheduleRecursive(function (self) {
            var work;
            if (q.length > 0) {
              work = q.shift();
            } else {
              isAcquired = false;
              return;
            }
            var m1 = new SingleAssignmentDisposable();
            d.add(m1);
            m1.setDisposable(work.subscribe(function (x) {
              observer.onNext(x);
              var result = null;
              try {
                result = selector(x);
              } catch (e) {
                observer.onError(e);
              }
              q.push(result);
              activeCount++;
              ensureActive();
            }, observer.onError.bind(observer), function () {
              d.remove(m1);
              activeCount--;
              if (activeCount === 0) {
                observer.onCompleted();
              }
            }));
            self();
          }));
        }
      };

      q.push(source);
      activeCount++;
      ensureActive();
      return d;
    }, this);
  };

   /**
   *  Runs all observable sequences in parallel and collect their last elements.
   *
   * @example
   *  1 - res = Rx.Observable.forkJoin([obs1, obs2]);
   *  1 - res = Rx.Observable.forkJoin(obs1, obs2, ...);
   * @returns {Observable} An observable sequence with an array collecting the last elements of all the input sequences.
   */
  Observable.forkJoin = function () {
    var allSources = [];
    if (Array.isArray(arguments[0])) {
      allSources = arguments[0];
    } else {
      for(var i = 0, len = arguments.length; i < len; i++) { allSources.push(arguments[i]); }
    }
    return new AnonymousObservable(function (subscriber) {
      var count = allSources.length;
      if (count === 0) {
        subscriber.onCompleted();
        return disposableEmpty;
      }
      var group = new CompositeDisposable(),
        finished = false,
        hasResults = new Array(count),
        hasCompleted = new Array(count),
        results = new Array(count);

      for (var idx = 0; idx < count; idx++) {
        (function (i) {
          var source = allSources[i];
          isPromise(source) && (source = observableFromPromise(source));
          group.add(
            source.subscribe(
              function (value) {
              if (!finished) {
                hasResults[i] = true;
                results[i] = value;
              }
            },
            function (e) {
              finished = true;
              subscriber.onError(e);
              group.dispose();
            },
            function () {
              if (!finished) {
                if (!hasResults[i]) {
                    subscriber.onCompleted();
                    return;
                }
                hasCompleted[i] = true;
                for (var ix = 0; ix < count; ix++) {
                  if (!hasCompleted[ix]) { return; }
                }
                finished = true;
                subscriber.onNext(results);
                subscriber.onCompleted();
              }
            }));
        })(idx);
      }

      return group;
    });
  };

   /**
   *  Runs two observable sequences in parallel and combines their last elemenets.
   *
   * @param {Observable} second Second observable sequence.
   * @param {Function} resultSelector Result selector function to invoke with the last elements of both sequences.
   * @returns {Observable} An observable sequence with the result of calling the selector function with the last elements of both input sequences.
   */
  observableProto.forkJoin = function (second, resultSelector) {
    var first = this;
    return new AnonymousObservable(function (observer) {
      var leftStopped = false, rightStopped = false,
        hasLeft = false, hasRight = false,
        lastLeft, lastRight,
        leftSubscription = new SingleAssignmentDisposable(), rightSubscription = new SingleAssignmentDisposable();

      isPromise(second) && (second = observableFromPromise(second));

      leftSubscription.setDisposable(
          first.subscribe(function (left) {
            hasLeft = true;
            lastLeft = left;
          }, function (err) {
            rightSubscription.dispose();
            observer.onError(err);
          }, function () {
            leftStopped = true;
            if (rightStopped) {
              if (!hasLeft) {
                  observer.onCompleted();
              } else if (!hasRight) {
                  observer.onCompleted();
              } else {
                var result;
                try {
                  result = resultSelector(lastLeft, lastRight);
                } catch (e) {
                  observer.onError(e);
                  return;
                }
                observer.onNext(result);
                observer.onCompleted();
              }
            }
          })
      );

      rightSubscription.setDisposable(
        second.subscribe(function (right) {
          hasRight = true;
          lastRight = right;
        }, function (err) {
          leftSubscription.dispose();
          observer.onError(err);
        }, function () {
          rightStopped = true;
          if (leftStopped) {
            if (!hasLeft) {
              observer.onCompleted();
            } else if (!hasRight) {
              observer.onCompleted();
            } else {
              var result;
              try {
                result = resultSelector(lastLeft, lastRight);
              } catch (e) {
                observer.onError(e);
                return;
              }
              observer.onNext(result);
              observer.onCompleted();
            }
          }
        })
      );

      return new CompositeDisposable(leftSubscription, rightSubscription);
    }, first);
  };

  /**
   * Comonadic bind operator.
   * @param {Function} selector A transform function to apply to each element.
   * @param {Object} scheduler Scheduler used to execute the operation. If not specified, defaults to the ImmediateScheduler.
   * @returns {Observable} An observable sequence which results from the comonadic bind operation.
   */
  observableProto.manySelect = function (selector, scheduler) {
    isScheduler(scheduler) || (scheduler = immediateScheduler);
    var source = this;
    return observableDefer(function () {
      var chain;

      return source
        .map(function (x) {
          var curr = new ChainObservable(x);

          chain && chain.onNext(x);
          chain = curr;

          return curr;
        })
        .tap(
          noop,
          function (e) { chain && chain.onError(e); },
          function () { chain && chain.onCompleted(); }
        )
        .observeOn(scheduler)
        .map(selector);
    }, source);
  };

  var ChainObservable = (function (__super__) {

    function subscribe (observer) {
      var self = this, g = new CompositeDisposable();
      g.add(currentThreadScheduler.schedule(function () {
        observer.onNext(self.head);
        g.add(self.tail.mergeAll().subscribe(observer));
      }));

      return g;
    }

    inherits(ChainObservable, __super__);

    function ChainObservable(head) {
      __super__.call(this, subscribe);
      this.head = head;
      this.tail = new AsyncSubject();
    }

    addProperties(ChainObservable.prototype, Observer, {
      onCompleted: function () {
        this.onNext(Observable.empty());
      },
      onError: function (e) {
        this.onNext(Observable.throwError(e));
      },
      onNext: function (v) {
        this.tail.onNext(v);
        this.tail.onCompleted();
      }
    });

    return ChainObservable;

  }(Observable));

  /** @private */
  var Map = root.Map || (function () {

    function Map() {
      this._keys = [];
      this._values = [];
    }

    Map.prototype.get = function (key) {
      var i = this._keys.indexOf(key);
      return i !== -1 ? this._values[i] : undefined;
    };

    Map.prototype.set = function (key, value) {
      var i = this._keys.indexOf(key);
      i !== -1 && (this._values[i] = value);
      this._values[this._keys.push(key) - 1] = value;
    };

    Map.prototype.forEach = function (callback, thisArg) {
      for (var i = 0, len = this._keys.length; i < len; i++) {
        callback.call(thisArg, this._values[i], this._keys[i]);
      }
    };

    return Map;
  }());

  /**
   * @constructor
   * Represents a join pattern over observable sequences.
   */
  function Pattern(patterns) {
    this.patterns = patterns;
  }

  /**
   *  Creates a pattern that matches the current plan matches and when the specified observable sequences has an available value.
   *  @param other Observable sequence to match in addition to the current pattern.
   *  @return {Pattern} Pattern object that matches when all observable sequences in the pattern have an available value.
   */
  Pattern.prototype.and = function (other) {
    return new Pattern(this.patterns.concat(other));
  };

  /**
   *  Matches when all observable sequences in the pattern (specified using a chain of and operators) have an available value and projects the values.
   *  @param {Function} selector Selector that will be invoked with available values from the source sequences, in the same order of the sequences in the pattern.
   *  @return {Plan} Plan that produces the projected values, to be fed (with other plans) to the when operator.
   */
  Pattern.prototype.thenDo = function (selector) {
    return new Plan(this, selector);
  };

  function Plan(expression, selector) {
      this.expression = expression;
      this.selector = selector;
  }

  Plan.prototype.activate = function (externalSubscriptions, observer, deactivate) {
    var self = this;
    var joinObservers = [];
    for (var i = 0, len = this.expression.patterns.length; i < len; i++) {
      joinObservers.push(planCreateObserver(externalSubscriptions, this.expression.patterns[i], observer.onError.bind(observer)));
    }
    var activePlan = new ActivePlan(joinObservers, function () {
      var result;
      try {
        result = self.selector.apply(self, arguments);
      } catch (e) {
        observer.onError(e);
        return;
      }
      observer.onNext(result);
    }, function () {
      for (var j = 0, jlen = joinObservers.length; j < jlen; j++) {
        joinObservers[j].removeActivePlan(activePlan);
      }
      deactivate(activePlan);
    });
    for (i = 0, len = joinObservers.length; i < len; i++) {
      joinObservers[i].addActivePlan(activePlan);
    }
    return activePlan;
  };

  function planCreateObserver(externalSubscriptions, observable, onError) {
    var entry = externalSubscriptions.get(observable);
    if (!entry) {
      var observer = new JoinObserver(observable, onError);
      externalSubscriptions.set(observable, observer);
      return observer;
    }
    return entry;
  }

  function ActivePlan(joinObserverArray, onNext, onCompleted) {
    this.joinObserverArray = joinObserverArray;
    this.onNext = onNext;
    this.onCompleted = onCompleted;
    this.joinObservers = new Map();
    for (var i = 0, len = this.joinObserverArray.length; i < len; i++) {
      var joinObserver = this.joinObserverArray[i];
      this.joinObservers.set(joinObserver, joinObserver);
    }
  }

  ActivePlan.prototype.dequeue = function () {
    this.joinObservers.forEach(function (v) { v.queue.shift(); });
  };

  ActivePlan.prototype.match = function () {
    var i, len, hasValues = true;
    for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
      if (this.joinObserverArray[i].queue.length === 0) {
        hasValues = false;
        break;
      }
    }
    if (hasValues) {
      var firstValues = [],
          isCompleted = false;
      for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
        firstValues.push(this.joinObserverArray[i].queue[0]);
        this.joinObserverArray[i].queue[0].kind === 'C' && (isCompleted = true);
      }
      if (isCompleted) {
        this.onCompleted();
      } else {
        this.dequeue();
        var values = [];
        for (i = 0, len = firstValues.length; i < firstValues.length; i++) {
          values.push(firstValues[i].value);
        }
        this.onNext.apply(this, values);
      }
    }
  };

  var JoinObserver = (function (__super__) {
    inherits(JoinObserver, __super__);

    function JoinObserver(source, onError) {
      __super__.call(this);
      this.source = source;
      this.onError = onError;
      this.queue = [];
      this.activePlans = [];
      this.subscription = new SingleAssignmentDisposable();
      this.isDisposed = false;
    }

    var JoinObserverPrototype = JoinObserver.prototype;

    JoinObserverPrototype.next = function (notification) {
      if (!this.isDisposed) {
        if (notification.kind === 'E') {
          return this.onError(notification.exception);
        }
        this.queue.push(notification);
        var activePlans = this.activePlans.slice(0);
        for (var i = 0, len = activePlans.length; i < len; i++) {
          activePlans[i].match();
        }
      }
    };

    JoinObserverPrototype.error = noop;
    JoinObserverPrototype.completed = noop;

    JoinObserverPrototype.addActivePlan = function (activePlan) {
      this.activePlans.push(activePlan);
    };

    JoinObserverPrototype.subscribe = function () {
      this.subscription.setDisposable(this.source.materialize().subscribe(this));
    };

    JoinObserverPrototype.removeActivePlan = function (activePlan) {
      this.activePlans.splice(this.activePlans.indexOf(activePlan), 1);
      this.activePlans.length === 0 && this.dispose();
    };

    JoinObserverPrototype.dispose = function () {
      __super__.prototype.dispose.call(this);
      if (!this.isDisposed) {
        this.isDisposed = true;
        this.subscription.dispose();
      }
    };

    return JoinObserver;
  } (AbstractObserver));

  /**
   *  Creates a pattern that matches when both observable sequences have an available value.
   *
   *  @param right Observable sequence to match with the current sequence.
   *  @return {Pattern} Pattern object that matches when both observable sequences have an available value.
   */
  observableProto.and = function (right) {
    return new Pattern([this, right]);
  };

  /**
   *  Matches when the observable sequence has an available value and projects the value.
   *
   *  @param {Function} selector Selector that will be invoked for values in the source sequence.
   *  @returns {Plan} Plan that produces the projected values, to be fed (with other plans) to the when operator.
   */
  observableProto.thenDo = function (selector) {
    return new Pattern([this]).thenDo(selector);
  };

  /**
   *  Joins together the results from several patterns.
   *
   *  @param plans A series of plans (specified as an Array of as a series of arguments) created by use of the Then operator on patterns.
   *  @returns {Observable} Observable sequence with the results form matching several patterns.
   */
  Observable.when = function () {
    var len = arguments.length, plans;
    if (Array.isArray(arguments[0])) {
      plans = arguments[0];
    } else {
      plans = new Array(len);
      for(var i = 0; i < len; i++) { plans[i] = arguments[i]; }
    }
    return new AnonymousObservable(function (o) {
      var activePlans = [],
          externalSubscriptions = new Map();
      var outObserver = observerCreate(
        function (x) { o.onNext(x); },
        function (err) {
          externalSubscriptions.forEach(function (v) { v.onError(err); });
          o.onError(err);
        },
        function (x) { o.onCompleted(); }
      );
      try {
        for (var i = 0, len = plans.length; i < len; i++) {
          activePlans.push(plans[i].activate(externalSubscriptions, outObserver, function (activePlan) {
            var idx = activePlans.indexOf(activePlan);
            activePlans.splice(idx, 1);
            activePlans.length === 0 && o.onCompleted();
          }));
        }
      } catch (e) {
        observableThrow(e).subscribe(o);
      }
      var group = new CompositeDisposable();
      externalSubscriptions.forEach(function (joinObserver) {
        joinObserver.subscribe();
        group.add(joinObserver);
      });

      return group;
    });
  };

  function observableTimerDate(dueTime, scheduler) {
    return new AnonymousObservable(function (observer) {
      return scheduler.scheduleWithAbsolute(dueTime, function () {
        observer.onNext(0);
        observer.onCompleted();
      });
    });
  }

  function observableTimerDateAndPeriod(dueTime, period, scheduler) {
    return new AnonymousObservable(function (observer) {
      var d = dueTime, p = normalizeTime(period);
      return scheduler.scheduleRecursiveWithAbsoluteAndState(0, d, function (count, self) {
        if (p > 0) {
          var now = scheduler.now();
          d = d + p;
          d <= now && (d = now + p);
        }
        observer.onNext(count);
        self(count + 1, d);
      });
    });
  }

  function observableTimerTimeSpan(dueTime, scheduler) {
    return new AnonymousObservable(function (observer) {
      return scheduler.scheduleWithRelative(normalizeTime(dueTime), function () {
        observer.onNext(0);
        observer.onCompleted();
      });
    });
  }

  function observableTimerTimeSpanAndPeriod(dueTime, period, scheduler) {
    return dueTime === period ?
      new AnonymousObservable(function (observer) {
        return scheduler.schedulePeriodicWithState(0, period, function (count) {
          observer.onNext(count);
          return count + 1;
        });
      }) :
      observableDefer(function () {
        return observableTimerDateAndPeriod(scheduler.now() + dueTime, period, scheduler);
      });
  }

  /**
   *  Returns an observable sequence that produces a value after each period.
   *
   * @example
   *  1 - res = Rx.Observable.interval(1000);
   *  2 - res = Rx.Observable.interval(1000, Rx.Scheduler.timeout);
   *
   * @param {Number} period Period for producing the values in the resulting sequence (specified as an integer denoting milliseconds).
   * @param {Scheduler} [scheduler] Scheduler to run the timer on. If not specified, Rx.Scheduler.timeout is used.
   * @returns {Observable} An observable sequence that produces a value after each period.
   */
  var observableinterval = Observable.interval = function (period, scheduler) {
    return observableTimerTimeSpanAndPeriod(period, period, isScheduler(scheduler) ? scheduler : timeoutScheduler);
  };

  /**
   *  Returns an observable sequence that produces a value after dueTime has elapsed and then after each period.
   * @param {Number} dueTime Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) at which to produce the first value.
   * @param {Mixed} [periodOrScheduler]  Period to produce subsequent values (specified as an integer denoting milliseconds), or the scheduler to run the timer on. If not specified, the resulting timer is not recurring.
   * @param {Scheduler} [scheduler]  Scheduler to run the timer on. If not specified, the timeout scheduler is used.
   * @returns {Observable} An observable sequence that produces a value after due time has elapsed and then each period.
   */
  var observableTimer = Observable.timer = function (dueTime, periodOrScheduler, scheduler) {
    var period;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    if (periodOrScheduler !== undefined && typeof periodOrScheduler === 'number') {
      period = periodOrScheduler;
    } else if (isScheduler(periodOrScheduler)) {
      scheduler = periodOrScheduler;
    }
    if (dueTime instanceof Date && period === undefined) {
      return observableTimerDate(dueTime.getTime(), scheduler);
    }
    if (dueTime instanceof Date && period !== undefined) {
      period = periodOrScheduler;
      return observableTimerDateAndPeriod(dueTime.getTime(), period, scheduler);
    }
    return period === undefined ?
      observableTimerTimeSpan(dueTime, scheduler) :
      observableTimerTimeSpanAndPeriod(dueTime, period, scheduler);
  };

  function observableDelayTimeSpan(source, dueTime, scheduler) {
    return new AnonymousObservable(function (observer) {
      var active = false,
        cancelable = new SerialDisposable(),
        exception = null,
        q = [],
        running = false,
        subscription;
      subscription = source.materialize().timestamp(scheduler).subscribe(function (notification) {
        var d, shouldRun;
        if (notification.value.kind === 'E') {
          q = [];
          q.push(notification);
          exception = notification.value.exception;
          shouldRun = !running;
        } else {
          q.push({ value: notification.value, timestamp: notification.timestamp + dueTime });
          shouldRun = !active;
          active = true;
        }
        if (shouldRun) {
          if (exception !== null) {
            observer.onError(exception);
          } else {
            d = new SingleAssignmentDisposable();
            cancelable.setDisposable(d);
            d.setDisposable(scheduler.scheduleRecursiveWithRelative(dueTime, function (self) {
              var e, recurseDueTime, result, shouldRecurse;
              if (exception !== null) {
                return;
              }
              running = true;
              do {
                result = null;
                if (q.length > 0 && q[0].timestamp - scheduler.now() <= 0) {
                  result = q.shift().value;
                }
                if (result !== null) {
                  result.accept(observer);
                }
              } while (result !== null);
              shouldRecurse = false;
              recurseDueTime = 0;
              if (q.length > 0) {
                shouldRecurse = true;
                recurseDueTime = Math.max(0, q[0].timestamp - scheduler.now());
              } else {
                active = false;
              }
              e = exception;
              running = false;
              if (e !== null) {
                observer.onError(e);
              } else if (shouldRecurse) {
                self(recurseDueTime);
              }
            }));
          }
        }
      });
      return new CompositeDisposable(subscription, cancelable);
    }, source);
  }

  function observableDelayDate(source, dueTime, scheduler) {
    return observableDefer(function () {
      return observableDelayTimeSpan(source, dueTime - scheduler.now(), scheduler);
    });
  }

  /**
   *  Time shifts the observable sequence by dueTime. The relative time intervals between the values are preserved.
   *
   * @example
   *  1 - res = Rx.Observable.delay(new Date());
   *  2 - res = Rx.Observable.delay(new Date(), Rx.Scheduler.timeout);
   *
   *  3 - res = Rx.Observable.delay(5000);
   *  4 - res = Rx.Observable.delay(5000, 1000, Rx.Scheduler.timeout);
   * @memberOf Observable#
   * @param {Number} dueTime Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) by which to shift the observable sequence.
   * @param {Scheduler} [scheduler] Scheduler to run the delay timers on. If not specified, the timeout scheduler is used.
   * @returns {Observable} Time-shifted sequence.
   */
  observableProto.delay = function (dueTime, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return dueTime instanceof Date ?
      observableDelayDate(this, dueTime.getTime(), scheduler) :
      observableDelayTimeSpan(this, dueTime, scheduler);
  };

  /**
   *  Ignores values from an observable sequence which are followed by another value before dueTime.
   * @param {Number} dueTime Duration of the debounce period for each value (specified as an integer denoting milliseconds).
   * @param {Scheduler} [scheduler]  Scheduler to run the debounce timers on. If not specified, the timeout scheduler is used.
   * @returns {Observable} The debounced sequence.
   */
  observableProto.debounce = observableProto.throttleWithTimeout = function (dueTime, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    var source = this;
    return new AnonymousObservable(function (observer) {
      var cancelable = new SerialDisposable(), hasvalue = false, value, id = 0;
      var subscription = source.subscribe(
        function (x) {
          hasvalue = true;
          value = x;
          id++;
          var currentId = id,
            d = new SingleAssignmentDisposable();
          cancelable.setDisposable(d);
          d.setDisposable(scheduler.scheduleWithRelative(dueTime, function () {
            hasvalue && id === currentId && observer.onNext(value);
            hasvalue = false;
          }));
        },
        function (e) {
          cancelable.dispose();
          observer.onError(e);
          hasvalue = false;
          id++;
        },
        function () {
          cancelable.dispose();
          hasvalue && observer.onNext(value);
          observer.onCompleted();
          hasvalue = false;
          id++;
        });
      return new CompositeDisposable(subscription, cancelable);
    }, this);
  };

  /**
   * @deprecated use #debounce or #throttleWithTimeout instead.
   */
  observableProto.throttle = function(dueTime, scheduler) {
    //deprecate('throttle', 'debounce or throttleWithTimeout');
    return this.debounce(dueTime, scheduler);
  };

  /**
   *  Projects each element of an observable sequence into zero or more windows which are produced based on timing information.
   * @param {Number} timeSpan Length of each window (specified as an integer denoting milliseconds).
   * @param {Mixed} [timeShiftOrScheduler]  Interval between creation of consecutive windows (specified as an integer denoting milliseconds), or an optional scheduler parameter. If not specified, the time shift corresponds to the timeSpan parameter, resulting in non-overlapping adjacent windows.
   * @param {Scheduler} [scheduler]  Scheduler to run windowing timers on. If not specified, the timeout scheduler is used.
   * @returns {Observable} An observable sequence of windows.
   */
  observableProto.windowWithTime = function (timeSpan, timeShiftOrScheduler, scheduler) {
    var source = this, timeShift;
    timeShiftOrScheduler == null && (timeShift = timeSpan);
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    if (typeof timeShiftOrScheduler === 'number') {
      timeShift = timeShiftOrScheduler;
    } else if (isScheduler(timeShiftOrScheduler)) {
      timeShift = timeSpan;
      scheduler = timeShiftOrScheduler;
    }
    return new AnonymousObservable(function (observer) {
      var groupDisposable,
        nextShift = timeShift,
        nextSpan = timeSpan,
        q = [],
        refCountDisposable,
        timerD = new SerialDisposable(),
        totalTime = 0;
        groupDisposable = new CompositeDisposable(timerD),
        refCountDisposable = new RefCountDisposable(groupDisposable);

       function createTimer () {
        var m = new SingleAssignmentDisposable(),
          isSpan = false,
          isShift = false;
        timerD.setDisposable(m);
        if (nextSpan === nextShift) {
          isSpan = true;
          isShift = true;
        } else if (nextSpan < nextShift) {
            isSpan = true;
        } else {
          isShift = true;
        }
        var newTotalTime = isSpan ? nextSpan : nextShift,
          ts = newTotalTime - totalTime;
        totalTime = newTotalTime;
        if (isSpan) {
          nextSpan += timeShift;
        }
        if (isShift) {
          nextShift += timeShift;
        }
        m.setDisposable(scheduler.scheduleWithRelative(ts, function () {
          if (isShift) {
            var s = new Subject();
            q.push(s);
            observer.onNext(addRef(s, refCountDisposable));
          }
          isSpan && q.shift().onCompleted();
          createTimer();
        }));
      };
      q.push(new Subject());
      observer.onNext(addRef(q[0], refCountDisposable));
      createTimer();
      groupDisposable.add(source.subscribe(
        function (x) {
          for (var i = 0, len = q.length; i < len; i++) { q[i].onNext(x); }
        },
        function (e) {
          for (var i = 0, len = q.length; i < len; i++) { q[i].onError(e); }
          observer.onError(e);
        },
        function () {
          for (var i = 0, len = q.length; i < len; i++) { q[i].onCompleted(); }
          observer.onCompleted();
        }
      ));
      return refCountDisposable;
    }, source);
  };

  /**
   *  Projects each element of an observable sequence into a window that is completed when either it's full or a given amount of time has elapsed.
   * @param {Number} timeSpan Maximum time length of a window.
   * @param {Number} count Maximum element count of a window.
   * @param {Scheduler} [scheduler]  Scheduler to run windowing timers on. If not specified, the timeout scheduler is used.
   * @returns {Observable} An observable sequence of windows.
   */
  observableProto.windowWithTimeOrCount = function (timeSpan, count, scheduler) {
    var source = this;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (observer) {
      var timerD = new SerialDisposable(),
          groupDisposable = new CompositeDisposable(timerD),
          refCountDisposable = new RefCountDisposable(groupDisposable),
          n = 0,
          windowId = 0,
          s = new Subject();

      function createTimer(id) {
        var m = new SingleAssignmentDisposable();
        timerD.setDisposable(m);
        m.setDisposable(scheduler.scheduleWithRelative(timeSpan, function () {
          if (id !== windowId) { return; }
          n = 0;
          var newId = ++windowId;
          s.onCompleted();
          s = new Subject();
          observer.onNext(addRef(s, refCountDisposable));
          createTimer(newId);
        }));
      }

      observer.onNext(addRef(s, refCountDisposable));
      createTimer(0);

      groupDisposable.add(source.subscribe(
        function (x) {
          var newId = 0, newWindow = false;
          s.onNext(x);
          if (++n === count) {
            newWindow = true;
            n = 0;
            newId = ++windowId;
            s.onCompleted();
            s = new Subject();
            observer.onNext(addRef(s, refCountDisposable));
          }
          newWindow && createTimer(newId);
        },
        function (e) {
          s.onError(e);
          observer.onError(e);
        }, function () {
          s.onCompleted();
          observer.onCompleted();
        }
      ));
      return refCountDisposable;
    }, source);
  };

    /**
     *  Projects each element of an observable sequence into zero or more buffers which are produced based on timing information.
     *
     * @example
     *  1 - res = xs.bufferWithTime(1000, scheduler); // non-overlapping segments of 1 second
     *  2 - res = xs.bufferWithTime(1000, 500, scheduler; // segments of 1 second with time shift 0.5 seconds
     *
     * @param {Number} timeSpan Length of each buffer (specified as an integer denoting milliseconds).
     * @param {Mixed} [timeShiftOrScheduler]  Interval between creation of consecutive buffers (specified as an integer denoting milliseconds), or an optional scheduler parameter. If not specified, the time shift corresponds to the timeSpan parameter, resulting in non-overlapping adjacent buffers.
     * @param {Scheduler} [scheduler]  Scheduler to run buffer timers on. If not specified, the timeout scheduler is used.
     * @returns {Observable} An observable sequence of buffers.
     */
    observableProto.bufferWithTime = function (timeSpan, timeShiftOrScheduler, scheduler) {
        return this.windowWithTime.apply(this, arguments).selectMany(function (x) { return x.toArray(); });
    };

    /**
     *  Projects each element of an observable sequence into a buffer that is completed when either it's full or a given amount of time has elapsed.
     *
     * @example
     *  1 - res = source.bufferWithTimeOrCount(5000, 50); // 5s or 50 items in an array
     *  2 - res = source.bufferWithTimeOrCount(5000, 50, scheduler); // 5s or 50 items in an array
     *
     * @param {Number} timeSpan Maximum time length of a buffer.
     * @param {Number} count Maximum element count of a buffer.
     * @param {Scheduler} [scheduler]  Scheduler to run bufferin timers on. If not specified, the timeout scheduler is used.
     * @returns {Observable} An observable sequence of buffers.
     */
    observableProto.bufferWithTimeOrCount = function (timeSpan, count, scheduler) {
        return this.windowWithTimeOrCount(timeSpan, count, scheduler).selectMany(function (x) {
            return x.toArray();
        });
    };

  /**
   *  Records the time interval between consecutive values in an observable sequence.
   *
   * @example
   *  1 - res = source.timeInterval();
   *  2 - res = source.timeInterval(Rx.Scheduler.timeout);
   *
   * @param [scheduler]  Scheduler used to compute time intervals. If not specified, the timeout scheduler is used.
   * @returns {Observable} An observable sequence with time interval information on values.
   */
  observableProto.timeInterval = function (scheduler) {
    var source = this;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return observableDefer(function () {
      var last = scheduler.now();
      return source.map(function (x) {
        var now = scheduler.now(), span = now - last;
        last = now;
        return { value: x, interval: span };
      });
    });
  };

  /**
   *  Records the timestamp for each value in an observable sequence.
   *
   * @example
   *  1 - res = source.timestamp(); // produces { value: x, timestamp: ts }
   *  2 - res = source.timestamp(Rx.Scheduler.default);
   *
   * @param {Scheduler} [scheduler]  Scheduler used to compute timestamps. If not specified, the default scheduler is used.
   * @returns {Observable} An observable sequence with timestamp information on values.
   */
  observableProto.timestamp = function (scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return this.map(function (x) {
      return { value: x, timestamp: scheduler.now() };
    });
  };

  function sampleObservable(source, sampler) {
    return new AnonymousObservable(function (observer) {
      var atEnd, value, hasValue;

      function sampleSubscribe() {
        if (hasValue) {
          hasValue = false;
          observer.onNext(value);
        }
        atEnd && observer.onCompleted();
      }

      return new CompositeDisposable(
        source.subscribe(function (newValue) {
          hasValue = true;
          value = newValue;
        }, observer.onError.bind(observer), function () {
          atEnd = true;
        }),
        sampler.subscribe(sampleSubscribe, observer.onError.bind(observer), sampleSubscribe)
      );
    }, source);
  }

  /**
   *  Samples the observable sequence at each interval.
   *
   * @example
   *  1 - res = source.sample(sampleObservable); // Sampler tick sequence
   *  2 - res = source.sample(5000); // 5 seconds
   *  2 - res = source.sample(5000, Rx.Scheduler.timeout); // 5 seconds
   *
   * @param {Mixed} intervalOrSampler Interval at which to sample (specified as an integer denoting milliseconds) or Sampler Observable.
   * @param {Scheduler} [scheduler]  Scheduler to run the sampling timer on. If not specified, the timeout scheduler is used.
   * @returns {Observable} Sampled observable sequence.
   */
  observableProto.sample = observableProto.throttleLatest = function (intervalOrSampler, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return typeof intervalOrSampler === 'number' ?
      sampleObservable(this, observableinterval(intervalOrSampler, scheduler)) :
      sampleObservable(this, intervalOrSampler);
  };

  /**
   *  Returns the source observable sequence or the other observable sequence if dueTime elapses.
   * @param {Number} dueTime Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) when a timeout occurs.
   * @param {Observable} [other]  Sequence to return in case of a timeout. If not specified, a timeout error throwing sequence will be used.
   * @param {Scheduler} [scheduler]  Scheduler to run the timeout timers on. If not specified, the timeout scheduler is used.
   * @returns {Observable} The source sequence switching to the other sequence in case of a timeout.
   */
  observableProto.timeout = function (dueTime, other, scheduler) {
    (other == null || typeof other === 'string') && (other = observableThrow(new Error(other || 'Timeout')));
    isScheduler(scheduler) || (scheduler = timeoutScheduler);

    var source = this, schedulerMethod = dueTime instanceof Date ?
      'scheduleWithAbsolute' :
      'scheduleWithRelative';

    return new AnonymousObservable(function (observer) {
      var id = 0,
        original = new SingleAssignmentDisposable(),
        subscription = new SerialDisposable(),
        switched = false,
        timer = new SerialDisposable();

      subscription.setDisposable(original);

      function createTimer() {
        var myId = id;
        timer.setDisposable(scheduler[schedulerMethod](dueTime, function () {
          if (id === myId) {
            isPromise(other) && (other = observableFromPromise(other));
            subscription.setDisposable(other.subscribe(observer));
          }
        }));
      }

      createTimer();

      original.setDisposable(source.subscribe(function (x) {
        if (!switched) {
          id++;
          observer.onNext(x);
          createTimer();
        }
      }, function (e) {
        if (!switched) {
          id++;
          observer.onError(e);
        }
      }, function () {
        if (!switched) {
          id++;
          observer.onCompleted();
        }
      }));
      return new CompositeDisposable(subscription, timer);
    }, source);
  };

  /**
   *  Generates an observable sequence by iterating a state from an initial state until the condition fails.
   *
   * @example
   *  res = source.generateWithAbsoluteTime(0,
   *      function (x) { return return true; },
   *      function (x) { return x + 1; },
   *      function (x) { return x; },
   *      function (x) { return new Date(); }
   *  });
   *
   * @param {Mixed} initialState Initial state.
   * @param {Function} condition Condition to terminate generation (upon returning false).
   * @param {Function} iterate Iteration step function.
   * @param {Function} resultSelector Selector function for results produced in the sequence.
   * @param {Function} timeSelector Time selector function to control the speed of values being produced each iteration, returning Date values.
   * @param {Scheduler} [scheduler]  Scheduler on which to run the generator loop. If not specified, the timeout scheduler is used.
   * @returns {Observable} The generated sequence.
   */
  Observable.generateWithAbsoluteTime = function (initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (observer) {
      var first = true,
        hasResult = false,
        result,
        state = initialState,
        time;
      return scheduler.scheduleRecursiveWithAbsolute(scheduler.now(), function (self) {
        hasResult && observer.onNext(result);

        try {
          if (first) {
            first = false;
          } else {
            state = iterate(state);
          }
          hasResult = condition(state);
          if (hasResult) {
            result = resultSelector(state);
            time = timeSelector(state);
          }
        } catch (e) {
          observer.onError(e);
          return;
        }
        if (hasResult) {
          self(time);
        } else {
          observer.onCompleted();
        }
      });
    });
  };

  /**
   *  Generates an observable sequence by iterating a state from an initial state until the condition fails.
   *
   * @example
   *  res = source.generateWithRelativeTime(0,
   *      function (x) { return return true; },
   *      function (x) { return x + 1; },
   *      function (x) { return x; },
   *      function (x) { return 500; }
   *  );
   *
   * @param {Mixed} initialState Initial state.
   * @param {Function} condition Condition to terminate generation (upon returning false).
   * @param {Function} iterate Iteration step function.
   * @param {Function} resultSelector Selector function for results produced in the sequence.
   * @param {Function} timeSelector Time selector function to control the speed of values being produced each iteration, returning integer values denoting milliseconds.
   * @param {Scheduler} [scheduler]  Scheduler on which to run the generator loop. If not specified, the timeout scheduler is used.
   * @returns {Observable} The generated sequence.
   */
  Observable.generateWithRelativeTime = function (initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (observer) {
      var first = true,
        hasResult = false,
        result,
        state = initialState,
        time;
      return scheduler.scheduleRecursiveWithRelative(0, function (self) {
        hasResult && observer.onNext(result);

        try {
          if (first) {
            first = false;
          } else {
            state = iterate(state);
          }
          hasResult = condition(state);
          if (hasResult) {
            result = resultSelector(state);
            time = timeSelector(state);
          }
        } catch (e) {
          observer.onError(e);
          return;
        }
        if (hasResult) {
          self(time);
        } else {
          observer.onCompleted();
        }
      });
    });
  };

  /**
   *  Time shifts the observable sequence by delaying the subscription with the specified relative time duration, using the specified scheduler to run timers.
   *
   * @example
   *  1 - res = source.delaySubscription(5000); // 5s
   *  2 - res = source.delaySubscription(5000, Rx.Scheduler.default); // 5 seconds
   *
   * @param {Number} dueTime Relative or absolute time shift of the subscription.
   * @param {Scheduler} [scheduler]  Scheduler to run the subscription delay timer on. If not specified, the timeout scheduler is used.
   * @returns {Observable} Time-shifted sequence.
   */
  observableProto.delaySubscription = function (dueTime, scheduler) {
    var scheduleMethod = dueTime instanceof Date ? 'scheduleWithAbsolute' : 'scheduleWithRelative';
    var source = this;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (o) {
      var d = new SerialDisposable();

      d.setDisposable(scheduler[scheduleMethod](dueTime, function() {
        d.setDisposable(source.subscribe(o));
      }));

      return d;
    }, this);
  };

  /**
   *  Time shifts the observable sequence based on a subscription delay and a delay selector function for each element.
   *
   * @example
   *  1 - res = source.delayWithSelector(function (x) { return Rx.Scheduler.timer(5000); }); // with selector only
   *  1 - res = source.delayWithSelector(Rx.Observable.timer(2000), function (x) { return Rx.Observable.timer(x); }); // with delay and selector
   *
   * @param {Observable} [subscriptionDelay]  Sequence indicating the delay for the subscription to the source.
   * @param {Function} delayDurationSelector Selector function to retrieve a sequence indicating the delay for each given element.
   * @returns {Observable} Time-shifted sequence.
   */
  observableProto.delayWithSelector = function (subscriptionDelay, delayDurationSelector) {
    var source = this, subDelay, selector;
    if (isFunction(subscriptionDelay)) {
      selector = subscriptionDelay;
    } else {
      subDelay = subscriptionDelay;
      selector = delayDurationSelector;
    }
    return new AnonymousObservable(function (observer) {
      var delays = new CompositeDisposable(), atEnd = false, subscription = new SerialDisposable();

      function start() {
        subscription.setDisposable(source.subscribe(
          function (x) {
            var delay = tryCatch(selector)(x);
            if (delay === errorObj) { return observer.onError(delay.e); }
            var d = new SingleAssignmentDisposable();
            delays.add(d);
            d.setDisposable(delay.subscribe(
              function () {
                observer.onNext(x);
                delays.remove(d);
                done();
              },
              function (e) { observer.onError(e); },
              function () {
                observer.onNext(x);
                delays.remove(d);
                done();
              }
            ))
          },
          function (e) { observer.onError(e); },
          function () {
            atEnd = true;
            subscription.dispose();
            done();
          }
        ))
      }

      function done () {
        atEnd && delays.length === 0 && observer.onCompleted();
      }

      if (!subDelay) {
        start();
      } else {
        subscription.setDisposable(subDelay.subscribe(start, function (e) { observer.onError(e); }, start));
      }

      return new CompositeDisposable(subscription, delays);
    }, this);
  };

    /**
     *  Returns the source observable sequence, switching to the other observable sequence if a timeout is signaled.
     * @param {Observable} [firstTimeout]  Observable sequence that represents the timeout for the first element. If not provided, this defaults to Observable.never().
     * @param {Function} timeoutDurationSelector Selector to retrieve an observable sequence that represents the timeout between the current element and the next element.
     * @param {Observable} [other]  Sequence to return in case of a timeout. If not provided, this is set to Observable.throwException().
     * @returns {Observable} The source sequence switching to the other sequence in case of a timeout.
     */
    observableProto.timeoutWithSelector = function (firstTimeout, timeoutdurationSelector, other) {
      if (arguments.length === 1) {
          timeoutdurationSelector = firstTimeout;
          firstTimeout = observableNever();
      }
      other || (other = observableThrow(new Error('Timeout')));
      var source = this;
      return new AnonymousObservable(function (observer) {
        var subscription = new SerialDisposable(), timer = new SerialDisposable(), original = new SingleAssignmentDisposable();

        subscription.setDisposable(original);

        var id = 0, switched = false;

        function setTimer(timeout) {
          var myId = id;

          function timerWins () {
            return id === myId;
          }

          var d = new SingleAssignmentDisposable();
          timer.setDisposable(d);
          d.setDisposable(timeout.subscribe(function () {
            timerWins() && subscription.setDisposable(other.subscribe(observer));
            d.dispose();
          }, function (e) {
            timerWins() && observer.onError(e);
          }, function () {
            timerWins() && subscription.setDisposable(other.subscribe(observer));
          }));
        };

        setTimer(firstTimeout);

        function observerWins() {
          var res = !switched;
          if (res) { id++; }
          return res;
        }

        original.setDisposable(source.subscribe(function (x) {
          if (observerWins()) {
            observer.onNext(x);
            var timeout;
            try {
              timeout = timeoutdurationSelector(x);
            } catch (e) {
              observer.onError(e);
              return;
            }
            setTimer(isPromise(timeout) ? observableFromPromise(timeout) : timeout);
          }
        }, function (e) {
          observerWins() && observer.onError(e);
        }, function () {
          observerWins() && observer.onCompleted();
        }));
        return new CompositeDisposable(subscription, timer);
      }, source);
    };

  /**
   * Ignores values from an observable sequence which are followed by another value within a computed throttle duration.
   * @param {Function} durationSelector Selector function to retrieve a sequence indicating the throttle duration for each given element.
   * @returns {Observable} The debounced sequence.
   */
  observableProto.debounceWithSelector = function (durationSelector) {
    var source = this;
    return new AnonymousObservable(function (observer) {
      var value, hasValue = false, cancelable = new SerialDisposable(), id = 0;
      var subscription = source.subscribe(function (x) {
        var throttle;
        try {
          throttle = durationSelector(x);
        } catch (e) {
          observer.onError(e);
          return;
        }

        isPromise(throttle) && (throttle = observableFromPromise(throttle));

        hasValue = true;
        value = x;
        id++;
        var currentid = id, d = new SingleAssignmentDisposable();
        cancelable.setDisposable(d);
        d.setDisposable(throttle.subscribe(function () {
          hasValue && id === currentid && observer.onNext(value);
          hasValue = false;
          d.dispose();
        }, observer.onError.bind(observer), function () {
          hasValue && id === currentid && observer.onNext(value);
          hasValue = false;
          d.dispose();
        }));
      }, function (e) {
        cancelable.dispose();
        observer.onError(e);
        hasValue = false;
        id++;
      }, function () {
        cancelable.dispose();
        hasValue && observer.onNext(value);
        observer.onCompleted();
        hasValue = false;
        id++;
      });
      return new CompositeDisposable(subscription, cancelable);
    }, source);
  };

  /**
   * @deprecated use #debounceWithSelector instead.
   */
  observableProto.throttleWithSelector = function (durationSelector) {
    //deprecate('throttleWithSelector', 'debounceWithSelector');
    return this.debounceWithSelector(durationSelector);
  };

  /**
   *  Skips elements for the specified duration from the end of the observable source sequence, using the specified scheduler to run timers.
   *
   *  1 - res = source.skipLastWithTime(5000);
   *  2 - res = source.skipLastWithTime(5000, scheduler);
   *
   * @description
   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
   *  result sequence. This causes elements to be delayed with duration.
   * @param {Number} duration Duration for skipping elements from the end of the sequence.
   * @param {Scheduler} [scheduler]  Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout
   * @returns {Observable} An observable sequence with the elements skipped during the specified duration from the end of the source sequence.
   */
  observableProto.skipLastWithTime = function (duration, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    var source = this;
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        var now = scheduler.now();
        q.push({ interval: now, value: x });
        while (q.length > 0 && now - q[0].interval >= duration) {
          o.onNext(q.shift().value);
        }
      }, function (e) { o.onError(e); }, function () {
        var now = scheduler.now();
        while (q.length > 0 && now - q[0].interval >= duration) {
          o.onNext(q.shift().value);
        }
        o.onCompleted();
      });
    }, source);
  };

  /**
   *  Returns elements within the specified duration from the end of the observable source sequence, using the specified schedulers to run timers and to drain the collected elements.
   * @description
   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
   *  result sequence. This causes elements to be delayed with duration.
   * @param {Number} duration Duration for taking elements from the end of the sequence.
   * @param {Scheduler} [scheduler]  Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
   * @returns {Observable} An observable sequence with the elements taken during the specified duration from the end of the source sequence.
   */
  observableProto.takeLastWithTime = function (duration, scheduler) {
    var source = this;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        var now = scheduler.now();
        q.push({ interval: now, value: x });
        while (q.length > 0 && now - q[0].interval >= duration) {
          q.shift();
        }
      }, function (e) { o.onError(e); }, function () {
        var now = scheduler.now();
        while (q.length > 0) {
          var next = q.shift();
          if (now - next.interval <= duration) { o.onNext(next.value); }
        }
        o.onCompleted();
      });
    }, source);
  };

  /**
   *  Returns an array with the elements within the specified duration from the end of the observable source sequence, using the specified scheduler to run timers.
   * @description
   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
   *  result sequence. This causes elements to be delayed with duration.
   * @param {Number} duration Duration for taking elements from the end of the sequence.
   * @param {Scheduler} scheduler Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
   * @returns {Observable} An observable sequence containing a single array with the elements taken during the specified duration from the end of the source sequence.
   */
  observableProto.takeLastBufferWithTime = function (duration, scheduler) {
    var source = this;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (o) {
      var q = [];
      return source.subscribe(function (x) {
        var now = scheduler.now();
        q.push({ interval: now, value: x });
        while (q.length > 0 && now - q[0].interval >= duration) {
          q.shift();
        }
      }, function (e) { o.onError(e); }, function () {
        var now = scheduler.now(), res = [];
        while (q.length > 0) {
          var next = q.shift();
          now - next.interval <= duration && res.push(next.value);
        }
        o.onNext(res);
        o.onCompleted();
      });
    }, source);
  };

  /**
   *  Takes elements for the specified duration from the start of the observable source sequence, using the specified scheduler to run timers.
   *
   * @example
   *  1 - res = source.takeWithTime(5000,  [optional scheduler]);
   * @description
   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
   *  result sequence. This causes elements to be delayed with duration.
   * @param {Number} duration Duration for taking elements from the start of the sequence.
   * @param {Scheduler} scheduler Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
   * @returns {Observable} An observable sequence with the elements taken during the specified duration from the start of the source sequence.
   */
  observableProto.takeWithTime = function (duration, scheduler) {
    var source = this;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (o) {
      return new CompositeDisposable(scheduler.scheduleWithRelative(duration, function () { o.onCompleted(); }), source.subscribe(o));
    }, source);
  };

  /**
   *  Skips elements for the specified duration from the start of the observable source sequence, using the specified scheduler to run timers.
   *
   * @example
   *  1 - res = source.skipWithTime(5000, [optional scheduler]);
   *
   * @description
   *  Specifying a zero value for duration doesn't guarantee no elements will be dropped from the start of the source sequence.
   *  This is a side-effect of the asynchrony introduced by the scheduler, where the action that causes callbacks from the source sequence to be forwarded
   *  may not execute immediately, despite the zero due time.
   *
   *  Errors produced by the source sequence are always forwarded to the result sequence, even if the error occurs before the duration.
   * @param {Number} duration Duration for skipping elements from the start of the sequence.
   * @param {Scheduler} scheduler Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
   * @returns {Observable} An observable sequence with the elements skipped during the specified duration from the start of the source sequence.
   */
  observableProto.skipWithTime = function (duration, scheduler) {
    var source = this;
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    return new AnonymousObservable(function (observer) {
      var open = false;
      return new CompositeDisposable(
        scheduler.scheduleWithRelative(duration, function () { open = true; }),
        source.subscribe(function (x) { open && observer.onNext(x); }, observer.onError.bind(observer), observer.onCompleted.bind(observer)));
    }, source);
  };

  /**
   *  Skips elements from the observable source sequence until the specified start time, using the specified scheduler to run timers.
   *  Errors produced by the source sequence are always forwarded to the result sequence, even if the error occurs before the start time.
   *
   * @examples
   *  1 - res = source.skipUntilWithTime(new Date(), [scheduler]);
   *  2 - res = source.skipUntilWithTime(5000, [scheduler]);
   * @param {Date|Number} startTime Time to start taking elements from the source sequence. If this value is less than or equal to Date(), no elements will be skipped.
   * @param {Scheduler} [scheduler] Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
   * @returns {Observable} An observable sequence with the elements skipped until the specified start time.
   */
  observableProto.skipUntilWithTime = function (startTime, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    var source = this, schedulerMethod = startTime instanceof Date ?
      'scheduleWithAbsolute' :
      'scheduleWithRelative';
    return new AnonymousObservable(function (o) {
      var open = false;

      return new CompositeDisposable(
        scheduler[schedulerMethod](startTime, function () { open = true; }),
        source.subscribe(
          function (x) { open && o.onNext(x); },
          function (e) { o.onError(e); }, function () { o.onCompleted(); }));
    }, source);
  };

  /**
   *  Takes elements for the specified duration until the specified end time, using the specified scheduler to run timers.
   * @param {Number | Date} endTime Time to stop taking elements from the source sequence. If this value is less than or equal to new Date(), the result stream will complete immediately.
   * @param {Scheduler} [scheduler] Scheduler to run the timer on.
   * @returns {Observable} An observable sequence with the elements taken until the specified end time.
   */
  observableProto.takeUntilWithTime = function (endTime, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    var source = this, schedulerMethod = endTime instanceof Date ?
      'scheduleWithAbsolute' :
      'scheduleWithRelative';
    return new AnonymousObservable(function (o) {
      return new CompositeDisposable(
        scheduler[schedulerMethod](endTime, function () { o.onCompleted(); }),
        source.subscribe(o));
    }, source);
  };

  /**
   * Returns an Observable that emits only the first item emitted by the source Observable during sequential time windows of a specified duration.
   * @param {Number} windowDuration time to wait before emitting another item after emitting the last item
   * @param {Scheduler} [scheduler] the Scheduler to use internally to manage the timers that handle timeout for each item. If not provided, defaults to Scheduler.timeout.
   * @returns {Observable} An Observable that performs the throttle operation.
   */
  observableProto.throttleFirst = function (windowDuration, scheduler) {
    isScheduler(scheduler) || (scheduler = timeoutScheduler);
    var duration = +windowDuration || 0;
    if (duration <= 0) { throw new RangeError('windowDuration cannot be less or equal zero.'); }
    var source = this;
    return new AnonymousObservable(function (o) {
      var lastOnNext = 0;
      return source.subscribe(
        function (x) {
          var now = scheduler.now();
          if (lastOnNext === 0 || now - lastOnNext >= duration) {
            lastOnNext = now;
            o.onNext(x);
          }
        },function (e) { o.onError(e); }, function () { o.onCompleted(); }
      );
    }, source);
  };

  /**
   * Executes a transducer to transform the observable sequence
   * @param {Transducer} transducer A transducer to execute
   * @returns {Observable} An Observable sequence containing the results from the transducer.
   */
  observableProto.transduce = function(transducer) {
    var source = this;

    function transformForObserver(o) {
      return {
        '@@transducer/init': function() {
          return o;
        },
        '@@transducer/step': function(obs, input) {
          return obs.onNext(input);
        },
        '@@transducer/result': function(obs) {
          return obs.onCompleted();
        }
      };
    }

    return new AnonymousObservable(function(o) {
      var xform = transducer(transformForObserver(o));
      return source.subscribe(
        function(v) {
          try {
            xform['@@transducer/step'](o, v);
          } catch (e) {
            o.onError(e);
          }
        },
        function (e) { o.onError(e); },
        function() { xform['@@transducer/result'](o); }
      );
    }, source);
  };

  /*
   * Performs a exclusive waiting for the first to finish before subscribing to another observable.
   * Observables that come in between subscriptions will be dropped on the floor.
   * @returns {Observable} A exclusive observable with only the results that happen when subscribed.
   */
  observableProto.exclusive = function () {
    var sources = this;
    return new AnonymousObservable(function (observer) {
      var hasCurrent = false,
        isStopped = false,
        m = new SingleAssignmentDisposable(),
        g = new CompositeDisposable();

      g.add(m);

      m.setDisposable(sources.subscribe(
        function (innerSource) {
          if (!hasCurrent) {
            hasCurrent = true;

            isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));

            var innerSubscription = new SingleAssignmentDisposable();
            g.add(innerSubscription);

            innerSubscription.setDisposable(innerSource.subscribe(
              observer.onNext.bind(observer),
              observer.onError.bind(observer),
              function () {
                g.remove(innerSubscription);
                hasCurrent = false;
                if (isStopped && g.length === 1) {
                  observer.onCompleted();
                }
            }));
          }
        },
        observer.onError.bind(observer),
        function () {
          isStopped = true;
          if (!hasCurrent && g.length === 1) {
            observer.onCompleted();
          }
        }));

      return g;
    }, this);
  };

  /*
   * Performs a exclusive map waiting for the first to finish before subscribing to another observable.
   * Observables that come in between subscriptions will be dropped on the floor.
   * @param {Function} selector Selector to invoke for every item in the current subscription.
   * @param {Any} [thisArg] An optional context to invoke with the selector parameter.
   * @returns {Observable} An exclusive observable with only the results that happen when subscribed.
   */
  observableProto.exclusiveMap = function (selector, thisArg) {
    var sources = this,
        selectorFunc = bindCallback(selector, thisArg, 3);
    return new AnonymousObservable(function (observer) {
      var index = 0,
        hasCurrent = false,
        isStopped = true,
        m = new SingleAssignmentDisposable(),
        g = new CompositeDisposable();

      g.add(m);

      m.setDisposable(sources.subscribe(
        function (innerSource) {

          if (!hasCurrent) {
            hasCurrent = true;

            innerSubscription = new SingleAssignmentDisposable();
            g.add(innerSubscription);

            isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));

            innerSubscription.setDisposable(innerSource.subscribe(
              function (x) {
                var result;
                try {
                  result = selectorFunc(x, index++, innerSource);
                } catch (e) {
                  observer.onError(e);
                  return;
                }

                observer.onNext(result);
              },
              function (e) { observer.onError(e); },
              function () {
                g.remove(innerSubscription);
                hasCurrent = false;

                if (isStopped && g.length === 1) {
                  observer.onCompleted();
                }
              }));
          }
        },
        function (e) { observer.onError(e); },
        function () {
          isStopped = true;
          if (g.length === 1 && !hasCurrent) {
            observer.onCompleted();
          }
        }));
      return g;
    }, this);
  };

  /** Provides a set of extension methods for virtual time scheduling. */
  Rx.VirtualTimeScheduler = (function (__super__) {

    function localNow() {
      return this.toDateTimeOffset(this.clock);
    }

    function scheduleNow(state, action) {
      return this.scheduleAbsoluteWithState(state, this.clock, action);
    }

    function scheduleRelative(state, dueTime, action) {
      return this.scheduleRelativeWithState(state, this.toRelative(dueTime), action);
    }

    function scheduleAbsolute(state, dueTime, action) {
      return this.scheduleRelativeWithState(state, this.toRelative(dueTime - this.now()), action);
    }

    function invokeAction(scheduler, action) {
      action();
      return disposableEmpty;
    }

    inherits(VirtualTimeScheduler, __super__);

    /**
     * Creates a new virtual time scheduler with the specified initial clock value and absolute time comparer.
     *
     * @constructor
     * @param {Number} initialClock Initial value for the clock.
     * @param {Function} comparer Comparer to determine causality of events based on absolute time.
     */
    function VirtualTimeScheduler(initialClock, comparer) {
      this.clock = initialClock;
      this.comparer = comparer;
      this.isEnabled = false;
      this.queue = new PriorityQueue(1024);
      __super__.call(this, localNow, scheduleNow, scheduleRelative, scheduleAbsolute);
    }

    var VirtualTimeSchedulerPrototype = VirtualTimeScheduler.prototype;

    /**
     * Adds a relative time value to an absolute time value.
     * @param {Number} absolute Absolute virtual time value.
     * @param {Number} relative Relative virtual time value to add.
     * @return {Number} Resulting absolute virtual time sum value.
     */
    VirtualTimeSchedulerPrototype.add = notImplemented;

    /**
     * Converts an absolute time to a number
     * @param {Any} The absolute time.
     * @returns {Number} The absolute time in ms
     */
    VirtualTimeSchedulerPrototype.toDateTimeOffset = notImplemented;

    /**
     * Converts the TimeSpan value to a relative virtual time value.
     * @param {Number} timeSpan TimeSpan value to convert.
     * @return {Number} Corresponding relative virtual time value.
     */
    VirtualTimeSchedulerPrototype.toRelative = notImplemented;

    /**
     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be emulated using recursive scheduling.
     * @param {Mixed} state Initial state passed to the action upon the first iteration.
     * @param {Number} period Period for running the work periodically.
     * @param {Function} action Action to be executed, potentially updating the state.
     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
     */
    VirtualTimeSchedulerPrototype.schedulePeriodicWithState = function (state, period, action) {
      var s = new SchedulePeriodicRecursive(this, state, period, action);
      return s.start();
    };

    /**
     * Schedules an action to be executed after dueTime.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Number} dueTime Relative time after which to execute the action.
     * @param {Function} action Action to be executed.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    VirtualTimeSchedulerPrototype.scheduleRelativeWithState = function (state, dueTime, action) {
      var runAt = this.add(this.clock, dueTime);
      return this.scheduleAbsoluteWithState(state, runAt, action);
    };

    /**
     * Schedules an action to be executed at dueTime.
     * @param {Number} dueTime Relative time after which to execute the action.
     * @param {Function} action Action to be executed.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    VirtualTimeSchedulerPrototype.scheduleRelative = function (dueTime, action) {
      return this.scheduleRelativeWithState(action, dueTime, invokeAction);
    };

    /**
     * Starts the virtual time scheduler.
     */
    VirtualTimeSchedulerPrototype.start = function () {
      if (!this.isEnabled) {
        this.isEnabled = true;
        do {
          var next = this.getNext();
          if (next !== null) {
            this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
            next.invoke();
          } else {
            this.isEnabled = false;
          }
        } while (this.isEnabled);
      }
    };

    /**
     * Stops the virtual time scheduler.
     */
    VirtualTimeSchedulerPrototype.stop = function () {
      this.isEnabled = false;
    };

    /**
     * Advances the scheduler's clock to the specified time, running all work till that point.
     * @param {Number} time Absolute time to advance the scheduler's clock to.
     */
    VirtualTimeSchedulerPrototype.advanceTo = function (time) {
      var dueToClock = this.comparer(this.clock, time);
      if (this.comparer(this.clock, time) > 0) { throw new ArgumentOutOfRangeError(); }
      if (dueToClock === 0) { return; }
      if (!this.isEnabled) {
        this.isEnabled = true;
        do {
          var next = this.getNext();
          if (next !== null && this.comparer(next.dueTime, time) <= 0) {
            this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
            next.invoke();
          } else {
            this.isEnabled = false;
          }
        } while (this.isEnabled);
        this.clock = time;
      }
    };

    /**
     * Advances the scheduler's clock by the specified relative time, running all work scheduled for that timespan.
     * @param {Number} time Relative time to advance the scheduler's clock by.
     */
    VirtualTimeSchedulerPrototype.advanceBy = function (time) {
      var dt = this.add(this.clock, time),
          dueToClock = this.comparer(this.clock, dt);
      if (dueToClock > 0) { throw new ArgumentOutOfRangeError(); }
      if (dueToClock === 0) {  return; }

      this.advanceTo(dt);
    };

    /**
     * Advances the scheduler's clock by the specified relative time.
     * @param {Number} time Relative time to advance the scheduler's clock by.
     */
    VirtualTimeSchedulerPrototype.sleep = function (time) {
      var dt = this.add(this.clock, time);
      if (this.comparer(this.clock, dt) >= 0) { throw new ArgumentOutOfRangeError(); }

      this.clock = dt;
    };

    /**
     * Gets the next scheduled item to be executed.
     * @returns {ScheduledItem} The next scheduled item.
     */
    VirtualTimeSchedulerPrototype.getNext = function () {
      while (this.queue.length > 0) {
        var next = this.queue.peek();
        if (next.isCancelled()) {
          this.queue.dequeue();
        } else {
          return next;
        }
      }
      return null;
    };

    /**
     * Schedules an action to be executed at dueTime.
     * @param {Scheduler} scheduler Scheduler to execute the action on.
     * @param {Number} dueTime Absolute time at which to execute the action.
     * @param {Function} action Action to be executed.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    VirtualTimeSchedulerPrototype.scheduleAbsolute = function (dueTime, action) {
      return this.scheduleAbsoluteWithState(action, dueTime, invokeAction);
    };

    /**
     * Schedules an action to be executed at dueTime.
     * @param {Mixed} state State passed to the action to be executed.
     * @param {Number} dueTime Absolute time at which to execute the action.
     * @param {Function} action Action to be executed.
     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
     */
    VirtualTimeSchedulerPrototype.scheduleAbsoluteWithState = function (state, dueTime, action) {
      var self = this;

      function run(scheduler, state1) {
        self.queue.remove(si);
        return action(scheduler, state1);
      }

      var si = new ScheduledItem(this, state, run, dueTime, this.comparer);
      this.queue.enqueue(si);

      return si.disposable;
    };

    return VirtualTimeScheduler;
  }(Scheduler));

  /** Provides a virtual time scheduler that uses Date for absolute time and number for relative time. */
  Rx.HistoricalScheduler = (function (__super__) {
    inherits(HistoricalScheduler, __super__);

    /**
     * Creates a new historical scheduler with the specified initial clock value.
     * @constructor
     * @param {Number} initialClock Initial value for the clock.
     * @param {Function} comparer Comparer to determine causality of events based on absolute time.
     */
    function HistoricalScheduler(initialClock, comparer) {
      var clock = initialClock == null ? 0 : initialClock;
      var cmp = comparer || defaultSubComparer;
      __super__.call(this, clock, cmp);
    }

    var HistoricalSchedulerProto = HistoricalScheduler.prototype;

    /**
     * Adds a relative time value to an absolute time value.
     * @param {Number} absolute Absolute virtual time value.
     * @param {Number} relative Relative virtual time value to add.
     * @return {Number} Resulting absolute virtual time sum value.
     */
    HistoricalSchedulerProto.add = function (absolute, relative) {
      return absolute + relative;
    };

    HistoricalSchedulerProto.toDateTimeOffset = function (absolute) {
      return new Date(absolute).getTime();
    };

    /**
     * Converts the TimeSpan value to a relative virtual time value.
     * @memberOf HistoricalScheduler
     * @param {Number} timeSpan TimeSpan value to convert.
     * @return {Number} Corresponding relative virtual time value.
     */
    HistoricalSchedulerProto.toRelative = function (timeSpan) {
      return timeSpan;
    };

    return HistoricalScheduler;
  }(Rx.VirtualTimeScheduler));

  var AnonymousObservable = Rx.AnonymousObservable = (function (__super__) {
    inherits(AnonymousObservable, __super__);

    // Fix subscriber to check for undefined or function returned to decorate as Disposable
    function fixSubscriber(subscriber) {
      return subscriber && isFunction(subscriber.dispose) ? subscriber :
        isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
    }

    function setDisposable(s, state) {
      var ado = state[0], subscribe = state[1];
      var sub = tryCatch(subscribe)(ado);

      if (sub === errorObj) {
        if(!ado.fail(errorObj.e)) { return thrower(errorObj.e); }
      }
      ado.setDisposable(fixSubscriber(sub));
    }

    function AnonymousObservable(subscribe, parent) {
      this.source = parent;

      function s(observer) {
        var ado = new AutoDetachObserver(observer), state = [ado, subscribe];

        if (currentThreadScheduler.scheduleRequired()) {
          currentThreadScheduler.scheduleWithState(state, setDisposable);
        } else {
          setDisposable(null, state);
        }
        return ado;
      }

      __super__.call(this, s);
    }

    return AnonymousObservable;

  }(Observable));

  var AutoDetachObserver = (function (__super__) {
    inherits(AutoDetachObserver, __super__);

    function AutoDetachObserver(observer) {
      __super__.call(this);
      this.observer = observer;
      this.m = new SingleAssignmentDisposable();
    }

    var AutoDetachObserverPrototype = AutoDetachObserver.prototype;

    AutoDetachObserverPrototype.next = function (value) {
      var result = tryCatch(this.observer.onNext).call(this.observer, value);
      if (result === errorObj) {
        this.dispose();
        thrower(result.e);
      }
    };

    AutoDetachObserverPrototype.error = function (err) {
      var result = tryCatch(this.observer.onError).call(this.observer, err);
      this.dispose();
      result === errorObj && thrower(result.e);
    };

    AutoDetachObserverPrototype.completed = function () {
      var result = tryCatch(this.observer.onCompleted).call(this.observer);
      this.dispose();
      result === errorObj && thrower(result.e);
    };

    AutoDetachObserverPrototype.setDisposable = function (value) { this.m.setDisposable(value); };
    AutoDetachObserverPrototype.getDisposable = function () { return this.m.getDisposable(); };

    AutoDetachObserverPrototype.dispose = function () {
      __super__.prototype.dispose.call(this);
      this.m.dispose();
    };

    return AutoDetachObserver;
  }(AbstractObserver));

  var GroupedObservable = (function (__super__) {
    inherits(GroupedObservable, __super__);

    function subscribe(observer) {
      return this.underlyingObservable.subscribe(observer);
    }

    function GroupedObservable(key, underlyingObservable, mergedDisposable) {
      __super__.call(this, subscribe);
      this.key = key;
      this.underlyingObservable = !mergedDisposable ?
        underlyingObservable :
        new AnonymousObservable(function (observer) {
          return new CompositeDisposable(mergedDisposable.getDisposable(), underlyingObservable.subscribe(observer));
        });
    }

    return GroupedObservable;
  }(Observable));

  /**
   *  Represents an object that is both an observable sequence as well as an observer.
   *  Each notification is broadcasted to all subscribed observers.
   */
  var Subject = Rx.Subject = (function (__super__) {
    function subscribe(observer) {
      checkDisposed(this);
      if (!this.isStopped) {
        this.observers.push(observer);
        return new InnerSubscription(this, observer);
      }
      if (this.hasError) {
        observer.onError(this.error);
        return disposableEmpty;
      }
      observer.onCompleted();
      return disposableEmpty;
    }

    inherits(Subject, __super__);

    /**
     * Creates a subject.
     */
    function Subject() {
      __super__.call(this, subscribe);
      this.isDisposed = false,
      this.isStopped = false,
      this.observers = [];
      this.hasError = false;
    }

    addProperties(Subject.prototype, Observer.prototype, {
      /**
       * Indicates whether the subject has observers subscribed to it.
       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
       */
      hasObservers: function () { return this.observers.length > 0; },
      /**
       * Notifies all subscribed observers about the end of the sequence.
       */
      onCompleted: function () {
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onCompleted();
          }

          this.observers.length = 0;
        }
      },
      /**
       * Notifies all subscribed observers about the exception.
       * @param {Mixed} error The exception to send to all observers.
       */
      onError: function (error) {
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          this.error = error;
          this.hasError = true;
          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onError(error);
          }

          this.observers.length = 0;
        }
      },
      /**
       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
       * @param {Mixed} value The value to send to all observers.
       */
      onNext: function (value) {
        checkDisposed(this);
        if (!this.isStopped) {
          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onNext(value);
          }
        }
      },
      /**
       * Unsubscribe all observers and release resources.
       */
      dispose: function () {
        this.isDisposed = true;
        this.observers = null;
      }
    });

    /**
     * Creates a subject from the specified observer and observable.
     * @param {Observer} observer The observer used to send messages to the subject.
     * @param {Observable} observable The observable used to subscribe to messages sent from the subject.
     * @returns {Subject} Subject implemented using the given observer and observable.
     */
    Subject.create = function (observer, observable) {
      return new AnonymousSubject(observer, observable);
    };

    return Subject;
  }(Observable));

  /**
   *  Represents the result of an asynchronous operation.
   *  The last value before the OnCompleted notification, or the error received through OnError, is sent to all subscribed observers.
   */
  var AsyncSubject = Rx.AsyncSubject = (function (__super__) {

    function subscribe(observer) {
      checkDisposed(this);

      if (!this.isStopped) {
        this.observers.push(observer);
        return new InnerSubscription(this, observer);
      }

      if (this.hasError) {
        observer.onError(this.error);
      } else if (this.hasValue) {
        observer.onNext(this.value);
        observer.onCompleted();
      } else {
        observer.onCompleted();
      }

      return disposableEmpty;
    }

    inherits(AsyncSubject, __super__);

    /**
     * Creates a subject that can only receive one value and that value is cached for all future observations.
     * @constructor
     */
    function AsyncSubject() {
      __super__.call(this, subscribe);

      this.isDisposed = false;
      this.isStopped = false;
      this.hasValue = false;
      this.observers = [];
      this.hasError = false;
    }

    addProperties(AsyncSubject.prototype, Observer, {
      /**
       * Indicates whether the subject has observers subscribed to it.
       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
       */
      hasObservers: function () {
        checkDisposed(this);
        return this.observers.length > 0;
      },
      /**
       * Notifies all subscribed observers about the end of the sequence, also causing the last received value to be sent out (if any).
       */
      onCompleted: function () {
        var i, len;
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          var os = cloneArray(this.observers), len = os.length;

          if (this.hasValue) {
            for (i = 0; i < len; i++) {
              var o = os[i];
              o.onNext(this.value);
              o.onCompleted();
            }
          } else {
            for (i = 0; i < len; i++) {
              os[i].onCompleted();
            }
          }

          this.observers.length = 0;
        }
      },
      /**
       * Notifies all subscribed observers about the error.
       * @param {Mixed} error The Error to send to all observers.
       */
      onError: function (error) {
        checkDisposed(this);
        if (!this.isStopped) {
          this.isStopped = true;
          this.hasError = true;
          this.error = error;

          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
            os[i].onError(error);
          }

          this.observers.length = 0;
        }
      },
      /**
       * Sends a value to the subject. The last value received before successful termination will be sent to all subscribed and future observers.
       * @param {Mixed} value The value to store in the subject.
       */
      onNext: function (value) {
        checkDisposed(this);
        if (this.isStopped) { return; }
        this.value = value;
        this.hasValue = true;
      },
      /**
       * Unsubscribe all observers and release resources.
       */
      dispose: function () {
        this.isDisposed = true;
        this.observers = null;
        this.exception = null;
        this.value = null;
      }
    });

    return AsyncSubject;
  }(Observable));

  var AnonymousSubject = Rx.AnonymousSubject = (function (__super__) {
    inherits(AnonymousSubject, __super__);

    function subscribe(observer) {
      return this.observable.subscribe(observer);
    }

    function AnonymousSubject(observer, observable) {
      this.observer = observer;
      this.observable = observable;
      __super__.call(this, subscribe);
    }

    addProperties(AnonymousSubject.prototype, Observer.prototype, {
      onCompleted: function () {
        this.observer.onCompleted();
      },
      onError: function (error) {
        this.observer.onError(error);
      },
      onNext: function (value) {
        this.observer.onNext(value);
      }
    });

    return AnonymousSubject;
  }(Observable));

  /**
  * Used to pause and resume streams.
  */
  Rx.Pauser = (function (__super__) {
    inherits(Pauser, __super__);

    function Pauser() {
      __super__.call(this);
    }

    /**
     * Pauses the underlying sequence.
     */
    Pauser.prototype.pause = function () { this.onNext(false); };

    /**
    * Resumes the underlying sequence.
    */
    Pauser.prototype.resume = function () { this.onNext(true); };

    return Pauser;
  }(Subject));

  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    root.Rx = Rx;

    define(function() {
      return Rx;
    });
  } else if (freeExports && freeModule) {
    // in Node.js or RingoJS
    if (moduleExports) {
      (freeModule.exports = Rx).Rx = Rx;
    } else {
      freeExports.Rx = Rx;
    }
  } else {
    // in a browser or Rhino
    root.Rx = Rx;
  }

  // All code before this point will be filtered from stack traces.
  var rEndingLine = captureLine();

}.call(this));


var wx;
(function (wx) {
    "use strict";
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var WeakMapEmulated = (function () {
        function WeakMapEmulated() {
            this.inner = {};
        }
        WeakMapEmulated.prototype.set = function (key, value) {
            var oid = wx.getOid(key);
            this.inner[oid] = value;
        };
        WeakMapEmulated.prototype.get = function (key) {
            var oid = wx.getOid(key);
            return this.inner[oid];
        };
        WeakMapEmulated.prototype.has = function (key) {
            var oid = wx.getOid(key);
            return this.inner.hasOwnProperty(oid);
        };
        WeakMapEmulated.prototype.delete = function (key) {
            var oid = wx.getOid(key);
            return delete this.inner[oid];
        };
        Object.defineProperty(WeakMapEmulated.prototype, "isEmulated", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        return WeakMapEmulated;
    })();
    var hasNativeSupport = typeof WeakMap === "function";
    function createWeakMap(disableNativeSupport) {
        if (disableNativeSupport || !hasNativeSupport) {
            return new WeakMapEmulated();
        }
        return new WeakMap();
    }
    wx.createWeakMap = createWeakMap;
})(wx || (wx = {}));
var wx;
(function (wx) {
    var res;
    (function (res) {
        "use strict";
        res.injector = "wx.injector";
        res.domManager = "wx.domservice";
        res.router = "wx.router";
        res.messageBus = "wx.messageBus";
        res.expressionCompiler = "wx.expressioncompiler";
        res.htmlTemplateEngine = "wx.htmlTemplateEngine";
        res.hasValueBindingValue = "has.wx.bindings.value";
        res.valueBindingValue = "wx.bindings.value";
    })(res = wx.res || (wx.res = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
})(wx || (wx = {}));
var wx;
(function (wx) {
    var internal;
    (function (internal) {
        "use strict";
        var PropertyChangedEventArgs = (function () {
            function PropertyChangedEventArgs(sender, propertyName) {
                this.propertyName = propertyName;
                this.sender = sender;
            }
            return PropertyChangedEventArgs;
        })();
        internal.PropertyChangedEventArgs = PropertyChangedEventArgs;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var IID = (function () {
        function IID() {
        }
        IID.IUnknown = "IUnknown";
        IID.IDisposable = "IDisposable";
        IID.IObservableProperty = "IObservableProperty";
        IID.IReactiveNotifyPropertyChanged = "IReactiveNotifyPropertyChanged";
        IID.IHandleObservableErrors = "IHandleObservableErrors";
        IID.IObservableList = "IObservableList";
        IID.IList = "IList";
        IID.IReactiveNotifyCollectionChanged = "IReactiveNotifyCollectionChanged";
        IID.IReactiveNotifyCollectionItemChanged = "IReactiveNotifyCollectionItemChanged";
        IID.IReactiveDerivedList = "IReactiveDerivedList";
        IID.IMoveInfo = "IMoveInfo";
        IID.IObservedChange = "IObservedChange";
        IID.ICommand = "ICommand";
        IID.IReadOnlyList = "IReadOnlyList";
        return IID;
    })();
    wx.IID = IID;
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var regexCssClassName = /\S+/g;
    var RxObsConstructor = Rx.Observable;
    wx.noop = function () {
    };
    function isStrictMode() {
        return typeof this === "undefined";
    }
    wx.isStrictMode = isStrictMode;
    function isPrimitive(target) {
        var t = typeof target;
        return t === "boolean" || t === "number" || t === "string";
    }
    wx.isPrimitive = isPrimitive;
    function isProperty(target) {
        if (target == null)
            return false;
        return queryInterface(target, wx.IID.IObservableProperty);
    }
    wx.isProperty = isProperty;
    function isCommand(target) {
        if (target == null)
            return false;
        return target instanceof internal.commandConstructor || queryInterface(target, wx.IID.ICommand);
    }
    wx.isCommand = isCommand;
    function isList(target) {
        if (target == null)
            return false;
        return target instanceof internal.listConstructor;
    }
    wx.isList = isList;
    function isRxScheduler(target) {
        if (target == null)
            return false;
        return Rx.Scheduler.isScheduler(target);
    }
    wx.isRxScheduler = isRxScheduler;
    function isRxObservable(target) {
        if (target == null)
            return false;
        return target instanceof RxObsConstructor;
    }
    wx.isRxObservable = isRxObservable;
    function unwrapProperty(prop) {
        if (isProperty(prop))
            return prop();
        return prop;
    }
    wx.unwrapProperty = unwrapProperty;
    function isInUnitTest() {
        if (window && window["jasmine"] && window["jasmine"].version_ !== undefined) {
            return true;
        }
        if (window && window["getJasmineRequireObj"] && typeof window["getJasmineRequireObj"] === "function") {
            return true;
        }
        return false;
    }
    wx.isInUnitTest = isInUnitTest;
    function getSearchParameters(query) {
        query = query || wx.app.history.location.search.substr(1);
        if (query) {
            var result = {};
            var params = query.split("&");
            for (var i = 0; i < params.length; i++) {
                var tmp = params[i].split("=");
                result[tmp[0]] = decodeURIComponent(tmp[1]);
            }
            return result;
        }
        return {};
    }
    wx.getSearchParameters = getSearchParameters;
    function args2Array(args) {
        var result = [];
        for (var i = 0, len = args.length; i < len; i++) {
            result.push(args[i]);
        }
        return result;
    }
    wx.args2Array = args2Array;
    function formatString(fmt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var pattern = /\{\d+\}/g;
        return fmt.replace(pattern, function (capture) {
            return args[capture.match(/\d+/)];
        });
    }
    wx.formatString = formatString;
    function extend(src, dst, inherited) {
        var prop;
        if (!inherited) {
            var ownProps = Object.getOwnPropertyNames(src);
            for (var i = 0; i < ownProps.length; i++) {
                prop = ownProps[i];
                dst[prop] = src[prop];
            }
        }
        else {
            for (prop in src) {
                dst[prop] = src[prop];
            }
        }
        return dst;
    }
    wx.extend = extend;
    var oid = 1;
    var oidPropertyName = "__rxui_oid__" + (new Date).getTime();
    var PropertyInfo = (function () {
        function PropertyInfo(propertyName, property) {
            this.property = property;
            this.propertyName = propertyName;
        }
        return PropertyInfo;
    })();
    wx.PropertyInfo = PropertyInfo;
    function queryInterface(target, iid) {
        if (supportsQueryInterface(target)) {
            return target.queryInterface(iid);
        }
        return false;
    }
    wx.queryInterface = queryInterface;
    function supportsQueryInterface(target) {
        return target !== undefined && target !== null && typeof target.queryInterface === "function";
    }
    wx.supportsQueryInterface = supportsQueryInterface;
    function getOwnPropertiesImplementingInterface(target, iid) {
        return Object.keys(target).filter(function (propertyName) {
            var o = target[propertyName];
            return queryInterface(o, iid);
        }).map(function (x) { return new PropertyInfo(x, target[x]); });
    }
    wx.getOwnPropertiesImplementingInterface = getOwnPropertiesImplementingInterface;
    function getOid(o) {
        if (o == null)
            return undefined;
        if (isPrimitive(o))
            return (typeof o + ":" + o);
        var result = o[oidPropertyName];
        if (result === undefined) {
            result = (++oid).toString();
            o[oidPropertyName] = result;
        }
        return result;
    }
    wx.getOid = getOid;
    function toggleCssClass(node, shouldHaveClass) {
        var classNames = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            classNames[_i - 2] = arguments[_i];
        }
        if (classNames) {
            var currentClassNames = node.className.match(regexCssClassName) || [];
            var index;
            var i;
            var className;
            if (shouldHaveClass) {
                for (i = 0; i < classNames.length; i++) {
                    className = classNames[i];
                    index = currentClassNames.indexOf(className);
                    if (index === -1)
                        currentClassNames.push(className);
                }
            }
            else {
                for (i = 0; i < classNames.length; i++) {
                    className = classNames[i];
                    index = currentClassNames.indexOf(className);
                    if (index !== -1)
                        currentClassNames.splice(index, 1);
                }
            }
            node.className = currentClassNames.join(" ");
        }
    }
    wx.toggleCssClass = toggleCssClass;
    function triggerReflow(el) {
        el.getBoundingClientRect();
    }
    wx.triggerReflow = triggerReflow;
    function isFunction(obj) {
        return typeof obj == 'function' || false;
    }
    wx.isFunction = isFunction;
    function isDisposable(obj) {
        return isFunction(obj["dispose"]);
    }
    wx.isDisposable = isDisposable;
    function isEqual(a, b, aStack, bStack) {
        var toString = ({}).toString;
        if (a === b)
            return a !== 0 || 1 / a === 1 / b;
        if (a == null || b == null)
            return a === b;
        var className = toString.call(a);
        if (className !== toString.call(b))
            return false;
        switch (className) {
            case '[object RegExp]':
            case '[object String]':
                return '' + a === '' + b;
            case '[object Number]':
                if (+a !== +a)
                    return +b !== +b;
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                return +a === +b;
        }
        var areArrays = className === '[object Array]';
        if (!areArrays) {
            if (typeof a != 'object' || typeof b != 'object')
                return false;
            var aCtor = a.constructor, bCtor = b.constructor;
            if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
                return false;
            }
        }
        aStack = aStack || [];
        bStack = bStack || [];
        var length = aStack.length;
        while (length--) {
            if (aStack[length] === a)
                return bStack[length] === b;
        }
        aStack.push(a);
        bStack.push(b);
        if (areArrays) {
            length = a.length;
            if (length !== b.length)
                return false;
            while (length--) {
                if (!isEqual(a[length], b[length], aStack, bStack))
                    return false;
            }
        }
        else {
            var keys = Object.keys(a), key;
            length = keys.length;
            if (Object.keys(b).length !== length)
                return false;
            while (length--) {
                key = keys[length];
                if (!(b.hasOwnProperty(key) && isEqual(a[key], b[key], aStack, bStack)))
                    return false;
            }
        }
        aStack.pop();
        bStack.pop();
        return true;
    }
    wx.isEqual = isEqual;
    function cloneNodeArray(nodes) {
        var length = nodes.length;
        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = nodes[i].cloneNode(true);
        }
        return result;
    }
    wx.cloneNodeArray = cloneNodeArray;
    function nodeListToArray(nodes) {
        return Array.prototype.slice.call(nodes);
    }
    wx.nodeListToArray = nodeListToArray;
    function nodeChildrenToArray(node) {
        return nodeListToArray(node.childNodes);
    }
    wx.nodeChildrenToArray = nodeChildrenToArray;
    function using(disp, action) {
        if (!disp)
            throw new Error("disp");
        if (!action)
            throw new Error("action");
        try {
            action(disp);
        }
        finally {
            disp.dispose();
        }
    }
    wx.using = using;
    function observableRequire(module) {
        if (!isFunction(require))
            internal.throwError("there's no AMD-module loader available (Hint: did you forget to include RequireJS in your project?)");
        return Rx.Observable.create(function (observer) {
            try {
                require([module], function (m) {
                    observer.onNext(m);
                    observer.onCompleted();
                }, function (err) {
                    observer.onError(err);
                });
            }
            catch (e) {
                observer.onError(e);
            }
            return Rx.Disposable.empty;
        });
    }
    wx.observableRequire = observableRequire;
    function observeObject(target, onChanging) {
        if (onChanging === void 0) { onChanging = false; }
        var thrownExceptionsSubject = queryInterface(target, wx.IID.IHandleObservableErrors) ? target.thrownExceptions : wx.app.defaultExceptionHandler;
        return Rx.Observable.create(function (observer) {
            var result = new Rx.CompositeDisposable();
            var observableProperties = getOwnPropertiesImplementingInterface(target, wx.IID.IObservableProperty);
            observableProperties.forEach(function (x) {
                var prop = x.property;
                var obs = onChanging ? prop.changing : prop.changed;
                result.add(obs.subscribe(function (_) {
                    var e = new internal.PropertyChangedEventArgs(self, x.propertyName);
                    try {
                        observer.onNext(e);
                    }
                    catch (ex) {
                        thrownExceptionsSubject.onNext(ex);
                    }
                }));
            });
            return result;
        }).publish().refCount();
    }
    wx.observeObject = observeObject;
    function whenAny() {
        if (arguments.length === 2) {
            return arguments[0].changed.startWith(arguments[0]()).select(arguments[1]);
        }
        var args = args2Array(arguments);
        var selector = args.pop();
        args = args.map(function (x) { return x.changed.startWith(x()); });
        args.push(selector);
        return Rx.Observable.combineLatest.apply(this, args);
    }
    wx.whenAny = whenAny;
    var internal;
    (function (internal) {
        function throwError(fmt) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var msg = "WebRx: " + formatString(fmt, args);
            throw new Error(msg);
        }
        internal.throwError = throwError;
        function emitError(fmt) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var msg = "WebRx: " + formatString(fmt, args);
            wx.app.defaultExceptionHandler.onNext(Error(msg));
        }
        internal.emitError = emitError;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var Injector = (function () {
        function Injector() {
            this.registrations = {};
        }
        Injector.prototype.register = function () {
            var key = arguments[0];
            var val = arguments[1];
            var isSingleton = arguments[2];
            var factory;
            if (this.registrations.hasOwnProperty(key))
                wx.internal.throwError("'{0}' is already registered", key);
            if (wx.isFunction(val)) {
                factory = function (args, deps) { return val.apply(null, args); };
            }
            else if (Array.isArray(val)) {
                var self = this;
                var ctor = val.pop();
                var dependencies = val;
                factory = function (args, deps) {
                    var resolved = dependencies.map(function (x) {
                        try {
                            return self.get(x, undefined, deps);
                        }
                        catch (e) {
                            wx.internal.throwError("Error resolving dependency '{0}' for '{1}': {2}", x, key, e);
                        }
                    });
                    var _args = [null].concat(resolved).concat(args);
                    var ctorFunc = ctor.bind.apply(ctor, _args);
                    return new ctorFunc();
                };
            }
            else {
                factory = function (args, deps) { return val; };
            }
            this.registrations[key] = { factory: factory, isSingleton: isSingleton };
            return this;
        };
        Injector.prototype.get = function (key, args, deps) {
            deps = deps || {};
            if (deps.hasOwnProperty(key))
                wx.internal.throwError("Detected circular dependency a from '{0}' to '{1}'", Object.keys(deps).join(", "), key);
            var registration = this.registrations[key];
            if (registration === undefined)
                wx.internal.throwError("'{0}' is not registered", key);
            if (registration.isSingleton && registration.value)
                return registration.value;
            var newDeps = {};
            newDeps[key] = true;
            wx.extend(deps, newDeps);
            var result = registration.factory(args, newDeps);
            if (registration.isSingleton)
                registration.value = result;
            return result;
        };
        Injector.prototype.resolve = function (iaa, args) {
            var ctor = iaa.pop();
            if (!wx.isFunction(ctor))
                wx.internal.throwError("Error resolving inline-annotated-array. Constructor must be of type 'function' but is '{0}", typeof ctor);
            var self = this;
            var resolved = iaa.map(function (x) {
                try {
                    return self.get(x, undefined, iaa);
                }
                catch (e) {
                    wx.internal.throwError("Error resolving dependency '{0}' for '{1}': {2}", x, Object.getPrototypeOf(ctor), e);
                }
            });
            var _args = [null].concat(resolved).concat(args);
            var ctorFunc = ctor.bind.apply(ctor, _args);
            return new ctorFunc();
        };
        return Injector;
    })();
    wx.injector = new Injector();
    wx.injector.register(wx.res.injector, function () { return new Injector(); });
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var SetEmulated = (function () {
        function SetEmulated() {
            this.values = [];
            this.keys = {};
        }
        SetEmulated.prototype.add = function (value) {
            var key = wx.getOid(value);
            if (!this.keys[key]) {
                this.values.push(value);
                this.keys[key] = true;
            }
            return this;
        };
        SetEmulated.prototype.delete = function (value) {
            var key = wx.getOid(value);
            if (this.keys[key]) {
                var index = this.values.indexOf(value);
                this.values.splice(index, 1);
                delete this.keys[key];
                return true;
            }
            return false;
        };
        SetEmulated.prototype.has = function (value) {
            var key = wx.getOid(value);
            return this.keys.hasOwnProperty(key);
        };
        SetEmulated.prototype.clear = function () {
            this.keys = {};
            this.values.length = 0;
        };
        SetEmulated.prototype.forEach = function (callback, thisArg) {
            this.values.forEach(callback, thisArg);
        };
        Object.defineProperty(SetEmulated.prototype, "size", {
            get: function () {
                return this.values.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SetEmulated.prototype, "isEmulated", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        return SetEmulated;
    })();
    var hasNativeSupport = typeof Set === "function" && Set.prototype.hasOwnProperty("forEach") && Set.prototype.hasOwnProperty("add") && Set.prototype.hasOwnProperty("clear") && Set.prototype.hasOwnProperty("delete") && Set.prototype.hasOwnProperty("has");
    function createSet(disableNativeSupport) {
        if (disableNativeSupport || !hasNativeSupport) {
            return new SetEmulated();
        }
        return new Set();
    }
    wx.createSet = createSet;
    function setToArray(src) {
        var result = new Array();
        src.forEach(function (x) { return result.push(x); });
        return result;
    }
    wx.setToArray = setToArray;
})(wx || (wx = {}));
var wx;
(function (wx) {
    var env;
    (function (env) {
        "use strict";
        var _window = window;
        var userAgent = _window.navigator.userAgent;
        env.ie;
        env.opera;
        env.safari;
        env.firefox;
        var parseVersion = function (matches) {
            if (matches) {
                return parseFloat(matches[1]);
            }
            return undefined;
        };
        if (_window.opera && _window.opera.version) {
            env.opera = { version: parseInt(_window.opera.version()) };
        }
        var version = document && (function () {
            var version = 3, div = document.createElement('div'), iElems = div.getElementsByTagName('i');
            while (div.innerHTML = '<!--[if gt IE ' + (++version) + ']><i></i><![endif]-->', iElems[0]) {
            }
            return version > 4 ? version : undefined;
        }());
        if (version) {
            env.ie = { version: version };
            if (version < 10) {
                var map = wx.createWeakMap();
                env.ie.getSelectionChangeObservable = function (el) {
                    var doc = el.ownerDocument;
                    var result = map.get(doc);
                    if (result)
                        return result;
                    result = Rx.Observable.defer(function () {
                        return Rx.Observable.fromEvent(doc, 'selectionchange');
                    }).select(function (x) { return doc; }).publish().refCount();
                    map.set(doc, result);
                    return result;
                };
            }
        }
        version = parseVersion(userAgent.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i));
        if (version) {
            env.safari = { version: version };
        }
        version = parseVersion(userAgent.match(/Firefox\/([^ ]*)/));
        if (version) {
            env.firefox = { version: version };
        }
        var hasES5 = typeof Array.isArray === "function" && typeof [].forEach === "function" && typeof [].map === "function" && typeof [].some === "function" && typeof [].indexOf === "function" && typeof Object.keys === "function" && typeof Object.defineProperty === "function";
        env.isSupported = (!env.ie || env.ie.version >= 9) || (!env.safari || env.safari.version >= 5) || (!env.firefox || env.firefox.version >= 5) && hasES5;
        env.jQueryInstance = window["jQuery"];
        if (env.jQueryInstance && (typeof env.jQueryInstance['cleanData'] === "function")) {
            env.cleanExternalData = function (node) {
                env.jQueryInstance['cleanData']([node]);
            };
        }
        else {
            env.cleanExternalData = function (node) {
            };
        }
    })(env = wx.env || (wx.env = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    function property(initialValue) {
        var accessor = function (newVal) {
            if (arguments.length > 0) {
                if (newVal !== accessor.value) {
                    accessor.changingSubject.onNext(newVal);
                    accessor.value = newVal;
                    accessor.changedSubject.onNext(newVal);
                }
            }
            else {
                return accessor.value;
            }
        };
        accessor.queryInterface = function (iid) {
            if (iid === wx.IID.IUnknown || iid === wx.IID.IObservableProperty || iid === wx.IID.IDisposable)
                return true;
            return false;
        };
        accessor.dispose = function () {
        };
        if (initialValue !== undefined)
            accessor.value = initialValue;
        accessor.changedSubject = new Rx.Subject();
        accessor.changed = accessor.changedSubject.publish().refCount();
        accessor.changingSubject = new Rx.Subject();
        accessor.changing = accessor.changingSubject.publish().refCount();
        return accessor;
    }
    wx.property = property;
})(wx || (wx = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var wx;
(function (wx) {
    "use strict";
    var Module = (function () {
        function Module(name) {
            this.bindings = {};
            this.components = {};
            this.expressionFilters = {};
            this.animations = {};
            this.name = name;
        }
        Module.prototype.merge = function (other) {
            var _other = other;
            wx.extend(_other.components, this.components);
            wx.extend(_other.bindings, this.bindings);
            wx.extend(_other.expressionFilters, this.expressionFilters);
            wx.extend(_other.animations, this.animations);
            return this;
        };
        Module.prototype.component = function (name, component) {
            this.components[name] = component;
            return this;
        };
        Module.prototype.hasComponent = function (name) {
            return this.components[name] != null;
        };
        Module.prototype.loadComponent = function (name, params) {
            return this.initializeComponent(this.instantiateComponent(name), params);
        };
        Module.prototype.binding = function () {
            var _this = this;
            var args = wx.args2Array(arguments);
            var name = args.shift();
            var handler;
            if (args.length === 0) {
                handler = this.bindings[name];
                if (typeof handler === "string") {
                    handler = wx.injector.get(handler);
                    this.bindings[name] = handler;
                }
                return handler;
            }
            handler = args.shift();
            if (Array.isArray(name)) {
                name.forEach(function (x) { return _this.bindings[x] = handler; });
            }
            else {
                this.bindings[name] = handler;
            }
            return this;
        };
        Module.prototype.filter = function () {
            var args = wx.args2Array(arguments);
            var name = args.shift();
            var filter;
            if (args.length === 0) {
                filter = this.expressionFilters[name];
                if (typeof filter === "string") {
                    filter = wx.injector.get(filter);
                    this.bindings[name] = filter;
                }
                return filter;
            }
            filter = args.shift();
            this.expressionFilters[name] = filter;
            return this;
        };
        Module.prototype.filters = function () {
            return this.expressionFilters;
        };
        Module.prototype.animation = function () {
            var args = wx.args2Array(arguments);
            var name = args.shift();
            var animation;
            if (args.length === 0) {
                animation = this.animations[name];
                if (typeof animation === "string") {
                    animation = wx.injector.get(animation);
                    this.bindings[name] = animation;
                }
                return animation;
            }
            animation = args.shift();
            this.animations[name] = animation;
            return this;
        };
        Module.prototype.instantiateComponent = function (name) {
            var _this = this;
            var cd = this.components[name];
            var result = undefined;
            if (cd != null) {
                if (cd.instance) {
                    result = Rx.Observable.return(cd.instance);
                }
                else if (cd.template) {
                    result = Rx.Observable.return(cd);
                }
                else if (cd.resolve) {
                    var resolved = wx.injector.get(cd.resolve);
                    result = Rx.Observable.return(resolved);
                }
                else if (cd.require) {
                    result = wx.observableRequire(cd.require);
                }
            }
            else {
                result = Rx.Observable.return(undefined);
            }
            return result.do(function (x) { return _this.components[name].instance = x; });
        };
        Module.prototype.initializeComponent = function (obs, params) {
            var _this = this;
            return obs.take(1).selectMany(function (component) {
                if (component == null) {
                    return Rx.Observable.return(undefined);
                }
                if (component.viewModel) {
                    return Rx.Observable.combineLatest(_this.loadComponentTemplate(component.template, params), _this.loadComponentViewModel(component.viewModel, params), function (t, vm) {
                        if (wx.isFunction(vm)) {
                            vm = new vm(params);
                        }
                        return {
                            template: t,
                            viewModel: vm,
                            preBindingInit: component.preBindingInit,
                            postBindingInit: component.postBindingInit
                        };
                    });
                }
                return _this.loadComponentTemplate(component.template, params).select(function (template) { return {
                    template: template,
                    preBindingInit: component.preBindingInit,
                    postBindingInit: component.postBindingInit
                }; });
            }).take(1);
        };
        Module.prototype.loadComponentTemplate = function (template, params) {
            var syncResult;
            var el;
            if (wx.isFunction(template)) {
                syncResult = template(params);
                if (typeof syncResult === "string") {
                    syncResult = wx.app.templateEngine.parse(template(params));
                }
                return Rx.Observable.return(syncResult);
            }
            else if (typeof template === "string") {
                syncResult = wx.app.templateEngine.parse(template);
                return Rx.Observable.return(syncResult);
            }
            else if (Array.isArray(template)) {
                return Rx.Observable.return(template);
            }
            else if (typeof template === "object") {
                var options = template;
                if (options.resolve) {
                    syncResult = wx.injector.get(options.resolve);
                    return Rx.Observable.return(syncResult);
                }
                else if (options.promise) {
                    var promise = options.promise;
                    return Rx.Observable.fromPromise(promise);
                }
                else if (options.require) {
                    return wx.observableRequire(options.require).select(function (x) { return wx.app.templateEngine.parse(x); });
                }
                else if (options.element) {
                    if (typeof options.element === "string") {
                        el = document.getElementById(options.element) || document.querySelector(options.element);
                        if (el != null) {
                            syncResult = wx.app.templateEngine.parse(el.innerHTML);
                        }
                        else {
                            syncResult = [];
                        }
                        return Rx.Observable.return(syncResult);
                    }
                    else {
                        el = options.element;
                        if (el != null) {
                            syncResult = wx.app.templateEngine.parse(el.innerHTML);
                        }
                        else {
                            syncResult = [];
                        }
                        return Rx.Observable.return(syncResult);
                    }
                }
            }
            internal.throwError("invalid template descriptor");
        };
        Module.prototype.loadComponentViewModel = function (vm, componentParams) {
            var syncResult;
            if (wx.isFunction(vm)) {
                return Rx.Observable.return(vm);
            }
            else if (Array.isArray(vm)) {
                syncResult = wx.injector.resolve(vm, componentParams);
                return Rx.Observable.return(syncResult);
            }
            else if (typeof vm === "object") {
                var options = vm;
                if (options.resolve) {
                    syncResult = wx.injector.get(options.resolve, componentParams);
                    return Rx.Observable.return(syncResult);
                }
                else if (options.promise) {
                    var promise = options.promise;
                    return Rx.Observable.fromPromise(promise);
                }
                else if (options.require) {
                    return wx.observableRequire(options.require);
                }
                else if (options.instance) {
                    return Rx.Observable.return(options.instance);
                }
            }
            internal.throwError("invalid view-model descriptor");
        };
        return Module;
    })();
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            _super.call(this, "app");
            this.defaultExceptionHandler = Rx.Observer.create(function (ex) {
                if (!wx.isInUnitTest()) {
                    wx.log.error("An onError occurred on an object (usually a computedProperty) that would break a binding or command. To prevent this, subscribe to the thrownExceptions property of your objects: {0}", ex);
                }
            });
            this.title = wx.property(document.title);
            if (!wx.isInUnitTest()) {
                this.history = this.createHistory();
            }
            else {
                this.history = createMockHistory();
            }
        }
        Object.defineProperty(App.prototype, "mainThreadScheduler", {
            get: function () {
                return this._unitTestMainThreadScheduler || this._mainThreadScheduler || Rx.Scheduler.currentThread;
            },
            set: function (value) {
                if (wx.isInUnitTest()) {
                    this._unitTestMainThreadScheduler = value;
                    this._mainThreadScheduler = this._mainThreadScheduler || value;
                }
                else {
                    this._mainThreadScheduler = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App.prototype, "templateEngine", {
            get: function () {
                if (!this._templateEngine) {
                    this._templateEngine = wx.injector.get(wx.res.htmlTemplateEngine);
                }
                return this._templateEngine;
            },
            set: function (newVal) {
                this._templateEngine = newVal;
            },
            enumerable: true,
            configurable: true
        });
        App.prototype.createHistory = function () {
            var result = {
                back: window.history.back.bind(window.history),
                forward: window.history.forward.bind(window.history),
                pushState: window.history.pushState.bind(window.history),
                replaceState: window.history.replaceState.bind(window.history)
            };
            Object.defineProperty(result, "length", {
                get: function () {
                    return window.history.length;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(result, "state", {
                get: function () {
                    return window.history.state;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(result, "location", {
                get: function () {
                    return window.location;
                },
                enumerable: true,
                configurable: true
            });
            result.onPopState = Rx.Observable.fromEventPattern(function (h) { return window.addEventListener("popstate", h); }, function (h) { return window.removeEventListener("popstate", h); }).publish().refCount();
            return result;
        };
        return App;
    })(Module);
    var internal;
    (function (internal) {
        internal.moduleConstructor = Module;
    })(internal = wx.internal || (wx.internal = {}));
    wx.app = new App();
    var modules = {
        'app': { instance: wx.app }
    };
    function module(name, descriptor) {
        modules[name] = descriptor;
        return wx;
    }
    wx.module = module;
    function loadModule(name) {
        var md = modules[name];
        var result = undefined;
        var module;
        if (md != null) {
            if (Array.isArray(md)) {
                module = new Module(name);
                wx.injector.resolve(md, module);
                result = Rx.Observable.return(module);
            }
            else if (wx.isFunction(md)) {
                module = new Module(name);
                md(module);
                result = Rx.Observable.return(module);
            }
            else {
                var mdd = md;
                if (mdd.instance) {
                    result = Rx.Observable.return(mdd.instance);
                }
                else {
                    module = new Module(name);
                    if (mdd.resolve) {
                        wx.injector.get(mdd.resolve, module);
                        result = Rx.Observable.return(module);
                    }
                    else if (mdd.require) {
                        result = wx.observableRequire(mdd.require).do(function (x) { return x(module); }).select(function (x) { return module; });
                    }
                }
            }
        }
        else {
            result = Rx.Observable.return(undefined);
        }
        return result.take(1).do(function (x) { return modules[name] = { instance: x }; });
    }
    wx.loadModule = loadModule;
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var DomManager = (function () {
        function DomManager(compiler) {
            this.expressionCache = {};
            this.dataContextExtensions = wx.createSet();
            this.parserOptions = {
                disallowFunctionCalls: true
            };
            this.nodeState = wx.createWeakMap();
            this.compiler = compiler;
        }
        DomManager.prototype.applyBindings = function (model, rootNode) {
            if (rootNode === undefined || rootNode.nodeType !== 1)
                internal.throwError("first parameter should be your model, second parameter should be a DOM node!");
            if (this.isNodeBound(rootNode))
                internal.throwError("an element must not be bound multiple times!");
            var state = this.getNodeState(rootNode);
            if (state) {
                state.model = model;
            }
            else {
                state = this.createNodeState(model);
                this.setNodeState(rootNode, state);
            }
            var ctx = this.getDataContext(rootNode);
            this.applyBindingsRecursive(ctx, rootNode);
        };
        DomManager.prototype.applyBindingsToDescendants = function (ctx, node) {
            if (node.hasChildNodes()) {
                for (var i = 0; i < node.childNodes.length; i++) {
                    var child = node.childNodes[i];
                    if (child.nodeType !== 1)
                        continue;
                    this.applyBindingsRecursive(ctx, child);
                }
            }
        };
        DomManager.prototype.cleanNode = function (rootNode) {
            if (rootNode.nodeType !== 1)
                return;
            this.cleanNodeRecursive(rootNode);
        };
        DomManager.prototype.cleanDescendants = function (node) {
            if (node.hasChildNodes()) {
                for (var i = 0; i < node.childNodes.length; i++) {
                    var child = node.childNodes[i];
                    if (node.nodeType !== 1)
                        continue;
                    this.clearNodeState(child);
                }
            }
        };
        DomManager.prototype.getObjectLiteralTokens = function (value) {
            value = value.trim();
            if (value !== '' && this.isObjectLiteralString(value)) {
                return this.compiler.parseObjectLiteral(value);
            }
            return [];
        };
        DomManager.prototype.compileBindingOptions = function (value, module) {
            value = value.trim();
            if (value === '') {
                return null;
            }
            if (this.isObjectLiteralString(value)) {
                var result = {};
                var tokens = this.compiler.parseObjectLiteral(value);
                var token;
                for (var i = 0; i < tokens.length; i++) {
                    token = tokens[i];
                    result[token.key] = this.compileBindingOptions(token.value, module);
                }
                return result;
            }
            else {
                var options = wx.extend(this.parserOptions, {});
                options.filters = {};
                wx.extend(wx.app.filters(), options.filters);
                if (module) {
                    wx.extend(module.filters(), options.filters);
                }
                return this.compiler.compileExpression(value, options, this.expressionCache);
            }
        };
        DomManager.prototype.getModuleContext = function (node) {
            var state;
            while (node) {
                state = this.getNodeState(node);
                if (state != null) {
                    if (state.module != null) {
                        return state.module;
                    }
                }
                node = node.parentNode;
            }
            return wx.app;
        };
        DomManager.prototype.registerDataContextExtension = function (extension) {
            this.dataContextExtensions.add(extension);
        };
        DomManager.prototype.getDataContext = function (node) {
            var models = [];
            var state = this.getNodeState(node);
            var _node = node;
            while (_node) {
                state = state != null ? state : this.getNodeState(_node);
                if (state != null) {
                    if (state.model != null) {
                        models.push(state.model);
                    }
                }
                state = null;
                _node = _node.parentNode;
            }
            var ctx;
            if (models.length > 0) {
                ctx = {
                    $data: models[0],
                    $root: models[models.length - 1],
                    $parent: models.length > 1 ? models[1] : null,
                    $parents: models.slice(1)
                };
            }
            else {
                ctx = {
                    $data: null,
                    $root: null,
                    $parent: null,
                    $parents: []
                };
            }
            this.dataContextExtensions.forEach(function (ext) { return ext(node, ctx); });
            return ctx;
        };
        DomManager.prototype.createNodeState = function (model, module) {
            return {
                cleanup: new Rx.CompositeDisposable(),
                model: model,
                module: module,
                isBound: false
            };
        };
        DomManager.prototype.isNodeBound = function (node) {
            var state = this.nodeState.get(node);
            return state && state.isBound;
        };
        DomManager.prototype.setNodeState = function (node, state) {
            this.nodeState.set(node, state);
        };
        DomManager.prototype.getNodeState = function (node) {
            return this.nodeState.get(node);
        };
        DomManager.prototype.clearNodeState = function (node) {
            var state = this.nodeState.get(node);
            if (state) {
                if (state.cleanup != null) {
                    state.cleanup.dispose();
                    state.cleanup = undefined;
                }
                if (state.model != null) {
                    state.model = undefined;
                }
                if (state.module != null) {
                    state.module = undefined;
                }
            }
            this.nodeState.delete(node);
            wx.env.cleanExternalData(node);
        };
        DomManager.prototype.evaluateExpression = function (exp, ctx) {
            var locals = this.createLocals(undefined, ctx);
            var result = exp(ctx.$data, locals);
            return result;
        };
        DomManager.prototype.expressionToObservable = function (exp, ctx, evalObs) {
            var _this = this;
            var captured = wx.createSet();
            var locals;
            var result;
            try {
                locals = this.createLocals(captured, ctx);
                result = exp(ctx.$data, locals);
                if (evalObs)
                    evalObs.onNext(true);
            }
            catch (e) {
                wx.app.defaultExceptionHandler.onNext(e);
                return Rx.Observable.return(undefined);
            }
            if (captured.size === 0) {
                if (wx.isRxObservable(result))
                    return result;
                return Rx.Observable.return(result);
            }
            var obs = Rx.Observable.create(function (observer) {
                var innerDisp = Rx.Observable.defer(function () {
                    return Rx.Observable.merge(wx.setToArray(captured)).take(1);
                }).repeat().subscribe(function (trigger) {
                    try {
                        captured.clear();
                        locals = _this.createLocals(captured, ctx);
                        result = exp(ctx.$data, locals);
                        if (!wx.isRxObservable(result)) {
                            observer.onNext(Rx.Observable.return(result));
                        }
                        else {
                            observer.onNext(result);
                        }
                        if (evalObs)
                            evalObs.onNext(true);
                    }
                    catch (e) {
                        wx.app.defaultExceptionHandler.onNext(e);
                    }
                });
                return innerDisp;
            });
            var startValue = wx.isRxObservable(result) ? result : Rx.Observable.return(result);
            return obs.startWith(startValue).concatAll();
        };
        DomManager.prototype.applyBindingsInternal = function (ctx, el, module) {
            var result = false;
            var state = this.getNodeState(el);
            if (!state) {
                state = this.createNodeState();
                this.setNodeState(el, state);
            }
            else if (state.isBound) {
                internal.throwError("an element must not be bound multiple times!");
            }
            var _bindings;
            var tagName = el.tagName.toLowerCase();
            var i;
            if (module.hasComponent(tagName) || wx.app.hasComponent(tagName)) {
                var params = el.getAttribute(DomManager.paramsAttributename);
                var componentReference;
                if (params)
                    componentReference = "{ name: '" + tagName + "', params: {" + el.getAttribute(DomManager.paramsAttributename) + "} }";
                else
                    componentReference = "{ name: '" + tagName + "' }";
                _bindings = [{ key: 'component', value: componentReference }];
            }
            else {
                _bindings = this.getBindingDefinitions(el);
            }
            if (_bindings != null && _bindings.length > 0) {
                var bindings = _bindings.map(function (x) {
                    var handler = module.binding(x.key);
                    if (!handler)
                        internal.throwError("binding '{0}' has not been registered.", x.key);
                    return { handler: handler, value: x.value };
                });
                bindings.sort(function (a, b) { return (b.handler.priority || 0) - (a.handler.priority || 0); });
                var hd = bindings.filter(function (x) { return x.handler.controlsDescendants; }).map(function (x) { return "'" + x.value + "'"; });
                if (hd.length > 1) {
                    internal.throwError("bindings {0} are competing for descendants of target element!", hd.join(", "));
                }
                result = hd.length > 0;
                for (i = 0; i < bindings.length; i++) {
                    var binding = bindings[i];
                    var handler = binding.handler;
                    handler.applyBinding(el, binding.value, ctx, state, module);
                }
            }
            state.isBound = true;
            return result;
        };
        DomManager.prototype.isObjectLiteralString = function (str) {
            return str[0] === "{" && str[str.length - 1] === "}";
        };
        DomManager.prototype.getBindingDefinitions = function (node) {
            var bindingText = null;
            if (node.nodeType === 1) {
                var attr = node.getAttribute(DomManager.bindingAttributeName);
                if (attr) {
                    bindingText = attr;
                }
            }
            if (bindingText) {
                bindingText = bindingText.trim();
            }
            if (bindingText)
                return this.compiler.parseObjectLiteral(bindingText);
            return null;
        };
        DomManager.prototype.applyBindingsRecursive = function (ctx, el, module) {
            module = module || this.getModuleContext(el);
            if (!this.applyBindingsInternal(ctx, el, module) && el.hasChildNodes()) {
                var state = this.getNodeState(el);
                if (state && state.module)
                    module = state.module;
                for (var i = 0; i < el.childNodes.length; i++) {
                    var child = el.childNodes[i];
                    if (child.nodeType !== 1)
                        continue;
                    this.applyBindingsRecursive(ctx, child, module);
                }
            }
        };
        DomManager.prototype.cleanNodeRecursive = function (node) {
            if (node.hasChildNodes()) {
                var length = node.childNodes.length;
                for (var i = 0; i < length; i++) {
                    var child = node.childNodes[i];
                    if (node.nodeType !== 1)
                        continue;
                    this.cleanNodeRecursive(child);
                }
            }
            this.clearNodeState(node);
        };
        DomManager.prototype.createLocals = function (captured, ctx) {
            var locals = {};
            var list;
            var prop;
            var result, target;
            var hooks = {
                readFieldHook: function (o, field) {
                    var noUnwrap = false;
                    if (field[0] === '@') {
                        noUnwrap = true;
                        field = field.substring(1);
                    }
                    result = o[field];
                    if (!noUnwrap && wx.isProperty(result)) {
                        var prop = result;
                        if (captured)
                            captured.add(prop.changed);
                        result = prop();
                    }
                    return result;
                },
                writeFieldHook: function (o, field, newValue) {
                    if (field[0] === '@') {
                        field = field.substring(1);
                    }
                    target = o[field];
                    if (wx.isProperty(target)) {
                        var prop = target;
                        if (captured)
                            captured.add(prop.changed);
                        prop(newValue);
                    }
                    else {
                        o[field] = newValue;
                    }
                    return newValue;
                },
                readIndexHook: function (o, index) {
                    if (wx.queryInterface(o, wx.IID.IObservableList)) {
                        list = o;
                        result = list.get(index);
                        if (captured)
                            captured.add(list.listChanged);
                    }
                    else {
                        result = o[index];
                    }
                    if (wx.queryInterface(result, wx.IID.IObservableProperty)) {
                        var prop = result;
                        if (captured)
                            captured.add(prop.changed);
                        result = prop();
                    }
                    return result;
                },
                writeIndexHook: function (o, index, newValue) {
                    if (wx.queryInterface(o, wx.IID.IObservableList)) {
                        list = o;
                        target = list.get(index);
                        if (captured)
                            captured.add(list.listChanged);
                        if (wx.isProperty(target)) {
                            prop = target;
                            if (captured)
                                captured.add(prop.changed);
                            prop(newValue);
                        }
                        else {
                            list.set(index, newValue);
                        }
                    }
                    else {
                        if (wx.isProperty(o[index])) {
                            prop = target[index];
                            if (captured)
                                captured.add(prop.changed);
                            prop(newValue);
                        }
                        else {
                            o[index] = newValue;
                        }
                    }
                    return newValue;
                }
            };
            this.compiler.setRuntimeHooks(locals, hooks);
            var keys = Object.keys(ctx);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var key = keys[i];
                locals[key] = ctx[key];
            }
            return locals;
        };
        DomManager.bindingAttributeName = "data-bind";
        DomManager.paramsAttributename = "params";
        return DomManager;
    })();
    var internal;
    (function (internal) {
        internal.domManagerConstructor = DomManager;
    })(internal = wx.internal || (wx.internal = {}));
    function applyBindings(model, node) {
        wx.injector.get(wx.res.domManager).applyBindings(model, node || window.document.documentElement);
    }
    wx.applyBindings = applyBindings;
    function cleanNode(node) {
        wx.injector.get(wx.res.domManager).cleanNode(node);
    }
    wx.cleanNode = cleanNode;
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var CheckedBinding = (function () {
        function CheckedBinding(domManager) {
            this.priority = 0;
            this.domManager = domManager;
        }
        CheckedBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("checked-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var tag = el.tagName.toLowerCase();
            var isCheckBox = el.type === 'checkbox';
            var isRadioButton = el.type === 'radio';
            if (tag !== 'input' || (!isCheckBox && !isRadioButton))
                internal.throwError("checked-binding only operates on checkboxes and radio-buttons");
            var exp = this.domManager.compileBindingOptions(options, module);
            var prop;
            var cleanup;
            function doCleanup() {
                if (cleanup) {
                    cleanup.dispose();
                    cleanup = null;
                }
            }
            function updateElement(value) {
                el.checked = value;
            }
            state.cleanup.add(this.domManager.expressionToObservable(exp, ctx).subscribe(function (model) {
                try {
                    if (!wx.isProperty(model)) {
                        updateElement(model);
                    }
                    else {
                        doCleanup();
                        cleanup = new Rx.CompositeDisposable();
                        prop = model;
                        cleanup.add(prop.changed.subscribe(function (x) {
                            updateElement(x);
                        }));
                        updateElement(prop());
                        if (!prop.source) {
                            var events = _this.getCheckedEventObservables(el);
                            cleanup.add(Rx.Observable.merge(events).subscribe(function (e) {
                                prop(el.checked);
                            }));
                        }
                    }
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
                doCleanup();
            }));
        };
        CheckedBinding.prototype.configure = function (options) {
        };
        CheckedBinding.prototype.getCheckedEventObservables = function (el) {
            var result = [];
            result.push(Rx.Observable.fromEvent(el, 'click'));
            result.push(Rx.Observable.fromEvent(el, 'change'));
            return result;
        };
        return CheckedBinding;
    })();
    var internal;
    (function (internal) {
        internal.checkedBindingConstructor = CheckedBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var CommandBinding = (function () {
        function CommandBinding(domManager) {
            this.priority = 0;
            this.domManager = domManager;
        }
        CommandBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            if (node.nodeType !== 1)
                internal.throwError("command-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var compiled = this.domManager.compileBindingOptions(options, module);
            var el = node;
            var exp;
            var cmdObservable;
            var paramObservable;
            var cleanup;
            var isAnchor = el.tagName.toLowerCase() === "a";
            var event = "click";
            function doCleanup() {
                if (cleanup) {
                    cleanup.dispose();
                    cleanup = null;
                }
            }
            if (typeof compiled === "function") {
                exp = compiled;
                cmdObservable = this.domManager.expressionToObservable(exp, ctx);
            }
            else {
                var opt = compiled;
                exp = opt.command;
                cmdObservable = this.domManager.expressionToObservable(exp, ctx);
                if (opt.parameter) {
                    exp = opt.parameter;
                    paramObservable = this.domManager.expressionToObservable(exp, ctx);
                }
            }
            if (paramObservable == null) {
                paramObservable = Rx.Observable.return(undefined);
            }
            state.cleanup.add(Rx.Observable.combineLatest(cmdObservable, paramObservable, function (cmd, param) { return ({ cmd: cmd, param: param }); }).subscribe(function (x) {
                try {
                    doCleanup();
                    cleanup = new Rx.CompositeDisposable();
                    if (x.cmd != null) {
                        if (!wx.isCommand(x.cmd))
                            internal.throwError("Command-Binding only supports binding to a command!");
                        el.disabled = !x.cmd.canExecute(x.param);
                        cleanup.add(x.cmd.canExecuteObservable.subscribe(function (canExecute) {
                            el.disabled = !canExecute;
                        }));
                        cleanup.add(Rx.Observable.fromEvent(el, "click").subscribe(function (e) {
                            x.cmd.execute(x.param);
                            if (isAnchor && e.type === "click") {
                                e.preventDefault();
                            }
                        }));
                    }
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
                doCleanup();
            }));
        };
        CommandBinding.prototype.configure = function (options) {
        };
        return CommandBinding;
    })();
    var internal;
    (function (internal) {
        internal.commandBindingConstructor = CommandBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var ModuleBinding = (function () {
        function ModuleBinding(domManager) {
            this.priority = 100;
            this.controlsDescendants = true;
            this.domManager = domManager;
        }
        ModuleBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            if (node.nodeType !== 1)
                internal.throwError("module-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var self = this;
            var exp = this.domManager.compileBindingOptions(options, module);
            var obs = this.domManager.expressionToObservable(exp, ctx);
            var initialApply = true;
            var cleanup;
            function doCleanup() {
                if (cleanup) {
                    cleanup.dispose();
                    cleanup = null;
                }
            }
            var template = new Array();
            state.cleanup.add(obs.subscribe(function (x) {
                try {
                    doCleanup();
                    cleanup = new Rx.CompositeDisposable();
                    var value = wx.unwrapProperty(x);
                    var moduleNames;
                    var disp = undefined;
                    if (value) {
                        value = value.trim();
                        moduleNames = value.split(" ").filter(function (x) { return x; });
                    }
                    if (moduleNames.length > 0) {
                        var observables = moduleNames.map(function (x) { return wx.loadModule(x); });
                        disp = Rx.Observable.combineLatest(observables, function (_) { return wx.args2Array(arguments); }).subscribe(function (modules) {
                            var moduleName = (module || wx.app).name + "+" + moduleNames.join("+");
                            var merged = new internal.moduleConstructor(moduleName);
                            merged.merge(module || wx.app);
                            modules.forEach(function (x) { return merged.merge(x); });
                            self.applyValue(el, merged, template, ctx, state, initialApply);
                            initialApply = false;
                        });
                        if (disp != null)
                            cleanup.add(disp);
                    }
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                obs = null;
                self = null;
            }));
        };
        ModuleBinding.prototype.configure = function (options) {
        };
        ModuleBinding.prototype.applyValue = function (el, module, template, ctx, state, initialApply) {
            var i;
            if (initialApply) {
                for (i = 0; i < el.childNodes.length; i++) {
                    template.push(el.childNodes[i].cloneNode(true));
                }
            }
            state.module = module;
            this.domManager.cleanDescendants(el);
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
            for (i = 0; i < template.length; i++) {
                var node = template[i].cloneNode(true);
                el.appendChild(node);
            }
            this.domManager.applyBindingsToDescendants(ctx, el);
        };
        return ModuleBinding;
    })();
    var internal;
    (function (internal) {
        internal.moduleBindingConstructor = ModuleBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var ComponentBinding = (function () {
        function ComponentBinding(domManager) {
            this.priority = 30;
            this.controlsDescendants = true;
            this.domManager = domManager;
        }
        ComponentBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("component-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var compiled = this.domManager.compileBindingOptions(options, module);
            var opt = compiled;
            var exp;
            var componentNameObservable;
            var componentParams = {};
            var cleanup;
            function doCleanup() {
                if (cleanup) {
                    cleanup.dispose();
                    cleanup = null;
                }
            }
            if (typeof compiled === "function") {
                exp = compiled;
                componentNameObservable = this.domManager.expressionToObservable(exp, ctx);
            }
            else {
                componentNameObservable = this.domManager.expressionToObservable(opt.name, ctx);
                if (opt.params) {
                    if (wx.isFunction(opt.params)) {
                        componentParams = this.domManager.evaluateExpression(opt.params, ctx);
                    }
                    else if (typeof opt.params === "object") {
                        Object.keys(opt.params).forEach(function (x) {
                            componentParams[x] = _this.domManager.evaluateExpression(opt.params[x], ctx);
                        });
                    }
                    else {
                        internal.throwError("invalid component-params");
                    }
                }
            }
            var oldContents = new Array();
            while (el.firstChild) {
                oldContents.push(el.removeChild(el.firstChild));
            }
            state.cleanup.add(componentNameObservable.subscribe(function (componentName) {
                try {
                    doCleanup();
                    cleanup = new Rx.CompositeDisposable();
                    var obs = module.loadComponent(componentName, componentParams);
                    var disp = undefined;
                    if (obs == null)
                        internal.throwError("component '{0}' is not registered with current module-context", componentName);
                    disp = obs.subscribe(function (component) {
                        if (disp != null) {
                            disp.dispose();
                            disp = undefined;
                        }
                        if (component.viewModel) {
                            if (wx.isDisposable(component.viewModel)) {
                                cleanup.add(component.viewModel);
                            }
                        }
                        _this.applyTemplate(component, el, ctx, state, component.template, component.viewModel);
                    });
                    if (disp != null)
                        cleanup.add(disp);
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                oldContents = null;
                compiled = null;
                doCleanup();
            }));
        };
        ComponentBinding.prototype.configure = function (options) {
        };
        ComponentBinding.prototype.applyTemplate = function (component, el, ctx, state, template, vm) {
            while (el.firstChild) {
                this.domManager.cleanNode(el.firstChild);
                el.removeChild(el.firstChild);
            }
            for (var i = 0; i < template.length; i++) {
                var node = template[i].cloneNode(true);
                el.appendChild(node);
            }
            if (vm) {
                state.model = vm;
                ctx = this.domManager.getDataContext(el);
            }
            if (vm && component.preBindingInit && vm.hasOwnProperty(component.preBindingInit)) {
                vm[component.preBindingInit].call(vm, el);
            }
            this.domManager.applyBindingsToDescendants(ctx, el);
            if (vm && component.postBindingInit && vm.hasOwnProperty(component.postBindingInit)) {
                vm[component.postBindingInit].call(vm, el);
            }
        };
        return ComponentBinding;
    })();
    var internal;
    (function (internal) {
        internal.componentBindingConstructor = ComponentBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var EventBinding = (function () {
        function EventBinding(domManager) {
            this.priority = 0;
            this.domManager = domManager;
        }
        EventBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("event-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var tokens = this.domManager.getObjectLiteralTokens(options);
            tokens.forEach(function (token) {
                _this.wireEvent(el, token.value, token.key, ctx, state, module);
            });
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
            }));
        };
        EventBinding.prototype.configure = function (options) {
        };
        EventBinding.prototype.wireEvent = function (el, value, eventName, ctx, state, module) {
            var exp = this.domManager.compileBindingOptions(value, module);
            var command;
            var commandParameter = undefined;
            var obs = Rx.Observable.fromEvent(el, eventName);
            if (typeof exp === "function") {
                var handler = this.domManager.evaluateExpression(exp, ctx);
                handler = wx.unwrapProperty(handler);
                if (wx.isFunction(handler)) {
                    state.cleanup.add(obs.subscribe(function (e) {
                        handler.apply(ctx.$data, [ctx, e]);
                    }));
                }
                else {
                    if (wx.isCommand(handler)) {
                        command = handler;
                        state.cleanup.add(obs.subscribe(function (_) {
                            command.execute(undefined);
                        }));
                    }
                    else {
                        var observer = handler;
                        state.cleanup.add(obs.subscribe(observer));
                    }
                }
            }
            else if (typeof exp === "object") {
                var opt = exp;
                command = this.domManager.evaluateExpression(opt.command, ctx);
                command = wx.unwrapProperty(command);
                if (exp.hasOwnProperty("parameter"))
                    commandParameter = this.domManager.evaluateExpression(opt.parameter, ctx);
                state.cleanup.add(obs.subscribe(function (_) {
                    command.execute(commandParameter);
                }));
            }
            else {
                internal.throwError("invalid binding options");
            }
        };
        return EventBinding;
    })();
    var internal;
    (function (internal) {
        internal.eventBindingConstructor = EventBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    var internal;
    (function (internal) {
        "use strict";
        var VirtualChildNodes = (function () {
            function VirtualChildNodes(targetNode, initialSyncToTarget, insertCB, removeCB) {
                this.childNodes = [];
                this.targetNode = targetNode;
                this.insertCB = insertCB;
                this.removeCB = removeCB;
                if (initialSyncToTarget) {
                    for (var i = 0; i < targetNode.childNodes.length; i++) {
                        this.childNodes.push(targetNode.childNodes[i]);
                    }
                }
            }
            VirtualChildNodes.prototype.appendChilds = function (nodes, callbackData) {
                var length = nodes.length;
                var i;
                if (nodes.length > 1)
                    Array.prototype.push.apply(this.childNodes, nodes);
                else
                    this.childNodes.push(nodes[0]);
                for (i = 0; i < length; i++) {
                    this.targetNode.appendChild(nodes[i]);
                }
                if (this.insertCB) {
                    for (i = 0; i < length; i++) {
                        this.insertCB(nodes[i], callbackData);
                    }
                }
            };
            VirtualChildNodes.prototype.insertChilds = function (index, nodes, callbackData) {
                if (index === this.childNodes.length) {
                    this.appendChilds(nodes, callbackData);
                }
                else {
                    var refNode = this.childNodes[index];
                    var length = nodes.length;
                    var i;
                    Array.prototype.splice.apply(this.childNodes, [index, 0].concat(nodes));
                    for (i = 0; i < length; i++) {
                        this.targetNode.insertBefore(nodes[i], refNode);
                    }
                    if (this.insertCB) {
                        for (i = 0; i < length; i++) {
                            this.insertCB(nodes[i], callbackData);
                        }
                    }
                }
            };
            VirtualChildNodes.prototype.removeChilds = function (index, count, keepDom) {
                var node;
                if (count === 0)
                    return [];
                var nodes = this.childNodes.slice(index, index + count);
                this.childNodes.splice(index, count);
                if (!keepDom) {
                    var length = nodes.length;
                    for (var i = 0; i < length; i++) {
                        node = nodes[i];
                        if (this.removeCB)
                            this.removeCB(node);
                        this.targetNode.removeChild(node);
                    }
                }
                return nodes;
            };
            VirtualChildNodes.prototype.clear = function () {
                var length = this.childNodes.length;
                var node;
                for (var i = 0; i < length; i++) {
                    node = this.childNodes[i];
                    if (this.removeCB)
                        this.removeCB(node);
                    this.targetNode.removeChild(node);
                }
                this.childNodes = [];
            };
            return VirtualChildNodes;
        })();
        internal.VirtualChildNodes = VirtualChildNodes;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var RefCountDisposeWrapper = (function () {
        function RefCountDisposeWrapper(inner, initialRefCount) {
            if (initialRefCount === void 0) { initialRefCount = 1; }
            this.inner = inner;
            this.refCount = initialRefCount;
        }
        RefCountDisposeWrapper.prototype.addRef = function () {
            this.refCount++;
        };
        RefCountDisposeWrapper.prototype.release = function () {
            if (--this.refCount === 0) {
                this.inner.dispose();
                this.inner = null;
            }
            return this.refCount;
        };
        RefCountDisposeWrapper.prototype.dispose = function () {
            this.release();
        };
        return RefCountDisposeWrapper;
    })();
    wx.RefCountDisposeWrapper = RefCountDisposeWrapper;
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var ForEachBinding = (function () {
        function ForEachBinding(domManager) {
            this.priority = 40;
            this.controlsDescendants = true;
            this.domManager = domManager;
            domManager.registerDataContextExtension(function (node, ctx) {
                var state = domManager.getNodeState(node);
                ctx.$index = state.index;
            });
        }
        ForEachBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            if (node.nodeType !== 1)
                internal.throwError("forEach binding only operates on elements!");
            if (options == null)
                internal.throwError("** invalid binding options!");
            var compiled = this.domManager.compileBindingOptions(options, module);
            var el = node;
            var self = this;
            var initialApply = true;
            var cleanup = null;
            var hooks;
            var exp;
            var setProxyFunc;
            var animations = {};
            if (typeof compiled === "object" && compiled.hasOwnProperty("data")) {
                var opt = compiled;
                exp = opt.data;
                if (opt.itemEnter) {
                    animations.itemEnter = this.domManager.evaluateExpression(opt.itemEnter, ctx);
                    if (typeof animations.itemEnter === "string") {
                        animations.itemEnter = module.animation(animations.itemEnter);
                    }
                }
                if (opt.itemLeave) {
                    animations.itemLeave = this.domManager.evaluateExpression(opt.itemLeave, ctx);
                    if (typeof animations.itemLeave === "string") {
                        animations.itemLeave = module.animation(animations.itemLeave);
                    }
                }
                if (opt.hooks) {
                    hooks = this.domManager.evaluateExpression(opt.hooks, ctx);
                }
                if (typeof hooks === "string")
                    hooks = wx.injector.get(hooks);
                if (opt['debug']) {
                    if (opt['debug']['setProxyFunc']) {
                        setProxyFunc = this.domManager.evaluateExpression(opt['debug']['setProxyFunc'], ctx);
                    }
                }
            }
            else {
                exp = compiled;
            }
            var obs = this.domManager.expressionToObservable(exp, ctx);
            state.cleanup.add(Rx.Disposable.create(function () {
                if (cleanup) {
                    cleanup.dispose();
                    cleanup = null;
                }
            }));
            var template = new Array();
            state.cleanup.add(obs.subscribe(function (x) {
                try {
                    if (cleanup) {
                        cleanup.dispose();
                    }
                    cleanup = new Rx.CompositeDisposable();
                    self.applyValue(el, x, hooks, animations, template, ctx, initialApply, cleanup, setProxyFunc);
                    initialApply = false;
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                obs = null;
                el = null;
                self = null;
                template = null;
                hooks = null;
            }));
        };
        ForEachBinding.prototype.configure = function (options) {
        };
        ForEachBinding.prototype.createIndexPropertyForNode = function (proxy, child, startIndex, trigger, templateLength) {
            return Rx.Observable.defer(function () {
                return Rx.Observable.create(function (obs) {
                    return trigger.subscribe(function (_) {
                        var index = proxy.childNodes.indexOf(child);
                        index /= templateLength;
                        obs.onNext(index);
                    });
                });
            }).toProperty(startIndex);
        };
        ForEachBinding.prototype.appendAllRows = function (proxy, list, ctx, template, hooks, animations, indexTrigger, isInitial) {
            var length = list.length();
            for (var i = 0; i < length; i++) {
                this.appendRow(proxy, i, list.get(i), ctx, template, hooks, animations, indexTrigger, isInitial);
            }
        };
        ForEachBinding.prototype.appendRow = function (proxy, index, item, ctx, template, hooks, animations, indexTrigger, isInitial) {
            var nodes = wx.cloneNodeArray(template);
            var _index = index;
            var enterAnimation = animations.itemEnter;
            var cbData = {
                item: item
            };
            if (indexTrigger) {
                _index = this.createIndexPropertyForNode(proxy, nodes[0], index, indexTrigger, template.length);
                cbData.indexDisp = new wx.RefCountDisposeWrapper(_index, 0);
            }
            cbData.index = _index;
            if (enterAnimation != null)
                enterAnimation.prepare(nodes);
            proxy.appendChilds(nodes, cbData);
            if (hooks) {
                if (hooks.afterRender)
                    hooks.afterRender(nodes, item);
                if (!isInitial && hooks.afterAdd)
                    hooks.afterAdd(nodes, item, index);
            }
            if (enterAnimation) {
                var disp = enterAnimation.run(nodes).continueWith(function () { return enterAnimation.complete(nodes); }).subscribe(function (x) {
                    if (disp != null)
                        disp.dispose();
                });
            }
        };
        ForEachBinding.prototype.insertRow = function (proxy, index, item, ctx, template, hooks, animations, indexTrigger) {
            var templateLength = template.length;
            var enterAnimation = animations.itemEnter;
            var nodes = wx.cloneNodeArray(template);
            var _index = this.createIndexPropertyForNode(proxy, nodes[0], index, indexTrigger, template.length);
            if (enterAnimation != null)
                enterAnimation.prepare(nodes);
            proxy.insertChilds(index * templateLength, nodes, {
                index: _index,
                item: item,
                indexDisp: new wx.RefCountDisposeWrapper(_index, 0)
            });
            if (hooks) {
                if (hooks.afterRender)
                    hooks.afterRender(nodes, item);
                if (hooks.afterAdd)
                    hooks.afterAdd(nodes, item, index);
            }
            if (enterAnimation) {
                var disp = enterAnimation.run(nodes).continueWith(function () { return enterAnimation.complete(nodes); }).subscribe(function (x) {
                    if (disp != null)
                        disp.dispose();
                });
            }
        };
        ForEachBinding.prototype.removeRow = function (proxy, index, item, template, hooks, animations) {
            var templateLength = template.length;
            var el = proxy.targetNode;
            var nodes = proxy.removeChilds(index * templateLength, templateLength, true);
            var leaveAnimation = animations.itemLeave;
            function removeNodes() {
                for (var i = 0; i < templateLength; i++) {
                    el.removeChild(nodes[i]);
                }
            }
            if (hooks && hooks.beforeRemove) {
                hooks.beforeRemove(nodes, item, index);
            }
            else {
                if (leaveAnimation != null) {
                    leaveAnimation.prepare(nodes);
                    var disp = leaveAnimation.run(nodes).continueWith(function () { return leaveAnimation.complete(nodes); }).continueWith(removeNodes).subscribe(function (x) {
                        if (disp != null)
                            disp.dispose();
                    });
                }
                else {
                    removeNodes();
                }
            }
        };
        ForEachBinding.prototype.moveRow = function (proxy, from, to, item, template, hooks, animations, indexTrigger) {
            var templateLength = template.length;
            var el = proxy.targetNode;
            var nodes = proxy.removeChilds(from * templateLength, templateLength, true);
            var leaveAnimation = animations.itemLeave;
            var enterAnimation = animations.itemEnter;
            var combined = [];
            var obs;
            var self = this;
            if (hooks && hooks.beforeMove) {
                hooks.beforeMove(nodes, item, from);
            }
            function removeNodes() {
                for (var i = 0; i < templateLength; i++) {
                    el.removeChild(nodes[i]);
                }
            }
            function createRow() {
                nodes = wx.cloneNodeArray(template);
                var _index = self.createIndexPropertyForNode(proxy, nodes[0], from, indexTrigger, template.length);
                if (enterAnimation != null)
                    enterAnimation.prepare(nodes);
                proxy.insertChilds(templateLength * to, nodes, {
                    index: _index,
                    item: item,
                    indexDisp: new wx.RefCountDisposeWrapper(_index, 0)
                });
                if (hooks && hooks.afterMove) {
                    hooks.afterMove(nodes, item, from);
                }
            }
            if (leaveAnimation) {
                leaveAnimation.prepare(nodes);
                obs = leaveAnimation.run(nodes).continueWith(function () { return leaveAnimation.complete(nodes); }).continueWith(removeNodes);
            }
            else {
                obs = Rx.Observable.startDeferred(removeNodes);
            }
            combined.push(obs);
            obs = Rx.Observable.startDeferred(createRow);
            if (enterAnimation) {
                obs = obs.continueWith(enterAnimation.run(nodes)).continueWith(function () { return enterAnimation.complete(nodes); });
            }
            combined.push(obs);
            if (combined.length > 1)
                obs = Rx.Observable.combineLatest(combined, wx.noop).take(1);
            else if (combined.length === 1)
                obs = combined[0].take(1);
            var disp = obs.subscribe(function (x) {
                if (disp != null)
                    disp.dispose();
            });
        };
        ForEachBinding.prototype.rebindRow = function (proxy, index, item, template, indexTrigger) {
            var templateLength = template.length;
            var _index = this.createIndexPropertyForNode(proxy, proxy.childNodes[(index * templateLength)], index, indexTrigger, template.length);
            var indexDisp = new wx.RefCountDisposeWrapper(_index, 0);
            for (var i = 0; i < template.length; i++) {
                var node = proxy.childNodes[(index * templateLength) + i];
                if (node.nodeType === 1) {
                    this.domManager.cleanNode(node);
                    var state = this.domManager.createNodeState(item);
                    state.index = _index;
                    indexDisp.addRef();
                    state.cleanup.add(indexDisp);
                    this.domManager.setNodeState(node, state);
                    this.domManager.applyBindings(item, node);
                }
            }
        };
        ForEachBinding.prototype.observeList = function (proxy, ctx, template, cleanup, list, hooks, animations, indexTrigger) {
            var _this = this;
            var i;
            var length;
            cleanup.add(indexTrigger);
            this.appendAllRows(proxy, list, ctx, template, hooks, animations, indexTrigger, true);
            cleanup.add(list.itemsAdded.subscribe(function (e) {
                length = e.items.length;
                if (e.from === list.length()) {
                    for (i = 0; i < length; i++) {
                        _this.appendRow(proxy, i + e.from, e.items[i], ctx, template, hooks, animations, indexTrigger, false);
                    }
                }
                else {
                    for (i = 0; i < e.items.length; i++) {
                        _this.insertRow(proxy, i + e.from, e.items[i], ctx, template, hooks, animations, indexTrigger);
                    }
                }
                indexTrigger.onNext(true);
            }));
            cleanup.add(list.itemsRemoved.subscribe(function (e) {
                length = e.items.length;
                for (i = 0; i < length; i++) {
                    _this.removeRow(proxy, i + e.from, e.items[i], template, hooks, animations);
                }
                indexTrigger.onNext(true);
            }));
            cleanup.add(list.itemsMoved.subscribe(function (e) {
                _this.moveRow(proxy, e.from, e.to, e.items[0], template, hooks, animations, indexTrigger);
                indexTrigger.onNext(true);
            }));
            cleanup.add(list.itemReplaced.subscribe(function (e) {
                _this.rebindRow(proxy, e.from, e.items[0], template, indexTrigger);
                indexTrigger.onNext(true);
            }));
            cleanup.add(list.shouldReset.subscribe(function (e) {
                proxy.clear();
                _this.appendAllRows(proxy, list, ctx, template, hooks, animations, indexTrigger, false);
                indexTrigger.onNext(true);
            }));
        };
        ForEachBinding.prototype.applyValue = function (el, value, hooks, animations, template, ctx, initialApply, cleanup, setProxyFunc) {
            var i, length;
            if (initialApply) {
                length = el.childNodes.length;
                for (i = 0; i < length; i++) {
                    template.push(el.childNodes[i].cloneNode(true));
                }
            }
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
            if (template.length === 0)
                return;
            var proxy;
            var self = this;
            var recalcIndextrigger;
            function nodeInsertCB(node, callbackData) {
                var item = callbackData.item;
                var index = callbackData.index;
                var indexDisp = callbackData.indexDisp;
                if (node.nodeType === 1) {
                    var state = (self.domManager.getNodeState(node) || self.domManager.createNodeState());
                    state.model = item;
                    state.index = index;
                    self.domManager.setNodeState(node, state);
                    if (recalcIndextrigger != null && indexDisp != null) {
                        indexDisp.addRef();
                        state.cleanup.add(indexDisp);
                    }
                    self.domManager.applyBindings(item, node);
                }
            }
            function nodeRemoveCB(node) {
                if (node.nodeType === 1) {
                    self.domManager.cleanNode(node);
                }
            }
            proxy = new internal.VirtualChildNodes(el, false, nodeInsertCB, nodeRemoveCB);
            if (setProxyFunc)
                setProxyFunc(proxy);
            cleanup.add(Rx.Disposable.create(function () {
                proxy = null;
            }));
            if (Array.isArray(value)) {
                var arr = value;
                length = arr.length;
                for (i = 0; i < length; i++) {
                    this.appendRow(proxy, i, arr[i], ctx, template, hooks, animations, undefined, true);
                }
            }
            else if (wx.isList(value)) {
                var list = value;
                recalcIndextrigger = new Rx.Subject();
                this.observeList(proxy, ctx, template, cleanup, list, hooks, animations, recalcIndextrigger);
            }
        };
        return ForEachBinding;
    })();
    var internal;
    (function (internal) {
        internal.forEachBindingConstructor = ForEachBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var HasFocusBinding = (function () {
        function HasFocusBinding(domManager) {
            this.priority = -1;
            this.domManager = domManager;
        }
        HasFocusBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("hasFocus-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var prop;
            var cleanup;
            var compiled = this.domManager.compileBindingOptions(options, module);
            var exp;
            var delay = 0;
            if (typeof compiled === "object" && compiled.hasOwnProperty("property")) {
                var opt = compiled;
                exp = opt.property;
                delay = this.domManager.evaluateExpression(opt.delay, ctx);
                if (typeof delay === "boolean")
                    delay = delay ? 1 : 0;
            }
            else {
                exp = compiled;
            }
            function doCleanup() {
                if (cleanup) {
                    cleanup.dispose();
                    cleanup = null;
                }
            }
            function handleElementFocusChange(isFocused) {
                var ownerDoc = el.ownerDocument;
                if ("activeElement" in ownerDoc) {
                    var active;
                    try {
                        active = ownerDoc.activeElement;
                    }
                    catch (e) {
                        active = ownerDoc.body;
                    }
                    isFocused = (active === el);
                }
                prop(isFocused);
            }
            function updateElement(value) {
                if (value) {
                    if (delay === 0 && el.style.display !== 'none') {
                        el.focus();
                    }
                    else {
                        Rx.Observable.timer(delay).subscribe(function () {
                            el.focus();
                        });
                    }
                }
                else {
                    el.blur();
                }
            }
            state.cleanup.add(this.domManager.expressionToObservable(exp, ctx).subscribe(function (model) {
                try {
                    if (!wx.isProperty(model)) {
                        updateElement(model);
                    }
                    else {
                        doCleanup();
                        cleanup = new Rx.CompositeDisposable();
                        prop = model;
                        cleanup.add(prop.changed.subscribe(function (x) {
                            updateElement(x);
                        }));
                        updateElement(prop());
                        if (!prop.source) {
                            cleanup.add(Rx.Observable.merge(_this.getFocusEventObservables(el)).subscribe(function (hasFocus) {
                                handleElementFocusChange(hasFocus);
                            }));
                        }
                    }
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
                doCleanup();
            }));
        };
        HasFocusBinding.prototype.configure = function (options) {
        };
        HasFocusBinding.prototype.getFocusEventObservables = function (el) {
            var result = [];
            result.push(Rx.Observable.fromEvent(el, 'focus').select(function (x) { return true; }));
            result.push(Rx.Observable.fromEvent(el, 'focusin').select(function (x) { return true; }));
            result.push(Rx.Observable.fromEvent(el, 'blur').select(function (x) { return false; }));
            result.push(Rx.Observable.fromEvent(el, 'focusout').select(function (x) { return false; }));
            return result;
        };
        return HasFocusBinding;
    })();
    var internal;
    (function (internal) {
        internal.hasFocusBindingConstructor = HasFocusBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var IfBinding = (function () {
        function IfBinding(domManager) {
            this.priority = 50;
            this.controlsDescendants = true;
            this.inverse = false;
            this.domManager = domManager;
        }
        IfBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            if (node.nodeType !== 1)
                internal.throwError("if-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var compiled = this.domManager.compileBindingOptions(options, module);
            var el = node;
            var self = this;
            var initialApply = true;
            var exp;
            var animations = {};
            var cleanup;
            function doCleanup() {
                if (cleanup) {
                    cleanup.dispose();
                    cleanup = null;
                }
            }
            if (typeof compiled === "object") {
                var opt = compiled;
                exp = opt.condition;
                if (opt.enter) {
                    animations.enter = this.domManager.evaluateExpression(opt.enter, ctx);
                    if (typeof animations.enter === "string") {
                        animations.enter = module.animation(animations.enter);
                    }
                }
                if (opt.leave) {
                    animations.leave = this.domManager.evaluateExpression(opt.leave, ctx);
                    if (typeof animations.leave === "string") {
                        animations.leave = module.animation(animations.leave);
                    }
                }
            }
            else {
                exp = compiled;
            }
            var obs = this.domManager.expressionToObservable(exp, ctx);
            var template = new Array();
            state.cleanup.add(obs.subscribe(function (x) {
                try {
                    doCleanup();
                    cleanup = new Rx.CompositeDisposable();
                    cleanup.add(self.applyValue(el, wx.unwrapProperty(x), template, ctx, animations, initialApply));
                    initialApply = false;
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                obs = null;
                el = null;
                self = null;
                template = null;
            }));
        };
        IfBinding.prototype.configure = function (options) {
        };
        IfBinding.prototype.applyValue = function (el, value, template, ctx, animations, initialApply) {
            var leaveAnimation = animations.leave;
            var enterAnimation = animations.enter;
            var i;
            var self = this;
            var obs = undefined;
            if (initialApply) {
                for (i = 0; i < el.childNodes.length; i++) {
                    template.push(el.childNodes[i].cloneNode(true));
                }
                while (el.firstChild) {
                    el.removeChild(el.firstChild);
                }
            }
            var oldElements = wx.nodeChildrenToArray(el);
            value = this.inverse ? !value : value;
            function removeOldElements() {
                oldElements.forEach(function (x) {
                    self.domManager.cleanNode(x);
                    el.removeChild(x);
                });
            }
            if (!value) {
                if (oldElements.length > 0) {
                    if (leaveAnimation) {
                        leaveAnimation.prepare(oldElements);
                        obs = leaveAnimation.run(oldElements).continueWith(function () { return leaveAnimation.complete(oldElements); }).continueWith(removeOldElements);
                    }
                    else {
                        removeOldElements();
                    }
                }
            }
            else {
                var nodes = template.map(function (x) { return x.cloneNode(true); });
                if (enterAnimation)
                    enterAnimation.prepare(nodes);
                for (i = 0; i < template.length; i++) {
                    el.appendChild(nodes[i]);
                }
                this.domManager.applyBindingsToDescendants(ctx, el);
                if (enterAnimation) {
                    obs = enterAnimation.run(nodes).continueWith(function () { return enterAnimation.complete(nodes); });
                }
            }
            return obs ? (obs.subscribe() || Rx.Disposable.empty) : Rx.Disposable.empty;
        };
        return IfBinding;
    })();
    var NotIfBinding = (function (_super) {
        __extends(NotIfBinding, _super);
        function NotIfBinding(domManager) {
            _super.call(this, domManager);
            this.inverse = true;
        }
        return NotIfBinding;
    })(IfBinding);
    var internal;
    (function (internal) {
        internal.ifBindingConstructor = IfBinding;
        internal.notifBindingConstructor = NotIfBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var keysByCode = {
        8: 'backspace',
        9: 'tab',
        13: 'enter',
        27: 'esc',
        32: 'space',
        33: 'pageup',
        34: 'pagedown',
        35: 'end',
        36: 'home',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        45: 'insert',
        46: 'delete'
    };
    var KeyPressBinding = (function () {
        function KeyPressBinding(domManager) {
            this.priority = 0;
            this.domManager = domManager;
        }
        KeyPressBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("keyPress-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var tokens = this.domManager.getObjectLiteralTokens(options);
            var obs = Rx.Observable.fromEvent(el, "keydown").where(function (x) { return !x.repeat; }).publish().refCount();
            tokens.forEach(function (token) {
                var keyDesc = token.key;
                var combination, combinations = [];
                keyDesc.split(' ').forEach(function (variation) {
                    combination = {
                        expression: keyDesc,
                        keys: {}
                    };
                    variation.split('-').forEach(function (value) {
                        combination.keys[value.trim()] = true;
                    });
                    combinations.push(combination);
                });
                _this.wireKey(token.value, obs, combinations, ctx, state, module);
            });
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
            }));
        };
        KeyPressBinding.prototype.configure = function (options) {
        };
        KeyPressBinding.prototype.testCombination = function (combination, event) {
            var metaPressed = !!(event.metaKey && !event.ctrlKey);
            var altPressed = !!event.altKey;
            var ctrlPressed = !!event.ctrlKey;
            var shiftPressed = !!event.shiftKey;
            var keyCode = event.keyCode;
            var metaRequired = !!combination.keys.meta;
            var altRequired = !!combination.keys.alt;
            var ctrlRequired = !!combination.keys.ctrl;
            var shiftRequired = !!combination.keys.shift;
            if ((!shiftPressed || shiftRequired) && keyCode >= 65 && keyCode <= 90)
                keyCode = keyCode + 32;
            var mainKeyPressed = combination.keys[keysByCode[keyCode]] || combination.keys[keyCode.toString()] || combination.keys[String.fromCharCode(keyCode)];
            return (mainKeyPressed && (metaRequired === metaPressed) && (altRequired === altPressed) && (ctrlRequired === ctrlPressed) && (shiftRequired === shiftPressed));
        };
        KeyPressBinding.prototype.testCombinations = function (combinations, event) {
            for (var i = 0; i < combinations.length; i++) {
                if (this.testCombination(combinations[i], event))
                    return true;
            }
            return false;
        };
        KeyPressBinding.prototype.wireKey = function (value, obs, combinations, ctx, state, module) {
            var _this = this;
            var exp = this.domManager.compileBindingOptions(value, module);
            var command;
            var commandParameter = undefined;
            if (typeof exp === "function") {
                var handler = this.domManager.evaluateExpression(exp, ctx);
                handler = wx.unwrapProperty(handler);
                if (!wx.isCommand(handler)) {
                    state.cleanup.add(obs.where(function (e) { return _this.testCombinations(combinations, e); }).subscribe(function (e) {
                        handler.apply(ctx.$data, [ctx]);
                        e.preventDefault();
                    }));
                }
                else {
                    command = handler;
                    state.cleanup.add(obs.where(function (e) { return _this.testCombinations(combinations, e); }).subscribe(function (e) {
                        command.execute(undefined);
                        e.preventDefault();
                    }));
                }
            }
            else if (typeof exp === "object") {
                command = this.domManager.evaluateExpression(exp.command, ctx);
                command = wx.unwrapProperty(command);
                if (exp.hasOwnProperty("parameter"))
                    commandParameter = this.domManager.evaluateExpression(exp.parameter, ctx);
                state.cleanup.add(obs.where(function (e) { return _this.testCombinations(combinations, e); }).subscribe(function (e) {
                    command.execute(commandParameter);
                    e.preventDefault();
                }));
            }
            else {
                internal.throwError("invalid binding options");
            }
        };
        return KeyPressBinding;
    })();
    var internal;
    (function (internal) {
        internal.keyPressBindingConstructor = KeyPressBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var MultiOneWayChangeBindingBase = (function () {
        function MultiOneWayChangeBindingBase(domManager, supportsDynamicValues) {
            if (supportsDynamicValues === void 0) { supportsDynamicValues = false; }
            this.priority = 0;
            this.supportsDynamicValues = false;
            this.domManager = domManager;
            this.supportsDynamicValues = supportsDynamicValues;
        }
        MultiOneWayChangeBindingBase.prototype.applyBinding = function (node, options, ctx, state, module) {
            if (node.nodeType !== 1)
                internal.throwError("binding only operates on elements!");
            var compiled = this.domManager.compileBindingOptions(options, module);
            if (compiled == null || (typeof compiled !== "object" && !this.supportsDynamicValues))
                internal.throwError("invalid binding-options!");
            var el = node;
            var observables = new Array();
            var obs;
            var exp;
            var keys = Object.keys(compiled);
            var i;
            var key;
            if (typeof compiled === "function") {
                exp = compiled;
                obs = this.domManager.expressionToObservable(exp, ctx);
                observables.push(["", obs]);
            }
            else {
                for (i = 0; i < keys.length; i++) {
                    key = keys[i];
                    var value = compiled[key];
                    exp = value;
                    obs = this.domManager.expressionToObservable(exp, ctx);
                    observables.push([key, obs]);
                }
            }
            for (i = 0; i < observables.length; i++) {
                key = observables[i][0];
                obs = observables[i][1];
                this.subscribe(el, obs, key, state);
            }
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
                keys = null;
                observables = null;
            }));
        };
        MultiOneWayChangeBindingBase.prototype.configure = function (options) {
        };
        MultiOneWayChangeBindingBase.prototype.subscribe = function (el, obs, key, state) {
            var _this = this;
            state.cleanup.add(obs.subscribe(function (x) {
                try {
                    _this.applyValue(el, wx.unwrapProperty(x), key);
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
        };
        MultiOneWayChangeBindingBase.prototype.applyValue = function (el, key, value) {
            internal.throwError("you need to override this method!");
        };
        return MultiOneWayChangeBindingBase;
    })();
    var CssBinding = (function (_super) {
        __extends(CssBinding, _super);
        function CssBinding(domManager) {
            _super.call(this, domManager, true);
        }
        CssBinding.prototype.applyValue = function (el, value, key) {
            var classes;
            if (key !== "") {
                classes = key.split(/\s+/).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
                if (classes.length) {
                    wx.toggleCssClass.apply(null, [el, !!value].concat(classes));
                }
            }
            else {
                var state = this.domManager.getNodeState(el);
                if (state.cssBindingPreviousDynamicClasses != null) {
                    wx.toggleCssClass.apply(null, [el, false].concat(state.cssBindingPreviousDynamicClasses));
                    state.cssBindingPreviousDynamicClasses = null;
                }
                if (value) {
                    classes = value.split(/\s+/).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
                    if (classes.length) {
                        wx.toggleCssClass.apply(null, [el, true].concat(classes));
                        state.cssBindingPreviousDynamicClasses = classes;
                    }
                }
            }
        };
        return CssBinding;
    })(MultiOneWayChangeBindingBase);
    var AttrBinding = (function (_super) {
        __extends(AttrBinding, _super);
        function AttrBinding(domManager) {
            _super.call(this, domManager);
            this.priority = 5;
        }
        AttrBinding.prototype.applyValue = function (el, value, key) {
            var toRemove = (value === false) || (value === null) || (value === undefined);
            if (toRemove)
                el.removeAttribute(key);
            else {
                el.setAttribute(key, value.toString());
            }
        };
        return AttrBinding;
    })(MultiOneWayChangeBindingBase);
    var StyleBinding = (function (_super) {
        __extends(StyleBinding, _super);
        function StyleBinding(domManager) {
            _super.call(this, domManager);
        }
        StyleBinding.prototype.applyValue = function (el, value, key) {
            if (value === null || value === undefined || value === false) {
                value = "";
            }
            el.style[key] = value;
        };
        return StyleBinding;
    })(MultiOneWayChangeBindingBase);
    var internal;
    (function (internal) {
        internal.cssBindingConstructor = CssBinding;
        internal.attrBindingConstructor = AttrBinding;
        internal.styleBindingConstructor = StyleBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var impls = new Array();
    var RadioSingleSelectionImpl = (function () {
        function RadioSingleSelectionImpl(domManager) {
            this.domManager = domManager;
        }
        RadioSingleSelectionImpl.prototype.supports = function (el, model) {
            return (el.tagName.toLowerCase() === 'input' && el.getAttribute("type") === 'radio') && !wx.isList(model);
        };
        RadioSingleSelectionImpl.prototype.observeElement = function (el) {
            return Rx.Observable.merge(Rx.Observable.fromEvent(el, 'click'), Rx.Observable.fromEvent(el, 'change'));
        };
        RadioSingleSelectionImpl.prototype.observeModel = function (model) {
            if (wx.isProperty(model)) {
                var prop = model;
                return prop.changed;
            }
            return Rx.Observable.never();
        };
        RadioSingleSelectionImpl.prototype.updateElement = function (el, model) {
            var input = el;
            input.checked = internal.getNodeValue(input, this.domManager) == wx.unwrapProperty(model);
        };
        RadioSingleSelectionImpl.prototype.updateModel = function (el, model, e) {
            var input = el;
            if (input.checked) {
                model(internal.getNodeValue(input, this.domManager));
            }
        };
        return RadioSingleSelectionImpl;
    })();
    var OptionSingleSelectionImpl = (function () {
        function OptionSingleSelectionImpl(domManager) {
            this.domManager = domManager;
        }
        OptionSingleSelectionImpl.prototype.supports = function (el, model) {
            return el.tagName.toLowerCase() === 'select' && !wx.isList(model);
        };
        OptionSingleSelectionImpl.prototype.observeElement = function (el) {
            return Rx.Observable.fromEvent(el, 'change');
        };
        OptionSingleSelectionImpl.prototype.observeModel = function (model) {
            if (wx.isProperty(model)) {
                var prop = model;
                return prop.changed;
            }
            return Rx.Observable.never();
        };
        OptionSingleSelectionImpl.prototype.updateElement = function (el, model) {
            var select = el;
            var value = wx.unwrapProperty(model);
            var length = select.options.length;
            if (value == null) {
                select.selectedIndex = -1;
            }
            else {
                for (var i = 0; i < length; i++) {
                    var option = select.options[i];
                    if (internal.getNodeValue(option, this.domManager) == value) {
                        select.selectedIndex = i;
                        break;
                    }
                }
            }
        };
        OptionSingleSelectionImpl.prototype.updateModel = function (el, model, e) {
            var select = el;
            var value = select.selectedIndex !== -1 ? internal.getNodeValue(select.options[select.selectedIndex], this.domManager) : undefined;
            model(value);
        };
        return OptionSingleSelectionImpl;
    })();
    var SelectedValueBinding = (function () {
        function SelectedValueBinding(domManager) {
            this.priority = 0;
            this.domManager = domManager;
            impls.push(new RadioSingleSelectionImpl(domManager));
            impls.push(new OptionSingleSelectionImpl(domManager));
        }
        SelectedValueBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            if (node.nodeType !== 1)
                internal.throwError("selectedValue-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var impl;
            var implCleanup;
            var exp = this.domManager.compileBindingOptions(options, module);
            function cleanupImpl() {
                if (implCleanup) {
                    implCleanup.dispose();
                    implCleanup = null;
                }
            }
            state.cleanup.add(this.domManager.expressionToObservable(exp, ctx).subscribe(function (model) {
                try {
                    cleanupImpl();
                    impl = undefined;
                    for (var i = 0; i < impls.length; i++) {
                        if (impls[i].supports(el, model)) {
                            impl = impls[i];
                            break;
                        }
                    }
                    if (!impl)
                        internal.throwError("selectedValue-binding does not support this combination of bound element and model!");
                    implCleanup = new Rx.CompositeDisposable();
                    impl.updateElement(el, model);
                    implCleanup.add(impl.observeModel(model).subscribe(function (x) {
                        try {
                            impl.updateElement(el, model);
                        }
                        catch (e) {
                            wx.app.defaultExceptionHandler.onNext(e);
                        }
                    }));
                    if (wx.isProperty(model)) {
                        implCleanup.add(impl.observeElement(el).subscribe(function (e) {
                            try {
                                impl.updateModel(el, model, e);
                            }
                            catch (e) {
                                wx.app.defaultExceptionHandler.onNext(e);
                            }
                        }));
                    }
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
                cleanupImpl();
            }));
        };
        SelectedValueBinding.prototype.configure = function (options) {
        };
        return SelectedValueBinding;
    })();
    var internal;
    (function (internal) {
        internal.selectedValueBindingConstructor = SelectedValueBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var SingleOneWayChangeBindingBase = (function () {
        function SingleOneWayChangeBindingBase(domManager) {
            this.priority = 0;
            this.domManager = domManager;
        }
        SingleOneWayChangeBindingBase.prototype.applyBinding = function (node, options, ctx, state, module) {
            if (node.nodeType !== 1)
                internal.throwError("binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var self = this;
            var exp = this.domManager.compileBindingOptions(options, module);
            var obs = this.domManager.expressionToObservable(exp, ctx);
            state.cleanup.add(obs.subscribe(function (x) {
                try {
                    self.applyValue(el, wx.unwrapProperty(x));
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
                obs = null;
                self = null;
            }));
        };
        SingleOneWayChangeBindingBase.prototype.configure = function (options) {
        };
        SingleOneWayChangeBindingBase.prototype.applyValue = function (el, value) {
            internal.throwError("you need to override this method!");
        };
        return SingleOneWayChangeBindingBase;
    })();
    var TextBinding = (function (_super) {
        __extends(TextBinding, _super);
        function TextBinding(domManager) {
            _super.call(this, domManager);
        }
        TextBinding.prototype.applyValue = function (el, value) {
            if ((value === null) || (value === undefined))
                value = "";
            el.textContent = value;
        };
        return TextBinding;
    })(SingleOneWayChangeBindingBase);
    var VisibleBinding = (function (_super) {
        __extends(VisibleBinding, _super);
        function VisibleBinding(domManager) {
            _super.call(this, domManager);
            this.inverse = false;
            this.inverse = false;
            this.priority = 10;
        }
        VisibleBinding.prototype.configure = function (_options) {
            var options = _options;
            VisibleBinding.useCssClass = options.useCssClass;
            VisibleBinding.hiddenClass = options.hiddenClass;
        };
        VisibleBinding.prototype.applyValue = function (el, value) {
            value = this.inverse ? !value : value;
            if (!VisibleBinding.useCssClass) {
                if (!value) {
                    el.style.display = "none";
                }
                else {
                    el.style.display = "";
                }
            }
            else {
                wx.toggleCssClass(el, !value, VisibleBinding.hiddenClass);
            }
        };
        return VisibleBinding;
    })(SingleOneWayChangeBindingBase);
    var HiddenBinding = (function (_super) {
        __extends(HiddenBinding, _super);
        function HiddenBinding(domManager) {
            _super.call(this, domManager);
            this.inverse = true;
        }
        return HiddenBinding;
    })(VisibleBinding);
    var HtmlBinding = (function (_super) {
        __extends(HtmlBinding, _super);
        function HtmlBinding(domManager) {
            _super.call(this, domManager);
        }
        HtmlBinding.prototype.applyValue = function (el, value) {
            if ((value === null) || (value === undefined))
                value = "";
            el.innerHTML = value;
        };
        return HtmlBinding;
    })(SingleOneWayChangeBindingBase);
    var DisableBinding = (function (_super) {
        __extends(DisableBinding, _super);
        function DisableBinding(domManager) {
            _super.call(this, domManager);
            this.inverse = false;
            this.inverse = false;
        }
        DisableBinding.prototype.applyValue = function (el, value) {
            value = this.inverse ? !value : value;
            el.disabled = value;
        };
        return DisableBinding;
    })(SingleOneWayChangeBindingBase);
    var EnableBinding = (function (_super) {
        __extends(EnableBinding, _super);
        function EnableBinding(domManager) {
            _super.call(this, domManager);
            this.inverse = true;
        }
        return EnableBinding;
    })(DisableBinding);
    var internal;
    (function (internal) {
        internal.textBindingConstructor = TextBinding;
        internal.htmlBindingConstructor = HtmlBinding;
        internal.visibleBindingConstructor = VisibleBinding;
        internal.hiddenBindingConstructor = HiddenBinding;
        internal.disableBindingConstructor = DisableBinding;
        internal.enableBindingConstructor = EnableBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var TextInputBinding = (function () {
        function TextInputBinding(domManager) {
            this.priority = 0;
            this.domManager = domManager;
        }
        TextInputBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("textInput-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var tag = el.tagName.toLowerCase();
            var isTextArea = tag === "textarea";
            if (tag !== 'input' && tag !== 'textarea')
                internal.throwError("textInput-binding can only be applied to input or textarea elements");
            var exp = this.domManager.compileBindingOptions(options, module);
            var prop;
            var propertySubscription;
            var eventSubscription;
            var previousElementValue;
            function updateElement(value) {
                if (value === null || value === undefined) {
                    value = "";
                }
                if (el.value !== value) {
                    previousElementValue = value;
                    el.value = value;
                }
            }
            function doCleanup() {
                if (propertySubscription) {
                    propertySubscription.dispose();
                    propertySubscription = null;
                }
                if (eventSubscription) {
                    eventSubscription.dispose();
                    eventSubscription = null;
                }
            }
            state.cleanup.add(this.domManager.expressionToObservable(exp, ctx).subscribe(function (src) {
                try {
                    if (!wx.isProperty(src)) {
                        updateElement(src);
                    }
                    else {
                        doCleanup();
                        prop = src;
                        propertySubscription = prop.changed.subscribe(function (x) {
                            updateElement(x);
                        });
                        updateElement(prop());
                        if (!prop.source) {
                            var events = _this.getTextInputEventObservables(el, isTextArea);
                            eventSubscription = Rx.Observable.merge(events).subscribe(function (e) {
                                prop(el.value);
                            });
                        }
                    }
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
                doCleanup();
            }));
        };
        TextInputBinding.prototype.configure = function (options) {
        };
        TextInputBinding.prototype.getTextInputEventObservables = function (el, isTextArea) {
            var result = [];
            if (wx.env.ie && wx.env.ie.version < 10) {
                if (wx.env.ie.version <= 9) {
                    result.push(wx.env.ie.getSelectionChangeObservable(el).where(function (doc) { return doc.activeElement === el; }));
                    result.push(Rx.Observable.fromEvent(el, 'dragend'));
                    result.push(Rx.Observable.fromEvent(el, 'input'));
                    result.push(Rx.Observable.fromEvent(el, 'propertychange').where(function (e) { return e.propertyName === 'value'; }));
                }
            }
            else {
                result.push(Rx.Observable.fromEvent(el, 'input'));
                if (wx.env.safari && wx.env.safari.version < 5 && isTextArea) {
                    result.push(Rx.Observable.fromEvent(el, 'keydown'));
                    result.push(Rx.Observable.fromEvent(el, 'paste'));
                    result.push(Rx.Observable.fromEvent(el, 'cut'));
                }
                else if (wx.env.opera && wx.env.opera.version < 11) {
                    result.push(Rx.Observable.fromEvent(el, 'keydown'));
                }
                else if (wx.env.firefox && wx.env.firefox.version < 4.0) {
                    result.push(Rx.Observable.fromEvent(el, 'DOMAutoComplete'));
                    result.push(Rx.Observable.fromEvent(el, 'dragdrop'));
                    result.push(Rx.Observable.fromEvent(el, 'drop'));
                }
            }
            result.push(Rx.Observable.fromEvent(el, 'change'));
            return result;
        };
        return TextInputBinding;
    })();
    var internal;
    (function (internal) {
        internal.textInputBindingConstructor = TextInputBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var ValueBinding = (function () {
        function ValueBinding(domManager) {
            this.priority = 5;
            this.domManager = domManager;
        }
        ValueBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("value-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var tag = el.tagName.toLowerCase();
            if (tag !== 'input' && tag !== 'option' && tag !== 'select' && tag !== 'textarea')
                internal.throwError("value-binding only operates on checkboxes and radio-buttons");
            var useDomManagerForValueUpdates = (tag === 'input' && el.type === 'radio') || tag === 'option';
            var prop;
            var cleanup;
            var exp = this.domManager.compileBindingOptions(options, module);
            function doCleanup() {
                if (cleanup) {
                    cleanup.dispose();
                    cleanup = null;
                }
            }
            function updateElement(domManager, value) {
                if (useDomManagerForValueUpdates)
                    internal.setNodeValue(el, value, domManager);
                else {
                    if ((value === null) || (value === undefined))
                        value = "";
                    el.value = value;
                }
            }
            state.cleanup.add(this.domManager.expressionToObservable(exp, ctx).subscribe(function (model) {
                try {
                    if (!wx.isProperty(model)) {
                        updateElement(_this.domManager, model);
                    }
                    else {
                        doCleanup();
                        cleanup = new Rx.CompositeDisposable();
                        prop = model;
                        cleanup.add(prop.changed.subscribe(function (x) {
                            updateElement(_this.domManager, x);
                        }));
                        updateElement(_this.domManager, prop());
                        if (!prop.source) {
                            cleanup.add(Rx.Observable.fromEvent(el, 'change').subscribe(function (e) {
                                if (useDomManagerForValueUpdates)
                                    prop(internal.getNodeValue(el, _this.domManager));
                                else
                                    prop(el.value);
                            }));
                        }
                    }
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                el = null;
                doCleanup();
            }));
        };
        ValueBinding.prototype.configure = function (options) {
        };
        return ValueBinding;
    })();
    var internal;
    (function (internal) {
        function getNodeValue(node, domManager) {
            var state = domManager.getNodeState(node);
            if (state != null && state[wx.res.hasValueBindingValue]) {
                return state[wx.res.valueBindingValue];
            }
            return node.value;
        }
        internal.getNodeValue = getNodeValue;
        function setNodeValue(node, value, domManager) {
            if ((value === null) || (value === undefined))
                value = "";
            var state = domManager.getNodeState(node);
            if (typeof value === "string") {
                if (node.value !== value) {
                    node.value = value;
                    if (state != null && state[wx.res.hasValueBindingValue]) {
                        state[wx.res.hasValueBindingValue] = false;
                        state[wx.res.valueBindingValue] = undefined;
                    }
                }
            }
            else {
                if (state == null) {
                    state = this.createNodeState();
                    this.setNodeState(node, state);
                }
                state[wx.res.valueBindingValue] = value;
                state[wx.res.hasValueBindingValue] = true;
            }
        }
        internal.setNodeValue = setNodeValue;
    })(internal = wx.internal || (wx.internal = {}));
    var internal;
    (function (internal) {
        internal.valueBindingConstructor = ValueBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var WithBinding = (function () {
        function WithBinding(domManager) {
            this.priority = 50;
            this.controlsDescendants = true;
            this.domManager = domManager;
        }
        WithBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            if (node.nodeType !== 1)
                internal.throwError("with-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var self = this;
            var exp = this.domManager.compileBindingOptions(options, module);
            var obs = this.domManager.expressionToObservable(exp, ctx);
            state.cleanup.add(obs.subscribe(function (x) {
                try {
                    self.applyValue(el, wx.unwrapProperty(x), state);
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                obs = null;
                el = null;
                self = null;
            }));
        };
        WithBinding.prototype.configure = function (options) {
        };
        WithBinding.prototype.applyValue = function (el, value, state) {
            state.model = value;
            var ctx = this.domManager.getDataContext(el);
            this.domManager.cleanDescendants(el);
            this.domManager.applyBindingsToDescendants(ctx, el);
        };
        return WithBinding;
    })();
    var internal;
    (function (internal) {
        internal.withBindingConstructor = WithBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var Lazy = (function () {
        function Lazy(createValue) {
            this.createValue = createValue;
        }
        Object.defineProperty(Lazy.prototype, "value", {
            get: function () {
                if (!this.isValueCreated) {
                    this.createdValue = this.createValue();
                    this.isValueCreated = true;
                }
                return this.createdValue;
            },
            enumerable: true,
            configurable: true
        });
        return Lazy;
    })();
    wx.Lazy = Lazy;
})(wx || (wx = {}));
var wx;
(function (wx) {
    var internal;
    (function (internal) {
        "use strict";
        var ScheduledSubject = (function () {
            function ScheduledSubject(scheduler, defaultObserver, defaultSubject) {
                this._observerRefCount = 0;
                this._defaultObserverSub = Rx.Disposable.empty;
                this._scheduler = scheduler;
                this._defaultObserver = defaultObserver;
                this._subject = defaultSubject || new Rx.Subject();
                if (defaultObserver != null) {
                    this._defaultObserverSub = this._subject.observeOn(this._scheduler).subscribe(this._defaultObserver);
                }
            }
            ScheduledSubject.prototype.dispose = function () {
                if (wx.isDisposable(this._subject)) {
                    this._subject.dispose();
                }
            };
            ScheduledSubject.prototype.onCompleted = function () {
                this._subject.onCompleted();
            };
            ScheduledSubject.prototype.onError = function (error) {
                this._subject.onError(error);
            };
            ScheduledSubject.prototype.onNext = function (value) {
                this._subject.onNext(value);
            };
            ScheduledSubject.prototype.subscribe = function (observer) {
                var _this = this;
                if (this._defaultObserverSub)
                    this._defaultObserverSub.dispose();
                this._observerRefCount++;
                return new Rx.CompositeDisposable(this._subject.observeOn(this._scheduler).subscribe(observer), Rx.Disposable.create(function () {
                    if ((--_this._observerRefCount) <= 0 && _this._defaultObserver != null) {
                        _this._defaultObserverSub = _this._subject.observeOn(_this._scheduler).subscribe(_this._defaultObserver);
                    }
                }));
            };
            return ScheduledSubject;
        })();
        function createScheduledSubject(scheduler, defaultObserver, defaultSubject) {
            var scheduled = new ScheduledSubject(scheduler, defaultObserver, defaultSubject);
            var result = wx.extend(scheduled, new Rx.Subject(), true);
            return result;
        }
        internal.createScheduledSubject = createScheduledSubject;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var RxObsConstructor = Rx.Observable;
    RxObsConstructor.prototype.toProperty = function (initialValue, scheduler) {
        scheduler = scheduler || Rx.Scheduler.currentThread;
        var accessor = function (newVal) {
            if (arguments.length > 0) {
                wx.internal.throwError("attempt to write to a read-only observable property");
            }
            if (accessor.sub == null) {
                accessor.sub = accessor._source.connect();
            }
            return accessor.value;
        };
        accessor.queryInterface = function (iid) {
            if (iid === wx.IID.IUnknown || iid === wx.IID.IObservableProperty || iid === wx.IID.IDisposable)
                return true;
            return false;
        };
        accessor.dispose = function () {
            if (accessor.sub) {
                accessor.sub.dispose();
                accessor.sub = null;
            }
        };
        accessor.value = initialValue;
        accessor.changedSubject = new Rx.Subject();
        accessor.changed = accessor.changedSubject.publish().refCount();
        accessor.changingSubject = new Rx.Subject();
        accessor.changing = accessor.changingSubject.publish().refCount();
        accessor.source = this;
        accessor.thrownExceptions = wx.internal.createScheduledSubject(scheduler, wx.app.defaultExceptionHandler);
        var firedInitial = false;
        accessor.sub = this.distinctUntilChanged().subscribe(function (x) {
            if (firedInitial && x === accessor.value) {
                return;
            }
            firedInitial = true;
            accessor.changingSubject.onNext(x);
            accessor.value = x;
            accessor.changedSubject.onNext(x);
        }, function (x) { return accessor.thrownExceptions.onNext(x); });
        return accessor;
    };
    RxObsConstructor.prototype.continueWith = function () {
        var args = wx.args2Array(arguments);
        var val = args.shift();
        var obs = undefined;
        if (wx.isRxObservable(val)) {
            obs = val;
        }
        else if (wx.isFunction(val)) {
            var action = val;
            obs = Rx.Observable.startDeferred(action);
        }
        return this.selectMany(function (_) { return obs; });
    };
    RxObsConstructor.startDeferred = function (action) {
        return Rx.Observable.defer(function () {
            return Rx.Observable.create(function (observer) {
                var cancelled = false;
                if (!cancelled)
                    action();
                observer.onNext(undefined);
                observer.onCompleted();
                return Rx.Disposable.create(function () { return cancelled = true; });
            });
        });
    };
})(wx || (wx = {}));
var wx;
(function (wx) {
    var log;
    (function (_log) {
        "use strict";
        function log() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            try {
                console.log.apply(console, arguments);
            }
            catch (e) {
                try {
                    window['opera'].postError.apply(window['opera'], arguments);
                }
                catch (e) {
                    alert(Array.prototype.join.call(arguments, " "));
                }
            }
        }
        function critical(fmt) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (args.length) {
                fmt = wx.formatString.apply(null, [fmt].concat(args));
            }
            log("**** WebRx Critical: " + fmt);
        }
        _log.critical = critical;
        function error(fmt) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (args.length) {
                fmt = wx.formatString.apply(null, [fmt].concat(args));
            }
            log("*** WebRx Error: " + fmt);
        }
        _log.error = error;
        function info(fmt) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (args.length) {
                fmt = wx.formatString.apply(null, [fmt].concat(args));
            }
            log("* WebRx Info: " + fmt);
        }
        _log.info = info;
    })(log = wx.log || (wx.log = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var ObservableList = (function () {
        function ObservableList(initialContents, resetChangeThreshold, scheduler) {
            if (resetChangeThreshold === void 0) { resetChangeThreshold = 0.3; }
            if (scheduler === void 0) { scheduler = null; }
            this.push = this.add;
            this.changeNotificationsSuppressed = 0;
            this.propertyChangeWatchers = null;
            this.resetChangeThreshold = 0;
            this.resetSubCount = 0;
            this.hasWhinedAboutNoResetSub = false;
            this.setupRx(initialContents, resetChangeThreshold, scheduler);
        }
        ObservableList.prototype.queryInterface = function (iid) {
            if (iid === wx.IID.IUnknown || iid === wx.IID.IDisposable || iid === wx.IID.IObservableList || iid === wx.IID.IReadOnlyList || iid === wx.IID.IList)
                return true;
            return false;
        };
        ObservableList.prototype.dispose = function () {
            this.clearAllPropertyChangeWatchers();
        };
        Object.defineProperty(ObservableList.prototype, "isReadOnly", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "itemsAdded", {
            get: function () {
                if (!this._itemsAdded)
                    this._itemsAdded = this.itemsAddedSubject.value.asObservable();
                return this._itemsAdded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "beforeItemsAdded", {
            get: function () {
                if (!this._beforeItemsAdded)
                    this._beforeItemsAdded = this.beforeItemsAddedSubject.value.asObservable();
                return this._beforeItemsAdded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "itemsRemoved", {
            get: function () {
                if (!this._itemsRemoved)
                    this._itemsRemoved = this.itemsRemovedSubject.value.asObservable();
                return this._itemsRemoved;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "beforeItemsRemoved", {
            get: function () {
                if (!this._beforeItemsRemoved)
                    this._beforeItemsRemoved = this.beforeItemsRemovedSubject.value.asObservable();
                return this._beforeItemsRemoved;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "itemReplaced", {
            get: function () {
                if (!this._itemReplaced)
                    this._itemReplaced = this.itemReplacedSubject.value.asObservable();
                return this._itemReplaced;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "beforeItemReplaced", {
            get: function () {
                if (!this._beforeItemReplaced)
                    this._beforeItemReplaced = this.beforeItemReplacedSubject.value.asObservable();
                return this._beforeItemReplaced;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "beforeItemsMoved", {
            get: function () {
                if (!this._beforeItemsMoved)
                    this._beforeItemsMoved = this.beforeItemsMovedSubject.value.asObservable();
                return this._beforeItemsMoved;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "itemsMoved", {
            get: function () {
                if (!this._itemsMoved)
                    this._itemsMoved = this.itemsMovedSubject.value.asObservable();
                return this._itemsMoved;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "lengthChanging", {
            get: function () {
                var _this = this;
                if (!this._lengthChanging)
                    this._lengthChanging = this.listChanging.select(function (_) { return _this.inner.length; }).distinctUntilChanged();
                return this._lengthChanging;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "lengthChanged", {
            get: function () {
                var _this = this;
                if (!this._lengthChanged)
                    this._lengthChanged = this.listChanged.select(function (_) { return _this.inner.length; }).distinctUntilChanged();
                return this._lengthChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "itemChanging", {
            get: function () {
                if (!this._itemChanging)
                    this._itemChanging = this.itemChangingSubject.value.asObservable();
                return this._itemChanging;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "itemChanged", {
            get: function () {
                if (!this._itemChanged)
                    this._itemChanged = this.itemChangedSubject.value.asObservable();
                return this._itemChanged;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "shouldReset", {
            get: function () {
                var _this = this;
                return this.refcountSubscribers(this.listChanged.selectMany(function (x) { return !x ? Rx.Observable.empty() : Rx.Observable.return(null); }), function (x) { return _this.resetSubCount += x; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObservableList.prototype, "changeTrackingEnabled", {
            get: function () {
                return this.propertyChangeWatchers != null;
            },
            set: function (newValue) {
                var _this = this;
                if (this.propertyChangeWatchers != null && newValue)
                    return;
                if (this.propertyChangeWatchers == null && !newValue)
                    return;
                if (newValue) {
                    this.propertyChangeWatchers = {};
                    this.inner.forEach(function (x) { return _this.addItemToPropertyTracking(x); });
                }
                else {
                    this.clearAllPropertyChangeWatchers();
                    this.propertyChangeWatchers = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        ObservableList.prototype.addRange = function (items) {
            var _this = this;
            if (items == null) {
                internal.throwError("items");
            }
            var disp = this.isLengthAboveResetThreshold(items.length) ? this.suppressChangeNotifications() : Rx.Disposable.empty;
            wx.using(disp, function () {
                if (!_this.areChangeNotificationsEnabled()) {
                    Array.prototype.push.apply(_this.inner, items);
                    if (_this.changeTrackingEnabled) {
                        items.forEach(function (x) {
                            _this.addItemToPropertyTracking(x);
                        });
                    }
                }
                else {
                    if (_this.beforeItemsAddedSubject.isValueCreated) {
                        _this.beforeItemsAddedSubject.value.onNext({ items: items, from: _this.inner.length });
                    }
                    Array.prototype.push.apply(_this.inner, items);
                    if (_this.itemsAddedSubject.isValueCreated) {
                        _this.itemsAddedSubject.value.onNext({ items: items, from: _this.inner.length });
                    }
                    if (_this.changeTrackingEnabled) {
                        items.forEach(function (x) {
                            _this.addItemToPropertyTracking(x);
                        });
                    }
                }
            });
        };
        ObservableList.prototype.insertRange = function (index, items) {
            var _this = this;
            if (items == null) {
                internal.throwError("collection");
            }
            if (index > this.inner.length) {
                internal.throwError("index");
            }
            var disp = this.isLengthAboveResetThreshold(items.length) ? this.suppressChangeNotifications() : Rx.Disposable.empty;
            wx.using(disp, function () {
                if (!_this.areChangeNotificationsEnabled()) {
                    Array.prototype.splice.apply(_this.inner, [index, 0].concat(items));
                    if (_this.changeTrackingEnabled) {
                        items.forEach(function (x) {
                            _this.addItemToPropertyTracking(x);
                        });
                    }
                }
                else {
                    if (_this.beforeItemsAddedSubject.isValueCreated) {
                        items.forEach(function (x) {
                            _this.beforeItemsAddedSubject.value.onNext({ items: items, from: index });
                        });
                    }
                    Array.prototype.splice.apply(_this.inner, [index, 0].concat(items));
                    if (_this.itemsAddedSubject.isValueCreated) {
                        _this.itemsAddedSubject.value.onNext({ items: items, from: index });
                    }
                    if (_this.changeTrackingEnabled) {
                        items.forEach(function (x) {
                            _this.addItemToPropertyTracking(x);
                        });
                    }
                }
            });
        };
        ObservableList.prototype.removeAll = function (items) {
            var _this = this;
            if (items == null) {
                internal.throwError("items");
            }
            var disp = this.isLengthAboveResetThreshold(items.length) ? this.suppressChangeNotifications() : Rx.Disposable.empty;
            wx.using(disp, function () {
                items.forEach(function (x) { return _this.remove(x); });
            });
        };
        ObservableList.prototype.removeRange = function (index, count) {
            var _this = this;
            var disp = this.isLengthAboveResetThreshold(count) ? this.suppressChangeNotifications() : Rx.Disposable.empty;
            wx.using(disp, function () {
                var items = _this.inner.slice(index, index + count);
                if (!_this.areChangeNotificationsEnabled()) {
                    _this.inner.splice(index, count);
                    if (_this.changeTrackingEnabled) {
                        items.forEach(function (x) {
                            _this.removeItemFromPropertyTracking(x);
                        });
                    }
                }
                else {
                    if (_this.beforeItemsRemovedSubject.isValueCreated) {
                        items.forEach(function (x) {
                            _this.beforeItemsRemovedSubject.value.onNext({ items: items, from: index });
                        });
                    }
                    _this.inner.splice(index, count);
                    if (_this.changeTrackingEnabled) {
                        items.forEach(function (x) {
                            _this.removeItemFromPropertyTracking(x);
                        });
                    }
                    if (_this.itemsRemovedSubject.isValueCreated) {
                        items.forEach(function (x) {
                            _this.itemsRemovedSubject.value.onNext({ items: items, from: index });
                        });
                    }
                }
            });
        };
        ObservableList.prototype.toArray = function () {
            return this.inner;
        };
        ObservableList.prototype.reset = function () {
            this.publishResetNotification();
        };
        ObservableList.prototype.add = function (item) {
            this.insertItem(this.inner.length, item);
        };
        ObservableList.prototype.clear = function () {
            this.clearItems();
        };
        ObservableList.prototype.contains = function (item) {
            return this.inner.indexOf(item) !== -1;
        };
        ObservableList.prototype.remove = function (item) {
            var index = this.inner.indexOf(item);
            if (index === -1)
                return false;
            this.removeItem(index);
            return true;
        };
        ObservableList.prototype.indexOf = function (item) {
            return this.inner.indexOf(item);
        };
        ObservableList.prototype.insert = function (index, item) {
            this.insertItem(index, item);
        };
        ObservableList.prototype.removeAt = function (index) {
            this.removeItem(index);
        };
        ObservableList.prototype.move = function (oldIndex, newIndex) {
            this.moveItem(oldIndex, newIndex);
        };
        ObservableList.prototype.project = function () {
            var args = wx.args2Array(arguments);
            var filter = args.shift();
            if (filter != null && wx.isRxObservable(filter)) {
                return new ObservableListProjection(this, undefined, undefined, undefined, filter, args.shift());
            }
            var orderer = args.shift();
            if (orderer != null && wx.isRxObservable(orderer)) {
                return new ObservableListProjection(this, filter, undefined, undefined, orderer, args.shift());
            }
            var selector = args.shift();
            if (selector != null && wx.isRxObservable(selector)) {
                return new ObservableListProjection(this, filter, orderer, undefined, selector, args.shift());
            }
            return new ObservableListProjection(this, filter, orderer, selector, args.shift(), args.shift());
        };
        ObservableList.prototype.suppressChangeNotifications = function () {
            var _this = this;
            this.changeNotificationsSuppressed++;
            if (!this.hasWhinedAboutNoResetSub && this.resetSubCount === 0 && !wx.isInUnitTest()) {
                wx.log.info("suppressChangeNotifications was called (perhaps via addRange), yet you do not have a subscription to shouldReset. This probably isn't what you want, as itemsAdded and friends will appear to 'miss' items");
                this.hasWhinedAboutNoResetSub = true;
            }
            return Rx.Disposable.create(function () {
                _this.changeNotificationsSuppressed--;
                if (_this.changeNotificationsSuppressed === 0) {
                    _this.publishBeforeResetNotification();
                    _this.publishResetNotification();
                }
            });
        };
        ObservableList.prototype.get = function (index) {
            return this.inner[index];
        };
        ObservableList.prototype.set = function (index, item) {
            if (!this.areChangeNotificationsEnabled()) {
                if (this.changeTrackingEnabled) {
                    this.removeItemFromPropertyTracking(this.inner[index]);
                    this.addItemToPropertyTracking(item);
                }
                this.inner[index] = item;
                return;
            }
            if (this.beforeItemReplacedSubject.isValueCreated)
                this.beforeItemReplacedSubject.value.onNext({ from: index, items: [item] });
            if (this.changeTrackingEnabled) {
                this.removeItemFromPropertyTracking(this.inner[index]);
                this.addItemToPropertyTracking(item);
            }
            this.inner[index] = item;
            if (this.itemReplacedSubject.isValueCreated)
                this.itemReplacedSubject.value.onNext({ from: index, items: [item] });
        };
        ObservableList.prototype.sort = function (comparison) {
            this.publishBeforeResetNotification();
            this.inner.sort(comparison);
            this.publishResetNotification();
        };
        ObservableList.prototype.forEach = function (callbackfn, thisArg) {
            this.inner.forEach(callbackfn, thisArg);
        };
        ObservableList.prototype.map = function (callbackfn, thisArg) {
            return this.inner.map(callbackfn, thisArg);
        };
        ObservableList.prototype.filter = function (callbackfn, thisArg) {
            return this.inner.filter(callbackfn, thisArg);
        };
        ObservableList.prototype.some = function (callbackfn, thisArg) {
            return this.inner.some(callbackfn, thisArg);
        };
        ObservableList.prototype.every = function (callbackfn, thisArg) {
            return this.inner.every(callbackfn, thisArg);
        };
        ObservableList.prototype.setupRx = function (initialContents, resetChangeThreshold, scheduler) {
            if (resetChangeThreshold === void 0) { resetChangeThreshold = 0.3; }
            if (scheduler === void 0) { scheduler = null; }
            scheduler = scheduler || wx.app.mainThreadScheduler;
            this.resetChangeThreshold = resetChangeThreshold;
            if (this.inner === undefined)
                this.inner = new Array();
            this.beforeItemsAddedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.itemsAddedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.beforeItemsRemovedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.itemsRemovedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.beforeItemReplacedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.itemReplacedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.resetSubject = new Rx.Subject();
            this.beforeResetSubject = new Rx.Subject();
            this.itemChangingSubject = new wx.Lazy(function () { return internal.createScheduledSubject(scheduler); });
            this.itemChangedSubject = new wx.Lazy(function () { return internal.createScheduledSubject(scheduler); });
            this.beforeItemsMovedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.itemsMovedSubject = new wx.Lazy(function () { return new Rx.Subject(); });
            this.listChanged = Rx.Observable.merge(this.itemsAdded.select(function (x) { return false; }), this.itemsRemoved.select(function (x) { return false; }), this.itemReplaced.select(function (x) { return false; }), this.itemsMoved.select(function (x) { return false; }), this.resetSubject.select(function (x) { return true; })).publish().refCount();
            this.listChanging = Rx.Observable.merge(this.beforeItemsAdded.select(function (x) { return false; }), this.beforeItemsRemoved.select(function (x) { return false; }), this.beforeItemReplaced.select(function (x) { return false; }), this.beforeItemsMoved.select(function (x) { return false; }), this.beforeResetSubject.select(function (x) { return true; })).publish().refCount();
            if (initialContents) {
                Array.prototype.splice.apply(this.inner, [0, 0].concat(initialContents));
            }
            this.length = this.lengthChanged.toProperty(this.inner.length);
            this.isEmpty = this.lengthChanged.select(function (x) { return (x === 0); }).toProperty(this.inner.length === 0);
        };
        ObservableList.prototype.areChangeNotificationsEnabled = function () {
            return this.changeNotificationsSuppressed === 0;
        };
        ObservableList.prototype.insertItem = function (index, item) {
            if (!this.areChangeNotificationsEnabled()) {
                this.inner.splice(index, 0, item);
                if (this.changeTrackingEnabled)
                    this.addItemToPropertyTracking(item);
                return;
            }
            if (this.beforeItemsAddedSubject.isValueCreated)
                this.beforeItemsAddedSubject.value.onNext({ items: [item], from: index });
            this.inner.splice(index, 0, item);
            if (this.itemsAddedSubject.isValueCreated)
                this.itemsAddedSubject.value.onNext({ items: [item], from: index });
            if (this.changeTrackingEnabled)
                this.addItemToPropertyTracking(item);
        };
        ObservableList.prototype.removeItem = function (index) {
            var item = this.inner[index];
            if (!this.areChangeNotificationsEnabled()) {
                this.inner.splice(index, 1);
                if (this.changeTrackingEnabled)
                    this.removeItemFromPropertyTracking(item);
                return;
            }
            if (this.beforeItemsRemovedSubject.isValueCreated)
                this.beforeItemsRemovedSubject.value.onNext({ items: [item], from: index });
            this.inner.splice(index, 1);
            if (this.itemsRemovedSubject.isValueCreated)
                this.itemsRemovedSubject.value.onNext({ items: [item], from: index });
            if (this.changeTrackingEnabled)
                this.removeItemFromPropertyTracking(item);
        };
        ObservableList.prototype.moveItem = function (oldIndex, newIndex) {
            var item = this.inner[oldIndex];
            if (!this.areChangeNotificationsEnabled()) {
                this.inner.splice(oldIndex, 1);
                this.inner.splice(newIndex, 0, item);
                return;
            }
            var mi = { items: [item], from: oldIndex, to: newIndex };
            if (this.beforeItemsMovedSubject.isValueCreated)
                this.beforeItemsMovedSubject.value.onNext(mi);
            this.inner.splice(oldIndex, 1);
            this.inner.splice(newIndex, 0, item);
            if (this.itemsMovedSubject.isValueCreated)
                this.itemsMovedSubject.value.onNext(mi);
        };
        ObservableList.prototype.clearItems = function () {
            if (!this.areChangeNotificationsEnabled()) {
                this.inner.length = 0;
                if (this.changeTrackingEnabled)
                    this.clearAllPropertyChangeWatchers();
                return;
            }
            this.publishBeforeResetNotification();
            this.inner.length = 0;
            this.publishResetNotification();
            if (this.changeTrackingEnabled)
                this.clearAllPropertyChangeWatchers();
        };
        ObservableList.prototype.addItemToPropertyTracking = function (toTrack) {
            var rcd = this.propertyChangeWatchers[wx.getOid(toTrack)];
            var self = this;
            if (rcd) {
                rcd.addRef();
                return;
            }
            var changing = wx.observeObject(toTrack, true).select(function (i) { return new internal.PropertyChangedEventArgs(toTrack, i.propertyName); });
            var changed = wx.observeObject(toTrack, false).select(function (i) { return new internal.PropertyChangedEventArgs(toTrack, i.propertyName); });
            var disp = new Rx.CompositeDisposable(changing.where(function (_) { return self.areChangeNotificationsEnabled(); }).subscribe(function (x) { return self.itemChangingSubject.value.onNext(x); }), changed.where(function (_) { return self.areChangeNotificationsEnabled(); }).subscribe(function (x) { return self.itemChangedSubject.value.onNext(x); }));
            this.propertyChangeWatchers[wx.getOid(toTrack)] = new wx.RefCountDisposeWrapper(Rx.Disposable.create(function () {
                disp.dispose();
                delete self.propertyChangeWatchers[wx.getOid(toTrack)];
            }));
        };
        ObservableList.prototype.removeItemFromPropertyTracking = function (toUntrack) {
            var rcd = this.propertyChangeWatchers[wx.getOid(toUntrack)];
            if (rcd) {
                rcd.release();
            }
        };
        ObservableList.prototype.clearAllPropertyChangeWatchers = function () {
            var _this = this;
            if (this.propertyChangeWatchers != null) {
                Object.keys(this.propertyChangeWatchers).forEach(function (x) {
                    _this.propertyChangeWatchers[x].release();
                });
                this.propertyChangeWatchers = null;
            }
        };
        ObservableList.prototype.refcountSubscribers = function (input, block) {
            return Rx.Observable.create(function (subj) {
                block(1);
                return new Rx.CompositeDisposable(input.subscribe(subj), Rx.Disposable.create(function () { return block(-1); }));
            });
        };
        ObservableList.prototype.publishResetNotification = function () {
            this.resetSubject.onNext(true);
        };
        ObservableList.prototype.publishBeforeResetNotification = function () {
            this.beforeResetSubject.onNext(true);
        };
        ObservableList.prototype.isLengthAboveResetThreshold = function (toChangeLength) {
            return toChangeLength / this.inner.length > this.resetChangeThreshold && toChangeLength > 10;
        };
        return ObservableList;
    })();
    var ObservableListProjection = (function (_super) {
        __extends(ObservableListProjection, _super);
        function ObservableListProjection(source, filter, orderer, selector, refreshTrigger, scheduler) {
            _super.call(this);
            this.readonlyExceptionMessage = "Derived collections cannot be modified.";
            this.indexToSourceIndexMap = [];
            this.sourceCopy = [];
            this.disp = new Rx.CompositeDisposable();
            this.source = source;
            this.selector = selector || (function (x) { return x; });
            this._filter = filter;
            this.orderer = orderer;
            this.refreshTrigger = refreshTrigger;
            this.scheduler = scheduler || Rx.Scheduler.immediate;
            this.addAllItemsFromSourceCollection();
            this.wireUpChangeNotifications();
        }
        Object.defineProperty(ObservableListProjection.prototype, "isReadOnly", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        ObservableListProjection.prototype.set = function (index, item) {
            internal.throwError(this.readonlyExceptionMessage);
        };
        ObservableListProjection.prototype.addRange = function (items) {
            internal.throwError(this.readonlyExceptionMessage);
        };
        ObservableListProjection.prototype.insertRange = function (index, items) {
            internal.throwError(this.readonlyExceptionMessage);
        };
        ObservableListProjection.prototype.removeAll = function (items) {
            internal.throwError(this.readonlyExceptionMessage);
        };
        ObservableListProjection.prototype.removeRange = function (index, count) {
            internal.throwError(this.readonlyExceptionMessage);
        };
        ObservableListProjection.prototype.add = function (item) {
            internal.throwError(this.readonlyExceptionMessage);
        };
        ObservableListProjection.prototype.clear = function () {
            internal.throwError(this.readonlyExceptionMessage);
        };
        ObservableListProjection.prototype.remove = function (item) {
            internal.throwError(this.readonlyExceptionMessage);
            return undefined;
        };
        ObservableListProjection.prototype.insert = function (index, item) {
            internal.throwError(this.readonlyExceptionMessage);
        };
        ObservableListProjection.prototype.removeAt = function (index) {
            internal.throwError(this.readonlyExceptionMessage);
        };
        ObservableListProjection.prototype.move = function (oldIndex, newIndex) {
            internal.throwError(this.readonlyExceptionMessage);
        };
        ObservableListProjection.prototype.sort = function (comparison) {
            internal.throwError(this.readonlyExceptionMessage);
        };
        ObservableListProjection.prototype.reset = function () {
            var _this = this;
            wx.using(_super.prototype.suppressChangeNotifications.call(this), function () {
                _super.prototype.clear.call(_this);
                _this.addAllItemsFromSourceCollection();
            });
        };
        ObservableListProjection.prototype.dispose = function () {
            this.disp.dispose();
            _super.prototype.dispose.call(this);
        };
        ObservableListProjection.prototype.referenceEquals = function (a, b) {
            return wx.getOid(a) === wx.getOid(b);
        };
        ObservableListProjection.prototype.refresh = function () {
            var length = this.sourceCopy.length;
            for (var i = 0; i < length; i++) {
                this.onItemChanged(this.sourceCopy[i]);
            }
        };
        ObservableListProjection.prototype.wireUpChangeNotifications = function () {
            var _this = this;
            this.disp.add(this.source.itemsAdded.observeOn(this.scheduler).subscribe(function (e) {
                _this.onItemsAdded(e);
            }));
            this.disp.add(this.source.itemsRemoved.observeOn(this.scheduler).subscribe(function (e) {
                _this.onItemsRemoved(e);
            }));
            this.disp.add(this.source.itemsMoved.observeOn(this.scheduler).subscribe(function (e) {
                _this.onItemsMoved(e);
            }));
            this.disp.add(this.source.itemReplaced.observeOn(this.scheduler).subscribe(function (e) {
                _this.onItemsReplaced(e);
            }));
            this.disp.add(this.source.shouldReset.observeOn(this.scheduler).subscribe(function (e) {
                _this.reset();
            }));
            this.disp.add(this.source.itemChanged.select(function (x) { return x.sender; }).observeOn(this.scheduler).subscribe(function (x) { return _this.onItemChanged(x); }));
            if (this.refreshTrigger != null) {
                this.disp.add(this.refreshTrigger.observeOn(this.scheduler).subscribe(function (_) { return _this.refresh(); }));
            }
        };
        ObservableListProjection.prototype.onItemsAdded = function (e) {
            this.shiftIndicesAtOrOverThreshold(e.from, e.items.length);
            for (var i = 0; i < e.items.length; i++) {
                var sourceItem = e.items[i];
                this.sourceCopy.splice(e.from + i, 0, sourceItem);
                if (this._filter && !this._filter(sourceItem)) {
                    continue;
                }
                var destinationItem = this.selector(sourceItem);
                this.internalInsertAndMap(e.from + i, destinationItem);
            }
        };
        ObservableListProjection.prototype.onItemsRemoved = function (e) {
            this.sourceCopy.splice(e.from, e.items.length);
            for (var i = 0; i < e.items.length; i++) {
                var destinationIndex = this.getIndexFromSourceIndex(e.from + i);
                if (destinationIndex !== -1) {
                    this.internalRemoveAt(destinationIndex);
                }
            }
            var removedCount = e.items.length;
            this.shiftIndicesAtOrOverThreshold(e.from + removedCount, -removedCount);
        };
        ObservableListProjection.prototype.onItemsMoved = function (e) {
            if (e.items.length > 1) {
                internal.throwError("Derived collections doesn't support multi-item moves");
            }
            if (e.from === e.to) {
                return;
            }
            var oldSourceIndex = e.from;
            var newSourceIndex = e.to;
            this.sourceCopy.splice(oldSourceIndex, 1);
            this.sourceCopy.splice(newSourceIndex, 0, e.items[0]);
            var currentDestinationIndex = this.getIndexFromSourceIndex(oldSourceIndex);
            this.moveSourceIndexInMap(oldSourceIndex, newSourceIndex);
            if (currentDestinationIndex === -1) {
                return;
            }
            if (this.orderer == null) {
                var newDestinationIndex = ObservableListProjection.newPositionForExistingItem2(this.indexToSourceIndexMap, newSourceIndex, currentDestinationIndex);
                if (newDestinationIndex !== currentDestinationIndex) {
                    this.indexToSourceIndexMap.splice(currentDestinationIndex, 1);
                    this.indexToSourceIndexMap.splice(newDestinationIndex, 0, newSourceIndex);
                    _super.prototype.move.call(this, currentDestinationIndex, newDestinationIndex);
                }
                else {
                    this.indexToSourceIndexMap[currentDestinationIndex] = newSourceIndex;
                }
            }
            else {
                this.indexToSourceIndexMap[currentDestinationIndex] = newSourceIndex;
            }
        };
        ObservableListProjection.prototype.onItemsReplaced = function (e) {
            for (var i = 0; i < e.items.length; i++) {
                var sourceItem = e.items[i];
                this.sourceCopy[e.from + i] = sourceItem;
                this.onItemChanged(sourceItem);
            }
        };
        ObservableListProjection.prototype.onItemChanged = function (changedItem) {
            var _this = this;
            var sourceIndices = this.indexOfAll(this.sourceCopy, changedItem);
            var shouldBeIncluded = !this._filter || this._filter(changedItem);
            sourceIndices.forEach(function (sourceIndex) {
                var currentDestinationIndex = _this.getIndexFromSourceIndex(sourceIndex);
                var isIncluded = currentDestinationIndex >= 0;
                if (isIncluded && !shouldBeIncluded) {
                    _this.internalRemoveAt(currentDestinationIndex);
                }
                else if (!isIncluded && shouldBeIncluded) {
                    _this.internalInsertAndMap(sourceIndex, _this.selector(changedItem));
                }
                else if (isIncluded && shouldBeIncluded) {
                    var newItem = _this.selector(changedItem);
                    if (_this.orderer == null) {
                        if (!_this.referenceEquals(newItem, _this.get(currentDestinationIndex))) {
                            _super.prototype.set.call(_this, currentDestinationIndex, newItem);
                        }
                    }
                    else {
                        if (_this.canItemStayAtPosition(newItem, currentDestinationIndex)) {
                            if (!_this.referenceEquals(newItem, _this.get(currentDestinationIndex))) {
                                _super.prototype.set.call(_this, currentDestinationIndex, newItem);
                            }
                        }
                        else {
                            if (_this.referenceEquals(newItem, _this.get(currentDestinationIndex))) {
                                var newDestinationIndex = _this.newPositionForExistingItem(sourceIndex, currentDestinationIndex, newItem);
                                _this.indexToSourceIndexMap.splice(currentDestinationIndex, 1);
                                _this.indexToSourceIndexMap.splice(newDestinationIndex, 0, sourceIndex);
                                _super.prototype.move.call(_this, currentDestinationIndex, newDestinationIndex);
                            }
                            else {
                                _this.internalRemoveAt(currentDestinationIndex);
                                _this.internalInsertAndMap(sourceIndex, newItem);
                            }
                        }
                    }
                }
            });
        };
        ObservableListProjection.prototype.canItemStayAtPosition = function (item, currentIndex) {
            var hasPrecedingItem = currentIndex > 0;
            if (hasPrecedingItem) {
                var isGreaterThanOrEqualToPrecedingItem = this.orderer(item, this[currentIndex - 1]) >= 0;
                if (!isGreaterThanOrEqualToPrecedingItem) {
                    return false;
                }
            }
            var hasSucceedingItem = currentIndex < this.length() - 1;
            if (hasSucceedingItem) {
                var isLessThanOrEqualToSucceedingItem = this.orderer(item, this[currentIndex + 1]) <= 0;
                if (!isLessThanOrEqualToSucceedingItem) {
                    return false;
                }
            }
            return true;
        };
        ObservableListProjection.prototype.getIndexFromSourceIndex = function (sourceIndex) {
            return this.indexToSourceIndexMap.indexOf(sourceIndex);
        };
        ObservableListProjection.prototype.indexOfAll = function (source, item) {
            var _this = this;
            var indices = [];
            var sourceIndex = 0;
            source.forEach(function (x) {
                if (_this.referenceEquals(x, item)) {
                    indices.push(sourceIndex);
                }
                sourceIndex++;
            });
            return indices;
        };
        ObservableListProjection.prototype.moveSourceIndexInMap = function (oldSourceIndex, newSourceIndex) {
            if (newSourceIndex > oldSourceIndex) {
                this.shiftSourceIndicesInRange(oldSourceIndex + 1, newSourceIndex + 1, -1);
            }
            else {
                this.shiftSourceIndicesInRange(newSourceIndex, oldSourceIndex, 1);
            }
        };
        ObservableListProjection.prototype.shiftIndicesAtOrOverThreshold = function (threshold, value) {
            for (var i = 0; i < this.indexToSourceIndexMap.length; i++) {
                if (this.indexToSourceIndexMap[i] >= threshold) {
                    this.indexToSourceIndexMap[i] += value;
                }
            }
        };
        ObservableListProjection.prototype.shiftSourceIndicesInRange = function (rangeStart, rangeStop, value) {
            for (var i = 0; i < this.indexToSourceIndexMap.length; i++) {
                var sourceIndex = this.indexToSourceIndexMap[i];
                if (sourceIndex >= rangeStart && sourceIndex < rangeStop) {
                    this.indexToSourceIndexMap[i] += value;
                }
            }
        };
        ObservableListProjection.prototype.addAllItemsFromSourceCollection = function () {
            var _this = this;
            var sourceIndex = 0;
            this.source.forEach(function (sourceItem) {
                _this.sourceCopy.push(sourceItem);
                if (!_this._filter || _this._filter(sourceItem)) {
                    var destinationItem = _this.selector(sourceItem);
                    _this.internalInsertAndMap(sourceIndex, destinationItem);
                }
                sourceIndex++;
            });
        };
        ObservableListProjection.prototype.internalClear = function () {
            this.indexToSourceIndexMap = [];
            this.sourceCopy = [];
            _super.prototype.clear.call(this);
        };
        ObservableListProjection.prototype.internalInsertAndMap = function (sourceIndex, value) {
            var destinationIndex = this.positionForNewItem(sourceIndex, value);
            this.indexToSourceIndexMap.splice(destinationIndex, 0, sourceIndex);
            _super.prototype.insert.call(this, destinationIndex, value);
        };
        ObservableListProjection.prototype.internalRemoveAt = function (destinationIndex) {
            this.indexToSourceIndexMap.splice(destinationIndex, 1);
            _super.prototype.removeAt.call(this, destinationIndex);
        };
        ObservableListProjection.prototype.positionForNewItem = function (sourceIndex, value) {
            return this.orderer == null ? ObservableListProjection.positionForNewItemArray(this.indexToSourceIndexMap, sourceIndex, ObservableListProjection.defaultOrderer) : ObservableListProjection.positionForNewItemArray2(this.inner, 0, this.inner.length, value, this.orderer);
        };
        ObservableListProjection.positionForNewItemArray = function (array, item, orderer) {
            return ObservableListProjection.positionForNewItemArray2(array, 0, array.length, item, orderer);
        };
        ObservableListProjection.positionForNewItemArray2 = function (array, index, count, item, orderer) {
            if (count === 0) {
                return index;
            }
            if (count === 1) {
                return orderer(array[index], item) >= 0 ? index : index + 1;
            }
            if (orderer(array[index], item) >= 1)
                return index;
            var low = index, hi = index + count - 1;
            var cmp;
            while (low <= hi) {
                var mid = Math.floor(low + (hi - low) / 2);
                cmp = orderer(array[mid], item);
                if (cmp === 0) {
                    return mid;
                }
                if (cmp < 0) {
                    low = mid + 1;
                }
                else {
                    hi = mid - 1;
                }
            }
            return low;
        };
        ObservableListProjection.prototype.newPositionForExistingItem = function (sourceIndex, currentIndex, item) {
            return this.orderer == null ? ObservableListProjection.newPositionForExistingItem2(this.indexToSourceIndexMap, sourceIndex, currentIndex) : ObservableListProjection.newPositionForExistingItem2(this.inner, item, currentIndex, this.orderer);
        };
        ObservableListProjection.newPositionForExistingItem2 = function (array, item, currentIndex, orderer) {
            if (array.length === 1) {
                return 0;
            }
            var precedingIndex = currentIndex - 1;
            var succeedingIndex = currentIndex + 1;
            var comparand = array[precedingIndex >= 0 ? precedingIndex : succeedingIndex];
            if (orderer == null) {
                orderer = ObservableListProjection.defaultOrderer;
            }
            var cmp = orderer(item, comparand);
            var min = 0;
            var max = array.length;
            if (cmp === 0) {
                return currentIndex;
            }
            else if (cmp > 0) {
                min = succeedingIndex;
            }
            else {
                max = precedingIndex;
            }
            if (min === array.length || max < 0) {
                return currentIndex;
            }
            var ix = ObservableListProjection.positionForNewItemArray2(array, min, max - min, item, orderer);
            return ix >= currentIndex ? ix - 1 : ix;
        };
        ObservableListProjection.defaultOrderer = function (a, b) {
            var result;
            if (a == null && b == null)
                result = 0;
            else if (a == null)
                result = -1;
            else if (b == null)
                result = 1;
            else
                result = a - b;
            return result;
        };
        return ObservableListProjection;
    })(ObservableList);
    var internal;
    (function (internal) {
        internal.listConstructor = ObservableList;
    })(internal = wx.internal || (wx.internal = {}));
    function list(initialContents, resetChangeThreshold, scheduler) {
        if (resetChangeThreshold === void 0) { resetChangeThreshold = 0.3; }
        if (scheduler === void 0) { scheduler = null; }
        return new ObservableList(initialContents, resetChangeThreshold, scheduler);
    }
    wx.list = list;
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var MapEmulated = (function () {
        function MapEmulated() {
            this.cacheSentinel = {};
            this.keys = [];
            this.values = [];
            this.cache = this.cacheSentinel;
        }
        Object.defineProperty(MapEmulated.prototype, "size", {
            get: function () {
                return this.keys.length;
            },
            enumerable: true,
            configurable: true
        });
        MapEmulated.prototype.has = function (key) {
            if (key === this.cache) {
                return true;
            }
            if (this.find(key) >= 0) {
                this.cache = key;
                return true;
            }
            return false;
        };
        MapEmulated.prototype.get = function (key) {
            var index = this.find(key);
            if (index >= 0) {
                this.cache = key;
                return this.values[index];
            }
            return undefined;
        };
        MapEmulated.prototype.set = function (key, value) {
            this.delete(key);
            this.keys.push(key);
            this.values.push(value);
            this.cache = key;
            return this;
        };
        MapEmulated.prototype.delete = function (key) {
            var index = this.find(key);
            if (index >= 0) {
                this.keys.splice(index, 1);
                this.values.splice(index, 1);
                this.cache = this.cacheSentinel;
                return true;
            }
            return false;
        };
        MapEmulated.prototype.clear = function () {
            this.keys.length = 0;
            this.values.length = 0;
            this.cache = this.cacheSentinel;
        };
        MapEmulated.prototype.forEach = function (callback, thisArg) {
            var size = this.size;
            for (var i = 0; i < size; ++i) {
                var key = this.keys[i];
                var value = this.values[i];
                this.cache = key;
                callback.call(this, value, key, this);
            }
        };
        Object.defineProperty(MapEmulated.prototype, "isEmulated", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        MapEmulated.prototype.find = function (key) {
            var keys = this.keys;
            var size = keys.length;
            for (var i = 0; i < size; ++i) {
                if (keys[i] === key) {
                    return i;
                }
            }
            return -1;
        };
        return MapEmulated;
    })();
    var hasNativeSupport = typeof Map === "function" && Map.prototype.hasOwnProperty("forEach") && Map.prototype.hasOwnProperty("add") && Map.prototype.hasOwnProperty("clear") && Map.prototype.hasOwnProperty("devare") && Map.prototype.hasOwnProperty("has");
    function createMap(disableNativeSupport) {
        if (disableNativeSupport || !hasNativeSupport) {
            return new MapEmulated();
        }
        return new Map();
    }
    wx.createMap = createMap;
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var groupId = 0;
    var templateCache = {};
    var RadioGroupComponent = (function () {
        function RadioGroupComponent(htmlTemplateEngine) {
            var _this = this;
            this.template = function (params) {
                return _this.buildTemplate(params);
            };
            this.viewModel = function (params) {
                var opt = params;
                var groupName = opt.groupName != null ? opt.groupName : wx.formatString("wx-radiogroup-{0}", groupId++);
                return {
                    items: params.items,
                    selectedValue: params.selectedValue,
                    groupName: groupName,
                    hooks: { afterRender: params.afterRender }
                };
            };
            this.htmlTemplateEngine = htmlTemplateEngine;
        }
        RadioGroupComponent.prototype.buildTemplate = function (params) {
            var result;
            var key = undefined;
            var nodes;
            if (!params.noCache) {
                key = (params.itemText != null ? params.itemText : "") + "-" + (params.itemValue != null ? params.itemValue : "") + "-" + (params.itemClass != null ? params.itemClass : "") + "-" + (params.selectedValue != null ? "true" : "false");
                nodes = templateCache[key];
                if (nodes != null) {
                    return nodes;
                }
            }
            result = '<div class="wx-radiogroup" data-bind="{0}"><input type="radio" data-bind="{1}"/>{2}</div>';
            var bindings = [];
            var attrs = [];
            var itemBindings = [];
            var itemAttrs = [];
            var perItemExtraMarkup = "";
            bindings.push({ key: "foreach", value: "{ data: items, hooks: hooks }" });
            if (attrs.length)
                bindings.push({ key: "attr", value: "{ " + attrs.map(function (x) { return x.key + ": " + x.value; }).join(", ") + " }" });
            itemBindings.push({ key: "value", value: params.itemValue || "$data" });
            itemAttrs.push({ key: 'name', value: "$parent.groupName" });
            if (params.selectedValue) {
                itemBindings.push({ key: "selectedValue", value: "$parent.@selectedValue" });
            }
            if (params.itemText) {
                perItemExtraMarkup += wx.formatString('<label data-bind="text: {0}, attr: { for: {1} }"></label>', params.itemText, "$parent.groupName + '-' + $index");
                itemAttrs.push({ key: 'id', value: "$parent.groupName + '-' + $index" });
            }
            if (params.itemClass) {
                itemAttrs.push({ key: 'class', value: "'" + params.itemClass + "'" });
            }
            if (itemAttrs.length)
                itemBindings.push({ key: "attr", value: "{ " + itemAttrs.map(function (x) { return x.key + ": " + x.value; }).join(", ") + " }" });
            var bindingString = bindings.map(function (x) { return x.key + ": " + x.value; }).join(", ");
            var itemBindingString = itemBindings.map(function (x) { return x.key + ": " + x.value; }).join(", ");
            result = wx.formatString(result, bindingString, itemBindingString, perItemExtraMarkup);
            if (!params.noCache) {
                templateCache[key] = result;
            }
            nodes = this.htmlTemplateEngine.parse(result);
            return nodes;
        };
        return RadioGroupComponent;
    })();
    var internal;
    (function (internal) {
        internal.radioGroupComponentConstructor = RadioGroupComponent;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var templateCache = {};
    var SelectComponent = (function () {
        function SelectComponent(htmlTemplateEngine) {
            var _this = this;
            this.template = function (params) {
                return _this.buildTemplate(params);
            };
            this.viewModel = function (params) {
                var opt = params;
                return {
                    items: params.items,
                    selectedValue: params.selectedValue,
                    hooks: { afterRender: opt.afterRender }
                };
            };
            this.htmlTemplateEngine = htmlTemplateEngine;
        }
        SelectComponent.prototype.buildTemplate = function (params) {
            var result;
            var key = undefined;
            var nodes;
            if (!params.noCache) {
                key = (params.name != null ? params.name : "") + "-" + (params.itemText != null ? params.itemText : "") + "-" + (params.itemValue != null ? params.itemValue : "") + "-" + (params.itemClass != null ? params.itemClass : "") + "-" + (params.selectedValue != null ? "true" : "false") + "-" + (params.multiple ? "true" : "false") + "-" + (params.required ? "true" : "false") + "-" + (params.autofocus ? "true" : "false") + "-" + (params.size ? params.size.toString() : "0");
                nodes = templateCache[key];
                if (nodes != null) {
                    return nodes;
                }
            }
            result = '<select class="wx-select" data-bind="{0}"><option data-bind="{1}"></option></select>';
            var bindings = [];
            var attrs = [];
            var itemBindings = [];
            var itemAttrs = [];
            bindings.push({ key: "foreach", value: "{ data: items, hooks: hooks }" });
            if (params.selectedValue)
                bindings.push({ key: "selectedValue", value: "@selectedValue" });
            if (params.name) {
                attrs.push({ key: 'name', value: params.name });
            }
            if (params.multiple) {
                attrs.push({ key: 'multiple', value: "true" });
            }
            if (params.size !== undefined) {
                attrs.push({ key: 'size', value: params.size.toString() });
            }
            if (params.required) {
                attrs.push({ key: 'required', value: "true" });
            }
            if (params.autofocus) {
                attrs.push({ key: 'autofocus', value: "true" });
            }
            if (attrs.length)
                bindings.push({ key: "attr", value: "{ " + attrs.map(function (x) { return x.key + ": " + x.value; }).join(", ") + " }" });
            itemBindings.push({ key: "value", value: params.itemValue || "$data" });
            itemBindings.push({ key: 'text', value: params.itemText || "$data" });
            if (params.itemClass) {
                itemAttrs.push({ key: 'class', value: "'" + params.itemClass + "'" });
            }
            if (itemAttrs.length)
                itemBindings.push({ key: "attr", value: "{ " + itemAttrs.map(function (x) { return x.key + ": " + x.value; }).join(", ") + " }" });
            var bindingString = bindings.map(function (x) { return x.key + ": " + x.value; }).join(", ");
            var itemBindingString = itemBindings.map(function (x) { return x.key + ": " + x.value; }).join(", ");
            result = wx.formatString(result, bindingString, itemBindingString);
            if (!params.noCache) {
                templateCache[key] = result;
            }
            nodes = this.htmlTemplateEngine.parse(result);
            return nodes;
        };
        return SelectComponent;
    })();
    var internal;
    (function (internal) {
        internal.selectComponentConstructor = SelectComponent;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    function toElementList(element) {
        var nodes;
        if (element instanceof Node || element instanceof HTMLElement)
            nodes = [element];
        else if (Array.isArray(element))
            nodes = element;
        else if (element instanceof NodeList)
            nodes = wx.nodeListToArray(element);
        else
            wx.internal.throwError("invalid argument: element");
        var elements = nodes.filter(function (x) { return x.nodeType === 1; });
        return elements;
    }
    function parseTimingValue(x) {
        if (x.charAt(x.length - 1) === "s") {
            x = x.substring(0, x.length - 1);
        }
        var value = parseFloat(x) || 0;
        return value;
    }
    function getMaximumTransitionDuration(el) {
        var str = getComputedStyle(el)["transitionDuration"];
        var maxValue = 0;
        var values = str.split(/\s*,\s*/);
        values.forEach(function (x) {
            var value = parseTimingValue(x);
            maxValue = maxValue ? Math.max(value, maxValue) : value;
        });
        return maxValue * 1000;
    }
    function getMaximumTransitionDelay(el) {
        var str = getComputedStyle(el)["transitionDelay"];
        var maxValue = 0;
        var values = str.split(/\s*,\s*/);
        values.forEach(function (x) {
            var value = Math.max(0, parseTimingValue(x));
            maxValue = maxValue ? Math.max(value, maxValue) : value;
        });
        return maxValue * 1000;
    }
    function getKeyframeAnimationDuration(el) {
        var durationStr = getComputedStyle(el)["animationDuration"] || getComputedStyle(el)["webkitAnimationDuration"] || "0s";
        var delayStr = getComputedStyle(el)["animationDelay"] || getComputedStyle(el)["webkitAnimationDelay"] || "0s";
        var duration = parseTimingValue(durationStr);
        var delay = parseTimingValue(delayStr);
        return (duration + delay) * 1000;
    }
    function scriptedAnimation(run, prepare, complete) {
        var result = {};
        if (prepare) {
            result.prepare = function (nodes, params) {
                var elements = toElementList(nodes);
                elements.forEach(function (x) { return prepare(x, params); });
            };
        }
        else {
            result.prepare = wx.noop;
        }
        result.run = function (nodes, params) {
            return Rx.Observable.defer(function () {
                var elements = toElementList(nodes);
                if (elements.length === 0)
                    return Rx.Observable.return(undefined);
                return Rx.Observable.combineLatest(elements.map(function (x) { return run(x, params); }), wx.noop);
            });
        };
        if (complete) {
            result.complete = function (nodes, params) {
                var elements = toElementList(nodes);
                elements.forEach(function (x) { return complete(x, params); });
            };
        }
        else {
            result.complete = wx.noop;
        }
        return result;
    }
    function cssTransitionAnimation(prepare, run, complete) {
        var result = {};
        var prepToAdd;
        var prepToRemove;
        var runToAdd;
        var runToRemove;
        var completeToAdd;
        var completeToRemove;
        if (prepare) {
            var prepIns;
            if (typeof prepare === "string") {
                prepare = prepare.split(/\s+/).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
            }
            if (typeof prepare[0] === "string") {
                prepIns = prepare.map(function (x) { return { css: x, add: true }; });
            }
            else {
                prepIns = prepare;
            }
            prepToAdd = prepIns.filter(function (x) { return x.add; }).map(function (x) { return x.css; });
            prepToRemove = prepIns.filter(function (x) { return !x.add || x.remove; }).map(function (x) { return x.css; });
            result.prepare = function (nodes, params) {
                var elements = toElementList(nodes);
                if (prepToAdd && prepToAdd.length)
                    elements.forEach(function (x) { return wx.toggleCssClass.apply(null, [x, true].concat(prepToAdd)); });
                if (prepToRemove && prepToRemove.length)
                    elements.forEach(function (x) { return wx.toggleCssClass.apply(null, [x, false].concat(prepToRemove)); });
            };
        }
        var runIns;
        if (typeof run === "string") {
            run = run.split(/\s+/).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
        }
        if (typeof run[0] === "string") {
            runIns = run.map(function (x) { return { css: x, add: true }; });
        }
        else {
            runIns = run;
        }
        runToAdd = runIns.filter(function (x) { return x.add; }).map(function (x) { return x.css; });
        runToRemove = runIns.filter(function (x) { return !x.add || x.remove; }).map(function (x) { return x.css; });
        result.run = function (nodes, params) {
            return Rx.Observable.defer(function () {
                var elements = toElementList(nodes);
                if (elements.length === 0)
                    return Rx.Observable.return(undefined);
                var obs = Rx.Observable.combineLatest(elements.map(function (x) {
                    var duration = Math.max(getMaximumTransitionDuration(x) + getMaximumTransitionDelay(x), getKeyframeAnimationDuration(x));
                    return Rx.Observable.timer(duration);
                }), wx.noop);
                Rx.Observable.timer(1).subscribe(function () {
                    if (runToAdd && runToAdd.length)
                        elements.forEach(function (x) { return wx.toggleCssClass.apply(null, [x, true].concat(runToAdd)); });
                    if (runToRemove && runToRemove.length)
                        elements.forEach(function (x) { return wx.toggleCssClass.apply(null, [x, false].concat(runToRemove)); });
                });
                return obs;
            });
        };
        var completeIns;
        if (complete) {
            if (typeof complete === "string") {
                complete = complete.split(/\s+/).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
            }
            if (typeof complete[0] === "string") {
                completeIns = complete.map(function (x) { return { css: x, add: true }; });
            }
            else {
                completeIns = complete;
            }
            completeToAdd = completeIns.filter(function (x) { return x.add; }).map(function (x) { return x.css; });
            completeToRemove = completeIns.filter(function (x) { return !x.add || x.remove; }).map(function (x) { return x.css; });
        }
        else {
            completeToRemove = [];
            if (prepToAdd && prepToAdd.length)
                completeToRemove = completeToRemove.concat(prepToAdd);
            if (runToAdd && runToAdd.length)
                completeToRemove = completeToRemove.concat(runToAdd);
        }
        result.complete = function (nodes, params) {
            var elements = toElementList(nodes);
            if (completeToAdd && completeToAdd.length)
                elements.forEach(function (x) { return wx.toggleCssClass.apply(null, [x, true].concat(completeToAdd)); });
            if (completeToRemove && completeToRemove.length)
                elements.forEach(function (x) { return wx.toggleCssClass.apply(null, [x, false].concat(completeToRemove)); });
        };
        return result;
    }
    function animation() {
        var args = wx.args2Array(arguments);
        var val = args.shift();
        if (typeof val === "function") {
            return scriptedAnimation(val, args.shift(), args.shift());
        }
        return cssTransitionAnimation(val, args.shift(), args.shift());
    }
    wx.animation = animation;
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var Command = (function () {
        function Command(canExecute, executeAsync, scheduler) {
            var _this = this;
            this.resultsSubject = new Rx.Subject();
            this.isExecutingSubject = new Rx.Subject();
            this.inflightCount = 0;
            this.canExecuteLatest = false;
            this.canExecuteDisp = null;
            this.scheduler = scheduler || wx.app.mainThreadScheduler;
            this.func = executeAsync;
            this.canExecuteObs = canExecute.combineLatest(this.isExecutingSubject.startWith(false), function (ce, ie) { return ce && !ie; }).catch(function (ex) {
                _this.exceptionsSubject.onNext(ex);
                return Rx.Observable.return(false);
            }).do(function (x) {
                _this.canExecuteLatest = x;
            }).publish();
            if (wx.isInUnitTest()) {
                this.canExecuteObs.connect();
            }
            this.exceptionsSubject = new Rx.Subject();
            this.thrownExceptions = this.exceptionsSubject.asObservable();
            this.exceptionsSubject.observeOn(this.scheduler).subscribe(wx.app.defaultExceptionHandler);
        }
        Command.prototype.queryInterface = function (iid) {
            if (iid === wx.IID.IUnknown || iid === wx.IID.ICommand || iid === wx.IID.IHandleObservableErrors || iid === wx.IID.IDisposable)
                return true;
            return false;
        };
        Command.prototype.dispose = function () {
            var disp = this.canExecuteDisp;
            if (disp != null)
                disp.dispose();
        };
        Object.defineProperty(Command.prototype, "canExecuteObservable", {
            get: function () {
                var _this = this;
                var ret = this.canExecuteObs.startWith(this.canExecuteLatest).distinctUntilChanged();
                if (this.canExecuteDisp != null)
                    return ret;
                return Rx.Observable.create(function (subj) {
                    var disp = ret.subscribe(subj);
                    _this.canExecuteDisp = _this.canExecuteObs.connect();
                    return disp;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Command.prototype, "isExecuting", {
            get: function () {
                return this.isExecutingSubject.startWith(this.inflightCount > 0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Command.prototype, "results", {
            get: function () {
                return this.resultsSubject.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        Command.prototype.canExecute = function (parameter) {
            if (this.canExecuteDisp == null)
                this.canExecuteDisp = this.canExecuteObs.connect();
            return this.canExecuteLatest;
        };
        Command.prototype.execute = function (parameter) {
            this.executeAsync(parameter).catch(Rx.Observable.empty()).subscribe();
        };
        Command.prototype.executeAsync = function (parameter) {
            var self = this;
            var ret = Rx.Observable.create(function (subj) {
                if (++self.inflightCount === 1) {
                    self.isExecutingSubject.onNext(true);
                }
                var decrement = new Rx.SerialDisposable();
                decrement.setDisposable(Rx.Disposable.create(function () {
                    if (--self.inflightCount === 0) {
                        self.isExecutingSubject.onNext(false);
                    }
                }));
                var disp = self.func(parameter).observeOn(self.scheduler).do(function (_) {
                }, function (e) { return decrement.setDisposable(Rx.Disposable.empty); }, function () { return decrement.setDisposable(Rx.Disposable.empty); }).do(function (x) { return self.resultsSubject.onNext(x); }, function (x) { return self.exceptionsSubject.onNext(x); }).subscribe(subj);
                return new Rx.CompositeDisposable(disp, decrement);
            });
            return ret.publish().refCount();
        };
        return Command;
    })();
    var internal;
    (function (internal) {
        internal.commandConstructor = Command;
    })(internal = wx.internal || (wx.internal = {}));
    function command() {
        var args = wx.args2Array(arguments);
        var canExecute;
        var execute;
        var scheduler;
        var thisArg;
        if (wx.isFunction(args[0])) {
            execute = args.shift();
            canExecute = wx.isRxObservable(args[0]) ? args.shift() : Rx.Observable.return(true);
            scheduler = wx.isRxScheduler(args[0]) ? args.shift() : undefined;
            thisArg = args.shift();
            if (thisArg != null)
                execute = execute.bind(thisArg);
            return asyncCommand(canExecute, function (parameter) { return Rx.Observable.create(function (obs) {
                try {
                    execute(parameter);
                    obs.onNext(null);
                    obs.onCompleted();
                }
                catch (e) {
                    obs.onError(e);
                }
                return Rx.Disposable.empty;
            }); }, scheduler);
        }
        canExecute = args.shift() || Rx.Observable.return(true);
        scheduler = wx.isRxScheduler(args[0]) ? args.shift() : undefined;
        return new Command(canExecute, function (x) { return Rx.Observable.return(x); }, scheduler);
    }
    wx.command = command;
    function asyncCommand() {
        var args = wx.args2Array(arguments);
        var canExecute;
        var executeAsync;
        var scheduler;
        var thisArg;
        if (wx.isFunction(args[0])) {
            executeAsync = args.shift();
            scheduler = wx.isRxScheduler(args[0]) ? args.shift() : undefined;
            thisArg = args.shift();
            if (thisArg != null)
                executeAsync = executeAsync.bind(thisArg);
            return new Command(Rx.Observable.return(true), executeAsync, scheduler);
        }
        canExecute = args.shift();
        executeAsync = args.shift();
        scheduler = wx.isRxScheduler(args[0]) ? args.shift() : undefined;
        return new Command(canExecute, executeAsync, scheduler);
    }
    wx.asyncCommand = asyncCommand;
    function combinedCommand() {
        var args = wx.args2Array(arguments);
        var commands = args.filter(function (x) { return wx.isCommand(x); });
        var canExecute = args.filter(function (x) { return wx.isRxObservable(x); }).pop();
        if (!canExecute)
            canExecute = Rx.Observable.return(true);
        var childrenCanExecute = Rx.Observable.combineLatest(commands.map(function (x) { return x.canExecuteObservable; }), function () {
            var latestCanExecute = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                latestCanExecute[_i - 0] = arguments[_i];
            }
            return latestCanExecute.every(function (x) { return x; });
        });
        var canExecuteSum = Rx.Observable.combineLatest(canExecute.startWith(true), childrenCanExecute, function (parent, child) { return parent && child; });
        var ret = command(canExecuteSum);
        ret.results.subscribe(function (x) { return commands.forEach(function (cmd) {
            cmd.execute(x);
        }); });
        return ret;
    }
    wx.combinedCommand = combinedCommand;
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var compiler;
    (function (compiler) {
        var stringDouble = '"(?:[^"\\\\]|\\\\.)*"';
        var stringSingle = "'(?:[^'\\\\]|\\\\.)*'";
        var stringRegexp = '/(?:[^/\\\\]|\\\\.)*/\w*';
        var specials = ',"\'{}()/:[\\]';
        var everyThingElse = '[^\\s:,/][^' + specials + ']*[^\\s' + specials + ']';
        var oneNotSpace = '[^\\s]';
        var bindingToken = RegExp(stringDouble + '|' + stringSingle + '|' + stringRegexp + '|' + everyThingElse + '|' + oneNotSpace, 'g');
        var divisionLookBehind = /[\])"'A-Za-z0-9_$]+$/;
        var keywordRegexLookBehind = { 'in': 1, 'return': 1, 'typeof': 1 };
        function parseObjectLiteral(objectLiteralString) {
            var str = objectLiteralString.trim();
            if (str.charCodeAt(0) === 123)
                str = str.slice(1, -1);
            var result = new Array(), toks = str.match(bindingToken), key, values, depth = 0;
            if (toks) {
                toks.push(',');
                for (var i = 0, tok; tok = toks[i]; ++i) {
                    var c = tok.charCodeAt(0);
                    if (c === 44) {
                        if (depth <= 0) {
                            if (key)
                                result.push(values ? { key: key, value: values.join('') } : { 'unknown': key, value: undefined });
                            key = values = depth = 0;
                            continue;
                        }
                    }
                    else if (c === 58) {
                        if (!values)
                            continue;
                    }
                    else if (c === 47 && i && tok.length > 1) {
                        var match = toks[i - 1].match(divisionLookBehind);
                        if (match && !keywordRegexLookBehind[match[0]]) {
                            str = str.substr(str.indexOf(tok) + 1);
                            toks = str.match(bindingToken);
                            toks.push(',');
                            i = -1;
                            tok = '/';
                        }
                    }
                    else if (c === 40 || c === 123 || c === 91) {
                        ++depth;
                    }
                    else if (c === 41 || c === 125 || c === 93) {
                        --depth;
                    }
                    else if (!key && !values) {
                        key = (c === 34 || c === 39) ? tok.slice(1, -1) : tok;
                        continue;
                    }
                    if (values)
                        values.push(tok);
                    else
                        values = [tok];
                }
            }
            return result;
        }
        compiler.parseObjectLiteral = parseObjectLiteral;
        var hookField = "___runtimeHooks";
        function noop() {
        }
        function extend(dst, obj) {
            var key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    dst[key] = obj[key];
                }
            }
            return dst;
        }
        function isDefined(value) {
            return typeof value !== "undefined";
        }
        function $parseMinErr(module, message, arg1, arg2, arg3, arg4, arg5) {
            var args = arguments;
            message = message.replace(/{(\d)}/g, function (match) {
                return args[2 + parseInt(match[1])];
            });
            throw new SyntaxError(message);
        }
        function lowercase(string) {
            return typeof string === "string" ? string.toLowerCase() : string;
        }
        function ensureSafeMemberName(name, fullExpression) {
            if (name === "constructor") {
                throw $parseMinErr("isecfld", "Referencing \"constructor\" field in WebRx expressions is disallowed! Expression: {0}", fullExpression);
            }
            return name;
        }
        function ensureSafeObject(obj, fullExpression) {
            if (obj) {
                if (obj.constructor === obj) {
                    throw $parseMinErr("isecfn", "Referencing Function in WebRx expressions is disallowed! Expression: {0}", fullExpression);
                }
                else if (obj.document && obj.location && obj.alert && obj.setInterval) {
                    throw $parseMinErr("isecwindow", "Referencing the Window in WebRx expressions is disallowed! Expression: {0}", fullExpression);
                }
                else if (obj.children && (obj.nodeName || (obj.prop && obj.attr && obj.find))) {
                    throw $parseMinErr("isecdom", "Referencing DOM nodes in WebRx expressions is disallowed! Expression: {0}", fullExpression);
                }
            }
            return obj;
        }
        var OPERATORS = {
            'null': function () {
                return null;
            },
            'true': function () {
                return true;
            },
            'false': function () {
                return false;
            },
            undefined: noop,
            '+': function (self, locals, a, b) {
                a = a(self, locals);
                b = b(self, locals);
                if (isDefined(a)) {
                    if (isDefined(b)) {
                        return a + b;
                    }
                    return a;
                }
                return isDefined(b) ? b : undefined;
            },
            '-': function (self, locals, a, b) {
                a = a(self, locals);
                b = b(self, locals);
                return (isDefined(a) ? a : 0) - (isDefined(b) ? b : 0);
            },
            '*': function (self, locals, a, b) {
                return a(self, locals) * b(self, locals);
            },
            '/': function (self, locals, a, b) {
                return a(self, locals) / b(self, locals);
            },
            '%': function (self, locals, a, b) {
                return a(self, locals) % b(self, locals);
            },
            '^': function (self, locals, a, b) {
                return a(self, locals) ^ b(self, locals);
            },
            '=': noop,
            '===': function (self, locals, a, b) {
                return a(self, locals) === b(self, locals);
            },
            '!==': function (self, locals, a, b) {
                return a(self, locals) !== b(self, locals);
            },
            '==': function (self, locals, a, b) {
                return a(self, locals) === b(self, locals);
            },
            '!=': function (self, locals, a, b) {
                return a(self, locals) !== b(self, locals);
            },
            '<': function (self, locals, a, b) {
                return a(self, locals) < b(self, locals);
            },
            '>': function (self, locals, a, b) {
                return a(self, locals) > b(self, locals);
            },
            '<=': function (self, locals, a, b) {
                return a(self, locals) <= b(self, locals);
            },
            '>=': function (self, locals, a, b) {
                return a(self, locals) >= b(self, locals);
            },
            '&&': function (self, locals, a, b) {
                return a(self, locals) && b(self, locals);
            },
            '||': function (self, locals, a, b) {
                return a(self, locals) || b(self, locals);
            },
            '&': function (self, locals, a, b) {
                return a(self, locals) & b(self, locals);
            },
            '|': function (self, locals, a, b) {
                return b(self, locals)(self, locals, a(self, locals));
            },
            '!': function (self, locals, a) {
                return !a(self, locals);
            }
        };
        var ESCAPE = { "n": "\n", "f": "\f", "r": "\r", "t": "\t", "v": "\v", "'": "'", '"': "\"" };
        var Lexer = (function () {
            function Lexer(options) {
                this.options = options;
            }
            Lexer.prototype.lex = function (text) {
                this.text = text;
                this.index = 0;
                this.ch = undefined;
                this.lastCh = ":";
                this.tokens = [];
                var token;
                var json = [];
                while (this.index < this.text.length) {
                    this.ch = this.text.charAt(this.index);
                    if (this.is("\"'")) {
                        this.readString(this.ch);
                    }
                    else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) {
                        this.readNumber();
                    }
                    else if (this.isIdent(this.ch)) {
                        this.readIdent();
                        if (this.was("{,") && json[0] === "{" && (token = this.tokens[this.tokens.length - 1])) {
                            token.json = token.text.indexOf(".") === -1;
                        }
                    }
                    else if (this.is("(){}[].,;:?")) {
                        this.tokens.push({
                            index: this.index,
                            text: this.ch,
                            json: (this.was(":[,") && this.is("{[")) || this.is("}]:,")
                        });
                        if (this.is("{["))
                            json.unshift(this.ch);
                        if (this.is("}]"))
                            json.shift();
                        this.index++;
                    }
                    else if (this.isWhitespace(this.ch)) {
                        this.index++;
                        continue;
                    }
                    else {
                        var ch2 = this.ch + this.peek();
                        var ch3 = ch2 + this.peek(2);
                        var fn = OPERATORS[this.ch];
                        var fn2 = OPERATORS[ch2];
                        var fn3 = OPERATORS[ch3];
                        if (fn3) {
                            this.tokens.push({ index: this.index, text: ch3, fn: fn3 });
                            this.index += 3;
                        }
                        else if (fn2) {
                            this.tokens.push({ index: this.index, text: ch2, fn: fn2 });
                            this.index += 2;
                        }
                        else if (fn) {
                            this.tokens.push({
                                index: this.index,
                                text: this.ch,
                                fn: fn,
                                json: (this.was("[,:") && this.is(" + -"))
                            });
                            this.index += 1;
                        }
                        else {
                            this.throwError("Unexpected next character ", this.index, this.index + 1);
                        }
                    }
                    this.lastCh = this.ch;
                }
                return this.tokens;
            };
            Lexer.prototype.is = function (chars) {
                return chars.indexOf(this.ch) !== -1;
            };
            Lexer.prototype.was = function (chars) {
                return chars.indexOf(this.lastCh) !== -1;
            };
            Lexer.prototype.peek = function (i) {
                var num = i || 1;
                return (this.index + num < this.text.length) ? this.text.charAt(this.index + num) : false;
            };
            Lexer.prototype.isNumber = function (ch) {
                return ("0" <= ch && ch <= "9");
            };
            Lexer.prototype.isWhitespace = function (ch) {
                return (ch === " " || ch === "\r" || ch === "\t" || ch === "\n" || ch === "\v" || ch === "\u00A0");
            };
            Lexer.prototype.isIdent = function (ch) {
                return ("a" <= ch && ch <= "z" || "A" <= ch && ch <= "Z" || "_" === ch || ch === "$" || ch === "@");
            };
            Lexer.prototype.isExpOperator = function (ch) {
                return (ch === "-" || ch === "+" || this.isNumber(ch));
            };
            Lexer.prototype.throwError = function (error, start, end) {
                end = end || this.index;
                var colStr = (isDefined(start) ? "s " + start + "-" + this.index + " [" + this.text.substring(start, end) + "]" : " " + end);
                throw $parseMinErr("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", error, colStr, this.text);
            };
            Lexer.prototype.readNumber = function () {
                var n = "";
                var start = this.index;
                while (this.index < this.text.length) {
                    var ch = lowercase(this.text.charAt(this.index));
                    if (ch === "." || this.isNumber(ch)) {
                        n += ch;
                    }
                    else {
                        var peekCh = this.peek();
                        if (ch === "e" && this.isExpOperator(peekCh)) {
                            n += ch;
                        }
                        else if (this.isExpOperator(ch) && peekCh && this.isNumber(peekCh) && n.charAt(n.length - 1) === "e") {
                            n += ch;
                        }
                        else if (this.isExpOperator(ch) && (!peekCh || !this.isNumber(peekCh)) && n.charAt(n.length - 1) === "e") {
                            this.throwError("Invalid exponent");
                        }
                        else {
                            break;
                        }
                    }
                    this.index++;
                }
                n = 1 * n;
                this.tokens.push({
                    index: start,
                    text: n,
                    json: true,
                    fn: function () {
                        return n;
                    }
                });
            };
            Lexer.prototype.readIdent = function () {
                var parser = this;
                var ident = "";
                var start = this.index;
                var lastDot, peekIndex, methodName, ch;
                while (this.index < this.text.length) {
                    ch = this.text.charAt(this.index);
                    if (ch === "." || this.isIdent(ch) || this.isNumber(ch)) {
                        if (ch === ".")
                            lastDot = this.index;
                        ident += ch;
                    }
                    else {
                        break;
                    }
                    this.index++;
                }
                if (lastDot) {
                    peekIndex = this.index;
                    while (peekIndex < this.text.length) {
                        ch = this.text.charAt(peekIndex);
                        if (ch === "(") {
                            methodName = ident.substr(lastDot - start + 1);
                            ident = ident.substr(0, lastDot - start);
                            this.index = peekIndex;
                            break;
                        }
                        if (this.isWhitespace(ch)) {
                            peekIndex++;
                        }
                        else {
                            break;
                        }
                    }
                }
                var token = {
                    index: start,
                    text: ident
                };
                if (OPERATORS.hasOwnProperty(ident)) {
                    token.fn = OPERATORS[ident];
                    token.json = OPERATORS[ident];
                }
                else {
                    var getter = getterFn(ident, this.options, this.text);
                    token.fn = extend(function (self, locals) {
                        return (getter(self, locals));
                    }, {
                        assign: function (self, value, locals) {
                            return setter(self, ident, value, parser.text, parser.options, locals);
                        }
                    });
                }
                this.tokens.push(token);
                if (methodName) {
                    this.tokens.push({
                        index: lastDot,
                        text: ".",
                        json: false
                    });
                    this.tokens.push({
                        index: lastDot + 1,
                        text: methodName,
                        json: false
                    });
                }
            };
            Lexer.prototype.readString = function (quote) {
                var start = this.index;
                this.index++;
                var value = "";
                var rawString = quote;
                var escape = false;
                while (this.index < this.text.length) {
                    var ch = this.text.charAt(this.index);
                    rawString += ch;
                    if (escape) {
                        if (ch === "u") {
                            var hex = this.text.substring(this.index + 1, this.index + 5);
                            if (!hex.match(/[\da-f]{4}/i))
                                this.throwError("Invalid unicode escape [\\u" + hex + "]");
                            this.index += 4;
                            value += String.fromCharCode(parseInt(hex, 16));
                        }
                        else {
                            var rep = ESCAPE[ch];
                            if (rep) {
                                value += rep;
                            }
                            else {
                                value += ch;
                            }
                        }
                        escape = false;
                    }
                    else if (ch === "\\") {
                        escape = true;
                    }
                    else if (ch === quote) {
                        this.index++;
                        this.tokens.push({
                            index: start,
                            text: rawString,
                            string: value,
                            json: true,
                            fn: function () {
                                return value;
                            }
                        });
                        return;
                    }
                    else {
                        value += ch;
                    }
                    this.index++;
                }
                this.throwError("Unterminated quote", start);
            };
            return Lexer;
        })();
        var Parser = (function () {
            function Parser(lexer, options) {
                this.lexer = lexer;
                this.options = options || { filters: {} };
            }
            Parser.prototype.parse = function (text) {
                this.text = text;
                this.tokens = this.lexer.lex(text);
                var value = this.statements();
                if (this.tokens.length !== 0) {
                    this.throwError("is an unexpected token", this.tokens[0]);
                }
                value.literal = !!value.literal;
                value.constant = !!value.constant;
                return value;
            };
            Parser.prototype.primary = function () {
                var primary;
                if (this.expect("(")) {
                    primary = this.filterChain();
                    this.consume(")");
                }
                else if (this.expect("[")) {
                    primary = this.arrayDeclaration();
                }
                else if (this.expect("{")) {
                    primary = this.object();
                }
                else {
                    var token = this.expect();
                    primary = token.fn;
                    if (!primary) {
                        this.throwError("not a primary expression", token);
                    }
                    if (token.json) {
                        primary.constant = true;
                        primary.literal = true;
                    }
                }
                var next, context;
                while ((next = this.expect("(", "[", "."))) {
                    if (next.text === "(") {
                        primary = this.functionCall(primary, context);
                        context = null;
                    }
                    else if (next.text === "[") {
                        context = primary;
                        primary = this.objectIndex(primary);
                    }
                    else if (next.text === ".") {
                        context = primary;
                        primary = this.fieldAccess(primary);
                    }
                    else {
                        this.throwError("IMPOSSIBLE");
                    }
                }
                return primary;
            };
            Parser.prototype.throwError = function (msg, token) {
                throw $parseMinErr("syntax", "WebRx Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", token.text, msg, (token.index + 1), this.text, this.text.substring(token.index));
            };
            Parser.prototype.peekToken = function () {
                if (this.tokens.length === 0)
                    throw $parseMinErr("ueoe", "Unexpected end of expression: {0}", this.text);
                return this.tokens[0];
            };
            Parser.prototype.peek = function (e1, e2, e3, e4) {
                if (this.tokens.length > 0) {
                    var token = this.tokens[0];
                    var t = token.text;
                    if (t === e1 || t === e2 || t === e3 || t === e4 || (!e1 && !e2 && !e3 && !e4)) {
                        return token;
                    }
                }
                return false;
            };
            Parser.prototype.expect = function (e1, e2, e3, e4) {
                var token = this.peek(e1, e2, e3, e4);
                if (token) {
                    this.tokens.shift();
                    return token;
                }
                return false;
            };
            Parser.prototype.consume = function (e1) {
                if (!this.expect(e1)) {
                    this.throwError("is unexpected, expecting [" + e1 + "]", this.peek());
                }
            };
            Parser.prototype.unaryFn = function (fn, right) {
                return extend(function (self, locals) {
                    return fn(self, locals, right);
                }, {
                    constant: right.constant
                });
            };
            Parser.prototype.ternaryFn = function (left, middle, right) {
                return extend(function (self, locals) {
                    return left(self, locals) ? middle(self, locals) : right(self, locals);
                }, {
                    constant: left.constant && middle.constant && right.constant
                });
            };
            Parser.prototype.binaryFn = function (left, fn, right) {
                return extend(function (self, locals) {
                    return fn(self, locals, left, right);
                }, {
                    constant: left.constant && right.constant
                });
            };
            Parser.prototype.statements = function () {
                var statements = [];
                while (true) {
                    if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]"))
                        statements.push(this.filterChain());
                    if (!this.expect(";")) {
                        return (statements.length === 1) ? statements[0] : function (self, locals) {
                            var value;
                            for (var i = 0; i < statements.length; i++) {
                                var statement = statements[i];
                                if (statement) {
                                    value = statement(self, locals);
                                }
                            }
                            return value;
                        };
                    }
                }
            };
            Parser.prototype.filterChain = function () {
                var left = this.expression();
                var token;
                while (true) {
                    if ((token = this.expect("|"))) {
                        left = this.binaryFn(left, token.fn, this.filter());
                    }
                    else {
                        return left;
                    }
                }
            };
            Parser.prototype.filter = function () {
                var token = this.expect();
                var fn = this.options.filters[token.text];
                var argsFn = [];
                while (true) {
                    if ((token = this.expect(":"))) {
                        argsFn.push(this.expression());
                    }
                    else {
                        var fnInvoke = function (self, locals, input) {
                            var args = [input];
                            for (var i = 0; i < argsFn.length; i++) {
                                args.push(argsFn[i](self, locals));
                            }
                            return fn.apply(self, args);
                        };
                        return function () {
                            return fnInvoke;
                        };
                    }
                }
            };
            Parser.prototype.expression = function () {
                return this.assignment();
            };
            Parser.prototype.assignment = function () {
                var left = this.ternary();
                var right;
                var token;
                if ((token = this.expect("="))) {
                    if (!left.assign) {
                        this.throwError("implies assignment but [" + this.text.substring(0, token.index) + "] can not be assigned to", token);
                    }
                    right = this.ternary();
                    return function (scope, locals) {
                        return left.assign(scope, right(scope, locals), locals);
                    };
                }
                return left;
            };
            Parser.prototype.ternary = function () {
                var left = this.logicalOR();
                var middle;
                var token;
                if ((token = this.expect("?"))) {
                    middle = this.ternary();
                    if ((token = this.expect(":"))) {
                        return this.ternaryFn(left, middle, this.ternary());
                    }
                    else {
                        this.throwError("expected :", token);
                    }
                }
                return left;
            };
            Parser.prototype.logicalOR = function () {
                var left = this.logicalAND();
                var token;
                while (true) {
                    if ((token = this.expect("||"))) {
                        left = this.binaryFn(left, token.fn, this.logicalAND());
                    }
                    else {
                        return left;
                    }
                }
            };
            Parser.prototype.logicalAND = function () {
                var left = this.equality();
                var token;
                if ((token = this.expect("&&"))) {
                    left = this.binaryFn(left, token.fn, this.logicalAND());
                }
                return left;
            };
            Parser.prototype.equality = function () {
                var left = this.relational();
                var token;
                if ((token = this.expect("==", "!=", "===", "!=="))) {
                    left = this.binaryFn(left, token.fn, this.equality());
                }
                return left;
            };
            Parser.prototype.relational = function () {
                var left = this.additive();
                var token;
                if ((token = this.expect("<", ">", "<=", ">="))) {
                    left = this.binaryFn(left, token.fn, this.relational());
                }
                return left;
            };
            Parser.prototype.additive = function () {
                var left = this.multiplicative();
                var token;
                while ((token = this.expect("+", "-"))) {
                    left = this.binaryFn(left, token.fn, this.multiplicative());
                }
                return left;
            };
            Parser.prototype.multiplicative = function () {
                var left = this.unary();
                var token;
                while ((token = this.expect("*", "/", "%"))) {
                    left = this.binaryFn(left, token.fn, this.unary());
                }
                return left;
            };
            Parser.prototype.unary = function () {
                var token;
                if (this.expect("+")) {
                    return this.primary();
                }
                else if ((token = this.expect("-"))) {
                    return this.binaryFn(ZERO, token.fn, this.unary());
                }
                else if ((token = this.expect("!"))) {
                    return this.unaryFn(token.fn, this.unary());
                }
                else {
                    return this.primary();
                }
            };
            Parser.prototype.fieldAccess = function (object) {
                var parser = this;
                var field = this.expect().text;
                var getter = getterFn(field, this.options, this.text);
                return extend(function (scope, locals, self) {
                    return getter(self || object(scope, locals));
                }, {
                    assign: function (scope, value, locals) {
                        return setter(object(scope, locals), field, value, parser.text, parser.options, locals);
                    }
                });
            };
            Parser.prototype.objectIndex = function (obj) {
                var parser = this;
                var indexFn = this.expression();
                this.consume("]");
                return extend(function (self, locals) {
                    var o = obj(self, locals), i = indexFn(self, locals), v, p;
                    if (!o)
                        return undefined;
                    var hooks = getRuntimeHooks(locals);
                    if (hooks && hooks.readIndexHook)
                        v = hooks.readIndexHook(o, i);
                    else
                        v = o[i];
                    v = ensureSafeObject(v, parser.text);
                    return v;
                }, {
                    assign: function (self, value, locals) {
                        var key = indexFn(self, locals);
                        var safe = ensureSafeObject(obj(self, locals), parser.text);
                        var hooks = getRuntimeHooks(locals);
                        if (hooks && hooks.writeIndexHook)
                            return hooks.writeIndexHook(safe, key, value);
                        return safe[key] = value;
                    }
                });
            };
            Parser.prototype.functionCall = function (fn, contextGetter) {
                if (this.options.disallowFunctionCalls)
                    this.throwError("Function calls are not allowed");
                var argsFn = [];
                if (this.peekToken().text !== ")") {
                    do {
                        argsFn.push(this.expression());
                    } while (this.expect(","));
                }
                this.consume(")");
                var parser = this;
                return function (scope, locals) {
                    var args = [];
                    var context = contextGetter ? contextGetter(scope, locals) : scope;
                    for (var i = 0; i < argsFn.length; i++) {
                        args.push(argsFn[i](scope, locals));
                    }
                    var fnPtr = fn(scope, locals, context) || noop;
                    ensureSafeObject(context, parser.text);
                    ensureSafeObject(fnPtr, parser.text);
                    var v = fnPtr.apply ? fnPtr.apply(context, args) : fnPtr(args[0], args[1], args[2], args[3], args[4]);
                    return ensureSafeObject(v, parser.text);
                };
            };
            Parser.prototype.arrayDeclaration = function () {
                var elementFns = [];
                var allConstant = true;
                if (this.peekToken().text !== "]") {
                    do {
                        if (this.peek("]")) {
                            break;
                        }
                        var elementFn = this.expression();
                        elementFns.push(elementFn);
                        if (!elementFn.constant) {
                            allConstant = false;
                        }
                    } while (this.expect(","));
                }
                this.consume("]");
                return extend(function (self, locals) {
                    var array = [];
                    for (var i = 0; i < elementFns.length; i++) {
                        array.push(elementFns[i](self, locals));
                    }
                    return array;
                }, {
                    literal: true,
                    constant: allConstant
                });
            };
            Parser.prototype.object = function () {
                var keyValues = [];
                var allConstant = true;
                if (this.peekToken().text !== "}") {
                    do {
                        if (this.peek("}")) {
                            break;
                        }
                        var token = this.expect(), key = token.string || token.text;
                        this.consume(":");
                        var value = this.expression();
                        keyValues.push({ key: key, value: value });
                        if (!value.constant) {
                            allConstant = false;
                        }
                    } while (this.expect(","));
                }
                this.consume("}");
                return extend(function (self, locals) {
                    var object = {};
                    for (var i = 0; i < keyValues.length; i++) {
                        var keyValue = keyValues[i];
                        object[keyValue.key] = keyValue.value(self, locals);
                    }
                    return object;
                }, {
                    literal: true,
                    constant: allConstant
                });
            };
            return Parser;
        })();
        function ZERO() {
            return 0;
        }
        ;
        function setter(obj, path, setValue, fullExp, options, locals) {
            var element = path.split("."), key;
            var i;
            var propertyObj;
            var hooks = getRuntimeHooks(locals);
            if (hooks) {
                for (i = 0; element.length > 1; i++) {
                    key = ensureSafeMemberName(element.shift(), fullExp);
                    propertyObj = hooks.readFieldHook ? hooks.readFieldHook(obj, key) : obj[key];
                    if (!propertyObj) {
                        propertyObj = {};
                        if (hooks.writeFieldHook)
                            hooks.writeFieldHook(obj, key, propertyObj);
                        else
                            obj[key] = propertyObj;
                    }
                    obj = propertyObj;
                }
            }
            else {
                for (i = 0; element.length > 1; i++) {
                    key = ensureSafeMemberName(element.shift(), fullExp);
                    propertyObj = obj[key];
                    if (!propertyObj) {
                        propertyObj = {};
                        obj[key] = propertyObj;
                    }
                    obj = propertyObj;
                }
            }
            key = ensureSafeMemberName(element.shift(), fullExp);
            if (hooks && hooks.writeFieldHook)
                hooks.writeFieldHook(obj, key, setValue);
            else
                obj[key] = setValue;
            return setValue;
        }
        var getterFnCache = {};
        function cspSafeGetterFn(key0, key1, key2, key3, key4, fullExp, options) {
            ensureSafeMemberName(key0, fullExp);
            ensureSafeMemberName(key1, fullExp);
            ensureSafeMemberName(key2, fullExp);
            ensureSafeMemberName(key3, fullExp);
            ensureSafeMemberName(key4, fullExp);
            return function (scope, locals) {
                var pathVal = (locals && locals.hasOwnProperty(key0)) ? locals : scope;
                var hooks = getRuntimeHooks(locals);
                if (hooks && hooks.readFieldHook) {
                    if (pathVal == null)
                        return pathVal;
                    pathVal = hooks.readFieldHook(pathVal, key0);
                    if (!key1)
                        return pathVal;
                    if (pathVal == null)
                        return undefined;
                    pathVal = hooks.readFieldHook(pathVal, key1);
                    if (!key2)
                        return pathVal;
                    if (pathVal == null)
                        return undefined;
                    pathVal = hooks.readFieldHook(pathVal, key2);
                    if (!key3)
                        return pathVal;
                    if (pathVal == null)
                        return undefined;
                    pathVal = hooks.readFieldHook(pathVal, key3);
                    if (!key4)
                        return pathVal;
                    if (pathVal == null)
                        return undefined;
                    pathVal = hooks.readFieldHook(pathVal, key4);
                    return pathVal;
                }
                if (pathVal == null)
                    return pathVal;
                pathVal = pathVal[key0];
                if (!key1)
                    return pathVal;
                if (pathVal == null)
                    return undefined;
                pathVal = pathVal[key1];
                if (!key2)
                    return pathVal;
                if (pathVal == null)
                    return undefined;
                pathVal = pathVal[key2];
                if (!key3)
                    return pathVal;
                if (pathVal == null)
                    return undefined;
                pathVal = pathVal[key3];
                if (!key4)
                    return pathVal;
                if (pathVal == null)
                    return undefined;
                pathVal = pathVal[key4];
                return pathVal;
            };
        }
        function simpleGetterFn1(key0, fullExp) {
            ensureSafeMemberName(key0, fullExp);
            return function (scope, locals) {
                scope = ((locals && locals.hasOwnProperty(key0)) ? locals : scope);
                if (scope == null)
                    return undefined;
                var hooks = getRuntimeHooks(locals);
                if (hooks && hooks.readFieldHook)
                    return hooks.readFieldHook(scope, key0);
                return scope[key0];
            };
        }
        function simpleGetterFn2(key0, key1, fullExp) {
            ensureSafeMemberName(key0, fullExp);
            ensureSafeMemberName(key1, fullExp);
            return function (scope, locals) {
                var hooks = getRuntimeHooks(locals);
                if (hooks && hooks.readFieldHook) {
                    scope = (locals && locals.hasOwnProperty(key0)) ? locals : scope;
                    if (scope == null)
                        return undefined;
                    scope = hooks.readFieldHook(scope, key0);
                    return scope == null ? undefined : hooks.readFieldHook(scope, key1);
                }
                scope = ((locals && locals.hasOwnProperty(key0)) ? locals : scope)[key0];
                return scope == null ? undefined : scope[key1];
            };
        }
        function getterFn(path, options, fullExp) {
            if (getterFnCache.hasOwnProperty(path)) {
                return getterFnCache[path];
            }
            var pathKeys = path.split("."), pathKeysLength = pathKeys.length, fn;
            if (pathKeysLength === 1) {
                fn = simpleGetterFn1(pathKeys[0], fullExp);
            }
            else if (pathKeysLength === 2) {
                fn = simpleGetterFn2(pathKeys[0], pathKeys[1], fullExp);
            }
            else {
                if (pathKeysLength < 6) {
                    fn = cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4], fullExp, options);
                }
                else {
                    fn = function (scope, locals) {
                        var _locals = {};
                        Object.keys(locals).forEach(function (x) { return _locals[x] = locals[x]; });
                        var i = 0, val;
                        do {
                            val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], fullExp, options)(scope, locals);
                            scope = val;
                            locals = {};
                            Object.keys(_locals).forEach(function (x) { return locals[x] = _locals[x]; });
                        } while (i < pathKeysLength);
                        return val;
                    };
                }
            }
            if (path !== "hasOwnProperty") {
                getterFnCache[path] = fn;
            }
            return fn;
        }
        function getRuntimeHooks(locals) {
            return locals !== undefined ? locals[hookField] : undefined;
        }
        compiler.getRuntimeHooks = getRuntimeHooks;
        function setRuntimeHooks(locals, hooks) {
            locals[hookField] = hooks;
        }
        compiler.setRuntimeHooks = setRuntimeHooks;
        function compileExpression(src, options, cache) {
            if (typeof src !== "string") {
                throw new TypeError("src must be a string, instead saw '" + typeof src + "'");
            }
            var lexer = new Lexer({});
            var parser = new Parser(lexer, options);
            if (!cache) {
                return parser.parse(src);
            }
            var cached = cache[src];
            if (!cached) {
                cached = cache[src] = parser.parse(src);
            }
            return cached;
        }
        compiler.compileExpression = compileExpression;
    })(compiler || (compiler = {}));
    var internal;
    (function (internal) {
        var exports = compiler;
        internal.expressionCompilerConstructor = exports;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
;
var wx;
(function (wx) {
    "use strict";
    var rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, rtagName = /<([\w:-]+)/, rhtml = /<|&#?\w+;/, rscriptType = /^$|\/(?:java|ecma)script/i, wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table>", "</table>"],
        td: [3, "<table>", "</table>"],
        _default: [0, "", ""]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    var supportsCreateHTMLDocument = (function () {
        var doc = document.implementation.createHTMLDocument("");
        if (!doc.body) {
            return false;
        }
        doc.body.innerHTML = "<form></form><form></form>";
        return doc.body.childNodes.length === 2;
    })();
    function merge(first, second) {
        var len = +second.length, j = 0, i = first.length;
        for (; j < len; j++) {
            first[i++] = second[j];
        }
        first.length = i;
        return first;
    }
    function buildFragment(elems, context) {
        var elem, tmp, tag, wrap, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
        for (; i < l; i++) {
            elem = elems[i];
            if (elem || elem === 0) {
                if (typeof elem === "object") {
                    merge(nodes, elem.nodeType ? [elem] : elem);
                }
                else if (!rhtml.test(elem)) {
                    nodes.push(context.createTextNode(elem));
                }
                else {
                    tmp = tmp || fragment.appendChild(context.createElement("div"));
                    tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                    wrap = wrapMap[tag] || wrapMap._default;
                    tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
                    j = wrap[0];
                    while (j--) {
                        tmp = tmp.lastChild;
                    }
                    merge(nodes, tmp.childNodes);
                    tmp = fragment.firstChild;
                    tmp.textContent = "";
                }
            }
        }
        fragment.textContent = "";
        i = 0;
        while ((elem = nodes[i++])) {
            if (elem.nodeType !== 1 || elem.tagName.toLowerCase() !== "script" || !rscriptType.test(elem.type || "")) {
                fragment.appendChild(elem);
            }
        }
        return fragment;
    }
    var HtmlTemplateEngine = (function () {
        function HtmlTemplateEngine() {
        }
        HtmlTemplateEngine.prototype.parse = function (data) {
            var context = supportsCreateHTMLDocument ? document.implementation.createHTMLDocument("") : document;
            var parsed = rsingleTag.exec(data);
            if (parsed) {
                return [context.createElement(parsed[1])];
            }
            parsed = buildFragment([data], context);
            var result = merge([], parsed.childNodes);
            return result;
        };
        return HtmlTemplateEngine;
    })();
    var internal;
    (function (internal) {
        internal.htmlTemplateEngineConstructor = HtmlTemplateEngine;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var MessageBus = (function () {
        function MessageBus() {
            this.messageBus = {};
            this.schedulerMappings = {};
        }
        MessageBus.prototype.listen = function (contract) {
            return this.setupSubjectIfNecessary(contract).skip(1);
        };
        MessageBus.prototype.isRegistered = function (contract) {
            return this.messageBus.hasOwnProperty(contract);
        };
        MessageBus.prototype.registerMessageSource = function (source, contract) {
            return source.subscribe(this.setupSubjectIfNecessary(contract));
        };
        MessageBus.prototype.sendMessage = function (message, contract) {
            this.setupSubjectIfNecessary(contract).onNext(message);
        };
        MessageBus.prototype.registerScheduler = function (scheduler, contract) {
            this.schedulerMappings[contract] = scheduler;
        };
        MessageBus.prototype.setupSubjectIfNecessary = function (contract) {
            var ret = this.messageBus[contract];
            if (ret == null) {
                ret = internal.createScheduledSubject(this.getScheduler(contract), null, new Rx.BehaviorSubject(undefined));
                this.messageBus[contract] = ret;
            }
            return ret;
        };
        MessageBus.prototype.getScheduler = function (contract) {
            var scheduler = this.schedulerMappings[contract];
            return scheduler || Rx.Scheduler.currentThread;
        };
        return MessageBus;
    })();
    wx.messageBus;
    Object.defineProperty(wx, "messageBus", {
        get: function () {
            return wx.injector.get(wx.res.messageBus);
        }
    });
    var internal;
    (function (internal) {
        internal.messageBusConstructor = MessageBus;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var StateActiveBinding = (function () {
        function StateActiveBinding(domManager, router) {
            this.priority = 5;
            this.domManager = domManager;
            this.router = router;
        }
        StateActiveBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("stateActive-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var compiled = this.domManager.compileBindingOptions(options, module);
            var exp;
            var observables = [];
            var opt = compiled;
            var paramsKeys = [];
            var stateName;
            var stateParams;
            var cssClass = "active";
            observables.push(wx.router.current.changed.startWith(wx.router.current()));
            if (typeof compiled === "function") {
                exp = compiled;
                observables.push(this.domManager.expressionToObservable(exp, ctx));
            }
            else {
                observables.push(this.domManager.expressionToObservable(opt.name, ctx));
                if (opt.params) {
                    Object.keys(opt.params).forEach(function (x) {
                        paramsKeys.push(x);
                        observables.push(_this.domManager.expressionToObservable(opt.params[x], ctx));
                    });
                }
                if (opt.cssClass) {
                    cssClass = this.domManager.evaluateExpression(opt.cssClass, ctx);
                }
            }
            state.cleanup.add(Rx.Observable.combineLatest(observables, function (_) { return wx.args2Array(arguments); }).subscribe(function (latest) {
                try {
                    var currentState = latest.shift();
                    stateName = wx.unwrapProperty(latest.shift());
                    stateParams = {};
                    for (var i = 0; i < paramsKeys.length; i++) {
                        stateParams[paramsKeys[i]] = wx.unwrapProperty(latest[i]);
                    }
                    var active = _this.router.includes(stateName, stateParams);
                    var classes = cssClass.split(/\s+/).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
                    if (classes.length) {
                        wx.toggleCssClass.apply(null, [el, active].concat(classes));
                    }
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                observables = null;
                compiled = null;
                stateName = null;
                stateParams = null;
                opt = null;
                paramsKeys = null;
            }));
        };
        StateActiveBinding.prototype.configure = function (options) {
        };
        return StateActiveBinding;
    })();
    var internal;
    (function (internal) {
        internal.stateActiveBindingConstructor = StateActiveBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var StateRefBinding = (function () {
        function StateRefBinding(domManager, router) {
            this.priority = 5;
            this.domManager = domManager;
            this.router = router;
        }
        StateRefBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("stateRef-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var isAnchor = el.tagName.toLowerCase() === "a";
            var anchor = isAnchor ? el : undefined;
            var compiled = this.domManager.compileBindingOptions(options, module);
            var exp;
            var observables = [];
            var opt = compiled;
            var paramsKeys = [];
            var stateName;
            var stateParams;
            if (typeof compiled === "function") {
                exp = compiled;
                observables.push(this.domManager.expressionToObservable(exp, ctx));
            }
            else {
                observables.push(this.domManager.expressionToObservable(opt.name, ctx));
                if (opt.params) {
                    Object.keys(opt.params).forEach(function (x) {
                        paramsKeys.push(x);
                        observables.push(_this.domManager.expressionToObservable(opt.params[x], ctx));
                    });
                }
            }
            state.cleanup.add(Rx.Observable.combineLatest(observables, function (_) {
                return wx.args2Array(arguments);
            }).subscribe(function (latest) {
                try {
                    stateName = wx.unwrapProperty(latest.shift());
                    stateParams = {};
                    for (var i = 0; i < paramsKeys.length; i++) {
                        stateParams[paramsKeys[i]] = wx.unwrapProperty(latest[i]);
                    }
                    if (anchor != null) {
                        anchor.href = _this.router.url(stateName, stateParams);
                    }
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
            state.cleanup.add(Rx.Observable.fromEvent(el, "click").subscribe(function (e) {
                e.preventDefault();
                _this.router.go(stateName, stateParams, { location: true });
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
                observables = null;
                compiled = null;
                stateName = null;
                stateParams = null;
                opt = null;
                paramsKeys = null;
            }));
        };
        StateRefBinding.prototype.configure = function (options) {
        };
        return StateRefBinding;
    })();
    var internal;
    (function (internal) {
        internal.stateRefBindingConstructor = StateRefBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var ViewBinding = (function () {
        function ViewBinding(domManager, router) {
            this.priority = 1000;
            this.controlsDescendants = true;
            this.domManager = domManager;
            this.router = router;
        }
        ViewBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
            var _this = this;
            if (node.nodeType !== 1)
                internal.throwError("view-binding only operates on elements!");
            if (options == null)
                internal.throwError("invalid binding-options!");
            var el = node;
            var compiled = this.domManager.compileBindingOptions(options, module);
            var viewName = this.domManager.evaluateExpression(compiled, ctx);
            var currentConfig;
            var cleanup;
            var enterAnimation = undefined;
            var leaveAnimation = undefined;
            function doCleanup() {
                if (cleanup) {
                    cleanup.dispose();
                    cleanup = null;
                }
            }
            if (viewName == null || typeof viewName !== "string")
                internal.throwError("views must be named!");
            state.cleanup.add(this.router.current.changed.startWith(this.router.current()).subscribe(function (newState) {
                try {
                    doCleanup();
                    cleanup = new Rx.CompositeDisposable();
                    var config = _this.router.getViewComponent(viewName);
                    if (config != null) {
                        if (!wx.isEqual(currentConfig, config)) {
                            if (config.animations != null) {
                                enterAnimation = config.animations.enter;
                                if (typeof enterAnimation === "string") {
                                    enterAnimation = module.animation(enterAnimation);
                                }
                                leaveAnimation = config.animations.leave;
                                if (typeof leaveAnimation === "string") {
                                    leaveAnimation = module.animation(leaveAnimation);
                                }
                            }
                            cleanup.add(_this.applyTemplate(config.component, config.params, enterAnimation, leaveAnimation, el, ctx, module));
                            currentConfig = config;
                        }
                    }
                    else {
                        cleanup.add(_this.applyTemplate(null, null, enterAnimation, leaveAnimation, el, ctx, module));
                        enterAnimation = undefined;
                        leaveAnimation = undefined;
                        currentConfig = {};
                    }
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            }));
            state.cleanup.add(Rx.Disposable.create(function () {
                node = null;
                options = null;
                ctx = null;
                state = null;
            }));
        };
        ViewBinding.prototype.configure = function (options) {
        };
        ViewBinding.prototype.applyTemplate = function (componentName, componentParams, enterAnimation, leaveAnimation, el, ctx, module) {
            var self = this;
            var oldElements = wx.nodeChildrenToArray(el);
            var combined = [];
            var obs;
            function removeOldElements() {
                oldElements.forEach(function (x) {
                    self.domManager.cleanNode(x);
                    el.removeChild(x);
                });
            }
            function instantiateComponent(animation) {
                ctx.$componentParams = componentParams;
                var container = document.createElement("div");
                var binding = wx.formatString("component: { name: '{0}', params: $componentParams }", componentName);
                container.setAttribute("data-bind", binding);
                if (animation != null)
                    animation.prepare(container);
                el.appendChild(container);
                self.domManager.applyBindings(ctx, container);
            }
            if (oldElements.length > 0) {
                if (leaveAnimation) {
                    leaveAnimation.prepare(oldElements);
                    obs = leaveAnimation.run(oldElements).continueWith(function () { return leaveAnimation.complete(oldElements); }).continueWith(removeOldElements);
                }
                else {
                    obs = Rx.Observable.startDeferred(removeOldElements);
                }
                combined.push(obs);
            }
            if (componentName != null) {
                obs = Rx.Observable.startDeferred(function () { return instantiateComponent(enterAnimation); });
                if (enterAnimation) {
                    obs = obs.continueWith(enterAnimation.run(el.childNodes)).continueWith(function () { return enterAnimation.complete(el.childNodes); });
                }
                combined.push(obs);
            }
            if (combined.length > 1)
                obs = Rx.Observable.combineLatest(combined, wx.noop).take(1);
            else if (combined.length === 1)
                obs = combined[0].take(1);
            else
                obs = null;
            return obs ? (obs.subscribe() || Rx.Disposable.empty) : Rx.Disposable.empty;
        };
        return ViewBinding;
    })();
    var internal;
    (function (internal) {
        internal.viewBindingConstructor = ViewBinding;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var reEscape = /[\-\[\]{}()+?.,\\\^$|#\s]/g;
    var reParam = /([:*])(\w+)/g;
    var RouteMatcher = (function () {
        function RouteMatcher(route, rules) {
            var _this = this;
            this.route = route;
            this.rules = rules;
            this.params = [];
            var re = route;
            if (typeof route === "string") {
                re = re.replace(reEscape, "\\$&");
                re = re.replace(reParam, function (_, mode, name) {
                    _this.params.push(name);
                    return mode === ":" ? "([^/]*)" : "(.*)";
                });
                re = new RegExp("^" + re + "$");
                this.parse = function (url) {
                    var i = 0;
                    var param, value;
                    var params = {};
                    var matches = url.match(re);
                    if (!matches) {
                        return null;
                    }
                    while (i < _this.params.length) {
                        param = _this.params[i++];
                        value = matches[i];
                        if (rules && param in rules && !_this.validateRule(rules[param], value)) {
                            return null;
                        }
                        params[param] = value;
                    }
                    return params;
                };
                this.stringify = function (params) {
                    params = params || {};
                    var param, re;
                    var result = route;
                    for (param in params) {
                        re = new RegExp("[:*]" + param + "\\b");
                        result = result.replace(re, params[param]);
                    }
                    return result.replace(reParam, "");
                };
            }
            else {
                this.parse = function (url) {
                    var matches = url.match(re);
                    return matches && { captures: matches.slice(1) };
                };
                this.stringify = function () { return ""; };
            }
        }
        RouteMatcher.prototype.stripTrailingSlash = function (route) {
            if (route.length === 0 || route === "/" || route.lastIndexOf("/") !== route.length - 1)
                return route;
            return route.substr(0, route.length - 1);
        };
        Object.defineProperty(RouteMatcher.prototype, "isAbsolute", {
            get: function () {
                return this.route.indexOf("/") === 0;
            },
            enumerable: true,
            configurable: true
        });
        RouteMatcher.prototype.concat = function (route) {
            var other = route;
            var a = this.stripTrailingSlash(this.route);
            var b = this.stripTrailingSlash(other.route);
            var rules = null;
            if (other.rules) {
                if (this.rules) {
                    Object.keys(this.rules).forEach(function (rule) {
                        if (other.rules.hasOwnProperty(rule)) {
                            wx.internal.throwError("route '{0}' and '{1}' have conflicting rule '{2}", a, b, rule);
                        }
                    });
                    rules = wx.extend(this.rules, wx.extend(other.rules, {}));
                }
                else {
                    rules = wx.extend(other.rules, {});
                }
            }
            else if (this.rules) {
                rules = wx.extend(this.rules, {});
            }
            if (a === "/")
                a = "";
            return wx.route(a + "/" + b, rules);
        };
        RouteMatcher.prototype.validateRule = function (rule, value) {
            var type = this.toString.call(rule).charAt(8);
            return type === "R" ? rule.test(value) : type === "F" ? rule(value) : rule == value;
        };
        return RouteMatcher;
    })();
    function route(route, rules) {
        return new RouteMatcher(route, rules);
    }
    wx.route = route;
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    var Router = (function () {
        function Router(domManager) {
            var _this = this;
            this.current = wx.property();
            this.states = {};
            this.pathSeparator = ".";
            this.parentPathDirective = "^";
            this.rootStateName = "$";
            this.validPathRegExp = /^[a-zA-Z]([\w-_]*$)/;
            this.domManager = domManager;
            this.reset(false);
            wx.app.history.onPopState.subscribe(function (e) {
                try {
                    if (e && e.state) {
                        var state = e.state;
                        var stateName = state.stateName;
                        if (stateName != null) {
                            _this.go(stateName, state.params, { location: false });
                            wx.app.title(state.title);
                        }
                    }
                }
                catch (e) {
                    wx.app.defaultExceptionHandler.onNext(e);
                }
            });
            wx.app.title.changed.subscribe(function (x) {
                document.title = x;
                if (_this.current() != null)
                    _this.replaceHistoryState(_this.current(), x);
            });
        }
        Router.prototype.state = function (config) {
            this.registerStateInternal(config);
            return this;
        };
        Router.prototype.updateCurrentStateParams = function (withParamsAction) {
            var _current = this.current();
            withParamsAction(_current.params);
            this.replaceHistoryState(_current, wx.app.title());
        };
        Router.prototype.go = function (to, params, options) {
            to = this.mapPath(to);
            if (this.states[to] == null)
                internal.throwError("state '{0}' is not registered", to);
            this.activateState(to, params, options);
        };
        Router.prototype.get = function (state) {
            return this.states[state];
        };
        Router.prototype.is = function (state, params, options) {
            var _current = this.current();
            var isActive = _current.name === state;
            params = params || {};
            if (isActive) {
                var currentParamsKeys = Object.keys(_current.params);
                var paramsKeys = Object.keys(params);
                if (currentParamsKeys.length === paramsKeys.length) {
                    for (var i = 0; i < paramsKeys.length; i++) {
                        if (_current.params[paramsKeys[i]] != params[paramsKeys[i]]) {
                            isActive = false;
                            break;
                        }
                    }
                }
                else {
                    isActive = false;
                }
            }
            return isActive;
        };
        Router.prototype.includes = function (state, params, options) {
            var _current = this.current();
            var isActive = _current.name.indexOf(state) === 0;
            params = params || {};
            if (isActive) {
                var currentParamsKeys = Object.keys(_current.params);
                var paramsKeys = Object.keys(params);
                paramsKeys = paramsKeys.length <= currentParamsKeys.length ? paramsKeys : currentParamsKeys;
                for (var i = 0; i < paramsKeys.length; i++) {
                    if (_current.params[paramsKeys[i]] != params[paramsKeys[i]]) {
                        isActive = false;
                        break;
                    }
                }
            }
            return isActive;
        };
        Router.prototype.url = function (state, params) {
            state = this.mapPath(state);
            var route = this.getAbsoluteRouteForState(state);
            if (route != null)
                return route.stringify(params);
            return null;
        };
        Router.prototype.reset = function (enterRootState) {
            if (enterRootState === void 0) { enterRootState = true; }
            this.states = {};
            this.root = this.registerStateInternal({
                name: this.rootStateName,
                url: wx.route("/")
            });
            if (enterRootState)
                this.go(this.rootStateName, {}, { location: 2 /* replace */ });
        };
        Router.prototype.sync = function (url) {
            if (url == null)
                url = wx.app.history.location.pathname;
            var keys = Object.keys(this.states);
            var length = keys.length;
            var params;
            for (var i = 0; i < length; i++) {
                var state = this.states[keys[i]];
                var route = this.getAbsoluteRouteForState(state.name);
                if ((params = route.parse(url)) != null) {
                    this.go(state.name, params, { location: 2 /* replace */ });
                    return;
                }
            }
            if (this.current() == null)
                this.reload();
        };
        Router.prototype.reload = function () {
            var state;
            var params;
            if (this.current() != null) {
                state = this.current().name;
                params = this.current().params;
            }
            else {
                state = this.rootStateName;
                params = {};
            }
            this.go(state, params, { force: true, location: 2 /* replace */ });
        };
        Router.prototype.getViewComponent = function (viewName) {
            var _current = this.current();
            var result = undefined;
            if (_current.views != null) {
                var component = _current.views[viewName];
                var stateParams = {};
                if (component != null) {
                    result = {};
                    if (typeof component === "object") {
                        result.component = component.component;
                        result.params = component.params || {};
                        result.animations = component.animations;
                    }
                    else {
                        result.component = component;
                        result.params = {};
                        result.animations = undefined;
                    }
                    var parameterNames = this.getViewParameterNamesFromStateConfig(viewName, result.component);
                    parameterNames.forEach(function (x) {
                        if (_current.params.hasOwnProperty(x)) {
                            stateParams[x] = _current.params[x];
                        }
                    });
                    result.params = wx.extend(stateParams, result.params);
                }
            }
            return result;
        };
        Router.prototype.registerStateInternal = function (state) {
            var _this = this;
            var parts = state.name.split(this.pathSeparator);
            if (state.name !== this.rootStateName) {
                if (parts.forEach(function (path) {
                    if (!_this.validPathRegExp.test(path)) {
                        internal.throwError("invalid state-path '{0}' (a state-path must start with a character, optionally followed by one or more alphanumeric characters, dashes or underscores)");
                    }
                }))
                    ;
            }
            state = wx.extend(state, {});
            this.states[state.name] = state;
            if (state.url != null) {
                if (typeof state.url === "string") {
                    state.url = wx.route(state.url);
                }
            }
            else {
                if (state.name !== this.rootStateName)
                    state.url = wx.route(parts[parts.length - 1]);
                else
                    state.url = wx.route("/");
            }
            if (state.name === this.rootStateName)
                this.root = state;
            return state;
        };
        Router.prototype.pushHistoryState = function (state, title) {
            var hs = {
                stateName: state.name,
                params: state.params,
                title: title != null ? title : document.title
            };
            wx.app.history.pushState(hs, "", state.url);
        };
        Router.prototype.replaceHistoryState = function (state, title) {
            var hs = {
                stateName: state.name,
                params: state.params,
                title: title != null ? title : document.title
            };
            wx.app.history.replaceState(hs, "", state.url);
        };
        Router.prototype.mapPath = function (path) {
            if (path.indexOf(this.pathSeparator) === 0) {
                return this.current().name + path;
            }
            else if (path.indexOf(this.parentPathDirective) === 0) {
                var parent = this.current().name;
                if (parent === this.rootStateName)
                    return parent;
                var parts = parent.split(this.pathSeparator);
                for (var i = parts.length - 1; i > 0; i--) {
                    var tmp = parts.slice(0, i).join(this.pathSeparator);
                    if (this.get(tmp) || this.get(tmp + path.substr(1))) {
                        path = tmp + path.substr(1);
                        return path;
                    }
                }
                path = this.rootStateName + path.substr(1);
                return path;
            }
            return path;
        };
        Router.prototype.getStateHierarchy = function (name) {
            var parts = name.split(this.pathSeparator);
            var stateName = "";
            var result = [];
            var state;
            if (name !== this.rootStateName)
                result.push(this.root);
            for (var i = 0; i < parts.length; i++) {
                if (i > 0)
                    stateName += this.pathSeparator + parts[i];
                else
                    stateName = parts[i];
                state = this.states[stateName];
                if (state == null) {
                    state = {
                        name: stateName,
                        url: wx.route(stateName)
                    };
                }
                result.push(state);
            }
            return result;
        };
        Router.prototype.getAbsoluteRouteForState = function (name, hierarchy) {
            hierarchy = hierarchy != null ? hierarchy : this.getStateHierarchy(name);
            var result = null;
            hierarchy.forEach(function (state) {
                if (result != null) {
                    var route = state.url;
                    if (!route.isAbsolute)
                        result = result.concat(state.url);
                    else
                        result = route;
                }
                else {
                    result = state.url;
                }
            });
            return result;
        };
        Router.prototype.activateState = function (to, params, options) {
            var hierarchy = this.getStateHierarchy(to);
            var stateViews = {};
            var stateParams = {};
            hierarchy.forEach(function (state) {
                if (state.views != null) {
                    wx.extend(state.views, stateViews);
                }
                if (state.params != null) {
                    wx.extend(state.params, stateParams);
                }
            });
            if (params) {
                wx.extend(params, stateParams);
            }
            var route = this.getAbsoluteRouteForState(to, hierarchy);
            var state = wx.extend(this.states[to], {});
            state.url = route.stringify(params);
            state.views = stateViews;
            state.params = stateParams;
            var _current = this.current();
            if ((options && options.force) || _current == null || _current.name !== to || !wx.isEqual(_current.params, state.params)) {
                if (_current != null && _current.views != null && state.views != null) {
                    Object.keys(_current.views).forEach(function (x) {
                        if (!state.views.hasOwnProperty(x)) {
                            state.views[x] = null;
                        }
                    });
                }
                if (options && options.location) {
                    if (options.location === 2 /* replace */)
                        this.replaceHistoryState(state, wx.app.title());
                    else
                        this.pushHistoryState(state, wx.app.title());
                }
                if (_current != null) {
                    if (_current.onLeave)
                        _current.onLeave(this.get(_current.name), _current.params);
                }
                this.current(state);
                if (state.onEnter)
                    state.onEnter(this.get(state.name), params);
            }
        };
        Router.prototype.getViewParameterNamesFromStateConfig = function (view, component) {
            var hierarchy = this.getStateHierarchy(this.current().name);
            var stateParams = {};
            var result = [];
            var config;
            var index = -1;
            for (var i = hierarchy.length; i--; i >= 0) {
                config = hierarchy[i];
                if (config.views && config.views[view]) {
                    var other = config.views[view];
                    if (typeof other === "object") {
                        other = other.component;
                    }
                    if (other === component) {
                        index = i;
                    }
                }
            }
            if (index !== -1) {
                config = hierarchy[index];
                hierarchy = hierarchy.slice(0, index + 1);
                hierarchy.forEach(function (state) {
                    if (state.params != null) {
                        wx.extend(state.params, stateParams);
                    }
                });
                result = Object.keys(stateParams);
                result = result.concat(config.url.params);
            }
            return result;
        };
        return Router;
    })();
    wx.router;
    Object.defineProperty(wx, "router", {
        get: function () {
            return wx.injector.get(wx.res.router);
        }
    });
    var internal;
    (function (internal) {
        internal.routerConstructor = Router;
    })(internal = wx.internal || (wx.internal = {}));
})(wx || (wx = {}));
var wx;
(function (wx) {
    "use strict";
    wx.injector.register(wx.res.expressionCompiler, wx.internal.expressionCompilerConstructor).register(wx.res.htmlTemplateEngine, [wx.internal.htmlTemplateEngineConstructor], true).register(wx.res.domManager, [wx.res.expressionCompiler, wx.internal.domManagerConstructor], true).register(wx.res.router, [wx.res.domManager, wx.internal.routerConstructor], true).register(wx.res.messageBus, [wx.internal.messageBusConstructor], true);
    wx.injector.register("wx.bindings.module", [wx.res.domManager, wx.internal.moduleBindingConstructor], true).register("wx.bindings.command", [wx.res.domManager, wx.internal.commandBindingConstructor], true).register("wx.bindings.if", [wx.res.domManager, wx.internal.ifBindingConstructor], true).register("wx.bindings.with", [wx.res.domManager, wx.internal.withBindingConstructor], true).register("wx.bindings.notif", [wx.res.domManager, wx.internal.notifBindingConstructor], true).register("wx.bindings.css", [wx.res.domManager, wx.internal.cssBindingConstructor], true).register("wx.bindings.attr", [wx.res.domManager, wx.internal.attrBindingConstructor], true).register("wx.bindings.style", [wx.res.domManager, wx.internal.styleBindingConstructor], true).register("wx.bindings.text", [wx.res.domManager, wx.internal.textBindingConstructor], true).register("wx.bindings.html", [wx.res.domManager, wx.internal.htmlBindingConstructor], true).register("wx.bindings.visible", [wx.res.domManager, wx.internal.visibleBindingConstructor], true).register("wx.bindings.hidden", [wx.res.domManager, wx.internal.hiddenBindingConstructor], true).register("wx.bindings.enabled", [wx.res.domManager, wx.internal.enableBindingConstructor], true).register("wx.bindings.disabled", [wx.res.domManager, wx.internal.disableBindingConstructor], true).register("wx.bindings.foreach", [wx.res.domManager, wx.internal.forEachBindingConstructor], true).register("wx.bindings.event", [wx.res.domManager, wx.internal.eventBindingConstructor], true).register("wx.bindings.keyPress", [wx.res.domManager, wx.internal.keyPressBindingConstructor], true).register("wx.bindings.textInput", [wx.res.domManager, wx.internal.textInputBindingConstructor], true).register("wx.bindings.checked", [wx.res.domManager, wx.internal.checkedBindingConstructor], true).register("wx.bindings.selectedValue", [wx.res.domManager, wx.internal.selectedValueBindingConstructor], true).register("wx.bindings.component", [wx.res.domManager, wx.internal.componentBindingConstructor], true).register("wx.bindings.value", [wx.res.domManager, wx.internal.valueBindingConstructor], true).register("wx.bindings.hasFocus", [wx.res.domManager, wx.internal.hasFocusBindingConstructor], true).register("wx.bindings.view", [wx.res.domManager, wx.res.router, wx.internal.viewBindingConstructor], true).register("wx.bindings.sref", [wx.res.domManager, wx.res.router, wx.internal.stateRefBindingConstructor], true).register("wx.bindings.sactive", [wx.res.domManager, wx.res.router, wx.internal.stateActiveBindingConstructor], true);
    wx.injector.register("wx.components.radiogroup", [wx.res.htmlTemplateEngine, wx.internal.radioGroupComponentConstructor]).register("wx.components.select", [wx.res.htmlTemplateEngine, wx.internal.selectComponentConstructor]);
    wx.app.binding("module", "wx.bindings.module").binding("css", "wx.bindings.css").binding("attr", "wx.bindings.attr").binding("style", "wx.bindings.style").binding("command", "wx.bindings.command").binding("if", "wx.bindings.if").binding("with", "wx.bindings.with").binding("ifnot", "wx.bindings.notif").binding("text", "wx.bindings.text").binding("html", "wx.bindings.html").binding("visible", "wx.bindings.visible").binding("hidden", "wx.bindings.hidden").binding("disabled", "wx.bindings.disabled").binding("enabled", "wx.bindings.enabled").binding("foreach", "wx.bindings.foreach").binding("event", "wx.bindings.event").binding(["keyPress", "keypress"], "wx.bindings.keyPress").binding(["textInput", "textinput"], "wx.bindings.textInput").binding("checked", "wx.bindings.checked").binding("selectedValue", "wx.bindings.selectedValue").binding("component", "wx.bindings.component").binding("value", "wx.bindings.value").binding(["hasFocus", "hasfocus"], "wx.bindings.hasFocus").binding("view", "wx.bindings.view").binding(["sref", "stateRef", "stateref"], "wx.bindings.sref").binding(["sactive", "stateActive", "stateactive"], "wx.bindings.sactive");
    wx.app.component("wx-radiogroup", { resolve: "wx.components.radiogroup" }).component("wx-select", { resolve: "wx.components.select" });
})(wx || (wx = {}));
var wx;
(function (wx) {
    wx.version = '0.9.83';
})(wx || (wx = {}));
//# sourceMappingURL=web.rx.js.map

/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.17 Copyright (c) 2010-2015, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var requirejs, require, define;
(function (global) {
    var req, s, head, baseElement, dataMain, src,
        interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = '2.1.17',
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
        //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
                      /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',
        //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === 'object' && value &&
                        !isArray(value) && !isFunction(value) &&
                        !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    function defaultOnError(err) {
        throw err;
    }

    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite an existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof require !== 'undefined' && !isFunction(require)) {
        //assume it is a config object.
        cfg = require;
        require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers,
            checkLoadedTimeoutId,
            config = {
                //Defaults. Do not set a default for map
                //config to speed up normalize(), which
                //will run faster if there is no default.
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            registry = {},
            //registry of just enabled modules, to speed
            //cycle breaking code when lots of modules
            //are registered, but not activated.
            enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            defined = {},
            urlFetched = {},
            bundlesMap = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; i < ary.length; i++) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && ary[2] === '..') || ary[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex,
                foundMap, foundI, foundStarMap, starI, normalizedBaseParts,
                baseParts = (baseName && baseName.split('/')),
                map = config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // If wanting node ID compatibility, strip .js from end
                // of IDs. Have to do this here, and not in nameToUrl
                // because node allows either .js or non .js to map
                // to same file.
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                // Starts with a '.' so need the baseName
                if (name[0].charAt(0) === '.' && baseParts) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = normalizedBaseParts.concat(name);
                }

                trimDots(name);
                name = name.join('/');
            }

            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split('/');

                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop;
                                }
                            }
                        }
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            // If the name points to a package's name, use
            // the package main instead.
            pkgMain = getOwn(config.pkgs, name);

            return pkgMain ? pkgMain : name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name &&
                            scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);

                //Custom require that does not do map translation, since
                //ID is "absolute", already mapped/resolved.
                context.makeRequire(null, {
                    skipMap: true
                })([id]);

                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        // If nested plugin references, then do not try to
                        // normalize, as it will not normalize correctly. This
                        // places a restriction on resourceIds, and the longer
                        // term solution is not to normalize until plugins are
                        // loaded and all normalizations to allow for async
                        // loading of a loader plugin. But for now, fixes the
                        // common uses. Details in #1131
                        normalizedName = name.indexOf('!') === -1 ?
                                         normalize(name, parentName, applyMap) :
                                         name;
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ?
                     '_unnormalized' + (unnormalizedCounter += 1) :
                     '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ?
                        prefix + '!' + normalizedName :
                        normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(defined, id) &&
                    (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === 'error') {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                //Array splice in the values since the context code has a
                //local var ref to defQueue, so cannot just reassign the one
                //on context.
                apsp.apply(defQueue,
                           [defQueue.length, 0].concat(globalDefQueue));
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function (mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return (mod.require = context.makeRequire(mod.map));
                }
            },
            'exports': function (mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return (defined[mod.map.id] = mod.exports);
                    } else {
                        return (mod.exports = defined[mod.map.id] = {});
                    }
                }
            },
            'module': function (mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return (mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function () {
                            return  getOwn(config.config, mod.map.id) || {};
                        },
                        exports: mod.exports || (mod.exports = {})
                    });
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var err, usingPathFallback,
                waitInterval = config.waitSeconds * 1000,
                //It is possible to disable the wait interval by using waitSeconds of 0.
                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function (mod) {
                var map = mod.map,
                    modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return (needCycleCheck = false);
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function (i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function () {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = (new Date()).getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function () {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err, cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    this.fetch();
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error. However,
                            //only do it for define()'d  modules. require
                            //errbacks should not be called for failures in
                            //their callbacks (#699). However if a global
                            //onError is set, use that.
                            if ((this.events.error && this.map.isDefine) ||
                                req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            // Favor return value over exports. If node/cjs in play,
                            // then will not have a return value anyway. Favor
                            // module.exports assignment over exports object.
                            if (this.map.isDefine && exports === undefined) {
                                cjsModule = this.module;
                                if (cjsModule) {
                                    exports = cjsModule.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                return onError((this.error = err));
                            }

                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;

                            if (req.onResourceLoad) {
                                req.onResourceLoad(context, this.map, this.depMaps);
                            }
                        }

                        //Clean up
                        cleanRegistry(id);

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }

                }
            },

            callPlugin: function () {
                var map = this.map,
                    id = map.id,
                    //Map already normalized the prefix.
                    pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod,
                        bundleId = getOwn(bundlesMap, this.map.id),
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                            enableBuildCallback: true
                        });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name,
                                                      this.map.parentMap);
                        on(normalizedMap,
                            'defined', bind(this, function (value) {
                                this.init([], function () { return value; }, null, {
                                    enabled: true,
                                    ignore: true
                                });
                            }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () { return value; }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError('fromtexteval',
                                             'fromText eval for ' + id +
                                            ' failed: ' + e,
                                             e,
                                             [id]));
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function () {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap,
                                               (this.map.isDefine ? this.map : this.map.parentMap),
                                               false,
                                               !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', bind(this, this.errback));
                        } else if (this.events.error) {
                            // No direct errback on this module, but something
                            // else is listening for errors, so be sure to
                            // propagate the error correctly.
                            on(depMap, 'error', bind(this, function(err) {
                                this.emit('error', err);
                            }));
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function (name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function (name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' + args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
        }

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                //Save off the paths since they require special processing,
                //they are additive.
                var shim = config.shim,
                    objs = {
                        paths: true,
                        bundles: true,
                        config: true,
                        map: true
                    };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (!config[prop]) {
                            config[prop] = {};
                        }
                        mixin(config[prop], value, true, true);
                    } else {
                        config[prop] = value;
                    }
                });

                //Reverse map the bundles
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function (value, prop) {
                        each(value, function (v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop;
                            }
                        });
                    });
                }

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name;

                        pkgObj = typeof pkgObj === 'string' ? { name: pkgObj } : pkgObj;

                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            config.paths[name] = pkgObj.location;
                        }

                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main')
                                     .replace(currDirRegExp, '')
                                     .replace(jsSuffixRegExp, '');
                    });
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function (value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || (value.exports && getGlobal(value.exports));
                }
                return fn;
            },

            makeRequire: function (relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' +
                                        id +
                                        '" has not been loaded yet for context: ' +
                                        contextName +
                                        (relMap ? '' : '. Use require([])')));
                        }
                        return defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function (moduleNamePlusExt) {
                        var ext,
                            index = moduleNamePlusExt.lastIndexOf('.'),
                            segment = moduleNamePlusExt.split('/')[0],
                            isRelative = segment === '.' || segment === '..';

                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt,
                                                relMap && relMap.id, true), ext,  true);
                    },

                    defined: function (id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function (id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        removeScript(id);

                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse(defQueue, function(args, i) {
                            if(args[0] === id) {
                                defQueue.splice(i, 1);
                            }
                        });

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function (depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName) {
                var found, args, mod,
                    shim = getOwn(config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine',
                                             'No define call for ' + moduleName,
                                             null,
                                             [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url,
                    parentPath, bundleId,
                    pkgMain = getOwn(config.pkgs, moduleName);

                if (pkgMain) {
                    moduleName = pkgMain;
                }

                bundleId = getOwn(bundlesMap, moduleName);

                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt);
                }

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = config.paths;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');

                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += (ext || (/^data\:|\?/.test(url) || skipExt ? '' : '.js'));
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                }

                return config.urlArgs ? url +
                                        ((url.indexOf('?') === -1 ? '?' : '&') +
                                         config.urlArgs) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' ||
                        (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function (evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    return onError(makeError('scripterror', 'Script error for: ' + data.id, evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) { fn(); };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!require) {
        require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each([
        'toUrl',
        'undef',
        'defined',
        'specified'
    ], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = defaultOnError;

    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        return node;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
                    //Check if node.attachEvent is artificially added by custom script or
                    //natively supported by browser
                    //read https://github.com/jrburke/requirejs/issues/187
                    //if we can NOT find [native code] then it must NOT natively supported.
                    //in IE8, node.attachEvent does not have toString()
                    //Note the test for "[native code" with no closing brace, see:
                    //https://github.com/jrburke/requirejs/issues/273
                    !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                    !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEventListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation that a build has been done so that
                //only one script needs to be loaded anyway. This may need to be
                //reevaluated if other use cases become common.
                importScripts(url);

                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError('importscripts',
                                'importScripts failed for ' +
                                    moduleName + ' at ' + url,
                                e,
                                [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser && !cfg.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript = dataMain;

                //Set final baseUrl if there is not already an explicit one.
                if (!cfg.baseUrl) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/')  + '/' : './';

                    cfg.baseUrl = subPath;
                }

                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript = mainScript.replace(jsSuffixRegExp, '');

                 //If mainScript is still a path, fall back to dataMain
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function (name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, '')
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        (context ? context.defQueue : globalDefQueue).push([name, deps, callback]);
    };

    define.amd = {
        jQuery: true
    };


    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
}(this));


/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b="length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){
return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var aa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ba=/<([\w:]+)/,ca=/<|&#?\w+;/,da=/<(?:script|style|link)/i,ea=/checked\s*(?:[^=]|=\s*.checked.)/i,fa=/^$|\/(?:java|ecma)script/i,ga=/^true\/(.*)/,ha=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ia={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ia.optgroup=ia.option,ia.tbody=ia.tfoot=ia.colgroup=ia.caption=ia.thead,ia.th=ia.td;function ja(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function ka(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function la(a){var b=ga.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function ma(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function na(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function oa(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pa(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=oa(h),f=oa(a),d=0,e=f.length;e>d;d++)pa(f[d],g[d]);if(b)if(c)for(f=f||oa(a),g=g||oa(h),d=0,e=f.length;e>d;d++)na(f[d],g[d]);else na(a,h);return g=oa(h,"script"),g.length>0&&ma(g,!i&&oa(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(ca.test(e)){f=f||k.appendChild(b.createElement("div")),g=(ba.exec(e)||["",""])[1].toLowerCase(),h=ia[g]||ia._default,f.innerHTML=h[1]+e.replace(aa,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=oa(k.appendChild(e),"script"),i&&ma(f),c)){j=0;while(e=f[j++])fa.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(oa(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&ma(oa(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(oa(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!da.test(a)&&!ia[(ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(aa,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(oa(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(oa(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&ea.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(oa(c,"script"),ka),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,oa(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,la),j=0;g>j;j++)h=f[j],fa.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(ha,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qa,ra={};function sa(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function ta(a){var b=l,c=ra[a];return c||(c=sa(a,b),"none"!==c&&c||(qa=(qa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qa[0].contentDocument,b.write(),b.close(),c=sa(a,b),qa.detach()),ra[a]=c),c}var ua=/^margin/,va=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wa=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xa(a,b,c){var d,e,f,g,h=a.style;return c=c||wa(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),va.test(g)&&ua.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function ya(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var za=/^(none|table(?!-c[ea]).+)/,Aa=new RegExp("^("+Q+")(.*)$","i"),Ba=new RegExp("^([+-])=("+Q+")","i"),Ca={position:"absolute",visibility:"hidden",display:"block"},Da={letterSpacing:"0",fontWeight:"400"},Ea=["Webkit","O","Moz","ms"];function Fa(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Ea.length;while(e--)if(b=Ea[e]+c,b in a)return b;return d}function Ga(a,b,c){var d=Aa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Ha(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ia(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wa(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xa(a,b,f),(0>e||null==e)&&(e=a.style[b]),va.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Ha(a,b,c||(g?"border":"content"),d,f)+"px"}function Ja(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",ta(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xa(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fa(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Ba.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fa(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xa(a,b,d)),"normal"===e&&b in Da&&(e=Da[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?za.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Ca,function(){return Ia(a,b,d)}):Ia(a,b,d):void 0},set:function(a,c,d){var e=d&&wa(a);return Ga(a,c,d?Ha(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=ya(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ua.test(a)||(n.cssHooks[a+b].set=Ga)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wa(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Ja(this,!0)},hide:function(){return Ja(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Ka(a,b,c,d,e){return new Ka.prototype.init(a,b,c,d,e)}n.Tween=Ka,Ka.prototype={constructor:Ka,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ka.propHooks[this.prop];return a&&a.get?a.get(this):Ka.propHooks._default.get(this)},run:function(a){var b,c=Ka.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ka.propHooks._default.set(this),this}},Ka.prototype.init.prototype=Ka.prototype,Ka.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Ka.propHooks.scrollTop=Ka.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Ka.prototype.init,n.fx.step={};var La,Ma,Na=/^(?:toggle|show|hide)$/,Oa=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pa=/queueHooks$/,Qa=[Va],Ra={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Oa.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Oa.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sa(){return setTimeout(function(){La=void 0}),La=n.now()}function Ta(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ua(a,b,c){for(var d,e=(Ra[b]||[]).concat(Ra["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Va(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||ta(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Na.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?ta(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ua(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wa(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xa(a,b,c){var d,e,f=0,g=Qa.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=La||Sa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:La||Sa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wa(k,j.opts.specialEasing);g>f;f++)if(d=Qa[f].call(j,a,k,j.opts))return d;return n.map(k,Ua,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xa,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Ra[c]=Ra[c]||[],Ra[c].unshift(b)},prefilter:function(a,b){b?Qa.unshift(a):Qa.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xa(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pa.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Ta(b,!0),a,d,e)}}),n.each({slideDown:Ta("show"),slideUp:Ta("hide"),slideToggle:Ta("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(La=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),La=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ma||(Ma=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Ma),Ma=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Ya,Za,$a=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Za:Ya)),
void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Za={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$a[b]||n.find.attr;$a[b]=function(a,b,d){var e,f;return d||(f=$a[b],$a[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$a[b]=f),e}});var _a=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_a.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ab=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ab," ").indexOf(b)>=0)return!0;return!1}});var bb=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cb=n.now(),db=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var eb=/#.*$/,fb=/([?&])_=[^&]*/,gb=/^(.*?):[ \t]*([^\r\n]*)$/gm,hb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ib=/^(?:GET|HEAD)$/,jb=/^\/\//,kb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lb={},mb={},nb="*/".concat("*"),ob=a.location.href,pb=kb.exec(ob.toLowerCase())||[];function qb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rb(a,b,c,d){var e={},f=a===mb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function ub(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ob,type:"GET",isLocal:hb.test(pb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sb(sb(a,n.ajaxSettings),b):sb(n.ajaxSettings,a)},ajaxPrefilter:qb(lb),ajaxTransport:qb(mb),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gb.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||ob)+"").replace(eb,"").replace(jb,pb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kb.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pb[1]&&h[2]===pb[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pb[3]||("http:"===pb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rb(lb,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ib.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(db.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fb.test(d)?d.replace(fb,"$1_="+cb++):d+(db.test(d)?"&":"?")+"_="+cb++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nb+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rb(mb,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tb(k,v,f)),u=ub(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vb=/%20/g,wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&").replace(vb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bb=0,Cb={},Db={0:200,1223:204},Eb=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cb)Cb[a]()}),k.cors=!!Eb&&"withCredentials"in Eb,k.ajax=Eb=!!Eb,n.ajaxTransport(function(a){var b;return k.cors||Eb&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cb[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Db[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cb[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fb=[],Gb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fb.pop()||n.expando+"_"+cb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gb.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gb,"$1"+e):b.jsonp!==!1&&(b.url+=(db.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hb)return Hb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ib=a.document.documentElement;function Jb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ib;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ib})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jb(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=ya(k.pixelPosition,function(a,c){return c?(c=xa(a,b),va.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Kb=a.jQuery,Lb=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lb),b&&a.jQuery===n&&(a.jQuery=Kb),n},typeof b===U&&(a.jQuery=a.$=n),n});
//# sourceMappingURL=jquery.min.map