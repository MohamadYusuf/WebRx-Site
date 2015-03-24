/// <reference path="../node_modules/rx/ts/rx.all.d.ts" />
/// <reference path="../test/typings/jquery.d.ts" />
declare module wx {
    function createWeakMap<TKey, T>(disableNativeSupport?: boolean): IWeakMap<TKey, T>;
}
declare module wx.res {
    var injector: string;
    var domManager: string;
    var router: string;
    var expressionCompiler: string;
    var htmlTemplateEngine: string;
    var hasValueBindingValue: string;
    var valueBindingValue: string;
}
declare module wx {
    interface IInjector {
        register(key: string, singleton: boolean, isConstructor: boolean, factory: Array<any>): IInjector;
        register(key: string, singleton: boolean, factory: () => any): IInjector;
        register(key: string, instance: any): IInjector;
        resolve<T>(key: string, args?: any): T;
    }
    interface IWeakMap<TKey extends Object, T> {
        set(key: TKey, value: T): void;
        get(key: TKey): T;
        has(key: TKey): boolean;
        delete(key: TKey): void;
        isEmulated: boolean;
    }
    interface ISet<T> {
        add(value: T): ISet<T>;
        has(key: T): boolean;
        delete(key: T): boolean;
        clear(): void;
        forEach(callback: (T) => void, thisArg?: any): void;
        size: number;
        isEmulated: boolean;
    }
    interface ITemplateEngine {
        parse(templateSource: string): Node[];
    }
    interface IReadOnlyList<T> {
        length: number;
        get(index: number): T;
    }
    interface IList<T> extends IReadOnlyList<T> {
        set(index: number, item: T): any;
        isReadOnly: boolean;
        add(item: T): void;
        push(item: T): void;
        clear(): void;
        contains(item: T): boolean;
        remove(item: T): boolean;
        indexOf(item: T): number;
        insert(index: number, item: T): void;
        removeAt(index: number): void;
    }
    interface IObservableProperty<T> extends Rx.IDisposable {
        (newValue: T): void;
        (): T;
        changing: Rx.Observable<T>;
        changed: Rx.Observable<T>;
        source?: Rx.Observable<T>;
    }
    interface IHandleObservableErrors {
        thrownExceptions: Rx.Observable<Error>;
    }
    interface IListChangeInfo<T> {
        items: T[];
        from: number;
        to?: number;
    }
    interface ICommand<T> extends Rx.IDisposable, IHandleObservableErrors {
        canExecute(parameter: any): boolean;
        execute(parameter: any): void;
        canExecuteObservable: Rx.Observable<boolean>;
        isExecuting: Rx.Observable<boolean>;
        results: Rx.Observable<T>;
        executeAsync(parameter?: any): Rx.Observable<T>;
    }
    interface IPropertyChangedEventArgs {
        sender: any;
        propertyName: string;
    }
    interface INotifyListItemChanged {
        itemChanging: Rx.Observable<IPropertyChangedEventArgs>;
        itemChanged: Rx.Observable<IPropertyChangedEventArgs>;
        changeTrackingEnabled: boolean;
    }
    interface INotifyListChanged<T> {
        listChanging: Rx.Observable<boolean>;
        listChanged: Rx.Observable<boolean>;
        itemsAdded: Rx.Observable<IListChangeInfo<T>>;
        beforeItemsAdded: Rx.Observable<IListChangeInfo<T>>;
        itemsRemoved: Rx.Observable<IListChangeInfo<T>>;
        beforeItemsRemoved: Rx.Observable<IListChangeInfo<T>>;
        beforeItemsMoved: Rx.Observable<IListChangeInfo<T>>;
        itemsMoved: Rx.Observable<IListChangeInfo<T>>;
        beforeItemReplaced: Rx.Observable<IListChangeInfo<T>>;
        itemReplaced: Rx.Observable<IListChangeInfo<T>>;
        countChanging: Rx.Observable<number>;
        countChanged: Rx.Observable<number>;
        isEmptyChanged: Rx.Observable<boolean>;
        shouldReset: Rx.Observable<any>;
        suppressChangeNotifications(): Rx.IDisposable;
    }
    interface IObservableList<T> extends IList<T>, INotifyListChanged<T>, INotifyListItemChanged {
        isEmpty: boolean;
        addRange(collection: Array<T>): void;
        insertRange(index: number, collection: Array<T>): void;
        move(oldIndex: any, newIndex: any): void;
        removeAll(items: Array<T>): void;
        removeRange(index: number, count: number): void;
        sort(comparison: (a: T, b: T) => number): void;
        forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
        filter(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[];
        every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        reset(): void;
        toArray(): Array<T>;
    }
    interface IDataContext {
        $data: any;
        $root: any;
        $parent: any;
        $parents: any[];
    }
    interface INodeState {
        cleanup: Rx.CompositeDisposable;
        isBound: boolean;
        model?: any;
    }
    interface IObjectLiteralToken {
        key?: string;
        unknown?: string;
        value?: string;
    }
    interface IExpressionFilter {
        (...args: Array<any>): any;
    }
    interface IExpressionCompilerOptions {
        disallowFunctionCalls?: boolean;
        filters?: {
            [filterName: string]: IExpressionFilter;
        };
    }
    interface ICompiledExpression {
        (scope?: any, locals?: any): any;
        literal?: boolean;
        constant?: boolean;
        assign?: (self, value, locals) => any;
    }
    interface ICompiledExpressionRuntimeHooks {
        readFieldHook?: (o: any, field: any) => any;
        writeFieldHook?: (o: any, field: any, newValue: any) => any;
        readIndexHook?: (o: any, field: any) => any;
        writeIndexHook?: (o: any, field: any, newValue: any) => any;
    }
    interface IExpressionCompiler {
        compileExpression(src: string, options?: IExpressionCompilerOptions, cache?: {
            [exp: string]: ICompiledExpression;
        }): ICompiledExpression;
        getRuntimeHooks(locals: any): ICompiledExpressionRuntimeHooks;
        setRuntimeHooks(locals: any, hooks: ICompiledExpressionRuntimeHooks): void;
        parseObjectLiteral(objectLiteralString: any): Array<IObjectLiteralToken>;
    }
    interface IDomManager {
        applyBindings(model: any, rootNode: Node): void;
        applyBindingsToDescendants(ctx: IDataContext, rootNode: Node): void;
        cleanNode(rootNode: Node): void;
        cleanDescendants(rootNode: Node): void;
        setNodeState(node: Node, state: INodeState): void;
        getNodeState(node: Node): INodeState;
        createNodeState(model?: any): INodeState;
        getDataContext(node: Node): IDataContext;
        isNodeBound(node: Node): boolean;
        clearElementState(node: Node): any;
        compileBindingOptions(value: string, module: IModule): any;
        getObjectLiteralTokens(value: string): Array<IObjectLiteralToken>;
        getBindingDefinitions(node: Node): Array<{
            key: string;
            value: string;
        }>;
        registerDataContextExtension(extension: (node: Node, ctx: IDataContext) => void): any;
        evaluateExpression(exp: ICompiledExpression, ctx: IDataContext): any;
        expressionToObservable(exp: ICompiledExpression, ctx: IDataContext, evalObs?: Rx.Observer<any>): Rx.Observable<any>;
    }
    interface IBindingHandler {
        applyBinding(node: Node, options: string, ctx: IDataContext, state: INodeState, module: IModule): void;
        configure(options: any): void;
        priority: number;
        controlsDescendants?: boolean;
    }
    interface IBindingRegistry {
        binding(name: string, handler: IBindingHandler): IBindingRegistry;
        binding(name: string, handler: string): IBindingRegistry;
        binding(names: string[], handler: IBindingHandler): IBindingRegistry;
        binding(names: string[], handler: string): IBindingRegistry;
        binding(name: string): IBindingHandler;
    }
    interface IComponentTemplateDescriptor {
        (params: any): string | Node[];
        require?: string;
        promise?: Rx.IPromise<Node[]>;
        resolve?: string;
        element?: string | Node;
    }
    interface IComponentViewModelDescriptor {
        (params: any): any;
        require?: string;
        promise?: Rx.IPromise<string>;
        resolve?: string;
        instance?: any;
    }
    interface IComponent {
        template: string | Node[] | IComponentTemplateDescriptor;
        viewModel?: IComponentViewModelDescriptor;
        preBindingInit?: string;
        postBindingInit?: string;
    }
    interface IComponentRegistry {
        component(name: string, handler: IComponent): IComponentRegistry;
        component(name: string, handler: string): IComponentRegistry;
        component(name: string): IComponent;
    }
    interface IExpressionFilterRegistry {
        filter(name: string, filter: IExpressionFilter): IExpressionFilterRegistry;
        filter(name: string): IExpressionFilter;
        filters(): {
            [filterName: string]: IExpressionFilter;
        };
    }
    interface IModule extends IComponentRegistry, IBindingRegistry, IExpressionFilterRegistry {
        name: string;
    }
    interface IWebRxApp extends IModule {
        defaultExceptionHandler: Rx.Observer<Error>;
        mainThreadScheduler: Rx.IScheduler;
        templateEngine: ITemplateEngine;
        history: IHistory;
    }
    interface IRoute {
        parse(url: any): Object;
        stringify(params?: Object): string;
        concat(route: IRoute): IRoute;
        isAbsolute: boolean;
    }
    interface IRouterStateConfig {
        name: string;
        route?: string | IRoute;
        views?: {
            [view: string]: string | {
                component: string;
                params?: any;
            };
        };
        params?: any;
        onEnter?: (config: IRouterStateConfig, params?: any) => void;
        onLeave?: (config: IRouterStateConfig, params?: any) => void;
    }
    interface IRouterState {
        name: string;
        uri: string;
        params: any;
        views: {
            [view: string]: string | {
                component: string;
                params?: any;
            };
        };
        onEnter?: (config: IRouterStateConfig, params?: any) => void;
        onLeave?: (config: IRouterStateConfig, params?: any) => void;
    }
    const enum RouterLocationChangeMode {
        add = 1,
        replace = 2,
    }
    interface IStateChangeOptions {
        location?: boolean | RouterLocationChangeMode;
        force?: boolean;
    }
    interface IHistory {
        onPopState: Rx.Observable<PopStateEvent>;
        location: Location;
        length: number;
        state: any;
        back(): void;
        forward(): void;
        replaceState(statedata: any, title: string, url?: string): void;
        pushState(statedata: any, title: string, url?: string): void;
    }
    interface IRouter {
        state(config: IRouterStateConfig): IRouter;
        current: IObservableProperty<IRouterState>;
        go(to: string, params?: Object, options?: IStateChangeOptions): void;
        uri(state: string, params?: {}): string;
        reload(): void;
        get(state: string): IRouterStateConfig;
        reset(): void;
    }
}
declare module Rx {
    interface Observable<T> extends IObservable<T> {
        toProperty(initialValue?: T): wx.IObservableProperty<T>;
    }
}
declare module wx {
    interface IUnknown {
        queryInterface(iid: string): boolean;
    }
}
declare module wx {
    function isStrictMode(): boolean;
    function isPrimitive(target: any): boolean;
    function isProperty(target: any): boolean;
    function isCommand(target: any): boolean;
    function isList(target: any): boolean;
    function isRxScheduler(target: any): boolean;
    function isRxObservable(target: any): boolean;
    function unwrapProperty(prop: any): any;
    function isInUnitTest(): boolean;
    function args2Array(args: IArguments): Array<any>;
    function formatString(fmt: string, ...args: any[]): string;
    function trimString(str: string): string;
    function extend(src: Object, dst: Object): Object;
    class PropertyInfo<T> {
        constructor(propertyName: string, property: T);
        propertyName: string;
        property: T;
    }
    function queryInterface(target: any, iid: string): boolean;
    function supportsQueryInterface(target: any): boolean;
    function getOwnPropertiesImplementingInterface<T>(target: any, iid: string): PropertyInfo<T>[];
    function getOid(o: any): string;
    function toggleCssClass(node: HTMLElement, shouldHaveClass: boolean, ...classNames: string[]): void;
    function isFunction(obj: any): boolean;
    function isEqual(a: any, b: any, aStack?: any, bStack?: any): boolean;
    function cloneNodeArray(nodes: Array<Node>): Array<Node>;
    function using<T extends Rx.Disposable>(disp: T, action: (disp?: T) => void): void;
    function observableRequire(module: string): Rx.Observable<any>;
    function observeObject(target: any, onChanging?: boolean): Rx.Observable<IPropertyChangedEventArgs>;
    function whenAny<TRet, T1>(property1: IObservableProperty<T1>, selector: (T1) => TRet): Rx.Observable<TRet>;
    function whenAny<TRet, T1, T2>(property1: IObservableProperty<T1>, property2: IObservableProperty<T2>, selector: (T1, T2, T3, T4, T5) => TRet): Rx.Observable<TRet>;
    function whenAny<TRet, T1, T2, T3>(property1: IObservableProperty<T1>, property2: IObservableProperty<T2>, property3: IObservableProperty<T3>, selector: (T1, T2, T3, T4, T5) => TRet): Rx.Observable<TRet>;
    function whenAny<TRet, T1, T2, T3, T4>(property1: IObservableProperty<T1>, property2: IObservableProperty<T2>, property3: IObservableProperty<T3>, property4: IObservableProperty<T4>, selector: (T1, T2, T3, T4, T5) => TRet): Rx.Observable<TRet>;
    function whenAny<TRet, T1, T2, T3, T4, T5>(property1: IObservableProperty<T1>, property2: IObservableProperty<T2>, property3: IObservableProperty<T3>, property4: IObservableProperty<T4>, property5: IObservableProperty<T5>, selector: (T1, T2, T3, T4, T5) => TRet): Rx.Observable<TRet>;
    module internal {
        function throwError(fmt: string, ...args: any[]): void;
    }
}
declare module wx {
    var injector: IInjector;
}
declare module wx {
    function createSet<T>(disableNativeSupport?: boolean): ISet<T>;
    function setToArray<T>(src: ISet<T>): Array<T>;
}
declare module wx.env {
    interface IBrowserProperties {
        version: number;
    }
    interface IIEBrowserProperties extends IBrowserProperties {
        getSelectionChangeObservable(el: HTMLElement): Rx.Observable<Document>;
    }
    var ie: IIEBrowserProperties;
    var opera: IBrowserProperties;
    var safari: IBrowserProperties;
    var firefox: IBrowserProperties;
    var isSupported: boolean;
    var jQueryInstance: any;
    function cleanExternalData(node: Node): any;
}
declare var createMockHistory: () => wx.IHistory;
declare module wx {
    var app: IWebRxApp;
    function module(name: string): IModule;
}
declare module wx {
    module internal {
        var domManagerConstructor: any;
    }
    function applyBindings(model: any, node: Node): void;
    function cleanNode(node: Node): void;
}
declare module wx {
    module internal {
        var checkedBindingConstructor: any;
    }
}
declare module wx {
    interface ICommandBindingOptions {
        command: ICommand<any>;
        parameter?: any;
    }
    module internal {
        var commandBindingConstructor: any;
    }
}
declare module wx {
    interface INodeState {
        module?: IModule;
    }
    module internal {
        var moduleBindingConstructor: any;
    }
}
declare module wx {
    interface IComponentBindingOptions {
        name: string;
        params?: Object;
    }
    module internal {
        var componentBindingConstructor: any;
    }
}
declare module wx {
    interface IEventBindingOptions {
        [eventName: string]: (ctx: IDataContext, event: Event) => any | Rx.Observer<Event>;
    }
    module internal {
        var eventBindingConstructor: any;
    }
}
declare module wx.internal {
    class VirtualChildNodes {
        constructor(targetNode: Node, initialSyncToTarget: boolean, insertCB?: (node: Node, callbackData: any) => void, removeCB?: (node: Node) => void);
        appendChilds(nodes: Node[], callbackData?: any): void;
        insertChilds(index: number, nodes: Node[], callbackData?: any): void;
        removeChilds(index: number, count: number, keepDom: boolean): Node[];
        clear(): void;
        targetNode: Node;
        childNodes: Array<Node>;
        private insertCB;
        private removeCB;
    }
}
declare module wx {
    interface IForEachBindingOptions {
        data: any;
        hooks?: IForEachBindingHooks | string;
    }
    interface IForEachBindingHooks {
        afterRender?(nodes: Node[], data: any): void;
        afterAdd?(nodes: Node[], data: any, index: number): void;
        beforeRemove?(nodes: Node[], data: any, index: number): void;
        beforeMove?(nodes: Node[], data: any, index: number): void;
        afterMove?(nodes: Node[], data: any, index: number): void;
    }
    module internal {
        var forEachBindingConstructor: any;
    }
}
declare module wx {
    module internal {
        var hasFocusBindingConstructor: any;
    }
}
declare module wx {
    interface IIfBindingOptions {
        condition: string;
    }
    module internal {
        var ifBindingConstructor: any;
        var notifBindingConstructor: any;
    }
}
declare module wx {
    module internal {
        var cssBindingConstructor: any;
        var attrBindingConstructor: any;
        var styleBindingConstructor: any;
    }
}
declare module wx {
    module internal {
        var selectedValueBindingConstructor: any;
    }
}
declare module wx {
    interface IVisibleBindingOptions {
        useCssClass: boolean;
        hiddenClass: string;
    }
    module internal {
        var textBindingConstructor: any;
        var htmlBindingConstructor: any;
        var visibleBindingConstructor: any;
        var hiddenBindingConstructor: any;
        var disableBindingConstructor: any;
        var enableBindingConstructor: any;
    }
}
declare module wx {
    module internal {
        var textInputBindingConstructor: any;
    }
}
declare module wx {
    module internal {
        function getNodeValue(node: Node, domManager: IDomManager): any;
        function setNodeValue(node: Node, value: any, domManager: IDomManager): void;
    }
    module internal {
        var valueBindingConstructor: any;
    }
}
declare module wx {
    module internal {
        var withBindingConstructor: any;
    }
}
declare module wx {
    module internal {
        var listConstructor: any;
    }
    function list<T>(initialContents?: Array<T>, resetChangeThreshold?: number): IObservableList<T>;
}
declare module wx {
    interface IRadioGroupComponentParams {
        items: any;
        groupName?: string;
        itemText?: string;
        itemValue?: string;
        itemClass?: string;
        selectedValue?: any;
        afterRender?(nodes: Node[], data: any): void;
        noCache?: boolean;
    }
    module internal {
        var radioGroupComponentConstructor: any;
    }
}
declare module wx {
    interface ISelectComponentParams {
        name?: string;
        items: any;
        itemText?: string;
        itemValue?: string;
        itemClass?: string;
        multiple?: boolean;
        required?: boolean;
        autofocus?: boolean;
        size?: number;
        selectedValue?: any;
        afterRender?(nodes: Node[], data: any): void;
        noCache?: boolean;
    }
    module internal {
        var selectComponentConstructor: any;
    }
}
declare module wx {
    class IID {
        static IUnknown: string;
        static IDisposable: string;
        static IObservableProperty: string;
        static IReactiveNotifyPropertyChanged: string;
        static IHandleObservableErrors: string;
        static IObservableList: string;
        static IList: string;
        static IReactiveNotifyCollectionChanged: string;
        static IReactiveNotifyCollectionItemChanged: string;
        static IReactiveDerivedList: string;
        static IMoveInfo: string;
        static IObservedChange: string;
        static ICommand: string;
        static IReadOnlyList: string;
    }
}
declare module wx {
    module internal {
        var commandConstructor: any;
    }
    function command(execute: (any) => void, canExecute?: Rx.Observable<boolean>, scheduler?: Rx.IScheduler): ICommand<any>;
    function command(canExecute?: Rx.Observable<boolean>, scheduler?: Rx.IScheduler): ICommand<any>;
    function asyncCommand<T>(canExecute: Rx.Observable<boolean>, executeAsync: (any) => Rx.Observable<T>, scheduler?: Rx.IScheduler): ICommand<T>;
    function asyncCommand<T>(executeAsync: (any) => Rx.Observable<T>, scheduler?: Rx.IScheduler): ICommand<T>;
    function combinedCommand(canExecute: Rx.Observable<boolean>, ...commands: ICommand<any>[]): ICommand<any>;
    function combinedCommand(...commands: ICommand<any>[]): ICommand<any>;
}
declare module wx.internal {
    class PropertyChangedEventArgs implements IPropertyChangedEventArgs {
        constructor(sender: any, propertyName: string);
        sender: any;
        propertyName: string;
    }
}
declare module wx {
    module internal {
        var expressionCompilerConstructor: any;
    }
}
declare module wx {
    module internal {
        var htmlTemplateEngineConstructor: any;
    }
}
declare module wx {
    class Lazy<T> {
        constructor(createValue: () => T);
        value: T;
        isValueCreated: boolean;
        private createValue;
        private createdValue;
    }
}
declare module wx.log {
    function critical(fmt: string, ...args: any[]): void;
    function error(fmt: string, ...args: any[]): void;
    function info(fmt: string, ...args: any[]): void;
}
declare module wx {
    function property<T>(initialValue?: T): IObservableProperty<T>;
}
declare module wx {
    class RefCountDisposeWrapper {
        constructor(inner: Rx.IDisposable);
        private inner;
        private refCount;
        addRef(): void;
        release(): number;
    }
}
declare module wx {
    interface IStateRefBindingOptions {
        name: string;
        params?: Object;
    }
    module internal {
        var stateRefBindingConstructor: any;
    }
}
declare module wx {
    module internal {
        var viewBindingConstructor: any;
    }
}
declare module wx {
    function route(route: any, rules?: any): IRoute;
}
declare module wx {
    module internal {
        var routerConstructor: any;
    }
}
declare module wx {
}
declare module wx {
}
declare module wx {
    var version: string;
}