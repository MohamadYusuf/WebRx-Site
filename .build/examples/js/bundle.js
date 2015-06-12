/* Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.*/
(function(a){function b(a){for(var b=[],c=0,d=a.length;d>c;c++)b.push(a[c]);return b}function c(a,b){if(Na&&b.stack&&"object"==typeof a&&null!==a&&a.stack&&-1===a.stack.indexOf(Ra)){for(var c=[],e=b;e;e=e.source)e.stack&&c.unshift(e.stack);c.unshift(a.stack);var f=c.join("\n"+Ra+"\n");a.stack=d(f)}}function d(a){for(var b=a.split("\n"),c=[],d=0,g=b.length;g>d;d++){var h=b[d];e(h)||f(h)||!h||c.push(h)}return c.join("\n")}function e(a){var b=h(a);if(!b)return!1;var c=b[0],d=b[1];return c===Pa&&d>=Qa&&Cd>=d}function f(a){return-1!==a.indexOf("(module.js:")||-1!==a.indexOf("(node.js:")}function g(){if(Na)try{throw new Error}catch(a){var b=a.stack.split("\n"),c=b[0].indexOf("@")>0?b[1]:b[2],d=h(c);if(!d)return;return Pa=d[0],d[1]}}function h(a){var b=/at .+ \((.+):(\d+):(?:\d+)\)$/.exec(a);if(b)return[b[1],Number(b[2])];var c=/at ([^ ]+):(\d+):(?:\d+)$/.exec(a);if(c)return[c[1],Number(c[2])];var d=/.*@(.+):(\d+)$/.exec(a);return d?[d[1],Number(d[2])]:void 0}function i(a){var b=[];if(!yb(a))return b;xb.nonEnumArgs&&a.length&&zb(a)&&(a=Cb.call(a));var c=xb.enumPrototypes&&"function"==typeof a,d=xb.enumErrorProps&&(a===sb||a instanceof Error);for(var e in a)c&&"prototype"==e||d&&("message"==e||"name"==e)||b.push(e);if(xb.nonEnumShadows&&a!==tb){var f=a.constructor,g=-1,h=eb;if(a===(f&&f.prototype))var i=a===ub?ob:a===sb?jb:pb.call(a),j=wb[i];for(;++g<h;)e=db[g],j&&j[e]||!qb.call(a,e)||b.push(e)}return b}function j(a,b,c){for(var d=-1,e=c(a),f=e.length;++d<f;){var g=e[d];if(b(a[g],g,a)===!1)break}return a}function k(a,b){return j(a,b,i)}function l(a){return"function"!=typeof a.toString&&"string"==typeof(a+"")}function m(a,b,c,d){if(a===b)return 0!==a||1/a==1/b;var e=typeof a,f=typeof b;if(a===a&&(null==a||null==b||"function"!=e&&"object"!=e&&"function"!=f&&"object"!=f))return!1;var g=pb.call(a),h=pb.call(b);if(g==fb&&(g=mb),h==fb&&(h=mb),g!=h)return!1;switch(g){case hb:case ib:return+a==+b;case lb:return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case nb:case ob:return a==String(b)}var i=g==gb;if(!i){if(g!=mb||!xb.nodeClass&&(l(a)||l(b)))return!1;var j=!xb.argsObject&&zb(a)?Object:a.constructor,n=!xb.argsObject&&zb(b)?Object:b.constructor;if(!(j==n||qb.call(a,"constructor")&&qb.call(b,"constructor")||Ma(j)&&j instanceof j&&Ma(n)&&n instanceof n||!("constructor"in a&&"constructor"in b)))return!1}c||(c=[]),d||(d=[]);for(var o=c.length;o--;)if(c[o]==a)return d[o]==b;var p=0,q=!0;if(c.push(a),d.push(b),i){if(o=a.length,p=b.length,q=p==o)for(;p--;){var r=b[p];if(!(q=m(a[p],r,c,d)))break}}else k(b,function(b,e,f){return qb.call(f,e)?(p++,q=qb.call(a,e)&&m(a[e],b,c,d)):void 0}),q&&k(a,function(a,b,c){return qb.call(c,b)?q=--p>-1:void 0});return c.pop(),d.pop(),q}function n(a,b){for(var c=new Array(a),d=0;a>d;d++)c[d]=b();return c}function o(){try{return Ab.apply(this,arguments)}catch(a){return Gb.e=a,Gb}}function p(a){if(!Ma(a))throw new TypeError("fn must be a function");return Ab=a,o}function q(a){throw a}function r(a,b){this.id=a,this.value=b}function t(a,b){this.scheduler=a,this.disposable=b,this.isDisposed=!1}function u(a,b){b.isDisposed||(b.isDisposed=!0,b.disposable.dispose())}function v(a){this.observer=a,this.a=[],this.isStopped=!1}function w(){this._s=s}function x(){this._s=s,this._l=s.length,this._i=0}function y(a){this._a=a}function z(a){this._a=a,this._l=D(a),this._i=0}function A(a){return"number"==typeof a&&ya.isFinite(a)}function B(b){var c,d=b[Za];if(!d&&"string"==typeof b)return c=new w(b),c[Za]();if(!d&&b.length!==a)return c=new y(b),c[Za]();if(!d)throw new TypeError("Object is not iterable");return b[Za]()}function C(a){var b=+a;return 0===b?b:isNaN(b)?b:0>b?-1:1}function D(a){var b=+a.length;return isNaN(b)?0:0!==b&&A(b)?(b=C(b)*Math.floor(Math.abs(b)),0>=b?0:b>Ec?Ec:b):b}function E(a,b){this.observer=a,this.parent=b}function F(a,b){return Wb(a)||(a=_b),new Gc(b,a)}function G(a,b){this.observer=a,this.parent=b}function H(a,b){this.observer=a,this.parent=b}function I(a,b){return new wd(function(c){var d=new Qb,e=new Rb;return e.setDisposable(d),d.setDisposable(a.subscribe(function(a){c.onNext(a)},function(a){try{var d=b(a)}catch(f){return c.onError(f)}Ka(d)&&(d=xc(d));var g=new Qb;e.setDisposable(g),g.setDisposable(d.subscribe(c))},function(a){c.onCompleted(a)})),e},a)}function J(a,b){var c=this;return new wd(function(d){var e=0,f=a.length;return c.subscribe(function(c){if(f>e){var g,h=a[e++];try{g=b(c,h)}catch(i){return d.onError(i)}d.onNext(g)}else d.onCompleted()},function(a){d.onError(a)},function(){d.onCompleted()})},c)}function K(){return!1}function L(){return[]}function M(a,b,c){var d=cb(b,c,3);return a.map(function(b,c){var e=d(b,c,a);return Ka(e)&&(e=xc(e)),(ab(e)||_a(e))&&(e=Fc(e)),e}).concatAll()}function N(a,b,c){for(var d=0,e=a.length;e>d;d++)if(c(a[d],b))return d;return-1}function O(a){this.comparer=a,this.set=[]}function P(a,b,c){this.observer=a,this.selector=b,this.source=c,this.i=0,this.isStopped=!1}function Q(a,b,c){var d=cb(b,c,3);return a.map(function(b,c){var e=d(b,c,a);return Ka(e)&&(e=xc(e)),(ab(e)||_a(e))&&(e=Fc(e)),e}).mergeAll()}function R(a,b,c){this.observer=a,this.predicate=b,this.source=c,this.i=0,this.isStopped=!1}function S(a,b,c){return new wd(function(d){var e=!1,f=null,g=[];return a.subscribe(function(a){var h,i;try{i=b(a)}catch(j){return void d.onError(j)}if(h=0,e)try{h=c(i,f)}catch(k){return void d.onError(k)}else e=!0,f=i;h>0&&(f=i,g=[]),h>=0&&g.push(a)},function(a){d.onError(a)},function(){d.onNext(g),d.onCompleted()})},a)}function T(a){if(0===a.length)throw new Sa;return a[0]}function U(a,b,c,d){if(0>b)throw new Ua;return new wd(function(e){var f=b;return a.subscribe(function(a){0===f--&&(e.onNext(a),e.onCompleted())},function(a){e.onError(a)},function(){c?(e.onNext(d),e.onCompleted()):e.onError(new Ua)})},a)}function V(a,b,c){return new wd(function(d){var e=c,f=!1;return a.subscribe(function(a){f?d.onError(new Error("Sequence contains more than one element")):(e=a,f=!0)},function(a){d.onError(a)},function(){f||b?(d.onNext(e),d.onCompleted()):d.onError(new Sa)})},a)}function W(a,b,c){return new wd(function(d){return a.subscribe(function(a){d.onNext(a),d.onCompleted()},function(a){d.onError(a)},function(){b?(d.onNext(c),d.onCompleted()):d.onError(new Sa)})},a)}function X(a,b,c){return new wd(function(d){var e=c,f=!1;return a.subscribe(function(a){e=a,f=!0},function(a){d.onError(a)},function(){f||b?(d.onNext(e),d.onCompleted()):d.onError(new Sa)})},a)}function Y(b,c,d,e){var f=cb(c,d,3);return new wd(function(c){var d=0;return b.subscribe(function(a){var g;try{g=f(a,d,b)}catch(h){return void c.onError(h)}g?(c.onNext(e?d:a),c.onCompleted()):d++},function(a){c.onError(a)},function(){c.onNext(e?-1:a),c.onCompleted()})},b)}function Z(a,b){return Array.isArray(a)?$.call(b,a):ca(a)?dd(a.call(b)):da(a)?dd(a):ba(a)?_(a):Ka(a)?aa(a):typeof a===bd?a:yb(a)||Array.isArray(a)?$.call(b,a):a}function $(a){var b=this;return function(c){function d(a,d){if(!e)try{if(a=Z(a,b),typeof a!==bd)return h[d]=a,--g||c(null,h);a.call(b,function(a,b){if(!e){if(a)return e=!0,c(a);h[d]=b,--g||c(null,h)}})}catch(f){e=!0,c(f)}}var e,f=Object.keys(a),g=f.length,h=new a.constructor;if(!g)return void dc.schedule(function(){c(null,h)});for(var i=0,j=f.length;j>i;i++)d(a[f[i]],f[i])}}function _(a){return function(b){var c,d=!1;a.subscribe(function(a){c=a,d=!0},b,function(){d&&b(null,c)})}}function aa(a){return function(b){a.then(function(a){b(null,a)},b)}}function ba(a){return a&&typeof a.subscribe===bd}function ca(a){return a&&a.constructor&&"GeneratorFunction"===a.constructor.name}function da(a){return a&&typeof a.next===bd&&typeof a[cd]===bd}function ea(a){a&&dc.schedule(function(){throw a})}function fa(a,b,c){if(a.addEventListener)return a.addEventListener(b,c,!1),Mb(function(){a.removeEventListener(b,c,!1)});throw new Error("No listener found")}function ga(a,b,c){var d=new Jb;if("[object NodeList]"===Object.prototype.toString.call(a))for(var e=0,f=a.length;f>e;e++)d.add(ga(a.item(e),b,c));else a&&d.add(fa(a,b,c));return d}function ha(a,b,c){return new wd(function(d){function e(a,b){j[b]=a;var e;if(g[b]=!0,h||(h=g.every(Fa))){if(f)return void d.onError(f);try{e=c.apply(null,j)}catch(k){return void d.onError(k)}d.onNext(e)}i&&j[1]&&d.onCompleted()}var f,g=[!1,!1],h=!1,i=!1,j=new Array(2);return new Jb(a.subscribe(function(a){e(a,0)},function(a){j[1]?d.onError(a):f=a},function(){i=!0,j[1]&&d.onCompleted()}),b.subscribe(function(a){e(a,1)},function(a){d.onError(a)},function(){i=!0,e(!0,1)}))},a)}function ia(a,b){return a.groupJoin(this,b,Bc,function(a,b){return b})}function ja(a){var b=this;return new wd(function(c){var d=new zd,e=new Jb,f=new Sb(e);return c.onNext(Fb(d,f)),e.add(b.subscribe(function(a){d.onNext(a)},function(a){d.onError(a),c.onError(a)},function(){d.onCompleted(),c.onCompleted()})),Ka(a)&&(a=xc(a)),e.add(a.subscribe(function(){d.onCompleted(),d=new zd,c.onNext(Fb(d,f))},function(a){d.onError(a),c.onError(a)},function(){d.onCompleted(),c.onCompleted()})),f},b)}function ka(a){var b=this;return new wd(function(c){function d(){var b;try{b=a()}catch(f){return void c.onError(f)}Ka(b)&&(b=xc(b));var i=new Qb;e.setDisposable(i),i.setDisposable(b.take(1).subscribe(Ea,function(a){h.onError(a),c.onError(a)},function(){h.onCompleted(),h=new zd,c.onNext(Fb(h,g)),d()}))}var e=new Rb,f=new Jb(e),g=new Sb(f),h=new zd;return c.onNext(Fb(h,g)),f.add(b.subscribe(function(a){h.onNext(a)},function(a){h.onError(a),c.onError(a)},function(){h.onCompleted(),c.onCompleted()})),d(),g},b)}function la(b,c){return new kc(function(){return new jc(function(){return b()?{done:!1,value:c}:{done:!0,value:a}})})}function ma(a){this.patterns=a}function na(a,b){this.expression=a,this.selector=b}function oa(a,b,c){var d=a.get(b);if(!d){var e=new ud(b,c);return a.set(b,e),e}return d}function pa(a,b,c){this.joinObserverArray=a,this.onNext=b,this.onCompleted=c,this.joinObservers=new td;for(var d=0,e=this.joinObserverArray.length;e>d;d++){var f=this.joinObserverArray[d];this.joinObservers.set(f,f)}}function qa(a,b){return new wd(function(c){return b.scheduleWithAbsolute(a,function(){c.onNext(0),c.onCompleted()})})}function ra(a,b,c){return new wd(function(d){var e=a,f=Vb(b);return c.scheduleRecursiveWithAbsoluteAndState(0,e,function(a,b){if(f>0){var g=c.now();e+=f,g>=e&&(e=g+f)}d.onNext(a),b(a+1,e)})})}function sa(a,b){return new wd(function(c){return b.scheduleWithRelative(Vb(a),function(){c.onNext(0),c.onCompleted()})})}function ta(a,b,c){return a===b?new wd(function(a){return c.schedulePeriodicWithState(0,b,function(b){return a.onNext(b),b+1})}):zc(function(){return ra(c.now()+a,b,c)})}function ua(a,b,c){return new wd(function(d){var e,f=!1,g=new Rb,h=null,i=[],j=!1;return e=a.materialize().timestamp(c).subscribe(function(a){var e,k;"E"===a.value.kind?(i=[],i.push(a),h=a.value.exception,k=!j):(i.push({value:a.value,timestamp:a.timestamp+b}),k=!f,f=!0),k&&(null!==h?d.onError(h):(e=new Qb,g.setDisposable(e),e.setDisposable(c.scheduleRecursiveWithRelative(b,function(a){var b,e,g,k;if(null===h){j=!0;do g=null,i.length>0&&i[0].timestamp-c.now()<=0&&(g=i.shift().value),null!==g&&g.accept(d);while(null!==g);k=!1,e=0,i.length>0?(k=!0,e=Math.max(0,i[0].timestamp-c.now())):f=!1,b=h,j=!1,null!==b?d.onError(b):k&&a(e)}}))))}),new Jb(e,g)},a)}function va(a,b,c){return zc(function(){return ua(a,b-c.now(),c)})}function wa(a,b){return new wd(function(c){function d(){g&&(g=!1,c.onNext(f)),e&&c.onCompleted()}var e,f,g;return new Jb(a.subscribe(function(a){g=!0,f=a},c.onError.bind(c),function(){e=!0}),b.subscribe(d,c.onError.bind(c),d))},a)}var xa={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},ya=xa[typeof window]&&window||this,za=xa[typeof exports]&&exports&&!exports.nodeType&&exports,Aa=xa[typeof module]&&module&&!module.nodeType&&module,Ba=Aa&&Aa.exports===za&&za,Ca=xa[typeof global]&&global;!Ca||Ca.global!==Ca&&Ca.window!==Ca||(ya=Ca);var Da={internals:{},config:{Promise:ya.Promise},helpers:{}},Ea=Da.helpers.noop=function(){},Fa=(Da.helpers.notDefined=function(a){return"undefined"==typeof a},Da.helpers.identity=function(a){return a}),Ga=(Da.helpers.pluck=function(a){return function(b){return b[a]}},Da.helpers.just=function(a){return function(){return a}},Da.helpers.defaultNow=Date.now),Ha=Da.helpers.defaultComparer=function(a,b){return Bb(a,b)},Ia=Da.helpers.defaultSubComparer=function(a,b){return a>b?1:b>a?-1:0},Ja=(Da.helpers.defaultKeySerializer=function(a){return a.toString()},Da.helpers.defaultError=function(a){throw a}),Ka=Da.helpers.isPromise=function(a){return!!a&&"function"==typeof a.then},La=(Da.helpers.asArray=function(){return Array.prototype.slice.call(arguments)},Da.helpers.not=function(a){return!a}),Ma=Da.helpers.isFunction=function(){var a=function(a){return"function"==typeof a||!1};return a(/x/)&&(a=function(a){return"function"==typeof a&&"[object Function]"==pb.call(a)}),a}();Da.config.longStackSupport=!1;var Na=!1;try{throw new Error}catch(Oa){Na=!!Oa.stack}var Pa,Qa=g(),Ra="From previous event:",Sa=Da.EmptyError=function(){this.message="Sequence contains no elements.",Error.call(this)};Sa.prototype=Error.prototype;var Ta=Da.ObjectDisposedError=function(){this.message="Object has been disposed",Error.call(this)};Ta.prototype=Error.prototype;var Ua=Da.ArgumentOutOfRangeError=function(){this.message="Argument out of range",Error.call(this)};Ua.prototype=Error.prototype;var Va=Da.NotSupportedError=function(a){this.message=a||"This operation is not supported",Error.call(this)};Va.prototype=Error.prototype;var Wa=Da.NotImplementedError=function(a){this.message=a||"This operation is not implemented",Error.call(this)};Wa.prototype=Error.prototype;var Xa=Da.helpers.notImplemented=function(){throw new Wa},Ya=Da.helpers.notSupported=function(){throw new Va},Za="function"==typeof Symbol&&Symbol.iterator||"_es6shim_iterator_";ya.Set&&"function"==typeof(new ya.Set)["@@iterator"]&&(Za="@@iterator");var $a=Da.doneEnumerator={done:!0,value:a},_a=Da.helpers.isIterable=function(b){return b[Za]!==a},ab=Da.helpers.isArrayLike=function(b){return b&&b.length!==a};Da.helpers.iterator=Za;var bb,cb=Da.internals.bindCallback=function(a,b,c){if("undefined"==typeof b)return a;switch(c){case 0:return function(){return a.call(b)};case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,e){return a.call(b,c,d,e)}}return function(){return a.apply(b,arguments)}},db=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],eb=db.length,fb="[object Arguments]",gb="[object Array]",hb="[object Boolean]",ib="[object Date]",jb="[object Error]",kb="[object Function]",lb="[object Number]",mb="[object Object]",nb="[object RegExp]",ob="[object String]",pb=Object.prototype.toString,qb=Object.prototype.hasOwnProperty,rb=pb.call(arguments)==fb,sb=Error.prototype,tb=Object.prototype,ub=String.prototype,vb=tb.propertyIsEnumerable;try{bb=!(pb.call(document)==mb&&!({toString:0}+""))}catch(Oa){bb=!0}var wb={};wb[gb]=wb[ib]=wb[lb]={constructor:!0,toLocaleString:!0,toString:!0,valueOf:!0},wb[hb]=wb[ob]={constructor:!0,toString:!0,valueOf:!0},wb[jb]=wb[kb]=wb[nb]={constructor:!0,toString:!0},wb[mb]={constructor:!0};var xb={};!function(){var a=function(){this.x=1},b=[];a.prototype={valueOf:1,y:1};for(var c in new a)b.push(c);for(c in arguments);xb.enumErrorProps=vb.call(sb,"message")||vb.call(sb,"name"),xb.enumPrototypes=vb.call(a,"prototype"),xb.nonEnumArgs=0!=c,xb.nonEnumShadows=!/valueOf/.test(b)}(1);var yb=Da.internals.isObject=function(a){var b=typeof a;return a&&("function"==b||"object"==b)||!1},zb=function(a){return a&&"object"==typeof a?pb.call(a)==fb:!1};rb||(zb=function(a){return a&&"object"==typeof a?qb.call(a,"callee"):!1});var Ab,Bb=Da.internals.isEqual=function(a,b){return m(a,b,[],[])},Cb=({}.hasOwnProperty,Array.prototype.slice),Db=this.inherits=Da.internals.inherits=function(a,b){function c(){this.constructor=a}c.prototype=b.prototype,a.prototype=new c},Eb=Da.internals.addProperties=function(a){for(var b=[],c=1,d=arguments.length;d>c;c++)b.push(arguments[c]);for(var e=0,f=b.length;f>e;e++){var g=b[e];for(var h in g)a[h]=g[h]}},Fb=Da.internals.addRef=function(a,b){return new wd(function(c){return new Jb(b.getDisposable(),a.subscribe(c))})},Gb={e:{}};r.prototype.compareTo=function(a){var b=this.value.compareTo(a.value);return 0===b&&(b=this.id-a.id),b};var Hb=Da.internals.PriorityQueue=function(a){this.items=new Array(a),this.length=0},Ib=Hb.prototype;Ib.isHigherPriority=function(a,b){return this.items[a].compareTo(this.items[b])<0},Ib.percolate=function(a){if(!(a>=this.length||0>a)){var b=a-1>>1;if(!(0>b||b===a)&&this.isHigherPriority(a,b)){var c=this.items[a];this.items[a]=this.items[b],this.items[b]=c,this.percolate(b)}}},Ib.heapify=function(a){if(+a||(a=0),!(a>=this.length||0>a)){var b=2*a+1,c=2*a+2,d=a;if(b<this.length&&this.isHigherPriority(b,d)&&(d=b),c<this.length&&this.isHigherPriority(c,d)&&(d=c),d!==a){var e=this.items[a];this.items[a]=this.items[d],this.items[d]=e,this.heapify(d)}}},Ib.peek=function(){return this.items[0].value},Ib.removeAt=function(b){this.items[b]=this.items[--this.length],this.items[this.length]=a,this.heapify()},Ib.dequeue=function(){var a=this.peek();return this.removeAt(0),a},Ib.enqueue=function(a){var b=this.length++;this.items[b]=new r(Hb.count++,a),this.percolate(b)},Ib.remove=function(a){for(var b=0;b<this.length;b++)if(this.items[b].value===a)return this.removeAt(b),!0;return!1},Hb.count=0;var Jb=Da.CompositeDisposable=function(){var a,b,c=[];if(Array.isArray(arguments[0]))c=arguments[0],b=c.length;else for(b=arguments.length,c=new Array(b),a=0;b>a;a++)c[a]=arguments[a];for(a=0;b>a;a++)if(!Ob(c[a]))throw new TypeError("Not a disposable");this.disposables=c,this.isDisposed=!1,this.length=c.length},Kb=Jb.prototype;Kb.add=function(a){this.isDisposed?a.dispose():(this.disposables.push(a),this.length++)},Kb.remove=function(a){var b=!1;if(!this.isDisposed){var c=this.disposables.indexOf(a);-1!==c&&(b=!0,this.disposables.splice(c,1),this.length--,a.dispose())}return b},Kb.dispose=function(){if(!this.isDisposed){this.isDisposed=!0;for(var a=this.disposables.length,b=new Array(a),c=0;a>c;c++)b[c]=this.disposables[c];for(this.disposables=[],this.length=0,c=0;a>c;c++)b[c].dispose()}};var Lb=Da.Disposable=function(a){this.isDisposed=!1,this.action=a||Ea};Lb.prototype.dispose=function(){this.isDisposed||(this.action(),this.isDisposed=!0)};var Mb=Lb.create=function(a){return new Lb(a)},Nb=Lb.empty={dispose:Ea},Ob=Lb.isDisposable=function(a){return a&&Ma(a.dispose)},Pb=Lb.checkDisposed=function(a){if(a.isDisposed)throw new Ta},Qb=Da.SingleAssignmentDisposable=function(){this.isDisposed=!1,this.current=null};Qb.prototype.getDisposable=function(){return this.current},Qb.prototype.setDisposable=function(a){if(this.current)throw new Error("Disposable has already been assigned");var b=this.isDisposed;!b&&(this.current=a),b&&a&&a.dispose()},Qb.prototype.dispose=function(){if(!this.isDisposed){this.isDisposed=!0;var a=this.current;this.current=null}a&&a.dispose()};var Rb=Da.SerialDisposable=function(){this.isDisposed=!1,this.current=null};Rb.prototype.getDisposable=function(){return this.current},Rb.prototype.setDisposable=function(a){var b=this.isDisposed;if(!b){var c=this.current;this.current=a}c&&c.dispose(),b&&a&&a.dispose()},Rb.prototype.dispose=function(){if(!this.isDisposed){this.isDisposed=!0;var a=this.current;this.current=null}a&&a.dispose()};var Sb=Da.RefCountDisposable=function(){function a(a){this.disposable=a,this.disposable.count++,this.isInnerDisposed=!1}function b(a){this.underlyingDisposable=a,this.isDisposed=!1,this.isPrimaryDisposed=!1,this.count=0}return a.prototype.dispose=function(){this.disposable.isDisposed||this.isInnerDisposed||(this.isInnerDisposed=!0,this.disposable.count--,0===this.disposable.count&&this.disposable.isPrimaryDisposed&&(this.disposable.isDisposed=!0,this.disposable.underlyingDisposable.dispose()))},b.prototype.dispose=function(){this.isDisposed||this.isPrimaryDisposed||(this.isPrimaryDisposed=!0,0===this.count&&(this.isDisposed=!0,this.underlyingDisposable.dispose()))},b.prototype.getDisposable=function(){return this.isDisposed?Nb:new a(this)},b}();t.prototype.dispose=function(){this.scheduler.scheduleWithState(this,u)};var Tb=Da.internals.ScheduledItem=function(a,b,c,d,e){this.scheduler=a,this.state=b,this.action=c,this.dueTime=d,this.comparer=e||Ia,this.disposable=new Qb};Tb.prototype.invoke=function(){this.disposable.setDisposable(this.invokeCore())},Tb.prototype.compareTo=function(a){return this.comparer(this.dueTime,a.dueTime)},Tb.prototype.isCancelled=function(){return this.disposable.isDisposed},Tb.prototype.invokeCore=function(){return this.action(this.scheduler,this.state)};var Ub=Da.Scheduler=function(){function a(a,b,c,d){this.now=a,this._schedule=b,this._scheduleRelative=c,this._scheduleAbsolute=d}function b(a,b){return b(),Nb}a.isScheduler=function(b){return b instanceof a};var c=a.prototype;return c.schedule=function(a){return this._schedule(a,b)},c.scheduleWithState=function(a,b){return this._schedule(a,b)},c.scheduleWithRelative=function(a,c){return this._scheduleRelative(c,a,b)},c.scheduleWithRelativeAndState=function(a,b,c){return this._scheduleRelative(a,b,c)},c.scheduleWithAbsolute=function(a,c){return this._scheduleAbsolute(c,a,b)},c.scheduleWithAbsoluteAndState=function(a,b,c){return this._scheduleAbsolute(a,b,c)},a.now=Ga,a.normalize=function(a){return 0>a&&(a=0),a},a}(),Vb=Ub.normalize,Wb=Ub.isScheduler;!function(a){function b(a,b){function c(b){e(b,function(b){var d=!1,e=!1,g=a.scheduleWithState(b,function(a,b){return d?f.remove(g):e=!0,c(b),Nb});e||(f.add(g),d=!0)})}var d=b[0],e=b[1],f=new Jb;return c(d),f}function c(a,b,c){function d(b){f(b,function(b,e){var f=!1,h=!1,i=a[c](b,e,function(a,b){return f?g.remove(i):h=!0,d(b),Nb});h||(g.add(i),f=!0)})}var e=b[0],f=b[1],g=new Jb;return d(e),g}function d(a,b){a(function(c){b(a,c)})}a.scheduleRecursive=function(a){return this.scheduleRecursiveWithState(a,function(a,b){a(function(){b(a)})})},a.scheduleRecursiveWithState=function(a,c){return this.scheduleWithState([a,c],b)},a.scheduleRecursiveWithRelative=function(a,b){return this.scheduleRecursiveWithRelativeAndState(b,a,d)},a.scheduleRecursiveWithRelativeAndState=function(a,b,d){return this._scheduleRelative([a,d],b,function(a,b){return c(a,b,"scheduleWithRelativeAndState")})},a.scheduleRecursiveWithAbsolute=function(a,b){return this.scheduleRecursiveWithAbsoluteAndState(b,a,d)},a.scheduleRecursiveWithAbsoluteAndState=function(a,b,d){return this._scheduleAbsolute([a,d],b,function(a,b){return c(a,b,"scheduleWithAbsoluteAndState")})}}(Ub.prototype),function(){Ub.prototype.schedulePeriodic=function(a,b){return this.schedulePeriodicWithState(null,a,b)},Ub.prototype.schedulePeriodicWithState=function(a,b,c){if("undefined"==typeof ya.setInterval)throw new Va;b=Vb(b);var d=a,e=ya.setInterval(function(){d=c(d)},b);return Mb(function(){ya.clearInterval(e)})}}(Ub.prototype),function(a){a.catchError=a["catch"]=function(a){return new ec(this,a)}}(Ub.prototype);var Xb,Yb,Zb=Da.internals.SchedulePeriodicRecursive=function(){function a(a,b){b(0,this._period);try{this._state=this._action(this._state)}catch(c){throw this._cancel.dispose(),c}}function b(a,b,c,d){this._scheduler=a,this._state=b,this._period=c,this._action=d}return b.prototype.start=function(){var b=new Qb;return this._cancel=b,b.setDisposable(this._scheduler.scheduleRecursiveWithRelativeAndState(0,this._period,a.bind(this))),b},b}(),$b=Ub.immediate=function(){function a(a,b){return b(this,a)}return new Ub(Ga,a,Ya,Ya)}(),_b=Ub.currentThread=function(){function a(){for(;c.length>0;){var a=c.dequeue();!a.isCancelled()&&a.invoke()}}function b(b,d){var e=new Tb(this,b,d,this.now());if(c)c.enqueue(e);else{c=new Hb(4),c.enqueue(e);var f=p(a)();if(c=null,f===Gb)return q(f.e)}return e.disposable}var c,d=new Ub(Ga,b,Ya,Ya);return d.scheduleRequired=function(){return!c},d}(),ac=function(){var a,b=Ea;if(ya.setTimeout)a=ya.setTimeout,b=ya.clearTimeout;else{if(!ya.WScript)throw new Va;a=function(a,b){ya.WScript.Sleep(b),a()}}return{setTimeout:a,clearTimeout:b}}(),bc=ac.setTimeout,cc=ac.clearTimeout;!function(){function a(b){if(f)bc(function(){a(b)},0);else{var c=e[b];if(c){f=!0;var d=p(c)();if(Yb(b),f=!1,d===Gb)return q(d.e)}}}function b(){if(!ya.postMessage||ya.importScripts)return!1;var a=!1,b=ya.onmessage;return ya.onmessage=function(){a=!0},ya.postMessage("","*"),ya.onmessage=b,a}function c(b){"string"==typeof b.data&&b.data.substring(0,i.length)===i&&a(b.data.substring(i.length))}var d=1,e={},f=!1;Yb=function(a){delete e[a]};var g=RegExp("^"+String(pb).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),h="function"==typeof(h=Ca&&Ba&&Ca.setImmediate)&&!g.test(h)&&h;if(Ma(h))Xb=function(b){var c=d++;return e[c]=b,h(function(){a(c)}),c};else if("undefined"!=typeof process&&"[object process]"==={}.toString.call(process))Xb=function(b){var c=d++;return e[c]=b,process.nextTick(function(){a(c)}),c};else if(b()){var i="ms.rx.schedule"+Math.random();ya.addEventListener?ya.addEventListener("message",c,!1):ya.attachEvent?ya.attachEvent("onmessage",c):ya.onmessage=c,Xb=function(a){var b=d++;return e[b]=a,ya.postMessage(i+currentId,"*"),b}}else if(ya.MessageChannel){var j=new ya.MessageChannel;j.port1.onmessage=function(b){a(b.data)},Xb=function(a){var b=d++;return e[b]=a,j.port2.postMessage(b),b}}else Xb="document"in ya&&"onreadystatechange"in ya.document.createElement("script")?function(b){var c=ya.document.createElement("script"),f=d++;return e[f]=b,c.onreadystatechange=function(){a(f),c.onreadystatechange=null,c.parentNode.removeChild(c),c=null},ya.document.documentElement.appendChild(c),f}:function(b){var c=d++;return e[c]=b,bc(function(){a(c)},0),c}}();var dc=Ub.timeout=Ub["default"]=function(){function a(a,b){var c=this,d=new Qb,e=Xb(function(){!d.isDisposed&&d.setDisposable(b(c,a))});return new Jb(d,Mb(function(){Yb(e)}))}function b(a,b,c){var d=this,e=Ub.normalize(b),f=new Qb;if(0===e)return d.scheduleWithState(a,c);var g=bc(function(){!f.isDisposed&&f.setDisposable(c(d,a))},e);return new Jb(f,Mb(function(){cc(g)}))}function c(a,b,c){return this.scheduleWithRelativeAndState(a,b-this.now(),c)}return new Ub(Ga,a,b,c)}(),ec=function(a){function b(a,b){return this._scheduler.scheduleWithState(a,this._wrap(b))}function c(a,b,c){return this._scheduler.scheduleWithRelativeAndState(a,b,this._wrap(c))}function d(a,b,c){return this._scheduler.scheduleWithAbsoluteAndState(a,b,this._wrap(c))}function e(e,f){this._scheduler=e,this._handler=f,this._recursiveOriginal=null,this._recursiveWrapper=null,a.call(this,this._scheduler.now.bind(this._scheduler),b,c,d)}return Db(e,a),e.prototype._clone=function(a){return new e(a,this._handler)},e.prototype._wrap=function(a){var b=this;return function(c,d){try{return a(b._getRecursiveWrapper(c),d)}catch(e){if(!b._handler(e))throw e;return Nb}}},e.prototype._getRecursiveWrapper=function(a){if(this._recursiveOriginal!==a){this._recursiveOriginal=a;var b=this._clone(a);b._recursiveOriginal=a,b._recursiveWrapper=b,this._recursiveWrapper=b}return this._recursiveWrapper},e.prototype.schedulePeriodicWithState=function(a,b,c){var d=this,e=!1,f=new Qb;return f.setDisposable(this._scheduler.schedulePeriodicWithState(a,b,function(a){if(e)return null;try{return c(a)}catch(b){if(e=!0,!d._handler(b))throw b;return f.dispose(),null}})),f},e}(Ub),fc=Da.Notification=function(){function a(a,b,c,d,e,f){this.kind=a,this.value=b,this.exception=c,this._accept=d,this._acceptObservable=e,this.toString=f}return a.prototype.accept=function(a,b,c){return a&&"object"==typeof a?this._acceptObservable(a):this._accept(a,b,c)},a.prototype.toObservable=function(a){var b=this;return Wb(a)||(a=$b),new wd(function(c){return a.scheduleWithState(b,function(a,b){b._acceptObservable(c),"N"===b.kind&&c.onCompleted()})})},a}(),gc=fc.createOnNext=function(){function a(a){return a(this.value)}function b(a){return a.onNext(this.value)}function c(){return"OnNext("+this.value+")"}return function(d){return new fc("N",d,null,a,b,c)}}(),hc=fc.createOnError=function(){function a(a,b){return b(this.exception)}function b(a){return a.onError(this.exception)}function c(){return"OnError("+this.exception+")"}return function(d){return new fc("E",null,d,a,b,c)}}(),ic=fc.createOnCompleted=function(){function a(a,b,c){return c()}function b(a){return a.onCompleted()}function c(){return"OnCompleted()"}return function(){return new fc("C",null,null,a,b,c)}}(),jc=Da.internals.Enumerator=function(a){this._next=a};jc.prototype.next=function(){return this._next()},jc.prototype[Za]=function(){return this};var kc=Da.internals.Enumerable=function(a){this._iterator=a};kc.prototype[Za]=function(){return this._iterator()},kc.prototype.concat=function(){var a=this;return new wd(function(b){var c,d=a[Za](),e=new Rb,f=$b.scheduleRecursive(function(a){if(!c){try{var f=d.next()}catch(g){return b.onError(g)}if(f.done)return b.onCompleted();var h=f.value;Ka(h)&&(h=xc(h));var i=new Qb;e.setDisposable(i),i.setDisposable(h.subscribe(function(a){b.onNext(a)},function(a){b.onError(a)},a))}});return new Jb(e,f,Mb(function(){c=!0}))})},kc.prototype.catchError=function(){var a=this;return new wd(function(b){var c,d=a[Za](),e=new Rb,f=$b.scheduleRecursiveWithState(null,function(a,f){if(!c){try{var g=d.next()}catch(h){return observer.onError(h)}if(g.done)return void(null!==a?b.onError(a):b.onCompleted());var i=g.value;Ka(i)&&(i=xc(i));var j=new Qb;e.setDisposable(j),j.setDisposable(i.subscribe(function(a){b.onNext(a)},f,function(){b.onCompleted()}))}});return new Jb(e,f,Mb(function(){c=!0}))})},kc.prototype.catchErrorWhen=function(a){var b=this;return new wd(function(c){var d,e,f=new zd,g=new zd,h=a(f),i=h.subscribe(g),j=b[Za](),k=new Rb,l=$b.scheduleRecursive(function(a){if(!d){try{var b=j.next()}catch(h){return c.onError(h)}if(b.done)return void(e?c.onError(e):c.onCompleted());var i=b.value;Ka(i)&&(i=xc(i));var l=new Qb,m=new Qb;k.setDisposable(new Jb(m,l)),l.setDisposable(i.subscribe(function(a){c.onNext(a)},function(b){m.setDisposable(g.subscribe(a,function(a){c.onError(a)},function(){c.onCompleted()})),f.onNext(b)},function(){c.onCompleted()}))}});return new Jb(i,k,l,Mb(function(){d=!0}))})};var lc=kc.repeat=function(a,b){return null==b&&(b=-1),new kc(function(){var c=b;return new jc(function(){return 0===c?$a:(c>0&&c--,{done:!1,value:a})})})},mc=kc.of=function(a,b,c){if(b)var d=cb(b,c,3);return new kc(function(){var c=-1;return new jc(function(){return++c<a.length?{done:!1,value:b?d(a[c],c,a):a[c]}:$a})})},nc=Da.Observer=function(){};nc.prototype.toNotifier=function(){var a=this;return function(b){return b.accept(a)}},nc.prototype.asObserver=function(){return new rc(this.onNext.bind(this),this.onError.bind(this),this.onCompleted.bind(this))},nc.prototype.checked=function(){return new sc(this)};var oc=nc.create=function(a,b,c){return a||(a=Ea),b||(b=Ja),c||(c=Ea),new rc(a,b,c)};nc.fromNotifier=function(a,b){return new rc(function(c){return a.call(b,gc(c))},function(c){return a.call(b,hc(c))},function(){return a.call(b,ic())})},nc.prototype.notifyOn=function(a){return new uc(a,this)},nc.prototype.makeSafe=function(a){return new AnonymousSafeObserver(this._onNext,this._onError,this._onCompleted,a)};var pc,qc=Da.internals.AbstractObserver=function(a){function b(){this.isStopped=!1,a.call(this)}return Db(b,a),b.prototype.next=Xa,b.prototype.error=Xa,b.prototype.completed=Xa,b.prototype.onNext=function(a){this.isStopped||this.next(a)},b.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.error(a))},b.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.completed())},b.prototype.dispose=function(){this.isStopped=!0},b.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.error(a),!0)},b}(nc),rc=Da.AnonymousObserver=function(a){function b(b,c,d){a.call(this),this._onNext=b,this._onError=c,this._onCompleted=d}return Db(b,a),b.prototype.next=function(a){this._onNext(a);

},b.prototype.error=function(a){this._onError(a)},b.prototype.completed=function(){this._onCompleted()},b}(qc),sc=function(a){function b(b){a.call(this),this._observer=b,this._state=0}Db(b,a);var c=b.prototype;return c.onNext=function(a){this.checkAccess();var b=p(this._observer.onNext).call(this._observer,a);this._state=0,b===Gb&&q(b.e)},c.onError=function(a){this.checkAccess();var b=p(this._observer.onError).call(this._observer,a);this._state=2,b===Gb&&q(b.e)},c.onCompleted=function(){this.checkAccess();var a=p(this._observer.onCompleted).call(this._observer);this._state=2,a===Gb&&q(a.e)},c.checkAccess=function(){if(1===this._state)throw new Error("Re-entrancy detected");if(2===this._state)throw new Error("Observer completed");0===this._state&&(this._state=1)},b}(nc),tc=Da.internals.ScheduledObserver=function(a){function b(b,c){a.call(this),this.scheduler=b,this.observer=c,this.isAcquired=!1,this.hasFaulted=!1,this.queue=[],this.disposable=new Rb}return Db(b,a),b.prototype.next=function(a){var b=this;this.queue.push(function(){b.observer.onNext(a)})},b.prototype.error=function(a){var b=this;this.queue.push(function(){b.observer.onError(a)})},b.prototype.completed=function(){var a=this;this.queue.push(function(){a.observer.onCompleted()})},b.prototype.ensureActive=function(){var a=!1,b=this;!this.hasFaulted&&this.queue.length>0&&(a=!this.isAcquired,this.isAcquired=!0),a&&this.disposable.setDisposable(this.scheduler.scheduleRecursive(function(a){var c;if(!(b.queue.length>0))return void(b.isAcquired=!1);c=b.queue.shift();try{c()}catch(d){throw b.queue=[],b.hasFaulted=!0,d}a()}))},b.prototype.dispose=function(){a.prototype.dispose.call(this),this.disposable.dispose()},b}(qc),uc=function(a){function b(b,c,d){a.call(this,b,c),this._cancel=d}return Db(b,a),b.prototype.next=function(b){a.prototype.next.call(this,b),this.ensureActive()},b.prototype.error=function(b){a.prototype.error.call(this,b),this.ensureActive()},b.prototype.completed=function(){a.prototype.completed.call(this),this.ensureActive()},b.prototype.dispose=function(){a.prototype.dispose.call(this),this._cancel&&this._cancel.dispose(),this._cancel=null},b}(tc),vc=Da.Observable=function(){function a(a){if(Da.config.longStackSupport&&Na){try{throw new Error}catch(b){this.stack=b.stack.substring(b.stack.indexOf("\n")+1)}var d=this;this._subscribe=function(b){var e=b.onError.bind(b);return b.onError=function(a){c(a,d),e(a)},a.call(d,b)}}else this._subscribe=a}return pc=a.prototype,pc.subscribe=pc.forEach=function(a,b,c){return this._subscribe("object"==typeof a?a:oc(a,b,c))},pc.subscribeOnNext=function(a,b){return this._subscribe(oc("undefined"!=typeof b?function(c){a.call(b,c)}:a))},pc.subscribeOnError=function(a,b){return this._subscribe(oc(null,"undefined"!=typeof b?function(c){a.call(b,c)}:a))},pc.subscribeOnCompleted=function(a,b){return this._subscribe(oc(null,null,"undefined"!=typeof b?function(){a.call(b)}:a))},a}(),wc=Da.ObservableBase=function(a){function b(a){return a&&Ma(a.dispose)?a:Ma(a)?Mb(a):Nb}function c(a,c){var d=c[0],e=c[1],f=p(e.subscribeCore).call(e,d);return f!==Gb||d.fail(Gb.e)?void d.setDisposable(b(f)):q(Gb.e)}function d(a){var b=new xd(a),d=[b,this];return _b.scheduleRequired()?_b.scheduleWithState(d,c):c(null,d),b}function e(){a.call(this,d)}return Db(e,a),e.prototype.subscribeCore=Xa,e}(vc);pc.observeOn=function(a){var b=this;return new wd(function(c){return b.subscribe(new uc(a,c))},b)},pc.subscribeOn=function(a){var b=this;return new wd(function(c){var d=new Qb,e=new Rb;return e.setDisposable(d),d.setDisposable(a.schedule(function(){e.setDisposable(new t(a,b.subscribe(c)))})),e},b)};var xc=vc.fromPromise=function(a){return zc(function(){var b=new Da.AsyncSubject;return a.then(function(a){b.onNext(a),b.onCompleted()},b.onError.bind(b)),b})};pc.toPromise=function(a){if(a||(a=Da.config.Promise),!a)throw new Va("Promise type not provided nor in Rx.config.Promise");var b=this;return new a(function(a,c){var d,e=!1;b.subscribe(function(a){d=a,e=!0},c,function(){e&&a(d)})})};var yc=function(a){function b(b){this.source=b,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){return this.source.subscribe(new v(a))},b}(wc);v.prototype.onNext=function(a){this.isStopped||this.a.push(a)},v.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.observer.onError(a))},v.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.observer.onNext(this.a),this.observer.onCompleted())},v.prototype.dispose=function(){this.isStopped=!0},v.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.observer.onError(a),!0)},pc.toArray=function(){return new yc(this)},vc.create=vc.createWithDisposable=function(a,b){return new wd(a,b)};var zc=vc.defer=function(a){return new wd(function(b){var c;try{c=a()}catch(d){return Qc(d).subscribe(b)}return Ka(c)&&(c=xc(c)),c.subscribe(b)})},Ac=function(a){function b(b){this.scheduler=b,a.call(this)}function c(a,b){this.observer=a,this.parent=b}function d(a,b){b.onCompleted()}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new c(a,this);return b.run()},c.prototype.run=function(){return this.parent.scheduler.scheduleWithState(this.observer,d)},b}(wc),Bc=vc.empty=function(a){return Wb(a)||(a=$b),new Ac(a)},Cc=function(a){function b(b,c,d){this.iterable=b,this.mapper=c,this.scheduler=d,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new Dc(a,this);return b.run()},b}(wc),Dc=function(){function a(a,b){this.observer=a,this.parent=b}return a.prototype.run=function(){function a(a,b){try{var f=c.next()}catch(g){return d.onError(g)}if(f.done)return d.onCompleted();var h=f.value;if(e)try{h=e(h,a)}catch(g){return d.onError(g)}d.onNext(h),b(a+1)}var b=Object(this.parent.iterable),c=B(b),d=this.observer,e=this.parent.mapper;return this.parent.scheduler.scheduleRecursiveWithState(0,a)},a}(),Ec=Math.pow(2,53)-1;w.prototype[Za]=function(){return new x(this._s)},x.prototype[Za]=function(){return this},x.prototype.next=function(){return this._i<this._l?{done:!1,value:this._s.charAt(this._i++)}:$a},y.prototype[Za]=function(){return new z(this._a)},z.prototype[Za]=function(){return this},z.prototype.next=function(){return this._i<this._l?{done:!1,value:this._a[this._i++]}:$a};var Fc=vc.from=function(a,b,c,d){if(null==a)throw new Error("iterable cannot be null.");if(b&&!Ma(b))throw new Error("mapFn when provided must be a function");if(b)var e=cb(b,c,2);return Wb(d)||(d=_b),new Cc(a,e,d)},Gc=function(a){function b(b,c){this.args=b,this.scheduler=c,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new E(a,this);return b.run()},b}(wc);E.prototype.run=function(){function a(a,e){d>a?(b.onNext(c[a]),e(a+1)):b.onCompleted()}var b=this.observer,c=this.parent.args,d=c.length;return this.parent.scheduler.scheduleRecursiveWithState(0,a)};var Hc=vc.fromArray=function(a,b){return Wb(b)||(b=_b),new Gc(a,b)};vc.generate=function(a,b,c,d,e){return Wb(e)||(e=_b),new wd(function(f){var g=!0;return e.scheduleRecursiveWithState(a,function(a,e){var h,i;try{g?g=!1:a=c(a),h=b(a),h&&(i=d(a))}catch(j){return f.onError(j)}h?(f.onNext(i),e(a)):f.onCompleted()})})},vc.of=function(){for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];return new Gc(b,_b)},vc.ofWithScheduler=function(a){for(var b=arguments.length,c=new Array(b-1),d=1;b>d;d++)c[d-1]=arguments[d];return new Gc(c,a)},vc.ofArrayChanges=function(a){if(!Array.isArray(a))throw new TypeError("Array.observe only accepts arrays.");if("function"!=typeof Array.observe&&"function"!=typeof Array.unobserve)throw new TypeError("Array.observe is not supported on your platform");return new wd(function(b){function c(a){for(var c=0,d=a.length;d>c;c++)b.onNext(a[c])}return Array.observe(a,c),function(){Array.unobserve(a,c)}})},vc.ofObjectChanges=function(a){if(null==a)throw new TypeError("object must not be null or undefined.");if("function"!=typeof Object.observe&&"function"!=typeof Object.unobserve)throw new TypeError("Array.observe is not supported on your platform");return new wd(function(b){function c(a){for(var c=0,d=a.length;d>c;c++)b.onNext(a[c])}return Object.observe(a,c),function(){Object.unobserve(a,c)}})};var Ic=function(a){function b(){a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(){return Nb},b}(wc),Jc=vc.never=function(){return new Ic},Kc=function(a){function b(b,c){this.obj=b,this.keys=Object.keys(b),this.scheduler=c,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new G(a,this);return b.run()},b}(wc);G.prototype.run=function(){function a(a,f){if(e>a){var g=d[a];b.onNext([g,c[g]]),f(a+1)}else b.onCompleted()}var b=this.observer,c=this.parent.obj,d=this.parent.keys,e=d.length;return this.parent.scheduler.scheduleRecursiveWithState(0,a)},vc.pairs=function(a,b){return b||(b=_b),new Kc(a,b)};var Lc=function(a){function b(b,c,d){this.start=b,this.count=c,this.scheduler=d,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new Mc(a,this);return b.run()},b}(wc),Mc=function(){function a(a,b){this.observer=a,this.parent=b}return a.prototype.run=function(){function a(a,e){c>a?(d.onNext(b+a),e(a+1)):d.onCompleted()}var b=this.parent.start,c=this.parent.count,d=this.observer;return this.parent.scheduler.scheduleRecursiveWithState(0,a)},a}();vc.range=function(a,b,c){return Wb(c)||(c=_b),new Lc(a,b,c)};var Nc=function(a){function b(b,c,d){this.value=b,this.repeatCount=null==c?-1:c,this.scheduler=d,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new H(a,this);return b.run()},b}(wc);H.prototype.run=function(){function a(a,d){return(-1===a||a>0)&&(b.onNext(c),a>0&&a--),0===a?b.onCompleted():void d(a)}var b=this.observer,c=this.parent.value;return this.parent.scheduler.scheduleRecursiveWithState(this.parent.repeatCount,a)},vc.repeat=function(a,b,c){return Wb(c)||(c=_b),new Nc(a,b,c)};var Oc=function(a){function b(b,c){this.value=b,this.scheduler=c,a.call(this)}function c(a,b){this.observer=a,this.parent=b}function d(a,b){var c=b[0],d=b[1];d.onNext(c),d.onCompleted()}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new c(a,this);return b.run()},c.prototype.run=function(){return this.parent.scheduler.scheduleWithState([this.parent.value,this.observer],d)},b}(wc),Pc=(vc["return"]=vc.just=vc.returnValue=function(a,b){return Wb(b)||(b=$b),new Oc(a,b)},function(a){function b(b,c){this.error=b,this.scheduler=c,a.call(this)}function c(a,b){this.observer=a,this.parent=b}function d(a,b){var c=b[0],d=b[1];d.onError(c)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new c(a,this);return b.run()},c.prototype.run=function(){return this.parent.scheduler.scheduleWithState([this.parent.error,this.observer],d)},b}(wc)),Qc=vc["throw"]=vc.throwError=vc.throwException=function(a,b){return Wb(b)||(b=$b),new Pc(a,b)};vc.using=function(a,b){return new wd(function(c){var d,e,f=Nb;try{d=a(),d&&(f=d),e=b(d)}catch(g){return new Jb(Qc(g).subscribe(c),f)}return new Jb(e.subscribe(c),f)})},pc.amb=function(a){var b=this;return new wd(function(c){function d(){f||(f=g,j.dispose())}function e(){f||(f=h,i.dispose())}var f,g="L",h="R",i=new Qb,j=new Qb;return Ka(a)&&(a=xc(a)),i.setDisposable(b.subscribe(function(a){d(),f===g&&c.onNext(a)},function(a){d(),f===g&&c.onError(a)},function(){d(),f===g&&c.onCompleted()})),j.setDisposable(a.subscribe(function(a){e(),f===h&&c.onNext(a)},function(a){e(),f===h&&c.onError(a)},function(){e(),f===h&&c.onCompleted()})),new Jb(i,j)})},vc.amb=function(){function a(a,b){return a.amb(b)}var b=Jc(),c=[];if(Array.isArray(arguments[0]))c=arguments[0];else for(var d=0,e=arguments.length;e>d;d++)c.push(arguments[d]);for(var d=0,e=c.length;e>d;d++)b=a(b,c[d]);return b},pc["catch"]=pc.catchError=pc.catchException=function(a){return"function"==typeof a?I(this,a):Rc([this,a])};var Rc=vc.catchError=vc["catch"]=vc.catchException=function(){var a=[];if(Array.isArray(arguments[0]))a=arguments[0];else for(var b=0,c=arguments.length;c>b;b++)a.push(arguments[b]);return mc(a).catchError()};pc.combineLatest=function(){for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];return Array.isArray(b[0])?b[0].unshift(this):b.unshift(this),Sc.apply(this,b)};var Sc=vc.combineLatest=function(){for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];var d=b.pop();return Array.isArray(b[0])&&(b=b[0]),new wd(function(a){function c(b){if(h[b]=!0,i||(i=h.every(Fa))){try{var c=d.apply(null,k)}catch(e){return a.onError(e)}a.onNext(c)}else j.filter(function(a,c){return c!==b}).every(Fa)&&a.onCompleted()}function e(b){j[b]=!0,j.every(Fa)&&a.onCompleted()}for(var f=b.length,g=function(){return!1},h=n(f,g),i=!1,j=n(f,g),k=new Array(f),l=new Array(f),m=0;f>m;m++)!function(d){var f=b[d],g=new Qb;Ka(f)&&(f=xc(f)),g.setDisposable(f.subscribe(function(a){k[d]=a,c(d)},function(b){a.onError(b)},function(){e(d)})),l[d]=g}(m);return new Jb(l)},this)};pc.concat=function(){for(var a=[],b=0,c=arguments.length;c>b;b++)a.push(arguments[b]);return a.unshift(this),Tc.apply(null,a)};var Tc=vc.concat=function(){var a;if(Array.isArray(arguments[0]))a=arguments[0];else{a=new Array(arguments.length);for(var b=0,c=arguments.length;c>b;b++)a[b]=arguments[b]}return mc(a).concat()};pc.concatAll=pc.concatObservable=function(){return this.merge(1)};var Uc=function(a){function b(b,c){this.source=b,this.maxConcurrent=c,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new Jb;return b.add(this.source.subscribe(new Vc(a,this.maxConcurrent,b))),b},b}(wc),Vc=function(){function a(a,b,c){this.o=a,this.max=b,this.g=c,this.done=!1,this.q=[],this.activeCount=0,this.isStopped=!1}function b(a,b){this.parent=a,this.sad=b,this.isStopped=!1}return a.prototype.handleSubscribe=function(a){var c=new Qb;this.g.add(c),Ka(a)&&(a=xc(a)),c.setDisposable(a.subscribe(new b(this,c)))},a.prototype.onNext=function(a){this.isStopped||(this.activeCount<this.max?(this.activeCount++,this.handleSubscribe(a)):this.q.push(a))},a.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.o.onError(a))},a.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.done=!0,0===this.activeCount&&this.o.onCompleted())},a.prototype.dispose=function(){this.isStopped=!0},a.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.o.onError(a),!0)},b.prototype.onNext=function(a){this.isStopped||this.parent.o.onNext(a)},b.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.parent.o.onError(a))},b.prototype.onCompleted=function(){if(!this.isStopped){this.isStopped=!0;var a=this.parent;a.g.remove(this.sad),a.q.length>0?a.handleSubscribe(a.q.shift()):(a.activeCount--,a.done&&0===a.activeCount&&a.o.onCompleted())}},b.prototype.dispose=function(){this.isStopped=!0},b.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.parent.o.onError(a),!0)},a}();pc.merge=function(a){return"number"!=typeof a?Wc(this,a):new Uc(this,a)};var Wc=vc.merge=function(){var a,b,c=[],d=arguments.length;if(arguments[0])if(Wb(arguments[0]))for(a=arguments[0],b=1;d>b;b++)c.push(arguments[b]);else for(a=$b,b=0;d>b;b++)c.push(arguments[b]);else for(a=$b,b=1;d>b;b++)c.push(arguments[b]);return Array.isArray(c[0])&&(c=c[0]),F(a,c).mergeAll()},Xc=function(a){function b(b){this.source=b,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new Jb,c=new Qb;return b.add(c),c.setDisposable(this.source.subscribe(new Yc(a,b))),b},b}(wc),Yc=function(){function a(a,b){this.o=a,this.g=b,this.isStopped=!1,this.done=!1}function b(a,b,c){this.parent=a,this.g=b,this.sad=c,this.isStopped=!1}return a.prototype.onNext=function(a){if(!this.isStopped){var c=new Qb;this.g.add(c),Ka(a)&&(a=xc(a)),c.setDisposable(a.subscribe(new b(this,this.g,c)))}},a.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.o.onError(a))},a.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.done=!0,1===this.g.length&&this.o.onCompleted())},a.prototype.dispose=function(){this.isStopped=!0},a.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.o.onError(a),!0)},b.prototype.onNext=function(a){this.isStopped||this.parent.o.onNext(a)},b.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.parent.o.onError(a))},b.prototype.onCompleted=function(){if(!this.isStopped){var a=this.parent;this.isStopped=!0,a.g.remove(this.sad),a.done&&1===a.g.length&&a.o.onCompleted()}},b.prototype.dispose=function(){this.isStopped=!0},b.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.parent.o.onError(a),!0)},a}();pc.mergeAll=pc.mergeObservable=function(){return new Xc(this)};var Zc=Da.CompositeError=function(a){this.name="NotImplementedError",this.innerErrors=a,this.message="This contains multiple errors. Check the innerErrors",Error.call(this)};Zc.prototype=Error.prototype,vc.mergeDelayError=function(){var a;if(Array.isArray(arguments[0]))a=arguments[0];else{var b=arguments.length;a=new Array(b);for(var c=0;b>c;c++)a[c]=arguments[c]}var d=F(null,a);return new wd(function(a){function b(){0===g.length?a.onCompleted():a.onError(1===g.length?g[0]:new Zc(g))}var c=new Jb,e=new Qb,f=!1,g=[];return c.add(e),e.setDisposable(d.subscribe(function(d){var e=new Qb;c.add(e),Ka(d)&&(d=xc(d)),e.setDisposable(d.subscribe(function(b){a.onNext(b)},function(a){g.push(a),c.remove(e),f&&1===c.length&&b()},function(){c.remove(e),f&&1===c.length&&b()}))},function(a){g.push(a),f=!0,1===c.length&&b()},function(){f=!0,1===c.length&&b()})),c})},pc.onErrorResumeNext=function(a){if(!a)throw new Error("Second observable is required");return $c([this,a])};var $c=vc.onErrorResumeNext=function(){var a=[];if(Array.isArray(arguments[0]))a=arguments[0];else for(var b=0,c=arguments.length;c>b;b++)a.push(arguments[b]);return new wd(function(b){var c=0,d=new Rb,e=$b.scheduleRecursive(function(e){var f,g;c<a.length?(f=a[c++],Ka(f)&&(f=xc(f)),g=new Qb,d.setDisposable(g),g.setDisposable(f.subscribe(b.onNext.bind(b),e,e))):b.onCompleted()});return new Jb(d,e)})};pc.skipUntil=function(a){var b=this;return new wd(function(c){var d=!1,e=new Jb(b.subscribe(function(a){d&&c.onNext(a)},function(a){c.onError(a)},function(){d&&c.onCompleted()}));Ka(a)&&(a=xc(a));var f=new Qb;return e.add(f),f.setDisposable(a.subscribe(function(){d=!0,f.dispose()},function(a){c.onError(a)},function(){f.dispose()})),e},b)},pc["switch"]=pc.switchLatest=function(){var a=this;return new wd(function(b){var c=!1,d=new Rb,e=!1,f=0,g=a.subscribe(function(a){var g=new Qb,h=++f;c=!0,d.setDisposable(g),Ka(a)&&(a=xc(a)),g.setDisposable(a.subscribe(function(a){f===h&&b.onNext(a)},function(a){f===h&&b.onError(a)},function(){f===h&&(c=!1,e&&b.onCompleted())}))},function(a){b.onError(a)},function(){e=!0,!c&&b.onCompleted()});return new Jb(g,d)},a)},pc.takeUntil=function(a){var b=this;return new wd(function(c){return Ka(a)&&(a=xc(a)),new Jb(b.subscribe(c),a.subscribe(function(){c.onCompleted()},function(a){c.onError(a)},Ea))},b)},pc.withLatestFrom=function(){for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];var d=b.pop(),e=this;if("undefined"==typeof e)throw new Error("Source observable not found for withLatestFrom().");if("function"!=typeof d)throw new Error("withLatestFrom() expects a resultSelector function.");return Array.isArray(b[0])&&(b=b[0]),new wd(function(a){for(var c=function(){return!1},f=b.length,g=n(f,c),h=!1,i=new Array(f),j=new Array(f+1),k=0;f>k;k++)!function(c){var d=b[c],e=new Qb;Ka(d)&&(d=xc(d)),e.setDisposable(d.subscribe(function(a){i[c]=a,g[c]=!0,h=g.every(Fa)},a.onError.bind(a),function(){})),j[c]=e}(k);var l=new Qb;return l.setDisposable(e.subscribe(function(b){var c,e=[b].concat(i);if(h){try{c=d.apply(null,e)}catch(f){return void a.onError(f)}a.onNext(c)}},a.onError.bind(a),function(){a.onCompleted()})),j[f]=l,new Jb(j)},this)},pc.zip=function(){if(Array.isArray(arguments[0]))return J.apply(this,arguments);for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];var d=this,e=b.pop();return b.unshift(d),new wd(function(a){function c(b){var c,f;if(h.every(function(a){return a.length>0})){try{f=h.map(function(a){return a.shift()}),c=e.apply(d,f)}catch(g){return void a.onError(g)}a.onNext(c)}else i.filter(function(a,c){return c!==b}).every(Fa)&&a.onCompleted()}function f(b){i[b]=!0,i.every(function(a){return a})&&a.onCompleted()}for(var g=b.length,h=n(g,L),i=n(g,K),j=new Array(g),k=0;g>k;k++)!function(d){var e=b[d],g=new Qb;Ka(e)&&(e=xc(e)),g.setDisposable(e.subscribe(function(a){h[d].push(a),c(d)},function(b){a.onError(b)},function(){f(d)})),j[d]=g}(k);return new Jb(j)},d)},vc.zip=function(){for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];var d=b.shift();return d.zip.apply(d,b)},vc.zipArray=function(){var a;if(Array.isArray(arguments[0]))a=arguments[0];else{var b=arguments.length;a=new Array(b);for(var c=0;b>c;c++)a[c]=arguments[c]}return new wd(function(b){function c(a){if(f.every(function(a){return a.length>0})){var c=f.map(function(a){return a.shift()});b.onNext(c)}else if(g.filter(function(b,c){return c!==a}).every(Fa))return void b.onCompleted()}function d(a){return g[a]=!0,g.every(Fa)?void b.onCompleted():void 0}for(var e=a.length,f=n(e,function(){return[]}),g=n(e,function(){return!1}),h=new Array(e),i=0;e>i;i++)!function(e){h[e]=new Qb,h[e].setDisposable(a[e].subscribe(function(a){f[e].push(a),c(e)},function(a){b.onError(a)},function(){d(e)}))}(i);return new Jb(h)})},pc.asObservable=function(){var a=this;return new wd(function(b){return a.subscribe(b)},this)},pc.bufferWithCount=function(a,b){return"number"!=typeof b&&(b=a),this.windowWithCount(a,b).selectMany(function(a){return a.toArray()}).where(function(a){return a.length>0})},pc.dematerialize=function(){var a=this;return new wd(function(b){return a.subscribe(function(a){return a.accept(b)},function(a){b.onError(a)},function(){b.onCompleted()})},this)},pc.distinctUntilChanged=function(a,b){var c=this;return b||(b=Ha),new wd(function(d){var e,f=!1;return c.subscribe(function(c){var g=c;if(a)try{g=a(c)}catch(h){return void d.onError(h)}if(f)try{var i=b(e,g)}catch(h){return void d.onError(h)}f&&i||(f=!0,e=g,d.onNext(c))},function(a){d.onError(a)},function(){d.onCompleted()})},this)},pc["do"]=pc.tap=pc.doAction=function(a,b,c){var d=this;return new wd(function(e){var f=!a||Ma(a)?oc(a||Ea,b||Ea,c||Ea):a;return d.subscribe(function(a){try{f.onNext(a)}catch(b){e.onError(b)}e.onNext(a)},function(a){try{f.onError(a)}catch(b){e.onError(b)}e.onError(a)},function(){try{f.onCompleted()}catch(a){e.onError(a)}e.onCompleted()})},this)},pc.doOnNext=pc.tapOnNext=function(a,b){return this.tap("undefined"!=typeof b?function(c){a.call(b,c)}:a)},pc.doOnError=pc.tapOnError=function(a,b){return this.tap(Ea,"undefined"!=typeof b?function(c){a.call(b,c)}:a)},pc.doOnCompleted=pc.tapOnCompleted=function(a,b){return this.tap(Ea,null,"undefined"!=typeof b?function(){a.call(b)}:a)},pc["finally"]=pc.ensure=function(a){var b=this;return new wd(function(c){var d;try{d=b.subscribe(c)}catch(e){throw a(),e}return Mb(function(){try{d.dispose()}catch(b){throw b}finally{a()}})},this)},pc.finallyAction=function(a){return this.ensure(a)},pc.ignoreElements=function(){var a=this;return new wd(function(b){return a.subscribe(Ea,function(a){b.onError(a)},function(){b.onCompleted()})},a)},pc.materialize=function(){var a=this;return new wd(function(b){return a.subscribe(function(a){b.onNext(gc(a))},function(a){b.onNext(hc(a)),b.onCompleted()},function(){b.onNext(ic()),b.onCompleted()})},a)},pc.repeat=function(a){return lc(this,a).concat()},pc.retry=function(a){return lc(this,a).catchError()},pc.retryWhen=function(a){return lc(this).catchErrorWhen(a)},pc.scan=function(){var a,b,c=!1,d=this;return 2===arguments.length?(c=!0,a=arguments[0],b=arguments[1]):b=arguments[0],new wd(function(e){var f,g,h;return d.subscribe(function(d){!h&&(h=!0);try{f?g=b(g,d):(g=c?b(a,d):d,f=!0)}catch(i){return void e.onError(i)}e.onNext(g)},function(a){e.onError(a)},function(){!h&&c&&e.onNext(a),e.onCompleted()})},d)},pc.skipLast=function(a){if(0>a)throw new Ua;var b=this;return new wd(function(c){var d=[];return b.subscribe(function(b){d.push(b),d.length>a&&c.onNext(d.shift())},function(a){c.onError(a)},function(){c.onCompleted()})},b)},pc.startWith=function(){var a,b=0;arguments.length&&Wb(arguments[0])?(a=arguments[0],b=1):a=$b;for(var c=[],d=b,e=arguments.length;e>d;d++)c.push(arguments[d]);return mc([Hc(c,a),this]).concat()},pc.takeLast=function(a){if(0>a)throw new Ua;var b=this;return new wd(function(c){var d=[];return b.subscribe(function(b){d.push(b),d.length>a&&d.shift()},function(a){c.onError(a)},function(){for(;d.length>0;)c.onNext(d.shift());c.onCompleted()})},b)},pc.takeLastBuffer=function(a){var b=this;return new wd(function(c){var d=[];return b.subscribe(function(b){d.push(b),d.length>a&&d.shift()},function(a){c.onError(a)},function(){c.onNext(d),c.onCompleted()})},b)},pc.windowWithCount=function(a,b){var c=this;if(+a||(a=0),Math.abs(a)===1/0&&(a=0),0>=a)throw new Ua;if(null==b&&(b=a),+b||(b=0),Math.abs(b)===1/0&&(b=0),0>=b)throw new Ua;return new wd(function(d){function e(){var a=new zd;i.push(a),d.onNext(Fb(a,g))}var f=new Qb,g=new Sb(f),h=0,i=[];return e(),f.setDisposable(c.subscribe(function(c){for(var d=0,f=i.length;f>d;d++)i[d].onNext(c);var g=h-a+1;g>=0&&g%b===0&&i.shift().onCompleted(),++h%b===0&&e()},function(a){for(;i.length>0;)i.shift().onError(a);d.onError(a)},function(){for(;i.length>0;)i.shift().onCompleted();d.onCompleted()})),g},c)},pc.selectConcat=pc.concatMap=function(a,b,c){return Ma(a)&&Ma(b)?this.concatMap(function(c,d){var e=a(c,d);return Ka(e)&&(e=xc(e)),(ab(e)||_a(e))&&(e=Fc(e)),e.map(function(a,e){return b(c,a,d,e)})}):Ma(a)?M(this,a,c):M(this,function(){return a})},pc.concatMapObserver=pc.selectConcatObserver=function(a,b,c,d){var e=this,f=cb(a,d,2),g=cb(b,d,1),h=cb(c,d,0);return new wd(function(a){var b=0;return e.subscribe(function(c){var d;try{d=f(c,b++)}catch(e){return void a.onError(e)}Ka(d)&&(d=xc(d)),a.onNext(d)},function(b){var c;try{c=g(b)}catch(d){return void a.onError(d)}Ka(c)&&(c=xc(c)),a.onNext(c),a.onCompleted()},function(){var b;try{b=h()}catch(c){return void a.onError(c)}Ka(b)&&(b=xc(b)),a.onNext(b),a.onCompleted()})},this).concatAll()},pc.defaultIfEmpty=function(b){var c=this;return b===a&&(b=null),new wd(function(a){var d=!1;return c.subscribe(function(b){d=!0,a.onNext(b)},function(b){a.onError(b)},function(){!d&&a.onNext(b),a.onCompleted()})},c)},O.prototype.push=function(a){var b=-1===N(this.set,a,this.comparer);return b&&this.set.push(a),b},pc.distinct=function(a,b){var c=this;return b||(b=Ha),new wd(function(d){var e=new O(b);return c.subscribe(function(b){var c=b;if(a)try{c=a(b)}catch(f){return void d.onError(f)}e.push(c)&&d.onNext(b)},function(a){d.onError(a)},function(){d.onCompleted()})},this)},pc.groupBy=function(a,b,c){return this.groupByUntil(a,b,Jc,c)},pc.groupByUntil=function(a,b,c,d){var e=this;return b||(b=Fa),d||(d=Ha),new wd(function(f){function g(a){return function(b){b.onError(a)}}var h=new qd(0,d),i=new Jb,j=new Sb(i);return i.add(e.subscribe(function(d){var e;try{e=a(d)}catch(k){return h.getValues().forEach(g(k)),void f.onError(k)}var l=!1,m=h.tryGetValue(e);if(m||(m=new zd,h.set(e,m),l=!0),l){var n=new yd(e,m,j),o=new yd(e,m);try{duration=c(o)}catch(k){return h.getValues().forEach(g(k)),void f.onError(k)}f.onNext(n);var p=new Qb;i.add(p);var q=function(){h.remove(e)&&m.onCompleted(),i.remove(p)};p.setDisposable(duration.take(1).subscribe(Ea,function(a){h.getValues().forEach(g(a)),f.onError(a)},q))}var r;try{r=b(d)}catch(k){return h.getValues().forEach(g(k)),void f.onError(k)}m.onNext(r)},function(a){h.getValues().forEach(g(a)),f.onError(a)},function(){h.getValues().forEach(function(a){a.onCompleted()}),f.onCompleted()})),j},e)};var _c=function(a){function b(b,c,d){this.source=b,this.selector=cb(c,d,3),a.call(this)}return Db(b,a),b.prototype.internalMap=function(a,c){var d=this;return new b(this.source,function(b,c,e){return a.call(this,d.selector(b,c,e),c,e)},c)},b.prototype.subscribeCore=function(a){return this.source.subscribe(new P(a,this.selector,this))},b}(wc);P.prototype.onNext=function(a){if(!this.isStopped){var b=p(this.selector).call(this,a,this.i++,this.source);return b===Gb?this.observer.onError(b.e):void this.observer.onNext(b)}},P.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.observer.onError(a))},P.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.observer.onCompleted())},P.prototype.dispose=function(){this.isStopped=!0},P.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.observer.onError(a),!0)},pc.map=pc.select=function(a,b){var c="function"==typeof a?a:function(){return a};return this instanceof _c?this.internalMap(c,b):new _c(this,c,b)},pc.pluck=function(){var b=arguments,c=arguments.length;if(0===c)throw new Error("List of properties cannot be empty.");return this.map(function(d){for(var e=d,f=0;c>f;f++){var g=e[b[f]];if("undefined"==typeof g)return a;e=g}return e})},pc.selectMany=pc.flatMap=function(a,b,c){return Ma(a)&&Ma(b)?this.flatMap(function(c,d){var e=a(c,d);return Ka(e)&&(e=xc(e)),(ab(e)||_a(e))&&(e=Fc(e)),e.map(function(a,e){return b(c,a,d,e)})},c):Ma(a)?Q(this,a,c):Q(this,function(){return a})},pc.flatMapObserver=pc.selectManyObserver=function(a,b,c,d){var e=this;return new wd(function(f){var g=0;return e.subscribe(function(b){var c;try{c=a.call(d,b,g++)}catch(e){return void f.onError(e)}Ka(c)&&(c=xc(c)),f.onNext(c)},function(a){var c;try{c=b.call(d,a)}catch(e){return void f.onError(e)}Ka(c)&&(c=xc(c)),f.onNext(c),f.onCompleted()},function(){var a;try{a=c.call(d)}catch(b){return void f.onError(b)}Ka(a)&&(a=xc(a)),f.onNext(a),f.onCompleted()})},e).mergeAll()},pc.selectSwitch=pc.flatMapLatest=pc.switchMap=function(a,b){return this.select(a,b).switchLatest()},pc.skip=function(a){if(0>a)throw new Ua;var b=this;return new wd(function(c){var d=a;return b.subscribe(function(a){0>=d?c.onNext(a):d--},function(a){c.onError(a)},function(){c.onCompleted()})},b)},pc.skipWhile=function(a,b){var c=this,d=cb(a,b,3);return new wd(function(a){var b=0,e=!1;return c.subscribe(function(f){if(!e)try{e=!d(f,b++,c)}catch(g){return void a.onError(g)}e&&a.onNext(f)},function(b){a.onError(b)},function(){a.onCompleted()})},c)},pc.take=function(a,b){if(0>a)throw new Ua;if(0===a)return Bc(b);var c=this;return new wd(function(b){var d=a;return c.subscribe(function(a){d-->0&&(b.onNext(a),0===d&&b.onCompleted())},function(a){b.onError(a)},function(){b.onCompleted()})},c)},pc.takeWhile=function(a,b){var c=this,d=cb(a,b,3);return new wd(function(a){var b=0,e=!0;return c.subscribe(function(f){if(e){try{e=d(f,b++,c)}catch(g){return void a.onError(g)}e?a.onNext(f):a.onCompleted()}},function(b){a.onError(b)},function(){a.onCompleted()})},c)};var ad=function(a){function b(b,c,d){this.source=b,this.predicate=cb(c,d,3),a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){return this.source.subscribe(new R(a,this.predicate,this))},b.prototype.internalFilter=function(a,c){var d=this;return new b(this.source,function(b,c,e){return d.predicate(b,c,e)&&a.call(this,b,c,e)},c)},b}(wc);R.prototype.onNext=function(a){if(!this.isStopped){var b=p(this.predicate).call(this,a,this.i++,this.source);return b===Gb?this.observer.onError(b.e):void(b&&this.observer.onNext(a))}},R.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.observer.onError(a))},R.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.observer.onCompleted())},R.prototype.dispose=function(){this.isStopped=!0},R.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.observer.onError(a),!0)},pc.filter=pc.where=function(a,b){return this instanceof ad?this.internalFilter(a,b):new ad(this,a,b)},pc.aggregate=function(){var a,b,c=!1,d=this;return 2===arguments.length?(c=!0,b=arguments[0],a=arguments[1]):a=arguments[0],new wd(function(e){var f,g,h;return d.subscribe(function(d){
!h&&(h=!0);try{f?g=a(g,d):(g=c?a(b,d):d,f=!0)}catch(i){return e.onError(i)}},function(a){e.onError(a)},function(){h&&e.onNext(g),!h&&c&&e.onNext(b),!h&&!c&&e.onError(new Sa),e.onCompleted()})},d)},pc.reduce=function(a){var b,c=!1,d=this;return 2===arguments.length&&(c=!0,b=arguments[1]),new wd(function(e){var f,g,h;return d.subscribe(function(d){!h&&(h=!0);try{f?g=a(g,d):(g=c?a(b,d):d,f=!0)}catch(i){return e.onError(i)}},function(a){e.onError(a)},function(){h&&e.onNext(g),!h&&c&&e.onNext(b),!h&&!c&&e.onError(new Sa),e.onCompleted()})},d)},pc.some=function(a,b){var c=this;return a?c.filter(a,b).some():new wd(function(a){return c.subscribe(function(){a.onNext(!0),a.onCompleted()},function(b){a.onError(b)},function(){a.onNext(!1),a.onCompleted()})},c)},pc.any=function(){return this.some.apply(this,arguments)},pc.isEmpty=function(){return this.any().map(La)},pc.every=function(a,b){return this.filter(function(b){return!a(b)},b).some().map(La)},pc.all=function(){return this.every.apply(this,arguments)},pc.includes=function(a,b){function c(a,b){return 0===a&&0===b||a===b||isNaN(a)&&isNaN(b)}var d=this;return new wd(function(e){var f=0,g=+b||0;return Math.abs(g)===1/0&&(g=0),0>g?(e.onNext(!1),e.onCompleted(),Nb):d.subscribe(function(b){f++>=g&&c(b,a)&&(e.onNext(!0),e.onCompleted())},function(a){e.onError(a)},function(){e.onNext(!1),e.onCompleted()})},this)},pc.contains=function(a,b){pc.includes(a,b)},pc.count=function(a,b){return a?this.filter(a,b).count():this.reduce(function(a){return a+1},0)},pc.indexOf=function(a,b){var c=this;return new wd(function(d){var e=0,f=+b||0;return Math.abs(f)===1/0&&(f=0),0>f?(d.onNext(-1),d.onCompleted(),Nb):c.subscribe(function(b){e>=f&&b===a&&(d.onNext(e),d.onCompleted()),e++},function(a){d.onError(a)},function(){d.onNext(-1),d.onCompleted()})},c)},pc.sum=function(a,b){return a&&Ma(a)?this.map(a,b).sum():this.reduce(function(a,b){return a+b},0)},pc.minBy=function(a,b){return b||(b=Ia),S(this,a,function(a,c){return-1*b(a,c)})},pc.min=function(a){return this.minBy(Fa,a).map(function(a){return T(a)})},pc.maxBy=function(a,b){return b||(b=Ia),S(this,a,b)},pc.max=function(a){return this.maxBy(Fa,a).map(function(a){return T(a)})},pc.average=function(a,b){return a&&Ma(a)?this.map(a,b).average():this.reduce(function(a,b){return{sum:a.sum+b,count:a.count+1}},{sum:0,count:0}).map(function(a){if(0===a.count)throw new Sa;return a.sum/a.count})},pc.sequenceEqual=function(a,b){var c=this;return b||(b=Ha),new wd(function(d){var e=!1,f=!1,g=[],h=[],i=c.subscribe(function(a){var c,e;if(h.length>0){e=h.shift();try{c=b(e,a)}catch(i){return void d.onError(i)}c||(d.onNext(!1),d.onCompleted())}else f?(d.onNext(!1),d.onCompleted()):g.push(a)},function(a){d.onError(a)},function(){e=!0,0===g.length&&(h.length>0?(d.onNext(!1),d.onCompleted()):f&&(d.onNext(!0),d.onCompleted()))});(ab(a)||_a(a))&&(a=Fc(a)),Ka(a)&&(a=xc(a));var j=a.subscribe(function(a){var c;if(g.length>0){var f=g.shift();try{c=b(f,a)}catch(i){return void d.onError(i)}c||(d.onNext(!1),d.onCompleted())}else e?(d.onNext(!1),d.onCompleted()):h.push(a)},function(a){d.onError(a)},function(){f=!0,0===h.length&&(g.length>0?(d.onNext(!1),d.onCompleted()):e&&(d.onNext(!0),d.onCompleted()))});return new Jb(i,j)},c)},pc.elementAt=function(a){return U(this,a,!1)},pc.elementAtOrDefault=function(a,b){return U(this,a,!0,b)},pc.single=function(a,b){return a&&Ma(a)?this.where(a,b).single():V(this,!1)},pc.singleOrDefault=function(a,b,c){return a&&Ma(a)?this.filter(a,c).singleOrDefault(null,b):V(this,!0,b)},pc.first=function(a,b){return a?this.where(a,b).first():W(this,!1)},pc.firstOrDefault=function(a,b){return a?this.where(a).firstOrDefault(null,b):W(this,!0,b)},pc.last=function(a,b){return a?this.where(a,b).last():X(this,!1)},pc.lastOrDefault=function(a,b,c){return a?this.where(a,c).lastOrDefault(null,b):X(this,!0,b)},pc.find=function(a,b){return Y(this,a,b,!1)},pc.findIndex=function(a,b){return Y(this,a,b,!0)},pc.toSet=function(){if("undefined"==typeof ya.Set)throw new TypeError;var a=this;return new wd(function(b){var c=new ya.Set;return a.subscribe(function(a){c.add(a)},function(a){b.onError(a)},function(){b.onNext(c),b.onCompleted()})},a)},pc.toMap=function(a,b){if("undefined"==typeof ya.Map)throw new TypeError;var c=this;return new wd(function(d){var e=new ya.Map;return c.subscribe(function(c){var f;try{f=a(c)}catch(g){return void d.onError(g)}var h=c;if(b)try{h=b(c)}catch(g){return void d.onError(g)}e.set(f,h)},function(a){d.onError(a)},function(){d.onNext(e),d.onCompleted()})},c)};var bd="function",cd="throw",yb=Da.internals.isObject,dd=Da.spawn=function(a){var b=ca(a);return function(c){function d(a,b){dc.schedule(c.bind(f,a,b))}function e(a,b){var c;if(arguments.length>2)for(var b=[],h=1,i=arguments.length;i>h;h++)b.push(arguments[h]);if(a)try{c=g[cd](a)}catch(j){return d(j)}if(!a)try{c=g.next(b)}catch(j){return d(j)}if(c.done)return d(null,c.value);if(c.value=Z(c.value,f),typeof c.value!==bd)e(new TypeError("Rx.spawn only supports a function, Promise, Observable, Object or Array."));else{var k=!1;try{c.value.call(f,function(){k||(k=!0,e.apply(f,arguments))})}catch(j){dc.schedule(function(){k||(k=!0,e.call(f,j))})}}}var f=this,g=a;if(b){for(var h=[],i=0,j=arguments.length;j>i;i++)h.push(arguments[i]);var j=h.length,k=j&&typeof h[j-1]===bd;c=k?h.pop():ea,g=a.apply(this,h)}else c=c||ea;e()}};vc.start=function(a,b,c){return ed(a,b,c)()};var ed=vc.toAsync=function(a,b,c){return Wb(c)||(c=dc),function(){var d=arguments,e=new Ad;return c.schedule(function(){var c;try{c=a.apply(b,d)}catch(f){return void e.onError(f)}e.onNext(c),e.onCompleted()}),e.asObservable()}};vc.fromCallback=function(a,b,c){return function(){for(var d=arguments.length,e=new Array(d),f=0;d>f;f++)e[f]=arguments[f];return new wd(function(d){function f(){for(var a=arguments.length,e=new Array(a),f=0;a>f;f++)e[f]=arguments[f];if(c){try{e=c.apply(b,e)}catch(g){return d.onError(g)}d.onNext(e)}else e.length<=1?d.onNext.apply(d,e):d.onNext(e);d.onCompleted()}e.push(f),a.apply(b,e)}).publishLast().refCount()}},vc.fromNodeCallback=function(a,b,c){return function(){for(var d=arguments.length,e=new Array(d),f=0;d>f;f++)e[f]=arguments[f];return new wd(function(d){function f(a){if(a)return void d.onError(a);for(var e=arguments.length,f=[],g=1;e>g;g++)f[g-1]=arguments[g];if(c){try{f=c.apply(b,f)}catch(h){return d.onError(h)}d.onNext(f)}else f.length<=1?d.onNext.apply(d,f):d.onNext(f);d.onCompleted()}e.push(f),a.apply(b,e)}).publishLast().refCount()}},Da.config.useNativeEvents=!1,vc.fromEvent=function(a,b,c){return a.addListener?fd(function(c){a.addListener(b,c)},function(c){a.removeListener(b,c)},c):Da.config.useNativeEvents||"function"!=typeof a.on||"function"!=typeof a.off?new wd(function(d){return ga(a,b,function(a){var b=a;if(c)try{b=c(arguments)}catch(e){return d.onError(e)}d.onNext(b)})}).publish().refCount():fd(function(c){a.on(b,c)},function(c){a.off(b,c)},c)};var fd=vc.fromEventPattern=function(a,b,c){return new wd(function(d){function e(a){var b=a;if(c)try{b=c(arguments)}catch(e){return d.onError(e)}d.onNext(b)}var f=a(e);return Mb(function(){b&&b(e,f)})}).publish().refCount()};vc.startAsync=function(a){var b;try{b=a()}catch(c){return Qc(c)}return xc(b)};var gd=function(a){function b(a){var b=this.source.publish(),c=b.subscribe(a),d=Nb,e=this.pauser.distinctUntilChanged().subscribe(function(a){a?d=b.connect():(d.dispose(),d=Nb)});return new Jb(c,d,e)}function c(c,d){this.source=c,this.controller=new zd,this.pauser=d&&d.subscribe?this.controller.merge(d):this.controller,a.call(this,b,c)}return Db(c,a),c.prototype.pause=function(){this.controller.onNext(!1)},c.prototype.resume=function(){this.controller.onNext(!0)},c}(vc);pc.pausable=function(a){return new gd(this,a)};var hd=function(b){function c(b){var c,d=[],e=ha(this.source,this.pauser.distinctUntilChanged().startWith(!1),function(a,b){return{data:a,shouldFire:b}}).subscribe(function(e){if(c!==a&&e.shouldFire!=c){if(c=e.shouldFire,e.shouldFire)for(;d.length>0;)b.onNext(d.shift())}else c=e.shouldFire,e.shouldFire?b.onNext(e.data):d.push(e.data)},function(a){for(;d.length>0;)b.onNext(d.shift());b.onError(a)},function(){for(;d.length>0;)b.onNext(d.shift());b.onCompleted()});return e}function d(a,d){this.source=a,this.controller=new zd,this.pauser=d&&d.subscribe?this.controller.merge(d):this.controller,b.call(this,c,a)}return Db(d,b),d.prototype.pause=function(){this.controller.onNext(!1)},d.prototype.resume=function(){this.controller.onNext(!0)},d}(vc);pc.pausableBuffered=function(a){return new hd(this,a)};var id=function(a){function b(a){return this.source.subscribe(a)}function c(c,d,e){a.call(this,b,c),this.subject=new jd(d,e),this.source=c.multicast(this.subject).refCount()}return Db(c,a),c.prototype.request=function(a){return this.subject.request(null==a?-1:a)},c}(vc),jd=function(a){function b(a){return this.subject.subscribe(a)}function c(c,d){null==c&&(c=!0),a.call(this,b),this.subject=new zd,this.enableQueue=c,this.queue=c?[]:null,this.requestedCount=0,this.requestedDisposable=Nb,this.error=null,this.hasFailed=!1,this.hasCompleted=!1,this.scheduler=d||_b}return Db(c,a),Eb(c.prototype,nc,{onCompleted:function(){this.hasCompleted=!0,this.enableQueue&&0!==this.queue.length?this.queue.push(fc.createOnCompleted()):this.subject.onCompleted()},onError:function(a){this.hasFailed=!0,this.error=a,this.enableQueue&&0!==this.queue.length?this.queue.push(fc.createOnError(a)):this.subject.onError(a)},onNext:function(a){var b=!1;0===this.requestedCount?this.enableQueue&&this.queue.push(fc.createOnNext(a)):(-1!==this.requestedCount&&0===this.requestedCount--&&this.disposeCurrentRequest(),b=!0),b&&this.subject.onNext(a)},_processRequest:function(a){if(this.enableQueue){for(;this.queue.length>=a&&a>0||this.queue.length>0&&"N"!==this.queue[0].kind;){var b=this.queue.shift();b.accept(this.subject),"N"===b.kind?a--:(this.disposeCurrentRequest(),this.queue=[])}return{numberOfItems:a,returnValue:0!==this.queue.length}}return{numberOfItems:a,returnValue:!1}},request:function(a){this.disposeCurrentRequest();var b=this;return this.requestedDisposable=this.scheduler.scheduleWithState(a,function(a,c){var d=b._processRequest(c),e=d.numberOfItems;d.returnValue||(b.requestedCount=e,b.requestedDisposable=Mb(function(){b.requestedCount=0}))}),this.requestedDisposable},disposeCurrentRequest:function(){this.requestedDisposable.dispose(),this.requestedDisposable=Nb}}),c}(vc);pc.controlled=function(a,b){return a&&Wb(a)&&(b=a,a=!0),null==a&&(a=!0),new id(this,a,b)};var kd=function(a){function b(a){this.subscription=this.source.subscribe(new d(a,this,this.subscription));var b=this;return dc.schedule(function(){b.source.request(1)}),this.subscription}function c(c){a.call(this,b,c),this.source=c}Db(c,a);var d=function(a){function b(b,c,d){a.call(this),this.observer=b,this.observable=c,this.cancel=d}Db(b,a);var c=b.prototype;return c.completed=function(){this.observer.onCompleted(),this.dispose()},c.error=function(a){this.observer.onError(a),this.dispose()},c.next=function(a){this.observer.onNext(a);var b=this;dc.schedule(function(){b.observable.source.request(1)})},c.dispose=function(){this.observer=null,this.cancel&&(this.cancel.dispose(),this.cancel=null),a.prototype.dispose.call(this)},b}(qc);return c}(vc);id.prototype.stopAndWait=function(){return new kd(this)};var ld=function(a){function b(a){this.subscription=this.source.subscribe(new d(a,this,this.subscription));var b=this;return dc.schedule(function(){b.source.request(b.windowSize)}),this.subscription}function c(c,d){a.call(this,b,c),this.source=c,this.windowSize=d}Db(c,a);var d=function(a){function b(a,b,c){this.observer=a,this.observable=b,this.cancel=c,this.received=0}Db(b,a);var c=b.prototype;return c.completed=function(){this.observer.onCompleted(),this.dispose()},c.error=function(a){this.observer.onError(a),this.dispose()},c.next=function(a){if(this.observer.onNext(a),this.received=++this.received%this.observable.windowSize,0===this.received){var b=this;dc.schedule(function(){b.observable.source.request(b.observable.windowSize)})}},c.dispose=function(){this.observer=null,this.cancel&&(this.cancel.dispose(),this.cancel=null),a.prototype.dispose.call(this)},b}(qc);return c}(vc);id.prototype.windowed=function(a){return new ld(this,a)},pc.pipe=function(a){function b(){c.resume()}var c=this.pausableBuffered();return a.addListener("drain",b),c.subscribe(function(b){!a.write(String(b))&&c.pause()},function(b){a.emit("error",b)},function(){!a._isStdio&&a.end(),a.removeListener("drain",b)}),c.resume(),a},pc.multicast=function(a,b){var c=this;return"function"==typeof a?new wd(function(d){var e=c.multicast(a());return new Jb(b(e).subscribe(d),e.connect())},c):new pd(c,a)},pc.publish=function(a){return a&&Ma(a)?this.multicast(function(){return new zd},a):this.multicast(new zd)},pc.share=function(){return this.publish().refCount()},pc.publishLast=function(a){return a&&Ma(a)?this.multicast(function(){return new Ad},a):this.multicast(new Ad)},pc.publishValue=function(a,b){return 2===arguments.length?this.multicast(function(){return new nd(b)},a):this.multicast(new nd(a))},pc.shareValue=function(a){return this.publishValue(a).refCount()},pc.replay=function(a,b,c,d){return a&&Ma(a)?this.multicast(function(){return new od(b,c,d)},a):this.multicast(new od(b,c,d))},pc.shareReplay=function(a,b,c){return this.replay(null,a,b,c).refCount()};var md=function(a,b){this.subject=a,this.observer=b};md.prototype.dispose=function(){if(!this.subject.isDisposed&&null!==this.observer){var a=this.subject.observers.indexOf(this.observer);this.subject.observers.splice(a,1),this.observer=null}};var nd=Da.BehaviorSubject=function(a){function c(a){return Pb(this),this.isStopped?(this.hasError?a.onError(this.error):a.onCompleted(),Nb):(this.observers.push(a),a.onNext(this.value),new md(this,a))}function d(b){a.call(this,c),this.value=b,this.observers=[],this.isDisposed=!1,this.isStopped=!1,this.hasError=!1}return Db(d,a),Eb(d.prototype,nc,{getValue:function(){if(Pb(this),this.hasError)throw this.error;return this.value},hasObservers:function(){return this.observers.length>0},onCompleted:function(){if(Pb(this),!this.isStopped){this.isStopped=!0;for(var a=0,c=b(this.observers),d=c.length;d>a;a++)c[a].onCompleted();this.observers.length=0}},onError:function(a){if(Pb(this),!this.isStopped){this.isStopped=!0,this.hasError=!0,this.error=a;for(var c=0,d=b(this.observers),e=d.length;e>c;c++)d[c].onError(a);this.observers.length=0}},onNext:function(a){if(Pb(this),!this.isStopped){this.value=a;for(var c=0,d=b(this.observers),e=d.length;e>c;c++)d[c].onNext(a)}},dispose:function(){this.isDisposed=!0,this.observers=null,this.value=null,this.exception=null}}),d}(vc),od=Da.ReplaySubject=function(a){function c(a,b){return Mb(function(){b.dispose(),!a.isDisposed&&a.observers.splice(a.observers.indexOf(b),1)})}function d(a){var b=new tc(this.scheduler,a),d=c(this,b);Pb(this),this._trim(this.scheduler.now()),this.observers.push(b);for(var e=0,f=this.q.length;f>e;e++)b.onNext(this.q[e].value);return this.hasError?b.onError(this.error):this.isStopped&&b.onCompleted(),b.ensureActive(),d}function e(b,c,e){this.bufferSize=null==b?f:b,this.windowSize=null==c?f:c,this.scheduler=e||_b,this.q=[],this.observers=[],this.isStopped=!1,this.isDisposed=!1,this.hasError=!1,this.error=null,a.call(this,d)}var f=Math.pow(2,53)-1;return Db(e,a),Eb(e.prototype,nc.prototype,{hasObservers:function(){return this.observers.length>0},_trim:function(a){for(;this.q.length>this.bufferSize;)this.q.shift();for(;this.q.length>0&&a-this.q[0].interval>this.windowSize;)this.q.shift()},onNext:function(a){if(Pb(this),!this.isStopped){var c=this.scheduler.now();this.q.push({interval:c,value:a}),this._trim(c);for(var d=0,e=b(this.observers),f=e.length;f>d;d++){var g=e[d];g.onNext(a),g.ensureActive()}}},onError:function(a){if(Pb(this),!this.isStopped){this.isStopped=!0,this.error=a,this.hasError=!0;var c=this.scheduler.now();this._trim(c);for(var d=0,e=b(this.observers),f=e.length;f>d;d++){var g=e[d];g.onError(a),g.ensureActive()}this.observers.length=0}},onCompleted:function(){if(Pb(this),!this.isStopped){this.isStopped=!0;var a=this.scheduler.now();this._trim(a);for(var c=0,d=b(this.observers),e=d.length;e>c;c++){var f=d[c];f.onCompleted(),f.ensureActive()}this.observers.length=0}},dispose:function(){this.isDisposed=!0,this.observers=null}}),e}(vc),pd=Da.ConnectableObservable=function(a){function b(b,c){var d,e=!1,f=b.asObservable();this.connect=function(){return e||(e=!0,d=new Jb(f.subscribe(c),Mb(function(){e=!1}))),d},a.call(this,function(a){return c.subscribe(a)})}return Db(b,a),b.prototype.refCount=function(){var a,b=0,c=this;return new wd(function(d){var e=1===++b,f=c.subscribe(d);return e&&(a=c.connect()),function(){f.dispose(),0===--b&&a.dispose()}})},b}(vc),qd=function(){function b(a){if(0===(1&a))return 2===a;for(var b=Math.sqrt(a),c=3;b>=c;){if(a%c===0)return!1;c+=2}return!0}function c(a){var c,d,e;for(c=0;c<h.length;++c)if(d=h[c],d>=a)return d;for(e=1|a;e<h[h.length-1];){if(b(e))return e;e+=2}return a}function d(a){var b=757602046;if(!a.length)return b;for(var c=0,d=a.length;d>c;c++){var e=a.charCodeAt(c);b=(b<<5)-b+e,b&=b}return b}function e(a){var b=668265261;return a=61^a^a>>>16,a+=a<<3,a^=a>>>4,a*=b,a^=a>>>15}function f(){return{key:null,value:null,next:0,hashCode:0}}function g(a,b){if(0>a)throw new Ua;a>0&&this._initialize(a),this.comparer=b||Ha,this.freeCount=0,this.size=0,this.freeList=-1}var h=[1,3,7,13,31,61,127,251,509,1021,2039,4093,8191,16381,32749,65521,131071,262139,524287,1048573,2097143,4194301,8388593,16777213,33554393,67108859,134217689,268435399,536870909,1073741789,2147483647],i="no such key",j="duplicate key",k=function(){var a=0;return function(b){if(null==b)throw new Error(i);if("string"==typeof b)return d(b);if("number"==typeof b)return e(b);if("boolean"==typeof b)return b===!0?1:0;if(b instanceof Date)return e(b.valueOf());if(b instanceof RegExp)return d(b.toString());if("function"==typeof b.valueOf){var c=b.valueOf();if("number"==typeof c)return e(c);if("string"==typeof c)return d(c)}if(b.hashCode)return b.hashCode();var f=17*a++;return b.hashCode=function(){return f},f}}(),l=g.prototype;return l._initialize=function(a){var b,d=c(a);for(this.buckets=new Array(d),this.entries=new Array(d),b=0;d>b;b++)this.buckets[b]=-1,this.entries[b]=f();this.freeList=-1},l.add=function(a,b){this._insert(a,b,!0)},l._insert=function(a,b,c){this.buckets||this._initialize(0);for(var d,e=2147483647&k(a),f=e%this.buckets.length,g=this.buckets[f];g>=0;g=this.entries[g].next)if(this.entries[g].hashCode===e&&this.comparer(this.entries[g].key,a)){if(c)throw new Error(j);return void(this.entries[g].value=b)}this.freeCount>0?(d=this.freeList,this.freeList=this.entries[d].next,--this.freeCount):(this.size===this.entries.length&&(this._resize(),f=e%this.buckets.length),d=this.size,++this.size),this.entries[d].hashCode=e,this.entries[d].next=this.buckets[f],this.entries[d].key=a,this.entries[d].value=b,this.buckets[f]=d},l._resize=function(){var a=c(2*this.size),b=new Array(a);for(e=0;e<b.length;++e)b[e]=-1;var d=new Array(a);for(e=0;e<this.size;++e)d[e]=this.entries[e];for(var e=this.size;a>e;++e)d[e]=f();for(var g=0;g<this.size;++g){var h=d[g].hashCode%a;d[g].next=b[h],b[h]=g}this.buckets=b,this.entries=d},l.remove=function(a){if(this.buckets)for(var b=2147483647&k(a),c=b%this.buckets.length,d=-1,e=this.buckets[c];e>=0;e=this.entries[e].next){if(this.entries[e].hashCode===b&&this.comparer(this.entries[e].key,a))return 0>d?this.buckets[c]=this.entries[e].next:this.entries[d].next=this.entries[e].next,this.entries[e].hashCode=-1,this.entries[e].next=this.freeList,this.entries[e].key=null,this.entries[e].value=null,this.freeList=e,++this.freeCount,!0;d=e}return!1},l.clear=function(){var a,b;if(!(this.size<=0)){for(a=0,b=this.buckets.length;b>a;++a)this.buckets[a]=-1;for(a=0;a<this.size;++a)this.entries[a]=f();this.freeList=-1,this.size=0}},l._findEntry=function(a){if(this.buckets)for(var b=2147483647&k(a),c=this.buckets[b%this.buckets.length];c>=0;c=this.entries[c].next)if(this.entries[c].hashCode===b&&this.comparer(this.entries[c].key,a))return c;return-1},l.count=function(){return this.size-this.freeCount},l.tryGetValue=function(b){var c=this._findEntry(b);return c>=0?this.entries[c].value:a},l.getValues=function(){var a=0,b=[];if(this.entries)for(var c=0;c<this.size;c++)this.entries[c].hashCode>=0&&(b[a++]=this.entries[c].value);return b},l.get=function(a){var b=this._findEntry(a);if(b>=0)return this.entries[b].value;throw new Error(i)},l.set=function(a,b){this._insert(a,b,!1)},l.containskey=function(a){return this._findEntry(a)>=0},g}();pc.join=function(a,b,c,d){var e=this;return new wd(function(f){var g=new Jb,h=!1,i=!1,j=0,k=0,l=new qd,m=new qd;return g.add(e.subscribe(function(a){var c=j++,e=new Qb;l.add(c,a),g.add(e);var i,k=function(){l.remove(c)&&0===l.count()&&h&&f.onCompleted(),g.remove(e)};try{i=b(a)}catch(n){return void f.onError(n)}e.setDisposable(i.take(1).subscribe(Ea,f.onError.bind(f),k)),m.getValues().forEach(function(b){var c;try{c=d(a,b)}catch(e){return void f.onError(e)}f.onNext(c)})},f.onError.bind(f),function(){h=!0,(i||0===l.count())&&f.onCompleted()})),g.add(a.subscribe(function(a){var b=k++,e=new Qb;m.add(b,a),g.add(e);var h,j=function(){m.remove(b)&&0===m.count()&&i&&f.onCompleted(),g.remove(e)};try{h=c(a)}catch(n){return void f.onError(n)}e.setDisposable(h.take(1).subscribe(Ea,f.onError.bind(f),j)),l.getValues().forEach(function(b){var c;try{c=d(b,a)}catch(e){return void f.onError(e)}f.onNext(c)})},f.onError.bind(f),function(){i=!0,(h||0===m.count())&&f.onCompleted()})),g},e)},pc.groupJoin=function(a,b,c,d){var e=this;return new wd(function(f){function g(a){return function(b){b.onError(a)}}var h=new Jb,i=new Sb(h),j=new qd,k=new qd,l=0,m=0;return h.add(e.subscribe(function(a){var c=new zd,e=l++;j.add(e,c);var m;try{m=d(a,Fb(c,i))}catch(n){return j.getValues().forEach(g(n)),void f.onError(n)}f.onNext(m),k.getValues().forEach(function(a){c.onNext(a)});var o=new Qb;h.add(o);var p,q=function(){j.remove(e)&&c.onCompleted(),h.remove(o)};try{p=b(a)}catch(n){return j.getValues().forEach(g(n)),void f.onError(n)}o.setDisposable(p.take(1).subscribe(Ea,function(a){j.getValues().forEach(g(a)),f.onError(a)},q))},function(a){j.getValues().forEach(g(a)),f.onError(a)},f.onCompleted.bind(f))),h.add(a.subscribe(function(a){var b=m++;k.add(b,a);var d=new Qb;h.add(d);var e,i=function(){k.remove(b),h.remove(d)};try{e=c(a)}catch(l){return j.getValues().forEach(g(l)),void f.onError(l)}d.setDisposable(e.take(1).subscribe(Ea,function(a){j.getValues().forEach(g(a)),f.onError(a)},i)),j.getValues().forEach(function(b){b.onNext(a)})},function(a){j.getValues().forEach(g(a)),f.onError(a)})),i},e)},pc.buffer=function(){return this.window.apply(this,arguments).selectMany(function(a){return a.toArray()})},pc.window=function(a,b){return 1===arguments.length&&"function"!=typeof arguments[0]?ja.call(this,a):"function"==typeof a?ka.call(this,a):ia.call(this,a,b)},pc.pairwise=function(){var a=this;return new wd(function(b){var c,d=!1;return a.subscribe(function(a){d?b.onNext([c,a]):d=!0,c=a},b.onError.bind(b),b.onCompleted.bind(b))},a)},pc.partition=function(a,b){return[this.filter(a,b),this.filter(function(c,d,e){return!a.call(b,c,d,e)})]},pc.letBind=pc.let=function(a){return a(this)},vc["if"]=vc.ifThen=function(a,b,c){return zc(function(){return c||(c=Bc()),Ka(b)&&(b=xc(b)),Ka(c)&&(c=xc(c)),"function"==typeof c.now&&(c=Bc(c)),a()?b:c})},vc["for"]=vc.forIn=function(a,b,c){return mc(a,b,c).concat()};var rd=vc["while"]=vc.whileDo=function(a,b){return Ka(b)&&(b=xc(b)),la(a,b).concat()};pc.doWhile=function(a){return Tc([this,rd(a,this)])},vc["case"]=vc.switchCase=function(a,b,c){return zc(function(){Ka(c)&&(c=xc(c)),c||(c=Bc()),"function"==typeof c.now&&(c=Bc(c));var d=b[a()];return Ka(d)&&(d=xc(d)),d||c})},pc.expand=function(a,b){Wb(b)||(b=$b);var c=this;return new wd(function(d){var e=[],f=new Rb,g=new Jb(f),h=0,i=!1,j=function(){var c=!1;e.length>0&&(c=!i,i=!0),c&&f.setDisposable(b.scheduleRecursive(function(b){var c;if(!(e.length>0))return void(i=!1);c=e.shift();var f=new Qb;g.add(f),f.setDisposable(c.subscribe(function(b){d.onNext(b);var c=null;try{c=a(b)}catch(f){d.onError(f)}e.push(c),h++,j()},d.onError.bind(d),function(){g.remove(f),h--,0===h&&d.onCompleted()})),b()}))};return e.push(c),h++,j(),g},this)},vc.forkJoin=function(){var a=[];if(Array.isArray(arguments[0]))a=arguments[0];else for(var b=0,c=arguments.length;c>b;b++)a.push(arguments[b]);return new wd(function(b){var c=a.length;if(0===c)return b.onCompleted(),Nb;for(var d=new Jb,e=!1,f=new Array(c),g=new Array(c),h=new Array(c),i=0;c>i;i++)!function(i){var j=a[i];Ka(j)&&(j=xc(j)),d.add(j.subscribe(function(a){e||(f[i]=!0,h[i]=a)},function(a){e=!0,b.onError(a),d.dispose()},function(){if(!e){if(!f[i])return void b.onCompleted();g[i]=!0;for(var a=0;c>a;a++)if(!g[a])return;e=!0,b.onNext(h),b.onCompleted()}}))}(i);return d})},pc.forkJoin=function(a,b){var c=this;return new wd(function(d){var e,f,g=!1,h=!1,i=!1,j=!1,k=new Qb,l=new Qb;return Ka(a)&&(a=xc(a)),k.setDisposable(c.subscribe(function(a){i=!0,e=a},function(a){l.dispose(),d.onError(a)},function(){if(g=!0,h)if(i)if(j){var a;try{a=b(e,f)}catch(c){return void d.onError(c)}d.onNext(a),d.onCompleted()}else d.onCompleted();else d.onCompleted()})),l.setDisposable(a.subscribe(function(a){j=!0,f=a},function(a){k.dispose(),d.onError(a)},function(){if(h=!0,g)if(i)if(j){var a;try{a=b(e,f)}catch(c){return void d.onError(c)}d.onNext(a),d.onCompleted()}else d.onCompleted();else d.onCompleted()})),new Jb(k,l)},c)},pc.manySelect=function(a,b){Wb(b)||(b=$b);var c=this;return zc(function(){var d;return c.map(function(a){var b=new sd(a);return d&&d.onNext(a),d=b,b}).tap(Ea,function(a){d&&d.onError(a)},function(){d&&d.onCompleted()}).observeOn(b).map(a)},c)};var sd=function(a){function b(a){var b=this,c=new Jb;return c.add(_b.schedule(function(){a.onNext(b.head),c.add(b.tail.mergeAll().subscribe(a))})),c}function c(c){a.call(this,b),this.head=c,this.tail=new Ad}return Db(c,a),Eb(c.prototype,nc,{onCompleted:function(){this.onNext(vc.empty())},onError:function(a){this.onNext(vc.throwError(a))},onNext:function(a){this.tail.onNext(a),this.tail.onCompleted()}}),c}(vc),td=ya.Map||function(){function b(){this._keys=[],this._values=[]}return b.prototype.get=function(b){var c=this._keys.indexOf(b);return-1!==c?this._values[c]:a},b.prototype.set=function(a,b){var c=this._keys.indexOf(a);-1!==c&&(this._values[c]=b),this._values[this._keys.push(a)-1]=b},b.prototype.forEach=function(a,b){for(var c=0,d=this._keys.length;d>c;c++)a.call(b,this._values[c],this._keys[c])},b}();ma.prototype.and=function(a){return new ma(this.patterns.concat(a))},ma.prototype.thenDo=function(a){return new na(this,a)},na.prototype.activate=function(a,b,c){for(var d=this,e=[],f=0,g=this.expression.patterns.length;g>f;f++)e.push(oa(a,this.expression.patterns[f],b.onError.bind(b)));var h=new pa(e,function(){var a;try{a=d.selector.apply(d,arguments)}catch(c){return void b.onError(c)}b.onNext(a)},function(){for(var a=0,b=e.length;b>a;a++)e[a].removeActivePlan(h);c(h)});for(f=0,g=e.length;g>f;f++)e[f].addActivePlan(h);return h},pa.prototype.dequeue=function(){this.joinObservers.forEach(function(a){a.queue.shift()})},pa.prototype.match=function(){var a,b,c=!0;for(a=0,b=this.joinObserverArray.length;b>a;a++)if(0===this.joinObserverArray[a].queue.length){c=!1;break}if(c){var d=[],e=!1;for(a=0,b=this.joinObserverArray.length;b>a;a++)d.push(this.joinObserverArray[a].queue[0]),"C"===this.joinObserverArray[a].queue[0].kind&&(e=!0);if(e)this.onCompleted();else{this.dequeue();var f=[];for(a=0,b=d.length;a<d.length;a++)f.push(d[a].value);this.onNext.apply(this,f)}}};var ud=function(a){function b(b,c){a.call(this),this.source=b,this.onError=c,this.queue=[],this.activePlans=[],this.subscription=new Qb,this.isDisposed=!1}Db(b,a);var c=b.prototype;return c.next=function(a){if(!this.isDisposed){if("E"===a.kind)return this.onError(a.exception);this.queue.push(a);for(var b=this.activePlans.slice(0),c=0,d=b.length;d>c;c++)b[c].match()}},c.error=Ea,c.completed=Ea,c.addActivePlan=function(a){this.activePlans.push(a)},c.subscribe=function(){this.subscription.setDisposable(this.source.materialize().subscribe(this))},c.removeActivePlan=function(a){this.activePlans.splice(this.activePlans.indexOf(a),1),0===this.activePlans.length&&this.dispose()},c.dispose=function(){a.prototype.dispose.call(this),this.isDisposed||(this.isDisposed=!0,this.subscription.dispose())},b}(qc);pc.and=function(a){return new ma([this,a])},pc.thenDo=function(a){return new ma([this]).thenDo(a)},vc.when=function(){var a,b=arguments.length;if(Array.isArray(arguments[0]))a=arguments[0];else{a=new Array(b);for(var c=0;b>c;c++)a[c]=arguments[c]}return new wd(function(b){var c=[],d=new td,e=oc(function(a){b.onNext(a)},function(a){d.forEach(function(b){b.onError(a)}),b.onError(a)},function(){b.onCompleted()});try{for(var f=0,g=a.length;g>f;f++)c.push(a[f].activate(d,e,function(a){var d=c.indexOf(a);c.splice(d,1),0===c.length&&b.onCompleted()}))}catch(h){Qc(h).subscribe(b)}var i=new Jb;return d.forEach(function(a){a.subscribe(),i.add(a)}),i})};{var vd=vc.interval=function(a,b){return ta(a,a,Wb(b)?b:dc)};vc.timer=function(b,c,d){var e;return Wb(d)||(d=dc),c!==a&&"number"==typeof c?e=c:Wb(c)&&(d=c),b instanceof Date&&e===a?qa(b.getTime(),d):b instanceof Date&&e!==a?(e=c,ra(b.getTime(),e,d)):e===a?sa(b,d):ta(b,e,d)}}pc.delay=function(a,b){return Wb(b)||(b=dc),a instanceof Date?va(this,a.getTime(),b):ua(this,a,b)},pc.debounce=pc.throttleWithTimeout=function(a,b){Wb(b)||(b=dc);var c=this;return new wd(function(d){var e,f=new Rb,g=!1,h=0,i=c.subscribe(function(c){g=!0,e=c,h++;var i=h,j=new Qb;f.setDisposable(j),j.setDisposable(b.scheduleWithRelative(a,function(){g&&h===i&&d.onNext(e),g=!1}))},function(a){f.dispose(),d.onError(a),g=!1,h++},function(){f.dispose(),g&&d.onNext(e),d.onCompleted(),g=!1,h++});return new Jb(i,f)},this)},pc.throttle=function(a,b){return this.debounce(a,b)},pc.windowWithTime=function(a,b,c){var d,e=this;return null==b&&(d=a),Wb(c)||(c=dc),"number"==typeof b?d=b:Wb(b)&&(d=a,c=b),new wd(function(b){function f(){var a=new Qb,e=!1,g=!1;l.setDisposable(a),j===i?(e=!0,g=!0):i>j?e=!0:g=!0;var n=e?j:i,o=n-m;m=n,e&&(j+=d),g&&(i+=d),a.setDisposable(c.scheduleWithRelative(o,function(){if(g){var a=new zd;k.push(a),b.onNext(Fb(a,h))}e&&k.shift().onCompleted(),f()}))}var g,h,i=d,j=a,k=[],l=new Rb,m=0;return g=new Jb(l),h=new Sb(g),k.push(new zd),b.onNext(Fb(k[0],h)),f(),g.add(e.subscribe(function(a){for(var b=0,c=k.length;c>b;b++)k[b].onNext(a)},function(a){for(var c=0,d=k.length;d>c;c++)k[c].onError(a);b.onError(a)},function(){for(var a=0,c=k.length;c>a;a++)k[a].onCompleted();b.onCompleted()})),h},e)},pc.windowWithTimeOrCount=function(a,b,c){var d=this;return Wb(c)||(c=dc),new wd(function(e){function f(b){var d=new Qb;g.setDisposable(d),d.setDisposable(c.scheduleWithRelative(a,function(){if(b===k){j=0;var a=++k;l.onCompleted(),l=new zd,e.onNext(Fb(l,i)),f(a)}}))}var g=new Rb,h=new Jb(g),i=new Sb(h),j=0,k=0,l=new zd;return e.onNext(Fb(l,i)),f(0),h.add(d.subscribe(function(a){var c=0,d=!1;l.onNext(a),++j===b&&(d=!0,j=0,c=++k,l.onCompleted(),l=new zd,e.onNext(Fb(l,i))),d&&f(c)},function(a){l.onError(a),e.onError(a)},function(){l.onCompleted(),e.onCompleted()})),i},d)},pc.bufferWithTime=function(){return this.windowWithTime.apply(this,arguments).selectMany(function(a){return a.toArray()})},pc.bufferWithTimeOrCount=function(a,b,c){return this.windowWithTimeOrCount(a,b,c).selectMany(function(a){return a.toArray()})},pc.timeInterval=function(a){var b=this;return Wb(a)||(a=dc),zc(function(){var c=a.now();return b.map(function(b){var d=a.now(),e=d-c;return c=d,{value:b,interval:e}})})},pc.timestamp=function(a){return Wb(a)||(a=dc),this.map(function(b){return{value:b,timestamp:a.now()}})},pc.sample=pc.throttleLatest=function(a,b){return Wb(b)||(b=dc),"number"==typeof a?wa(this,vd(a,b)):wa(this,a)},
pc.timeout=function(a,b,c){(null==b||"string"==typeof b)&&(b=Qc(new Error(b||"Timeout"))),Wb(c)||(c=dc);var d=this,e=a instanceof Date?"scheduleWithAbsolute":"scheduleWithRelative";return new wd(function(f){function g(){var d=h;l.setDisposable(c[e](a,function(){h===d&&(Ka(b)&&(b=xc(b)),j.setDisposable(b.subscribe(f)))}))}var h=0,i=new Qb,j=new Rb,k=!1,l=new Rb;return j.setDisposable(i),g(),i.setDisposable(d.subscribe(function(a){k||(h++,f.onNext(a),g())},function(a){k||(h++,f.onError(a))},function(){k||(h++,f.onCompleted())})),new Jb(j,l)},d)},vc.generateWithAbsoluteTime=function(a,b,c,d,e,f){return Wb(f)||(f=dc),new wd(function(g){var h,i,j=!0,k=!1,l=a;return f.scheduleRecursiveWithAbsolute(f.now(),function(a){k&&g.onNext(h);try{j?j=!1:l=c(l),k=b(l),k&&(h=d(l),i=e(l))}catch(f){return void g.onError(f)}k?a(i):g.onCompleted()})})},vc.generateWithRelativeTime=function(a,b,c,d,e,f){return Wb(f)||(f=dc),new wd(function(g){var h,i,j=!0,k=!1,l=a;return f.scheduleRecursiveWithRelative(0,function(a){k&&g.onNext(h);try{j?j=!1:l=c(l),k=b(l),k&&(h=d(l),i=e(l))}catch(f){return void g.onError(f)}k?a(i):g.onCompleted()})})},pc.delaySubscription=function(a,b){var c=a instanceof Date?"scheduleWithAbsolute":"scheduleWithRelative",d=this;return Wb(b)||(b=dc),new wd(function(e){var f=new Rb;return f.setDisposable(b[c](a,function(){f.setDisposable(d.subscribe(e))})),f},this)},pc.delayWithSelector=function(a,b){var c,d,e=this;return Ma(a)?d=a:(c=a,d=b),new wd(function(a){function b(){i.setDisposable(e.subscribe(function(b){var c=p(d)(b);if(c===Gb)return a.onError(c.e);var e=new Qb;g.add(e),e.setDisposable(c.subscribe(function(){a.onNext(b),g.remove(e),f()},function(b){a.onError(b)},function(){a.onNext(b),g.remove(e),f()}))},function(b){a.onError(b)},function(){h=!0,i.dispose(),f()}))}function f(){h&&0===g.length&&a.onCompleted()}var g=new Jb,h=!1,i=new Rb;return c?i.setDisposable(c.subscribe(b,function(b){a.onError(b)},b)):b(),new Jb(i,g)},this)},pc.timeoutWithSelector=function(a,b,c){1===arguments.length&&(b=a,a=Jc()),c||(c=Qc(new Error("Timeout")));var d=this;return new wd(function(e){function f(a){function b(){return k===d}var d=k,f=new Qb;i.setDisposable(f),f.setDisposable(a.subscribe(function(){b()&&h.setDisposable(c.subscribe(e)),f.dispose()},function(a){b()&&e.onError(a)},function(){b()&&h.setDisposable(c.subscribe(e))}))}function g(){var a=!l;return a&&k++,a}var h=new Rb,i=new Rb,j=new Qb;h.setDisposable(j);var k=0,l=!1;return f(a),j.setDisposable(d.subscribe(function(a){if(g()){e.onNext(a);var c;try{c=b(a)}catch(d){return void e.onError(d)}f(Ka(c)?xc(c):c)}},function(a){g()&&e.onError(a)},function(){g()&&e.onCompleted()})),new Jb(h,i)},d)},pc.debounceWithSelector=function(a){var b=this;return new wd(function(c){var d,e=!1,f=new Rb,g=0,h=b.subscribe(function(b){var h;try{h=a(b)}catch(i){return void c.onError(i)}Ka(h)&&(h=xc(h)),e=!0,d=b,g++;var j=g,k=new Qb;f.setDisposable(k),k.setDisposable(h.subscribe(function(){e&&g===j&&c.onNext(d),e=!1,k.dispose()},c.onError.bind(c),function(){e&&g===j&&c.onNext(d),e=!1,k.dispose()}))},function(a){f.dispose(),c.onError(a),e=!1,g++},function(){f.dispose(),e&&c.onNext(d),c.onCompleted(),e=!1,g++});return new Jb(h,f)},b)},pc.throttleWithSelector=function(a){return this.debounceWithSelector(a)},pc.skipLastWithTime=function(a,b){Wb(b)||(b=dc);var c=this;return new wd(function(d){var e=[];return c.subscribe(function(c){var f=b.now();for(e.push({interval:f,value:c});e.length>0&&f-e[0].interval>=a;)d.onNext(e.shift().value)},function(a){d.onError(a)},function(){for(var c=b.now();e.length>0&&c-e[0].interval>=a;)d.onNext(e.shift().value);d.onCompleted()})},c)},pc.takeLastWithTime=function(a,b){var c=this;return Wb(b)||(b=dc),new wd(function(d){var e=[];return c.subscribe(function(c){var d=b.now();for(e.push({interval:d,value:c});e.length>0&&d-e[0].interval>=a;)e.shift()},function(a){d.onError(a)},function(){for(var c=b.now();e.length>0;){var f=e.shift();c-f.interval<=a&&d.onNext(f.value)}d.onCompleted()})},c)},pc.takeLastBufferWithTime=function(a,b){var c=this;return Wb(b)||(b=dc),new wd(function(d){var e=[];return c.subscribe(function(c){var d=b.now();for(e.push({interval:d,value:c});e.length>0&&d-e[0].interval>=a;)e.shift()},function(a){d.onError(a)},function(){for(var c=b.now(),f=[];e.length>0;){var g=e.shift();c-g.interval<=a&&f.push(g.value)}d.onNext(f),d.onCompleted()})},c)},pc.takeWithTime=function(a,b){var c=this;return Wb(b)||(b=dc),new wd(function(d){return new Jb(b.scheduleWithRelative(a,function(){d.onCompleted()}),c.subscribe(d))},c)},pc.skipWithTime=function(a,b){var c=this;return Wb(b)||(b=dc),new wd(function(d){var e=!1;return new Jb(b.scheduleWithRelative(a,function(){e=!0}),c.subscribe(function(a){e&&d.onNext(a)},d.onError.bind(d),d.onCompleted.bind(d)))},c)},pc.skipUntilWithTime=function(a,b){Wb(b)||(b=dc);var c=this,d=a instanceof Date?"scheduleWithAbsolute":"scheduleWithRelative";return new wd(function(e){var f=!1;return new Jb(b[d](a,function(){f=!0}),c.subscribe(function(a){f&&e.onNext(a)},function(a){e.onError(a)},function(){e.onCompleted()}))},c)},pc.takeUntilWithTime=function(a,b){Wb(b)||(b=dc);var c=this,d=a instanceof Date?"scheduleWithAbsolute":"scheduleWithRelative";return new wd(function(e){return new Jb(b[d](a,function(){e.onCompleted()}),c.subscribe(e))},c)},pc.throttleFirst=function(a,b){Wb(b)||(b=dc);var c=+a||0;if(0>=c)throw new RangeError("windowDuration cannot be less or equal zero.");var d=this;return new wd(function(a){var e=0;return d.subscribe(function(d){var f=b.now();(0===e||f-e>=c)&&(e=f,a.onNext(d))},function(b){a.onError(b)},function(){a.onCompleted()})},d)},pc.transduce=function(a){function b(a){return{"@@transducer/init":function(){return a},"@@transducer/step":function(a,b){return a.onNext(b)},"@@transducer/result":function(a){return a.onCompleted()}}}var c=this;return new wd(function(d){var e=a(b(d));return c.subscribe(function(a){try{e["@@transducer/step"](d,a)}catch(b){d.onError(b)}},function(a){d.onError(a)},function(){e["@@transducer/result"](d)})},c)},pc.exclusive=function(){var a=this;return new wd(function(b){var c=!1,d=!1,e=new Qb,f=new Jb;return f.add(e),e.setDisposable(a.subscribe(function(a){if(!c){c=!0,Ka(a)&&(a=xc(a));var e=new Qb;f.add(e),e.setDisposable(a.subscribe(b.onNext.bind(b),b.onError.bind(b),function(){f.remove(e),c=!1,d&&1===f.length&&b.onCompleted()}))}},b.onError.bind(b),function(){d=!0,c||1!==f.length||b.onCompleted()})),f},this)},pc.exclusiveMap=function(a,b){var c=this,d=cb(a,b,3);return new wd(function(a){var b=0,e=!1,f=!0,g=new Qb,h=new Jb;return h.add(g),g.setDisposable(c.subscribe(function(c){e||(e=!0,innerSubscription=new Qb,h.add(innerSubscription),Ka(c)&&(c=xc(c)),innerSubscription.setDisposable(c.subscribe(function(e){var f;try{f=d(e,b++,c)}catch(g){return void a.onError(g)}a.onNext(f)},function(b){a.onError(b)},function(){h.remove(innerSubscription),e=!1,f&&1===h.length&&a.onCompleted()})))},function(b){a.onError(b)},function(){f=!0,1!==h.length||e||a.onCompleted()})),h},this)},Da.VirtualTimeScheduler=function(a){function b(){return this.toDateTimeOffset(this.clock)}function c(a,b){return this.scheduleAbsoluteWithState(a,this.clock,b)}function d(a,b,c){return this.scheduleRelativeWithState(a,this.toRelative(b),c)}function e(a,b,c){return this.scheduleRelativeWithState(a,this.toRelative(b-this.now()),c)}function f(a,b){return b(),Nb}function g(f,g){this.clock=f,this.comparer=g,this.isEnabled=!1,this.queue=new Hb(1024),a.call(this,b,c,d,e)}Db(g,a);var h=g.prototype;return h.add=Xa,h.toDateTimeOffset=Xa,h.toRelative=Xa,h.schedulePeriodicWithState=function(a,b,c){var d=new Zb(this,a,b,c);return d.start()},h.scheduleRelativeWithState=function(a,b,c){var d=this.add(this.clock,b);return this.scheduleAbsoluteWithState(a,d,c)},h.scheduleRelative=function(a,b){return this.scheduleRelativeWithState(b,a,f)},h.start=function(){if(!this.isEnabled){this.isEnabled=!0;do{var a=this.getNext();null!==a?(this.comparer(a.dueTime,this.clock)>0&&(this.clock=a.dueTime),a.invoke()):this.isEnabled=!1}while(this.isEnabled)}},h.stop=function(){this.isEnabled=!1},h.advanceTo=function(a){var b=this.comparer(this.clock,a);if(this.comparer(this.clock,a)>0)throw new Ua;if(0!==b&&!this.isEnabled){this.isEnabled=!0;do{var c=this.getNext();null!==c&&this.comparer(c.dueTime,a)<=0?(this.comparer(c.dueTime,this.clock)>0&&(this.clock=c.dueTime),c.invoke()):this.isEnabled=!1}while(this.isEnabled);this.clock=a}},h.advanceBy=function(a){var b=this.add(this.clock,a),c=this.comparer(this.clock,b);if(c>0)throw new Ua;0!==c&&this.advanceTo(b)},h.sleep=function(a){var b=this.add(this.clock,a);if(this.comparer(this.clock,b)>=0)throw new Ua;this.clock=b},h.getNext=function(){for(;this.queue.length>0;){var a=this.queue.peek();if(!a.isCancelled())return a;this.queue.dequeue()}return null},h.scheduleAbsolute=function(a,b){return this.scheduleAbsoluteWithState(b,a,f)},h.scheduleAbsoluteWithState=function(a,b,c){function d(a,b){return e.queue.remove(f),c(a,b)}var e=this,f=new Tb(this,a,d,b,this.comparer);return this.queue.enqueue(f),f.disposable},g}(Ub),Da.HistoricalScheduler=function(a){function b(b,c){var d=null==b?0:b,e=c||Ia;a.call(this,d,e)}Db(b,a);var c=b.prototype;return c.add=function(a,b){return a+b},c.toDateTimeOffset=function(a){return new Date(a).getTime()},c.toRelative=function(a){return a},b}(Da.VirtualTimeScheduler);var wd=Da.AnonymousObservable=function(a){function b(a){return a&&Ma(a.dispose)?a:Ma(a)?Mb(a):Nb}function c(a,c){var d=c[0],e=c[1],f=p(e)(d);return f!==Gb||d.fail(Gb.e)?void d.setDisposable(b(f)):q(Gb.e)}function d(b,d){function e(a){var d=new xd(a),e=[d,b];return _b.scheduleRequired()?_b.scheduleWithState(e,c):c(null,e),d}this.source=d,a.call(this,e)}return Db(d,a),d}(vc),xd=function(a){function b(b){a.call(this),this.observer=b,this.m=new Qb}Db(b,a);var c=b.prototype;return c.next=function(a){var b=p(this.observer.onNext).call(this.observer,a);b===Gb&&(this.dispose(),q(b.e))},c.error=function(a){var b=p(this.observer.onError).call(this.observer,a);this.dispose(),b===Gb&&q(b.e)},c.completed=function(){var a=p(this.observer.onCompleted).call(this.observer);this.dispose(),a===Gb&&q(a.e)},c.setDisposable=function(a){this.m.setDisposable(a)},c.getDisposable=function(){return this.m.getDisposable()},c.dispose=function(){a.prototype.dispose.call(this),this.m.dispose()},b}(qc),yd=function(a){function b(a){return this.underlyingObservable.subscribe(a)}function c(c,d,e){a.call(this,b),this.key=c,this.underlyingObservable=e?new wd(function(a){return new Jb(e.getDisposable(),d.subscribe(a))}):d}return Db(c,a),c}(vc),zd=Da.Subject=function(a){function c(a){return Pb(this),this.isStopped?this.hasError?(a.onError(this.error),Nb):(a.onCompleted(),Nb):(this.observers.push(a),new md(this,a))}function d(){a.call(this,c),this.isDisposed=!1,this.isStopped=!1,this.observers=[],this.hasError=!1}return Db(d,a),Eb(d.prototype,nc.prototype,{hasObservers:function(){return this.observers.length>0},onCompleted:function(){if(Pb(this),!this.isStopped){this.isStopped=!0;for(var a=0,c=b(this.observers),d=c.length;d>a;a++)c[a].onCompleted();this.observers.length=0}},onError:function(a){if(Pb(this),!this.isStopped){this.isStopped=!0,this.error=a,this.hasError=!0;for(var c=0,d=b(this.observers),e=d.length;e>c;c++)d[c].onError(a);this.observers.length=0}},onNext:function(a){if(Pb(this),!this.isStopped)for(var c=0,d=b(this.observers),e=d.length;e>c;c++)d[c].onNext(a)},dispose:function(){this.isDisposed=!0,this.observers=null}}),d.create=function(a,b){return new Bd(a,b)},d}(vc),Ad=Da.AsyncSubject=function(a){function c(a){return Pb(this),this.isStopped?(this.hasError?a.onError(this.error):this.hasValue?(a.onNext(this.value),a.onCompleted()):a.onCompleted(),Nb):(this.observers.push(a),new md(this,a))}function d(){a.call(this,c),this.isDisposed=!1,this.isStopped=!1,this.hasValue=!1,this.observers=[],this.hasError=!1}return Db(d,a),Eb(d.prototype,nc,{hasObservers:function(){return Pb(this),this.observers.length>0},onCompleted:function(){var a,c;if(Pb(this),!this.isStopped){this.isStopped=!0;var d=b(this.observers),c=d.length;if(this.hasValue)for(a=0;c>a;a++){var e=d[a];e.onNext(this.value),e.onCompleted()}else for(a=0;c>a;a++)d[a].onCompleted();this.observers.length=0}},onError:function(a){if(Pb(this),!this.isStopped){this.isStopped=!0,this.hasError=!0,this.error=a;for(var c=0,d=b(this.observers),e=d.length;e>c;c++)d[c].onError(a);this.observers.length=0}},onNext:function(a){Pb(this),this.isStopped||(this.value=a,this.hasValue=!0)},dispose:function(){this.isDisposed=!0,this.observers=null,this.exception=null,this.value=null}}),d}(vc),Bd=Da.AnonymousSubject=function(a){function b(a){return this.observable.subscribe(a)}function c(c,d){this.observer=c,this.observable=d,a.call(this,b)}return Db(c,a),Eb(c.prototype,nc.prototype,{onCompleted:function(){this.observer.onCompleted()},onError:function(a){this.observer.onError(a)},onNext:function(a){this.observer.onNext(a)}}),c}(vc);Da.Pauser=function(a){function b(){a.call(this)}return Db(b,a),b.prototype.pause=function(){this.onNext(!1)},b.prototype.resume=function(){this.onNext(!0)},b}(zd),"function"==typeof define&&"object"==typeof define.amd&&define.amd?(ya.Rx=Da,define(function(){return Da})):za&&Aa?Ba?(Aa.exports=Da).Rx=Da:za.Rx=Da:ya.Rx=Da;var Cd=g()}).call(this);
//# sourceMappingURL=rx.all.map

!function(a,b){"object"==typeof exports&&"object"==typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):"object"==typeof exports?exports.wx=b():a.wx=b()}(this,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){function d(a){for(var c in a)b.hasOwnProperty(c)||(b[c]=a[c])}var e=c(1);b.app=e.app,b.router=e.router,b.messageBus=e.messageBus;var f=c(14);b.module=f.module,d(c(3));var g=c(13);b.property=g.property;var h=c(16);b.applyBindings=h.applyBindings,b.cleanNode=h.cleanNode;var i=c(20);b.command=i.command,b.asyncCommand=i.asyncCommand,b.combinedCommand=i.combinedCommand,b.isCommand=i.isCommand;var j=c(51);b.animation=j.animation;var k=c(6);b.getOid=k.getOid;var l=c(29);b.list=l.list,b.isList=l.isList;var m=c(8);b.createMap=m.createMap;var n=c(7);b.createSet=n.createSet,b.setToArray=n.setToArray;var o=c(5);b.createWeakMap=o.createWeakMap;var p=c(30);b.Lazy=p["default"];var q=c(27);b.VirtualChildNodes=q["default"];var r=c(47);b.route=r.route;var s=c(33);b.getNodeValue=s.getNodeValue,b.setNodeValue=s.setNodeValue;var t=c(2);b.injector=t.injector;var u=c(10);b.IID=u["default"];var v=c(24);b.SingleOneWayBindingBase=v.SingleOneWayBindingBase,b.MultiOneWayBindingBase=v.MultiOneWayBindingBase;var w=c(11);b.res=w;var x=c(17);b.env=x},function(a,b,c){var d=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},e=c(2),f=c(3),g=c(11),h=c(12),i=c(13),j=c(14),k=c(15),l=c(16),m=c(18),n=c(19),o=c(21),p=c(22),q=c(23),r=c(25),s=c(26),t=c(32),u=c(33),v=c(34),w=c(35),x=c(36),y=c(37),z=c(38),A=c(39),B=c(40),C=c(41),D=c(42),E=c(43),F=c(44),G=c(45),H=c(46),I=c(48),J=c(49),K=c(50);K.install();var L=function(a){function b(){a.call(this,"app"),this.defaultExceptionHandler=Rx.Observer.create(function(a){f.isInUnitTest()||h.error("An onError occurred on an object (usually a computedProperty) that would break a binding or command. To prevent this, subscribe to the thrownExceptions property of your objects: {0}",a)}),this.title=i.property(document.title),this.version=J.version,f.isInUnitTest()?this.history=window.createMockHistory():this.history=this.createHistory()}return d(b,a),Object.defineProperty(b.prototype,"mainThreadScheduler",{get:function(){return this._unitTestMainThreadScheduler||this._mainThreadScheduler||Rx.Scheduler.currentThread},set:function(a){f.isInUnitTest()?(this._unitTestMainThreadScheduler=a,this._mainThreadScheduler=this._mainThreadScheduler||a):this._mainThreadScheduler=a},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"templateEngine",{get:function(){return this._templateEngine||(this._templateEngine=e.injector.get(g.templateEngine)),this._templateEngine},set:function(a){this._templateEngine=a},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"router",{get:function(){return this._router||(this._router=e.injector.get(g.router)),this._router},enumerable:!0,configurable:!0}),b.prototype.createHistory=function(){var a={back:window.history.back.bind(window.history),forward:window.history.forward.bind(window.history),pushState:window.history.pushState.bind(window.history),replaceState:window.history.replaceState.bind(window.history),getSearchParameters:function(b){if(b=b||a.location.search.substr(1)){for(var c={},d=b.split("&"),e=0;e<d.length;e++){var f=d[e].split("=");c[f[0]]=decodeURIComponent(f[1])}return c}return{}}};return Object.defineProperty(a,"length",{get:function(){return window.history.length},enumerable:!0,configurable:!0}),Object.defineProperty(a,"state",{get:function(){return window.history.state},enumerable:!0,configurable:!0}),Object.defineProperty(a,"location",{get:function(){return window.location},enumerable:!0,configurable:!0}),a.onPopState=Rx.Observable.fromEventPattern(function(a){return window.addEventListener("popstate",a)},function(a){return window.removeEventListener("popstate",a)}).publish().refCount(),a},b.prototype.register=function(){e.injector.register(g.app,this).register(g.expressionCompiler,k).register(g.templateEngine,[m["default"]],!0).register(g.domManager,[g.expressionCompiler,g.app,l.DomManager],!0).register(g.router,[g.domManager,g.app,H.Router],!0).register(g.messageBus,[I["default"]],!0),e.injector.register("bindings.module",[g.domManager,g.app,o["default"]],!0).register("bindings.command",[g.domManager,g.app,n["default"]],!0).register("bindings.if",[g.domManager,g.app,p.IfBinding],!0).register("bindings.with",[g.domManager,g.app,w["default"]],!0).register("bindings.notif",[g.domManager,g.app,p.NotIfBinding],!0).register("bindings.css",[g.domManager,g.app,q.CssBinding],!0).register("bindings.attr",[g.domManager,g.app,q.AttrBinding],!0).register("bindings.style",[g.domManager,g.app,q.StyleBinding],!0).register("bindings.text",[g.domManager,g.app,r.TextBinding],!0).register("bindings.html",[g.domManager,g.app,r.HtmlBinding],!0).register("bindings.visible",[g.domManager,g.app,r.VisibleBinding],!0).register("bindings.hidden",[g.domManager,g.app,r.HiddenBinding],!0).register("bindings.enabled",[g.domManager,g.app,r.EnableBinding],!0).register("bindings.disabled",[g.domManager,g.app,r.DisableBinding],!0).register("bindings.foreach",[g.domManager,g.app,s["default"]],!0).register("bindings.event",[g.domManager,g.app,t["default"]],!0).register("bindings.keyPress",[g.domManager,g.app,y["default"]],!0).register("bindings.textInput",[g.domManager,g.app,z["default"]],!0).register("bindings.checked",[g.domManager,g.app,x["default"]],!0).register("bindings.selectedValue",[g.domManager,g.app,A["default"]],!0).register("bindings.component",[g.domManager,g.app,B["default"]],!0).register("bindings.value",[g.domManager,g.app,u["default"]],!0).register("bindings.hasFocus",[g.domManager,g.app,v["default"]],!0).register("bindings.view",[g.domManager,g.router,g.app,D["default"]],!0).register("bindings.sref",[g.domManager,g.router,g.app,E["default"]],!0).register("bindings.sactive",[g.domManager,g.router,g.app,C["default"]],!0),e.injector.register("components.radiogroup",[g.templateEngine,G["default"]]).register("components.select",[g.templateEngine,F["default"]]),this.binding("module","bindings.module").binding("css","bindings.css").binding("attr","bindings.attr").binding("style","bindings.style").binding("command","bindings.command").binding("if","bindings.if").binding("with","bindings.with").binding("ifnot","bindings.notif").binding("text","bindings.text").binding("html","bindings.html").binding("visible","bindings.visible").binding("hidden","bindings.hidden").binding("disabled","bindings.disabled").binding("enabled","bindings.enabled").binding("foreach","bindings.foreach").binding("event","bindings.event").binding(["keyPress","keypress"],"bindings.keyPress").binding(["textInput","textinput"],"bindings.textInput").binding("checked","bindings.checked").binding("selectedValue","bindings.selectedValue").binding("component","bindings.component").binding("value","bindings.value").binding(["hasFocus","hasfocus"],"bindings.hasFocus").binding("view","bindings.view").binding(["sref","stateRef","stateref"],"bindings.sref").binding(["sactive","stateActive","stateactive"],"bindings.sactive"),this.component("wx-radiogroup",{resolve:"components.radiogroup"}).component("wx-select",{resolve:"components.select"}),j.modules.app={instance:this}},b}(j.Module),M=new L;b.app=M,M.register(),b.router=e.injector.get(g.router),b.messageBus=e.injector.get(g.messageBus)},function(a,b,c){var d=c(3),e=c(11),f=function(){function a(){this.registrations={}}return a.prototype.register=function(){var a,b=arguments[0],c=arguments[1],e=arguments[2];if(this.registrations.hasOwnProperty(b)&&d.throwError("'{0}' is already registered",b),d.isFunction(c))a=function(a,b){return c.apply(null,a)};else if(Array.isArray(c)){var f=this,g=c.pop(),h=c;a=function(a,c){var e=h.map(function(a){try{return f.get(a,void 0,c)}catch(e){d.throwError("Error resolving dependency '{0}' for '{1}': {2}",a,b,e)}}),i=[null].concat(e).concat(a),j=g.bind.apply(g,i);return new j}}else a=function(a,b){return c};return this.registrations[b]={factory:a,isSingleton:e},this},a.prototype.get=function(a,b,c){c=c||{},c.hasOwnProperty(a)&&d.throwError("Detected circular dependency a from '{0}' to '{1}'",Object.keys(c).join(", "),a);var e=this.registrations[a];if(void 0===e&&d.throwError("'{0}' is not registered",a),e.isSingleton&&e.value)return e.value;var f={};f[a]=!0,d.extend(c,f);var g=e.factory(b,f);return e.isSingleton&&(e.value=g),g},a.prototype.resolve=function(a,b){var c=a.pop();d.isFunction(c)||d.throwError("Error resolving inline-annotated-array. Constructor must be of type 'function' but is '{0}",typeof c);var e=this,f=a.map(function(b){try{return e.get(b,void 0,a)}catch(f){d.throwError("Error resolving dependency '{0}' for '{1}': {2}",b,Object.getPrototypeOf(c),f)}}),g=[null].concat(f).concat(b),h=c.bind.apply(c,g);return new h},a}();b.injector=new f,b.injector.register(e.injector,function(){return new f})},function(a,b,c){function d(){return"undefined"==typeof this}function e(a){var b=typeof a;return"boolean"===b||"number"===b||"string"===b}function f(a,b){if(null==a||e(a))return!1;"object"==typeof a&&(a=a.constructor);var c=E.getMetadata(E.implementsMetaDataKey,a);return null!=c&&c[b]}function g(a,b){return Object.keys(a).filter(function(c){var d=a[c];return f(d,b)}).map(function(b){return new J(b,a[b])})}function h(a){return null==a?!1:f(a,G["default"].IObservableProperty)}function i(a){return null==a?!1:Rx.Scheduler.isScheduler(a)}function j(a){return null==a?!1:a instanceof I}function k(a){return null==a?!1:Rx.helpers.isPromise(a)}function l(a){return h(a)?a():a}function m(){return window&&window.jasmine&&void 0!==window.jasmine.version_?!0:window&&window.getJasmineRequireObj&&"function"==typeof window.getJasmineRequireObj?!0:!1}function n(a){for(var b=[],c=0,d=a.length;d>c;c++)b.push(a[c]);return b}function o(a){for(var b=[],c=1;c<arguments.length;c++)b[c-1]=arguments[c];var d=/\{\d+\}/g;return a.replace(d,function(a){return b[a.match(/\d+/)]})}function p(a,b,c){var d;if(c)for(d in a)b[d]=a[d];else for(var e=Object.getOwnPropertyNames(a),f=0;f<e.length;f++)d=e[f],b[d]=a[d];return b}function q(a,b){for(var c=[],d=2;d<arguments.length;d++)c[d-2]=arguments[d];if(c){var e,f,g=a.className.match(H)||[];if(b)for(var h=0;h<c.length;h++)f=c[h],e=g.indexOf(f),-1===e&&g.push(f);else for(var h=0;h<c.length;h++)f=c[h],e=g.indexOf(f),-1!==e&&g.splice(e,1);a.className=g.join(" ")}}function r(a){a.getBoundingClientRect()}function s(a){return a instanceof HTMLButtonElement||a instanceof HTMLAnchorElement||a instanceof HTMLInputElement||a instanceof HTMLFieldSetElement||a instanceof HTMLLinkElement||a instanceof HTMLOptGroupElement||a instanceof HTMLOptionElement||a instanceof HTMLSelectElement||a instanceof HTMLTextAreaElement}function t(a){return"function"==typeof a||!1}function u(a){return f(a,G["default"].IDisposable)||t(a.dispose)}function v(a,b,c,d){var e={}.toString;if(a===b)return 0!==a||1/a===1/b;if(null==a||null==b)return a===b;var f=e.call(a);if(f!==e.call(b))return!1;switch(f){case"[object RegExp]":case"[object String]":return""+a==""+b;case"[object Number]":return+a!==+a?+b!==+b:0===+a?1/+a===1/b:+a===+b;case"[object Date]":case"[object Boolean]":return+a===+b}var g="[object Array]"===f;if(!g){if("object"!=typeof a||"object"!=typeof b)return!1;var h=a.constructor,i=b.constructor;if(h!==i&&!(t(h)&&h instanceof h&&t(i)&&i instanceof i)&&"constructor"in a&&"constructor"in b)return!1}c=c||[],d=d||[];for(var j=c.length;j--;)if(c[j]===a)return d[j]===b;if(c.push(a),d.push(b),g){if(j=a.length,j!==b.length)return!1;for(;j--;)if(!v(a[j],b[j],c,d))return!1}else{var k,l=Object.keys(a);if(j=l.length,Object.keys(b).length!==j)return!1;for(;j--;)if(k=l[j],!b.hasOwnProperty(k)||!v(a[k],b[k],c,d))return!1}return c.pop(),d.pop(),!0}function w(a){for(var b=a.length,c=new Array(b),d=0;b>d;d++)c[d]=a[d].cloneNode(!0);return c}function x(a){return Array.prototype.slice.call(a)}function y(a){return x(a.childNodes)}function z(a,b){if(!a)throw new Error("disp");if(!b)throw new Error("action");try{b(a)}finally{a.dispose()}}function A(a){var b=window.require;return t(b)||D("there's no AMD-module loader available (Hint: did you forget to include RequireJS in your project?)"),Rx.Observable.create(function(c){try{b([a],function(a){c.onNext(a),c.onCompleted()},function(a){c.onError(a)})}catch(d){c.onError(d)}return Rx.Disposable.empty})}function B(a,b,c){void 0===c&&(c=!1);var d=f(a,G["default"].IHandleObservableErrors)?a.thrownExceptions:b;return Rx.Observable.create(function(b){var e=new Rx.CompositeDisposable,f=g(a,G["default"].IObservableProperty);return f.forEach(function(a){var f=a.property,g=c?f.changing:f.changed;e.add(g.subscribe(function(c){var e=new F.PropertyChangedEventArgs(self,a.propertyName);try{b.onNext(e)}catch(f){d.onNext(f)}}))}),e}).publish().refCount()}function C(){if(2===arguments.length)return arguments[0].changed.startWith(arguments[0]()).select(arguments[1]);var a=n(arguments),b=a.pop();return a=a.map(function(a){return a.changed.startWith(a())}),a.push(b),Rx.Observable.combineLatest.apply(this,a)}function D(a){for(var b=[],c=1;c<arguments.length;c++)b[c-1]=arguments[c];var d="WebRx: "+o(a,b);throw new Error(d)}var E=c(4),F=c(9),G=c(10),H=/\S+/g,I=Rx.Observable;b.noop=function(){},b.isStrictMode=d,b.isPrimitive=e,b.queryInterface=f,b.getOwnPropertiesImplementingInterface=g,b.isProperty=h,b.isRxScheduler=i,b.isRxObservable=j,b.isPromise=k,b.unwrapProperty=l,b.isInUnitTest=m,b.args2Array=n,b.formatString=o,b.extend=p;var J=function(){function a(a,b){this.property=b,this.propertyName=a}return a}();b.PropertyInfo=J,b.toggleCssClass=q,b.triggerReflow=r,b.elementCanBeDisabled=s,b.isFunction=t,b.isDisposable=u,b.isEqual=v,b.cloneNodeArray=w,b.nodeListToArray=x,b.nodeChildrenToArray=y,b.using=z,b.observableRequire=A,b.observeObject=B,b.whenAny=C,b.throwError=D},function(a,b,c){function d(a,b,c,d){if(y(d)){if(y(c)){if(!z(a))throw new TypeError;if(!B(b))throw new TypeError;return n(a,b)}if(!z(a))throw new TypeError;if(!A(b))throw new TypeError;return c=D(c),p(a,b,c)}if(!z(a))throw new TypeError;if(!A(b))throw new TypeError;if(y(c))throw new TypeError;if(!A(d))throw new TypeError;return c=D(c),o(a,b,c,d)}function e(a,b){function c(c,d){if(y(d)){if(!B(c))throw new TypeError;v(a,b,c,void 0)}else{if(!A(c))throw new TypeError;d=D(d),v(a,b,c,d)}}return c}function f(a,b,c,d){if(!A(c))throw new TypeError;return y(d)||(d=D(d)),v(a,b,c,d)}function g(a,b,c){if(!A(b))throw new TypeError;return y(c)||(c=D(c)),r(a,b,c)}function h(a,b,c){if(!A(b))throw new TypeError;return y(c)||(c=D(c)),s(a,b,c)}function i(a,b,c){if(!A(b))throw new TypeError;return y(c)||(c=D(c)),t(a,b,c)}function j(a,b,c){if(!A(b))throw new TypeError;return y(c)||(c=D(c)),u(a,b,c)}function k(a,b){if(!A(a))throw new TypeError;return y(b)||(b=D(b)),w(a,b)}function l(a,b){if(!A(a))throw new TypeError;return y(b)||(b=D(b)),x(a,b)}function m(a,b,c){if(!A(b))throw new TypeError;y(c)||(c=D(c));var d=q(b,c,!1);if(y(d))return!1;if(!d["delete"](a))return!1;if(d.size>0)return!0;var e=K.get(b);return e["delete"](c),e.size>0?!0:(K["delete"](b),!0)}function n(a,b){for(var c=a.length-1;c>=0;--c){var d=a[c],e=d(b);if(!y(e)){if(!B(e))throw new TypeError;b=e}}return b}function o(a,b,c,d){for(var e=a.length-1;e>=0;--e){var f=a[e],g=f(b,c,d);if(!y(g)){if(!A(g))throw new TypeError;d=g}}return d}function p(a,b,c){for(var d=a.length-1;d>=0;--d){var e=a[d];e(b,c)}}function q(a,b,c){var d=K.get(a);if(!d){if(!c)return void 0;d=I.createMap(),K.set(a,d)}var e=d.get(b);if(!e){if(!c)return void 0;e=I.createMap(),d.set(b,e)}return e}function r(a,b,c){var d=s(a,b,c);if(d)return!0;var e=E(b);return null!==e?r(a,e,c):!1}function s(a,b,c){var d=q(b,c,!1);return void 0===d?!1:Boolean(d.has(a))}function t(a,b,c){var d=s(a,b,c);if(d)return u(a,b,c);var e=E(b);return null!==e?t(a,e,c):void 0}function u(a,b,c){var d=q(b,c,!1);return void 0===d?void 0:d.get(a)}function v(a,b,c,d){var e=q(c,d,!0);e.set(a,b)}function w(a,b){var c=x(a,b),d=E(a);if(null===d)return c;var e=w(d,b);if(e.length<=0)return c;if(c.length<=0)return e;for(var f=H.createSet(),g=[],h=0;h<c.length;h++){var i=c[h],j=f.has(i);j||(f.add(i),g.push(i))}for(var k=0;k<e.length;k++){var i=e[k],j=f.has(i);j||(f.add(i),g.push(i))}return g}function x(a,b){var c=q(a,b,!1),d=[];return c&&c.forEach(function(a,b){return d.push(b)}),d}function y(a){return void 0===a}function z(a){return Array.isArray(a)}function A(a){return"object"==typeof a?null!==a:"function"==typeof a}function B(a){return"function"==typeof a}function C(a){return"symbol"==typeof a}function D(a){return C(a)?a:String(a)}function E(a){var b=Object.getPrototypeOf(a);if("function"!=typeof a||a===J)return b;if(b!==J)return b;var c=a.prototype,d=Object.getPrototypeOf(c);if(null==d||d===Object.prototype)return b;var e=d.constructor;return"function"!=typeof e?b:e===a?b:e}function F(a){return function(c){var d=i(b.implementsMetaDataKey,c)||{};"string"==typeof a&&(a=a.split(/\s+/).map(function(a){return a.trim()}).filter(function(a){return a}));for(var e=0;e<a.length;e++)d[a[e]]=!0;f(b.implementsMetaDataKey,d,c)}}var G=c(5),H=c(7),I=c(8),J=Object.getPrototypeOf(Function),K=G.createWeakMap();b.decorate=d,b.metadata=e,b.defineMetadata=f,b.hasMetadata=g,b.hasOwnMetadata=h,b.getMetadata=i,b.getOwnMetadata=j,b.getMetadataKeys=k,b.getOwnMetadataKeys=l,b.deleteMetadata=m,b.implementsMetaDataKey="wx:interfaceImpl",b.Implements=F},function(a,b,c){function d(a){return a||!g?new f:new WeakMap}var e=c(6),f=function(){function a(){this.inner={}}return a.prototype.set=function(a,b){var c=e.getOid(a);this.inner[c]=b},a.prototype.get=function(a){var b=e.getOid(a);return this.inner[b]},a.prototype.has=function(a){var b=e.getOid(a);return this.inner.hasOwnProperty(b)},a.prototype["delete"]=function(a){var b=e.getOid(a);return delete this.inner[b]},Object.defineProperty(a.prototype,"isEmulated",{get:function(){return!0},enumerable:!0,configurable:!0}),a}(),g="function"==typeof WeakMap;b.createWeakMap=d},function(a,b,c){"use strict";function d(a){var b=typeof a;return"boolean"===b||"number"===b||"string"===b}function e(a){if(null==a)return void 0;if(d(a))return typeof a+":"+a;if(a.hasOwnProperty(g))return a[g];var b=(++f).toString();return Object.defineProperty(a,g,{enumerable:!1,configurable:!1,writable:!1,value:b}),b}var f=1,g="__wx_oid__"+(new Date).getTime();b.getOid=e},function(a,b,c){function d(a){return a||!h?new g:new Set}function e(a){var b=new Array;return a.forEach(function(a){return b.push(a)}),b}var f=c(6),g=function(){function a(){this.values=[],this.keys={}}return a.prototype.add=function(a){var b=f.getOid(a);return this.keys[b]||(this.values.push(a),this.keys[b]=!0),this},a.prototype["delete"]=function(a){var b=f.getOid(a);if(this.keys[b]){var c=this.values.indexOf(a);return this.values.splice(c,1),delete this.keys[b],!0}return!1},a.prototype.has=function(a){var b=f.getOid(a);return this.keys.hasOwnProperty(b)},a.prototype.clear=function(){this.keys={},this.values.length=0},a.prototype.forEach=function(a,b){this.values.forEach(a,b)},Object.defineProperty(a.prototype,"size",{get:function(){return this.values.length},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"isEmulated",{get:function(){return!0},enumerable:!0,configurable:!0}),a}(),h="function"==typeof Set&&Set.prototype.hasOwnProperty("forEach")&&Set.prototype.hasOwnProperty("add")&&Set.prototype.hasOwnProperty("clear")&&Set.prototype.hasOwnProperty("delete")&&Set.prototype.hasOwnProperty("has");b.createSet=d,b.setToArray=e},function(a,b,c){"use strict";function d(a){return a||!f?new e:new Map}var e=function(){function a(){this.cacheSentinel={},this.keys=[],this.values=[],this.cache=this.cacheSentinel}return Object.defineProperty(a.prototype,"size",{get:function(){return this.keys.length},enumerable:!0,configurable:!0}),a.prototype.has=function(a){return a===this.cache?!0:this.find(a)>=0?(this.cache=a,!0):!1},a.prototype.get=function(a){var b=this.find(a);return b>=0?(this.cache=a,this.values[b]):void 0},a.prototype.set=function(a,b){return this["delete"](a),this.keys.push(a),this.values.push(b),this.cache=a,this},a.prototype["delete"]=function(a){var b=this.find(a);return b>=0?(this.keys.splice(b,1),this.values.splice(b,1),this.cache=this.cacheSentinel,!0):!1},a.prototype.clear=function(){this.keys.length=0,this.values.length=0,this.cache=this.cacheSentinel},a.prototype.forEach=function(a,b){for(var c=this.size,d=0;c>d;++d){var e=this.keys[d],f=this.values[d];this.cache=e,a.call(this,f,e,this)}},Object.defineProperty(a.prototype,"isEmulated",{get:function(){return!0},enumerable:!0,configurable:!0}),a.prototype.find=function(a){for(var b=this.keys,c=b.length,d=0;c>d;++d)if(b[d]===a)return d;return-1},a}(),f="function"==typeof Map&&Map.prototype.hasOwnProperty("forEach")&&Map.prototype.hasOwnProperty("add")&&Map.prototype.hasOwnProperty("clear")&&Map.prototype.hasOwnProperty("devare")&&Map.prototype.hasOwnProperty("has");b.createMap=d},function(a,b,c){"use strict";var d=function(){function a(a,b){this.propertyName=b,this.sender=a}return a}();b.PropertyChangedEventArgs=d},function(a,b,c){"use strict";var d=function(){function a(){}return a.IDisposable="IDisposable",a.IObservableProperty="IObservableProperty",a.IObservableList="IObservableList",a.ICommand="ICommand",a.IHandleObservableErrors="IHandleObservableErrors",a}();b["default"]=d},function(a,b,c){"use strict";b.app="app",b.injector="injector",b.domManager="domservice",b.router="router",b.messageBus="messageBus",b.expressionCompiler="expressioncompiler",b.templateEngine="templateEngine",b.hasValueBindingValue="has.bindings.value",b.valueBindingValue="bindings.value"},function(a,b,c){function d(){for(var a=[],b=0;b<arguments.length;b++)a[b-0]=arguments[b];try{console.log.apply(console,arguments)}catch(c){try{window.opera.postError.apply(window.opera,arguments)}catch(c){alert(Array.prototype.join.call(arguments," "))}}}function e(a){for(var b=[],c=1;c<arguments.length;c++)b[c-1]=arguments[c];b.length&&(a=h.formatString.apply(null,[a].concat(b))),d("**** WebRx Critical: "+a)}function f(a){for(var b=[],c=1;c<arguments.length;c++)b[c-1]=arguments[c];b.length&&(a=h.formatString.apply(null,[a].concat(b))),d("*** WebRx Error: "+a)}function g(a){for(var b=[],c=1;c<arguments.length;c++)b[c-1]=arguments[c];b.length&&(a=h.formatString.apply(null,[a].concat(b))),d("* WebRx Info: "+a)}var h=c(3);b.critical=e,b.error=f,b.info=g},function(a,b,c){function d(a){var b=function(a){return arguments.length>0?void(a!==b.value&&(b.changingSubject.onNext(a),b.value=a,b.changedSubject.onNext(a))):b.value};return e.Implements(f["default"].IObservableProperty)(b),e.Implements(f["default"].IDisposable)(b),b.dispose=function(){},void 0!==a&&(b.value=a),b.changedSubject=new Rx.Subject,b.changed=b.changedSubject.publish().refCount(),b.changingSubject=new Rx.Subject,b.changing=b.changingSubject.publish().refCount(),b}var e=c(4),f=c(10);b.property=d},function(a,b,c){function a(a,c){return b.modules[a]=c,this}function d(a){var c,d=b.modules[a],g=void 0;if(null!=d)if(Array.isArray(d))c=new h(a),e.injector.resolve(d,c),g=Rx.Observable["return"](c);else if(f.isFunction(d))c=new h(a),d(c),g=Rx.Observable["return"](c);else{var i=d;i.instance?g=Rx.Observable["return"](i.instance):(c=new h(a),i.resolve?(e.injector.get(i.resolve,c),g=Rx.Observable["return"](c)):i.require&&(g=f.observableRequire(i.require)["do"](function(a){return a(c)}).select(function(a){return c})))}else g=Rx.Observable["return"](void 0);return g.take(1)["do"](function(c){return b.modules[a]={instance:c}})}var e=c(2),f=c(3),g=c(11),h=function(){function a(a){this.bindings={},this.components={},this.expressionFilters={},this.animations={},this.name=a}return a.prototype.merge=function(a){var b=a;return f.extend(b.components,this.components),f.extend(b.bindings,this.bindings),f.extend(b.expressionFilters,this.expressionFilters),f.extend(b.animations,this.animations),this},a.prototype.component=function(a,b){return this.components[a]=b,this},a.prototype.hasComponent=function(a){return null!=this.components[a]},a.prototype.loadComponent=function(a,b){return this.initializeComponent(this.instantiateComponent(a),b)},a.prototype.binding=function(){var a,b=this,c=f.args2Array(arguments),d=c.shift();return 0===c.length?(a=this.bindings[d],"string"==typeof a&&(a=e.injector.get(a),this.bindings[d]=a),a):(a=c.shift(),Array.isArray(d)?d.forEach(function(c){return b.bindings[c]=a}):this.bindings[d]=a,this)},a.prototype.filter=function(){var a,b=f.args2Array(arguments),c=b.shift();return 0===b.length?(a=this.expressionFilters[c],"string"==typeof a&&(a=e.injector.get(a),this.bindings[c]=a),a):(a=b.shift(),this.expressionFilters[c]=a,this)},a.prototype.filters=function(){return this.expressionFilters},a.prototype.animation=function(){var a,b=f.args2Array(arguments),c=b.shift();return 0===b.length?(a=this.animations[c],"string"==typeof a&&(a=e.injector.get(a),this.bindings[c]=a),a):(a=b.shift(),this.animations[c]=a,this)},Object.defineProperty(a.prototype,"app",{get:function(){return e.injector.get(g.app)},enumerable:!0,configurable:!0}),a.prototype.instantiateComponent=function(a){var b=this,c=this.components[a],d=void 0;if(null!=c)if(f.isRxObservable(c))d=c;else{if(f.isPromise(c))return Rx.Observable.fromPromise(c);var g=c;if(g.instance)d=Rx.Observable["return"](g.instance);else if(g.template)d=Rx.Observable["return"](g);else if(g.resolve){var h=e.injector.get(g.resolve);d=Rx.Observable["return"](h)}else g.require&&(d=f.observableRequire(g.require))}else d=Rx.Observable["return"](void 0);return d["do"](function(c){return b.components[a]={instance:c}})},a.prototype.initializeComponent=function(a,b){var c=this;return a.take(1).selectMany(function(a){return null==a?Rx.Observable["return"](void 0):Rx.Observable.combineLatest(c.loadComponentTemplate(a.template,b),a.viewModel?c.loadComponentViewModel(a.viewModel,b):Rx.Observable["return"](void 0),function(c,d){return f.isFunction(d)&&(d=new d(b)),{template:c,viewModel:d,preBindingInit:a.preBindingInit,postBindingInit:a.postBindingInit}})}).take(1)},a.prototype.loadComponentTemplate=function(a,b){var c,d,g=this;if(f.isFunction(a))return c=a(b),f.isRxObservable(a)?a:("string"==typeof c&&(c=this.app.templateEngine.parse(a(b))),Rx.Observable["return"](c));if("string"==typeof a)return c=this.app.templateEngine.parse(a),Rx.Observable["return"](c);if(Array.isArray(a))return Rx.Observable["return"](a);if("object"==typeof a){var h=a;if(h.resolve)return c=e.injector.get(h.resolve),Rx.Observable["return"](c);if(h.promise){var i=h.promise;return Rx.Observable.fromPromise(i)}if(h.observable)return h.observable;if(h.require)return f.observableRequire(h.require).select(function(a){return g.app.templateEngine.parse(a)});if(h.select)return d=document.getElementById(h.select)||document.querySelector(h.select),c=null!=d?this.app.templateEngine.parse(d.innerHTML):[],Rx.Observable["return"](c)}f.throwError("invalid template descriptor")},a.prototype.loadComponentViewModel=function(a,b){var c;if(f.isFunction(a))return Rx.Observable["return"](a);if(Array.isArray(a))return c=e.injector.resolve(a,b),Rx.Observable["return"](c);if("object"==typeof a){var d=a;if(d.resolve)return c=e.injector.get(d.resolve,b),Rx.Observable["return"](c);if(d.observable)return d.observable;if(d.promise){var g=d.promise;return Rx.Observable.fromPromise(g)}if(d.require)return f.observableRequire(d.require);if(d.instance)return Rx.Observable["return"](d.instance)}f.throwError("invalid view-model descriptor")},a}();b.Module=h,b.modules={},b.module=a,b.loadModule=d},function(a,b,c){function d(a,b){var c;for(c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function e(a){var b=a.trim();123===b.charCodeAt(0)&&(b=b.slice(1,-1));var c,d,e=new Array,f=b.match(A),g=0;if(f){f.push(",");for(var h=0,i=void 0;i=f[h];++h){var j=i.charCodeAt(0);if(44===j){if(0>=g){c&&e.push(d?{key:c,value:d.join("")}:{unknown:c,value:void 0}),c=d=g=0;continue}}else if(58===j){if(!d)continue}else if(47===j&&h&&i.length>1){var k=f[h-1].match(B);k&&!C[k[0]]&&(b=b.substr(b.indexOf(i)+1),f=b.match(A),f.push(","),h=-1,i="/")}else if(40===j||123===j||91===j)++g;else if(41===j||125===j||93===j)--g;else if(!c&&!d){c=34===j||39===j?i.slice(1,-1):i;continue}d?d.push(i):d=[i]}}return e}function f(a){return"undefined"!=typeof a}function g(a,b,c,d,e,f,g){var h=arguments;throw b=b.replace(/{(\d)}/g,function(a){return h[2+parseInt(a[1])]}),new SyntaxError(b)}function h(a){return"string"==typeof a?a.toLowerCase():a}function i(a,b){if("constructor"===a)throw g("isecfld",'Referencing "constructor" field in WebRx expressions is disallowed! Expression: {0}',b);return a}function j(a,b){if(a){if(a.constructor===a)throw g("isecfn","Referencing Function in WebRx expressions is disallowed! Expression: {0}",b);if(a.document&&a.location&&a.alert&&a.setInterval)throw g("isecwindow","Referencing the Window in WebRx expressions is disallowed! Expression: {0}",b);if(a.children&&(a.nodeName||a.prop&&a.attr&&a.find))throw g("isecdom","Referencing DOM nodes in WebRx expressions is disallowed! Expression: {0}",b)}return a}function k(){return 0}function l(a,b,c,d,e,f){var g,h,j=b.split("."),k=q(f);if(k)for(var l=0;j.length>1;l++)g=i(j.shift(),d),h=k.readFieldHook?k.readFieldHook(a,g):a[g],h||(h={},k.writeFieldHook?k.writeFieldHook(a,g,h):a[g]=h),a=h;else for(var m=0;j.length>1;m++)g=i(j.shift(),d),h=a[g],h||(h={},a[g]=h),a=h;return g=i(j.shift(),d),k&&k.writeFieldHook?k.writeFieldHook(a,g,c):a[g]=c,c}function m(a,b,c,d,e,f,g){return i(a,f),i(b,f),i(c,f),i(d,f),i(e,f),function(f,g){var h=g&&g.hasOwnProperty(a)?g:f,i=q(g);return i&&i.readFieldHook?null==h?h:(h=i.readFieldHook(h,a),b?null==h?void 0:(h=i.readFieldHook(h,b),c?null==h?void 0:(h=i.readFieldHook(h,c),d?null==h?void 0:(h=i.readFieldHook(h,d),e?null==h?void 0:h=i.readFieldHook(h,e):h):h):h):h):null==h?h:(h=h[a],b?null==h?void 0:(h=h[b],c?null==h?void 0:(h=h[c],d?null==h?void 0:(h=h[d],e?null==h?void 0:h=h[e]:h):h):h):h)}}function n(a,b){return i(a,b),function(b,c){if(b=c&&c.hasOwnProperty(a)?c:b,null==b)return void 0;var d=q(c);return d&&d.readFieldHook?d.readFieldHook(b,a):b[a]}}function o(a,b,c){return i(a,c),i(b,c),function(c,d){var e=q(d);return e&&e.readFieldHook?(c=d&&d.hasOwnProperty(a)?d:c,null==c?void 0:(c=e.readFieldHook(c,a),null==c?void 0:e.readFieldHook(c,b))):(c=(d&&d.hasOwnProperty(a)?d:c)[a],null==c?void 0:c[b])}}function p(a,b,c){if(I.hasOwnProperty(a))return I[a];var d,e=a.split("."),f=e.length;return d=1===f?n(e[0],c):2===f?o(e[0],e[1],c):6>f?m(e[0],e[1],e[2],e[3],e[4],c,b):function(a,d){var g={};Object.keys(d).forEach(function(a){return g[a]=d[a]});var h,i=0;do h=m(e[i++],e[i++],e[i++],e[i++],e[i++],c,b)(a,d),a=h,d={},Object.keys(g).forEach(function(a){return d[a]=g[a]});while(f>i);return h},"hasOwnProperty"!==a&&(I[a]=d),d}function q(a){return void 0!==a?a[D]:void 0}function r(a,b){a[D]=b}function s(a,b,c){if("string"!=typeof a)throw new TypeError("src must be a string, instead saw '"+typeof a+"'");var d=new G({}),e=new H(d,b);if(!c)return e.parse(a);var f=c[a];return f||(f=c[a]=e.parse(a)),f}var t=c(3),u='"(?:[^"\\\\]|\\\\.)*"',v="'(?:[^'\\\\]|\\\\.)*'",w="/(?:[^/\\\\]|\\\\.)*/w*",x=",\"'{}()/:[\\]",y="[^\\s:,/][^"+x+"]*[^\\s"+x+"]",z="[^\\s]",A=RegExp(u+"|"+v+"|"+w+"|"+y+"|"+z,"g"),B=/[\])"'A-Za-z0-9_$]+$/,C={"in":1,"return":1,"typeof":1};b.parseObjectLiteral=e;var D="___runtimeHooks",E={"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:t.noop,"+":function(a,b,c,d){return c=c(a,b),d=d(a,b),f(c)?f(d)?c+d:c:f(d)?d:void 0},"-":function(a,b,c,d){return c=c(a,b),d=d(a,b),(f(c)?c:0)-(f(d)?d:0)},"*":function(a,b,c,d){return c(a,b)*d(a,b)},"/":function(a,b,c,d){return c(a,b)/d(a,b)},"%":function(a,b,c,d){
return c(a,b)%d(a,b)},"^":function(a,b,c,d){return c(a,b)^d(a,b)},"=":t.noop,"===":function(a,b,c,d){return c(a,b)===d(a,b)},"!==":function(a,b,c,d){return c(a,b)!==d(a,b)},"==":function(a,b,c,d){return c(a,b)===d(a,b)},"!=":function(a,b,c,d){return c(a,b)!==d(a,b)},"<":function(a,b,c,d){return c(a,b)<d(a,b)},">":function(a,b,c,d){return c(a,b)>d(a,b)},"<=":function(a,b,c,d){return c(a,b)<=d(a,b)},">=":function(a,b,c,d){return c(a,b)>=d(a,b)},"&&":function(a,b,c,d){return c(a,b)&&d(a,b)},"||":function(a,b,c,d){return c(a,b)||d(a,b)},"&":function(a,b,c,d){return c(a,b)&d(a,b)},"|":function(a,b,c,d){return d(a,b)(a,b,c(a,b))},"!":function(a,b,c){return!c(a,b)}},F={n:"\n",f:"\f",r:"\r",t:"	",v:"","'":"'",'"':'"'},G=function(){function a(a){this.options=a}return a.prototype.lex=function(a){this.text=a,this.index=0,this.ch=void 0,this.lastCh=":",this.tokens=[];for(var b,c=[];this.index<this.text.length;){if(this.ch=this.text.charAt(this.index),this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent(),this.was("{,")&&"{"===c[0]&&(b=this.tokens[this.tokens.length-1])&&(b.json=-1===b.text.indexOf("."));else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch,json:this.was(":[,")&&this.is("{[")||this.is("}]:,")}),this.is("{[")&&c.unshift(this.ch),this.is("}]")&&c.shift(),this.index++;else{if(this.isWhitespace(this.ch)){this.index++;continue}var d=this.ch+this.peek(),e=d+this.peek(2),f=E[this.ch],g=E[d],h=E[e];h?(this.tokens.push({index:this.index,text:e,fn:h}),this.index+=3):g?(this.tokens.push({index:this.index,text:d,fn:g}),this.index+=2):f?(this.tokens.push({index:this.index,text:this.ch,fn:f,json:this.was("[,:")&&this.is(" + -")}),this.index+=1):this.throwError("Unexpected next character ",this.index,this.index+1)}this.lastCh=this.ch}return this.tokens},a.prototype.is=function(a){return-1!==a.indexOf(this.ch)},a.prototype.was=function(a){return-1!==a.indexOf(this.lastCh)},a.prototype.peek=function(a){var b=a||1;return this.index+b<this.text.length?this.text.charAt(this.index+b):!1},a.prototype.isNumber=function(a){return a>="0"&&"9">=a},a.prototype.isWhitespace=function(a){return" "===a||"\r"===a||"	"===a||"\n"===a||""===a||" "===a},a.prototype.isIdent=function(a){return a>="a"&&"z">=a||a>="A"&&"Z">=a||"_"===a||"$"===a||"@"===a},a.prototype.isExpOperator=function(a){return"-"===a||"+"===a||this.isNumber(a)},a.prototype.throwError=function(a,b,c){c=c||this.index;var d=f(b)?"s "+b+"-"+this.index+" ["+this.text.substring(b,c)+"]":" "+c;throw g("lexerr","Lexer Error: {0} at column{1} in expression [{2}].",a,d,this.text)},a.prototype.readNumber=function(){for(var a="",b=this.index;this.index<this.text.length;){var c=h(this.text.charAt(this.index));if("."===c||this.isNumber(c))a+=c;else{var d=this.peek();if("e"===c&&this.isExpOperator(d))a+=c;else if(this.isExpOperator(c)&&d&&this.isNumber(d)&&"e"===a.charAt(a.length-1))a+=c;else{if(!this.isExpOperator(c)||d&&this.isNumber(d)||"e"!==a.charAt(a.length-1))break;this.throwError("Invalid exponent")}}this.index++}a=1*a,this.tokens.push({index:b,text:a,json:!0,fn:function(){return a}})},a.prototype.readIdent=function(){for(var a,b,c,e,f=this,g="",h=this.index;this.index<this.text.length&&(e=this.text.charAt(this.index),"."===e||this.isIdent(e)||this.isNumber(e));)"."===e&&(a=this.index),g+=e,this.index++;if(a)for(b=this.index;b<this.text.length;){if(e=this.text.charAt(b),"("===e){c=g.substr(a-h+1),g=g.substr(0,a-h),this.index=b;break}if(!this.isWhitespace(e))break;b++}var i={index:h,text:g};if(E.hasOwnProperty(g))i.fn=E[g],i.json=E[g];else{var j=p(g,this.options,this.text);i.fn=d(function(a,b){return j(a,b)},{assign:function(a,b,c){return l(a,g,b,f.text,f.options,c)}})}this.tokens.push(i),c&&(this.tokens.push({index:a,text:".",json:!1}),this.tokens.push({index:a+1,text:c,json:!1}))},a.prototype.readString=function(a){var b=this.index;this.index++;for(var c="",d=a,e=!1;this.index<this.text.length;){var f=this.text.charAt(this.index);if(d+=f,e){if("u"===f){var g=this.text.substring(this.index+1,this.index+5);g.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+g+"]"),this.index+=4,c+=String.fromCharCode(parseInt(g,16))}else{var h=F[f];c+=h?h:f}e=!1}else if("\\"===f)e=!0;else{if(f===a)return this.index++,void this.tokens.push({index:b,text:d,string:c,json:!0,fn:function(){return c}});c+=f}this.index++}this.throwError("Unterminated quote",b)},a}(),H=function(){function a(a,b){this.lexer=a,this.options=b||{filters:{}}}return a.prototype.parse=function(a){this.text=a,this.tokens=this.lexer.lex(a);var b=this.statements();return 0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]),b.literal=!!b.literal,b.constant=!!b.constant,b},a.prototype.primary=function(){var a;if(this.expect("("))a=this.filterChain(),this.consume(")");else if(this.expect("["))a=this.arrayDeclaration();else if(this.expect("{"))a=this.object();else{var b=this.expect();a=b.fn,a||this.throwError("not a primary expression",b),b.json&&(a.constant=!0,a.literal=!0)}for(var c,d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},a.prototype.throwError=function(a,b){throw g("syntax","WebRx Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].",b.text,a,b.index+1,this.text,this.text.substring(b.index))},a.prototype.peekToken=function(){if(0===this.tokens.length)throw g("ueoe","Unexpected end of expression: {0}",this.text);return this.tokens[0]},a.prototype.peek=function(a,b,c,d){if(this.tokens.length>0){var e=this.tokens[0],f=e.text;if(f===a||f===b||f===c||f===d||!a&&!b&&!c&&!d)return e}return!1},a.prototype.expect=function(a,b,c,d){var e=this.peek(a,b,c,d);return e?(this.tokens.shift(),e):!1},a.prototype.consume=function(a){this.expect(a)||this.throwError("is unexpected, expecting ["+a+"]",this.peek())},a.prototype.unaryFn=function(a,b){return d(function(c,d){return a(c,d,b)},{constant:b.constant})},a.prototype.ternaryFn=function(a,b,c){return d(function(d,e){return a(d,e)?b(d,e):c(d,e)},{constant:a.constant&&b.constant&&c.constant})},a.prototype.binaryFn=function(a,b,c){return d(function(d,e){return b(d,e,a,c)},{constant:a.constant&&c.constant})},a.prototype.statements=function(){for(var a=[];;)if(this.tokens.length>0&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(b,c){for(var d,e=0;e<a.length;e++){var f=a[e];f&&(d=f(b,c))}return d}},a.prototype.filterChain=function(){for(var a,b=this.expression();;){if(!(a=this.expect("|")))return b;b=this.binaryFn(b,a.fn,this.filter())}},a.prototype.filter=function(){for(var a=this.expect(),b=this.options.filters[a.text],c=[];;){if(!(a=this.expect(":"))){var d=function(a,d,e){for(var f=[e],g=0;g<c.length;g++)f.push(c[g](a,d));return b.apply(a,f)};return function(){return d}}c.push(this.expression())}},a.prototype.expression=function(){return this.assignment()},a.prototype.assignment=function(){var a,b,c=this.ternary();return(b=this.expect("="))?(c.assign||this.throwError("implies assignment but ["+this.text.substring(0,b.index)+"] can not be assigned to",b),a=this.ternary(),function(b,d){return c.assign(b,a(b,d),d)}):c},a.prototype.ternary=function(){var a,b,c=this.logicalOR();if(b=this.expect("?")){if(a=this.ternary(),b=this.expect(":"))return this.ternaryFn(c,a,this.ternary());this.throwError("expected :",b)}return c},a.prototype.logicalOR=function(){for(var a,b=this.logicalAND();;){if(!(a=this.expect("||")))return b;b=this.binaryFn(b,a.fn,this.logicalAND())}},a.prototype.logicalAND=function(){var a,b=this.equality();return(a=this.expect("&&"))&&(b=this.binaryFn(b,a.fn,this.logicalAND())),b},a.prototype.equality=function(){var a,b=this.relational();return(a=this.expect("==","!=","===","!=="))&&(b=this.binaryFn(b,a.fn,this.equality())),b},a.prototype.relational=function(){var a,b=this.additive();return(a=this.expect("<",">","<=",">="))&&(b=this.binaryFn(b,a.fn,this.relational())),b},a.prototype.additive=function(){for(var a,b=this.multiplicative();a=this.expect("+","-");)b=this.binaryFn(b,a.fn,this.multiplicative());return b},a.prototype.multiplicative=function(){for(var a,b=this.unary();a=this.expect("*","/","%");)b=this.binaryFn(b,a.fn,this.unary());return b},a.prototype.unary=function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(k,a.fn,this.unary()):(a=this.expect("!"))?this.unaryFn(a.fn,this.unary()):this.primary()},a.prototype.fieldAccess=function(a){var b=this,c=this.expect().text,e=p(c,this.options,this.text);return d(function(b,c,d){return e(d||a(b,c))},{assign:function(d,e,f){return l(a(d,f),c,e,b.text,b.options,f)}})},a.prototype.objectIndex=function(a){var b=this,c=this.expression();return this.consume("]"),d(function(d,e){var f,g=a(d,e),h=c(d,e);if(!g)return void 0;var i=q(e);return f=i&&i.readIndexHook?i.readIndexHook(g,h):g[h],f=j(f,b.text)},{assign:function(d,e,f){var g=c(d,f),h=j(a(d,f),b.text),i=q(f);return i&&i.writeIndexHook?i.writeIndexHook(h,g,e):h[g]=e}})},a.prototype.functionCall=function(a,b){this.options.disallowFunctionCalls&&this.throwError("Function calls are not allowed");var c=[];if(")"!==this.peekToken().text)do c.push(this.expression());while(this.expect(","));this.consume(")");var d=this;return function(e,f){for(var g=[],h=b?b(e,f):e,i=0;i<c.length;i++)g.push(c[i](e,f));var k=a(e,f,h)||t.noop;j(h,d.text),j(k,d.text);var l=k.apply?k.apply(h,g):k(g[0],g[1],g[2],g[3],g[4]);return j(l,d.text)}},a.prototype.arrayDeclaration=function(){var a=[],b=!0;if("]"!==this.peekToken().text)do{if(this.peek("]"))break;var c=this.expression();a.push(c),c.constant||(b=!1)}while(this.expect(","));return this.consume("]"),d(function(b,c){for(var d=[],e=0;e<a.length;e++)d.push(a[e](b,c));return d},{literal:!0,constant:b})},a.prototype.object=function(){var a=[],b=!0;if("}"!==this.peekToken().text)do{if(this.peek("}"))break;var c=this.expect(),e=c.string||c.text;this.consume(":");var f=this.expression();a.push({key:e,value:f}),f.constant||(b=!1)}while(this.expect(","));return this.consume("}"),d(function(b,c){for(var d={},e=0;e<a.length;e++){var f=a[e];d[f.key]=f.value(b,c)}return d},{literal:!0,constant:b})},a}(),I={};b.getRuntimeHooks=q,b.setRuntimeHooks=r,b.compileExpression=s},function(a,b,c){function d(a,b){i.injector.get(k.domManager).applyBindings(a,b||window.document.documentElement)}function e(a){i.injector.get(k.domManager).cleanNode(a)}var f=c(5),g=c(7),h=c(10),i=c(2),j=c(3),k=c(11),l=c(17),m=function(){function a(a,b){this.expressionCache={},this.dataContextExtensions=g.createSet(),this.parserOptions={disallowFunctionCalls:!0},this.nodeState=f.createWeakMap(),this.compiler=a,this.app=b}return a.prototype.applyBindings=function(a,b){(void 0===b||1!==b.nodeType)&&j.throwError("first parameter should be your model, second parameter should be a DOM node!"),this.isNodeBound(b)&&j.throwError("an element must not be bound multiple times!");var c=this.getNodeState(b);c?c.model=a:(c=this.createNodeState(a),this.setNodeState(b,c));var d=this.getDataContext(b);this.applyBindingsRecursive(d,b)},a.prototype.applyBindingsToDescendants=function(a,b){if(b.hasChildNodes())for(var c=0;c<b.childNodes.length;c++){var d=b.childNodes[c];1===d.nodeType&&this.applyBindingsRecursive(a,d)}},a.prototype.cleanNode=function(a){1===a.nodeType&&this.cleanNodeRecursive(a)},a.prototype.cleanDescendants=function(a){if(a.hasChildNodes())for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];1===a.nodeType&&this.clearNodeState(c)}},a.prototype.getObjectLiteralTokens=function(a){return a=a.trim(),""!==a&&this.isObjectLiteralString(a)?this.compiler.parseObjectLiteral(a):[]},a.prototype.compileBindingOptions=function(a,b){if(a=a.trim(),""===a)return null;if(this.isObjectLiteralString(a)){for(var c,d={},e=this.compiler.parseObjectLiteral(a),f=0;f<e.length;f++)c=e[f],d[c.key]=this.compileBindingOptions(c.value,b);return d}var g=j.extend(this.parserOptions,{});return g.filters={},j.extend(this.app.filters(),g.filters),b&&"app"!=b.name&&j.extend(b.filters(),g.filters),this.compiler.compileExpression(a,g,this.expressionCache)},a.prototype.getModuleContext=function(a){for(var b;a;){if(b=this.getNodeState(a),null!=b&&null!=b.module)return b.module;a=a.parentNode}return this.app},a.prototype.registerDataContextExtension=function(a){this.dataContextExtensions.add(a)},a.prototype.getDataContext=function(a){for(var b=[],c=this.getNodeState(a),d=a;d;)c=null!=c?c:this.getNodeState(d),null!=c&&null!=c.model&&b.push(c.model),c=null,d=d.parentNode;var e;return e=b.length>0?{$data:b[0],$root:b[b.length-1],$parent:b.length>1?b[1]:null,$parents:b.slice(1)}:{$data:null,$root:null,$parent:null,$parents:[]},this.dataContextExtensions.forEach(function(b){return b(a,e)}),e},a.prototype.createNodeState=function(a,b){return{cleanup:new Rx.CompositeDisposable,model:a,module:b,isBound:!1}},a.prototype.isNodeBound=function(a){var b=this.nodeState.get(a);return null!=b&&!!b.isBound},a.prototype.setNodeState=function(a,b){this.nodeState.set(a,b)},a.prototype.getNodeState=function(a){return this.nodeState.get(a)},a.prototype.clearNodeState=function(a){var b=this.nodeState.get(a);b&&(null!=b.cleanup&&(b.cleanup.dispose(),b.cleanup=void 0),null!=b.model&&(b.model=void 0),null!=b.module&&(b.module=void 0)),this.nodeState["delete"](a),l.cleanExternalData(a)},a.prototype.evaluateExpression=function(a,b){var c=this.createLocals(void 0,b),d=a(b.$data,c);return d},a.prototype.expressionToObservable=function(a,b,c){var d,e,f=this,h=g.createSet();try{d=this.createLocals(h,b),e=a(b.$data,d),c&&c.onNext(!0)}catch(i){return this.app.defaultExceptionHandler.onNext(i),Rx.Observable["return"](void 0)}if(0===h.size)return j.isRxObservable(e)?e:Rx.Observable["return"](e);var k=Rx.Observable.create(function(i){var k=Rx.Observable.defer(function(){return Rx.Observable.merge(g.setToArray(h)).take(1)}).repeat().subscribe(function(g){try{h.clear(),d=f.createLocals(h,b),e=a(b.$data,d),j.isRxObservable(e)?i.onNext(e):i.onNext(Rx.Observable["return"](e)),c&&c.onNext(!0)}catch(k){f.app.defaultExceptionHandler.onNext(k)}});return k}),l=j.isRxObservable(e)?e:Rx.Observable["return"](e);return k.startWith(l).concatAll()},a.prototype.applyBindingsInternal=function(b,c,d){var e=!1,f=this.getNodeState(c);f?f.isBound&&j.throwError("an element must not be bound multiple times!"):(f=this.createNodeState(),this.setNodeState(c,f));var g,h=c.tagName.toLowerCase();if(d.hasComponent(h)||this.app.hasComponent(h)){var i,k=c.getAttribute(a.paramsAttributename);i=k?"{ name: '"+h+"', params: {"+c.getAttribute(a.paramsAttributename)+"} }":"{ name: '"+h+"' }",g=[{key:"component",value:i}]}else g=this.getBindingDefinitions(c);if(null!=g&&g.length>0){var l=g.map(function(a){var b=d.binding(a.key);return b||j.throwError("binding '{0}' has not been registered.",a.key),{handler:b,value:a.value}});l.sort(function(a,b){return(b.handler.priority||0)-(a.handler.priority||0)});var m=l.filter(function(a){return a.handler.controlsDescendants}).map(function(a){return"'"+a.value+"'"});m.length>1&&j.throwError("bindings {0} are competing for descendants of target element!",m.join(", ")),e=m.length>0;for(var n=0;n<l.length;n++){var o=l[n],p=o.handler;p.applyBinding(c,o.value,b,f,d)}}return f.isBound=!0,e},a.prototype.isObjectLiteralString=function(a){return"{"===a[0]&&"}"===a[a.length-1]},a.prototype.getBindingDefinitions=function(b){var c=null;if(1===b.nodeType){var d=b.getAttribute(a.bindingAttributeName);d&&(c=d)}return c&&(c=c.trim()),c?this.compiler.parseObjectLiteral(c):null},a.prototype.applyBindingsRecursive=function(a,b,c){if(c=c||this.getModuleContext(b),!this.applyBindingsInternal(a,b,c)&&b.hasChildNodes()){var d=this.getNodeState(b);d&&d.module&&(c=d.module);for(var e=0;e<b.childNodes.length;e++){var f=b.childNodes[e];1===f.nodeType&&this.applyBindingsRecursive(a,f,c)}}},a.prototype.cleanNodeRecursive=function(a){if(a.hasChildNodes())for(var b=a.childNodes.length,c=0;b>c;c++){var d=a.childNodes[c];1===a.nodeType&&this.cleanNodeRecursive(d)}this.clearNodeState(a)},a.prototype.createLocals=function(a,b){var c,d,e,f,g={},i={readFieldHook:function(b,c){var d=!1;if("@"===c[0]&&(d=!0,c=c.substring(1)),e=b[c],!d&&j.isProperty(e)){var f=e;a&&a.add(f.changed),e=f()}return e},writeFieldHook:function(b,c,d){if("@"===c[0]&&(c=c.substring(1)),f=b[c],j.isProperty(f)){var e=f;a&&a.add(e.changed),e(d)}else b[c]=d;return d},readIndexHook:function(b,d){if(j.queryInterface(b,h["default"].IObservableList)?(c=b,e=c.get(d),a&&a.add(c.listChanged)):e=b[d],j.queryInterface(e,h["default"].IObservableProperty)){var f=e;a&&a.add(f.changed),e=f()}return e},writeIndexHook:function(b,e,g){return j.queryInterface(b,h["default"].IObservableList)?(c=b,f=c.get(e),a&&a.add(c.listChanged),j.isProperty(f)?(d=f,a&&a.add(d.changed),d(g)):c.set(e,g)):j.isProperty(b[e])?(d=f[e],a&&a.add(d.changed),d(g)):b[e]=g,g}};this.compiler.setRuntimeHooks(g,i);for(var k=Object.keys(b),l=k.length,m=0;l>m;m++){var n=k[m];g[n]=b[n]}return g},a.bindingAttributeName="data-bind",a.paramsAttributename="params",a}();b.DomManager=m,b.applyBindings=d,b.cleanNode=e},function(a,b,c){var d=c(5),e=window,f=e.navigator.userAgent,g=function(a){return a?parseFloat(a[1]):void 0};e.opera&&e.opera.version&&(b.opera={version:parseInt(e.opera.version())});var h=document&&function(){for(var a=3,b=document.createElement("div"),c=b.getElementsByTagName("i");b.innerHTML="<!--[if gt wx.IE "+ ++a+"]><i></i><![endif]-->",c[0];);return a>4?a:void 0}();if(h&&(b.ie={version:h},10>h)){var i=d.createWeakMap();b.ie.getSelectionChangeObservable=function(a){var b=a.ownerDocument,c=i.get(b);return c?c:(c=Rx.Observable.defer(function(){return Rx.Observable.fromEvent(b,"selectionchange")}).select(function(a){return b}).publish().refCount(),i.set(b,c),c)}}h=g(f.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i)),h&&(b.safari={version:h}),h=g(f.match(/Firefox\/([^ ]*)/)),h&&(b.firefox={version:h});var j="function"==typeof Array.isArray&&"function"==typeof[].forEach&&"function"==typeof[].map&&"function"==typeof[].some&&"function"==typeof[].indexOf&&"function"==typeof Object.keys&&"function"==typeof Object.defineProperty;b.isSupported=!b.ie||b.ie.version>=9||!b.safari||b.safari.version>=5||(!b.firefox||b.firefox.version>=5)&&j,b.jQueryInstance=window.jQuery,b.jQueryInstance&&"function"==typeof b.jQueryInstance.cleanData?b.cleanExternalData=function(a){b.jQueryInstance.cleanData([a])}:b.cleanExternalData=function(a){}},function(a,b,c){"use strict";function d(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a}function e(a,b){for(var c,e,f,l,m,n=b.createDocumentFragment(),o=[],p=0,q=a.length;q>p;p++)if(c=a[p],c||0===c)if("object"==typeof c)d(o,c.nodeType?[c]:c);else if(i.test(c)){for(e=e||n.appendChild(b.createElement("div")),f=(h.exec(c)||["",""])[1].toLowerCase(),l=k[f]||k._default,e.innerHTML=l[1]+c.replace(g,"<$1></$2>")+l[2],m=l[0];m--;)e=e.lastChild;d(o,e.childNodes),e=n.firstChild,e.textContent=""}else o.push(b.createTextNode(c));for(n.textContent="",p=0;c=o[p++];)1===c.nodeType&&"script"===c.tagName.toLowerCase()&&j.test(c.type||"")||n.appendChild(c);return n}var f=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,g=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,h=/<([\w:-]+)/,i=/<|&#?\w+;/,j=/^$|\/(?:java|ecma)script/i,k={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table>","</table>"],td:[3,"<table>","</table>"],_default:[0,"",""]};k.optgroup=k.option,k.tbody=k.tfoot=k.colgroup=k.caption=k.thead,k.th=k.td;var l=function(){var a=document.implementation.createHTMLDocument("");return a.body?(a.body.innerHTML="<form></form><form></form>",2===a.body.childNodes.length):!1}(),m=function(){function a(){}return a.prototype.parse=function(a){var b=l?document.implementation.createHTMLDocument(""):document,c=f.exec(a);if(c)return[b.createElement(c[1])];c=e([a],b);var g=d([],c.childNodes);return g},a}();b["default"]=m},function(a,b,c){var d=c(3),e=c(20),f=function(){function a(a,b){this.priority=0,this.domManager=a,this.app=b}return a.prototype.applyBinding=function(a,b,c,f,g){function h(){m&&(m.dispose(),m=null)}var i=this;1!==a.nodeType&&d.throwError("command-binding only operates on elements!"),null==b&&d.throwError("invalid binding-options!");var j,k,l,m,n=this.domManager.compileBindingOptions(b,g),o=a,p="a"===o.tagName.toLowerCase();if("function"==typeof n)j=n,k=this.domManager.expressionToObservable(j,c);else{var q=n;j=q.command,k=this.domManager.expressionToObservable(j,c),q.parameter&&(j=q.parameter,l=this.domManager.expressionToObservable(j,c))}null==l&&(l=Rx.Observable["return"](void 0)),f.cleanup.add(Rx.Observable.combineLatest(k,l,function(a,b){return{cmd:a,param:b}}).subscribe(function(a){try{h(),m=new Rx.CompositeDisposable,null!=a.cmd&&(e.isCommand(a.cmd)||d.throwError("Command-Binding only supports binding to a command!"),d.elementCanBeDisabled(o)&&(o.disabled=!a.cmd.canExecute(a.param),m.add(a.cmd.canExecuteObservable.subscribe(function(a){o.disabled=!a}))),m.add(Rx.Observable.fromEvent(o,"click").subscribe(function(b){a.cmd.canExecute(a.param)&&a.cmd.execute(a.param),p&&b.preventDefault()})))}catch(b){i.app.defaultExceptionHandler.onNext(b)}})),f.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,f=null,o=null,h()}))},a.prototype.configure=function(a){},a}();b["default"]=f},function(a,b,c){function d(){var a,b,c,d,f=k.args2Array(arguments);return k.isFunction(f[0])?(b=f.shift(),a=k.isRxObservable(f[0])?f.shift():Rx.Observable["return"](!0),c=k.isRxScheduler(f[0])?f.shift():void 0,d=f.shift(),null!=d&&(b=b.bind(d)),e(a,function(a){return Rx.Observable.create(function(c){try{b(a),c.onNext(null),c.onCompleted()}catch(d){c.onError(d)}return Rx.Disposable.empty})},c)):(a=f.shift()||Rx.Observable["return"](!0),c=k.isRxScheduler(f[0])?f.shift():void 0,new o(a,function(a){return Rx.Observable["return"](a)},c))}function e(){var a,b,c,d,e=k.args2Array(arguments);return k.isFunction(e[0])?(b=e.shift(),c=k.isRxScheduler(e[0])?e.shift():void 0,d=e.shift(),null!=d&&(b=b.bind(d)),new o(Rx.Observable["return"](!0),b,c)):(a=e.shift(),b=e.shift(),c=k.isRxScheduler(e[0])?e.shift():void 0,new o(a,b,c))}function f(){var a=k.args2Array(arguments),b=a.filter(function(a){return g(a)}),c=a.filter(function(a){return k.isRxObservable(a)}).pop();c||(c=Rx.Observable["return"](!0));var e=Rx.Observable.combineLatest(b.map(function(a){return a.canExecuteObservable}),function(){for(var a=[],b=0;b<arguments.length;b++)a[b-0]=arguments[b];return a.every(function(a){return a})}),f=Rx.Observable.combineLatest(c.startWith(!0),e,function(a,b){return a&&b}),h=d(f);return h.results.subscribe(function(a){return b.forEach(function(b){b.execute(a)})}),h}function g(a){return null==a?!1:a instanceof o||k.queryInterface(a,j["default"].ICommand)}var h=this&&this.__decorate||function(a,b,c,d){if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)return Reflect.decorate(a,b,c,d);switch(arguments.length){case 2:return a.reduceRight(function(a,b){return b&&b(a)||a},b);case 3:return a.reduceRight(function(a,d){return void(d&&d(b,c))},void 0);case 4:return a.reduceRight(function(a,d){return d&&d(b,c,a)||a},d)}},i=this&&this.__metadata||function(a,b){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(a,b):void 0},j=c(10),k=c(3),l=c(4),m=c(2),n=c(11),o=function(){function a(a,b,c){var d=this;this.resultsSubject=new Rx.Subject,this.isExecutingSubject=new Rx.Subject,this.inflightCount=0,this.canExecuteLatest=!1,this.canExecuteDisp=null,this.scheduler=c||m.injector.get(n.app).mainThreadScheduler,this.func=b,this.canExecuteObs=a.combineLatest(this.isExecutingSubject.startWith(!1),function(a,b){return a&&!b})["catch"](function(a){return d.exceptionsSubject.onNext(a),Rx.Observable["return"](!1)})["do"](function(a){d.canExecuteLatest=a}).publish(),k.isInUnitTest()&&this.canExecuteObs.connect(),this.exceptionsSubject=new Rx.Subject,this.thrownExceptions=this.exceptionsSubject.asObservable(),this.exceptionsSubject.observeOn(this.scheduler).subscribe(m.injector.get(n.app).defaultExceptionHandler)}return a.prototype.dispose=function(){var a=this.canExecuteDisp;null!=a&&a.dispose()},Object.defineProperty(a.prototype,"canExecuteObservable",{get:function(){var a=this,b=this.canExecuteObs.startWith(this.canExecuteLatest).distinctUntilChanged();return null!=this.canExecuteDisp?b:Rx.Observable.create(function(c){var d=b.subscribe(c);return a.canExecuteDisp=a.canExecuteObs.connect(),d})},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"isExecuting",{get:function(){return this.isExecutingSubject.startWith(this.inflightCount>0)},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"results",{get:function(){return this.resultsSubject.asObservable()},enumerable:!0,configurable:!0}),a.prototype.canExecute=function(a){return null==this.canExecuteDisp&&(this.canExecuteDisp=this.canExecuteObs.connect()),this.canExecuteLatest},a.prototype.execute=function(a){this.executeAsync(a)["catch"](Rx.Observable.empty()).subscribe()},a.prototype.executeAsync=function(a){var b=this,c=Rx.Observable.create(function(c){1===++b.inflightCount&&b.isExecutingSubject.onNext(!0);var d=new Rx.SerialDisposable;d.setDisposable(Rx.Disposable.create(function(){0===--b.inflightCount&&b.isExecutingSubject.onNext(!1)}));var e=b.func(a).observeOn(b.scheduler)["do"](function(a){},function(a){return d.setDisposable(Rx.Disposable.empty)},function(){return d.setDisposable(Rx.Disposable.empty)})["do"](function(a){return b.resultsSubject.onNext(a)},function(a){return b.exceptionsSubject.onNext(a)}).subscribe(c);return new Rx.CompositeDisposable(e,d)});return c.publish().refCount()},a=h([l.Implements(j["default"].ICommand),l.Implements(j["default"].IDisposable),i("design:paramtypes",[Rx.Observable,Function,Object])],a)}();b.Command=o;var p;!function(a){a.commandConstructor=o}(p=b.internal||(b.internal={})),b.command=d,b.asyncCommand=e,b.combinedCommand=f,b.isCommand=g},function(a,b,c){var d=c(3),e=c(14),f=function(){function a(a,b){this.priority=100,this.controlsDescendants=!0,this.domManager=a,this.app=b}return a.prototype.applyBinding=function(a,b,c,f,g){function h(){j&&(j.dispose(),j=null)}var i=this;1!==a.nodeType&&d.throwError("module-binding only operates on elements!"),null==b&&d.throwError("invalid binding-options!");var j,k=a,l=this,m=this.domManager.compileBindingOptions(b,g),n=this.domManager.expressionToObservable(m,c),o=!0,p=new Array;f.cleanup.add(n.subscribe(function(a){try{h(),j=new Rx.CompositeDisposable;var b,m=d.unwrapProperty(a),n=void 0;if(m&&(m=m.trim(),b=m.split(" ").filter(function(a){return a})),b.length>0){var q=b.map(function(a){return e.loadModule(a)});n=Rx.Observable.combineLatest(q,function(a){return d.args2Array(arguments)}).subscribe(function(a){try{var d=(g||i.app).name+"+"+b.join("+"),h=new e.Module(d);h.merge(g||i.app),a.forEach(function(a){return h.merge(a)}),l.applyValue(k,h,p,c,f,o),o=!1}catch(j){i.app.defaultExceptionHandler.onNext(j)}}),null!=n&&j.add(n)}}catch(r){i.app.defaultExceptionHandler.onNext(r)}})),f.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,f=null,n=null,l=null}))},a.prototype.configure=function(a){},a.prototype.applyValue=function(a,b,c,d,e,f){if(f)for(var g=0;g<a.childNodes.length;g++)c.push(a.childNodes[g].cloneNode(!0));for(e.module=b,this.domManager.cleanDescendants(a);a.firstChild;)a.removeChild(a.firstChild);for(var g=0;g<c.length;g++){var h=c[g].cloneNode(!0);a.appendChild(h)}this.domManager.applyBindingsToDescendants(d,a)},a}();b["default"]=f},function(a,b,c){var d=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},e=c(3),f=function(){function a(a,b){this.priority=50,this.controlsDescendants=!0,this.inverse=!1,this.domManager=a,this.app=b}return a.prototype.applyBinding=function(a,b,c,d,f){function g(){j&&(j.dispose(),j=null)}var h=this;1!==a.nodeType&&e.throwError("if-binding only operates on elements!"),null==b&&e.throwError("invalid binding-options!");var i,j,k=this.domManager.compileBindingOptions(b,f),l=a,m=this,n=!0,o={};if("object"==typeof k){var p=k;i=p.condition,p.enter&&(o.enter=this.domManager.evaluateExpression(p.enter,c),"string"==typeof o.enter&&(o.enter=f.animation(o.enter))),p.leave&&(o.leave=this.domManager.evaluateExpression(p.leave,c),"string"==typeof o.leave&&(o.leave=f.animation(o.leave)))}else i=k;var q=this.domManager.expressionToObservable(i,c),r=new Array;d.cleanup.add(q.subscribe(function(a){try{g(),j=new Rx.CompositeDisposable,j.add(m.applyValue(l,e.unwrapProperty(a),r,c,o,n)),n=!1}catch(b){h.app.defaultExceptionHandler.onNext(b)}})),d.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,d=null,q=null,l=null,m=null,r=null}))},a.prototype.configure=function(a){},a.prototype.applyValue=function(a,b,c,d,f,g){function h(){n.forEach(function(b){k.domManager.cleanNode(b),a.removeChild(b)})}var i=f.leave,j=f.enter,k=this,l=void 0;if(g){for(var m=0;m<a.childNodes.length;m++)c.push(a.childNodes[m].cloneNode(!0));for(;a.firstChild;)a.removeChild(a.firstChild)}var n=e.nodeChildrenToArray(a);if(b=this.inverse?!b:b){var o=c.map(function(a){return a.cloneNode(!0)});j&&j.prepare(o);for(var m=0;m<c.length;m++)a.appendChild(o[m]);this.domManager.applyBindingsToDescendants(d,a),j&&(l=j.run(o).continueWith(function(){return j.complete(o)}))}else n.length>0&&(i?(i.prepare(n),l=i.run(n).continueWith(function(){return i.complete(n)}).continueWith(h)):h());return l?l.subscribe()||Rx.Disposable.empty:Rx.Disposable.empty},a}();b.IfBinding=f;var g=function(a){function b(b,c){a.call(this,b,c),this.inverse=!0}return d(b,a),b}(f);b.NotIfBinding=g},function(a,b,c){var d=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},e=c(3),f=c(24),g=function(a){function b(b,c){a.call(this,b,c,!0)}return d(b,a),b.prototype.applyValue=function(a,b,c){var d;if(""!==c)d=c.split(/\s+/).map(function(a){return a.trim()}).filter(function(a){return a}),d.length&&e.toggleCssClass.apply(null,[a,!!b].concat(d));else{var f=this.domManager.getNodeState(a);null!=f.cssBindingPreviousDynamicClasses&&(e.toggleCssClass.apply(null,[a,!1].concat(f.cssBindingPreviousDynamicClasses)),f.cssBindingPreviousDynamicClasses=null),b&&(d=b.split(/\s+/).map(function(a){return a.trim()}).filter(function(a){return a}),d.length&&(e.toggleCssClass.apply(null,[a,!0].concat(d)),f.cssBindingPreviousDynamicClasses=d))}},b}(f.MultiOneWayBindingBase);b.CssBinding=g;var h=function(a){function b(b,c){a.call(this,b,c),this.priority=5}return d(b,a),b.prototype.applyValue=function(a,b,c){var d=b===!1||null===b||void 0===b;d?a.removeAttribute(c):a.setAttribute(c,b.toString())},b}(f.MultiOneWayBindingBase);b.AttrBinding=h;var i=function(a){function b(b,c){a.call(this,b,c)}return d(b,a),b.prototype.applyValue=function(a,b,c){(null===b||void 0===b||b===!1)&&(b=""),a.style[c]=b},b}(f.MultiOneWayBindingBase);b.StyleBinding=i},function(a,b,c){var d=c(3),e=function(){function a(a,b){this.priority=0,this.domManager=a,this.app=b}return a.prototype.applyBinding=function(a,b,c,e,f){var g=this;1!==a.nodeType&&d.throwError("binding only operates on elements!"),null==b&&d.throwError("invalid binding-options!");var h=a,i=this,j=this.domManager.compileBindingOptions(b,f),k=this.domManager.expressionToObservable(j,c);e.cleanup.add(k.subscribe(function(a){try{i.applyValue(h,d.unwrapProperty(a))}catch(b){g.app.defaultExceptionHandler.onNext(b)}})),e.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,e=null,h=null,k=null,i=null}))},a.prototype.configure=function(a){},
a.prototype.applyValue=function(a,b){d.throwError("you need to override this method!")},a}();b.SingleOneWayBindingBase=e;var f=function(){function a(a,b,c){void 0===c&&(c=!1),this.priority=0,this.supportsDynamicValues=!1,this.domManager=a,this.app=b,this.supportsDynamicValues=c}return a.prototype.applyBinding=function(a,b,c,e,f){1!==a.nodeType&&d.throwError("binding only operates on elements!");var g=this.domManager.compileBindingOptions(b,f);(null==g||"object"!=typeof g&&!this.supportsDynamicValues)&&d.throwError("invalid binding-options!");var h,i,j,k=a,l=new Array,m=Object.keys(g);if("function"==typeof g)i=g,h=this.domManager.expressionToObservable(i,c),l.push(["",h]);else for(var n=0;n<m.length;n++){j=m[n];var o=g[j];i=o,h=this.domManager.expressionToObservable(i,c),l.push([j,h])}for(var n=0;n<l.length;n++)j=l[n][0],h=l[n][1],this.subscribe(k,h,j,e);e.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,e=null,k=null,m=null,l=null}))},a.prototype.configure=function(a){},a.prototype.subscribe=function(a,b,c,e){var f=this;e.cleanup.add(b.subscribe(function(b){try{f.applyValue(a,d.unwrapProperty(b),c)}catch(e){f.app.defaultExceptionHandler.onNext(e)}}))},a.prototype.applyValue=function(a,b,c){d.throwError("you need to override this method!")},a}();b.MultiOneWayBindingBase=f},function(a,b,c){var d=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},e=c(3),f=c(24),g=function(a){function b(b,c){a.call(this,b,c)}return d(b,a),b.prototype.applyValue=function(a,b){(null===b||void 0===b)&&(b=""),a.textContent=b},b}(f.SingleOneWayBindingBase);b.TextBinding=g;var h=function(a){function b(b,c){a.call(this,b,c),this.inverse=!1,this.inverse=!1,this.priority=10}return d(b,a),b.prototype.configure=function(a){var c=a;b.useCssClass=c.useCssClass,b.hiddenClass=c.hiddenClass},b.prototype.applyValue=function(a,c){c=this.inverse?!c:c,b.useCssClass?e.toggleCssClass(a,!c,b.hiddenClass):c?a.style.display="":a.style.display="none"},b}(f.SingleOneWayBindingBase);b.VisibleBinding=h;var i=function(a){function b(b,c){a.call(this,b,c),this.inverse=!0}return d(b,a),b}(h);b.HiddenBinding=i;var j=function(a){function b(b,c){a.call(this,b,c)}return d(b,a),b.prototype.applyValue=function(a,b){(null===b||void 0===b)&&(b=""),a.innerHTML=b},b}(f.SingleOneWayBindingBase);b.HtmlBinding=j;var k=function(a){function b(b,c){a.call(this,b,c),this.inverse=!1,this.inverse=!1}return d(b,a),b.prototype.applyValue=function(a,b){b=this.inverse?!b:b,e.elementCanBeDisabled(a)&&(a.disabled=b)},b}(f.SingleOneWayBindingBase);b.DisableBinding=k;var l=function(a){function b(b,c){a.call(this,b,c),this.inverse=!0}return d(b,a),b}(k);b.EnableBinding=l},function(a,b,c){var d=c(3),e=c(27),f=c(28),g=c(2),h=c(29),i=function(){function a(a,b){this.priority=40,this.controlsDescendants=!0,this.domManager=a,this.app=b,a.registerDataContextExtension(function(b,c){var d=a.getNodeState(b);c.$index=d.index})}return a.prototype.applyBinding=function(a,b,c,e,f){var h=this;1!==a.nodeType&&d.throwError("forEach binding only operates on elements!"),null==b&&d.throwError("** invalid binding options!");var i,j,k,l=this.domManager.compileBindingOptions(b,f),m=a,n=this,o=!0,p=null,q={};if("object"==typeof l&&l.hasOwnProperty("data")){var r=l;j=r.data,r.itemEnter&&(q.itemEnter=this.domManager.evaluateExpression(r.itemEnter,c),"string"==typeof q.itemEnter&&(q.itemEnter=f.animation(q.itemEnter))),r.itemLeave&&(q.itemLeave=this.domManager.evaluateExpression(r.itemLeave,c),"string"==typeof q.itemLeave&&(q.itemLeave=f.animation(q.itemLeave))),r.hooks&&(i=this.domManager.evaluateExpression(r.hooks,c)),"string"==typeof i&&(i=g.injector.get(i)),r.debug&&r.debug.setProxyFunc&&(k=this.domManager.evaluateExpression(r.debug.setProxyFunc,c))}else j=l;var s=this.domManager.expressionToObservable(j,c);e.cleanup.add(Rx.Disposable.create(function(){p&&(p.dispose(),p=null)}));var t=new Array;e.cleanup.add(s.subscribe(function(a){try{p&&p.dispose(),p=new Rx.CompositeDisposable,n.applyValue(m,a,i,q,t,c,o,p,k),o=!1}catch(b){h.app.defaultExceptionHandler.onNext(b)}})),e.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,e=null,s=null,m=null,n=null,t=null,i=null}))},a.prototype.configure=function(a){},a.prototype.createIndexPropertyForNode=function(a,b,c,d,e){return Rx.Observable.defer(function(){return Rx.Observable.create(function(c){return d.subscribe(function(d){var f=a.childNodes.indexOf(b);f/=e,c.onNext(f)})})}).toProperty(c)},a.prototype.appendAllRows=function(a,b,c,d,e,f,g,h){for(var i=b.length(),j=0;i>j;j++)this.appendRow(a,j,b.get(j),c,d,e,f,g,h)},a.prototype.appendRow=function(a,b,c,e,g,h,i,j,k){var l=d.cloneNodeArray(g),m=b,n=i.itemEnter,o={item:c};if(j&&(m=this.createIndexPropertyForNode(a,l[0],b,j,g.length),o.indexDisp=new f["default"](m,0)),o.index=m,null!=n&&n.prepare(l),a.appendChilds(l,o),h&&(h.afterRender&&h.afterRender(l,c),!k&&h.afterAdd&&h.afterAdd(l,c,b)),n)var p=n.run(l).continueWith(function(){return n.complete(l)}).subscribe(function(a){null!=p&&p.dispose()})},a.prototype.insertRow=function(a,b,c,e,g,h,i,j){var k=g.length,l=i.itemEnter,m=d.cloneNodeArray(g),n=this.createIndexPropertyForNode(a,m[0],b,j,g.length);if(null!=l&&l.prepare(m),a.insertChilds(b*k,m,{index:n,item:c,indexDisp:new f["default"](n,0)}),h&&(h.afterRender&&h.afterRender(m,c),h.afterAdd&&h.afterAdd(m,c,b)),l)var o=l.run(m).continueWith(function(){return l.complete(m)}).subscribe(function(a){null!=o&&o.dispose()})},a.prototype.removeRow=function(a,b,c,d,e,f){function g(){for(var a=0;h>a;a++)i.removeChild(j[a])}var h=d.length,i=a.targetNode,j=a.removeChilds(b*h,h,!0),k=f.itemLeave;if(e&&e.beforeRemove)e.beforeRemove(j,c,b);else if(null!=k){k.prepare(j);var l=k.run(j).continueWith(function(){return k.complete(j)}).continueWith(g).subscribe(function(a){null!=l&&l.dispose()})}else g()},a.prototype.moveRow=function(a,b,c,e,g,h,i,j){function k(){for(var a=0;n>a;a++)o.removeChild(p[a])}function l(){p=d.cloneNodeArray(g);var i=t.createIndexPropertyForNode(a,p[0],b,j,g.length);null!=r&&r.prepare(p),a.insertChilds(n*c,p,{index:i,item:e,indexDisp:new f["default"](i,0)}),h&&h.afterMove&&h.afterMove(p,e,b)}var m,n=g.length,o=a.targetNode,p=a.removeChilds(b*n,n,!0),q=i.itemLeave,r=i.itemEnter,s=[],t=this;h&&h.beforeMove&&h.beforeMove(p,e,b),q?(q.prepare(p),m=q.run(p).continueWith(function(){return q.complete(p)}).continueWith(k)):m=Rx.Observable.startDeferred(k),s.push(m),m=Rx.Observable.startDeferred(l),r&&(m=m.continueWith(r.run(p)).continueWith(function(){return r.complete(p)})),s.push(m),s.length>1?m=Rx.Observable.combineLatest(s,d.noop).take(1):1===s.length&&(m=s[0].take(1));var u=m.subscribe(function(a){null!=u&&u.dispose()})},a.prototype.rebindRow=function(a,b,c,d,e){for(var g=d.length,h=this.createIndexPropertyForNode(a,a.childNodes[b*g],b,e,d.length),i=new f["default"](h,0),j=0;j<d.length;j++){var k=a.childNodes[b*g+j];if(1===k.nodeType){this.domManager.cleanNode(k);var l=this.domManager.createNodeState(c);l.index=h,i.addRef(),l.cleanup.add(i),this.domManager.setNodeState(k,l),this.domManager.applyBindings(c,k)}}},a.prototype.observeList=function(a,b,c,d,e,f,g,h){var i,j=this;d.add(h),this.appendAllRows(a,e,b,c,f,g,h,!0),d.add(e.itemsAdded.subscribe(function(d){if(i=d.items.length,d.from===e.length())for(var k=0;i>k;k++)j.appendRow(a,k+d.from,d.items[k],b,c,f,g,h,!1);else for(var l=0;l<d.items.length;l++)j.insertRow(a,l+d.from,d.items[l],b,c,f,g,h);h.onNext(!0)})),d.add(e.itemsRemoved.subscribe(function(b){i=b.items.length;for(var d=0;i>d;d++)j.removeRow(a,d+b.from,b.items[d],c,f,g);h.onNext(!0)})),d.add(e.itemsMoved.subscribe(function(b){j.moveRow(a,b.from,b.to,b.items[0],c,f,g,h),h.onNext(!0)})),d.add(e.itemReplaced.subscribe(function(b){j.rebindRow(a,b.from,b.items[0],c,h),h.onNext(!0)})),d.add(e.shouldReset.subscribe(function(d){a.clear(),j.appendAllRows(a,e,b,c,f,g,h,!1),h.onNext(!0)}))},a.prototype.applyValue=function(a,b,c,d,f,g,i,j,k){function l(a,b){var c=b.item,d=b.index,e=b.indexDisp;if(1===a.nodeType){var f=r.domManager.getNodeState(a)||r.domManager.createNodeState();f.model=c,f.index=d,r.domManager.setNodeState(a,f),null!=q&&null!=e&&(e.addRef(),f.cleanup.add(e)),r.domManager.applyBindings(c,a)}}function m(a){1===a.nodeType&&r.domManager.cleanNode(a)}var n;if(i){n=a.childNodes.length;for(var o=0;n>o;o++)f.push(a.childNodes[o].cloneNode(!0))}for(;a.firstChild;)a.removeChild(a.firstChild);if(0!==f.length){var p,q,r=this;if(p=new e["default"](a,!1,l,m),k&&k(p),j.add(Rx.Disposable.create(function(){p=null})),Array.isArray(b)){var s=b;n=s.length;for(var t=0;n>t;t++)this.appendRow(p,t,s[t],g,f,c,d,void 0,!0)}else if(h.isList(b)){var u=b;q=new Rx.Subject,this.observeList(p,g,f,j,u,c,d,q)}}},a}();b["default"]=i},function(a,b,c){"use strict";var d=function(){function a(a,b,c,d){if(this.childNodes=[],this.targetNode=a,this.insertCB=c,this.removeCB=d,b)for(var e=0;e<a.childNodes.length;e++)this.childNodes.push(a.childNodes[e])}return a.prototype.appendChilds=function(a,b){var c=a.length;a.length>1?Array.prototype.push.apply(this.childNodes,a):this.childNodes.push(a[0]);for(var d=0;c>d;d++)this.targetNode.appendChild(a[d]);if(this.insertCB)for(var d=0;c>d;d++)this.insertCB(a[d],b)},a.prototype.insertChilds=function(a,b,c){if(a===this.childNodes.length)this.appendChilds(b,c);else{var d=this.childNodes[a],e=b.length;Array.prototype.splice.apply(this.childNodes,[a,0].concat(b));for(var f=0;e>f;f++)this.targetNode.insertBefore(b[f],d);if(this.insertCB)for(var f=0;e>f;f++)this.insertCB(b[f],c)}},a.prototype.removeChilds=function(a,b,c){var d;if(0===b)return[];var e=this.childNodes.slice(a,a+b);if(this.childNodes.splice(a,b),!c)for(var f=e.length,g=0;f>g;g++)d=e[g],this.removeCB&&this.removeCB(d),this.targetNode.removeChild(d);return e},a.prototype.clear=function(){for(var a,b=this.childNodes.length,c=0;b>c;c++)a=this.childNodes[c],this.removeCB&&this.removeCB(a),this.targetNode.removeChild(a);this.childNodes=[]},a}();b["default"]=d},function(a,b,c){"use strict";var d=function(){function a(a,b){void 0===b&&(b=1),this.inner=a,this.refCount=b}return a.prototype.addRef=function(){this.refCount++},a.prototype.release=function(){return 0===--this.refCount&&(this.inner.dispose(),this.inner=null),this.refCount},a.prototype.dispose=function(){this.release()},a}();b["default"]=d},function(a,b,c){function d(a,b,c){return void 0===b&&(b=.3),void 0===c&&(c=null),new t(a,b,c)}function e(a){return null==a?!1:a instanceof t}var f=this&&this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},g=this&&this.__decorate||function(a,b,c,d){if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)return Reflect.decorate(a,b,c,d);switch(arguments.length){case 2:return a.reduceRight(function(a,b){return b&&b(a)||a},b);case 3:return a.reduceRight(function(a,d){return void(d&&d(b,c))},void 0);case 4:return a.reduceRight(function(a,d){return d&&d(b,c,a)||a},d)}},h=this&&this.__metadata||function(a,b){return"object"==typeof Reflect&&"function"==typeof Reflect.metadata?Reflect.metadata(a,b):void 0},i=c(3),j=c(6),k=c(10),l=c(30),m=c(31),n=c(9),o=c(28),p=c(12),q=c(4),r=c(2),s=c(11),t=function(){function a(a,b,c){void 0===b&&(b=.3),void 0===c&&(c=null),this.push=this.add,this.changeNotificationsSuppressed=0,this.propertyChangeWatchers=null,this.resetChangeThreshold=0,this.resetSubCount=0,this.hasWhinedAboutNoResetSub=!1,this.app=r.injector.get(s.app),this.setupRx(a,b,c)}return a.prototype.dispose=function(){this.clearAllPropertyChangeWatchers()},Object.defineProperty(a.prototype,"isReadOnly",{get:function(){return!1},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"itemsAdded",{get:function(){return this._itemsAdded||(this._itemsAdded=this.itemsAddedSubject.value.asObservable()),this._itemsAdded},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"beforeItemsAdded",{get:function(){return this._beforeItemsAdded||(this._beforeItemsAdded=this.beforeItemsAddedSubject.value.asObservable()),this._beforeItemsAdded},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"itemsRemoved",{get:function(){return this._itemsRemoved||(this._itemsRemoved=this.itemsRemovedSubject.value.asObservable()),this._itemsRemoved},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"beforeItemsRemoved",{get:function(){return this._beforeItemsRemoved||(this._beforeItemsRemoved=this.beforeItemsRemovedSubject.value.asObservable()),this._beforeItemsRemoved},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"itemReplaced",{get:function(){return this._itemReplaced||(this._itemReplaced=this.itemReplacedSubject.value.asObservable()),this._itemReplaced},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"beforeItemReplaced",{get:function(){return this._beforeItemReplaced||(this._beforeItemReplaced=this.beforeItemReplacedSubject.value.asObservable()),this._beforeItemReplaced},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"beforeItemsMoved",{get:function(){return this._beforeItemsMoved||(this._beforeItemsMoved=this.beforeItemsMovedSubject.value.asObservable()),this._beforeItemsMoved},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"itemsMoved",{get:function(){return this._itemsMoved||(this._itemsMoved=this.itemsMovedSubject.value.asObservable()),this._itemsMoved},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"lengthChanging",{get:function(){var a=this;return this._lengthChanging||(this._lengthChanging=this.listChanging.select(function(b){return a.inner.length}).distinctUntilChanged()),this._lengthChanging},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"lengthChanged",{get:function(){var a=this;return this._lengthChanged||(this._lengthChanged=this.listChanged.select(function(b){return a.inner.length}).distinctUntilChanged()),this._lengthChanged},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"itemChanging",{get:function(){return this._itemChanging||(this._itemChanging=this.itemChangingSubject.value.asObservable()),this._itemChanging},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"itemChanged",{get:function(){return this._itemChanged||(this._itemChanged=this.itemChangedSubject.value.asObservable()),this._itemChanged},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"shouldReset",{get:function(){var a=this;return this.refcountSubscribers(this.listChanged.selectMany(function(a){return a?Rx.Observable["return"](null):Rx.Observable.empty()}),function(b){return a.resetSubCount+=b})},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"changeTrackingEnabled",{get:function(){return null!=this.propertyChangeWatchers},set:function(a){var b=this;null!=this.propertyChangeWatchers&&a||(null!=this.propertyChangeWatchers||a)&&(a?(this.propertyChangeWatchers={},this.inner.forEach(function(a){return b.addItemToPropertyTracking(a)})):(this.clearAllPropertyChangeWatchers(),this.propertyChangeWatchers=null))},enumerable:!0,configurable:!0}),a.prototype.addRange=function(a){var b=this;null==a&&i.throwError("items");var c=this.isLengthAboveResetThreshold(a.length)?this.suppressChangeNotifications():Rx.Disposable.empty;i.using(c,function(){if(b.areChangeNotificationsEnabled()){var c=b.inner.length;b.beforeItemsAddedSubject.isValueCreated&&b.beforeItemsAddedSubject.value.onNext({items:a,from:c}),Array.prototype.push.apply(b.inner,a),b.itemsAddedSubject.isValueCreated&&b.itemsAddedSubject.value.onNext({items:a,from:c}),b.changeTrackingEnabled&&a.forEach(function(a){b.addItemToPropertyTracking(a)})}else Array.prototype.push.apply(b.inner,a),b.changeTrackingEnabled&&a.forEach(function(a){b.addItemToPropertyTracking(a)})})},a.prototype.insertRange=function(a,b){var c=this;null==b&&i.throwError("collection"),a>this.inner.length&&i.throwError("index");var d=this.isLengthAboveResetThreshold(b.length)?this.suppressChangeNotifications():Rx.Disposable.empty;i.using(d,function(){c.areChangeNotificationsEnabled()?(c.beforeItemsAddedSubject.isValueCreated&&b.forEach(function(d){c.beforeItemsAddedSubject.value.onNext({items:b,from:a})}),Array.prototype.splice.apply(c.inner,[a,0].concat(b)),c.itemsAddedSubject.isValueCreated&&c.itemsAddedSubject.value.onNext({items:b,from:a}),c.changeTrackingEnabled&&b.forEach(function(a){c.addItemToPropertyTracking(a)})):(Array.prototype.splice.apply(c.inner,[a,0].concat(b)),c.changeTrackingEnabled&&b.forEach(function(a){c.addItemToPropertyTracking(a)}))})},a.prototype.removeAll=function(a){var b=this;null==a&&i.throwError("items");var c=this.isLengthAboveResetThreshold(a.length)?this.suppressChangeNotifications():Rx.Disposable.empty;i.using(c,function(){a.forEach(function(a){return b.remove(a)})})},a.prototype.removeRange=function(a,b){var c=this,d=this.isLengthAboveResetThreshold(b)?this.suppressChangeNotifications():Rx.Disposable.empty;i.using(d,function(){var d=c.inner.slice(a,a+b);c.areChangeNotificationsEnabled()?(c.beforeItemsRemovedSubject.isValueCreated&&d.forEach(function(b){c.beforeItemsRemovedSubject.value.onNext({items:d,from:a})}),c.inner.splice(a,b),c.changeTrackingEnabled&&d.forEach(function(a){c.removeItemFromPropertyTracking(a)}),c.itemsRemovedSubject.isValueCreated&&d.forEach(function(b){c.itemsRemovedSubject.value.onNext({items:d,from:a})})):(c.inner.splice(a,b),c.changeTrackingEnabled&&d.forEach(function(a){c.removeItemFromPropertyTracking(a)}))})},a.prototype.toArray=function(){return this.inner},a.prototype.reset=function(){this.publishResetNotification()},a.prototype.add=function(a){this.insertItem(this.inner.length,a)},a.prototype.clear=function(){this.clearItems()},a.prototype.contains=function(a){return-1!==this.inner.indexOf(a)},a.prototype.remove=function(a){var b=this.inner.indexOf(a);return-1===b?!1:(this.removeItem(b),!0)},a.prototype.indexOf=function(a){return this.inner.indexOf(a)},a.prototype.insert=function(a,b){this.insertItem(a,b)},a.prototype.removeAt=function(a){this.removeItem(a)},a.prototype.move=function(a,b){this.moveItem(a,b)},a.prototype.project=function(){var a=i.args2Array(arguments),b=a.shift();if(null!=b&&i.isRxObservable(b))return new u(this,void 0,void 0,void 0,b,a.shift());var c=a.shift();if(null!=c&&i.isRxObservable(c))return new u(this,b,void 0,void 0,c,a.shift());var d=a.shift();return null!=d&&i.isRxObservable(d)?new u(this,b,c,void 0,d,a.shift()):new u(this,b,c,d,a.shift(),a.shift())},a.prototype.suppressChangeNotifications=function(){var a=this;return this.changeNotificationsSuppressed++,this.hasWhinedAboutNoResetSub||0!==this.resetSubCount||i.isInUnitTest()||(p.info("suppressChangeNotifications was called (perhaps via addRange), yet you do not have a subscription to shouldReset. This probably isn't what you want, as itemsAdded and friends will appear to 'miss' items"),this.hasWhinedAboutNoResetSub=!0),Rx.Disposable.create(function(){a.changeNotificationsSuppressed--,0===a.changeNotificationsSuppressed&&(a.publishBeforeResetNotification(),a.publishResetNotification())})},a.prototype.get=function(a){return this.inner[a]},a.prototype.set=function(a,b){return this.areChangeNotificationsEnabled()?(this.beforeItemReplacedSubject.isValueCreated&&this.beforeItemReplacedSubject.value.onNext({from:a,items:[b]}),this.changeTrackingEnabled&&(this.removeItemFromPropertyTracking(this.inner[a]),this.addItemToPropertyTracking(b)),this.inner[a]=b,void(this.itemReplacedSubject.isValueCreated&&this.itemReplacedSubject.value.onNext({from:a,items:[b]}))):(this.changeTrackingEnabled&&(this.removeItemFromPropertyTracking(this.inner[a]),this.addItemToPropertyTracking(b)),void(this.inner[a]=b))},a.prototype.sort=function(a){this.publishBeforeResetNotification(),this.inner.sort(a),this.publishResetNotification()},a.prototype.forEach=function(a,b){this.inner.forEach(a,b)},a.prototype.map=function(a,b){return this.inner.map(a,b)},a.prototype.filter=function(a,b){return this.inner.filter(a,b)},a.prototype.some=function(a,b){return this.inner.some(a,b)},a.prototype.every=function(a,b){return this.inner.every(a,b)},a.prototype.setupRx=function(a,b,c){void 0===b&&(b=.3),void 0===c&&(c=null),c=c||r.injector.get(s.app).mainThreadScheduler,this.resetChangeThreshold=b,void 0===this.inner&&(this.inner=new Array),this.beforeItemsAddedSubject=new l["default"](function(){return new Rx.Subject}),this.itemsAddedSubject=new l["default"](function(){return new Rx.Subject}),this.beforeItemsRemovedSubject=new l["default"](function(){return new Rx.Subject}),this.itemsRemovedSubject=new l["default"](function(){return new Rx.Subject}),this.beforeItemReplacedSubject=new l["default"](function(){return new Rx.Subject}),this.itemReplacedSubject=new l["default"](function(){return new Rx.Subject}),this.resetSubject=new Rx.Subject,this.beforeResetSubject=new Rx.Subject,this.itemChangingSubject=new l["default"](function(){return m.createScheduledSubject(c)}),this.itemChangedSubject=new l["default"](function(){return m.createScheduledSubject(c)}),this.beforeItemsMovedSubject=new l["default"](function(){return new Rx.Subject}),this.itemsMovedSubject=new l["default"](function(){return new Rx.Subject}),this.listChanged=Rx.Observable.merge(this.itemsAdded.select(function(a){return!1}),this.itemsRemoved.select(function(a){return!1}),this.itemReplaced.select(function(a){return!1}),this.itemsMoved.select(function(a){return!1}),this.resetSubject.select(function(a){return!0})).publish().refCount(),this.listChanging=Rx.Observable.merge(this.beforeItemsAdded.select(function(a){return!1}),this.beforeItemsRemoved.select(function(a){return!1}),this.beforeItemReplaced.select(function(a){return!1}),this.beforeItemsMoved.select(function(a){return!1}),this.beforeResetSubject.select(function(a){return!0})).publish().refCount(),a&&Array.prototype.splice.apply(this.inner,[0,0].concat(a)),this.length=this.lengthChanged.toProperty(this.inner.length),this.isEmpty=this.lengthChanged.select(function(a){return 0===a}).toProperty(0===this.inner.length)},a.prototype.areChangeNotificationsEnabled=function(){return 0===this.changeNotificationsSuppressed},a.prototype.insertItem=function(a,b){return this.areChangeNotificationsEnabled()?(this.beforeItemsAddedSubject.isValueCreated&&this.beforeItemsAddedSubject.value.onNext({items:[b],from:a}),this.inner.splice(a,0,b),this.itemsAddedSubject.isValueCreated&&this.itemsAddedSubject.value.onNext({items:[b],from:a}),void(this.changeTrackingEnabled&&this.addItemToPropertyTracking(b))):(this.inner.splice(a,0,b),void(this.changeTrackingEnabled&&this.addItemToPropertyTracking(b)))},a.prototype.removeItem=function(a){var b=this.inner[a];return this.areChangeNotificationsEnabled()?(this.beforeItemsRemovedSubject.isValueCreated&&this.beforeItemsRemovedSubject.value.onNext({items:[b],from:a}),this.inner.splice(a,1),this.itemsRemovedSubject.isValueCreated&&this.itemsRemovedSubject.value.onNext({items:[b],from:a}),void(this.changeTrackingEnabled&&this.removeItemFromPropertyTracking(b))):(this.inner.splice(a,1),void(this.changeTrackingEnabled&&this.removeItemFromPropertyTracking(b)))},a.prototype.moveItem=function(a,b){var c=this.inner[a];if(!this.areChangeNotificationsEnabled())return this.inner.splice(a,1),void this.inner.splice(b,0,c);var d={items:[c],from:a,to:b};this.beforeItemsMovedSubject.isValueCreated&&this.beforeItemsMovedSubject.value.onNext(d),this.inner.splice(a,1),this.inner.splice(b,0,c),this.itemsMovedSubject.isValueCreated&&this.itemsMovedSubject.value.onNext(d)},a.prototype.clearItems=function(){return this.areChangeNotificationsEnabled()?(this.publishBeforeResetNotification(),this.inner.length=0,this.publishResetNotification(),void(this.changeTrackingEnabled&&this.clearAllPropertyChangeWatchers())):(this.inner.length=0,void(this.changeTrackingEnabled&&this.clearAllPropertyChangeWatchers()))},a.prototype.addItemToPropertyTracking=function(a){var b=this.propertyChangeWatchers[j.getOid(a)],c=this;if(b)return void b.addRef();var d=i.observeObject(a,this.app.defaultExceptionHandler,!0).select(function(b){return new n.PropertyChangedEventArgs(a,b.propertyName)}),e=i.observeObject(a,this.app.defaultExceptionHandler,!1).select(function(b){return new n.PropertyChangedEventArgs(a,b.propertyName)}),f=new Rx.CompositeDisposable(d.where(function(a){return c.areChangeNotificationsEnabled()}).subscribe(function(a){return c.itemChangingSubject.value.onNext(a)}),e.where(function(a){return c.areChangeNotificationsEnabled()}).subscribe(function(a){return c.itemChangedSubject.value.onNext(a)}));this.propertyChangeWatchers[j.getOid(a)]=new o["default"](Rx.Disposable.create(function(){f.dispose(),delete c.propertyChangeWatchers[j.getOid(a)]}))},a.prototype.removeItemFromPropertyTracking=function(a){var b=this.propertyChangeWatchers[j.getOid(a)];b&&b.release()},a.prototype.clearAllPropertyChangeWatchers=function(){var a=this;null!=this.propertyChangeWatchers&&(Object.keys(this.propertyChangeWatchers).forEach(function(b){a.propertyChangeWatchers[b].release()}),this.propertyChangeWatchers=null)},a.prototype.refcountSubscribers=function(a,b){return Rx.Observable.create(function(c){return b(1),new Rx.CompositeDisposable(a.subscribe(c),Rx.Disposable.create(function(){return b(-1)}))})},a.prototype.publishResetNotification=function(){this.resetSubject.onNext(!0)},a.prototype.publishBeforeResetNotification=function(){this.beforeResetSubject.onNext(!0)},a.prototype.isLengthAboveResetThreshold=function(a){return a/this.inner.length>this.resetChangeThreshold&&a>10},a=g([q.Implements(k["default"].IObservableList),q.Implements(k["default"].IDisposable),h("design:paramtypes",[Array,Number,Object])],a)}();b.ObservableList=t;var u=function(a){function b(b,c,d,e,f,g){a.call(this),this.readonlyExceptionMessage="Derived collections cannot be modified.",this.indexToSourceIndexMap=[],this.sourceCopy=[],this.disp=new Rx.CompositeDisposable,this.source=b,this.selector=e||function(a){return a},this._filter=c,this.orderer=d,this.refreshTrigger=f,this.scheduler=g||Rx.Scheduler.immediate,this.addAllItemsFromSourceCollection(),this.wireUpChangeNotifications()}return f(b,a),Object.defineProperty(b.prototype,"isReadOnly",{get:function(){return!0},enumerable:!0,configurable:!0}),b.prototype.set=function(a,b){i.throwError(this.readonlyExceptionMessage)},b.prototype.addRange=function(a){i.throwError(this.readonlyExceptionMessage)},b.prototype.insertRange=function(a,b){i.throwError(this.readonlyExceptionMessage)},b.prototype.removeAll=function(a){i.throwError(this.readonlyExceptionMessage)},b.prototype.removeRange=function(a,b){i.throwError(this.readonlyExceptionMessage)},b.prototype.add=function(a){i.throwError(this.readonlyExceptionMessage)},b.prototype.clear=function(){i.throwError(this.readonlyExceptionMessage)},b.prototype.remove=function(a){return void i.throwError(this.readonlyExceptionMessage)},b.prototype.insert=function(a,b){i.throwError(this.readonlyExceptionMessage)},b.prototype.removeAt=function(a){i.throwError(this.readonlyExceptionMessage)},b.prototype.move=function(a,b){i.throwError(this.readonlyExceptionMessage)},b.prototype.sort=function(a){i.throwError(this.readonlyExceptionMessage)},b.prototype.reset=function(){var b=this;i.using(a.prototype.suppressChangeNotifications.call(this),function(){a.prototype.clear.call(b),b.addAllItemsFromSourceCollection()})},b.prototype.dispose=function(){this.disp.dispose(),a.prototype.dispose.call(this)},b.prototype.referenceEquals=function(a,b){return j.getOid(a)===j.getOid(b)},b.prototype.refresh=function(){for(var a=this.sourceCopy.length,b=0;a>b;b++)this.onItemChanged(this.sourceCopy[b])},b.prototype.wireUpChangeNotifications=function(){var a=this;this.disp.add(this.source.itemsAdded.observeOn(this.scheduler).subscribe(function(b){a.onItemsAdded(b)})),this.disp.add(this.source.itemsRemoved.observeOn(this.scheduler).subscribe(function(b){a.onItemsRemoved(b)})),this.disp.add(this.source.itemsMoved.observeOn(this.scheduler).subscribe(function(b){a.onItemsMoved(b)})),this.disp.add(this.source.itemReplaced.observeOn(this.scheduler).subscribe(function(b){a.onItemsReplaced(b)})),this.disp.add(this.source.shouldReset.observeOn(this.scheduler).subscribe(function(b){a.reset()})),this.disp.add(this.source.itemChanged.select(function(a){return a.sender}).observeOn(this.scheduler).subscribe(function(b){return a.onItemChanged(b)})),null!=this.refreshTrigger&&this.disp.add(this.refreshTrigger.observeOn(this.scheduler).subscribe(function(b){return a.refresh()}))},b.prototype.onItemsAdded=function(a){this.shiftIndicesAtOrOverThreshold(a.from,a.items.length);for(var b=0;b<a.items.length;b++){var c=a.items[b];if(this.sourceCopy.splice(a.from+b,0,c),!this._filter||this._filter(c)){var d=this.selector(c);this.nsertAndMap(a.from+b,d)}}},b.prototype.onItemsRemoved=function(a){this.sourceCopy.splice(a.from,a.items.length);for(var b=0;b<a.items.length;b++){var c=this.getIndexFromSourceIndex(a.from+b);-1!==c&&this.emoveAt(c)}var d=a.items.length;this.shiftIndicesAtOrOverThreshold(a.from+d,-d)},b.prototype.onItemsMoved=function(c){if(c.items.length>1&&i.throwError("Derived collections doesn't support multi-item moves"),c.from!==c.to){var d=c.from,e=c.to;this.sourceCopy.splice(d,1),this.sourceCopy.splice(e,0,c.items[0]);var f=this.getIndexFromSourceIndex(d);if(this.moveSourceIndexInMap(d,e),-1!==f)if(null==this.orderer){var g=b.newPositionForExistingItem2(this.indexToSourceIndexMap,e,f);g!==f?(this.indexToSourceIndexMap.splice(f,1),this.indexToSourceIndexMap.splice(g,0,e),a.prototype.move.call(this,f,g)):this.indexToSourceIndexMap[f]=e}else this.indexToSourceIndexMap[f]=e}},b.prototype.onItemsReplaced=function(a){for(var b=0;b<a.items.length;b++){var c=a.items[b];this.sourceCopy[a.from+b]=c,this.onItemChanged(c)}},b.prototype.onItemChanged=function(b){var c=this,d=this.indexOfAll(this.sourceCopy,b),e=!this._filter||this._filter(b);d.forEach(function(d){var f=c.getIndexFromSourceIndex(d),g=f>=0;if(g&&!e)c.emoveAt(f);else if(!g&&e)c.nsertAndMap(d,c.selector(b));else if(g&&e){var h=c.selector(b);if(null==c.orderer)c.referenceEquals(h,c.get(f))||a.prototype.set.call(c,f,h);else if(c.canItemStayAtPosition(h,f))c.referenceEquals(h,c.get(f))||a.prototype.set.call(c,f,h);else if(c.referenceEquals(h,c.get(f))){var i=c.newPositionForExistingItem(d,f,h);c.indexToSourceIndexMap.splice(f,1),c.indexToSourceIndexMap.splice(i,0,d),a.prototype.move.call(c,f,i)}else c.emoveAt(f),c.nsertAndMap(d,h)}})},b.prototype.canItemStayAtPosition=function(a,b){var c=b>0;if(c){var d=this.orderer(a,this[b-1])>=0;if(!d)return!1}var e=b<this.length()-1;if(e){var f=this.orderer(a,this[b+1])<=0;if(!f)return!1}return!0},b.prototype.getIndexFromSourceIndex=function(a){return this.indexToSourceIndexMap.indexOf(a)},b.prototype.indexOfAll=function(a,b){var c=this,d=[],e=0;return a.forEach(function(a){c.referenceEquals(a,b)&&d.push(e),e++}),d},b.prototype.moveSourceIndexInMap=function(a,b){b>a?this.shiftSourceIndicesInRange(a+1,b+1,-1):this.shiftSourceIndicesInRange(b,a,1)},b.prototype.shiftIndicesAtOrOverThreshold=function(a,b){for(var c=0;c<this.indexToSourceIndexMap.length;c++)this.indexToSourceIndexMap[c]>=a&&(this.indexToSourceIndexMap[c]+=b)},b.prototype.shiftSourceIndicesInRange=function(a,b,c){for(var d=0;d<this.indexToSourceIndexMap.length;d++){var e=this.indexToSourceIndexMap[d];e>=a&&b>e&&(this.indexToSourceIndexMap[d]+=c)}},b.prototype.addAllItemsFromSourceCollection=function(){var a=this,b=0;this.source.forEach(function(c){if(a.sourceCopy.push(c),!a._filter||a._filter(c)){var d=a.selector(c);a.nsertAndMap(b,d)}b++})},b.prototype.lear=function(){this.indexToSourceIndexMap=[],this.sourceCopy=[],a.prototype.clear.call(this)},b.prototype.nsertAndMap=function(b,c){var d=this.positionForNewItem(b,c);this.indexToSourceIndexMap.splice(d,0,b),a.prototype.insert.call(this,d,c)},b.prototype.emoveAt=function(b){this.indexToSourceIndexMap.splice(b,1),a.prototype.removeAt.call(this,b);
},b.prototype.positionForNewItem=function(a,c){return null==this.orderer?b.positionForNewItemArray(this.indexToSourceIndexMap,a,b.defaultOrderer):b.positionForNewItemArray2(this.inner,0,this.inner.length,c,this.orderer)},b.positionForNewItemArray=function(a,c,d){return b.positionForNewItemArray2(a,0,a.length,c,d)},b.positionForNewItemArray2=function(a,b,c,d,e){if(0===c)return b;if(1===c)return e(a[b],d)>=0?b:b+1;if(e(a[b],d)>=1)return b;for(var f,g=b,h=b+c-1;h>=g;){var i=Math.floor(g+(h-g)/2);if(f=e(a[i],d),0===f)return i;0>f?g=i+1:h=i-1}return g},b.prototype.newPositionForExistingItem=function(a,c,d){return null==this.orderer?b.newPositionForExistingItem2(this.indexToSourceIndexMap,a,c):b.newPositionForExistingItem2(this.inner,d,c,this.orderer)},b.newPositionForExistingItem2=function(a,c,d,e){if(1===a.length)return 0;var f=d-1,g=d+1,h=a[f>=0?f:g];null==e&&(e=b.defaultOrderer);var i=e(c,h),j=0,k=a.length;if(0===i)return d;if(i>0?j=g:k=f,j===a.length||0>k)return d;var l=b.positionForNewItemArray2(a,j,k-j,c,e);return l>=d?l-1:l},b.defaultOrderer=function(a,b){var c;return c=null==a&&null==b?0:null==a?-1:null==b?1:a-b},b}(t);b.list=d,b.isList=e},function(a,b,c){"use strict";var d=function(){function a(a){this.createValue=a}return Object.defineProperty(a.prototype,"value",{get:function(){return this.isValueCreated||(this.createdValue=this.createValue(),this.isValueCreated=!0),this.createdValue},enumerable:!0,configurable:!0}),a}();b["default"]=d},function(a,b,c){function d(a,b,c){var d=new f(a,b,c),g=e.extend(d,new Rx.Subject,!0);return g}var e=c(3),f=function(){function a(a,b,c){this._observerRefCount=0,this._defaultObserverSub=Rx.Disposable.empty,this._scheduler=a,this._defaultObserver=b,this._subject=c||new Rx.Subject,null!=b&&(this._defaultObserverSub=this._subject.observeOn(this._scheduler).subscribe(this._defaultObserver))}return a.prototype.dispose=function(){e.isDisposable(this._subject)&&this._subject.dispose()},a.prototype.onCompleted=function(){this._subject.onCompleted()},a.prototype.onError=function(a){this._subject.onError(a)},a.prototype.onNext=function(a){this._subject.onNext(a)},a.prototype.subscribe=function(a){var b=this;return this._defaultObserverSub&&this._defaultObserverSub.dispose(),this._observerRefCount++,new Rx.CompositeDisposable(this._subject.observeOn(this._scheduler).subscribe(a),Rx.Disposable.create(function(){--b._observerRefCount<=0&&null!=b._defaultObserver&&(b._defaultObserverSub=b._subject.observeOn(b._scheduler).subscribe(b._defaultObserver))}))},a}();b.createScheduledSubject=d},function(a,b,c){var d=c(3),e=c(20),f=function(){function a(a,b){this.priority=0,this.domManager=a,this.app=b}return a.prototype.applyBinding=function(a,b,c,e,f){var g=this;1!==a.nodeType&&d.throwError("event-binding only operates on elements!"),null==b&&d.throwError("invalid binding-options!");var h=a,i=this.domManager.getObjectLiteralTokens(b);i.forEach(function(a){g.wireEvent(h,a.value,a.key,c,e,f)}),e.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,e=null,h=null}))},a.prototype.configure=function(a){},a.prototype.wireEvent=function(a,b,c,f,g,h){var i,j=this,k=this.domManager.compileBindingOptions(b,h),l=void 0,m=Rx.Observable.fromEvent(a,c);if("function"==typeof k){var n=this.domManager.evaluateExpression(k,f);if(n=d.unwrapProperty(n),d.isFunction(n))g.cleanup.add(m.subscribe(function(a){n.apply(f.$data,[f,a])}));else if(e.isCommand(n))i=n,g.cleanup.add(m.subscribe(function(a){i.execute(void 0)}));else{var o=n;g.cleanup.add(m.subscribe(o))}}else if("object"==typeof k){var p=k;i=this.domManager.evaluateExpression(p.command,f),i=d.unwrapProperty(i),k.hasOwnProperty("parameter")&&(l=this.domManager.evaluateExpression(p.parameter,f)),g.cleanup.add(m.subscribe(function(a){try{i.execute(l)}catch(b){j.app.defaultExceptionHandler.onNext(b)}}))}else d.throwError("invalid binding options")},a}();b["default"]=f},function(a,b,c){function d(a,b){var c=b.getNodeState(a);return null!=c&&c[g.hasValueBindingValue]?c[g.valueBindingValue]:a.value}function e(a,b,c){(null===b||void 0===b)&&(b="");var d=c.getNodeState(a);"string"==typeof b?a.value!==b&&(a.value=b,null!=d&&d[g.hasValueBindingValue]&&(d[g.hasValueBindingValue]=!1,d[g.valueBindingValue]=void 0)):(null==d&&(d=this.createNodeState(),this.setNodeState(a,d)),d[g.valueBindingValue]=b,d[g.hasValueBindingValue]=!0)}var f=c(3),g=c(11),h=function(){function a(a,b){this.priority=5,this.domManager=a,this.app=b}return a.prototype.applyBinding=function(a,b,c,g,h){function i(){o&&(o.dispose(),o=null)}function j(a,b){p?e(l,b,a):((null===b||void 0===b)&&(b=""),l.value=b)}var k=this;1!==a.nodeType&&f.throwError("value-binding only operates on elements!"),null==b&&f.throwError("invalid binding-options!");var l=a,m=l.tagName.toLowerCase();"input"!==m&&"option"!==m&&"select"!==m&&"textarea"!==m&&f.throwError("value-binding only operates on checkboxes and radio-buttons");var n,o,p="input"===m&&"radio"===l.type||"option"===m,q=this.domManager.compileBindingOptions(b,h);g.cleanup.add(this.domManager.expressionToObservable(q,c).subscribe(function(a){try{f.isProperty(a)?(i(),o=new Rx.CompositeDisposable,n=a,o.add(n.changed.subscribe(function(a){j(k.domManager,a)})),j(k.domManager,n()),n.source||o.add(Rx.Observable.fromEvent(l,"change").subscribe(function(a){try{n(p?d(l,k.domManager):l.value)}catch(a){k.app.defaultExceptionHandler.onNext(a)}}))):j(k.domManager,a)}catch(b){k.app.defaultExceptionHandler.onNext(b)}})),g.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,g=null,l=null,i()}))},a.prototype.configure=function(a){},a}();b["default"]=h,b.getNodeValue=d,b.setNodeValue=e},function(a,b,c){var d=c(3),e=function(){function a(a,b){this.priority=-1,this.domManager=a,this.app=b}return a.prototype.applyBinding=function(a,b,c,e,f){function g(){l&&(l.dispose(),l=null)}function h(a){var b=n.ownerDocument;if("activeElement"in b){var c;try{c=b.activeElement}catch(d){c=b.body}a=c===n}k(a)}function i(a){a?0===p&&"none"!==n.style.display?n.focus():Rx.Observable.timer(p).subscribe(function(){n.focus()}):n.blur()}var j=this;1!==a.nodeType&&d.throwError("hasFocus-binding only operates on elements!"),null==b&&d.throwError("invalid binding-options!");var k,l,m,n=a,o=this.domManager.compileBindingOptions(b,f),p=0;if("object"==typeof o&&o.hasOwnProperty("property")){var q=o;m=q.property,p=this.domManager.evaluateExpression(q.delay,c),"boolean"==typeof p&&(p=p?1:0)}else m=o;e.cleanup.add(this.domManager.expressionToObservable(m,c).subscribe(function(a){try{d.isProperty(a)?(g(),l=new Rx.CompositeDisposable,k=a,l.add(k.changed.subscribe(function(a){i(a)})),i(k()),k.source||l.add(Rx.Observable.merge(j.getFocusEventObservables(n)).subscribe(function(a){h(a)}))):i(a)}catch(b){j.app.defaultExceptionHandler.onNext(b)}})),e.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,e=null,n=null,g()}))},a.prototype.configure=function(a){},a.prototype.getFocusEventObservables=function(a){var b=[];return b.push(Rx.Observable.fromEvent(a,"focus").select(function(a){return!0})),b.push(Rx.Observable.fromEvent(a,"focusin").select(function(a){return!0})),b.push(Rx.Observable.fromEvent(a,"blur").select(function(a){return!1})),b.push(Rx.Observable.fromEvent(a,"focusout").select(function(a){return!1})),b},a}();b["default"]=e},function(a,b,c){var d=c(3),e=function(){function a(a,b){this.priority=50,this.controlsDescendants=!0,this.domManager=a,this.app=b}return a.prototype.applyBinding=function(a,b,c,e,f){var g=this;1!==a.nodeType&&d.throwError("with-binding only operates on elements!"),null==b&&d.throwError("invalid binding-options!");var h=a,i=this,j=this.domManager.compileBindingOptions(b,f),k=this.domManager.expressionToObservable(j,c);e.cleanup.add(k.subscribe(function(a){try{i.applyValue(h,d.unwrapProperty(a),e)}catch(b){g.app.defaultExceptionHandler.onNext(b)}})),e.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,e=null,k=null,h=null,i=null}))},a.prototype.configure=function(a){},a.prototype.applyValue=function(a,b,c){c.model=b;var d=this.domManager.getDataContext(a);this.domManager.cleanDescendants(a),this.domManager.applyBindingsToDescendants(d,a)},a}();b["default"]=e},function(a,b,c){var d=c(3),e=function(){function a(a,b){this.priority=0,this.domManager=a,this.app=b}return a.prototype.applyBinding=function(a,b,c,e,f){function g(){o&&(o.dispose(),o=null)}function h(a){j.checked=a}var i=this;1!==a.nodeType&&d.throwError("checked-binding only operates on elements!"),null==b&&d.throwError("invalid binding-options!");var j=a,k=j.tagName.toLowerCase(),l="checkbox"===j.type,m="radio"===j.type;("input"!==k||!l&&!m)&&d.throwError("checked-binding only operates on checkboxes and radio-buttons");var n,o,p=this.domManager.compileBindingOptions(b,f);e.cleanup.add(this.domManager.expressionToObservable(p,c).subscribe(function(a){try{if(d.isProperty(a)){if(g(),o=new Rx.CompositeDisposable,n=a,o.add(n.changed.subscribe(function(a){h(a)})),h(n()),!n.source){var b=i.getCheckedEventObservables(j);o.add(Rx.Observable.merge(b).subscribe(function(a){try{n(j.checked)}catch(a){i.app.defaultExceptionHandler.onNext(a)}}))}}else h(a)}catch(c){i.app.defaultExceptionHandler.onNext(c)}})),e.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,e=null,j=null,g()}))},a.prototype.configure=function(a){},a.prototype.getCheckedEventObservables=function(a){var b=[];return b.push(Rx.Observable.fromEvent(a,"click")),b.push(Rx.Observable.fromEvent(a,"change")),b},a}();b["default"]=e},function(a,b,c){var d=c(3),e=c(20),f={8:"backspace",9:"tab",13:"enter",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"delete"},g=function(){function a(a,b){this.priority=0,this.domManager=a,this.app=b}return a.prototype.applyBinding=function(a,b,c,e,f){var g=this;1!==a.nodeType&&d.throwError("keyPress-binding only operates on elements!"),null==b&&d.throwError("invalid binding-options!");var h=a,i=this.domManager.getObjectLiteralTokens(b),j=Rx.Observable.fromEvent(h,"keydown").where(function(a){return!a.repeat}).publish().refCount();i.forEach(function(a){var b,d=a.key,h=[];d.split(" ").forEach(function(a){b={expression:d,keys:{}},a.split("-").forEach(function(a){b.keys[a.trim()]=!0}),h.push(b)}),g.wireKey(a.value,j,h,c,e,f)}),e.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,e=null,h=null}))},a.prototype.configure=function(a){},a.prototype.testCombination=function(a,b){var c=!(!b.metaKey||b.ctrlKey),d=!!b.altKey,e=!!b.ctrlKey,g=!!b.shiftKey,h=b.keyCode,i=!!a.keys.meta,j=!!a.keys.alt,k=!!a.keys.ctrl,l=!!a.keys.shift;(!g||l)&&h>=65&&90>=h&&(h+=32);var m=a.keys[f[h]]||a.keys[h.toString()]||a.keys[String.fromCharCode(h)];return m&&i===c&&j===d&&k===e&&l===g},a.prototype.testCombinations=function(a,b){for(var c=0;c<a.length;c++)if(this.testCombination(a[c],b))return!0;return!1},a.prototype.wireKey=function(a,b,c,f,g,h){var i,j=this,k=this.domManager.compileBindingOptions(a,h),l=void 0;if("function"==typeof k){var m=this.domManager.evaluateExpression(k,f);m=d.unwrapProperty(m),e.isCommand(m)?(i=m,g.cleanup.add(b.where(function(a){return j.testCombinations(c,a)}).subscribe(function(a){try{i.execute(void 0),a.preventDefault()}catch(a){j.app.defaultExceptionHandler.onNext(a)}}))):g.cleanup.add(b.where(function(a){return j.testCombinations(c,a)}).subscribe(function(a){try{m.apply(f.$data,[f]),a.preventDefault()}catch(a){j.app.defaultExceptionHandler.onNext(a)}}))}else"object"==typeof k?(i=this.domManager.evaluateExpression(k.command,f),i=d.unwrapProperty(i),k.hasOwnProperty("parameter")&&(l=this.domManager.evaluateExpression(k.parameter,f)),g.cleanup.add(b.where(function(a){return j.testCombinations(c,a)}).subscribe(function(a){try{i.execute(l),a.preventDefault()}catch(a){j.app.defaultExceptionHandler.onNext(a)}}))):d.throwError("invalid binding options")},a}();b["default"]=g},function(a,b,c){var d=c(3),e=c(17),f=function(){function a(a,b){this.priority=0,this.domManager=a,this.app=b}return a.prototype.applyBinding=function(a,b,c,e,f){function g(a){(null===a||void 0===a)&&(a=""),j.value!==a&&(p=a,j.value=a)}function h(){n&&(n.dispose(),n=null),o&&(o.dispose(),o=null)}var i=this;1!==a.nodeType&&d.throwError("textInput-binding only operates on elements!"),null==b&&d.throwError("invalid binding-options!");var j=a,k=j.tagName.toLowerCase(),l="textarea"===k;"input"!==k&&"textarea"!==k&&d.throwError("textInput-binding can only be applied to input or textarea elements");var m,n,o,p,q=this.domManager.compileBindingOptions(b,f);e.cleanup.add(this.domManager.expressionToObservable(q,c).subscribe(function(a){try{if(d.isProperty(a)){if(h(),m=a,n=m.changed.subscribe(function(a){g(a)}),g(m()),!m.source){var b=i.getTextInputEventObservables(j,l);o=Rx.Observable.merge(b).subscribe(function(a){try{m(j.value)}catch(a){i.app.defaultExceptionHandler.onNext(a)}})}}else g(a)}catch(c){i.app.defaultExceptionHandler.onNext(c)}})),e.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,e=null,j=null,h()}))},a.prototype.configure=function(a){},a.prototype.getTextInputEventObservables=function(a,b){var c=[];return e.ie&&e.ie.version<10?e.ie.version<=9&&(c.push(e.ie.getSelectionChangeObservable(a).where(function(b){return b.activeElement===a})),c.push(Rx.Observable.fromEvent(a,"dragend")),c.push(Rx.Observable.fromEvent(a,"input")),c.push(Rx.Observable.fromEvent(a,"propertychange").where(function(a){return"value"===a.propertyName}))):(c.push(Rx.Observable.fromEvent(a,"input")),e.safari&&e.safari.version<5&&b?(c.push(Rx.Observable.fromEvent(a,"keydown")),c.push(Rx.Observable.fromEvent(a,"paste")),c.push(Rx.Observable.fromEvent(a,"cut"))):e.opera&&e.opera.version<11?c.push(Rx.Observable.fromEvent(a,"keydown")):e.firefox&&e.firefox.version<4&&(c.push(Rx.Observable.fromEvent(a,"DOMAutoComplete")),c.push(Rx.Observable.fromEvent(a,"dragdrop")),c.push(Rx.Observable.fromEvent(a,"drop")))),c.push(Rx.Observable.fromEvent(a,"change")),c},a}();b["default"]=f},function(a,b,c){var d=c(3),e=c(33),f=c(29),g=new Array,h=function(){function a(a){this.domManager=a}return a.prototype.supports=function(a,b){return"input"===a.tagName.toLowerCase()&&"radio"===a.getAttribute("type")&&!f.isList(b)},a.prototype.observeElement=function(a){return Rx.Observable.merge(Rx.Observable.fromEvent(a,"click"),Rx.Observable.fromEvent(a,"change"))},a.prototype.observeModel=function(a){if(d.isProperty(a)){var b=a;return b.changed}return Rx.Observable.never()},a.prototype.updateElement=function(a,b){var c=a;c.checked=e.getNodeValue(c,this.domManager)==d.unwrapProperty(b)},a.prototype.updateModel=function(a,b,c){var d=a;d.checked&&b(e.getNodeValue(d,this.domManager))},a}(),i=function(){function a(a){this.domManager=a}return a.prototype.supports=function(a,b){return"select"===a.tagName.toLowerCase()&&!f.isList(b)},a.prototype.observeElement=function(a){return Rx.Observable.fromEvent(a,"change")},a.prototype.observeModel=function(a){if(d.isProperty(a)){var b=a;return b.changed}return Rx.Observable.never()},a.prototype.updateElement=function(a,b){var c=a,f=d.unwrapProperty(b),g=c.options.length;if(null==f)c.selectedIndex=-1;else for(var h=0;g>h;h++){var i=c.options[h];if(e.getNodeValue(i,this.domManager)==f){c.selectedIndex=h;break}}},a.prototype.updateModel=function(a,b,c){var d=a,f=-1!==d.selectedIndex?e.getNodeValue(d.options[d.selectedIndex],this.domManager):void 0;b(f)},a}(),j=function(){function a(a,b){this.priority=0,this.domManager=a,this.app=b,g.push(new h(a)),g.push(new i(a))}return a.prototype.applyBinding=function(a,b,c,e,f){function h(){k&&(k.dispose(),k=null)}var i=this;1!==a.nodeType&&d.throwError("selectedValue-binding only operates on elements!"),null==b&&d.throwError("invalid binding-options!");var j,k,l=a,m=this.domManager.compileBindingOptions(b,f);e.cleanup.add(this.domManager.expressionToObservable(m,c).subscribe(function(a){try{h(),j=void 0;for(var b=0;b<g.length;b++)if(g[b].supports(l,a)){j=g[b];break}j||d.throwError("selectedValue-binding does not support this combination of bound element and model!"),k=new Rx.CompositeDisposable,j.updateElement(l,a),k.add(j.observeModel(a).subscribe(function(b){try{j.updateElement(l,a)}catch(c){i.app.defaultExceptionHandler.onNext(c)}})),d.isProperty(a)&&k.add(j.observeElement(l).subscribe(function(b){try{j.updateModel(l,a,b)}catch(b){i.app.defaultExceptionHandler.onNext(b)}}))}catch(c){i.app.defaultExceptionHandler.onNext(c)}})),e.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,e=null,l=null,h()}))},a.prototype.configure=function(a){},a}();b["default"]=j},function(a,b,c){var d=c(3),e=function(){function a(a,b){this.priority=30,this.controlsDescendants=!0,this.domManager=a,this.app=b}return a.prototype.applyBinding=function(a,b,c,e,f){function g(){k&&(k.dispose(),k=null)}var h=this;1!==a.nodeType&&d.throwError("component-binding only operates on elements!"),null==b&&d.throwError("invalid binding-options!");var i,j,k,l=a,m=this.domManager.compileBindingOptions(b,f),n=m,o={};"function"==typeof m?(i=m,j=this.domManager.expressionToObservable(i,c)):(j=this.domManager.expressionToObservable(n.name,c),n.params&&(d.isFunction(n.params)?o=this.domManager.evaluateExpression(n.params,c):"object"==typeof n.params?Object.keys(n.params).forEach(function(a){o[a]=h.domManager.evaluateExpression(n.params[a],c)}):d.throwError("invalid component-params")));for(var p=new Array;l.firstChild;)p.push(l.removeChild(l.firstChild));e.cleanup.add(j.subscribe(function(a){try{g(),k=new Rx.CompositeDisposable;var b=f.loadComponent(a,o),i=void 0;null==b&&d.throwError("component '{0}' is not registered with current module-context",a),i=b.subscribe(function(a){null!=i&&(i.dispose(),i=void 0),a.viewModel&&d.isDisposable(a.viewModel)&&k.add(a.viewModel),h.applyTemplate(a,l,c,e,a.template,a.viewModel)}),null!=i&&k.add(i)}catch(j){h.app.defaultExceptionHandler.onNext(j)}})),e.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,e=null,p=null,m=null,g()}))},a.prototype.configure=function(a){},a.prototype.applyTemplate=function(a,b,c,d,e,f){for(;b.firstChild;)this.domManager.cleanNode(b.firstChild),b.removeChild(b.firstChild);for(var g=0;g<e.length;g++){var h=e[g].cloneNode(!0);b.appendChild(h)}f&&(d.model=f,c=this.domManager.getDataContext(b)),f&&a.preBindingInit&&f.hasOwnProperty(a.preBindingInit)&&f[a.preBindingInit].call(f,b),this.domManager.applyBindingsToDescendants(c,b),f&&a.postBindingInit&&f.hasOwnProperty(a.postBindingInit)&&f[a.postBindingInit].call(f,b)},a}();b["default"]=e},function(a,b,c){var d=c(3),e=function(){function a(a,b,c){this.priority=5,this.domManager=a,this.router=b,this.app=c}return a.prototype.applyBinding=function(a,b,c,e,f){var g=this;1!==a.nodeType&&d.throwError("stateActive-binding only operates on elements!"),null==b&&d.throwError("invalid binding-options!");var h,i,j,k=a,l=this.domManager.compileBindingOptions(b,f),m=[],n=l,o=[],p="active";m.push(this.router.current.changed.startWith(this.router.current())),"function"==typeof l?(h=l,m.push(this.domManager.expressionToObservable(h,c))):(m.push(this.domManager.expressionToObservable(n.name,c)),n.params&&Object.keys(n.params).forEach(function(a){o.push(a),m.push(g.domManager.expressionToObservable(n.params[a],c))}),n.cssClass&&(p=this.domManager.evaluateExpression(n.cssClass,c))),e.cleanup.add(Rx.Observable.combineLatest(m,function(a){return d.args2Array(arguments)}).subscribe(function(a){try{a.shift();i=d.unwrapProperty(a.shift()),j={};for(var b=0;b<o.length;b++)j[o[b]]=d.unwrapProperty(a[b]);var c=g.router.includes(i,j),e=p.split(/\s+/).map(function(a){return a.trim()}).filter(function(a){return a});e.length&&d.toggleCssClass.apply(null,[k,c].concat(e))}catch(f){g.app.defaultExceptionHandler.onNext(f)}})),e.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,e=null,m=null,l=null,i=null,j=null,n=null,o=null}))},a.prototype.configure=function(a){},a}();b["default"]=e},function(a,b,c){var d=c(3),e=function(){function a(a,b,c){this.priority=1e3,this.controlsDescendants=!0,this.domManager=a,this.router=b,this.app=c}return a.prototype.applyBinding=function(a,b,c,e,f){function g(){j&&(j.dispose(),j=null)}var h=this;1!==a.nodeType&&d.throwError("view-binding only operates on elements!"),null==b&&d.throwError("invalid binding-options!");var i,j,k=a,l=this.domManager.compileBindingOptions(b,f),m=this.domManager.evaluateExpression(l,c);(null==m||"string"!=typeof m)&&d.throwError("views must be named!"),e.cleanup.add(this.router.current.changed.startWith(this.router.current()).subscribe(function(a){try{g(),j=new Rx.CompositeDisposable;var b=h.router.getViewComponent(m);null!=b?d.isEqual(i,b)||(j.add(h.applyTemplate(m,b.component,i?i.component:void 0,b.params,b.animations,k,c,f)),i=b):(j.add(h.applyTemplate(m,null,i?i.component:void 0,null,i?i.animations:{},k,c,f)),i={})}catch(e){h.app.defaultExceptionHandler.onNext(e)}})),e.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,e=null}))},a.prototype.configure=function(a){},a.prototype.applyTemplate=function(a,b,c,e,f,g,h,i){function j(){o.forEach(function(a){n.domManager.cleanNode(a),g.removeChild(a)})}function k(a){h.$componentParams=e;var c=document.createElement("div"),f=d.formatString("component: { name: '{0}', params: $componentParams }",b);c.setAttribute("data-bind",f),null!=a&&a.prepare(c),g.appendChild(c),n.domManager.applyBindings(h,c)}var l,m=this,n=this,o=d.nodeChildrenToArray(g),p=[];if(o.length>0){var q;f&&f.leave&&(q="string"==typeof f.leave?i.animation(f.leave):f.leave),q?(q.prepare(o),l=q.run(o).continueWith(function(){return q.complete(o)}).continueWith(j)):l=Rx.Observable.startDeferred(j),p.push(l)}if(null!=b){var r;f&&f.enter&&(r="string"==typeof f.enter?i.animation(f.enter):f.enter),l=Rx.Observable.startDeferred(function(){return k(r)}),r&&(l=l.continueWith(r.run(g.childNodes)).continueWith(function(){return r.complete(g.childNodes)})),l=l.continueWith(function(){var d={view:a,fromComponent:c,toComponent:b},e=m.router;e.viewTransitionsSubject.onNext(d)}),p.push(l)}return l=p.length>1?Rx.Observable.combineLatest(p,d.noop).take(1):1===p.length?p[0].take(1):null,l?l.subscribe()||Rx.Disposable.empty:Rx.Disposable.empty},a}();b["default"]=e},function(a,b,c){var d=c(3),e=function(){function a(a,b,c){this.priority=5,this.domManager=a,this.router=b,this.app=c}return a.prototype.applyBinding=function(a,b,c,e,f){var g=this;1!==a.nodeType&&d.throwError("stateRef-binding only operates on elements!"),null==b&&d.throwError("invalid binding-options!");var h,i,j,k=a,l="a"===k.tagName.toLowerCase(),m=l?k:void 0,n=this.domManager.compileBindingOptions(b,f),o=[],p=n,q=[];"function"==typeof n?(h=n,o.push(this.domManager.expressionToObservable(h,c))):(o.push(this.domManager.expressionToObservable(p.name,c)),p.params&&Object.keys(p.params).forEach(function(a){q.push(a),o.push(g.domManager.expressionToObservable(p.params[a],c))})),e.cleanup.add(Rx.Observable.combineLatest(o,function(a){return d.args2Array(arguments)}).subscribe(function(a){try{i=d.unwrapProperty(a.shift()),j={};for(var b=0;b<q.length;b++)j[q[b]]=d.unwrapProperty(a[b]);null!=m&&(m.href=g.router.url(i,j))}catch(c){g.app.defaultExceptionHandler.onNext(c)}})),e.cleanup.add(Rx.Observable.fromEvent(k,"click").subscribe(function(a){a.preventDefault(),g.router.go(i,j,{location:!0})})),e.cleanup.add(Rx.Disposable.create(function(){a=null,b=null,c=null,e=null,o=null,n=null,i=null,j=null,p=null,q=null}))},a.prototype.configure=function(a){},a}();b["default"]=e},function(a,b,c){var d=c(3),e={},f=function(){function a(a){var b=this;this.template=function(a){return b.buildTemplate(a)},this.viewModel=function(a){var b=a;return{items:a.items,selectedValue:a.selectedValue,hooks:{afterRender:b.afterRender}}},this.htmlTemplateEngine=a}return a.prototype.buildTemplate=function(a){var b,c,f=void 0;if(!a.noCache&&(f=(null!=a.name?a.name:"")+"-"+(null!=a.itemText?a.itemText:"")+"-"+(null!=a.itemValue?a.itemValue:"")+"-"+(null!=a.itemClass?a.itemClass:"")+"-"+(null!=a.selectedValue?"true":"false")+"-"+(a.multiple?"true":"false")+"-"+(a.required?"true":"false")+"-"+(a.autofocus?"true":"false")+"-"+(a.size?a.size.toString():"0"),c=e[f],null!=c))return c;b='<select class="wx-select" data-bind="{0}"><option data-bind="{1}"></option></select>';var g=[],h=[],i=[],j=[];g.push({key:"foreach",value:"{ data: items, hooks: hooks }"}),a.selectedValue&&g.push({key:"selectedValue",value:"@selectedValue"}),a.name&&h.push({key:"name",value:a.name}),a.multiple&&h.push({key:"multiple",value:"true"}),void 0!==a.size&&h.push({key:"size",value:a.size.toString()}),a.required&&h.push({key:"required",value:"true"}),a.autofocus&&h.push({key:"autofocus",value:"true"}),h.length&&g.push({key:"attr",value:"{ "+h.map(function(a){return a.key+": "+a.value}).join(", ")+" }"}),i.push({key:"value",value:a.itemValue||"$data"}),i.push({key:"text",value:a.itemText||"$data"}),a.itemClass&&j.push({key:"class",value:"'"+a.itemClass+"'"}),j.length&&i.push({key:"attr",value:"{ "+j.map(function(a){return a.key+": "+a.value}).join(", ")+" }"});var k=g.map(function(a){return a.key+": "+a.value}).join(", "),l=i.map(function(a){return a.key+": "+a.value}).join(", ");return b=d.formatString(b,k,l),a.noCache||(e[f]=b),c=this.htmlTemplateEngine.parse(b)},a}();b["default"]=f},function(a,b,c){var d=c(3),e=0,f={},g=function(){function a(a){var b=this;this.template=function(a){return b.buildTemplate(a)},this.viewModel=function(a){var b=a,c=null!=b.groupName?b.groupName:d.formatString("wx-radiogroup-{0}",e++);return{items:a.items,selectedValue:a.selectedValue,groupName:c,hooks:{afterRender:a.afterRender}}},this.htmlTemplateEngine=a}return a.prototype.buildTemplate=function(a){var b,c,e=void 0;if(!a.noCache&&(e=(null!=a.itemText?a.itemText:"")+"-"+(null!=a.itemValue?a.itemValue:"")+"-"+(null!=a.itemClass?a.itemClass:"")+"-"+(null!=a.selectedValue?"true":"false"),c=f[e],null!=c))return c;b='<div class="wx-radiogroup" data-bind="{0}"><input type="radio" data-bind="{1}"/>{2}</div>';var g=[],h=[],i=[],j=[],k="";g.push({key:"foreach",value:"{ data: items, hooks: hooks }"}),h.length&&g.push({key:"attr",value:"{ "+h.map(function(a){return a.key+": "+a.value}).join(", ")+" }"}),i.push({key:"value",value:a.itemValue||"$data"}),j.push({key:"name",value:"$parent.groupName"}),a.selectedValue&&i.push({key:"selectedValue",value:"$parent.@selectedValue"}),a.itemText&&(k+=d.formatString('<label data-bind="text: {0}, attr: { for: {1} }"></label>',a.itemText,"$parent.groupName + '-' + $index"),j.push({key:"id",value:"$parent.groupName + '-' + $index"})),a.itemClass&&j.push({key:"class",value:"'"+a.itemClass+"'"}),j.length&&i.push({key:"attr",value:"{ "+j.map(function(a){return a.key+": "+a.value}).join(", ")+" }"});var l=g.map(function(a){return a.key+": "+a.value}).join(", "),m=i.map(function(a){return a.key+": "+a.value}).join(", ");return b=d.formatString(b,l,m,k),a.noCache||(f[e]=b),c=this.htmlTemplateEngine.parse(b)},a}();b["default"]=g},function(a,b,c){var d=c(3),e=c(13),f=c(47),g=function(){function a(a,b){var c=this;this.current=e.property(),this.states={},this.pathSeparator=".",this.parentPathDirective="^",this.rootStateName="$",this.validPathRegExp=/^[a-zA-Z]([\w-_]*$)/,this.viewTransitionsSubject=new Rx.Subject,this.domManager=a,this.app=b,this.viewTransitions=this.viewTransitionsSubject.asObservable(),this.reset(!1),b.history.onPopState.subscribe(function(a){try{if(a&&a.state){var d=a.state,e=d.stateName;null!=e&&(c.go(e,d.params,{location:!1}),b.title(d.title))}}catch(a){b.defaultExceptionHandler.onNext(a)}}),b.title.changed.subscribe(function(a){document.title=a,null!=c.current()&&c.replaceHistoryState(c.current(),a)})}return a.prototype.state=function(a){return this.registerStateInternal(a),this},a.prototype.updateCurrentStateParams=function(a){var b=this.current();a(b.params),this.replaceHistoryState(b,this.app.title())},a.prototype.go=function(a,b,c){a=this.mapPath(a),null==this.states[a]&&d.throwError("state '{0}' is not registered",a),this.activateState(a,b,c)},a.prototype.get=function(a){return this.states[a]},a.prototype.is=function(a,b,c){var d=this.current(),e=d.name===a;if(b=b||{},e){var f=Object.keys(d.params),g=Object.keys(b);if(f.length===g.length){for(var h=0;h<g.length;h++)if(d.params[g[h]]!=b[g[h]]){e=!1;break}}else e=!1}return e},a.prototype.includes=function(a,b,c){var d=this.current(),e=0===d.name.indexOf(a);if(b=b||{},e){var f=Object.keys(d.params),g=Object.keys(b);g=g.length<=f.length?g:f;for(var h=0;h<g.length;h++)if(d.params[g[h]]!=b[g[h]]){e=!1;break}}return e},a.prototype.url=function(a,b){a=this.mapPath(a);var c=this.getAbsoluteRouteForState(a);return null!=c?c.stringify(b):null},a.prototype.reset=function(a){void 0===a&&(a=!0),this.states={},this.root=this.registerStateInternal({name:this.rootStateName,url:f.route("/")}),a&&this.go(this.rootStateName,{},{location:2})},a.prototype.sync=function(a){null==a&&(a=this.app.history.location.pathname);for(var b,c=Object.keys(this.states),d=c.length,e=0;d>e;e++){var f=this.states[c[e]],g=this.getAbsoluteRouteForState(f.name);if(null!=(b=g.parse(a)))return void this.go(f.name,b,{location:2})}null==this.current()&&this.reload()},a.prototype.reload=function(){var a,b;null!=this.current()?(a=this.current().name,b=this.current().params):(a=this.rootStateName,b={}),this.go(a,b,{force:!0,location:2})},a.prototype.getViewComponent=function(a){var b=this.current(),c=void 0;if(null!=b.views){var e=b.views[a],f={};if(null!=e){c={},"object"==typeof e?(c.component=e.component,c.params=e.params||{},c.animations=e.animations):(c.component=e,c.params={},c.animations=void 0);var g=this.getViewParameterNamesFromStateConfig(a,c.component);g.forEach(function(a){b.params.hasOwnProperty(a)&&(f[a]=b.params[a])}),c.params=d.extend(f,c.params)}}return c},a.prototype.registerStateInternal=function(a){var b=this,c=a.name.split(this.pathSeparator);return a.name!==this.rootStateName&&c.forEach(function(a){b.validPathRegExp.test(a)||d.throwError("invalid state-path '{0}' (a state-path must start with a character, optionally followed by one or more alphanumeric characters, dashes or underscores)")}),a=d.extend(a,{}),this.states[a.name]=a,null!=a.url?"string"==typeof a.url&&(a.url=f.route(a.url)):a.name!==this.rootStateName?a.url=f.route(c[c.length-1]):a.url=f.route("/"),a.name===this.rootStateName&&(this.root=a),a},a.prototype.pushHistoryState=function(a,b){var c={stateName:a.name,params:a.params,title:null!=b?b:document.title};this.app.history.pushState(c,"",a.url)},a.prototype.replaceHistoryState=function(a,b){var c={stateName:a.name,params:a.params,title:null!=b?b:document.title};this.app.history.replaceState(c,"",a.url)},a.prototype.mapPath=function(a){if(0===a.indexOf(this.pathSeparator))return this.current().name+a;if(0===a.indexOf(this.parentPathDirective)){var b=this.current().name;if(b===this.rootStateName)return b;for(var c=b.split(this.pathSeparator),d=c.length-1;d>0;d--){var e=c.slice(0,d).join(this.pathSeparator);if(this.get(e)||this.get(e+a.substr(1)))return a=e+a.substr(1)}return a=this.rootStateName+a.substr(1)}return a},a.prototype.getStateHierarchy=function(a){var b,c=a.split(this.pathSeparator),d="",e=[];a!==this.rootStateName&&e.push(this.root);for(var g=0;g<c.length;g++)g>0?d+=this.pathSeparator+c[g]:d=c[g],b=this.states[d],null==b&&(b={name:d,url:f.route(d)}),e.push(b);return e},a.prototype.getAbsoluteRouteForState=function(a,b){b=null!=b?b:this.getStateHierarchy(a);var c=null;return b.forEach(function(a){if(null!=c){var b=a.url;c=b.isAbsolute?b:c.concat(a.url)}else c=a.url}),c},a.prototype.activateState=function(a,b,c){var e=this.getStateHierarchy(a),f={},g={};e.forEach(function(a){null!=a.views&&d.extend(a.views,f),null!=a.params&&d.extend(a.params,g)}),b&&d.extend(b,g);var h=this.getAbsoluteRouteForState(a,e),i=d.extend(this.states[a],{});i.url=h.stringify(b),i.views=f,i.params=g;var j=this.current();(c&&c.force||null==j||j.name!==a||!d.isEqual(j.params,i.params))&&(null!=j&&null!=j.views&&null!=i.views&&Object.keys(j.views).forEach(function(a){
i.views.hasOwnProperty(a)||(i.views[a]=null)}),c&&c.location&&(2===c.location?this.replaceHistoryState(i,this.app.title()):this.pushHistoryState(i,this.app.title())),null!=j&&j.onLeave&&j.onLeave(this.get(j.name),j.params),this.current(i),i.onEnter&&i.onEnter(this.get(i.name),b))},a.prototype.getViewParameterNamesFromStateConfig=function(a,b){for(var c,e=this.getStateHierarchy(this.current().name),f={},g=[],h=-1,i=e.length;i--;i>=0)if(c=e[i],c.views&&c.views[a]){var j=c.views[a];"object"==typeof j&&(j=j.component),j===b&&(h=i)}return-1!==h&&(c=e[h],e=e.slice(0,h+1),e.forEach(function(a){null!=a.params&&d.extend(a.params,f)}),g=Object.keys(f),g=g.concat(c.url.params)),g},a}();b.Router=g},function(a,b,c){function d(a,b){return new h(a,b)}var e=c(3),f=/[\-\[\]{}()+?.,\\\^$|#\s]/g,g=/([:*])(\w+)/g,h=function(){function a(a,b){var c=this;this.route=a,this.rules=b,this.params=[];var d=a;"string"==typeof a?(d=d.replace(f,"\\$&"),d=d.replace(g,function(a,b,d){return c.params.push(d),":"===b?"([^/]*)":"(.*)"}),d=new RegExp("^"+d+"$"),this.parse=function(a){var e,f,g=0,h={},i=a.match(d);if(!i)return null;for(;g<c.params.length;){if(e=c.params[g++],f=i[g],b&&e in b&&!c.validateRule(b[e],f))return null;h[e]=f}return h},this.stringify=function(b){b=b||{};var c,d,e=a;for(c in b)d=new RegExp("[:*]"+c+"\\b"),e=e.replace(d,b[c]);return e.replace(g,"")}):(this.parse=function(a){var b=a.match(d);return b&&{captures:b.slice(1)}},this.stringify=function(){return""})}return a.prototype.stripTrailingSlash=function(a){return 0===a.length||"/"===a||a.lastIndexOf("/")!==a.length-1?a:a.substr(0,a.length-1)},Object.defineProperty(a.prototype,"isAbsolute",{get:function(){return 0===this.route.indexOf("/")},enumerable:!0,configurable:!0}),a.prototype.concat=function(b){var c=b,d=this.stripTrailingSlash(this.route),f=this.stripTrailingSlash(c.route),g=null;return c.rules?this.rules?(Object.keys(this.rules).forEach(function(a){c.rules.hasOwnProperty(a)&&e.throwError("route '{0}' and '{1}' have conflicting rule '{2}",d,f,a)}),g=e.extend(this.rules,e.extend(c.rules,{}))):g=e.extend(c.rules,{}):this.rules&&(g=e.extend(this.rules,{})),"/"===d&&(d=""),new a(d+"/"+f,g)},a.prototype.validateRule=function(a,b){var c=this.toString.call(a).charAt(8);return"R"===c?a.test(b):"F"===c?a(b):a==b},a}();b.RouteMatcher=h,b.route=d},function(a,b,c){var d=c(31),e=function(){function a(){this.messageBus={},this.schedulerMappings={}}return a.prototype.listen=function(a){return this.setupSubjectIfNecessary(a).skip(1)},a.prototype.isRegistered=function(a){return this.messageBus.hasOwnProperty(a)},a.prototype.registerMessageSource=function(a,b){return a.subscribe(this.setupSubjectIfNecessary(b))},a.prototype.sendMessage=function(a,b){this.setupSubjectIfNecessary(b).onNext(a)},a.prototype.registerScheduler=function(a,b){this.schedulerMappings[b]=a},a.prototype.setupSubjectIfNecessary=function(a){var b=this.messageBus[a];return null==b&&(b=d.createScheduledSubject(this.getScheduler(a),null,new Rx.BehaviorSubject(void 0)),this.messageBus[a]=b),b},a.prototype.getScheduler=function(a){var b=this.schedulerMappings[a];return b||Rx.Scheduler.currentThread},a}();b["default"]=e},function(a,b,c){b.version="0.9.87"},function(a,b,c){function d(a,b){b=b||Rx.Scheduler.currentThread;var c=function(a){return arguments.length>0&&f.throwError("attempt to write to a read-only observable property"),null==c.sub&&(c.sub=c._source.connect()),c.value};i.Implements(g["default"].IObservableProperty)(c),i.Implements(g["default"].IDisposable)(c),c.dispose=function(){c.sub&&(c.sub.dispose(),c.sub=null)},c.value=a,c.changedSubject=new Rx.Subject,c.changed=c.changedSubject.publish().refCount(),c.changingSubject=new Rx.Subject,c.changing=c.changingSubject.publish().refCount(),c.source=this,c.thrownExceptions=h.createScheduledSubject(b,j.injector.get(k.app).defaultExceptionHandler);var d=!1;return c.sub=this.distinctUntilChanged().subscribe(function(a){d&&a===c.value||(d=!0,c.changingSubject.onNext(a),c.value=a,c.changedSubject.onNext(a))},function(a){return c.thrownExceptions.onNext(a)}),c}function e(){}var f=c(3),g=c(10),h=c(31),i=c(4),j=c(2),k=c(11),l=Rx.Observable;l.prototype.toProperty=d,l.prototype.continueWith=function(){var a=f.args2Array(arguments),b=a.shift(),c=void 0;if(f.isRxObservable(b))c=b;else if(f.isFunction(b)){var d=b;c=Rx.Observable.startDeferred(d)}return this.selectMany(function(a){return c})},l.startDeferred=function(a){return Rx.Observable.defer(function(){return Rx.Observable.create(function(b){var c=!1;return c||a(),b.onNext(void 0),b.onCompleted(),Rx.Disposable.create(function(){return c=!0})})})},b.install=e},function(a,b,c){function d(a){var b;a instanceof Node||a instanceof HTMLElement?b=[a]:Array.isArray(a)?b=a:a instanceof NodeList?b=l.nodeListToArray(a):l.throwError("invalid argument: element");var c=b.filter(function(a){return 1===a.nodeType});return c}function e(a){"s"===a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));var b=parseFloat(a)||0;return b}function f(a){var b=getComputedStyle(a).transitionDuration,c=0,d=b.split(/\s*,\s*/);return d.forEach(function(a){var b=e(a);c=c?Math.max(b,c):b}),1e3*c}function g(a){var b=getComputedStyle(a).transitionDelay,c=0,d=b.split(/\s*,\s*/);return d.forEach(function(a){var b=Math.max(0,e(a));c=c?Math.max(b,c):b}),1e3*c}function h(a){var b=getComputedStyle(a).animationDuration||getComputedStyle(a).webkitAnimationDuration||"0s",c=getComputedStyle(a).animationDelay||getComputedStyle(a).webkitAnimationDelay||"0s",d=e(b),f=e(c);return 1e3*(d+f)}function i(a,b,c){var e={};return b?e.prepare=function(a,c){var e=d(a);e.forEach(function(a){return b(a,c)})}:e.prepare=l.noop,e.run=function(b,c){return Rx.Observable.defer(function(){var e=d(b);return 0===e.length?Rx.Observable["return"](void 0):Rx.Observable.combineLatest(e.map(function(b){return a(b,c)}),l.noop)})},c?e.complete=function(a,b){var e=d(a);e.forEach(function(a){return c(a,b)})}:e.complete=l.noop,e}function j(a,b,c){var e,i,j,k,m,n,o={};if(a){var p;"string"==typeof a&&(a=a.split(/\s+/).map(function(a){return a.trim()}).filter(function(a){return a})),p="string"==typeof a[0]?a.map(function(a){return{css:a,add:!0}}):a,e=p.filter(function(a){return a.add}).map(function(a){return a.css}),i=p.filter(function(a){return!a.add||a.remove}).map(function(a){return a.css}),o.prepare=function(a,b){var c=d(a);e&&e.length&&c.forEach(function(a){return l.toggleCssClass.apply(null,[a,!0].concat(e))}),i&&i.length&&c.forEach(function(a){return l.toggleCssClass.apply(null,[a,!1].concat(i))})}}var q;"string"==typeof b&&(b=b.split(/\s+/).map(function(a){return a.trim()}).filter(function(a){return a})),q="string"==typeof b[0]?b.map(function(a){return{css:a,add:!0}}):b,j=q.filter(function(a){return a.add}).map(function(a){return a.css}),k=q.filter(function(a){return!a.add||a.remove}).map(function(a){return a.css}),o.run=function(a,b){return Rx.Observable.defer(function(){var b=d(a);if(0===b.length)return Rx.Observable["return"](void 0);var c=Rx.Observable.combineLatest(b.map(function(a){var b=Math.max(f(a)+g(a),h(a));return Rx.Observable.timer(b)}),l.noop);return Rx.Observable.timer(1).subscribe(function(){j&&j.length&&b.forEach(function(a){return l.toggleCssClass.apply(null,[a,!0].concat(j))}),k&&k.length&&b.forEach(function(a){return l.toggleCssClass.apply(null,[a,!1].concat(k))})}),c})};var r;return c?("string"==typeof c&&(c=c.split(/\s+/).map(function(a){return a.trim()}).filter(function(a){return a})),r="string"==typeof c[0]?c.map(function(a){return{css:a,add:!0}}):c,m=r.filter(function(a){return a.add}).map(function(a){return a.css}),n=r.filter(function(a){return!a.add||a.remove}).map(function(a){return a.css})):(n=[],e&&e.length&&(n=n.concat(e)),j&&j.length&&(n=n.concat(j))),o.complete=function(a,b){var c=d(a);m&&m.length&&c.forEach(function(a){return l.toggleCssClass.apply(null,[a,!0].concat(m))}),n&&n.length&&c.forEach(function(a){return l.toggleCssClass.apply(null,[a,!1].concat(n))})},o}function k(){var a=l.args2Array(arguments),b=a.shift();return"function"==typeof b?i(b,a.shift(),a.shift()):j(b,a.shift(),a.shift())}var l=c(3);b.animation=k}])});
//# sourceMappingURL=web.rx.min.js.map

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
