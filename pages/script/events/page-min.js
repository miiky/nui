Nui.define('src/components/layer/layer',['component','util'],function(e,t){var n={_maskzIndex:1e4,_zIndex:1e4,_init:function(){var e=this,t=null;Nui.win.on('resize',function(){clearTimeout(t),t=setTimeout(function(){Nui.each(e.__instances,function(e){var t=e.options;(t.position||!0===t.isCenter)&&e.resize()})})})},_$fn:null,_$ready:null,init:null},i={content:'',width:320,height:'auto',maxWidth:0,maxHeight:0,timer:0,edge:0,container:'body',title:'温馨提示',isMove:!1,isMask:!0,isInnerMove:!1,isClickMask:!1,isMoveMask:!1,isHide:!0,isCenter:!0,isFull:!1,isTop:!1,isTips:!1,isFixed:!0,scrollbar:!0,align:'center',bubble:{enable:!1,dir:'top'},iframe:{enable:!1,cache:!1,src:''},close:{enable:!0,text:'×'},confirm:{enable:!1,name:'normal',text:'确定',callback:function(){return!0}},cancel:{enable:!0,text:'取消'},position:null,under:null,button:null,onMove:null,onResize:null,onScroll:null,onBeforeDestroy:null,onTimer:null};return this.extend(e,{static:n,options:i,_template:{layout:'<div class="<% className %>" style="<% include \'style\' %>"><div class="layer-box"><%if close%><% var btn = close %><% include "button" %><%/if%><%if bubble%><span class="layer-bubble layer-bubble-<%bubble%>"><b></b><i></i></span><%/if%><%if title%><div class="layer-head"><span class="layer-title"><%title%></span></div><%/if%><div class="layer-body"><div class="layer-main"><%content%></div></div><%if button && button.length%><div class="layer-foot" style="text-align:<%align%>"><div class="layer-inner"><%each button btn%><%include "button"%><%/each%></div></div><%/if%></div></div>',button:'<button class="ui-button<%if btn.name%><%each [].concat(btn.name) name%> ui-button-<%name%><%/each%><%/if%> layer-button-<%btn.id%>"<%if btn.style%> style="<%each btn.style v n%><%n%>:<%v%>;<%/each%>"<%/if%>><%btn.text || "按钮"%></button>',iframe:'<iframe<%each attr%> <%$index%>="<%$value%>"<%/each%>></iframe>',mask:'<div class="nui-layer-mask<%if skin%> nui-layer-mask-<%skin%><%/if%>" style="<%include \'style\'%>"><div class="layer-mask"></div></div>',movemask:'<div class="nui-layer-movemask<%if skin%> nui-layer-movemask-<%skin%><%/if%>" style="<%include \'style\'%>"></div>',style:'<%each style%><%$index%>:<%$value%>;<%/each%>'},data:{},_init:function(){this._zIndex=++this.constructor._zIndex,this._exec()},_exec:function(){var e=this,t=e.options,n=e.constructor;if(e._container=n._jquery(t.container),e._container.length){if(e._containerDOM=e._container.get(0),'BODY'!==e._containerDOM.tagName){e._window=e._container,e._isWindow=!1;var i=e._container.css('position');'absolute'!==i&&'relative'!==i&&e._container.css('position','relative')}else e._window=Nui.win,e._isWindow=!0;e._isFixed=t.isFixed&&!Nui.bsie6&&e._isWindow,e._create()}},_create:function(){var e=this,t=e.options,n=e._createButton(),i=!1;!0!==t.isTips&&(i='string'==typeof t.title);var o=e._tplData({content:e._getContent(),close:n.close,button:n.button,title:i?t.title||'温馨提示':null,bubble:!0===t.bubble.enable?t.bubble.dir:null,align:t.align||'center',style:{'z-index':e._zIndex,'position':'absolute','display':'block'}});e._isFixed&&(o.style.position='fixed'),e._setTop(),e.element=$(e._tpl2html('layout',o)).appendTo(e._container),e._box=e.element.children('.layer-box'),e.head=e._box.children('.layer-head'),e._body=e._box.children('.layer-body'),e.main=e._body.children('.layer-main'),e.foot=e._box.children('.layer-foot'),!0!==t.isTips&&(!0===t.iframe.enable&&(e._iframe=e.main.children('iframe'),e._iframeOnload()),!0===t.isMove&&i&&e._bindMove(),!0===t.isTop&&e._bindTop()),e._button.length&&e._buttonEvent(),!0===t.isFixed&&!0==!e._isFixed&&e._bindScroll(),e._show()},_getContent:function(){var e=this,t=e.options,n='';return!0!==t.isTips&&!0===t.iframe.enable?n=e._createIframe():'string'==typeof t.content?n=t.content:t.content instanceof jQuery&&(n=t.content.prop('outerHTML')),n},_createIframe:function(){var e=this,n=e.options,o='layer-iframe'+e.__id,a=n.iframe.src;return!1===i.iframe.cache&&(a=t.setParam('_',(new Date).getTime(),a)),e._tpl2html('iframe',{attr:{frameborder:'0',name:o,id:o,src:a,scroll:'hidden',style:'width:100%;'}})},_iframeOnload:function(){var e=this;e._iframe.load(function(){e._iframeDocument=e._iframe.contents(),e._resize()})},_createButton:function(){var e=this,t=e.options,n={},i={},o={};return e._button=[],!0!==t.isTips&&(Nui.each(['confirm','cancel'],function(e){var i=t[e];i&&!0===i.enable&&(n[e]={id:e,name:i.name,style:i.style,text:i.text,callback:i.callback})}),t.button&&t.button.length&&Nui.each(t.button,function(t){var i=t.id;o[i]||(o[i]=!0,n[i]&&(t.text||('cancel'===i?t.text='取消':'confirm'===i&&(t.text='确定')),delete n[i]),e._button['close'===i?'unshift':'push'](t))}),Nui.each(n,function(t){e._button.push(t)})),!o.close&&t.close&&!0===t.close.enable&&e._button.unshift({id:'close',name:t.close.name,style:t.close.style,text:t.close.text,callback:t.close.callback}),e._button[0]&&'close'===e._button[0].id?(i.close=e._button[0],i.button=e._button.slice(1)):i.button=e._button,i},_buttonEvent:function(){var e=this,t=e.options;Nui.each(e._button,function(n){e._on('click',e.element,'.layer-button-'+n.id,function(i,o){if(!o.hasClass('nui-button-disabled')){var a=n.id,s=n.callback,r='function'==typeof s?s.call(t,i,e,o):null;('confirm'===a&&!0===r||'confirm'!==a&&!1!==r)&&e.destroy()}})})},_bindTop:function(){var e=this;e._on('click',e.element,function(){e._setzIndex()})},_bindMove:function(){var e,t,n,i,o=this,a=o.options,s=o.element,r=o.constructor,l=s,c=!1;o._on('mousedown',o.head,function(n,i){c=!0,o._setzIndex(),!0===a.isMoveMask&&(l=o._moveMask=$(o._tpl2html('movemask',{skin:a.skin,style:{'z-index':o._zIndex+1,'cursor':'move','position':o._isFixed?'fixed':'absolute'}})).appendTo(o._container),l.css({width:o.data.outerWidth-r._getSize(l,'lr','all'),height:o.data.outerHeight-r._getSize(l,'tb','all'),top:o.data.top,left:o.data.left})),i.css('cursor','move'),e=n.pageX-o.data.left,t=n.pageY-o.data.top,n.stopPropagation()}),o._on('mousemove',Nui.doc,function(s){var r=o._container.outerWidth(),u=o._container.outerHeight();if(c)return n=s.pageX-e,i=s.pageY-t,n<0&&(n=0),i<0&&(i=0),!0===a.isInnerMove&&(n+o.data.outerWidth>r&&(n=r-o.data.outerWidth),i+o.data.outerHeight>u&&(i=u-o.data.outerHeight)),o.data.top=i,o.data.left=n,l.css({top:i,left:n}),!c}),o._on('mouseup',Nui.doc,function(e){c&&(c=!1,o.head.css('cursor','default'),!0===a.isMoveMask&&(s.css(o.data),o._moveMask.remove(),o._moveMask=null),'function'==typeof a.onMove&&a.onMove.call(a,o),o.data.offsetTop=o.data.top-o._window.scrollTop(),o.data.offsetLeft=o.data.left-o._window.scrollLeft())})},_bindScroll:function(){var e=this,t=e.options;e._on('scroll',e._window,function(){var n=e.data.offsetTop+e._window.scrollTop(),i=e.data.offsetLeft+e._window.scrollLeft();e.data.top=n,e.data.left=i,e.element.css(e.data),'function'==typeof t.onScroll&&t.onScroll.call(t,e)})},_setzIndex:function(){var e=this,t=e.constructor;e._isTop&&e.element&&(e._isTop=!1,e._zIndex=++t._zIndex,e.element.css('zIndex',e._zIndex),e._setTop())},_setLower:function(e){var t=this,n=t.constructor,i=t.options,o=[];i.under&&(o=o.concat(i.under),o.length&&Nui.each(o,function(t,i){t&&t.element&&t.element.css('z-index',e?t._zIndex:n._maskzIndex-1)}))},_setTop:function(){var e=this,t=e.constructor;Nui.each(t.__instances,function(t){t&&t!==e&&!0===t.options.isTop&&(t._isTop=!0)})},_position:function(){var e,t=this,n=t.data,i=t.options.position,o={top:i.top,left:i.left,right:i.right,bottom:i.bottom};return void 0!==o.top&&void 0!==o.bottom&&delete o.bottom,void 0!==o.left&&void 0!==o.right&&delete o.right,Nui.each(o,function(t,i){if(void 0===t)return delete o[i],!0;e=t,'string'==typeof t&&(t?'top'===i||'bottom'===i?'self'===t?e=n.outerHeight:/[\+\-\*\/]/.test(t)&&(e=new Function('var self = '+n.outerHeight+'; return '+t)()):'self'===t?e=n.outerWidth:/[\+\-\*\/]/.test(t)&&(e=new Function('var self = '+n.outerWidth+'; return '+t)()):e=0),o[i]='auto'===e?'auto':parseFloat(e)+'px'}),o},_resize:function(e){var t=this,n=(t.constructor,t.options),i=t.element,o=t._window.outerWidth(),a=t._window.outerHeight(),s=0,r=0;if(t._isFixed||(r=t._window.scrollLeft(),s=t._window.scrollTop()),t._setSize(),n.position){var l=i.css(t._position()).position();Nui.bsie6&&(r=0,s=0),t.data.left=l.left+r,t.data.top=l.top+s}else if('init'===e||!0===n.isCenter){var c=(o-t.data.outerWidth)/2+r,u=(a-t.data.outerHeight)/2+s,d=n.edge>0?n.edge:0;t.data.left=c>0?c:d,t.data.top=u>0?u:d}t.data.offsetTop=t.data.top-t._window.scrollTop(),t.data.offsetLeft=t.data.left-t._window.scrollLeft(),i.css(t.data)},_setSize:function(){var e=this,t=e.constructor,n=e.options,i=e.element,o=n.edge>0?2*n.edge:0,a=e._window.outerWidth()-o,s=e._window.outerHeight()-o;e._body.css({height:'auto',overflow:'visible'}),i.css({top:'auto',left:'auto',width:'auto',height:'auto'});var r=t._getSize(e._box,'tb','all')+e.head.outerHeight()+t._getSize(e.head,'tb','margin')+t._getSize(e._body,'tb','all')+e.foot.outerHeight()+t._getSize(e.foot,'tb','margin'),l=i.outerWidth();!0!==n.isFull?(n.width>0?l=n.width:('100%'===n.width||!0===n.scrollbar&&l>a)&&(l=a),n.maxWidth>0&&l>=n.maxWidth&&(l=n.maxWidth)):l=a;var c='nowrap';(n.width>0||l==n.maxWidth||l==a)&&(c='normal'),e.data.width=l-t._getSize(i,'lr','all'),e.main.css('white-space',c),i.width(e.data.width);var u=i.outerHeight();e._iframeDocument&&(e._iframeDocument[0].layer=e,u=r+e._iframeDocument.find('body').outerHeight()),!0!==n.isFull?(n.height>0?u=n.height:('100%'===n.height||(!0===n.scrollbar||e._iframeDocument)&&u>s)&&(u=s),n.maxHeight>0&&u>=n.maxHeight&&(u=n.maxHeight)):u=s,e.data.outerWidth=l,e.data.outerHeight=u,e.data.height=u-t._getSize(i,'tb','all'),i.height(e.data.height);var d=e.data.height-r;e.main.outerHeight()>d&&!e._iframe&&!0===n.scrollbar&&e._body.css('overflow','auto'),e._iframe&&e._iframe.height(d),e._body.height(e.data.contentHeight=d)},_showMask:function(){var e=this,t=e.constructor,n=e.options;e._containerDOM.__layermask__||(e._containerDOM.__layermask__=$(e._tpl2html('mask',{skin:n.skin,style:{'z-index':t._maskzIndex,'position':e._isFixed?'fixed':'absolute','top':'0px','left':'0px','width':'100%','height':e._isFixed?'100%':e._container.outerHeight()+'px'}})).appendTo(e._container)),!0===n.isClickMask&&e._on('click',e._containerDOM.__layermask__,function(){e.hide()})},_show:function(){var t=this,n=t.options;return e.init(t.main),t._resize('init'),t._setLower(),!0===n.isMask&&t._showMask(),n.timer>0&&(t._time=n.timer,t._timer()),'function'==typeof n.onInit&&n.onInit.call(n,t),t},_timer:function(){var e=this,t=e.options;e._time>0?('function'==typeof t.onTimer&&t.onTimer.call(t,e,e._time),e._timerid=setTimeout(function(){e._time-=1e3,e._timer()},e._time>1e3?1e3:e._time)):e.hide()},_reset:function(){var t=this,n=t.constructor,i=!0;e.exports._reset.call(this),e('destroy',t.main),Nui.each(n.__instances,function(e){if(e&&!0===e.options.isMask&&e!==t&&e._containerDOM===t._containerDOM)return i=!1}),i&&t._containerDOM.__layermask__&&(t._containerDOM.__layermask__.remove(),t._containerDOM.__layermask__=null),t.options.timer>0&&(t.timer=0,clearTimeout(t._timerid))},resize:function(){var e=this,t=e.options;e.element;return e._resize(),'function'==typeof t.onResize&&t.onResize.call(t,e),e},hide:function(){!0===this.options.isHide&&this.destroy()},destroy:function(){var e=this,t=e.constructor,n=e.options;'function'==typeof n.onBeforeDestroy&&!1===n.onBeforeDestroy.call(n,e)||(e._delete(),e._reset(),e._setLower(!0),e._isdestroy||(t._zIndex--,e._isdestroy=!0),'function'==typeof n.onDestroy&&n.onDestroy.call(n,e))}})}),Nui.define('src/components/layer/layerExt',['src/components/layer/layer','util'],function(layer,util){var module=this;return layer.alert=function(e,t,n,i){var o;return'object'==typeof e&&(o=e,e=o.content,delete o.content),layer($.extend({content:'<div style="padding:10px; line-height:20px;">'+(e||'')+'</div>',title:t,width:n,height:i,cancel:{text:'关闭'}},o||{}))},layer.confirm=function(e,t,n,i,o){var a;return'object'==typeof e&&(a=e,e=a.content,delete a.content),layer($.extend(!0,{content:'<div style="padding:10px; line-height:20px;">'+(e||'')+'</div>',title:n,width:i,height:o,align:'right',confirm:{callback:t||function(){return!0}}},a||{},{confirm:{enable:!0}}))},layer.iframe=function(e,t,n,i){return layer({iframe:{enable:!0,src:e},title:t,width:n,height:i,cancel:{text:'关闭'}})},layer.tips=function(e,t,n,i,o){var a;return'object'==typeof e&&(a=e,e=a.content,delete a.content),layer($.extend(!0,{content:e,id:'tips',width:i||'auto',height:o||'auto',position:n,bubble:{enable:!0,dir:t||'top'}},a||{},{isTips:!0,isMask:!1,isClose:!1,close:{enable:!1}}))},layer.loading=function(e,t,n){var i;return'object'==typeof e&&(i=e,e=i.content,delete i.content),Nui.type(e,'Number')&&(n=t,t=e,e=''),layer($.extend({content:'<div>'+(e||'正在加载数据...')+'</div>',width:t||'auto',height:n||'auto'},i||{},{id:'loading',isTips:!0,close:{enable:!1}}))},layer.message=function(e,t){var n,i='#f00';return'object'==typeof e&&(n=e,t=n.content,delete n.content,e='success'),'success'!==e&&'error'!==e&&(t=e,e='success'),'success'!==e||t?'error'!==e||t||(t='操作失败'):t='操作成功','success'===e&&(i='#39B54A'),layer($.extend({content:'<div style="padding:10px; color:'+i+';">'+t+'</div>',id:'message',width:'auto',height:'auto',isTips:!0,timer:1500,close:{enable:!0}},n||{},{isMask:!1}))},layer.form=function(options){var onInit=options.onInit;delete options.onInit;var valid=options.valid,btns=$.extend([],options.button||[{id:'cancel',text:'关闭'},{id:'confirm',name:'normal',text:'保存'}]);Nui.each(btns,function(e,t){if('confirm'===e.id&&!e.callback)return btns[t].callback=function(e,t){t.main.find('form').submit()},!1}),delete options.button;var formLayer=layer($.extend(!0,{button:btns},{scrollbar:!1,id:'form',onInit:function(self){var main=self.main,elems=main.find('[name!=""][data-rule]'),form=main.find('form'),rules={},messages={},setting=form.data('setting');elems.each(function(){var elem=$(this),name=elem.attr('name'),data=elem.data(),rule=eval('('+data.rule+')'),message=eval('('+data.message+')');rules[name]=rule,$.each(message,function(e,t){'function'==typeof options.messageFilter&&(message[e]=options.messageFilter.call(self.options,name,t)||''),message[e]='<b></b><s></s><i class="iconfont">&#xe605;</i>'+message[e]}),messages[name]=message});var opts={rules:rules,messages:messages,errorClass:'s-err',onkeyup:!1,focusInvalid:!1,onfocusout:!1,focusCleanup:!0,ignore:'',success:function(e,t){e.remove(),$(t).addClass('s-succ')},errorPlacement:function(e,t){t.removeClass('s-succ'),e.text()&&t.closest(options.itemWrap||'.ui-item').find(options.errorWrap||'.ui-err').html(e)},submitHandler:function(){var e={};if(e='function'==typeof options.getData?options.getData.call(self.options,self,form):util.getData(form).result,'function'==typeof options.onBeforeSubmit&&!1===(e=options.onBeforeSubmit.call(self.options,self,e)))return!1;var t=layer.loading({content:options.loading||'正在保存数据...',under:self});$.ajax($.extend({url:form.attr('action'),dataType:'json',type:form.attr('method')||'POST',data:e,success:function(e,n){t.hide(),'function'==typeof options.onSuccess&&options.onSuccess.call(self.options,self,e,n)},error:function(e){t.hide(),'function'==typeof options.onError&&options.onError.call(self.options,self,e)}},options.ajax||{}),null)}};self.validator=form.validate($.extend(!0,opts,setting||{},valid||{})),'function'==typeof onInit&&onInit.call(self.options,self)}},options||{}));return formLayer},layer}),Nui.define('./script/events/page',['template','events','src/components/layer/layerExt'],function(e,t,n){t({elem:$('#data'),data:['蔬菜','水果','苹果'],template:this.renders('<%each $list%><li class="e-mt5"><label><input type="checkbox" value="<%$index%>"><span><%$value%></span></label></li><%/each%>'),events:{'click .j-add':'add render','click .j-del':'checks del remove render','click .j-update':'checks update'},checks:function(){var e=[];this.elem.find(':checked');return!!this.elem.find(':checked').length&&(this.elem.find(':checked').each(function(){e.push($(this).val())}),e)},render:function(){this.elem.html(e.render(this.template,this.data))},add:function(e,t,n){this.data.push('自定义')},remove:function(){var e=[];Nui.each(this.data,function(t){void 0!==t&&e.push(t)}),this.data=e},del:function(e,t,n){var i=this;Nui.each(n,function(e){delete i.data[e]})},update:function(e,t,i){var o=this;n.confirm('<input type="text" style="border:1px solid #ccc; width:180px; height:24px;" />',function(e){var t=Nui.trim(e.find('input').val());if(t)return Nui.each(i,function(e){o.data[e]=t}),o.render(),!0},'',210)}}).render()});
//# sourceMappingURL=page-min.js.map?v=bd905ce