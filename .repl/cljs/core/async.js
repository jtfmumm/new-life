goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.ioc_helpers');
cljs.core.async.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.t8432 !== 'undefined')
{} else
{goog.provide('cljs.core.async.t8432');

/**
* @constructor
*/
cljs.core.async.t8432 = (function (f,fn_handler,meta8433){
this.f = f;
this.fn_handler = fn_handler;
this.meta8433 = meta8433;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t8432.cljs$lang$type = true;
cljs.core.async.t8432.cljs$lang$ctorStr = "cljs.core.async/t8432";
cljs.core.async.t8432.cljs$lang$ctorPrWriter = (function (this__3499__auto__,writer__3500__auto__,opt__3501__auto__){return cljs.core._write.call(null,writer__3500__auto__,"cljs.core.async/t8432");
});
cljs.core.async.t8432.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t8432.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.t8432.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.t8432.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_8434){var self__ = this;
var _8434__$1 = this;return self__.meta8433;
});
cljs.core.async.t8432.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_8434,meta8433__$1){var self__ = this;
var _8434__$1 = this;return (new cljs.core.async.t8432(self__.f,self__.fn_handler,meta8433__$1));
});
cljs.core.async.__GT_t8432 = (function __GT_t8432(f__$1,fn_handler__$1,meta8433){return (new cljs.core.async.t8432(f__$1,fn_handler__$1,meta8433));
});
}
return (new cljs.core.async.t8432(f,fn_handler,null));
});
/**
* Returns a fixed buffer of size n. When full, puts will block/park.
*/
cljs.core.async.buffer = (function buffer(n){return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete but
* val will be dropped (no transfer).
*/
cljs.core.async.dropping_buffer = (function dropping_buffer(n){return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete, and be
* buffered, but oldest elements in buffer will be dropped (not
* transferred).
*/
cljs.core.async.sliding_buffer = (function sliding_buffer(n){return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
* Creates a channel with an optional buffer. If buf-or-n is a number,
* will create and use a fixed buffer of that size.
*/
cljs.core.async.chan = (function() {
var chan = null;
var chan__0 = (function (){return chan.call(null,null);
});
var chan__1 = (function (buf_or_n){var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,0))?null:buf_or_n);return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1));
});
chan = function(buf_or_n){
switch(arguments.length){
case 0:
return chan__0.call(this);
case 1:
return chan__1.call(this,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chan.cljs$core$IFn$_invoke$arity$0 = chan__0;
chan.cljs$core$IFn$_invoke$arity$1 = chan__1;
return chan;
})()
;
/**
* Returns a channel that will close after msecs
*/
cljs.core.async.timeout = (function timeout(msecs){return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
* takes a val from port. Must be called inside a (go ...) block. Will
* return nil if closed. Will park if nothing is available.
*/
cljs.core.async._LT__BANG_ = (function _LT__BANG_(port){if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("<! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
});
/**
* Asynchronously takes a val from port, passing to fn1. Will pass nil
* if closed. If on-caller? (default true) is true, and value is
* immediately available, will call fn1 on calling thread.
* Returns nil.
*/
cljs.core.async.take_BANG_ = (function() {
var take_BANG_ = null;
var take_BANG___2 = (function (port,fn1){return take_BANG_.call(null,port,fn1,true);
});
var take_BANG___3 = (function (port,fn1,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));if(cljs.core.truth_(ret))
{var val_8435 = cljs.core.deref.call(null,ret);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,val_8435);
} else
{cljs.core.async.impl.dispatch.run.call(null,(function (){return fn1.call(null,val_8435);
}));
}
} else
{}
return null;
});
take_BANG_ = function(port,fn1,on_caller_QMARK_){
switch(arguments.length){
case 2:
return take_BANG___2.call(this,port,fn1);
case 3:
return take_BANG___3.call(this,port,fn1,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take_BANG_.cljs$core$IFn$_invoke$arity$2 = take_BANG___2;
take_BANG_.cljs$core$IFn$_invoke$arity$3 = take_BANG___3;
return take_BANG_;
})()
;
cljs.core.async.nop = (function nop(){return null;
});
/**
* puts a val into port. nil values are not allowed. Must be called
* inside a (go ...) block. Will park if no buffer space is available.
*/
cljs.core.async._GT__BANG_ = (function _GT__BANG_(port,val){if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(">! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
});
/**
* Asynchronously puts a val into port, calling fn0 (if supplied) when
* complete. nil values are not allowed. Will throw if closed. If
* on-caller? (default true) is true, and the put is immediately
* accepted, will call fn0 on calling thread.  Returns nil.
*/
cljs.core.async.put_BANG_ = (function() {
var put_BANG_ = null;
var put_BANG___2 = (function (port,val){return put_BANG_.call(null,port,val,cljs.core.async.nop);
});
var put_BANG___3 = (function (port,val,fn0){return put_BANG_.call(null,port,val,fn0,true);
});
var put_BANG___4 = (function (port,val,fn0,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn0));if(cljs.core.truth_((function (){var and__2954__auto__ = ret;if(cljs.core.truth_(and__2954__auto__))
{return cljs.core.not_EQ_.call(null,fn0,cljs.core.async.nop);
} else
{return and__2954__auto__;
}
})()))
{if(cljs.core.truth_(on_caller_QMARK_))
{fn0.call(null);
} else
{cljs.core.async.impl.dispatch.run.call(null,fn0);
}
} else
{}
return null;
});
put_BANG_ = function(port,val,fn0,on_caller_QMARK_){
switch(arguments.length){
case 2:
return put_BANG___2.call(this,port,val);
case 3:
return put_BANG___3.call(this,port,val,fn0);
case 4:
return put_BANG___4.call(this,port,val,fn0,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
put_BANG_.cljs$core$IFn$_invoke$arity$2 = put_BANG___2;
put_BANG_.cljs$core$IFn$_invoke$arity$3 = put_BANG___3;
put_BANG_.cljs$core$IFn$_invoke$arity$4 = put_BANG___4;
return put_BANG_;
})()
;
cljs.core.async.close_BANG_ = (function close_BANG_(port){return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function random_array(n){var a = (new Array(n));var n__3719__auto___8436 = n;var x_8437 = 0;while(true){
if((x_8437 < n__3719__auto___8436))
{(a[x_8437] = 0);
{
var G__8438 = (x_8437 + 1);
x_8437 = G__8438;
continue;
}
} else
{}
break;
}
var i = 1;while(true){
if(cljs.core._EQ_.call(null,i,n))
{return a;
} else
{var j = cljs.core.rand_int.call(null,i);(a[i] = (a[j]));
(a[j] = i);
{
var G__8439 = (i + 1);
i = G__8439;
continue;
}
}
break;
}
});
cljs.core.async.alt_flag = (function alt_flag(){var flag = cljs.core.atom.call(null,true);if(typeof cljs.core.async.t8443 !== 'undefined')
{} else
{goog.provide('cljs.core.async.t8443');

/**
* @constructor
*/
cljs.core.async.t8443 = (function (flag,alt_flag,meta8444){
this.flag = flag;
this.alt_flag = alt_flag;
this.meta8444 = meta8444;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t8443.cljs$lang$type = true;
cljs.core.async.t8443.cljs$lang$ctorStr = "cljs.core.async/t8443";
cljs.core.async.t8443.cljs$lang$ctorPrWriter = (function (this__3499__auto__,writer__3500__auto__,opt__3501__auto__){return cljs.core._write.call(null,writer__3500__auto__,"cljs.core.async/t8443");
});
cljs.core.async.t8443.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t8443.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.deref.call(null,self__.flag);
});
cljs.core.async.t8443.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.flag,null);
return true;
});
cljs.core.async.t8443.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_8445){var self__ = this;
var _8445__$1 = this;return self__.meta8444;
});
cljs.core.async.t8443.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_8445,meta8444__$1){var self__ = this;
var _8445__$1 = this;return (new cljs.core.async.t8443(self__.flag,self__.alt_flag,meta8444__$1));
});
cljs.core.async.__GT_t8443 = (function __GT_t8443(flag__$1,alt_flag__$1,meta8444){return (new cljs.core.async.t8443(flag__$1,alt_flag__$1,meta8444));
});
}
return (new cljs.core.async.t8443(flag,alt_flag,null));
});
cljs.core.async.alt_handler = (function alt_handler(flag,cb){if(typeof cljs.core.async.t8449 !== 'undefined')
{} else
{goog.provide('cljs.core.async.t8449');

/**
* @constructor
*/
cljs.core.async.t8449 = (function (cb,flag,alt_handler,meta8450){
this.cb = cb;
this.flag = flag;
this.alt_handler = alt_handler;
this.meta8450 = meta8450;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t8449.cljs$lang$type = true;
cljs.core.async.t8449.cljs$lang$ctorStr = "cljs.core.async/t8449";
cljs.core.async.t8449.cljs$lang$ctorPrWriter = (function (this__3499__auto__,writer__3500__auto__,opt__3501__auto__){return cljs.core._write.call(null,writer__3500__auto__,"cljs.core.async/t8449");
});
cljs.core.async.t8449.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t8449.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});
cljs.core.async.t8449.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.async.impl.protocols.commit.call(null,self__.flag);
return self__.cb;
});
cljs.core.async.t8449.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_8451){var self__ = this;
var _8451__$1 = this;return self__.meta8450;
});
cljs.core.async.t8449.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_8451,meta8450__$1){var self__ = this;
var _8451__$1 = this;return (new cljs.core.async.t8449(self__.cb,self__.flag,self__.alt_handler,meta8450__$1));
});
cljs.core.async.__GT_t8449 = (function __GT_t8449(cb__$1,flag__$1,alt_handler__$1,meta8450){return (new cljs.core.async.t8449(cb__$1,flag__$1,alt_handler__$1,meta8450));
});
}
return (new cljs.core.async.t8449(cb,flag,alt_handler,null));
});
/**
* returns derefable [val port] if immediate, nil if enqueued
*/
cljs.core.async.do_alts = (function do_alts(fret,ports,opts){var flag = cljs.core.async.alt_flag.call(null);var n = cljs.core.count.call(null,ports);var idxs = cljs.core.async.random_array.call(null,n);var priority = new cljs.core.Keyword(null,"priority","priority",4143410454).cljs$core$IFn$_invoke$arity$1(opts);var ret = (function (){var i = 0;while(true){
if((i < n))
{var idx = (cljs.core.truth_(priority)?i:(idxs[i]));var port = cljs.core.nth.call(null,ports,idx);var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,0):null);var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,1);return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (){return fret.call(null,cljs.core.PersistentVector.fromArray([null,wport], true));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__8452_SHARP_){return fret.call(null,cljs.core.PersistentVector.fromArray([p1__8452_SHARP_,port], true));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));if(cljs.core.truth_(vbox))
{return cljs.core.async.impl.channels.box.call(null,cljs.core.PersistentVector.fromArray([cljs.core.deref.call(null,vbox),(function (){var or__2963__auto__ = wport;if(cljs.core.truth_(or__2963__auto__))
{return or__2963__auto__;
} else
{return port;
}
})()], true));
} else
{{
var G__8453 = (i + 1);
i = G__8453;
continue;
}
}
} else
{return null;
}
break;
}
})();var or__2963__auto__ = ret;if(cljs.core.truth_(or__2963__auto__))
{return or__2963__auto__;
} else
{if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",2558708147)))
{var temp__4092__auto__ = (function (){var and__2954__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);if(cljs.core.truth_(and__2954__auto__))
{return cljs.core.async.impl.protocols.commit.call(null,flag);
} else
{return and__2954__auto__;
}
})();if(cljs.core.truth_(temp__4092__auto__))
{var got = temp__4092__auto__;return cljs.core.async.impl.channels.box.call(null,cljs.core.PersistentVector.fromArray([new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",2558708147)], true));
} else
{return null;
}
} else
{return null;
}
}
});
/**
* Completes at most one of several channel operations. Must be called
* inside a (go ...) block. ports is a vector of channel endpoints, which
* can be either a channel to take from or a vector of
* [channel-to-put-to val-to-put], in any combination. Takes will be
* made as if by <!, and puts will be made as if by >!. Unless
* the :priority option is true, if more than one port operation is
* ready a non-deterministic choice will be made. If no operation is
* ready and a :default value is supplied, [default-val :default] will
* be returned, otherwise alts! will park until the first operation to
* become ready completes. Returns [val port] of the completed
* operation, where val is the value taken for takes, and nil for puts.
* 
* opts are passed as :key val ... Supported options:
* 
* :default val - the value to use if none of the operations are immediately ready
* :priority true - (default nil) when true, the operations will be tried in order.
* 
* Note: there is no guarantee that the port exps or val exprs will be
* used, nor in what order should they be, so they should not be
* depended upon for side effects.
* @param {...*} var_args
*/
cljs.core.async.alts_BANG_ = (function() { 
var alts_BANG___delegate = function (ports,p__8454){var map__8456 = p__8454;var map__8456__$1 = ((cljs.core.seq_QMARK_.call(null,map__8456))?cljs.core.apply.call(null,cljs.core.hash_map,map__8456):map__8456);var opts = map__8456__$1;if(null)
{return null;
} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("alts! used not in (go ...) block"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,null))].join('')));
}
};
var alts_BANG_ = function (ports,var_args){
var p__8454 = null;if (arguments.length > 1) {
  p__8454 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return alts_BANG___delegate.call(this,ports,p__8454);};
alts_BANG_.cljs$lang$maxFixedArity = 1;
alts_BANG_.cljs$lang$applyTo = (function (arglist__8457){
var ports = cljs.core.first(arglist__8457);
var p__8454 = cljs.core.rest(arglist__8457);
return alts_BANG___delegate(ports,p__8454);
});
alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = alts_BANG___delegate;
return alts_BANG_;
})()
;
/**
* Takes a function and a source channel, and returns a channel which
* contains the values produced by applying f to each value taken from
* the source channel
*/
cljs.core.async.map_LT_ = (function map_LT_(f,ch){if(typeof cljs.core.async.t8465 !== 'undefined')
{} else
{goog.provide('cljs.core.async.t8465');

/**
* @constructor
*/
cljs.core.async.t8465 = (function (ch,f,map_LT_,meta8466){
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta8466 = meta8466;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t8465.cljs$lang$type = true;
cljs.core.async.t8465.cljs$lang$ctorStr = "cljs.core.async/t8465";
cljs.core.async.t8465.cljs$lang$ctorPrWriter = (function (this__3499__auto__,writer__3500__auto__,opt__3501__auto__){return cljs.core._write.call(null,writer__3500__auto__,"cljs.core.async/t8465");
});
cljs.core.async.t8465.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t8465.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn0);
});
cljs.core.async.t8465.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t8465.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){if(typeof cljs.core.async.t8468 !== 'undefined')
{} else
{goog.provide('cljs.core.async.t8468');

/**
* @constructor
*/
cljs.core.async.t8468 = (function (fn1,_,meta8466,ch,f,map_LT_,meta8469){
this.fn1 = fn1;
this._ = _;
this.meta8466 = meta8466;
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta8469 = meta8469;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t8468.cljs$lang$type = true;
cljs.core.async.t8468.cljs$lang$ctorStr = "cljs.core.async/t8468";
cljs.core.async.t8468.cljs$lang$ctorPrWriter = (function (this__3499__auto__,writer__3500__auto__,opt__3501__auto__){return cljs.core._write.call(null,writer__3500__auto__,"cljs.core.async/t8468");
});
cljs.core.async.t8468.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t8468.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});
cljs.core.async.t8468.prototype.cljs$core$async$impl$protocols$Handler$lock_id$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.lock_id.call(null,self__.fn1);
});
cljs.core.async.t8468.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$3){var self__ = this;
var ___$4 = this;var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);return ((function (f1,___$4){
return (function (p1__8458_SHARP_){return f1.call(null,(((p1__8458_SHARP_ == null))?null:self__.f.call(null,p1__8458_SHARP_)));
});
;})(f1,___$4))
});
cljs.core.async.t8468.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_8470){var self__ = this;
var _8470__$1 = this;return self__.meta8469;
});
cljs.core.async.t8468.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_8470,meta8469__$1){var self__ = this;
var _8470__$1 = this;return (new cljs.core.async.t8468(self__.fn1,self__._,self__.meta8466,self__.ch,self__.f,self__.map_LT_,meta8469__$1));
});
cljs.core.async.__GT_t8468 = (function __GT_t8468(fn1__$1,___$2,meta8466__$1,ch__$2,f__$2,map_LT___$2,meta8469){return (new cljs.core.async.t8468(fn1__$1,___$2,meta8466__$1,ch__$2,f__$2,map_LT___$2,meta8469));
});
}
return (new cljs.core.async.t8468(fn1,___$1,self__.meta8466,self__.ch,self__.f,self__.map_LT_,null));
})());if(cljs.core.truth_((function (){var and__2954__auto__ = ret;if(cljs.core.truth_(and__2954__auto__))
{return !((cljs.core.deref.call(null,ret) == null));
} else
{return and__2954__auto__;
}
})()))
{return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else
{return ret;
}
});
cljs.core.async.t8465.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t8465.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t8465.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_8467){var self__ = this;
var _8467__$1 = this;return self__.meta8466;
});
cljs.core.async.t8465.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_8467,meta8466__$1){var self__ = this;
var _8467__$1 = this;return (new cljs.core.async.t8465(self__.ch,self__.f,self__.map_LT_,meta8466__$1));
});
cljs.core.async.__GT_t8465 = (function __GT_t8465(ch__$1,f__$1,map_LT___$1,meta8466){return (new cljs.core.async.t8465(ch__$1,f__$1,map_LT___$1,meta8466));
});
}
return (new cljs.core.async.t8465(ch,f,map_LT_,null));
});
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value before supplying it to the target channel.
*/
cljs.core.async.map_GT_ = (function map_GT_(f,ch){if(typeof cljs.core.async.t8474 !== 'undefined')
{} else
{goog.provide('cljs.core.async.t8474');

/**
* @constructor
*/
cljs.core.async.t8474 = (function (ch,f,map_GT_,meta8475){
this.ch = ch;
this.f = f;
this.map_GT_ = map_GT_;
this.meta8475 = meta8475;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t8474.cljs$lang$type = true;
cljs.core.async.t8474.cljs$lang$ctorStr = "cljs.core.async/t8474";
cljs.core.async.t8474.cljs$lang$ctorPrWriter = (function (this__3499__auto__,writer__3500__auto__,opt__3501__auto__){return cljs.core._write.call(null,writer__3500__auto__,"cljs.core.async/t8474");
});
cljs.core.async.t8474.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t8474.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn0);
});
cljs.core.async.t8474.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t8474.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t8474.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t8474.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t8474.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_8476){var self__ = this;
var _8476__$1 = this;return self__.meta8475;
});
cljs.core.async.t8474.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_8476,meta8475__$1){var self__ = this;
var _8476__$1 = this;return (new cljs.core.async.t8474(self__.ch,self__.f,self__.map_GT_,meta8475__$1));
});
cljs.core.async.__GT_t8474 = (function __GT_t8474(ch__$1,f__$1,map_GT___$1,meta8475){return (new cljs.core.async.t8474(ch__$1,f__$1,map_GT___$1,meta8475));
});
}
return (new cljs.core.async.t8474(ch,f,map_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns true to the
* target channel.
*/
cljs.core.async.filter_GT_ = (function filter_GT_(p,ch){if(typeof cljs.core.async.t8480 !== 'undefined')
{} else
{goog.provide('cljs.core.async.t8480');

/**
* @constructor
*/
cljs.core.async.t8480 = (function (ch,p,filter_GT_,meta8481){
this.ch = ch;
this.p = p;
this.filter_GT_ = filter_GT_;
this.meta8481 = meta8481;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t8480.cljs$lang$type = true;
cljs.core.async.t8480.cljs$lang$ctorStr = "cljs.core.async/t8480";
cljs.core.async.t8480.cljs$lang$ctorPrWriter = (function (this__3499__auto__,writer__3500__auto__,opt__3501__auto__){return cljs.core._write.call(null,writer__3500__auto__,"cljs.core.async/t8480");
});
cljs.core.async.t8480.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t8480.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn0){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.p.call(null,val)))
{return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn0);
} else
{return cljs.core.async.impl.channels.box.call(null,null);
}
});
cljs.core.async.t8480.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t8480.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t8480.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t8480.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t8480.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_8482){var self__ = this;
var _8482__$1 = this;return self__.meta8481;
});
cljs.core.async.t8480.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_8482,meta8481__$1){var self__ = this;
var _8482__$1 = this;return (new cljs.core.async.t8480(self__.ch,self__.p,self__.filter_GT_,meta8481__$1));
});
cljs.core.async.__GT_t8480 = (function __GT_t8480(ch__$1,p__$1,filter_GT___$1,meta8481){return (new cljs.core.async.t8480(ch__$1,p__$1,filter_GT___$1,meta8481));
});
}
return (new cljs.core.async.t8480(ch,p,filter_GT_,null));
});
/**
* Takes a predicate and a target channel, and returns a channel which
* supplies only the values for which the predicate returns false to the
* target channel.
*/
cljs.core.async.remove_GT_ = (function remove_GT_(p,ch){return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
* Takes a predicate and a source channel, and returns a channel which
* contains only the values taken from the source channel for which the
* predicate returns true. The returned channel will be unbuffered by
* default, or a buf-or-n can be supplied. The channel will close
* when the source channel closes.
*/
cljs.core.async.filter_LT_ = (function() {
var filter_LT_ = null;
var filter_LT___2 = (function (p,ch){return filter_LT_.call(null,p,ch,null);
});
var filter_LT___3 = (function (p,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6636__auto___8557 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6637__auto__ = (function (){var switch__6586__auto__ = (function (state_8540){var state_val_8541 = (state_8540[1]);if((state_val_8541 === 1))
{var state_8540__$1 = state_8540;var statearr_8542_8558 = state_8540__$1;(statearr_8542_8558[2] = null);
(statearr_8542_8558[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8541 === 2))
{var state_8540__$1 = state_8540;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_8540__$1,4,ch);
} else
{if((state_val_8541 === 3))
{var inst_8538 = (state_8540[2]);var state_8540__$1 = state_8540;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_8540__$1,inst_8538);
} else
{if((state_val_8541 === 4))
{var inst_8522 = (state_8540[5]);var inst_8522__$1 = (state_8540[2]);var inst_8523 = (inst_8522__$1 == null);var state_8540__$1 = (function (){var statearr_8543 = state_8540;(statearr_8543[5] = inst_8522__$1);
return statearr_8543;
})();if(cljs.core.truth_(inst_8523))
{var statearr_8544_8559 = state_8540__$1;(statearr_8544_8559[1] = 5);
} else
{var statearr_8545_8560 = state_8540__$1;(statearr_8545_8560[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8541 === 5))
{var inst_8525 = cljs.core.async.close_BANG_.call(null,out);var state_8540__$1 = state_8540;var statearr_8546_8561 = state_8540__$1;(statearr_8546_8561[2] = inst_8525);
(statearr_8546_8561[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8541 === 6))
{var inst_8522 = (state_8540[5]);var inst_8527 = p.call(null,inst_8522);var state_8540__$1 = state_8540;if(cljs.core.truth_(inst_8527))
{var statearr_8547_8562 = state_8540__$1;(statearr_8547_8562[1] = 8);
} else
{var statearr_8548_8563 = state_8540__$1;(statearr_8548_8563[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8541 === 7))
{var inst_8536 = (state_8540[2]);var state_8540__$1 = state_8540;var statearr_8549_8564 = state_8540__$1;(statearr_8549_8564[2] = inst_8536);
(statearr_8549_8564[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8541 === 8))
{var inst_8522 = (state_8540[5]);var state_8540__$1 = state_8540;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_8540__$1,11,out,inst_8522);
} else
{if((state_val_8541 === 9))
{var state_8540__$1 = state_8540;var statearr_8550_8565 = state_8540__$1;(statearr_8550_8565[2] = null);
(statearr_8550_8565[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8541 === 10))
{var inst_8533 = (state_8540[2]);var state_8540__$1 = (function (){var statearr_8551 = state_8540;(statearr_8551[6] = inst_8533);
return statearr_8551;
})();var statearr_8552_8566 = state_8540__$1;(statearr_8552_8566[2] = null);
(statearr_8552_8566[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8541 === 11))
{var inst_8530 = (state_8540[2]);var state_8540__$1 = state_8540;var statearr_8553_8567 = state_8540__$1;(statearr_8553_8567[2] = inst_8530);
(statearr_8553_8567[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6586__auto__){
return (function() {
var state_machine__6587__auto__ = null;
var state_machine__6587__auto____0 = (function (){var statearr_8555 = (new Array(7));(statearr_8555[0] = state_machine__6587__auto__);
(statearr_8555[1] = 1);
return statearr_8555;
});
var state_machine__6587__auto____1 = (function (state_8540){while(true){
var result__6588__auto__ = switch__6586__auto__.call(null,state_8540);if(cljs.core.keyword_identical_QMARK_.call(null,result__6588__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6588__auto__;
}
break;
}
});
state_machine__6587__auto__ = function(state_8540){
switch(arguments.length){
case 0:
return state_machine__6587__auto____0.call(this);
case 1:
return state_machine__6587__auto____1.call(this,state_8540);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6587__auto____0;
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6587__auto____1;
return state_machine__6587__auto__;
})()
;})(switch__6586__auto__))
})();var state__6638__auto__ = (function (){var statearr_8556 = f__6637__auto__.call(null);(statearr_8556[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6636__auto___8557);
return statearr_8556;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6638__auto__);
}));
return out;
});
filter_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return filter_LT___2.call(this,p,ch);
case 3:
return filter_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
filter_LT_.cljs$core$IFn$_invoke$arity$2 = filter_LT___2;
filter_LT_.cljs$core$IFn$_invoke$arity$3 = filter_LT___3;
return filter_LT_;
})()
;
/**
* Takes a predicate and a source channel, and returns a channel which
* contains only the values taken from the source channel for which the
* predicate returns false. The returned channel will be unbuffered by
* default, or a buf-or-n can be supplied. The channel will close
* when the source channel closes.
*/
cljs.core.async.remove_LT_ = (function() {
var remove_LT_ = null;
var remove_LT___2 = (function (p,ch){return remove_LT_.call(null,p,ch,null);
});
var remove_LT___3 = (function (p,ch,buf_or_n){return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});
remove_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return remove_LT___2.call(this,p,ch);
case 3:
return remove_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_LT_.cljs$core$IFn$_invoke$arity$2 = remove_LT___2;
remove_LT_.cljs$core$IFn$_invoke$arity$3 = remove_LT___3;
return remove_LT_;
})()
;
cljs.core.async.mapcat_STAR_ = (function mapcat_STAR_(f,in$,out){var c__6636__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6637__auto__ = (function (){var switch__6586__auto__ = (function (state_8715){var state_val_8716 = (state_8715[1]);if((state_val_8716 === 1))
{var state_8715__$1 = state_8715;var statearr_8717_8750 = state_8715__$1;(statearr_8717_8750[2] = null);
(statearr_8717_8750[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8716 === 2))
{var state_8715__$1 = state_8715;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_8715__$1,4,in$);
} else
{if((state_val_8716 === 3))
{var inst_8713 = (state_8715[2]);var state_8715__$1 = state_8715;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_8715__$1,inst_8713);
} else
{if((state_val_8716 === 4))
{var inst_8661 = (state_8715[5]);var inst_8661__$1 = (state_8715[2]);var inst_8662 = (inst_8661__$1 == null);var state_8715__$1 = (function (){var statearr_8718 = state_8715;(statearr_8718[5] = inst_8661__$1);
return statearr_8718;
})();if(cljs.core.truth_(inst_8662))
{var statearr_8719_8751 = state_8715__$1;(statearr_8719_8751[1] = 5);
} else
{var statearr_8720_8752 = state_8715__$1;(statearr_8720_8752[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8716 === 5))
{var inst_8664 = cljs.core.async.close_BANG_.call(null,out);var state_8715__$1 = state_8715;var statearr_8721_8753 = state_8715__$1;(statearr_8721_8753[2] = inst_8664);
(statearr_8721_8753[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8716 === 6))
{var inst_8661 = (state_8715[5]);var inst_8666 = f.call(null,inst_8661);var inst_8671 = cljs.core.seq.call(null,inst_8666);var inst_8672 = inst_8671;var inst_8673 = null;var inst_8674 = 0;var inst_8675 = 0;var state_8715__$1 = (function (){var statearr_8722 = state_8715;(statearr_8722[6] = inst_8674);
(statearr_8722[7] = inst_8675);
(statearr_8722[8] = inst_8673);
(statearr_8722[9] = inst_8672);
return statearr_8722;
})();var statearr_8723_8754 = state_8715__$1;(statearr_8723_8754[2] = null);
(statearr_8723_8754[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8716 === 7))
{var inst_8711 = (state_8715[2]);var state_8715__$1 = state_8715;var statearr_8724_8755 = state_8715__$1;(statearr_8724_8755[2] = inst_8711);
(statearr_8724_8755[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8716 === 8))
{var inst_8674 = (state_8715[6]);var inst_8675 = (state_8715[7]);var inst_8677 = (inst_8675 < inst_8674);var inst_8678 = inst_8677;var state_8715__$1 = state_8715;if(cljs.core.truth_(inst_8678))
{var statearr_8725_8756 = state_8715__$1;(statearr_8725_8756[1] = 10);
} else
{var statearr_8726_8757 = state_8715__$1;(statearr_8726_8757[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8716 === 9))
{var inst_8708 = (state_8715[2]);var state_8715__$1 = (function (){var statearr_8727 = state_8715;(statearr_8727[10] = inst_8708);
return statearr_8727;
})();var statearr_8728_8758 = state_8715__$1;(statearr_8728_8758[2] = null);
(statearr_8728_8758[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8716 === 10))
{var inst_8675 = (state_8715[7]);var inst_8673 = (state_8715[8]);var inst_8680 = cljs.core._nth.call(null,inst_8673,inst_8675);var state_8715__$1 = state_8715;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_8715__$1,13,out,inst_8680);
} else
{if((state_val_8716 === 11))
{var inst_8672 = (state_8715[9]);var inst_8686 = (state_8715[11]);var inst_8686__$1 = cljs.core.seq.call(null,inst_8672);var state_8715__$1 = (function (){var statearr_8732 = state_8715;(statearr_8732[11] = inst_8686__$1);
return statearr_8732;
})();if(inst_8686__$1)
{var statearr_8733_8759 = state_8715__$1;(statearr_8733_8759[1] = 14);
} else
{var statearr_8734_8760 = state_8715__$1;(statearr_8734_8760[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8716 === 12))
{var inst_8706 = (state_8715[2]);var state_8715__$1 = state_8715;var statearr_8735_8761 = state_8715__$1;(statearr_8735_8761[2] = inst_8706);
(statearr_8735_8761[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8716 === 13))
{var inst_8674 = (state_8715[6]);var inst_8675 = (state_8715[7]);var inst_8673 = (state_8715[8]);var inst_8672 = (state_8715[9]);var inst_8682 = (state_8715[2]);var inst_8683 = (inst_8675 + 1);var tmp8729 = inst_8674;var tmp8730 = inst_8673;var tmp8731 = inst_8672;var inst_8672__$1 = tmp8731;var inst_8673__$1 = tmp8730;var inst_8674__$1 = tmp8729;var inst_8675__$1 = inst_8683;var state_8715__$1 = (function (){var statearr_8736 = state_8715;(statearr_8736[6] = inst_8674__$1);
(statearr_8736[7] = inst_8675__$1);
(statearr_8736[8] = inst_8673__$1);
(statearr_8736[9] = inst_8672__$1);
(statearr_8736[12] = inst_8682);
return statearr_8736;
})();var statearr_8737_8762 = state_8715__$1;(statearr_8737_8762[2] = null);
(statearr_8737_8762[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8716 === 14))
{var inst_8686 = (state_8715[11]);var inst_8688 = cljs.core.chunked_seq_QMARK_.call(null,inst_8686);var state_8715__$1 = state_8715;if(inst_8688)
{var statearr_8738_8763 = state_8715__$1;(statearr_8738_8763[1] = 17);
} else
{var statearr_8739_8764 = state_8715__$1;(statearr_8739_8764[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8716 === 15))
{var state_8715__$1 = state_8715;var statearr_8740_8765 = state_8715__$1;(statearr_8740_8765[2] = null);
(statearr_8740_8765[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8716 === 16))
{var inst_8704 = (state_8715[2]);var state_8715__$1 = state_8715;var statearr_8741_8766 = state_8715__$1;(statearr_8741_8766[2] = inst_8704);
(statearr_8741_8766[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8716 === 17))
{var inst_8686 = (state_8715[11]);var inst_8690 = cljs.core.chunk_first.call(null,inst_8686);var inst_8691 = cljs.core.chunk_rest.call(null,inst_8686);var inst_8692 = cljs.core.count.call(null,inst_8690);var inst_8672 = inst_8691;var inst_8673 = inst_8690;var inst_8674 = inst_8692;var inst_8675 = 0;var state_8715__$1 = (function (){var statearr_8742 = state_8715;(statearr_8742[6] = inst_8674);
(statearr_8742[7] = inst_8675);
(statearr_8742[8] = inst_8673);
(statearr_8742[9] = inst_8672);
return statearr_8742;
})();var statearr_8743_8767 = state_8715__$1;(statearr_8743_8767[2] = null);
(statearr_8743_8767[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8716 === 18))
{var inst_8686 = (state_8715[11]);var inst_8695 = cljs.core.first.call(null,inst_8686);var state_8715__$1 = state_8715;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_8715__$1,20,out,inst_8695);
} else
{if((state_val_8716 === 19))
{var inst_8701 = (state_8715[2]);var state_8715__$1 = state_8715;var statearr_8744_8768 = state_8715__$1;(statearr_8744_8768[2] = inst_8701);
(statearr_8744_8768[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8716 === 20))
{var inst_8686 = (state_8715[11]);var inst_8697 = (state_8715[2]);var inst_8698 = cljs.core.next.call(null,inst_8686);var inst_8672 = inst_8698;var inst_8673 = null;var inst_8674 = 0;var inst_8675 = 0;var state_8715__$1 = (function (){var statearr_8745 = state_8715;(statearr_8745[13] = inst_8697);
(statearr_8745[6] = inst_8674);
(statearr_8745[7] = inst_8675);
(statearr_8745[8] = inst_8673);
(statearr_8745[9] = inst_8672);
return statearr_8745;
})();var statearr_8746_8769 = state_8715__$1;(statearr_8746_8769[2] = null);
(statearr_8746_8769[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6586__auto__){
return (function() {
var state_machine__6587__auto__ = null;
var state_machine__6587__auto____0 = (function (){var statearr_8748 = (new Array(14));(statearr_8748[0] = state_machine__6587__auto__);
(statearr_8748[1] = 1);
return statearr_8748;
});
var state_machine__6587__auto____1 = (function (state_8715){while(true){
var result__6588__auto__ = switch__6586__auto__.call(null,state_8715);if(cljs.core.keyword_identical_QMARK_.call(null,result__6588__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6588__auto__;
}
break;
}
});
state_machine__6587__auto__ = function(state_8715){
switch(arguments.length){
case 0:
return state_machine__6587__auto____0.call(this);
case 1:
return state_machine__6587__auto____1.call(this,state_8715);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6587__auto____0;
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6587__auto____1;
return state_machine__6587__auto__;
})()
;})(switch__6586__auto__))
})();var state__6638__auto__ = (function (){var statearr_8749 = f__6637__auto__.call(null);(statearr_8749[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6636__auto__);
return statearr_8749;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6638__auto__);
}));
return c__6636__auto__;
});
/**
* Takes a function and a source channel, and returns a channel which
* contains the values in each collection produced by applying f to
* each value taken from the source channel. f must return a
* collection.
* 
* The returned channel will be unbuffered by default, or a buf-or-n
* can be supplied. The channel will close when the source channel
* closes.
*/
cljs.core.async.mapcat_LT_ = (function() {
var mapcat_LT_ = null;
var mapcat_LT___2 = (function (f,in$){return mapcat_LT_.call(null,f,in$,null);
});
var mapcat_LT___3 = (function (f,in$,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return out;
});
mapcat_LT_ = function(f,in$,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_LT___2.call(this,f,in$);
case 3:
return mapcat_LT___3.call(this,f,in$,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = mapcat_LT___2;
mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = mapcat_LT___3;
return mapcat_LT_;
})()
;
/**
* Takes a function and a target channel, and returns a channel which
* applies f to each value put, then supplies each element of the result
* to the target channel. f must return a collection.
* 
* The returned channel will be unbuffered by default, or a buf-or-n
* can be supplied. The target channel will be closed when the source
* channel closes.
*/
cljs.core.async.mapcat_GT_ = (function() {
var mapcat_GT_ = null;
var mapcat_GT___2 = (function (f,out){return mapcat_GT_.call(null,f,out,null);
});
var mapcat_GT___3 = (function (f,out,buf_or_n){var in$ = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return in$;
});
mapcat_GT_ = function(f,out,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_GT___2.call(this,f,out);
case 3:
return mapcat_GT___3.call(this,f,out,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = mapcat_GT___2;
mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = mapcat_GT___3;
return mapcat_GT_;
})()
;
/**
* Takes elements from the from channel and supplies them to the to
* channel. By default, the to channel will be closed when the
* from channel closes, but can be determined by the close?
* parameter.
*/
cljs.core.async.pipe = (function() {
var pipe = null;
var pipe__2 = (function (from,to){return pipe.call(null,from,to,true);
});
var pipe__3 = (function (from,to,close_QMARK_){var c__6636__auto___8842 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6637__auto__ = (function (){var switch__6586__auto__ = (function (state_8825){var state_val_8826 = (state_8825[1]);if((state_val_8826 === 1))
{var state_8825__$1 = state_8825;var statearr_8827_8843 = state_8825__$1;(statearr_8827_8843[2] = null);
(statearr_8827_8843[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8826 === 2))
{var state_8825__$1 = state_8825;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_8825__$1,4,from);
} else
{if((state_val_8826 === 3))
{var inst_8823 = (state_8825[2]);var state_8825__$1 = state_8825;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_8825__$1,inst_8823);
} else
{if((state_val_8826 === 4))
{var inst_8808 = (state_8825[5]);var inst_8808__$1 = (state_8825[2]);var inst_8809 = (inst_8808__$1 == null);var state_8825__$1 = (function (){var statearr_8828 = state_8825;(statearr_8828[5] = inst_8808__$1);
return statearr_8828;
})();if(cljs.core.truth_(inst_8809))
{var statearr_8829_8844 = state_8825__$1;(statearr_8829_8844[1] = 5);
} else
{var statearr_8830_8845 = state_8825__$1;(statearr_8830_8845[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8826 === 5))
{var state_8825__$1 = state_8825;if(cljs.core.truth_(close_QMARK_))
{var statearr_8831_8846 = state_8825__$1;(statearr_8831_8846[1] = 8);
} else
{var statearr_8832_8847 = state_8825__$1;(statearr_8832_8847[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8826 === 6))
{var inst_8808 = (state_8825[5]);var state_8825__$1 = state_8825;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_8825__$1,11,to,inst_8808);
} else
{if((state_val_8826 === 7))
{var inst_8821 = (state_8825[2]);var state_8825__$1 = state_8825;var statearr_8833_8848 = state_8825__$1;(statearr_8833_8848[2] = inst_8821);
(statearr_8833_8848[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8826 === 8))
{var inst_8812 = cljs.core.async.close_BANG_.call(null,to);var state_8825__$1 = state_8825;var statearr_8834_8849 = state_8825__$1;(statearr_8834_8849[2] = inst_8812);
(statearr_8834_8849[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8826 === 9))
{var state_8825__$1 = state_8825;var statearr_8835_8850 = state_8825__$1;(statearr_8835_8850[2] = null);
(statearr_8835_8850[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8826 === 10))
{var inst_8815 = (state_8825[2]);var state_8825__$1 = state_8825;var statearr_8836_8851 = state_8825__$1;(statearr_8836_8851[2] = inst_8815);
(statearr_8836_8851[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8826 === 11))
{var inst_8818 = (state_8825[2]);var state_8825__$1 = (function (){var statearr_8837 = state_8825;(statearr_8837[6] = inst_8818);
return statearr_8837;
})();var statearr_8838_8852 = state_8825__$1;(statearr_8838_8852[2] = null);
(statearr_8838_8852[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6586__auto__){
return (function() {
var state_machine__6587__auto__ = null;
var state_machine__6587__auto____0 = (function (){var statearr_8840 = (new Array(7));(statearr_8840[0] = state_machine__6587__auto__);
(statearr_8840[1] = 1);
return statearr_8840;
});
var state_machine__6587__auto____1 = (function (state_8825){while(true){
var result__6588__auto__ = switch__6586__auto__.call(null,state_8825);if(cljs.core.keyword_identical_QMARK_.call(null,result__6588__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6588__auto__;
}
break;
}
});
state_machine__6587__auto__ = function(state_8825){
switch(arguments.length){
case 0:
return state_machine__6587__auto____0.call(this);
case 1:
return state_machine__6587__auto____1.call(this,state_8825);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6587__auto____0;
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6587__auto____1;
return state_machine__6587__auto__;
})()
;})(switch__6586__auto__))
})();var state__6638__auto__ = (function (){var statearr_8841 = f__6637__auto__.call(null);(statearr_8841[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6636__auto___8842);
return statearr_8841;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6638__auto__);
}));
return to;
});
pipe = function(from,to,close_QMARK_){
switch(arguments.length){
case 2:
return pipe__2.call(this,from,to);
case 3:
return pipe__3.call(this,from,to,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pipe.cljs$core$IFn$_invoke$arity$2 = pipe__2;
pipe.cljs$core$IFn$_invoke$arity$3 = pipe__3;
return pipe;
})()
;
/**
* Takes a predicate and a source channel and returns a vector of two
* channels, the first of which will contain the values for which the
* predicate returned true, the second those for which it returned
* false.
* 
* The out channels will be unbuffered by default, or two buf-or-ns can
* be supplied. The channels will close after the source channel has
* closed.
*/
cljs.core.async.split = (function() {
var split = null;
var split__2 = (function (p,ch){return split.call(null,p,ch,null,null);
});
var split__4 = (function (p,ch,t_buf_or_n,f_buf_or_n){var tc = cljs.core.async.chan.call(null,t_buf_or_n);var fc = cljs.core.async.chan.call(null,f_buf_or_n);var c__6636__auto___8931 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6637__auto__ = (function (){var switch__6586__auto__ = (function (state_8913){var state_val_8914 = (state_8913[1]);if((state_val_8914 === 1))
{var state_8913__$1 = state_8913;var statearr_8915_8932 = state_8913__$1;(statearr_8915_8932[2] = null);
(statearr_8915_8932[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8914 === 2))
{var state_8913__$1 = state_8913;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_8913__$1,4,ch);
} else
{if((state_val_8914 === 3))
{var inst_8911 = (state_8913[2]);var state_8913__$1 = state_8913;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_8913__$1,inst_8911);
} else
{if((state_val_8914 === 4))
{var inst_8894 = (state_8913[5]);var inst_8894__$1 = (state_8913[2]);var inst_8895 = (inst_8894__$1 == null);var state_8913__$1 = (function (){var statearr_8916 = state_8913;(statearr_8916[5] = inst_8894__$1);
return statearr_8916;
})();if(cljs.core.truth_(inst_8895))
{var statearr_8917_8933 = state_8913__$1;(statearr_8917_8933[1] = 5);
} else
{var statearr_8918_8934 = state_8913__$1;(statearr_8918_8934[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8914 === 5))
{var inst_8897 = cljs.core.async.close_BANG_.call(null,tc);var inst_8898 = cljs.core.async.close_BANG_.call(null,fc);var state_8913__$1 = (function (){var statearr_8919 = state_8913;(statearr_8919[6] = inst_8897);
return statearr_8919;
})();var statearr_8920_8935 = state_8913__$1;(statearr_8920_8935[2] = inst_8898);
(statearr_8920_8935[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8914 === 6))
{var inst_8894 = (state_8913[5]);var inst_8900 = p.call(null,inst_8894);var state_8913__$1 = state_8913;if(cljs.core.truth_(inst_8900))
{var statearr_8921_8936 = state_8913__$1;(statearr_8921_8936[1] = 9);
} else
{var statearr_8922_8937 = state_8913__$1;(statearr_8922_8937[1] = 10);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8914 === 7))
{var inst_8909 = (state_8913[2]);var state_8913__$1 = state_8913;var statearr_8923_8938 = state_8913__$1;(statearr_8923_8938[2] = inst_8909);
(statearr_8923_8938[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8914 === 8))
{var inst_8906 = (state_8913[2]);var state_8913__$1 = (function (){var statearr_8924 = state_8913;(statearr_8924[7] = inst_8906);
return statearr_8924;
})();var statearr_8925_8939 = state_8913__$1;(statearr_8925_8939[2] = null);
(statearr_8925_8939[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8914 === 9))
{var state_8913__$1 = state_8913;var statearr_8926_8940 = state_8913__$1;(statearr_8926_8940[2] = tc);
(statearr_8926_8940[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8914 === 10))
{var state_8913__$1 = state_8913;var statearr_8927_8941 = state_8913__$1;(statearr_8927_8941[2] = fc);
(statearr_8927_8941[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8914 === 11))
{var inst_8894 = (state_8913[5]);var inst_8904 = (state_8913[2]);var state_8913__$1 = state_8913;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_8913__$1,8,inst_8904,inst_8894);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6586__auto__){
return (function() {
var state_machine__6587__auto__ = null;
var state_machine__6587__auto____0 = (function (){var statearr_8929 = (new Array(8));(statearr_8929[0] = state_machine__6587__auto__);
(statearr_8929[1] = 1);
return statearr_8929;
});
var state_machine__6587__auto____1 = (function (state_8913){while(true){
var result__6588__auto__ = switch__6586__auto__.call(null,state_8913);if(cljs.core.keyword_identical_QMARK_.call(null,result__6588__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6588__auto__;
}
break;
}
});
state_machine__6587__auto__ = function(state_8913){
switch(arguments.length){
case 0:
return state_machine__6587__auto____0.call(this);
case 1:
return state_machine__6587__auto____1.call(this,state_8913);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6587__auto____0;
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6587__auto____1;
return state_machine__6587__auto__;
})()
;})(switch__6586__auto__))
})();var state__6638__auto__ = (function (){var statearr_8930 = f__6637__auto__.call(null);(statearr_8930[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6636__auto___8931);
return statearr_8930;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6638__auto__);
}));
return cljs.core.PersistentVector.fromArray([tc,fc], true);
});
split = function(p,ch,t_buf_or_n,f_buf_or_n){
switch(arguments.length){
case 2:
return split__2.call(this,p,ch);
case 4:
return split__4.call(this,p,ch,t_buf_or_n,f_buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
split.cljs$core$IFn$_invoke$arity$2 = split__2;
split.cljs$core$IFn$_invoke$arity$4 = split__4;
return split;
})()
;
/**
* f should be a function of 2 arguments. Returns a channel containing
* the single result of applying f to init and the first item from the
* channel, then applying f to that result and the 2nd item, etc. If
* the channel closes without yielding items, returns init and f is not
* called. ch must close before reduce produces a result.
*/
cljs.core.async.reduce = (function reduce(f,init,ch){var c__6636__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6637__auto__ = (function (){var switch__6586__auto__ = (function (state_8984){var state_val_8985 = (state_8984[1]);if((state_val_8985 === 7))
{var inst_8980 = (state_8984[2]);var state_8984__$1 = state_8984;var statearr_8986_8998 = state_8984__$1;(statearr_8986_8998[2] = inst_8980);
(statearr_8986_8998[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8985 === 6))
{var inst_8973 = (state_8984[5]);var inst_8970 = (state_8984[6]);var inst_8977 = f.call(null,inst_8970,inst_8973);var inst_8970__$1 = inst_8977;var state_8984__$1 = (function (){var statearr_8987 = state_8984;(statearr_8987[6] = inst_8970__$1);
return statearr_8987;
})();var statearr_8988_8999 = state_8984__$1;(statearr_8988_8999[2] = null);
(statearr_8988_8999[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8985 === 5))
{var inst_8970 = (state_8984[6]);var state_8984__$1 = state_8984;var statearr_8989_9000 = state_8984__$1;(statearr_8989_9000[2] = inst_8970);
(statearr_8989_9000[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8985 === 4))
{var inst_8973 = (state_8984[5]);var inst_8973__$1 = (state_8984[2]);var inst_8974 = (inst_8973__$1 == null);var state_8984__$1 = (function (){var statearr_8990 = state_8984;(statearr_8990[5] = inst_8973__$1);
return statearr_8990;
})();if(cljs.core.truth_(inst_8974))
{var statearr_8991_9001 = state_8984__$1;(statearr_8991_9001[1] = 5);
} else
{var statearr_8992_9002 = state_8984__$1;(statearr_8992_9002[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_8985 === 3))
{var inst_8982 = (state_8984[2]);var state_8984__$1 = state_8984;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_8984__$1,inst_8982);
} else
{if((state_val_8985 === 2))
{var state_8984__$1 = state_8984;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_8984__$1,4,ch);
} else
{if((state_val_8985 === 1))
{var inst_8970 = init;var state_8984__$1 = (function (){var statearr_8993 = state_8984;(statearr_8993[6] = inst_8970);
return statearr_8993;
})();var statearr_8994_9003 = state_8984__$1;(statearr_8994_9003[2] = null);
(statearr_8994_9003[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
});return ((function (switch__6586__auto__){
return (function() {
var state_machine__6587__auto__ = null;
var state_machine__6587__auto____0 = (function (){var statearr_8996 = (new Array(7));(statearr_8996[0] = state_machine__6587__auto__);
(statearr_8996[1] = 1);
return statearr_8996;
});
var state_machine__6587__auto____1 = (function (state_8984){while(true){
var result__6588__auto__ = switch__6586__auto__.call(null,state_8984);if(cljs.core.keyword_identical_QMARK_.call(null,result__6588__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6588__auto__;
}
break;
}
});
state_machine__6587__auto__ = function(state_8984){
switch(arguments.length){
case 0:
return state_machine__6587__auto____0.call(this);
case 1:
return state_machine__6587__auto____1.call(this,state_8984);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6587__auto____0;
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6587__auto____1;
return state_machine__6587__auto__;
})()
;})(switch__6586__auto__))
})();var state__6638__auto__ = (function (){var statearr_8997 = f__6637__auto__.call(null);(statearr_8997[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6636__auto__);
return statearr_8997;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6638__auto__);
}));
return c__6636__auto__;
});
/**
* Puts the contents of coll into the supplied channel.
* 
* By default the channel will be closed after the items are copied,
* but can be determined by the close? parameter.
* 
* Returns a channel which will close after the items are copied.
*/
cljs.core.async.onto_chan = (function() {
var onto_chan = null;
var onto_chan__2 = (function (ch,coll){return onto_chan.call(null,ch,coll,true);
});
var onto_chan__3 = (function (ch,coll,close_QMARK_){var c__6636__auto__ = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6637__auto__ = (function (){var switch__6586__auto__ = (function (state_9061){var state_val_9062 = (state_9061[1]);if((state_val_9062 === 1))
{var inst_9041 = cljs.core.seq.call(null,coll);var inst_9042 = inst_9041;var state_9061__$1 = (function (){var statearr_9063 = state_9061;(statearr_9063[5] = inst_9042);
return statearr_9063;
})();var statearr_9064_9078 = state_9061__$1;(statearr_9064_9078[2] = null);
(statearr_9064_9078[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9062 === 2))
{var inst_9042 = (state_9061[5]);var state_9061__$1 = state_9061;if(cljs.core.truth_(inst_9042))
{var statearr_9065_9079 = state_9061__$1;(statearr_9065_9079[1] = 4);
} else
{var statearr_9066_9080 = state_9061__$1;(statearr_9066_9080[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9062 === 3))
{var inst_9059 = (state_9061[2]);var state_9061__$1 = state_9061;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_9061__$1,inst_9059);
} else
{if((state_val_9062 === 4))
{var inst_9042 = (state_9061[5]);var inst_9045 = cljs.core.first.call(null,inst_9042);var state_9061__$1 = state_9061;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_9061__$1,7,ch,inst_9045);
} else
{if((state_val_9062 === 5))
{var state_9061__$1 = state_9061;if(cljs.core.truth_(close_QMARK_))
{var statearr_9067_9081 = state_9061__$1;(statearr_9067_9081[1] = 8);
} else
{var statearr_9068_9082 = state_9061__$1;(statearr_9068_9082[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9062 === 6))
{var inst_9057 = (state_9061[2]);var state_9061__$1 = state_9061;var statearr_9069_9083 = state_9061__$1;(statearr_9069_9083[2] = inst_9057);
(statearr_9069_9083[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9062 === 7))
{var inst_9042 = (state_9061[5]);var inst_9047 = (state_9061[2]);var inst_9048 = cljs.core.next.call(null,inst_9042);var inst_9042__$1 = inst_9048;var state_9061__$1 = (function (){var statearr_9070 = state_9061;(statearr_9070[5] = inst_9042__$1);
(statearr_9070[6] = inst_9047);
return statearr_9070;
})();var statearr_9071_9084 = state_9061__$1;(statearr_9071_9084[2] = null);
(statearr_9071_9084[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9062 === 8))
{var inst_9052 = cljs.core.async.close_BANG_.call(null,ch);var state_9061__$1 = state_9061;var statearr_9072_9085 = state_9061__$1;(statearr_9072_9085[2] = inst_9052);
(statearr_9072_9085[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9062 === 9))
{var state_9061__$1 = state_9061;var statearr_9073_9086 = state_9061__$1;(statearr_9073_9086[2] = null);
(statearr_9073_9086[1] = 10);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9062 === 10))
{var inst_9055 = (state_9061[2]);var state_9061__$1 = state_9061;var statearr_9074_9087 = state_9061__$1;(statearr_9074_9087[2] = inst_9055);
(statearr_9074_9087[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6586__auto__){
return (function() {
var state_machine__6587__auto__ = null;
var state_machine__6587__auto____0 = (function (){var statearr_9076 = (new Array(7));(statearr_9076[0] = state_machine__6587__auto__);
(statearr_9076[1] = 1);
return statearr_9076;
});
var state_machine__6587__auto____1 = (function (state_9061){while(true){
var result__6588__auto__ = switch__6586__auto__.call(null,state_9061);if(cljs.core.keyword_identical_QMARK_.call(null,result__6588__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6588__auto__;
}
break;
}
});
state_machine__6587__auto__ = function(state_9061){
switch(arguments.length){
case 0:
return state_machine__6587__auto____0.call(this);
case 1:
return state_machine__6587__auto____1.call(this,state_9061);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6587__auto____0;
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6587__auto____1;
return state_machine__6587__auto__;
})()
;})(switch__6586__auto__))
})();var state__6638__auto__ = (function (){var statearr_9077 = f__6637__auto__.call(null);(statearr_9077[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6636__auto__);
return statearr_9077;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6638__auto__);
}));
return c__6636__auto__;
});
onto_chan = function(ch,coll,close_QMARK_){
switch(arguments.length){
case 2:
return onto_chan__2.call(this,ch,coll);
case 3:
return onto_chan__3.call(this,ch,coll,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
onto_chan.cljs$core$IFn$_invoke$arity$2 = onto_chan__2;
onto_chan.cljs$core$IFn$_invoke$arity$3 = onto_chan__3;
return onto_chan;
})()
;
/**
* Creates and returns a channel which contains the contents of coll,
* closing when exhausted.
*/
cljs.core.async.to_chan = (function to_chan(coll){var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,100,coll));cljs.core.async.onto_chan.call(null,ch,coll);
return ch;
});
cljs.core.async.Mux = {};
cljs.core.async.muxch_STAR_ = (function muxch_STAR_(_){if((function (){var and__2954__auto__ = _;if(and__2954__auto__)
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else
{return and__2954__auto__;
}
})())
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else
{var x__3558__auto__ = (((_ == null))?null:_);return (function (){var or__2963__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__3558__auto__)]);if(or__2963__auto__)
{return or__2963__auto__;
} else
{var or__2963__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);if(or__2963__auto____$1)
{return or__2963__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
})().call(null,_);
}
});
cljs.core.async.Mult = {};
cljs.core.async.tap_STAR_ = (function tap_STAR_(m,ch,close_QMARK_){if((function (){var and__2954__auto__ = m;if(and__2954__auto__)
{return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else
{return and__2954__auto__;
}
})())
{return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else
{var x__3558__auto__ = (((m == null))?null:m);return (function (){var or__2963__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__3558__auto__)]);if(or__2963__auto__)
{return or__2963__auto__;
} else
{var or__2963__auto____$1 = (cljs.core.async.tap_STAR_["_"]);if(or__2963__auto____$1)
{return or__2963__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});
cljs.core.async.untap_STAR_ = (function untap_STAR_(m,ch){if((function (){var and__2954__auto__ = m;if(and__2954__auto__)
{return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else
{return and__2954__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else
{var x__3558__auto__ = (((m == null))?null:m);return (function (){var or__2963__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__3558__auto__)]);if(or__2963__auto__)
{return or__2963__auto__;
} else
{var or__2963__auto____$1 = (cljs.core.async.untap_STAR_["_"]);if(or__2963__auto____$1)
{return or__2963__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.untap_all_STAR_ = (function untap_all_STAR_(m){if((function (){var and__2954__auto__ = m;if(and__2954__auto__)
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else
{return and__2954__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else
{var x__3558__auto__ = (((m == null))?null:m);return (function (){var or__2963__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__3558__auto__)]);if(or__2963__auto__)
{return or__2963__auto__;
} else
{var or__2963__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);if(or__2963__auto____$1)
{return or__2963__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
})().call(null,m);
}
});
/**
* Creates and returns a mult(iple) of the supplied channel. Channels
* containing copies of the channel can be created with 'tap', and
* detached with 'untap'.
* 
* Each item is distributed to all taps in parallel and synchronously,
* i.e. each tap must accept before the next item is distributed. Use
* buffering/windowing to prevent slow taps from holding up the mult.
* 
* If a tap put throws an exception, it will be removed from the mult.
*/
cljs.core.async.mult = (function mult(ch){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var m = (function (){if(typeof cljs.core.async.t9300 !== 'undefined')
{} else
{goog.provide('cljs.core.async.t9300');

/**
* @constructor
*/
cljs.core.async.t9300 = (function (cs,ch,mult,meta9301){
this.cs = cs;
this.ch = ch;
this.mult = mult;
this.meta9301 = meta9301;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t9300.cljs$lang$type = true;
cljs.core.async.t9300.cljs$lang$ctorStr = "cljs.core.async/t9300";
cljs.core.async.t9300.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__3499__auto__,writer__3500__auto__,opt__3501__auto__){return cljs.core._write.call(null,writer__3500__auto__,"cljs.core.async/t9300");
});})(cs))
;
cljs.core.async.t9300.prototype.cljs$core$async$Mult$ = true;
cljs.core.async.t9300.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$2,close_QMARK_){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$2,close_QMARK_);
return null;
});})(cs))
;
cljs.core.async.t9300.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$2){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$2);
return null;
});})(cs))
;
cljs.core.async.t9300.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return null;
});})(cs))
;
cljs.core.async.t9300.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t9300.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(cs))
;
cljs.core.async.t9300.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_9302){var self__ = this;
var _9302__$1 = this;return self__.meta9301;
});})(cs))
;
cljs.core.async.t9300.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_9302,meta9301__$1){var self__ = this;
var _9302__$1 = this;return (new cljs.core.async.t9300(self__.cs,self__.ch,self__.mult,meta9301__$1));
});})(cs))
;
cljs.core.async.__GT_t9300 = ((function (cs){
return (function __GT_t9300(cs__$1,ch__$1,mult__$1,meta9301){return (new cljs.core.async.t9300(cs__$1,ch__$1,mult__$1,meta9301));
});})(cs))
;
}
return (new cljs.core.async.t9300(cs,ch,mult,null));
})();var dchan = cljs.core.async.chan.call(null,1);var dctr = cljs.core.atom.call(null,null);var done = ((function (cs,m,dchan,dctr){
return (function (){if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === 0))
{return cljs.core.async.put_BANG_.call(null,dchan,true);
} else
{return null;
}
});})(cs,m,dchan,dctr))
;var c__6636__auto___9512 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6637__auto__ = (function (){var switch__6586__auto__ = (function (state_9430){var state_val_9431 = (state_9430[1]);if((state_val_9431 === 32))
{try{var inst_9305 = (state_9430[5]);var inst_9381 = (state_9430[6]);var inst_9387 = cljs.core.async.put_BANG_.call(null,inst_9381,inst_9305,done);var state_9430__$1 = state_9430;var statearr_9434_9513 = state_9430__$1;(statearr_9434_9513[2] = inst_9387);
(statearr_9434_9513[1] = 30);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
}catch (e9432){if((e9432 instanceof Object))
{var ex__6580__auto__ = e9432;var statearr_9433_9514 = state_9430;(statearr_9433_9514[1] = 31);
(statearr_9433_9514[2] = ex__6580__auto__);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e9432;
} else
{return null;
}
}
}} else
{if((state_val_9431 === 1))
{var state_9430__$1 = state_9430;var statearr_9435_9515 = state_9430__$1;(statearr_9435_9515[2] = null);
(statearr_9435_9515[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 33))
{var inst_9393 = (state_9430[7]);var inst_9395 = cljs.core.chunked_seq_QMARK_.call(null,inst_9393);var state_9430__$1 = state_9430;if(inst_9395)
{var statearr_9436_9516 = state_9430__$1;(statearr_9436_9516[1] = 36);
} else
{var statearr_9437_9517 = state_9430__$1;(statearr_9437_9517[1] = 37);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 2))
{var state_9430__$1 = state_9430;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_9430__$1,4,ch);
} else
{if((state_val_9431 === 34))
{var state_9430__$1 = state_9430;var statearr_9438_9518 = state_9430__$1;(statearr_9438_9518[2] = null);
(statearr_9438_9518[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 3))
{var inst_9428 = (state_9430[2]);var state_9430__$1 = state_9430;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_9430__$1,inst_9428);
} else
{if((state_val_9431 === 35))
{var inst_9417 = (state_9430[2]);var state_9430__$1 = state_9430;var statearr_9439_9519 = state_9430__$1;(statearr_9439_9519[2] = inst_9417);
(statearr_9439_9519[1] = 29);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 4))
{var inst_9305 = (state_9430[5]);var inst_9305__$1 = (state_9430[2]);var inst_9306 = (inst_9305__$1 == null);var state_9430__$1 = (function (){var statearr_9440 = state_9430;(statearr_9440[5] = inst_9305__$1);
return statearr_9440;
})();if(cljs.core.truth_(inst_9306))
{var statearr_9441_9520 = state_9430__$1;(statearr_9441_9520[1] = 5);
} else
{var statearr_9442_9521 = state_9430__$1;(statearr_9442_9521[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 36))
{var inst_9393 = (state_9430[7]);var inst_9397 = cljs.core.chunk_first.call(null,inst_9393);var inst_9398 = cljs.core.chunk_rest.call(null,inst_9393);var inst_9399 = cljs.core.count.call(null,inst_9397);var inst_9373 = inst_9398;var inst_9374 = inst_9397;var inst_9375 = inst_9399;var inst_9376 = 0;var state_9430__$1 = (function (){var statearr_9443 = state_9430;(statearr_9443[8] = inst_9373);
(statearr_9443[9] = inst_9375);
(statearr_9443[10] = inst_9374);
(statearr_9443[11] = inst_9376);
return statearr_9443;
})();var statearr_9444_9522 = state_9430__$1;(statearr_9444_9522[2] = null);
(statearr_9444_9522[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 5))
{var inst_9312 = cljs.core.deref.call(null,cs);var inst_9313 = cljs.core.seq.call(null,inst_9312);var inst_9314 = inst_9313;var inst_9315 = null;var inst_9316 = 0;var inst_9317 = 0;var state_9430__$1 = (function (){var statearr_9445 = state_9430;(statearr_9445[12] = inst_9317);
(statearr_9445[13] = inst_9316);
(statearr_9445[14] = inst_9314);
(statearr_9445[15] = inst_9315);
return statearr_9445;
})();var statearr_9446_9523 = state_9430__$1;(statearr_9446_9523[2] = null);
(statearr_9446_9523[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 37))
{var inst_9393 = (state_9430[7]);var inst_9402 = cljs.core.first.call(null,inst_9393);var state_9430__$1 = (function (){var statearr_9447 = state_9430;(statearr_9447[16] = inst_9402);
return statearr_9447;
})();var statearr_9448_9524 = state_9430__$1;(statearr_9448_9524[2] = null);
(statearr_9448_9524[1] = 41);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 6))
{var inst_9364 = cljs.core.deref.call(null,cs);var inst_9365 = cljs.core.keys.call(null,inst_9364);var inst_9366 = cljs.core.count.call(null,inst_9365);var inst_9367 = cljs.core.reset_BANG_.call(null,dctr,inst_9366);var inst_9372 = cljs.core.seq.call(null,inst_9365);var inst_9373 = inst_9372;var inst_9374 = null;var inst_9375 = 0;var inst_9376 = 0;var state_9430__$1 = (function (){var statearr_9449 = state_9430;(statearr_9449[8] = inst_9373);
(statearr_9449[17] = inst_9367);
(statearr_9449[9] = inst_9375);
(statearr_9449[10] = inst_9374);
(statearr_9449[11] = inst_9376);
return statearr_9449;
})();var statearr_9450_9525 = state_9430__$1;(statearr_9450_9525[2] = null);
(statearr_9450_9525[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 38))
{var inst_9414 = (state_9430[2]);var state_9430__$1 = state_9430;var statearr_9451_9526 = state_9430__$1;(statearr_9451_9526[2] = inst_9414);
(statearr_9451_9526[1] = 35);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 7))
{var inst_9426 = (state_9430[2]);var state_9430__$1 = state_9430;var statearr_9452_9527 = state_9430__$1;(statearr_9452_9527[2] = inst_9426);
(statearr_9452_9527[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 39))
{var inst_9393 = (state_9430[7]);var inst_9410 = (state_9430[2]);var inst_9411 = cljs.core.next.call(null,inst_9393);var inst_9373 = inst_9411;var inst_9374 = null;var inst_9375 = 0;var inst_9376 = 0;var state_9430__$1 = (function (){var statearr_9453 = state_9430;(statearr_9453[8] = inst_9373);
(statearr_9453[9] = inst_9375);
(statearr_9453[10] = inst_9374);
(statearr_9453[18] = inst_9410);
(statearr_9453[11] = inst_9376);
return statearr_9453;
})();var statearr_9454_9528 = state_9430__$1;(statearr_9454_9528[2] = null);
(statearr_9454_9528[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 8))
{var inst_9317 = (state_9430[12]);var inst_9316 = (state_9430[13]);var inst_9319 = (inst_9317 < inst_9316);var inst_9320 = inst_9319;var state_9430__$1 = state_9430;if(cljs.core.truth_(inst_9320))
{var statearr_9455_9529 = state_9430__$1;(statearr_9455_9529[1] = 10);
} else
{var statearr_9456_9530 = state_9430__$1;(statearr_9456_9530[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 40))
{var inst_9402 = (state_9430[16]);var inst_9403 = (state_9430[2]);var inst_9404 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_9405 = cljs.core.async.untap_STAR_.call(null,m,inst_9402);var state_9430__$1 = (function (){var statearr_9457 = state_9430;(statearr_9457[19] = inst_9403);
(statearr_9457[20] = inst_9404);
return statearr_9457;
})();var statearr_9458_9531 = state_9430__$1;(statearr_9458_9531[2] = inst_9405);
(statearr_9458_9531[1] = 39);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 9))
{var inst_9362 = (state_9430[2]);var state_9430__$1 = state_9430;var statearr_9459_9532 = state_9430__$1;(statearr_9459_9532[2] = inst_9362);
(statearr_9459_9532[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 41))
{try{var inst_9305 = (state_9430[5]);var inst_9402 = (state_9430[16]);var inst_9408 = cljs.core.async.put_BANG_.call(null,inst_9402,inst_9305,done);var state_9430__$1 = state_9430;var statearr_9462_9533 = state_9430__$1;(statearr_9462_9533[2] = inst_9408);
(statearr_9462_9533[1] = 39);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
}catch (e9460){if((e9460 instanceof Object))
{var ex__6580__auto__ = e9460;var statearr_9461_9534 = state_9430;(statearr_9461_9534[1] = 40);
(statearr_9461_9534[2] = ex__6580__auto__);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e9460;
} else
{return null;
}
}
}} else
{if((state_val_9431 === 10))
{var inst_9317 = (state_9430[12]);var inst_9315 = (state_9430[15]);var inst_9323 = cljs.core._nth.call(null,inst_9315,inst_9317);var inst_9324 = cljs.core.nth.call(null,inst_9323,0,null);var inst_9325 = cljs.core.nth.call(null,inst_9323,1,null);var state_9430__$1 = (function (){var statearr_9463 = state_9430;(statearr_9463[21] = inst_9324);
return statearr_9463;
})();if(cljs.core.truth_(inst_9325))
{var statearr_9464_9535 = state_9430__$1;(statearr_9464_9535[1] = 13);
} else
{var statearr_9465_9536 = state_9430__$1;(statearr_9465_9536[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 42))
{var inst_9423 = (state_9430[2]);var state_9430__$1 = (function (){var statearr_9466 = state_9430;(statearr_9466[22] = inst_9423);
return statearr_9466;
})();var statearr_9467_9537 = state_9430__$1;(statearr_9467_9537[2] = null);
(statearr_9467_9537[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 11))
{var inst_9314 = (state_9430[14]);var inst_9334 = (state_9430[23]);var inst_9334__$1 = cljs.core.seq.call(null,inst_9314);var state_9430__$1 = (function (){var statearr_9468 = state_9430;(statearr_9468[23] = inst_9334__$1);
return statearr_9468;
})();if(inst_9334__$1)
{var statearr_9469_9538 = state_9430__$1;(statearr_9469_9538[1] = 16);
} else
{var statearr_9470_9539 = state_9430__$1;(statearr_9470_9539[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 12))
{var inst_9360 = (state_9430[2]);var state_9430__$1 = state_9430;var statearr_9471_9540 = state_9430__$1;(statearr_9471_9540[2] = inst_9360);
(statearr_9471_9540[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 13))
{var inst_9324 = (state_9430[21]);var inst_9327 = cljs.core.async.close_BANG_.call(null,inst_9324);var state_9430__$1 = state_9430;var statearr_9475_9541 = state_9430__$1;(statearr_9475_9541[2] = inst_9327);
(statearr_9475_9541[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 14))
{var state_9430__$1 = state_9430;var statearr_9476_9542 = state_9430__$1;(statearr_9476_9542[2] = null);
(statearr_9476_9542[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 15))
{var inst_9317 = (state_9430[12]);var inst_9316 = (state_9430[13]);var inst_9314 = (state_9430[14]);var inst_9315 = (state_9430[15]);var inst_9330 = (state_9430[2]);var inst_9331 = (inst_9317 + 1);var tmp9472 = inst_9316;var tmp9473 = inst_9314;var tmp9474 = inst_9315;var inst_9314__$1 = tmp9473;var inst_9315__$1 = tmp9474;var inst_9316__$1 = tmp9472;var inst_9317__$1 = inst_9331;var state_9430__$1 = (function (){var statearr_9477 = state_9430;(statearr_9477[12] = inst_9317__$1);
(statearr_9477[13] = inst_9316__$1);
(statearr_9477[14] = inst_9314__$1);
(statearr_9477[15] = inst_9315__$1);
(statearr_9477[24] = inst_9330);
return statearr_9477;
})();var statearr_9478_9543 = state_9430__$1;(statearr_9478_9543[2] = null);
(statearr_9478_9543[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 16))
{var inst_9334 = (state_9430[23]);var inst_9336 = cljs.core.chunked_seq_QMARK_.call(null,inst_9334);var state_9430__$1 = state_9430;if(inst_9336)
{var statearr_9479_9544 = state_9430__$1;(statearr_9479_9544[1] = 19);
} else
{var statearr_9480_9545 = state_9430__$1;(statearr_9480_9545[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 17))
{var state_9430__$1 = state_9430;var statearr_9481_9546 = state_9430__$1;(statearr_9481_9546[2] = null);
(statearr_9481_9546[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 18))
{var inst_9358 = (state_9430[2]);var state_9430__$1 = state_9430;var statearr_9482_9547 = state_9430__$1;(statearr_9482_9547[2] = inst_9358);
(statearr_9482_9547[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 19))
{var inst_9334 = (state_9430[23]);var inst_9338 = cljs.core.chunk_first.call(null,inst_9334);var inst_9339 = cljs.core.chunk_rest.call(null,inst_9334);var inst_9340 = cljs.core.count.call(null,inst_9338);var inst_9314 = inst_9339;var inst_9315 = inst_9338;var inst_9316 = inst_9340;var inst_9317 = 0;var state_9430__$1 = (function (){var statearr_9483 = state_9430;(statearr_9483[12] = inst_9317);
(statearr_9483[13] = inst_9316);
(statearr_9483[14] = inst_9314);
(statearr_9483[15] = inst_9315);
return statearr_9483;
})();var statearr_9484_9548 = state_9430__$1;(statearr_9484_9548[2] = null);
(statearr_9484_9548[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 20))
{var inst_9334 = (state_9430[23]);var inst_9344 = cljs.core.first.call(null,inst_9334);var inst_9345 = cljs.core.nth.call(null,inst_9344,0,null);var inst_9346 = cljs.core.nth.call(null,inst_9344,1,null);var state_9430__$1 = (function (){var statearr_9485 = state_9430;(statearr_9485[25] = inst_9345);
return statearr_9485;
})();if(cljs.core.truth_(inst_9346))
{var statearr_9486_9549 = state_9430__$1;(statearr_9486_9549[1] = 22);
} else
{var statearr_9487_9550 = state_9430__$1;(statearr_9487_9550[1] = 23);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 21))
{var inst_9355 = (state_9430[2]);var state_9430__$1 = state_9430;var statearr_9488_9551 = state_9430__$1;(statearr_9488_9551[2] = inst_9355);
(statearr_9488_9551[1] = 18);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 22))
{var inst_9345 = (state_9430[25]);var inst_9348 = cljs.core.async.close_BANG_.call(null,inst_9345);var state_9430__$1 = state_9430;var statearr_9489_9552 = state_9430__$1;(statearr_9489_9552[2] = inst_9348);
(statearr_9489_9552[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 23))
{var state_9430__$1 = state_9430;var statearr_9490_9553 = state_9430__$1;(statearr_9490_9553[2] = null);
(statearr_9490_9553[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 24))
{var inst_9334 = (state_9430[23]);var inst_9351 = (state_9430[2]);var inst_9352 = cljs.core.next.call(null,inst_9334);var inst_9314 = inst_9352;var inst_9315 = null;var inst_9316 = 0;var inst_9317 = 0;var state_9430__$1 = (function (){var statearr_9491 = state_9430;(statearr_9491[12] = inst_9317);
(statearr_9491[13] = inst_9316);
(statearr_9491[14] = inst_9314);
(statearr_9491[15] = inst_9315);
(statearr_9491[26] = inst_9351);
return statearr_9491;
})();var statearr_9492_9554 = state_9430__$1;(statearr_9492_9554[2] = null);
(statearr_9492_9554[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 25))
{var inst_9375 = (state_9430[9]);var inst_9376 = (state_9430[11]);var inst_9378 = (inst_9376 < inst_9375);var inst_9379 = inst_9378;var state_9430__$1 = state_9430;if(cljs.core.truth_(inst_9379))
{var statearr_9493_9555 = state_9430__$1;(statearr_9493_9555[1] = 27);
} else
{var statearr_9494_9556 = state_9430__$1;(statearr_9494_9556[1] = 28);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 26))
{var inst_9421 = (state_9430[2]);var state_9430__$1 = (function (){var statearr_9495 = state_9430;(statearr_9495[27] = inst_9421);
return statearr_9495;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_9430__$1,42,dchan);
} else
{if((state_val_9431 === 27))
{var inst_9374 = (state_9430[10]);var inst_9376 = (state_9430[11]);var inst_9381 = cljs.core._nth.call(null,inst_9374,inst_9376);var state_9430__$1 = (function (){var statearr_9496 = state_9430;(statearr_9496[6] = inst_9381);
return statearr_9496;
})();var statearr_9497_9557 = state_9430__$1;(statearr_9497_9557[2] = null);
(statearr_9497_9557[1] = 32);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 28))
{var inst_9373 = (state_9430[8]);var inst_9393 = (state_9430[7]);var inst_9393__$1 = cljs.core.seq.call(null,inst_9373);var state_9430__$1 = (function (){var statearr_9501 = state_9430;(statearr_9501[7] = inst_9393__$1);
return statearr_9501;
})();if(inst_9393__$1)
{var statearr_9502_9558 = state_9430__$1;(statearr_9502_9558[1] = 33);
} else
{var statearr_9503_9559 = state_9430__$1;(statearr_9503_9559[1] = 34);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 29))
{var inst_9419 = (state_9430[2]);var state_9430__$1 = state_9430;var statearr_9504_9560 = state_9430__$1;(statearr_9504_9560[2] = inst_9419);
(statearr_9504_9560[1] = 26);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 30))
{var inst_9373 = (state_9430[8]);var inst_9375 = (state_9430[9]);var inst_9374 = (state_9430[10]);var inst_9376 = (state_9430[11]);var inst_9389 = (state_9430[2]);var inst_9390 = (inst_9376 + 1);var tmp9498 = inst_9373;var tmp9499 = inst_9375;var tmp9500 = inst_9374;var inst_9373__$1 = tmp9498;var inst_9374__$1 = tmp9500;var inst_9375__$1 = tmp9499;var inst_9376__$1 = inst_9390;var state_9430__$1 = (function (){var statearr_9505 = state_9430;(statearr_9505[28] = inst_9389);
(statearr_9505[8] = inst_9373__$1);
(statearr_9505[9] = inst_9375__$1);
(statearr_9505[10] = inst_9374__$1);
(statearr_9505[11] = inst_9376__$1);
return statearr_9505;
})();var statearr_9506_9561 = state_9430__$1;(statearr_9506_9561[2] = null);
(statearr_9506_9561[1] = 25);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9431 === 31))
{var inst_9381 = (state_9430[6]);var inst_9382 = (state_9430[2]);var inst_9383 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var inst_9384 = cljs.core.async.untap_STAR_.call(null,m,inst_9381);var state_9430__$1 = (function (){var statearr_9507 = state_9430;(statearr_9507[29] = inst_9382);
(statearr_9507[30] = inst_9383);
return statearr_9507;
})();var statearr_9508_9562 = state_9430__$1;(statearr_9508_9562[2] = inst_9384);
(statearr_9508_9562[1] = 30);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6586__auto__){
return (function() {
var state_machine__6587__auto__ = null;
var state_machine__6587__auto____0 = (function (){var statearr_9510 = (new Array(31));(statearr_9510[0] = state_machine__6587__auto__);
(statearr_9510[1] = 1);
return statearr_9510;
});
var state_machine__6587__auto____1 = (function (state_9430){while(true){
var result__6588__auto__ = switch__6586__auto__.call(null,state_9430);if(cljs.core.keyword_identical_QMARK_.call(null,result__6588__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6588__auto__;
}
break;
}
});
state_machine__6587__auto__ = function(state_9430){
switch(arguments.length){
case 0:
return state_machine__6587__auto____0.call(this);
case 1:
return state_machine__6587__auto____1.call(this,state_9430);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6587__auto____0;
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6587__auto____1;
return state_machine__6587__auto__;
})()
;})(switch__6586__auto__))
})();var state__6638__auto__ = (function (){var statearr_9511 = f__6637__auto__.call(null);(statearr_9511[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6636__auto___9512);
return statearr_9511;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6638__auto__);
}));
return m;
});
/**
* Copies the mult source onto the supplied channel.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.tap = (function() {
var tap = null;
var tap__2 = (function (mult,ch){return tap.call(null,mult,ch,true);
});
var tap__3 = (function (mult,ch,close_QMARK_){cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);
return ch;
});
tap = function(mult,ch,close_QMARK_){
switch(arguments.length){
case 2:
return tap__2.call(this,mult,ch);
case 3:
return tap__3.call(this,mult,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
tap.cljs$core$IFn$_invoke$arity$2 = tap__2;
tap.cljs$core$IFn$_invoke$arity$3 = tap__3;
return tap;
})()
;
/**
* Disconnects a target channel from a mult
*/
cljs.core.async.untap = (function untap(mult,ch){return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
* Disconnects all target channels from a mult
*/
cljs.core.async.untap_all = (function untap_all(mult){return cljs.core.async.untap_all_STAR_.call(null,mult);
});
cljs.core.async.Mix = {};
cljs.core.async.admix_STAR_ = (function admix_STAR_(m,ch){if((function (){var and__2954__auto__ = m;if(and__2954__auto__)
{return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else
{return and__2954__auto__;
}
})())
{return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else
{var x__3558__auto__ = (((m == null))?null:m);return (function (){var or__2963__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__3558__auto__)]);if(or__2963__auto__)
{return or__2963__auto__;
} else
{var or__2963__auto____$1 = (cljs.core.async.admix_STAR_["_"]);if(or__2963__auto____$1)
{return or__2963__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_STAR_ = (function unmix_STAR_(m,ch){if((function (){var and__2954__auto__ = m;if(and__2954__auto__)
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else
{return and__2954__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else
{var x__3558__auto__ = (((m == null))?null:m);return (function (){var or__2963__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__3558__auto__)]);if(or__2963__auto__)
{return or__2963__auto__;
} else
{var or__2963__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);if(or__2963__auto____$1)
{return or__2963__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_all_STAR_ = (function unmix_all_STAR_(m){if((function (){var and__2954__auto__ = m;if(and__2954__auto__)
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else
{return and__2954__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else
{var x__3558__auto__ = (((m == null))?null:m);return (function (){var or__2963__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__3558__auto__)]);if(or__2963__auto__)
{return or__2963__auto__;
} else
{var or__2963__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);if(or__2963__auto____$1)
{return or__2963__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});
cljs.core.async.toggle_STAR_ = (function toggle_STAR_(m,state_map){if((function (){var and__2954__auto__ = m;if(and__2954__auto__)
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else
{return and__2954__auto__;
}
})())
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else
{var x__3558__auto__ = (((m == null))?null:m);return (function (){var or__2963__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__3558__auto__)]);if(or__2963__auto__)
{return or__2963__auto__;
} else
{var or__2963__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);if(or__2963__auto____$1)
{return or__2963__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});
cljs.core.async.solo_mode_STAR_ = (function solo_mode_STAR_(m,mode){if((function (){var and__2954__auto__ = m;if(and__2954__auto__)
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else
{return and__2954__auto__;
}
})())
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else
{var x__3558__auto__ = (((m == null))?null:m);return (function (){var or__2963__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__3558__auto__)]);if(or__2963__auto__)
{return or__2963__auto__;
} else
{var or__2963__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);if(or__2963__auto____$1)
{return or__2963__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
})().call(null,m,mode);
}
});
/**
* Creates and returns a mix of one or more input channels which will
* be put on the supplied out channel. Input sources can be added to
* the mix with 'admix', and removed with 'unmix'. A mix supports
* soloing, muting and pausing multiple inputs atomically using
* 'toggle', and can solo using either muting or pausing as determined
* by 'solo-mode'.
* 
* Each channel can have zero or more boolean modes set via 'toggle':
* 
* :solo - when true, only this (ond other soloed) channel(s) will appear
* in the mix output channel. :mute and :pause states of soloed
* channels are ignored. If solo-mode is :mute, non-soloed
* channels are muted, if :pause, non-soloed channels are
* paused.
* 
* :mute - muted channels will have their contents consumed but not included in the mix
* :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
*/
cljs.core.async.mix = (function mix(out){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var solo_modes = cljs.core.PersistentHashSet.fromArray([new cljs.core.Keyword(null,"pause","pause",1120344424),null,new cljs.core.Keyword(null,"mute","mute",1017267595),null], true);var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",1017440337));var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1017267595));var change = cljs.core.async.chan.call(null);var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){if(cljs.core.truth_(attr.call(null,v)))
{return cljs.core.conj.call(null,ret,c);
} else
{return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){var chs = cljs.core.deref.call(null,cs);var mode = cljs.core.deref.call(null,solo_mode);var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",1017440337),chs);var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",1120344424),chs);return cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"solos","solos",1123523302),solos,new cljs.core.Keyword(null,"mutes","mutes",1118168300),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1017267595),chs),new cljs.core.Keyword(null,"reads","reads",1122290959),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",1120344424))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], true);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;var m = (function (){if(typeof cljs.core.async.t9668 !== 'undefined')
{} else
{goog.provide('cljs.core.async.t9668');

/**
* @constructor
*/
cljs.core.async.t9668 = (function (pick,out,attrs,cs,calc_state,solo_modes,mix,changed,change,solo_mode,meta9669){
this.pick = pick;
this.out = out;
this.attrs = attrs;
this.cs = cs;
this.calc_state = calc_state;
this.solo_modes = solo_modes;
this.mix = mix;
this.changed = changed;
this.change = change;
this.solo_mode = solo_mode;
this.meta9669 = meta9669;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t9668.cljs$lang$type = true;
cljs.core.async.t9668.cljs$lang$ctorStr = "cljs.core.async/t9668";
cljs.core.async.t9668.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__3499__auto__,writer__3500__auto__,opt__3501__auto__){return cljs.core._write.call(null,writer__3500__auto__,"cljs.core.async/t9668");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t9668.prototype.cljs$core$async$Mix$ = true;
cljs.core.async.t9668.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t9668.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t9668.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t9668.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,core.merge),state_map);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t9668.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.solo_modes.call(null,mode)))
{} else
{throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",-1162732933,null),new cljs.core.Symbol(null,"mode","mode",-1637174436,null))))].join('')));
}
cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t9668.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t9668.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t9668.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_9670){var self__ = this;
var _9670__$1 = this;return self__.meta9669;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t9668.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_9670,meta9669__$1){var self__ = this;
var _9670__$1 = this;return (new cljs.core.async.t9668(self__.pick,self__.out,self__.attrs,self__.cs,self__.calc_state,self__.solo_modes,self__.mix,self__.changed,self__.change,self__.solo_mode,meta9669__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.__GT_t9668 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function __GT_t9668(pick__$1,out__$1,attrs__$1,cs__$1,calc_state__$1,solo_modes__$1,mix__$1,changed__$1,change__$1,solo_mode__$1,meta9669){return (new cljs.core.async.t9668(pick__$1,out__$1,attrs__$1,cs__$1,calc_state__$1,solo_modes__$1,mix__$1,changed__$1,change__$1,solo_mode__$1,meta9669));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
}
return (new cljs.core.async.t9668(pick,out,attrs,cs,calc_state,solo_modes,mix,changed,change,solo_mode,null));
})();var c__6636__auto___9773 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6637__auto__ = (function (){var switch__6586__auto__ = (function (state_9735){var state_val_9736 = (state_9735[1]);if((state_val_9736 === 1))
{var inst_9674 = (state_9735[5]);var inst_9674__$1 = calc_state.call(null);var inst_9675 = cljs.core.seq_QMARK_.call(null,inst_9674__$1);var state_9735__$1 = (function (){var statearr_9737 = state_9735;(statearr_9737[5] = inst_9674__$1);
return statearr_9737;
})();if(inst_9675)
{var statearr_9738_9774 = state_9735__$1;(statearr_9738_9774[1] = 2);
} else
{var statearr_9739_9775 = state_9735__$1;(statearr_9739_9775[1] = 3);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 2))
{var inst_9674 = (state_9735[5]);var inst_9677 = cljs.core.apply.call(null,cljs.core.hash_map,inst_9674);var state_9735__$1 = state_9735;var statearr_9740_9776 = state_9735__$1;(statearr_9740_9776[2] = inst_9677);
(statearr_9740_9776[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 3))
{var inst_9674 = (state_9735[5]);var state_9735__$1 = state_9735;var statearr_9741_9777 = state_9735__$1;(statearr_9741_9777[2] = inst_9674);
(statearr_9741_9777[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 4))
{var inst_9674 = (state_9735[5]);var inst_9680 = (state_9735[2]);var inst_9681 = cljs.core.get.call(null,inst_9680,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_9682 = cljs.core.get.call(null,inst_9680,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_9683 = cljs.core.get.call(null,inst_9680,new cljs.core.Keyword(null,"solos","solos",1123523302));var inst_9684 = inst_9674;var state_9735__$1 = (function (){var statearr_9742 = state_9735;(statearr_9742[6] = inst_9681);
(statearr_9742[7] = inst_9683);
(statearr_9742[8] = inst_9682);
(statearr_9742[9] = inst_9684);
return statearr_9742;
})();var statearr_9743_9778 = state_9735__$1;(statearr_9743_9778[2] = null);
(statearr_9743_9778[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 5))
{var inst_9684 = (state_9735[9]);var inst_9687 = cljs.core.seq_QMARK_.call(null,inst_9684);var state_9735__$1 = state_9735;if(inst_9687)
{var statearr_9744_9779 = state_9735__$1;(statearr_9744_9779[1] = 7);
} else
{var statearr_9745_9780 = state_9735__$1;(statearr_9745_9780[1] = 8);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 6))
{var inst_9733 = (state_9735[2]);var state_9735__$1 = state_9735;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_9735__$1,inst_9733);
} else
{if((state_val_9736 === 7))
{var inst_9684 = (state_9735[9]);var inst_9689 = cljs.core.apply.call(null,cljs.core.hash_map,inst_9684);var state_9735__$1 = state_9735;var statearr_9746_9781 = state_9735__$1;(statearr_9746_9781[2] = inst_9689);
(statearr_9746_9781[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 8))
{var inst_9684 = (state_9735[9]);var state_9735__$1 = state_9735;var statearr_9747_9782 = state_9735__$1;(statearr_9747_9782[2] = inst_9684);
(statearr_9747_9782[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 9))
{var inst_9692 = (state_9735[10]);var inst_9692__$1 = (state_9735[2]);var inst_9693 = cljs.core.get.call(null,inst_9692__$1,new cljs.core.Keyword(null,"reads","reads",1122290959));var inst_9694 = cljs.core.get.call(null,inst_9692__$1,new cljs.core.Keyword(null,"mutes","mutes",1118168300));var inst_9695 = cljs.core.get.call(null,inst_9692__$1,new cljs.core.Keyword(null,"solos","solos",1123523302));var state_9735__$1 = (function (){var statearr_9748 = state_9735;(statearr_9748[10] = inst_9692__$1);
(statearr_9748[11] = inst_9694);
(statearr_9748[12] = inst_9695);
return statearr_9748;
})();return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_9735__$1,10,inst_9693);
} else
{if((state_val_9736 === 10))
{var inst_9700 = (state_9735[13]);var inst_9699 = (state_9735[14]);var inst_9698 = (state_9735[2]);var inst_9699__$1 = cljs.core.nth.call(null,inst_9698,0,null);var inst_9700__$1 = cljs.core.nth.call(null,inst_9698,1,null);var inst_9701 = (inst_9699__$1 == null);var inst_9702 = cljs.core._EQ_.call(null,inst_9700__$1,change);var inst_9703 = (inst_9701) || (inst_9702);var state_9735__$1 = (function (){var statearr_9749 = state_9735;(statearr_9749[13] = inst_9700__$1);
(statearr_9749[14] = inst_9699__$1);
return statearr_9749;
})();if(cljs.core.truth_(inst_9703))
{var statearr_9750_9783 = state_9735__$1;(statearr_9750_9783[1] = 11);
} else
{var statearr_9751_9784 = state_9735__$1;(statearr_9751_9784[1] = 12);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 11))
{var inst_9699 = (state_9735[14]);var inst_9705 = (inst_9699 == null);var state_9735__$1 = state_9735;if(cljs.core.truth_(inst_9705))
{var statearr_9752_9785 = state_9735__$1;(statearr_9752_9785[1] = 14);
} else
{var statearr_9753_9786 = state_9735__$1;(statearr_9753_9786[1] = 15);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 12))
{var inst_9700 = (state_9735[13]);var inst_9714 = (state_9735[15]);var inst_9695 = (state_9735[12]);var inst_9714__$1 = inst_9695.call(null,inst_9700);var state_9735__$1 = (function (){var statearr_9754 = state_9735;(statearr_9754[15] = inst_9714__$1);
return statearr_9754;
})();if(cljs.core.truth_(inst_9714__$1))
{var statearr_9755_9787 = state_9735__$1;(statearr_9755_9787[1] = 17);
} else
{var statearr_9756_9788 = state_9735__$1;(statearr_9756_9788[1] = 18);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 13))
{var inst_9731 = (state_9735[2]);var state_9735__$1 = state_9735;var statearr_9757_9789 = state_9735__$1;(statearr_9757_9789[2] = inst_9731);
(statearr_9757_9789[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 14))
{var inst_9700 = (state_9735[13]);var inst_9707 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_9700);var state_9735__$1 = state_9735;var statearr_9758_9790 = state_9735__$1;(statearr_9758_9790[2] = inst_9707);
(statearr_9758_9790[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 15))
{var state_9735__$1 = state_9735;var statearr_9759_9791 = state_9735__$1;(statearr_9759_9791[2] = null);
(statearr_9759_9791[1] = 16);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 16))
{var inst_9710 = (state_9735[2]);var inst_9711 = calc_state.call(null);var inst_9684 = inst_9711;var state_9735__$1 = (function (){var statearr_9760 = state_9735;(statearr_9760[16] = inst_9710);
(statearr_9760[9] = inst_9684);
return statearr_9760;
})();var statearr_9761_9792 = state_9735__$1;(statearr_9761_9792[2] = null);
(statearr_9761_9792[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 17))
{var inst_9714 = (state_9735[15]);var state_9735__$1 = state_9735;var statearr_9762_9793 = state_9735__$1;(statearr_9762_9793[2] = inst_9714);
(statearr_9762_9793[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 18))
{var inst_9700 = (state_9735[13]);var inst_9694 = (state_9735[11]);var inst_9695 = (state_9735[12]);var inst_9717 = cljs.core.empty_QMARK_.call(null,inst_9695);var inst_9718 = inst_9694.call(null,inst_9700);var inst_9719 = cljs.core.not.call(null,inst_9718);var inst_9720 = (inst_9717) && (inst_9719);var state_9735__$1 = state_9735;var statearr_9763_9794 = state_9735__$1;(statearr_9763_9794[2] = inst_9720);
(statearr_9763_9794[1] = 19);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 19))
{var inst_9722 = (state_9735[2]);var state_9735__$1 = state_9735;if(cljs.core.truth_(inst_9722))
{var statearr_9764_9795 = state_9735__$1;(statearr_9764_9795[1] = 20);
} else
{var statearr_9765_9796 = state_9735__$1;(statearr_9765_9796[1] = 21);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 20))
{var inst_9699 = (state_9735[14]);var state_9735__$1 = state_9735;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_9735__$1,23,out,inst_9699);
} else
{if((state_val_9736 === 21))
{var state_9735__$1 = state_9735;var statearr_9766_9797 = state_9735__$1;(statearr_9766_9797[2] = null);
(statearr_9766_9797[1] = 22);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 22))
{var inst_9692 = (state_9735[10]);var inst_9728 = (state_9735[2]);var inst_9684 = inst_9692;var state_9735__$1 = (function (){var statearr_9767 = state_9735;(statearr_9767[17] = inst_9728);
(statearr_9767[9] = inst_9684);
return statearr_9767;
})();var statearr_9768_9798 = state_9735__$1;(statearr_9768_9798[2] = null);
(statearr_9768_9798[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_9736 === 23))
{var inst_9725 = (state_9735[2]);var state_9735__$1 = state_9735;var statearr_9769_9799 = state_9735__$1;(statearr_9769_9799[2] = inst_9725);
(statearr_9769_9799[1] = 22);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6586__auto__){
return (function() {
var state_machine__6587__auto__ = null;
var state_machine__6587__auto____0 = (function (){var statearr_9771 = (new Array(18));(statearr_9771[0] = state_machine__6587__auto__);
(statearr_9771[1] = 1);
return statearr_9771;
});
var state_machine__6587__auto____1 = (function (state_9735){while(true){
var result__6588__auto__ = switch__6586__auto__.call(null,state_9735);if(cljs.core.keyword_identical_QMARK_.call(null,result__6588__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6588__auto__;
}
break;
}
});
state_machine__6587__auto__ = function(state_9735){
switch(arguments.length){
case 0:
return state_machine__6587__auto____0.call(this);
case 1:
return state_machine__6587__auto____1.call(this,state_9735);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6587__auto____0;
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6587__auto____1;
return state_machine__6587__auto__;
})()
;})(switch__6586__auto__))
})();var state__6638__auto__ = (function (){var statearr_9772 = f__6637__auto__.call(null);(statearr_9772[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6636__auto___9773);
return statearr_9772;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6638__auto__);
}));
return m;
});
/**
* Adds ch as an input to the mix
*/
cljs.core.async.admix = (function admix(mix,ch){return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
* Removes ch as an input to the mix
*/
cljs.core.async.unmix = (function unmix(mix,ch){return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
* removes all inputs from the mix
*/
cljs.core.async.unmix_all = (function unmix_all(mix){return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
* Atomically sets the state(s) of one or more channels in a mix. The
* state map is a map of channels -> channel-state-map. A
* channel-state-map is a map of attrs -> boolean, where attr is one or
* more of :mute, :pause or :solo. Any states supplied are merged with
* the current state.
* 
* Note that channels can be added to a mix via toggle, which can be
* used to add channels in a particular (e.g. paused) state.
*/
cljs.core.async.toggle = (function toggle(mix,state_map){return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
* Sets the solo mode of the mix. mode must be one of :mute or :pause
*/
cljs.core.async.solo_mode = (function solo_mode(mix,mode){return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});
cljs.core.async.Pub = {};
cljs.core.async.sub_STAR_ = (function sub_STAR_(p,v,ch,close_QMARK_){if((function (){var and__2954__auto__ = p;if(and__2954__auto__)
{return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else
{return and__2954__auto__;
}
})())
{return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else
{var x__3558__auto__ = (((p == null))?null:p);return (function (){var or__2963__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__3558__auto__)]);if(or__2963__auto__)
{return or__2963__auto__;
} else
{var or__2963__auto____$1 = (cljs.core.async.sub_STAR_["_"]);if(or__2963__auto____$1)
{return or__2963__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});
cljs.core.async.unsub_STAR_ = (function unsub_STAR_(p,v,ch){if((function (){var and__2954__auto__ = p;if(and__2954__auto__)
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else
{return and__2954__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else
{var x__3558__auto__ = (((p == null))?null:p);return (function (){var or__2963__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__3558__auto__)]);if(or__2963__auto__)
{return or__2963__auto__;
} else
{var or__2963__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);if(or__2963__auto____$1)
{return or__2963__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});
cljs.core.async.unsub_all_STAR_ = (function() {
var unsub_all_STAR_ = null;
var unsub_all_STAR___1 = (function (p){if((function (){var and__2954__auto__ = p;if(and__2954__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else
{return and__2954__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else
{var x__3558__auto__ = (((p == null))?null:p);return (function (){var or__2963__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__3558__auto__)]);if(or__2963__auto__)
{return or__2963__auto__;
} else
{var or__2963__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__2963__auto____$1)
{return or__2963__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});
var unsub_all_STAR___2 = (function (p,v){if((function (){var and__2954__auto__ = p;if(and__2954__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else
{return and__2954__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else
{var x__3558__auto__ = (((p == null))?null:p);return (function (){var or__2963__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__3558__auto__)]);if(or__2963__auto__)
{return or__2963__auto__;
} else
{var or__2963__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__2963__auto____$1)
{return or__2963__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p,v);
}
});
unsub_all_STAR_ = function(p,v){
switch(arguments.length){
case 1:
return unsub_all_STAR___1.call(this,p);
case 2:
return unsub_all_STAR___2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = unsub_all_STAR___1;
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = unsub_all_STAR___2;
return unsub_all_STAR_;
})()
;
/**
* Creates and returns a pub(lication) of the supplied channel,
* partitioned into topics by the topic-fn. topic-fn will be applied to
* each value on the channel and the result will determine the 'topic'
* on which that value will be put. Channels can be subscribed to
* receive copies of topics using 'sub', and unsubscribed using
* 'unsub'. Each topic will be handled by an internal mult on a
* dedicated channel. By default these internal channels are
* unbuffered, but a buf-fn can be supplied which, given a topic,
* creates a buffer with desired properties.
* 
* Each item is distributed to all subs in parallel and synchronously,
* i.e. each sub must accept before the next item is distributed. Use
* buffering/windowing to prevent slow subs from holding up the pub.
* 
* Note that if buf-fns are used then each topic is handled
* asynchronously, i.e. if a channel is subscribed to more than one
* topic it should not expect them to be interleaved identically with
* the source.
*/
cljs.core.async.pub = (function() {
var pub = null;
var pub__2 = (function (ch,topic_fn){return pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});
var pub__3 = (function (ch,topic_fn,buf_fn){var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var ensure_mult = ((function (mults){
return (function (topic){var or__2963__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);if(cljs.core.truth_(or__2963__auto__))
{return or__2963__auto__;
} else
{return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__2963__auto__,mults){
return (function (p1__9800_SHARP_){if(cljs.core.truth_(p1__9800_SHARP_.call(null,topic)))
{return p1__9800_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__9800_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__2963__auto__,mults))
),topic);
}
});})(mults))
;var p = (function (){if(typeof cljs.core.async.t9924 !== 'undefined')
{} else
{goog.provide('cljs.core.async.t9924');

/**
* @constructor
*/
cljs.core.async.t9924 = (function (ensure_mult,mults,buf_fn,topic_fn,ch,pub,meta9925){
this.ensure_mult = ensure_mult;
this.mults = mults;
this.buf_fn = buf_fn;
this.topic_fn = topic_fn;
this.ch = ch;
this.pub = pub;
this.meta9925 = meta9925;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t9924.cljs$lang$type = true;
cljs.core.async.t9924.cljs$lang$ctorStr = "cljs.core.async/t9924";
cljs.core.async.t9924.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__3499__auto__,writer__3500__auto__,opt__3501__auto__){return cljs.core._write.call(null,writer__3500__auto__,"cljs.core.async/t9924");
});})(mults,ensure_mult))
;
cljs.core.async.t9924.prototype.cljs$core$async$Pub$ = true;
cljs.core.async.t9924.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2,close_QMARK_){var self__ = this;
var p__$1 = this;var m = self__.ensure_mult.call(null,topic);return cljs.core.async.tap.call(null,m,ch__$2,close_QMARK_);
});})(mults,ensure_mult))
;
cljs.core.async.t9924.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2){var self__ = this;
var p__$1 = this;var temp__4092__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);if(cljs.core.truth_(temp__4092__auto__))
{var m = temp__4092__auto__;return cljs.core.async.untap.call(null,m,ch__$2);
} else
{return null;
}
});})(mults,ensure_mult))
;
cljs.core.async.t9924.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;
cljs.core.async.t9924.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){var self__ = this;
var ___$1 = this;return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;
cljs.core.async.t9924.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t9924.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(mults,ensure_mult))
;
cljs.core.async.t9924.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_9926){var self__ = this;
var _9926__$1 = this;return self__.meta9925;
});})(mults,ensure_mult))
;
cljs.core.async.t9924.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_9926,meta9925__$1){var self__ = this;
var _9926__$1 = this;return (new cljs.core.async.t9924(self__.ensure_mult,self__.mults,self__.buf_fn,self__.topic_fn,self__.ch,self__.pub,meta9925__$1));
});})(mults,ensure_mult))
;
cljs.core.async.__GT_t9924 = ((function (mults,ensure_mult){
return (function __GT_t9924(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta9925){return (new cljs.core.async.t9924(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta9925));
});})(mults,ensure_mult))
;
}
return (new cljs.core.async.t9924(ensure_mult,mults,buf_fn,topic_fn,ch,pub,null));
})();var c__6636__auto___10047 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6637__auto__ = (function (){var switch__6586__auto__ = (function (state_9999){var state_val_10000 = (state_9999[1]);if((state_val_10000 === 1))
{var state_9999__$1 = state_9999;var statearr_10001_10048 = state_9999__$1;(statearr_10001_10048[2] = null);
(statearr_10001_10048[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 2))
{var state_9999__$1 = state_9999;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_9999__$1,4,ch);
} else
{if((state_val_10000 === 3))
{var inst_9997 = (state_9999[2]);var state_9999__$1 = state_9999;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_9999__$1,inst_9997);
} else
{if((state_val_10000 === 4))
{var inst_9929 = (state_9999[5]);var inst_9929__$1 = (state_9999[2]);var inst_9930 = (inst_9929__$1 == null);var state_9999__$1 = (function (){var statearr_10002 = state_9999;(statearr_10002[5] = inst_9929__$1);
return statearr_10002;
})();if(cljs.core.truth_(inst_9930))
{var statearr_10003_10049 = state_9999__$1;(statearr_10003_10049[1] = 5);
} else
{var statearr_10004_10050 = state_9999__$1;(statearr_10004_10050[1] = 6);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 5))
{var inst_9936 = cljs.core.deref.call(null,mults);var inst_9937 = cljs.core.vals.call(null,inst_9936);var inst_9938 = cljs.core.seq.call(null,inst_9937);var inst_9939 = inst_9938;var inst_9940 = null;var inst_9941 = 0;var inst_9942 = 0;var state_9999__$1 = (function (){var statearr_10005 = state_9999;(statearr_10005[6] = inst_9941);
(statearr_10005[7] = inst_9942);
(statearr_10005[8] = inst_9940);
(statearr_10005[9] = inst_9939);
return statearr_10005;
})();var statearr_10006_10051 = state_9999__$1;(statearr_10006_10051[2] = null);
(statearr_10006_10051[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 6))
{var inst_9929 = (state_9999[5]);var inst_9979 = (state_9999[10]);var inst_9977 = (state_9999[11]);var inst_9977__$1 = topic_fn.call(null,inst_9929);var inst_9978 = cljs.core.deref.call(null,mults);var inst_9979__$1 = cljs.core.get.call(null,inst_9978,inst_9977__$1);var state_9999__$1 = (function (){var statearr_10007 = state_9999;(statearr_10007[10] = inst_9979__$1);
(statearr_10007[11] = inst_9977__$1);
return statearr_10007;
})();if(cljs.core.truth_(inst_9979__$1))
{var statearr_10008_10052 = state_9999__$1;(statearr_10008_10052[1] = 19);
} else
{var statearr_10009_10053 = state_9999__$1;(statearr_10009_10053[1] = 20);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 7))
{var inst_9995 = (state_9999[2]);var state_9999__$1 = state_9999;var statearr_10010_10054 = state_9999__$1;(statearr_10010_10054[2] = inst_9995);
(statearr_10010_10054[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 8))
{var inst_9941 = (state_9999[6]);var inst_9942 = (state_9999[7]);var inst_9944 = (inst_9942 < inst_9941);var inst_9945 = inst_9944;var state_9999__$1 = state_9999;if(cljs.core.truth_(inst_9945))
{var statearr_10014_10055 = state_9999__$1;(statearr_10014_10055[1] = 10);
} else
{var statearr_10015_10056 = state_9999__$1;(statearr_10015_10056[1] = 11);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 9))
{var inst_9975 = (state_9999[2]);var state_9999__$1 = state_9999;var statearr_10016_10057 = state_9999__$1;(statearr_10016_10057[2] = inst_9975);
(statearr_10016_10057[1] = 7);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 10))
{var inst_9941 = (state_9999[6]);var inst_9942 = (state_9999[7]);var inst_9940 = (state_9999[8]);var inst_9939 = (state_9999[9]);var inst_9947 = cljs.core._nth.call(null,inst_9940,inst_9942);var inst_9948 = cljs.core.async.muxch_STAR_.call(null,inst_9947);var inst_9949 = cljs.core.async.close_BANG_.call(null,inst_9948);var inst_9950 = (inst_9942 + 1);var tmp10011 = inst_9941;var tmp10012 = inst_9940;var tmp10013 = inst_9939;var inst_9939__$1 = tmp10013;var inst_9940__$1 = tmp10012;var inst_9941__$1 = tmp10011;var inst_9942__$1 = inst_9950;var state_9999__$1 = (function (){var statearr_10017 = state_9999;(statearr_10017[6] = inst_9941__$1);
(statearr_10017[7] = inst_9942__$1);
(statearr_10017[8] = inst_9940__$1);
(statearr_10017[12] = inst_9949);
(statearr_10017[9] = inst_9939__$1);
return statearr_10017;
})();var statearr_10018_10058 = state_9999__$1;(statearr_10018_10058[2] = null);
(statearr_10018_10058[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 11))
{var inst_9953 = (state_9999[13]);var inst_9939 = (state_9999[9]);var inst_9953__$1 = cljs.core.seq.call(null,inst_9939);var state_9999__$1 = (function (){var statearr_10019 = state_9999;(statearr_10019[13] = inst_9953__$1);
return statearr_10019;
})();if(inst_9953__$1)
{var statearr_10020_10059 = state_9999__$1;(statearr_10020_10059[1] = 13);
} else
{var statearr_10021_10060 = state_9999__$1;(statearr_10021_10060[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 12))
{var inst_9973 = (state_9999[2]);var state_9999__$1 = state_9999;var statearr_10022_10061 = state_9999__$1;(statearr_10022_10061[2] = inst_9973);
(statearr_10022_10061[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 13))
{var inst_9953 = (state_9999[13]);var inst_9955 = cljs.core.chunked_seq_QMARK_.call(null,inst_9953);var state_9999__$1 = state_9999;if(inst_9955)
{var statearr_10023_10062 = state_9999__$1;(statearr_10023_10062[1] = 16);
} else
{var statearr_10024_10063 = state_9999__$1;(statearr_10024_10063[1] = 17);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 14))
{var state_9999__$1 = state_9999;var statearr_10025_10064 = state_9999__$1;(statearr_10025_10064[2] = null);
(statearr_10025_10064[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 15))
{var inst_9971 = (state_9999[2]);var state_9999__$1 = state_9999;var statearr_10026_10065 = state_9999__$1;(statearr_10026_10065[2] = inst_9971);
(statearr_10026_10065[1] = 12);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 16))
{var inst_9953 = (state_9999[13]);var inst_9957 = cljs.core.chunk_first.call(null,inst_9953);var inst_9958 = cljs.core.chunk_rest.call(null,inst_9953);var inst_9959 = cljs.core.count.call(null,inst_9957);var inst_9939 = inst_9958;var inst_9940 = inst_9957;var inst_9941 = inst_9959;var inst_9942 = 0;var state_9999__$1 = (function (){var statearr_10027 = state_9999;(statearr_10027[6] = inst_9941);
(statearr_10027[7] = inst_9942);
(statearr_10027[8] = inst_9940);
(statearr_10027[9] = inst_9939);
return statearr_10027;
})();var statearr_10028_10066 = state_9999__$1;(statearr_10028_10066[2] = null);
(statearr_10028_10066[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 17))
{var inst_9953 = (state_9999[13]);var inst_9962 = cljs.core.first.call(null,inst_9953);var inst_9963 = cljs.core.async.muxch_STAR_.call(null,inst_9962);var inst_9964 = cljs.core.async.close_BANG_.call(null,inst_9963);var inst_9965 = cljs.core.next.call(null,inst_9953);var inst_9939 = inst_9965;var inst_9940 = null;var inst_9941 = 0;var inst_9942 = 0;var state_9999__$1 = (function (){var statearr_10029 = state_9999;(statearr_10029[6] = inst_9941);
(statearr_10029[7] = inst_9942);
(statearr_10029[8] = inst_9940);
(statearr_10029[9] = inst_9939);
(statearr_10029[14] = inst_9964);
return statearr_10029;
})();var statearr_10030_10067 = state_9999__$1;(statearr_10030_10067[2] = null);
(statearr_10030_10067[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 18))
{var inst_9968 = (state_9999[2]);var state_9999__$1 = state_9999;var statearr_10031_10068 = state_9999__$1;(statearr_10031_10068[2] = inst_9968);
(statearr_10031_10068[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 19))
{var state_9999__$1 = state_9999;var statearr_10032_10069 = state_9999__$1;(statearr_10032_10069[2] = null);
(statearr_10032_10069[1] = 24);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 20))
{var state_9999__$1 = state_9999;var statearr_10033_10070 = state_9999__$1;(statearr_10033_10070[2] = null);
(statearr_10033_10070[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 21))
{var inst_9992 = (state_9999[2]);var state_9999__$1 = (function (){var statearr_10034 = state_9999;(statearr_10034[15] = inst_9992);
return statearr_10034;
})();var statearr_10035_10071 = state_9999__$1;(statearr_10035_10071[2] = null);
(statearr_10035_10071[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 22))
{var inst_9989 = (state_9999[2]);var state_9999__$1 = state_9999;var statearr_10036_10072 = state_9999__$1;(statearr_10036_10072[2] = inst_9989);
(statearr_10036_10072[1] = 21);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 23))
{var inst_9977 = (state_9999[11]);var inst_9981 = (state_9999[2]);var inst_9982 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_9977);var state_9999__$1 = (function (){var statearr_10037 = state_9999;(statearr_10037[16] = inst_9981);
return statearr_10037;
})();var statearr_10038_10073 = state_9999__$1;(statearr_10038_10073[2] = inst_9982);
(statearr_10038_10073[1] = 22);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10000 === 24))
{try{var inst_9929 = (state_9999[5]);var inst_9979 = (state_9999[10]);var inst_9985 = cljs.core.async.muxch_STAR_.call(null,inst_9979);var state_9999__$1 = state_9999;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_9999__$1,25,inst_9985,inst_9929);
}catch (e10039){if((e10039 instanceof Object))
{var ex__6580__auto__ = e10039;var statearr_10040_10074 = state_9999;(statearr_10040_10074[1] = 23);
(statearr_10040_10074[2] = ex__6580__auto__);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e10039;
} else
{return null;
}
}
}} else
{if((state_val_10000 === 25))
{try{var inst_9987 = (state_9999[2]);var state_9999__$1 = state_9999;var statearr_10043_10075 = state_9999__$1;(statearr_10043_10075[2] = inst_9987);
(statearr_10043_10075[1] = 22);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
}catch (e10041){if((e10041 instanceof Object))
{var ex__6580__auto__ = e10041;var statearr_10042_10076 = state_9999;(statearr_10042_10076[1] = 23);
(statearr_10042_10076[2] = ex__6580__auto__);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e10041;
} else
{return null;
}
}
}} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6586__auto__){
return (function() {
var state_machine__6587__auto__ = null;
var state_machine__6587__auto____0 = (function (){var statearr_10045 = (new Array(17));(statearr_10045[0] = state_machine__6587__auto__);
(statearr_10045[1] = 1);
return statearr_10045;
});
var state_machine__6587__auto____1 = (function (state_9999){while(true){
var result__6588__auto__ = switch__6586__auto__.call(null,state_9999);if(cljs.core.keyword_identical_QMARK_.call(null,result__6588__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6588__auto__;
}
break;
}
});
state_machine__6587__auto__ = function(state_9999){
switch(arguments.length){
case 0:
return state_machine__6587__auto____0.call(this);
case 1:
return state_machine__6587__auto____1.call(this,state_9999);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6587__auto____0;
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6587__auto____1;
return state_machine__6587__auto__;
})()
;})(switch__6586__auto__))
})();var state__6638__auto__ = (function (){var statearr_10046 = f__6637__auto__.call(null);(statearr_10046[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6636__auto___10047);
return statearr_10046;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6638__auto__);
}));
return p;
});
pub = function(ch,topic_fn,buf_fn){
switch(arguments.length){
case 2:
return pub__2.call(this,ch,topic_fn);
case 3:
return pub__3.call(this,ch,topic_fn,buf_fn);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pub.cljs$core$IFn$_invoke$arity$2 = pub__2;
pub.cljs$core$IFn$_invoke$arity$3 = pub__3;
return pub;
})()
;
/**
* Subscribes a channel to a topic of a pub.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.sub = (function() {
var sub = null;
var sub__3 = (function (p,topic,ch){return sub.call(null,p,topic,ch,true);
});
var sub__4 = (function (p,topic,ch,close_QMARK_){return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});
sub = function(p,topic,ch,close_QMARK_){
switch(arguments.length){
case 3:
return sub__3.call(this,p,topic,ch);
case 4:
return sub__4.call(this,p,topic,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
sub.cljs$core$IFn$_invoke$arity$3 = sub__3;
sub.cljs$core$IFn$_invoke$arity$4 = sub__4;
return sub;
})()
;
/**
* Unsubscribes a channel from a topic of a pub
*/
cljs.core.async.unsub = (function unsub(p,topic,ch){return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
* Unsubscribes all channels from a pub, or a topic of a pub
*/
cljs.core.async.unsub_all = (function() {
var unsub_all = null;
var unsub_all__1 = (function (p){return cljs.core.async.unsub_all_STAR_.call(null,p);
});
var unsub_all__2 = (function (p,topic){return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});
unsub_all = function(p,topic){
switch(arguments.length){
case 1:
return unsub_all__1.call(this,p);
case 2:
return unsub_all__2.call(this,p,topic);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all.cljs$core$IFn$_invoke$arity$1 = unsub_all__1;
unsub_all.cljs$core$IFn$_invoke$arity$2 = unsub_all__2;
return unsub_all;
})()
;
/**
* Takes a function and a collection of source channels, and returns a
* channel which contains the values produced by applying f to the set
* of first items taken from each source channel, followed by applying
* f to the set of second items from each channel, until any one of the
* channels is closed, at which point the output channel will be
* closed. The returned channel will be unbuffered by default, or a
* buf-or-n can be supplied
*/
cljs.core.async.map = (function() {
var map = null;
var map__2 = (function (f,chs){return map.call(null,f,chs,null);
});
var map__3 = (function (f,chs,buf_or_n){var chs__$1 = cljs.core.vec.call(null,chs);var out = cljs.core.async.chan.call(null,buf_or_n);var cnt = cljs.core.count.call(null,chs__$1);var rets = cljs.core.object_array.call(null,cnt);var dchan = cljs.core.async.chan.call(null,1);var dctr = cljs.core.atom.call(null,null);var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){(rets[i] = ret);
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === 0))
{return cljs.core.async.put_BANG_.call(null,dchan,java.util.Arrays.copyOf.call(null,rets,cnt));
} else
{return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));var c__6636__auto___10207 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6637__auto__ = (function (){var switch__6586__auto__ = (function (state_10179){var state_val_10180 = (state_10179[1]);if((state_val_10180 === 1))
{var state_10179__$1 = state_10179;var statearr_10181_10208 = state_10179__$1;(statearr_10181_10208[2] = null);
(statearr_10181_10208[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10180 === 2))
{var inst_10143 = cljs.core.reset_BANG_.call(null,dctr,cnt);var inst_10144 = 0;var state_10179__$1 = (function (){var statearr_10182 = state_10179;(statearr_10182[5] = inst_10144);
(statearr_10182[6] = inst_10143);
return statearr_10182;
})();var statearr_10183_10209 = state_10179__$1;(statearr_10183_10209[2] = null);
(statearr_10183_10209[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10180 === 3))
{var inst_10177 = (state_10179[2]);var state_10179__$1 = state_10179;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10179__$1,inst_10177);
} else
{if((state_val_10180 === 4))
{var inst_10144 = (state_10179[5]);var inst_10146 = (inst_10144 < cnt);var state_10179__$1 = state_10179;if(cljs.core.truth_(inst_10146))
{var statearr_10184_10210 = state_10179__$1;(statearr_10184_10210[1] = 6);
} else
{var statearr_10185_10211 = state_10179__$1;(statearr_10185_10211[1] = 7);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10180 === 5))
{var inst_10163 = (state_10179[2]);var state_10179__$1 = (function (){var statearr_10186 = state_10179;(statearr_10186[7] = inst_10163);
return statearr_10186;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10179__$1,12,dchan);
} else
{if((state_val_10180 === 6))
{var state_10179__$1 = state_10179;var statearr_10187_10212 = state_10179__$1;(statearr_10187_10212[2] = null);
(statearr_10187_10212[1] = 11);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10180 === 7))
{var state_10179__$1 = state_10179;var statearr_10188_10213 = state_10179__$1;(statearr_10188_10213[2] = null);
(statearr_10188_10213[1] = 8);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10180 === 8))
{var inst_10161 = (state_10179[2]);var state_10179__$1 = state_10179;var statearr_10189_10214 = state_10179__$1;(statearr_10189_10214[2] = inst_10161);
(statearr_10189_10214[1] = 5);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10180 === 9))
{var inst_10144 = (state_10179[5]);var inst_10156 = (state_10179[2]);var inst_10157 = (inst_10144 + 1);var inst_10144__$1 = inst_10157;var state_10179__$1 = (function (){var statearr_10190 = state_10179;(statearr_10190[8] = inst_10156);
(statearr_10190[5] = inst_10144__$1);
return statearr_10190;
})();var statearr_10191_10215 = state_10179__$1;(statearr_10191_10215[2] = null);
(statearr_10191_10215[1] = 4);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10180 === 10))
{var inst_10148 = (state_10179[2]);var inst_10149 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var state_10179__$1 = (function (){var statearr_10192 = state_10179;(statearr_10192[9] = inst_10148);
return statearr_10192;
})();var statearr_10193_10216 = state_10179__$1;(statearr_10193_10216[2] = inst_10149);
(statearr_10193_10216[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10180 === 11))
{try{var inst_10144 = (state_10179[5]);var inst_10152 = chs__$1.call(null,inst_10144);var inst_10153 = done.call(null,inst_10144);var inst_10154 = cljs.core.async.take_BANG_.call(null,inst_10152,inst_10153);var state_10179__$1 = state_10179;var statearr_10196_10217 = state_10179__$1;(statearr_10196_10217[2] = inst_10154);
(statearr_10196_10217[1] = 9);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
}catch (e10194){if((e10194 instanceof Object))
{var ex__6580__auto__ = e10194;var statearr_10195_10218 = state_10179;(statearr_10195_10218[1] = 10);
(statearr_10195_10218[2] = ex__6580__auto__);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e10194;
} else
{return null;
}
}
}} else
{if((state_val_10180 === 12))
{var inst_10165 = (state_10179[10]);var inst_10165__$1 = (state_10179[2]);var inst_10166 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_10165__$1);var state_10179__$1 = (function (){var statearr_10197 = state_10179;(statearr_10197[10] = inst_10165__$1);
return statearr_10197;
})();if(cljs.core.truth_(inst_10166))
{var statearr_10198_10219 = state_10179__$1;(statearr_10198_10219[1] = 13);
} else
{var statearr_10199_10220 = state_10179__$1;(statearr_10199_10220[1] = 14);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10180 === 13))
{var inst_10168 = cljs.core.async.close_BANG_.call(null,out);var state_10179__$1 = state_10179;var statearr_10200_10221 = state_10179__$1;(statearr_10200_10221[2] = inst_10168);
(statearr_10200_10221[1] = 15);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10180 === 14))
{var inst_10165 = (state_10179[10]);var inst_10170 = cljs.core.apply.call(null,f,inst_10165);var state_10179__$1 = state_10179;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10179__$1,16,out,inst_10170);
} else
{if((state_val_10180 === 15))
{var inst_10175 = (state_10179[2]);var state_10179__$1 = state_10179;var statearr_10201_10222 = state_10179__$1;(statearr_10201_10222[2] = inst_10175);
(statearr_10201_10222[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10180 === 16))
{var inst_10172 = (state_10179[2]);var state_10179__$1 = (function (){var statearr_10202 = state_10179;(statearr_10202[11] = inst_10172);
return statearr_10202;
})();var statearr_10203_10223 = state_10179__$1;(statearr_10203_10223[2] = null);
(statearr_10203_10223[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6586__auto__){
return (function() {
var state_machine__6587__auto__ = null;
var state_machine__6587__auto____0 = (function (){var statearr_10205 = (new Array(12));(statearr_10205[0] = state_machine__6587__auto__);
(statearr_10205[1] = 1);
return statearr_10205;
});
var state_machine__6587__auto____1 = (function (state_10179){while(true){
var result__6588__auto__ = switch__6586__auto__.call(null,state_10179);if(cljs.core.keyword_identical_QMARK_.call(null,result__6588__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6588__auto__;
}
break;
}
});
state_machine__6587__auto__ = function(state_10179){
switch(arguments.length){
case 0:
return state_machine__6587__auto____0.call(this);
case 1:
return state_machine__6587__auto____1.call(this,state_10179);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6587__auto____0;
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6587__auto____1;
return state_machine__6587__auto__;
})()
;})(switch__6586__auto__))
})();var state__6638__auto__ = (function (){var statearr_10206 = f__6637__auto__.call(null);(statearr_10206[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6636__auto___10207);
return statearr_10206;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6638__auto__);
}));
return out;
});
map = function(f,chs,buf_or_n){
switch(arguments.length){
case 2:
return map__2.call(this,f,chs);
case 3:
return map__3.call(this,f,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
map.cljs$core$IFn$_invoke$arity$2 = map__2;
map.cljs$core$IFn$_invoke$arity$3 = map__3;
return map;
})()
;
/**
* Takes a collection of source channels and returns a channel which
* contains all values taken from them. The returned channel will be
* unbuffered by default, or a buf-or-n can be supplied. The channel
* will close after all the source channels have closed.
*/
cljs.core.async.merge = (function() {
var merge = null;
var merge__1 = (function (chs){return merge.call(null,chs,null);
});
var merge__2 = (function (chs,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6636__auto___10323 = cljs.core.async.chan.call(null,1);cljs.core.async.impl.dispatch.run.call(null,(function (){var f__6637__auto__ = (function (){var switch__6586__auto__ = (function (state_10303){var state_val_10304 = (state_10303[1]);if((state_val_10304 === 1))
{var inst_10274 = cljs.core.vec.call(null,chs);var inst_10275 = inst_10274;var state_10303__$1 = (function (){var statearr_10305 = state_10303;(statearr_10305[5] = inst_10275);
return statearr_10305;
})();var statearr_10306_10324 = state_10303__$1;(statearr_10306_10324[2] = null);
(statearr_10306_10324[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10304 === 2))
{var inst_10275 = (state_10303[5]);var inst_10277 = cljs.core.count.call(null,inst_10275);var inst_10278 = (inst_10277 > 0);var state_10303__$1 = state_10303;if(cljs.core.truth_(inst_10278))
{var statearr_10307_10325 = state_10303__$1;(statearr_10307_10325[1] = 4);
} else
{var statearr_10308_10326 = state_10303__$1;(statearr_10308_10326[1] = 5);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10304 === 3))
{var inst_10301 = (state_10303[2]);var state_10303__$1 = state_10303;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10303__$1,inst_10301);
} else
{if((state_val_10304 === 4))
{var inst_10275 = (state_10303[5]);var state_10303__$1 = state_10303;return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_10303__$1,7,inst_10275);
} else
{if((state_val_10304 === 5))
{var inst_10297 = cljs.core.async.close_BANG_.call(null,out);var state_10303__$1 = state_10303;var statearr_10309_10327 = state_10303__$1;(statearr_10309_10327[2] = inst_10297);
(statearr_10309_10327[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10304 === 6))
{var inst_10299 = (state_10303[2]);var state_10303__$1 = state_10303;var statearr_10310_10328 = state_10303__$1;(statearr_10310_10328[2] = inst_10299);
(statearr_10310_10328[1] = 3);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10304 === 7))
{var inst_10282 = (state_10303[6]);var inst_10283 = (state_10303[7]);var inst_10282__$1 = (state_10303[2]);var inst_10283__$1 = cljs.core.nth.call(null,inst_10282__$1,0,null);var inst_10284 = cljs.core.nth.call(null,inst_10282__$1,1,null);var inst_10285 = (inst_10283__$1 == null);var state_10303__$1 = (function (){var statearr_10311 = state_10303;(statearr_10311[8] = inst_10284);
(statearr_10311[6] = inst_10282__$1);
(statearr_10311[7] = inst_10283__$1);
return statearr_10311;
})();if(cljs.core.truth_(inst_10285))
{var statearr_10312_10329 = state_10303__$1;(statearr_10312_10329[1] = 8);
} else
{var statearr_10313_10330 = state_10303__$1;(statearr_10313_10330[1] = 9);
}
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10304 === 8))
{var inst_10284 = (state_10303[8]);var inst_10282 = (state_10303[6]);var inst_10283 = (state_10303[7]);var inst_10275 = (state_10303[5]);var inst_10287 = (function (){var c = inst_10284;var v = inst_10283;var vec__10280 = inst_10282;var cs = inst_10275;return ((function (c,v,vec__10280,cs,inst_10284,inst_10282,inst_10283,inst_10275,state_val_10304){
return (function (p1__10224_SHARP_){return cljs.core.not_EQ_.call(null,c,p1__10224_SHARP_);
});
;})(c,v,vec__10280,cs,inst_10284,inst_10282,inst_10283,inst_10275,state_val_10304))
})();var inst_10288 = cljs.core.filterv.call(null,inst_10287,inst_10275);var inst_10275__$1 = inst_10288;var state_10303__$1 = (function (){var statearr_10314 = state_10303;(statearr_10314[5] = inst_10275__$1);
return statearr_10314;
})();var statearr_10315_10331 = state_10303__$1;(statearr_10315_10331[2] = null);
(statearr_10315_10331[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10304 === 9))
{var inst_10283 = (state_10303[7]);var state_10303__$1 = state_10303;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10303__$1,11,out,inst_10283);
} else
{if((state_val_10304 === 10))
{var inst_10295 = (state_10303[2]);var state_10303__$1 = state_10303;var statearr_10317_10332 = state_10303__$1;(statearr_10317_10332[2] = inst_10295);
(statearr_10317_10332[1] = 6);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{if((state_val_10304 === 11))
{var inst_10275 = (state_10303[5]);var inst_10292 = (state_10303[2]);var tmp10316 = inst_10275;var inst_10275__$1 = tmp10316;var state_10303__$1 = (function (){var statearr_10318 = state_10303;(statearr_10318[9] = inst_10292);
(statearr_10318[5] = inst_10275__$1);
return statearr_10318;
})();var statearr_10319_10333 = state_10303__$1;(statearr_10319_10333[2] = null);
(statearr_10319_10333[1] = 2);
return new cljs.core.Keyword(null,"recur","recur",1122293407);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});return ((function (switch__6586__auto__){
return (function() {
var state_machine__6587__auto__ = null;
var state_machine__6587__auto____0 = (function (){var statearr_10321 = (new Array(10));(statearr_10321[0] = state_machine__6587__auto__);
(statearr_10321[1] = 1);
return statearr_10321;
});
var state_machine__6587__auto____1 = (function (state_10303){while(true){
var result__6588__auto__ = switch__6586__auto__.call(null,state_10303);if(cljs.core.keyword_identical_QMARK_.call(null,result__6588__auto__,new cljs.core.Keyword(null,"recur","recur",1122293407)))
{{
continue;
}
} else
{return result__6588__auto__;
}
break;
}
});
state_machine__6587__auto__ = function(state_10303){
switch(arguments.length){
case 0:
return state_machine__6587__auto____0.call(this);
case 1:
return state_machine__6587__auto____1.call(this,state_10303);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6587__auto____0;
state_machine__6587__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6587__auto____1;
return state_machine__6587__auto__;
})()
;})(switch__6586__auto__))
})();var state__6638__auto__ = (function (){var statearr_10322 = f__6637__auto__.call(null);(statearr_10322[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6636__auto___10323);
return statearr_10322;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6638__auto__);
}));
return out;
});
merge = function(chs,buf_or_n){
switch(arguments.length){
case 1:
return merge__1.call(this,chs);
case 2:
return merge__2.call(this,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
merge.cljs$core$IFn$_invoke$arity$1 = merge__1;
merge.cljs$core$IFn$_invoke$arity$2 = merge__2;
return merge;
})()
;
/**
* Returns a channel containing the single (collection) result of the
* items taken from the channel conjoined to the supplied
* collection. ch must close before into produces a result.
*/
cljs.core.async.into = (function into(coll,ch){return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
