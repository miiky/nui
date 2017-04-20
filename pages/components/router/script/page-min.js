Nui.define("./ajax",function(){var e=$.ajax;return function(t){"string"==typeof t&&(t={url:t,dataType:"json"});var n=t.success||$.noop,a=t.error||$.noop;return t.success=function(){n.apply(this,arguments)},t.error=function(){a.apply(this,arguments)},e($.extend(!0,{cache:!1,dataType:"json",statusCode:{404:function(){},502:function(){}}},t))}}),Nui.define("../tpls/seeVoucher",function(){return this.renders("这是查凭证页面，页面完整url是：<% url %>，路径是：<% path %><% if param %><br>参数分别是：<% each param %><% $index %>=<% $value %>，<% /each %><% /if %>")}),Nui.define("./modules/seeVoucher",["../tpls/seeVoucher","template"],function(e,t){return function(n,a,i){a.html(t.render(e,i))}}),Nui.define("{cpns}/placeholder",["util"],function(e){var t=e.supportHtml5("placeholder","input");return this.extend("component",{options:{text:"",animate:!1,equal:!1,color:"#ccc"},_tpllist:"<%each style%><%$index%>:<%$value%>;<%/each%>",_tplwrap:'<strong class="ui-placeholder<%if theme%> t-placeholder-<%theme%><%/if%>" style="<%include \'_tpllist\'%>" />',_tplelem:"<b style=\"<%include '_tpllist'%>\"><%text%></b>",_init:function(){this._exec()},_exec:function(){var e=this,t=e._getTarget();if(t){var n=e.deftext=t.attr("placeholder");!e.deftext&&e.options.text&&t.attr("placeholder",n=e.options.text),e.text=Nui.trim(n),e.text&&e._create()}},_create:function(){var e=this,n=e.options,a=e.constructor;n.animate||!n.animate&&!t?(n.animate&&e.target.removeAttr("placeholder"),e.target.wrap(e._tpl2html(e._tplwrap,{theme:n.theme,style:{position:"relative",display:"inline-block",width:e.target.outerWidth()+"px",overflow:"hidden",cursor:"text"}})),e.element=$(e._tpl2html(e._tplelem,{text:e.text,style:function(){var t=e.target.outerHeight(),i=e.target.is("textarea");return{display:Nui.trim(e.target.val())?"none":"inline",position:"absolute",left:a._getSize(e.target,"l","padding")+a._getSize(e.target,"l")+"px",top:a._getSize(e.target,"t","padding")+a._getSize(e.target,"t")+"px",height:i?"auto":t+"px","line-height":i?"normal":t+"px",color:n.color}}()})).insertAfter(e.target),e._event()):e._setStyle()},_setStyle:function(){var e=this;e.options;e.className="nui-placeholder-"+e._index,e.target.addClass(e.className),e.constructor.style||e._createStyle(),e._createRules()},_createStyle:function(){var e=this,t=document.createElement("style");document.head.appendChild(t),e.constructor.style=t.sheet},_createRules:function(){var e=this,t=e.constructor.style,n=e._index;try{t.deleteRule(n)}catch(e){}Nui.each(["::-webkit-input-placeholder",":-ms-input-placeholder","::-moz-placeholder"],function(a){var i="."+e.className+a,r="opacity:1; color:"+(e.options.color||"");try{"addRule"in t?t.addRule(i,r,n):"insertRule"in t&&t.insertRule(i+"{"+r+"}",n)}catch(e){}})},_event:function(){var e=this,t=e.options,n=e.constructor,a=n._getSize(e.target,"l","padding")+n._getSize(e.target,"l");e._on("click",e.element,function(){e.target.focus()}),e._on("focus",e.target,function(){t.animate&&e.element.stop(!0,!1).animate({left:a+10,opacity:"0.5"})}),e._on("blur change",e.target,function(n,i){var r=Nui.trim(i.val());!t.equal&&r===e.text||!r?(i.val(""),e.element.show(),t.animate&&e.element.stop(!0,!1).animate({left:a,opacity:"1"})):e.element.hide()}),e._on("keyup keydown",e.target,function(t,n){Nui.trim(n.val())?e.element.hide():e.element.show()})},_reset:function(){var e=this;e._off(),e.element&&(e.element.remove(),e.target.unwrap()),e.target.removeClass(e.className),e.deftext?e.target.attr("placeholder",e.deftext):e.target.removeAttr("placeholder")}})}),Nui.define("highlight",function(){return this.extend("component",{static:{_init:function(){var e=this;Nui.doc.on("click",function(){e._active&&Nui.each(e._instances,function(e){e._active&&(e.element.find("tr.s-crt").removeClass("s-crt"),e._active=!1)}),e._active=!1})},_getcode:function(e,t){return'<code class="'+e+'">'+t+"</code>"},_getarr:function(e,t){var n=[];return e?(Nui.each(e,function(e){var a=t.indexOf(e),i=t.substr(0,a);t=t.substr(a+e.length),n.push(i),n.push(e)}),n.push(t)):n.push(t),n},_comment:function(e){return/\/\*/.test(e)?e=e.replace(/(\/\*(.|\s)*?\*\/)/g,this._getcode("comment","$1")):/\/\//.test(e)&&(e=e.replace(/(\/\/.*)$/g,this._getcode("comment","$1"))),e}},options:{isTitle:!1,isLight:!0,isLine:!1},_type:"",_init:function(){this._exec()},_exec:function(){var e=this,t=e._getTarget();if(t){var n=t.get(0);"SCRIPT"===n.tagName&&"text/highlight"==n.type&&(e.code=t.html().replace(/^[\r\n]+|[\r\n]+$/g,"").replace(/</g,"&lt;").replace(/>/g,"&gt;"),e.element&&e.element.remove(),e._create(),e.options.isLight&&e._event())}},_tpl:'<div class="ui-highlight<%if type%> ui-highlight-<%type%><%/if%><%if theme%> t-highlight-<%theme%><%/if%>"><%if isTitle%><div class="title"><em class="type"><%type%></em></div><%/if%><div class="inner"><table><%each list val key%><tr><%if isLine === true%><td class="line" number="<%key+1%>"><%if bsie7%><%key+1%><%/if%></td><%/if%><td class="code"><%val%></td></tr><%/each%></table><div></div>',_create:function(){var e=this,t=(e.options,$.extend({bsie7:Nui.bsie7,list:e._list(),type:e._type},e.options||{})),n=e._tpl2html.call(e,e._tpl,t);e.element=$(n).insertAfter(e.target)},_list:function(){var e=this;return e._type?e["_"+e._type](e.code).split("\n"):e.code.split("\n")},_event:function(){var e=this;e._on("click",e.element,"tr",function(t,n){e.constructor._active=e._active=!0,n.addClass("s-crt").siblings().removeClass("s-crt"),t.stopPropagation()})}})}),Nui.define("{light}/javascript",function(){return this.extend("highlight",{_type:"js",_js:function(e){var t=this,n=t.constructor,a="",i=e.match(/(\/\/.*)|(\/\*(.|\s)*?\*\/)|('[^']*')|("[^"]*")/g),r=n._getarr(i,e);return Nui.each(r,function(e){$.trim(e)&&(/^\s*\/\//.test(e)?e=n._getcode("comment",e):/^\s*\/\*/.test(e)?e=e.replace(/(.+)/g,n._getcode("comment","$1")):(e=/'|"/.test(e)?e.replace(/(.+)/g,n._getcode("string","$1")):e.replace(new RegExp("(&lt;|&gt;|;|!|%|\\|\\[|\\]|\\(|\\)|\\{|\\}|\\=|\\/|-|\\+|,|\\.|\\:|\\?|~|\\*|&)","g"),n._getcode("symbol","$1")).replace(new RegExp("(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|elseif|each|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|include|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var)(\\s+|\\<code)","g"),n._getcode("keyword","$1")+"$2").replace(/(\/code>\s*)(\d+)/g,"$1"+n._getcode("number","$2")).replace(/(\/code>\s*)?([^<>\s]+)(\s*<code)/g,"$1"+n._getcode("word","$2")+"$3"),e=n._comment(e))),a+=e}),a}})}),Nui.define("../tpls/recordVoucher",function(){return this.renders('<input type="text" placeholder="aaaaaaaaaaa" data-placeholder-options=\'{"color":"#f60", "animate":true}\' /><script type="text/highlight" data-javascript-options>var a = 1;var b = 2;<\/script> <div class="box">a1</div><a id="aaa">aaaaaaaaaaa</a>')}),Nui.define("./modules/recordVoucher",["component","../tpls/recordVoucher","template","{light}/javascript","{cpns}/placeholder"],function(e,t,n,a){return function(e,i,r){i.html(n.render(t,r)).on("click","#aaa",function(){a("destroy",i),setTimeout(function(){a("init",i),a("set",i,{isLine:!0})},2e3)}).on("click","b",function(){alert()})}}),Nui.define("./menu",[{id:"recordVoucher",name:"录凭证",index:!0,icon:"",path:"/voucher/record"},{id:"seeVoucher",name:"查凭证",icon:"",index:!0,path:"/voucher/list/aniu/jser"},{name:"账簿",icon:"",subs:[{id:"summary",name:"总账",icon:"",path:"/books/summary"},{id:"detailed",name:"明细账",icon:"",path:"/books/detailed"},{id:"accountbalance",name:"科目余额表",icon:"",path:"/books/accountbalance"}]}]),Nui.define("../tpls/index",function(){return this.renders('<div class="m-main ui-bgw"><h3 class="ui-bdb ui-fcb"><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run1">欢</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run2">迎</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run3">使</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run4">用</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run5">云</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run6">记</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run7">账</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run8">！</em></h3><ul><% each $list %><% if $value.index %><li><a href="<% $value.path %>" id="<% $value.id %>Index"><em><i class="iconfont ui-animate">&#xe62a;</i></em><span class="ui-animate"><% $value.name %></span></a></li><% /if %><% /each %></ul></div>')}),Nui.define("./modules/index",["../tpls/index","template","./menu"],function(e,t,n){return this.imports("../../style/index"),function(a,i,r){i.html(t.render(e,n))}}),Nui.define("{cpns}/router",["component"],function(e){return this.extend(e,{static:{_init:!1,_paths:{},_params:{},_alias:{},_cache:{},_cacheContent:{},_replace:function(e){return e.replace(location.protocol+"//"+location.host,"").replace(/^\#\!?/,"").replace(/^([^\/])/,"/$1").replace(/\/$/g,"")},alias:function(e){return $.extend(this._alias,e||{})},_setCache:function(){var e=this,t=e._oldhash;t&&e._wrapper&&e._cacheContent[t]&&(e._cache[t]=e._wrapper.html())},_getWrapper:function(e){return $('<div class="wrapper"></div>').appendTo(e)},_change:function(){var t=this,n=location.hash,a=t._replace(n);$.isEmptyObject(t._paths)&&$.isEmptyObject(t._params)||(t._setCache(),Nui.each([t._paths,t._params],function(i,r){var o=!1;if(Nui.each(i,function(i){if(0===r&&a===i.path||1===r&&0===a.indexOf(i.path)){var s,c=a.replace(i.path,"").replace(/^\//,""),l=t._instances[i.index],u=l.options;if(c=c?c.split("/"):[],"function"==typeof u.onRender&&c.length===i.params.length){if(Nui.each(i.params,function(e,t){s||(s={}),s[e]=c[t]}),!l._wrapper){u.wrapper&&!l._wrapper?l._wrapper=t._getWrapper(l.container):t._wrapper||(t._wrapper=t._getWrapper(l.container)),l._wrapper||(e.static.destroy(t._wrapper.off()),t._cacheContent[n]=!0);var p=l._wrapper||t._wrapper,h=t._cache[n];u.onRender(l.target,p,{path:i.path,url:a,param:s,cache:h}),e.static.init(p)}var p=l._wrapper||t._wrapper;return p.show().siblings().hide(),"function"==typeof u.onAfter&&u.onAfter(l.target,p),t._init=o=!0,!1}}}),o)return!1}),t._init||Nui.each(t._instances,function(e){if(!t._hasEnter&&!0===e.options.enter)return t._hasEnter=!0,e._render(e.target.eq(0)),t._init=!0,!1})),t._oldhash=n},_bindHashchange:function(){var e=this;if(Nui.bsie7){var t=function(t){var n=location.hash;return e._oldhash!==n&&!t};setInterval(function(){t()&&e._change()},100),t(!0)}else Nui.win.on("hashchange",function(){e._change()})},init:function(){this._init||this._change()},$ready:null},options:{path:null,container:null,enter:!1,wrapper:!1,splitLevel:1,onBefore:null,onRender:null},_init:function(){var e=this,t=e.constructor;e._exec()&&!t._bind&&(t._bind=!0,t._bindHashchange())},_exec:function(){var e=this,t=e.options,n=e.constructor,a=e._getTarget();if(e.container=n._jquery(t.container),t.path&&a&&e.container){e.path=e._setpath(t.path);var i=e._getpath();if(i.params.length)if(t.splitLevel){if(t.splitLevel<=2)for(var r,o=[];r=i.params.shift();)o.push(r),subs=o.join("/:"),n._params[i.path+"/:"+subs]=$.extend({},i,{params:subs.split("/:")});2===t.splitLevel&&(n._paths[i.path]=i)}else n._params[e.path]=i;else n._paths[e.path]=i;return e._event()}},_setpath:function(e){var t=this.constructor;return(e=Nui.trim(e))&&Nui.each(t._alias,function(t,n){e=e.replace(new RegExp("{"+n+"}","g"),t)}),t._replace(e)},_getpath:function(){var e=this,t=e.path,n=(e.options,t.indexOf("/:")),a={index:e._index,params:[]};return-1!==n?(a.params=t.substr(n+2).split("/:"),a.path=t.substr(0,n)):a.path=t,a},_render:function(e){var t=this,n=t.options;if(e.attr("href")){var a=!1,i=function(){a=!0,location.hash="#!"+t.constructor._replace(e.attr("href"))};if("function"==typeof n.onBefore&&!1===n.onBefore(e,i))return!1;a||i()}},_event:function(){var e=this;e.options;return e._on("click",Nui.doc,e.target,function(t,n){return e._render(n),!1}),e},_reset:function(){var e=this,t=e.constructor;return e._off(),delete t._paths[e.path],delete t._params[e.path],e}})}),Nui.define("./router",["{cpns}/router"],function(e){var t=this;return function(){e("alias",{list:"/voucher/list/:nickname/:career"}),e("options",{container:".g-main",onAfter:function(e){$(".m-menu-item a.s-crt").removeClass("s-crt"),e.addClass("s-crt")}}),e({target:"#index",enter:!0,path:"/index",onRender:t.require("./modules/index"),onBefore:function(e,t){}}),e({target:"#recordVoucher, #recordVoucherIndex",path:"/voucher/record",wrapper:!1,onRender:t.require("./modules/recordVoucher")}),e({target:"#seeVoucher, #seeVoucherIndex",path:"{list}",wrapper:!1,splitLevel:2,onRender:t.require("./modules/seeVoucher")}),e("init")}}),Nui.define("./tpls/layout",function(){var e=this;return{head:e.renders('<div class="f-fl m-head-main"><% var data = list[0] %><p class="f-fl name"><% data.buname %></p><p class="f-fl month"><% data.buaddress %></p></div>'),menu:e.renders('<% each menu %><dl class="m-menu-item"><dt><a href="<% $value.path || \'javascript:void(0)\' %>"<% if $value.id %> id="<% $value.id %>"<% /if %>><em><i class="iconfont"></i></em><span><% $value.name %></span>   </a></dt><% if $value.subs && $value.subs.length %><dd><% each $value.subs %><a href="<% $value.path %>"<% if $value.id %> id="<% $value.id %>"<% /if %>><span><% $value.name %></span></a><% /each %></dd><% /if %></dl><% /each %>')}}),Nui.define("./render",["./menu","./tpls/layout","template"],function(e,t,n){return function(a){$(".m-headbox").html(n.render(t.head,a)),a.menu=e,$(".m-menu").html(n.render(t.menu,a))}}),Nui.define("./script/page",["./render","./router","./ajax"],function(e,t,n){var a=this;a.imports("../style/base"),a.imports("../style/page"),n({url:"./script/data.json",success:function(n){e(n),t()}})});