goog.provide('monet.canvas');
goog.require('cljs.core');
goog.require('monet.core');
goog.require('monet.core');
monet.canvas.get_context = (function get_context(canvas,type){return canvas.getContext(cljs.core.name.call(null,type));
});
monet.canvas.begin_path = (function begin_path(ctx){ctx.beginPath();
return ctx;
});
monet.canvas.close_path = (function close_path(ctx){ctx.closePath();
return ctx;
});
monet.canvas.fill = (function fill(ctx){ctx.fill();
return ctx;
});
monet.canvas.stroke = (function stroke(ctx){ctx.stroke();
return ctx;
});
monet.canvas.clear_rect = (function clear_rect(ctx,p__11728){var map__11730 = p__11728;var map__11730__$1 = ((cljs.core.seq_QMARK_.call(null,map__11730))?cljs.core.apply.call(null,cljs.core.hash_map,map__11730):map__11730);var h = cljs.core.get.call(null,map__11730__$1,new cljs.core.Keyword(null,"h","h",1013904346));var w = cljs.core.get.call(null,map__11730__$1,new cljs.core.Keyword(null,"w","w",1013904361));var y = cljs.core.get.call(null,map__11730__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__11730__$1,new cljs.core.Keyword(null,"x","x",1013904362));ctx.clearRect(x,y,w,h);
return ctx;
});
monet.canvas.rect = (function rect(ctx,p__11731){var map__11733 = p__11731;var map__11733__$1 = ((cljs.core.seq_QMARK_.call(null,map__11733))?cljs.core.apply.call(null,cljs.core.hash_map,map__11733):map__11733);var h = cljs.core.get.call(null,map__11733__$1,new cljs.core.Keyword(null,"h","h",1013904346));var w = cljs.core.get.call(null,map__11733__$1,new cljs.core.Keyword(null,"w","w",1013904361));var y = cljs.core.get.call(null,map__11733__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__11733__$1,new cljs.core.Keyword(null,"x","x",1013904362));monet.canvas.begin_path.call(null,ctx);
ctx.rect(x,y,w,h);
monet.canvas.close_path.call(null,ctx);
monet.canvas.fill.call(null,ctx);
return ctx;
});
monet.canvas.circle = (function circle(ctx,p__11734){var map__11736 = p__11734;var map__11736__$1 = ((cljs.core.seq_QMARK_.call(null,map__11736))?cljs.core.apply.call(null,cljs.core.hash_map,map__11736):map__11736);var r = cljs.core.get.call(null,map__11736__$1,new cljs.core.Keyword(null,"r","r",1013904356));var y = cljs.core.get.call(null,map__11736__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__11736__$1,new cljs.core.Keyword(null,"x","x",1013904362));monet.canvas.begin_path.call(null,ctx);
ctx.arc(x,y,r,0,(Math.PI * 2),true);
monet.canvas.close_path.call(null,ctx);
monet.canvas.fill.call(null,ctx);
return ctx;
});
monet.canvas.text = (function text(ctx,p__11737){var map__11739 = p__11737;var map__11739__$1 = ((cljs.core.seq_QMARK_.call(null,map__11739))?cljs.core.apply.call(null,cljs.core.hash_map,map__11739):map__11739);var y = cljs.core.get.call(null,map__11739__$1,new cljs.core.Keyword(null,"y","y",1013904363));var x = cljs.core.get.call(null,map__11739__$1,new cljs.core.Keyword(null,"x","x",1013904362));var text__$1 = cljs.core.get.call(null,map__11739__$1,new cljs.core.Keyword(null,"text","text",1017460895));ctx.fillText(text__$1,x,y);
return ctx;
});
monet.canvas.font_style = (function font_style(ctx,font){ctxfont = font;
return ctx;
});
monet.canvas.fill_style = (function fill_style(ctx,color){ctxfillStyle = color;
return ctx;
});
monet.canvas.stroke_style = (function stroke_style(ctx,color){ctxstrokeStyle = color;
return ctx;
});
monet.canvas.stroke_width = (function stroke_width(ctx,w){ctxlineWidth = w;
return ctx;
});
monet.canvas.move_to = (function move_to(ctx,x,y){ctx.moveTo(x,y);
return ctx;
});
monet.canvas.line_to = (function line_to(ctx,x,y){ctx.lineTo(x,y);
return ctx;
});
monet.canvas.alpha = (function alpha(ctx,a){ctxglobalAlpha = a;
return ctx;
});
monet.canvas.save = (function save(ctx){ctx.save();
return ctx;
});
monet.canvas.restore = (function restore(ctx){ctx.restore();
return ctx;
});
monet.canvas.add_entity = (function add_entity(mc,k,ent){return (new cljs.core.Keyword(null,"entities","entities",3206757171).cljs$core$IFn$_invoke$arity$1(mc)[k] = ent);
});
monet.canvas.remove_entity = (function remove_entity(mc,k){return delete new cljs.core.Keyword(null,"entities","entities",3206757171).cljs$core$IFn$_invoke$arity$1(mc)[k];
});
monet.canvas.get_entity = (function get_entity(mc,k){return new cljs.core.Keyword(null,"value","value",1125876963).cljs$core$IFn$_invoke$arity$1((new cljs.core.Keyword(null,"entities","entities",3206757171).cljs$core$IFn$_invoke$arity$1(mc)[k]));
});
/**
* @param {...*} var_args
*/
monet.canvas.update_entity = (function() { 
var update_entity__delegate = function (mc,k,func,extra){var cur = (new cljs.core.Keyword(null,"entities","entities",3206757171).cljs$core$IFn$_invoke$arity$1(mc)[k]);var res = cljs.core.apply.call(null,func,cur,extra);return (new cljs.core.Keyword(null,"entities","entities",3206757171).cljs$core$IFn$_invoke$arity$1(mc)[k] = res);
};
var update_entity = function (mc,k,func,var_args){
var extra = null;if (arguments.length > 3) {
  extra = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);} 
return update_entity__delegate.call(this,mc,k,func,extra);};
update_entity.cljs$lang$maxFixedArity = 3;
update_entity.cljs$lang$applyTo = (function (arglist__11740){
var mc = cljs.core.first(arglist__11740);
arglist__11740 = cljs.core.next(arglist__11740);
var k = cljs.core.first(arglist__11740);
arglist__11740 = cljs.core.next(arglist__11740);
var func = cljs.core.first(arglist__11740);
var extra = cljs.core.rest(arglist__11740);
return update_entity__delegate(mc,k,func,extra);
});
update_entity.cljs$core$IFn$_invoke$arity$variadic = update_entity__delegate;
return update_entity;
})()
;
monet.canvas.clear_BANG_ = (function clear_BANG_(mc){var ks = cljs.core.js_keys.call(null,new cljs.core.Keyword(null,"entities","entities",3206757171).cljs$core$IFn$_invoke$arity$1(mc));var seq__11745 = cljs.core.seq.call(null,ks);var chunk__11746 = null;var count__11747 = 0;var i__11748 = 0;while(true){
if((i__11748 < count__11747))
{var k = cljs.core._nth.call(null,chunk__11746,i__11748);monet.canvas.remove_entity.call(null,mc,k);
{
var G__11749 = seq__11745;
var G__11750 = chunk__11746;
var G__11751 = count__11747;
var G__11752 = (i__11748 + 1);
seq__11745 = G__11749;
chunk__11746 = G__11750;
count__11747 = G__11751;
i__11748 = G__11752;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__11745);if(temp__4092__auto__)
{var seq__11745__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11745__$1))
{var c__3672__auto__ = cljs.core.chunk_first.call(null,seq__11745__$1);{
var G__11753 = cljs.core.chunk_rest.call(null,seq__11745__$1);
var G__11754 = c__3672__auto__;
var G__11755 = cljs.core.count.call(null,c__3672__auto__);
var G__11756 = 0;
seq__11745 = G__11753;
chunk__11746 = G__11754;
count__11747 = G__11755;
i__11748 = G__11756;
continue;
}
} else
{var k = cljs.core.first.call(null,seq__11745__$1);monet.canvas.remove_entity.call(null,mc,k);
{
var G__11757 = cljs.core.next.call(null,seq__11745__$1);
var G__11758 = null;
var G__11759 = 0;
var G__11760 = 0;
seq__11745 = G__11757;
chunk__11746 = G__11758;
count__11747 = G__11759;
i__11748 = G__11760;
continue;
}
}
} else
{return null;
}
}
break;
}
});
monet.canvas.entity = (function entity(v,update,draw){return cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"value","value",1125876963),v,new cljs.core.Keyword(null,"draw","draw",1016996022),draw,new cljs.core.Keyword(null,"update","update",4470025275),update], true);
});
monet.canvas.attr = (function attr(e,a){return e.getAttribute(a);
});
monet.canvas.draw_loop = (function draw_loop(p__11761){var map__11767 = p__11761;var map__11767__$1 = ((cljs.core.seq_QMARK_.call(null,map__11767))?cljs.core.apply.call(null,cljs.core.hash_map,map__11767):map__11767);var mc = map__11767__$1;var entities = cljs.core.get.call(null,map__11767__$1,new cljs.core.Keyword(null,"entities","entities",3206757171));var active = cljs.core.get.call(null,map__11767__$1,new cljs.core.Keyword(null,"active","active",3885920888));var ctx = cljs.core.get.call(null,map__11767__$1,new cljs.core.Keyword(null,"ctx","ctx",1014003097));var updating_QMARK_ = cljs.core.get.call(null,map__11767__$1,new cljs.core.Keyword(null,"updating?","updating?",3359806763));var canvas = cljs.core.get.call(null,map__11767__$1,new cljs.core.Keyword(null,"canvas","canvas",3941165258));monet.canvas.clear_rect.call(null,ctx,cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"x","x",1013904362),0,new cljs.core.Keyword(null,"y","y",1013904363),0,new cljs.core.Keyword(null,"w","w",1013904361),monet.canvas.attr.call(null,canvas,"width"),new cljs.core.Keyword(null,"h","h",1013904346),monet.canvas.attr.call(null,canvas,"height")], true));
if(cljs.core.truth_(cljs.core.deref.call(null,active)))
{var ks_11772 = cljs.core.js_keys.call(null,entities);var cnt_11773 = ks_11772.length;var i_11774 = 0;while(true){
if((i_11774 < cnt_11773))
{var k_11775 = (ks_11772[i_11774]);var map__11768_11776 = (entities[k_11775]);var map__11768_11777__$1 = ((cljs.core.seq_QMARK_.call(null,map__11768_11776))?cljs.core.apply.call(null,cljs.core.hash_map,map__11768_11776):map__11768_11776);var ent_11778 = map__11768_11777__$1;var value_11779 = cljs.core.get.call(null,map__11768_11777__$1,new cljs.core.Keyword(null,"value","value",1125876963));var update_11780 = cljs.core.get.call(null,map__11768_11777__$1,new cljs.core.Keyword(null,"update","update",4470025275));var draw_11781 = cljs.core.get.call(null,map__11768_11777__$1,new cljs.core.Keyword(null,"draw","draw",1016996022));if(cljs.core.truth_((function (){var and__2954__auto__ = update_11780;if(cljs.core.truth_(and__2954__auto__))
{return cljs.core.deref.call(null,updating_QMARK_);
} else
{return and__2954__auto__;
}
})()))
{var updated_11782 = (function (){var or__2963__auto__ = (function (){try{return update_11780.call(null,value_11779);
}catch (e11770){if((e11770 instanceof Error))
{var e = e11770;console.log(e);
return value_11779;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e11770;
} else
{return null;
}
}
}})();if(cljs.core.truth_(or__2963__auto__))
{return or__2963__auto__;
} else
{return value_11779;
}
})();if(cljs.core.truth_((entities[k_11775])))
{(entities[k_11775] = cljs.core.assoc.call(null,ent_11778,new cljs.core.Keyword(null,"value","value",1125876963),updated_11782));
} else
{}
} else
{}
if(cljs.core.truth_(draw_11781))
{try{draw_11781.call(null,ctx,new cljs.core.Keyword(null,"value","value",1125876963).cljs$core$IFn$_invoke$arity$1((entities[k_11775])));
}catch (e11771){if((e11771 instanceof Error))
{var e_11783 = e11771;console.log(e_11783);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e11771;
} else
{}
}
}} else
{}
{
var G__11784 = (i_11774 + 1);
i_11774 = G__11784;
continue;
}
} else
{}
break;
}
return monet.core.animation_frame.call(null,(function (){return draw_loop.call(null,mc);
}));
} else
{return null;
}
});
monet.canvas.monet_canvas = (function monet_canvas(elem,context_type){var ct = (function (){var or__2963__auto__ = context_type;if(cljs.core.truth_(or__2963__auto__))
{return or__2963__auto__;
} else
{return "2d";
}
})();var ctx = monet.canvas.get_context.call(null,elem,ct);return cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"canvas","canvas",3941165258),elem,new cljs.core.Keyword(null,"ctx","ctx",1014003097),ctx,new cljs.core.Keyword(null,"entities","entities",3206757171),{},new cljs.core.Keyword(null,"updating?","updating?",3359806763),cljs.core.atom.call(null,true),new cljs.core.Keyword(null,"active","active",3885920888),cljs.core.atom.call(null,true)], true);
});
/**
* @param {...*} var_args
*/
monet.canvas.init = (function() { 
var init__delegate = function (canvas,p__11785){var vec__11787 = p__11785;var context_type = cljs.core.nth.call(null,vec__11787,0,null);var mc = monet.canvas.monet_canvas.call(null,canvas,context_type);monet.canvas.draw_loop.call(null,mc);
return mc;
};
var init = function (canvas,var_args){
var p__11785 = null;if (arguments.length > 1) {
  p__11785 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return init__delegate.call(this,canvas,p__11785);};
init.cljs$lang$maxFixedArity = 1;
init.cljs$lang$applyTo = (function (arglist__11788){
var canvas = cljs.core.first(arglist__11788);
var p__11785 = cljs.core.rest(arglist__11788);
return init__delegate(canvas,p__11785);
});
init.cljs$core$IFn$_invoke$arity$variadic = init__delegate;
return init;
})()
;
monet.canvas.stop = (function stop(mc){return cljs.core.reset_BANG_.call(null,new cljs.core.Keyword(null,"active","active",3885920888).cljs$core$IFn$_invoke$arity$1(mc),false);
});
monet.canvas.stop_updating = (function stop_updating(mc){return cljs.core.reset_BANG_.call(null,new cljs.core.Keyword(null,"updating?","updating?",3359806763).cljs$core$IFn$_invoke$arity$1(mc),false);
});
monet.canvas.start_updating = (function start_updating(mc){return cljs.core.reset_BANG_.call(null,new cljs.core.Keyword(null,"updating?","updating?",3359806763).cljs$core$IFn$_invoke$arity$1(mc),true);
});
monet.canvas.restart = (function restart(mc){cljs.core.reset_BANG_.call(null,new cljs.core.Keyword(null,"active","active",3885920888).cljs$core$IFn$_invoke$arity$1(mc),true);
monet.canvas.update_loop.call(null,mc);
return monet.canvas.draw_loop.call(null,mc);
});
