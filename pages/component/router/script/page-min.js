Nui.define("./data",["国内","国际","娱乐","体育"]),Nui.define("./detail",["template","./data"],function(e,t){var a=this;return e.method("filter",function(e){return t[e]}),{render:function(t,r){$(".content").html(e.render(a.renders('<% if param.id === undefined %><p>下面是<% filter | param.type %>新闻列表：</p><ul><li class="e-mt10"><a class="detail" href="/news/<% param.type %>/1111">1111111111111111111</a></li><li class="e-mt10"><a class="detail" href="/news/<% param.type %>/2222">222222222222222222</a></li><li class="e-mt10"><a class="detail" href="/news/<% param.type %>/3333">3333333333333333</a></li><li class="e-mt10"><a class="detail" href="/news/<% param.type %>/4444">4444444444444444444</a></li></ul><% else %><% var cols = new Array(8), lines = new Array(20) %><% each lines %><p><% each cols %><% param.id %><% /each %></p><% /each %><% /if %>'),r))}}}),Nui.define("./news",["template","./data"],function(e,t){var a=this;return{render:function(r,n){n.data=t,$(".content").html(e.render(a.renders('<p>下面是新闻分类：</p><% each data %><a href="/news/<% $index %>" class="detail e-ml10"><% $value %></a><% /each %>'),n))}}}),Nui.define("./home",["template"],function(e){var t=this;return{render:function(a,r){$(".content").html(e.render(t.renders("Hi！欢迎来到首页。"),r))}}}),Nui.define("{cpns}/router",function(){return this.extend("component",{static:{_trigger:!1,_domain:location.protocol+"//"+location.host,_paths:{},_params:{},_alias:{},_replace:function(e){return e.replace(this._domain,"").replace(/^\#\!?/,"").replace(/^([^\/])/,"/$1").replace(/\/$/g,"")},alias:function(e){return $.extend(this._alias,e||{})},_change:function(){var e=this,t=e._replace(location.hash);$.isEmptyObject(e._paths)&&$.isEmptyObject(e._params)||(Nui.each([e._paths,e._params],function(a,r){var n=!1;if(Nui.each(a,function(a){if(0===r&&t===a.path||1===r&&0===t.indexOf(a.path)){var i=t.replace(a.path,"").replace(/^\//,"");if(i=i?i.split("/"):[],i.length===a.params.length){var s={};return Nui.each(a.params,function(e,t){s[e]=i[t]}),a.render(a.target,{path:a.path,param:s}),e._trigger=n=!0,!1}}}),n)return!1}),e._trigger||Nui.each(e._instances,function(t){if(!0===t.options.enter)return t.target.eq(0).trigger("click"),e._trigger=!0,!1}))},_bindHashchange:function(){var e=this;if(Nui.bsie7){var t=function(t){var a=location.hash;return e._oldhash!==a&&(e._oldhash=a,!t)};setInterval(function(){t()&&e._change()},100),t(!0)}else Nui.win.on("hashchange",function(){e._change()})},trigger:function(){this._trigger||this._change()},$ready:null},options:{path:"",enter:!1,onBefore:null,onRender:null},_init:function(){var e=this,t=e.constructor;e._exec()&&!t._bind&&(t._bind=!0,t._bindHashchange())},_exec:function(){var e=this,t=e.options,a=e.constructor;if(e.path=e._setpath(t.path),e.target=e._getTarget(),t.path&&e.target){var r=e._getpath();if(r.params.length){var n=[];Nui.each(r.params,function(e){n.push(e);var t=n.join("/:");a._params[r.path+"/:"+t]={target:r.target,params:t.split("/:"),path:r.path,render:r.render}}),a._params[e.path]=r}else a._paths[e.path]=r;return e._event()}},_setpath:function(e){var t=this.constructor;return(e=Nui.trim(e))&&Nui.each(t._alias,function(t,a){e=e.replace(new RegExp("{"+a+"}","g"),t)}),t._replace(e)},_getpath:function(){var e=this,t=e.path,a=e.options,r=t.indexOf("/:"),n={target:e.target,params:[]};return-1!==r?(n.params=t.substr(r+2).split("/:"),n.path=t.substr(0,r)):n.path=t,n.render="function"==typeof a.onRender?a.onRender:$.noop,n},_sethash:function(e){e=this.constructor._replace(e),location.hash="#!"+e},_event:function(){var e=this,t=e.options;return e._on("click",e.target,function(a){if("function"==typeof t.onBefore&&!1===t.onBefore())return!1;var r=$(this);return e._sethash(r.attr("href")),!1}),e},_reset:function(){var e=this,t=e.constructor;return e._off(),delete t._paths[e.path],delete t._params[e.path],e}})}),Nui.define("./script/page",["{cpns}/router"],function(e){var t=this;e({target:"#home",path:"/home/",enter:!0,onRender:t.require("./home").render}),e({target:"#news",path:"/news/",onRender:t.require("./news").render}),e({target:".detail",path:"/news/:type/:id/",onRender:t.require("./detail").render}),e("trigger")});