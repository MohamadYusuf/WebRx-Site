/* Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.*/
(function(a){function b(a){for(var b=[],c=0,d=a.length;d>c;c++)b.push(a[c]);return b}function c(a,b){if(Na&&b.stack&&"object"==typeof a&&null!==a&&a.stack&&-1===a.stack.indexOf(Ra)){for(var c=[],e=b;e;e=e.source)e.stack&&c.unshift(e.stack);c.unshift(a.stack);var f=c.join("\n"+Ra+"\n");a.stack=d(f)}}function d(a){for(var b=a.split("\n"),c=[],d=0,g=b.length;g>d;d++){var h=b[d];e(h)||f(h)||!h||c.push(h)}return c.join("\n")}function e(a){var b=h(a);if(!b)return!1;var c=b[0],d=b[1];return c===Pa&&d>=Qa&&Cd>=d}function f(a){return-1!==a.indexOf("(module.js:")||-1!==a.indexOf("(node.js:")}function g(){if(Na)try{throw new Error}catch(a){var b=a.stack.split("\n"),c=b[0].indexOf("@")>0?b[1]:b[2],d=h(c);if(!d)return;return Pa=d[0],d[1]}}function h(a){var b=/at .+ \((.+):(\d+):(?:\d+)\)$/.exec(a);if(b)return[b[1],Number(b[2])];var c=/at ([^ ]+):(\d+):(?:\d+)$/.exec(a);if(c)return[c[1],Number(c[2])];var d=/.*@(.+):(\d+)$/.exec(a);return d?[d[1],Number(d[2])]:void 0}function i(a){var b=[];if(!yb(a))return b;xb.nonEnumArgs&&a.length&&zb(a)&&(a=Cb.call(a));var c=xb.enumPrototypes&&"function"==typeof a,d=xb.enumErrorProps&&(a===sb||a instanceof Error);for(var e in a)c&&"prototype"==e||d&&("message"==e||"name"==e)||b.push(e);if(xb.nonEnumShadows&&a!==tb){var f=a.constructor,g=-1,h=eb;if(a===(f&&f.prototype))var i=a===ub?ob:a===sb?jb:pb.call(a),j=wb[i];for(;++g<h;)e=db[g],j&&j[e]||!qb.call(a,e)||b.push(e)}return b}function j(a,b,c){for(var d=-1,e=c(a),f=e.length;++d<f;){var g=e[d];if(b(a[g],g,a)===!1)break}return a}function k(a,b){return j(a,b,i)}function l(a){return"function"!=typeof a.toString&&"string"==typeof(a+"")}function m(a,b,c,d){if(a===b)return 0!==a||1/a==1/b;var e=typeof a,f=typeof b;if(a===a&&(null==a||null==b||"function"!=e&&"object"!=e&&"function"!=f&&"object"!=f))return!1;var g=pb.call(a),h=pb.call(b);if(g==fb&&(g=mb),h==fb&&(h=mb),g!=h)return!1;switch(g){case hb:case ib:return+a==+b;case lb:return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case nb:case ob:return a==String(b)}var i=g==gb;if(!i){if(g!=mb||!xb.nodeClass&&(l(a)||l(b)))return!1;var j=!xb.argsObject&&zb(a)?Object:a.constructor,n=!xb.argsObject&&zb(b)?Object:b.constructor;if(!(j==n||qb.call(a,"constructor")&&qb.call(b,"constructor")||Ma(j)&&j instanceof j&&Ma(n)&&n instanceof n||!("constructor"in a&&"constructor"in b)))return!1}c||(c=[]),d||(d=[]);for(var o=c.length;o--;)if(c[o]==a)return d[o]==b;var p=0,q=!0;if(c.push(a),d.push(b),i){if(o=a.length,p=b.length,q=p==o)for(;p--;){var r=b[p];if(!(q=m(a[p],r,c,d)))break}}else k(b,function(b,e,f){return qb.call(f,e)?(p++,q=qb.call(a,e)&&m(a[e],b,c,d)):void 0}),q&&k(a,function(a,b,c){return qb.call(c,b)?q=--p>-1:void 0});return c.pop(),d.pop(),q}function n(a,b){for(var c=new Array(a),d=0;a>d;d++)c[d]=b();return c}function o(){try{return Ab.apply(this,arguments)}catch(a){return Gb.e=a,Gb}}function p(a){if(!Ma(a))throw new TypeError("fn must be a function");return Ab=a,o}function q(a){throw a}function r(a,b){this.id=a,this.value=b}function t(a,b){this.scheduler=a,this.disposable=b,this.isDisposed=!1}function u(a,b){b.isDisposed||(b.isDisposed=!0,b.disposable.dispose())}function v(a){this.observer=a,this.a=[],this.isStopped=!1}function w(){this._s=s}function x(){this._s=s,this._l=s.length,this._i=0}function y(a){this._a=a}function z(a){this._a=a,this._l=D(a),this._i=0}function A(a){return"number"==typeof a&&ya.isFinite(a)}function B(b){var c,d=b[Za];if(!d&&"string"==typeof b)return c=new w(b),c[Za]();if(!d&&b.length!==a)return c=new y(b),c[Za]();if(!d)throw new TypeError("Object is not iterable");return b[Za]()}function C(a){var b=+a;return 0===b?b:isNaN(b)?b:0>b?-1:1}function D(a){var b=+a.length;return isNaN(b)?0:0!==b&&A(b)?(b=C(b)*Math.floor(Math.abs(b)),0>=b?0:b>Ec?Ec:b):b}function E(a,b){this.observer=a,this.parent=b}function F(a,b){return Wb(a)||(a=_b),new Gc(b,a)}function G(a,b){this.observer=a,this.parent=b}function H(a,b){this.observer=a,this.parent=b}function I(a,b){return new wd(function(c){var d=new Qb,e=new Rb;return e.setDisposable(d),d.setDisposable(a.subscribe(function(a){c.onNext(a)},function(a){try{var d=b(a)}catch(f){return c.onError(f)}Ka(d)&&(d=xc(d));var g=new Qb;e.setDisposable(g),g.setDisposable(d.subscribe(c))},function(a){c.onCompleted(a)})),e},a)}function J(a,b){var c=this;return new wd(function(d){var e=0,f=a.length;return c.subscribe(function(c){if(f>e){var g,h=a[e++];try{g=b(c,h)}catch(i){return d.onError(i)}d.onNext(g)}else d.onCompleted()},function(a){d.onError(a)},function(){d.onCompleted()})},c)}function K(){return!1}function L(){return[]}function M(a,b,c){var d=cb(b,c,3);return a.map(function(b,c){var e=d(b,c,a);return Ka(e)&&(e=xc(e)),(ab(e)||_a(e))&&(e=Fc(e)),e}).concatAll()}function N(a,b,c){for(var d=0,e=a.length;e>d;d++)if(c(a[d],b))return d;return-1}function O(a){this.comparer=a,this.set=[]}function P(a,b,c){this.observer=a,this.selector=b,this.source=c,this.i=0,this.isStopped=!1}function Q(a,b,c){var d=cb(b,c,3);return a.map(function(b,c){var e=d(b,c,a);return Ka(e)&&(e=xc(e)),(ab(e)||_a(e))&&(e=Fc(e)),e}).mergeAll()}function R(a,b,c){this.observer=a,this.predicate=b,this.source=c,this.i=0,this.isStopped=!1}function S(a,b,c){return new wd(function(d){var e=!1,f=null,g=[];return a.subscribe(function(a){var h,i;try{i=b(a)}catch(j){return void d.onError(j)}if(h=0,e)try{h=c(i,f)}catch(k){return void d.onError(k)}else e=!0,f=i;h>0&&(f=i,g=[]),h>=0&&g.push(a)},function(a){d.onError(a)},function(){d.onNext(g),d.onCompleted()})},a)}function T(a){if(0===a.length)throw new Sa;return a[0]}function U(a,b,c,d){if(0>b)throw new Ua;return new wd(function(e){var f=b;return a.subscribe(function(a){0===f--&&(e.onNext(a),e.onCompleted())},function(a){e.onError(a)},function(){c?(e.onNext(d),e.onCompleted()):e.onError(new Ua)})},a)}function V(a,b,c){return new wd(function(d){var e=c,f=!1;return a.subscribe(function(a){f?d.onError(new Error("Sequence contains more than one element")):(e=a,f=!0)},function(a){d.onError(a)},function(){f||b?(d.onNext(e),d.onCompleted()):d.onError(new Sa)})},a)}function W(a,b,c){return new wd(function(d){return a.subscribe(function(a){d.onNext(a),d.onCompleted()},function(a){d.onError(a)},function(){b?(d.onNext(c),d.onCompleted()):d.onError(new Sa)})},a)}function X(a,b,c){return new wd(function(d){var e=c,f=!1;return a.subscribe(function(a){e=a,f=!0},function(a){d.onError(a)},function(){f||b?(d.onNext(e),d.onCompleted()):d.onError(new Sa)})},a)}function Y(b,c,d,e){var f=cb(c,d,3);return new wd(function(c){var d=0;return b.subscribe(function(a){var g;try{g=f(a,d,b)}catch(h){return void c.onError(h)}g?(c.onNext(e?d:a),c.onCompleted()):d++},function(a){c.onError(a)},function(){c.onNext(e?-1:a),c.onCompleted()})},b)}function Z(a,b){return Array.isArray(a)?$.call(b,a):ca(a)?dd(a.call(b)):da(a)?dd(a):ba(a)?_(a):Ka(a)?aa(a):typeof a===bd?a:yb(a)||Array.isArray(a)?$.call(b,a):a}function $(a){var b=this;return function(c){function d(a,d){if(!e)try{if(a=Z(a,b),typeof a!==bd)return h[d]=a,--g||c(null,h);a.call(b,function(a,b){if(!e){if(a)return e=!0,c(a);h[d]=b,--g||c(null,h)}})}catch(f){e=!0,c(f)}}var e,f=Object.keys(a),g=f.length,h=new a.constructor;if(!g)return void dc.schedule(function(){c(null,h)});for(var i=0,j=f.length;j>i;i++)d(a[f[i]],f[i])}}function _(a){return function(b){var c,d=!1;a.subscribe(function(a){c=a,d=!0},b,function(){d&&b(null,c)})}}function aa(a){return function(b){a.then(function(a){b(null,a)},b)}}function ba(a){return a&&typeof a.subscribe===bd}function ca(a){return a&&a.constructor&&"GeneratorFunction"===a.constructor.name}function da(a){return a&&typeof a.next===bd&&typeof a[cd]===bd}function ea(a){a&&dc.schedule(function(){throw a})}function fa(a,b,c){if(a.addEventListener)return a.addEventListener(b,c,!1),Mb(function(){a.removeEventListener(b,c,!1)});throw new Error("No listener found")}function ga(a,b,c){var d=new Jb;if("[object NodeList]"===Object.prototype.toString.call(a))for(var e=0,f=a.length;f>e;e++)d.add(ga(a.item(e),b,c));else a&&d.add(fa(a,b,c));return d}function ha(a,b,c){return new wd(function(d){function e(a,b){j[b]=a;var e;if(g[b]=!0,h||(h=g.every(Fa))){if(f)return void d.onError(f);try{e=c.apply(null,j)}catch(k){return void d.onError(k)}d.onNext(e)}i&&j[1]&&d.onCompleted()}var f,g=[!1,!1],h=!1,i=!1,j=new Array(2);return new Jb(a.subscribe(function(a){e(a,0)},function(a){j[1]?d.onError(a):f=a},function(){i=!0,j[1]&&d.onCompleted()}),b.subscribe(function(a){e(a,1)},function(a){d.onError(a)},function(){i=!0,e(!0,1)}))},a)}function ia(a,b){return a.groupJoin(this,b,Bc,function(a,b){return b})}function ja(a){var b=this;return new wd(function(c){var d=new zd,e=new Jb,f=new Sb(e);return c.onNext(Fb(d,f)),e.add(b.subscribe(function(a){d.onNext(a)},function(a){d.onError(a),c.onError(a)},function(){d.onCompleted(),c.onCompleted()})),Ka(a)&&(a=xc(a)),e.add(a.subscribe(function(){d.onCompleted(),d=new zd,c.onNext(Fb(d,f))},function(a){d.onError(a),c.onError(a)},function(){d.onCompleted(),c.onCompleted()})),f},b)}function ka(a){var b=this;return new wd(function(c){function d(){var b;try{b=a()}catch(f){return void c.onError(f)}Ka(b)&&(b=xc(b));var i=new Qb;e.setDisposable(i),i.setDisposable(b.take(1).subscribe(Ea,function(a){h.onError(a),c.onError(a)},function(){h.onCompleted(),h=new zd,c.onNext(Fb(h,g)),d()}))}var e=new Rb,f=new Jb(e),g=new Sb(f),h=new zd;return c.onNext(Fb(h,g)),f.add(b.subscribe(function(a){h.onNext(a)},function(a){h.onError(a),c.onError(a)},function(){h.onCompleted(),c.onCompleted()})),d(),g},b)}function la(b,c){return new kc(function(){return new jc(function(){return b()?{done:!1,value:c}:{done:!0,value:a}})})}function ma(a){this.patterns=a}function na(a,b){this.expression=a,this.selector=b}function oa(a,b,c){var d=a.get(b);if(!d){var e=new ud(b,c);return a.set(b,e),e}return d}function pa(a,b,c){this.joinObserverArray=a,this.onNext=b,this.onCompleted=c,this.joinObservers=new td;for(var d=0,e=this.joinObserverArray.length;e>d;d++){var f=this.joinObserverArray[d];this.joinObservers.set(f,f)}}function qa(a,b){return new wd(function(c){return b.scheduleWithAbsolute(a,function(){c.onNext(0),c.onCompleted()})})}function ra(a,b,c){return new wd(function(d){var e=a,f=Vb(b);return c.scheduleRecursiveWithAbsoluteAndState(0,e,function(a,b){if(f>0){var g=c.now();e+=f,g>=e&&(e=g+f)}d.onNext(a),b(a+1,e)})})}function sa(a,b){return new wd(function(c){return b.scheduleWithRelative(Vb(a),function(){c.onNext(0),c.onCompleted()})})}function ta(a,b,c){return a===b?new wd(function(a){return c.schedulePeriodicWithState(0,b,function(b){return a.onNext(b),b+1})}):zc(function(){return ra(c.now()+a,b,c)})}function ua(a,b,c){return new wd(function(d){var e,f=!1,g=new Rb,h=null,i=[],j=!1;return e=a.materialize().timestamp(c).subscribe(function(a){var e,k;"E"===a.value.kind?(i=[],i.push(a),h=a.value.exception,k=!j):(i.push({value:a.value,timestamp:a.timestamp+b}),k=!f,f=!0),k&&(null!==h?d.onError(h):(e=new Qb,g.setDisposable(e),e.setDisposable(c.scheduleRecursiveWithRelative(b,function(a){var b,e,g,k;if(null===h){j=!0;do g=null,i.length>0&&i[0].timestamp-c.now()<=0&&(g=i.shift().value),null!==g&&g.accept(d);while(null!==g);k=!1,e=0,i.length>0?(k=!0,e=Math.max(0,i[0].timestamp-c.now())):f=!1,b=h,j=!1,null!==b?d.onError(b):k&&a(e)}}))))}),new Jb(e,g)},a)}function va(a,b,c){return zc(function(){return ua(a,b-c.now(),c)})}function wa(a,b){return new wd(function(c){function d(){g&&(g=!1,c.onNext(f)),e&&c.onCompleted()}var e,f,g;return new Jb(a.subscribe(function(a){g=!0,f=a},c.onError.bind(c),function(){e=!0}),b.subscribe(d,c.onError.bind(c),d))},a)}var xa={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},ya=xa[typeof window]&&window||this,za=xa[typeof exports]&&exports&&!exports.nodeType&&exports,Aa=xa[typeof module]&&module&&!module.nodeType&&module,Ba=Aa&&Aa.exports===za&&za,Ca=xa[typeof global]&&global;!Ca||Ca.global!==Ca&&Ca.window!==Ca||(ya=Ca);var Da={internals:{},config:{Promise:ya.Promise},helpers:{}},Ea=Da.helpers.noop=function(){},Fa=(Da.helpers.notDefined=function(a){return"undefined"==typeof a},Da.helpers.identity=function(a){return a}),Ga=(Da.helpers.pluck=function(a){return function(b){return b[a]}},Da.helpers.just=function(a){return function(){return a}},Da.helpers.defaultNow=Date.now),Ha=Da.helpers.defaultComparer=function(a,b){return Bb(a,b)},Ia=Da.helpers.defaultSubComparer=function(a,b){return a>b?1:b>a?-1:0},Ja=(Da.helpers.defaultKeySerializer=function(a){return a.toString()},Da.helpers.defaultError=function(a){throw a}),Ka=Da.helpers.isPromise=function(a){return!!a&&"function"==typeof a.then},La=(Da.helpers.asArray=function(){return Array.prototype.slice.call(arguments)},Da.helpers.not=function(a){return!a}),Ma=Da.helpers.isFunction=function(){var a=function(a){return"function"==typeof a||!1};return a(/x/)&&(a=function(a){return"function"==typeof a&&"[object Function]"==pb.call(a)}),a}();Da.config.longStackSupport=!1;var Na=!1;try{throw new Error}catch(Oa){Na=!!Oa.stack}var Pa,Qa=g(),Ra="From previous event:",Sa=Da.EmptyError=function(){this.message="Sequence contains no elements.",Error.call(this)};Sa.prototype=Error.prototype;var Ta=Da.ObjectDisposedError=function(){this.message="Object has been disposed",Error.call(this)};Ta.prototype=Error.prototype;var Ua=Da.ArgumentOutOfRangeError=function(){this.message="Argument out of range",Error.call(this)};Ua.prototype=Error.prototype;var Va=Da.NotSupportedError=function(a){this.message=a||"This operation is not supported",Error.call(this)};Va.prototype=Error.prototype;var Wa=Da.NotImplementedError=function(a){this.message=a||"This operation is not implemented",Error.call(this)};Wa.prototype=Error.prototype;var Xa=Da.helpers.notImplemented=function(){throw new Wa},Ya=Da.helpers.notSupported=function(){throw new Va},Za="function"==typeof Symbol&&Symbol.iterator||"_es6shim_iterator_";ya.Set&&"function"==typeof(new ya.Set)["@@iterator"]&&(Za="@@iterator");var $a=Da.doneEnumerator={done:!0,value:a},_a=Da.helpers.isIterable=function(b){return b[Za]!==a},ab=Da.helpers.isArrayLike=function(b){return b&&b.length!==a};Da.helpers.iterator=Za;var bb,cb=Da.internals.bindCallback=function(a,b,c){if("undefined"==typeof b)return a;switch(c){case 0:return function(){return a.call(b)};case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,e){return a.call(b,c,d,e)}}return function(){return a.apply(b,arguments)}},db=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],eb=db.length,fb="[object Arguments]",gb="[object Array]",hb="[object Boolean]",ib="[object Date]",jb="[object Error]",kb="[object Function]",lb="[object Number]",mb="[object Object]",nb="[object RegExp]",ob="[object String]",pb=Object.prototype.toString,qb=Object.prototype.hasOwnProperty,rb=pb.call(arguments)==fb,sb=Error.prototype,tb=Object.prototype,ub=String.prototype,vb=tb.propertyIsEnumerable;try{bb=!(pb.call(document)==mb&&!({toString:0}+""))}catch(Oa){bb=!0}var wb={};wb[gb]=wb[ib]=wb[lb]={constructor:!0,toLocaleString:!0,toString:!0,valueOf:!0},wb[hb]=wb[ob]={constructor:!0,toString:!0,valueOf:!0},wb[jb]=wb[kb]=wb[nb]={constructor:!0,toString:!0},wb[mb]={constructor:!0};var xb={};!function(){var a=function(){this.x=1},b=[];a.prototype={valueOf:1,y:1};for(var c in new a)b.push(c);for(c in arguments);xb.enumErrorProps=vb.call(sb,"message")||vb.call(sb,"name"),xb.enumPrototypes=vb.call(a,"prototype"),xb.nonEnumArgs=0!=c,xb.nonEnumShadows=!/valueOf/.test(b)}(1);var yb=Da.internals.isObject=function(a){var b=typeof a;return a&&("function"==b||"object"==b)||!1},zb=function(a){return a&&"object"==typeof a?pb.call(a)==fb:!1};rb||(zb=function(a){return a&&"object"==typeof a?qb.call(a,"callee"):!1});var Ab,Bb=Da.internals.isEqual=function(a,b){return m(a,b,[],[])},Cb=({}.hasOwnProperty,Array.prototype.slice),Db=this.inherits=Da.internals.inherits=function(a,b){function c(){this.constructor=a}c.prototype=b.prototype,a.prototype=new c},Eb=Da.internals.addProperties=function(a){for(var b=[],c=1,d=arguments.length;d>c;c++)b.push(arguments[c]);for(var e=0,f=b.length;f>e;e++){var g=b[e];for(var h in g)a[h]=g[h]}},Fb=Da.internals.addRef=function(a,b){return new wd(function(c){return new Jb(b.getDisposable(),a.subscribe(c))})},Gb={e:{}};r.prototype.compareTo=function(a){var b=this.value.compareTo(a.value);return 0===b&&(b=this.id-a.id),b};var Hb=Da.internals.PriorityQueue=function(a){this.items=new Array(a),this.length=0},Ib=Hb.prototype;Ib.isHigherPriority=function(a,b){return this.items[a].compareTo(this.items[b])<0},Ib.percolate=function(a){if(!(a>=this.length||0>a)){var b=a-1>>1;if(!(0>b||b===a)&&this.isHigherPriority(a,b)){var c=this.items[a];this.items[a]=this.items[b],this.items[b]=c,this.percolate(b)}}},Ib.heapify=function(a){if(+a||(a=0),!(a>=this.length||0>a)){var b=2*a+1,c=2*a+2,d=a;if(b<this.length&&this.isHigherPriority(b,d)&&(d=b),c<this.length&&this.isHigherPriority(c,d)&&(d=c),d!==a){var e=this.items[a];this.items[a]=this.items[d],this.items[d]=e,this.heapify(d)}}},Ib.peek=function(){return this.items[0].value},Ib.removeAt=function(b){this.items[b]=this.items[--this.length],this.items[this.length]=a,this.heapify()},Ib.dequeue=function(){var a=this.peek();return this.removeAt(0),a},Ib.enqueue=function(a){var b=this.length++;this.items[b]=new r(Hb.count++,a),this.percolate(b)},Ib.remove=function(a){for(var b=0;b<this.length;b++)if(this.items[b].value===a)return this.removeAt(b),!0;return!1},Hb.count=0;var Jb=Da.CompositeDisposable=function(){var a,b,c=[];if(Array.isArray(arguments[0]))c=arguments[0],b=c.length;else for(b=arguments.length,c=new Array(b),a=0;b>a;a++)c[a]=arguments[a];for(a=0;b>a;a++)if(!Ob(c[a]))throw new TypeError("Not a disposable");this.disposables=c,this.isDisposed=!1,this.length=c.length},Kb=Jb.prototype;Kb.add=function(a){this.isDisposed?a.dispose():(this.disposables.push(a),this.length++)},Kb.remove=function(a){var b=!1;if(!this.isDisposed){var c=this.disposables.indexOf(a);-1!==c&&(b=!0,this.disposables.splice(c,1),this.length--,a.dispose())}return b},Kb.dispose=function(){if(!this.isDisposed){this.isDisposed=!0;for(var a=this.disposables.length,b=new Array(a),c=0;a>c;c++)b[c]=this.disposables[c];for(this.disposables=[],this.length=0,c=0;a>c;c++)b[c].dispose()}};var Lb=Da.Disposable=function(a){this.isDisposed=!1,this.action=a||Ea};Lb.prototype.dispose=function(){this.isDisposed||(this.action(),this.isDisposed=!0)};var Mb=Lb.create=function(a){return new Lb(a)},Nb=Lb.empty={dispose:Ea},Ob=Lb.isDisposable=function(a){return a&&Ma(a.dispose)},Pb=Lb.checkDisposed=function(a){if(a.isDisposed)throw new Ta},Qb=Da.SingleAssignmentDisposable=function(){this.isDisposed=!1,this.current=null};Qb.prototype.getDisposable=function(){return this.current},Qb.prototype.setDisposable=function(a){if(this.current)throw new Error("Disposable has already been assigned");var b=this.isDisposed;!b&&(this.current=a),b&&a&&a.dispose()},Qb.prototype.dispose=function(){if(!this.isDisposed){this.isDisposed=!0;var a=this.current;this.current=null}a&&a.dispose()};var Rb=Da.SerialDisposable=function(){this.isDisposed=!1,this.current=null};Rb.prototype.getDisposable=function(){return this.current},Rb.prototype.setDisposable=function(a){var b=this.isDisposed;if(!b){var c=this.current;this.current=a}c&&c.dispose(),b&&a&&a.dispose()},Rb.prototype.dispose=function(){if(!this.isDisposed){this.isDisposed=!0;var a=this.current;this.current=null}a&&a.dispose()};var Sb=Da.RefCountDisposable=function(){function a(a){this.disposable=a,this.disposable.count++,this.isInnerDisposed=!1}function b(a){this.underlyingDisposable=a,this.isDisposed=!1,this.isPrimaryDisposed=!1,this.count=0}return a.prototype.dispose=function(){this.disposable.isDisposed||this.isInnerDisposed||(this.isInnerDisposed=!0,this.disposable.count--,0===this.disposable.count&&this.disposable.isPrimaryDisposed&&(this.disposable.isDisposed=!0,this.disposable.underlyingDisposable.dispose()))},b.prototype.dispose=function(){this.isDisposed||this.isPrimaryDisposed||(this.isPrimaryDisposed=!0,0===this.count&&(this.isDisposed=!0,this.underlyingDisposable.dispose()))},b.prototype.getDisposable=function(){return this.isDisposed?Nb:new a(this)},b}();t.prototype.dispose=function(){this.scheduler.scheduleWithState(this,u)};var Tb=Da.internals.ScheduledItem=function(a,b,c,d,e){this.scheduler=a,this.state=b,this.action=c,this.dueTime=d,this.comparer=e||Ia,this.disposable=new Qb};Tb.prototype.invoke=function(){this.disposable.setDisposable(this.invokeCore())},Tb.prototype.compareTo=function(a){return this.comparer(this.dueTime,a.dueTime)},Tb.prototype.isCancelled=function(){return this.disposable.isDisposed},Tb.prototype.invokeCore=function(){return this.action(this.scheduler,this.state)};var Ub=Da.Scheduler=function(){function a(a,b,c,d){this.now=a,this._schedule=b,this._scheduleRelative=c,this._scheduleAbsolute=d}function b(a,b){return b(),Nb}a.isScheduler=function(b){return b instanceof a};var c=a.prototype;return c.schedule=function(a){return this._schedule(a,b)},c.scheduleWithState=function(a,b){return this._schedule(a,b)},c.scheduleWithRelative=function(a,c){return this._scheduleRelative(c,a,b)},c.scheduleWithRelativeAndState=function(a,b,c){return this._scheduleRelative(a,b,c)},c.scheduleWithAbsolute=function(a,c){return this._scheduleAbsolute(c,a,b)},c.scheduleWithAbsoluteAndState=function(a,b,c){return this._scheduleAbsolute(a,b,c)},a.now=Ga,a.normalize=function(a){return 0>a&&(a=0),a},a}(),Vb=Ub.normalize,Wb=Ub.isScheduler;!function(a){function b(a,b){function c(b){e(b,function(b){var d=!1,e=!1,g=a.scheduleWithState(b,function(a,b){return d?f.remove(g):e=!0,c(b),Nb});e||(f.add(g),d=!0)})}var d=b[0],e=b[1],f=new Jb;return c(d),f}function c(a,b,c){function d(b){f(b,function(b,e){var f=!1,h=!1,i=a[c](b,e,function(a,b){return f?g.remove(i):h=!0,d(b),Nb});h||(g.add(i),f=!0)})}var e=b[0],f=b[1],g=new Jb;return d(e),g}function d(a,b){a(function(c){b(a,c)})}a.scheduleRecursive=function(a){return this.scheduleRecursiveWithState(a,function(a,b){a(function(){b(a)})})},a.scheduleRecursiveWithState=function(a,c){return this.scheduleWithState([a,c],b)},a.scheduleRecursiveWithRelative=function(a,b){return this.scheduleRecursiveWithRelativeAndState(b,a,d)},a.scheduleRecursiveWithRelativeAndState=function(a,b,d){return this._scheduleRelative([a,d],b,function(a,b){return c(a,b,"scheduleWithRelativeAndState")})},a.scheduleRecursiveWithAbsolute=function(a,b){return this.scheduleRecursiveWithAbsoluteAndState(b,a,d)},a.scheduleRecursiveWithAbsoluteAndState=function(a,b,d){return this._scheduleAbsolute([a,d],b,function(a,b){return c(a,b,"scheduleWithAbsoluteAndState")})}}(Ub.prototype),function(){Ub.prototype.schedulePeriodic=function(a,b){return this.schedulePeriodicWithState(null,a,b)},Ub.prototype.schedulePeriodicWithState=function(a,b,c){if("undefined"==typeof ya.setInterval)throw new Va;b=Vb(b);var d=a,e=ya.setInterval(function(){d=c(d)},b);return Mb(function(){ya.clearInterval(e)})}}(Ub.prototype),function(a){a.catchError=a["catch"]=function(a){return new ec(this,a)}}(Ub.prototype);var Xb,Yb,Zb=Da.internals.SchedulePeriodicRecursive=function(){function a(a,b){b(0,this._period);try{this._state=this._action(this._state)}catch(c){throw this._cancel.dispose(),c}}function b(a,b,c,d){this._scheduler=a,this._state=b,this._period=c,this._action=d}return b.prototype.start=function(){var b=new Qb;return this._cancel=b,b.setDisposable(this._scheduler.scheduleRecursiveWithRelativeAndState(0,this._period,a.bind(this))),b},b}(),$b=Ub.immediate=function(){function a(a,b){return b(this,a)}return new Ub(Ga,a,Ya,Ya)}(),_b=Ub.currentThread=function(){function a(){for(;c.length>0;){var a=c.dequeue();!a.isCancelled()&&a.invoke()}}function b(b,d){var e=new Tb(this,b,d,this.now());if(c)c.enqueue(e);else{c=new Hb(4),c.enqueue(e);var f=p(a)();if(c=null,f===Gb)return q(f.e)}return e.disposable}var c,d=new Ub(Ga,b,Ya,Ya);return d.scheduleRequired=function(){return!c},d}(),ac=function(){var a,b=Ea;if(ya.setTimeout)a=ya.setTimeout,b=ya.clearTimeout;else{if(!ya.WScript)throw new Va;a=function(a,b){ya.WScript.Sleep(b),a()}}return{setTimeout:a,clearTimeout:b}}(),bc=ac.setTimeout,cc=ac.clearTimeout;!function(){function a(b){if(f)bc(function(){a(b)},0);else{var c=e[b];if(c){f=!0;var d=p(c)();if(Yb(b),f=!1,d===Gb)return q(d.e)}}}function b(){if(!ya.postMessage||ya.importScripts)return!1;var a=!1,b=ya.onmessage;return ya.onmessage=function(){a=!0},ya.postMessage("","*"),ya.onmessage=b,a}function c(b){"string"==typeof b.data&&b.data.substring(0,i.length)===i&&a(b.data.substring(i.length))}var d=1,e={},f=!1;Yb=function(a){delete e[a]};var g=RegExp("^"+String(pb).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),h="function"==typeof(h=Ca&&Ba&&Ca.setImmediate)&&!g.test(h)&&h;if(Ma(h))Xb=function(b){var c=d++;return e[c]=b,h(function(){a(c)}),c};else if("undefined"!=typeof process&&"[object process]"==={}.toString.call(process))Xb=function(b){var c=d++;return e[c]=b,process.nextTick(function(){a(c)}),c};else if(b()){var i="ms.rx.schedule"+Math.random();ya.addEventListener?ya.addEventListener("message",c,!1):ya.attachEvent?ya.attachEvent("onmessage",c):ya.onmessage=c,Xb=function(a){var b=d++;return e[b]=a,ya.postMessage(i+currentId,"*"),b}}else if(ya.MessageChannel){var j=new ya.MessageChannel;j.port1.onmessage=function(b){a(b.data)},Xb=function(a){var b=d++;return e[b]=a,j.port2.postMessage(b),b}}else Xb="document"in ya&&"onreadystatechange"in ya.document.createElement("script")?function(b){var c=ya.document.createElement("script"),f=d++;return e[f]=b,c.onreadystatechange=function(){a(f),c.onreadystatechange=null,c.parentNode.removeChild(c),c=null},ya.document.documentElement.appendChild(c),f}:function(b){var c=d++;return e[c]=b,bc(function(){a(c)},0),c}}();var dc=Ub.timeout=Ub["default"]=function(){function a(a,b){var c=this,d=new Qb,e=Xb(function(){!d.isDisposed&&d.setDisposable(b(c,a))});return new Jb(d,Mb(function(){Yb(e)}))}function b(a,b,c){var d=this,e=Ub.normalize(b),f=new Qb;if(0===e)return d.scheduleWithState(a,c);var g=bc(function(){!f.isDisposed&&f.setDisposable(c(d,a))},e);return new Jb(f,Mb(function(){cc(g)}))}function c(a,b,c){return this.scheduleWithRelativeAndState(a,b-this.now(),c)}return new Ub(Ga,a,b,c)}(),ec=function(a){function b(a,b){return this._scheduler.scheduleWithState(a,this._wrap(b))}function c(a,b,c){return this._scheduler.scheduleWithRelativeAndState(a,b,this._wrap(c))}function d(a,b,c){return this._scheduler.scheduleWithAbsoluteAndState(a,b,this._wrap(c))}function e(e,f){this._scheduler=e,this._handler=f,this._recursiveOriginal=null,this._recursiveWrapper=null,a.call(this,this._scheduler.now.bind(this._scheduler),b,c,d)}return Db(e,a),e.prototype._clone=function(a){return new e(a,this._handler)},e.prototype._wrap=function(a){var b=this;return function(c,d){try{return a(b._getRecursiveWrapper(c),d)}catch(e){if(!b._handler(e))throw e;return Nb}}},e.prototype._getRecursiveWrapper=function(a){if(this._recursiveOriginal!==a){this._recursiveOriginal=a;var b=this._clone(a);b._recursiveOriginal=a,b._recursiveWrapper=b,this._recursiveWrapper=b}return this._recursiveWrapper},e.prototype.schedulePeriodicWithState=function(a,b,c){var d=this,e=!1,f=new Qb;return f.setDisposable(this._scheduler.schedulePeriodicWithState(a,b,function(a){if(e)return null;try{return c(a)}catch(b){if(e=!0,!d._handler(b))throw b;return f.dispose(),null}})),f},e}(Ub),fc=Da.Notification=function(){function a(a,b,c,d,e,f){this.kind=a,this.value=b,this.exception=c,this._accept=d,this._acceptObservable=e,this.toString=f}return a.prototype.accept=function(a,b,c){return a&&"object"==typeof a?this._acceptObservable(a):this._accept(a,b,c)},a.prototype.toObservable=function(a){var b=this;return Wb(a)||(a=$b),new wd(function(c){return a.scheduleWithState(b,function(a,b){b._acceptObservable(c),"N"===b.kind&&c.onCompleted()})})},a}(),gc=fc.createOnNext=function(){function a(a){return a(this.value)}function b(a){return a.onNext(this.value)}function c(){return"OnNext("+this.value+")"}return function(d){return new fc("N",d,null,a,b,c)}}(),hc=fc.createOnError=function(){function a(a,b){return b(this.exception)}function b(a){return a.onError(this.exception)}function c(){return"OnError("+this.exception+")"}return function(d){return new fc("E",null,d,a,b,c)}}(),ic=fc.createOnCompleted=function(){function a(a,b,c){return c()}function b(a){return a.onCompleted()}function c(){return"OnCompleted()"}return function(){return new fc("C",null,null,a,b,c)}}(),jc=Da.internals.Enumerator=function(a){this._next=a};jc.prototype.next=function(){return this._next()},jc.prototype[Za]=function(){return this};var kc=Da.internals.Enumerable=function(a){this._iterator=a};kc.prototype[Za]=function(){return this._iterator()},kc.prototype.concat=function(){var a=this;return new wd(function(b){var c,d=a[Za](),e=new Rb,f=$b.scheduleRecursive(function(a){if(!c){try{var f=d.next()}catch(g){return b.onError(g)}if(f.done)return b.onCompleted();var h=f.value;Ka(h)&&(h=xc(h));var i=new Qb;e.setDisposable(i),i.setDisposable(h.subscribe(function(a){b.onNext(a)},function(a){b.onError(a)},a))}});return new Jb(e,f,Mb(function(){c=!0}))})},kc.prototype.catchError=function(){var a=this;return new wd(function(b){var c,d=a[Za](),e=new Rb,f=$b.scheduleRecursiveWithState(null,function(a,f){if(!c){try{var g=d.next()}catch(h){return observer.onError(h)}if(g.done)return void(null!==a?b.onError(a):b.onCompleted());var i=g.value;Ka(i)&&(i=xc(i));var j=new Qb;e.setDisposable(j),j.setDisposable(i.subscribe(function(a){b.onNext(a)},f,function(){b.onCompleted()}))}});return new Jb(e,f,Mb(function(){c=!0}))})},kc.prototype.catchErrorWhen=function(a){var b=this;return new wd(function(c){var d,e,f=new zd,g=new zd,h=a(f),i=h.subscribe(g),j=b[Za](),k=new Rb,l=$b.scheduleRecursive(function(a){if(!d){try{var b=j.next()}catch(h){return c.onError(h)}if(b.done)return void(e?c.onError(e):c.onCompleted());var i=b.value;Ka(i)&&(i=xc(i));var l=new Qb,m=new Qb;k.setDisposable(new Jb(m,l)),l.setDisposable(i.subscribe(function(a){c.onNext(a)},function(b){m.setDisposable(g.subscribe(a,function(a){c.onError(a)},function(){c.onCompleted()})),f.onNext(b)},function(){c.onCompleted()}))}});return new Jb(i,k,l,Mb(function(){d=!0}))})};var lc=kc.repeat=function(a,b){return null==b&&(b=-1),new kc(function(){var c=b;return new jc(function(){return 0===c?$a:(c>0&&c--,{done:!1,value:a})})})},mc=kc.of=function(a,b,c){if(b)var d=cb(b,c,3);return new kc(function(){var c=-1;return new jc(function(){return++c<a.length?{done:!1,value:b?d(a[c],c,a):a[c]}:$a})})},nc=Da.Observer=function(){};nc.prototype.toNotifier=function(){var a=this;return function(b){return b.accept(a)}},nc.prototype.asObserver=function(){return new rc(this.onNext.bind(this),this.onError.bind(this),this.onCompleted.bind(this))},nc.prototype.checked=function(){return new sc(this)};var oc=nc.create=function(a,b,c){return a||(a=Ea),b||(b=Ja),c||(c=Ea),new rc(a,b,c)};nc.fromNotifier=function(a,b){return new rc(function(c){return a.call(b,gc(c))},function(c){return a.call(b,hc(c))},function(){return a.call(b,ic())})},nc.prototype.notifyOn=function(a){return new uc(a,this)},nc.prototype.makeSafe=function(a){return new AnonymousSafeObserver(this._onNext,this._onError,this._onCompleted,a)};var pc,qc=Da.internals.AbstractObserver=function(a){function b(){this.isStopped=!1,a.call(this)}return Db(b,a),b.prototype.next=Xa,b.prototype.error=Xa,b.prototype.completed=Xa,b.prototype.onNext=function(a){this.isStopped||this.next(a)},b.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.error(a))},b.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.completed())},b.prototype.dispose=function(){this.isStopped=!0},b.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.error(a),!0)},b}(nc),rc=Da.AnonymousObserver=function(a){function b(b,c,d){a.call(this),this._onNext=b,this._onError=c,this._onCompleted=d}return Db(b,a),b.prototype.next=function(a){this._onNext(a);

},b.prototype.error=function(a){this._onError(a)},b.prototype.completed=function(){this._onCompleted()},b}(qc),sc=function(a){function b(b){a.call(this),this._observer=b,this._state=0}Db(b,a);var c=b.prototype;return c.onNext=function(a){this.checkAccess();var b=p(this._observer.onNext).call(this._observer,a);this._state=0,b===Gb&&q(b.e)},c.onError=function(a){this.checkAccess();var b=p(this._observer.onError).call(this._observer,a);this._state=2,b===Gb&&q(b.e)},c.onCompleted=function(){this.checkAccess();var a=p(this._observer.onCompleted).call(this._observer);this._state=2,a===Gb&&q(a.e)},c.checkAccess=function(){if(1===this._state)throw new Error("Re-entrancy detected");if(2===this._state)throw new Error("Observer completed");0===this._state&&(this._state=1)},b}(nc),tc=Da.internals.ScheduledObserver=function(a){function b(b,c){a.call(this),this.scheduler=b,this.observer=c,this.isAcquired=!1,this.hasFaulted=!1,this.queue=[],this.disposable=new Rb}return Db(b,a),b.prototype.next=function(a){var b=this;this.queue.push(function(){b.observer.onNext(a)})},b.prototype.error=function(a){var b=this;this.queue.push(function(){b.observer.onError(a)})},b.prototype.completed=function(){var a=this;this.queue.push(function(){a.observer.onCompleted()})},b.prototype.ensureActive=function(){var a=!1,b=this;!this.hasFaulted&&this.queue.length>0&&(a=!this.isAcquired,this.isAcquired=!0),a&&this.disposable.setDisposable(this.scheduler.scheduleRecursive(function(a){var c;if(!(b.queue.length>0))return void(b.isAcquired=!1);c=b.queue.shift();try{c()}catch(d){throw b.queue=[],b.hasFaulted=!0,d}a()}))},b.prototype.dispose=function(){a.prototype.dispose.call(this),this.disposable.dispose()},b}(qc),uc=function(a){function b(b,c,d){a.call(this,b,c),this._cancel=d}return Db(b,a),b.prototype.next=function(b){a.prototype.next.call(this,b),this.ensureActive()},b.prototype.error=function(b){a.prototype.error.call(this,b),this.ensureActive()},b.prototype.completed=function(){a.prototype.completed.call(this),this.ensureActive()},b.prototype.dispose=function(){a.prototype.dispose.call(this),this._cancel&&this._cancel.dispose(),this._cancel=null},b}(tc),vc=Da.Observable=function(){function a(a){if(Da.config.longStackSupport&&Na){try{throw new Error}catch(b){this.stack=b.stack.substring(b.stack.indexOf("\n")+1)}var d=this;this._subscribe=function(b){var e=b.onError.bind(b);return b.onError=function(a){c(a,d),e(a)},a.call(d,b)}}else this._subscribe=a}return pc=a.prototype,pc.subscribe=pc.forEach=function(a,b,c){return this._subscribe("object"==typeof a?a:oc(a,b,c))},pc.subscribeOnNext=function(a,b){return this._subscribe(oc("undefined"!=typeof b?function(c){a.call(b,c)}:a))},pc.subscribeOnError=function(a,b){return this._subscribe(oc(null,"undefined"!=typeof b?function(c){a.call(b,c)}:a))},pc.subscribeOnCompleted=function(a,b){return this._subscribe(oc(null,null,"undefined"!=typeof b?function(){a.call(b)}:a))},a}(),wc=Da.ObservableBase=function(a){function b(a){return a&&Ma(a.dispose)?a:Ma(a)?Mb(a):Nb}function c(a,c){var d=c[0],e=c[1],f=p(e.subscribeCore).call(e,d);return f!==Gb||d.fail(Gb.e)?void d.setDisposable(b(f)):q(Gb.e)}function d(a){var b=new xd(a),d=[b,this];return _b.scheduleRequired()?_b.scheduleWithState(d,c):c(null,d),b}function e(){a.call(this,d)}return Db(e,a),e.prototype.subscribeCore=Xa,e}(vc);pc.observeOn=function(a){var b=this;return new wd(function(c){return b.subscribe(new uc(a,c))},b)},pc.subscribeOn=function(a){var b=this;return new wd(function(c){var d=new Qb,e=new Rb;return e.setDisposable(d),d.setDisposable(a.schedule(function(){e.setDisposable(new t(a,b.subscribe(c)))})),e},b)};var xc=vc.fromPromise=function(a){return zc(function(){var b=new Da.AsyncSubject;return a.then(function(a){b.onNext(a),b.onCompleted()},b.onError.bind(b)),b})};pc.toPromise=function(a){if(a||(a=Da.config.Promise),!a)throw new Va("Promise type not provided nor in Rx.config.Promise");var b=this;return new a(function(a,c){var d,e=!1;b.subscribe(function(a){d=a,e=!0},c,function(){e&&a(d)})})};var yc=function(a){function b(b){this.source=b,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){return this.source.subscribe(new v(a))},b}(wc);v.prototype.onNext=function(a){this.isStopped||this.a.push(a)},v.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.observer.onError(a))},v.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.observer.onNext(this.a),this.observer.onCompleted())},v.prototype.dispose=function(){this.isStopped=!0},v.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.observer.onError(a),!0)},pc.toArray=function(){return new yc(this)},vc.create=vc.createWithDisposable=function(a,b){return new wd(a,b)};var zc=vc.defer=function(a){return new wd(function(b){var c;try{c=a()}catch(d){return Qc(d).subscribe(b)}return Ka(c)&&(c=xc(c)),c.subscribe(b)})},Ac=function(a){function b(b){this.scheduler=b,a.call(this)}function c(a,b){this.observer=a,this.parent=b}function d(a,b){b.onCompleted()}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new c(a,this);return b.run()},c.prototype.run=function(){return this.parent.scheduler.scheduleWithState(this.observer,d)},b}(wc),Bc=vc.empty=function(a){return Wb(a)||(a=$b),new Ac(a)},Cc=function(a){function b(b,c,d){this.iterable=b,this.mapper=c,this.scheduler=d,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new Dc(a,this);return b.run()},b}(wc),Dc=function(){function a(a,b){this.observer=a,this.parent=b}return a.prototype.run=function(){function a(a,b){try{var f=c.next()}catch(g){return d.onError(g)}if(f.done)return d.onCompleted();var h=f.value;if(e)try{h=e(h,a)}catch(g){return d.onError(g)}d.onNext(h),b(a+1)}var b=Object(this.parent.iterable),c=B(b),d=this.observer,e=this.parent.mapper;return this.parent.scheduler.scheduleRecursiveWithState(0,a)},a}(),Ec=Math.pow(2,53)-1;w.prototype[Za]=function(){return new x(this._s)},x.prototype[Za]=function(){return this},x.prototype.next=function(){return this._i<this._l?{done:!1,value:this._s.charAt(this._i++)}:$a},y.prototype[Za]=function(){return new z(this._a)},z.prototype[Za]=function(){return this},z.prototype.next=function(){return this._i<this._l?{done:!1,value:this._a[this._i++]}:$a};var Fc=vc.from=function(a,b,c,d){if(null==a)throw new Error("iterable cannot be null.");if(b&&!Ma(b))throw new Error("mapFn when provided must be a function");if(b)var e=cb(b,c,2);return Wb(d)||(d=_b),new Cc(a,e,d)},Gc=function(a){function b(b,c){this.args=b,this.scheduler=c,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new E(a,this);return b.run()},b}(wc);E.prototype.run=function(){function a(a,e){d>a?(b.onNext(c[a]),e(a+1)):b.onCompleted()}var b=this.observer,c=this.parent.args,d=c.length;return this.parent.scheduler.scheduleRecursiveWithState(0,a)};var Hc=vc.fromArray=function(a,b){return Wb(b)||(b=_b),new Gc(a,b)};vc.generate=function(a,b,c,d,e){return Wb(e)||(e=_b),new wd(function(f){var g=!0;return e.scheduleRecursiveWithState(a,function(a,e){var h,i;try{g?g=!1:a=c(a),h=b(a),h&&(i=d(a))}catch(j){return f.onError(j)}h?(f.onNext(i),e(a)):f.onCompleted()})})},vc.of=function(){for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];return new Gc(b,_b)},vc.ofWithScheduler=function(a){for(var b=arguments.length,c=new Array(b-1),d=1;b>d;d++)c[d-1]=arguments[d];return new Gc(c,a)},vc.ofArrayChanges=function(a){if(!Array.isArray(a))throw new TypeError("Array.observe only accepts arrays.");if("function"!=typeof Array.observe&&"function"!=typeof Array.unobserve)throw new TypeError("Array.observe is not supported on your platform");return new wd(function(b){function c(a){for(var c=0,d=a.length;d>c;c++)b.onNext(a[c])}return Array.observe(a,c),function(){Array.unobserve(a,c)}})},vc.ofObjectChanges=function(a){if(null==a)throw new TypeError("object must not be null or undefined.");if("function"!=typeof Object.observe&&"function"!=typeof Object.unobserve)throw new TypeError("Array.observe is not supported on your platform");return new wd(function(b){function c(a){for(var c=0,d=a.length;d>c;c++)b.onNext(a[c])}return Object.observe(a,c),function(){Object.unobserve(a,c)}})};var Ic=function(a){function b(){a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(){return Nb},b}(wc),Jc=vc.never=function(){return new Ic},Kc=function(a){function b(b,c){this.obj=b,this.keys=Object.keys(b),this.scheduler=c,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new G(a,this);return b.run()},b}(wc);G.prototype.run=function(){function a(a,f){if(e>a){var g=d[a];b.onNext([g,c[g]]),f(a+1)}else b.onCompleted()}var b=this.observer,c=this.parent.obj,d=this.parent.keys,e=d.length;return this.parent.scheduler.scheduleRecursiveWithState(0,a)},vc.pairs=function(a,b){return b||(b=_b),new Kc(a,b)};var Lc=function(a){function b(b,c,d){this.start=b,this.count=c,this.scheduler=d,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new Mc(a,this);return b.run()},b}(wc),Mc=function(){function a(a,b){this.observer=a,this.parent=b}return a.prototype.run=function(){function a(a,e){c>a?(d.onNext(b+a),e(a+1)):d.onCompleted()}var b=this.parent.start,c=this.parent.count,d=this.observer;return this.parent.scheduler.scheduleRecursiveWithState(0,a)},a}();vc.range=function(a,b,c){return Wb(c)||(c=_b),new Lc(a,b,c)};var Nc=function(a){function b(b,c,d){this.value=b,this.repeatCount=null==c?-1:c,this.scheduler=d,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new H(a,this);return b.run()},b}(wc);H.prototype.run=function(){function a(a,d){return(-1===a||a>0)&&(b.onNext(c),a>0&&a--),0===a?b.onCompleted():void d(a)}var b=this.observer,c=this.parent.value;return this.parent.scheduler.scheduleRecursiveWithState(this.parent.repeatCount,a)},vc.repeat=function(a,b,c){return Wb(c)||(c=_b),new Nc(a,b,c)};var Oc=function(a){function b(b,c){this.value=b,this.scheduler=c,a.call(this)}function c(a,b){this.observer=a,this.parent=b}function d(a,b){var c=b[0],d=b[1];d.onNext(c),d.onCompleted()}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new c(a,this);return b.run()},c.prototype.run=function(){return this.parent.scheduler.scheduleWithState([this.parent.value,this.observer],d)},b}(wc),Pc=(vc["return"]=vc.just=vc.returnValue=function(a,b){return Wb(b)||(b=$b),new Oc(a,b)},function(a){function b(b,c){this.error=b,this.scheduler=c,a.call(this)}function c(a,b){this.observer=a,this.parent=b}function d(a,b){var c=b[0],d=b[1];d.onError(c)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new c(a,this);return b.run()},c.prototype.run=function(){return this.parent.scheduler.scheduleWithState([this.parent.error,this.observer],d)},b}(wc)),Qc=vc["throw"]=vc.throwError=vc.throwException=function(a,b){return Wb(b)||(b=$b),new Pc(a,b)};vc.using=function(a,b){return new wd(function(c){var d,e,f=Nb;try{d=a(),d&&(f=d),e=b(d)}catch(g){return new Jb(Qc(g).subscribe(c),f)}return new Jb(e.subscribe(c),f)})},pc.amb=function(a){var b=this;return new wd(function(c){function d(){f||(f=g,j.dispose())}function e(){f||(f=h,i.dispose())}var f,g="L",h="R",i=new Qb,j=new Qb;return Ka(a)&&(a=xc(a)),i.setDisposable(b.subscribe(function(a){d(),f===g&&c.onNext(a)},function(a){d(),f===g&&c.onError(a)},function(){d(),f===g&&c.onCompleted()})),j.setDisposable(a.subscribe(function(a){e(),f===h&&c.onNext(a)},function(a){e(),f===h&&c.onError(a)},function(){e(),f===h&&c.onCompleted()})),new Jb(i,j)})},vc.amb=function(){function a(a,b){return a.amb(b)}var b=Jc(),c=[];if(Array.isArray(arguments[0]))c=arguments[0];else for(var d=0,e=arguments.length;e>d;d++)c.push(arguments[d]);for(var d=0,e=c.length;e>d;d++)b=a(b,c[d]);return b},pc["catch"]=pc.catchError=pc.catchException=function(a){return"function"==typeof a?I(this,a):Rc([this,a])};var Rc=vc.catchError=vc["catch"]=vc.catchException=function(){var a=[];if(Array.isArray(arguments[0]))a=arguments[0];else for(var b=0,c=arguments.length;c>b;b++)a.push(arguments[b]);return mc(a).catchError()};pc.combineLatest=function(){for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];return Array.isArray(b[0])?b[0].unshift(this):b.unshift(this),Sc.apply(this,b)};var Sc=vc.combineLatest=function(){for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];var d=b.pop();return Array.isArray(b[0])&&(b=b[0]),new wd(function(a){function c(b){if(h[b]=!0,i||(i=h.every(Fa))){try{var c=d.apply(null,k)}catch(e){return a.onError(e)}a.onNext(c)}else j.filter(function(a,c){return c!==b}).every(Fa)&&a.onCompleted()}function e(b){j[b]=!0,j.every(Fa)&&a.onCompleted()}for(var f=b.length,g=function(){return!1},h=n(f,g),i=!1,j=n(f,g),k=new Array(f),l=new Array(f),m=0;f>m;m++)!function(d){var f=b[d],g=new Qb;Ka(f)&&(f=xc(f)),g.setDisposable(f.subscribe(function(a){k[d]=a,c(d)},function(b){a.onError(b)},function(){e(d)})),l[d]=g}(m);return new Jb(l)},this)};pc.concat=function(){for(var a=[],b=0,c=arguments.length;c>b;b++)a.push(arguments[b]);return a.unshift(this),Tc.apply(null,a)};var Tc=vc.concat=function(){var a;if(Array.isArray(arguments[0]))a=arguments[0];else{a=new Array(arguments.length);for(var b=0,c=arguments.length;c>b;b++)a[b]=arguments[b]}return mc(a).concat()};pc.concatAll=pc.concatObservable=function(){return this.merge(1)};var Uc=function(a){function b(b,c){this.source=b,this.maxConcurrent=c,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new Jb;return b.add(this.source.subscribe(new Vc(a,this.maxConcurrent,b))),b},b}(wc),Vc=function(){function a(a,b,c){this.o=a,this.max=b,this.g=c,this.done=!1,this.q=[],this.activeCount=0,this.isStopped=!1}function b(a,b){this.parent=a,this.sad=b,this.isStopped=!1}return a.prototype.handleSubscribe=function(a){var c=new Qb;this.g.add(c),Ka(a)&&(a=xc(a)),c.setDisposable(a.subscribe(new b(this,c)))},a.prototype.onNext=function(a){this.isStopped||(this.activeCount<this.max?(this.activeCount++,this.handleSubscribe(a)):this.q.push(a))},a.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.o.onError(a))},a.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.done=!0,0===this.activeCount&&this.o.onCompleted())},a.prototype.dispose=function(){this.isStopped=!0},a.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.o.onError(a),!0)},b.prototype.onNext=function(a){this.isStopped||this.parent.o.onNext(a)},b.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.parent.o.onError(a))},b.prototype.onCompleted=function(){if(!this.isStopped){this.isStopped=!0;var a=this.parent;a.g.remove(this.sad),a.q.length>0?a.handleSubscribe(a.q.shift()):(a.activeCount--,a.done&&0===a.activeCount&&a.o.onCompleted())}},b.prototype.dispose=function(){this.isStopped=!0},b.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.parent.o.onError(a),!0)},a}();pc.merge=function(a){return"number"!=typeof a?Wc(this,a):new Uc(this,a)};var Wc=vc.merge=function(){var a,b,c=[],d=arguments.length;if(arguments[0])if(Wb(arguments[0]))for(a=arguments[0],b=1;d>b;b++)c.push(arguments[b]);else for(a=$b,b=0;d>b;b++)c.push(arguments[b]);else for(a=$b,b=1;d>b;b++)c.push(arguments[b]);return Array.isArray(c[0])&&(c=c[0]),F(a,c).mergeAll()},Xc=function(a){function b(b){this.source=b,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new Jb,c=new Qb;return b.add(c),c.setDisposable(this.source.subscribe(new Yc(a,b))),b},b}(wc),Yc=function(){function a(a,b){this.o=a,this.g=b,this.isStopped=!1,this.done=!1}function b(a,b,c){this.parent=a,this.g=b,this.sad=c,this.isStopped=!1}return a.prototype.onNext=function(a){if(!this.isStopped){var c=new Qb;this.g.add(c),Ka(a)&&(a=xc(a)),c.setDisposable(a.subscribe(new b(this,this.g,c)))}},a.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.o.onError(a))},a.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.done=!0,1===this.g.length&&this.o.onCompleted())},a.prototype.dispose=function(){this.isStopped=!0},a.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.o.onError(a),!0)},b.prototype.onNext=function(a){this.isStopped||this.parent.o.onNext(a)},b.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.parent.o.onError(a))},b.prototype.onCompleted=function(){if(!this.isStopped){var a=this.parent;this.isStopped=!0,a.g.remove(this.sad),a.done&&1===a.g.length&&a.o.onCompleted()}},b.prototype.dispose=function(){this.isStopped=!0},b.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.parent.o.onError(a),!0)},a}();pc.mergeAll=pc.mergeObservable=function(){return new Xc(this)};var Zc=Da.CompositeError=function(a){this.name="NotImplementedError",this.innerErrors=a,this.message="This contains multiple errors. Check the innerErrors",Error.call(this)};Zc.prototype=Error.prototype,vc.mergeDelayError=function(){var a;if(Array.isArray(arguments[0]))a=arguments[0];else{var b=arguments.length;a=new Array(b);for(var c=0;b>c;c++)a[c]=arguments[c]}var d=F(null,a);return new wd(function(a){function b(){0===g.length?a.onCompleted():a.onError(1===g.length?g[0]:new Zc(g))}var c=new Jb,e=new Qb,f=!1,g=[];return c.add(e),e.setDisposable(d.subscribe(function(d){var e=new Qb;c.add(e),Ka(d)&&(d=xc(d)),e.setDisposable(d.subscribe(function(b){a.onNext(b)},function(a){g.push(a),c.remove(e),f&&1===c.length&&b()},function(){c.remove(e),f&&1===c.length&&b()}))},function(a){g.push(a),f=!0,1===c.length&&b()},function(){f=!0,1===c.length&&b()})),c})},pc.onErrorResumeNext=function(a){if(!a)throw new Error("Second observable is required");return $c([this,a])};var $c=vc.onErrorResumeNext=function(){var a=[];if(Array.isArray(arguments[0]))a=arguments[0];else for(var b=0,c=arguments.length;c>b;b++)a.push(arguments[b]);return new wd(function(b){var c=0,d=new Rb,e=$b.scheduleRecursive(function(e){var f,g;c<a.length?(f=a[c++],Ka(f)&&(f=xc(f)),g=new Qb,d.setDisposable(g),g.setDisposable(f.subscribe(b.onNext.bind(b),e,e))):b.onCompleted()});return new Jb(d,e)})};pc.skipUntil=function(a){var b=this;return new wd(function(c){var d=!1,e=new Jb(b.subscribe(function(a){d&&c.onNext(a)},function(a){c.onError(a)},function(){d&&c.onCompleted()}));Ka(a)&&(a=xc(a));var f=new Qb;return e.add(f),f.setDisposable(a.subscribe(function(){d=!0,f.dispose()},function(a){c.onError(a)},function(){f.dispose()})),e},b)},pc["switch"]=pc.switchLatest=function(){var a=this;return new wd(function(b){var c=!1,d=new Rb,e=!1,f=0,g=a.subscribe(function(a){var g=new Qb,h=++f;c=!0,d.setDisposable(g),Ka(a)&&(a=xc(a)),g.setDisposable(a.subscribe(function(a){f===h&&b.onNext(a)},function(a){f===h&&b.onError(a)},function(){f===h&&(c=!1,e&&b.onCompleted())}))},function(a){b.onError(a)},function(){e=!0,!c&&b.onCompleted()});return new Jb(g,d)},a)},pc.takeUntil=function(a){var b=this;return new wd(function(c){return Ka(a)&&(a=xc(a)),new Jb(b.subscribe(c),a.subscribe(function(){c.onCompleted()},function(a){c.onError(a)},Ea))},b)},pc.withLatestFrom=function(){for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];var d=b.pop(),e=this;if("undefined"==typeof e)throw new Error("Source observable not found for withLatestFrom().");if("function"!=typeof d)throw new Error("withLatestFrom() expects a resultSelector function.");return Array.isArray(b[0])&&(b=b[0]),new wd(function(a){for(var c=function(){return!1},f=b.length,g=n(f,c),h=!1,i=new Array(f),j=new Array(f+1),k=0;f>k;k++)!function(c){var d=b[c],e=new Qb;Ka(d)&&(d=xc(d)),e.setDisposable(d.subscribe(function(a){i[c]=a,g[c]=!0,h=g.every(Fa)},a.onError.bind(a),function(){})),j[c]=e}(k);var l=new Qb;return l.setDisposable(e.subscribe(function(b){var c,e=[b].concat(i);if(h){try{c=d.apply(null,e)}catch(f){return void a.onError(f)}a.onNext(c)}},a.onError.bind(a),function(){a.onCompleted()})),j[f]=l,new Jb(j)},this)},pc.zip=function(){if(Array.isArray(arguments[0]))return J.apply(this,arguments);for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];var d=this,e=b.pop();return b.unshift(d),new wd(function(a){function c(b){var c,f;if(h.every(function(a){return a.length>0})){try{f=h.map(function(a){return a.shift()}),c=e.apply(d,f)}catch(g){return void a.onError(g)}a.onNext(c)}else i.filter(function(a,c){return c!==b}).every(Fa)&&a.onCompleted()}function f(b){i[b]=!0,i.every(function(a){return a})&&a.onCompleted()}for(var g=b.length,h=n(g,L),i=n(g,K),j=new Array(g),k=0;g>k;k++)!function(d){var e=b[d],g=new Qb;Ka(e)&&(e=xc(e)),g.setDisposable(e.subscribe(function(a){h[d].push(a),c(d)},function(b){a.onError(b)},function(){f(d)})),j[d]=g}(k);return new Jb(j)},d)},vc.zip=function(){for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];var d=b.shift();return d.zip.apply(d,b)},vc.zipArray=function(){var a;if(Array.isArray(arguments[0]))a=arguments[0];else{var b=arguments.length;a=new Array(b);for(var c=0;b>c;c++)a[c]=arguments[c]}return new wd(function(b){function c(a){if(f.every(function(a){return a.length>0})){var c=f.map(function(a){return a.shift()});b.onNext(c)}else if(g.filter(function(b,c){return c!==a}).every(Fa))return void b.onCompleted()}function d(a){return g[a]=!0,g.every(Fa)?void b.onCompleted():void 0}for(var e=a.length,f=n(e,function(){return[]}),g=n(e,function(){return!1}),h=new Array(e),i=0;e>i;i++)!function(e){h[e]=new Qb,h[e].setDisposable(a[e].subscribe(function(a){f[e].push(a),c(e)},function(a){b.onError(a)},function(){d(e)}))}(i);return new Jb(h)})},pc.asObservable=function(){var a=this;return new wd(function(b){return a.subscribe(b)},this)},pc.bufferWithCount=function(a,b){return"number"!=typeof b&&(b=a),this.windowWithCount(a,b).selectMany(function(a){return a.toArray()}).where(function(a){return a.length>0})},pc.dematerialize=function(){var a=this;return new wd(function(b){return a.subscribe(function(a){return a.accept(b)},function(a){b.onError(a)},function(){b.onCompleted()})},this)},pc.distinctUntilChanged=function(a,b){var c=this;return b||(b=Ha),new wd(function(d){var e,f=!1;return c.subscribe(function(c){var g=c;if(a)try{g=a(c)}catch(h){return void d.onError(h)}if(f)try{var i=b(e,g)}catch(h){return void d.onError(h)}f&&i||(f=!0,e=g,d.onNext(c))},function(a){d.onError(a)},function(){d.onCompleted()})},this)},pc["do"]=pc.tap=pc.doAction=function(a,b,c){var d=this;return new wd(function(e){var f=!a||Ma(a)?oc(a||Ea,b||Ea,c||Ea):a;return d.subscribe(function(a){try{f.onNext(a)}catch(b){e.onError(b)}e.onNext(a)},function(a){try{f.onError(a)}catch(b){e.onError(b)}e.onError(a)},function(){try{f.onCompleted()}catch(a){e.onError(a)}e.onCompleted()})},this)},pc.doOnNext=pc.tapOnNext=function(a,b){return this.tap("undefined"!=typeof b?function(c){a.call(b,c)}:a)},pc.doOnError=pc.tapOnError=function(a,b){return this.tap(Ea,"undefined"!=typeof b?function(c){a.call(b,c)}:a)},pc.doOnCompleted=pc.tapOnCompleted=function(a,b){return this.tap(Ea,null,"undefined"!=typeof b?function(){a.call(b)}:a)},pc["finally"]=pc.ensure=function(a){var b=this;return new wd(function(c){var d;try{d=b.subscribe(c)}catch(e){throw a(),e}return Mb(function(){try{d.dispose()}catch(b){throw b}finally{a()}})},this)},pc.finallyAction=function(a){return this.ensure(a)},pc.ignoreElements=function(){var a=this;return new wd(function(b){return a.subscribe(Ea,function(a){b.onError(a)},function(){b.onCompleted()})},a)},pc.materialize=function(){var a=this;return new wd(function(b){return a.subscribe(function(a){b.onNext(gc(a))},function(a){b.onNext(hc(a)),b.onCompleted()},function(){b.onNext(ic()),b.onCompleted()})},a)},pc.repeat=function(a){return lc(this,a).concat()},pc.retry=function(a){return lc(this,a).catchError()},pc.retryWhen=function(a){return lc(this).catchErrorWhen(a)},pc.scan=function(){var a,b,c=!1,d=this;return 2===arguments.length?(c=!0,a=arguments[0],b=arguments[1]):b=arguments[0],new wd(function(e){var f,g,h;return d.subscribe(function(d){!h&&(h=!0);try{f?g=b(g,d):(g=c?b(a,d):d,f=!0)}catch(i){return void e.onError(i)}e.onNext(g)},function(a){e.onError(a)},function(){!h&&c&&e.onNext(a),e.onCompleted()})},d)},pc.skipLast=function(a){if(0>a)throw new Ua;var b=this;return new wd(function(c){var d=[];return b.subscribe(function(b){d.push(b),d.length>a&&c.onNext(d.shift())},function(a){c.onError(a)},function(){c.onCompleted()})},b)},pc.startWith=function(){var a,b=0;arguments.length&&Wb(arguments[0])?(a=arguments[0],b=1):a=$b;for(var c=[],d=b,e=arguments.length;e>d;d++)c.push(arguments[d]);return mc([Hc(c,a),this]).concat()},pc.takeLast=function(a){if(0>a)throw new Ua;var b=this;return new wd(function(c){var d=[];return b.subscribe(function(b){d.push(b),d.length>a&&d.shift()},function(a){c.onError(a)},function(){for(;d.length>0;)c.onNext(d.shift());c.onCompleted()})},b)},pc.takeLastBuffer=function(a){var b=this;return new wd(function(c){var d=[];return b.subscribe(function(b){d.push(b),d.length>a&&d.shift()},function(a){c.onError(a)},function(){c.onNext(d),c.onCompleted()})},b)},pc.windowWithCount=function(a,b){var c=this;if(+a||(a=0),Math.abs(a)===1/0&&(a=0),0>=a)throw new Ua;if(null==b&&(b=a),+b||(b=0),Math.abs(b)===1/0&&(b=0),0>=b)throw new Ua;return new wd(function(d){function e(){var a=new zd;i.push(a),d.onNext(Fb(a,g))}var f=new Qb,g=new Sb(f),h=0,i=[];return e(),f.setDisposable(c.subscribe(function(c){for(var d=0,f=i.length;f>d;d++)i[d].onNext(c);var g=h-a+1;g>=0&&g%b===0&&i.shift().onCompleted(),++h%b===0&&e()},function(a){for(;i.length>0;)i.shift().onError(a);d.onError(a)},function(){for(;i.length>0;)i.shift().onCompleted();d.onCompleted()})),g},c)},pc.selectConcat=pc.concatMap=function(a,b,c){return Ma(a)&&Ma(b)?this.concatMap(function(c,d){var e=a(c,d);return Ka(e)&&(e=xc(e)),(ab(e)||_a(e))&&(e=Fc(e)),e.map(function(a,e){return b(c,a,d,e)})}):Ma(a)?M(this,a,c):M(this,function(){return a})},pc.concatMapObserver=pc.selectConcatObserver=function(a,b,c,d){var e=this,f=cb(a,d,2),g=cb(b,d,1),h=cb(c,d,0);return new wd(function(a){var b=0;return e.subscribe(function(c){var d;try{d=f(c,b++)}catch(e){return void a.onError(e)}Ka(d)&&(d=xc(d)),a.onNext(d)},function(b){var c;try{c=g(b)}catch(d){return void a.onError(d)}Ka(c)&&(c=xc(c)),a.onNext(c),a.onCompleted()},function(){var b;try{b=h()}catch(c){return void a.onError(c)}Ka(b)&&(b=xc(b)),a.onNext(b),a.onCompleted()})},this).concatAll()},pc.defaultIfEmpty=function(b){var c=this;return b===a&&(b=null),new wd(function(a){var d=!1;return c.subscribe(function(b){d=!0,a.onNext(b)},function(b){a.onError(b)},function(){!d&&a.onNext(b),a.onCompleted()})},c)},O.prototype.push=function(a){var b=-1===N(this.set,a,this.comparer);return b&&this.set.push(a),b},pc.distinct=function(a,b){var c=this;return b||(b=Ha),new wd(function(d){var e=new O(b);return c.subscribe(function(b){var c=b;if(a)try{c=a(b)}catch(f){return void d.onError(f)}e.push(c)&&d.onNext(b)},function(a){d.onError(a)},function(){d.onCompleted()})},this)},pc.groupBy=function(a,b,c){return this.groupByUntil(a,b,Jc,c)},pc.groupByUntil=function(a,b,c,d){var e=this;return b||(b=Fa),d||(d=Ha),new wd(function(f){function g(a){return function(b){b.onError(a)}}var h=new qd(0,d),i=new Jb,j=new Sb(i);return i.add(e.subscribe(function(d){var e;try{e=a(d)}catch(k){return h.getValues().forEach(g(k)),void f.onError(k)}var l=!1,m=h.tryGetValue(e);if(m||(m=new zd,h.set(e,m),l=!0),l){var n=new yd(e,m,j),o=new yd(e,m);try{duration=c(o)}catch(k){return h.getValues().forEach(g(k)),void f.onError(k)}f.onNext(n);var p=new Qb;i.add(p);var q=function(){h.remove(e)&&m.onCompleted(),i.remove(p)};p.setDisposable(duration.take(1).subscribe(Ea,function(a){h.getValues().forEach(g(a)),f.onError(a)},q))}var r;try{r=b(d)}catch(k){return h.getValues().forEach(g(k)),void f.onError(k)}m.onNext(r)},function(a){h.getValues().forEach(g(a)),f.onError(a)},function(){h.getValues().forEach(function(a){a.onCompleted()}),f.onCompleted()})),j},e)};var _c=function(a){function b(b,c,d){this.source=b,this.selector=cb(c,d,3),a.call(this)}return Db(b,a),b.prototype.internalMap=function(a,c){var d=this;return new b(this.source,function(b,c,e){return a.call(this,d.selector(b,c,e),c,e)},c)},b.prototype.subscribeCore=function(a){return this.source.subscribe(new P(a,this.selector,this))},b}(wc);P.prototype.onNext=function(a){if(!this.isStopped){var b=p(this.selector).call(this,a,this.i++,this.source);return b===Gb?this.observer.onError(b.e):void this.observer.onNext(b)}},P.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.observer.onError(a))},P.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.observer.onCompleted())},P.prototype.dispose=function(){this.isStopped=!0},P.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.observer.onError(a),!0)},pc.map=pc.select=function(a,b){var c="function"==typeof a?a:function(){return a};return this instanceof _c?this.internalMap(c,b):new _c(this,c,b)},pc.pluck=function(){var b=arguments,c=arguments.length;if(0===c)throw new Error("List of properties cannot be empty.");return this.map(function(d){for(var e=d,f=0;c>f;f++){var g=e[b[f]];if("undefined"==typeof g)return a;e=g}return e})},pc.selectMany=pc.flatMap=function(a,b,c){return Ma(a)&&Ma(b)?this.flatMap(function(c,d){var e=a(c,d);return Ka(e)&&(e=xc(e)),(ab(e)||_a(e))&&(e=Fc(e)),e.map(function(a,e){return b(c,a,d,e)})},c):Ma(a)?Q(this,a,c):Q(this,function(){return a})},pc.flatMapObserver=pc.selectManyObserver=function(a,b,c,d){var e=this;return new wd(function(f){var g=0;return e.subscribe(function(b){var c;try{c=a.call(d,b,g++)}catch(e){return void f.onError(e)}Ka(c)&&(c=xc(c)),f.onNext(c)},function(a){var c;try{c=b.call(d,a)}catch(e){return void f.onError(e)}Ka(c)&&(c=xc(c)),f.onNext(c),f.onCompleted()},function(){var a;try{a=c.call(d)}catch(b){return void f.onError(b)}Ka(a)&&(a=xc(a)),f.onNext(a),f.onCompleted()})},e).mergeAll()},pc.selectSwitch=pc.flatMapLatest=pc.switchMap=function(a,b){return this.select(a,b).switchLatest()},pc.skip=function(a){if(0>a)throw new Ua;var b=this;return new wd(function(c){var d=a;return b.subscribe(function(a){0>=d?c.onNext(a):d--},function(a){c.onError(a)},function(){c.onCompleted()})},b)},pc.skipWhile=function(a,b){var c=this,d=cb(a,b,3);return new wd(function(a){var b=0,e=!1;return c.subscribe(function(f){if(!e)try{e=!d(f,b++,c)}catch(g){return void a.onError(g)}e&&a.onNext(f)},function(b){a.onError(b)},function(){a.onCompleted()})},c)},pc.take=function(a,b){if(0>a)throw new Ua;if(0===a)return Bc(b);var c=this;return new wd(function(b){var d=a;return c.subscribe(function(a){d-->0&&(b.onNext(a),0===d&&b.onCompleted())},function(a){b.onError(a)},function(){b.onCompleted()})},c)},pc.takeWhile=function(a,b){var c=this,d=cb(a,b,3);return new wd(function(a){var b=0,e=!0;return c.subscribe(function(f){if(e){try{e=d(f,b++,c)}catch(g){return void a.onError(g)}e?a.onNext(f):a.onCompleted()}},function(b){a.onError(b)},function(){a.onCompleted()})},c)};var ad=function(a){function b(b,c,d){this.source=b,this.predicate=cb(c,d,3),a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){return this.source.subscribe(new R(a,this.predicate,this))},b.prototype.internalFilter=function(a,c){var d=this;return new b(this.source,function(b,c,e){return d.predicate(b,c,e)&&a.call(this,b,c,e)},c)},b}(wc);R.prototype.onNext=function(a){if(!this.isStopped){var b=p(this.predicate).call(this,a,this.i++,this.source);return b===Gb?this.observer.onError(b.e):void(b&&this.observer.onNext(a))}},R.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.observer.onError(a))},R.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.observer.onCompleted())},R.prototype.dispose=function(){this.isStopped=!0},R.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.observer.onError(a),!0)},pc.filter=pc.where=function(a,b){return this instanceof ad?this.internalFilter(a,b):new ad(this,a,b)},pc.aggregate=function(){var a,b,c=!1,d=this;return 2===arguments.length?(c=!0,b=arguments[0],a=arguments[1]):a=arguments[0],new wd(function(e){var f,g,h;return d.subscribe(function(d){
!h&&(h=!0);try{f?g=a(g,d):(g=c?a(b,d):d,f=!0)}catch(i){return e.onError(i)}},function(a){e.onError(a)},function(){h&&e.onNext(g),!h&&c&&e.onNext(b),!h&&!c&&e.onError(new Sa),e.onCompleted()})},d)},pc.reduce=function(a){var b,c=!1,d=this;return 2===arguments.length&&(c=!0,b=arguments[1]),new wd(function(e){var f,g,h;return d.subscribe(function(d){!h&&(h=!0);try{f?g=a(g,d):(g=c?a(b,d):d,f=!0)}catch(i){return e.onError(i)}},function(a){e.onError(a)},function(){h&&e.onNext(g),!h&&c&&e.onNext(b),!h&&!c&&e.onError(new Sa),e.onCompleted()})},d)},pc.some=function(a,b){var c=this;return a?c.filter(a,b).some():new wd(function(a){return c.subscribe(function(){a.onNext(!0),a.onCompleted()},function(b){a.onError(b)},function(){a.onNext(!1),a.onCompleted()})},c)},pc.any=function(){return this.some.apply(this,arguments)},pc.isEmpty=function(){return this.any().map(La)},pc.every=function(a,b){return this.filter(function(b){return!a(b)},b).some().map(La)},pc.all=function(){return this.every.apply(this,arguments)},pc.includes=function(a,b){function c(a,b){return 0===a&&0===b||a===b||isNaN(a)&&isNaN(b)}var d=this;return new wd(function(e){var f=0,g=+b||0;return Math.abs(g)===1/0&&(g=0),0>g?(e.onNext(!1),e.onCompleted(),Nb):d.subscribe(function(b){f++>=g&&c(b,a)&&(e.onNext(!0),e.onCompleted())},function(a){e.onError(a)},function(){e.onNext(!1),e.onCompleted()})},this)},pc.contains=function(a,b){pc.includes(a,b)},pc.count=function(a,b){return a?this.filter(a,b).count():this.reduce(function(a){return a+1},0)},pc.indexOf=function(a,b){var c=this;return new wd(function(d){var e=0,f=+b||0;return Math.abs(f)===1/0&&(f=0),0>f?(d.onNext(-1),d.onCompleted(),Nb):c.subscribe(function(b){e>=f&&b===a&&(d.onNext(e),d.onCompleted()),e++},function(a){d.onError(a)},function(){d.onNext(-1),d.onCompleted()})},c)},pc.sum=function(a,b){return a&&Ma(a)?this.map(a,b).sum():this.reduce(function(a,b){return a+b},0)},pc.minBy=function(a,b){return b||(b=Ia),S(this,a,function(a,c){return-1*b(a,c)})},pc.min=function(a){return this.minBy(Fa,a).map(function(a){return T(a)})},pc.maxBy=function(a,b){return b||(b=Ia),S(this,a,b)},pc.max=function(a){return this.maxBy(Fa,a).map(function(a){return T(a)})},pc.average=function(a,b){return a&&Ma(a)?this.map(a,b).average():this.reduce(function(a,b){return{sum:a.sum+b,count:a.count+1}},{sum:0,count:0}).map(function(a){if(0===a.count)throw new Sa;return a.sum/a.count})},pc.sequenceEqual=function(a,b){var c=this;return b||(b=Ha),new wd(function(d){var e=!1,f=!1,g=[],h=[],i=c.subscribe(function(a){var c,e;if(h.length>0){e=h.shift();try{c=b(e,a)}catch(i){return void d.onError(i)}c||(d.onNext(!1),d.onCompleted())}else f?(d.onNext(!1),d.onCompleted()):g.push(a)},function(a){d.onError(a)},function(){e=!0,0===g.length&&(h.length>0?(d.onNext(!1),d.onCompleted()):f&&(d.onNext(!0),d.onCompleted()))});(ab(a)||_a(a))&&(a=Fc(a)),Ka(a)&&(a=xc(a));var j=a.subscribe(function(a){var c;if(g.length>0){var f=g.shift();try{c=b(f,a)}catch(i){return void d.onError(i)}c||(d.onNext(!1),d.onCompleted())}else e?(d.onNext(!1),d.onCompleted()):h.push(a)},function(a){d.onError(a)},function(){f=!0,0===h.length&&(g.length>0?(d.onNext(!1),d.onCompleted()):e&&(d.onNext(!0),d.onCompleted()))});return new Jb(i,j)},c)},pc.elementAt=function(a){return U(this,a,!1)},pc.elementAtOrDefault=function(a,b){return U(this,a,!0,b)},pc.single=function(a,b){return a&&Ma(a)?this.where(a,b).single():V(this,!1)},pc.singleOrDefault=function(a,b,c){return a&&Ma(a)?this.filter(a,c).singleOrDefault(null,b):V(this,!0,b)},pc.first=function(a,b){return a?this.where(a,b).first():W(this,!1)},pc.firstOrDefault=function(a,b){return a?this.where(a).firstOrDefault(null,b):W(this,!0,b)},pc.last=function(a,b){return a?this.where(a,b).last():X(this,!1)},pc.lastOrDefault=function(a,b,c){return a?this.where(a,c).lastOrDefault(null,b):X(this,!0,b)},pc.find=function(a,b){return Y(this,a,b,!1)},pc.findIndex=function(a,b){return Y(this,a,b,!0)},pc.toSet=function(){if("undefined"==typeof ya.Set)throw new TypeError;var a=this;return new wd(function(b){var c=new ya.Set;return a.subscribe(function(a){c.add(a)},function(a){b.onError(a)},function(){b.onNext(c),b.onCompleted()})},a)},pc.toMap=function(a,b){if("undefined"==typeof ya.Map)throw new TypeError;var c=this;return new wd(function(d){var e=new ya.Map;return c.subscribe(function(c){var f;try{f=a(c)}catch(g){return void d.onError(g)}var h=c;if(b)try{h=b(c)}catch(g){return void d.onError(g)}e.set(f,h)},function(a){d.onError(a)},function(){d.onNext(e),d.onCompleted()})},c)};var bd="function",cd="throw",yb=Da.internals.isObject,dd=Da.spawn=function(a){var b=ca(a);return function(c){function d(a,b){dc.schedule(c.bind(f,a,b))}function e(a,b){var c;if(arguments.length>2)for(var b=[],h=1,i=arguments.length;i>h;h++)b.push(arguments[h]);if(a)try{c=g[cd](a)}catch(j){return d(j)}if(!a)try{c=g.next(b)}catch(j){return d(j)}if(c.done)return d(null,c.value);if(c.value=Z(c.value,f),typeof c.value!==bd)e(new TypeError("Rx.spawn only supports a function, Promise, Observable, Object or Array."));else{var k=!1;try{c.value.call(f,function(){k||(k=!0,e.apply(f,arguments))})}catch(j){dc.schedule(function(){k||(k=!0,e.call(f,j))})}}}var f=this,g=a;if(b){for(var h=[],i=0,j=arguments.length;j>i;i++)h.push(arguments[i]);var j=h.length,k=j&&typeof h[j-1]===bd;c=k?h.pop():ea,g=a.apply(this,h)}else c=c||ea;e()}};vc.start=function(a,b,c){return ed(a,b,c)()};var ed=vc.toAsync=function(a,b,c){return Wb(c)||(c=dc),function(){var d=arguments,e=new Ad;return c.schedule(function(){var c;try{c=a.apply(b,d)}catch(f){return void e.onError(f)}e.onNext(c),e.onCompleted()}),e.asObservable()}};vc.fromCallback=function(a,b,c){return function(){for(var d=arguments.length,e=new Array(d),f=0;d>f;f++)e[f]=arguments[f];return new wd(function(d){function f(){for(var a=arguments.length,e=new Array(a),f=0;a>f;f++)e[f]=arguments[f];if(c){try{e=c.apply(b,e)}catch(g){return d.onError(g)}d.onNext(e)}else e.length<=1?d.onNext.apply(d,e):d.onNext(e);d.onCompleted()}e.push(f),a.apply(b,e)}).publishLast().refCount()}},vc.fromNodeCallback=function(a,b,c){return function(){for(var d=arguments.length,e=new Array(d),f=0;d>f;f++)e[f]=arguments[f];return new wd(function(d){function f(a){if(a)return void d.onError(a);for(var e=arguments.length,f=[],g=1;e>g;g++)f[g-1]=arguments[g];if(c){try{f=c.apply(b,f)}catch(h){return d.onError(h)}d.onNext(f)}else f.length<=1?d.onNext.apply(d,f):d.onNext(f);d.onCompleted()}e.push(f),a.apply(b,e)}).publishLast().refCount()}},Da.config.useNativeEvents=!1,vc.fromEvent=function(a,b,c){return a.addListener?fd(function(c){a.addListener(b,c)},function(c){a.removeListener(b,c)},c):Da.config.useNativeEvents||"function"!=typeof a.on||"function"!=typeof a.off?new wd(function(d){return ga(a,b,function(a){var b=a;if(c)try{b=c(arguments)}catch(e){return d.onError(e)}d.onNext(b)})}).publish().refCount():fd(function(c){a.on(b,c)},function(c){a.off(b,c)},c)};var fd=vc.fromEventPattern=function(a,b,c){return new wd(function(d){function e(a){var b=a;if(c)try{b=c(arguments)}catch(e){return d.onError(e)}d.onNext(b)}var f=a(e);return Mb(function(){b&&b(e,f)})}).publish().refCount()};vc.startAsync=function(a){var b;try{b=a()}catch(c){return Qc(c)}return xc(b)};var gd=function(a){function b(a){var b=this.source.publish(),c=b.subscribe(a),d=Nb,e=this.pauser.distinctUntilChanged().subscribe(function(a){a?d=b.connect():(d.dispose(),d=Nb)});return new Jb(c,d,e)}function c(c,d){this.source=c,this.controller=new zd,this.pauser=d&&d.subscribe?this.controller.merge(d):this.controller,a.call(this,b,c)}return Db(c,a),c.prototype.pause=function(){this.controller.onNext(!1)},c.prototype.resume=function(){this.controller.onNext(!0)},c}(vc);pc.pausable=function(a){return new gd(this,a)};var hd=function(b){function c(b){var c,d=[],e=ha(this.source,this.pauser.distinctUntilChanged().startWith(!1),function(a,b){return{data:a,shouldFire:b}}).subscribe(function(e){if(c!==a&&e.shouldFire!=c){if(c=e.shouldFire,e.shouldFire)for(;d.length>0;)b.onNext(d.shift())}else c=e.shouldFire,e.shouldFire?b.onNext(e.data):d.push(e.data)},function(a){for(;d.length>0;)b.onNext(d.shift());b.onError(a)},function(){for(;d.length>0;)b.onNext(d.shift());b.onCompleted()});return e}function d(a,d){this.source=a,this.controller=new zd,this.pauser=d&&d.subscribe?this.controller.merge(d):this.controller,b.call(this,c,a)}return Db(d,b),d.prototype.pause=function(){this.controller.onNext(!1)},d.prototype.resume=function(){this.controller.onNext(!0)},d}(vc);pc.pausableBuffered=function(a){return new hd(this,a)};var id=function(a){function b(a){return this.source.subscribe(a)}function c(c,d,e){a.call(this,b,c),this.subject=new jd(d,e),this.source=c.multicast(this.subject).refCount()}return Db(c,a),c.prototype.request=function(a){return this.subject.request(null==a?-1:a)},c}(vc),jd=function(a){function b(a){return this.subject.subscribe(a)}function c(c,d){null==c&&(c=!0),a.call(this,b),this.subject=new zd,this.enableQueue=c,this.queue=c?[]:null,this.requestedCount=0,this.requestedDisposable=Nb,this.error=null,this.hasFailed=!1,this.hasCompleted=!1,this.scheduler=d||_b}return Db(c,a),Eb(c.prototype,nc,{onCompleted:function(){this.hasCompleted=!0,this.enableQueue&&0!==this.queue.length?this.queue.push(fc.createOnCompleted()):this.subject.onCompleted()},onError:function(a){this.hasFailed=!0,this.error=a,this.enableQueue&&0!==this.queue.length?this.queue.push(fc.createOnError(a)):this.subject.onError(a)},onNext:function(a){var b=!1;0===this.requestedCount?this.enableQueue&&this.queue.push(fc.createOnNext(a)):(-1!==this.requestedCount&&0===this.requestedCount--&&this.disposeCurrentRequest(),b=!0),b&&this.subject.onNext(a)},_processRequest:function(a){if(this.enableQueue){for(;this.queue.length>=a&&a>0||this.queue.length>0&&"N"!==this.queue[0].kind;){var b=this.queue.shift();b.accept(this.subject),"N"===b.kind?a--:(this.disposeCurrentRequest(),this.queue=[])}return{numberOfItems:a,returnValue:0!==this.queue.length}}return{numberOfItems:a,returnValue:!1}},request:function(a){this.disposeCurrentRequest();var b=this;return this.requestedDisposable=this.scheduler.scheduleWithState(a,function(a,c){var d=b._processRequest(c),e=d.numberOfItems;d.returnValue||(b.requestedCount=e,b.requestedDisposable=Mb(function(){b.requestedCount=0}))}),this.requestedDisposable},disposeCurrentRequest:function(){this.requestedDisposable.dispose(),this.requestedDisposable=Nb}}),c}(vc);pc.controlled=function(a,b){return a&&Wb(a)&&(b=a,a=!0),null==a&&(a=!0),new id(this,a,b)};var kd=function(a){function b(a){this.subscription=this.source.subscribe(new d(a,this,this.subscription));var b=this;return dc.schedule(function(){b.source.request(1)}),this.subscription}function c(c){a.call(this,b,c),this.source=c}Db(c,a);var d=function(a){function b(b,c,d){a.call(this),this.observer=b,this.observable=c,this.cancel=d}Db(b,a);var c=b.prototype;return c.completed=function(){this.observer.onCompleted(),this.dispose()},c.error=function(a){this.observer.onError(a),this.dispose()},c.next=function(a){this.observer.onNext(a);var b=this;dc.schedule(function(){b.observable.source.request(1)})},c.dispose=function(){this.observer=null,this.cancel&&(this.cancel.dispose(),this.cancel=null),a.prototype.dispose.call(this)},b}(qc);return c}(vc);id.prototype.stopAndWait=function(){return new kd(this)};var ld=function(a){function b(a){this.subscription=this.source.subscribe(new d(a,this,this.subscription));var b=this;return dc.schedule(function(){b.source.request(b.windowSize)}),this.subscription}function c(c,d){a.call(this,b,c),this.source=c,this.windowSize=d}Db(c,a);var d=function(a){function b(a,b,c){this.observer=a,this.observable=b,this.cancel=c,this.received=0}Db(b,a);var c=b.prototype;return c.completed=function(){this.observer.onCompleted(),this.dispose()},c.error=function(a){this.observer.onError(a),this.dispose()},c.next=function(a){if(this.observer.onNext(a),this.received=++this.received%this.observable.windowSize,0===this.received){var b=this;dc.schedule(function(){b.observable.source.request(b.observable.windowSize)})}},c.dispose=function(){this.observer=null,this.cancel&&(this.cancel.dispose(),this.cancel=null),a.prototype.dispose.call(this)},b}(qc);return c}(vc);id.prototype.windowed=function(a){return new ld(this,a)},pc.pipe=function(a){function b(){c.resume()}var c=this.pausableBuffered();return a.addListener("drain",b),c.subscribe(function(b){!a.write(String(b))&&c.pause()},function(b){a.emit("error",b)},function(){!a._isStdio&&a.end(),a.removeListener("drain",b)}),c.resume(),a},pc.multicast=function(a,b){var c=this;return"function"==typeof a?new wd(function(d){var e=c.multicast(a());return new Jb(b(e).subscribe(d),e.connect())},c):new pd(c,a)},pc.publish=function(a){return a&&Ma(a)?this.multicast(function(){return new zd},a):this.multicast(new zd)},pc.share=function(){return this.publish().refCount()},pc.publishLast=function(a){return a&&Ma(a)?this.multicast(function(){return new Ad},a):this.multicast(new Ad)},pc.publishValue=function(a,b){return 2===arguments.length?this.multicast(function(){return new nd(b)},a):this.multicast(new nd(a))},pc.shareValue=function(a){return this.publishValue(a).refCount()},pc.replay=function(a,b,c,d){return a&&Ma(a)?this.multicast(function(){return new od(b,c,d)},a):this.multicast(new od(b,c,d))},pc.shareReplay=function(a,b,c){return this.replay(null,a,b,c).refCount()};var md=function(a,b){this.subject=a,this.observer=b};md.prototype.dispose=function(){if(!this.subject.isDisposed&&null!==this.observer){var a=this.subject.observers.indexOf(this.observer);this.subject.observers.splice(a,1),this.observer=null}};var nd=Da.BehaviorSubject=function(a){function c(a){return Pb(this),this.isStopped?(this.hasError?a.onError(this.error):a.onCompleted(),Nb):(this.observers.push(a),a.onNext(this.value),new md(this,a))}function d(b){a.call(this,c),this.value=b,this.observers=[],this.isDisposed=!1,this.isStopped=!1,this.hasError=!1}return Db(d,a),Eb(d.prototype,nc,{getValue:function(){if(Pb(this),this.hasError)throw this.error;return this.value},hasObservers:function(){return this.observers.length>0},onCompleted:function(){if(Pb(this),!this.isStopped){this.isStopped=!0;for(var a=0,c=b(this.observers),d=c.length;d>a;a++)c[a].onCompleted();this.observers.length=0}},onError:function(a){if(Pb(this),!this.isStopped){this.isStopped=!0,this.hasError=!0,this.error=a;for(var c=0,d=b(this.observers),e=d.length;e>c;c++)d[c].onError(a);this.observers.length=0}},onNext:function(a){if(Pb(this),!this.isStopped){this.value=a;for(var c=0,d=b(this.observers),e=d.length;e>c;c++)d[c].onNext(a)}},dispose:function(){this.isDisposed=!0,this.observers=null,this.value=null,this.exception=null}}),d}(vc),od=Da.ReplaySubject=function(a){function c(a,b){return Mb(function(){b.dispose(),!a.isDisposed&&a.observers.splice(a.observers.indexOf(b),1)})}function d(a){var b=new tc(this.scheduler,a),d=c(this,b);Pb(this),this._trim(this.scheduler.now()),this.observers.push(b);for(var e=0,f=this.q.length;f>e;e++)b.onNext(this.q[e].value);return this.hasError?b.onError(this.error):this.isStopped&&b.onCompleted(),b.ensureActive(),d}function e(b,c,e){this.bufferSize=null==b?f:b,this.windowSize=null==c?f:c,this.scheduler=e||_b,this.q=[],this.observers=[],this.isStopped=!1,this.isDisposed=!1,this.hasError=!1,this.error=null,a.call(this,d)}var f=Math.pow(2,53)-1;return Db(e,a),Eb(e.prototype,nc.prototype,{hasObservers:function(){return this.observers.length>0},_trim:function(a){for(;this.q.length>this.bufferSize;)this.q.shift();for(;this.q.length>0&&a-this.q[0].interval>this.windowSize;)this.q.shift()},onNext:function(a){if(Pb(this),!this.isStopped){var c=this.scheduler.now();this.q.push({interval:c,value:a}),this._trim(c);for(var d=0,e=b(this.observers),f=e.length;f>d;d++){var g=e[d];g.onNext(a),g.ensureActive()}}},onError:function(a){if(Pb(this),!this.isStopped){this.isStopped=!0,this.error=a,this.hasError=!0;var c=this.scheduler.now();this._trim(c);for(var d=0,e=b(this.observers),f=e.length;f>d;d++){var g=e[d];g.onError(a),g.ensureActive()}this.observers.length=0}},onCompleted:function(){if(Pb(this),!this.isStopped){this.isStopped=!0;var a=this.scheduler.now();this._trim(a);for(var c=0,d=b(this.observers),e=d.length;e>c;c++){var f=d[c];f.onCompleted(),f.ensureActive()}this.observers.length=0}},dispose:function(){this.isDisposed=!0,this.observers=null}}),e}(vc),pd=Da.ConnectableObservable=function(a){function b(b,c){var d,e=!1,f=b.asObservable();this.connect=function(){return e||(e=!0,d=new Jb(f.subscribe(c),Mb(function(){e=!1}))),d},a.call(this,function(a){return c.subscribe(a)})}return Db(b,a),b.prototype.refCount=function(){var a,b=0,c=this;return new wd(function(d){var e=1===++b,f=c.subscribe(d);return e&&(a=c.connect()),function(){f.dispose(),0===--b&&a.dispose()}})},b}(vc),qd=function(){function b(a){if(0===(1&a))return 2===a;for(var b=Math.sqrt(a),c=3;b>=c;){if(a%c===0)return!1;c+=2}return!0}function c(a){var c,d,e;for(c=0;c<h.length;++c)if(d=h[c],d>=a)return d;for(e=1|a;e<h[h.length-1];){if(b(e))return e;e+=2}return a}function d(a){var b=757602046;if(!a.length)return b;for(var c=0,d=a.length;d>c;c++){var e=a.charCodeAt(c);b=(b<<5)-b+e,b&=b}return b}function e(a){var b=668265261;return a=61^a^a>>>16,a+=a<<3,a^=a>>>4,a*=b,a^=a>>>15}function f(){return{key:null,value:null,next:0,hashCode:0}}function g(a,b){if(0>a)throw new Ua;a>0&&this._initialize(a),this.comparer=b||Ha,this.freeCount=0,this.size=0,this.freeList=-1}var h=[1,3,7,13,31,61,127,251,509,1021,2039,4093,8191,16381,32749,65521,131071,262139,524287,1048573,2097143,4194301,8388593,16777213,33554393,67108859,134217689,268435399,536870909,1073741789,2147483647],i="no such key",j="duplicate key",k=function(){var a=0;return function(b){if(null==b)throw new Error(i);if("string"==typeof b)return d(b);if("number"==typeof b)return e(b);if("boolean"==typeof b)return b===!0?1:0;if(b instanceof Date)return e(b.valueOf());if(b instanceof RegExp)return d(b.toString());if("function"==typeof b.valueOf){var c=b.valueOf();if("number"==typeof c)return e(c);if("string"==typeof c)return d(c)}if(b.hashCode)return b.hashCode();var f=17*a++;return b.hashCode=function(){return f},f}}(),l=g.prototype;return l._initialize=function(a){var b,d=c(a);for(this.buckets=new Array(d),this.entries=new Array(d),b=0;d>b;b++)this.buckets[b]=-1,this.entries[b]=f();this.freeList=-1},l.add=function(a,b){this._insert(a,b,!0)},l._insert=function(a,b,c){this.buckets||this._initialize(0);for(var d,e=2147483647&k(a),f=e%this.buckets.length,g=this.buckets[f];g>=0;g=this.entries[g].next)if(this.entries[g].hashCode===e&&this.comparer(this.entries[g].key,a)){if(c)throw new Error(j);return void(this.entries[g].value=b)}this.freeCount>0?(d=this.freeList,this.freeList=this.entries[d].next,--this.freeCount):(this.size===this.entries.length&&(this._resize(),f=e%this.buckets.length),d=this.size,++this.size),this.entries[d].hashCode=e,this.entries[d].next=this.buckets[f],this.entries[d].key=a,this.entries[d].value=b,this.buckets[f]=d},l._resize=function(){var a=c(2*this.size),b=new Array(a);for(e=0;e<b.length;++e)b[e]=-1;var d=new Array(a);for(e=0;e<this.size;++e)d[e]=this.entries[e];for(var e=this.size;a>e;++e)d[e]=f();for(var g=0;g<this.size;++g){var h=d[g].hashCode%a;d[g].next=b[h],b[h]=g}this.buckets=b,this.entries=d},l.remove=function(a){if(this.buckets)for(var b=2147483647&k(a),c=b%this.buckets.length,d=-1,e=this.buckets[c];e>=0;e=this.entries[e].next){if(this.entries[e].hashCode===b&&this.comparer(this.entries[e].key,a))return 0>d?this.buckets[c]=this.entries[e].next:this.entries[d].next=this.entries[e].next,this.entries[e].hashCode=-1,this.entries[e].next=this.freeList,this.entries[e].key=null,this.entries[e].value=null,this.freeList=e,++this.freeCount,!0;d=e}return!1},l.clear=function(){var a,b;if(!(this.size<=0)){for(a=0,b=this.buckets.length;b>a;++a)this.buckets[a]=-1;for(a=0;a<this.size;++a)this.entries[a]=f();this.freeList=-1,this.size=0}},l._findEntry=function(a){if(this.buckets)for(var b=2147483647&k(a),c=this.buckets[b%this.buckets.length];c>=0;c=this.entries[c].next)if(this.entries[c].hashCode===b&&this.comparer(this.entries[c].key,a))return c;return-1},l.count=function(){return this.size-this.freeCount},l.tryGetValue=function(b){var c=this._findEntry(b);return c>=0?this.entries[c].value:a},l.getValues=function(){var a=0,b=[];if(this.entries)for(var c=0;c<this.size;c++)this.entries[c].hashCode>=0&&(b[a++]=this.entries[c].value);return b},l.get=function(a){var b=this._findEntry(a);if(b>=0)return this.entries[b].value;throw new Error(i)},l.set=function(a,b){this._insert(a,b,!1)},l.containskey=function(a){return this._findEntry(a)>=0},g}();pc.join=function(a,b,c,d){var e=this;return new wd(function(f){var g=new Jb,h=!1,i=!1,j=0,k=0,l=new qd,m=new qd;return g.add(e.subscribe(function(a){var c=j++,e=new Qb;l.add(c,a),g.add(e);var i,k=function(){l.remove(c)&&0===l.count()&&h&&f.onCompleted(),g.remove(e)};try{i=b(a)}catch(n){return void f.onError(n)}e.setDisposable(i.take(1).subscribe(Ea,f.onError.bind(f),k)),m.getValues().forEach(function(b){var c;try{c=d(a,b)}catch(e){return void f.onError(e)}f.onNext(c)})},f.onError.bind(f),function(){h=!0,(i||0===l.count())&&f.onCompleted()})),g.add(a.subscribe(function(a){var b=k++,e=new Qb;m.add(b,a),g.add(e);var h,j=function(){m.remove(b)&&0===m.count()&&i&&f.onCompleted(),g.remove(e)};try{h=c(a)}catch(n){return void f.onError(n)}e.setDisposable(h.take(1).subscribe(Ea,f.onError.bind(f),j)),l.getValues().forEach(function(b){var c;try{c=d(b,a)}catch(e){return void f.onError(e)}f.onNext(c)})},f.onError.bind(f),function(){i=!0,(h||0===m.count())&&f.onCompleted()})),g},e)},pc.groupJoin=function(a,b,c,d){var e=this;return new wd(function(f){function g(a){return function(b){b.onError(a)}}var h=new Jb,i=new Sb(h),j=new qd,k=new qd,l=0,m=0;return h.add(e.subscribe(function(a){var c=new zd,e=l++;j.add(e,c);var m;try{m=d(a,Fb(c,i))}catch(n){return j.getValues().forEach(g(n)),void f.onError(n)}f.onNext(m),k.getValues().forEach(function(a){c.onNext(a)});var o=new Qb;h.add(o);var p,q=function(){j.remove(e)&&c.onCompleted(),h.remove(o)};try{p=b(a)}catch(n){return j.getValues().forEach(g(n)),void f.onError(n)}o.setDisposable(p.take(1).subscribe(Ea,function(a){j.getValues().forEach(g(a)),f.onError(a)},q))},function(a){j.getValues().forEach(g(a)),f.onError(a)},f.onCompleted.bind(f))),h.add(a.subscribe(function(a){var b=m++;k.add(b,a);var d=new Qb;h.add(d);var e,i=function(){k.remove(b),h.remove(d)};try{e=c(a)}catch(l){return j.getValues().forEach(g(l)),void f.onError(l)}d.setDisposable(e.take(1).subscribe(Ea,function(a){j.getValues().forEach(g(a)),f.onError(a)},i)),j.getValues().forEach(function(b){b.onNext(a)})},function(a){j.getValues().forEach(g(a)),f.onError(a)})),i},e)},pc.buffer=function(){return this.window.apply(this,arguments).selectMany(function(a){return a.toArray()})},pc.window=function(a,b){return 1===arguments.length&&"function"!=typeof arguments[0]?ja.call(this,a):"function"==typeof a?ka.call(this,a):ia.call(this,a,b)},pc.pairwise=function(){var a=this;return new wd(function(b){var c,d=!1;return a.subscribe(function(a){d?b.onNext([c,a]):d=!0,c=a},b.onError.bind(b),b.onCompleted.bind(b))},a)},pc.partition=function(a,b){return[this.filter(a,b),this.filter(function(c,d,e){return!a.call(b,c,d,e)})]},pc.letBind=pc.let=function(a){return a(this)},vc["if"]=vc.ifThen=function(a,b,c){return zc(function(){return c||(c=Bc()),Ka(b)&&(b=xc(b)),Ka(c)&&(c=xc(c)),"function"==typeof c.now&&(c=Bc(c)),a()?b:c})},vc["for"]=vc.forIn=function(a,b,c){return mc(a,b,c).concat()};var rd=vc["while"]=vc.whileDo=function(a,b){return Ka(b)&&(b=xc(b)),la(a,b).concat()};pc.doWhile=function(a){return Tc([this,rd(a,this)])},vc["case"]=vc.switchCase=function(a,b,c){return zc(function(){Ka(c)&&(c=xc(c)),c||(c=Bc()),"function"==typeof c.now&&(c=Bc(c));var d=b[a()];return Ka(d)&&(d=xc(d)),d||c})},pc.expand=function(a,b){Wb(b)||(b=$b);var c=this;return new wd(function(d){var e=[],f=new Rb,g=new Jb(f),h=0,i=!1,j=function(){var c=!1;e.length>0&&(c=!i,i=!0),c&&f.setDisposable(b.scheduleRecursive(function(b){var c;if(!(e.length>0))return void(i=!1);c=e.shift();var f=new Qb;g.add(f),f.setDisposable(c.subscribe(function(b){d.onNext(b);var c=null;try{c=a(b)}catch(f){d.onError(f)}e.push(c),h++,j()},d.onError.bind(d),function(){g.remove(f),h--,0===h&&d.onCompleted()})),b()}))};return e.push(c),h++,j(),g},this)},vc.forkJoin=function(){var a=[];if(Array.isArray(arguments[0]))a=arguments[0];else for(var b=0,c=arguments.length;c>b;b++)a.push(arguments[b]);return new wd(function(b){var c=a.length;if(0===c)return b.onCompleted(),Nb;for(var d=new Jb,e=!1,f=new Array(c),g=new Array(c),h=new Array(c),i=0;c>i;i++)!function(i){var j=a[i];Ka(j)&&(j=xc(j)),d.add(j.subscribe(function(a){e||(f[i]=!0,h[i]=a)},function(a){e=!0,b.onError(a),d.dispose()},function(){if(!e){if(!f[i])return void b.onCompleted();g[i]=!0;for(var a=0;c>a;a++)if(!g[a])return;e=!0,b.onNext(h),b.onCompleted()}}))}(i);return d})},pc.forkJoin=function(a,b){var c=this;return new wd(function(d){var e,f,g=!1,h=!1,i=!1,j=!1,k=new Qb,l=new Qb;return Ka(a)&&(a=xc(a)),k.setDisposable(c.subscribe(function(a){i=!0,e=a},function(a){l.dispose(),d.onError(a)},function(){if(g=!0,h)if(i)if(j){var a;try{a=b(e,f)}catch(c){return void d.onError(c)}d.onNext(a),d.onCompleted()}else d.onCompleted();else d.onCompleted()})),l.setDisposable(a.subscribe(function(a){j=!0,f=a},function(a){k.dispose(),d.onError(a)},function(){if(h=!0,g)if(i)if(j){var a;try{a=b(e,f)}catch(c){return void d.onError(c)}d.onNext(a),d.onCompleted()}else d.onCompleted();else d.onCompleted()})),new Jb(k,l)},c)},pc.manySelect=function(a,b){Wb(b)||(b=$b);var c=this;return zc(function(){var d;return c.map(function(a){var b=new sd(a);return d&&d.onNext(a),d=b,b}).tap(Ea,function(a){d&&d.onError(a)},function(){d&&d.onCompleted()}).observeOn(b).map(a)},c)};var sd=function(a){function b(a){var b=this,c=new Jb;return c.add(_b.schedule(function(){a.onNext(b.head),c.add(b.tail.mergeAll().subscribe(a))})),c}function c(c){a.call(this,b),this.head=c,this.tail=new Ad}return Db(c,a),Eb(c.prototype,nc,{onCompleted:function(){this.onNext(vc.empty())},onError:function(a){this.onNext(vc.throwError(a))},onNext:function(a){this.tail.onNext(a),this.tail.onCompleted()}}),c}(vc),td=ya.Map||function(){function b(){this._keys=[],this._values=[]}return b.prototype.get=function(b){var c=this._keys.indexOf(b);return-1!==c?this._values[c]:a},b.prototype.set=function(a,b){var c=this._keys.indexOf(a);-1!==c&&(this._values[c]=b),this._values[this._keys.push(a)-1]=b},b.prototype.forEach=function(a,b){for(var c=0,d=this._keys.length;d>c;c++)a.call(b,this._values[c],this._keys[c])},b}();ma.prototype.and=function(a){return new ma(this.patterns.concat(a))},ma.prototype.thenDo=function(a){return new na(this,a)},na.prototype.activate=function(a,b,c){for(var d=this,e=[],f=0,g=this.expression.patterns.length;g>f;f++)e.push(oa(a,this.expression.patterns[f],b.onError.bind(b)));var h=new pa(e,function(){var a;try{a=d.selector.apply(d,arguments)}catch(c){return void b.onError(c)}b.onNext(a)},function(){for(var a=0,b=e.length;b>a;a++)e[a].removeActivePlan(h);c(h)});for(f=0,g=e.length;g>f;f++)e[f].addActivePlan(h);return h},pa.prototype.dequeue=function(){this.joinObservers.forEach(function(a){a.queue.shift()})},pa.prototype.match=function(){var a,b,c=!0;for(a=0,b=this.joinObserverArray.length;b>a;a++)if(0===this.joinObserverArray[a].queue.length){c=!1;break}if(c){var d=[],e=!1;for(a=0,b=this.joinObserverArray.length;b>a;a++)d.push(this.joinObserverArray[a].queue[0]),"C"===this.joinObserverArray[a].queue[0].kind&&(e=!0);if(e)this.onCompleted();else{this.dequeue();var f=[];for(a=0,b=d.length;a<d.length;a++)f.push(d[a].value);this.onNext.apply(this,f)}}};var ud=function(a){function b(b,c){a.call(this),this.source=b,this.onError=c,this.queue=[],this.activePlans=[],this.subscription=new Qb,this.isDisposed=!1}Db(b,a);var c=b.prototype;return c.next=function(a){if(!this.isDisposed){if("E"===a.kind)return this.onError(a.exception);this.queue.push(a);for(var b=this.activePlans.slice(0),c=0,d=b.length;d>c;c++)b[c].match()}},c.error=Ea,c.completed=Ea,c.addActivePlan=function(a){this.activePlans.push(a)},c.subscribe=function(){this.subscription.setDisposable(this.source.materialize().subscribe(this))},c.removeActivePlan=function(a){this.activePlans.splice(this.activePlans.indexOf(a),1),0===this.activePlans.length&&this.dispose()},c.dispose=function(){a.prototype.dispose.call(this),this.isDisposed||(this.isDisposed=!0,this.subscription.dispose())},b}(qc);pc.and=function(a){return new ma([this,a])},pc.thenDo=function(a){return new ma([this]).thenDo(a)},vc.when=function(){var a,b=arguments.length;if(Array.isArray(arguments[0]))a=arguments[0];else{a=new Array(b);for(var c=0;b>c;c++)a[c]=arguments[c]}return new wd(function(b){var c=[],d=new td,e=oc(function(a){b.onNext(a)},function(a){d.forEach(function(b){b.onError(a)}),b.onError(a)},function(){b.onCompleted()});try{for(var f=0,g=a.length;g>f;f++)c.push(a[f].activate(d,e,function(a){var d=c.indexOf(a);c.splice(d,1),0===c.length&&b.onCompleted()}))}catch(h){Qc(h).subscribe(b)}var i=new Jb;return d.forEach(function(a){a.subscribe(),i.add(a)}),i})};{var vd=vc.interval=function(a,b){return ta(a,a,Wb(b)?b:dc)};vc.timer=function(b,c,d){var e;return Wb(d)||(d=dc),c!==a&&"number"==typeof c?e=c:Wb(c)&&(d=c),b instanceof Date&&e===a?qa(b.getTime(),d):b instanceof Date&&e!==a?(e=c,ra(b.getTime(),e,d)):e===a?sa(b,d):ta(b,e,d)}}pc.delay=function(a,b){return Wb(b)||(b=dc),a instanceof Date?va(this,a.getTime(),b):ua(this,a,b)},pc.debounce=pc.throttleWithTimeout=function(a,b){Wb(b)||(b=dc);var c=this;return new wd(function(d){var e,f=new Rb,g=!1,h=0,i=c.subscribe(function(c){g=!0,e=c,h++;var i=h,j=new Qb;f.setDisposable(j),j.setDisposable(b.scheduleWithRelative(a,function(){g&&h===i&&d.onNext(e),g=!1}))},function(a){f.dispose(),d.onError(a),g=!1,h++},function(){f.dispose(),g&&d.onNext(e),d.onCompleted(),g=!1,h++});return new Jb(i,f)},this)},pc.throttle=function(a,b){return this.debounce(a,b)},pc.windowWithTime=function(a,b,c){var d,e=this;return null==b&&(d=a),Wb(c)||(c=dc),"number"==typeof b?d=b:Wb(b)&&(d=a,c=b),new wd(function(b){function f(){var a=new Qb,e=!1,g=!1;l.setDisposable(a),j===i?(e=!0,g=!0):i>j?e=!0:g=!0;var n=e?j:i,o=n-m;m=n,e&&(j+=d),g&&(i+=d),a.setDisposable(c.scheduleWithRelative(o,function(){if(g){var a=new zd;k.push(a),b.onNext(Fb(a,h))}e&&k.shift().onCompleted(),f()}))}var g,h,i=d,j=a,k=[],l=new Rb,m=0;return g=new Jb(l),h=new Sb(g),k.push(new zd),b.onNext(Fb(k[0],h)),f(),g.add(e.subscribe(function(a){for(var b=0,c=k.length;c>b;b++)k[b].onNext(a)},function(a){for(var c=0,d=k.length;d>c;c++)k[c].onError(a);b.onError(a)},function(){for(var a=0,c=k.length;c>a;a++)k[a].onCompleted();b.onCompleted()})),h},e)},pc.windowWithTimeOrCount=function(a,b,c){var d=this;return Wb(c)||(c=dc),new wd(function(e){function f(b){var d=new Qb;g.setDisposable(d),d.setDisposable(c.scheduleWithRelative(a,function(){if(b===k){j=0;var a=++k;l.onCompleted(),l=new zd,e.onNext(Fb(l,i)),f(a)}}))}var g=new Rb,h=new Jb(g),i=new Sb(h),j=0,k=0,l=new zd;return e.onNext(Fb(l,i)),f(0),h.add(d.subscribe(function(a){var c=0,d=!1;l.onNext(a),++j===b&&(d=!0,j=0,c=++k,l.onCompleted(),l=new zd,e.onNext(Fb(l,i))),d&&f(c)},function(a){l.onError(a),e.onError(a)},function(){l.onCompleted(),e.onCompleted()})),i},d)},pc.bufferWithTime=function(){return this.windowWithTime.apply(this,arguments).selectMany(function(a){return a.toArray()})},pc.bufferWithTimeOrCount=function(a,b,c){return this.windowWithTimeOrCount(a,b,c).selectMany(function(a){return a.toArray()})},pc.timeInterval=function(a){var b=this;return Wb(a)||(a=dc),zc(function(){var c=a.now();return b.map(function(b){var d=a.now(),e=d-c;return c=d,{value:b,interval:e}})})},pc.timestamp=function(a){return Wb(a)||(a=dc),this.map(function(b){return{value:b,timestamp:a.now()}})},pc.sample=pc.throttleLatest=function(a,b){return Wb(b)||(b=dc),"number"==typeof a?wa(this,vd(a,b)):wa(this,a)},
pc.timeout=function(a,b,c){(null==b||"string"==typeof b)&&(b=Qc(new Error(b||"Timeout"))),Wb(c)||(c=dc);var d=this,e=a instanceof Date?"scheduleWithAbsolute":"scheduleWithRelative";return new wd(function(f){function g(){var d=h;l.setDisposable(c[e](a,function(){h===d&&(Ka(b)&&(b=xc(b)),j.setDisposable(b.subscribe(f)))}))}var h=0,i=new Qb,j=new Rb,k=!1,l=new Rb;return j.setDisposable(i),g(),i.setDisposable(d.subscribe(function(a){k||(h++,f.onNext(a),g())},function(a){k||(h++,f.onError(a))},function(){k||(h++,f.onCompleted())})),new Jb(j,l)},d)},vc.generateWithAbsoluteTime=function(a,b,c,d,e,f){return Wb(f)||(f=dc),new wd(function(g){var h,i,j=!0,k=!1,l=a;return f.scheduleRecursiveWithAbsolute(f.now(),function(a){k&&g.onNext(h);try{j?j=!1:l=c(l),k=b(l),k&&(h=d(l),i=e(l))}catch(f){return void g.onError(f)}k?a(i):g.onCompleted()})})},vc.generateWithRelativeTime=function(a,b,c,d,e,f){return Wb(f)||(f=dc),new wd(function(g){var h,i,j=!0,k=!1,l=a;return f.scheduleRecursiveWithRelative(0,function(a){k&&g.onNext(h);try{j?j=!1:l=c(l),k=b(l),k&&(h=d(l),i=e(l))}catch(f){return void g.onError(f)}k?a(i):g.onCompleted()})})},pc.delaySubscription=function(a,b){var c=a instanceof Date?"scheduleWithAbsolute":"scheduleWithRelative",d=this;return Wb(b)||(b=dc),new wd(function(e){var f=new Rb;return f.setDisposable(b[c](a,function(){f.setDisposable(d.subscribe(e))})),f},this)},pc.delayWithSelector=function(a,b){var c,d,e=this;return Ma(a)?d=a:(c=a,d=b),new wd(function(a){function b(){i.setDisposable(e.subscribe(function(b){var c=p(d)(b);if(c===Gb)return a.onError(c.e);var e=new Qb;g.add(e),e.setDisposable(c.subscribe(function(){a.onNext(b),g.remove(e),f()},function(b){a.onError(b)},function(){a.onNext(b),g.remove(e),f()}))},function(b){a.onError(b)},function(){h=!0,i.dispose(),f()}))}function f(){h&&0===g.length&&a.onCompleted()}var g=new Jb,h=!1,i=new Rb;return c?i.setDisposable(c.subscribe(b,function(b){a.onError(b)},b)):b(),new Jb(i,g)},this)},pc.timeoutWithSelector=function(a,b,c){1===arguments.length&&(b=a,a=Jc()),c||(c=Qc(new Error("Timeout")));var d=this;return new wd(function(e){function f(a){function b(){return k===d}var d=k,f=new Qb;i.setDisposable(f),f.setDisposable(a.subscribe(function(){b()&&h.setDisposable(c.subscribe(e)),f.dispose()},function(a){b()&&e.onError(a)},function(){b()&&h.setDisposable(c.subscribe(e))}))}function g(){var a=!l;return a&&k++,a}var h=new Rb,i=new Rb,j=new Qb;h.setDisposable(j);var k=0,l=!1;return f(a),j.setDisposable(d.subscribe(function(a){if(g()){e.onNext(a);var c;try{c=b(a)}catch(d){return void e.onError(d)}f(Ka(c)?xc(c):c)}},function(a){g()&&e.onError(a)},function(){g()&&e.onCompleted()})),new Jb(h,i)},d)},pc.debounceWithSelector=function(a){var b=this;return new wd(function(c){var d,e=!1,f=new Rb,g=0,h=b.subscribe(function(b){var h;try{h=a(b)}catch(i){return void c.onError(i)}Ka(h)&&(h=xc(h)),e=!0,d=b,g++;var j=g,k=new Qb;f.setDisposable(k),k.setDisposable(h.subscribe(function(){e&&g===j&&c.onNext(d),e=!1,k.dispose()},c.onError.bind(c),function(){e&&g===j&&c.onNext(d),e=!1,k.dispose()}))},function(a){f.dispose(),c.onError(a),e=!1,g++},function(){f.dispose(),e&&c.onNext(d),c.onCompleted(),e=!1,g++});return new Jb(h,f)},b)},pc.throttleWithSelector=function(a){return this.debounceWithSelector(a)},pc.skipLastWithTime=function(a,b){Wb(b)||(b=dc);var c=this;return new wd(function(d){var e=[];return c.subscribe(function(c){var f=b.now();for(e.push({interval:f,value:c});e.length>0&&f-e[0].interval>=a;)d.onNext(e.shift().value)},function(a){d.onError(a)},function(){for(var c=b.now();e.length>0&&c-e[0].interval>=a;)d.onNext(e.shift().value);d.onCompleted()})},c)},pc.takeLastWithTime=function(a,b){var c=this;return Wb(b)||(b=dc),new wd(function(d){var e=[];return c.subscribe(function(c){var d=b.now();for(e.push({interval:d,value:c});e.length>0&&d-e[0].interval>=a;)e.shift()},function(a){d.onError(a)},function(){for(var c=b.now();e.length>0;){var f=e.shift();c-f.interval<=a&&d.onNext(f.value)}d.onCompleted()})},c)},pc.takeLastBufferWithTime=function(a,b){var c=this;return Wb(b)||(b=dc),new wd(function(d){var e=[];return c.subscribe(function(c){var d=b.now();for(e.push({interval:d,value:c});e.length>0&&d-e[0].interval>=a;)e.shift()},function(a){d.onError(a)},function(){for(var c=b.now(),f=[];e.length>0;){var g=e.shift();c-g.interval<=a&&f.push(g.value)}d.onNext(f),d.onCompleted()})},c)},pc.takeWithTime=function(a,b){var c=this;return Wb(b)||(b=dc),new wd(function(d){return new Jb(b.scheduleWithRelative(a,function(){d.onCompleted()}),c.subscribe(d))},c)},pc.skipWithTime=function(a,b){var c=this;return Wb(b)||(b=dc),new wd(function(d){var e=!1;return new Jb(b.scheduleWithRelative(a,function(){e=!0}),c.subscribe(function(a){e&&d.onNext(a)},d.onError.bind(d),d.onCompleted.bind(d)))},c)},pc.skipUntilWithTime=function(a,b){Wb(b)||(b=dc);var c=this,d=a instanceof Date?"scheduleWithAbsolute":"scheduleWithRelative";return new wd(function(e){var f=!1;return new Jb(b[d](a,function(){f=!0}),c.subscribe(function(a){f&&e.onNext(a)},function(a){e.onError(a)},function(){e.onCompleted()}))},c)},pc.takeUntilWithTime=function(a,b){Wb(b)||(b=dc);var c=this,d=a instanceof Date?"scheduleWithAbsolute":"scheduleWithRelative";return new wd(function(e){return new Jb(b[d](a,function(){e.onCompleted()}),c.subscribe(e))},c)},pc.throttleFirst=function(a,b){Wb(b)||(b=dc);var c=+a||0;if(0>=c)throw new RangeError("windowDuration cannot be less or equal zero.");var d=this;return new wd(function(a){var e=0;return d.subscribe(function(d){var f=b.now();(0===e||f-e>=c)&&(e=f,a.onNext(d))},function(b){a.onError(b)},function(){a.onCompleted()})},d)},pc.transduce=function(a){function b(a){return{"@@transducer/init":function(){return a},"@@transducer/step":function(a,b){return a.onNext(b)},"@@transducer/result":function(a){return a.onCompleted()}}}var c=this;return new wd(function(d){var e=a(b(d));return c.subscribe(function(a){try{e["@@transducer/step"](d,a)}catch(b){d.onError(b)}},function(a){d.onError(a)},function(){e["@@transducer/result"](d)})},c)},pc.exclusive=function(){var a=this;return new wd(function(b){var c=!1,d=!1,e=new Qb,f=new Jb;return f.add(e),e.setDisposable(a.subscribe(function(a){if(!c){c=!0,Ka(a)&&(a=xc(a));var e=new Qb;f.add(e),e.setDisposable(a.subscribe(b.onNext.bind(b),b.onError.bind(b),function(){f.remove(e),c=!1,d&&1===f.length&&b.onCompleted()}))}},b.onError.bind(b),function(){d=!0,c||1!==f.length||b.onCompleted()})),f},this)},pc.exclusiveMap=function(a,b){var c=this,d=cb(a,b,3);return new wd(function(a){var b=0,e=!1,f=!0,g=new Qb,h=new Jb;return h.add(g),g.setDisposable(c.subscribe(function(c){e||(e=!0,innerSubscription=new Qb,h.add(innerSubscription),Ka(c)&&(c=xc(c)),innerSubscription.setDisposable(c.subscribe(function(e){var f;try{f=d(e,b++,c)}catch(g){return void a.onError(g)}a.onNext(f)},function(b){a.onError(b)},function(){h.remove(innerSubscription),e=!1,f&&1===h.length&&a.onCompleted()})))},function(b){a.onError(b)},function(){f=!0,1!==h.length||e||a.onCompleted()})),h},this)},Da.VirtualTimeScheduler=function(a){function b(){return this.toDateTimeOffset(this.clock)}function c(a,b){return this.scheduleAbsoluteWithState(a,this.clock,b)}function d(a,b,c){return this.scheduleRelativeWithState(a,this.toRelative(b),c)}function e(a,b,c){return this.scheduleRelativeWithState(a,this.toRelative(b-this.now()),c)}function f(a,b){return b(),Nb}function g(f,g){this.clock=f,this.comparer=g,this.isEnabled=!1,this.queue=new Hb(1024),a.call(this,b,c,d,e)}Db(g,a);var h=g.prototype;return h.add=Xa,h.toDateTimeOffset=Xa,h.toRelative=Xa,h.schedulePeriodicWithState=function(a,b,c){var d=new Zb(this,a,b,c);return d.start()},h.scheduleRelativeWithState=function(a,b,c){var d=this.add(this.clock,b);return this.scheduleAbsoluteWithState(a,d,c)},h.scheduleRelative=function(a,b){return this.scheduleRelativeWithState(b,a,f)},h.start=function(){if(!this.isEnabled){this.isEnabled=!0;do{var a=this.getNext();null!==a?(this.comparer(a.dueTime,this.clock)>0&&(this.clock=a.dueTime),a.invoke()):this.isEnabled=!1}while(this.isEnabled)}},h.stop=function(){this.isEnabled=!1},h.advanceTo=function(a){var b=this.comparer(this.clock,a);if(this.comparer(this.clock,a)>0)throw new Ua;if(0!==b&&!this.isEnabled){this.isEnabled=!0;do{var c=this.getNext();null!==c&&this.comparer(c.dueTime,a)<=0?(this.comparer(c.dueTime,this.clock)>0&&(this.clock=c.dueTime),c.invoke()):this.isEnabled=!1}while(this.isEnabled);this.clock=a}},h.advanceBy=function(a){var b=this.add(this.clock,a),c=this.comparer(this.clock,b);if(c>0)throw new Ua;0!==c&&this.advanceTo(b)},h.sleep=function(a){var b=this.add(this.clock,a);if(this.comparer(this.clock,b)>=0)throw new Ua;this.clock=b},h.getNext=function(){for(;this.queue.length>0;){var a=this.queue.peek();if(!a.isCancelled())return a;this.queue.dequeue()}return null},h.scheduleAbsolute=function(a,b){return this.scheduleAbsoluteWithState(b,a,f)},h.scheduleAbsoluteWithState=function(a,b,c){function d(a,b){return e.queue.remove(f),c(a,b)}var e=this,f=new Tb(this,a,d,b,this.comparer);return this.queue.enqueue(f),f.disposable},g}(Ub),Da.HistoricalScheduler=function(a){function b(b,c){var d=null==b?0:b,e=c||Ia;a.call(this,d,e)}Db(b,a);var c=b.prototype;return c.add=function(a,b){return a+b},c.toDateTimeOffset=function(a){return new Date(a).getTime()},c.toRelative=function(a){return a},b}(Da.VirtualTimeScheduler);var wd=Da.AnonymousObservable=function(a){function b(a){return a&&Ma(a.dispose)?a:Ma(a)?Mb(a):Nb}function c(a,c){var d=c[0],e=c[1],f=p(e)(d);return f!==Gb||d.fail(Gb.e)?void d.setDisposable(b(f)):q(Gb.e)}function d(b,d){function e(a){var d=new xd(a),e=[d,b];return _b.scheduleRequired()?_b.scheduleWithState(e,c):c(null,e),d}this.source=d,a.call(this,e)}return Db(d,a),d}(vc),xd=function(a){function b(b){a.call(this),this.observer=b,this.m=new Qb}Db(b,a);var c=b.prototype;return c.next=function(a){var b=p(this.observer.onNext).call(this.observer,a);b===Gb&&(this.dispose(),q(b.e))},c.error=function(a){var b=p(this.observer.onError).call(this.observer,a);this.dispose(),b===Gb&&q(b.e)},c.completed=function(){var a=p(this.observer.onCompleted).call(this.observer);this.dispose(),a===Gb&&q(a.e)},c.setDisposable=function(a){this.m.setDisposable(a)},c.getDisposable=function(){return this.m.getDisposable()},c.dispose=function(){a.prototype.dispose.call(this),this.m.dispose()},b}(qc),yd=function(a){function b(a){return this.underlyingObservable.subscribe(a)}function c(c,d,e){a.call(this,b),this.key=c,this.underlyingObservable=e?new wd(function(a){return new Jb(e.getDisposable(),d.subscribe(a))}):d}return Db(c,a),c}(vc),zd=Da.Subject=function(a){function c(a){return Pb(this),this.isStopped?this.hasError?(a.onError(this.error),Nb):(a.onCompleted(),Nb):(this.observers.push(a),new md(this,a))}function d(){a.call(this,c),this.isDisposed=!1,this.isStopped=!1,this.observers=[],this.hasError=!1}return Db(d,a),Eb(d.prototype,nc.prototype,{hasObservers:function(){return this.observers.length>0},onCompleted:function(){if(Pb(this),!this.isStopped){this.isStopped=!0;for(var a=0,c=b(this.observers),d=c.length;d>a;a++)c[a].onCompleted();this.observers.length=0}},onError:function(a){if(Pb(this),!this.isStopped){this.isStopped=!0,this.error=a,this.hasError=!0;for(var c=0,d=b(this.observers),e=d.length;e>c;c++)d[c].onError(a);this.observers.length=0}},onNext:function(a){if(Pb(this),!this.isStopped)for(var c=0,d=b(this.observers),e=d.length;e>c;c++)d[c].onNext(a)},dispose:function(){this.isDisposed=!0,this.observers=null}}),d.create=function(a,b){return new Bd(a,b)},d}(vc),Ad=Da.AsyncSubject=function(a){function c(a){return Pb(this),this.isStopped?(this.hasError?a.onError(this.error):this.hasValue?(a.onNext(this.value),a.onCompleted()):a.onCompleted(),Nb):(this.observers.push(a),new md(this,a))}function d(){a.call(this,c),this.isDisposed=!1,this.isStopped=!1,this.hasValue=!1,this.observers=[],this.hasError=!1}return Db(d,a),Eb(d.prototype,nc,{hasObservers:function(){return Pb(this),this.observers.length>0},onCompleted:function(){var a,c;if(Pb(this),!this.isStopped){this.isStopped=!0;var d=b(this.observers),c=d.length;if(this.hasValue)for(a=0;c>a;a++){var e=d[a];e.onNext(this.value),e.onCompleted()}else for(a=0;c>a;a++)d[a].onCompleted();this.observers.length=0}},onError:function(a){if(Pb(this),!this.isStopped){this.isStopped=!0,this.hasError=!0,this.error=a;for(var c=0,d=b(this.observers),e=d.length;e>c;c++)d[c].onError(a);this.observers.length=0}},onNext:function(a){Pb(this),this.isStopped||(this.value=a,this.hasValue=!0)},dispose:function(){this.isDisposed=!0,this.observers=null,this.exception=null,this.value=null}}),d}(vc),Bd=Da.AnonymousSubject=function(a){function b(a){return this.observable.subscribe(a)}function c(c,d){this.observer=c,this.observable=d,a.call(this,b)}return Db(c,a),Eb(c.prototype,nc.prototype,{onCompleted:function(){this.observer.onCompleted()},onError:function(a){this.observer.onError(a)},onNext:function(a){this.observer.onNext(a)}}),c}(vc);Da.Pauser=function(a){function b(){a.call(this)}return Db(b,a),b.prototype.pause=function(){this.onNext(!1)},b.prototype.resume=function(){this.onNext(!0)},b}(zd),"function"==typeof define&&"object"==typeof define.amd&&define.amd?(ya.Rx=Da,define(function(){return Da})):za&&Aa?Ba?(Aa.exports=Da).Rx=Da:za.Rx=Da:ya.Rx=Da;var Cd=g()}).call(this);
//# sourceMappingURL=rx.all.map
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["wx"] = factory();
	else
		root["wx"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// WebRx's API-Surface
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var App_1 = __webpack_require__(1);
	exports.app = App_1.app;
	exports.router = App_1.router;
	exports.messageBus = App_1.messageBus;
	var Module_1 = __webpack_require__(14);
	exports.module = Module_1.module;
	__export(__webpack_require__(3));
	var Property_1 = __webpack_require__(13);
	exports.property = Property_1.property;
	var DomManager_1 = __webpack_require__(16);
	exports.applyBindings = DomManager_1.applyBindings;
	exports.cleanNode = DomManager_1.cleanNode;
	var Command_1 = __webpack_require__(20);
	exports.command = Command_1.command;
	exports.asyncCommand = Command_1.asyncCommand;
	exports.combinedCommand = Command_1.combinedCommand;
	exports.isCommand = Command_1.isCommand;
	var Animation_1 = __webpack_require__(51);
	exports.animation = Animation_1.animation;
	var Oid_1 = __webpack_require__(6);
	exports.getOid = Oid_1.getOid;
	var List_1 = __webpack_require__(29);
	exports.list = List_1.list;
	exports.isList = List_1.isList;
	var Map_1 = __webpack_require__(8);
	exports.createMap = Map_1.createMap;
	var Set_1 = __webpack_require__(7);
	exports.createSet = Set_1.createSet;
	exports.setToArray = Set_1.setToArray;
	var WeakMap_1 = __webpack_require__(5);
	exports.createWeakMap = WeakMap_1.createWeakMap;
	var Lazy_1 = __webpack_require__(30);
	exports.Lazy = Lazy_1.default;
	var VirtualChildNodes_1 = __webpack_require__(27);
	exports.VirtualChildNodes = VirtualChildNodes_1.default;
	var RouteMatcher_1 = __webpack_require__(47);
	exports.route = RouteMatcher_1.route;
	var Value_1 = __webpack_require__(33);
	exports.getNodeValue = Value_1.getNodeValue;
	exports.setNodeValue = Value_1.setNodeValue;
	var Injector_1 = __webpack_require__(2);
	exports.injector = Injector_1.injector;
	var IID_1 = __webpack_require__(10);
	exports.IID = IID_1.default;
	var BindingBase_1 = __webpack_require__(24);
	exports.SingleOneWayBindingBase = BindingBase_1.SingleOneWayBindingBase;
	exports.MultiOneWayBindingBase = BindingBase_1.MultiOneWayBindingBase;
	// re-exports
	var res = __webpack_require__(11);
	exports.res = res;
	var env = __webpack_require__(17);
	exports.env = env;
	//# sourceMappingURL=WebRx.js.map

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="./Interfaces.ts" />
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Injector_1 = __webpack_require__(2);
	var Utils_1 = __webpack_require__(3);
	var res = __webpack_require__(11);
	var log = __webpack_require__(12);
	var Property_1 = __webpack_require__(13);
	var Module_1 = __webpack_require__(14);
	var ExpressionCompiler = __webpack_require__(15);
	var DomManager_1 = __webpack_require__(16);
	var HtmlTemplateEngine_1 = __webpack_require__(18);
	var Command_1 = __webpack_require__(19);
	var Module_2 = __webpack_require__(21);
	var If_1 = __webpack_require__(22);
	var MultiOneWay_1 = __webpack_require__(23);
	var SingleOneWay_1 = __webpack_require__(25);
	var ForEach_1 = __webpack_require__(26);
	var Event_1 = __webpack_require__(32);
	var Value_1 = __webpack_require__(33);
	var HasFocus_1 = __webpack_require__(34);
	var With_1 = __webpack_require__(35);
	var Checked_1 = __webpack_require__(36);
	var KeyPress_1 = __webpack_require__(37);
	var TextInput_1 = __webpack_require__(38);
	var SelectedValue_1 = __webpack_require__(39);
	var Component_1 = __webpack_require__(40);
	var StateActive_1 = __webpack_require__(41);
	var View_1 = __webpack_require__(42);
	var StateRef_1 = __webpack_require__(43);
	var Select_1 = __webpack_require__(44);
	var RadioGroup_1 = __webpack_require__(45);
	var Router_1 = __webpack_require__(46);
	var MessageBus_1 = __webpack_require__(48);
	var Version_1 = __webpack_require__(49);
	// make sure RxExtensions get installed
	var RxExtensions_1 = __webpack_require__(50);
	RxExtensions_1.install();
	"use strict";
	var App = (function (_super) {
	    __extends(App, _super);
	    function App() {
	        _super.call(this, "app");
	        /// <summary>
	        /// This Observer is signalled whenever an object that has a
	        /// ThrownExceptions property doesn't Subscribe to that Observable. Use
	        /// Observer.Create to set up what will happen - the default is to crash
	        /// the application with an error message.
	        /// </summary>
	        this.defaultExceptionHandler = Rx.Observer.create(function (ex) {
	            if (!Utils_1.isInUnitTest()) {
	                log.error("An onError occurred on an object (usually a computedProperty) that would break a binding or command. To prevent this, subscribe to the thrownExceptions property of your objects: {0}", ex);
	            }
	        });
	        this.title = Property_1.property(document.title);
	        this.version = Version_1.version;
	        if (!Utils_1.isInUnitTest()) {
	            this.history = this.createHistory();
	        }
	        else {
	            this.history = window["createMockHistory"]();
	        }
	    }
	    Object.defineProperty(App.prototype, "mainThreadScheduler", {
	        /// <summary>
	        /// MainThreadScheduler is the scheduler used to schedule work items that
	        /// should be run "on the UI thread". In normal mode, this will be
	        /// DispatcherScheduler, and in Unit Test mode this will be Immediate,
	        /// to simplify writing common unit tests.
	        /// </summary>
	        get: function () {
	            return this._unitTestMainThreadScheduler || this._mainThreadScheduler
	                || Rx.Scheduler.currentThread; // OW: return a default if schedulers haven't been setup by in
	        },
	        set: function (value) {
	            if (Utils_1.isInUnitTest()) {
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
	                this._templateEngine = Injector_1.injector.get(res.templateEngine);
	            }
	            return this._templateEngine;
	        },
	        set: function (newVal) {
	            this._templateEngine = newVal;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(App.prototype, "router", {
	        get: function () {
	            if (!this._router) {
	                this._router = Injector_1.injector.get(res.router);
	            }
	            return this._router;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    App.prototype.createHistory = function () {
	        // inherit default implementation
	        var result = {
	            back: window.history.back.bind(window.history),
	            forward: window.history.forward.bind(window.history),
	            //go: window.history.go,
	            pushState: window.history.pushState.bind(window.history),
	            replaceState: window.history.replaceState.bind(window.history),
	            getSearchParameters: function (query) {
	                query = query || result.location.search.substr(1);
	                if (query) {
	                    var result_1 = {};
	                    var params = query.split("&");
	                    for (var i = 0; i < params.length; i++) {
	                        var tmp = params[i].split("=");
	                        result_1[tmp[0]] = decodeURIComponent(tmp[1]);
	                    }
	                    return result_1;
	                }
	                return {};
	            }
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
	        // enrich with observable
	        result.onPopState = Rx.Observable.fromEventPattern(function (h) { return window.addEventListener("popstate", h); }, function (h) { return window.removeEventListener("popstate", h); })
	            .publish()
	            .refCount();
	        return result;
	    };
	    App.prototype.register = function () {
	        Injector_1.injector.register(res.app, this) // register with injector
	            .register(res.expressionCompiler, ExpressionCompiler)
	            .register(res.templateEngine, [HtmlTemplateEngine_1.default], true)
	            .register(res.domManager, [res.expressionCompiler, res.app, DomManager_1.DomManager], true)
	            .register(res.router, [res.domManager, res.app, Router_1.Router], true)
	            .register(res.messageBus, [MessageBus_1.default], true);
	        Injector_1.injector.register("bindings.module", [res.domManager, res.app, Module_2.default], true)
	            .register("bindings.command", [res.domManager, res.app, Command_1.default], true)
	            .register("bindings.if", [res.domManager, res.app, If_1.IfBinding], true)
	            .register("bindings.with", [res.domManager, res.app, With_1.default], true)
	            .register("bindings.notif", [res.domManager, res.app, If_1.NotIfBinding], true)
	            .register("bindings.css", [res.domManager, res.app, MultiOneWay_1.CssBinding], true)
	            .register("bindings.attr", [res.domManager, res.app, MultiOneWay_1.AttrBinding], true)
	            .register("bindings.style", [res.domManager, res.app, MultiOneWay_1.StyleBinding], true)
	            .register("bindings.text", [res.domManager, res.app, SingleOneWay_1.TextBinding], true)
	            .register("bindings.html", [res.domManager, res.app, SingleOneWay_1.HtmlBinding], true)
	            .register("bindings.visible", [res.domManager, res.app, SingleOneWay_1.VisibleBinding], true)
	            .register("bindings.hidden", [res.domManager, res.app, SingleOneWay_1.HiddenBinding], true)
	            .register("bindings.enabled", [res.domManager, res.app, SingleOneWay_1.EnableBinding], true)
	            .register("bindings.disabled", [res.domManager, res.app, SingleOneWay_1.DisableBinding], true)
	            .register("bindings.foreach", [res.domManager, res.app, ForEach_1.default], true)
	            .register("bindings.event", [res.domManager, res.app, Event_1.default], true)
	            .register("bindings.keyPress", [res.domManager, res.app, KeyPress_1.default], true)
	            .register("bindings.textInput", [res.domManager, res.app, TextInput_1.default], true)
	            .register("bindings.checked", [res.domManager, res.app, Checked_1.default], true)
	            .register("bindings.selectedValue", [res.domManager, res.app, SelectedValue_1.default], true)
	            .register("bindings.component", [res.domManager, res.app, Component_1.default], true)
	            .register("bindings.value", [res.domManager, res.app, Value_1.default], true)
	            .register("bindings.hasFocus", [res.domManager, res.app, HasFocus_1.default], true)
	            .register("bindings.view", [res.domManager, res.router, res.app, View_1.default], true)
	            .register("bindings.sref", [res.domManager, res.router, res.app, StateRef_1.default], true)
	            .register("bindings.sactive", [res.domManager, res.router, res.app, StateActive_1.default], true);
	        Injector_1.injector.register("components.radiogroup", [res.templateEngine, RadioGroup_1.default])
	            .register("components.select", [res.templateEngine, Select_1.default]);
	        // initialize module
	        this.binding("module", "bindings.module")
	            .binding("css", "bindings.css")
	            .binding("attr", "bindings.attr")
	            .binding("style", "bindings.style")
	            .binding("command", "bindings.command")
	            .binding("if", "bindings.if")
	            .binding("with", "bindings.with")
	            .binding("ifnot", "bindings.notif")
	            .binding("text", "bindings.text")
	            .binding("html", "bindings.html")
	            .binding("visible", "bindings.visible")
	            .binding("hidden", "bindings.hidden")
	            .binding("disabled", "bindings.disabled")
	            .binding("enabled", "bindings.enabled")
	            .binding("foreach", "bindings.foreach")
	            .binding("event", "bindings.event")
	            .binding(["keyPress", "keypress"], "bindings.keyPress")
	            .binding(["textInput", "textinput"], "bindings.textInput")
	            .binding("checked", "bindings.checked")
	            .binding("selectedValue", "bindings.selectedValue")
	            .binding("component", "bindings.component")
	            .binding("value", "bindings.value")
	            .binding(["hasFocus", "hasfocus"], "bindings.hasFocus")
	            .binding("view", "bindings.view")
	            .binding(["sref", "stateRef", "stateref"], "bindings.sref")
	            .binding(["sactive", "stateActive", "stateactive"], "bindings.sactive");
	        this.component("wx-radiogroup", { resolve: "components.radiogroup" })
	            .component("wx-select", { resolve: "components.select" });
	        // register with module-registry
	        Module_1.modules["app"] = { instance: this };
	    };
	    return App;
	})(Module_1.Module);
	var _app = new App();
	exports.app = _app;
	_app.register();
	exports.router = Injector_1.injector.get(res.router);
	exports.messageBus = Injector_1.injector.get(res.messageBus);
	//# sourceMappingURL=App.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	var res = __webpack_require__(11);
	"use strict";
	/**
	* Simple IoC & Service Locator
	*/
	var Injector = (function () {
	    function Injector() {
	        //////////////////////////////////
	        // Implementation
	        this.registrations = {};
	    }
	    Injector.prototype.register = function () {
	        var key = arguments[0];
	        var val = arguments[1];
	        var isSingleton = arguments[2];
	        var factory;
	        if (this.registrations.hasOwnProperty(key))
	            Utils_1.throwError("'{0}' is already registered", key);
	        if (Utils_1.isFunction(val)) {
	            // second overload
	            // it's a factory function
	            factory = function (args, deps) { return val.apply(null, args); };
	        }
	        else if (Array.isArray(val)) {
	            // first overload
	            // array assumed to be inline array notation with constructor
	            var self_1 = this;
	            var ctor = val.pop();
	            var dependencies = val;
	            factory = function (args, deps) {
	                // resolve dependencies
	                var resolved = dependencies.map(function (x) {
	                    try {
	                        return self_1.get(x, undefined, deps);
	                    }
	                    catch (e) {
	                        Utils_1.throwError("Error resolving dependency '{0}' for '{1}': {2}", x, key, e);
	                    }
	                });
	                // invoke constructor
	                var _args = [null].concat(resolved).concat(args);
	                var ctorFunc = ctor.bind.apply(ctor, _args);
	                return new ctorFunc();
	            };
	        }
	        else {
	            // third overload
	            // singleton
	            factory = function (args, deps) { return val; };
	        }
	        this.registrations[key] = { factory: factory, isSingleton: isSingleton };
	        return this;
	    };
	    Injector.prototype.get = function (key, args, deps) {
	        deps = deps || {};
	        if (deps.hasOwnProperty(key))
	            Utils_1.throwError("Detected circular dependency a from '{0}' to '{1}'", Object.keys(deps).join(", "), key);
	        // registered?
	        var registration = this.registrations[key];
	        if (registration === undefined)
	            Utils_1.throwError("'{0}' is not registered", key);
	        // already instantiated?
	        if (registration.isSingleton && registration.value)
	            return registration.value;
	        // append current key
	        var newDeps = {};
	        newDeps[key] = true;
	        Utils_1.extend(deps, newDeps);
	        // create it
	        var result = registration.factory(args, newDeps);
	        // cache if singleton
	        if (registration.isSingleton)
	            registration.value = result;
	        return result;
	    };
	    Injector.prototype.resolve = function (iaa, args) {
	        var ctor = iaa.pop();
	        if (!Utils_1.isFunction(ctor))
	            Utils_1.throwError("Error resolving inline-annotated-array. Constructor must be of type 'function' but is '{0}", typeof ctor);
	        var self = this;
	        // resolve dependencies
	        var resolved = iaa.map(function (x) {
	            try {
	                return self.get(x, undefined, iaa);
	            }
	            catch (e) {
	                Utils_1.throwError("Error resolving dependency '{0}' for '{1}': {2}", x, Object.getPrototypeOf(ctor), e);
	            }
	        });
	        // invoke constructor
	        var _args = [null].concat(resolved).concat(args);
	        var ctorFunc = ctor.bind.apply(ctor, _args);
	        return new ctorFunc();
	    };
	    return Injector;
	})();
	exports.injector = new Injector();
	exports.injector.register(res.injector, function () { return new Injector(); });
	//# sourceMappingURL=Injector.js.map

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	var Reflect_1 = __webpack_require__(4);
	var Events_1 = __webpack_require__(9);
	var IID_1 = __webpack_require__(10);
	/*
	* Global helpers
	*/
	"use strict";
	var regexCssClassName = /\S+/g;
	var RxObsConstructor = Rx.Observable; // the cast is neccessary because the rx.js.d.ts declares Observable as an interface
	exports.noop = function () { };
	/**
	* Returns true if a ECMAScript5 strict-mode is active
	*/
	function isStrictMode() {
	    return typeof this === "undefined";
	}
	exports.isStrictMode = isStrictMode;
	/**
	* Returns true if target is a javascript primitive
	*/
	function isPrimitive(target) {
	    var t = typeof target;
	    return t === "boolean" || t === "number" || t === "string";
	}
	exports.isPrimitive = isPrimitive;
	/**
	* Tests if the target supports the interface
	* @param {any} target
	* @param {string} iid
	*/
	function queryInterface(target, iid) {
	    if (target == null || isPrimitive(target))
	        return false;
	    if (typeof target === "object")
	        target = target.constructor;
	    var interfaces = Reflect_1.getMetadata(Reflect_1.implementsMetaDataKey, target);
	    return interfaces != null && interfaces[iid];
	}
	exports.queryInterface = queryInterface;
	/**
	* Returns all own properties of target implementing interface iid
	* @param {any} target
	* @param {string} iid
	*/
	function getOwnPropertiesImplementingInterface(target, iid) {
	    return Object.keys(target).filter(function (propertyName) {
	        // lookup object for name
	        var o = target[propertyName];
	        // is it an ObservableProperty?
	        return queryInterface(o, iid);
	    }).map(function (x) { return new PropertyInfo(x, target[x]); });
	}
	exports.getOwnPropertiesImplementingInterface = getOwnPropertiesImplementingInterface;
	/**
	* Determines if target is an instance of a IObservableProperty
	* @param {any} target
	*/
	function isProperty(target) {
	    if (target == null)
	        return false;
	    return queryInterface(target, IID_1.default.IObservableProperty);
	}
	exports.isProperty = isProperty;
	/**
	* Determines if target is an instance of a Rx.Scheduler
	* @param {any} target
	*/
	function isRxScheduler(target) {
	    if (target == null)
	        return false;
	    return Rx.Scheduler.isScheduler(target);
	}
	exports.isRxScheduler = isRxScheduler;
	/**
	* Determines if target is an instance of a Rx.Observable
	* @param {any} target
	*/
	function isRxObservable(target) {
	    if (target == null)
	        return false;
	    return target instanceof RxObsConstructor;
	}
	exports.isRxObservable = isRxObservable;
	/**
	* Determines if target is an instance of a promise
	* @param {any} target
	*/
	function isPromise(target) {
	    if (target == null)
	        return false;
	    return Rx.helpers.isPromise(target);
	}
	exports.isPromise = isPromise;
	/**
	* If the prop is an observable property return its value
	* @param {any} prop
	*/
	function unwrapProperty(prop) {
	    if (isProperty(prop))
	        return prop();
	    return prop;
	}
	exports.unwrapProperty = unwrapProperty;
	/**
	* Returns true if a Unit-Testing environment is detected
	*/
	function isInUnitTest() {
	    // detect jasmine 1.x
	    if (window && window["jasmine"] && window["jasmine"].version_ !== undefined) {
	        return true;
	    }
	    // detect jasmine 2.x
	    if (window && window["getJasmineRequireObj"] && typeof window["getJasmineRequireObj"] === "function") {
	        return true;
	    }
	    return false;
	}
	exports.isInUnitTest = isInUnitTest;
	/**
	* Transforms the current method's arguments into an array
	*/
	function args2Array(args) {
	    var result = [];
	    for (var i = 0, len = args.length; i < len; i++) {
	        result.push(args[i]);
	    }
	    return result;
	}
	exports.args2Array = args2Array;
	/**
	* Formats a string using .net style format string
	* @param {string} fmt The format string
	* @param {any[]} ...args Format arguments
	*/
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
	exports.formatString = formatString;
	/**
	* Copies own properties from src to dst
	*/
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
	exports.extend = extend;
	var PropertyInfo = (function () {
	    function PropertyInfo(propertyName, property) {
	        this.property = property;
	        this.propertyName = propertyName;
	    }
	    return PropertyInfo;
	})();
	exports.PropertyInfo = PropertyInfo;
	/**
	* Toggles one ore more css classes on the specified DOM element
	* @param {Node} node The target element
	* @param {boolean} shouldHaveClass True if the classes should be added to the element, false if they should be removed
	* @param {string[} classNames The list of classes to process
	*/
	function toggleCssClass(node, shouldHaveClass) {
	    var classNames = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        classNames[_i - 2] = arguments[_i];
	    }
	    if (classNames) {
	        var currentClassNames = node.className.match(regexCssClassName) || [];
	        var index;
	        var className;
	        if (shouldHaveClass) {
	            for (var i = 0; i < classNames.length; i++) {
	                className = classNames[i];
	                index = currentClassNames.indexOf(className);
	                if (index === -1)
	                    currentClassNames.push(className);
	            }
	        }
	        else {
	            for (var i = 0; i < classNames.length; i++) {
	                className = classNames[i];
	                index = currentClassNames.indexOf(className);
	                if (index !== -1)
	                    currentClassNames.splice(index, 1);
	            }
	        }
	        node.className = currentClassNames.join(" ");
	    }
	}
	exports.toggleCssClass = toggleCssClass;
	/**
	 * Trigger a reflow on the target element
	 * @param {HTMLElement} el
	 */
	function triggerReflow(el) {
	    el.getBoundingClientRect();
	}
	exports.triggerReflow = triggerReflow;
	/**
	 * Returns true if the specified element may be disabled
	 * @param {HTMLElement} el
	 */
	function elementCanBeDisabled(el) {
	    return el instanceof HTMLButtonElement ||
	        el instanceof HTMLAnchorElement ||
	        el instanceof HTMLInputElement ||
	        el instanceof HTMLFieldSetElement ||
	        el instanceof HTMLLinkElement ||
	        el instanceof HTMLOptGroupElement ||
	        el instanceof HTMLOptionElement ||
	        el instanceof HTMLSelectElement ||
	        el instanceof HTMLTextAreaElement;
	}
	exports.elementCanBeDisabled = elementCanBeDisabled;
	/**
	 * Returns true if object is a Function.
	 * @param obj
	 */
	function isFunction(obj) {
	    return typeof obj == 'function' || false;
	}
	exports.isFunction = isFunction;
	/**
	 * Returns true if object is a Disposable
	 * @param obj
	 */
	function isDisposable(obj) {
	    return queryInterface(obj, IID_1.default.IDisposable) || isFunction(obj["dispose"]);
	}
	exports.isDisposable = isDisposable;
	/**
	 * Performs an optimized deep comparison between the two objects, to determine if they should be considered equal.
	 * @param a Object to compare
	 * @param b Object to compare to
	 */
	function isEqual(a, b, aStack, bStack) {
	    var toString = ({}).toString;
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b)
	        return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null)
	        return a === b;
	    // Unwrap any wrapped objects.
	    //if (a instanceof _) a = a._wrapped;
	    //if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b))
	        return false;
	    switch (className) {
	        // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	        case '[object RegExp]':
	        // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	        case '[object String]':
	            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	            // equivalent to `new String("5")`.
	            return '' + a === '' + b;
	        case '[object Number]':
	            // `NaN`s are equivalent, but non-reflexive.
	            // Object(NaN) is equivalent to NaN
	            if (+a !== +a)
	                return +b !== +b;
	            // An `egal` comparison is performed for other numeric values.
	            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	        case '[object Date]':
	        case '[object Boolean]':
	            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	            // millisecond representations. Note that invalid dates with millisecond representations
	            // of `NaN` are not equivalent.
	            return +a === +b;
	    }
	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	        if (typeof a != 'object' || typeof b != 'object')
	            return false;
	        // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	        // from different frames are.
	        var aCtor = a.constructor, bCtor = b.constructor;
	        if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor &&
	            isFunction(bCtor) && bCtor instanceof bCtor)
	            && ('constructor' in a && 'constructor' in b)) {
	            return false;
	        }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	        // Linear search. Performance is inversely proportional to the number of
	        // unique nested structures.
	        if (aStack[length] === a)
	            return bStack[length] === b;
	    }
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	    // Recursively compare objects and arrays.
	    if (areArrays) {
	        // Compare array lengths to determine if a deep comparison is necessary.
	        length = a.length;
	        if (length !== b.length)
	            return false;
	        // Deep compare the contents, ignoring non-numeric properties.
	        while (length--) {
	            if (!isEqual(a[length], b[length], aStack, bStack))
	                return false;
	        }
	    }
	    else {
	        // Deep compare objects.
	        var keys = Object.keys(a), key;
	        length = keys.length;
	        // Ensure that both objects contain the same number of properties before comparing deep equality.
	        if (Object.keys(b).length !== length)
	            return false;
	        while (length--) {
	            // Deep compare each member
	            key = keys[length];
	            if (!(b.hasOwnProperty(key) && isEqual(a[key], b[key], aStack, bStack)))
	                return false;
	        }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	}
	exports.isEqual = isEqual;
	/**
	* Returns an array of clones of the nodes in the source array
	*/
	function cloneNodeArray(nodes) {
	    var length = nodes.length;
	    var result = new Array(length);
	    for (var i = 0; i < length; i++) {
	        result[i] = nodes[i].cloneNode(true);
	    }
	    return result;
	}
	exports.cloneNodeArray = cloneNodeArray;
	/**
	 * Converts a NodeList into a javascript array
	 * @param {NodeList} nodes
	 */
	function nodeListToArray(nodes) {
	    return Array.prototype.slice.call(nodes);
	}
	exports.nodeListToArray = nodeListToArray;
	/**
	 * Converts the node's children into a javascript array
	 * @param {Node} node
	 */
	function nodeChildrenToArray(node) {
	    return nodeListToArray(node.childNodes);
	}
	exports.nodeChildrenToArray = nodeChildrenToArray;
	/**
	* Wraps an action in try/finally block and disposes the resource after the action has completed even if it throws an exception
	* (mimics C# using statement)
	* @param {Rx.IDisposable} disp The resource to dispose after action completes
	* @param {() => void} action The action to wrap
	*/
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
	exports.using = using;
	/**
	* Turns an AMD-Style require call into an observable
	* @param {string} Module The module to load
	* @return {Rx.Observable<any>} An observable that yields a value and completes as soon as the module has been loaded
	*/
	function observableRequire(module) {
	    var requireFunc = window["require"];
	    if (!isFunction(requireFunc))
	        throwError("there's no AMD-module loader available (Hint: did you forget to include RequireJS in your project?)");
	    return Rx.Observable.create(function (observer) {
	        try {
	            requireFunc([module], function (m) {
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
	exports.observableRequire = observableRequire;
	/**
	* Returns an observable that notifes of any observable property changes on the target
	* @param {any} target The object to observe
	* @return {Rx.Observable<T>} An observable
	*/
	function observeObject(target, defaultExceptionHandler, onChanging) {
	    if (onChanging === void 0) { onChanging = false; }
	    var thrownExceptionsSubject = queryInterface(target, IID_1.default.IHandleObservableErrors) ?
	        target.thrownExceptions : defaultExceptionHandler;
	    return Rx.Observable.create(function (observer) {
	        var result = new Rx.CompositeDisposable();
	        var observableProperties = getOwnPropertiesImplementingInterface(target, IID_1.default.IObservableProperty);
	        observableProperties.forEach(function (x) {
	            var prop = x.property;
	            var obs = onChanging ? prop.changing : prop.changed;
	            result.add(obs.subscribe(function (_) {
	                var e = new Events_1.PropertyChangedEventArgs(self, x.propertyName);
	                try {
	                    observer.onNext(e);
	                }
	                catch (ex) {
	                    thrownExceptionsSubject.onNext(ex);
	                }
	            }));
	        });
	        return result;
	    })
	        .publish()
	        .refCount();
	}
	exports.observeObject = observeObject;
	/**
	 * whenAny allows you to observe whenever the value of one or more properties
	 * on an object have changed, providing an initial value when the Observable is set up.
	 */
	function whenAny() {
	    // no need to invoke combineLatest for the simplest case
	    if (arguments.length === 2) {
	        return arguments[0].changed.startWith(arguments[0]()).select(arguments[1]);
	    }
	    var args = args2Array(arguments);
	    // extract selector
	    var selector = args.pop();
	    // prepend sequence with current values to satisfy combineLatest
	    args = args.map(function (x) { return x.changed.startWith(x()); });
	    // finally append the selector
	    args.push(selector);
	    return Rx.Observable.combineLatest.apply(this, args);
	}
	exports.whenAny = whenAny;
	/**
	* FOR INTERNAL USE ONLY
	* Throw an error containing the specified description
	*/
	function throwError(fmt) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    var msg = "WebRx: " + formatString(fmt, args);
	    throw new Error(msg);
	}
	exports.throwError = throwError;
	//# sourceMappingURL=Utils.js.map

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	var WeakMap_1 = __webpack_require__(5);
	var Set_1 = __webpack_require__(7);
	var Map_1 = __webpack_require__(8);
	/*! *****************************************************************************
	Copyright (C) Microsoft. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0
	
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	
	See the License for the specific language governing permissions and
	limitations under the License.
	***************************************************************************** */
	"use strict";
	// Load global or shim versions of Map, Set, and WeakMap
	var functionPrototype = Object.getPrototypeOf(Function);
	// [[Metadata]] internal slot
	var __Metadata__ = WeakMap_1.createWeakMap();
	/**
	  * Applies a set of decorators to a property of a target object.
	  * @param decorators An array of decorators.
	  * @param target The target object.
	  * @param targetKey (Optional) The property key to decorate.
	  * @param targetDescriptor (Optional) The property descriptor for the target key
	  * @remarks Decorators are applied in reverse order.
	  * @example
	  *
	  *     class C {
	  *         // property declarations are not part of ES6, though they are valid in TypeScript:
	  *         // static staticProperty;
	  *         // property;
	  *
	  *         constructor(p) { }
	  *         static staticMethod(p) { }
	  *         method(p) { }
	  *     }
	  *
	  *     // constructor
	  *     C = Reflect.decorate(decoratorsArray, C);
	  *
	  *     // property (on constructor)
	  *     Reflect.decorate(decoratorsArray, C, "staticProperty");
	  *
	  *     // property (on prototype)
	  *     Reflect.decorate(decoratorsArray, C.prototype, "property");
	  *
	  *     // method (on constructor)
	  *     Object.defineProperty(C, "staticMethod",
	  *         Reflect.decorate(decoratorsArray, C, "staticMethod",
	  *             Object.getOwnPropertyDescriptor(C, "staticMethod")));
	  *
	  *     // method (on prototype)
	  *     Object.defineProperty(C.prototype, "method",
	  *         Reflect.decorate(decoratorsArray, C.prototype, "method",
	  *             Object.getOwnPropertyDescriptor(C.prototype, "method")));
	  *
	  */
	function decorate(decorators, target, targetKey, targetDescriptor) {
	    if (!IsUndefined(targetDescriptor)) {
	        if (!IsArray(decorators)) {
	            throw new TypeError();
	        }
	        else if (!IsObject(target)) {
	            throw new TypeError();
	        }
	        else if (IsUndefined(targetKey)) {
	            throw new TypeError();
	        }
	        else if (!IsObject(targetDescriptor)) {
	            throw new TypeError();
	        }
	        targetKey = ToPropertyKey(targetKey);
	        return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
	    }
	    else if (!IsUndefined(targetKey)) {
	        if (!IsArray(decorators)) {
	            throw new TypeError();
	        }
	        else if (!IsObject(target)) {
	            throw new TypeError();
	        }
	        targetKey = ToPropertyKey(targetKey);
	        return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
	    }
	    else {
	        if (!IsArray(decorators)) {
	            throw new TypeError();
	        }
	        else if (!IsConstructor(target)) {
	            throw new TypeError();
	        }
	        return DecorateConstructor(decorators, target);
	    }
	}
	exports.decorate = decorate;
	/**
	  * A default metadata decorator factory that can be used on a class, class member, or parameter.
	  * @param metadataKey The key for the metadata entry.
	  * @param metadataValue The value for the metadata entry.
	  * @returns A decorator function.
	  * @remarks
	  * If `metadataKey` is already defined for the target and target key, the
	  * metadataValue for that key will be overwritten.
	  * @example
	  *
	  *     // constructor
	  *     @Reflect.metadata(key, value)
	  *     class C {
	  *     }
	  *
	  *     // property (on constructor, TypeScript only)
	  *     class C {
	  *         @Reflect.metadata(key, value)
	  *         static staticProperty;
	  *     }
	  *
	  *     // property (on prototype, TypeScript only)
	  *     class C {
	  *         @Reflect.metadata(key, value)
	  *         property;
	  *     }
	  *
	  *     // method (on constructor)
	  *     class C {
	  *         @Reflect.metadata(key, value)
	  *         static staticMethod() { }
	  *     }
	  *
	  *     // method (on prototype)
	  *     class C {
	  *         @Reflect.metadata(key, value)
	  *         method() { }
	  *     }
	  *
	  */
	function metadata(metadataKey, metadataValue) {
	    function decorator(target, targetKey) {
	        if (!IsUndefined(targetKey)) {
	            if (!IsObject(target)) {
	                throw new TypeError();
	            }
	            targetKey = ToPropertyKey(targetKey);
	            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
	        }
	        else {
	            if (!IsConstructor(target)) {
	                throw new TypeError();
	            }
	            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, undefined);
	        }
	    }
	    return decorator;
	}
	exports.metadata = metadata;
	/**
	  * Define a unique metadata entry on the target.
	  * @param metadataKey A key used to store and retrieve metadata.
	  * @param metadataValue A value that contains attached metadata.
	  * @param target The target object on which to define metadata.
	  * @param targetKey (Optional) The property key for the target.
	  * @example
	  *
	  *     class C {
	  *         // property declarations are not part of ES6, though they are valid in TypeScript:
	  *         // static staticProperty;
	  *         // property;
	  *
	  *         constructor(p) { }
	  *         static staticMethod(p) { }
	  *         method(p) { }
	  *     }
	  *
	  *     // constructor
	  *     Reflect.defineMetadata("custom:annotation", options, C);
	  *
	  *     // property (on constructor)
	  *     Reflect.defineMetadata("custom:annotation", options, C, "staticProperty");
	  *
	  *     // property (on prototype)
	  *     Reflect.defineMetadata("custom:annotation", options, C.prototype, "property");
	  *
	  *     // method (on constructor)
	  *     Reflect.defineMetadata("custom:annotation", options, C, "staticMethod");
	  *
	  *     // method (on prototype)
	  *     Reflect.defineMetadata("custom:annotation", options, C.prototype, "method");
	  *
	  *     // decorator factory as metadata-producing annotation.
	  *     function MyAnnotation(options): Decorator {
	  *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
	  *     }
	  *
	  */
	function defineMetadata(metadataKey, metadataValue, target, targetKey) {
	    if (!IsObject(target)) {
	        throw new TypeError();
	    }
	    else if (!IsUndefined(targetKey)) {
	        targetKey = ToPropertyKey(targetKey);
	    }
	    return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
	}
	exports.defineMetadata = defineMetadata;
	/**
	  * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
	  * @param metadataKey A key used to store and retrieve metadata.
	  * @param target The target object on which the metadata is defined.
	  * @param targetKey (Optional) The property key for the target.
	  * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
	  * @example
	  *
	  *     class C {
	  *         // property declarations are not part of ES6, though they are valid in TypeScript:
	  *         // static staticProperty;
	  *         // property;
	  *
	  *         constructor(p) { }
	  *         static staticMethod(p) { }
	  *         method(p) { }
	  *     }
	  *
	  *     // constructor
	  *     result = Reflect.hasMetadata("custom:annotation", C);
	  *
	  *     // property (on constructor)
	  *     result = Reflect.hasMetadata("custom:annotation", C, "staticProperty");
	  *
	  *     // property (on prototype)
	  *     result = Reflect.hasMetadata("custom:annotation", C.prototype, "property");
	  *
	  *     // method (on constructor)
	  *     result = Reflect.hasMetadata("custom:annotation", C, "staticMethod");
	  *
	  *     // method (on prototype)
	  *     result = Reflect.hasMetadata("custom:annotation", C.prototype, "method");
	  *
	  */
	function hasMetadata(metadataKey, target, targetKey) {
	    if (!IsObject(target)) {
	        throw new TypeError();
	    }
	    else if (!IsUndefined(targetKey)) {
	        targetKey = ToPropertyKey(targetKey);
	    }
	    return OrdinaryHasMetadata(metadataKey, target, targetKey);
	}
	exports.hasMetadata = hasMetadata;
	/**
	  * Gets a value indicating whether the target object has the provided metadata key defined.
	  * @param metadataKey A key used to store and retrieve metadata.
	  * @param target The target object on which the metadata is defined.
	  * @param targetKey (Optional) The property key for the target.
	  * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
	  * @example
	  *
	  *     class C {
	  *         // property declarations are not part of ES6, though they are valid in TypeScript:
	  *         // static staticProperty;
	  *         // property;
	  *
	  *         constructor(p) { }
	  *         static staticMethod(p) { }
	  *         method(p) { }
	  *     }
	  *
	  *     // constructor
	  *     result = Reflect.hasOwnMetadata("custom:annotation", C);
	  *
	  *     // property (on constructor)
	  *     result = Reflect.hasOwnMetadata("custom:annotation", C, "staticProperty");
	  *
	  *     // property (on prototype)
	  *     result = Reflect.hasOwnMetadata("custom:annotation", C.prototype, "property");
	  *
	  *     // method (on constructor)
	  *     result = Reflect.hasOwnMetadata("custom:annotation", C, "staticMethod");
	  *
	  *     // method (on prototype)
	  *     result = Reflect.hasOwnMetadata("custom:annotation", C.prototype, "method");
	  *
	  */
	function hasOwnMetadata(metadataKey, target, targetKey) {
	    if (!IsObject(target)) {
	        throw new TypeError();
	    }
	    else if (!IsUndefined(targetKey)) {
	        targetKey = ToPropertyKey(targetKey);
	    }
	    return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
	}
	exports.hasOwnMetadata = hasOwnMetadata;
	/**
	  * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
	  * @param metadataKey A key used to store and retrieve metadata.
	  * @param target The target object on which the metadata is defined.
	  * @param targetKey (Optional) The property key for the target.
	  * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	  * @example
	  *
	  *     class C {
	  *         // property declarations are not part of ES6, though they are valid in TypeScript:
	  *         // static staticProperty;
	  *         // property;
	  *
	  *         constructor(p) { }
	  *         static staticMethod(p) { }
	  *         method(p) { }
	  *     }
	  *
	  *     // constructor
	  *     result = Reflect.getMetadata("custom:annotation", C);
	  *
	  *     // property (on constructor)
	  *     result = Reflect.getMetadata("custom:annotation", C, "staticProperty");
	  *
	  *     // property (on prototype)
	  *     result = Reflect.getMetadata("custom:annotation", C.prototype, "property");
	  *
	  *     // method (on constructor)
	  *     result = Reflect.getMetadata("custom:annotation", C, "staticMethod");
	  *
	  *     // method (on prototype)
	  *     result = Reflect.getMetadata("custom:annotation", C.prototype, "method");
	  *
	  */
	function getMetadata(metadataKey, target, targetKey) {
	    if (!IsObject(target)) {
	        throw new TypeError();
	    }
	    else if (!IsUndefined(targetKey)) {
	        targetKey = ToPropertyKey(targetKey);
	    }
	    return OrdinaryGetMetadata(metadataKey, target, targetKey);
	}
	exports.getMetadata = getMetadata;
	/**
	  * Gets the metadata value for the provided metadata key on the target object.
	  * @param metadataKey A key used to store and retrieve metadata.
	  * @param target The target object on which the metadata is defined.
	  * @param targetKey (Optional) The property key for the target.
	  * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	  * @example
	  *
	  *     class C {
	  *         // property declarations are not part of ES6, though they are valid in TypeScript:
	  *         // static staticProperty;
	  *         // property;
	  *
	  *         constructor(p) { }
	  *         static staticMethod(p) { }
	  *         method(p) { }
	  *     }
	  *
	  *     // constructor
	  *     result = Reflect.getOwnMetadata("custom:annotation", C);
	  *
	  *     // property (on constructor)
	  *     result = Reflect.getOwnMetadata("custom:annotation", C, "staticProperty");
	  *
	  *     // property (on prototype)
	  *     result = Reflect.getOwnMetadata("custom:annotation", C.prototype, "property");
	  *
	  *     // method (on constructor)
	  *     result = Reflect.getOwnMetadata("custom:annotation", C, "staticMethod");
	  *
	  *     // method (on prototype)
	  *     result = Reflect.getOwnMetadata("custom:annotation", C.prototype, "method");
	  *
	  */
	function getOwnMetadata(metadataKey, target, targetKey) {
	    if (!IsObject(target)) {
	        throw new TypeError();
	    }
	    else if (!IsUndefined(targetKey)) {
	        targetKey = ToPropertyKey(targetKey);
	    }
	    return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
	}
	exports.getOwnMetadata = getOwnMetadata;
	/**
	  * Gets the metadata keys defined on the target object or its prototype chain.
	  * @param target The target object on which the metadata is defined.
	  * @param targetKey (Optional) The property key for the target.
	  * @returns An array of unique metadata keys.
	  * @example
	  *
	  *     class C {
	  *         // property declarations are not part of ES6, though they are valid in TypeScript:
	  *         // static staticProperty;
	  *         // property;
	  *
	  *         constructor(p) { }
	  *         static staticMethod(p) { }
	  *         method(p) { }
	  *     }
	  *
	  *     // constructor
	  *     result = Reflect.getMetadataKeys(C);
	  *
	  *     // property (on constructor)
	  *     result = Reflect.getMetadataKeys(C, "staticProperty");
	  *
	  *     // property (on prototype)
	  *     result = Reflect.getMetadataKeys(C.prototype, "property");
	  *
	  *     // method (on constructor)
	  *     result = Reflect.getMetadataKeys(C, "staticMethod");
	  *
	  *     // method (on prototype)
	  *     result = Reflect.getMetadataKeys(C.prototype, "method");
	  *
	  */
	function getMetadataKeys(target, targetKey) {
	    if (!IsObject(target)) {
	        throw new TypeError();
	    }
	    else if (!IsUndefined(targetKey)) {
	        targetKey = ToPropertyKey(targetKey);
	    }
	    return OrdinaryMetadataKeys(target, targetKey);
	}
	exports.getMetadataKeys = getMetadataKeys;
	/**
	  * Gets the unique metadata keys defined on the target object.
	  * @param target The target object on which the metadata is defined.
	  * @param targetKey (Optional) The property key for the target.
	  * @returns An array of unique metadata keys.
	  * @example
	  *
	  *     class C {
	  *         // property declarations are not part of ES6, though they are valid in TypeScript:
	  *         // static staticProperty;
	  *         // property;
	  *
	  *         constructor(p) { }
	  *         static staticMethod(p) { }
	  *         method(p) { }
	  *     }
	  *
	  *     // constructor
	  *     result = Reflect.getOwnMetadataKeys(C);
	  *
	  *     // property (on constructor)
	  *     result = Reflect.getOwnMetadataKeys(C, "staticProperty");
	  *
	  *     // property (on prototype)
	  *     result = Reflect.getOwnMetadataKeys(C.prototype, "property");
	  *
	  *     // method (on constructor)
	  *     result = Reflect.getOwnMetadataKeys(C, "staticMethod");
	  *
	  *     // method (on prototype)
	  *     result = Reflect.getOwnMetadataKeys(C.prototype, "method");
	  *
	  */
	function getOwnMetadataKeys(target, targetKey) {
	    if (!IsObject(target)) {
	        throw new TypeError();
	    }
	    else if (!IsUndefined(targetKey)) {
	        targetKey = ToPropertyKey(targetKey);
	    }
	    return OrdinaryOwnMetadataKeys(target, targetKey);
	}
	exports.getOwnMetadataKeys = getOwnMetadataKeys;
	/**
	  * Deletes the metadata entry from the target object with the provided key.
	  * @param metadataKey A key used to store and retrieve metadata.
	  * @param target The target object on which the metadata is defined.
	  * @param targetKey (Optional) The property key for the target.
	  * @returns `true` if the metadata entry was found and deleted; otherwise, false.
	  * @example
	  *
	  *     class C {
	  *         // property declarations are not part of ES6, though they are valid in TypeScript:
	  *         // static staticProperty;
	  *         // property;
	  *
	  *         constructor(p) { }
	  *         static staticMethod(p) { }
	  *         method(p) { }
	  *     }
	  *
	  *     // constructor
	  *     result = Reflect.deleteMetadata("custom:annotation", C);
	  *
	  *     // property (on constructor)
	  *     result = Reflect.deleteMetadata("custom:annotation", C, "staticProperty");
	  *
	  *     // property (on prototype)
	  *     result = Reflect.deleteMetadata("custom:annotation", C.prototype, "property");
	  *
	  *     // method (on constructor)
	  *     result = Reflect.deleteMetadata("custom:annotation", C, "staticMethod");
	  *
	  *     // method (on prototype)
	  *     result = Reflect.deleteMetadata("custom:annotation", C.prototype, "method");
	  *
	  */
	function deleteMetadata(metadataKey, target, targetKey) {
	    if (!IsObject(target)) {
	        throw new TypeError();
	    }
	    else if (!IsUndefined(targetKey)) {
	        targetKey = ToPropertyKey(targetKey);
	    }
	    // https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#deletemetadata-metadatakey-p-
	    var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
	    if (IsUndefined(metadataMap)) {
	        return false;
	    }
	    if (!metadataMap.delete(metadataKey)) {
	        return false;
	    }
	    if (metadataMap.size > 0) {
	        return true;
	    }
	    var targetMetadata = __Metadata__.get(target);
	    targetMetadata.delete(targetKey);
	    if (targetMetadata.size > 0) {
	        return true;
	    }
	    __Metadata__.delete(target);
	    return true;
	}
	exports.deleteMetadata = deleteMetadata;
	function DecorateConstructor(decorators, target) {
	    for (var i = decorators.length - 1; i >= 0; --i) {
	        var decorator = decorators[i];
	        var decorated = decorator(target);
	        if (!IsUndefined(decorated)) {
	            if (!IsConstructor(decorated)) {
	                throw new TypeError();
	            }
	            target = decorated;
	        }
	    }
	    return target;
	}
	function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
	    for (var i = decorators.length - 1; i >= 0; --i) {
	        var decorator = decorators[i];
	        var decorated = decorator(target, propertyKey, descriptor);
	        if (!IsUndefined(decorated)) {
	            if (!IsObject(decorated)) {
	                throw new TypeError();
	            }
	            descriptor = decorated;
	        }
	    }
	    return descriptor;
	}
	function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
	    for (var i = decorators.length - 1; i >= 0; --i) {
	        var decorator = decorators[i];
	        decorator(target, propertyKey);
	    }
	}
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#getorcreatemetadatamap--o-p-create-
	function GetOrCreateMetadataMap(target, targetKey, create) {
	    var targetMetadata = __Metadata__.get(target);
	    if (!targetMetadata) {
	        if (!create) {
	            return undefined;
	        }
	        targetMetadata = Map_1.createMap();
	        __Metadata__.set(target, targetMetadata);
	    }
	    var keyMetadata = targetMetadata.get(targetKey);
	    if (!keyMetadata) {
	        if (!create) {
	            return undefined;
	        }
	        keyMetadata = Map_1.createMap();
	        targetMetadata.set(targetKey, keyMetadata);
	    }
	    return keyMetadata;
	}
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryhasmetadata--metadatakey-o-p-
	function OrdinaryHasMetadata(MetadataKey, O, P) {
	    var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	    if (hasOwn) {
	        return true;
	    }
	    var parent = GetPrototypeOf(O);
	    if (parent !== null) {
	        return OrdinaryHasMetadata(MetadataKey, parent, P);
	    }
	    return false;
	}
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryhasownmetadata--metadatakey-o-p-
	function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
	    var metadataMap = GetOrCreateMetadataMap(O, P, false);
	    if (metadataMap === undefined) {
	        return false;
	    }
	    return Boolean(metadataMap.has(MetadataKey));
	}
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarygetmetadata--metadatakey-o-p-
	function OrdinaryGetMetadata(MetadataKey, O, P) {
	    var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	    if (hasOwn) {
	        return OrdinaryGetOwnMetadata(MetadataKey, O, P);
	    }
	    var parent = GetPrototypeOf(O);
	    if (parent !== null) {
	        return OrdinaryGetMetadata(MetadataKey, parent, P);
	    }
	    return undefined;
	}
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarygetownmetadata--metadatakey-o-p-
	function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
	    var metadataMap = GetOrCreateMetadataMap(O, P, false);
	    if (metadataMap === undefined) {
	        return undefined;
	    }
	    return metadataMap.get(MetadataKey);
	}
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarydefineownmetadata--metadatakey-metadatavalue-o-p-
	function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	    var metadataMap = GetOrCreateMetadataMap(O, P, true);
	    metadataMap.set(MetadataKey, MetadataValue);
	}
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinarymetadatakeys--o-p-
	function OrdinaryMetadataKeys(O, P) {
	    var ownKeys = OrdinaryOwnMetadataKeys(O, P);
	    var parent = GetPrototypeOf(O);
	    if (parent === null) {
	        return ownKeys;
	    }
	    var parentKeys = OrdinaryMetadataKeys(parent, P);
	    if (parentKeys.length <= 0) {
	        return ownKeys;
	    }
	    if (ownKeys.length <= 0) {
	        return parentKeys;
	    }
	    var set = Set_1.createSet();
	    var keys = [];
	    for (var _i = 0; _i < ownKeys.length; _i++) {
	        var key = ownKeys[_i];
	        var hasKey = set.has(key);
	        if (!hasKey) {
	            set.add(key);
	            keys.push(key);
	        }
	    }
	    for (var _a = 0; _a < parentKeys.length; _a++) {
	        var key = parentKeys[_a];
	        var hasKey = set.has(key);
	        if (!hasKey) {
	            set.add(key);
	            keys.push(key);
	        }
	    }
	    return keys;
	}
	// https://github.com/jonathandturner/decorators/blob/master/specs/metadata.md#ordinaryownmetadatakeys--o-p-
	function OrdinaryOwnMetadataKeys(target, targetKey) {
	    var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
	    var keys = [];
	    if (metadataMap) {
	        metadataMap.forEach(function (_, key) { return keys.push(key); });
	    }
	    return keys;
	}
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-undefined-type
	function IsUndefined(x) {
	    return x === undefined;
	}
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	function IsArray(x) {
	    return Array.isArray(x);
	}
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object-type
	function IsObject(x) {
	    return typeof x === "object" ? x !== null : typeof x === "function";
	}
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	function IsConstructor(x) {
	    return typeof x === "function";
	}
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-symbol-type
	function IsSymbol(x) {
	    return typeof x === "symbol";
	}
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	function ToPropertyKey(value) {
	    if (IsSymbol(value)) {
	        return value;
	    }
	    return String(value);
	}
	function GetPrototypeOf(O) {
	    var proto = Object.getPrototypeOf(O);
	    if (typeof O !== "function" || O === functionPrototype) {
	        return proto;
	    }
	    // TypeScript doesn't set __proto__ in ES5, as it's non-standard. 
	    // Try to determine the superclass constructor. Compatible implementations
	    // must either set __proto__ on a subclass constructor to the superclass constructor,
	    // or ensure each class has a valid `constructor` property on its prototype that
	    // points back to the constructor.
	    // If this is not the same as Function.[[Prototype]], then this is definately inherited.
	    // This is the case when in ES6 or when using __proto__ in a compatible browser.
	    if (proto !== functionPrototype) {
	        return proto;
	    }
	    // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
	    var prototype = O.prototype;
	    var prototypeProto = Object.getPrototypeOf(prototype);
	    if (prototypeProto == null || prototypeProto === Object.prototype) {
	        return proto;
	    }
	    // if the constructor was not a function, then we cannot determine the heritage.
	    var constructor = prototypeProto.constructor;
	    if (typeof constructor !== "function") {
	        return proto;
	    }
	    // if we have some kind of self-reference, then we cannot determine the heritage.
	    if (constructor === O) {
	        return proto;
	    }
	    // we have a pretty good guess at the heritage.
	    return constructor;
	}
	exports.implementsMetaDataKey = "wx:interfaceImpl";
	/**
	* Interface decorator
	* @param {string} interfaceName Name of an interface
	*/
	function Implements(value) {
	    return function (target) {
	        var interfaces = getMetadata(exports.implementsMetaDataKey, target) || {};
	        if (typeof (value) === "string")
	            value = value.split(/\s+/).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
	        for (var i = 0; i < value.length; i++)
	            interfaces[value[i]] = true;
	        defineMetadata(exports.implementsMetaDataKey, interfaces, target);
	    };
	}
	exports.Implements = Implements;
	//# sourceMappingURL=Reflect.js.map

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/typescript/bin/lib.es6.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var Oid_1 = __webpack_require__(6);
	"use strict";
	/**
	* This class emulates the semantics of a WeakMap.
	* Even though this implementation is indeed "weak", it has the drawback of
	* requiring manual housekeeping of entries otherwise they are kept forever.
	* @class
	*/
	var WeakMapEmulated = (function () {
	    function WeakMapEmulated() {
	        ////////////////////
	        /// Implementation
	        this.inner = {};
	    }
	    ////////////////////
	    /// IWeakMap
	    WeakMapEmulated.prototype.set = function (key, value) {
	        var oid = Oid_1.getOid(key);
	        this.inner[oid] = value;
	    };
	    WeakMapEmulated.prototype.get = function (key) {
	        var oid = Oid_1.getOid(key);
	        return this.inner[oid];
	    };
	    WeakMapEmulated.prototype.has = function (key) {
	        var oid = Oid_1.getOid(key);
	        return this.inner.hasOwnProperty(oid);
	    };
	    WeakMapEmulated.prototype.delete = function (key) {
	        var oid = Oid_1.getOid(key);
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
	//let hasNativeSupport = false;
	/**
	* Creates a new WeakMap instance
	* @param {boolean} disableNativeSupport Force creation of an emulated implementation, regardless of browser native support.
	* @return {IWeakMap<TKey, T>} A new instance of a suitable IWeakMap implementation
	*/
	function createWeakMap(disableNativeSupport) {
	    if (disableNativeSupport || !hasNativeSupport) {
	        return new WeakMapEmulated();
	    }
	    return new WeakMap();
	}
	exports.createWeakMap = createWeakMap;
	//# sourceMappingURL=WeakMap.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var oid = 1;
	var oidPropertyName = "__wx_oid__" + (new Date).getTime();
	function isPrimitive(target) {
	    var t = typeof target;
	    return t === "boolean" || t === "number" || t === "string";
	}
	/**
	* Returns the objects unique id or assigns it if unassigned
	* @param {any} o
	*/
	function getOid(o) {
	    if (o == null)
	        return undefined;
	    if (isPrimitive(o))
	        return (typeof o + ":" + o);
	    // already set?
	    if (o.hasOwnProperty(oidPropertyName))
	        return o[oidPropertyName];
	    // assign new one
	    var result = (++oid).toString();
	    // store as non-enumerable property to avoid confusing other libraries
	    Object.defineProperty(o, oidPropertyName, {
	        enumerable: false,
	        configurable: false,
	        writable: false,
	        value: result
	    });
	    return result;
	}
	exports.getOid = getOid;
	//# sourceMappingURL=Oid.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/typescript/bin/lib.es6.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var Oid_1 = __webpack_require__(6);
	"use strict";
	/**
	* ES6 Set Shim
	* @class
	*/
	var SetEmulated = (function () {
	    function SetEmulated() {
	        ////////////////////
	        /// Implementation
	        this.values = [];
	        this.keys = {};
	    }
	    ////////////////////
	    /// ISet
	    SetEmulated.prototype.add = function (value) {
	        var key = Oid_1.getOid(value);
	        if (!this.keys[key]) {
	            this.values.push(value);
	            this.keys[key] = true;
	        }
	        return this;
	    };
	    SetEmulated.prototype.delete = function (value) {
	        var key = Oid_1.getOid(value);
	        if (this.keys[key]) {
	            var index = this.values.indexOf(value);
	            this.values.splice(index, 1);
	            delete this.keys[key];
	            return true;
	        }
	        return false;
	    };
	    SetEmulated.prototype.has = function (value) {
	        var key = Oid_1.getOid(value);
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
	var hasNativeSupport = typeof Set === "function" && Set.prototype.hasOwnProperty("forEach")
	    && Set.prototype.hasOwnProperty("add") && Set.prototype.hasOwnProperty("clear")
	    && Set.prototype.hasOwnProperty("delete") && Set.prototype.hasOwnProperty("has");
	/**
	* Creates a new Set instance
	* @param {boolean} disableNativeSupport Force creation of an emulated implementation, regardless of browser native support.
	* @return {ISet<T>} A new instance of a suitable ISet implementation
	*/
	function createSet(disableNativeSupport) {
	    if (disableNativeSupport || !hasNativeSupport) {
	        return new SetEmulated();
	    }
	    return new Set();
	}
	exports.createSet = createSet;
	/**
	* Extracts the values of a Set by invoking its forEach method and capturing the output
	*/
	function setToArray(src) {
	    var result = new Array();
	    src.forEach(function (x) { return result.push(x); });
	    return result;
	}
	exports.setToArray = setToArray;
	//# sourceMappingURL=Set.js.map

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/typescript/bin/lib.es6.d.ts" />
	/// <reference path="../Interfaces.ts" />
	"use strict";
	/**
	* ES6 Map Shim
	* @class
	*/
	var MapEmulated = (function () {
	    function MapEmulated() {
	        ////////////////////
	        /// Implementation
	        this.cacheSentinel = {};
	        this.keys = [];
	        this.values = [];
	        this.cache = this.cacheSentinel;
	    }
	    Object.defineProperty(MapEmulated.prototype, "size", {
	        ////////////////////
	        /// IMap
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
	var hasNativeSupport = typeof Map === "function" && Map.prototype.hasOwnProperty("forEach")
	    && Map.prototype.hasOwnProperty("add") && Map.prototype.hasOwnProperty("clear")
	    && Map.prototype.hasOwnProperty("devare") && Map.prototype.hasOwnProperty("has");
	/**
	* Creates a new WeakMap instance
	* @param {boolean} disableNativeSupport Force creation of an emulated implementation, regardless of browser native support.
	* @return {IWeakMap<TKey, T>} A new instance of a suitable IWeakMap implementation
	*/
	function createMap(disableNativeSupport) {
	    if (disableNativeSupport || !hasNativeSupport) {
	        return new MapEmulated();
	    }
	    return new Map();
	}
	exports.createMap = createMap;
	//# sourceMappingURL=Map.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	"use strict";
	var PropertyChangedEventArgs = (function () {
	    /// <summary>
	    /// Initializes a new instance of the <see cref="ObservablePropertyChangedEventArgs{TSender}"/> class.
	    /// </summary>
	    /// <param name="sender">The sender.</param>
	    /// <param name="propertyName">Name of the property.</param>
	    function PropertyChangedEventArgs(sender, propertyName) {
	        this.propertyName = propertyName;
	        this.sender = sender;
	    }
	    return PropertyChangedEventArgs;
	})();
	exports.PropertyChangedEventArgs = PropertyChangedEventArgs;
	//# sourceMappingURL=Events.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <summary>
	/// Interface registry to be used with IUnknown.queryInterface
	/// </summary>
	var IID = (function () {
	    function IID() {
	    }
	    IID.IDisposable = "IDisposable";
	    IID.IObservableProperty = "IObservableProperty";
	    IID.IObservableList = "IObservableList";
	    IID.ICommand = "ICommand";
	    IID.IHandleObservableErrors = "IHandleObservableErrors";
	    return IID;
	})();
	exports.default = IID;
	//# sourceMappingURL=IID.js.map

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.app = "app";
	exports.injector = "injector";
	exports.domManager = "domservice";
	exports.router = "router";
	exports.messageBus = "messageBus";
	exports.expressionCompiler = "expressioncompiler";
	exports.templateEngine = "templateEngine";
	exports.hasValueBindingValue = "has.bindings.value";
	exports.valueBindingValue = "bindings.value";
	//# sourceMappingURL=Resources.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Utils_1 = __webpack_require__(3);
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
	        fmt = Utils_1.formatString.apply(null, [fmt].concat(args));
	    }
	    log("**** WebRx Critical: " + fmt);
	}
	exports.critical = critical;
	function error(fmt) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    if (args.length) {
	        fmt = Utils_1.formatString.apply(null, [fmt].concat(args));
	    }
	    log("*** WebRx Error: " + fmt);
	}
	exports.error = error;
	function info(fmt) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    if (args.length) {
	        fmt = Utils_1.formatString.apply(null, [fmt].concat(args));
	    }
	    log("* WebRx Info: " + fmt);
	}
	exports.info = info;
	//# sourceMappingURL=Log.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	var Reflect_1 = __webpack_require__(4);
	var IID_1 = __webpack_require__(10);
	// NOTE: The factory method approach is necessary because it is  
	// currently impossible to implement a Typescript interface 
	// with a function signature in a Typescript class.
	"use strict";
	/**
	* Creates an observable property with an optional default value
	* @param {T} initialValue?
	*/
	function property(initialValue) {
	    // initialize accessor function
	    var accessor = function (newVal) {
	        if (arguments.length > 0) {
	            // set
	            if (newVal !== accessor.value) {
	                accessor.changingSubject.onNext(newVal);
	                accessor.value = newVal;
	                accessor.changedSubject.onNext(newVal);
	            }
	        }
	        else {
	            // get
	            return accessor.value;
	        }
	    };
	    Reflect_1.Implements(IID_1.default.IObservableProperty)(accessor);
	    Reflect_1.Implements(IID_1.default.IDisposable)(accessor);
	    //////////////////////////////////
	    // IDisposable implementation
	    accessor.dispose = function () {
	    };
	    //////////////////////////////////
	    // IObservableProperty<T> implementation
	    if (initialValue !== undefined)
	        accessor.value = initialValue;
	    // setup observables
	    accessor.changedSubject = new Rx.Subject();
	    accessor.changed = accessor.changedSubject
	        .publish()
	        .refCount();
	    accessor.changingSubject = new Rx.Subject();
	    accessor.changing = accessor.changingSubject
	        .publish()
	        .refCount();
	    return accessor;
	}
	exports.property = property;
	//# sourceMappingURL=Property.js.map

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	var Injector_1 = __webpack_require__(2);
	var Utils_1 = __webpack_require__(3);
	var res = __webpack_require__(11);
	"use strict";
	var Module = (function () {
	    function Module(name) {
	        //////////////////////////////////
	        // Implementation
	        this.bindings = {};
	        this.components = {};
	        this.expressionFilters = {};
	        this.animations = {};
	        this.name = name;
	    }
	    //////////////////////////////////
	    // wx.IModule
	    Module.prototype.merge = function (other) {
	        var _other = other;
	        Utils_1.extend(_other.components, this.components);
	        Utils_1.extend(_other.bindings, this.bindings);
	        Utils_1.extend(_other.expressionFilters, this.expressionFilters);
	        Utils_1.extend(_other.animations, this.animations);
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
	        var args = Utils_1.args2Array(arguments);
	        var name = args.shift();
	        var handler;
	        // lookup?
	        if (args.length === 0) {
	            // if the handler has been registered as resource, resolve it now and update registry
	            handler = this.bindings[name];
	            if (typeof handler === "string") {
	                handler = Injector_1.injector.get(handler);
	                this.bindings[name] = handler;
	            }
	            return handler;
	        }
	        // registration
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
	        var args = Utils_1.args2Array(arguments);
	        var name = args.shift();
	        var filter;
	        // lookup?
	        if (args.length === 0) {
	            // if the filter has been registered as resource, resolve it now and update registry
	            filter = this.expressionFilters[name];
	            if (typeof filter === "string") {
	                filter = Injector_1.injector.get(filter);
	                this.bindings[name] = filter;
	            }
	            return filter;
	        }
	        // registration
	        filter = args.shift();
	        this.expressionFilters[name] = filter;
	        return this;
	    };
	    Module.prototype.filters = function () {
	        return this.expressionFilters;
	    };
	    Module.prototype.animation = function () {
	        var args = Utils_1.args2Array(arguments);
	        var name = args.shift();
	        var animation;
	        // lookup?
	        if (args.length === 0) {
	            // if the animation has been registered as resource, resolve it now and update registry
	            animation = this.animations[name];
	            if (typeof animation === "string") {
	                animation = Injector_1.injector.get(animation);
	                this.bindings[name] = animation;
	            }
	            return animation;
	        }
	        // registration
	        animation = args.shift();
	        this.animations[name] = animation;
	        return this;
	    };
	    Object.defineProperty(Module.prototype, "app", {
	        get: function () {
	            return Injector_1.injector.get(res.app);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Module.prototype.instantiateComponent = function (name) {
	        var _this = this;
	        var _cd = this.components[name];
	        var result = undefined;
	        if (_cd != null) {
	            if (Utils_1.isRxObservable(_cd))
	                result = _cd;
	            else if (Utils_1.isPromise(_cd))
	                return Rx.Observable.fromPromise(_cd);
	            else {
	                // if the component has been registered as resource, resolve it now and update registry
	                var cd = _cd;
	                if (cd.instance) {
	                    result = Rx.Observable.return(cd.instance);
	                }
	                else if (cd.template) {
	                    result = Rx.Observable.return(cd);
	                }
	                else if (cd.resolve) {
	                    var resolved = Injector_1.injector.get(cd.resolve);
	                    result = Rx.Observable.return(resolved);
	                }
	                else if (cd.require) {
	                    result = Utils_1.observableRequire(cd.require);
	                }
	            }
	        }
	        else {
	            result = Rx.Observable.return(undefined);
	        }
	        return result.do(function (x) { return _this.components[name] = { instance: x }; }); // cache descriptor
	    };
	    Module.prototype.initializeComponent = function (obs, params) {
	        var _this = this;
	        return obs.take(1).selectMany(function (component) {
	            if (component == null) {
	                return Rx.Observable.return(undefined);
	            }
	            return Rx.Observable.combineLatest(_this.loadComponentTemplate(component.template, params), component.viewModel ? _this.loadComponentViewModel(component.viewModel, params) : Rx.Observable.return(undefined), function (t, vm) {
	                // if view-model factory yields a function, use it as constructor
	                if (Utils_1.isFunction(vm)) {
	                    vm = new vm(params);
	                }
	                return {
	                    template: t,
	                    viewModel: vm,
	                    preBindingInit: component.preBindingInit,
	                    postBindingInit: component.postBindingInit
	                };
	            });
	        })
	            .take(1);
	    };
	    Module.prototype.loadComponentTemplate = function (template, params) {
	        var _this = this;
	        var syncResult;
	        var el;
	        if (Utils_1.isFunction(template)) {
	            syncResult = template(params);
	            if (Utils_1.isRxObservable(template))
	                return template;
	            if (typeof syncResult === "string") {
	                syncResult = this.app.templateEngine.parse(template(params));
	            }
	            return Rx.Observable.return(syncResult);
	        }
	        else if (typeof template === "string") {
	            syncResult = this.app.templateEngine.parse(template);
	            return Rx.Observable.return(syncResult);
	        }
	        else if (Array.isArray(template)) {
	            return Rx.Observable.return(template);
	        }
	        else if (typeof template === "object") {
	            var options = template;
	            if (options.resolve) {
	                syncResult = Injector_1.injector.get(options.resolve);
	                return Rx.Observable.return(syncResult);
	            }
	            else if (options.promise) {
	                var promise = options.promise;
	                return Rx.Observable.fromPromise(promise);
	            }
	            else if (options.observable) {
	                return options.observable;
	            }
	            else if (options.require) {
	                return Utils_1.observableRequire(options.require).select(function (x) { return _this.app.templateEngine.parse(x); });
	            }
	            else if (options.select) {
	                // try both getElementById & querySelector
	                el = document.getElementById(options.select) ||
	                    document.querySelector(options.select);
	                if (el != null) {
	                    // only the nodes inside the specified element will be cloned for use as the component’s template
	                    syncResult = this.app.templateEngine.parse(el.innerHTML);
	                }
	                else {
	                    syncResult = [];
	                }
	                return Rx.Observable.return(syncResult);
	            }
	        }
	        Utils_1.throwError("invalid template descriptor");
	    };
	    Module.prototype.loadComponentViewModel = function (vm, componentParams) {
	        var syncResult;
	        if (Utils_1.isFunction(vm)) {
	            return Rx.Observable.return(vm);
	        }
	        else if (Array.isArray(vm)) {
	            // assumed to be inline-annotated-array
	            syncResult = Injector_1.injector.resolve(vm, componentParams);
	            return Rx.Observable.return(syncResult);
	        }
	        else if (typeof vm === "object") {
	            var options = vm;
	            if (options.resolve) {
	                syncResult = Injector_1.injector.get(options.resolve, componentParams);
	                return Rx.Observable.return(syncResult);
	            }
	            else if (options.observable) {
	                return options.observable;
	            }
	            else if (options.promise) {
	                var promise = options.promise;
	                return Rx.Observable.fromPromise(promise);
	            }
	            else if (options.require) {
	                return Utils_1.observableRequire(options.require);
	            }
	            else if (options.instance) {
	                return Rx.Observable.return(options.instance);
	            }
	        }
	        Utils_1.throwError("invalid view-model descriptor");
	    };
	    return Module;
	})();
	exports.Module = Module;
	exports.modules = {};
	/**
	* Defines a module.
	* @param {string} name The module name
	* @return {wx.IModule} The module handle
	*/
	function module(name, descriptor) {
	    exports.modules[name] = descriptor;
	    return this;
	}
	exports.module = module;
	/**
	* Instantiate a new module instance and configure it using the user supplied configuration
	* @param {string} name The module name
	* @return {wx.IModule} The module handle
	*/
	function loadModule(name) {
	    var md = exports.modules[name];
	    var result = undefined;
	    var module;
	    if (md != null) {
	        if (Array.isArray(md)) {
	            // assumed to be inline-annotated-array
	            // resolve the configuration function via DI and invoke it with the module instance as argument
	            module = new Module(name);
	            Injector_1.injector.resolve(md, module);
	            result = Rx.Observable.return(module);
	        }
	        else if (Utils_1.isFunction(md)) {
	            // configuration function
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
	                    // resolve the configuration function via DI and invoke it with the module instance as argument
	                    Injector_1.injector.get(mdd.resolve, module);
	                    result = Rx.Observable.return(module);
	                }
	                else if (mdd.require) {
	                    // load the configuration function from external module and invoke it with the module instance as argument
	                    result = Utils_1.observableRequire(mdd.require)
	                        .do(function (x) { return x(module); }) // configure the module
	                        .select(function (x) { return module; });
	                }
	            }
	        }
	    }
	    else {
	        result = Rx.Observable.return(undefined);
	    }
	    return result.take(1).do(function (x) { return exports.modules[name] = { instance: x }; }); // cache instantiated module
	}
	exports.loadModule = loadModule;
	//# sourceMappingURL=Module.js.map

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	"use strict";
	/**
	* Knockout's object-literal parser ported to Typescript
	*/
	// The following regular expressions will be used to split an object-literal string into tokens
	// These two match strings, either with double quotes or single quotes
	var stringDouble = '"(?:[^"\\\\]|\\\\.)*"';
	var stringSingle = "'(?:[^'\\\\]|\\\\.)*'";
	// Matches a regular expression (text enclosed by slashes), but will also match sets of divisions
	// as a regular expression (this is handled by the parsing loop below).
	var stringRegexp = '/(?:[^/\\\\]|\\\\.)*/\w*';
	// These characters have special meaning to the parser and must not appear in the middle of a
	// token, except as part of a string.
	var specials = ',"\'{}()/:[\\]';
	// Match text (at least two characters) that does not contain any of the above special characters,
	// although some of the special characters are allowed to start it (all but the colon and comma).
	// The text can contain spaces, but leading or trailing spaces are skipped.
	var everyThingElse = '[^\\s:,/][^' + specials + ']*[^\\s' + specials + ']';
	// Match any non-space character not matched already. This will match colons and commas, since they're
	// not matched by "everyThingElse", but will also match any other single character that wasn't already
	// matched (for example: in "a: 1, b: 2", each of the non-space characters will be matched by oneNotSpace).
	var oneNotSpace = '[^\\s]';
	// Create the actual regular expression by or-ing the above strings. The order is important.
	var bindingToken = RegExp(stringDouble + '|' + stringSingle + '|' + stringRegexp + '|' + everyThingElse + '|' + oneNotSpace, 'g');
	// Match end of previous token to determine whether a slash is a division or regex.
	var divisionLookBehind = /[\])"'A-Za-z0-9_$]+$/;
	var keywordRegexLookBehind = { 'in': 1, 'return': 1, 'typeof': 1 };
	// Simplified extend() for our use-case
	function extend(dst, obj) {
	    var key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            dst[key] = obj[key];
	        }
	    }
	    return dst;
	}
	/**
	* Split an object-literal string into tokens (borrowed from the KnockoutJS project)
	* @param {string} objectLiteralString A javascript-style object literal without leading and trailing curly brances
	* @return {Command<any>} A Command whose ExecuteAsync just returns the CommandParameter immediately. Which you should ignore!
	*/
	function parseObjectLiteral(objectLiteralString) {
	    // Trim leading and trailing spaces from the string
	    var str = objectLiteralString.trim();
	    // Trim braces '{' surrounding the whole object literal
	    if (str.charCodeAt(0) === 123)
	        str = str.slice(1, -1);
	    // Split into tokens
	    var result = new Array(), toks = str.match(bindingToken), key, values, depth = 0;
	    if (toks) {
	        // Append a comma so that we don't need a separate code block to deal with the last item
	        toks.push(',');
	        for (var i = 0, tok = void 0; tok = toks[i]; ++i) {
	            var c = tok.charCodeAt(0);
	            // A comma signals the end of a key/value pair if depth is zero
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
	                // Look at the end of the previous token to determine if the slash is actually division
	                var match = toks[i - 1].match(divisionLookBehind);
	                if (match && !keywordRegexLookBehind[match[0]]) {
	                    // The slash is actually a division punctuator; re-parse the remainder of the string (not including the slash)
	                    str = str.substr(str.indexOf(tok) + 1);
	                    toks = str.match(bindingToken);
	                    toks.push(',');
	                    i = -1;
	                    // Continue with just the slash
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
	                key = (c === 34 || c === 39) /* '"', "'" */ ? tok.slice(1, -1) : tok;
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
	exports.parseObjectLiteral = parseObjectLiteral;
	/**
	* Angular's expression compiler ported to Typescript
	*/
	var hookField = "___runtimeHooks";
	function isDefined(value) { return typeof value !== "undefined"; }
	//function valueFn(value) { return () => value; }
	function $parseMinErr(module, message, arg1, arg2, arg3, arg4, arg5) {
	    var args = arguments;
	    message = message.replace(/{(\d)}/g, function (match) {
	        return args[2 + parseInt(match[1])];
	    });
	    throw new SyntaxError(message);
	}
	function lowercase(string) { return typeof string === "string" ? string.toLowerCase() : string; }
	// Sandboxing Angular Expressions
	// ------------------------------
	// Angular expressions are generally considered safe because these expressions only have direct
	// access to $scope and locals. However, one can obtain the ability to execute arbitrary JS code by
	// obtaining a reference to native JS functions such as the Function constructor.
	//
	// As an example, consider the following Angular expression:
	//
	//   {}.toString.constructor(alert("evil JS code"))
	//
	// We want to prevent this type of access. For the sake of performance, during the lexing phase we
	// disallow any "dotted" access to any member named "constructor".
	//
	// For reflective calls (a[b]) we check that the value of the lookup is not the Function constructor
	// while evaluating the expression, which is a stronger but more expensive test. Since reflective
	// calls are expensive anyway, this is not such a big deal compared to static dereferencing.
	//
	// This sandboxing technique is not perfect and doesn't aim to be. The goal is to prevent exploits
	// against the expression language, but not to prevent exploits that were enabled by exposing
	// sensitive JavaScript or browser apis on Scope. Exposing such objects on a Scope is never a good
	// practice and therefore we are not even trying to protect against interaction with an object
	// explicitly exposed in this way.
	//
	// A developer could foil the name check by aliasing the Function constructor under a different
	// name on the scope.
	//
	// In general, it is not possible to access a Window object from an angular expression unless a
	// window or some DOM object that has a reference to window is published onto a Scope.
	function ensureSafeMemberName(name, fullExpression) {
	    if (name === "constructor") {
	        throw $parseMinErr("isecfld", "Referencing \"constructor\" field in WebRx expressions is disallowed! Expression: {0}", fullExpression);
	    }
	    return name;
	}
	function ensureSafeObject(obj, fullExpression) {
	    // nifty check if obj is Function that is fast and works across iframes and other contexts
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
	    /* jshint bitwise : false */
	    'null': function () { return null; },
	    'true': function () { return true; },
	    'false': function () { return false; },
	    undefined: Utils_1.noop,
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
	    '*': function (self, locals, a, b) { return a(self, locals) * b(self, locals); },
	    '/': function (self, locals, a, b) { return a(self, locals) / b(self, locals); },
	    '%': function (self, locals, a, b) { return a(self, locals) % b(self, locals); },
	    '^': function (self, locals, a, b) { return a(self, locals) ^ b(self, locals); },
	    '=': Utils_1.noop,
	    '===': function (self, locals, a, b) { return a(self, locals) === b(self, locals); },
	    '!==': function (self, locals, a, b) { return a(self, locals) !== b(self, locals); },
	    '==': function (self, locals, a, b) { return a(self, locals) === b(self, locals); },
	    '!=': function (self, locals, a, b) { return a(self, locals) !== b(self, locals); },
	    '<': function (self, locals, a, b) { return a(self, locals) < b(self, locals); },
	    '>': function (self, locals, a, b) { return a(self, locals) > b(self, locals); },
	    '<=': function (self, locals, a, b) { return a(self, locals) <= b(self, locals); },
	    '>=': function (self, locals, a, b) { return a(self, locals) >= b(self, locals); },
	    '&&': function (self, locals, a, b) { return a(self, locals) && b(self, locals); },
	    '||': function (self, locals, a, b) { return a(self, locals) || b(self, locals); },
	    '&': function (self, locals, a, b) { return a(self, locals) & b(self, locals); },
	    //    '|':function(self, locals, a,b){return a|b;},
	    '|': function (self, locals, a, b) { return b(self, locals)(self, locals, a(self, locals)); },
	    '!': function (self, locals, a) { return !a(self, locals); }
	};
	/* jshint bitwise: true */
	var ESCAPE = { "n": "\n", "f": "\f", "r": "\r", "t": "\t", "v": "\v", "'": "'", '"': "\"" };
	/**
	* @constructor
	*/
	var Lexer = (function () {
	    function Lexer(options) {
	        this.options = options;
	    }
	    Lexer.prototype.lex = function (text) {
	        this.text = text;
	        this.index = 0;
	        this.ch = undefined;
	        this.lastCh = ":"; // can start regexp
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
	                // identifiers can only be if the preceding char was a { or ,
	                if (this.was("{,") && json[0] === "{" &&
	                    (token = this.tokens[this.tokens.length - 1])) {
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
	        // IE treats non-breaking space as \u00A0
	        return (ch === " " || ch === "\r" || ch === "\t" ||
	            ch === "\n" || ch === "\v" || ch === "\u00A0");
	    };
	    Lexer.prototype.isIdent = function (ch) {
	        return ("a" <= ch && ch <= "z" ||
	            "A" <= ch && ch <= "Z" ||
	            "_" === ch || ch === "$" || ch === "@");
	    };
	    Lexer.prototype.isExpOperator = function (ch) {
	        return (ch === "-" || ch === "+" || this.isNumber(ch));
	    };
	    Lexer.prototype.throwError = function (error, start, end) {
	        end = end || this.index;
	        var colStr = (isDefined(start)
	            ? "s " + start + "-" + this.index + " [" + this.text.substring(start, end) + "]"
	            : " " + end);
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
	                else if (this.isExpOperator(ch) &&
	                    peekCh && this.isNumber(peekCh) &&
	                    n.charAt(n.length - 1) === "e") {
	                    n += ch;
	                }
	                else if (this.isExpOperator(ch) &&
	                    (!peekCh || !this.isNumber(peekCh)) &&
	                    n.charAt(n.length - 1) === "e") {
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
	        //check if this is not a method invocation and if it is back out to last dot
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
	        // OPERATORS is our own object so we don't need to use special hasOwnPropertyFn
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
	/**
	* @constructor
	*/
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
	            if (t === e1 || t === e2 || t === e3 || t === e4 ||
	                (!e1 && !e2 && !e3 && !e4)) {
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
	                // optimize for the common case where there is only one statement.
	                // TODO(size): maybe we should not support multiple statements?
	                return (statements.length === 1)
	                    ? statements[0] :
	                    function (self, locals) {
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
	                this.throwError("implies assignment but [" +
	                    this.text.substring(0, token.index) + "] can not be assigned to", token);
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
	                // prevent overwriting of Function.constructor which would break ensureSafeObject check
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
	            var fnPtr = fn(scope, locals, context) || Utils_1.noop;
	            ensureSafeObject(context, parser.text);
	            ensureSafeObject(fnPtr, parser.text);
	            // IE stupidity! (IE doesn't have apply for some native functions)
	            var v = fnPtr.apply
	                ? fnPtr.apply(context, args)
	                : fnPtr(args[0], args[1], args[2], args[3], args[4]);
	            return ensureSafeObject(v, parser.text);
	        };
	    };
	    // This is used with json array declaration
	    Parser.prototype.arrayDeclaration = function () {
	        var elementFns = [];
	        var allConstant = true;
	        if (this.peekToken().text !== "]") {
	            do {
	                if (this.peek("]")) {
	                    // Support trailing commas per ES5.1.
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
	                    // Support trailing commas per ES5.1.
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
	function ZERO() { return 0; }
	;
	//////////////////////////////////////////////////
	// Parser helper functions
	//////////////////////////////////////////////////
	function setter(obj, path, setValue, fullExp, options, locals) {
	    var element = path.split("."), key;
	    var i;
	    var propertyObj;
	    var hooks = getRuntimeHooks(locals);
	    if (hooks) {
	        for (var i_1 = 0; element.length > 1; i_1++) {
	            key = ensureSafeMemberName(element.shift(), fullExp);
	            propertyObj = hooks.readFieldHook ?
	                hooks.readFieldHook(obj, key) :
	                obj[key];
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
	        for (var i_2 = 0; element.length > 1; i_2++) {
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
	/**
	* Implementation of the "Black Hole" variant from:
	* - http://jsperf.com/angularjs-parse-getter/4
	* - http://jsperf.com/path-evaluation-simplified/7
	*/
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
	    // Check whether the cache has this getter already.
	    // We can use hasOwnProperty directly on the cache because we ensure,
	    // see below, that the cache never stores a path called 'hasOwnProperty'
	    if (getterFnCache.hasOwnProperty(path)) {
	        return getterFnCache[path];
	    }
	    var pathKeys = path.split("."), pathKeysLength = pathKeys.length, fn;
	    // When we have only 1 or 2 tokens, use optimized special case closures.
	    // http://jsperf.com/angularjs-parse-getter/6
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
	                // backup locals
	                var _locals = {};
	                Object.keys(locals).forEach(function (x) { return _locals[x] = locals[x]; });
	                var i = 0, val;
	                do {
	                    val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], fullExp, options)(scope, locals);
	                    scope = val;
	                    // reset locals
	                    locals = {};
	                    Object.keys(_locals).forEach(function (x) { return locals[x] = _locals[x]; });
	                } while (i < pathKeysLength);
	                return val;
	            };
	        }
	    } /* else {
	    let code = "var p;\n";
	    forEach(pathKeys, (key, index) => {
	        ensureSafeMemberName(key, fullExp);
	        code += "if(s == null) return undefined;\n" +
	            "s=" + (index
	                // we simply dereference 's' on any .dot notation
	                ? "s"
	                // but if we are first then we check locals first, and if so read it first
	                : "((k&&k.hasOwnProperty(\"" + key + "\"))?k:s)") + "[\"" + key + "\"]" + ";\n";
	    });
	    code += "return s;";
	
	    // jshint -W054
	    let evaledFnGetter = new Function("s", "k", "pw", code); // s=scope, k=locals, pw=promiseWarning
	    // jshint +W054 /
	    evaledFnGetter.toString = valueFn(code);
	    fn = <(scope: any, locals?: any, self?: any) => any> evaledFnGetter;
	} */
	    // Only cache the value if it's not going to mess up the cache object
	    // This is more performant that using Object.prototype.hasOwnProperty.call
	    if (path !== "hasOwnProperty") {
	        getterFnCache[path] = fn;
	    }
	    return fn;
	}
	function getRuntimeHooks(locals) {
	    return locals !== undefined ? locals[hookField] : undefined;
	}
	exports.getRuntimeHooks = getRuntimeHooks;
	function setRuntimeHooks(locals, hooks) {
	    locals[hookField] = hooks;
	}
	exports.setRuntimeHooks = setRuntimeHooks;
	/**
	 * Compiles src and returns a function that executes src on a target object.
	 * The compiled function is cached under compile.cache[src] to speed up further calls.
	 *
	 * @param {string} src
	 * @returns {function}
	 */
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
	exports.compileExpression = compileExpression;
	//# sourceMappingURL=ExpressionCompiler.js.map

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	var WeakMap_1 = __webpack_require__(5);
	var Set_1 = __webpack_require__(7);
	var IID_1 = __webpack_require__(10);
	var Injector_1 = __webpack_require__(2);
	var Utils_1 = __webpack_require__(3);
	var res = __webpack_require__(11);
	var env = __webpack_require__(17);
	"use strict";
	/**
	* The heart of WebRx's binding-system
	* @class
	*/
	var DomManager = (function () {
	    function DomManager(compiler, app) {
	        this.expressionCache = {};
	        this.dataContextExtensions = Set_1.createSet();
	        this.parserOptions = {
	            disallowFunctionCalls: true
	        };
	        this.nodeState = WeakMap_1.createWeakMap();
	        this.compiler = compiler;
	        this.app = app;
	    }
	    DomManager.prototype.applyBindings = function (model, rootNode) {
	        if (rootNode === undefined || rootNode.nodeType !== 1)
	            Utils_1.throwError("first parameter should be your model, second parameter should be a DOM node!");
	        if (this.isNodeBound(rootNode))
	            Utils_1.throwError("an element must not be bound multiple times!");
	        // create or update node state for root node
	        var state = this.getNodeState(rootNode);
	        if (state) {
	            state.model = model;
	        }
	        else {
	            state = this.createNodeState(model);
	            this.setNodeState(rootNode, state);
	        }
	        // calculate resulting data-context and apply bindings
	        var ctx = this.getDataContext(rootNode);
	        this.applyBindingsRecursive(ctx, rootNode);
	    };
	    DomManager.prototype.applyBindingsToDescendants = function (ctx, node) {
	        if (node.hasChildNodes()) {
	            for (var i = 0; i < node.childNodes.length; i++) {
	                var child = node.childNodes[i];
	                // only elements
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
	                // only elements
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
	            // build compiler options
	            var options = Utils_1.extend(this.parserOptions, {});
	            options.filters = {};
	            // enrich with app filters
	            Utils_1.extend(this.app.filters(), options.filters);
	            // enrich with module filters
	            if (module && module.name != "app") {
	                Utils_1.extend(module.filters(), options.filters);
	            }
	            return this.compiler.compileExpression(value, options, this.expressionCache);
	        }
	    };
	    DomManager.prototype.getModuleContext = function (node) {
	        var state;
	        // collect model hierarchy
	        while (node) {
	            state = this.getNodeState(node);
	            if (state != null) {
	                if (state.module != null) {
	                    return state.module;
	                }
	            }
	            node = node.parentNode;
	        }
	        // default to app
	        return this.app;
	    };
	    DomManager.prototype.registerDataContextExtension = function (extension) {
	        this.dataContextExtensions.add(extension);
	    };
	    DomManager.prototype.getDataContext = function (node) {
	        var models = [];
	        var state = this.getNodeState(node);
	        // collect model hierarchy
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
	        // extensions
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
	        return state != null && !!state.isBound;
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
	        // support external per-node cleanup
	        env.cleanExternalData(node);
	    };
	    DomManager.prototype.evaluateExpression = function (exp, ctx) {
	        var locals = this.createLocals(undefined, ctx);
	        var result = exp(ctx.$data, locals);
	        return result;
	    };
	    DomManager.prototype.expressionToObservable = function (exp, ctx, evalObs) {
	        var _this = this;
	        var captured = Set_1.createSet();
	        var locals;
	        var result;
	        // initial evaluation
	        try {
	            locals = this.createLocals(captured, ctx);
	            result = exp(ctx.$data, locals);
	            // diagnostics
	            if (evalObs)
	                evalObs.onNext(true);
	        }
	        catch (e) {
	            this.app.defaultExceptionHandler.onNext(e);
	            return Rx.Observable.return(undefined);
	        }
	        // Optimization: If the initial evaluation didn't touch any observables, treat it as constant expression
	        if (captured.size === 0) {
	            if (Utils_1.isRxObservable(result))
	                return result;
	            // wrap it
	            return Rx.Observable.return(result);
	        }
	        var obs = Rx.Observable.create(function (observer) {
	            var innerDisp = Rx.Observable.defer(function () {
	                // construct observable that represents the first change of any of the expression's dependencies
	                return Rx.Observable.merge(Set_1.setToArray(captured)).take(1);
	            })
	                .repeat()
	                .subscribe(function (trigger) {
	                try {
	                    // reset execution state before evaluation
	                    captured.clear();
	                    locals = _this.createLocals(captured, ctx);
	                    // evaluate and produce next value
	                    result = exp(ctx.$data, locals);
	                    if (!Utils_1.isRxObservable(result)) {
	                        // wrap non-observable
	                        observer.onNext(Rx.Observable.return(result));
	                    }
	                    else {
	                        observer.onNext(result);
	                    }
	                    // diagnostics
	                    if (evalObs)
	                        evalObs.onNext(true);
	                }
	                catch (e) {
	                    _this.app.defaultExceptionHandler.onNext(e);
	                }
	            });
	            return innerDisp;
	        });
	        // prefix with initial result
	        var startValue = Utils_1.isRxObservable(result) ?
	            result :
	            Rx.Observable.return(result);
	        return obs.startWith(startValue).concatAll();
	    };
	    DomManager.prototype.applyBindingsInternal = function (ctx, el, module) {
	        var result = false;
	        // get or create elment-state
	        var state = this.getNodeState(el);
	        // create and set if necessary
	        if (!state) {
	            state = this.createNodeState();
	            this.setNodeState(el, state);
	        }
	        else if (state.isBound) {
	            Utils_1.throwError("an element must not be bound multiple times!");
	        }
	        var _bindings;
	        var tagName = el.tagName.toLowerCase();
	        // check if tag represents a component
	        if (module.hasComponent(tagName) || this.app.hasComponent(tagName)) {
	            // when a component is referenced by element, we just apply a virtual 'component' binding
	            var params = el.getAttribute(DomManager.paramsAttributename);
	            var componentReference;
	            if (params)
	                componentReference = "{ name: '" + tagName + "', params: {" + el.getAttribute(DomManager.paramsAttributename) + "} }";
	            else
	                componentReference = "{ name: '" + tagName + "' }";
	            _bindings = [{ key: 'component', value: componentReference }];
	        }
	        else {
	            // get definitions from attribute
	            _bindings = this.getBindingDefinitions(el);
	        }
	        if (_bindings != null && _bindings.length > 0) {
	            // lookup handlers
	            var bindings = _bindings.map(function (x) {
	                var handler = module.binding(x.key);
	                if (!handler)
	                    Utils_1.throwError("binding '{0}' has not been registered.", x.key);
	                return { handler: handler, value: x.value };
	            });
	            // sort by priority
	            bindings.sort(function (a, b) { return (b.handler.priority || 0) - (a.handler.priority || 0); });
	            // check if there's binding-handler competition for descendants (which is illegal)
	            var hd = bindings.filter(function (x) { return x.handler.controlsDescendants; }).map(function (x) { return "'" + x.value + "'"; });
	            if (hd.length > 1) {
	                Utils_1.throwError("bindings {0} are competing for descendants of target element!", hd.join(", "));
	            }
	            result = hd.length > 0;
	            // apply all bindings
	            for (var i = 0; i < bindings.length; i++) {
	                var binding = bindings[i];
	                var handler = binding.handler;
	                handler.applyBinding(el, binding.value, ctx, state, module);
	            }
	        }
	        // mark bound
	        state.isBound = true;
	        return result;
	    };
	    DomManager.prototype.isObjectLiteralString = function (str) {
	        return str[0] === "{" && str[str.length - 1] === "}";
	    };
	    DomManager.prototype.getBindingDefinitions = function (node) {
	        var bindingText = null;
	        if (node.nodeType === 1) {
	            // attempt to get definition from attribute
	            var attr = node.getAttribute(DomManager.bindingAttributeName);
	            if (attr) {
	                bindingText = attr;
	            }
	        }
	        // transform textual binding-definition into a key-value store where 
	        // the key is the binding name and the value is its options
	        if (bindingText) {
	            bindingText = bindingText.trim();
	        }
	        if (bindingText)
	            return this.compiler.parseObjectLiteral(bindingText);
	        return null;
	    };
	    DomManager.prototype.applyBindingsRecursive = function (ctx, el, module) {
	        // "module" binding receiving first-class treatment here because it is considered part of the core
	        module = module || this.getModuleContext(el);
	        if (!this.applyBindingsInternal(ctx, el, module) && el.hasChildNodes()) {
	            // module binding might have updated state.module
	            var state = this.getNodeState(el);
	            if (state && state.module)
	                module = state.module;
	            // iterate over descendants
	            for (var i = 0; i < el.childNodes.length; i++) {
	                var child = el.childNodes[i];
	                // only elements
	                if (child.nodeType !== 1)
	                    continue;
	                this.applyBindingsRecursive(ctx, child, module);
	            }
	        }
	    };
	    DomManager.prototype.cleanNodeRecursive = function (node) {
	        if (node.hasChildNodes()) {
	            var length_1 = node.childNodes.length;
	            for (var i = 0; i < length_1; i++) {
	                var child = node.childNodes[i];
	                // only elements
	                if (node.nodeType !== 1)
	                    continue;
	                this.cleanNodeRecursive(child);
	            }
	        }
	        // clear parent after childs
	        this.clearNodeState(node);
	    };
	    DomManager.prototype.createLocals = function (captured, ctx) {
	        var locals = {};
	        var list;
	        var prop;
	        var result, target;
	        var hooks = {
	            readFieldHook: function (o, field) {
	                // handle "@propref" access-modifier
	                var noUnwrap = false;
	                if (field[0] === '@') {
	                    noUnwrap = true;
	                    field = field.substring(1);
	                }
	                result = o[field];
	                // intercept access to observable properties
	                if (!noUnwrap && Utils_1.isProperty(result)) {
	                    var prop_1 = result;
	                    // register observable
	                    if (captured)
	                        captured.add(prop_1.changed);
	                    // get the property's real value
	                    result = prop_1();
	                }
	                return result;
	            },
	            writeFieldHook: function (o, field, newValue) {
	                // ignore @propref access-modifier on writes
	                if (field[0] === '@') {
	                    field = field.substring(1);
	                }
	                target = o[field];
	                // intercept access to observable properties
	                if (Utils_1.isProperty(target)) {
	                    var prop_2 = target;
	                    // register observable
	                    if (captured)
	                        captured.add(prop_2.changed);
	                    // replace field assignment with property invocation
	                    prop_2(newValue);
	                }
	                else {
	                    o[field] = newValue;
	                }
	                return newValue;
	            },
	            readIndexHook: function (o, index) {
	                // recognize observable lists
	                if (Utils_1.queryInterface(o, IID_1.default.IObservableList)) {
	                    // translate indexer to list.get()
	                    list = o;
	                    result = list.get(index);
	                    // add collectionChanged to monitored observables
	                    if (captured)
	                        captured.add(list.listChanged);
	                }
	                else {
	                    result = o[index];
	                }
	                // intercept access to observable properties
	                if (Utils_1.queryInterface(result, IID_1.default.IObservableProperty)) {
	                    var prop_3 = result;
	                    // register observable
	                    if (captured)
	                        captured.add(prop_3.changed);
	                    // get the property's real value
	                    result = prop_3();
	                }
	                return result;
	            },
	            writeIndexHook: function (o, index, newValue) {
	                // recognize observable lists
	                if (Utils_1.queryInterface(o, IID_1.default.IObservableList)) {
	                    // translate indexer to list.get()
	                    list = o;
	                    target = list.get(index);
	                    // add collectionChanged to monitored observables
	                    if (captured)
	                        captured.add(list.listChanged);
	                    // intercept access to observable properties
	                    if (Utils_1.isProperty(target)) {
	                        prop = target;
	                        // register observable
	                        if (captured)
	                            captured.add(prop.changed);
	                        // replace field assignment with property invocation
	                        prop(newValue);
	                    }
	                    else {
	                        list.set(index, newValue);
	                    }
	                }
	                else {
	                    // intercept access to observable properties
	                    if (Utils_1.isProperty(o[index])) {
	                        prop = target[index];
	                        // register observable
	                        if (captured)
	                            captured.add(prop.changed);
	                        // replace field assignment with property invocation
	                        prop(newValue);
	                    }
	                    else {
	                        o[index] = newValue;
	                    }
	                }
	                return newValue;
	            }
	        };
	        // install property interceptor hooks
	        this.compiler.setRuntimeHooks(locals, hooks);
	        // injected context members into locals
	        var keys = Object.keys(ctx);
	        var length = keys.length;
	        for (var i = 0; i < length; i++) {
	            var key = keys[i];
	            locals[key] = ctx[key];
	        }
	        return locals;
	    };
	    //////////////////////////////////
	    // Implementation
	    DomManager.bindingAttributeName = "data-bind";
	    DomManager.paramsAttributename = "params";
	    return DomManager;
	})();
	exports.DomManager = DomManager;
	/**
	* Applies bindings to the specified node and all of its children using the specified data context.
	* @param {any} model The model to bind to
	* @param {Node} rootNode The node to be bound
	*/
	function applyBindings(model, node) {
	    Injector_1.injector.get(res.domManager).applyBindings(model, node || window.document.documentElement);
	}
	exports.applyBindings = applyBindings;
	/**
	* Removes and cleans up any binding-related state from the specified node and its descendants.
	* @param {Node} rootNode The node to be cleaned
	*/
	function cleanNode(node) {
	    Injector_1.injector.get(res.domManager).cleanNode(node);
	}
	exports.cleanNode = cleanNode;
	//# sourceMappingURL=DomManager.js.map

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var WeakMap_1 = __webpack_require__(5);
	"use strict";
	var _window = window;
	var userAgent = _window.navigator.userAgent;
	var parseVersion = function (matches) {
	    if (matches) {
	        return parseFloat(matches[1]);
	    }
	    return undefined;
	};
	// Detect Opera
	if (_window.opera && _window.opera.version) {
	    exports.opera = { version: parseInt(_window.opera.version()) };
	}
	// Detect wx.IE versions for bug workarounds (uses wx.IE conditionals, not UA string, for robustness)
	// Note that, since wx.IE 10 does not support conditional comments, the following logic only detects wx.IE < 10.
	// Currently this is by design, since wx.IE 10+ behaves correctly when treated as a standard browser.
	var version = document && (function () {
	    var version = 3, div = document.createElement('div'), iElems = div.getElementsByTagName('i');
	    // Keep constructing conditional HTML blocks until we hit one that resolves to an empty fragment
	    while (div.innerHTML = '<!--[if gt wx.IE ' + (++version) + ']><i></i><![endif]-->',
	        iElems[0]) { }
	    return version > 4 ? version : undefined;
	}());
	if (version) {
	    exports.ie = { version: version };
	    if (version < 10) {
	        // for wx.IE9 and lower, provide an accessor for document scoped
	        // observables which allow monitoring the selectionchange event
	        var map = WeakMap_1.createWeakMap();
	        exports.ie.getSelectionChangeObservable = function (el) {
	            var doc = el.ownerDocument;
	            var result = map.get(doc);
	            if (result)
	                return result;
	            result = Rx.Observable.defer(function () {
	                return Rx.Observable.fromEvent(doc, 'selectionchange');
	            })
	                .select(function (x) { return doc; })
	                .publish()
	                .refCount();
	            map.set(doc, result);
	            return result;
	        };
	    }
	}
	// Detect Safari (not Chrome or WebKit)
	version = parseVersion(userAgent.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i));
	if (version) {
	    exports.safari = { version: version };
	}
	// Detect FF
	version = parseVersion(userAgent.match(/Firefox\/([^ ]*)/));
	if (version) {
	    exports.firefox = { version: version };
	}
	var hasES5 = typeof Array.isArray === "function" &&
	    typeof [].forEach === "function" &&
	    typeof [].map === "function" &&
	    typeof [].some === "function" &&
	    typeof [].indexOf === "function" &&
	    typeof Object.keys === "function" &&
	    typeof Object.defineProperty === "function";
	exports.isSupported = (!exports.ie || exports.ie.version >= 9) ||
	    (!exports.safari || exports.safari.version >= 5) ||
	    (!exports.firefox || exports.firefox.version >= 5) &&
	        hasES5;
	// Special support for jQuery here because it's so commonly used.
	exports.jQueryInstance = window["jQuery"];
	if (exports.jQueryInstance && (typeof exports.jQueryInstance['cleanData'] === "function")) {
	    exports.cleanExternalData = function (node) {
	        // Many jQuery plugins (including jquery.tmpl) store data using jQuery's equivalent of domData
	        // so notify it to tear down any resources associated with the node.
	        exports.jQueryInstance['cleanData']([node]);
	    };
	}
	else {
	    exports.cleanExternalData = function (node) { };
	}
	//# sourceMappingURL=Environment.js.map

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	"use strict";
	/**
	* Html Template Engine based on JQuery's parseHTML
	* NOTE: This version does not support scripts in templates!
	*/
	var rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, rtagName = /<([\w:-]+)/, rhtml = /<|&#?\w+;/, rscriptType = /^$|\/(?:java|ecma)script/i, 
	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
	    // Support: IE9
	    option: [1, "<select multiple='multiple'>", "</select>"],
	    thead: [1, "<table>", "</table>"],
	    // Some of the following wrappers are not fully defined, because
	    // their parent elements (except for "table" element) could be omitted
	    // since browser parsers are smart enough to auto-insert them
	    // Support: Android 2.3
	    // Android browser doesn't auto-insert colgroup
	    col: [2, "<table><colgroup>", "</colgroup></table>"],
	    // Auto-insert "tbody" element
	    tr: [2, "<table>", "</table>"],
	    // Auto-insert "tbody" and "tr" elements
	    td: [3, "<table>", "</table>"],
	    _default: [0, "", ""]
	};
	// Support: IE9
	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	var supportsCreateHTMLDocument = (function () {
	    var doc = document.implementation.createHTMLDocument("");
	    // Support: Node with jsdom<=1.5.0+
	    // jsdom's document created via the above method doesn't contain the body
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
	            // Add nodes directly
	            if (typeof elem === "object") {
	                // Support: Android<4.1, PhantomJS<2
	                // push.apply(_, arraylike) throws on ancient WebKit
	                merge(nodes, elem.nodeType ? [elem] : elem);
	            }
	            else if (!rhtml.test(elem)) {
	                nodes.push(context.createTextNode(elem));
	            }
	            else {
	                tmp = tmp || fragment.appendChild(context.createElement("div"));
	                // Deserialize a standard representation
	                tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
	                wrap = wrapMap[tag] || wrapMap._default;
	                tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
	                // Descend through wrappers to the right content
	                j = wrap[0];
	                while (j--) {
	                    tmp = tmp.lastChild;
	                }
	                // Support: Android<4.1, PhantomJS<2
	                // push.apply(_, arraylike) throws on ancient WebKit
	                merge(nodes, tmp.childNodes);
	                // Remember the top-level container
	                tmp = fragment.firstChild;
	                // Ensure the created nodes are orphaned (#12392)
	                tmp.textContent = "";
	            }
	        }
	    }
	    // Remove wrapper from fragment
	    fragment.textContent = "";
	    i = 0;
	    while ((elem = nodes[i++])) {
	        // filter out scripts
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
	        // document.implementation stops scripts or inline event handlers from being executed immediately
	        var context = supportsCreateHTMLDocument ? document.implementation.createHTMLDocument("") : document;
	        var parsed = rsingleTag.exec(data);
	        // Single tag
	        if (parsed) {
	            return [context.createElement(parsed[1])];
	        }
	        parsed = buildFragment([data], context);
	        var result = merge([], parsed.childNodes);
	        return result;
	    };
	    return HtmlTemplateEngine;
	})();
	exports.default = HtmlTemplateEngine;
	//# sourceMappingURL=HtmlTemplateEngine.js.map

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	var Command_1 = __webpack_require__(20);
	"use strict";
	var CommandBinding = (function () {
	    function CommandBinding(domManager, app) {
	        this.priority = 0;
	        this.domManager = domManager;
	        this.app = app;
	    }
	    ////////////////////
	    // wx.IBinding
	    CommandBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("command-binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
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
	        state.cleanup.add(Rx.Observable
	            .combineLatest(cmdObservable, paramObservable, function (cmd, param) { return ({ cmd: cmd, param: param }); })
	            .subscribe(function (x) {
	            try {
	                doCleanup();
	                cleanup = new Rx.CompositeDisposable();
	                if (x.cmd != null) {
	                    if (!Command_1.isCommand(x.cmd))
	                        Utils_1.throwError("Command-Binding only supports binding to a command!");
	                    // disabled handling if supported by element
	                    if (Utils_1.elementCanBeDisabled(el)) {
	                        // initial update
	                        el.disabled = !x.cmd.canExecute(x.param);
	                        // listen to changes
	                        cleanup.add(x.cmd.canExecuteObservable.subscribe(function (canExecute) {
	                            el.disabled = !canExecute;
	                        }));
	                    }
	                    // handle input events
	                    cleanup.add(Rx.Observable.fromEvent(el, "click").subscribe(function (e) {
	                        // verify that the command can actually execute since we cannot disable 
	                        // all elements - only form elements such as buttons 
	                        if (x.cmd.canExecute(x.param)) {
	                            x.cmd.execute(x.param);
	                        }
	                        // prevent default for anchors
	                        if (isAnchor) {
	                            e.preventDefault();
	                        }
	                    }));
	                }
	            }
	            catch (e) {
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	            el = null;
	            // nullify locals
	            doCleanup();
	        }));
	    };
	    CommandBinding.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    return CommandBinding;
	})();
	exports.default = CommandBinding;
	//# sourceMappingURL=Command.js.map

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var IID_1 = __webpack_require__(10);
	var Utils_1 = __webpack_require__(3);
	var Reflect_1 = __webpack_require__(4);
	var Injector_1 = __webpack_require__(2);
	var res = __webpack_require__(11);
	"use strict";
	var Command = (function () {
	    /// <summary>
	    /// Don't use this directly, use commandXYZ instead
	    /// </summary>
	    function Command(canExecute, executeAsync, scheduler) {
	        var _this = this;
	        this.resultsSubject = new Rx.Subject();
	        this.isExecutingSubject = new Rx.Subject();
	        this.inflightCount = 0;
	        this.canExecuteLatest = false;
	        this.canExecuteDisp = null;
	        this.scheduler = scheduler || Injector_1.injector.get(res.app).mainThreadScheduler;
	        this.func = executeAsync;
	        // setup canExecute
	        this.canExecuteObs = canExecute
	            .combineLatest(this.isExecutingSubject.startWith(false), function (ce, ie) { return ce && !ie; })
	            .catch(function (ex) {
	            _this.exceptionsSubject.onNext(ex);
	            return Rx.Observable.return(false);
	        })
	            .do(function (x) {
	            _this.canExecuteLatest = x;
	        })
	            .publish();
	        if (Utils_1.isInUnitTest()) {
	            this.canExecuteObs.connect();
	        }
	        // setup thrownExceptions
	        this.exceptionsSubject = new Rx.Subject();
	        this.thrownExceptions = this.exceptionsSubject.asObservable();
	        this.exceptionsSubject
	            .observeOn(this.scheduler)
	            .subscribe(Injector_1.injector.get(res.app).defaultExceptionHandler);
	    }
	    //////////////////////////////////
	    // IDisposable implementation
	    Command.prototype.dispose = function () {
	        var disp = this.canExecuteDisp;
	        if (disp != null)
	            disp.dispose();
	    };
	    Object.defineProperty(Command.prototype, "canExecuteObservable", {
	        ////////////////////
	        /// wx.ICommand
	        get: function () {
	            var _this = this;
	            // setup canExecuteObservable
	            var ret = this.canExecuteObs.startWith(this.canExecuteLatest).distinctUntilChanged();
	            if (this.canExecuteDisp != null)
	                return ret;
	            return Rx.Observable.create(function (subj) {
	                var disp = ret.subscribe(subj);
	                // NB: We intentionally leak the CanExecute disconnect, it's
	                // cleaned up by the global Dispose. This is kind of a
	                // "Lazy Subscription" to CanExecute by the command itself.
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
	        this.executeAsync(parameter)
	            .catch(Rx.Observable.empty())
	            .subscribe();
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
	            var disp = self.func(parameter)
	                .observeOn(self.scheduler)
	                .do(function (_) { }, function (e) { return decrement.setDisposable(Rx.Disposable.empty); }, function () { return decrement.setDisposable(Rx.Disposable.empty); })
	                .do(function (x) { return self.resultsSubject.onNext(x); }, function (x) { return self.exceptionsSubject.onNext(x); })
	                .subscribe(subj);
	            return new Rx.CompositeDisposable(disp, decrement);
	        });
	        return ret
	            .publish()
	            .refCount();
	    };
	    Command = __decorate([
	        Reflect_1.Implements(IID_1.default.ICommand),
	        Reflect_1.Implements(IID_1.default.IDisposable), 
	        __metadata('design:paramtypes', [Rx.Observable, Function, Object])
	    ], Command);
	    return Command;
	})();
	exports.Command = Command;
	var internal;
	(function (internal) {
	    internal.commandConstructor = Command;
	})(internal = exports.internal || (exports.internal = {}));
	// factory method implementation
	function command() {
	    var args = Utils_1.args2Array(arguments);
	    var canExecute;
	    var execute;
	    var scheduler;
	    var thisArg;
	    if (Utils_1.isFunction(args[0])) {
	        // first overload
	        execute = args.shift();
	        canExecute = Utils_1.isRxObservable(args[0]) ? args.shift() : Rx.Observable.return(true);
	        scheduler = Utils_1.isRxScheduler(args[0]) ? args.shift() : undefined;
	        thisArg = args.shift();
	        if (thisArg != null)
	            execute = execute.bind(thisArg);
	        return asyncCommand(canExecute, function (parameter) {
	            return Rx.Observable.create(function (obs) {
	                try {
	                    execute(parameter);
	                    obs.onNext(null);
	                    obs.onCompleted();
	                }
	                catch (e) {
	                    obs.onError(e);
	                }
	                return Rx.Disposable.empty;
	            });
	        }, scheduler);
	    }
	    // second overload
	    canExecute = args.shift() || Rx.Observable.return(true);
	    scheduler = Utils_1.isRxScheduler(args[0]) ? args.shift() : undefined;
	    return new Command(canExecute, function (x) { return Rx.Observable.return(x); }, scheduler);
	}
	exports.command = command;
	// factory method implementation
	function asyncCommand() {
	    var args = Utils_1.args2Array(arguments);
	    var canExecute;
	    var executeAsync;
	    var scheduler;
	    var thisArg;
	    if (Utils_1.isFunction(args[0])) {
	        // second overload
	        executeAsync = args.shift();
	        scheduler = Utils_1.isRxScheduler(args[0]) ? args.shift() : undefined;
	        thisArg = args.shift();
	        if (thisArg != null)
	            executeAsync = executeAsync.bind(thisArg);
	        return new Command(Rx.Observable.return(true), executeAsync, scheduler);
	    }
	    // first overload
	    canExecute = args.shift();
	    executeAsync = args.shift();
	    scheduler = Utils_1.isRxScheduler(args[0]) ? args.shift() : undefined;
	    return new Command(canExecute, executeAsync, scheduler);
	}
	exports.asyncCommand = asyncCommand;
	// factory method implementation
	function combinedCommand() {
	    var args = Utils_1.args2Array(arguments);
	    var commands = args
	        .filter(function (x) { return isCommand(x); });
	    var canExecute = args
	        .filter(function (x) { return Utils_1.isRxObservable(x); })
	        .pop();
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
	exports.combinedCommand = combinedCommand;
	/**
	* Determines if target is an instance of a ICommand
	* @param {any} target
	*/
	function isCommand(target) {
	    if (target == null)
	        return false;
	    return target instanceof Command ||
	        Utils_1.queryInterface(target, IID_1.default.ICommand);
	}
	exports.isCommand = isCommand;
	//# sourceMappingURL=Command.js.map

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	var Module_1 = __webpack_require__(14);
	"use strict";
	var ModuleBinding = (function () {
	    function ModuleBinding(domManager, app) {
	        this.priority = 100;
	        this.controlsDescendants = true;
	        this.domManager = domManager;
	        this.app = app;
	    }
	    ////////////////////
	    // wx.IBinding
	    ModuleBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("module-binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
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
	        // backup inner HTML
	        var template = new Array();
	        // subscribe
	        state.cleanup.add(obs.subscribe(function (x) {
	            try {
	                doCleanup();
	                cleanup = new Rx.CompositeDisposable();
	                var value = Utils_1.unwrapProperty(x);
	                var moduleNames;
	                var disp = undefined;
	                // split names
	                if (value) {
	                    value = value.trim();
	                    moduleNames = value.split(" ").filter(function (x) { return x; });
	                }
	                if (moduleNames.length > 0) {
	                    var observables = moduleNames.map(function (x) { return Module_1.loadModule(x); });
	                    disp = Rx.Observable.combineLatest(observables, function (_) { return Utils_1.args2Array(arguments); }).subscribe(function (modules) {
	                        try {
	                            // create intermediate module
	                            var moduleName = (module || _this.app).name + "+" + moduleNames.join("+");
	                            var merged = new Module_1.Module(moduleName);
	                            // merge modules into intermediate
	                            merged.merge(module || _this.app);
	                            modules.forEach(function (x) { return merged.merge(x); });
	                            // done
	                            self.applyValue(el, merged, template, ctx, state, initialApply);
	                            initialApply = false;
	                        }
	                        catch (e) {
	                            _this.app.defaultExceptionHandler.onNext(e);
	                        }
	                    });
	                    if (disp != null)
	                        cleanup.add(disp);
	                }
	            }
	            catch (e) {
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	            obs = null;
	            self = null;
	        }));
	    };
	    ModuleBinding.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    ModuleBinding.prototype.applyValue = function (el, module, template, ctx, state, initialApply) {
	        if (initialApply) {
	            // clone to template
	            for (var i = 0; i < el.childNodes.length; i++) {
	                template.push(el.childNodes[i].cloneNode(true));
	            }
	        }
	        state.module = module;
	        // clean first
	        this.domManager.cleanDescendants(el);
	        // clear
	        while (el.firstChild) {
	            el.removeChild(el.firstChild);
	        }
	        // clone nodes and inject
	        for (var i = 0; i < template.length; i++) {
	            var node = template[i].cloneNode(true);
	            el.appendChild(node);
	        }
	        this.domManager.applyBindingsToDescendants(ctx, el);
	    };
	    return ModuleBinding;
	})();
	exports.default = ModuleBinding;
	//# sourceMappingURL=Module.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Utils_1 = __webpack_require__(3);
	"use strict";
	var IfBinding = (function () {
	    function IfBinding(domManager, app) {
	        this.priority = 50;
	        this.controlsDescendants = true;
	        ////////////////////
	        // wx.Implementation
	        this.inverse = false;
	        this.domManager = domManager;
	        this.app = app;
	    }
	    ////////////////////
	    // wx.IBinding
	    IfBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("if-binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
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
	            // extract animations
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
	        // backup inner HTML
	        var template = new Array();
	        // subscribe
	        state.cleanup.add(obs.subscribe(function (x) {
	            try {
	                doCleanup();
	                cleanup = new Rx.CompositeDisposable();
	                cleanup.add(self.applyValue(el, Utils_1.unwrapProperty(x), template, ctx, animations, initialApply));
	                initialApply = false;
	            }
	            catch (e) {
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	            obs = null;
	            el = null;
	            self = null;
	            // nullify locals
	            template = null;
	        }));
	    };
	    IfBinding.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    IfBinding.prototype.applyValue = function (el, value, template, ctx, animations, initialApply) {
	        var leaveAnimation = animations.leave;
	        var enterAnimation = animations.enter;
	        var self = this;
	        var obs = undefined;
	        if (initialApply) {
	            // clone to template
	            for (var i = 0; i < el.childNodes.length; i++) {
	                template.push(el.childNodes[i].cloneNode(true));
	            }
	            // clear
	            while (el.firstChild) {
	                el.removeChild(el.firstChild);
	            }
	        }
	        var oldElements = Utils_1.nodeChildrenToArray(el);
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
	                    obs = leaveAnimation.run(oldElements)
	                        .continueWith(function () { return leaveAnimation.complete(oldElements); })
	                        .continueWith(removeOldElements);
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
	            for (var i = 0; i < template.length; i++) {
	                el.appendChild(nodes[i]);
	            }
	            this.domManager.applyBindingsToDescendants(ctx, el);
	            if (enterAnimation) {
	                obs = enterAnimation.run(nodes)
	                    .continueWith(function () { return enterAnimation.complete(nodes); });
	            }
	        }
	        return obs ? (obs.subscribe() || Rx.Disposable.empty) : Rx.Disposable.empty;
	    };
	    return IfBinding;
	})();
	exports.IfBinding = IfBinding;
	var NotIfBinding = (function (_super) {
	    __extends(NotIfBinding, _super);
	    function NotIfBinding(domManager, app) {
	        _super.call(this, domManager, app);
	        this.inverse = true;
	    }
	    return NotIfBinding;
	})(IfBinding);
	exports.NotIfBinding = NotIfBinding;
	//# sourceMappingURL=If.js.map

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Utils_1 = __webpack_require__(3);
	var BindingBase_1 = __webpack_require__(24);
	"use strict";
	var CssBinding = (function (_super) {
	    __extends(CssBinding, _super);
	    function CssBinding(domManager, app) {
	        _super.call(this, domManager, app, true);
	    }
	    CssBinding.prototype.applyValue = function (el, value, key) {
	        var classes;
	        if (key !== "") {
	            classes = key.split(/\s+/).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
	            if (classes.length) {
	                Utils_1.toggleCssClass.apply(null, [el, !!value].concat(classes));
	            }
	        }
	        else {
	            var state = this.domManager.getNodeState(el);
	            // if we have previously added classes, remove them
	            if (state.cssBindingPreviousDynamicClasses != null) {
	                Utils_1.toggleCssClass.apply(null, [el, false].concat(state.cssBindingPreviousDynamicClasses));
	                state.cssBindingPreviousDynamicClasses = null;
	            }
	            if (value) {
	                classes = value.split(/\s+/).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
	                if (classes.length) {
	                    Utils_1.toggleCssClass.apply(null, [el, true].concat(classes));
	                    state.cssBindingPreviousDynamicClasses = classes;
	                }
	            }
	        }
	    };
	    return CssBinding;
	})(BindingBase_1.MultiOneWayBindingBase);
	exports.CssBinding = CssBinding;
	var AttrBinding = (function (_super) {
	    __extends(AttrBinding, _super);
	    function AttrBinding(domManager, app) {
	        _super.call(this, domManager, app);
	        this.priority = 5;
	    }
	    AttrBinding.prototype.applyValue = function (el, value, key) {
	        // To cover cases like "attr: { checked:someProp }", we want to remove the attribute entirely
	        // when someProp is a "no value"-like value (strictly null, false, or undefined)
	        // (because the absence of the "checked" attr is how to mark an element as not checked, etc.)
	        var toRemove = (value === false) || (value === null) || (value === undefined);
	        if (toRemove)
	            el.removeAttribute(key);
	        else {
	            el.setAttribute(key, value.toString());
	        }
	    };
	    return AttrBinding;
	})(BindingBase_1.MultiOneWayBindingBase);
	exports.AttrBinding = AttrBinding;
	var StyleBinding = (function (_super) {
	    __extends(StyleBinding, _super);
	    function StyleBinding(domManager, app) {
	        _super.call(this, domManager, app);
	    }
	    StyleBinding.prototype.applyValue = function (el, value, key) {
	        if (value === null || value === undefined || value === false) {
	            // Empty string removes the value, whereas null/undefined have no effect
	            value = "";
	        }
	        el.style[key] = value;
	    };
	    return StyleBinding;
	})(BindingBase_1.MultiOneWayBindingBase);
	exports.StyleBinding = StyleBinding;
	//# sourceMappingURL=MultiOneWay.js.map

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	"use strict";
	/**
	* Base class for one-way bindings that take a single expression and apply the result to one or more target elements
	* @class
	*/
	var SingleOneWayBindingBase = (function () {
	    function SingleOneWayBindingBase(domManager, app) {
	        this.priority = 0;
	        this.domManager = domManager;
	        this.app = app;
	    }
	    ////////////////////
	    // wx.IBinding
	    SingleOneWayBindingBase.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
	        var el = node;
	        var self = this;
	        var exp = this.domManager.compileBindingOptions(options, module);
	        var obs = this.domManager.expressionToObservable(exp, ctx);
	        // subscribe
	        state.cleanup.add(obs.subscribe(function (x) {
	            try {
	                self.applyValue(el, Utils_1.unwrapProperty(x));
	            }
	            catch (e) {
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	            el = null;
	            obs = null;
	            self = null;
	        }));
	    };
	    SingleOneWayBindingBase.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    SingleOneWayBindingBase.prototype.applyValue = function (el, value) {
	        Utils_1.throwError("you need to override this method!");
	    };
	    return SingleOneWayBindingBase;
	})();
	exports.SingleOneWayBindingBase = SingleOneWayBindingBase;
	/**
	* Base class for one-way bindings that take multiple expressions defined as object literal and apply the result to one or more target elements
	* @class
	*/
	var MultiOneWayBindingBase = (function () {
	    function MultiOneWayBindingBase(domManager, app, supportsDynamicValues) {
	        if (supportsDynamicValues === void 0) { supportsDynamicValues = false; }
	        this.priority = 0;
	        this.supportsDynamicValues = false;
	        this.domManager = domManager;
	        this.app = app;
	        this.supportsDynamicValues = supportsDynamicValues;
	    }
	    ////////////////////
	    // wx.IBinding
	    MultiOneWayBindingBase.prototype.applyBinding = function (node, options, ctx, state, module) {
	        if (node.nodeType !== 1)
	            Utils_1.throwError("binding only operates on elements!");
	        var compiled = this.domManager.compileBindingOptions(options, module);
	        if (compiled == null || (typeof compiled !== "object" && !this.supportsDynamicValues))
	            Utils_1.throwError("invalid binding-options!");
	        var el = node;
	        var observables = new Array();
	        var obs;
	        var exp;
	        var keys = Object.keys(compiled);
	        var key;
	        if (typeof compiled === "function") {
	            exp = compiled;
	            obs = this.domManager.expressionToObservable(exp, ctx);
	            observables.push(["", obs]);
	        }
	        else {
	            for (var i = 0; i < keys.length; i++) {
	                key = keys[i];
	                var value = compiled[key];
	                exp = value;
	                obs = this.domManager.expressionToObservable(exp, ctx);
	                observables.push([key, obs]);
	            }
	        }
	        // subscribe
	        for (var i = 0; i < observables.length; i++) {
	            key = observables[i][0];
	            obs = observables[i][1];
	            this.subscribe(el, obs, key, state);
	        }
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	            el = null;
	            keys = null;
	            // nullify locals
	            observables = null;
	        }));
	    };
	    MultiOneWayBindingBase.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    MultiOneWayBindingBase.prototype.subscribe = function (el, obs, key, state) {
	        var _this = this;
	        state.cleanup.add(obs.subscribe(function (x) {
	            try {
	                _this.applyValue(el, Utils_1.unwrapProperty(x), key);
	            }
	            catch (e) {
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	    };
	    MultiOneWayBindingBase.prototype.applyValue = function (el, key, value) {
	        Utils_1.throwError("you need to override this method!");
	    };
	    return MultiOneWayBindingBase;
	})();
	exports.MultiOneWayBindingBase = MultiOneWayBindingBase;
	//# sourceMappingURL=BindingBase.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Utils_1 = __webpack_require__(3);
	var BindingBase_1 = __webpack_require__(24);
	"use strict";
	////////////////////
	// Bindings
	var TextBinding = (function (_super) {
	    __extends(TextBinding, _super);
	    function TextBinding(domManager, app) {
	        _super.call(this, domManager, app);
	    }
	    TextBinding.prototype.applyValue = function (el, value) {
	        if ((value === null) || (value === undefined))
	            value = "";
	        el.textContent = value;
	    };
	    return TextBinding;
	})(BindingBase_1.SingleOneWayBindingBase);
	exports.TextBinding = TextBinding;
	var VisibleBinding = (function (_super) {
	    __extends(VisibleBinding, _super);
	    function VisibleBinding(domManager, app) {
	        _super.call(this, domManager, app);
	        this.inverse = false;
	        this.inverse = false;
	        this.priority = 10;
	    }
	    VisibleBinding.prototype.configure = function (_options) {
	        var options = _options;
	        VisibleBinding.useCssClass = options.useCssClass;
	        VisibleBinding.hiddenClass = options.hiddenClass;
	    };
	    ////////////////////
	    // implementation
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
	            Utils_1.toggleCssClass(el, !value, VisibleBinding.hiddenClass);
	        }
	    };
	    return VisibleBinding;
	})(BindingBase_1.SingleOneWayBindingBase);
	exports.VisibleBinding = VisibleBinding;
	var HiddenBinding = (function (_super) {
	    __extends(HiddenBinding, _super);
	    function HiddenBinding(domManager, app) {
	        _super.call(this, domManager, app);
	        this.inverse = true;
	    }
	    return HiddenBinding;
	})(VisibleBinding);
	exports.HiddenBinding = HiddenBinding;
	var HtmlBinding = (function (_super) {
	    __extends(HtmlBinding, _super);
	    function HtmlBinding(domManager, app) {
	        _super.call(this, domManager, app);
	    }
	    HtmlBinding.prototype.applyValue = function (el, value) {
	        if ((value === null) || (value === undefined))
	            value = "";
	        el.innerHTML = value;
	    };
	    return HtmlBinding;
	})(BindingBase_1.SingleOneWayBindingBase);
	exports.HtmlBinding = HtmlBinding;
	var DisableBinding = (function (_super) {
	    __extends(DisableBinding, _super);
	    function DisableBinding(domManager, app) {
	        _super.call(this, domManager, app);
	        this.inverse = false;
	        this.inverse = false;
	    }
	    ////////////////////
	    // implementation
	    DisableBinding.prototype.applyValue = function (el, value) {
	        value = this.inverse ? !value : value;
	        if (Utils_1.elementCanBeDisabled(el)) {
	            el.disabled = value;
	        }
	    };
	    return DisableBinding;
	})(BindingBase_1.SingleOneWayBindingBase);
	exports.DisableBinding = DisableBinding;
	var EnableBinding = (function (_super) {
	    __extends(EnableBinding, _super);
	    function EnableBinding(domManager, app) {
	        _super.call(this, domManager, app);
	        this.inverse = true;
	    }
	    return EnableBinding;
	})(DisableBinding);
	exports.EnableBinding = EnableBinding;
	//# sourceMappingURL=SingleOneWay.js.map

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../RxExtensions.d.ts" />
	var Utils_1 = __webpack_require__(3);
	var VirtualChildNodes_1 = __webpack_require__(27);
	var RefCountDisposeWrapper_1 = __webpack_require__(28);
	var Injector_1 = __webpack_require__(2);
	var List_1 = __webpack_require__(29);
	"use strict";
	var ForEachBinding = (function () {
	    function ForEachBinding(domManager, app) {
	        this.priority = 40;
	        this.controlsDescendants = true;
	        this.domManager = domManager;
	        this.app = app;
	        // hook into getDataContext() to map state['index'] to ctx['$index']
	        domManager.registerDataContextExtension(function (node, ctx) {
	            var state = domManager.getNodeState(node);
	            ctx.$index = state.index;
	        });
	    }
	    ////////////////////
	    // wx.IBinding
	    ForEachBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("forEach binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("** invalid binding options!");
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
	            // extract animations
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
	                // extract hooks
	                hooks = this.domManager.evaluateExpression(opt.hooks, ctx);
	            }
	            // optionally resolve hooks if passed as string identifier
	            if (typeof hooks === "string")
	                hooks = Injector_1.injector.get(hooks);
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
	        // add own disposables
	        state.cleanup.add(Rx.Disposable.create(function () {
	            if (cleanup) {
	                cleanup.dispose();
	                cleanup = null;
	            }
	        }));
	        // backup inner HTML
	        var template = new Array();
	        // subscribe
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
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	            obs = null;
	            el = null;
	            self = null;
	            // nullify locals
	            template = null;
	            hooks = null;
	        }));
	    };
	    ForEachBinding.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    ForEachBinding.prototype.createIndexPropertyForNode = function (proxy, child, startIndex, trigger, templateLength) {
	        return Rx.Observable.defer(function () {
	            return Rx.Observable.create(function (obs) {
	                return trigger.subscribe(function (_) {
	                    // recalculate index from node position within parent
	                    var index = proxy.childNodes.indexOf(child);
	                    index /= templateLength;
	                    obs.onNext(index);
	                });
	            });
	        })
	            .toProperty(startIndex);
	    };
	    ForEachBinding.prototype.appendAllRows = function (proxy, list, ctx, template, hooks, animations, indexTrigger, isInitial) {
	        var length = list.length();
	        for (var i = 0; i < length; i++) {
	            this.appendRow(proxy, i, list.get(i), ctx, template, hooks, animations, indexTrigger, isInitial);
	        }
	    };
	    ForEachBinding.prototype.appendRow = function (proxy, index, item, ctx, template, hooks, animations, indexTrigger, isInitial) {
	        var nodes = Utils_1.cloneNodeArray(template);
	        var _index = index;
	        var enterAnimation = animations.itemEnter;
	        var cbData = {
	            item: item
	        };
	        if (indexTrigger) {
	            _index = this.createIndexPropertyForNode(proxy, nodes[0], index, indexTrigger, template.length);
	            cbData.indexDisp = new RefCountDisposeWrapper_1.default(_index, 0);
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
	            var disp = enterAnimation.run(nodes)
	                .continueWith(function () { return enterAnimation.complete(nodes); })
	                .subscribe(function (x) {
	                if (disp != null)
	                    disp.dispose();
	            });
	        }
	    };
	    ForEachBinding.prototype.insertRow = function (proxy, index, item, ctx, template, hooks, animations, indexTrigger) {
	        var templateLength = template.length;
	        var enterAnimation = animations.itemEnter;
	        var nodes = Utils_1.cloneNodeArray(template);
	        var _index = this.createIndexPropertyForNode(proxy, nodes[0], index, indexTrigger, template.length);
	        if (enterAnimation != null)
	            enterAnimation.prepare(nodes);
	        proxy.insertChilds(index * templateLength, nodes, {
	            index: _index,
	            item: item,
	            indexDisp: new RefCountDisposeWrapper_1.default(_index, 0)
	        });
	        if (hooks) {
	            if (hooks.afterRender)
	                hooks.afterRender(nodes, item);
	            if (hooks.afterAdd)
	                hooks.afterAdd(nodes, item, index);
	        }
	        if (enterAnimation) {
	            var disp = enterAnimation.run(nodes)
	                .continueWith(function () { return enterAnimation.complete(nodes); })
	                .subscribe(function (x) {
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
	                var disp = leaveAnimation.run(nodes)
	                    .continueWith(function () { return leaveAnimation.complete(nodes); })
	                    .continueWith(removeNodes)
	                    .subscribe(function (x) {
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
	            // create new row
	            nodes = Utils_1.cloneNodeArray(template);
	            var _index = self.createIndexPropertyForNode(proxy, nodes[0], from, indexTrigger, template.length);
	            if (enterAnimation != null)
	                enterAnimation.prepare(nodes);
	            proxy.insertChilds(templateLength * to, nodes, {
	                index: _index,
	                item: item,
	                indexDisp: new RefCountDisposeWrapper_1.default(_index, 0)
	            });
	            if (hooks && hooks.afterMove) {
	                hooks.afterMove(nodes, item, from);
	            }
	        }
	        // construct leave-observable
	        if (leaveAnimation) {
	            leaveAnimation.prepare(nodes);
	            obs = leaveAnimation.run(nodes)
	                .continueWith(function () { return leaveAnimation.complete(nodes); })
	                .continueWith(removeNodes);
	        }
	        else {
	            obs = Rx.Observable.startDeferred(removeNodes);
	        }
	        combined.push(obs);
	        // construct enter-observable
	        obs = Rx.Observable.startDeferred(createRow);
	        if (enterAnimation) {
	            obs = obs.continueWith(enterAnimation.run(nodes))
	                .continueWith(function () { return enterAnimation.complete(nodes); });
	        }
	        combined.push(obs);
	        // optimize return
	        if (combined.length > 1)
	            obs = Rx.Observable.combineLatest(combined, Utils_1.noop).take(1);
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
	        var indexDisp = new RefCountDisposeWrapper_1.default(_index, 0);
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
	        // initial insert
	        this.appendAllRows(proxy, list, ctx, template, hooks, animations, indexTrigger, true);
	        // track changes
	        cleanup.add(list.itemsAdded.subscribe(function (e) {
	            length = e.items.length;
	            if (e.from === list.length()) {
	                for (var i_1 = 0; i_1 < length; i_1++) {
	                    _this.appendRow(proxy, i_1 + e.from, e.items[i_1], ctx, template, hooks, animations, indexTrigger, false);
	                }
	            }
	            else {
	                for (var i_2 = 0; i_2 < e.items.length; i_2++) {
	                    _this.insertRow(proxy, i_2 + e.from, e.items[i_2], ctx, template, hooks, animations, indexTrigger);
	                }
	            }
	            indexTrigger.onNext(true);
	        }));
	        cleanup.add(list.itemsRemoved.subscribe(function (e) {
	            length = e.items.length;
	            for (var i_3 = 0; i_3 < length; i_3++) {
	                _this.removeRow(proxy, i_3 + e.from, e.items[i_3], template, hooks, animations);
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
	            // clone to template
	            length = el.childNodes.length;
	            for (var i_4 = 0; i_4 < length; i_4++) {
	                template.push(el.childNodes[i_4].cloneNode(true));
	            }
	        }
	        // perform initial clear
	        while (el.firstChild) {
	            el.removeChild(el.firstChild);
	        }
	        if (template.length === 0)
	            return; // nothing to do
	        var proxy;
	        var self = this;
	        var recalcIndextrigger;
	        function nodeInsertCB(node, callbackData) {
	            var item = callbackData.item;
	            var index = callbackData.index;
	            var indexDisp = callbackData.indexDisp;
	            if (node.nodeType === 1) {
	                // propagate index to state
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
	        proxy = new VirtualChildNodes_1.default(el, false, nodeInsertCB, nodeRemoveCB);
	        if (setProxyFunc)
	            setProxyFunc(proxy);
	        cleanup.add(Rx.Disposable.create(function () {
	            proxy = null;
	        }));
	        if (Array.isArray(value)) {
	            var arr = value;
	            // iterate once and be done with it
	            length = arr.length;
	            for (var i_5 = 0; i_5 < length; i_5++) {
	                this.appendRow(proxy, i_5, arr[i_5], ctx, template, hooks, animations, undefined, true);
	            }
	        }
	        else if (List_1.isList(value)) {
	            var list = value;
	            recalcIndextrigger = new Rx.Subject();
	            this.observeList(proxy, ctx, template, cleanup, list, hooks, animations, recalcIndextrigger);
	        }
	    };
	    return ForEachBinding;
	})();
	exports.default = ForEachBinding;
	//# sourceMappingURL=ForEach.js.map

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	* VirtualChildNodes implements consisent and predictable manipulation
	* of a DOM Node's childNodes collection regardless its the true contents
	* @class
	**/
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
	        // append to proxy array
	        if (nodes.length > 1)
	            Array.prototype.push.apply(this.childNodes, nodes);
	        else
	            this.childNodes.push(nodes[0]);
	        // append to DOM
	        for (var i = 0; i < length; i++) {
	            this.targetNode.appendChild(nodes[i]);
	        }
	        // callback
	        if (this.insertCB) {
	            for (var i = 0; i < length; i++) {
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
	            var length_1 = nodes.length;
	            // insert into proxy array
	            Array.prototype.splice.apply(this.childNodes, [index, 0].concat(nodes));
	            // insert into DOM
	            for (var i = 0; i < length_1; i++) {
	                this.targetNode.insertBefore(nodes[i], refNode);
	            }
	            // callback
	            if (this.insertCB) {
	                for (var i = 0; i < length_1; i++) {
	                    this.insertCB(nodes[i], callbackData);
	                }
	            }
	        }
	    };
	    VirtualChildNodes.prototype.removeChilds = function (index, count, keepDom) {
	        var node;
	        if (count === 0)
	            return [];
	        // extract removed nodes
	        var nodes = this.childNodes.slice(index, index + count);
	        // remove from proxy array
	        this.childNodes.splice(index, count);
	        if (!keepDom) {
	            // remove from DOM
	            var length_2 = nodes.length;
	            for (var i = 0; i < length_2; i++) {
	                node = nodes[i];
	                if (this.removeCB)
	                    this.removeCB(node);
	                this.targetNode.removeChild(node);
	            }
	        }
	        return nodes;
	    };
	    VirtualChildNodes.prototype.clear = function () {
	        // remove from DOM
	        var length = this.childNodes.length;
	        var node;
	        for (var i = 0; i < length; i++) {
	            node = this.childNodes[i];
	            if (this.removeCB)
	                this.removeCB(node);
	            this.targetNode.removeChild(node);
	        }
	        // reset proxy array
	        this.childNodes = [];
	    };
	    return VirtualChildNodes;
	})();
	exports.default = VirtualChildNodes;
	//# sourceMappingURL=VirtualChildNodes.js.map

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
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
	exports.default = RefCountDisposeWrapper;
	//# sourceMappingURL=RefCountDisposeWrapper.js.map

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
	    switch (arguments.length) {
	        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
	        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
	        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
	    }
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var Utils_1 = __webpack_require__(3);
	var Oid_1 = __webpack_require__(6);
	var IID_1 = __webpack_require__(10);
	var Lazy_1 = __webpack_require__(30);
	var ScheduledSubject_1 = __webpack_require__(31);
	var Events_1 = __webpack_require__(9);
	var RefCountDisposeWrapper_1 = __webpack_require__(28);
	var log = __webpack_require__(12);
	var Reflect_1 = __webpack_require__(4);
	var Injector_1 = __webpack_require__(2);
	var res = __webpack_require__(11);
	"use strict";
	/**
	* ReactiveUI's awesome ReactiveList ported to Typescript
	* @class
	*/
	var ObservableList = (function () {
	    function ObservableList(initialContents, resetChangeThreshold, scheduler) {
	        if (resetChangeThreshold === void 0) { resetChangeThreshold = 0.3; }
	        if (scheduler === void 0) { scheduler = null; }
	        //////////////////////////
	        // Some array convenience members
	        this.push = this.add;
	        this.changeNotificationsSuppressed = 0;
	        this.propertyChangeWatchers = null;
	        this.resetChangeThreshold = 0;
	        this.resetSubCount = 0;
	        this.hasWhinedAboutNoResetSub = false;
	        this.app = Injector_1.injector.get(res.app);
	        this.setupRx(initialContents, resetChangeThreshold, scheduler);
	    }
	    //////////////////////////////////
	    // wx.IDisposable implementation
	    ObservableList.prototype.dispose = function () {
	        this.clearAllPropertyChangeWatchers();
	    };
	    Object.defineProperty(ObservableList.prototype, "isReadOnly", {
	        ////////////////////
	        /// wx.IObservableList<T>
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
	                this._lengthChanging = this.listChanging.select(function (_) {
	                    return _this.inner.length;
	                }).distinctUntilChanged();
	            return this._lengthChanging;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ObservableList.prototype, "lengthChanged", {
	        get: function () {
	            var _this = this;
	            if (!this._lengthChanged)
	                this._lengthChanged = this.listChanged.select(function (_) {
	                    return _this.inner.length;
	                }).distinctUntilChanged();
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
	            return this.refcountSubscribers(this.listChanged.selectMany(function (x) { return !x ? Rx.Observable.empty() :
	                Rx.Observable.return(null); }), function (x) { return _this.resetSubCount += x; });
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
	            Utils_1.throwError("items");
	        }
	        var disp = this.isLengthAboveResetThreshold(items.length) ? this.suppressChangeNotifications() : Rx.Disposable.empty;
	        Utils_1.using(disp, function () {
	            // reset notification
	            if (!_this.areChangeNotificationsEnabled()) {
	                // this._inner.splice(this._inner.length, 0, items)
	                Array.prototype.push.apply(_this.inner, items);
	                if (_this.changeTrackingEnabled) {
	                    items.forEach(function (x) {
	                        _this.addItemToPropertyTracking(x);
	                    });
	                }
	            }
	            else {
	                var from = _this.inner.length; // need to capture this before "inner" gets modified 
	                if (_this.beforeItemsAddedSubject.isValueCreated) {
	                    _this.beforeItemsAddedSubject.value.onNext({ items: items, from: from });
	                }
	                Array.prototype.push.apply(_this.inner, items);
	                if (_this.itemsAddedSubject.isValueCreated) {
	                    _this.itemsAddedSubject.value.onNext({ items: items, from: from });
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
	            Utils_1.throwError("collection");
	        }
	        if (index > this.inner.length) {
	            Utils_1.throwError("index");
	        }
	        var disp = this.isLengthAboveResetThreshold(items.length) ? this.suppressChangeNotifications() : Rx.Disposable.empty;
	        Utils_1.using(disp, function () {
	            // reset notification
	            if (!_this.areChangeNotificationsEnabled()) {
	                // this._inner.splice(index, 0, items)
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
	            Utils_1.throwError("items");
	        }
	        var disp = this.isLengthAboveResetThreshold(items.length) ?
	            this.suppressChangeNotifications() : Rx.Disposable.empty;
	        Utils_1.using(disp, function () {
	            // NB: wx.If we don't do this, we'll break Collection<T>'s
	            // accounting of the length
	            items.forEach(function (x) { return _this.remove(x); });
	        });
	    };
	    ObservableList.prototype.removeRange = function (index, count) {
	        var _this = this;
	        var disp = this.isLengthAboveResetThreshold(count) ? this.suppressChangeNotifications() : Rx.Disposable.empty;
	        Utils_1.using(disp, function () {
	            // construct items
	            var items = _this.inner.slice(index, index + count);
	            // reset notification
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
	        var args = Utils_1.args2Array(arguments);
	        var filter = args.shift();
	        if (filter != null && Utils_1.isRxObservable(filter)) {
	            return new ObservableListProjection(this, undefined, undefined, undefined, filter, args.shift());
	        }
	        var orderer = args.shift();
	        if (orderer != null && Utils_1.isRxObservable(orderer)) {
	            return new ObservableListProjection(this, filter, undefined, undefined, orderer, args.shift());
	        }
	        var selector = args.shift();
	        if (selector != null && Utils_1.isRxObservable(selector)) {
	            return new ObservableListProjection(this, filter, orderer, undefined, selector, args.shift());
	        }
	        return new ObservableListProjection(this, filter, orderer, selector, args.shift(), args.shift());
	    };
	    ObservableList.prototype.suppressChangeNotifications = function () {
	        var _this = this;
	        this.changeNotificationsSuppressed++;
	        if (!this.hasWhinedAboutNoResetSub && this.resetSubCount === 0 && !Utils_1.isInUnitTest()) {
	            log.info("suppressChangeNotifications was called (perhaps via addRange), yet you do not have a subscription to shouldReset. This probably isn't what you want, as itemsAdded and friends will appear to 'miss' items");
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
	        scheduler = scheduler || Injector_1.injector.get(res.app).mainThreadScheduler;
	        this.resetChangeThreshold = resetChangeThreshold;
	        if (this.inner === undefined)
	            this.inner = new Array();
	        this.beforeItemsAddedSubject = new Lazy_1.default(function () { return new Rx.Subject(); });
	        this.itemsAddedSubject = new Lazy_1.default(function () { return new Rx.Subject(); });
	        this.beforeItemsRemovedSubject = new Lazy_1.default(function () { return new Rx.Subject(); });
	        this.itemsRemovedSubject = new Lazy_1.default(function () { return new Rx.Subject(); });
	        this.beforeItemReplacedSubject = new Lazy_1.default(function () { return new Rx.Subject(); });
	        this.itemReplacedSubject = new Lazy_1.default(function () { return new Rx.Subject(); });
	        this.resetSubject = new Rx.Subject();
	        this.beforeResetSubject = new Rx.Subject();
	        this.itemChangingSubject = new Lazy_1.default(function () {
	            return ScheduledSubject_1.createScheduledSubject(scheduler);
	        });
	        this.itemChangedSubject = new Lazy_1.default(function () {
	            return ScheduledSubject_1.createScheduledSubject(scheduler);
	        });
	        this.beforeItemsMovedSubject = new Lazy_1.default(function () { return new Rx.Subject(); });
	        this.itemsMovedSubject = new Lazy_1.default(function () { return new Rx.Subject(); });
	        this.listChanged = Rx.Observable.merge(this.itemsAdded.select(function (x) { return false; }), this.itemsRemoved.select(function (x) { return false; }), this.itemReplaced.select(function (x) { return false; }), this.itemsMoved.select(function (x) { return false; }), this.resetSubject.select(function (x) { return true; }))
	            .publish()
	            .refCount();
	        this.listChanging = Rx.Observable.merge(this.beforeItemsAdded.select(function (x) { return false; }), this.beforeItemsRemoved.select(function (x) { return false; }), this.beforeItemReplaced.select(function (x) { return false; }), this.beforeItemsMoved.select(function (x) { return false; }), this.beforeResetSubject.select(function (x) { return true; }))
	            .publish()
	            .refCount();
	        if (initialContents) {
	            Array.prototype.splice.apply(this.inner, [0, 0].concat(initialContents));
	        }
	        this.length = this.lengthChanged.toProperty(this.inner.length);
	        this.isEmpty = this.lengthChanged
	            .select(function (x) { return (x === 0); })
	            .toProperty(this.inner.length === 0);
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
	            this.inner.length = 0; // see http://stackoverflow.com/a/1232046/88513
	            if (this.changeTrackingEnabled)
	                this.clearAllPropertyChangeWatchers();
	            return;
	        }
	        this.publishBeforeResetNotification();
	        this.inner.length = 0; // see http://stackoverflow.com/a/1232046/88513
	        this.publishResetNotification();
	        if (this.changeTrackingEnabled)
	            this.clearAllPropertyChangeWatchers();
	    };
	    ObservableList.prototype.addItemToPropertyTracking = function (toTrack) {
	        var rcd = this.propertyChangeWatchers[Oid_1.getOid(toTrack)];
	        var self = this;
	        if (rcd) {
	            rcd.addRef();
	            return;
	        }
	        var changing = Utils_1.observeObject(toTrack, this.app.defaultExceptionHandler, true)
	            .select(function (i) { return new Events_1.PropertyChangedEventArgs(toTrack, i.propertyName); });
	        var changed = Utils_1.observeObject(toTrack, this.app.defaultExceptionHandler, false)
	            .select(function (i) { return new Events_1.PropertyChangedEventArgs(toTrack, i.propertyName); });
	        var disp = new Rx.CompositeDisposable(changing.where(function (_) { return self.areChangeNotificationsEnabled(); }).subscribe(function (x) { return self.itemChangingSubject.value.onNext(x); }), changed.where(function (_) { return self.areChangeNotificationsEnabled(); }).subscribe(function (x) { return self.itemChangedSubject.value.onNext(x); }));
	        this.propertyChangeWatchers[Oid_1.getOid(toTrack)] = new RefCountDisposeWrapper_1.default(Rx.Disposable.create(function () {
	            disp.dispose();
	            delete self.propertyChangeWatchers[Oid_1.getOid(toTrack)];
	        }));
	    };
	    ObservableList.prototype.removeItemFromPropertyTracking = function (toUntrack) {
	        var rcd = this.propertyChangeWatchers[Oid_1.getOid(toUntrack)];
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
	    ObservableList = __decorate([
	        Reflect_1.Implements(IID_1.default.IObservableList),
	        Reflect_1.Implements(IID_1.default.IDisposable), 
	        __metadata('design:paramtypes', [Array, Number, Object])
	    ], ObservableList);
	    return ObservableList;
	})();
	exports.ObservableList = ObservableList;
	var ObservableListProjection = (function (_super) {
	    __extends(ObservableListProjection, _super);
	    function ObservableListProjection(source, filter, orderer, selector, refreshTrigger, scheduler) {
	        _super.call(this);
	        ////////////////////
	        // wx.Implementation
	        this.readonlyExceptionMessage = "Derived collections cannot be modified.";
	        // This list maps indices in this collection to their corresponding indices in the source collection.
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
	        //////////////////////////////////
	        // ObservableList overrides to enforce readonly contract
	        get: function () {
	            return true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ObservableListProjection.prototype.set = function (index, item) {
	        Utils_1.throwError(this.readonlyExceptionMessage);
	    };
	    ObservableListProjection.prototype.addRange = function (items) {
	        Utils_1.throwError(this.readonlyExceptionMessage);
	    };
	    ObservableListProjection.prototype.insertRange = function (index, items) {
	        Utils_1.throwError(this.readonlyExceptionMessage);
	    };
	    ObservableListProjection.prototype.removeAll = function (items) {
	        Utils_1.throwError(this.readonlyExceptionMessage);
	    };
	    ObservableListProjection.prototype.removeRange = function (index, count) {
	        Utils_1.throwError(this.readonlyExceptionMessage);
	    };
	    ObservableListProjection.prototype.add = function (item) {
	        Utils_1.throwError(this.readonlyExceptionMessage);
	    };
	    ObservableListProjection.prototype.clear = function () {
	        Utils_1.throwError(this.readonlyExceptionMessage);
	    };
	    ObservableListProjection.prototype.remove = function (item) {
	        Utils_1.throwError(this.readonlyExceptionMessage);
	        return undefined;
	    };
	    ObservableListProjection.prototype.insert = function (index, item) {
	        Utils_1.throwError(this.readonlyExceptionMessage);
	    };
	    ObservableListProjection.prototype.removeAt = function (index) {
	        Utils_1.throwError(this.readonlyExceptionMessage);
	    };
	    ObservableListProjection.prototype.move = function (oldIndex, newIndex) {
	        Utils_1.throwError(this.readonlyExceptionMessage);
	    };
	    ObservableListProjection.prototype.sort = function (comparison) {
	        Utils_1.throwError(this.readonlyExceptionMessage);
	    };
	    ObservableListProjection.prototype.reset = function () {
	        var _this = this;
	        Utils_1.using(_super.prototype.suppressChangeNotifications.call(this), function () {
	            _super.prototype.clear.call(_this);
	            _this.addAllItemsFromSourceCollection();
	        });
	    };
	    //////////////////////////////////
	    // wx.IDisposable implementation
	    ObservableListProjection.prototype.dispose = function () {
	        this.disp.dispose();
	        _super.prototype.dispose.call(this);
	    };
	    ObservableListProjection.prototype.referenceEquals = function (a, b) {
	        return Oid_1.getOid(a) === Oid_1.getOid(b);
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
	            this.nsertAndMap(e.from + i, destinationItem);
	        }
	    };
	    ObservableListProjection.prototype.onItemsRemoved = function (e) {
	        this.sourceCopy.splice(e.from, e.items.length);
	        for (var i = 0; i < e.items.length; i++) {
	            var destinationIndex = this.getIndexFromSourceIndex(e.from + i);
	            if (destinationIndex !== -1) {
	                this.emoveAt(destinationIndex);
	            }
	        }
	        var removedCount = e.items.length;
	        this.shiftIndicesAtOrOverThreshold(e.from + removedCount, -removedCount);
	    };
	    ObservableListProjection.prototype.onItemsMoved = function (e) {
	        if (e.items.length > 1) {
	            Utils_1.throwError("Derived collections doesn't support multi-item moves");
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
	            // We mirror the order of the source collection so we'll perform the same move operation
	            // as the source. As is the case with when we have an orderer we don't test whether or not
	            // the item should be included or not here. wx.If it has been included at some point it'll
	            // stay included until onItemChanged picks up a change which filters it.
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
	            // TODO: Conceptually wx.I feel like we shouldn't concern ourselves with ordering when we 
	            // receive a Move notification. wx.If it affects ordering it should be picked up by the
	            // onItemChange and resorted there instead.
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
	                _this.emoveAt(currentDestinationIndex);
	            }
	            else if (!isIncluded && shouldBeIncluded) {
	                _this.nsertAndMap(sourceIndex, _this.selector(changedItem));
	            }
	            else if (isIncluded && shouldBeIncluded) {
	                // The item is already included and it should stay there but it's possible that the change that
	                // caused this event affects the ordering. This gets a little tricky so let's be verbose.
	                var newItem = _this.selector(changedItem);
	                if (_this.orderer == null) {
	                    // We don't have an orderer so we're currently using the source collection index for sorting 
	                    // meaning that no item change will affect ordering. Look at our current item and see if it's
	                    // the exact (reference-wise) same object. wx.If it is then we're done, if it's not (for example 
	                    // if it's an integer) we'll issue a replace event so that subscribers get the new value.
	                    if (!_this.referenceEquals(newItem, _this.get(currentDestinationIndex))) {
	                        _super.prototype.set.call(_this, currentDestinationIndex, newItem);
	                    }
	                }
	                else {
	                    // Don't be tempted to just use the orderer to compare the new item with the previous since
	                    // they'll almost certainly be equal (for reference types). We need to test whether or not the
	                    // new item can stay in the same position that the current item is in without comparing them.
	                    if (_this.canItemStayAtPosition(newItem, currentDestinationIndex)) {
	                        // The new item should be in the same position as the current but there's no need to signal
	                        // that in case they are the same object.
	                        if (!_this.referenceEquals(newItem, _this.get(currentDestinationIndex))) {
	                            _super.prototype.set.call(_this, currentDestinationIndex, newItem);
	                        }
	                    }
	                    else {
	                        // The change is forcing us to reorder. We'll use a move operation if the item hasn't 
	                        // changed (ie it's the same object) and we'll implement it as a remove and add if the
	                        // object has changed (ie the selector is not an identity function).
	                        if (_this.referenceEquals(newItem, _this.get(currentDestinationIndex))) {
	                            var newDestinationIndex = _this.newPositionForExistingItem(sourceIndex, currentDestinationIndex, newItem);
	                            // Debug.Assert(newDestinationIndex != currentDestinationIndex, "This can't be, canItemStayAtPosition said it this couldn't happen");
	                            _this.indexToSourceIndexMap.splice(currentDestinationIndex, 1);
	                            _this.indexToSourceIndexMap.splice(newDestinationIndex, 0, sourceIndex);
	                            _super.prototype.move.call(_this, currentDestinationIndex, newDestinationIndex);
	                        }
	                        else {
	                            _this.emoveAt(currentDestinationIndex);
	                            _this.nsertAndMap(sourceIndex, newItem);
	                        }
	                    }
	                }
	            }
	        });
	    };
	    /// <summary>
	    /// Gets a value indicating whether or not the item fits (sort-wise) at the provided index. The determination
	    /// is made by checking whether or not it's considered larger than or equal to the preceeding item and if
	    /// it's less than or equal to the succeeding item.
	    /// </summary>
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
	    /// <summary>
	    /// Gets the index of the dervived item super. on it's originating element index in the source collection.
	    /// </summary>
	    ObservableListProjection.prototype.getIndexFromSourceIndex = function (sourceIndex) {
	        return this.indexToSourceIndexMap.indexOf(sourceIndex);
	    };
	    /// <summary>
	    /// Returns one or more positions in the source collection where the given item is found super. on the
	    /// provided equality comparer.
	    /// </summary>
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
	    /// <summary>
	    /// wx.Increases (or decreases depending on move direction) all source indices between the source and destination
	    /// move indices.
	    /// </summary>
	    ObservableListProjection.prototype.moveSourceIndexInMap = function (oldSourceIndex, newSourceIndex) {
	        if (newSourceIndex > oldSourceIndex) {
	            // wx.Item is moving towards the end of the list, everything between its current position and its 
	            // new position needs to be shifted down one index
	            this.shiftSourceIndicesInRange(oldSourceIndex + 1, newSourceIndex + 1, -1);
	        }
	        else {
	            // wx.Item is moving towards the front of the list, everything between its current position and its
	            // new position needs to be shifted up one index
	            this.shiftSourceIndicesInRange(newSourceIndex, oldSourceIndex, 1);
	        }
	    };
	    /// <summary>
	    /// wx.Increases (or decreases) all source indices equal to or higher than the threshold. Represents an
	    /// insert or remove of one or more items in the source list thus causing all subsequent items to shift
	    /// up or down.
	    /// </summary>
	    ObservableListProjection.prototype.shiftIndicesAtOrOverThreshold = function (threshold, value) {
	        for (var i = 0; i < this.indexToSourceIndexMap.length; i++) {
	            if (this.indexToSourceIndexMap[i] >= threshold) {
	                this.indexToSourceIndexMap[i] += value;
	            }
	        }
	    };
	    /// <summary>
	    /// wx.Increases (or decreases) all source indices within the range (lower inclusive, upper exclusive). 
	    /// </summary>
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
	        // Debug.Assert(sourceCopy.length == 0, "Expected source copy to be empty");
	        var sourceIndex = 0;
	        this.source.forEach(function (sourceItem) {
	            _this.sourceCopy.push(sourceItem);
	            if (!_this._filter || _this._filter(sourceItem)) {
	                var destinationItem = _this.selector(sourceItem);
	                _this.nsertAndMap(sourceIndex, destinationItem);
	            }
	            sourceIndex++;
	        });
	    };
	    ObservableListProjection.prototype.lear = function () {
	        this.indexToSourceIndexMap = [];
	        this.sourceCopy = [];
	        _super.prototype.clear.call(this);
	    };
	    ObservableListProjection.prototype.nsertAndMap = function (sourceIndex, value) {
	        var destinationIndex = this.positionForNewItem(sourceIndex, value);
	        this.indexToSourceIndexMap.splice(destinationIndex, 0, sourceIndex);
	        _super.prototype.insert.call(this, destinationIndex, value);
	    };
	    ObservableListProjection.prototype.emoveAt = function (destinationIndex) {
	        this.indexToSourceIndexMap.splice(destinationIndex, 1);
	        _super.prototype.removeAt.call(this, destinationIndex);
	    };
	    ObservableListProjection.prototype.positionForNewItem = function (sourceIndex, value) {
	        // wx.If we haven't got an orderer we'll simply match our items to that of the source collection.
	        return this.orderer == null
	            ? ObservableListProjection.positionForNewItemArray(this.indexToSourceIndexMap, sourceIndex, ObservableListProjection.defaultOrderer)
	            : ObservableListProjection.positionForNewItemArray2(this.inner, 0, this.inner.length, value, this.orderer);
	    };
	    ObservableListProjection.positionForNewItemArray = function (array, item, orderer) {
	        return ObservableListProjection.positionForNewItemArray2(array, 0, array.length, item, orderer);
	    };
	    ObservableListProjection.positionForNewItemArray2 = function (array, index, count, item, orderer) {
	        // Debug.Assert(index >= 0);
	        // Debug.Assert(count >= 0);
	        // Debug.Assert((list.length - index) >= count);
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
	    /// <summary>
	    /// Calculates a new destination for an updated item that's already in the list.
	    /// </summary>
	    ObservableListProjection.prototype.newPositionForExistingItem = function (sourceIndex, currentIndex, item) {
	        // wx.If we haven't got an orderer we'll simply match our items to that of the source collection.
	        return this.orderer == null
	            ? ObservableListProjection.newPositionForExistingItem2(this.indexToSourceIndexMap, sourceIndex, currentIndex)
	            : ObservableListProjection.newPositionForExistingItem2(this.inner, item, currentIndex, this.orderer);
	    };
	    /// <summary>
	    /// Calculates a new destination for an updated item that's already in the list.
	    /// </summary>
	    ObservableListProjection.newPositionForExistingItem2 = function (array, item, currentIndex, orderer) {
	        // Since the item changed is most likely a value type we must refrain from ever comparing it to itself.
	        // We do this by figuring out how the updated item compares to its neighbors. By knowing if it's
	        // less than or greater than either one of its neighbors we can limit the search range to a range exlusive
	        // of the current index.
	        // Debug.Assert(list.length > 0);
	        if (array.length === 1) {
	            return 0;
	        }
	        var precedingIndex = currentIndex - 1;
	        var succeedingIndex = currentIndex + 1;
	        // The item on the preceding or succeeding index relative to currentIndex.
	        var comparand = array[precedingIndex >= 0 ? precedingIndex : succeedingIndex];
	        if (orderer == null) {
	            orderer = ObservableListProjection.defaultOrderer;
	        }
	        // Compare that to the (potentially) new value.
	        var cmp = orderer(item, comparand);
	        var min = 0;
	        var max = array.length;
	        if (cmp === 0) {
	            // The new value is equal to the preceding or succeeding item, it may stay at the current position
	            return currentIndex;
	        }
	        else if (cmp > 0) {
	            // The new value is greater than the preceding or succeeding item, limit the search to indices after
	            // the succeeding item.
	            min = succeedingIndex;
	        }
	        else {
	            // The new value is less than the preceding or succeeding item, limit the search to indices before
	            // the preceding item.
	            max = precedingIndex;
	        }
	        // Bail if the search range is invalid.
	        if (min === array.length || max < 0) {
	            return currentIndex;
	        }
	        var ix = ObservableListProjection.positionForNewItemArray2(array, min, max - min, item, orderer);
	        // wx.If the item moves 'forward' in the collection we have to account for the index where
	        // the item currently resides getting removed first.
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
	/**
	* Creates a new observable list with optional default contents
	* @param {Array<T>} initialContents The initial contents of the list
	* @param {number = 0.3} resetChangeThreshold
	*/
	function list(initialContents, resetChangeThreshold, scheduler) {
	    if (resetChangeThreshold === void 0) { resetChangeThreshold = 0.3; }
	    if (scheduler === void 0) { scheduler = null; }
	    return new ObservableList(initialContents, resetChangeThreshold, scheduler);
	}
	exports.list = list;
	/**
	* Determines if target is an instance of a IObservableList
	* @param {any} target
	*/
	function isList(target) {
	    if (target == null)
	        return false;
	    return target instanceof ObservableList;
	}
	exports.isList = isList;
	//# sourceMappingURL=List.js.map

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	* .Net's Lazy<T>
	* @class
	*/
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
	exports.default = Lazy;
	//# sourceMappingURL=Lazy.js.map

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var Utils_1 = __webpack_require__(3);
	"use strict";
	var ScheduledSubject = (function () {
	    function ScheduledSubject(scheduler, defaultObserver, defaultSubject) {
	        this._observerRefCount = 0;
	        this._defaultObserverSub = Rx.Disposable.empty;
	        this._scheduler = scheduler;
	        this._defaultObserver = defaultObserver;
	        this._subject = defaultSubject || new Rx.Subject();
	        if (defaultObserver != null) {
	            this._defaultObserverSub = this._subject
	                .observeOn(this._scheduler)
	                .subscribe(this._defaultObserver);
	        }
	    }
	    ScheduledSubject.prototype.dispose = function () {
	        if (Utils_1.isDisposable(this._subject)) {
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
	    var result = Utils_1.extend(scheduled, new Rx.Subject(), true);
	    return result;
	}
	exports.createScheduledSubject = createScheduledSubject;
	//# sourceMappingURL=ScheduledSubject.js.map

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	var Command_1 = __webpack_require__(20);
	"use strict";
	var EventBinding = (function () {
	    function EventBinding(domManager, app) {
	        this.priority = 0;
	        this.domManager = domManager;
	        this.app = app;
	    }
	    ////////////////////
	    // wx.IBinding
	    EventBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("event-binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
	        var el = node;
	        // create an observable for each event handler value
	        var tokens = this.domManager.getObjectLiteralTokens(options);
	        tokens.forEach(function (token) {
	            _this.wireEvent(el, token.value, token.key, ctx, state, module);
	        });
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	            el = null;
	            // nullify locals
	        }));
	    };
	    EventBinding.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    EventBinding.prototype.wireEvent = function (el, value, eventName, ctx, state, module) {
	        var _this = this;
	        var exp = this.domManager.compileBindingOptions(value, module);
	        var command;
	        var commandParameter = undefined;
	        var obs = Rx.Observable.fromEvent(el, eventName);
	        if (typeof exp === "function") {
	            var handler = this.domManager.evaluateExpression(exp, ctx);
	            handler = Utils_1.unwrapProperty(handler);
	            if (Utils_1.isFunction(handler)) {
	                state.cleanup.add(obs.subscribe(function (e) {
	                    handler.apply(ctx.$data, [ctx, e]);
	                }));
	            }
	            else {
	                if (Command_1.isCommand(handler)) {
	                    command = handler;
	                    state.cleanup.add(obs.subscribe(function (_) {
	                        command.execute(undefined);
	                    }));
	                }
	                else {
	                    // assumed to be an Rx.Observer
	                    var observer = handler;
	                    // subscribe event directly to observer
	                    state.cleanup.add(obs.subscribe(observer));
	                }
	            }
	        }
	        else if (typeof exp === "object") {
	            var opt = exp;
	            command = this.domManager.evaluateExpression(opt.command, ctx);
	            command = Utils_1.unwrapProperty(command);
	            if (exp.hasOwnProperty("parameter"))
	                commandParameter = this.domManager.evaluateExpression(opt.parameter, ctx);
	            state.cleanup.add(obs.subscribe(function (_) {
	                try {
	                    command.execute(commandParameter);
	                }
	                catch (e) {
	                    _this.app.defaultExceptionHandler.onNext(e);
	                }
	            }));
	        }
	        else {
	            Utils_1.throwError("invalid binding options");
	        }
	    };
	    return EventBinding;
	})();
	exports.default = EventBinding;
	//# sourceMappingURL=Event.js.map

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	var res = __webpack_require__(11);
	"use strict";
	var ValueBinding = (function () {
	    function ValueBinding(domManager, app) {
	        this.priority = 5;
	        this.domManager = domManager;
	        this.app = app;
	    }
	    ////////////////////
	    // wx.IBinding
	    ValueBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("value-binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
	        var el = node;
	        var tag = el.tagName.toLowerCase();
	        if (tag !== 'input' && tag !== 'option' && tag !== 'select' && tag !== 'textarea')
	            Utils_1.throwError("value-binding only operates on checkboxes and radio-buttons");
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
	                setNodeValue(el, value, domManager);
	            else {
	                if ((value === null) || (value === undefined))
	                    value = "";
	                el.value = value;
	            }
	        }
	        // options is supposed to be a field-access path
	        state.cleanup.add(this.domManager.expressionToObservable(exp, ctx).subscribe(function (model) {
	            try {
	                if (!Utils_1.isProperty(model)) {
	                    // initial and final update
	                    updateElement(_this.domManager, model);
	                }
	                else {
	                    doCleanup();
	                    cleanup = new Rx.CompositeDisposable();
	                    // update on property change
	                    prop = model;
	                    cleanup.add(prop.changed.subscribe(function (x) {
	                        updateElement(_this.domManager, x);
	                    }));
	                    // initial update
	                    updateElement(_this.domManager, prop());
	                    // don't attempt to updated computed properties
	                    if (!prop.source) {
	                        cleanup.add(Rx.Observable.fromEvent(el, 'change').subscribe(function (e) {
	                            try {
	                                if (useDomManagerForValueUpdates)
	                                    prop(getNodeValue(el, _this.domManager));
	                                else
	                                    prop(el.value);
	                            }
	                            catch (e) {
	                                _this.app.defaultExceptionHandler.onNext(e);
	                            }
	                        }));
	                    }
	                }
	            }
	            catch (e) {
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	            el = null;
	            // nullify locals
	            doCleanup();
	        }));
	    };
	    ValueBinding.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    return ValueBinding;
	})();
	exports.default = ValueBinding;
	/**
	 * For certain elements such as select and input type=radio we store
	 * the real element value in NodeState if it is anything other than a
	 * string. This method returns that value.
	 * @param {Node} node
	 * @param {IDomManager} domManager
	 */
	function getNodeValue(node, domManager) {
	    var state = domManager.getNodeState(node);
	    if (state != null && state[res.hasValueBindingValue]) {
	        return state[res.valueBindingValue];
	    }
	    return node.value;
	}
	exports.getNodeValue = getNodeValue;
	/**
	 * Associate a value with an element. Either by using its value-attribute
	 * or storing it in NodeState
	 * @param {Node} node
	 * @param {any} value
	 * @param {IDomManager} domManager
	 */
	function setNodeValue(node, value, domManager) {
	    if ((value === null) || (value === undefined))
	        value = "";
	    var state = domManager.getNodeState(node);
	    if (typeof value === "string") {
	        // Update the element only if the element and model are different. On some browsers, updating the value
	        // will move the cursor to the end of the input, which would be bad while the user is typing.
	        if (node.value !== value) {
	            node.value = value;
	            // clear state since value is stored in attribute
	            if (state != null && state[res.hasValueBindingValue]) {
	                state[res.hasValueBindingValue] = false;
	                state[res.valueBindingValue] = undefined;
	            }
	        }
	    }
	    else {
	        // get or create state
	        if (state == null) {
	            state = this.createNodeState();
	            this.setNodeState(node, state);
	        }
	        // store value
	        state[res.valueBindingValue] = value;
	        state[res.hasValueBindingValue] = true;
	    }
	}
	exports.setNodeValue = setNodeValue;
	//# sourceMappingURL=Value.js.map

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	"use strict";
	var HasFocusBinding = (function () {
	    function HasFocusBinding(domManager, app) {
	        this.priority = -1;
	        this.domManager = domManager;
	        this.app = app;
	    }
	    ////////////////////
	    // wx.IBinding
	    HasFocusBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("hasFocus-binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
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
	            // convert boolean to number
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
	            // wx.If possible, ignore which event was raised and determine focus state using activeElement,
	            // as this avoids phantom focus/blur events raised when changing tabs in modern browsers.
	            var ownerDoc = el.ownerDocument;
	            if ("activeElement" in ownerDoc) {
	                var active;
	                try {
	                    active = ownerDoc.activeElement;
	                }
	                catch (e) {
	                    // wx.IE9 throws if you access activeElement during page load (see issue #703)
	                    active = ownerDoc.body;
	                }
	                isFocused = (active === el);
	            }
	            prop(isFocused);
	        }
	        function updateElement(value) {
	            if (value) {
	                // Note: wx.If the element is currently hidden, we schedule the focus change
	                // to occur "soonish". Technically this is a hack because it hides the fact
	                // that we make tricky assumption about the presence of a "visible" binding 
	                // on the same element who's subscribe handler runs after us 
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
	        // options is supposed to be a @propref
	        state.cleanup.add(this.domManager.expressionToObservable(exp, ctx).subscribe(function (model) {
	            try {
	                if (!Utils_1.isProperty(model)) {
	                    // initial and final update
	                    updateElement(model);
	                }
	                else {
	                    doCleanup();
	                    cleanup = new Rx.CompositeDisposable();
	                    // update on property change
	                    prop = model;
	                    cleanup.add(prop.changed.subscribe(function (x) {
	                        updateElement(x);
	                    }));
	                    // initial update
	                    updateElement(prop());
	                    // don't attempt to updated computed properties
	                    if (!prop.source) {
	                        cleanup.add(Rx.Observable.merge(_this.getFocusEventObservables(el)).subscribe(function (hasFocus) {
	                            handleElementFocusChange(hasFocus);
	                        }));
	                    }
	                }
	            }
	            catch (e) {
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	            el = null;
	            // nullify locals
	            doCleanup();
	        }));
	    };
	    HasFocusBinding.prototype.configure = function (options) {
	        // intentionally left blank
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
	exports.default = HasFocusBinding;
	//# sourceMappingURL=HasFocus.js.map

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	"use strict";
	var WithBinding = (function () {
	    function WithBinding(domManager, app) {
	        this.priority = 50;
	        this.controlsDescendants = true;
	        this.domManager = domManager;
	        this.app = app;
	    }
	    ////////////////////
	    // wx.IBinding
	    WithBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("with-binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
	        var el = node;
	        var self = this;
	        var exp = this.domManager.compileBindingOptions(options, module);
	        var obs = this.domManager.expressionToObservable(exp, ctx);
	        // subscribe
	        state.cleanup.add(obs.subscribe(function (x) {
	            try {
	                self.applyValue(el, Utils_1.unwrapProperty(x), state);
	            }
	            catch (e) {
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	            obs = null;
	            el = null;
	            self = null;
	            // nullify locals
	        }));
	    };
	    WithBinding.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    WithBinding.prototype.applyValue = function (el, value, state) {
	        state.model = value;
	        var ctx = this.domManager.getDataContext(el);
	        this.domManager.cleanDescendants(el);
	        this.domManager.applyBindingsToDescendants(ctx, el);
	    };
	    return WithBinding;
	})();
	exports.default = WithBinding;
	//# sourceMappingURL=With.js.map

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	"use strict";
	var CheckedBinding = (function () {
	    function CheckedBinding(domManager, app) {
	        this.priority = 0;
	        this.domManager = domManager;
	        this.app = app;
	    }
	    ////////////////////
	    // wx.IBinding
	    CheckedBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("checked-binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
	        var el = node;
	        var tag = el.tagName.toLowerCase();
	        var isCheckBox = el.type === 'checkbox';
	        var isRadioButton = el.type === 'radio';
	        if (tag !== 'input' || (!isCheckBox && !isRadioButton))
	            Utils_1.throwError("checked-binding only operates on checkboxes and radio-buttons");
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
	                if (!Utils_1.isProperty(model)) {
	                    // initial and final update
	                    updateElement(model);
	                }
	                else {
	                    doCleanup();
	                    cleanup = new Rx.CompositeDisposable();
	                    // update on property change
	                    prop = model;
	                    cleanup.add(prop.changed.subscribe(function (x) {
	                        updateElement(x);
	                    }));
	                    // initial update
	                    updateElement(prop());
	                    // don't attempt to updated computed properties
	                    if (!prop.source) {
	                        // wire change-events depending on browser and version
	                        var events = _this.getCheckedEventObservables(el);
	                        cleanup.add(Rx.Observable.merge(events).subscribe(function (e) {
	                            try {
	                                prop(el.checked);
	                            }
	                            catch (e) {
	                                _this.app.defaultExceptionHandler.onNext(e);
	                            }
	                        }));
	                    }
	                }
	            }
	            catch (e) {
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	            el = null;
	            // nullify locals
	            doCleanup();
	        }));
	    };
	    CheckedBinding.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    CheckedBinding.prototype.getCheckedEventObservables = function (el) {
	        var result = [];
	        result.push(Rx.Observable.fromEvent(el, 'click'));
	        result.push(Rx.Observable.fromEvent(el, 'change'));
	        return result;
	    };
	    return CheckedBinding;
	})();
	exports.default = CheckedBinding;
	//# sourceMappingURL=Checked.js.map

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	var Command_1 = __webpack_require__(20);
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
	    function KeyPressBinding(domManager, app) {
	        this.priority = 0;
	        this.domManager = domManager;
	        this.app = app;
	    }
	    ////////////////////
	    // wx.IBinding
	    KeyPressBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("keyPress-binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
	        var el = node;
	        // create an observable for key combination
	        var tokens = this.domManager.getObjectLiteralTokens(options);
	        var obs = Rx.Observable.fromEvent(el, "keydown")
	            .where(function (x) { return !x.repeat; })
	            .publish()
	            .refCount();
	        tokens.forEach(function (token) {
	            var keyDesc = token.key;
	            var combination, combinations = [];
	            // parse key combinations
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
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	            el = null;
	            // nullify locals
	        }));
	    };
	    KeyPressBinding.prototype.configure = function (options) {
	        // intentionally left blank
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
	        // normalize keycodes
	        if ((!shiftPressed || shiftRequired) && keyCode >= 65 && keyCode <= 90)
	            keyCode = keyCode + 32;
	        var mainKeyPressed = combination.keys[keysByCode[keyCode]] || combination.keys[keyCode.toString()] || combination.keys[String.fromCharCode(keyCode)];
	        return (mainKeyPressed &&
	            (metaRequired === metaPressed) &&
	            (altRequired === altPressed) &&
	            (ctrlRequired === ctrlPressed) &&
	            (shiftRequired === shiftPressed));
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
	            handler = Utils_1.unwrapProperty(handler);
	            if (!Command_1.isCommand(handler)) {
	                state.cleanup.add(obs.where(function (e) { return _this.testCombinations(combinations, e); }).subscribe(function (e) {
	                    try {
	                        handler.apply(ctx.$data, [ctx]);
	                        e.preventDefault();
	                    }
	                    catch (e) {
	                        _this.app.defaultExceptionHandler.onNext(e);
	                    }
	                }));
	            }
	            else {
	                command = handler;
	                state.cleanup.add(obs.where(function (e) { return _this.testCombinations(combinations, e); }).subscribe(function (e) {
	                    try {
	                        command.execute(undefined);
	                        e.preventDefault();
	                    }
	                    catch (e) {
	                        _this.app.defaultExceptionHandler.onNext(e);
	                    }
	                }));
	            }
	        }
	        else if (typeof exp === "object") {
	            command = this.domManager.evaluateExpression(exp.command, ctx);
	            command = Utils_1.unwrapProperty(command);
	            if (exp.hasOwnProperty("parameter"))
	                commandParameter = this.domManager.evaluateExpression(exp.parameter, ctx);
	            state.cleanup.add(obs.where(function (e) { return _this.testCombinations(combinations, e); }).subscribe(function (e) {
	                try {
	                    command.execute(commandParameter);
	                    e.preventDefault();
	                }
	                catch (e) {
	                    _this.app.defaultExceptionHandler.onNext(e);
	                }
	            }));
	        }
	        else {
	            Utils_1.throwError("invalid binding options");
	        }
	    };
	    return KeyPressBinding;
	})();
	exports.default = KeyPressBinding;
	//# sourceMappingURL=KeyPress.js.map

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	var env = __webpack_require__(17);
	"use strict";
	var TextInputBinding = (function () {
	    function TextInputBinding(domManager, app) {
	        this.priority = 0;
	        this.domManager = domManager;
	        this.app = app;
	    }
	    ////////////////////
	    // wx.IBinding
	    TextInputBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("textInput-binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
	        var el = node;
	        var tag = el.tagName.toLowerCase();
	        var isTextArea = tag === "textarea";
	        if (tag !== 'input' && tag !== 'textarea')
	            Utils_1.throwError("textInput-binding can only be applied to input or textarea elements");
	        var exp = this.domManager.compileBindingOptions(options, module);
	        var prop;
	        var propertySubscription;
	        var eventSubscription;
	        var previousElementValue;
	        function updateElement(value) {
	            if (value === null || value === undefined) {
	                value = "";
	            }
	            // Update the element only if the element and model are different. On some browsers, updating the value
	            // will move the cursor to the end of the input, which would be bad while the user is typing.
	            if (el.value !== value) {
	                previousElementValue = value; // Make sure we ignore events (propertychange) that result from updating the value
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
	                if (!Utils_1.isProperty(src)) {
	                    // initial and final update
	                    updateElement(src);
	                }
	                else {
	                    doCleanup();
	                    // update on property change
	                    prop = src;
	                    propertySubscription = prop.changed.subscribe(function (x) {
	                        updateElement(x);
	                    });
	                    // initial update
	                    updateElement(prop());
	                    // don't attempt to updated computed properties
	                    if (!prop.source) {
	                        // wire change-events depending on browser and version
	                        var events = _this.getTextInputEventObservables(el, isTextArea);
	                        eventSubscription = Rx.Observable.merge(events).subscribe(function (e) {
	                            try {
	                                prop(el.value);
	                            }
	                            catch (e) {
	                                _this.app.defaultExceptionHandler.onNext(e);
	                            }
	                        });
	                    }
	                }
	            }
	            catch (e) {
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	            el = null;
	            // nullify locals
	            doCleanup();
	        }));
	    };
	    TextInputBinding.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    TextInputBinding.prototype.getTextInputEventObservables = function (el, isTextArea) {
	        var result = [];
	        if (env.ie && env.ie.version < 10) {
	            if (env.ie.version <= 9) {
	                // wx.Internet Explorer 9 doesn't fire the 'input' event when deleting text, including using
	                // the backspace, delete, or ctrl-x keys, clicking the 'x' to clear the input, dragging text
	                // out of the field, and cutting or deleting text using the context menu. 'selectionchange'
	                // can detect all of those except dragging text out of the field, for which we use 'dragend'.
	                result.push(env.ie.getSelectionChangeObservable(el).where(function (doc) { return doc.activeElement === el; }));
	                result.push(Rx.Observable.fromEvent(el, 'dragend'));
	                // wx.IE 9 does support 'input', but since it doesn't fire it when
	                // using autocomplete, we'll use 'propertychange' for it also.
	                result.push(Rx.Observable.fromEvent(el, 'input'));
	                result.push(Rx.Observable.fromEvent(el, 'propertychange').where(function (e) { return e.propertyName === 'value'; }));
	            }
	        }
	        else {
	            // All other supported browsers support the 'input' event, which fires whenever the content of the element is changed
	            // through the user interface.
	            result.push(Rx.Observable.fromEvent(el, 'input'));
	            if (env.safari && env.safari.version < 5 && isTextArea) {
	                // Safari <5 doesn't fire the 'input' event for <textarea> elements (it does fire 'textInput'
	                // but only when typing). So we'll just catch as much as we can with keydown, cut, and paste.
	                result.push(Rx.Observable.fromEvent(el, 'keydown'));
	                result.push(Rx.Observable.fromEvent(el, 'paste'));
	                result.push(Rx.Observable.fromEvent(el, 'cut'));
	            }
	            else if (env.opera && env.opera.version < 11) {
	                // Opera 10 doesn't always fire the 'input' event for cut, paste, undo & drop operations.
	                // We can try to catch some of those using 'keydown'.
	                result.push(Rx.Observable.fromEvent(el, 'keydown'));
	            }
	            else if (env.firefox && env.firefox.version < 4.0) {
	                // Firefox <= 3.6 doesn't fire the 'input' event when text is filled in through autocomplete
	                result.push(Rx.Observable.fromEvent(el, 'DOMAutoComplete'));
	                // Firefox <=3.5 doesn't fire the 'input' event when text is dropped into the input.
	                result.push(Rx.Observable.fromEvent(el, 'dragdrop')); // <3.5
	                result.push(Rx.Observable.fromEvent(el, 'drop')); // 3.5
	            }
	        }
	        // Bind to the change event so that we can catch programmatic updates of the value that fire this event.
	        result.push(Rx.Observable.fromEvent(el, 'change'));
	        return result;
	    };
	    return TextInputBinding;
	})();
	exports.default = TextInputBinding;
	//# sourceMappingURL=TextInput.js.map

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	var Value_1 = __webpack_require__(33);
	var List_1 = __webpack_require__(29);
	"use strict";
	var impls = new Array();
	var RadioSingleSelectionImpl = (function () {
	    function RadioSingleSelectionImpl(domManager) {
	        this.domManager = domManager;
	    }
	    RadioSingleSelectionImpl.prototype.supports = function (el, model) {
	        return (el.tagName.toLowerCase() === 'input' &&
	            el.getAttribute("type") === 'radio') &&
	            !List_1.isList(model);
	    };
	    RadioSingleSelectionImpl.prototype.observeElement = function (el) {
	        return Rx.Observable.merge(Rx.Observable.fromEvent(el, 'click'), Rx.Observable.fromEvent(el, 'change'));
	    };
	    RadioSingleSelectionImpl.prototype.observeModel = function (model) {
	        if (Utils_1.isProperty(model)) {
	            var prop = model;
	            return prop.changed;
	        }
	        return Rx.Observable.never();
	    };
	    RadioSingleSelectionImpl.prototype.updateElement = function (el, model) {
	        var input = el;
	        input.checked = Value_1.getNodeValue(input, this.domManager) == Utils_1.unwrapProperty(model);
	    };
	    RadioSingleSelectionImpl.prototype.updateModel = function (el, model, e) {
	        var input = el;
	        if (input.checked) {
	            model(Value_1.getNodeValue(input, this.domManager));
	        }
	    };
	    return RadioSingleSelectionImpl;
	})();
	var OptionSingleSelectionImpl = (function () {
	    function OptionSingleSelectionImpl(domManager) {
	        this.domManager = domManager;
	    }
	    OptionSingleSelectionImpl.prototype.supports = function (el, model) {
	        return el.tagName.toLowerCase() === 'select' &&
	            !List_1.isList(model);
	    };
	    OptionSingleSelectionImpl.prototype.observeElement = function (el) {
	        return Rx.Observable.fromEvent(el, 'change');
	    };
	    OptionSingleSelectionImpl.prototype.observeModel = function (model) {
	        if (Utils_1.isProperty(model)) {
	            var prop = model;
	            return prop.changed;
	        }
	        return Rx.Observable.never();
	    };
	    OptionSingleSelectionImpl.prototype.updateElement = function (el, model) {
	        var select = el;
	        var value = Utils_1.unwrapProperty(model);
	        var length = select.options.length;
	        if (value == null) {
	            select.selectedIndex = -1;
	        }
	        else {
	            for (var i = 0; i < length; i++) {
	                var option = select.options[i];
	                if (Value_1.getNodeValue(option, this.domManager) == value) {
	                    select.selectedIndex = i;
	                    break;
	                }
	            }
	        }
	    };
	    OptionSingleSelectionImpl.prototype.updateModel = function (el, model, e) {
	        var select = el;
	        // selected-value comes from the option at selectedIndex
	        var value = select.selectedIndex !== -1 ?
	            Value_1.getNodeValue(select.options[select.selectedIndex], this.domManager) :
	            undefined;
	        model(value);
	    };
	    return OptionSingleSelectionImpl;
	})();
	var SelectedValueBinding = (function () {
	    function SelectedValueBinding(domManager, app) {
	        this.priority = 0;
	        this.domManager = domManager;
	        this.app = app;
	        impls.push(new RadioSingleSelectionImpl(domManager));
	        impls.push(new OptionSingleSelectionImpl(domManager));
	    }
	    ////////////////////
	    // wx.IBinding
	    SelectedValueBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("selectedValue-binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
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
	        // options is supposed to be a field-access path
	        state.cleanup.add(this.domManager.expressionToObservable(exp, ctx).subscribe(function (model) {
	            try {
	                cleanupImpl();
	                // lookup implementation
	                impl = undefined;
	                for (var i = 0; i < impls.length; i++) {
	                    if (impls[i].supports(el, model)) {
	                        impl = impls[i];
	                        break;
	                    }
	                }
	                if (!impl)
	                    Utils_1.throwError("selectedValue-binding does not support this combination of bound element and model!");
	                implCleanup = new Rx.CompositeDisposable();
	                // initial update
	                impl.updateElement(el, model);
	                // update on model change
	                implCleanup.add(impl.observeModel(model).subscribe(function (x) {
	                    try {
	                        impl.updateElement(el, model);
	                    }
	                    catch (e) {
	                        _this.app.defaultExceptionHandler.onNext(e);
	                    }
	                }));
	                // wire change-events
	                if (Utils_1.isProperty(model)) {
	                    implCleanup.add(impl.observeElement(el).subscribe(function (e) {
	                        try {
	                            impl.updateModel(el, model, e);
	                        }
	                        catch (e) {
	                            _this.app.defaultExceptionHandler.onNext(e);
	                        }
	                    }));
	                }
	            }
	            catch (e) {
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	            el = null;
	            // nullify locals
	            cleanupImpl();
	        }));
	    };
	    SelectedValueBinding.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    return SelectedValueBinding;
	})();
	exports.default = SelectedValueBinding;
	//# sourceMappingURL=SelectedValue.js.map

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	"use strict";
	var ComponentBinding = (function () {
	    function ComponentBinding(domManager, app) {
	        this.priority = 30;
	        this.controlsDescendants = true;
	        this.domManager = domManager;
	        this.app = app;
	    }
	    ////////////////////
	    // wx.IBinding
	    ComponentBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("component-binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
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
	            // collect component-name observable
	            componentNameObservable = this.domManager.expressionToObservable(opt.name, ctx);
	            // collect params observables
	            if (opt.params) {
	                if (Utils_1.isFunction(opt.params)) {
	                    // opt params is object passed by value (probably $componentParams from view-binding)
	                    componentParams = this.domManager.evaluateExpression(opt.params, ctx);
	                }
	                else if (typeof opt.params === "object") {
	                    Object.keys(opt.params).forEach(function (x) {
	                        componentParams[x] = _this.domManager.evaluateExpression(opt.params[x], ctx);
	                    });
	                }
	                else {
	                    Utils_1.throwError("invalid component-params");
	                }
	            }
	        }
	        // clear children
	        var oldContents = new Array();
	        while (el.firstChild) {
	            oldContents.push(el.removeChild(el.firstChild));
	        }
	        // subscribe to any input changes
	        state.cleanup.add(componentNameObservable.subscribe(function (componentName) {
	            try {
	                doCleanup();
	                cleanup = new Rx.CompositeDisposable();
	                // lookup component
	                var obs = module.loadComponent(componentName, componentParams);
	                var disp = undefined;
	                if (obs == null)
	                    Utils_1.throwError("component '{0}' is not registered with current module-context", componentName);
	                disp = obs.subscribe(function (component) {
	                    // loader cleanup
	                    if (disp != null) {
	                        disp.dispose();
	                        disp = undefined;
	                    }
	                    // auto-dispose view-model
	                    if (component.viewModel) {
	                        if (Utils_1.isDisposable(component.viewModel)) {
	                            cleanup.add(component.viewModel);
	                        }
	                    }
	                    // done
	                    _this.applyTemplate(component, el, ctx, state, component.template, component.viewModel);
	                });
	                if (disp != null)
	                    cleanup.add(disp);
	            }
	            catch (e) {
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	            oldContents = null;
	            compiled = null;
	            doCleanup();
	        }));
	    };
	    ComponentBinding.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    ComponentBinding.prototype.applyTemplate = function (component, el, ctx, state, template, vm) {
	        // clear
	        while (el.firstChild) {
	            this.domManager.cleanNode(el.firstChild);
	            el.removeChild(el.firstChild);
	        }
	        // clone template and inject
	        for (var i = 0; i < template.length; i++) {
	            var node = template[i].cloneNode(true);
	            el.appendChild(node);
	        }
	        if (vm) {
	            state.model = vm;
	            // refresh context
	            ctx = this.domManager.getDataContext(el);
	        }
	        // invoke preBindingInit 
	        if (vm && component.preBindingInit && vm.hasOwnProperty(component.preBindingInit)) {
	            vm[component.preBindingInit].call(vm, el);
	        }
	        // done
	        this.domManager.applyBindingsToDescendants(ctx, el);
	        // invoke postBindingInit 
	        if (vm && component.postBindingInit && vm.hasOwnProperty(component.postBindingInit)) {
	            vm[component.postBindingInit].call(vm, el);
	        }
	    };
	    return ComponentBinding;
	})();
	exports.default = ComponentBinding;
	//# sourceMappingURL=Component.js.map

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	"use strict";
	var StateActiveBinding = (function () {
	    function StateActiveBinding(domManager, router, app) {
	        this.priority = 5;
	        this.domManager = domManager;
	        this.router = router;
	        this.app = app;
	    }
	    ////////////////////
	    // wx.IBinding
	    StateActiveBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("stateActive-binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
	        var el = node;
	        var compiled = this.domManager.compileBindingOptions(options, module);
	        var exp;
	        var observables = [];
	        var opt = compiled;
	        var paramsKeys = [];
	        var stateName;
	        var stateParams;
	        var cssClass = "active";
	        observables.push(this.router.current.changed.startWith(this.router.current()));
	        if (typeof compiled === "function") {
	            exp = compiled;
	            observables.push(this.domManager.expressionToObservable(exp, ctx));
	        }
	        else {
	            // collect state-name observable
	            observables.push(this.domManager.expressionToObservable(opt.name, ctx));
	            // collect params observables
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
	        // subscribe to any input changes
	        state.cleanup.add(Rx.Observable.combineLatest(observables, function (_) { return Utils_1.args2Array(arguments); }).subscribe(function (latest) {
	            try {
	                // first element is the current state
	                var currentState = latest.shift();
	                // second element is the state-name
	                stateName = Utils_1.unwrapProperty(latest.shift());
	                // subsequent entries are latest param values
	                stateParams = {};
	                for (var i = 0; i < paramsKeys.length; i++) {
	                    stateParams[paramsKeys[i]] = Utils_1.unwrapProperty(latest[i]);
	                }
	                var active = _this.router.includes(stateName, stateParams);
	                var classes = cssClass.split(/\s+/).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
	                if (classes.length) {
	                    Utils_1.toggleCssClass.apply(null, [el, active].concat(classes));
	                }
	            }
	            catch (e) {
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify locals
	            observables = null;
	            compiled = null;
	            stateName = null;
	            stateParams = null;
	            opt = null;
	            paramsKeys = null;
	        }));
	    };
	    StateActiveBinding.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    return StateActiveBinding;
	})();
	exports.default = StateActiveBinding;
	//# sourceMappingURL=StateActive.js.map

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	"use strict";
	var ViewBinding = (function () {
	    function ViewBinding(domManager, router, app) {
	        this.priority = 1000;
	        this.controlsDescendants = true;
	        this.domManager = domManager;
	        this.router = router;
	        this.app = app;
	    }
	    ////////////////////
	    // wx.IBinding
	    ViewBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("view-binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
	        var el = node;
	        var compiled = this.domManager.compileBindingOptions(options, module);
	        var viewName = this.domManager.evaluateExpression(compiled, ctx);
	        var currentConfig;
	        var cleanup;
	        function doCleanup() {
	            if (cleanup) {
	                cleanup.dispose();
	                cleanup = null;
	            }
	        }
	        if (viewName == null || typeof viewName !== "string")
	            Utils_1.throwError("views must be named!");
	        // subscribe to router-state changes
	        state.cleanup.add(this.router.current.changed.startWith(this.router.current()).subscribe(function (newState) {
	            try {
	                doCleanup();
	                cleanup = new Rx.CompositeDisposable();
	                var config = _this.router.getViewComponent(viewName);
	                if (config != null) {
	                    if (!Utils_1.isEqual(currentConfig, config)) {
	                        cleanup.add(_this.applyTemplate(viewName, config.component, currentConfig ? currentConfig.component : undefined, config.params, config.animations, el, ctx, module));
	                        currentConfig = config;
	                    }
	                }
	                else {
	                    cleanup.add(_this.applyTemplate(viewName, null, currentConfig ? currentConfig.component : undefined, null, currentConfig ? currentConfig.animations : {}, el, ctx, module));
	                    currentConfig = {};
	                }
	            }
	            catch (e) {
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify common locals
	        }));
	    };
	    ViewBinding.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    ViewBinding.prototype.applyTemplate = function (viewName, componentName, previousComponentName, componentParams, animations, el, ctx, module) {
	        var _this = this;
	        var self = this;
	        var oldElements = Utils_1.nodeChildrenToArray(el);
	        var combined = [];
	        var obs;
	        function removeOldElements() {
	            oldElements.forEach(function (x) {
	                self.domManager.cleanNode(x);
	                el.removeChild(x);
	            });
	        }
	        function instantiateComponent(animation) {
	            // extend the data-context
	            ctx.$componentParams = componentParams;
	            // create component container element
	            var container = document.createElement("div");
	            var binding = Utils_1.formatString("component: { name: '{0}', params: $componentParams }", componentName);
	            container.setAttribute("data-bind", binding);
	            // prepare container for animation
	            if (animation != null)
	                animation.prepare(container);
	            // now insert it
	            el.appendChild(container);
	            // and apply bindings
	            self.domManager.applyBindings(ctx, container);
	        }
	        // construct leave-observable
	        if (oldElements.length > 0) {
	            var leaveAnimation;
	            if (animations && animations.leave) {
	                if (typeof animations.leave === "string") {
	                    leaveAnimation = module.animation(animations.leave);
	                }
	                else {
	                    leaveAnimation = animations.leave;
	                }
	            }
	            if (leaveAnimation) {
	                leaveAnimation.prepare(oldElements);
	                obs = leaveAnimation.run(oldElements)
	                    .continueWith(function () { return leaveAnimation.complete(oldElements); })
	                    .continueWith(removeOldElements);
	            }
	            else {
	                obs = Rx.Observable.startDeferred(removeOldElements);
	            }
	            combined.push(obs);
	        }
	        // construct enter-observable
	        if (componentName != null) {
	            var enterAnimation;
	            if (animations && animations.enter) {
	                if (typeof animations.enter === "string") {
	                    enterAnimation = module.animation(animations.enter);
	                }
	                else {
	                    enterAnimation = animations.enter;
	                }
	            }
	            obs = Rx.Observable.startDeferred(function () { return instantiateComponent(enterAnimation); });
	            if (enterAnimation) {
	                obs = obs.continueWith(enterAnimation.run(el.childNodes))
	                    .continueWith(function () { return enterAnimation.complete(el.childNodes); });
	            }
	            // notify world
	            obs = obs.continueWith(function () {
	                var transition = {
	                    view: viewName,
	                    fromComponent: previousComponentName,
	                    toComponent: componentName
	                };
	                var ri = _this.router;
	                ri.viewTransitionsSubject.onNext(transition);
	            });
	            combined.push(obs);
	        }
	        // optimize return
	        if (combined.length > 1)
	            obs = Rx.Observable.combineLatest(combined, Utils_1.noop).take(1);
	        else if (combined.length === 1)
	            obs = combined[0].take(1);
	        else
	            obs = null;
	        // no-op return
	        return obs ? (obs.subscribe() || Rx.Disposable.empty) : Rx.Disposable.empty;
	    };
	    return ViewBinding;
	})();
	exports.default = ViewBinding;
	//# sourceMappingURL=View.js.map

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../../node_modules/rx/ts/rx.all.d.ts" />
	/// <reference path="../../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	"use strict";
	var StateRefBinding = (function () {
	    function StateRefBinding(domManager, router, app) {
	        this.priority = 5;
	        this.domManager = domManager;
	        this.router = router;
	        this.app = app;
	    }
	    ////////////////////
	    // wx.IBinding
	    StateRefBinding.prototype.applyBinding = function (node, options, ctx, state, module) {
	        var _this = this;
	        if (node.nodeType !== 1)
	            Utils_1.throwError("stateRef-binding only operates on elements!");
	        if (options == null)
	            Utils_1.throwError("invalid binding-options!");
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
	            // collect state-name observable
	            observables.push(this.domManager.expressionToObservable(opt.name, ctx));
	            // collect params observables
	            if (opt.params) {
	                Object.keys(opt.params).forEach(function (x) {
	                    paramsKeys.push(x);
	                    observables.push(_this.domManager.expressionToObservable(opt.params[x], ctx));
	                });
	            }
	        }
	        // subscribe to any input changes
	        state.cleanup.add(Rx.Observable.combineLatest(observables, function (_) { return Utils_1.args2Array(arguments); }).subscribe(function (latest) {
	            try {
	                // first element is always the state-name
	                stateName = Utils_1.unwrapProperty(latest.shift());
	                // subsequent entries are latest param values
	                stateParams = {};
	                for (var i = 0; i < paramsKeys.length; i++) {
	                    stateParams[paramsKeys[i]] = Utils_1.unwrapProperty(latest[i]);
	                }
	                if (anchor != null) {
	                    anchor.href = _this.router.url(stateName, stateParams);
	                }
	            }
	            catch (e) {
	                _this.app.defaultExceptionHandler.onNext(e);
	            }
	        }));
	        // subscribe to anchor's click event
	        state.cleanup.add(Rx.Observable.fromEvent(el, "click").subscribe(function (e) {
	            e.preventDefault();
	            // initiate state change using latest name and params
	            _this.router.go(stateName, stateParams, { location: true });
	        }));
	        // release closure references to GC 
	        state.cleanup.add(Rx.Disposable.create(function () {
	            // nullify args
	            node = null;
	            options = null;
	            ctx = null;
	            state = null;
	            // nullify locals
	            observables = null;
	            compiled = null;
	            stateName = null;
	            stateParams = null;
	            opt = null;
	            paramsKeys = null;
	        }));
	    };
	    StateRefBinding.prototype.configure = function (options) {
	        // intentionally left blank
	    };
	    return StateRefBinding;
	})();
	exports.default = StateRefBinding;
	//# sourceMappingURL=StateRef.js.map

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
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
	        // check cache
	        if (!params.noCache) {
	            key = (params.name != null ? params.name : "") + "-" +
	                (params.itemText != null ? params.itemText : "") + "-" +
	                (params.itemValue != null ? params.itemValue : "") + "-" +
	                (params.itemClass != null ? params.itemClass : "") + "-" +
	                (params.selectedValue != null ? "true" : "false") + "-" +
	                (params.multiple ? "true" : "false") + "-" +
	                (params.required ? "true" : "false") + "-" +
	                (params.autofocus ? "true" : "false") + "-" +
	                (params.size ? params.size.toString() : "0");
	            nodes = templateCache[key];
	            if (nodes != null) {
	                //console.log("cache hit", key, result);
	                return nodes;
	            }
	        }
	        // base-template
	        result = '<select class="wx-select" data-bind="{0}"><option data-bind="{1}"></option></select>';
	        var bindings = [];
	        var attrs = [];
	        var itemBindings = [];
	        var itemAttrs = [];
	        bindings.push({ key: "foreach", value: "{ data: items, hooks: hooks }" });
	        // selection (two-way)
	        if (params.selectedValue)
	            bindings.push({ key: "selectedValue", value: "@selectedValue" });
	        // name
	        if (params.name) {
	            attrs.push({ key: 'name', value: params.name });
	        }
	        // multi-select
	        if (params.multiple) {
	            attrs.push({ key: 'multiple', value: "true" });
	        }
	        // size
	        if (params.size !== undefined) {
	            attrs.push({ key: 'size', value: params.size.toString() });
	        }
	        // required
	        if (params.required) {
	            attrs.push({ key: 'required', value: "true" });
	        }
	        // required
	        if (params.autofocus) {
	            attrs.push({ key: 'autofocus', value: "true" });
	        }
	        // assemble attr-binding
	        if (attrs.length)
	            bindings.push({ key: "attr", value: "{ " + attrs.map(function (x) { return x.key + ": " + x.value; }).join(", ") + " }" });
	        // value
	        itemBindings.push({ key: "value", value: params.itemValue || "$data" });
	        // label
	        itemBindings.push({ key: 'text', value: params.itemText || "$data" });
	        // per-item css class
	        if (params.itemClass) {
	            itemAttrs.push({ key: 'class', value: "'" + params.itemClass + "'" });
	        }
	        // assemble attr-binding
	        if (itemAttrs.length)
	            itemBindings.push({ key: "attr", value: "{ " + itemAttrs.map(function (x) { return x.key + ": " + x.value; }).join(", ") + " }" });
	        // assemble all bindings
	        var bindingString = bindings.map(function (x) { return x.key + ": " + x.value; }).join(", ");
	        var itemBindingString = itemBindings.map(function (x) { return x.key + ": " + x.value; }).join(", ");
	        // assemble template
	        result = Utils_1.formatString(result, bindingString, itemBindingString);
	        //console.log(result);
	        // store
	        if (!params.noCache) {
	            templateCache[key] = result;
	        }
	        // app.templateEngine can be altered by developer therefore we make sure to parse using HtmlTemplateEngine
	        nodes = this.htmlTemplateEngine.parse(result);
	        return nodes;
	    };
	    return SelectComponent;
	})();
	exports.default = SelectComponent;
	//# sourceMappingURL=Select.js.map

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
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
	            var groupName = opt.groupName != null ?
	                opt.groupName :
	                Utils_1.formatString("wx-radiogroup-{0}", groupId++);
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
	        // check cache
	        if (!params.noCache) {
	            key = (params.itemText != null ? params.itemText : "") + "-" +
	                (params.itemValue != null ? params.itemValue : "") + "-" +
	                (params.itemClass != null ? params.itemClass : "") + "-" +
	                (params.selectedValue != null ? "true" : "false");
	            nodes = templateCache[key];
	            if (nodes != null) {
	                //console.log("cache hit", key, result);
	                return nodes;
	            }
	        }
	        // base-template
	        result = '<div class="wx-radiogroup" data-bind="{0}"><input type="radio" data-bind="{1}"/>{2}</div>';
	        var bindings = [];
	        var attrs = [];
	        var itemBindings = [];
	        var itemAttrs = [];
	        var perItemExtraMarkup = "";
	        bindings.push({ key: "foreach", value: "{ data: items, hooks: hooks }" });
	        // assemble attr-binding
	        if (attrs.length)
	            bindings.push({ key: "attr", value: "{ " + attrs.map(function (x) { return x.key + ": " + x.value; }).join(", ") + " }" });
	        // value
	        itemBindings.push({ key: "value", value: params.itemValue || "$data" });
	        // name
	        itemAttrs.push({ key: 'name', value: "$parent.groupName" });
	        // selection (two-way)
	        if (params.selectedValue) {
	            itemBindings.push({ key: "selectedValue", value: "$parent.@selectedValue" });
	        }
	        // label
	        if (params.itemText) {
	            perItemExtraMarkup += Utils_1.formatString('<label data-bind="text: {0}, attr: { for: {1} }"></label>', params.itemText, "$parent.groupName + '-' + $index");
	            itemAttrs.push({ key: 'id', value: "$parent.groupName + '-' + $index" });
	        }
	        // per-item css class
	        if (params.itemClass) {
	            itemAttrs.push({ key: 'class', value: "'" + params.itemClass + "'" });
	        }
	        // assemble attr-binding
	        if (itemAttrs.length)
	            itemBindings.push({ key: "attr", value: "{ " + itemAttrs.map(function (x) { return x.key + ": " + x.value; }).join(", ") + " }" });
	        // assemble all bindings
	        var bindingString = bindings.map(function (x) { return x.key + ": " + x.value; }).join(", ");
	        var itemBindingString = itemBindings.map(function (x) { return x.key + ": " + x.value; }).join(", ");
	        // assemble template
	        result = Utils_1.formatString(result, bindingString, itemBindingString, perItemExtraMarkup);
	        // store
	        if (!params.noCache) {
	            templateCache[key] = result;
	        }
	        // app.templateEngine can be altered by developer therefore we make sure to parse using HtmlTemplateEngine
	        nodes = this.htmlTemplateEngine.parse(result);
	        return nodes;
	    };
	    return RadioGroupComponent;
	})();
	exports.default = RadioGroupComponent;
	//# sourceMappingURL=RadioGroup.js.map

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	var Property_1 = __webpack_require__(13);
	var RouteMatcher_1 = __webpack_require__(47);
	"use strict";
	var Router = (function () {
	    function Router(domManager, app) {
	        var _this = this;
	        this.current = Property_1.property();
	        //////////////////////////////////
	        // Implementation
	        this.states = {};
	        this.pathSeparator = ".";
	        this.parentPathDirective = "^";
	        this.rootStateName = "$";
	        this.validPathRegExp = /^[a-zA-Z]([\w-_]*$)/;
	        this.viewTransitionsSubject = new Rx.Subject();
	        this.domManager = domManager;
	        this.app = app;
	        this.viewTransitions = this.viewTransitionsSubject.asObservable();
	        this.reset(false);
	        // monitor navigation history
	        app.history.onPopState.subscribe(function (e) {
	            try {
	                // certain versions of WebKit raise an empty popstate event on page-load
	                if (e && e.state) {
	                    var state = e.state;
	                    var stateName = state.stateName;
	                    if (stateName != null) {
	                        // enter state using extracted params
	                        _this.go(stateName, state.params, { location: false });
	                        // update title
	                        app.title(state.title);
	                    }
	                }
	            }
	            catch (e) {
	                app.defaultExceptionHandler.onNext(e);
	            }
	        });
	        // monitor title changes
	        app.title.changed.subscribe(function (x) {
	            document.title = x;
	            if (_this.current() != null)
	                _this.replaceHistoryState(_this.current(), x);
	        });
	    }
	    //////////////////////////////////
	    // IRouter
	    Router.prototype.state = function (config) {
	        this.registerStateInternal(config);
	        return this;
	    };
	    Router.prototype.updateCurrentStateParams = function (withParamsAction) {
	        var _current = this.current();
	        withParamsAction(_current.params);
	        this.replaceHistoryState(_current, this.app.title());
	    };
	    Router.prototype.go = function (to, params, options) {
	        to = this.mapPath(to);
	        if (this.states[to] == null)
	            Utils_1.throwError("state '{0}' is not registered", to);
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
	            paramsKeys = paramsKeys.length <= currentParamsKeys.length ?
	                paramsKeys : currentParamsKeys;
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
	        // Implicit root state that is always present
	        this.root = this.registerStateInternal({
	            name: this.rootStateName,
	            url: RouteMatcher_1.route("/")
	        });
	        if (enterRootState)
	            this.go(this.rootStateName, {}, { location: 2 /* replace */ });
	    };
	    Router.prototype.sync = function (url) {
	        if (url == null)
	            url = this.app.history.location.pathname; // + app.history.location.search;
	        // iterate over registered states to find matching uri
	        var keys = Object.keys(this.states);
	        var length = keys.length;
	        var params;
	        for (var i = 0; i < length; i++) {
	            var state = this.states[keys[i]];
	            var route_1 = this.getAbsoluteRouteForState(state.name);
	            if ((params = route_1.parse(url)) != null) {
	                this.go(state.name, params, { location: 2 /* replace */ });
	                return;
	            }
	        }
	        // not found, enter root state as fallback
	        if (this.current() == null)
	            this.reload();
	    };
	    Router.prototype.reload = function () {
	        var state;
	        var params;
	        // reload current state or enter inital root state            
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
	                // ensure that only parameters configured at state level surface at view-level
	                var parameterNames = this.getViewParameterNamesFromStateConfig(viewName, result.component);
	                parameterNames.forEach(function (x) {
	                    if (_current.params.hasOwnProperty(x)) {
	                        stateParams[x] = _current.params[x];
	                    }
	                });
	                // merge state params into component params
	                result.params = Utils_1.extend(stateParams, result.params);
	            }
	        }
	        return result;
	    };
	    Router.prototype.registerStateInternal = function (state) {
	        var _this = this;
	        var parts = state.name.split(this.pathSeparator);
	        if (state.name !== this.rootStateName) {
	            // validate name
	            if (parts.forEach(function (path) {
	                if (!_this.validPathRegExp.test(path)) {
	                    Utils_1.throwError("invalid state-path '{0}' (a state-path must start with a character, optionally followed by one or more alphanumeric characters, dashes or underscores)");
	                }
	            }))
	                ;
	        }
	        // wrap and store
	        state = Utils_1.extend(state, {});
	        this.states[state.name] = state;
	        if (state.url != null) {
	            // create route from string
	            if (typeof state.url === "string") {
	                state.url = RouteMatcher_1.route(state.url);
	            }
	        }
	        else {
	            // derive relative route from name
	            if (state.name !== this.rootStateName)
	                state.url = RouteMatcher_1.route(parts[parts.length - 1]);
	            else
	                state.url = RouteMatcher_1.route("/");
	        }
	        // detect root-state override
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
	        this.app.history.pushState(hs, "", state.url);
	    };
	    Router.prototype.replaceHistoryState = function (state, title) {
	        var hs = {
	            stateName: state.name,
	            params: state.params,
	            title: title != null ? title : document.title
	        };
	        this.app.history.replaceState(hs, "", state.url);
	    };
	    Router.prototype.mapPath = function (path) {
	        // child-relative
	        if (path.indexOf(this.pathSeparator) === 0) {
	            return this.current().name + path;
	        }
	        else if (path.indexOf(this.parentPathDirective) === 0) {
	            // parent-relative                
	            var parent_1 = this.current().name;
	            // can't go further up than root
	            if (parent_1 === this.rootStateName)
	                return parent_1;
	            // test parents and siblings until one is found that is registered
	            var parts = parent_1.split(this.pathSeparator);
	            for (var i = parts.length - 1; i > 0; i--) {
	                var tmp = parts.slice(0, i).join(this.pathSeparator);
	                // check if parent or sibling relative to current parent exists 
	                if (this.get(tmp) || this.get(tmp + path.substr(1))) {
	                    path = tmp + path.substr(1);
	                    return path;
	                }
	            }
	            // make it root relative
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
	            // if not registered, introduce fake state to keep hierarchy intact
	            if (state == null) {
	                state = {
	                    name: stateName,
	                    url: RouteMatcher_1.route(stateName)
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
	            // concat urls
	            if (result != null) {
	                var route_2 = state.url;
	                // individual states may use absolute urls as well
	                if (!route_2.isAbsolute)
	                    result = result.concat(state.url);
	                else
	                    result = route_2;
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
	            // merge views
	            if (state.views != null) {
	                Utils_1.extend(state.views, stateViews);
	            }
	            // merge params
	            if (state.params != null) {
	                Utils_1.extend(state.params, stateParams);
	            }
	        });
	        // merge param overrides
	        if (params) {
	            Utils_1.extend(params, stateParams);
	        }
	        // construct resulting state
	        var route = this.getAbsoluteRouteForState(to, hierarchy);
	        var state = Utils_1.extend(this.states[to], {});
	        state.url = route.stringify(params);
	        state.views = stateViews;
	        state.params = stateParams;
	        // perform deep equal against current state
	        var _current = this.current();
	        if ((options && options.force) || _current == null ||
	            _current.name !== to ||
	            !Utils_1.isEqual(_current.params, state.params)) {
	            // reset views used by previous state that are unused by new state
	            if (_current != null && _current.views != null && state.views != null) {
	                Object.keys(_current.views).forEach(function (x) {
	                    if (!state.views.hasOwnProperty(x)) {
	                        state.views[x] = null;
	                    }
	                });
	            }
	            // update history
	            if (options && options.location) {
	                if (options.location === 2 /* replace */)
	                    this.replaceHistoryState(state, this.app.title());
	                else
	                    this.pushHistoryState(state, this.app.title());
	            }
	            if (_current != null) {
	                if (_current.onLeave)
	                    _current.onLeave(this.get(_current.name), _current.params);
	            }
	            // activate
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
	        // walk the hierarchy backward to figure out when the component was introduced at the specified view-slot
	        for (var i = hierarchy.length; i--; i >= 0) {
	            config = hierarchy[i];
	            if (config.views && config.views[view]) {
	                var other = config.views[view];
	                if (typeof other === "object") {
	                    other = other.component;
	                }
	                if (other === component) {
	                    index = i; // found but keep looking
	                }
	            }
	        }
	        if (index !== -1) {
	            config = hierarchy[index];
	            // truncate hierarchy and merge params
	            hierarchy = hierarchy.slice(0, index + 1);
	            hierarchy.forEach(function (state) {
	                // merge params
	                if (state.params != null) {
	                    Utils_1.extend(state.params, stateParams);
	                }
	            });
	            // extract resulting property names
	            result = Object.keys(stateParams);
	            // append any route-params
	            result = result.concat(config.url.params);
	        }
	        return result;
	    };
	    return Router;
	})();
	exports.Router = Router;
	//# sourceMappingURL=Router.js.map

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	/*
	 * JavaScript Route Matcher
	 * http://benalman.com/
	 *
	 * Copyright (c) 2011 "Cowboy" Ben Alman
	 * Dual licensed under the MIT and GPL licenses.
	 * http://benalman.com/about/license/
	 */
	"use strict";
	// Characters to be escaped with \. RegExp borrowed from the Backbone router
	// but escaped (note: unnecessarily) to keep JSHint from complaining.
	var reEscape = /[\-\[\]{}()+?.,\\\^$|#\s]/g;
	// Match named :param or *splat placeholders.
	var reParam = /([:*])(\w+)/g;
	var RouteMatcher = (function () {
	    // Pass in a route string (or RegExp) plus an optional map of rules, and get
	    // back an object with .parse and .stringify methods.
	    function RouteMatcher(route, rules) {
	        var _this = this;
	        // store
	        this.route = route;
	        this.rules = rules;
	        // Object to be returned. The public API.
	        // Matched param or splat names, in order
	        this.params = [];
	        // Route matching RegExp.
	        var re = route;
	        // Build route RegExp from passed string.
	        if (typeof route === "string") {
	            // Escape special chars.
	            re = re.replace(reEscape, "\\$&");
	            // Replace any :param or *splat with the appropriate capture group.
	            re = re.replace(reParam, function (_, mode, name) {
	                _this.params.push(name);
	                // :param should capture until the next / or EOL, while *splat should
	                // capture until the next :param, *splat, or EOL.
	                return mode === ":" ? "([^/]*)" : "(.*)";
	            });
	            // Add ^/$ anchors and create the actual RegExp.
	            re = new RegExp("^" + re + "$");
	            // Match the passed url against the route, returning an object of params
	            // and values.
	            this.parse = function (url) {
	                var i = 0;
	                var param, value;
	                var params = {};
	                var matches = url.match(re);
	                // If no matches, return null.
	                if (!matches) {
	                    return null;
	                }
	                // Add all matched :param / *splat values into the params object.
	                while (i < _this.params.length) {
	                    param = _this.params[i++];
	                    value = matches[i];
	                    // If a rule exists for this param and it doesn't validate, return null.
	                    if (rules && param in rules && !_this.validateRule(rules[param], value)) {
	                        return null;
	                    }
	                    params[param] = value;
	                }
	                return params;
	            };
	            // Build path by inserting the given params into the route.
	            this.stringify = function (params) {
	                params = params || {};
	                var param, re;
	                var result = route;
	                // Insert each passed param into the route string. Note that this loop
	                // doesn't check .hasOwnProperty because this script doesn't support
	                // modifications to Object.prototype.
	                for (param in params) {
	                    re = new RegExp("[:*]" + param + "\\b");
	                    result = result.replace(re, params[param]);
	                }
	                // Missing params should be replaced with empty string.
	                return result.replace(reParam, "");
	            };
	        }
	        else {
	            // RegExp route was passed. This is super-simple.
	            this.parse = function (url) {
	                var matches = url.match(re);
	                return matches && { captures: matches.slice(1) };
	            };
	            // There's no meaningful way to stringify based on a RegExp route, so
	            // return empty string.
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
	        // check for conflicting rules
	        if (other.rules) {
	            if (this.rules) {
	                Object.keys(this.rules).forEach(function (rule) {
	                    if (other.rules.hasOwnProperty(rule)) {
	                        Utils_1.throwError("route '{0}' and '{1}' have conflicting rule '{2}", a, b, rule);
	                    }
	                });
	                rules = Utils_1.extend(this.rules, Utils_1.extend(other.rules, {}));
	            }
	            else {
	                rules = Utils_1.extend(other.rules, {});
	            }
	        }
	        else if (this.rules) {
	            rules = Utils_1.extend(this.rules, {});
	        }
	        if (a === "/")
	            a = "";
	        return new RouteMatcher(a + "/" + b, rules);
	    };
	    // Test to see if a value matches the corresponding rule.
	    RouteMatcher.prototype.validateRule = function (rule, value) {
	        // For a given rule, get the first letter of the string name of its
	        // constructor function. "R" -> RegExp, "F" -> Function (these shouldn't
	        // conflict with any other types one might specify). Note: instead of
	        // getting .toString from a new object {} or Object.prototype, I'm assuming
	        // that exports will always be an object, and using its .toString method.
	        // Bad idea? Let me know by filing an issue
	        var type = this.toString.call(rule).charAt(8);
	        // If regexp, match. If function, invoke. Otherwise, compare. Note that ==
	        // is used because type coercion is needed, as `value` will always be a
	        // string, but `rule` might not.
	        return type === "R" ? rule.test(value) : type === "F" ? rule(value) : rule == value;
	    };
	    return RouteMatcher;
	})();
	exports.RouteMatcher = RouteMatcher;
	function route(route, rules) {
	    return new RouteMatcher(route, rules);
	}
	exports.route = route;
	//# sourceMappingURL=RouteMatcher.js.map

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	var ScheduledSubject_1 = __webpack_require__(31);
	// ReactiveUI's MessageBus
	"use strict";
	var MessageBus = (function () {
	    function MessageBus() {
	        //////////////////////////////////
	        // Implementation
	        this.messageBus = {};
	        this.schedulerMappings = {};
	    }
	    //////////////////////////////////
	    // IMessageBus
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
	            ret = ScheduledSubject_1.createScheduledSubject(this.getScheduler(contract), null, new Rx.BehaviorSubject(undefined));
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
	exports.default = MessageBus;
	//# sourceMappingURL=MessageBus.js.map

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	exports.version = '0.9.87';
	//# sourceMappingURL=Version.js.map

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="./Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	var IID_1 = __webpack_require__(10);
	var ScheduledSubject_1 = __webpack_require__(31);
	var Reflect_1 = __webpack_require__(4);
	var Injector_1 = __webpack_require__(2);
	var res = __webpack_require__(11);
	"use strict";
	var RxObsConstructor = Rx.Observable; // this hack is neccessary because the .d.ts for RxJs declares Observable as an interface)
	/**
	* Creates an read-only observable property with an optional default value from the current (this) observable
	* (Note: This is the equivalent to Knockout's ko.computed)
	* @param {T} initialValue? Optional initial value, valid until the observable produces a value
	*/
	function toProperty(initialValue, scheduler) {
	    scheduler = scheduler || Rx.Scheduler.currentThread;
	    // initialize accessor function (read-only)
	    var accessor = function propertyAccessor(newVal) {
	        if (arguments.length > 0) {
	            Utils_1.throwError("attempt to write to a read-only observable property");
	        }
	        if (accessor.sub == null) {
	            accessor.sub = accessor._source.connect();
	        }
	        return accessor.value;
	    };
	    Reflect_1.Implements(IID_1.default.IObservableProperty)(accessor);
	    Reflect_1.Implements(IID_1.default.IDisposable)(accessor);
	    //////////////////////////////////
	    // IDisposable implementation
	    accessor.dispose = function () {
	        if (accessor.sub) {
	            accessor.sub.dispose();
	            accessor.sub = null;
	        }
	    };
	    //////////////////////////////////
	    // IObservableProperty<T> implementation
	    accessor.value = initialValue;
	    // setup observables
	    accessor.changedSubject = new Rx.Subject();
	    accessor.changed = accessor.changedSubject
	        .publish()
	        .refCount();
	    accessor.changingSubject = new Rx.Subject();
	    accessor.changing = accessor.changingSubject
	        .publish()
	        .refCount();
	    accessor.source = this;
	    accessor.thrownExceptions = ScheduledSubject_1.createScheduledSubject(scheduler, Injector_1.injector.get(res.app).defaultExceptionHandler);
	    //////////////////////////////////
	    // implementation
	    var firedInitial = false;
	    accessor.sub = this
	        .distinctUntilChanged()
	        .subscribe(function (x) {
	        // Suppress a non-change between initialValue and the first value
	        // from a Subscribe
	        if (firedInitial && x === accessor.value) {
	            return;
	        }
	        firedInitial = true;
	        accessor.changingSubject.onNext(x);
	        accessor.value = x;
	        accessor.changedSubject.onNext(x);
	    }, function (x) { return accessor.thrownExceptions.onNext(x); });
	    return accessor;
	}
	RxObsConstructor.prototype.toProperty = toProperty;
	RxObsConstructor.prototype.continueWith = function () {
	    var args = Utils_1.args2Array(arguments);
	    var val = args.shift();
	    var obs = undefined;
	    if (Utils_1.isRxObservable(val)) {
	        obs = val;
	    }
	    else if (Utils_1.isFunction(val)) {
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
	function install() {
	    // deliberately left blank    
	}
	exports.install = install;
	//# sourceMappingURL=RxExtensions.js.map

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../Interfaces.ts" />
	var Utils_1 = __webpack_require__(3);
	"use strict";
	function toElementList(element) {
	    var nodes;
	    if (element instanceof Node || element instanceof HTMLElement)
	        nodes = [element];
	    else if (Array.isArray(element))
	        nodes = element;
	    else if (element instanceof NodeList)
	        nodes = Utils_1.nodeListToArray(element);
	    else
	        Utils_1.throwError("invalid argument: element");
	    var elements = nodes.filter(function (x) { return x.nodeType === 1; });
	    return elements;
	}
	function parseTimingValue(x) {
	    // it's always safe to consider only second values and omit `ms` values since
	    // getComputedStyle will always handle the conversion for us
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
	        result.prepare = Utils_1.noop;
	    }
	    result.run = function (nodes, params) {
	        return Rx.Observable.defer(function () {
	            var elements = toElementList(nodes);
	            if (elements.length === 0)
	                return Rx.Observable.return(undefined);
	            return Rx.Observable.combineLatest(elements.map(function (x) { return run(x, params); }), Utils_1.noop);
	        });
	    };
	    if (complete) {
	        result.complete = function (nodes, params) {
	            var elements = toElementList(nodes);
	            elements.forEach(function (x) { return complete(x, params); });
	        };
	    }
	    else {
	        result.complete = Utils_1.noop;
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
	            // convert into wx.IAnimationCssClassInstruction
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
	                elements.forEach(function (x) { return Utils_1.toggleCssClass.apply(null, [x, true].concat(prepToAdd)); });
	            if (prepToRemove && prepToRemove.length)
	                elements.forEach(function (x) { return Utils_1.toggleCssClass.apply(null, [x, false].concat(prepToRemove)); });
	        };
	    }
	    var runIns;
	    if (typeof run === "string") {
	        run = run.split(/\s+/).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
	    }
	    if (typeof run[0] === "string") {
	        // convert into wx.IAnimationCssClassInstruction
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
	            }), Utils_1.noop);
	            // defer animation-start to avoid problems with transitions on freshly added elements 
	            Rx.Observable.timer(1).subscribe(function () {
	                if (runToAdd && runToAdd.length)
	                    elements.forEach(function (x) { return Utils_1.toggleCssClass.apply(null, [x, true].concat(runToAdd)); });
	                if (runToRemove && runToRemove.length)
	                    elements.forEach(function (x) { return Utils_1.toggleCssClass.apply(null, [x, false].concat(runToRemove)); });
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
	            // convert into wx.IAnimationCssClassInstruction
	            completeIns = complete.map(function (x) { return { css: x, add: true }; });
	        }
	        else {
	            completeIns = complete;
	        }
	        completeToAdd = completeIns.filter(function (x) { return x.add; }).map(function (x) { return x.css; });
	        completeToRemove = completeIns.filter(function (x) { return !x.add || x.remove; }).map(function (x) { return x.css; });
	    }
	    else {
	        // default to remove classes added during prepare & run stages
	        completeToRemove = [];
	        if (prepToAdd && prepToAdd.length)
	            completeToRemove = completeToRemove.concat(prepToAdd);
	        if (runToAdd && runToAdd.length)
	            completeToRemove = completeToRemove.concat(runToAdd);
	    }
	    result.complete = function (nodes, params) {
	        var elements = toElementList(nodes);
	        if (completeToAdd && completeToAdd.length)
	            elements.forEach(function (x) { return Utils_1.toggleCssClass.apply(null, [x, true].concat(completeToAdd)); });
	        if (completeToRemove && completeToRemove.length)
	            elements.forEach(function (x) { return Utils_1.toggleCssClass.apply(null, [x, false].concat(completeToRemove)); });
	    };
	    return result;
	}
	function animation() {
	    var args = Utils_1.args2Array(arguments);
	    var val = args.shift();
	    if (typeof val === "function") {
	        return scriptedAnimation(val, args.shift(), args.shift());
	    }
	    return cssTransitionAnimation(val, args.shift(), args.shift());
	}
	exports.animation = animation;
	//# sourceMappingURL=Animation.js.map

/***/ }
/******/ ])
});
;
//# sourceMappingURL=web.rx.js.map
