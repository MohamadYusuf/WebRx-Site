/* Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.*/
(function(a){function b(a){for(var b=[],c=0,d=a.length;d>c;c++)b.push(a[c]);return b}function c(a,b){if(Na&&b.stack&&"object"==typeof a&&null!==a&&a.stack&&-1===a.stack.indexOf(Ra)){for(var c=[],e=b;e;e=e.source)e.stack&&c.unshift(e.stack);c.unshift(a.stack);var f=c.join("\n"+Ra+"\n");a.stack=d(f)}}function d(a){for(var b=a.split("\n"),c=[],d=0,g=b.length;g>d;d++){var h=b[d];e(h)||f(h)||!h||c.push(h)}return c.join("\n")}function e(a){var b=h(a);if(!b)return!1;var c=b[0],d=b[1];return c===Pa&&d>=Qa&&Cd>=d}function f(a){return-1!==a.indexOf("(module.js:")||-1!==a.indexOf("(node.js:")}function g(){if(Na)try{throw new Error}catch(a){var b=a.stack.split("\n"),c=b[0].indexOf("@")>0?b[1]:b[2],d=h(c);if(!d)return;return Pa=d[0],d[1]}}function h(a){var b=/at .+ \((.+):(\d+):(?:\d+)\)$/.exec(a);if(b)return[b[1],Number(b[2])];var c=/at ([^ ]+):(\d+):(?:\d+)$/.exec(a);if(c)return[c[1],Number(c[2])];var d=/.*@(.+):(\d+)$/.exec(a);return d?[d[1],Number(d[2])]:void 0}function i(a){var b=[];if(!yb(a))return b;xb.nonEnumArgs&&a.length&&zb(a)&&(a=Cb.call(a));var c=xb.enumPrototypes&&"function"==typeof a,d=xb.enumErrorProps&&(a===sb||a instanceof Error);for(var e in a)c&&"prototype"==e||d&&("message"==e||"name"==e)||b.push(e);if(xb.nonEnumShadows&&a!==tb){var f=a.constructor,g=-1,h=eb;if(a===(f&&f.prototype))var i=a===ub?ob:a===sb?jb:pb.call(a),j=wb[i];for(;++g<h;)e=db[g],j&&j[e]||!qb.call(a,e)||b.push(e)}return b}function j(a,b,c){for(var d=-1,e=c(a),f=e.length;++d<f;){var g=e[d];if(b(a[g],g,a)===!1)break}return a}function k(a,b){return j(a,b,i)}function l(a){return"function"!=typeof a.toString&&"string"==typeof(a+"")}function m(a,b,c,d){if(a===b)return 0!==a||1/a==1/b;var e=typeof a,f=typeof b;if(a===a&&(null==a||null==b||"function"!=e&&"object"!=e&&"function"!=f&&"object"!=f))return!1;var g=pb.call(a),h=pb.call(b);if(g==fb&&(g=mb),h==fb&&(h=mb),g!=h)return!1;switch(g){case hb:case ib:return+a==+b;case lb:return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case nb:case ob:return a==String(b)}var i=g==gb;if(!i){if(g!=mb||!xb.nodeClass&&(l(a)||l(b)))return!1;var j=!xb.argsObject&&zb(a)?Object:a.constructor,n=!xb.argsObject&&zb(b)?Object:b.constructor;if(!(j==n||qb.call(a,"constructor")&&qb.call(b,"constructor")||Ma(j)&&j instanceof j&&Ma(n)&&n instanceof n||!("constructor"in a&&"constructor"in b)))return!1}c||(c=[]),d||(d=[]);for(var o=c.length;o--;)if(c[o]==a)return d[o]==b;var p=0,q=!0;if(c.push(a),d.push(b),i){if(o=a.length,p=b.length,q=p==o)for(;p--;){var r=b[p];if(!(q=m(a[p],r,c,d)))break}}else k(b,function(b,e,f){return qb.call(f,e)?(p++,q=qb.call(a,e)&&m(a[e],b,c,d)):void 0}),q&&k(a,function(a,b,c){return qb.call(c,b)?q=--p>-1:void 0});return c.pop(),d.pop(),q}function n(a,b){for(var c=new Array(a),d=0;a>d;d++)c[d]=b();return c}function o(){try{return Ab.apply(this,arguments)}catch(a){return Gb.e=a,Gb}}function p(a){if(!Ma(a))throw new TypeError("fn must be a function");return Ab=a,o}function q(a){throw a}function r(a,b){this.id=a,this.value=b}function t(a,b){this.scheduler=a,this.disposable=b,this.isDisposed=!1}function u(a,b){b.isDisposed||(b.isDisposed=!0,b.disposable.dispose())}function v(a){this.observer=a,this.a=[],this.isStopped=!1}function w(){this._s=s}function x(){this._s=s,this._l=s.length,this._i=0}function y(a){this._a=a}function z(a){this._a=a,this._l=D(a),this._i=0}function A(a){return"number"==typeof a&&ya.isFinite(a)}function B(b){var c,d=b[Za];if(!d&&"string"==typeof b)return c=new w(b),c[Za]();if(!d&&b.length!==a)return c=new y(b),c[Za]();if(!d)throw new TypeError("Object is not iterable");return b[Za]()}function C(a){var b=+a;return 0===b?b:isNaN(b)?b:0>b?-1:1}function D(a){var b=+a.length;return isNaN(b)?0:0!==b&&A(b)?(b=C(b)*Math.floor(Math.abs(b)),0>=b?0:b>Ec?Ec:b):b}function E(a,b){this.observer=a,this.parent=b}function F(a,b){return Wb(a)||(a=_b),new Gc(b,a)}function G(a,b){this.observer=a,this.parent=b}function H(a,b){this.observer=a,this.parent=b}function I(a,b){return new wd(function(c){var d=new Qb,e=new Rb;return e.setDisposable(d),d.setDisposable(a.subscribe(function(a){c.onNext(a)},function(a){try{var d=b(a)}catch(f){return c.onError(f)}Ka(d)&&(d=xc(d));var g=new Qb;e.setDisposable(g),g.setDisposable(d.subscribe(c))},function(a){c.onCompleted(a)})),e},a)}function J(a,b){var c=this;return new wd(function(d){var e=0,f=a.length;return c.subscribe(function(c){if(f>e){var g,h=a[e++];try{g=b(c,h)}catch(i){return d.onError(i)}d.onNext(g)}else d.onCompleted()},function(a){d.onError(a)},function(){d.onCompleted()})},c)}function K(){return!1}function L(){return[]}function M(a,b,c){var d=cb(b,c,3);return a.map(function(b,c){var e=d(b,c,a);return Ka(e)&&(e=xc(e)),(ab(e)||_a(e))&&(e=Fc(e)),e}).concatAll()}function N(a,b,c){for(var d=0,e=a.length;e>d;d++)if(c(a[d],b))return d;return-1}function O(a){this.comparer=a,this.set=[]}function P(a,b,c){this.observer=a,this.selector=b,this.source=c,this.i=0,this.isStopped=!1}function Q(a,b,c){var d=cb(b,c,3);return a.map(function(b,c){var e=d(b,c,a);return Ka(e)&&(e=xc(e)),(ab(e)||_a(e))&&(e=Fc(e)),e}).mergeAll()}function R(a,b,c){this.observer=a,this.predicate=b,this.source=c,this.i=0,this.isStopped=!1}function S(a,b,c){return new wd(function(d){var e=!1,f=null,g=[];return a.subscribe(function(a){var h,i;try{i=b(a)}catch(j){return void d.onError(j)}if(h=0,e)try{h=c(i,f)}catch(k){return void d.onError(k)}else e=!0,f=i;h>0&&(f=i,g=[]),h>=0&&g.push(a)},function(a){d.onError(a)},function(){d.onNext(g),d.onCompleted()})},a)}function T(a){if(0===a.length)throw new Sa;return a[0]}function U(a,b,c,d){if(0>b)throw new Ua;return new wd(function(e){var f=b;return a.subscribe(function(a){0===f--&&(e.onNext(a),e.onCompleted())},function(a){e.onError(a)},function(){c?(e.onNext(d),e.onCompleted()):e.onError(new Ua)})},a)}function V(a,b,c){return new wd(function(d){var e=c,f=!1;return a.subscribe(function(a){f?d.onError(new Error("Sequence contains more than one element")):(e=a,f=!0)},function(a){d.onError(a)},function(){f||b?(d.onNext(e),d.onCompleted()):d.onError(new Sa)})},a)}function W(a,b,c){return new wd(function(d){return a.subscribe(function(a){d.onNext(a),d.onCompleted()},function(a){d.onError(a)},function(){b?(d.onNext(c),d.onCompleted()):d.onError(new Sa)})},a)}function X(a,b,c){return new wd(function(d){var e=c,f=!1;return a.subscribe(function(a){e=a,f=!0},function(a){d.onError(a)},function(){f||b?(d.onNext(e),d.onCompleted()):d.onError(new Sa)})},a)}function Y(b,c,d,e){var f=cb(c,d,3);return new wd(function(c){var d=0;return b.subscribe(function(a){var g;try{g=f(a,d,b)}catch(h){return void c.onError(h)}g?(c.onNext(e?d:a),c.onCompleted()):d++},function(a){c.onError(a)},function(){c.onNext(e?-1:a),c.onCompleted()})},b)}function Z(a,b){return Array.isArray(a)?$.call(b,a):ca(a)?dd(a.call(b)):da(a)?dd(a):ba(a)?_(a):Ka(a)?aa(a):typeof a===bd?a:yb(a)||Array.isArray(a)?$.call(b,a):a}function $(a){var b=this;return function(c){function d(a,d){if(!e)try{if(a=Z(a,b),typeof a!==bd)return h[d]=a,--g||c(null,h);a.call(b,function(a,b){if(!e){if(a)return e=!0,c(a);h[d]=b,--g||c(null,h)}})}catch(f){e=!0,c(f)}}var e,f=Object.keys(a),g=f.length,h=new a.constructor;if(!g)return void dc.schedule(function(){c(null,h)});for(var i=0,j=f.length;j>i;i++)d(a[f[i]],f[i])}}function _(a){return function(b){var c,d=!1;a.subscribe(function(a){c=a,d=!0},b,function(){d&&b(null,c)})}}function aa(a){return function(b){a.then(function(a){b(null,a)},b)}}function ba(a){return a&&typeof a.subscribe===bd}function ca(a){return a&&a.constructor&&"GeneratorFunction"===a.constructor.name}function da(a){return a&&typeof a.next===bd&&typeof a[cd]===bd}function ea(a){a&&dc.schedule(function(){throw a})}function fa(a,b,c){if(a.addEventListener)return a.addEventListener(b,c,!1),Mb(function(){a.removeEventListener(b,c,!1)});throw new Error("No listener found")}function ga(a,b,c){var d=new Jb;if("[object NodeList]"===Object.prototype.toString.call(a))for(var e=0,f=a.length;f>e;e++)d.add(ga(a.item(e),b,c));else a&&d.add(fa(a,b,c));return d}function ha(a,b,c){return new wd(function(d){function e(a,b){j[b]=a;var e;if(g[b]=!0,h||(h=g.every(Fa))){if(f)return void d.onError(f);try{e=c.apply(null,j)}catch(k){return void d.onError(k)}d.onNext(e)}i&&j[1]&&d.onCompleted()}var f,g=[!1,!1],h=!1,i=!1,j=new Array(2);return new Jb(a.subscribe(function(a){e(a,0)},function(a){j[1]?d.onError(a):f=a},function(){i=!0,j[1]&&d.onCompleted()}),b.subscribe(function(a){e(a,1)},function(a){d.onError(a)},function(){i=!0,e(!0,1)}))},a)}function ia(a,b){return a.groupJoin(this,b,Bc,function(a,b){return b})}function ja(a){var b=this;return new wd(function(c){var d=new zd,e=new Jb,f=new Sb(e);return c.onNext(Fb(d,f)),e.add(b.subscribe(function(a){d.onNext(a)},function(a){d.onError(a),c.onError(a)},function(){d.onCompleted(),c.onCompleted()})),Ka(a)&&(a=xc(a)),e.add(a.subscribe(function(){d.onCompleted(),d=new zd,c.onNext(Fb(d,f))},function(a){d.onError(a),c.onError(a)},function(){d.onCompleted(),c.onCompleted()})),f},b)}function ka(a){var b=this;return new wd(function(c){function d(){var b;try{b=a()}catch(f){return void c.onError(f)}Ka(b)&&(b=xc(b));var i=new Qb;e.setDisposable(i),i.setDisposable(b.take(1).subscribe(Ea,function(a){h.onError(a),c.onError(a)},function(){h.onCompleted(),h=new zd,c.onNext(Fb(h,g)),d()}))}var e=new Rb,f=new Jb(e),g=new Sb(f),h=new zd;return c.onNext(Fb(h,g)),f.add(b.subscribe(function(a){h.onNext(a)},function(a){h.onError(a),c.onError(a)},function(){h.onCompleted(),c.onCompleted()})),d(),g},b)}function la(b,c){return new kc(function(){return new jc(function(){return b()?{done:!1,value:c}:{done:!0,value:a}})})}function ma(a){this.patterns=a}function na(a,b){this.expression=a,this.selector=b}function oa(a,b,c){var d=a.get(b);if(!d){var e=new ud(b,c);return a.set(b,e),e}return d}function pa(a,b,c){this.joinObserverArray=a,this.onNext=b,this.onCompleted=c,this.joinObservers=new td;for(var d=0,e=this.joinObserverArray.length;e>d;d++){var f=this.joinObserverArray[d];this.joinObservers.set(f,f)}}function qa(a,b){return new wd(function(c){return b.scheduleWithAbsolute(a,function(){c.onNext(0),c.onCompleted()})})}function ra(a,b,c){return new wd(function(d){var e=a,f=Vb(b);return c.scheduleRecursiveWithAbsoluteAndState(0,e,function(a,b){if(f>0){var g=c.now();e+=f,g>=e&&(e=g+f)}d.onNext(a),b(a+1,e)})})}function sa(a,b){return new wd(function(c){return b.scheduleWithRelative(Vb(a),function(){c.onNext(0),c.onCompleted()})})}function ta(a,b,c){return a===b?new wd(function(a){return c.schedulePeriodicWithState(0,b,function(b){return a.onNext(b),b+1})}):zc(function(){return ra(c.now()+a,b,c)})}function ua(a,b,c){return new wd(function(d){var e,f=!1,g=new Rb,h=null,i=[],j=!1;return e=a.materialize().timestamp(c).subscribe(function(a){var e,k;"E"===a.value.kind?(i=[],i.push(a),h=a.value.exception,k=!j):(i.push({value:a.value,timestamp:a.timestamp+b}),k=!f,f=!0),k&&(null!==h?d.onError(h):(e=new Qb,g.setDisposable(e),e.setDisposable(c.scheduleRecursiveWithRelative(b,function(a){var b,e,g,k;if(null===h){j=!0;do g=null,i.length>0&&i[0].timestamp-c.now()<=0&&(g=i.shift().value),null!==g&&g.accept(d);while(null!==g);k=!1,e=0,i.length>0?(k=!0,e=Math.max(0,i[0].timestamp-c.now())):f=!1,b=h,j=!1,null!==b?d.onError(b):k&&a(e)}}))))}),new Jb(e,g)},a)}function va(a,b,c){return zc(function(){return ua(a,b-c.now(),c)})}function wa(a,b){return new wd(function(c){function d(){g&&(g=!1,c.onNext(f)),e&&c.onCompleted()}var e,f,g;return new Jb(a.subscribe(function(a){g=!0,f=a},c.onError.bind(c),function(){e=!0}),b.subscribe(d,c.onError.bind(c),d))},a)}var xa={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},ya=xa[typeof window]&&window||this,za=xa[typeof exports]&&exports&&!exports.nodeType&&exports,Aa=xa[typeof module]&&module&&!module.nodeType&&module,Ba=Aa&&Aa.exports===za&&za,Ca=xa[typeof global]&&global;!Ca||Ca.global!==Ca&&Ca.window!==Ca||(ya=Ca);var Da={internals:{},config:{Promise:ya.Promise},helpers:{}},Ea=Da.helpers.noop=function(){},Fa=(Da.helpers.notDefined=function(a){return"undefined"==typeof a},Da.helpers.identity=function(a){return a}),Ga=(Da.helpers.pluck=function(a){return function(b){return b[a]}},Da.helpers.just=function(a){return function(){return a}},Da.helpers.defaultNow=Date.now),Ha=Da.helpers.defaultComparer=function(a,b){return Bb(a,b)},Ia=Da.helpers.defaultSubComparer=function(a,b){return a>b?1:b>a?-1:0},Ja=(Da.helpers.defaultKeySerializer=function(a){return a.toString()},Da.helpers.defaultError=function(a){throw a}),Ka=Da.helpers.isPromise=function(a){return!!a&&"function"==typeof a.then},La=(Da.helpers.asArray=function(){return Array.prototype.slice.call(arguments)},Da.helpers.not=function(a){return!a}),Ma=Da.helpers.isFunction=function(){var a=function(a){return"function"==typeof a||!1};return a(/x/)&&(a=function(a){return"function"==typeof a&&"[object Function]"==pb.call(a)}),a}();Da.config.longStackSupport=!1;var Na=!1;try{throw new Error}catch(Oa){Na=!!Oa.stack}var Pa,Qa=g(),Ra="From previous event:",Sa=Da.EmptyError=function(){this.message="Sequence contains no elements.",Error.call(this)};Sa.prototype=Error.prototype;var Ta=Da.ObjectDisposedError=function(){this.message="Object has been disposed",Error.call(this)};Ta.prototype=Error.prototype;var Ua=Da.ArgumentOutOfRangeError=function(){this.message="Argument out of range",Error.call(this)};Ua.prototype=Error.prototype;var Va=Da.NotSupportedError=function(a){this.message=a||"This operation is not supported",Error.call(this)};Va.prototype=Error.prototype;var Wa=Da.NotImplementedError=function(a){this.message=a||"This operation is not implemented",Error.call(this)};Wa.prototype=Error.prototype;var Xa=Da.helpers.notImplemented=function(){throw new Wa},Ya=Da.helpers.notSupported=function(){throw new Va},Za="function"==typeof Symbol&&Symbol.iterator||"_es6shim_iterator_";ya.Set&&"function"==typeof(new ya.Set)["@@iterator"]&&(Za="@@iterator");var $a=Da.doneEnumerator={done:!0,value:a},_a=Da.helpers.isIterable=function(b){return b[Za]!==a},ab=Da.helpers.isArrayLike=function(b){return b&&b.length!==a};Da.helpers.iterator=Za;var bb,cb=Da.internals.bindCallback=function(a,b,c){if("undefined"==typeof b)return a;switch(c){case 0:return function(){return a.call(b)};case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,e){return a.call(b,c,d,e)}}return function(){return a.apply(b,arguments)}},db=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],eb=db.length,fb="[object Arguments]",gb="[object Array]",hb="[object Boolean]",ib="[object Date]",jb="[object Error]",kb="[object Function]",lb="[object Number]",mb="[object Object]",nb="[object RegExp]",ob="[object String]",pb=Object.prototype.toString,qb=Object.prototype.hasOwnProperty,rb=pb.call(arguments)==fb,sb=Error.prototype,tb=Object.prototype,ub=String.prototype,vb=tb.propertyIsEnumerable;try{bb=!(pb.call(document)==mb&&!({toString:0}+""))}catch(Oa){bb=!0}var wb={};wb[gb]=wb[ib]=wb[lb]={constructor:!0,toLocaleString:!0,toString:!0,valueOf:!0},wb[hb]=wb[ob]={constructor:!0,toString:!0,valueOf:!0},wb[jb]=wb[kb]=wb[nb]={constructor:!0,toString:!0},wb[mb]={constructor:!0};var xb={};!function(){var a=function(){this.x=1},b=[];a.prototype={valueOf:1,y:1};for(var c in new a)b.push(c);for(c in arguments);xb.enumErrorProps=vb.call(sb,"message")||vb.call(sb,"name"),xb.enumPrototypes=vb.call(a,"prototype"),xb.nonEnumArgs=0!=c,xb.nonEnumShadows=!/valueOf/.test(b)}(1);var yb=Da.internals.isObject=function(a){var b=typeof a;return a&&("function"==b||"object"==b)||!1},zb=function(a){return a&&"object"==typeof a?pb.call(a)==fb:!1};rb||(zb=function(a){return a&&"object"==typeof a?qb.call(a,"callee"):!1});var Ab,Bb=Da.internals.isEqual=function(a,b){return m(a,b,[],[])},Cb=({}.hasOwnProperty,Array.prototype.slice),Db=this.inherits=Da.internals.inherits=function(a,b){function c(){this.constructor=a}c.prototype=b.prototype,a.prototype=new c},Eb=Da.internals.addProperties=function(a){for(var b=[],c=1,d=arguments.length;d>c;c++)b.push(arguments[c]);for(var e=0,f=b.length;f>e;e++){var g=b[e];for(var h in g)a[h]=g[h]}},Fb=Da.internals.addRef=function(a,b){return new wd(function(c){return new Jb(b.getDisposable(),a.subscribe(c))})},Gb={e:{}};r.prototype.compareTo=function(a){var b=this.value.compareTo(a.value);return 0===b&&(b=this.id-a.id),b};var Hb=Da.internals.PriorityQueue=function(a){this.items=new Array(a),this.length=0},Ib=Hb.prototype;Ib.isHigherPriority=function(a,b){return this.items[a].compareTo(this.items[b])<0},Ib.percolate=function(a){if(!(a>=this.length||0>a)){var b=a-1>>1;if(!(0>b||b===a)&&this.isHigherPriority(a,b)){var c=this.items[a];this.items[a]=this.items[b],this.items[b]=c,this.percolate(b)}}},Ib.heapify=function(a){if(+a||(a=0),!(a>=this.length||0>a)){var b=2*a+1,c=2*a+2,d=a;if(b<this.length&&this.isHigherPriority(b,d)&&(d=b),c<this.length&&this.isHigherPriority(c,d)&&(d=c),d!==a){var e=this.items[a];this.items[a]=this.items[d],this.items[d]=e,this.heapify(d)}}},Ib.peek=function(){return this.items[0].value},Ib.removeAt=function(b){this.items[b]=this.items[--this.length],this.items[this.length]=a,this.heapify()},Ib.dequeue=function(){var a=this.peek();return this.removeAt(0),a},Ib.enqueue=function(a){var b=this.length++;this.items[b]=new r(Hb.count++,a),this.percolate(b)},Ib.remove=function(a){for(var b=0;b<this.length;b++)if(this.items[b].value===a)return this.removeAt(b),!0;return!1},Hb.count=0;var Jb=Da.CompositeDisposable=function(){var a,b,c=[];if(Array.isArray(arguments[0]))c=arguments[0],b=c.length;else for(b=arguments.length,c=new Array(b),a=0;b>a;a++)c[a]=arguments[a];for(a=0;b>a;a++)if(!Ob(c[a]))throw new TypeError("Not a disposable");this.disposables=c,this.isDisposed=!1,this.length=c.length},Kb=Jb.prototype;Kb.add=function(a){this.isDisposed?a.dispose():(this.disposables.push(a),this.length++)},Kb.remove=function(a){var b=!1;if(!this.isDisposed){var c=this.disposables.indexOf(a);-1!==c&&(b=!0,this.disposables.splice(c,1),this.length--,a.dispose())}return b},Kb.dispose=function(){if(!this.isDisposed){this.isDisposed=!0;for(var a=this.disposables.length,b=new Array(a),c=0;a>c;c++)b[c]=this.disposables[c];for(this.disposables=[],this.length=0,c=0;a>c;c++)b[c].dispose()}};var Lb=Da.Disposable=function(a){this.isDisposed=!1,this.action=a||Ea};Lb.prototype.dispose=function(){this.isDisposed||(this.action(),this.isDisposed=!0)};var Mb=Lb.create=function(a){return new Lb(a)},Nb=Lb.empty={dispose:Ea},Ob=Lb.isDisposable=function(a){return a&&Ma(a.dispose)},Pb=Lb.checkDisposed=function(a){if(a.isDisposed)throw new Ta},Qb=Da.SingleAssignmentDisposable=function(){this.isDisposed=!1,this.current=null};Qb.prototype.getDisposable=function(){return this.current},Qb.prototype.setDisposable=function(a){if(this.current)throw new Error("Disposable has already been assigned");var b=this.isDisposed;!b&&(this.current=a),b&&a&&a.dispose()},Qb.prototype.dispose=function(){if(!this.isDisposed){this.isDisposed=!0;var a=this.current;this.current=null}a&&a.dispose()};var Rb=Da.SerialDisposable=function(){this.isDisposed=!1,this.current=null};Rb.prototype.getDisposable=function(){return this.current},Rb.prototype.setDisposable=function(a){var b=this.isDisposed;if(!b){var c=this.current;this.current=a}c&&c.dispose(),b&&a&&a.dispose()},Rb.prototype.dispose=function(){if(!this.isDisposed){this.isDisposed=!0;var a=this.current;this.current=null}a&&a.dispose()};var Sb=Da.RefCountDisposable=function(){function a(a){this.disposable=a,this.disposable.count++,this.isInnerDisposed=!1}function b(a){this.underlyingDisposable=a,this.isDisposed=!1,this.isPrimaryDisposed=!1,this.count=0}return a.prototype.dispose=function(){this.disposable.isDisposed||this.isInnerDisposed||(this.isInnerDisposed=!0,this.disposable.count--,0===this.disposable.count&&this.disposable.isPrimaryDisposed&&(this.disposable.isDisposed=!0,this.disposable.underlyingDisposable.dispose()))},b.prototype.dispose=function(){this.isDisposed||this.isPrimaryDisposed||(this.isPrimaryDisposed=!0,0===this.count&&(this.isDisposed=!0,this.underlyingDisposable.dispose()))},b.prototype.getDisposable=function(){return this.isDisposed?Nb:new a(this)},b}();t.prototype.dispose=function(){this.scheduler.scheduleWithState(this,u)};var Tb=Da.internals.ScheduledItem=function(a,b,c,d,e){this.scheduler=a,this.state=b,this.action=c,this.dueTime=d,this.comparer=e||Ia,this.disposable=new Qb};Tb.prototype.invoke=function(){this.disposable.setDisposable(this.invokeCore())},Tb.prototype.compareTo=function(a){return this.comparer(this.dueTime,a.dueTime)},Tb.prototype.isCancelled=function(){return this.disposable.isDisposed},Tb.prototype.invokeCore=function(){return this.action(this.scheduler,this.state)};var Ub=Da.Scheduler=function(){function a(a,b,c,d){this.now=a,this._schedule=b,this._scheduleRelative=c,this._scheduleAbsolute=d}function b(a,b){return b(),Nb}a.isScheduler=function(b){return b instanceof a};var c=a.prototype;return c.schedule=function(a){return this._schedule(a,b)},c.scheduleWithState=function(a,b){return this._schedule(a,b)},c.scheduleWithRelative=function(a,c){return this._scheduleRelative(c,a,b)},c.scheduleWithRelativeAndState=function(a,b,c){return this._scheduleRelative(a,b,c)},c.scheduleWithAbsolute=function(a,c){return this._scheduleAbsolute(c,a,b)},c.scheduleWithAbsoluteAndState=function(a,b,c){return this._scheduleAbsolute(a,b,c)},a.now=Ga,a.normalize=function(a){return 0>a&&(a=0),a},a}(),Vb=Ub.normalize,Wb=Ub.isScheduler;!function(a){function b(a,b){function c(b){e(b,function(b){var d=!1,e=!1,g=a.scheduleWithState(b,function(a,b){return d?f.remove(g):e=!0,c(b),Nb});e||(f.add(g),d=!0)})}var d=b[0],e=b[1],f=new Jb;return c(d),f}function c(a,b,c){function d(b){f(b,function(b,e){var f=!1,h=!1,i=a[c](b,e,function(a,b){return f?g.remove(i):h=!0,d(b),Nb});h||(g.add(i),f=!0)})}var e=b[0],f=b[1],g=new Jb;return d(e),g}function d(a,b){a(function(c){b(a,c)})}a.scheduleRecursive=function(a){return this.scheduleRecursiveWithState(a,function(a,b){a(function(){b(a)})})},a.scheduleRecursiveWithState=function(a,c){return this.scheduleWithState([a,c],b)},a.scheduleRecursiveWithRelative=function(a,b){return this.scheduleRecursiveWithRelativeAndState(b,a,d)},a.scheduleRecursiveWithRelativeAndState=function(a,b,d){return this._scheduleRelative([a,d],b,function(a,b){return c(a,b,"scheduleWithRelativeAndState")})},a.scheduleRecursiveWithAbsolute=function(a,b){return this.scheduleRecursiveWithAbsoluteAndState(b,a,d)},a.scheduleRecursiveWithAbsoluteAndState=function(a,b,d){return this._scheduleAbsolute([a,d],b,function(a,b){return c(a,b,"scheduleWithAbsoluteAndState")})}}(Ub.prototype),function(){Ub.prototype.schedulePeriodic=function(a,b){return this.schedulePeriodicWithState(null,a,b)},Ub.prototype.schedulePeriodicWithState=function(a,b,c){if("undefined"==typeof ya.setInterval)throw new Va;b=Vb(b);var d=a,e=ya.setInterval(function(){d=c(d)},b);return Mb(function(){ya.clearInterval(e)})}}(Ub.prototype),function(a){a.catchError=a["catch"]=function(a){return new ec(this,a)}}(Ub.prototype);var Xb,Yb,Zb=Da.internals.SchedulePeriodicRecursive=function(){function a(a,b){b(0,this._period);try{this._state=this._action(this._state)}catch(c){throw this._cancel.dispose(),c}}function b(a,b,c,d){this._scheduler=a,this._state=b,this._period=c,this._action=d}return b.prototype.start=function(){var b=new Qb;return this._cancel=b,b.setDisposable(this._scheduler.scheduleRecursiveWithRelativeAndState(0,this._period,a.bind(this))),b},b}(),$b=Ub.immediate=function(){function a(a,b){return b(this,a)}return new Ub(Ga,a,Ya,Ya)}(),_b=Ub.currentThread=function(){function a(){for(;c.length>0;){var a=c.dequeue();!a.isCancelled()&&a.invoke()}}function b(b,d){var e=new Tb(this,b,d,this.now());if(c)c.enqueue(e);else{c=new Hb(4),c.enqueue(e);var f=p(a)();if(c=null,f===Gb)return q(f.e)}return e.disposable}var c,d=new Ub(Ga,b,Ya,Ya);return d.scheduleRequired=function(){return!c},d}(),ac=function(){var a,b=Ea;if(ya.setTimeout)a=ya.setTimeout,b=ya.clearTimeout;else{if(!ya.WScript)throw new Va;a=function(a,b){ya.WScript.Sleep(b),a()}}return{setTimeout:a,clearTimeout:b}}(),bc=ac.setTimeout,cc=ac.clearTimeout;!function(){function a(b){if(f)bc(function(){a(b)},0);else{var c=e[b];if(c){f=!0;var d=p(c)();if(Yb(b),f=!1,d===Gb)return q(d.e)}}}function b(){if(!ya.postMessage||ya.importScripts)return!1;var a=!1,b=ya.onmessage;return ya.onmessage=function(){a=!0},ya.postMessage("","*"),ya.onmessage=b,a}function c(b){"string"==typeof b.data&&b.data.substring(0,i.length)===i&&a(b.data.substring(i.length))}var d=1,e={},f=!1;Yb=function(a){delete e[a]};var g=RegExp("^"+String(pb).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),h="function"==typeof(h=Ca&&Ba&&Ca.setImmediate)&&!g.test(h)&&h;if(Ma(h))Xb=function(b){var c=d++;return e[c]=b,h(function(){a(c)}),c};else if("undefined"!=typeof process&&"[object process]"==={}.toString.call(process))Xb=function(b){var c=d++;return e[c]=b,process.nextTick(function(){a(c)}),c};else if(b()){var i="ms.rx.schedule"+Math.random();ya.addEventListener?ya.addEventListener("message",c,!1):ya.attachEvent?ya.attachEvent("onmessage",c):ya.onmessage=c,Xb=function(a){var b=d++;return e[b]=a,ya.postMessage(i+currentId,"*"),b}}else if(ya.MessageChannel){var j=new ya.MessageChannel;j.port1.onmessage=function(b){a(b.data)},Xb=function(a){var b=d++;return e[b]=a,j.port2.postMessage(b),b}}else Xb="document"in ya&&"onreadystatechange"in ya.document.createElement("script")?function(b){var c=ya.document.createElement("script"),f=d++;return e[f]=b,c.onreadystatechange=function(){a(f),c.onreadystatechange=null,c.parentNode.removeChild(c),c=null},ya.document.documentElement.appendChild(c),f}:function(b){var c=d++;return e[c]=b,bc(function(){a(c)},0),c}}();var dc=Ub.timeout=Ub["default"]=function(){function a(a,b){var c=this,d=new Qb,e=Xb(function(){!d.isDisposed&&d.setDisposable(b(c,a))});return new Jb(d,Mb(function(){Yb(e)}))}function b(a,b,c){var d=this,e=Ub.normalize(b),f=new Qb;if(0===e)return d.scheduleWithState(a,c);var g=bc(function(){!f.isDisposed&&f.setDisposable(c(d,a))},e);return new Jb(f,Mb(function(){cc(g)}))}function c(a,b,c){return this.scheduleWithRelativeAndState(a,b-this.now(),c)}return new Ub(Ga,a,b,c)}(),ec=function(a){function b(a,b){return this._scheduler.scheduleWithState(a,this._wrap(b))}function c(a,b,c){return this._scheduler.scheduleWithRelativeAndState(a,b,this._wrap(c))}function d(a,b,c){return this._scheduler.scheduleWithAbsoluteAndState(a,b,this._wrap(c))}function e(e,f){this._scheduler=e,this._handler=f,this._recursiveOriginal=null,this._recursiveWrapper=null,a.call(this,this._scheduler.now.bind(this._scheduler),b,c,d)}return Db(e,a),e.prototype._clone=function(a){return new e(a,this._handler)},e.prototype._wrap=function(a){var b=this;return function(c,d){try{return a(b._getRecursiveWrapper(c),d)}catch(e){if(!b._handler(e))throw e;return Nb}}},e.prototype._getRecursiveWrapper=function(a){if(this._recursiveOriginal!==a){this._recursiveOriginal=a;var b=this._clone(a);b._recursiveOriginal=a,b._recursiveWrapper=b,this._recursiveWrapper=b}return this._recursiveWrapper},e.prototype.schedulePeriodicWithState=function(a,b,c){var d=this,e=!1,f=new Qb;return f.setDisposable(this._scheduler.schedulePeriodicWithState(a,b,function(a){if(e)return null;try{return c(a)}catch(b){if(e=!0,!d._handler(b))throw b;return f.dispose(),null}})),f},e}(Ub),fc=Da.Notification=function(){function a(a,b,c,d,e,f){this.kind=a,this.value=b,this.exception=c,this._accept=d,this._acceptObservable=e,this.toString=f}return a.prototype.accept=function(a,b,c){return a&&"object"==typeof a?this._acceptObservable(a):this._accept(a,b,c)},a.prototype.toObservable=function(a){var b=this;return Wb(a)||(a=$b),new wd(function(c){return a.scheduleWithState(b,function(a,b){b._acceptObservable(c),"N"===b.kind&&c.onCompleted()})})},a}(),gc=fc.createOnNext=function(){function a(a){return a(this.value)}function b(a){return a.onNext(this.value)}function c(){return"OnNext("+this.value+")"}return function(d){return new fc("N",d,null,a,b,c)}}(),hc=fc.createOnError=function(){function a(a,b){return b(this.exception)}function b(a){return a.onError(this.exception)}function c(){return"OnError("+this.exception+")"}return function(d){return new fc("E",null,d,a,b,c)}}(),ic=fc.createOnCompleted=function(){function a(a,b,c){return c()}function b(a){return a.onCompleted()}function c(){return"OnCompleted()"}return function(){return new fc("C",null,null,a,b,c)}}(),jc=Da.internals.Enumerator=function(a){this._next=a};jc.prototype.next=function(){return this._next()},jc.prototype[Za]=function(){return this};var kc=Da.internals.Enumerable=function(a){this._iterator=a};kc.prototype[Za]=function(){return this._iterator()},kc.prototype.concat=function(){var a=this;return new wd(function(b){var c,d=a[Za](),e=new Rb,f=$b.scheduleRecursive(function(a){if(!c){try{var f=d.next()}catch(g){return b.onError(g)}if(f.done)return b.onCompleted();var h=f.value;Ka(h)&&(h=xc(h));var i=new Qb;e.setDisposable(i),i.setDisposable(h.subscribe(function(a){b.onNext(a)},function(a){b.onError(a)},a))}});return new Jb(e,f,Mb(function(){c=!0}))})},kc.prototype.catchError=function(){var a=this;return new wd(function(b){var c,d=a[Za](),e=new Rb,f=$b.scheduleRecursiveWithState(null,function(a,f){if(!c){try{var g=d.next()}catch(h){return observer.onError(h)}if(g.done)return void(null!==a?b.onError(a):b.onCompleted());var i=g.value;Ka(i)&&(i=xc(i));var j=new Qb;e.setDisposable(j),j.setDisposable(i.subscribe(function(a){b.onNext(a)},f,function(){b.onCompleted()}))}});return new Jb(e,f,Mb(function(){c=!0}))})},kc.prototype.catchErrorWhen=function(a){var b=this;return new wd(function(c){var d,e,f=new zd,g=new zd,h=a(f),i=h.subscribe(g),j=b[Za](),k=new Rb,l=$b.scheduleRecursive(function(a){if(!d){try{var b=j.next()}catch(h){return c.onError(h)}if(b.done)return void(e?c.onError(e):c.onCompleted());var i=b.value;Ka(i)&&(i=xc(i));var l=new Qb,m=new Qb;k.setDisposable(new Jb(m,l)),l.setDisposable(i.subscribe(function(a){c.onNext(a)},function(b){m.setDisposable(g.subscribe(a,function(a){c.onError(a)},function(){c.onCompleted()})),f.onNext(b)},function(){c.onCompleted()}))}});return new Jb(i,k,l,Mb(function(){d=!0}))})};var lc=kc.repeat=function(a,b){return null==b&&(b=-1),new kc(function(){var c=b;return new jc(function(){return 0===c?$a:(c>0&&c--,{done:!1,value:a})})})},mc=kc.of=function(a,b,c){if(b)var d=cb(b,c,3);return new kc(function(){var c=-1;return new jc(function(){return++c<a.length?{done:!1,value:b?d(a[c],c,a):a[c]}:$a})})},nc=Da.Observer=function(){};nc.prototype.toNotifier=function(){var a=this;return function(b){return b.accept(a)}},nc.prototype.asObserver=function(){return new rc(this.onNext.bind(this),this.onError.bind(this),this.onCompleted.bind(this))},nc.prototype.checked=function(){return new sc(this)};var oc=nc.create=function(a,b,c){return a||(a=Ea),b||(b=Ja),c||(c=Ea),new rc(a,b,c)};nc.fromNotifier=function(a,b){return new rc(function(c){return a.call(b,gc(c))},function(c){return a.call(b,hc(c))},function(){return a.call(b,ic())})},nc.prototype.notifyOn=function(a){return new uc(a,this)},nc.prototype.makeSafe=function(a){return new AnonymousSafeObserver(this._onNext,this._onError,this._onCompleted,a)};var pc,qc=Da.internals.AbstractObserver=function(a){function b(){this.isStopped=!1,a.call(this)}return Db(b,a),b.prototype.next=Xa,b.prototype.error=Xa,b.prototype.completed=Xa,b.prototype.onNext=function(a){this.isStopped||this.next(a)},b.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.error(a))},b.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.completed())},b.prototype.dispose=function(){this.isStopped=!0},b.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.error(a),!0)},b}(nc),rc=Da.AnonymousObserver=function(a){function b(b,c,d){a.call(this),this._onNext=b,this._onError=c,this._onCompleted=d}return Db(b,a),b.prototype.next=function(a){this._onNext(a);

},b.prototype.error=function(a){this._onError(a)},b.prototype.completed=function(){this._onCompleted()},b}(qc),sc=function(a){function b(b){a.call(this),this._observer=b,this._state=0}Db(b,a);var c=b.prototype;return c.onNext=function(a){this.checkAccess();var b=p(this._observer.onNext).call(this._observer,a);this._state=0,b===Gb&&q(b.e)},c.onError=function(a){this.checkAccess();var b=p(this._observer.onError).call(this._observer,a);this._state=2,b===Gb&&q(b.e)},c.onCompleted=function(){this.checkAccess();var a=p(this._observer.onCompleted).call(this._observer);this._state=2,a===Gb&&q(a.e)},c.checkAccess=function(){if(1===this._state)throw new Error("Re-entrancy detected");if(2===this._state)throw new Error("Observer completed");0===this._state&&(this._state=1)},b}(nc),tc=Da.internals.ScheduledObserver=function(a){function b(b,c){a.call(this),this.scheduler=b,this.observer=c,this.isAcquired=!1,this.hasFaulted=!1,this.queue=[],this.disposable=new Rb}return Db(b,a),b.prototype.next=function(a){var b=this;this.queue.push(function(){b.observer.onNext(a)})},b.prototype.error=function(a){var b=this;this.queue.push(function(){b.observer.onError(a)})},b.prototype.completed=function(){var a=this;this.queue.push(function(){a.observer.onCompleted()})},b.prototype.ensureActive=function(){var a=!1,b=this;!this.hasFaulted&&this.queue.length>0&&(a=!this.isAcquired,this.isAcquired=!0),a&&this.disposable.setDisposable(this.scheduler.scheduleRecursive(function(a){var c;if(!(b.queue.length>0))return void(b.isAcquired=!1);c=b.queue.shift();try{c()}catch(d){throw b.queue=[],b.hasFaulted=!0,d}a()}))},b.prototype.dispose=function(){a.prototype.dispose.call(this),this.disposable.dispose()},b}(qc),uc=function(a){function b(b,c,d){a.call(this,b,c),this._cancel=d}return Db(b,a),b.prototype.next=function(b){a.prototype.next.call(this,b),this.ensureActive()},b.prototype.error=function(b){a.prototype.error.call(this,b),this.ensureActive()},b.prototype.completed=function(){a.prototype.completed.call(this),this.ensureActive()},b.prototype.dispose=function(){a.prototype.dispose.call(this),this._cancel&&this._cancel.dispose(),this._cancel=null},b}(tc),vc=Da.Observable=function(){function a(a){if(Da.config.longStackSupport&&Na){try{throw new Error}catch(b){this.stack=b.stack.substring(b.stack.indexOf("\n")+1)}var d=this;this._subscribe=function(b){var e=b.onError.bind(b);return b.onError=function(a){c(a,d),e(a)},a.call(d,b)}}else this._subscribe=a}return pc=a.prototype,pc.subscribe=pc.forEach=function(a,b,c){return this._subscribe("object"==typeof a?a:oc(a,b,c))},pc.subscribeOnNext=function(a,b){return this._subscribe(oc("undefined"!=typeof b?function(c){a.call(b,c)}:a))},pc.subscribeOnError=function(a,b){return this._subscribe(oc(null,"undefined"!=typeof b?function(c){a.call(b,c)}:a))},pc.subscribeOnCompleted=function(a,b){return this._subscribe(oc(null,null,"undefined"!=typeof b?function(){a.call(b)}:a))},a}(),wc=Da.ObservableBase=function(a){function b(a){return a&&Ma(a.dispose)?a:Ma(a)?Mb(a):Nb}function c(a,c){var d=c[0],e=c[1],f=p(e.subscribeCore).call(e,d);return f!==Gb||d.fail(Gb.e)?void d.setDisposable(b(f)):q(Gb.e)}function d(a){var b=new xd(a),d=[b,this];return _b.scheduleRequired()?_b.scheduleWithState(d,c):c(null,d),b}function e(){a.call(this,d)}return Db(e,a),e.prototype.subscribeCore=Xa,e}(vc);pc.observeOn=function(a){var b=this;return new wd(function(c){return b.subscribe(new uc(a,c))},b)},pc.subscribeOn=function(a){var b=this;return new wd(function(c){var d=new Qb,e=new Rb;return e.setDisposable(d),d.setDisposable(a.schedule(function(){e.setDisposable(new t(a,b.subscribe(c)))})),e},b)};var xc=vc.fromPromise=function(a){return zc(function(){var b=new Da.AsyncSubject;return a.then(function(a){b.onNext(a),b.onCompleted()},b.onError.bind(b)),b})};pc.toPromise=function(a){if(a||(a=Da.config.Promise),!a)throw new Va("Promise type not provided nor in Rx.config.Promise");var b=this;return new a(function(a,c){var d,e=!1;b.subscribe(function(a){d=a,e=!0},c,function(){e&&a(d)})})};var yc=function(a){function b(b){this.source=b,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){return this.source.subscribe(new v(a))},b}(wc);v.prototype.onNext=function(a){this.isStopped||this.a.push(a)},v.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.observer.onError(a))},v.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.observer.onNext(this.a),this.observer.onCompleted())},v.prototype.dispose=function(){this.isStopped=!0},v.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.observer.onError(a),!0)},pc.toArray=function(){return new yc(this)},vc.create=vc.createWithDisposable=function(a,b){return new wd(a,b)};var zc=vc.defer=function(a){return new wd(function(b){var c;try{c=a()}catch(d){return Qc(d).subscribe(b)}return Ka(c)&&(c=xc(c)),c.subscribe(b)})},Ac=function(a){function b(b){this.scheduler=b,a.call(this)}function c(a,b){this.observer=a,this.parent=b}function d(a,b){b.onCompleted()}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new c(a,this);return b.run()},c.prototype.run=function(){return this.parent.scheduler.scheduleWithState(this.observer,d)},b}(wc),Bc=vc.empty=function(a){return Wb(a)||(a=$b),new Ac(a)},Cc=function(a){function b(b,c,d){this.iterable=b,this.mapper=c,this.scheduler=d,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new Dc(a,this);return b.run()},b}(wc),Dc=function(){function a(a,b){this.observer=a,this.parent=b}return a.prototype.run=function(){function a(a,b){try{var f=c.next()}catch(g){return d.onError(g)}if(f.done)return d.onCompleted();var h=f.value;if(e)try{h=e(h,a)}catch(g){return d.onError(g)}d.onNext(h),b(a+1)}var b=Object(this.parent.iterable),c=B(b),d=this.observer,e=this.parent.mapper;return this.parent.scheduler.scheduleRecursiveWithState(0,a)},a}(),Ec=Math.pow(2,53)-1;w.prototype[Za]=function(){return new x(this._s)},x.prototype[Za]=function(){return this},x.prototype.next=function(){return this._i<this._l?{done:!1,value:this._s.charAt(this._i++)}:$a},y.prototype[Za]=function(){return new z(this._a)},z.prototype[Za]=function(){return this},z.prototype.next=function(){return this._i<this._l?{done:!1,value:this._a[this._i++]}:$a};var Fc=vc.from=function(a,b,c,d){if(null==a)throw new Error("iterable cannot be null.");if(b&&!Ma(b))throw new Error("mapFn when provided must be a function");if(b)var e=cb(b,c,2);return Wb(d)||(d=_b),new Cc(a,e,d)},Gc=function(a){function b(b,c){this.args=b,this.scheduler=c,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new E(a,this);return b.run()},b}(wc);E.prototype.run=function(){function a(a,e){d>a?(b.onNext(c[a]),e(a+1)):b.onCompleted()}var b=this.observer,c=this.parent.args,d=c.length;return this.parent.scheduler.scheduleRecursiveWithState(0,a)};var Hc=vc.fromArray=function(a,b){return Wb(b)||(b=_b),new Gc(a,b)};vc.generate=function(a,b,c,d,e){return Wb(e)||(e=_b),new wd(function(f){var g=!0;return e.scheduleRecursiveWithState(a,function(a,e){var h,i;try{g?g=!1:a=c(a),h=b(a),h&&(i=d(a))}catch(j){return f.onError(j)}h?(f.onNext(i),e(a)):f.onCompleted()})})},vc.of=function(){for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];return new Gc(b,_b)},vc.ofWithScheduler=function(a){for(var b=arguments.length,c=new Array(b-1),d=1;b>d;d++)c[d-1]=arguments[d];return new Gc(c,a)},vc.ofArrayChanges=function(a){if(!Array.isArray(a))throw new TypeError("Array.observe only accepts arrays.");if("function"!=typeof Array.observe&&"function"!=typeof Array.unobserve)throw new TypeError("Array.observe is not supported on your platform");return new wd(function(b){function c(a){for(var c=0,d=a.length;d>c;c++)b.onNext(a[c])}return Array.observe(a,c),function(){Array.unobserve(a,c)}})},vc.ofObjectChanges=function(a){if(null==a)throw new TypeError("object must not be null or undefined.");if("function"!=typeof Object.observe&&"function"!=typeof Object.unobserve)throw new TypeError("Array.observe is not supported on your platform");return new wd(function(b){function c(a){for(var c=0,d=a.length;d>c;c++)b.onNext(a[c])}return Object.observe(a,c),function(){Object.unobserve(a,c)}})};var Ic=function(a){function b(){a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(){return Nb},b}(wc),Jc=vc.never=function(){return new Ic},Kc=function(a){function b(b,c){this.obj=b,this.keys=Object.keys(b),this.scheduler=c,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new G(a,this);return b.run()},b}(wc);G.prototype.run=function(){function a(a,f){if(e>a){var g=d[a];b.onNext([g,c[g]]),f(a+1)}else b.onCompleted()}var b=this.observer,c=this.parent.obj,d=this.parent.keys,e=d.length;return this.parent.scheduler.scheduleRecursiveWithState(0,a)},vc.pairs=function(a,b){return b||(b=_b),new Kc(a,b)};var Lc=function(a){function b(b,c,d){this.start=b,this.count=c,this.scheduler=d,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new Mc(a,this);return b.run()},b}(wc),Mc=function(){function a(a,b){this.observer=a,this.parent=b}return a.prototype.run=function(){function a(a,e){c>a?(d.onNext(b+a),e(a+1)):d.onCompleted()}var b=this.parent.start,c=this.parent.count,d=this.observer;return this.parent.scheduler.scheduleRecursiveWithState(0,a)},a}();vc.range=function(a,b,c){return Wb(c)||(c=_b),new Lc(a,b,c)};var Nc=function(a){function b(b,c,d){this.value=b,this.repeatCount=null==c?-1:c,this.scheduler=d,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new H(a,this);return b.run()},b}(wc);H.prototype.run=function(){function a(a,d){return(-1===a||a>0)&&(b.onNext(c),a>0&&a--),0===a?b.onCompleted():void d(a)}var b=this.observer,c=this.parent.value;return this.parent.scheduler.scheduleRecursiveWithState(this.parent.repeatCount,a)},vc.repeat=function(a,b,c){return Wb(c)||(c=_b),new Nc(a,b,c)};var Oc=function(a){function b(b,c){this.value=b,this.scheduler=c,a.call(this)}function c(a,b){this.observer=a,this.parent=b}function d(a,b){var c=b[0],d=b[1];d.onNext(c),d.onCompleted()}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new c(a,this);return b.run()},c.prototype.run=function(){return this.parent.scheduler.scheduleWithState([this.parent.value,this.observer],d)},b}(wc),Pc=(vc["return"]=vc.just=vc.returnValue=function(a,b){return Wb(b)||(b=$b),new Oc(a,b)},function(a){function b(b,c){this.error=b,this.scheduler=c,a.call(this)}function c(a,b){this.observer=a,this.parent=b}function d(a,b){var c=b[0],d=b[1];d.onError(c)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new c(a,this);return b.run()},c.prototype.run=function(){return this.parent.scheduler.scheduleWithState([this.parent.error,this.observer],d)},b}(wc)),Qc=vc["throw"]=vc.throwError=vc.throwException=function(a,b){return Wb(b)||(b=$b),new Pc(a,b)};vc.using=function(a,b){return new wd(function(c){var d,e,f=Nb;try{d=a(),d&&(f=d),e=b(d)}catch(g){return new Jb(Qc(g).subscribe(c),f)}return new Jb(e.subscribe(c),f)})},pc.amb=function(a){var b=this;return new wd(function(c){function d(){f||(f=g,j.dispose())}function e(){f||(f=h,i.dispose())}var f,g="L",h="R",i=new Qb,j=new Qb;return Ka(a)&&(a=xc(a)),i.setDisposable(b.subscribe(function(a){d(),f===g&&c.onNext(a)},function(a){d(),f===g&&c.onError(a)},function(){d(),f===g&&c.onCompleted()})),j.setDisposable(a.subscribe(function(a){e(),f===h&&c.onNext(a)},function(a){e(),f===h&&c.onError(a)},function(){e(),f===h&&c.onCompleted()})),new Jb(i,j)})},vc.amb=function(){function a(a,b){return a.amb(b)}var b=Jc(),c=[];if(Array.isArray(arguments[0]))c=arguments[0];else for(var d=0,e=arguments.length;e>d;d++)c.push(arguments[d]);for(var d=0,e=c.length;e>d;d++)b=a(b,c[d]);return b},pc["catch"]=pc.catchError=pc.catchException=function(a){return"function"==typeof a?I(this,a):Rc([this,a])};var Rc=vc.catchError=vc["catch"]=vc.catchException=function(){var a=[];if(Array.isArray(arguments[0]))a=arguments[0];else for(var b=0,c=arguments.length;c>b;b++)a.push(arguments[b]);return mc(a).catchError()};pc.combineLatest=function(){for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];return Array.isArray(b[0])?b[0].unshift(this):b.unshift(this),Sc.apply(this,b)};var Sc=vc.combineLatest=function(){for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];var d=b.pop();return Array.isArray(b[0])&&(b=b[0]),new wd(function(a){function c(b){if(h[b]=!0,i||(i=h.every(Fa))){try{var c=d.apply(null,k)}catch(e){return a.onError(e)}a.onNext(c)}else j.filter(function(a,c){return c!==b}).every(Fa)&&a.onCompleted()}function e(b){j[b]=!0,j.every(Fa)&&a.onCompleted()}for(var f=b.length,g=function(){return!1},h=n(f,g),i=!1,j=n(f,g),k=new Array(f),l=new Array(f),m=0;f>m;m++)!function(d){var f=b[d],g=new Qb;Ka(f)&&(f=xc(f)),g.setDisposable(f.subscribe(function(a){k[d]=a,c(d)},function(b){a.onError(b)},function(){e(d)})),l[d]=g}(m);return new Jb(l)},this)};pc.concat=function(){for(var a=[],b=0,c=arguments.length;c>b;b++)a.push(arguments[b]);return a.unshift(this),Tc.apply(null,a)};var Tc=vc.concat=function(){var a;if(Array.isArray(arguments[0]))a=arguments[0];else{a=new Array(arguments.length);for(var b=0,c=arguments.length;c>b;b++)a[b]=arguments[b]}return mc(a).concat()};pc.concatAll=pc.concatObservable=function(){return this.merge(1)};var Uc=function(a){function b(b,c){this.source=b,this.maxConcurrent=c,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new Jb;return b.add(this.source.subscribe(new Vc(a,this.maxConcurrent,b))),b},b}(wc),Vc=function(){function a(a,b,c){this.o=a,this.max=b,this.g=c,this.done=!1,this.q=[],this.activeCount=0,this.isStopped=!1}function b(a,b){this.parent=a,this.sad=b,this.isStopped=!1}return a.prototype.handleSubscribe=function(a){var c=new Qb;this.g.add(c),Ka(a)&&(a=xc(a)),c.setDisposable(a.subscribe(new b(this,c)))},a.prototype.onNext=function(a){this.isStopped||(this.activeCount<this.max?(this.activeCount++,this.handleSubscribe(a)):this.q.push(a))},a.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.o.onError(a))},a.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.done=!0,0===this.activeCount&&this.o.onCompleted())},a.prototype.dispose=function(){this.isStopped=!0},a.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.o.onError(a),!0)},b.prototype.onNext=function(a){this.isStopped||this.parent.o.onNext(a)},b.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.parent.o.onError(a))},b.prototype.onCompleted=function(){if(!this.isStopped){this.isStopped=!0;var a=this.parent;a.g.remove(this.sad),a.q.length>0?a.handleSubscribe(a.q.shift()):(a.activeCount--,a.done&&0===a.activeCount&&a.o.onCompleted())}},b.prototype.dispose=function(){this.isStopped=!0},b.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.parent.o.onError(a),!0)},a}();pc.merge=function(a){return"number"!=typeof a?Wc(this,a):new Uc(this,a)};var Wc=vc.merge=function(){var a,b,c=[],d=arguments.length;if(arguments[0])if(Wb(arguments[0]))for(a=arguments[0],b=1;d>b;b++)c.push(arguments[b]);else for(a=$b,b=0;d>b;b++)c.push(arguments[b]);else for(a=$b,b=1;d>b;b++)c.push(arguments[b]);return Array.isArray(c[0])&&(c=c[0]),F(a,c).mergeAll()},Xc=function(a){function b(b){this.source=b,a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){var b=new Jb,c=new Qb;return b.add(c),c.setDisposable(this.source.subscribe(new Yc(a,b))),b},b}(wc),Yc=function(){function a(a,b){this.o=a,this.g=b,this.isStopped=!1,this.done=!1}function b(a,b,c){this.parent=a,this.g=b,this.sad=c,this.isStopped=!1}return a.prototype.onNext=function(a){if(!this.isStopped){var c=new Qb;this.g.add(c),Ka(a)&&(a=xc(a)),c.setDisposable(a.subscribe(new b(this,this.g,c)))}},a.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.o.onError(a))},a.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.done=!0,1===this.g.length&&this.o.onCompleted())},a.prototype.dispose=function(){this.isStopped=!0},a.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.o.onError(a),!0)},b.prototype.onNext=function(a){this.isStopped||this.parent.o.onNext(a)},b.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.parent.o.onError(a))},b.prototype.onCompleted=function(){if(!this.isStopped){var a=this.parent;this.isStopped=!0,a.g.remove(this.sad),a.done&&1===a.g.length&&a.o.onCompleted()}},b.prototype.dispose=function(){this.isStopped=!0},b.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.parent.o.onError(a),!0)},a}();pc.mergeAll=pc.mergeObservable=function(){return new Xc(this)};var Zc=Da.CompositeError=function(a){this.name="NotImplementedError",this.innerErrors=a,this.message="This contains multiple errors. Check the innerErrors",Error.call(this)};Zc.prototype=Error.prototype,vc.mergeDelayError=function(){var a;if(Array.isArray(arguments[0]))a=arguments[0];else{var b=arguments.length;a=new Array(b);for(var c=0;b>c;c++)a[c]=arguments[c]}var d=F(null,a);return new wd(function(a){function b(){0===g.length?a.onCompleted():a.onError(1===g.length?g[0]:new Zc(g))}var c=new Jb,e=new Qb,f=!1,g=[];return c.add(e),e.setDisposable(d.subscribe(function(d){var e=new Qb;c.add(e),Ka(d)&&(d=xc(d)),e.setDisposable(d.subscribe(function(b){a.onNext(b)},function(a){g.push(a),c.remove(e),f&&1===c.length&&b()},function(){c.remove(e),f&&1===c.length&&b()}))},function(a){g.push(a),f=!0,1===c.length&&b()},function(){f=!0,1===c.length&&b()})),c})},pc.onErrorResumeNext=function(a){if(!a)throw new Error("Second observable is required");return $c([this,a])};var $c=vc.onErrorResumeNext=function(){var a=[];if(Array.isArray(arguments[0]))a=arguments[0];else for(var b=0,c=arguments.length;c>b;b++)a.push(arguments[b]);return new wd(function(b){var c=0,d=new Rb,e=$b.scheduleRecursive(function(e){var f,g;c<a.length?(f=a[c++],Ka(f)&&(f=xc(f)),g=new Qb,d.setDisposable(g),g.setDisposable(f.subscribe(b.onNext.bind(b),e,e))):b.onCompleted()});return new Jb(d,e)})};pc.skipUntil=function(a){var b=this;return new wd(function(c){var d=!1,e=new Jb(b.subscribe(function(a){d&&c.onNext(a)},function(a){c.onError(a)},function(){d&&c.onCompleted()}));Ka(a)&&(a=xc(a));var f=new Qb;return e.add(f),f.setDisposable(a.subscribe(function(){d=!0,f.dispose()},function(a){c.onError(a)},function(){f.dispose()})),e},b)},pc["switch"]=pc.switchLatest=function(){var a=this;return new wd(function(b){var c=!1,d=new Rb,e=!1,f=0,g=a.subscribe(function(a){var g=new Qb,h=++f;c=!0,d.setDisposable(g),Ka(a)&&(a=xc(a)),g.setDisposable(a.subscribe(function(a){f===h&&b.onNext(a)},function(a){f===h&&b.onError(a)},function(){f===h&&(c=!1,e&&b.onCompleted())}))},function(a){b.onError(a)},function(){e=!0,!c&&b.onCompleted()});return new Jb(g,d)},a)},pc.takeUntil=function(a){var b=this;return new wd(function(c){return Ka(a)&&(a=xc(a)),new Jb(b.subscribe(c),a.subscribe(function(){c.onCompleted()},function(a){c.onError(a)},Ea))},b)},pc.withLatestFrom=function(){for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];var d=b.pop(),e=this;if("undefined"==typeof e)throw new Error("Source observable not found for withLatestFrom().");if("function"!=typeof d)throw new Error("withLatestFrom() expects a resultSelector function.");return Array.isArray(b[0])&&(b=b[0]),new wd(function(a){for(var c=function(){return!1},f=b.length,g=n(f,c),h=!1,i=new Array(f),j=new Array(f+1),k=0;f>k;k++)!function(c){var d=b[c],e=new Qb;Ka(d)&&(d=xc(d)),e.setDisposable(d.subscribe(function(a){i[c]=a,g[c]=!0,h=g.every(Fa)},a.onError.bind(a),function(){})),j[c]=e}(k);var l=new Qb;return l.setDisposable(e.subscribe(function(b){var c,e=[b].concat(i);if(h){try{c=d.apply(null,e)}catch(f){return void a.onError(f)}a.onNext(c)}},a.onError.bind(a),function(){a.onCompleted()})),j[f]=l,new Jb(j)},this)},pc.zip=function(){if(Array.isArray(arguments[0]))return J.apply(this,arguments);for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];var d=this,e=b.pop();return b.unshift(d),new wd(function(a){function c(b){var c,f;if(h.every(function(a){return a.length>0})){try{f=h.map(function(a){return a.shift()}),c=e.apply(d,f)}catch(g){return void a.onError(g)}a.onNext(c)}else i.filter(function(a,c){return c!==b}).every(Fa)&&a.onCompleted()}function f(b){i[b]=!0,i.every(function(a){return a})&&a.onCompleted()}for(var g=b.length,h=n(g,L),i=n(g,K),j=new Array(g),k=0;g>k;k++)!function(d){var e=b[d],g=new Qb;Ka(e)&&(e=xc(e)),g.setDisposable(e.subscribe(function(a){h[d].push(a),c(d)},function(b){a.onError(b)},function(){f(d)})),j[d]=g}(k);return new Jb(j)},d)},vc.zip=function(){for(var a=arguments.length,b=new Array(a),c=0;a>c;c++)b[c]=arguments[c];var d=b.shift();return d.zip.apply(d,b)},vc.zipArray=function(){var a;if(Array.isArray(arguments[0]))a=arguments[0];else{var b=arguments.length;a=new Array(b);for(var c=0;b>c;c++)a[c]=arguments[c]}return new wd(function(b){function c(a){if(f.every(function(a){return a.length>0})){var c=f.map(function(a){return a.shift()});b.onNext(c)}else if(g.filter(function(b,c){return c!==a}).every(Fa))return void b.onCompleted()}function d(a){return g[a]=!0,g.every(Fa)?void b.onCompleted():void 0}for(var e=a.length,f=n(e,function(){return[]}),g=n(e,function(){return!1}),h=new Array(e),i=0;e>i;i++)!function(e){h[e]=new Qb,h[e].setDisposable(a[e].subscribe(function(a){f[e].push(a),c(e)},function(a){b.onError(a)},function(){d(e)}))}(i);return new Jb(h)})},pc.asObservable=function(){var a=this;return new wd(function(b){return a.subscribe(b)},this)},pc.bufferWithCount=function(a,b){return"number"!=typeof b&&(b=a),this.windowWithCount(a,b).selectMany(function(a){return a.toArray()}).where(function(a){return a.length>0})},pc.dematerialize=function(){var a=this;return new wd(function(b){return a.subscribe(function(a){return a.accept(b)},function(a){b.onError(a)},function(){b.onCompleted()})},this)},pc.distinctUntilChanged=function(a,b){var c=this;return b||(b=Ha),new wd(function(d){var e,f=!1;return c.subscribe(function(c){var g=c;if(a)try{g=a(c)}catch(h){return void d.onError(h)}if(f)try{var i=b(e,g)}catch(h){return void d.onError(h)}f&&i||(f=!0,e=g,d.onNext(c))},function(a){d.onError(a)},function(){d.onCompleted()})},this)},pc["do"]=pc.tap=pc.doAction=function(a,b,c){var d=this;return new wd(function(e){var f=!a||Ma(a)?oc(a||Ea,b||Ea,c||Ea):a;return d.subscribe(function(a){try{f.onNext(a)}catch(b){e.onError(b)}e.onNext(a)},function(a){try{f.onError(a)}catch(b){e.onError(b)}e.onError(a)},function(){try{f.onCompleted()}catch(a){e.onError(a)}e.onCompleted()})},this)},pc.doOnNext=pc.tapOnNext=function(a,b){return this.tap("undefined"!=typeof b?function(c){a.call(b,c)}:a)},pc.doOnError=pc.tapOnError=function(a,b){return this.tap(Ea,"undefined"!=typeof b?function(c){a.call(b,c)}:a)},pc.doOnCompleted=pc.tapOnCompleted=function(a,b){return this.tap(Ea,null,"undefined"!=typeof b?function(){a.call(b)}:a)},pc["finally"]=pc.ensure=function(a){var b=this;return new wd(function(c){var d;try{d=b.subscribe(c)}catch(e){throw a(),e}return Mb(function(){try{d.dispose()}catch(b){throw b}finally{a()}})},this)},pc.finallyAction=function(a){return this.ensure(a)},pc.ignoreElements=function(){var a=this;return new wd(function(b){return a.subscribe(Ea,function(a){b.onError(a)},function(){b.onCompleted()})},a)},pc.materialize=function(){var a=this;return new wd(function(b){return a.subscribe(function(a){b.onNext(gc(a))},function(a){b.onNext(hc(a)),b.onCompleted()},function(){b.onNext(ic()),b.onCompleted()})},a)},pc.repeat=function(a){return lc(this,a).concat()},pc.retry=function(a){return lc(this,a).catchError()},pc.retryWhen=function(a){return lc(this).catchErrorWhen(a)},pc.scan=function(){var a,b,c=!1,d=this;return 2===arguments.length?(c=!0,a=arguments[0],b=arguments[1]):b=arguments[0],new wd(function(e){var f,g,h;return d.subscribe(function(d){!h&&(h=!0);try{f?g=b(g,d):(g=c?b(a,d):d,f=!0)}catch(i){return void e.onError(i)}e.onNext(g)},function(a){e.onError(a)},function(){!h&&c&&e.onNext(a),e.onCompleted()})},d)},pc.skipLast=function(a){if(0>a)throw new Ua;var b=this;return new wd(function(c){var d=[];return b.subscribe(function(b){d.push(b),d.length>a&&c.onNext(d.shift())},function(a){c.onError(a)},function(){c.onCompleted()})},b)},pc.startWith=function(){var a,b=0;arguments.length&&Wb(arguments[0])?(a=arguments[0],b=1):a=$b;for(var c=[],d=b,e=arguments.length;e>d;d++)c.push(arguments[d]);return mc([Hc(c,a),this]).concat()},pc.takeLast=function(a){if(0>a)throw new Ua;var b=this;return new wd(function(c){var d=[];return b.subscribe(function(b){d.push(b),d.length>a&&d.shift()},function(a){c.onError(a)},function(){for(;d.length>0;)c.onNext(d.shift());c.onCompleted()})},b)},pc.takeLastBuffer=function(a){var b=this;return new wd(function(c){var d=[];return b.subscribe(function(b){d.push(b),d.length>a&&d.shift()},function(a){c.onError(a)},function(){c.onNext(d),c.onCompleted()})},b)},pc.windowWithCount=function(a,b){var c=this;if(+a||(a=0),Math.abs(a)===1/0&&(a=0),0>=a)throw new Ua;if(null==b&&(b=a),+b||(b=0),Math.abs(b)===1/0&&(b=0),0>=b)throw new Ua;return new wd(function(d){function e(){var a=new zd;i.push(a),d.onNext(Fb(a,g))}var f=new Qb,g=new Sb(f),h=0,i=[];return e(),f.setDisposable(c.subscribe(function(c){for(var d=0,f=i.length;f>d;d++)i[d].onNext(c);var g=h-a+1;g>=0&&g%b===0&&i.shift().onCompleted(),++h%b===0&&e()},function(a){for(;i.length>0;)i.shift().onError(a);d.onError(a)},function(){for(;i.length>0;)i.shift().onCompleted();d.onCompleted()})),g},c)},pc.selectConcat=pc.concatMap=function(a,b,c){return Ma(a)&&Ma(b)?this.concatMap(function(c,d){var e=a(c,d);return Ka(e)&&(e=xc(e)),(ab(e)||_a(e))&&(e=Fc(e)),e.map(function(a,e){return b(c,a,d,e)})}):Ma(a)?M(this,a,c):M(this,function(){return a})},pc.concatMapObserver=pc.selectConcatObserver=function(a,b,c,d){var e=this,f=cb(a,d,2),g=cb(b,d,1),h=cb(c,d,0);return new wd(function(a){var b=0;return e.subscribe(function(c){var d;try{d=f(c,b++)}catch(e){return void a.onError(e)}Ka(d)&&(d=xc(d)),a.onNext(d)},function(b){var c;try{c=g(b)}catch(d){return void a.onError(d)}Ka(c)&&(c=xc(c)),a.onNext(c),a.onCompleted()},function(){var b;try{b=h()}catch(c){return void a.onError(c)}Ka(b)&&(b=xc(b)),a.onNext(b),a.onCompleted()})},this).concatAll()},pc.defaultIfEmpty=function(b){var c=this;return b===a&&(b=null),new wd(function(a){var d=!1;return c.subscribe(function(b){d=!0,a.onNext(b)},function(b){a.onError(b)},function(){!d&&a.onNext(b),a.onCompleted()})},c)},O.prototype.push=function(a){var b=-1===N(this.set,a,this.comparer);return b&&this.set.push(a),b},pc.distinct=function(a,b){var c=this;return b||(b=Ha),new wd(function(d){var e=new O(b);return c.subscribe(function(b){var c=b;if(a)try{c=a(b)}catch(f){return void d.onError(f)}e.push(c)&&d.onNext(b)},function(a){d.onError(a)},function(){d.onCompleted()})},this)},pc.groupBy=function(a,b,c){return this.groupByUntil(a,b,Jc,c)},pc.groupByUntil=function(a,b,c,d){var e=this;return b||(b=Fa),d||(d=Ha),new wd(function(f){function g(a){return function(b){b.onError(a)}}var h=new qd(0,d),i=new Jb,j=new Sb(i);return i.add(e.subscribe(function(d){var e;try{e=a(d)}catch(k){return h.getValues().forEach(g(k)),void f.onError(k)}var l=!1,m=h.tryGetValue(e);if(m||(m=new zd,h.set(e,m),l=!0),l){var n=new yd(e,m,j),o=new yd(e,m);try{duration=c(o)}catch(k){return h.getValues().forEach(g(k)),void f.onError(k)}f.onNext(n);var p=new Qb;i.add(p);var q=function(){h.remove(e)&&m.onCompleted(),i.remove(p)};p.setDisposable(duration.take(1).subscribe(Ea,function(a){h.getValues().forEach(g(a)),f.onError(a)},q))}var r;try{r=b(d)}catch(k){return h.getValues().forEach(g(k)),void f.onError(k)}m.onNext(r)},function(a){h.getValues().forEach(g(a)),f.onError(a)},function(){h.getValues().forEach(function(a){a.onCompleted()}),f.onCompleted()})),j},e)};var _c=function(a){function b(b,c,d){this.source=b,this.selector=cb(c,d,3),a.call(this)}return Db(b,a),b.prototype.internalMap=function(a,c){var d=this;return new b(this.source,function(b,c,e){return a.call(this,d.selector(b,c,e),c,e)},c)},b.prototype.subscribeCore=function(a){return this.source.subscribe(new P(a,this.selector,this))},b}(wc);P.prototype.onNext=function(a){if(!this.isStopped){var b=p(this.selector).call(this,a,this.i++,this.source);return b===Gb?this.observer.onError(b.e):void this.observer.onNext(b)}},P.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.observer.onError(a))},P.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.observer.onCompleted())},P.prototype.dispose=function(){this.isStopped=!0},P.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.observer.onError(a),!0)},pc.map=pc.select=function(a,b){var c="function"==typeof a?a:function(){return a};return this instanceof _c?this.internalMap(c,b):new _c(this,c,b)},pc.pluck=function(){var b=arguments,c=arguments.length;if(0===c)throw new Error("List of properties cannot be empty.");return this.map(function(d){for(var e=d,f=0;c>f;f++){var g=e[b[f]];if("undefined"==typeof g)return a;e=g}return e})},pc.selectMany=pc.flatMap=function(a,b,c){return Ma(a)&&Ma(b)?this.flatMap(function(c,d){var e=a(c,d);return Ka(e)&&(e=xc(e)),(ab(e)||_a(e))&&(e=Fc(e)),e.map(function(a,e){return b(c,a,d,e)})},c):Ma(a)?Q(this,a,c):Q(this,function(){return a})},pc.flatMapObserver=pc.selectManyObserver=function(a,b,c,d){var e=this;return new wd(function(f){var g=0;return e.subscribe(function(b){var c;try{c=a.call(d,b,g++)}catch(e){return void f.onError(e)}Ka(c)&&(c=xc(c)),f.onNext(c)},function(a){var c;try{c=b.call(d,a)}catch(e){return void f.onError(e)}Ka(c)&&(c=xc(c)),f.onNext(c),f.onCompleted()},function(){var a;try{a=c.call(d)}catch(b){return void f.onError(b)}Ka(a)&&(a=xc(a)),f.onNext(a),f.onCompleted()})},e).mergeAll()},pc.selectSwitch=pc.flatMapLatest=pc.switchMap=function(a,b){return this.select(a,b).switchLatest()},pc.skip=function(a){if(0>a)throw new Ua;var b=this;return new wd(function(c){var d=a;return b.subscribe(function(a){0>=d?c.onNext(a):d--},function(a){c.onError(a)},function(){c.onCompleted()})},b)},pc.skipWhile=function(a,b){var c=this,d=cb(a,b,3);return new wd(function(a){var b=0,e=!1;return c.subscribe(function(f){if(!e)try{e=!d(f,b++,c)}catch(g){return void a.onError(g)}e&&a.onNext(f)},function(b){a.onError(b)},function(){a.onCompleted()})},c)},pc.take=function(a,b){if(0>a)throw new Ua;if(0===a)return Bc(b);var c=this;return new wd(function(b){var d=a;return c.subscribe(function(a){d-->0&&(b.onNext(a),0===d&&b.onCompleted())},function(a){b.onError(a)},function(){b.onCompleted()})},c)},pc.takeWhile=function(a,b){var c=this,d=cb(a,b,3);return new wd(function(a){var b=0,e=!0;return c.subscribe(function(f){if(e){try{e=d(f,b++,c)}catch(g){return void a.onError(g)}e?a.onNext(f):a.onCompleted()}},function(b){a.onError(b)},function(){a.onCompleted()})},c)};var ad=function(a){function b(b,c,d){this.source=b,this.predicate=cb(c,d,3),a.call(this)}return Db(b,a),b.prototype.subscribeCore=function(a){return this.source.subscribe(new R(a,this.predicate,this))},b.prototype.internalFilter=function(a,c){var d=this;return new b(this.source,function(b,c,e){return d.predicate(b,c,e)&&a.call(this,b,c,e)},c)},b}(wc);R.prototype.onNext=function(a){if(!this.isStopped){var b=p(this.predicate).call(this,a,this.i++,this.source);return b===Gb?this.observer.onError(b.e):void(b&&this.observer.onNext(a))}},R.prototype.onError=function(a){this.isStopped||(this.isStopped=!0,this.observer.onError(a))},R.prototype.onCompleted=function(){this.isStopped||(this.isStopped=!0,this.observer.onCompleted())},R.prototype.dispose=function(){this.isStopped=!0},R.prototype.fail=function(a){return this.isStopped?!1:(this.isStopped=!0,this.observer.onError(a),!0)},pc.filter=pc.where=function(a,b){return this instanceof ad?this.internalFilter(a,b):new ad(this,a,b)},pc.aggregate=function(){var a,b,c=!1,d=this;return 2===arguments.length?(c=!0,b=arguments[0],a=arguments[1]):a=arguments[0],new wd(function(e){var f,g,h;return d.subscribe(function(d){
!h&&(h=!0);try{f?g=a(g,d):(g=c?a(b,d):d,f=!0)}catch(i){return e.onError(i)}},function(a){e.onError(a)},function(){h&&e.onNext(g),!h&&c&&e.onNext(b),!h&&!c&&e.onError(new Sa),e.onCompleted()})},d)},pc.reduce=function(a){var b,c=!1,d=this;return 2===arguments.length&&(c=!0,b=arguments[1]),new wd(function(e){var f,g,h;return d.subscribe(function(d){!h&&(h=!0);try{f?g=a(g,d):(g=c?a(b,d):d,f=!0)}catch(i){return e.onError(i)}},function(a){e.onError(a)},function(){h&&e.onNext(g),!h&&c&&e.onNext(b),!h&&!c&&e.onError(new Sa),e.onCompleted()})},d)},pc.some=function(a,b){var c=this;return a?c.filter(a,b).some():new wd(function(a){return c.subscribe(function(){a.onNext(!0),a.onCompleted()},function(b){a.onError(b)},function(){a.onNext(!1),a.onCompleted()})},c)},pc.any=function(){return this.some.apply(this,arguments)},pc.isEmpty=function(){return this.any().map(La)},pc.every=function(a,b){return this.filter(function(b){return!a(b)},b).some().map(La)},pc.all=function(){return this.every.apply(this,arguments)},pc.includes=function(a,b){function c(a,b){return 0===a&&0===b||a===b||isNaN(a)&&isNaN(b)}var d=this;return new wd(function(e){var f=0,g=+b||0;return Math.abs(g)===1/0&&(g=0),0>g?(e.onNext(!1),e.onCompleted(),Nb):d.subscribe(function(b){f++>=g&&c(b,a)&&(e.onNext(!0),e.onCompleted())},function(a){e.onError(a)},function(){e.onNext(!1),e.onCompleted()})},this)},pc.contains=function(a,b){pc.includes(a,b)},pc.count=function(a,b){return a?this.filter(a,b).count():this.reduce(function(a){return a+1},0)},pc.indexOf=function(a,b){var c=this;return new wd(function(d){var e=0,f=+b||0;return Math.abs(f)===1/0&&(f=0),0>f?(d.onNext(-1),d.onCompleted(),Nb):c.subscribe(function(b){e>=f&&b===a&&(d.onNext(e),d.onCompleted()),e++},function(a){d.onError(a)},function(){d.onNext(-1),d.onCompleted()})},c)},pc.sum=function(a,b){return a&&Ma(a)?this.map(a,b).sum():this.reduce(function(a,b){return a+b},0)},pc.minBy=function(a,b){return b||(b=Ia),S(this,a,function(a,c){return-1*b(a,c)})},pc.min=function(a){return this.minBy(Fa,a).map(function(a){return T(a)})},pc.maxBy=function(a,b){return b||(b=Ia),S(this,a,b)},pc.max=function(a){return this.maxBy(Fa,a).map(function(a){return T(a)})},pc.average=function(a,b){return a&&Ma(a)?this.map(a,b).average():this.reduce(function(a,b){return{sum:a.sum+b,count:a.count+1}},{sum:0,count:0}).map(function(a){if(0===a.count)throw new Sa;return a.sum/a.count})},pc.sequenceEqual=function(a,b){var c=this;return b||(b=Ha),new wd(function(d){var e=!1,f=!1,g=[],h=[],i=c.subscribe(function(a){var c,e;if(h.length>0){e=h.shift();try{c=b(e,a)}catch(i){return void d.onError(i)}c||(d.onNext(!1),d.onCompleted())}else f?(d.onNext(!1),d.onCompleted()):g.push(a)},function(a){d.onError(a)},function(){e=!0,0===g.length&&(h.length>0?(d.onNext(!1),d.onCompleted()):f&&(d.onNext(!0),d.onCompleted()))});(ab(a)||_a(a))&&(a=Fc(a)),Ka(a)&&(a=xc(a));var j=a.subscribe(function(a){var c;if(g.length>0){var f=g.shift();try{c=b(f,a)}catch(i){return void d.onError(i)}c||(d.onNext(!1),d.onCompleted())}else e?(d.onNext(!1),d.onCompleted()):h.push(a)},function(a){d.onError(a)},function(){f=!0,0===h.length&&(g.length>0?(d.onNext(!1),d.onCompleted()):e&&(d.onNext(!0),d.onCompleted()))});return new Jb(i,j)},c)},pc.elementAt=function(a){return U(this,a,!1)},pc.elementAtOrDefault=function(a,b){return U(this,a,!0,b)},pc.single=function(a,b){return a&&Ma(a)?this.where(a,b).single():V(this,!1)},pc.singleOrDefault=function(a,b,c){return a&&Ma(a)?this.filter(a,c).singleOrDefault(null,b):V(this,!0,b)},pc.first=function(a,b){return a?this.where(a,b).first():W(this,!1)},pc.firstOrDefault=function(a,b){return a?this.where(a).firstOrDefault(null,b):W(this,!0,b)},pc.last=function(a,b){return a?this.where(a,b).last():X(this,!1)},pc.lastOrDefault=function(a,b,c){return a?this.where(a,c).lastOrDefault(null,b):X(this,!0,b)},pc.find=function(a,b){return Y(this,a,b,!1)},pc.findIndex=function(a,b){return Y(this,a,b,!0)},pc.toSet=function(){if("undefined"==typeof ya.Set)throw new TypeError;var a=this;return new wd(function(b){var c=new ya.Set;return a.subscribe(function(a){c.add(a)},function(a){b.onError(a)},function(){b.onNext(c),b.onCompleted()})},a)},pc.toMap=function(a,b){if("undefined"==typeof ya.Map)throw new TypeError;var c=this;return new wd(function(d){var e=new ya.Map;return c.subscribe(function(c){var f;try{f=a(c)}catch(g){return void d.onError(g)}var h=c;if(b)try{h=b(c)}catch(g){return void d.onError(g)}e.set(f,h)},function(a){d.onError(a)},function(){d.onNext(e),d.onCompleted()})},c)};var bd="function",cd="throw",yb=Da.internals.isObject,dd=Da.spawn=function(a){var b=ca(a);return function(c){function d(a,b){dc.schedule(c.bind(f,a,b))}function e(a,b){var c;if(arguments.length>2)for(var b=[],h=1,i=arguments.length;i>h;h++)b.push(arguments[h]);if(a)try{c=g[cd](a)}catch(j){return d(j)}if(!a)try{c=g.next(b)}catch(j){return d(j)}if(c.done)return d(null,c.value);if(c.value=Z(c.value,f),typeof c.value!==bd)e(new TypeError("Rx.spawn only supports a function, Promise, Observable, Object or Array."));else{var k=!1;try{c.value.call(f,function(){k||(k=!0,e.apply(f,arguments))})}catch(j){dc.schedule(function(){k||(k=!0,e.call(f,j))})}}}var f=this,g=a;if(b){for(var h=[],i=0,j=arguments.length;j>i;i++)h.push(arguments[i]);var j=h.length,k=j&&typeof h[j-1]===bd;c=k?h.pop():ea,g=a.apply(this,h)}else c=c||ea;e()}};vc.start=function(a,b,c){return ed(a,b,c)()};var ed=vc.toAsync=function(a,b,c){return Wb(c)||(c=dc),function(){var d=arguments,e=new Ad;return c.schedule(function(){var c;try{c=a.apply(b,d)}catch(f){return void e.onError(f)}e.onNext(c),e.onCompleted()}),e.asObservable()}};vc.fromCallback=function(a,b,c){return function(){for(var d=arguments.length,e=new Array(d),f=0;d>f;f++)e[f]=arguments[f];return new wd(function(d){function f(){for(var a=arguments.length,e=new Array(a),f=0;a>f;f++)e[f]=arguments[f];if(c){try{e=c.apply(b,e)}catch(g){return d.onError(g)}d.onNext(e)}else e.length<=1?d.onNext.apply(d,e):d.onNext(e);d.onCompleted()}e.push(f),a.apply(b,e)}).publishLast().refCount()}},vc.fromNodeCallback=function(a,b,c){return function(){for(var d=arguments.length,e=new Array(d),f=0;d>f;f++)e[f]=arguments[f];return new wd(function(d){function f(a){if(a)return void d.onError(a);for(var e=arguments.length,f=[],g=1;e>g;g++)f[g-1]=arguments[g];if(c){try{f=c.apply(b,f)}catch(h){return d.onError(h)}d.onNext(f)}else f.length<=1?d.onNext.apply(d,f):d.onNext(f);d.onCompleted()}e.push(f),a.apply(b,e)}).publishLast().refCount()}},Da.config.useNativeEvents=!1,vc.fromEvent=function(a,b,c){return a.addListener?fd(function(c){a.addListener(b,c)},function(c){a.removeListener(b,c)},c):Da.config.useNativeEvents||"function"!=typeof a.on||"function"!=typeof a.off?new wd(function(d){return ga(a,b,function(a){var b=a;if(c)try{b=c(arguments)}catch(e){return d.onError(e)}d.onNext(b)})}).publish().refCount():fd(function(c){a.on(b,c)},function(c){a.off(b,c)},c)};var fd=vc.fromEventPattern=function(a,b,c){return new wd(function(d){function e(a){var b=a;if(c)try{b=c(arguments)}catch(e){return d.onError(e)}d.onNext(b)}var f=a(e);return Mb(function(){b&&b(e,f)})}).publish().refCount()};vc.startAsync=function(a){var b;try{b=a()}catch(c){return Qc(c)}return xc(b)};var gd=function(a){function b(a){var b=this.source.publish(),c=b.subscribe(a),d=Nb,e=this.pauser.distinctUntilChanged().subscribe(function(a){a?d=b.connect():(d.dispose(),d=Nb)});return new Jb(c,d,e)}function c(c,d){this.source=c,this.controller=new zd,this.pauser=d&&d.subscribe?this.controller.merge(d):this.controller,a.call(this,b,c)}return Db(c,a),c.prototype.pause=function(){this.controller.onNext(!1)},c.prototype.resume=function(){this.controller.onNext(!0)},c}(vc);pc.pausable=function(a){return new gd(this,a)};var hd=function(b){function c(b){var c,d=[],e=ha(this.source,this.pauser.distinctUntilChanged().startWith(!1),function(a,b){return{data:a,shouldFire:b}}).subscribe(function(e){if(c!==a&&e.shouldFire!=c){if(c=e.shouldFire,e.shouldFire)for(;d.length>0;)b.onNext(d.shift())}else c=e.shouldFire,e.shouldFire?b.onNext(e.data):d.push(e.data)},function(a){for(;d.length>0;)b.onNext(d.shift());b.onError(a)},function(){for(;d.length>0;)b.onNext(d.shift());b.onCompleted()});return e}function d(a,d){this.source=a,this.controller=new zd,this.pauser=d&&d.subscribe?this.controller.merge(d):this.controller,b.call(this,c,a)}return Db(d,b),d.prototype.pause=function(){this.controller.onNext(!1)},d.prototype.resume=function(){this.controller.onNext(!0)},d}(vc);pc.pausableBuffered=function(a){return new hd(this,a)};var id=function(a){function b(a){return this.source.subscribe(a)}function c(c,d,e){a.call(this,b,c),this.subject=new jd(d,e),this.source=c.multicast(this.subject).refCount()}return Db(c,a),c.prototype.request=function(a){return this.subject.request(null==a?-1:a)},c}(vc),jd=function(a){function b(a){return this.subject.subscribe(a)}function c(c,d){null==c&&(c=!0),a.call(this,b),this.subject=new zd,this.enableQueue=c,this.queue=c?[]:null,this.requestedCount=0,this.requestedDisposable=Nb,this.error=null,this.hasFailed=!1,this.hasCompleted=!1,this.scheduler=d||_b}return Db(c,a),Eb(c.prototype,nc,{onCompleted:function(){this.hasCompleted=!0,this.enableQueue&&0!==this.queue.length?this.queue.push(fc.createOnCompleted()):this.subject.onCompleted()},onError:function(a){this.hasFailed=!0,this.error=a,this.enableQueue&&0!==this.queue.length?this.queue.push(fc.createOnError(a)):this.subject.onError(a)},onNext:function(a){var b=!1;0===this.requestedCount?this.enableQueue&&this.queue.push(fc.createOnNext(a)):(-1!==this.requestedCount&&0===this.requestedCount--&&this.disposeCurrentRequest(),b=!0),b&&this.subject.onNext(a)},_processRequest:function(a){if(this.enableQueue){for(;this.queue.length>=a&&a>0||this.queue.length>0&&"N"!==this.queue[0].kind;){var b=this.queue.shift();b.accept(this.subject),"N"===b.kind?a--:(this.disposeCurrentRequest(),this.queue=[])}return{numberOfItems:a,returnValue:0!==this.queue.length}}return{numberOfItems:a,returnValue:!1}},request:function(a){this.disposeCurrentRequest();var b=this;return this.requestedDisposable=this.scheduler.scheduleWithState(a,function(a,c){var d=b._processRequest(c),e=d.numberOfItems;d.returnValue||(b.requestedCount=e,b.requestedDisposable=Mb(function(){b.requestedCount=0}))}),this.requestedDisposable},disposeCurrentRequest:function(){this.requestedDisposable.dispose(),this.requestedDisposable=Nb}}),c}(vc);pc.controlled=function(a,b){return a&&Wb(a)&&(b=a,a=!0),null==a&&(a=!0),new id(this,a,b)};var kd=function(a){function b(a){this.subscription=this.source.subscribe(new d(a,this,this.subscription));var b=this;return dc.schedule(function(){b.source.request(1)}),this.subscription}function c(c){a.call(this,b,c),this.source=c}Db(c,a);var d=function(a){function b(b,c,d){a.call(this),this.observer=b,this.observable=c,this.cancel=d}Db(b,a);var c=b.prototype;return c.completed=function(){this.observer.onCompleted(),this.dispose()},c.error=function(a){this.observer.onError(a),this.dispose()},c.next=function(a){this.observer.onNext(a);var b=this;dc.schedule(function(){b.observable.source.request(1)})},c.dispose=function(){this.observer=null,this.cancel&&(this.cancel.dispose(),this.cancel=null),a.prototype.dispose.call(this)},b}(qc);return c}(vc);id.prototype.stopAndWait=function(){return new kd(this)};var ld=function(a){function b(a){this.subscription=this.source.subscribe(new d(a,this,this.subscription));var b=this;return dc.schedule(function(){b.source.request(b.windowSize)}),this.subscription}function c(c,d){a.call(this,b,c),this.source=c,this.windowSize=d}Db(c,a);var d=function(a){function b(a,b,c){this.observer=a,this.observable=b,this.cancel=c,this.received=0}Db(b,a);var c=b.prototype;return c.completed=function(){this.observer.onCompleted(),this.dispose()},c.error=function(a){this.observer.onError(a),this.dispose()},c.next=function(a){if(this.observer.onNext(a),this.received=++this.received%this.observable.windowSize,0===this.received){var b=this;dc.schedule(function(){b.observable.source.request(b.observable.windowSize)})}},c.dispose=function(){this.observer=null,this.cancel&&(this.cancel.dispose(),this.cancel=null),a.prototype.dispose.call(this)},b}(qc);return c}(vc);id.prototype.windowed=function(a){return new ld(this,a)},pc.pipe=function(a){function b(){c.resume()}var c=this.pausableBuffered();return a.addListener("drain",b),c.subscribe(function(b){!a.write(String(b))&&c.pause()},function(b){a.emit("error",b)},function(){!a._isStdio&&a.end(),a.removeListener("drain",b)}),c.resume(),a},pc.multicast=function(a,b){var c=this;return"function"==typeof a?new wd(function(d){var e=c.multicast(a());return new Jb(b(e).subscribe(d),e.connect())},c):new pd(c,a)},pc.publish=function(a){return a&&Ma(a)?this.multicast(function(){return new zd},a):this.multicast(new zd)},pc.share=function(){return this.publish().refCount()},pc.publishLast=function(a){return a&&Ma(a)?this.multicast(function(){return new Ad},a):this.multicast(new Ad)},pc.publishValue=function(a,b){return 2===arguments.length?this.multicast(function(){return new nd(b)},a):this.multicast(new nd(a))},pc.shareValue=function(a){return this.publishValue(a).refCount()},pc.replay=function(a,b,c,d){return a&&Ma(a)?this.multicast(function(){return new od(b,c,d)},a):this.multicast(new od(b,c,d))},pc.shareReplay=function(a,b,c){return this.replay(null,a,b,c).refCount()};var md=function(a,b){this.subject=a,this.observer=b};md.prototype.dispose=function(){if(!this.subject.isDisposed&&null!==this.observer){var a=this.subject.observers.indexOf(this.observer);this.subject.observers.splice(a,1),this.observer=null}};var nd=Da.BehaviorSubject=function(a){function c(a){return Pb(this),this.isStopped?(this.hasError?a.onError(this.error):a.onCompleted(),Nb):(this.observers.push(a),a.onNext(this.value),new md(this,a))}function d(b){a.call(this,c),this.value=b,this.observers=[],this.isDisposed=!1,this.isStopped=!1,this.hasError=!1}return Db(d,a),Eb(d.prototype,nc,{getValue:function(){if(Pb(this),this.hasError)throw this.error;return this.value},hasObservers:function(){return this.observers.length>0},onCompleted:function(){if(Pb(this),!this.isStopped){this.isStopped=!0;for(var a=0,c=b(this.observers),d=c.length;d>a;a++)c[a].onCompleted();this.observers.length=0}},onError:function(a){if(Pb(this),!this.isStopped){this.isStopped=!0,this.hasError=!0,this.error=a;for(var c=0,d=b(this.observers),e=d.length;e>c;c++)d[c].onError(a);this.observers.length=0}},onNext:function(a){if(Pb(this),!this.isStopped){this.value=a;for(var c=0,d=b(this.observers),e=d.length;e>c;c++)d[c].onNext(a)}},dispose:function(){this.isDisposed=!0,this.observers=null,this.value=null,this.exception=null}}),d}(vc),od=Da.ReplaySubject=function(a){function c(a,b){return Mb(function(){b.dispose(),!a.isDisposed&&a.observers.splice(a.observers.indexOf(b),1)})}function d(a){var b=new tc(this.scheduler,a),d=c(this,b);Pb(this),this._trim(this.scheduler.now()),this.observers.push(b);for(var e=0,f=this.q.length;f>e;e++)b.onNext(this.q[e].value);return this.hasError?b.onError(this.error):this.isStopped&&b.onCompleted(),b.ensureActive(),d}function e(b,c,e){this.bufferSize=null==b?f:b,this.windowSize=null==c?f:c,this.scheduler=e||_b,this.q=[],this.observers=[],this.isStopped=!1,this.isDisposed=!1,this.hasError=!1,this.error=null,a.call(this,d)}var f=Math.pow(2,53)-1;return Db(e,a),Eb(e.prototype,nc.prototype,{hasObservers:function(){return this.observers.length>0},_trim:function(a){for(;this.q.length>this.bufferSize;)this.q.shift();for(;this.q.length>0&&a-this.q[0].interval>this.windowSize;)this.q.shift()},onNext:function(a){if(Pb(this),!this.isStopped){var c=this.scheduler.now();this.q.push({interval:c,value:a}),this._trim(c);for(var d=0,e=b(this.observers),f=e.length;f>d;d++){var g=e[d];g.onNext(a),g.ensureActive()}}},onError:function(a){if(Pb(this),!this.isStopped){this.isStopped=!0,this.error=a,this.hasError=!0;var c=this.scheduler.now();this._trim(c);for(var d=0,e=b(this.observers),f=e.length;f>d;d++){var g=e[d];g.onError(a),g.ensureActive()}this.observers.length=0}},onCompleted:function(){if(Pb(this),!this.isStopped){this.isStopped=!0;var a=this.scheduler.now();this._trim(a);for(var c=0,d=b(this.observers),e=d.length;e>c;c++){var f=d[c];f.onCompleted(),f.ensureActive()}this.observers.length=0}},dispose:function(){this.isDisposed=!0,this.observers=null}}),e}(vc),pd=Da.ConnectableObservable=function(a){function b(b,c){var d,e=!1,f=b.asObservable();this.connect=function(){return e||(e=!0,d=new Jb(f.subscribe(c),Mb(function(){e=!1}))),d},a.call(this,function(a){return c.subscribe(a)})}return Db(b,a),b.prototype.refCount=function(){var a,b=0,c=this;return new wd(function(d){var e=1===++b,f=c.subscribe(d);return e&&(a=c.connect()),function(){f.dispose(),0===--b&&a.dispose()}})},b}(vc),qd=function(){function b(a){if(0===(1&a))return 2===a;for(var b=Math.sqrt(a),c=3;b>=c;){if(a%c===0)return!1;c+=2}return!0}function c(a){var c,d,e;for(c=0;c<h.length;++c)if(d=h[c],d>=a)return d;for(e=1|a;e<h[h.length-1];){if(b(e))return e;e+=2}return a}function d(a){var b=757602046;if(!a.length)return b;for(var c=0,d=a.length;d>c;c++){var e=a.charCodeAt(c);b=(b<<5)-b+e,b&=b}return b}function e(a){var b=668265261;return a=61^a^a>>>16,a+=a<<3,a^=a>>>4,a*=b,a^=a>>>15}function f(){return{key:null,value:null,next:0,hashCode:0}}function g(a,b){if(0>a)throw new Ua;a>0&&this._initialize(a),this.comparer=b||Ha,this.freeCount=0,this.size=0,this.freeList=-1}var h=[1,3,7,13,31,61,127,251,509,1021,2039,4093,8191,16381,32749,65521,131071,262139,524287,1048573,2097143,4194301,8388593,16777213,33554393,67108859,134217689,268435399,536870909,1073741789,2147483647],i="no such key",j="duplicate key",k=function(){var a=0;return function(b){if(null==b)throw new Error(i);if("string"==typeof b)return d(b);if("number"==typeof b)return e(b);if("boolean"==typeof b)return b===!0?1:0;if(b instanceof Date)return e(b.valueOf());if(b instanceof RegExp)return d(b.toString());if("function"==typeof b.valueOf){var c=b.valueOf();if("number"==typeof c)return e(c);if("string"==typeof c)return d(c)}if(b.hashCode)return b.hashCode();var f=17*a++;return b.hashCode=function(){return f},f}}(),l=g.prototype;return l._initialize=function(a){var b,d=c(a);for(this.buckets=new Array(d),this.entries=new Array(d),b=0;d>b;b++)this.buckets[b]=-1,this.entries[b]=f();this.freeList=-1},l.add=function(a,b){this._insert(a,b,!0)},l._insert=function(a,b,c){this.buckets||this._initialize(0);for(var d,e=2147483647&k(a),f=e%this.buckets.length,g=this.buckets[f];g>=0;g=this.entries[g].next)if(this.entries[g].hashCode===e&&this.comparer(this.entries[g].key,a)){if(c)throw new Error(j);return void(this.entries[g].value=b)}this.freeCount>0?(d=this.freeList,this.freeList=this.entries[d].next,--this.freeCount):(this.size===this.entries.length&&(this._resize(),f=e%this.buckets.length),d=this.size,++this.size),this.entries[d].hashCode=e,this.entries[d].next=this.buckets[f],this.entries[d].key=a,this.entries[d].value=b,this.buckets[f]=d},l._resize=function(){var a=c(2*this.size),b=new Array(a);for(e=0;e<b.length;++e)b[e]=-1;var d=new Array(a);for(e=0;e<this.size;++e)d[e]=this.entries[e];for(var e=this.size;a>e;++e)d[e]=f();for(var g=0;g<this.size;++g){var h=d[g].hashCode%a;d[g].next=b[h],b[h]=g}this.buckets=b,this.entries=d},l.remove=function(a){if(this.buckets)for(var b=2147483647&k(a),c=b%this.buckets.length,d=-1,e=this.buckets[c];e>=0;e=this.entries[e].next){if(this.entries[e].hashCode===b&&this.comparer(this.entries[e].key,a))return 0>d?this.buckets[c]=this.entries[e].next:this.entries[d].next=this.entries[e].next,this.entries[e].hashCode=-1,this.entries[e].next=this.freeList,this.entries[e].key=null,this.entries[e].value=null,this.freeList=e,++this.freeCount,!0;d=e}return!1},l.clear=function(){var a,b;if(!(this.size<=0)){for(a=0,b=this.buckets.length;b>a;++a)this.buckets[a]=-1;for(a=0;a<this.size;++a)this.entries[a]=f();this.freeList=-1,this.size=0}},l._findEntry=function(a){if(this.buckets)for(var b=2147483647&k(a),c=this.buckets[b%this.buckets.length];c>=0;c=this.entries[c].next)if(this.entries[c].hashCode===b&&this.comparer(this.entries[c].key,a))return c;return-1},l.count=function(){return this.size-this.freeCount},l.tryGetValue=function(b){var c=this._findEntry(b);return c>=0?this.entries[c].value:a},l.getValues=function(){var a=0,b=[];if(this.entries)for(var c=0;c<this.size;c++)this.entries[c].hashCode>=0&&(b[a++]=this.entries[c].value);return b},l.get=function(a){var b=this._findEntry(a);if(b>=0)return this.entries[b].value;throw new Error(i)},l.set=function(a,b){this._insert(a,b,!1)},l.containskey=function(a){return this._findEntry(a)>=0},g}();pc.join=function(a,b,c,d){var e=this;return new wd(function(f){var g=new Jb,h=!1,i=!1,j=0,k=0,l=new qd,m=new qd;return g.add(e.subscribe(function(a){var c=j++,e=new Qb;l.add(c,a),g.add(e);var i,k=function(){l.remove(c)&&0===l.count()&&h&&f.onCompleted(),g.remove(e)};try{i=b(a)}catch(n){return void f.onError(n)}e.setDisposable(i.take(1).subscribe(Ea,f.onError.bind(f),k)),m.getValues().forEach(function(b){var c;try{c=d(a,b)}catch(e){return void f.onError(e)}f.onNext(c)})},f.onError.bind(f),function(){h=!0,(i||0===l.count())&&f.onCompleted()})),g.add(a.subscribe(function(a){var b=k++,e=new Qb;m.add(b,a),g.add(e);var h,j=function(){m.remove(b)&&0===m.count()&&i&&f.onCompleted(),g.remove(e)};try{h=c(a)}catch(n){return void f.onError(n)}e.setDisposable(h.take(1).subscribe(Ea,f.onError.bind(f),j)),l.getValues().forEach(function(b){var c;try{c=d(b,a)}catch(e){return void f.onError(e)}f.onNext(c)})},f.onError.bind(f),function(){i=!0,(h||0===m.count())&&f.onCompleted()})),g},e)},pc.groupJoin=function(a,b,c,d){var e=this;return new wd(function(f){function g(a){return function(b){b.onError(a)}}var h=new Jb,i=new Sb(h),j=new qd,k=new qd,l=0,m=0;return h.add(e.subscribe(function(a){var c=new zd,e=l++;j.add(e,c);var m;try{m=d(a,Fb(c,i))}catch(n){return j.getValues().forEach(g(n)),void f.onError(n)}f.onNext(m),k.getValues().forEach(function(a){c.onNext(a)});var o=new Qb;h.add(o);var p,q=function(){j.remove(e)&&c.onCompleted(),h.remove(o)};try{p=b(a)}catch(n){return j.getValues().forEach(g(n)),void f.onError(n)}o.setDisposable(p.take(1).subscribe(Ea,function(a){j.getValues().forEach(g(a)),f.onError(a)},q))},function(a){j.getValues().forEach(g(a)),f.onError(a)},f.onCompleted.bind(f))),h.add(a.subscribe(function(a){var b=m++;k.add(b,a);var d=new Qb;h.add(d);var e,i=function(){k.remove(b),h.remove(d)};try{e=c(a)}catch(l){return j.getValues().forEach(g(l)),void f.onError(l)}d.setDisposable(e.take(1).subscribe(Ea,function(a){j.getValues().forEach(g(a)),f.onError(a)},i)),j.getValues().forEach(function(b){b.onNext(a)})},function(a){j.getValues().forEach(g(a)),f.onError(a)})),i},e)},pc.buffer=function(){return this.window.apply(this,arguments).selectMany(function(a){return a.toArray()})},pc.window=function(a,b){return 1===arguments.length&&"function"!=typeof arguments[0]?ja.call(this,a):"function"==typeof a?ka.call(this,a):ia.call(this,a,b)},pc.pairwise=function(){var a=this;return new wd(function(b){var c,d=!1;return a.subscribe(function(a){d?b.onNext([c,a]):d=!0,c=a},b.onError.bind(b),b.onCompleted.bind(b))},a)},pc.partition=function(a,b){return[this.filter(a,b),this.filter(function(c,d,e){return!a.call(b,c,d,e)})]},pc.letBind=pc.let=function(a){return a(this)},vc["if"]=vc.ifThen=function(a,b,c){return zc(function(){return c||(c=Bc()),Ka(b)&&(b=xc(b)),Ka(c)&&(c=xc(c)),"function"==typeof c.now&&(c=Bc(c)),a()?b:c})},vc["for"]=vc.forIn=function(a,b,c){return mc(a,b,c).concat()};var rd=vc["while"]=vc.whileDo=function(a,b){return Ka(b)&&(b=xc(b)),la(a,b).concat()};pc.doWhile=function(a){return Tc([this,rd(a,this)])},vc["case"]=vc.switchCase=function(a,b,c){return zc(function(){Ka(c)&&(c=xc(c)),c||(c=Bc()),"function"==typeof c.now&&(c=Bc(c));var d=b[a()];return Ka(d)&&(d=xc(d)),d||c})},pc.expand=function(a,b){Wb(b)||(b=$b);var c=this;return new wd(function(d){var e=[],f=new Rb,g=new Jb(f),h=0,i=!1,j=function(){var c=!1;e.length>0&&(c=!i,i=!0),c&&f.setDisposable(b.scheduleRecursive(function(b){var c;if(!(e.length>0))return void(i=!1);c=e.shift();var f=new Qb;g.add(f),f.setDisposable(c.subscribe(function(b){d.onNext(b);var c=null;try{c=a(b)}catch(f){d.onError(f)}e.push(c),h++,j()},d.onError.bind(d),function(){g.remove(f),h--,0===h&&d.onCompleted()})),b()}))};return e.push(c),h++,j(),g},this)},vc.forkJoin=function(){var a=[];if(Array.isArray(arguments[0]))a=arguments[0];else for(var b=0,c=arguments.length;c>b;b++)a.push(arguments[b]);return new wd(function(b){var c=a.length;if(0===c)return b.onCompleted(),Nb;for(var d=new Jb,e=!1,f=new Array(c),g=new Array(c),h=new Array(c),i=0;c>i;i++)!function(i){var j=a[i];Ka(j)&&(j=xc(j)),d.add(j.subscribe(function(a){e||(f[i]=!0,h[i]=a)},function(a){e=!0,b.onError(a),d.dispose()},function(){if(!e){if(!f[i])return void b.onCompleted();g[i]=!0;for(var a=0;c>a;a++)if(!g[a])return;e=!0,b.onNext(h),b.onCompleted()}}))}(i);return d})},pc.forkJoin=function(a,b){var c=this;return new wd(function(d){var e,f,g=!1,h=!1,i=!1,j=!1,k=new Qb,l=new Qb;return Ka(a)&&(a=xc(a)),k.setDisposable(c.subscribe(function(a){i=!0,e=a},function(a){l.dispose(),d.onError(a)},function(){if(g=!0,h)if(i)if(j){var a;try{a=b(e,f)}catch(c){return void d.onError(c)}d.onNext(a),d.onCompleted()}else d.onCompleted();else d.onCompleted()})),l.setDisposable(a.subscribe(function(a){j=!0,f=a},function(a){k.dispose(),d.onError(a)},function(){if(h=!0,g)if(i)if(j){var a;try{a=b(e,f)}catch(c){return void d.onError(c)}d.onNext(a),d.onCompleted()}else d.onCompleted();else d.onCompleted()})),new Jb(k,l)},c)},pc.manySelect=function(a,b){Wb(b)||(b=$b);var c=this;return zc(function(){var d;return c.map(function(a){var b=new sd(a);return d&&d.onNext(a),d=b,b}).tap(Ea,function(a){d&&d.onError(a)},function(){d&&d.onCompleted()}).observeOn(b).map(a)},c)};var sd=function(a){function b(a){var b=this,c=new Jb;return c.add(_b.schedule(function(){a.onNext(b.head),c.add(b.tail.mergeAll().subscribe(a))})),c}function c(c){a.call(this,b),this.head=c,this.tail=new Ad}return Db(c,a),Eb(c.prototype,nc,{onCompleted:function(){this.onNext(vc.empty())},onError:function(a){this.onNext(vc.throwError(a))},onNext:function(a){this.tail.onNext(a),this.tail.onCompleted()}}),c}(vc),td=ya.Map||function(){function b(){this._keys=[],this._values=[]}return b.prototype.get=function(b){var c=this._keys.indexOf(b);return-1!==c?this._values[c]:a},b.prototype.set=function(a,b){var c=this._keys.indexOf(a);-1!==c&&(this._values[c]=b),this._values[this._keys.push(a)-1]=b},b.prototype.forEach=function(a,b){for(var c=0,d=this._keys.length;d>c;c++)a.call(b,this._values[c],this._keys[c])},b}();ma.prototype.and=function(a){return new ma(this.patterns.concat(a))},ma.prototype.thenDo=function(a){return new na(this,a)},na.prototype.activate=function(a,b,c){for(var d=this,e=[],f=0,g=this.expression.patterns.length;g>f;f++)e.push(oa(a,this.expression.patterns[f],b.onError.bind(b)));var h=new pa(e,function(){var a;try{a=d.selector.apply(d,arguments)}catch(c){return void b.onError(c)}b.onNext(a)},function(){for(var a=0,b=e.length;b>a;a++)e[a].removeActivePlan(h);c(h)});for(f=0,g=e.length;g>f;f++)e[f].addActivePlan(h);return h},pa.prototype.dequeue=function(){this.joinObservers.forEach(function(a){a.queue.shift()})},pa.prototype.match=function(){var a,b,c=!0;for(a=0,b=this.joinObserverArray.length;b>a;a++)if(0===this.joinObserverArray[a].queue.length){c=!1;break}if(c){var d=[],e=!1;for(a=0,b=this.joinObserverArray.length;b>a;a++)d.push(this.joinObserverArray[a].queue[0]),"C"===this.joinObserverArray[a].queue[0].kind&&(e=!0);if(e)this.onCompleted();else{this.dequeue();var f=[];for(a=0,b=d.length;a<d.length;a++)f.push(d[a].value);this.onNext.apply(this,f)}}};var ud=function(a){function b(b,c){a.call(this),this.source=b,this.onError=c,this.queue=[],this.activePlans=[],this.subscription=new Qb,this.isDisposed=!1}Db(b,a);var c=b.prototype;return c.next=function(a){if(!this.isDisposed){if("E"===a.kind)return this.onError(a.exception);this.queue.push(a);for(var b=this.activePlans.slice(0),c=0,d=b.length;d>c;c++)b[c].match()}},c.error=Ea,c.completed=Ea,c.addActivePlan=function(a){this.activePlans.push(a)},c.subscribe=function(){this.subscription.setDisposable(this.source.materialize().subscribe(this))},c.removeActivePlan=function(a){this.activePlans.splice(this.activePlans.indexOf(a),1),0===this.activePlans.length&&this.dispose()},c.dispose=function(){a.prototype.dispose.call(this),this.isDisposed||(this.isDisposed=!0,this.subscription.dispose())},b}(qc);pc.and=function(a){return new ma([this,a])},pc.thenDo=function(a){return new ma([this]).thenDo(a)},vc.when=function(){var a,b=arguments.length;if(Array.isArray(arguments[0]))a=arguments[0];else{a=new Array(b);for(var c=0;b>c;c++)a[c]=arguments[c]}return new wd(function(b){var c=[],d=new td,e=oc(function(a){b.onNext(a)},function(a){d.forEach(function(b){b.onError(a)}),b.onError(a)},function(){b.onCompleted()});try{for(var f=0,g=a.length;g>f;f++)c.push(a[f].activate(d,e,function(a){var d=c.indexOf(a);c.splice(d,1),0===c.length&&b.onCompleted()}))}catch(h){Qc(h).subscribe(b)}var i=new Jb;return d.forEach(function(a){a.subscribe(),i.add(a)}),i})};{var vd=vc.interval=function(a,b){return ta(a,a,Wb(b)?b:dc)};vc.timer=function(b,c,d){var e;return Wb(d)||(d=dc),c!==a&&"number"==typeof c?e=c:Wb(c)&&(d=c),b instanceof Date&&e===a?qa(b.getTime(),d):b instanceof Date&&e!==a?(e=c,ra(b.getTime(),e,d)):e===a?sa(b,d):ta(b,e,d)}}pc.delay=function(a,b){return Wb(b)||(b=dc),a instanceof Date?va(this,a.getTime(),b):ua(this,a,b)},pc.debounce=pc.throttleWithTimeout=function(a,b){Wb(b)||(b=dc);var c=this;return new wd(function(d){var e,f=new Rb,g=!1,h=0,i=c.subscribe(function(c){g=!0,e=c,h++;var i=h,j=new Qb;f.setDisposable(j),j.setDisposable(b.scheduleWithRelative(a,function(){g&&h===i&&d.onNext(e),g=!1}))},function(a){f.dispose(),d.onError(a),g=!1,h++},function(){f.dispose(),g&&d.onNext(e),d.onCompleted(),g=!1,h++});return new Jb(i,f)},this)},pc.throttle=function(a,b){return this.debounce(a,b)},pc.windowWithTime=function(a,b,c){var d,e=this;return null==b&&(d=a),Wb(c)||(c=dc),"number"==typeof b?d=b:Wb(b)&&(d=a,c=b),new wd(function(b){function f(){var a=new Qb,e=!1,g=!1;l.setDisposable(a),j===i?(e=!0,g=!0):i>j?e=!0:g=!0;var n=e?j:i,o=n-m;m=n,e&&(j+=d),g&&(i+=d),a.setDisposable(c.scheduleWithRelative(o,function(){if(g){var a=new zd;k.push(a),b.onNext(Fb(a,h))}e&&k.shift().onCompleted(),f()}))}var g,h,i=d,j=a,k=[],l=new Rb,m=0;return g=new Jb(l),h=new Sb(g),k.push(new zd),b.onNext(Fb(k[0],h)),f(),g.add(e.subscribe(function(a){for(var b=0,c=k.length;c>b;b++)k[b].onNext(a)},function(a){for(var c=0,d=k.length;d>c;c++)k[c].onError(a);b.onError(a)},function(){for(var a=0,c=k.length;c>a;a++)k[a].onCompleted();b.onCompleted()})),h},e)},pc.windowWithTimeOrCount=function(a,b,c){var d=this;return Wb(c)||(c=dc),new wd(function(e){function f(b){var d=new Qb;g.setDisposable(d),d.setDisposable(c.scheduleWithRelative(a,function(){if(b===k){j=0;var a=++k;l.onCompleted(),l=new zd,e.onNext(Fb(l,i)),f(a)}}))}var g=new Rb,h=new Jb(g),i=new Sb(h),j=0,k=0,l=new zd;return e.onNext(Fb(l,i)),f(0),h.add(d.subscribe(function(a){var c=0,d=!1;l.onNext(a),++j===b&&(d=!0,j=0,c=++k,l.onCompleted(),l=new zd,e.onNext(Fb(l,i))),d&&f(c)},function(a){l.onError(a),e.onError(a)},function(){l.onCompleted(),e.onCompleted()})),i},d)},pc.bufferWithTime=function(){return this.windowWithTime.apply(this,arguments).selectMany(function(a){return a.toArray()})},pc.bufferWithTimeOrCount=function(a,b,c){return this.windowWithTimeOrCount(a,b,c).selectMany(function(a){return a.toArray()})},pc.timeInterval=function(a){var b=this;return Wb(a)||(a=dc),zc(function(){var c=a.now();return b.map(function(b){var d=a.now(),e=d-c;return c=d,{value:b,interval:e}})})},pc.timestamp=function(a){return Wb(a)||(a=dc),this.map(function(b){return{value:b,timestamp:a.now()}})},pc.sample=pc.throttleLatest=function(a,b){return Wb(b)||(b=dc),"number"==typeof a?wa(this,vd(a,b)):wa(this,a)},
pc.timeout=function(a,b,c){(null==b||"string"==typeof b)&&(b=Qc(new Error(b||"Timeout"))),Wb(c)||(c=dc);var d=this,e=a instanceof Date?"scheduleWithAbsolute":"scheduleWithRelative";return new wd(function(f){function g(){var d=h;l.setDisposable(c[e](a,function(){h===d&&(Ka(b)&&(b=xc(b)),j.setDisposable(b.subscribe(f)))}))}var h=0,i=new Qb,j=new Rb,k=!1,l=new Rb;return j.setDisposable(i),g(),i.setDisposable(d.subscribe(function(a){k||(h++,f.onNext(a),g())},function(a){k||(h++,f.onError(a))},function(){k||(h++,f.onCompleted())})),new Jb(j,l)},d)},vc.generateWithAbsoluteTime=function(a,b,c,d,e,f){return Wb(f)||(f=dc),new wd(function(g){var h,i,j=!0,k=!1,l=a;return f.scheduleRecursiveWithAbsolute(f.now(),function(a){k&&g.onNext(h);try{j?j=!1:l=c(l),k=b(l),k&&(h=d(l),i=e(l))}catch(f){return void g.onError(f)}k?a(i):g.onCompleted()})})},vc.generateWithRelativeTime=function(a,b,c,d,e,f){return Wb(f)||(f=dc),new wd(function(g){var h,i,j=!0,k=!1,l=a;return f.scheduleRecursiveWithRelative(0,function(a){k&&g.onNext(h);try{j?j=!1:l=c(l),k=b(l),k&&(h=d(l),i=e(l))}catch(f){return void g.onError(f)}k?a(i):g.onCompleted()})})},pc.delaySubscription=function(a,b){var c=a instanceof Date?"scheduleWithAbsolute":"scheduleWithRelative",d=this;return Wb(b)||(b=dc),new wd(function(e){var f=new Rb;return f.setDisposable(b[c](a,function(){f.setDisposable(d.subscribe(e))})),f},this)},pc.delayWithSelector=function(a,b){var c,d,e=this;return Ma(a)?d=a:(c=a,d=b),new wd(function(a){function b(){i.setDisposable(e.subscribe(function(b){var c=p(d)(b);if(c===Gb)return a.onError(c.e);var e=new Qb;g.add(e),e.setDisposable(c.subscribe(function(){a.onNext(b),g.remove(e),f()},function(b){a.onError(b)},function(){a.onNext(b),g.remove(e),f()}))},function(b){a.onError(b)},function(){h=!0,i.dispose(),f()}))}function f(){h&&0===g.length&&a.onCompleted()}var g=new Jb,h=!1,i=new Rb;return c?i.setDisposable(c.subscribe(b,function(b){a.onError(b)},b)):b(),new Jb(i,g)},this)},pc.timeoutWithSelector=function(a,b,c){1===arguments.length&&(b=a,a=Jc()),c||(c=Qc(new Error("Timeout")));var d=this;return new wd(function(e){function f(a){function b(){return k===d}var d=k,f=new Qb;i.setDisposable(f),f.setDisposable(a.subscribe(function(){b()&&h.setDisposable(c.subscribe(e)),f.dispose()},function(a){b()&&e.onError(a)},function(){b()&&h.setDisposable(c.subscribe(e))}))}function g(){var a=!l;return a&&k++,a}var h=new Rb,i=new Rb,j=new Qb;h.setDisposable(j);var k=0,l=!1;return f(a),j.setDisposable(d.subscribe(function(a){if(g()){e.onNext(a);var c;try{c=b(a)}catch(d){return void e.onError(d)}f(Ka(c)?xc(c):c)}},function(a){g()&&e.onError(a)},function(){g()&&e.onCompleted()})),new Jb(h,i)},d)},pc.debounceWithSelector=function(a){var b=this;return new wd(function(c){var d,e=!1,f=new Rb,g=0,h=b.subscribe(function(b){var h;try{h=a(b)}catch(i){return void c.onError(i)}Ka(h)&&(h=xc(h)),e=!0,d=b,g++;var j=g,k=new Qb;f.setDisposable(k),k.setDisposable(h.subscribe(function(){e&&g===j&&c.onNext(d),e=!1,k.dispose()},c.onError.bind(c),function(){e&&g===j&&c.onNext(d),e=!1,k.dispose()}))},function(a){f.dispose(),c.onError(a),e=!1,g++},function(){f.dispose(),e&&c.onNext(d),c.onCompleted(),e=!1,g++});return new Jb(h,f)},b)},pc.throttleWithSelector=function(a){return this.debounceWithSelector(a)},pc.skipLastWithTime=function(a,b){Wb(b)||(b=dc);var c=this;return new wd(function(d){var e=[];return c.subscribe(function(c){var f=b.now();for(e.push({interval:f,value:c});e.length>0&&f-e[0].interval>=a;)d.onNext(e.shift().value)},function(a){d.onError(a)},function(){for(var c=b.now();e.length>0&&c-e[0].interval>=a;)d.onNext(e.shift().value);d.onCompleted()})},c)},pc.takeLastWithTime=function(a,b){var c=this;return Wb(b)||(b=dc),new wd(function(d){var e=[];return c.subscribe(function(c){var d=b.now();for(e.push({interval:d,value:c});e.length>0&&d-e[0].interval>=a;)e.shift()},function(a){d.onError(a)},function(){for(var c=b.now();e.length>0;){var f=e.shift();c-f.interval<=a&&d.onNext(f.value)}d.onCompleted()})},c)},pc.takeLastBufferWithTime=function(a,b){var c=this;return Wb(b)||(b=dc),new wd(function(d){var e=[];return c.subscribe(function(c){var d=b.now();for(e.push({interval:d,value:c});e.length>0&&d-e[0].interval>=a;)e.shift()},function(a){d.onError(a)},function(){for(var c=b.now(),f=[];e.length>0;){var g=e.shift();c-g.interval<=a&&f.push(g.value)}d.onNext(f),d.onCompleted()})},c)},pc.takeWithTime=function(a,b){var c=this;return Wb(b)||(b=dc),new wd(function(d){return new Jb(b.scheduleWithRelative(a,function(){d.onCompleted()}),c.subscribe(d))},c)},pc.skipWithTime=function(a,b){var c=this;return Wb(b)||(b=dc),new wd(function(d){var e=!1;return new Jb(b.scheduleWithRelative(a,function(){e=!0}),c.subscribe(function(a){e&&d.onNext(a)},d.onError.bind(d),d.onCompleted.bind(d)))},c)},pc.skipUntilWithTime=function(a,b){Wb(b)||(b=dc);var c=this,d=a instanceof Date?"scheduleWithAbsolute":"scheduleWithRelative";return new wd(function(e){var f=!1;return new Jb(b[d](a,function(){f=!0}),c.subscribe(function(a){f&&e.onNext(a)},function(a){e.onError(a)},function(){e.onCompleted()}))},c)},pc.takeUntilWithTime=function(a,b){Wb(b)||(b=dc);var c=this,d=a instanceof Date?"scheduleWithAbsolute":"scheduleWithRelative";return new wd(function(e){return new Jb(b[d](a,function(){e.onCompleted()}),c.subscribe(e))},c)},pc.throttleFirst=function(a,b){Wb(b)||(b=dc);var c=+a||0;if(0>=c)throw new RangeError("windowDuration cannot be less or equal zero.");var d=this;return new wd(function(a){var e=0;return d.subscribe(function(d){var f=b.now();(0===e||f-e>=c)&&(e=f,a.onNext(d))},function(b){a.onError(b)},function(){a.onCompleted()})},d)},pc.transduce=function(a){function b(a){return{"@@transducer/init":function(){return a},"@@transducer/step":function(a,b){return a.onNext(b)},"@@transducer/result":function(a){return a.onCompleted()}}}var c=this;return new wd(function(d){var e=a(b(d));return c.subscribe(function(a){try{e["@@transducer/step"](d,a)}catch(b){d.onError(b)}},function(a){d.onError(a)},function(){e["@@transducer/result"](d)})},c)},pc.exclusive=function(){var a=this;return new wd(function(b){var c=!1,d=!1,e=new Qb,f=new Jb;return f.add(e),e.setDisposable(a.subscribe(function(a){if(!c){c=!0,Ka(a)&&(a=xc(a));var e=new Qb;f.add(e),e.setDisposable(a.subscribe(b.onNext.bind(b),b.onError.bind(b),function(){f.remove(e),c=!1,d&&1===f.length&&b.onCompleted()}))}},b.onError.bind(b),function(){d=!0,c||1!==f.length||b.onCompleted()})),f},this)},pc.exclusiveMap=function(a,b){var c=this,d=cb(a,b,3);return new wd(function(a){var b=0,e=!1,f=!0,g=new Qb,h=new Jb;return h.add(g),g.setDisposable(c.subscribe(function(c){e||(e=!0,innerSubscription=new Qb,h.add(innerSubscription),Ka(c)&&(c=xc(c)),innerSubscription.setDisposable(c.subscribe(function(e){var f;try{f=d(e,b++,c)}catch(g){return void a.onError(g)}a.onNext(f)},function(b){a.onError(b)},function(){h.remove(innerSubscription),e=!1,f&&1===h.length&&a.onCompleted()})))},function(b){a.onError(b)},function(){f=!0,1!==h.length||e||a.onCompleted()})),h},this)},Da.VirtualTimeScheduler=function(a){function b(){return this.toDateTimeOffset(this.clock)}function c(a,b){return this.scheduleAbsoluteWithState(a,this.clock,b)}function d(a,b,c){return this.scheduleRelativeWithState(a,this.toRelative(b),c)}function e(a,b,c){return this.scheduleRelativeWithState(a,this.toRelative(b-this.now()),c)}function f(a,b){return b(),Nb}function g(f,g){this.clock=f,this.comparer=g,this.isEnabled=!1,this.queue=new Hb(1024),a.call(this,b,c,d,e)}Db(g,a);var h=g.prototype;return h.add=Xa,h.toDateTimeOffset=Xa,h.toRelative=Xa,h.schedulePeriodicWithState=function(a,b,c){var d=new Zb(this,a,b,c);return d.start()},h.scheduleRelativeWithState=function(a,b,c){var d=this.add(this.clock,b);return this.scheduleAbsoluteWithState(a,d,c)},h.scheduleRelative=function(a,b){return this.scheduleRelativeWithState(b,a,f)},h.start=function(){if(!this.isEnabled){this.isEnabled=!0;do{var a=this.getNext();null!==a?(this.comparer(a.dueTime,this.clock)>0&&(this.clock=a.dueTime),a.invoke()):this.isEnabled=!1}while(this.isEnabled)}},h.stop=function(){this.isEnabled=!1},h.advanceTo=function(a){var b=this.comparer(this.clock,a);if(this.comparer(this.clock,a)>0)throw new Ua;if(0!==b&&!this.isEnabled){this.isEnabled=!0;do{var c=this.getNext();null!==c&&this.comparer(c.dueTime,a)<=0?(this.comparer(c.dueTime,this.clock)>0&&(this.clock=c.dueTime),c.invoke()):this.isEnabled=!1}while(this.isEnabled);this.clock=a}},h.advanceBy=function(a){var b=this.add(this.clock,a),c=this.comparer(this.clock,b);if(c>0)throw new Ua;0!==c&&this.advanceTo(b)},h.sleep=function(a){var b=this.add(this.clock,a);if(this.comparer(this.clock,b)>=0)throw new Ua;this.clock=b},h.getNext=function(){for(;this.queue.length>0;){var a=this.queue.peek();if(!a.isCancelled())return a;this.queue.dequeue()}return null},h.scheduleAbsolute=function(a,b){return this.scheduleAbsoluteWithState(b,a,f)},h.scheduleAbsoluteWithState=function(a,b,c){function d(a,b){return e.queue.remove(f),c(a,b)}var e=this,f=new Tb(this,a,d,b,this.comparer);return this.queue.enqueue(f),f.disposable},g}(Ub),Da.HistoricalScheduler=function(a){function b(b,c){var d=null==b?0:b,e=c||Ia;a.call(this,d,e)}Db(b,a);var c=b.prototype;return c.add=function(a,b){return a+b},c.toDateTimeOffset=function(a){return new Date(a).getTime()},c.toRelative=function(a){return a},b}(Da.VirtualTimeScheduler);var wd=Da.AnonymousObservable=function(a){function b(a){return a&&Ma(a.dispose)?a:Ma(a)?Mb(a):Nb}function c(a,c){var d=c[0],e=c[1],f=p(e)(d);return f!==Gb||d.fail(Gb.e)?void d.setDisposable(b(f)):q(Gb.e)}function d(b,d){function e(a){var d=new xd(a),e=[d,b];return _b.scheduleRequired()?_b.scheduleWithState(e,c):c(null,e),d}this.source=d,a.call(this,e)}return Db(d,a),d}(vc),xd=function(a){function b(b){a.call(this),this.observer=b,this.m=new Qb}Db(b,a);var c=b.prototype;return c.next=function(a){var b=p(this.observer.onNext).call(this.observer,a);b===Gb&&(this.dispose(),q(b.e))},c.error=function(a){var b=p(this.observer.onError).call(this.observer,a);this.dispose(),b===Gb&&q(b.e)},c.completed=function(){var a=p(this.observer.onCompleted).call(this.observer);this.dispose(),a===Gb&&q(a.e)},c.setDisposable=function(a){this.m.setDisposable(a)},c.getDisposable=function(){return this.m.getDisposable()},c.dispose=function(){a.prototype.dispose.call(this),this.m.dispose()},b}(qc),yd=function(a){function b(a){return this.underlyingObservable.subscribe(a)}function c(c,d,e){a.call(this,b),this.key=c,this.underlyingObservable=e?new wd(function(a){return new Jb(e.getDisposable(),d.subscribe(a))}):d}return Db(c,a),c}(vc),zd=Da.Subject=function(a){function c(a){return Pb(this),this.isStopped?this.hasError?(a.onError(this.error),Nb):(a.onCompleted(),Nb):(this.observers.push(a),new md(this,a))}function d(){a.call(this,c),this.isDisposed=!1,this.isStopped=!1,this.observers=[],this.hasError=!1}return Db(d,a),Eb(d.prototype,nc.prototype,{hasObservers:function(){return this.observers.length>0},onCompleted:function(){if(Pb(this),!this.isStopped){this.isStopped=!0;for(var a=0,c=b(this.observers),d=c.length;d>a;a++)c[a].onCompleted();this.observers.length=0}},onError:function(a){if(Pb(this),!this.isStopped){this.isStopped=!0,this.error=a,this.hasError=!0;for(var c=0,d=b(this.observers),e=d.length;e>c;c++)d[c].onError(a);this.observers.length=0}},onNext:function(a){if(Pb(this),!this.isStopped)for(var c=0,d=b(this.observers),e=d.length;e>c;c++)d[c].onNext(a)},dispose:function(){this.isDisposed=!0,this.observers=null}}),d.create=function(a,b){return new Bd(a,b)},d}(vc),Ad=Da.AsyncSubject=function(a){function c(a){return Pb(this),this.isStopped?(this.hasError?a.onError(this.error):this.hasValue?(a.onNext(this.value),a.onCompleted()):a.onCompleted(),Nb):(this.observers.push(a),new md(this,a))}function d(){a.call(this,c),this.isDisposed=!1,this.isStopped=!1,this.hasValue=!1,this.observers=[],this.hasError=!1}return Db(d,a),Eb(d.prototype,nc,{hasObservers:function(){return Pb(this),this.observers.length>0},onCompleted:function(){var a,c;if(Pb(this),!this.isStopped){this.isStopped=!0;var d=b(this.observers),c=d.length;if(this.hasValue)for(a=0;c>a;a++){var e=d[a];e.onNext(this.value),e.onCompleted()}else for(a=0;c>a;a++)d[a].onCompleted();this.observers.length=0}},onError:function(a){if(Pb(this),!this.isStopped){this.isStopped=!0,this.hasError=!0,this.error=a;for(var c=0,d=b(this.observers),e=d.length;e>c;c++)d[c].onError(a);this.observers.length=0}},onNext:function(a){Pb(this),this.isStopped||(this.value=a,this.hasValue=!0)},dispose:function(){this.isDisposed=!0,this.observers=null,this.exception=null,this.value=null}}),d}(vc),Bd=Da.AnonymousSubject=function(a){function b(a){return this.observable.subscribe(a)}function c(c,d){this.observer=c,this.observable=d,a.call(this,b)}return Db(c,a),Eb(c.prototype,nc.prototype,{onCompleted:function(){this.observer.onCompleted()},onError:function(a){this.observer.onError(a)},onNext:function(a){this.observer.onNext(a)}}),c}(vc);Da.Pauser=function(a){function b(){a.call(this)}return Db(b,a),b.prototype.pause=function(){this.onNext(!1)},b.prototype.resume=function(){this.onNext(!0)},b}(zd),"function"==typeof define&&"object"==typeof define.amd&&define.amd?(ya.Rx=Da,define(function(){return Da})):za&&Aa?Ba?(Aa.exports=Da).Rx=Da:za.Rx=Da:ya.Rx=Da;var Cd=g()}).call(this);
//# sourceMappingURL=rx.all.map

var wx;!function(a){"use strict"}(wx||(wx={}));var wx;!function(a){"use strict";function b(a){return a||!d?new c:new WeakMap}var c=function(){function b(){this.inner={}}return b.prototype.set=function(b,c){var d=a.getOid(b);this.inner[d]=c},b.prototype.get=function(b){var c=a.getOid(b);return this.inner[c]},b.prototype.has=function(b){var c=a.getOid(b);return this.inner.hasOwnProperty(c)},b.prototype["delete"]=function(b){var c=a.getOid(b);return delete this.inner[c]},Object.defineProperty(b.prototype,"isEmulated",{get:function(){return!0},enumerable:!0,configurable:!0}),b}(),d="function"==typeof WeakMap;a.createWeakMap=b}(wx||(wx={}));var wx;!function(a){var b;!function(a){"use strict";a.injector="wx.injector",a.domManager="wx.domservice",a.router="wx.router",a.messageBus="wx.messageBus",a.expressionCompiler="wx.expressioncompiler",a.htmlTemplateEngine="wx.htmlTemplateEngine",a.hasValueBindingValue="has.wx.bindings.value",a.valueBindingValue="wx.bindings.value"}(b=a.res||(a.res={}))}(wx||(wx={}));var wx;!function(a){"use strict"}(wx||(wx={}));var wx;!function(a){var b;!function(a){"use strict";var b=function(){function a(a,b){this.propertyName=b,this.sender=a}return a}();a.PropertyChangedEventArgs=b}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b=function(){function a(){}return a.IUnknown="IUnknown",a.IDisposable="IDisposable",a.IObservableProperty="IObservableProperty",a.IReactiveNotifyPropertyChanged="IReactiveNotifyPropertyChanged",a.IHandleObservableErrors="IHandleObservableErrors",a.IObservableList="IObservableList",a.IList="IList",a.IReactiveNotifyCollectionChanged="IReactiveNotifyCollectionChanged",a.IReactiveNotifyCollectionItemChanged="IReactiveNotifyCollectionItemChanged",a.IReactiveDerivedList="IReactiveDerivedList",a.IMoveInfo="IMoveInfo",a.IObservedChange="IObservedChange",a.ICommand="ICommand",a.IReadOnlyList="IReadOnlyList",a}();a.IID=b}(wx||(wx={}));var wx;!function(a){"use strict";function b(){return"undefined"==typeof this}function c(a){var b=typeof a;return"boolean"===b||"number"===b||"string"===b}function d(b){return null==b?!1:o(b,a.IID.IObservableProperty)}function e(b){return null==b?!1:b instanceof J.commandConstructor||o(b,a.IID.ICommand)}function f(a){return null==a?!1:a instanceof J.listConstructor}function g(a){return null==a?!1:Rx.Scheduler.isScheduler(a)}function h(a){return null==a?!1:a instanceof F}function i(a){return d(a)?a():a}function j(){return window&&window.jasmine&&void 0!==window.jasmine.version_?!0:window&&window.getJasmineRequireObj&&"function"==typeof window.getJasmineRequireObj?!0:!1}function k(b){if(b=b||a.app.history.location.search.substr(1)){for(var c={},d=b.split("&"),e=0;e<d.length;e++){var f=d[e].split("=");c[f[0]]=decodeURIComponent(f[1])}return c}return{}}function l(a){for(var b=[],c=0,d=a.length;d>c;c++)b.push(a[c]);return b}function m(a){for(var b=[],c=1;c<arguments.length;c++)b[c-1]=arguments[c];var d=/\{\d+\}/g;return a.replace(d,function(a){return b[a.match(/\d+/)]})}function n(a,b,c){var d;if(c)for(d in a)b[d]=a[d];else for(var e=Object.getOwnPropertyNames(a),f=0;f<e.length;f++)d=e[f],b[d]=a[d];return b}function o(a,b){return p(a)?a.queryInterface(b):!1}function p(a){return void 0!==a&&null!==a&&"function"==typeof a.queryInterface}function q(a,b){return Object.keys(a).filter(function(c){var d=a[c];return o(d,b)}).map(function(b){return new I(b,a[b])})}function r(a){if(null==a)return void 0;if(c(a))return typeof a+":"+a;var b=a[H];return void 0===b&&(b=(++G).toString(),a[H]=b),b}function s(a,b){for(var c=[],d=2;d<arguments.length;d++)c[d-2]=arguments[d];if(c){var e,f,g,h=a.className.match(E)||[];if(b)for(f=0;f<c.length;f++)g=c[f],e=h.indexOf(g),-1===e&&h.push(g);else for(f=0;f<c.length;f++)g=c[f],e=h.indexOf(g),-1!==e&&h.splice(e,1);a.className=h.join(" ")}}function t(a){a.getBoundingClientRect()}function u(a){return"function"==typeof a||!1}function v(a){return u(a.dispose)}function w(a,b,c,d){var e={}.toString;if(a===b)return 0!==a||1/a===1/b;if(null==a||null==b)return a===b;var f=e.call(a);if(f!==e.call(b))return!1;switch(f){case"[object RegExp]":case"[object String]":return""+a==""+b;case"[object Number]":return+a!==+a?+b!==+b:0===+a?1/+a===1/b:+a===+b;case"[object Date]":case"[object Boolean]":return+a===+b}var g="[object Array]"===f;if(!g){if("object"!=typeof a||"object"!=typeof b)return!1;var h=a.constructor,i=b.constructor;if(h!==i&&!(u(h)&&h instanceof h&&u(i)&&i instanceof i)&&"constructor"in a&&"constructor"in b)return!1}c=c||[],d=d||[];for(var j=c.length;j--;)if(c[j]===a)return d[j]===b;if(c.push(a),d.push(b),g){if(j=a.length,j!==b.length)return!1;for(;j--;)if(!w(a[j],b[j],c,d))return!1}else{var k,l=Object.keys(a);if(j=l.length,Object.keys(b).length!==j)return!1;for(;j--;)if(k=l[j],!b.hasOwnProperty(k)||!w(a[k],b[k],c,d))return!1}return c.pop(),d.pop(),!0}function x(a){for(var b=a.length,c=new Array(b),d=0;b>d;d++)c[d]=a[d].cloneNode(!0);return c}function y(a){return Array.prototype.slice.call(a)}function z(a){return y(a.childNodes)}function A(a,b){if(!a)throw new Error("disp");if(!b)throw new Error("action");try{b(a)}finally{a.dispose()}}function B(a){return u(require)||J.throwError("there's no AMD-module loader available (Hint: did you forget to include RequireJS in your project?)"),Rx.Observable.create(function(b){try{require([a],function(a){b.onNext(a),b.onCompleted()},function(a){b.onError(a)})}catch(c){b.onError(c)}return Rx.Disposable.empty})}function C(b,c){void 0===c&&(c=!1);var d=o(b,a.IID.IHandleObservableErrors)?b.thrownExceptions:a.app.defaultExceptionHandler;return Rx.Observable.create(function(e){var f=new Rx.CompositeDisposable,g=q(b,a.IID.IObservableProperty);return g.forEach(function(a){var b=a.property,g=c?b.changing:b.changed;f.add(g.subscribe(function(b){var c=new J.PropertyChangedEventArgs(self,a.propertyName);try{e.onNext(c)}catch(f){d.onNext(f)}}))}),f}).publish().refCount()}function D(){if(2===arguments.length)return arguments[0].changed.startWith(arguments[0]()).select(arguments[1]);var a=l(arguments),b=a.pop();return a=a.map(function(a){return a.changed.startWith(a())}),a.push(b),Rx.Observable.combineLatest.apply(this,a)}var E=/\S+/g,F=Rx.Observable;a.noop=function(){},a.isStrictMode=b,a.isPrimitive=c,a.isProperty=d,a.isCommand=e,a.isList=f,a.isRxScheduler=g,a.isRxObservable=h,a.unwrapProperty=i,a.isInUnitTest=j,a.getSearchParameters=k,a.args2Array=l,a.formatString=m,a.extend=n;var G=1,H="__rxui_oid__"+(new Date).getTime(),I=function(){function a(a,b){this.property=b,this.propertyName=a}return a}();a.PropertyInfo=I,a.queryInterface=o,a.supportsQueryInterface=p,a.getOwnPropertiesImplementingInterface=q,a.getOid=r,a.toggleCssClass=s,a.triggerReflow=t,a.isFunction=u,a.isDisposable=v,a.isEqual=w,a.cloneNodeArray=x,a.nodeListToArray=y,a.nodeChildrenToArray=z,a.using=A,a.observableRequire=B,a.observeObject=C,a.whenAny=D;var J;!function(b){function c(a){for(var b=[],c=1;c<arguments.length;c++)b[c-1]=arguments[c];var d="WebRx: "+m(a,b);throw new Error(d)}function d(b){for(var c=[],d=1;d<arguments.length;d++)c[d-1]=arguments[d];var e="WebRx: "+m(b,c);a.app.defaultExceptionHandler.onNext(Error(e))}b.throwError=c,b.emitError=d}(J=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b=function(){function b(){this.registrations={}}return b.prototype.register=function(){var b,c=arguments[0],d=arguments[1],e=arguments[2];if(this.registrations.hasOwnProperty(c)&&a.internal.throwError("'{0}' is already registered",c),a.isFunction(d))b=function(a,b){return d.apply(null,a)};else if(Array.isArray(d)){var f=this,g=d.pop(),h=d;b=function(b,d){var e=h.map(function(b){try{return f.get(b,void 0,d)}catch(e){a.internal.throwError("Error resolving dependency '{0}' for '{1}': {2}",b,c,e)}}),i=[null].concat(e).concat(b),j=g.bind.apply(g,i);return new j}}else b=function(a,b){return d};return this.registrations[c]={factory:b,isSingleton:e},this},b.prototype.get=function(b,c,d){d=d||{},d.hasOwnProperty(b)&&a.internal.throwError("Detected circular dependency a from '{0}' to '{1}'",Object.keys(d).join(", "),b);var e=this.registrations[b];if(void 0===e&&a.internal.throwError("'{0}' is not registered",b),e.isSingleton&&e.value)return e.value;var f={};f[b]=!0,a.extend(d,f);var g=e.factory(c,f);return e.isSingleton&&(e.value=g),g},b.prototype.resolve=function(b,c){var d=b.pop();a.isFunction(d)||a.internal.throwError("Error resolving inline-annotated-array. Constructor must be of type 'function' but is '{0}",typeof d);var e=this,f=b.map(function(c){try{return e.get(c,void 0,b)}catch(f){a.internal.throwError("Error resolving dependency '{0}' for '{1}': {2}",c,Object.getPrototypeOf(d),f)}}),g=[null].concat(f).concat(c),h=d.bind.apply(d,g);return new h},b}();a.injector=new b,a.injector.register(a.res.injector,function(){return new b})}(wx||(wx={}));var wx;!function(a){"use strict";function b(a){return a||!e?new d:new Set}function c(a){var b=new Array;return a.forEach(function(a){return b.push(a)}),b}var d=function(){function b(){this.values=[],this.keys={}}return b.prototype.add=function(b){var c=a.getOid(b);return this.keys[c]||(this.values.push(b),this.keys[c]=!0),this},b.prototype["delete"]=function(b){var c=a.getOid(b);if(this.keys[c]){var d=this.values.indexOf(b);return this.values.splice(d,1),delete this.keys[c],!0}return!1},b.prototype.has=function(b){var c=a.getOid(b);return this.keys.hasOwnProperty(c)},b.prototype.clear=function(){this.keys={},this.values.length=0},b.prototype.forEach=function(a,b){this.values.forEach(a,b)},Object.defineProperty(b.prototype,"size",{get:function(){return this.values.length},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"isEmulated",{get:function(){return!0},enumerable:!0,configurable:!0}),b}(),e="function"==typeof Set&&Set.prototype.hasOwnProperty("forEach")&&Set.prototype.hasOwnProperty("add")&&Set.prototype.hasOwnProperty("clear")&&Set.prototype.hasOwnProperty("delete")&&Set.prototype.hasOwnProperty("has");a.createSet=b,a.setToArray=c}(wx||(wx={}));var wx;!function(a){var b;!function(b){"use strict";var c=window,d=c.navigator.userAgent;b.ie,b.opera,b.safari,b.firefox;var e=function(a){return a?parseFloat(a[1]):void 0};c.opera&&c.opera.version&&(b.opera={version:parseInt(c.opera.version())});var f=document&&function(){for(var a=3,b=document.createElement("div"),c=b.getElementsByTagName("i");b.innerHTML="<!--[if gt IE "+ ++a+"]><i></i><![endif]-->",c[0];);return a>4?a:void 0}();if(f&&(b.ie={version:f},10>f)){var g=a.createWeakMap();b.ie.getSelectionChangeObservable=function(a){var b=a.ownerDocument,c=g.get(b);return c?c:(c=Rx.Observable.defer(function(){return Rx.Observable.fromEvent(b,"selectionchange")}).select(function(a){return b}).publish().refCount(),g.set(b,c),c)}}f=e(d.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i)),f&&(b.safari={version:f}),f=e(d.match(/Firefox\/([^ ]*)/)),f&&(b.firefox={version:f});var h="function"==typeof Array.isArray&&"function"==typeof[].forEach&&"function"==typeof[].map&&"function"==typeof[].some&&"function"==typeof[].indexOf&&"function"==typeof Object.keys&&"function"==typeof Object.defineProperty;b.isSupported=!b.ie||b.ie.version>=9||!b.safari||b.safari.version>=5||(!b.firefox||b.firefox.version>=5)&&h,b.jQueryInstance=window.jQuery,b.jQueryInstance&&"function"==typeof b.jQueryInstance.cleanData?b.cleanExternalData=function(a){b.jQueryInstance.cleanData([a])}:b.cleanExternalData=function(a){}}(b=a.env||(a.env={}))}(wx||(wx={}));var wx;!function(a){"use strict";function b(b){var c=function(a){return arguments.length>0?void(a!==c.value&&(c.changingSubject.onNext(a),c.value=a,c.changedSubject.onNext(a))):c.value};return c.queryInterface=function(b){return b===a.IID.IUnknown||b===a.IID.IObservableProperty||b===a.IID.IDisposable?!0:!1},c.dispose=function(){},void 0!==b&&(c.value=b),c.changedSubject=new Rx.Subject,c.changed=c.changedSubject.publish().refCount(),c.changingSubject=new Rx.Subject,c.changing=c.changingSubject.publish().refCount(),c}a.property=b}(wx||(wx={}));var __extends=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c},wx;!function(a){"use strict";function b(b,c){return g[b]=c,a}function c(b){var c,d=g[b],f=void 0;if(null!=d)if(Array.isArray(d))c=new e(b),a.injector.resolve(d,c),f=Rx.Observable["return"](c);else if(a.isFunction(d))c=new e(b),d(c),f=Rx.Observable["return"](c);else{var h=d;h.instance?f=Rx.Observable["return"](h.instance):(c=new e(b),h.resolve?(a.injector.get(h.resolve,c),f=Rx.Observable["return"](c)):h.require&&(f=a.observableRequire(h.require)["do"](function(a){return a(c)}).select(function(a){return c})))}else f=Rx.Observable["return"](void 0);return f.take(1)["do"](function(a){return g[b]={instance:a}})}var d,e=function(){function b(a){this.bindings={},this.components={},this.expressionFilters={},this.animations={},this.name=a}return b.prototype.merge=function(b){var c=b;return a.extend(c.components,this.components),a.extend(c.bindings,this.bindings),a.extend(c.expressionFilters,this.expressionFilters),a.extend(c.animations,this.animations),this},b.prototype.component=function(a,b){return this.components[a]=b,this},b.prototype.hasComponent=function(a){return null!=this.components[a]},b.prototype.loadComponent=function(a,b){return this.initializeComponent(this.instantiateComponent(a),b)},b.prototype.binding=function(){var b,c=this,d=a.args2Array(arguments),e=d.shift();return 0===d.length?(b=this.bindings[e],"string"==typeof b&&(b=a.injector.get(b),this.bindings[e]=b),b):(b=d.shift(),Array.isArray(e)?e.forEach(function(a){return c.bindings[a]=b}):this.bindings[e]=b,this)},b.prototype.filter=function(){var b,c=a.args2Array(arguments),d=c.shift();return 0===c.length?(b=this.expressionFilters[d],"string"==typeof b&&(b=a.injector.get(b),this.bindings[d]=b),b):(b=c.shift(),this.expressionFilters[d]=b,this)},b.prototype.filters=function(){return this.expressionFilters},b.prototype.animation=function(){var b,c=a.args2Array(arguments),d=c.shift();return 0===c.length?(b=this.animations[d],"string"==typeof b&&(b=a.injector.get(b),this.bindings[d]=b),b):(b=c.shift(),this.animations[d]=b,this)},b.prototype.instantiateComponent=function(b){var c=this,d=this.components[b],e=void 0;if(null!=d)if(d.instance)e=Rx.Observable["return"](d.instance);else if(d.template)e=Rx.Observable["return"](d);else if(d.resolve){var f=a.injector.get(d.resolve);e=Rx.Observable["return"](f)}else d.require&&(e=a.observableRequire(d.require));else e=Rx.Observable["return"](void 0);return e["do"](function(a){return c.components[b].instance=a})},b.prototype.initializeComponent=function(b,c){var d=this;return b.take(1).selectMany(function(b){return null==b?Rx.Observable["return"](void 0):b.viewModel?Rx.Observable.combineLatest(d.loadComponentTemplate(b.template,c),d.loadComponentViewModel(b.viewModel,c),function(d,e){return a.isFunction(e)&&(e=new e(c)),{template:d,viewModel:e,preBindingInit:b.preBindingInit,postBindingInit:b.postBindingInit}}):d.loadComponentTemplate(b.template,c).select(function(a){return{template:a,preBindingInit:b.preBindingInit,postBindingInit:b.postBindingInit}})}).take(1)},b.prototype.loadComponentTemplate=function(b,c){var e,f;if(a.isFunction(b))return e=b(c),"string"==typeof e&&(e=a.app.templateEngine.parse(b(c))),Rx.Observable["return"](e);if("string"==typeof b)return e=a.app.templateEngine.parse(b),Rx.Observable["return"](e);if(Array.isArray(b))return Rx.Observable["return"](b);if("object"==typeof b){var g=b;if(g.resolve)return e=a.injector.get(g.resolve),Rx.Observable["return"](e);if(g.promise){var h=g.promise;return Rx.Observable.fromPromise(h)}if(g.require)return a.observableRequire(g.require).select(function(b){return a.app.templateEngine.parse(b)});if(g.element)return"string"==typeof g.element?(f=document.getElementById(g.element)||document.querySelector(g.element),e=null!=f?a.app.templateEngine.parse(f.innerHTML):[],Rx.Observable["return"](e)):(f=g.element,e=null!=f?a.app.templateEngine.parse(f.innerHTML):[],Rx.Observable["return"](e))}d.throwError("invalid template descriptor")},b.prototype.loadComponentViewModel=function(b,c){var e;if(a.isFunction(b))return Rx.Observable["return"](b);if(Array.isArray(b))return e=a.injector.resolve(b,c),Rx.Observable["return"](e);if("object"==typeof b){var f=b;if(f.resolve)return e=a.injector.get(f.resolve,c),Rx.Observable["return"](e);if(f.promise){var g=f.promise;return Rx.Observable.fromPromise(g)}if(f.require)return a.observableRequire(f.require);if(f.instance)return Rx.Observable["return"](f.instance)}d.throwError("invalid view-model descriptor")},b}(),f=function(b){function c(){b.call(this,"app"),this.defaultExceptionHandler=Rx.Observer.create(function(b){a.isInUnitTest()||a.log.error("An onError occurred on an object (usually a computedProperty) that would break a binding or command. To prevent this, subscribe to the thrownExceptions property of your objects: {0}",b)}),this.title=a.property(document.title),a.isInUnitTest()?this.history=createMockHistory():this.history=this.createHistory()}return __extends(c,b),Object.defineProperty(c.prototype,"mainThreadScheduler",{get:function(){return this._unitTestMainThreadScheduler||this._mainThreadScheduler||Rx.Scheduler.currentThread},set:function(b){a.isInUnitTest()?(this._unitTestMainThreadScheduler=b,this._mainThreadScheduler=this._mainThreadScheduler||b):this._mainThreadScheduler=b},enumerable:!0,configurable:!0}),Object.defineProperty(c.prototype,"templateEngine",{get:function(){return this._templateEngine||(this._templateEngine=a.injector.get(a.res.htmlTemplateEngine)),this._templateEngine},set:function(a){this._templateEngine=a},enumerable:!0,configurable:!0}),c.prototype.createHistory=function(){var a={back:window.history.back.bind(window.history),forward:window.history.forward.bind(window.history),pushState:window.history.pushState.bind(window.history),replaceState:window.history.replaceState.bind(window.history)};return Object.defineProperty(a,"length",{get:function(){return window.history.length},enumerable:!0,configurable:!0}),Object.defineProperty(a,"state",{get:function(){return window.history.state},enumerable:!0,configurable:!0}),Object.defineProperty(a,"location",{get:function(){return window.location},enumerable:!0,configurable:!0}),a.onPopState=Rx.Observable.fromEventPattern(function(a){return window.addEventListener("popstate",a)},function(a){return window.removeEventListener("popstate",a)}).publish().refCount(),a},c}(e);!function(a){a.moduleConstructor=e}(d=a.internal||(a.internal={})),a.app=new f;var g={app:{instance:a.app}};a.module=b,a.loadModule=c}(wx||(wx={}));var wx;!function(a){"use strict";function b(b,c){a.injector.get(a.res.domManager).applyBindings(b,c||window.document.documentElement)}function c(b){a.injector.get(a.res.domManager).cleanNode(b)}var d,e=function(){function b(b){this.expressionCache={},this.dataContextExtensions=a.createSet(),this.parserOptions={disallowFunctionCalls:!0},this.nodeState=a.createWeakMap(),this.compiler=b}return b.prototype.applyBindings=function(a,b){(void 0===b||1!==b.nodeType)&&d.throwError("first parameter should be your model, second parameter should be a DOM node!"),this.isNodeBound(b)&&d.throwError("an element must not be bound multiple times!");var c=this.getNodeState(b);c?c.model=a:(c=this.createNodeState(a),this.setNodeState(b,c));var e=this.getDataContext(b);this.applyBindingsRecursive(e,b)},b.prototype.applyBindingsToDescendants=function(a,b){if(b.hasChildNodes())for(var c=0;c<b.childNodes.length;c++){var d=b.childNodes[c];1===d.nodeType&&this.applyBindingsRecursive(a,d)}},b.prototype.cleanNode=function(a){1===a.nodeType&&this.cleanNodeRecursive(a)},b.prototype.cleanDescendants=function(a){if(a.hasChildNodes())for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];1===a.nodeType&&this.clearNodeState(c)}},b.prototype.getObjectLiteralTokens=function(a){return a=a.trim(),""!==a&&this.isObjectLiteralString(a)?this.compiler.parseObjectLiteral(a):[]},b.prototype.compileBindingOptions=function(b,c){if(b=b.trim(),""===b)return null;if(this.isObjectLiteralString(b)){for(var d,e={},f=this.compiler.parseObjectLiteral(b),g=0;g<f.length;g++)d=f[g],e[d.key]=this.compileBindingOptions(d.value,c);return e}var h=a.extend(this.parserOptions,{});return h.filters={},a.extend(a.app.filters(),h.filters),c&&a.extend(c.filters(),h.filters),this.compiler.compileExpression(b,h,this.expressionCache)},b.prototype.getModuleContext=function(b){for(var c;b;){if(c=this.getNodeState(b),null!=c&&null!=c.module)return c.module;b=b.parentNode}return a.app},b.prototype.registerDataContextExtension=function(a){this.dataContextExtensions.add(a)},b.prototype.getDataContext=function(a){for(var b=[],c=this.getNodeState(a),d=a;d;)c=null!=c?c:this.getNodeState(d),null!=c&&null!=c.model&&b.push(c.model),c=null,d=d.parentNode;var e;return e=b.length>0?{$data:b[0],$root:b[b.length-1],$parent:b.length>1?b[1]:null,$parents:b.slice(1)}:{$data:null,$root:null,$parent:null,$parents:[]},this.dataContextExtensions.forEach(function(b){return b(a,e)}),e},b.prototype.createNodeState=function(a,b){return{cleanup:new Rx.CompositeDisposable,model:a,module:b,isBound:!1}},b.prototype.isNodeBound=function(a){var b=this.nodeState.get(a);return b&&b.isBound},b.prototype.setNodeState=function(a,b){this.nodeState.set(a,b)},b.prototype.getNodeState=function(a){return this.nodeState.get(a)},b.prototype.clearNodeState=function(b){var c=this.nodeState.get(b);c&&(null!=c.cleanup&&(c.cleanup.dispose(),c.cleanup=void 0),null!=c.model&&(c.model=void 0),null!=c.module&&(c.module=void 0)),this.nodeState["delete"](b),a.env.cleanExternalData(b)},b.prototype.evaluateExpression=function(a,b){var c=this.createLocals(void 0,b),d=a(b.$data,c);return d},b.prototype.expressionToObservable=function(b,c,d){var e,f,g=this,h=a.createSet();try{e=this.createLocals(h,c),f=b(c.$data,e),d&&d.onNext(!0)}catch(i){return a.app.defaultExceptionHandler.onNext(i),Rx.Observable["return"](void 0)}if(0===h.size)return a.isRxObservable(f)?f:Rx.Observable["return"](f);var j=Rx.Observable.create(function(i){var j=Rx.Observable.defer(function(){return Rx.Observable.merge(a.setToArray(h)).take(1)}).repeat().subscribe(function(j){try{h.clear(),e=g.createLocals(h,c),f=b(c.$data,e),i.onNext(a.isRxObservable(f)?f:Rx.Observable["return"](f)),d&&d.onNext(!0)}catch(k){a.app.defaultExceptionHandler.onNext(k)}});return j}),k=a.isRxObservable(f)?f:Rx.Observable["return"](f);return j.startWith(k).concatAll()},b.prototype.applyBindingsInternal=function(c,e,f){var g=!1,h=this.getNodeState(e);h?h.isBound&&d.throwError("an element must not be bound multiple times!"):(h=this.createNodeState(),this.setNodeState(e,h));var i,j,k=e.tagName.toLowerCase();if(f.hasComponent(k)||a.app.hasComponent(k)){var l,m=e.getAttribute(b.paramsAttributename);l=m?"{ name: '"+k+"', params: {"+e.getAttribute(b.paramsAttributename)+"} }":"{ name: '"+k+"' }",i=[{key:"component",value:l}]}else i=this.getBindingDefinitions(e);if(null!=i&&i.length>0){var n=i.map(function(a){var b=f.binding(a.key);return b||d.throwError("binding '{0}' has not been registered.",a.key),{handler:b,value:a.value}});n.sort(function(a,b){return(b.handler.priority||0)-(a.handler.priority||0)});var o=n.filter(function(a){return a.handler.controlsDescendants}).map(function(a){return"'"+a.value+"'"});for(o.length>1&&d.throwError("bindings {0} are competing for descendants of target element!",o.join(", ")),g=o.length>0,j=0;j<n.length;j++){var p=n[j],q=p.handler;q.applyBinding(e,p.value,c,h,f)}}return h.isBound=!0,g},b.prototype.isObjectLiteralString=function(a){return"{"===a[0]&&"}"===a[a.length-1]},b.prototype.getBindingDefinitions=function(a){var c=null;if(1===a.nodeType){var d=a.getAttribute(b.bindingAttributeName);d&&(c=d)}return c&&(c=c.trim()),c?this.compiler.parseObjectLiteral(c):null},b.prototype.applyBindingsRecursive=function(a,b,c){if(c=c||this.getModuleContext(b),!this.applyBindingsInternal(a,b,c)&&b.hasChildNodes()){var d=this.getNodeState(b);d&&d.module&&(c=d.module);for(var e=0;e<b.childNodes.length;e++){var f=b.childNodes[e];1===f.nodeType&&this.applyBindingsRecursive(a,f,c)}}},b.prototype.cleanNodeRecursive=function(a){if(a.hasChildNodes())for(var b=a.childNodes.length,c=0;b>c;c++){var d=a.childNodes[c];1===a.nodeType&&this.cleanNodeRecursive(d)}this.clearNodeState(a)},b.prototype.createLocals=function(b,c){var d,e,f,g,h={},i={readFieldHook:function(c,d){var e=!1;if("@"===d[0]&&(e=!0,d=d.substring(1)),f=c[d],!e&&a.isProperty(f)){var g=f;b&&b.add(g.changed),f=g()}return f},writeFieldHook:function(c,d,e){if("@"===d[0]&&(d=d.substring(1)),g=c[d],a.isProperty(g)){var f=g;b&&b.add(f.changed),f(e)}else c[d]=e;return e},readIndexHook:function(c,e){if(a.queryInterface(c,a.IID.IObservableList)?(d=c,f=d.get(e),b&&b.add(d.listChanged)):f=c[e],a.queryInterface(f,a.IID.IObservableProperty)){var g=f;b&&b.add(g.changed),f=g()}return f},writeIndexHook:function(c,f,h){return a.queryInterface(c,a.IID.IObservableList)?(d=c,g=d.get(f),b&&b.add(d.listChanged),a.isProperty(g)?(e=g,b&&b.add(e.changed),e(h)):d.set(f,h)):a.isProperty(c[f])?(e=g[f],b&&b.add(e.changed),e(h)):c[f]=h,h}};this.compiler.setRuntimeHooks(h,i);for(var j=Object.keys(c),k=j.length,l=0;k>l;l++){var m=j[l];h[m]=c[m]}return h},b.bindingAttributeName="data-bind",b.paramsAttributename="params",b}();!function(a){a.domManagerConstructor=e}(d=a.internal||(a.internal={})),a.applyBindings=b,a.cleanNode=c}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a){this.priority=0,this.domManager=a}return c.prototype.applyBinding=function(c,d,e,f,g){function h(){p&&(p.dispose(),p=null)}function i(a){k.checked=a}var j=this;1!==c.nodeType&&b.throwError("checked-binding only operates on elements!"),null==d&&b.throwError("invalid binding-options!");var k=c,l=k.tagName.toLowerCase(),m="checkbox"===k.type,n="radio"===k.type;("input"!==l||!m&&!n)&&b.throwError("checked-binding only operates on checkboxes and radio-buttons");var o,p,q=this.domManager.compileBindingOptions(d,g);f.cleanup.add(this.domManager.expressionToObservable(q,e).subscribe(function(b){try{if(a.isProperty(b)){if(h(),p=new Rx.CompositeDisposable,o=b,p.add(o.changed.subscribe(function(a){i(a)})),i(o()),!o.source){var c=j.getCheckedEventObservables(k);p.add(Rx.Observable.merge(c).subscribe(function(a){o(k.checked)}))}}else i(b)}catch(d){a.app.defaultExceptionHandler.onNext(d)}})),f.cleanup.add(Rx.Disposable.create(function(){c=null,d=null,e=null,f=null,k=null,h()}))},c.prototype.configure=function(a){},c.prototype.getCheckedEventObservables=function(a){var b=[];return b.push(Rx.Observable.fromEvent(a,"click")),b.push(Rx.Observable.fromEvent(a,"change")),b},c}();!function(a){a.checkedBindingConstructor=c}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a){this.priority=0,this.domManager=a}return c.prototype.applyBinding=function(c,d,e,f,g){function h(){l&&(l.dispose(),l=null)}1!==c.nodeType&&b.throwError("command-binding only operates on elements!"),null==d&&b.throwError("invalid binding-options!");var i,j,k,l,m=this.domManager.compileBindingOptions(d,g),n=c,o="a"===n.tagName.toLowerCase();if("function"==typeof m)i=m,j=this.domManager.expressionToObservable(i,e);else{var p=m;i=p.command,j=this.domManager.expressionToObservable(i,e),p.parameter&&(i=p.parameter,k=this.domManager.expressionToObservable(i,e))}null==k&&(k=Rx.Observable["return"](void 0)),f.cleanup.add(Rx.Observable.combineLatest(j,k,function(a,b){return{cmd:a,param:b}}).subscribe(function(c){try{h(),l=new Rx.CompositeDisposable,null!=c.cmd&&(a.isCommand(c.cmd)||b.throwError("Command-Binding only supports binding to a command!"),n.disabled=!c.cmd.canExecute(c.param),l.add(c.cmd.canExecuteObservable.subscribe(function(a){n.disabled=!a})),l.add(Rx.Observable.fromEvent(n,"click").subscribe(function(a){c.cmd.execute(c.param),o&&"click"===a.type&&a.preventDefault()})))}catch(d){a.app.defaultExceptionHandler.onNext(d)}})),f.cleanup.add(Rx.Disposable.create(function(){c=null,d=null,e=null,f=null,n=null,h()}))},c.prototype.configure=function(a){},c}();!function(a){a.commandBindingConstructor=c}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a){this.priority=100,this.controlsDescendants=!0,this.domManager=a}return c.prototype.applyBinding=function(c,d,e,f,g){function h(){i&&(i.dispose(),i=null)}1!==c.nodeType&&b.throwError("module-binding only operates on elements!"),null==d&&b.throwError("invalid binding-options!");var i,j=c,k=this,l=this.domManager.compileBindingOptions(d,g),m=this.domManager.expressionToObservable(l,e),n=!0,o=new Array;f.cleanup.add(m.subscribe(function(c){try{h(),i=new Rx.CompositeDisposable;var d,l=a.unwrapProperty(c),m=void 0;if(l&&(l=l.trim(),d=l.split(" ").filter(function(a){return a})),d.length>0){var p=d.map(function(b){return a.loadModule(b)});m=Rx.Observable.combineLatest(p,function(b){return a.args2Array(arguments)}).subscribe(function(c){var h=(g||a.app).name+"+"+d.join("+"),i=new b.moduleConstructor(h);i.merge(g||a.app),c.forEach(function(a){return i.merge(a)}),k.applyValue(j,i,o,e,f,n),n=!1}),null!=m&&i.add(m)}}catch(q){a.app.defaultExceptionHandler.onNext(q)}})),f.cleanup.add(Rx.Disposable.create(function(){c=null,d=null,e=null,f=null,m=null,k=null}))},c.prototype.configure=function(a){},c.prototype.applyValue=function(a,b,c,d,e,f){var g;if(f)for(g=0;g<a.childNodes.length;g++)c.push(a.childNodes[g].cloneNode(!0));for(e.module=b,this.domManager.cleanDescendants(a);a.firstChild;)a.removeChild(a.firstChild);for(g=0;g<c.length;g++){var h=c[g].cloneNode(!0);a.appendChild(h)}this.domManager.applyBindingsToDescendants(d,a)},c}();!function(a){a.moduleBindingConstructor=c}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a){this.priority=30,this.controlsDescendants=!0,this.domManager=a}return c.prototype.applyBinding=function(c,d,e,f,g){function h(){l&&(l.dispose(),l=null)}var i=this;1!==c.nodeType&&b.throwError("component-binding only operates on elements!"),null==d&&b.throwError("invalid binding-options!");var j,k,l,m=c,n=this.domManager.compileBindingOptions(d,g),o=n,p={};"function"==typeof n?(j=n,k=this.domManager.expressionToObservable(j,e)):(k=this.domManager.expressionToObservable(o.name,e),o.params&&(a.isFunction(o.params)?p=this.domManager.evaluateExpression(o.params,e):"object"==typeof o.params?Object.keys(o.params).forEach(function(a){p[a]=i.domManager.evaluateExpression(o.params[a],e)}):b.throwError("invalid component-params")));for(var q=new Array;m.firstChild;)q.push(m.removeChild(m.firstChild));f.cleanup.add(k.subscribe(function(c){try{h(),l=new Rx.CompositeDisposable;var d=g.loadComponent(c,p),j=void 0;null==d&&b.throwError("component '{0}' is not registered with current module-context",c),j=d.subscribe(function(b){null!=j&&(j.dispose(),j=void 0),b.viewModel&&a.isDisposable(b.viewModel)&&l.add(b.viewModel),i.applyTemplate(b,m,e,f,b.template,b.viewModel)}),null!=j&&l.add(j)}catch(k){a.app.defaultExceptionHandler.onNext(k)}})),f.cleanup.add(Rx.Disposable.create(function(){c=null,d=null,e=null,f=null,q=null,n=null,h()}))},c.prototype.configure=function(a){},c.prototype.applyTemplate=function(a,b,c,d,e,f){for(;b.firstChild;)this.domManager.cleanNode(b.firstChild),b.removeChild(b.firstChild);for(var g=0;g<e.length;g++){var h=e[g].cloneNode(!0);b.appendChild(h)}f&&(d.model=f,c=this.domManager.getDataContext(b)),f&&a.preBindingInit&&f.hasOwnProperty(a.preBindingInit)&&f[a.preBindingInit].call(f,b),this.domManager.applyBindingsToDescendants(c,b),f&&a.postBindingInit&&f.hasOwnProperty(a.postBindingInit)&&f[a.postBindingInit].call(f,b)},c}();!function(a){a.componentBindingConstructor=c}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a){this.priority=0,this.domManager=a}return c.prototype.applyBinding=function(a,c,d,e,f){
var g=this;1!==a.nodeType&&b.throwError("event-binding only operates on elements!"),null==c&&b.throwError("invalid binding-options!");var h=a,i=this.domManager.getObjectLiteralTokens(c);i.forEach(function(a){g.wireEvent(h,a.value,a.key,d,e,f)}),e.cleanup.add(Rx.Disposable.create(function(){a=null,c=null,d=null,e=null,h=null}))},c.prototype.configure=function(a){},c.prototype.wireEvent=function(c,d,e,f,g,h){var i,j=this.domManager.compileBindingOptions(d,h),k=void 0,l=Rx.Observable.fromEvent(c,e);if("function"==typeof j){var m=this.domManager.evaluateExpression(j,f);if(m=a.unwrapProperty(m),a.isFunction(m))g.cleanup.add(l.subscribe(function(a){m.apply(f.$data,[f,a])}));else if(a.isCommand(m))i=m,g.cleanup.add(l.subscribe(function(a){i.execute(void 0)}));else{var n=m;g.cleanup.add(l.subscribe(n))}}else if("object"==typeof j){var o=j;i=this.domManager.evaluateExpression(o.command,f),i=a.unwrapProperty(i),j.hasOwnProperty("parameter")&&(k=this.domManager.evaluateExpression(o.parameter,f)),g.cleanup.add(l.subscribe(function(a){i.execute(k)}))}else b.throwError("invalid binding options")},c}();!function(a){a.eventBindingConstructor=c}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){var b;!function(a){"use strict";var b=function(){function a(a,b,c,d){if(this.childNodes=[],this.targetNode=a,this.insertCB=c,this.removeCB=d,b)for(var e=0;e<a.childNodes.length;e++)this.childNodes.push(a.childNodes[e])}return a.prototype.appendChilds=function(a,b){var c,d=a.length;for(a.length>1?Array.prototype.push.apply(this.childNodes,a):this.childNodes.push(a[0]),c=0;d>c;c++)this.targetNode.appendChild(a[c]);if(this.insertCB)for(c=0;d>c;c++)this.insertCB(a[c],b)},a.prototype.insertChilds=function(a,b,c){if(a===this.childNodes.length)this.appendChilds(b,c);else{var d,e=this.childNodes[a],f=b.length;for(Array.prototype.splice.apply(this.childNodes,[a,0].concat(b)),d=0;f>d;d++)this.targetNode.insertBefore(b[d],e);if(this.insertCB)for(d=0;f>d;d++)this.insertCB(b[d],c)}},a.prototype.removeChilds=function(a,b,c){var d;if(0===b)return[];var e=this.childNodes.slice(a,a+b);if(this.childNodes.splice(a,b),!c)for(var f=e.length,g=0;f>g;g++)d=e[g],this.removeCB&&this.removeCB(d),this.targetNode.removeChild(d);return e},a.prototype.clear=function(){for(var a,b=this.childNodes.length,c=0;b>c;c++)a=this.childNodes[c],this.removeCB&&this.removeCB(a),this.targetNode.removeChild(a);this.childNodes=[]},a}();a.VirtualChildNodes=b}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b=function(){function a(a,b){void 0===b&&(b=1),this.inner=a,this.refCount=b}return a.prototype.addRef=function(){this.refCount++},a.prototype.release=function(){return 0===--this.refCount&&(this.inner.dispose(),this.inner=null),this.refCount},a.prototype.dispose=function(){this.release()},a}();a.RefCountDisposeWrapper=b}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a){this.priority=40,this.controlsDescendants=!0,this.domManager=a,a.registerDataContextExtension(function(b,c){var d=a.getNodeState(b);c.$index=d.index})}return c.prototype.applyBinding=function(c,d,e,f,g){1!==c.nodeType&&b.throwError("forEach binding only operates on elements!"),null==d&&b.throwError("** invalid binding options!");var h,i,j,k=this.domManager.compileBindingOptions(d,g),l=c,m=this,n=!0,o=null,p={};if("object"==typeof k&&k.hasOwnProperty("data")){var q=k;i=q.data,q.itemEnter&&(p.itemEnter=this.domManager.evaluateExpression(q.itemEnter,e),"string"==typeof p.itemEnter&&(p.itemEnter=g.animation(p.itemEnter))),q.itemLeave&&(p.itemLeave=this.domManager.evaluateExpression(q.itemLeave,e),"string"==typeof p.itemLeave&&(p.itemLeave=g.animation(p.itemLeave))),q.hooks&&(h=this.domManager.evaluateExpression(q.hooks,e)),"string"==typeof h&&(h=a.injector.get(h)),q.debug&&q.debug.setProxyFunc&&(j=this.domManager.evaluateExpression(q.debug.setProxyFunc,e))}else i=k;var r=this.domManager.expressionToObservable(i,e);f.cleanup.add(Rx.Disposable.create(function(){o&&(o.dispose(),o=null)}));var s=new Array;f.cleanup.add(r.subscribe(function(b){try{o&&o.dispose(),o=new Rx.CompositeDisposable,m.applyValue(l,b,h,p,s,e,n,o,j),n=!1}catch(c){a.app.defaultExceptionHandler.onNext(c)}})),f.cleanup.add(Rx.Disposable.create(function(){c=null,d=null,e=null,f=null,r=null,l=null,m=null,s=null,h=null}))},c.prototype.configure=function(a){},c.prototype.createIndexPropertyForNode=function(a,b,c,d,e){return Rx.Observable.defer(function(){return Rx.Observable.create(function(c){return d.subscribe(function(d){var f=a.childNodes.indexOf(b);f/=e,c.onNext(f)})})}).toProperty(c)},c.prototype.appendAllRows=function(a,b,c,d,e,f,g,h){for(var i=b.length(),j=0;i>j;j++)this.appendRow(a,j,b.get(j),c,d,e,f,g,h)},c.prototype.appendRow=function(b,c,d,e,f,g,h,i,j){var k=a.cloneNodeArray(f),l=c,m=h.itemEnter,n={item:d};if(i&&(l=this.createIndexPropertyForNode(b,k[0],c,i,f.length),n.indexDisp=new a.RefCountDisposeWrapper(l,0)),n.index=l,null!=m&&m.prepare(k),b.appendChilds(k,n),g&&(g.afterRender&&g.afterRender(k,d),!j&&g.afterAdd&&g.afterAdd(k,d,c)),m)var o=m.run(k).continueWith(function(){return m.complete(k)}).subscribe(function(a){null!=o&&o.dispose()})},c.prototype.insertRow=function(b,c,d,e,f,g,h,i){var j=f.length,k=h.itemEnter,l=a.cloneNodeArray(f),m=this.createIndexPropertyForNode(b,l[0],c,i,f.length);if(null!=k&&k.prepare(l),b.insertChilds(c*j,l,{index:m,item:d,indexDisp:new a.RefCountDisposeWrapper(m,0)}),g&&(g.afterRender&&g.afterRender(l,d),g.afterAdd&&g.afterAdd(l,d,c)),k)var n=k.run(l).continueWith(function(){return k.complete(l)}).subscribe(function(a){null!=n&&n.dispose()})},c.prototype.removeRow=function(a,b,c,d,e,f){function g(){for(var a=0;h>a;a++)i.removeChild(j[a])}var h=d.length,i=a.targetNode,j=a.removeChilds(b*h,h,!0),k=f.itemLeave;if(e&&e.beforeRemove)e.beforeRemove(j,c,b);else if(null!=k){k.prepare(j);var l=k.run(j).continueWith(function(){return k.complete(j)}).continueWith(g).subscribe(function(a){null!=l&&l.dispose()})}else g()},c.prototype.moveRow=function(b,c,d,e,f,g,h,i){function j(){for(var a=0;m>a;a++)n.removeChild(o[a])}function k(){o=a.cloneNodeArray(f);var h=s.createIndexPropertyForNode(b,o[0],c,i,f.length);null!=q&&q.prepare(o),b.insertChilds(m*d,o,{index:h,item:e,indexDisp:new a.RefCountDisposeWrapper(h,0)}),g&&g.afterMove&&g.afterMove(o,e,c)}var l,m=f.length,n=b.targetNode,o=b.removeChilds(c*m,m,!0),p=h.itemLeave,q=h.itemEnter,r=[],s=this;g&&g.beforeMove&&g.beforeMove(o,e,c),p?(p.prepare(o),l=p.run(o).continueWith(function(){return p.complete(o)}).continueWith(j)):l=Rx.Observable.startDeferred(j),r.push(l),l=Rx.Observable.startDeferred(k),q&&(l=l.continueWith(q.run(o)).continueWith(function(){return q.complete(o)})),r.push(l),r.length>1?l=Rx.Observable.combineLatest(r,a.noop).take(1):1===r.length&&(l=r[0].take(1));var t=l.subscribe(function(a){null!=t&&t.dispose()})},c.prototype.rebindRow=function(b,c,d,e,f){for(var g=e.length,h=this.createIndexPropertyForNode(b,b.childNodes[c*g],c,f,e.length),i=new a.RefCountDisposeWrapper(h,0),j=0;j<e.length;j++){var k=b.childNodes[c*g+j];if(1===k.nodeType){this.domManager.cleanNode(k);var l=this.domManager.createNodeState(d);l.index=h,i.addRef(),l.cleanup.add(i),this.domManager.setNodeState(k,l),this.domManager.applyBindings(d,k)}}},c.prototype.observeList=function(a,b,c,d,e,f,g,h){var i,j,k=this;d.add(h),this.appendAllRows(a,e,b,c,f,g,h,!0),d.add(e.itemsAdded.subscribe(function(d){if(j=d.items.length,d.from===e.length())for(i=0;j>i;i++)k.appendRow(a,i+d.from,d.items[i],b,c,f,g,h,!1);else for(i=0;i<d.items.length;i++)k.insertRow(a,i+d.from,d.items[i],b,c,f,g,h);h.onNext(!0)})),d.add(e.itemsRemoved.subscribe(function(b){for(j=b.items.length,i=0;j>i;i++)k.removeRow(a,i+b.from,b.items[i],c,f,g);h.onNext(!0)})),d.add(e.itemsMoved.subscribe(function(b){k.moveRow(a,b.from,b.to,b.items[0],c,f,g,h),h.onNext(!0)})),d.add(e.itemReplaced.subscribe(function(b){k.rebindRow(a,b.from,b.items[0],c,h),h.onNext(!0)})),d.add(e.shouldReset.subscribe(function(d){a.clear(),k.appendAllRows(a,e,b,c,f,g,h,!1),h.onNext(!0)}))},c.prototype.applyValue=function(c,d,e,f,g,h,i,j,k){function l(a,b){var c=b.item,d=b.index,e=b.indexDisp;if(1===a.nodeType){var f=r.domManager.getNodeState(a)||r.domManager.createNodeState();f.model=c,f.index=d,r.domManager.setNodeState(a,f),null!=q&&null!=e&&(e.addRef(),f.cleanup.add(e)),r.domManager.applyBindings(c,a)}}function m(a){1===a.nodeType&&r.domManager.cleanNode(a)}var n,o;if(i)for(o=c.childNodes.length,n=0;o>n;n++)g.push(c.childNodes[n].cloneNode(!0));for(;c.firstChild;)c.removeChild(c.firstChild);if(0!==g.length){var p,q,r=this;if(p=new b.VirtualChildNodes(c,!1,l,m),k&&k(p),j.add(Rx.Disposable.create(function(){p=null})),Array.isArray(d)){var s=d;for(o=s.length,n=0;o>n;n++)this.appendRow(p,n,s[n],h,g,e,f,void 0,!0)}else if(a.isList(d)){var t=d;q=new Rx.Subject,this.observeList(p,h,g,j,t,e,f,q)}}},c}();!function(a){a.forEachBindingConstructor=c}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a){this.priority=-1,this.domManager=a}return c.prototype.applyBinding=function(c,d,e,f,g){function h(){m&&(m.dispose(),m=null)}function i(a){var b=o.ownerDocument;if("activeElement"in b){var c;try{c=b.activeElement}catch(d){c=b.body}a=c===o}l(a)}function j(a){a?0===q&&"none"!==o.style.display?o.focus():Rx.Observable.timer(q).subscribe(function(){o.focus()}):o.blur()}var k=this;1!==c.nodeType&&b.throwError("hasFocus-binding only operates on elements!"),null==d&&b.throwError("invalid binding-options!");var l,m,n,o=c,p=this.domManager.compileBindingOptions(d,g),q=0;if("object"==typeof p&&p.hasOwnProperty("property")){var r=p;n=r.property,q=this.domManager.evaluateExpression(r.delay,e),"boolean"==typeof q&&(q=q?1:0)}else n=p;f.cleanup.add(this.domManager.expressionToObservable(n,e).subscribe(function(b){try{a.isProperty(b)?(h(),m=new Rx.CompositeDisposable,l=b,m.add(l.changed.subscribe(function(a){j(a)})),j(l()),l.source||m.add(Rx.Observable.merge(k.getFocusEventObservables(o)).subscribe(function(a){i(a)}))):j(b)}catch(c){a.app.defaultExceptionHandler.onNext(c)}})),f.cleanup.add(Rx.Disposable.create(function(){c=null,d=null,e=null,f=null,o=null,h()}))},c.prototype.configure=function(a){},c.prototype.getFocusEventObservables=function(a){var b=[];return b.push(Rx.Observable.fromEvent(a,"focus").select(function(a){return!0})),b.push(Rx.Observable.fromEvent(a,"focusin").select(function(a){return!0})),b.push(Rx.Observable.fromEvent(a,"blur").select(function(a){return!1})),b.push(Rx.Observable.fromEvent(a,"focusout").select(function(a){return!1})),b},c}();!function(a){a.hasFocusBindingConstructor=c}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a){this.priority=50,this.controlsDescendants=!0,this.inverse=!1,this.domManager=a}return c.prototype.applyBinding=function(c,d,e,f,g){function h(){j&&(j.dispose(),j=null)}1!==c.nodeType&&b.throwError("if-binding only operates on elements!"),null==d&&b.throwError("invalid binding-options!");var i,j,k=this.domManager.compileBindingOptions(d,g),l=c,m=this,n=!0,o={};if("object"==typeof k){var p=k;i=p.condition,p.enter&&(o.enter=this.domManager.evaluateExpression(p.enter,e),"string"==typeof o.enter&&(o.enter=g.animation(o.enter))),p.leave&&(o.leave=this.domManager.evaluateExpression(p.leave,e),"string"==typeof o.leave&&(o.leave=g.animation(o.leave)))}else i=k;var q=this.domManager.expressionToObservable(i,e),r=new Array;f.cleanup.add(q.subscribe(function(b){try{h(),j=new Rx.CompositeDisposable,j.add(m.applyValue(l,a.unwrapProperty(b),r,e,o,n)),n=!1}catch(c){a.app.defaultExceptionHandler.onNext(c)}})),f.cleanup.add(Rx.Disposable.create(function(){c=null,d=null,e=null,f=null,q=null,l=null,m=null,r=null}))},c.prototype.configure=function(a){},c.prototype.applyValue=function(b,c,d,e,f,g){function h(){n.forEach(function(a){l.domManager.cleanNode(a),b.removeChild(a)})}var i,j=f.leave,k=f.enter,l=this,m=void 0;if(g){for(i=0;i<b.childNodes.length;i++)d.push(b.childNodes[i].cloneNode(!0));for(;b.firstChild;)b.removeChild(b.firstChild)}var n=a.nodeChildrenToArray(b);if(c=this.inverse?!c:c){var o=d.map(function(a){return a.cloneNode(!0)});for(k&&k.prepare(o),i=0;i<d.length;i++)b.appendChild(o[i]);this.domManager.applyBindingsToDescendants(e,b),k&&(m=k.run(o).continueWith(function(){return k.complete(o)}))}else n.length>0&&(j?(j.prepare(n),m=j.run(n).continueWith(function(){return j.complete(n)}).continueWith(h)):h());return m?m.subscribe()||Rx.Disposable.empty:Rx.Disposable.empty},c}(),d=function(a){function b(b){a.call(this,b),this.inverse=!0}return __extends(b,a),b}(c);!function(a){a.ifBindingConstructor=c,a.notifBindingConstructor=d}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c={8:"backspace",9:"tab",13:"enter",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"delete"},d=function(){function d(a){this.priority=0,this.domManager=a}return d.prototype.applyBinding=function(a,c,d,e,f){var g=this;1!==a.nodeType&&b.throwError("keyPress-binding only operates on elements!"),null==c&&b.throwError("invalid binding-options!");var h=a,i=this.domManager.getObjectLiteralTokens(c),j=Rx.Observable.fromEvent(h,"keydown").where(function(a){return!a.repeat}).publish().refCount();i.forEach(function(a){var b,c=a.key,h=[];c.split(" ").forEach(function(a){b={expression:c,keys:{}},a.split("-").forEach(function(a){b.keys[a.trim()]=!0}),h.push(b)}),g.wireKey(a.value,j,h,d,e,f)}),e.cleanup.add(Rx.Disposable.create(function(){a=null,c=null,d=null,e=null,h=null}))},d.prototype.configure=function(a){},d.prototype.testCombination=function(a,b){var d=!(!b.metaKey||b.ctrlKey),e=!!b.altKey,f=!!b.ctrlKey,g=!!b.shiftKey,h=b.keyCode,i=!!a.keys.meta,j=!!a.keys.alt,k=!!a.keys.ctrl,l=!!a.keys.shift;(!g||l)&&h>=65&&90>=h&&(h+=32);var m=a.keys[c[h]]||a.keys[h.toString()]||a.keys[String.fromCharCode(h)];return m&&i===d&&j===e&&k===f&&l===g},d.prototype.testCombinations=function(a,b){for(var c=0;c<a.length;c++)if(this.testCombination(a[c],b))return!0;return!1},d.prototype.wireKey=function(c,d,e,f,g,h){var i,j=this,k=this.domManager.compileBindingOptions(c,h),l=void 0;if("function"==typeof k){var m=this.domManager.evaluateExpression(k,f);m=a.unwrapProperty(m),a.isCommand(m)?(i=m,g.cleanup.add(d.where(function(a){return j.testCombinations(e,a)}).subscribe(function(a){i.execute(void 0),a.preventDefault()}))):g.cleanup.add(d.where(function(a){return j.testCombinations(e,a)}).subscribe(function(a){m.apply(f.$data,[f]),a.preventDefault()}))}else"object"==typeof k?(i=this.domManager.evaluateExpression(k.command,f),i=a.unwrapProperty(i),k.hasOwnProperty("parameter")&&(l=this.domManager.evaluateExpression(k.parameter,f)),g.cleanup.add(d.where(function(a){return j.testCombinations(e,a)}).subscribe(function(a){i.execute(l),a.preventDefault()}))):b.throwError("invalid binding options")},d}();!function(a){a.keyPressBindingConstructor=d}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a,b){void 0===b&&(b=!1),this.priority=0,this.supportsDynamicValues=!1,this.domManager=a,this.supportsDynamicValues=b}return c.prototype.applyBinding=function(a,c,d,e,f){1!==a.nodeType&&b.throwError("binding only operates on elements!");var g=this.domManager.compileBindingOptions(c,f);(null==g||"object"!=typeof g&&!this.supportsDynamicValues)&&b.throwError("invalid binding-options!");var h,i,j,k,l=a,m=new Array,n=Object.keys(g);if("function"==typeof g)i=g,h=this.domManager.expressionToObservable(i,d),m.push(["",h]);else for(j=0;j<n.length;j++){k=n[j];var o=g[k];i=o,h=this.domManager.expressionToObservable(i,d),m.push([k,h])}for(j=0;j<m.length;j++)k=m[j][0],h=m[j][1],this.subscribe(l,h,k,e);e.cleanup.add(Rx.Disposable.create(function(){a=null,c=null,d=null,e=null,l=null,n=null,m=null}))},c.prototype.configure=function(a){},c.prototype.subscribe=function(b,c,d,e){var f=this;e.cleanup.add(c.subscribe(function(c){try{f.applyValue(b,a.unwrapProperty(c),d)}catch(e){a.app.defaultExceptionHandler.onNext(e)}}))},c.prototype.applyValue=function(a,c,d){b.throwError("you need to override this method!")},c}(),d=function(b){function c(a){b.call(this,a,!0)}return __extends(c,b),c.prototype.applyValue=function(b,c,d){var e;if(""!==d)e=d.split(/\s+/).map(function(a){return a.trim()}).filter(function(a){return a}),e.length&&a.toggleCssClass.apply(null,[b,!!c].concat(e));else{var f=this.domManager.getNodeState(b);null!=f.cssBindingPreviousDynamicClasses&&(a.toggleCssClass.apply(null,[b,!1].concat(f.cssBindingPreviousDynamicClasses)),f.cssBindingPreviousDynamicClasses=null),c&&(e=c.split(/\s+/).map(function(a){return a.trim()}).filter(function(a){return a}),e.length&&(a.toggleCssClass.apply(null,[b,!0].concat(e)),f.cssBindingPreviousDynamicClasses=e))}},c}(c),e=function(a){function b(b){a.call(this,b),this.priority=5}return __extends(b,a),b.prototype.applyValue=function(a,b,c){var d=b===!1||null===b||void 0===b;d?a.removeAttribute(c):a.setAttribute(c,b.toString())},b}(c),f=function(a){function b(b){a.call(this,b)}return __extends(b,a),b.prototype.applyValue=function(a,b,c){(null===b||void 0===b||b===!1)&&(b=""),a.style[c]=b},b}(c);!function(a){a.cssBindingConstructor=d,a.attrBindingConstructor=e,a.styleBindingConstructor=f}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=new Array,d=function(){function c(a){this.domManager=a}return c.prototype.supports=function(b,c){return"input"===b.tagName.toLowerCase()&&"radio"===b.getAttribute("type")&&!a.isList(c)},c.prototype.observeElement=function(a){return Rx.Observable.merge(Rx.Observable.fromEvent(a,"click"),Rx.Observable.fromEvent(a,"change"))},c.prototype.observeModel=function(b){if(a.isProperty(b)){var c=b;return c.changed}return Rx.Observable.never()},c.prototype.updateElement=function(c,d){var e=c;e.checked=b.getNodeValue(e,this.domManager)==a.unwrapProperty(d)},c.prototype.updateModel=function(a,c,d){var e=a;e.checked&&c(b.getNodeValue(e,this.domManager))},c}(),e=function(){function c(a){this.domManager=a}return c.prototype.supports=function(b,c){return"select"===b.tagName.toLowerCase()&&!a.isList(c)},c.prototype.observeElement=function(a){return Rx.Observable.fromEvent(a,"change")},c.prototype.observeModel=function(b){if(a.isProperty(b)){var c=b;return c.changed}return Rx.Observable.never()},c.prototype.updateElement=function(c,d){var e=c,f=a.unwrapProperty(d),g=e.options.length;if(null==f)e.selectedIndex=-1;else for(var h=0;g>h;h++){var i=e.options[h];if(b.getNodeValue(i,this.domManager)==f){e.selectedIndex=h;break}}},c.prototype.updateModel=function(a,c,d){var e=a,f=-1!==e.selectedIndex?b.getNodeValue(e.options[e.selectedIndex],this.domManager):void 0;c(f)},c}(),f=function(){function f(a){this.priority=0,this.domManager=a,c.push(new d(a)),c.push(new e(a))}return f.prototype.applyBinding=function(d,e,f,g,h){function i(){k&&(k.dispose(),k=null)}1!==d.nodeType&&b.throwError("selectedValue-binding only operates on elements!"),null==e&&b.throwError("invalid binding-options!");var j,k,l=d,m=this.domManager.compileBindingOptions(e,h);g.cleanup.add(this.domManager.expressionToObservable(m,f).subscribe(function(d){try{i(),j=void 0;for(var e=0;e<c.length;e++)if(c[e].supports(l,d)){j=c[e];break}j||b.throwError("selectedValue-binding does not support this combination of bound element and model!"),k=new Rx.CompositeDisposable,j.updateElement(l,d),k.add(j.observeModel(d).subscribe(function(b){try{j.updateElement(l,d)}catch(c){a.app.defaultExceptionHandler.onNext(c)}})),a.isProperty(d)&&k.add(j.observeElement(l).subscribe(function(b){try{j.updateModel(l,d,b)}catch(b){a.app.defaultExceptionHandler.onNext(b)}}))}catch(f){a.app.defaultExceptionHandler.onNext(f)}})),g.cleanup.add(Rx.Disposable.create(function(){d=null,e=null,f=null,g=null,l=null,i()}))},f.prototype.configure=function(a){},f}();!function(a){a.selectedValueBindingConstructor=f}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a){this.priority=0,this.domManager=a}return c.prototype.applyBinding=function(c,d,e,f,g){1!==c.nodeType&&b.throwError("binding only operates on elements!"),null==d&&b.throwError("invalid binding-options!");var h=c,i=this,j=this.domManager.compileBindingOptions(d,g),k=this.domManager.expressionToObservable(j,e);f.cleanup.add(k.subscribe(function(b){try{i.applyValue(h,a.unwrapProperty(b))}catch(c){a.app.defaultExceptionHandler.onNext(c)}})),f.cleanup.add(Rx.Disposable.create(function(){c=null,d=null,e=null,f=null,h=null,k=null,i=null}))},c.prototype.configure=function(a){},c.prototype.applyValue=function(a,c){b.throwError("you need to override this method!")},c}(),d=function(a){function b(b){a.call(this,b)}return __extends(b,a),b.prototype.applyValue=function(a,b){(null===b||void 0===b)&&(b=""),a.textContent=b},b}(c),e=function(b){function c(a){b.call(this,a),this.inverse=!1,this.inverse=!1,this.priority=10}return __extends(c,b),c.prototype.configure=function(a){var b=a;c.useCssClass=b.useCssClass,c.hiddenClass=b.hiddenClass},c.prototype.applyValue=function(b,d){d=this.inverse?!d:d,c.useCssClass?a.toggleCssClass(b,!d,c.hiddenClass):d?b.style.display="":b.style.display="none"},c}(c),f=function(a){function b(b){a.call(this,b),this.inverse=!0}return __extends(b,a),b}(e),g=function(a){function b(b){a.call(this,b)}return __extends(b,a),b.prototype.applyValue=function(a,b){(null===b||void 0===b)&&(b=""),a.innerHTML=b},b}(c),h=function(a){function b(b){a.call(this,b),this.inverse=!1,this.inverse=!1}return __extends(b,a),b.prototype.applyValue=function(a,b){b=this.inverse?!b:b,a.disabled=b},b}(c),i=function(a){function b(b){a.call(this,b),this.inverse=!0}return __extends(b,a),b}(h);!function(a){a.textBindingConstructor=d,a.htmlBindingConstructor=g,a.visibleBindingConstructor=e,a.hiddenBindingConstructor=f,a.disableBindingConstructor=h,a.enableBindingConstructor=i}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a){this.priority=0,this.domManager=a}return c.prototype.applyBinding=function(c,d,e,f,g){function h(a){(null===a||void 0===a)&&(a=""),k.value!==a&&(q=a,k.value=a)}function i(){o&&(o.dispose(),o=null),p&&(p.dispose(),p=null)}var j=this;1!==c.nodeType&&b.throwError("textInput-binding only operates on elements!"),null==d&&b.throwError("invalid binding-options!");var k=c,l=k.tagName.toLowerCase(),m="textarea"===l;"input"!==l&&"textarea"!==l&&b.throwError("textInput-binding can only be applied to input or textarea elements");var n,o,p,q,r=this.domManager.compileBindingOptions(d,g);f.cleanup.add(this.domManager.expressionToObservable(r,e).subscribe(function(b){try{if(a.isProperty(b)){if(i(),n=b,o=n.changed.subscribe(function(a){h(a)}),h(n()),!n.source){var c=j.getTextInputEventObservables(k,m);p=Rx.Observable.merge(c).subscribe(function(a){n(k.value)})}}else h(b)}catch(d){a.app.defaultExceptionHandler.onNext(d)}})),f.cleanup.add(Rx.Disposable.create(function(){c=null,d=null,e=null,f=null,k=null,i()}))},c.prototype.configure=function(a){},c.prototype.getTextInputEventObservables=function(b,c){var d=[];return a.env.ie&&a.env.ie.version<10?a.env.ie.version<=9&&(d.push(a.env.ie.getSelectionChangeObservable(b).where(function(a){return a.activeElement===b})),d.push(Rx.Observable.fromEvent(b,"dragend")),d.push(Rx.Observable.fromEvent(b,"input")),d.push(Rx.Observable.fromEvent(b,"propertychange").where(function(a){return"value"===a.propertyName}))):(d.push(Rx.Observable.fromEvent(b,"input")),a.env.safari&&a.env.safari.version<5&&c?(d.push(Rx.Observable.fromEvent(b,"keydown")),d.push(Rx.Observable.fromEvent(b,"paste")),d.push(Rx.Observable.fromEvent(b,"cut"))):a.env.opera&&a.env.opera.version<11?d.push(Rx.Observable.fromEvent(b,"keydown")):a.env.firefox&&a.env.firefox.version<4&&(d.push(Rx.Observable.fromEvent(b,"DOMAutoComplete")),d.push(Rx.Observable.fromEvent(b,"dragdrop")),d.push(Rx.Observable.fromEvent(b,"drop")))),d.push(Rx.Observable.fromEvent(b,"change")),d},c}();!function(a){a.textInputBindingConstructor=c}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a){this.priority=5,this.domManager=a}return c.prototype.applyBinding=function(c,d,e,f,g){function h(){n&&(n.dispose(),n=null)}function i(a,c){o?b.setNodeValue(k,c,a):((null===c||void 0===c)&&(c=""),k.value=c)}var j=this;1!==c.nodeType&&b.throwError("value-binding only operates on elements!"),null==d&&b.throwError("invalid binding-options!");var k=c,l=k.tagName.toLowerCase();"input"!==l&&"option"!==l&&"select"!==l&&"textarea"!==l&&b.throwError("value-binding only operates on checkboxes and radio-buttons");var m,n,o="input"===l&&"radio"===k.type||"option"===l,p=this.domManager.compileBindingOptions(d,g);f.cleanup.add(this.domManager.expressionToObservable(p,e).subscribe(function(c){try{a.isProperty(c)?(h(),n=new Rx.CompositeDisposable,m=c,n.add(m.changed.subscribe(function(a){i(j.domManager,a)})),i(j.domManager,m()),m.source||n.add(Rx.Observable.fromEvent(k,"change").subscribe(function(a){m(o?b.getNodeValue(k,j.domManager):k.value)}))):i(j.domManager,c)}catch(d){a.app.defaultExceptionHandler.onNext(d)}})),f.cleanup.add(Rx.Disposable.create(function(){c=null,d=null,e=null,f=null,k=null,h()}))},c.prototype.configure=function(a){},c}();!function(b){function c(b,c){var d=c.getNodeState(b);return null!=d&&d[a.res.hasValueBindingValue]?d[a.res.valueBindingValue]:b.value}function d(b,c,d){(null===c||void 0===c)&&(c="");var e=d.getNodeState(b);"string"==typeof c?b.value!==c&&(b.value=c,null!=e&&e[a.res.hasValueBindingValue]&&(e[a.res.hasValueBindingValue]=!1,e[a.res.valueBindingValue]=void 0)):(null==e&&(e=this.createNodeState(),this.setNodeState(b,e)),e[a.res.valueBindingValue]=c,e[a.res.hasValueBindingValue]=!0)}b.getNodeValue=c,b.setNodeValue=d}(b=a.internal||(a.internal={}));var b;!function(a){a.valueBindingConstructor=c}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a){this.priority=50,this.controlsDescendants=!0,this.domManager=a}return c.prototype.applyBinding=function(c,d,e,f,g){1!==c.nodeType&&b.throwError("with-binding only operates on elements!"),null==d&&b.throwError("invalid binding-options!");var h=c,i=this,j=this.domManager.compileBindingOptions(d,g),k=this.domManager.expressionToObservable(j,e);f.cleanup.add(k.subscribe(function(b){try{i.applyValue(h,a.unwrapProperty(b),f)}catch(c){a.app.defaultExceptionHandler.onNext(c)}})),f.cleanup.add(Rx.Disposable.create(function(){c=null,d=null,e=null,f=null,k=null,h=null,i=null}))},c.prototype.configure=function(a){},c.prototype.applyValue=function(a,b,c){c.model=b;var d=this.domManager.getDataContext(a);this.domManager.cleanDescendants(a),this.domManager.applyBindingsToDescendants(d,a)},c}();!function(a){a.withBindingConstructor=c}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b=function(){function a(a){this.createValue=a}return Object.defineProperty(a.prototype,"value",{get:function(){return this.isValueCreated||(this.createdValue=this.createValue(),this.isValueCreated=!0),this.createdValue},enumerable:!0,configurable:!0}),a}();a.Lazy=b}(wx||(wx={}));var wx;!function(a){var b;!function(b){"use strict";function c(b,c,e){var f=new d(b,c,e),g=a.extend(f,new Rx.Subject,!0);return g}var d=function(){function b(a,b,c){this._observerRefCount=0,this._defaultObserverSub=Rx.Disposable.empty,this._scheduler=a,this._defaultObserver=b,this._subject=c||new Rx.Subject,null!=b&&(this._defaultObserverSub=this._subject.observeOn(this._scheduler).subscribe(this._defaultObserver))}return b.prototype.dispose=function(){a.isDisposable(this._subject)&&this._subject.dispose()},b.prototype.onCompleted=function(){this._subject.onCompleted()},b.prototype.onError=function(a){this._subject.onError(a)},b.prototype.onNext=function(a){this._subject.onNext(a)},b.prototype.subscribe=function(a){var b=this;return this._defaultObserverSub&&this._defaultObserverSub.dispose(),this._observerRefCount++,new Rx.CompositeDisposable(this._subject.observeOn(this._scheduler).subscribe(a),Rx.Disposable.create(function(){--b._observerRefCount<=0&&null!=b._defaultObserver&&(b._defaultObserverSub=b._subject.observeOn(b._scheduler).subscribe(b._defaultObserver))}))},b}();b.createScheduledSubject=c}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b=Rx.Observable;b.prototype.toProperty=function(b,c){c=c||Rx.Scheduler.currentThread;var d=function(b){return arguments.length>0&&a.internal.throwError("attempt to write to a read-only observable property"),null==d.sub&&(d.sub=d._source.connect()),d.value};d.queryInterface=function(b){return b===a.IID.IUnknown||b===a.IID.IObservableProperty||b===a.IID.IDisposable?!0:!1},d.dispose=function(){d.sub&&(d.sub.dispose(),d.sub=null)},d.value=b,d.changedSubject=new Rx.Subject,d.changed=d.changedSubject.publish().refCount(),d.changingSubject=new Rx.Subject,d.changing=d.changingSubject.publish().refCount(),d.source=this,d.thrownExceptions=a.internal.createScheduledSubject(c,a.app.defaultExceptionHandler);var e=!1;return d.sub=this.distinctUntilChanged().subscribe(function(a){e&&a===d.value||(e=!0,d.changingSubject.onNext(a),d.value=a,d.changedSubject.onNext(a))},function(a){return d.thrownExceptions.onNext(a)}),d},b.prototype.continueWith=function(){var b=a.args2Array(arguments),c=b.shift(),d=void 0;if(a.isRxObservable(c))d=c;else if(a.isFunction(c)){var e=c;d=Rx.Observable.startDeferred(e)}return this.selectMany(function(a){return d})},b.startDeferred=function(a){return Rx.Observable.defer(function(){return Rx.Observable.create(function(b){var c=!1;return c||a(),b.onNext(void 0),b.onCompleted(),Rx.Disposable.create(function(){return c=!0})})})}}(wx||(wx={}));var wx;!function(a){var b;!function(b){"use strict";function c(){for(var a=[],b=0;b<arguments.length;b++)a[b-0]=arguments[b];try{console.log.apply(console,arguments)}catch(c){try{window.opera.postError.apply(window.opera,arguments)}catch(c){alert(Array.prototype.join.call(arguments," "))}}}function d(b){for(var d=[],e=1;e<arguments.length;e++)d[e-1]=arguments[e];d.length&&(b=a.formatString.apply(null,[b].concat(d))),c("**** WebRx Critical: "+b)}function e(b){for(var d=[],e=1;e<arguments.length;e++)d[e-1]=arguments[e];d.length&&(b=a.formatString.apply(null,[b].concat(d))),c("*** WebRx Error: "+b)}function f(b){for(var d=[],e=1;e<arguments.length;e++)d[e-1]=arguments[e];d.length&&(b=a.formatString.apply(null,[b].concat(d))),c("* WebRx Info: "+b)}b.critical=d,b.error=e,b.info=f}(b=a.log||(a.log={}))}(wx||(wx={}));var wx;!function(a){"use strict";function b(a,b,c){return void 0===b&&(b=.3),void 0===c&&(c=null),new d(a,b,c)}var c,d=function(){function b(a,b,c){void 0===b&&(b=.3),void 0===c&&(c=null),this.push=this.add,this.changeNotificationsSuppressed=0,this.propertyChangeWatchers=null,this.resetChangeThreshold=0,this.resetSubCount=0,this.hasWhinedAboutNoResetSub=!1,this.setupRx(a,b,c)}return b.prototype.queryInterface=function(b){return b===a.IID.IUnknown||b===a.IID.IDisposable||b===a.IID.IObservableList||b===a.IID.IReadOnlyList||b===a.IID.IList?!0:!1},b.prototype.dispose=function(){this.clearAllPropertyChangeWatchers()},Object.defineProperty(b.prototype,"isReadOnly",{get:function(){return!1},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"itemsAdded",{get:function(){return this._itemsAdded||(this._itemsAdded=this.itemsAddedSubject.value.asObservable()),this._itemsAdded},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"beforeItemsAdded",{get:function(){return this._beforeItemsAdded||(this._beforeItemsAdded=this.beforeItemsAddedSubject.value.asObservable()),this._beforeItemsAdded},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"itemsRemoved",{get:function(){return this._itemsRemoved||(this._itemsRemoved=this.itemsRemovedSubject.value.asObservable()),
this._itemsRemoved},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"beforeItemsRemoved",{get:function(){return this._beforeItemsRemoved||(this._beforeItemsRemoved=this.beforeItemsRemovedSubject.value.asObservable()),this._beforeItemsRemoved},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"itemReplaced",{get:function(){return this._itemReplaced||(this._itemReplaced=this.itemReplacedSubject.value.asObservable()),this._itemReplaced},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"beforeItemReplaced",{get:function(){return this._beforeItemReplaced||(this._beforeItemReplaced=this.beforeItemReplacedSubject.value.asObservable()),this._beforeItemReplaced},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"beforeItemsMoved",{get:function(){return this._beforeItemsMoved||(this._beforeItemsMoved=this.beforeItemsMovedSubject.value.asObservable()),this._beforeItemsMoved},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"itemsMoved",{get:function(){return this._itemsMoved||(this._itemsMoved=this.itemsMovedSubject.value.asObservable()),this._itemsMoved},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"lengthChanging",{get:function(){var a=this;return this._lengthChanging||(this._lengthChanging=this.listChanging.select(function(b){return a.inner.length}).distinctUntilChanged()),this._lengthChanging},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"lengthChanged",{get:function(){var a=this;return this._lengthChanged||(this._lengthChanged=this.listChanged.select(function(b){return a.inner.length}).distinctUntilChanged()),this._lengthChanged},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"itemChanging",{get:function(){return this._itemChanging||(this._itemChanging=this.itemChangingSubject.value.asObservable()),this._itemChanging},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"itemChanged",{get:function(){return this._itemChanged||(this._itemChanged=this.itemChangedSubject.value.asObservable()),this._itemChanged},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"shouldReset",{get:function(){var a=this;return this.refcountSubscribers(this.listChanged.selectMany(function(a){return a?Rx.Observable["return"](null):Rx.Observable.empty()}),function(b){return a.resetSubCount+=b})},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"changeTrackingEnabled",{get:function(){return null!=this.propertyChangeWatchers},set:function(a){var b=this;null!=this.propertyChangeWatchers&&a||(null!=this.propertyChangeWatchers||a)&&(a?(this.propertyChangeWatchers={},this.inner.forEach(function(a){return b.addItemToPropertyTracking(a)})):(this.clearAllPropertyChangeWatchers(),this.propertyChangeWatchers=null))},enumerable:!0,configurable:!0}),b.prototype.addRange=function(b){var d=this;null==b&&c.throwError("items");var e=this.isLengthAboveResetThreshold(b.length)?this.suppressChangeNotifications():Rx.Disposable.empty;a.using(e,function(){d.areChangeNotificationsEnabled()?(d.beforeItemsAddedSubject.isValueCreated&&d.beforeItemsAddedSubject.value.onNext({items:b,from:d.inner.length}),Array.prototype.push.apply(d.inner,b),d.itemsAddedSubject.isValueCreated&&d.itemsAddedSubject.value.onNext({items:b,from:d.inner.length}),d.changeTrackingEnabled&&b.forEach(function(a){d.addItemToPropertyTracking(a)})):(Array.prototype.push.apply(d.inner,b),d.changeTrackingEnabled&&b.forEach(function(a){d.addItemToPropertyTracking(a)}))})},b.prototype.insertRange=function(b,d){var e=this;null==d&&c.throwError("collection"),b>this.inner.length&&c.throwError("index");var f=this.isLengthAboveResetThreshold(d.length)?this.suppressChangeNotifications():Rx.Disposable.empty;a.using(f,function(){e.areChangeNotificationsEnabled()?(e.beforeItemsAddedSubject.isValueCreated&&d.forEach(function(a){e.beforeItemsAddedSubject.value.onNext({items:d,from:b})}),Array.prototype.splice.apply(e.inner,[b,0].concat(d)),e.itemsAddedSubject.isValueCreated&&e.itemsAddedSubject.value.onNext({items:d,from:b}),e.changeTrackingEnabled&&d.forEach(function(a){e.addItemToPropertyTracking(a)})):(Array.prototype.splice.apply(e.inner,[b,0].concat(d)),e.changeTrackingEnabled&&d.forEach(function(a){e.addItemToPropertyTracking(a)}))})},b.prototype.removeAll=function(b){var d=this;null==b&&c.throwError("items");var e=this.isLengthAboveResetThreshold(b.length)?this.suppressChangeNotifications():Rx.Disposable.empty;a.using(e,function(){b.forEach(function(a){return d.remove(a)})})},b.prototype.removeRange=function(b,c){var d=this,e=this.isLengthAboveResetThreshold(c)?this.suppressChangeNotifications():Rx.Disposable.empty;a.using(e,function(){var a=d.inner.slice(b,b+c);d.areChangeNotificationsEnabled()?(d.beforeItemsRemovedSubject.isValueCreated&&a.forEach(function(c){d.beforeItemsRemovedSubject.value.onNext({items:a,from:b})}),d.inner.splice(b,c),d.changeTrackingEnabled&&a.forEach(function(a){d.removeItemFromPropertyTracking(a)}),d.itemsRemovedSubject.isValueCreated&&a.forEach(function(c){d.itemsRemovedSubject.value.onNext({items:a,from:b})})):(d.inner.splice(b,c),d.changeTrackingEnabled&&a.forEach(function(a){d.removeItemFromPropertyTracking(a)}))})},b.prototype.toArray=function(){return this.inner},b.prototype.reset=function(){this.publishResetNotification()},b.prototype.add=function(a){this.insertItem(this.inner.length,a)},b.prototype.clear=function(){this.clearItems()},b.prototype.contains=function(a){return-1!==this.inner.indexOf(a)},b.prototype.remove=function(a){var b=this.inner.indexOf(a);return-1===b?!1:(this.removeItem(b),!0)},b.prototype.indexOf=function(a){return this.inner.indexOf(a)},b.prototype.insert=function(a,b){this.insertItem(a,b)},b.prototype.removeAt=function(a){this.removeItem(a)},b.prototype.move=function(a,b){this.moveItem(a,b)},b.prototype.project=function(){var b=a.args2Array(arguments),c=b.shift();if(null!=c&&a.isRxObservable(c))return new e(this,void 0,void 0,void 0,c,b.shift());var d=b.shift();if(null!=d&&a.isRxObservable(d))return new e(this,c,void 0,void 0,d,b.shift());var f=b.shift();return null!=f&&a.isRxObservable(f)?new e(this,c,d,void 0,f,b.shift()):new e(this,c,d,f,b.shift(),b.shift())},b.prototype.suppressChangeNotifications=function(){var b=this;return this.changeNotificationsSuppressed++,this.hasWhinedAboutNoResetSub||0!==this.resetSubCount||a.isInUnitTest()||(a.log.info("suppressChangeNotifications was called (perhaps via addRange), yet you do not have a subscription to shouldReset. This probably isn't what you want, as itemsAdded and friends will appear to 'miss' items"),this.hasWhinedAboutNoResetSub=!0),Rx.Disposable.create(function(){b.changeNotificationsSuppressed--,0===b.changeNotificationsSuppressed&&(b.publishBeforeResetNotification(),b.publishResetNotification())})},b.prototype.get=function(a){return this.inner[a]},b.prototype.set=function(a,b){return this.areChangeNotificationsEnabled()?(this.beforeItemReplacedSubject.isValueCreated&&this.beforeItemReplacedSubject.value.onNext({from:a,items:[b]}),this.changeTrackingEnabled&&(this.removeItemFromPropertyTracking(this.inner[a]),this.addItemToPropertyTracking(b)),this.inner[a]=b,void(this.itemReplacedSubject.isValueCreated&&this.itemReplacedSubject.value.onNext({from:a,items:[b]}))):(this.changeTrackingEnabled&&(this.removeItemFromPropertyTracking(this.inner[a]),this.addItemToPropertyTracking(b)),void(this.inner[a]=b))},b.prototype.sort=function(a){this.publishBeforeResetNotification(),this.inner.sort(a),this.publishResetNotification()},b.prototype.forEach=function(a,b){this.inner.forEach(a,b)},b.prototype.map=function(a,b){return this.inner.map(a,b)},b.prototype.filter=function(a,b){return this.inner.filter(a,b)},b.prototype.some=function(a,b){return this.inner.some(a,b)},b.prototype.every=function(a,b){return this.inner.every(a,b)},b.prototype.setupRx=function(b,d,e){void 0===d&&(d=.3),void 0===e&&(e=null),e=e||a.app.mainThreadScheduler,this.resetChangeThreshold=d,void 0===this.inner&&(this.inner=new Array),this.beforeItemsAddedSubject=new a.Lazy(function(){return new Rx.Subject}),this.itemsAddedSubject=new a.Lazy(function(){return new Rx.Subject}),this.beforeItemsRemovedSubject=new a.Lazy(function(){return new Rx.Subject}),this.itemsRemovedSubject=new a.Lazy(function(){return new Rx.Subject}),this.beforeItemReplacedSubject=new a.Lazy(function(){return new Rx.Subject}),this.itemReplacedSubject=new a.Lazy(function(){return new Rx.Subject}),this.resetSubject=new Rx.Subject,this.beforeResetSubject=new Rx.Subject,this.itemChangingSubject=new a.Lazy(function(){return c.createScheduledSubject(e)}),this.itemChangedSubject=new a.Lazy(function(){return c.createScheduledSubject(e)}),this.beforeItemsMovedSubject=new a.Lazy(function(){return new Rx.Subject}),this.itemsMovedSubject=new a.Lazy(function(){return new Rx.Subject}),this.listChanged=Rx.Observable.merge(this.itemsAdded.select(function(a){return!1}),this.itemsRemoved.select(function(a){return!1}),this.itemReplaced.select(function(a){return!1}),this.itemsMoved.select(function(a){return!1}),this.resetSubject.select(function(a){return!0})).publish().refCount(),this.listChanging=Rx.Observable.merge(this.beforeItemsAdded.select(function(a){return!1}),this.beforeItemsRemoved.select(function(a){return!1}),this.beforeItemReplaced.select(function(a){return!1}),this.beforeItemsMoved.select(function(a){return!1}),this.beforeResetSubject.select(function(a){return!0})).publish().refCount(),b&&Array.prototype.splice.apply(this.inner,[0,0].concat(b)),this.length=this.lengthChanged.toProperty(this.inner.length),this.isEmpty=this.lengthChanged.select(function(a){return 0===a}).toProperty(0===this.inner.length)},b.prototype.areChangeNotificationsEnabled=function(){return 0===this.changeNotificationsSuppressed},b.prototype.insertItem=function(a,b){return this.areChangeNotificationsEnabled()?(this.beforeItemsAddedSubject.isValueCreated&&this.beforeItemsAddedSubject.value.onNext({items:[b],from:a}),this.inner.splice(a,0,b),this.itemsAddedSubject.isValueCreated&&this.itemsAddedSubject.value.onNext({items:[b],from:a}),void(this.changeTrackingEnabled&&this.addItemToPropertyTracking(b))):(this.inner.splice(a,0,b),void(this.changeTrackingEnabled&&this.addItemToPropertyTracking(b)))},b.prototype.removeItem=function(a){var b=this.inner[a];return this.areChangeNotificationsEnabled()?(this.beforeItemsRemovedSubject.isValueCreated&&this.beforeItemsRemovedSubject.value.onNext({items:[b],from:a}),this.inner.splice(a,1),this.itemsRemovedSubject.isValueCreated&&this.itemsRemovedSubject.value.onNext({items:[b],from:a}),void(this.changeTrackingEnabled&&this.removeItemFromPropertyTracking(b))):(this.inner.splice(a,1),void(this.changeTrackingEnabled&&this.removeItemFromPropertyTracking(b)))},b.prototype.moveItem=function(a,b){var c=this.inner[a];if(!this.areChangeNotificationsEnabled())return this.inner.splice(a,1),void this.inner.splice(b,0,c);var d={items:[c],from:a,to:b};this.beforeItemsMovedSubject.isValueCreated&&this.beforeItemsMovedSubject.value.onNext(d),this.inner.splice(a,1),this.inner.splice(b,0,c),this.itemsMovedSubject.isValueCreated&&this.itemsMovedSubject.value.onNext(d)},b.prototype.clearItems=function(){return this.areChangeNotificationsEnabled()?(this.publishBeforeResetNotification(),this.inner.length=0,this.publishResetNotification(),void(this.changeTrackingEnabled&&this.clearAllPropertyChangeWatchers())):(this.inner.length=0,void(this.changeTrackingEnabled&&this.clearAllPropertyChangeWatchers()))},b.prototype.addItemToPropertyTracking=function(b){var d=this.propertyChangeWatchers[a.getOid(b)],e=this;if(d)return void d.addRef();var f=a.observeObject(b,!0).select(function(a){return new c.PropertyChangedEventArgs(b,a.propertyName)}),g=a.observeObject(b,!1).select(function(a){return new c.PropertyChangedEventArgs(b,a.propertyName)}),h=new Rx.CompositeDisposable(f.where(function(a){return e.areChangeNotificationsEnabled()}).subscribe(function(a){return e.itemChangingSubject.value.onNext(a)}),g.where(function(a){return e.areChangeNotificationsEnabled()}).subscribe(function(a){return e.itemChangedSubject.value.onNext(a)}));this.propertyChangeWatchers[a.getOid(b)]=new a.RefCountDisposeWrapper(Rx.Disposable.create(function(){h.dispose(),delete e.propertyChangeWatchers[a.getOid(b)]}))},b.prototype.removeItemFromPropertyTracking=function(b){var c=this.propertyChangeWatchers[a.getOid(b)];c&&c.release()},b.prototype.clearAllPropertyChangeWatchers=function(){var a=this;null!=this.propertyChangeWatchers&&(Object.keys(this.propertyChangeWatchers).forEach(function(b){a.propertyChangeWatchers[b].release()}),this.propertyChangeWatchers=null)},b.prototype.refcountSubscribers=function(a,b){return Rx.Observable.create(function(c){return b(1),new Rx.CompositeDisposable(a.subscribe(c),Rx.Disposable.create(function(){return b(-1)}))})},b.prototype.publishResetNotification=function(){this.resetSubject.onNext(!0)},b.prototype.publishBeforeResetNotification=function(){this.beforeResetSubject.onNext(!0)},b.prototype.isLengthAboveResetThreshold=function(a){return a/this.inner.length>this.resetChangeThreshold&&a>10},b}(),e=function(b){function d(a,c,d,e,f,g){b.call(this),this.readonlyExceptionMessage="Derived collections cannot be modified.",this.indexToSourceIndexMap=[],this.sourceCopy=[],this.disp=new Rx.CompositeDisposable,this.source=a,this.selector=e||function(a){return a},this._filter=c,this.orderer=d,this.refreshTrigger=f,this.scheduler=g||Rx.Scheduler.immediate,this.addAllItemsFromSourceCollection(),this.wireUpChangeNotifications()}return __extends(d,b),Object.defineProperty(d.prototype,"isReadOnly",{get:function(){return!0},enumerable:!0,configurable:!0}),d.prototype.set=function(a,b){c.throwError(this.readonlyExceptionMessage)},d.prototype.addRange=function(a){c.throwError(this.readonlyExceptionMessage)},d.prototype.insertRange=function(a,b){c.throwError(this.readonlyExceptionMessage)},d.prototype.removeAll=function(a){c.throwError(this.readonlyExceptionMessage)},d.prototype.removeRange=function(a,b){c.throwError(this.readonlyExceptionMessage)},d.prototype.add=function(a){c.throwError(this.readonlyExceptionMessage)},d.prototype.clear=function(){c.throwError(this.readonlyExceptionMessage)},d.prototype.remove=function(a){return void c.throwError(this.readonlyExceptionMessage)},d.prototype.insert=function(a,b){c.throwError(this.readonlyExceptionMessage)},d.prototype.removeAt=function(a){c.throwError(this.readonlyExceptionMessage)},d.prototype.move=function(a,b){c.throwError(this.readonlyExceptionMessage)},d.prototype.sort=function(a){c.throwError(this.readonlyExceptionMessage)},d.prototype.reset=function(){var c=this;a.using(b.prototype.suppressChangeNotifications.call(this),function(){b.prototype.clear.call(c),c.addAllItemsFromSourceCollection()})},d.prototype.dispose=function(){this.disp.dispose(),b.prototype.dispose.call(this)},d.prototype.referenceEquals=function(b,c){return a.getOid(b)===a.getOid(c)},d.prototype.refresh=function(){for(var a=this.sourceCopy.length,b=0;a>b;b++)this.onItemChanged(this.sourceCopy[b])},d.prototype.wireUpChangeNotifications=function(){var a=this;this.disp.add(this.source.itemsAdded.observeOn(this.scheduler).subscribe(function(b){a.onItemsAdded(b)})),this.disp.add(this.source.itemsRemoved.observeOn(this.scheduler).subscribe(function(b){a.onItemsRemoved(b)})),this.disp.add(this.source.itemsMoved.observeOn(this.scheduler).subscribe(function(b){a.onItemsMoved(b)})),this.disp.add(this.source.itemReplaced.observeOn(this.scheduler).subscribe(function(b){a.onItemsReplaced(b)})),this.disp.add(this.source.shouldReset.observeOn(this.scheduler).subscribe(function(b){a.reset()})),this.disp.add(this.source.itemChanged.select(function(a){return a.sender}).observeOn(this.scheduler).subscribe(function(b){return a.onItemChanged(b)})),null!=this.refreshTrigger&&this.disp.add(this.refreshTrigger.observeOn(this.scheduler).subscribe(function(b){return a.refresh()}))},d.prototype.onItemsAdded=function(a){this.shiftIndicesAtOrOverThreshold(a.from,a.items.length);for(var b=0;b<a.items.length;b++){var c=a.items[b];if(this.sourceCopy.splice(a.from+b,0,c),!this._filter||this._filter(c)){var d=this.selector(c);this.internalInsertAndMap(a.from+b,d)}}},d.prototype.onItemsRemoved=function(a){this.sourceCopy.splice(a.from,a.items.length);for(var b=0;b<a.items.length;b++){var c=this.getIndexFromSourceIndex(a.from+b);-1!==c&&this.internalRemoveAt(c)}var d=a.items.length;this.shiftIndicesAtOrOverThreshold(a.from+d,-d)},d.prototype.onItemsMoved=function(a){if(a.items.length>1&&c.throwError("Derived collections doesn't support multi-item moves"),a.from!==a.to){var e=a.from,f=a.to;this.sourceCopy.splice(e,1),this.sourceCopy.splice(f,0,a.items[0]);var g=this.getIndexFromSourceIndex(e);if(this.moveSourceIndexInMap(e,f),-1!==g)if(null==this.orderer){var h=d.newPositionForExistingItem2(this.indexToSourceIndexMap,f,g);h!==g?(this.indexToSourceIndexMap.splice(g,1),this.indexToSourceIndexMap.splice(h,0,f),b.prototype.move.call(this,g,h)):this.indexToSourceIndexMap[g]=f}else this.indexToSourceIndexMap[g]=f}},d.prototype.onItemsReplaced=function(a){for(var b=0;b<a.items.length;b++){var c=a.items[b];this.sourceCopy[a.from+b]=c,this.onItemChanged(c)}},d.prototype.onItemChanged=function(a){var c=this,d=this.indexOfAll(this.sourceCopy,a),e=!this._filter||this._filter(a);d.forEach(function(d){var f=c.getIndexFromSourceIndex(d),g=f>=0;if(g&&!e)c.internalRemoveAt(f);else if(!g&&e)c.internalInsertAndMap(d,c.selector(a));else if(g&&e){var h=c.selector(a);if(null==c.orderer)c.referenceEquals(h,c.get(f))||b.prototype.set.call(c,f,h);else if(c.canItemStayAtPosition(h,f))c.referenceEquals(h,c.get(f))||b.prototype.set.call(c,f,h);else if(c.referenceEquals(h,c.get(f))){var i=c.newPositionForExistingItem(d,f,h);c.indexToSourceIndexMap.splice(f,1),c.indexToSourceIndexMap.splice(i,0,d),b.prototype.move.call(c,f,i)}else c.internalRemoveAt(f),c.internalInsertAndMap(d,h)}})},d.prototype.canItemStayAtPosition=function(a,b){var c=b>0;if(c){var d=this.orderer(a,this[b-1])>=0;if(!d)return!1}var e=b<this.length()-1;if(e){var f=this.orderer(a,this[b+1])<=0;if(!f)return!1}return!0},d.prototype.getIndexFromSourceIndex=function(a){return this.indexToSourceIndexMap.indexOf(a)},d.prototype.indexOfAll=function(a,b){var c=this,d=[],e=0;return a.forEach(function(a){c.referenceEquals(a,b)&&d.push(e),e++}),d},d.prototype.moveSourceIndexInMap=function(a,b){b>a?this.shiftSourceIndicesInRange(a+1,b+1,-1):this.shiftSourceIndicesInRange(b,a,1)},d.prototype.shiftIndicesAtOrOverThreshold=function(a,b){for(var c=0;c<this.indexToSourceIndexMap.length;c++)this.indexToSourceIndexMap[c]>=a&&(this.indexToSourceIndexMap[c]+=b)},d.prototype.shiftSourceIndicesInRange=function(a,b,c){for(var d=0;d<this.indexToSourceIndexMap.length;d++){var e=this.indexToSourceIndexMap[d];e>=a&&b>e&&(this.indexToSourceIndexMap[d]+=c)}},d.prototype.addAllItemsFromSourceCollection=function(){var a=this,b=0;this.source.forEach(function(c){if(a.sourceCopy.push(c),!a._filter||a._filter(c)){var d=a.selector(c);a.internalInsertAndMap(b,d)}b++})},d.prototype.internalClear=function(){this.indexToSourceIndexMap=[],this.sourceCopy=[],b.prototype.clear.call(this)},d.prototype.internalInsertAndMap=function(a,c){var d=this.positionForNewItem(a,c);this.indexToSourceIndexMap.splice(d,0,a),b.prototype.insert.call(this,d,c)},d.prototype.internalRemoveAt=function(a){this.indexToSourceIndexMap.splice(a,1),b.prototype.removeAt.call(this,a)},d.prototype.positionForNewItem=function(a,b){return null==this.orderer?d.positionForNewItemArray(this.indexToSourceIndexMap,a,d.defaultOrderer):d.positionForNewItemArray2(this.inner,0,this.inner.length,b,this.orderer)},d.positionForNewItemArray=function(a,b,c){return d.positionForNewItemArray2(a,0,a.length,b,c)},d.positionForNewItemArray2=function(a,b,c,d,e){if(0===c)return b;if(1===c)return e(a[b],d)>=0?b:b+1;if(e(a[b],d)>=1)return b;for(var f,g=b,h=b+c-1;h>=g;){var i=Math.floor(g+(h-g)/2);if(f=e(a[i],d),0===f)return i;0>f?g=i+1:h=i-1}return g},d.prototype.newPositionForExistingItem=function(a,b,c){return null==this.orderer?d.newPositionForExistingItem2(this.indexToSourceIndexMap,a,b):d.newPositionForExistingItem2(this.inner,c,b,this.orderer)},d.newPositionForExistingItem2=function(a,b,c,e){if(1===a.length)return 0;var f=c-1,g=c+1,h=a[f>=0?f:g];null==e&&(e=d.defaultOrderer);var i=e(b,h),j=0,k=a.length;if(0===i)return c;if(i>0?j=g:k=f,j===a.length||0>k)return c;var l=d.positionForNewItemArray2(a,j,k-j,b,e);return l>=c?l-1:l},d.defaultOrderer=function(a,b){var c;return c=null==a&&null==b?0:null==a?-1:null==b?1:a-b},d}(d);!function(a){a.listConstructor=d}(c=a.internal||(a.internal={})),a.list=b}(wx||(wx={}));var wx;!function(a){"use strict";function b(a){return a||!d?new c:new Map}var c=function(){function a(){this.cacheSentinel={},this.keys=[],this.values=[],this.cache=this.cacheSentinel}return Object.defineProperty(a.prototype,"size",{get:function(){return this.keys.length},enumerable:!0,configurable:!0}),a.prototype.has=function(a){return a===this.cache?!0:this.find(a)>=0?(this.cache=a,!0):!1},a.prototype.get=function(a){var b=this.find(a);return b>=0?(this.cache=a,this.values[b]):void 0},a.prototype.set=function(a,b){return this["delete"](a),this.keys.push(a),this.values.push(b),this.cache=a,this},a.prototype["delete"]=function(a){var b=this.find(a);return b>=0?(this.keys.splice(b,1),this.values.splice(b,1),this.cache=this.cacheSentinel,!0):!1},a.prototype.clear=function(){this.keys.length=0,this.values.length=0,this.cache=this.cacheSentinel},a.prototype.forEach=function(a,b){for(var c=this.size,d=0;c>d;++d){var e=this.keys[d],f=this.values[d];this.cache=e,a.call(this,f,e,this)}},Object.defineProperty(a.prototype,"isEmulated",{get:function(){return!0},enumerable:!0,configurable:!0}),a.prototype.find=function(a){for(var b=this.keys,c=b.length,d=0;c>d;++d)if(b[d]===a)return d;return-1},a}(),d="function"==typeof Map&&Map.prototype.hasOwnProperty("forEach")&&Map.prototype.hasOwnProperty("add")&&Map.prototype.hasOwnProperty("clear")&&Map.prototype.hasOwnProperty("devare")&&Map.prototype.hasOwnProperty("has");a.createMap=b}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=0,d={},e=function(){function b(b){var d=this;this.template=function(a){return d.buildTemplate(a)},this.viewModel=function(b){var d=b,e=null!=d.groupName?d.groupName:a.formatString("wx-radiogroup-{0}",c++);return{items:b.items,selectedValue:b.selectedValue,groupName:e,hooks:{afterRender:b.afterRender}}},this.htmlTemplateEngine=b}return b.prototype.buildTemplate=function(b){var c,e,f=void 0;if(!b.noCache&&(f=(null!=b.itemText?b.itemText:"")+"-"+(null!=b.itemValue?b.itemValue:"")+"-"+(null!=b.itemClass?b.itemClass:"")+"-"+(null!=b.selectedValue?"true":"false"),e=d[f],null!=e))return e;c='<div class="wx-radiogroup" data-bind="{0}"><input type="radio" data-bind="{1}"/>{2}</div>';var g=[],h=[],i=[],j=[],k="";g.push({key:"foreach",value:"{ data: items, hooks: hooks }"}),h.length&&g.push({key:"attr",value:"{ "+h.map(function(a){return a.key+": "+a.value}).join(", ")+" }"}),i.push({key:"value",value:b.itemValue||"$data"}),j.push({key:"name",value:"$parent.groupName"}),b.selectedValue&&i.push({key:"selectedValue",value:"$parent.@selectedValue"}),b.itemText&&(k+=a.formatString('<label data-bind="text: {0}, attr: { for: {1} }"></label>',b.itemText,"$parent.groupName + '-' + $index"),j.push({key:"id",value:"$parent.groupName + '-' + $index"})),b.itemClass&&j.push({key:"class",value:"'"+b.itemClass+"'"}),j.length&&i.push({key:"attr",value:"{ "+j.map(function(a){return a.key+": "+a.value}).join(", ")+" }"});var l=g.map(function(a){return a.key+": "+a.value}).join(", "),m=i.map(function(a){return a.key+": "+a.value}).join(", ");return c=a.formatString(c,l,m,k),b.noCache||(d[f]=c),e=this.htmlTemplateEngine.parse(c)},b}();!function(a){a.radioGroupComponentConstructor=e}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c={},d=function(){function b(a){var b=this;this.template=function(a){return b.buildTemplate(a)},this.viewModel=function(a){var b=a;return{items:a.items,selectedValue:a.selectedValue,hooks:{afterRender:b.afterRender}}},this.htmlTemplateEngine=a}return b.prototype.buildTemplate=function(b){var d,e,f=void 0;if(!b.noCache&&(f=(null!=b.name?b.name:"")+"-"+(null!=b.itemText?b.itemText:"")+"-"+(null!=b.itemValue?b.itemValue:"")+"-"+(null!=b.itemClass?b.itemClass:"")+"-"+(null!=b.selectedValue?"true":"false")+"-"+(b.multiple?"true":"false")+"-"+(b.required?"true":"false")+"-"+(b.autofocus?"true":"false")+"-"+(b.size?b.size.toString():"0"),e=c[f],null!=e))return e;d='<select class="wx-select" data-bind="{0}"><option data-bind="{1}"></option></select>';var g=[],h=[],i=[],j=[];g.push({key:"foreach",value:"{ data: items, hooks: hooks }"}),b.selectedValue&&g.push({key:"selectedValue",value:"@selectedValue"}),b.name&&h.push({key:"name",value:b.name}),b.multiple&&h.push({key:"multiple",value:"true"}),void 0!==b.size&&h.push({key:"size",value:b.size.toString()}),b.required&&h.push({key:"required",value:"true"}),b.autofocus&&h.push({key:"autofocus",value:"true"}),h.length&&g.push({key:"attr",value:"{ "+h.map(function(a){return a.key+": "+a.value}).join(", ")+" }"}),i.push({key:"value",value:b.itemValue||"$data"}),i.push({key:"text",value:b.itemText||"$data"}),b.itemClass&&j.push({key:"class",value:"'"+b.itemClass+"'"}),j.length&&i.push({key:"attr",value:"{ "+j.map(function(a){return a.key+": "+a.value}).join(", ")+" }"});var k=g.map(function(a){return a.key+": "+a.value}).join(", "),l=i.map(function(a){return a.key+": "+a.value}).join(", ");return d=a.formatString(d,k,l),b.noCache||(c[f]=d),e=this.htmlTemplateEngine.parse(d)},b}();!function(a){a.selectComponentConstructor=d}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";function b(b){var c;b instanceof Node||b instanceof HTMLElement?c=[b]:Array.isArray(b)?c=b:b instanceof NodeList?c=a.nodeListToArray(b):a.internal.throwError("invalid argument: element");var d=c.filter(function(a){return 1===a.nodeType});return d}function c(a){"s"===a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));var b=parseFloat(a)||0;return b}function d(a){var b=getComputedStyle(a).transitionDuration,d=0,e=b.split(/\s*,\s*/);return e.forEach(function(a){var b=c(a);d=d?Math.max(b,d):b}),1e3*d}function e(a){var b=getComputedStyle(a).transitionDelay,d=0,e=b.split(/\s*,\s*/);return e.forEach(function(a){var b=Math.max(0,c(a));d=d?Math.max(b,d):b}),1e3*d}function f(a){var b=getComputedStyle(a).animationDuration||getComputedStyle(a).webkitAnimationDuration||"0s",d=getComputedStyle(a).animationDelay||getComputedStyle(a).webkitAnimationDelay||"0s",e=c(b),f=c(d);return 1e3*(e+f)}function g(c,d,e){var f={};return d?f.prepare=function(a,c){var e=b(a);e.forEach(function(a){return d(a,c)})}:f.prepare=a.noop,f.run=function(d,e){return Rx.Observable.defer(function(){var f=b(d);return 0===f.length?Rx.Observable["return"](void 0):Rx.Observable.combineLatest(f.map(function(a){return c(a,e)}),a.noop)})},e?f.complete=function(a,c){var d=b(a);d.forEach(function(a){return e(a,c)})}:f.complete=a.noop,f}function h(c,g,h){var i,j,k,l,m,n,o={};if(c){var p;"string"==typeof c&&(c=c.split(/\s+/).map(function(a){return a.trim()}).filter(function(a){return a})),p="string"==typeof c[0]?c.map(function(a){return{css:a,add:!0}}):c,i=p.filter(function(a){return a.add}).map(function(a){return a.css}),j=p.filter(function(a){return!a.add||a.remove}).map(function(a){return a.css}),o.prepare=function(c,d){var e=b(c);i&&i.length&&e.forEach(function(b){return a.toggleCssClass.apply(null,[b,!0].concat(i))}),j&&j.length&&e.forEach(function(b){return a.toggleCssClass.apply(null,[b,!1].concat(j))})}}var q;"string"==typeof g&&(g=g.split(/\s+/).map(function(a){return a.trim()}).filter(function(a){return a})),q="string"==typeof g[0]?g.map(function(a){return{css:a,add:!0}}):g,k=q.filter(function(a){return a.add}).map(function(a){return a.css}),l=q.filter(function(a){return!a.add||a.remove}).map(function(a){return a.css}),o.run=function(c,g){return Rx.Observable.defer(function(){var g=b(c);if(0===g.length)return Rx.Observable["return"](void 0);var h=Rx.Observable.combineLatest(g.map(function(a){var b=Math.max(d(a)+e(a),f(a));return Rx.Observable.timer(b)}),a.noop);return Rx.Observable.timer(1).subscribe(function(){k&&k.length&&g.forEach(function(b){return a.toggleCssClass.apply(null,[b,!0].concat(k))}),l&&l.length&&g.forEach(function(b){return a.toggleCssClass.apply(null,[b,!1].concat(l))})}),h})};var r;return h?("string"==typeof h&&(h=h.split(/\s+/).map(function(a){return a.trim()}).filter(function(a){return a})),r="string"==typeof h[0]?h.map(function(a){return{css:a,add:!0}}):h,m=r.filter(function(a){return a.add}).map(function(a){return a.css}),n=r.filter(function(a){return!a.add||a.remove}).map(function(a){return a.css})):(n=[],i&&i.length&&(n=n.concat(i)),k&&k.length&&(n=n.concat(k))),o.complete=function(c,d){var e=b(c);m&&m.length&&e.forEach(function(b){return a.toggleCssClass.apply(null,[b,!0].concat(m))}),n&&n.length&&e.forEach(function(b){return a.toggleCssClass.apply(null,[b,!1].concat(n))})},o}function i(){var b=a.args2Array(arguments),c=b.shift();return"function"==typeof c?g(c,b.shift(),b.shift()):h(c,b.shift(),b.shift())}a.animation=i}(wx||(wx={}));var wx;!function(a){"use strict";function b(){var b,d,e,g,h=a.args2Array(arguments);return a.isFunction(h[0])?(d=h.shift(),b=a.isRxObservable(h[0])?h.shift():Rx.Observable["return"](!0),e=a.isRxScheduler(h[0])?h.shift():void 0,g=h.shift(),null!=g&&(d=d.bind(g)),c(b,function(a){return Rx.Observable.create(function(b){try{d(a),b.onNext(null),b.onCompleted()}catch(c){b.onError(c)}return Rx.Disposable.empty})},e)):(b=h.shift()||Rx.Observable["return"](!0),e=a.isRxScheduler(h[0])?h.shift():void 0,new f(b,function(a){return Rx.Observable["return"](a)},e))}function c(){var b,c,d,e,g=a.args2Array(arguments);return a.isFunction(g[0])?(c=g.shift(),d=a.isRxScheduler(g[0])?g.shift():void 0,e=g.shift(),null!=e&&(c=c.bind(e)),new f(Rx.Observable["return"](!0),c,d)):(b=g.shift(),c=g.shift(),d=a.isRxScheduler(g[0])?g.shift():void 0,new f(b,c,d))}function d(){var c=a.args2Array(arguments),d=c.filter(function(b){return a.isCommand(b)}),e=c.filter(function(b){return a.isRxObservable(b)}).pop();e||(e=Rx.Observable["return"](!0));var f=Rx.Observable.combineLatest(d.map(function(a){return a.canExecuteObservable}),function(){for(var a=[],b=0;b<arguments.length;b++)a[b-0]=arguments[b];return a.every(function(a){return a})}),g=Rx.Observable.combineLatest(e.startWith(!0),f,function(a,b){return a&&b}),h=b(g);return h.results.subscribe(function(a){return d.forEach(function(b){b.execute(a)})}),h}var e,f=function(){function b(b,c,d){var e=this;this.resultsSubject=new Rx.Subject,this.isExecutingSubject=new Rx.Subject,this.inflightCount=0,this.canExecuteLatest=!1,this.canExecuteDisp=null,this.scheduler=d||a.app.mainThreadScheduler,this.func=c,this.canExecuteObs=b.combineLatest(this.isExecutingSubject.startWith(!1),function(a,b){return a&&!b})["catch"](function(a){return e.exceptionsSubject.onNext(a),Rx.Observable["return"](!1)})["do"](function(a){e.canExecuteLatest=a}).publish(),a.isInUnitTest()&&this.canExecuteObs.connect(),this.exceptionsSubject=new Rx.Subject,this.thrownExceptions=this.exceptionsSubject.asObservable(),this.exceptionsSubject.observeOn(this.scheduler).subscribe(a.app.defaultExceptionHandler)}return b.prototype.queryInterface=function(b){return b===a.IID.IUnknown||b===a.IID.ICommand||b===a.IID.IHandleObservableErrors||b===a.IID.IDisposable?!0:!1},b.prototype.dispose=function(){var a=this.canExecuteDisp;null!=a&&a.dispose()},Object.defineProperty(b.prototype,"canExecuteObservable",{get:function(){var a=this,b=this.canExecuteObs.startWith(this.canExecuteLatest).distinctUntilChanged();return null!=this.canExecuteDisp?b:Rx.Observable.create(function(c){var d=b.subscribe(c);return a.canExecuteDisp=a.canExecuteObs.connect(),d})},enumerable:!0,
configurable:!0}),Object.defineProperty(b.prototype,"isExecuting",{get:function(){return this.isExecutingSubject.startWith(this.inflightCount>0)},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"results",{get:function(){return this.resultsSubject.asObservable()},enumerable:!0,configurable:!0}),b.prototype.canExecute=function(a){return null==this.canExecuteDisp&&(this.canExecuteDisp=this.canExecuteObs.connect()),this.canExecuteLatest},b.prototype.execute=function(a){this.executeAsync(a)["catch"](Rx.Observable.empty()).subscribe()},b.prototype.executeAsync=function(a){var b=this,c=Rx.Observable.create(function(c){1===++b.inflightCount&&b.isExecutingSubject.onNext(!0);var d=new Rx.SerialDisposable;d.setDisposable(Rx.Disposable.create(function(){0===--b.inflightCount&&b.isExecutingSubject.onNext(!1)}));var e=b.func(a).observeOn(b.scheduler)["do"](function(a){},function(a){return d.setDisposable(Rx.Disposable.empty)},function(){return d.setDisposable(Rx.Disposable.empty)})["do"](function(a){return b.resultsSubject.onNext(a)},function(a){return b.exceptionsSubject.onNext(a)}).subscribe(c);return new Rx.CompositeDisposable(e,d)});return c.publish().refCount()},b}();!function(a){a.commandConstructor=f}(e=a.internal||(a.internal={})),a.command=b,a.asyncCommand=c,a.combinedCommand=d}(wx||(wx={}));var wx;!function(a){"use strict";var b;!function(a){function b(a){var b=a.trim();123===b.charCodeAt(0)&&(b=b.slice(1,-1));var c,d,e=new Array,f=b.match(y),g=0;if(f){f.push(",");for(var h,i=0;h=f[i];++i){var j=h.charCodeAt(0);if(44===j){if(0>=g){c&&e.push(d?{key:c,value:d.join("")}:{unknown:c,value:void 0}),c=d=g=0;continue}}else if(58===j){if(!d)continue}else if(47===j&&i&&h.length>1){var k=f[i-1].match(z);k&&!A[k[0]]&&(b=b.substr(b.indexOf(h)+1),f=b.match(y),f.push(","),i=-1,h="/")}else if(40===j||123===j||91===j)++g;else if(41===j||125===j||93===j)--g;else if(!c&&!d){c=34===j||39===j?h.slice(1,-1):h;continue}d?d.push(h):d=[h]}}return e}function c(){}function d(a,b){var c;for(c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function e(a){return"undefined"!=typeof a}function f(a,b,c,d,e,f,g){var h=arguments;throw b=b.replace(/{(\d)}/g,function(a){return h[2+parseInt(a[1])]}),new SyntaxError(b)}function g(a){return"string"==typeof a?a.toLowerCase():a}function h(a,b){if("constructor"===a)throw f("isecfld",'Referencing "constructor" field in WebRx expressions is disallowed! Expression: {0}',b);return a}function i(a,b){if(a){if(a.constructor===a)throw f("isecfn","Referencing Function in WebRx expressions is disallowed! Expression: {0}",b);if(a.document&&a.location&&a.alert&&a.setInterval)throw f("isecwindow","Referencing the Window in WebRx expressions is disallowed! Expression: {0}",b);if(a.children&&(a.nodeName||a.prop&&a.attr&&a.find))throw f("isecdom","Referencing DOM nodes in WebRx expressions is disallowed! Expression: {0}",b)}return a}function j(){return 0}function k(a,b,c,d,e,f){var g,i,j,k=b.split("."),l=p(f);if(l)for(i=0;k.length>1;i++)g=h(k.shift(),d),j=l.readFieldHook?l.readFieldHook(a,g):a[g],j||(j={},l.writeFieldHook?l.writeFieldHook(a,g,j):a[g]=j),a=j;else for(i=0;k.length>1;i++)g=h(k.shift(),d),j=a[g],j||(j={},a[g]=j),a=j;return g=h(k.shift(),d),l&&l.writeFieldHook?l.writeFieldHook(a,g,c):a[g]=c,c}function l(a,b,c,d,e,f,g){return h(a,f),h(b,f),h(c,f),h(d,f),h(e,f),function(f,g){var h=g&&g.hasOwnProperty(a)?g:f,i=p(g);return i&&i.readFieldHook?null==h?h:(h=i.readFieldHook(h,a),b?null==h?void 0:(h=i.readFieldHook(h,b),c?null==h?void 0:(h=i.readFieldHook(h,c),d?null==h?void 0:(h=i.readFieldHook(h,d),e?null==h?void 0:h=i.readFieldHook(h,e):h):h):h):h):null==h?h:(h=h[a],b?null==h?void 0:(h=h[b],c?null==h?void 0:(h=h[c],d?null==h?void 0:(h=h[d],e?null==h?void 0:h=h[e]:h):h):h):h)}}function m(a,b){return h(a,b),function(b,c){if(b=c&&c.hasOwnProperty(a)?c:b,null==b)return void 0;var d=p(c);return d&&d.readFieldHook?d.readFieldHook(b,a):b[a]}}function n(a,b,c){return h(a,c),h(b,c),function(c,d){var e=p(d);return e&&e.readFieldHook?(c=d&&d.hasOwnProperty(a)?d:c,null==c?void 0:(c=e.readFieldHook(c,a),null==c?void 0:e.readFieldHook(c,b))):(c=(d&&d.hasOwnProperty(a)?d:c)[a],null==c?void 0:c[b])}}function o(a,b,c){if(G.hasOwnProperty(a))return G[a];var d,e=a.split("."),f=e.length;return d=1===f?m(e[0],c):2===f?n(e[0],e[1],c):6>f?l(e[0],e[1],e[2],e[3],e[4],c,b):function(a,d){var g={};Object.keys(d).forEach(function(a){return g[a]=d[a]});var h,i=0;do h=l(e[i++],e[i++],e[i++],e[i++],e[i++],c,b)(a,d),a=h,d={},Object.keys(g).forEach(function(a){return d[a]=g[a]});while(f>i);return h},"hasOwnProperty"!==a&&(G[a]=d),d}function p(a){return void 0!==a?a[B]:void 0}function q(a,b){a[B]=b}function r(a,b,c){if("string"!=typeof a)throw new TypeError("src must be a string, instead saw '"+typeof a+"'");var d=new E({}),e=new F(d,b);if(!c)return e.parse(a);var f=c[a];return f||(f=c[a]=e.parse(a)),f}var s='"(?:[^"\\\\]|\\\\.)*"',t="'(?:[^'\\\\]|\\\\.)*'",u="/(?:[^/\\\\]|\\\\.)*/w*",v=",\"'{}()/:[\\]",w="[^\\s:,/][^"+v+"]*[^\\s"+v+"]",x="[^\\s]",y=RegExp(s+"|"+t+"|"+u+"|"+w+"|"+x,"g"),z=/[\])"'A-Za-z0-9_$]+$/,A={"in":1,"return":1,"typeof":1};a.parseObjectLiteral=b;var B="___runtimeHooks",C={"null":function(){return null},"true":function(){return!0},"false":function(){return!1},undefined:c,"+":function(a,b,c,d){return c=c(a,b),d=d(a,b),e(c)?e(d)?c+d:c:e(d)?d:void 0},"-":function(a,b,c,d){return c=c(a,b),d=d(a,b),(e(c)?c:0)-(e(d)?d:0)},"*":function(a,b,c,d){return c(a,b)*d(a,b)},"/":function(a,b,c,d){return c(a,b)/d(a,b)},"%":function(a,b,c,d){return c(a,b)%d(a,b)},"^":function(a,b,c,d){return c(a,b)^d(a,b)},"=":c,"===":function(a,b,c,d){return c(a,b)===d(a,b)},"!==":function(a,b,c,d){return c(a,b)!==d(a,b)},"==":function(a,b,c,d){return c(a,b)===d(a,b)},"!=":function(a,b,c,d){return c(a,b)!==d(a,b)},"<":function(a,b,c,d){return c(a,b)<d(a,b)},">":function(a,b,c,d){return c(a,b)>d(a,b)},"<=":function(a,b,c,d){return c(a,b)<=d(a,b)},">=":function(a,b,c,d){return c(a,b)>=d(a,b)},"&&":function(a,b,c,d){return c(a,b)&&d(a,b)},"||":function(a,b,c,d){return c(a,b)||d(a,b)},"&":function(a,b,c,d){return c(a,b)&d(a,b)},"|":function(a,b,c,d){return d(a,b)(a,b,c(a,b))},"!":function(a,b,c){return!c(a,b)}},D={n:"\n",f:"\f",r:"\r",t:"	",v:"","'":"'",'"':'"'},E=function(){function a(a){this.options=a}return a.prototype.lex=function(a){this.text=a,this.index=0,this.ch=void 0,this.lastCh=":",this.tokens=[];for(var b,c=[];this.index<this.text.length;){if(this.ch=this.text.charAt(this.index),this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent(),this.was("{,")&&"{"===c[0]&&(b=this.tokens[this.tokens.length-1])&&(b.json=-1===b.text.indexOf("."));else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch,json:this.was(":[,")&&this.is("{[")||this.is("}]:,")}),this.is("{[")&&c.unshift(this.ch),this.is("}]")&&c.shift(),this.index++;else{if(this.isWhitespace(this.ch)){this.index++;continue}var d=this.ch+this.peek(),e=d+this.peek(2),f=C[this.ch],g=C[d],h=C[e];h?(this.tokens.push({index:this.index,text:e,fn:h}),this.index+=3):g?(this.tokens.push({index:this.index,text:d,fn:g}),this.index+=2):f?(this.tokens.push({index:this.index,text:this.ch,fn:f,json:this.was("[,:")&&this.is(" + -")}),this.index+=1):this.throwError("Unexpected next character ",this.index,this.index+1)}this.lastCh=this.ch}return this.tokens},a.prototype.is=function(a){return-1!==a.indexOf(this.ch)},a.prototype.was=function(a){return-1!==a.indexOf(this.lastCh)},a.prototype.peek=function(a){var b=a||1;return this.index+b<this.text.length?this.text.charAt(this.index+b):!1},a.prototype.isNumber=function(a){return a>="0"&&"9">=a},a.prototype.isWhitespace=function(a){return" "===a||"\r"===a||"	"===a||"\n"===a||""===a||" "===a},a.prototype.isIdent=function(a){return a>="a"&&"z">=a||a>="A"&&"Z">=a||"_"===a||"$"===a||"@"===a},a.prototype.isExpOperator=function(a){return"-"===a||"+"===a||this.isNumber(a)},a.prototype.throwError=function(a,b,c){c=c||this.index;var d=e(b)?"s "+b+"-"+this.index+" ["+this.text.substring(b,c)+"]":" "+c;throw f("lexerr","Lexer Error: {0} at column{1} in expression [{2}].",a,d,this.text)},a.prototype.readNumber=function(){for(var a="",b=this.index;this.index<this.text.length;){var c=g(this.text.charAt(this.index));if("."===c||this.isNumber(c))a+=c;else{var d=this.peek();if("e"===c&&this.isExpOperator(d))a+=c;else if(this.isExpOperator(c)&&d&&this.isNumber(d)&&"e"===a.charAt(a.length-1))a+=c;else{if(!this.isExpOperator(c)||d&&this.isNumber(d)||"e"!==a.charAt(a.length-1))break;this.throwError("Invalid exponent")}}this.index++}a=1*a,this.tokens.push({index:b,text:a,json:!0,fn:function(){return a}})},a.prototype.readIdent=function(){for(var a,b,c,e,f=this,g="",h=this.index;this.index<this.text.length&&(e=this.text.charAt(this.index),"."===e||this.isIdent(e)||this.isNumber(e));)"."===e&&(a=this.index),g+=e,this.index++;if(a)for(b=this.index;b<this.text.length;){if(e=this.text.charAt(b),"("===e){c=g.substr(a-h+1),g=g.substr(0,a-h),this.index=b;break}if(!this.isWhitespace(e))break;b++}var i={index:h,text:g};if(C.hasOwnProperty(g))i.fn=C[g],i.json=C[g];else{var j=o(g,this.options,this.text);i.fn=d(function(a,b){return j(a,b)},{assign:function(a,b,c){return k(a,g,b,f.text,f.options,c)}})}this.tokens.push(i),c&&(this.tokens.push({index:a,text:".",json:!1}),this.tokens.push({index:a+1,text:c,json:!1}))},a.prototype.readString=function(a){var b=this.index;this.index++;for(var c="",d=a,e=!1;this.index<this.text.length;){var f=this.text.charAt(this.index);if(d+=f,e){if("u"===f){var g=this.text.substring(this.index+1,this.index+5);g.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+g+"]"),this.index+=4,c+=String.fromCharCode(parseInt(g,16))}else{var h=D[f];c+=h?h:f}e=!1}else if("\\"===f)e=!0;else{if(f===a)return this.index++,void this.tokens.push({index:b,text:d,string:c,json:!0,fn:function(){return c}});c+=f}this.index++}this.throwError("Unterminated quote",b)},a}(),F=function(){function a(a,b){this.lexer=a,this.options=b||{filters:{}}}return a.prototype.parse=function(a){this.text=a,this.tokens=this.lexer.lex(a);var b=this.statements();return 0!==this.tokens.length&&this.throwError("is an unexpected token",this.tokens[0]),b.literal=!!b.literal,b.constant=!!b.constant,b},a.prototype.primary=function(){var a;if(this.expect("("))a=this.filterChain(),this.consume(")");else if(this.expect("["))a=this.arrayDeclaration();else if(this.expect("{"))a=this.object();else{var b=this.expect();a=b.fn,a||this.throwError("not a primary expression",b),b.json&&(a.constant=!0,a.literal=!0)}for(var c,d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},a.prototype.throwError=function(a,b){throw f("syntax","WebRx Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].",b.text,a,b.index+1,this.text,this.text.substring(b.index))},a.prototype.peekToken=function(){if(0===this.tokens.length)throw f("ueoe","Unexpected end of expression: {0}",this.text);return this.tokens[0]},a.prototype.peek=function(a,b,c,d){if(this.tokens.length>0){var e=this.tokens[0],f=e.text;if(f===a||f===b||f===c||f===d||!a&&!b&&!c&&!d)return e}return!1},a.prototype.expect=function(a,b,c,d){var e=this.peek(a,b,c,d);return e?(this.tokens.shift(),e):!1},a.prototype.consume=function(a){this.expect(a)||this.throwError("is unexpected, expecting ["+a+"]",this.peek())},a.prototype.unaryFn=function(a,b){return d(function(c,d){return a(c,d,b)},{constant:b.constant})},a.prototype.ternaryFn=function(a,b,c){return d(function(d,e){return a(d,e)?b(d,e):c(d,e)},{constant:a.constant&&b.constant&&c.constant})},a.prototype.binaryFn=function(a,b,c){return d(function(d,e){return b(d,e,a,c)},{constant:a.constant&&c.constant})},a.prototype.statements=function(){for(var a=[];;)if(this.tokens.length>0&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(b,c){for(var d,e=0;e<a.length;e++){var f=a[e];f&&(d=f(b,c))}return d}},a.prototype.filterChain=function(){for(var a,b=this.expression();;){if(!(a=this.expect("|")))return b;b=this.binaryFn(b,a.fn,this.filter())}},a.prototype.filter=function(){for(var a=this.expect(),b=this.options.filters[a.text],c=[];;){if(!(a=this.expect(":"))){var d=function(a,d,e){for(var f=[e],g=0;g<c.length;g++)f.push(c[g](a,d));return b.apply(a,f)};return function(){return d}}c.push(this.expression())}},a.prototype.expression=function(){return this.assignment()},a.prototype.assignment=function(){var a,b,c=this.ternary();return(b=this.expect("="))?(c.assign||this.throwError("implies assignment but ["+this.text.substring(0,b.index)+"] can not be assigned to",b),a=this.ternary(),function(b,d){return c.assign(b,a(b,d),d)}):c},a.prototype.ternary=function(){var a,b,c=this.logicalOR();if(b=this.expect("?")){if(a=this.ternary(),b=this.expect(":"))return this.ternaryFn(c,a,this.ternary());this.throwError("expected :",b)}return c},a.prototype.logicalOR=function(){for(var a,b=this.logicalAND();;){if(!(a=this.expect("||")))return b;b=this.binaryFn(b,a.fn,this.logicalAND())}},a.prototype.logicalAND=function(){var a,b=this.equality();return(a=this.expect("&&"))&&(b=this.binaryFn(b,a.fn,this.logicalAND())),b},a.prototype.equality=function(){var a,b=this.relational();return(a=this.expect("==","!=","===","!=="))&&(b=this.binaryFn(b,a.fn,this.equality())),b},a.prototype.relational=function(){var a,b=this.additive();return(a=this.expect("<",">","<=",">="))&&(b=this.binaryFn(b,a.fn,this.relational())),b},a.prototype.additive=function(){for(var a,b=this.multiplicative();a=this.expect("+","-");)b=this.binaryFn(b,a.fn,this.multiplicative());return b},a.prototype.multiplicative=function(){for(var a,b=this.unary();a=this.expect("*","/","%");)b=this.binaryFn(b,a.fn,this.unary());return b},a.prototype.unary=function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(j,a.fn,this.unary()):(a=this.expect("!"))?this.unaryFn(a.fn,this.unary()):this.primary()},a.prototype.fieldAccess=function(a){var b=this,c=this.expect().text,e=o(c,this.options,this.text);return d(function(b,c,d){return e(d||a(b,c))},{assign:function(d,e,f){return k(a(d,f),c,e,b.text,b.options,f)}})},a.prototype.objectIndex=function(a){var b=this,c=this.expression();return this.consume("]"),d(function(d,e){var f,g=a(d,e),h=c(d,e);if(!g)return void 0;var j=p(e);return f=j&&j.readIndexHook?j.readIndexHook(g,h):g[h],f=i(f,b.text)},{assign:function(d,e,f){var g=c(d,f),h=i(a(d,f),b.text),j=p(f);return j&&j.writeIndexHook?j.writeIndexHook(h,g,e):h[g]=e}})},a.prototype.functionCall=function(a,b){this.options.disallowFunctionCalls&&this.throwError("Function calls are not allowed");var d=[];if(")"!==this.peekToken().text)do d.push(this.expression());while(this.expect(","));this.consume(")");var e=this;return function(f,g){for(var h=[],j=b?b(f,g):f,k=0;k<d.length;k++)h.push(d[k](f,g));var l=a(f,g,j)||c;i(j,e.text),i(l,e.text);var m=l.apply?l.apply(j,h):l(h[0],h[1],h[2],h[3],h[4]);return i(m,e.text)}},a.prototype.arrayDeclaration=function(){var a=[],b=!0;if("]"!==this.peekToken().text)do{if(this.peek("]"))break;var c=this.expression();a.push(c),c.constant||(b=!1)}while(this.expect(","));return this.consume("]"),d(function(b,c){for(var d=[],e=0;e<a.length;e++)d.push(a[e](b,c));return d},{literal:!0,constant:b})},a.prototype.object=function(){var a=[],b=!0;if("}"!==this.peekToken().text)do{if(this.peek("}"))break;var c=this.expect(),e=c.string||c.text;this.consume(":");var f=this.expression();a.push({key:e,value:f}),f.constant||(b=!1)}while(this.expect(","));return this.consume("}"),d(function(b,c){for(var d={},e=0;e<a.length;e++){var f=a[e];d[f.key]=f.value(b,c)}return d},{literal:!0,constant:b})},a}(),G={};a.getRuntimeHooks=p,a.setRuntimeHooks=q,a.compileExpression=r}(b||(b={}));var c;!function(a){var c=b;a.expressionCompilerConstructor=c}(c=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";function b(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a}function c(a,c){for(var d,j,k,l,m,n=c.createDocumentFragment(),o=[],p=0,q=a.length;q>p;p++)if(d=a[p],d||0===d)if("object"==typeof d)b(o,d.nodeType?[d]:d);else if(g.test(d)){for(j=j||n.appendChild(c.createElement("div")),k=(f.exec(d)||["",""])[1].toLowerCase(),l=i[k]||i._default,j.innerHTML=l[1]+d.replace(e,"<$1></$2>")+l[2],m=l[0];m--;)j=j.lastChild;b(o,j.childNodes),j=n.firstChild,j.textContent=""}else o.push(c.createTextNode(d));for(n.textContent="",p=0;d=o[p++];)1===d.nodeType&&"script"===d.tagName.toLowerCase()&&h.test(d.type||"")||n.appendChild(d);return n}var d=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,e=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,f=/<([\w:-]+)/,g=/<|&#?\w+;/,h=/^$|\/(?:java|ecma)script/i,i={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table>","</table>"],td:[3,"<table>","</table>"],_default:[0,"",""]};i.optgroup=i.option,i.tbody=i.tfoot=i.colgroup=i.caption=i.thead,i.th=i.td;var j,k=function(){var a=document.implementation.createHTMLDocument("");return a.body?(a.body.innerHTML="<form></form><form></form>",2===a.body.childNodes.length):!1}(),l=function(){function a(){}return a.prototype.parse=function(a){var e=k?document.implementation.createHTMLDocument(""):document,f=d.exec(a);if(f)return[e.createElement(f[1])];f=c([a],e);var g=b([],f.childNodes);return g},a}();!function(a){a.htmlTemplateEngineConstructor=l}(j=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b=function(){function a(){this.messageBus={},this.schedulerMappings={}}return a.prototype.listen=function(a){return this.setupSubjectIfNecessary(a).skip(1)},a.prototype.isRegistered=function(a){return this.messageBus.hasOwnProperty(a)},a.prototype.registerMessageSource=function(a,b){return a.subscribe(this.setupSubjectIfNecessary(b))},a.prototype.sendMessage=function(a,b){this.setupSubjectIfNecessary(b).onNext(a)},a.prototype.registerScheduler=function(a,b){this.schedulerMappings[b]=a},a.prototype.setupSubjectIfNecessary=function(a){var b=this.messageBus[a];return null==b&&(b=c.createScheduledSubject(this.getScheduler(a),null,new Rx.BehaviorSubject(void 0)),this.messageBus[a]=b),b},a.prototype.getScheduler=function(a){var b=this.schedulerMappings[a];return b||Rx.Scheduler.currentThread},a}();a.messageBus,Object.defineProperty(a,"messageBus",{get:function(){return a.injector.get(a.res.messageBus)}});var c;!function(a){a.messageBusConstructor=b}(c=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a,b){this.priority=5,this.domManager=a,this.router=b}return c.prototype.applyBinding=function(c,d,e,f,g){var h=this;1!==c.nodeType&&b.throwError("stateActive-binding only operates on elements!"),null==d&&b.throwError("invalid binding-options!");var i,j,k,l=c,m=this.domManager.compileBindingOptions(d,g),n=[],o=m,p=[],q="active";n.push(a.router.current.changed.startWith(a.router.current())),"function"==typeof m?(i=m,n.push(this.domManager.expressionToObservable(i,e))):(n.push(this.domManager.expressionToObservable(o.name,e)),o.params&&Object.keys(o.params).forEach(function(a){p.push(a),n.push(h.domManager.expressionToObservable(o.params[a],e))}),o.cssClass&&(q=this.domManager.evaluateExpression(o.cssClass,e))),f.cleanup.add(Rx.Observable.combineLatest(n,function(b){return a.args2Array(arguments)}).subscribe(function(b){try{b.shift();j=a.unwrapProperty(b.shift()),k={};for(var c=0;c<p.length;c++)k[p[c]]=a.unwrapProperty(b[c]);var d=h.router.includes(j,k),e=q.split(/\s+/).map(function(a){return a.trim()}).filter(function(a){return a});e.length&&a.toggleCssClass.apply(null,[l,d].concat(e))}catch(f){a.app.defaultExceptionHandler.onNext(f)}})),f.cleanup.add(Rx.Disposable.create(function(){c=null,d=null,e=null,f=null,n=null,m=null,j=null,k=null,o=null,p=null}))},c.prototype.configure=function(a){},c}();!function(a){a.stateActiveBindingConstructor=c}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a,b){this.priority=5,this.domManager=a,this.router=b}return c.prototype.applyBinding=function(c,d,e,f,g){var h=this;1!==c.nodeType&&b.throwError("stateRef-binding only operates on elements!"),null==d&&b.throwError("invalid binding-options!");var i,j,k,l=c,m="a"===l.tagName.toLowerCase(),n=m?l:void 0,o=this.domManager.compileBindingOptions(d,g),p=[],q=o,r=[];"function"==typeof o?(i=o,p.push(this.domManager.expressionToObservable(i,e))):(p.push(this.domManager.expressionToObservable(q.name,e)),q.params&&Object.keys(q.params).forEach(function(a){r.push(a),p.push(h.domManager.expressionToObservable(q.params[a],e))})),f.cleanup.add(Rx.Observable.combineLatest(p,function(b){return a.args2Array(arguments)}).subscribe(function(b){try{j=a.unwrapProperty(b.shift()),k={};for(var c=0;c<r.length;c++)k[r[c]]=a.unwrapProperty(b[c]);null!=n&&(n.href=h.router.url(j,k))}catch(d){a.app.defaultExceptionHandler.onNext(d)}})),f.cleanup.add(Rx.Observable.fromEvent(l,"click").subscribe(function(a){a.preventDefault(),h.router.go(j,k,{location:!0})})),f.cleanup.add(Rx.Disposable.create(function(){c=null,d=null,e=null,f=null,p=null,o=null,j=null,k=null,q=null,r=null}))},c.prototype.configure=function(a){},c}();!function(a){a.stateRefBindingConstructor=c}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";var b,c=function(){function c(a,b){this.priority=1e3,this.controlsDescendants=!0,this.domManager=a,this.router=b}return c.prototype.applyBinding=function(c,d,e,f,g){function h(){k&&(k.dispose(),k=null)}var i=this;1!==c.nodeType&&b.throwError("view-binding only operates on elements!"),null==d&&b.throwError("invalid binding-options!");var j,k,l=c,m=this.domManager.compileBindingOptions(d,g),n=this.domManager.evaluateExpression(m,e),o=void 0,p=void 0;(null==n||"string"!=typeof n)&&b.throwError("views must be named!"),f.cleanup.add(this.router.current.changed.startWith(this.router.current()).subscribe(function(b){try{h(),k=new Rx.CompositeDisposable;var c=i.router.getViewComponent(n);null!=c?a.isEqual(j,c)||(null!=c.animations&&(o=c.animations.enter,"string"==typeof o&&(o=g.animation(o)),p=c.animations.leave,"string"==typeof p&&(p=g.animation(p))),k.add(i.applyTemplate(c.component,c.params,o,p,l,e,g)),j=c):(k.add(i.applyTemplate(null,null,o,p,l,e,g)),o=void 0,p=void 0,j={})}catch(d){a.app.defaultExceptionHandler.onNext(d)}})),f.cleanup.add(Rx.Disposable.create(function(){c=null,d=null,e=null,f=null}))},c.prototype.configure=function(a){},c.prototype.applyTemplate=function(b,c,d,e,f,g,h){function i(){m.forEach(function(a){l.domManager.cleanNode(a),f.removeChild(a)})}function j(d){g.$componentParams=c;var e=document.createElement("div"),h=a.formatString("component: { name: '{0}', params: $componentParams }",b);e.setAttribute("data-bind",h),null!=d&&d.prepare(e),f.appendChild(e),l.domManager.applyBindings(g,e)}var k,l=this,m=a.nodeChildrenToArray(f),n=[];return m.length>0&&(e?(e.prepare(m),k=e.run(m).continueWith(function(){return e.complete(m)}).continueWith(i)):k=Rx.Observable.startDeferred(i),n.push(k)),null!=b&&(k=Rx.Observable.startDeferred(function(){return j(d)}),d&&(k=k.continueWith(d.run(f.childNodes)).continueWith(function(){return d.complete(f.childNodes)})),n.push(k)),k=n.length>1?Rx.Observable.combineLatest(n,a.noop).take(1):1===n.length?n[0].take(1):null,k?k.subscribe()||Rx.Disposable.empty:Rx.Disposable.empty},c}();!function(a){a.viewBindingConstructor=c}(b=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";function b(a,b){return new e(a,b)}var c=/[\-\[\]{}()+?.,\\\^$|#\s]/g,d=/([:*])(\w+)/g,e=function(){function b(a,b){var e=this;this.route=a,this.rules=b,this.params=[];var f=a;"string"==typeof a?(f=f.replace(c,"\\$&"),f=f.replace(d,function(a,b,c){return e.params.push(c),":"===b?"([^/]*)":"(.*)"}),f=new RegExp("^"+f+"$"),this.parse=function(a){var c,d,g=0,h={},i=a.match(f);if(!i)return null;for(;g<e.params.length;){if(c=e.params[g++],d=i[g],b&&c in b&&!e.validateRule(b[c],d))return null;h[c]=d}return h},this.stringify=function(b){b=b||{};var c,e,f=a;for(c in b)e=new RegExp("[:*]"+c+"\\b"),f=f.replace(e,b[c]);return f.replace(d,"")}):(this.parse=function(a){var b=a.match(f);return b&&{captures:b.slice(1)}},this.stringify=function(){return""})}return b.prototype.stripTrailingSlash=function(a){return 0===a.length||"/"===a||a.lastIndexOf("/")!==a.length-1?a:a.substr(0,a.length-1)},Object.defineProperty(b.prototype,"isAbsolute",{get:function(){return 0===this.route.indexOf("/")},enumerable:!0,configurable:!0}),b.prototype.concat=function(b){var c=b,d=this.stripTrailingSlash(this.route),e=this.stripTrailingSlash(c.route),f=null;return c.rules?this.rules?(Object.keys(this.rules).forEach(function(b){c.rules.hasOwnProperty(b)&&a.internal.throwError("route '{0}' and '{1}' have conflicting rule '{2}",d,e,b)}),f=a.extend(this.rules,a.extend(c.rules,{}))):f=a.extend(c.rules,{}):this.rules&&(f=a.extend(this.rules,{})),"/"===d&&(d=""),a.route(d+"/"+e,f)},b.prototype.validateRule=function(a,b){var c=this.toString.call(a).charAt(8);return"R"===c?a.test(b):"F"===c?a(b):a==b},b}();a.route=b}(wx||(wx={}));var wx;!function(a){"use strict";var b=function(){function b(b){var c=this;this.current=a.property(),this.states={},this.pathSeparator=".",this.parentPathDirective="^",this.rootStateName="$",this.validPathRegExp=/^[a-zA-Z]([\w-_]*$)/,this.domManager=b,this.reset(!1),a.app.history.onPopState.subscribe(function(b){try{if(b&&b.state){var d=b.state,e=d.stateName;null!=e&&(c.go(e,d.params,{location:!1}),a.app.title(d.title))}}catch(b){a.app.defaultExceptionHandler.onNext(b)}}),a.app.title.changed.subscribe(function(a){document.title=a,null!=c.current()&&c.replaceHistoryState(c.current(),a)})}return b.prototype.state=function(a){return this.registerStateInternal(a),this},b.prototype.updateCurrentStateParams=function(b){var c=this.current();b(c.params),this.replaceHistoryState(c,a.app.title())},b.prototype.go=function(a,b,d){a=this.mapPath(a),null==this.states[a]&&c.throwError("state '{0}' is not registered",a),this.activateState(a,b,d)},b.prototype.get=function(a){return this.states[a]},b.prototype.is=function(a,b,c){var d=this.current(),e=d.name===a;if(b=b||{},e){var f=Object.keys(d.params),g=Object.keys(b);if(f.length===g.length){for(var h=0;h<g.length;h++)if(d.params[g[h]]!=b[g[h]]){e=!1;break}}else e=!1}return e},b.prototype.includes=function(a,b,c){var d=this.current(),e=0===d.name.indexOf(a);if(b=b||{},e){var f=Object.keys(d.params),g=Object.keys(b);g=g.length<=f.length?g:f;for(var h=0;h<g.length;h++)if(d.params[g[h]]!=b[g[h]]){e=!1;break}}return e},b.prototype.url=function(a,b){a=this.mapPath(a);var c=this.getAbsoluteRouteForState(a);return null!=c?c.stringify(b):null},b.prototype.reset=function(b){void 0===b&&(b=!0),this.states={},this.root=this.registerStateInternal({name:this.rootStateName,url:a.route("/")}),b&&this.go(this.rootStateName,{},{location:2})},b.prototype.sync=function(b){null==b&&(b=a.app.history.location.pathname);for(var c,d=Object.keys(this.states),e=d.length,f=0;e>f;f++){var g=this.states[d[f]],h=this.getAbsoluteRouteForState(g.name);if(null!=(c=h.parse(b)))return void this.go(g.name,c,{location:2})}null==this.current()&&this.reload()},b.prototype.reload=function(){var a,b;null!=this.current()?(a=this.current().name,b=this.current().params):(a=this.rootStateName,b={}),this.go(a,b,{force:!0,location:2})},b.prototype.getViewComponent=function(b){var c=this.current(),d=void 0;if(null!=c.views){var e=c.views[b],f={};if(null!=e){d={},"object"==typeof e?(d.component=e.component,d.params=e.params||{},d.animations=e.animations):(d.component=e,d.params={},d.animations=void 0);var g=this.getViewParameterNamesFromStateConfig(b,d.component);g.forEach(function(a){c.params.hasOwnProperty(a)&&(f[a]=c.params[a])}),d.params=a.extend(f,d.params)}}return d},b.prototype.registerStateInternal=function(b){var d=this,e=b.name.split(this.pathSeparator);return b.name!==this.rootStateName&&e.forEach(function(a){d.validPathRegExp.test(a)||c.throwError("invalid state-path '{0}' (a state-path must start with a character, optionally followed by one or more alphanumeric characters, dashes or underscores)")}),b=a.extend(b,{}),this.states[b.name]=b,null!=b.url?"string"==typeof b.url&&(b.url=a.route(b.url)):b.name!==this.rootStateName?b.url=a.route(e[e.length-1]):b.url=a.route("/"),b.name===this.rootStateName&&(this.root=b),b},b.prototype.pushHistoryState=function(b,c){var d={stateName:b.name,params:b.params,title:null!=c?c:document.title};a.app.history.pushState(d,"",b.url)},b.prototype.replaceHistoryState=function(b,c){var d={stateName:b.name,params:b.params,title:null!=c?c:document.title};a.app.history.replaceState(d,"",b.url)},b.prototype.mapPath=function(a){if(0===a.indexOf(this.pathSeparator))return this.current().name+a;if(0===a.indexOf(this.parentPathDirective)){var b=this.current().name;if(b===this.rootStateName)return b;for(var c=b.split(this.pathSeparator),d=c.length-1;d>0;d--){var e=c.slice(0,d).join(this.pathSeparator);if(this.get(e)||this.get(e+a.substr(1)))return a=e+a.substr(1)}return a=this.rootStateName+a.substr(1)}return a},b.prototype.getStateHierarchy=function(b){var c,d=b.split(this.pathSeparator),e="",f=[];b!==this.rootStateName&&f.push(this.root);for(var g=0;g<d.length;g++)g>0?e+=this.pathSeparator+d[g]:e=d[g],c=this.states[e],null==c&&(c={name:e,url:a.route(e)}),f.push(c);return f},b.prototype.getAbsoluteRouteForState=function(a,b){b=null!=b?b:this.getStateHierarchy(a);var c=null;return b.forEach(function(a){if(null!=c){var b=a.url;c=b.isAbsolute?b:c.concat(a.url)}else c=a.url}),c},b.prototype.activateState=function(b,c,d){var e=this.getStateHierarchy(b),f={},g={};e.forEach(function(b){null!=b.views&&a.extend(b.views,f),null!=b.params&&a.extend(b.params,g)}),c&&a.extend(c,g);var h=this.getAbsoluteRouteForState(b,e),i=a.extend(this.states[b],{});i.url=h.stringify(c),i.views=f,i.params=g;var j=this.current();(d&&d.force||null==j||j.name!==b||!a.isEqual(j.params,i.params))&&(null!=j&&null!=j.views&&null!=i.views&&Object.keys(j.views).forEach(function(a){i.views.hasOwnProperty(a)||(i.views[a]=null)}),d&&d.location&&(2===d.location?this.replaceHistoryState(i,a.app.title()):this.pushHistoryState(i,a.app.title())),null!=j&&j.onLeave&&j.onLeave(this.get(j.name),j.params),this.current(i),i.onEnter&&i.onEnter(this.get(i.name),c))},b.prototype.getViewParameterNamesFromStateConfig=function(b,c){for(var d,e=this.getStateHierarchy(this.current().name),f={},g=[],h=-1,i=e.length;i--;i>=0)if(d=e[i],d.views&&d.views[b]){var j=d.views[b];"object"==typeof j&&(j=j.component),j===c&&(h=i)}return-1!==h&&(d=e[h],e=e.slice(0,h+1),e.forEach(function(b){null!=b.params&&a.extend(b.params,f)}),g=Object.keys(f),g=g.concat(d.url.params)),g},b}();a.router,Object.defineProperty(a,"router",{get:function(){return a.injector.get(a.res.router)}});var c;!function(a){a.routerConstructor=b}(c=a.internal||(a.internal={}))}(wx||(wx={}));var wx;!function(a){"use strict";a.injector.register(a.res.expressionCompiler,a.internal.expressionCompilerConstructor).register(a.res.htmlTemplateEngine,[a.internal.htmlTemplateEngineConstructor],!0).register(a.res.domManager,[a.res.expressionCompiler,a.internal.domManagerConstructor],!0).register(a.res.router,[a.res.domManager,a.internal.routerConstructor],!0).register(a.res.messageBus,[a.internal.messageBusConstructor],!0),a.injector.register("wx.bindings.module",[a.res.domManager,a.internal.moduleBindingConstructor],!0).register("wx.bindings.command",[a.res.domManager,a.internal.commandBindingConstructor],!0).register("wx.bindings.if",[a.res.domManager,a.internal.ifBindingConstructor],!0).register("wx.bindings.with",[a.res.domManager,a.internal.withBindingConstructor],!0).register("wx.bindings.notif",[a.res.domManager,a.internal.notifBindingConstructor],!0).register("wx.bindings.css",[a.res.domManager,a.internal.cssBindingConstructor],!0).register("wx.bindings.attr",[a.res.domManager,a.internal.attrBindingConstructor],!0).register("wx.bindings.style",[a.res.domManager,a.internal.styleBindingConstructor],!0).register("wx.bindings.text",[a.res.domManager,a.internal.textBindingConstructor],!0).register("wx.bindings.html",[a.res.domManager,a.internal.htmlBindingConstructor],!0).register("wx.bindings.visible",[a.res.domManager,a.internal.visibleBindingConstructor],!0).register("wx.bindings.hidden",[a.res.domManager,a.internal.hiddenBindingConstructor],!0).register("wx.bindings.enabled",[a.res.domManager,a.internal.enableBindingConstructor],!0).register("wx.bindings.disabled",[a.res.domManager,a.internal.disableBindingConstructor],!0).register("wx.bindings.foreach",[a.res.domManager,a.internal.forEachBindingConstructor],!0).register("wx.bindings.event",[a.res.domManager,a.internal.eventBindingConstructor],!0).register("wx.bindings.keyPress",[a.res.domManager,a.internal.keyPressBindingConstructor],!0).register("wx.bindings.textInput",[a.res.domManager,a.internal.textInputBindingConstructor],!0).register("wx.bindings.checked",[a.res.domManager,a.internal.checkedBindingConstructor],!0).register("wx.bindings.selectedValue",[a.res.domManager,a.internal.selectedValueBindingConstructor],!0).register("wx.bindings.component",[a.res.domManager,a.internal.componentBindingConstructor],!0).register("wx.bindings.value",[a.res.domManager,a.internal.valueBindingConstructor],!0).register("wx.bindings.hasFocus",[a.res.domManager,a.internal.hasFocusBindingConstructor],!0).register("wx.bindings.view",[a.res.domManager,a.res.router,a.internal.viewBindingConstructor],!0).register("wx.bindings.sref",[a.res.domManager,a.res.router,a.internal.stateRefBindingConstructor],!0).register("wx.bindings.sactive",[a.res.domManager,a.res.router,a.internal.stateActiveBindingConstructor],!0),
a.injector.register("wx.components.radiogroup",[a.res.htmlTemplateEngine,a.internal.radioGroupComponentConstructor]).register("wx.components.select",[a.res.htmlTemplateEngine,a.internal.selectComponentConstructor]),a.app.binding("module","wx.bindings.module").binding("css","wx.bindings.css").binding("attr","wx.bindings.attr").binding("style","wx.bindings.style").binding("command","wx.bindings.command").binding("if","wx.bindings.if").binding("with","wx.bindings.with").binding("ifnot","wx.bindings.notif").binding("text","wx.bindings.text").binding("html","wx.bindings.html").binding("visible","wx.bindings.visible").binding("hidden","wx.bindings.hidden").binding("disabled","wx.bindings.disabled").binding("enabled","wx.bindings.enabled").binding("foreach","wx.bindings.foreach").binding("event","wx.bindings.event").binding(["keyPress","keypress"],"wx.bindings.keyPress").binding(["textInput","textinput"],"wx.bindings.textInput").binding("checked","wx.bindings.checked").binding("selectedValue","wx.bindings.selectedValue").binding("component","wx.bindings.component").binding("value","wx.bindings.value").binding(["hasFocus","hasfocus"],"wx.bindings.hasFocus").binding("view","wx.bindings.view").binding(["sref","stateRef","stateref"],"wx.bindings.sref").binding(["sactive","stateActive","stateactive"],"wx.bindings.sactive"),a.app.component("wx-radiogroup",{resolve:"wx.components.radiogroup"}).component("wx-select",{resolve:"wx.components.select"})}(wx||(wx={}));var wx;!function(a){a.version="0.9.83"}(wx||(wx={}));

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