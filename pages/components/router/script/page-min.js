Nui.define('pages/components/router/script/ajax',function(){var e=$.ajax;return function(t){'string'==typeof t&&(t={url:t,dataType:'json'});var n=t.success||$.noop,i=t.error||$.noop;return t.success=function(){n.apply(this,arguments)},t.error=function(){i.apply(this,arguments)},e($.extend(!0,{cache:!1,dataType:'json',statusCode:{404:function(){},502:function(){}}},t))}}),Nui.define('pages/components/router/script/tpls/seeVoucher',function(){return this.renders('这是查凭证页面，页面完整url是：<% url %>，路径是：<% path %><% if param %><br>参数分别是：<% each param %><% $index %>=<% $value %>，<% /each %><% /if %><a id="aaa" class="nui-router-back">返回</a> ')}),Nui.define('pages/components/router/script/modules/seeVoucher',['pages/components/router/script/tpls/seeVoucher','template'],function(e,t){return function(n,i,a){i.html(t.render(e,a))}}),Nui.define('src/components/placeholder',['component'],function(e){return this.extend(e,{options:{text:'',animate:!1,equal:!1,color:'#ccc'},_template:{list:'<%each style%><%$index%>:<%$value%>;<%/each%>',wrap:'<strong class="<% className %>" style="<%include \'list\'%>" />',elem:'<b style="<%include \'list\'%>"><%text%></b>'},_init:function(){this._exec()},_exec:function(){var e=this,t=e._getTarget();if(t){var n=e.deftext=t.attr('placeholder');!e.deftext&&e.options.text&&t.attr('placeholder',n=e.options.text),e.text=Nui.trim(n),void 0===e.val&&(e.val=Nui.trim(t.val())),e.text&&e._create()}},_create:function(){var e=this,t=e.options,n=e.constructor;if(!t.animate&&(t.animate||'placeholder'in document.createElement('input')))e._setStyle();else{t.animate&&e.target.removeAttr('placeholder');var i=e._tplData();i.style={'position':'relative','display':'inline-block','width':e.target.outerWidth()+'px','overflow':'hidden','cursor':'text'},e.target.wrap(e._tpl2html('wrap',i)),e.element=$(e._tpl2html('elem',{text:e.text,style:function(){var i=e.target.outerHeight(),a=e.target.is('textarea');return{'display':Nui.trim(e.target.val())?'none':'inline','position':'absolute','left':n._getSize(e.target,'l','padding')+n._getSize(e.target,'l')+'px','top':n._getSize(e.target,'t','padding')+n._getSize(e.target,'t')+'px','height':a?'auto':i+'px','line-height':a?'normal':i+'px','color':t.color}}()})).insertAfter(e.target),e._events()}},_setStyle:function(){var e=this;e.options;e.className='_placeholder-'+e.__id,e.target.addClass(e.className),e.constructor.style||e._createStyle(),e._createRules()},_createStyle:function(){var e=this,t=document.createElement('style');document.head.appendChild(t),e.constructor.style=t.sheet},_createRules:function(){var e=this,t=e.constructor.style,n=e.__id;try{t.deleteRule(n)}catch(e){}Nui.each(['::-webkit-input-placeholder',':-ms-input-placeholder','::-moz-placeholder'],function(i){var a='.'+e.className+i,o='opacity:1; color:'+(e.options.color||'');try{'addRule'in t?t.addRule(a,o,n):'insertRule'in t&&t.insertRule(a+'{'+o+'}',n)}catch(e){}})},_events:function(){var e=this,t=e.options,n=e.constructor,i=n._getSize(e.target,'l','padding')+n._getSize(e.target,'l');e._on('click',e.element,function(){e.target.focus()}),e._on('focus',e.target,function(){t.animate&&e.element.stop(!0,!1).animate({left:i+10,opacity:'0.5'})}),e._on('blur change',e.target,function(t,n){e.value()}),e._on('keyup keydown',e.target,function(t,n){Nui.trim(n.val())?e.element.hide():e.element.show()})},_reset:function(){var e=this;e._off(),e.element&&(e.element.remove(),e.target.unwrap()),e.target.val(e.val).removeClass(e.className),e.deftext?e.target.attr('placeholder',e.deftext):e.target.removeAttr('placeholder')},value:function(e){var t=this.constructor,n=this.target,i=t._getSize(n,'l','padding')+t._getSize(n,'l'),a=Nui.trim(arguments.length?n.val(e).val():n.val());!this.options.equal&&a===this.text||!a?(n.val(''),this.element&&this.element.show(),this.options.animate&&this.element.stop(!0,!1).animate({left:i,opacity:'1'})):this.element&&this.element.hide()}})}),Nui.define('src/components/highlight/highlight',function(){return this.extend('component',{static:{_init:function(){var e=this;Nui.doc.on('click',function(){e._active&&Nui.each(e.__instances,function(e){e._active&&(e.element.find('tr.s-crt').removeClass('s-crt'),e._active=!1)}),e._active=!1})},_getcode:function(e,t){return'<code class="'+e+'">'+t+'</code>'},_getarr:function(e,t){var n=[];return e?(Nui.each(e,function(e){var i=t.indexOf(e),a=t.substr(0,i);t=t.substr(i+e.length),n.push(a),n.push(e)}),n.push(t)):n.push(t),n},_comment:function(e){return/\/\*/.test(e)?e=e.replace(/(\/\*(.|\s)*?\*\/)/g,this._getcode('comment','$1')):/\/\//.test(e)&&(e=e.replace(/(\/\/.*)$/g,this._getcode('comment','$1'))),e}},options:{tools:{copy:!0},isLight:!0,isLine:!1,isTitle:!0},_init:function(){this._exec()},_exec:function(){var e=this,t=e._getTarget();if(t){var n=t.get(0);'SCRIPT'===n.tagName&&'text/highlight'==n.type&&(e.code=t.html().replace(/^[\r\n]+|[\r\n]+$/g,'').replace(/</g,'&lt;').replace(/>/g,'&gt;'),e.element&&e.element.remove(),e._create(),e.options.isLight&&e._event())}},_title:'',_template:'<div class="<% className %>"><%if tools%><div class="tools"><%if tools.copy%><em class="copy">复制</em><%/if%></div><%/if%><div class="body"><table><%each list val key%><tr><%if isLine === true%><td class="line" number="<%key+1%>"><%if bsie7%><%key+1%><%/if%></td><%/if%><td class="code"><%val%></td></tr><%/each%></table></div><%if isTitle%><em class="title"><%title%></em><%/if%></div>',_create:function(){var e=this,t=e.options,n=$.extend({bsie7:Nui.bsie7,list:e._list(),title:e._title,isLine:t.isLine,tools:t.tools,isTitle:t.isTitle},e._tplData());e.element=$(e._tpl2html(n)).insertAfter(e.target)},_getCode:function(){return this.code},_list:function(){return this._getCode().split('\n')},mapping:{'click tr':'active','click .copy':'copy'},callback:{active:function(e,t){this.constructor._active=this._active=!0,t.addClass('s-crt').siblings().removeClass('s-crt'),e.stopPropagation()},copy:function(){alert('傻帽！逗你玩呢。')}}})}),Nui.define('src/components/highlight/javascript',function(){return this.extend('src/components/highlight/highlight',{_title:'js',_getCode:function(){var e=this,t=e.code,n=e.constructor,i='',a=t.match(/(\/\/.*)|(\/\*(.|\s)*?\*\/)|('[^']*')|("[^"]*")/g),o=n._getarr(a,t);return Nui.each(o,function(e){$.trim(e)&&(/^\s*\/\//.test(e)?e=n._getcode('comment',e):/^\s*\/\*/.test(e)?e=e.replace(/(.+)/g,n._getcode('comment','$1')):(e=/'|"/.test(e)?e.replace(/(.+)/g,n._getcode('string','$1')):e.replace(new RegExp('(&lt;|&gt;|;|!|%|\\|\\[|\\]|\\(|\\)|\\{|\\}|\\=|\\/|-|\\+|,|\\.|\\:|\\?|~|\\*|&)','g'),n._getcode('symbol','$1')).replace(new RegExp('(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|elseif|each|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|include|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var)(\\s+|\\<code)','g'),n._getcode('keyword','$1')+'$2').replace(/(\/code>\s*)(\d+)/g,'$1'+n._getcode('number','$2')).replace(/(\/code>\s*)?([^<>\s]+)(\s*<code)/g,'$1'+n._getcode('word','$2')+'$3'),e=n._comment(e))),i+=e}),i}})}),Nui.define('pages/components/router/script/tpls/recordVoucher',function(){return{layout:this.renders('<input type="text" placeholder="aaaaaaaaaaa" value="11" data-placeholder-options=\'{"color":"#f60", "animate":true}\' /><input type="text" placeholder="111" data-placeholder-options=\'{"color":"#f60", "animate":true, "id":"aaa"}\' /><input type="text" placeholder="222" data-placeholder-options=\'{"color":"#f60", "animate":true}\' /><input type="text" placeholder="333" data-placeholder-options=\'{"color":"#f60", "animate":true, "id":"aaa"}\' /><div class="empty">还原</div><script type="text/highlight" data-javascript-options="{id:\'b\'}">var a = 1;var b = 2;<\/script> <div class="box nui-router-back">返回<%a??%><%params.a??%></div><a id="aaa">aaaaaaaaaaa</a><%include \'show\'%>'),show:this.renders('1111111111111111112')}}),Nui.define('pages/components/router/script/modules/recordVoucher',['component','pages/components/router/script/tpls/recordVoucher','template','src/components/highlight/javascript','src/components/placeholder'],function(e,t,n,i,a){return{target:'#recordVoucher',path:'/voucher/record',template:t,onChange:function(){delete this.data.a},onData:function(e){this.data.a=e.a},mapping:{'click .empty':'empty','click a':'c a'},callback:{a:function(){var t=this;e.destroy(t.element),setTimeout(function(){i.init(t.element),a.init(t.element)},1e3)},b:function(){},c:function(){},empty:function(){a.value(this.element,'')}}}}),Nui.define('src/components/layer/layer',['component','util'],function(e,t){var n={_maskzIndex:1e4,_zIndex:1e4,_init:function(){var e=this,t=null;Nui.win.on('resize',function(){clearTimeout(t),t=setTimeout(function(){Nui.each(e.__instances,function(e){var t=e.options;(t.position||!0===t.isCenter)&&e.resize()})})})},$fn:null,$ready:null,init:null},i={content:'',width:320,height:'auto',maxWidth:0,maxHeight:0,timer:0,edge:0,container:'body',title:'温馨提示',isMove:!1,isMask:!0,isInnerMove:!1,isClickMask:!1,isMoveMask:!1,isHide:!0,isCenter:!0,isFull:!1,isTop:!1,isTips:!1,isFixed:!0,scrollbar:!0,align:'center',bubble:{enable:!1,dir:'top'},iframe:{enable:!1,cache:!1,src:''},close:{enable:!0,text:'×'},confirm:{enable:!1,name:'normal',text:'确定',callback:function(){return!0}},cancel:{enable:!0,text:'取消'},position:null,under:null,button:null,onMove:null,onResize:null,onScroll:null,onBeforeDestroy:null};return this.extend(e,{static:n,options:i,_template:{layout:'<div class="<% className %>" style="<% include \'style\' %>"><div class="layer-box"><%if close%><% var btn = close %><% include "button" %><%/if%><%if bubble%><span class="layer-bubble layer-bubble-<%bubble%>"><b></b><i></i></span><%/if%><%if title%><div class="layer-head"><span class="layer-title"><%title%></span></div><%/if%><div class="layer-body"><div class="layer-main"><%content%></div></div><%if button && button.length%><div class="layer-foot" style="text-align:<%align%>"><div class="layer-inner"><%each button btn%><%include "button"%><%/each%></div></div><%/if%></div></div>',button:'<button class="ui-button<%if btn.name%><%each [].concat(btn.name) name%> ui-button-<%name%><%/each%><%/if%> layer-button-<%btn.id%>"<%if btn.style%> style="<%each btn.style v n%><%n%>:<%v%>;<%/each%>"<%/if%>><%btn.text || "按钮"%></button>',iframe:'<iframe<%each attr%> <%$index%>="<%$value%>"<%/each%>></iframe>',mask:'<div class="nui-layer-mask<%if skin%> nui-layer-mask-<%skin%><%/if%>" style="<%include \'style\'%>"><div class="layer-mask"></div></div>',movemask:'<div class="nui-layer-movemask<%if skin%> nui-layer-movemask-<%skin%><%/if%>" style="<%include \'style\'%>"></div>',style:'<%each style%><%$index%>:<%$value%>;<%/each%>'},data:{},_init:function(){this._zIndex=++this.constructor._zIndex,this._exec()},_exec:function(){var e=this,t=e.options,n=e.constructor;if(e._container=n._jquery(t.container),e._container.length){if(e._containerDOM=e._container.get(0),'BODY'!==e._containerDOM.tagName){e._window=e._container,e._isWindow=!1;var i=e._container.css('position');'absolute'!==i&&'relative'!==i&&e._container.css('position','relative')}else e._window=Nui.win,e._isWindow=!0;e._isFixed=t.isFixed&&!Nui.bsie6&&e._isWindow,e._create()}},_create:function(){var e=this,t=e.options,n=e._createButton(),i=!1;!0!==t.isTips&&(i='string'==typeof t.title);var a=e._tplData({content:e._getContent(),close:n.close,button:n.button,title:i?t.title||'温馨提示':null,bubble:!0===t.bubble.enable?t.bubble.dir:null,align:t.align||'center',style:{'z-index':e._zIndex,'position':'absolute','display':'block'}});e._isFixed&&(a.style.position='fixed'),e._setTop(),e.element=$(e._tpl2html('layout',a)).appendTo(e._container),e._box=e.element.children('.layer-box'),e._head=e._box.children('.layer-head'),e._body=e._box.children('.layer-body'),e._main=e._body.children('.layer-main'),e._foot=e._box.children('.layer-foot'),!0!==t.isTips&&(!0===t.iframe.enable&&(e._iframe=e._main.children('iframe'),e._iframeOnload()),!0===t.isMove&&i&&e._bindMove(),!0===t.isTop&&e._bindTop()),e._button.length&&e._buttonEvent(),!0===t.isFixed&&!0==!e._isFixed&&e._bindScroll(),e._show()},_getContent:function(){var e=this,t=e.options,n='';return!0!==t.isTips&&!0===t.iframe.enable?n=e._createIframe():'string'==typeof t.content?n=t.content:t.content instanceof jQuery&&(n=t.content.prop('outerHTML')),n},_createIframe:function(){var e=this,n=e.options,a='layer-iframe'+e.__id,o=n.iframe.src;return!1===i.iframe.cache&&(o=t.setParam('_',(new Date).getTime(),o)),e._tpl2html('iframe',{attr:{frameborder:'0',name:a,id:a,src:o,scroll:'hidden',style:'width:100%;'}})},_iframeOnload:function(){var e=this;e._iframe.load(function(){e._iframeDocument=e._iframe.contents(),e._resize()})},_createButton:function(){var e=this,t=e.options,n={},i={},a={};return e._button=[],!0!==t.isTips&&(Nui.each(['confirm','cancel'],function(e){var i=t[e];i&&!0===i.enable&&(n[e]={id:e,name:i.name,style:i.style,text:i.text,callback:i.callback})}),t.button&&t.button.length&&Nui.each(t.button,function(t){var i=t.id;a[i]||(a[i]=!0,n[i]&&(t.text||('cancel'===i?t.text='取消':'confirm'===i&&(t.text='确定')),delete n[i]),e._button['close'===i?'unshift':'push'](t))}),Nui.each(n,function(t){e._button.push(t)})),!a.close&&t.close&&!0===t.close.enable&&e._button.unshift({id:'close',name:t.close.name,style:t.close.style,text:t.close.text,callback:t.close.callback}),e._button[0]&&'close'===e._button[0].id?(i.close=e._button[0],i.button=e._button.slice(1)):i.button=e._button,i},_buttonEvent:function(){var e=this;Nui.each(e._button,function(t){e._on('click',e.element,'.layer-button-'+t.id,function(n,i){if(!i.hasClass('nui-button-disabled')){var a=t.id,o=t.callback,r='function'==typeof o?o.call(e,e._main,e.__id,i):null;('confirm'===a&&!0===r||'confirm'!==a&&!1!==r)&&e.destroy()}})})},_bindTop:function(){var e=this;e._on('click',e.element,function(){e._setzIndex()})},_bindMove:function(){var e,t,n,i,a=this,o=a.options,r=a.element,s=a.constructor,c=r,l=!1;a._on('mousedown',a._head,function(n,i){l=!0,a._setzIndex(),!0===o.isMoveMask&&(c=a._moveMask=$(a._tpl2html('movemask',{skin:o.skin,style:{'z-index':a._zIndex+1,'cursor':'move','position':a._isFixed?'fixed':'absolute'}})).appendTo(a._container),c.css({width:a.data.outerWidth-s._getSize(c,'lr','all'),height:a.data.outerHeight-s._getSize(c,'tb','all'),top:a.data.top,left:a.data.left})),i.css('cursor','move'),e=n.pageX-a.data.left,t=n.pageY-a.data.top,n.stopPropagation()}),a._on('mousemove',Nui.doc,function(r){var s=a._container.outerWidth(),u=a._container.outerHeight();if(l)return n=r.pageX-e,i=r.pageY-t,n<0&&(n=0),i<0&&(i=0),!0===o.isInnerMove&&(n+a.data.outerWidth>s&&(n=s-a.data.outerWidth),i+a.data.outerHeight>u&&(i=u-a.data.outerHeight)),a.data.top=i,a.data.left=n,c.css({top:i,left:n}),!l}),a._on('mouseup',Nui.doc,function(e){l&&(l=!1,a._head.css('cursor','default'),!0===o.isMoveMask&&(r.css(a.data),a._moveMask.remove(),a._moveMask=null),'function'==typeof o.onMove&&o.onMove.call(a,a._main,a.__id),a.data.offsetTop=a.data.top-a._window.scrollTop(),a.data.offsetLeft=a.data.left-a._window.scrollLeft())})},_bindScroll:function(){var e=this,t=e.options;e._on('scroll',e._window,function(){var n=e.data.offsetTop+e._window.scrollTop(),i=e.data.offsetLeft+e._window.scrollLeft();e.data.top=n,e.data.left=i,e.element.css(e.data),'function'==typeof t.onScroll&&t.onScroll.call(e,e._main,e.__id)})},_setzIndex:function(){var e=this,t=e.constructor;e._isTop&&e.element&&(e._isTop=!1,e._zIndex=++t._zIndex,e.element.css('zIndex',e._zIndex),e._setTop())},_setLower:function(e){var t=this,n=t.constructor,i=t.options,a=[];i.under&&(a=a.concat(i.under),a.length&&Nui.each(a,function(t,i){t&&t.element&&t.element.css('z-index',e?t._zIndex:n._maskzIndex-1)}))},_setTop:function(){var e=this,t=e.constructor;Nui.each(t.__instances,function(t){t&&t!==e&&!0===t.options.isTop&&(t._isTop=!0)})},_position:function(){var e,t=this,n=t.data,i=t.options.position,a={top:i.top,left:i.left,right:i.right,bottom:i.bottom};return void 0!==a.top&&void 0!==a.bottom&&delete a.bottom,void 0!==a.left&&void 0!==a.right&&delete a.right,Nui.each(a,function(t,i){if(void 0===t)return delete a[i],!0;e=t,'string'==typeof t&&(t?'top'===i||'bottom'===i?'self'===t?e=n.outerHeight:/[\+\-\*\/]/.test(t)&&(e=new Function('var self = '+n.outerHeight+'; return '+t)()):'self'===t?e=n.outerWidth:/[\+\-\*\/]/.test(t)&&(e=new Function('var self = '+n.outerWidth+'; return '+t)()):e=0),a[i]='auto'===e?'auto':parseFloat(e)+'px'}),a},_resize:function(e){var t=this,n=(t.constructor,t.options),i=t.element,a=t._window.outerWidth(),o=t._window.outerHeight(),r=0,s=0;if(t._isFixed||(s=t._window.scrollLeft(),r=t._window.scrollTop()),t._setSize(),n.position){var c=i.css(t._position()).position();Nui.bsie6&&(s=0,r=0),t.data.left=c.left+s,t.data.top=c.top+r}else if('init'===e||!0===n.isCenter){var l=(a-t.data.outerWidth)/2+s,u=(o-t.data.outerHeight)/2+r,d=n.edge>0?n.edge:0;t.data.left=l>0?l:d,t.data.top=u>0?u:d}t.data.offsetTop=t.data.top-t._window.scrollTop(),t.data.offsetLeft=t.data.left-t._window.scrollLeft(),i.css(t.data)},_setSize:function(){var e=this,t=e.constructor,n=e.options,i=e.element,a=n.edge>0?2*n.edge:0,o=e._window.outerWidth()-a,r=e._window.outerHeight()-a;e._body.css({height:'auto',overflow:'visible'}),i.css({top:'auto',left:'auto',width:'auto',height:'auto'});var s=t._getSize(e._box,'tb','all')+e._head.outerHeight()+t._getSize(e._head,'tb','margin')+t._getSize(e._body,'tb','all')+e._foot.outerHeight()+t._getSize(e._foot,'tb','margin'),c=i.outerWidth();!0!==n.isFull?(n.width>0&&(c=n.width),n.maxWidth>0&&c>=n.maxWidth&&(c=n.maxWidth),!0===n.scrollbar&&c>o&&(c=o)):c=o;var l='nowrap';(n.width>0||c==n.maxWidth||c==o)&&(l='normal'),e.data.width=c-t._getSize(i,'lr','all'),e._main.css('white-space',l),i.width(e.data.width);var u=i.outerHeight();e._iframeDocument&&(e._iframeDocument[0].layer=e,u=s+e._iframeDocument.find('body').outerHeight()),!0!==n.isFull?(u=n.height>0?n.height:u,n.maxHeight>0&&u>=n.maxHeight&&(u=n.maxHeight),(!0===n.scrollbar||e._iframeDocument)&&u>r&&(u=r)):u=r,e.data.outerWidth=c,e.data.outerHeight=u,e.data.height=u-t._getSize(i,'tb','all'),i.height(e.data.height);var d=e.data.height-s;e._main.outerHeight()>d&&!e._iframe&&!0===n.scrollbar&&e._body.css('overflow','auto'),e._iframe&&e._iframe.height(d),e._body.height(d)},_showMask:function(){var e=this,t=e.constructor,n=e.options;e._containerDOM.__layermask__||(e._containerDOM.__layermask__=$(e._tpl2html('mask',{skin:n.skin,style:{'z-index':t._maskzIndex,'position':e._isFixed?'fixed':'absolute','top':'0px','left':'0px','width':'100%','height':e._isFixed?'100%':e._container.outerHeight()+'px'}})).appendTo(e._container)),!0===n.isClickMask&&e._on('click',e._containerDOM.__layermask__,function(){e.hide()})},_show:function(){var t=this,n=t.options;return e.init(t._main),t._resize('init'),t._setLower(),!0===n.isMask&&t._showMask(),n.timer>0&&(t._timer=setTimeout(function(){t.hide()},n.timer)),'function'==typeof n.onInit&&n.onInit.call(this,t._main,t.__id),t},_reset:function(){var t=this,n=t.constructor,i=!0;e.exports._reset.call(this),e.destroy(t._main),Nui.each(n.__instances,function(e){if(e&&!0===e.options.isMask&&e!==t&&e._containerDOM===t._containerDOM)return i=!1}),i&&t._containerDOM.__layermask__&&(t._containerDOM.__layermask__.remove(),t._containerDOM.__layermask__=null),t.options.timer>0&&clearTimeout(t._timer)},resize:function(){var e=this,t=e.options;e.element;return e._resize(),'function'==typeof t.onResize&&t.onResize.call(this,e._main,e.__id),e},hide:function(){!0===this.options.isHide&&this.destroy()},destroy:function(){var e=this,t=e.constructor,n=e.options;'function'==typeof n.onBeforeDestroy&&!1===n.onBeforeDestroy.call(this,e._main,e.__id)||(e._delete(),e._reset(),e._setLower(!0),e._isdestroy||(t._zIndex--,e._isdestroy=!0),'function'==typeof n.onDestroy&&n.onDestroy.call(this,e._main,e.__id))}})}),Nui.define('src/components/layer/layerExt',['src/components/layer/layer'],function(layer){var module=this;return layer.alert=function(e,t,n,i){var a;return'object'==typeof e&&(a=e,e=a.content,delete a.content),layer($.extend({content:'<div style="padding:10px; line-height:20px;">'+(e||'')+'</div>',width:n,height:i,cancel:{text:'关闭'}},a||{}))},layer.confirm=function(e,t,n,i,a){var o;return'object'==typeof e&&(o=e,e=o.content,delete o.content),layer($.extend(!0,{content:'<div style="padding:10px; line-height:20px;">'+(e||'')+'</div>',width:i,height:a,align:'right',confirm:{callback:t||function(){return!0}}},o||{},{confirm:{enable:!0}}))},layer.iframe=function(e,t,n,i){return layer({iframe:{enable:!0,src:e},width:n,height:i,cancel:{text:'关闭'}})},layer.tips=function(e,t,n,i,a){var o;return'object'==typeof e&&(o=e,e=o.content,delete o.content),layer($.extend(!0,{content:e,id:'tips',width:i||'auto',height:a||'auto',position:n,bubble:{enable:!0,dir:t||'top'}},o||{},{isTips:!0,isMask:!1,isClose:!1,close:{enable:!1}}))},layer.loading=function(e,t,n){var i;return'object'==typeof e&&(i=e,e=i.content,delete i.content),Nui.type(e,'Number')&&(n=t,t=e,e=''),layer($.extend({content:'<div>'+(e||'正在加载数据...')+'</div>',width:t||'auto',height:n||'auto'},i||{},{id:'loading',isTips:!0,close:{enable:!1}}))},layer.message=function(e,t){var n,i='#f00';return'object'==typeof e&&(n=e,t=n.content,delete n.content,e='success'),'success'!==e&&'error'!==e&&(t=e,e='success'),'success'!==e||t?'error'!==e||t||(t='操作失败'):t='操作成功','success'===e&&(i='#39B54A'),layer($.extend({content:'<div style="padding:10px; color:'+i+';">'+t+'</div>',id:'message',width:'auto',height:'auto',isTips:!0,timer:1500,close:{enable:!0}},n||{},{isMask:!1}))},layer.form=function(options){var onInit=options.onInit;delete options.onInit;var validator,valid=options.valid,btns=$.extend([],options.button||[{id:'cancel',text:'关闭'},{id:'confirm',name:'normal',text:'保存'}]);Nui.each(btns,function(e,t){if('confirm'===e.id&&!e.callback)return btns[t].callback=function(e){e.find('form').submit()},!1}),delete options.button;var formLayer=layer($.extend(!0,{button:btns},{scrollbar:!1,id:'form',onInit:function(main,id){var that=this,elems=main.find('[name!=""][data-rule]'),form=main.find('form'),rules={},messages={},setting=form.data('setting');elems.each(function(){var elem=$(this),name=elem.attr('name'),data=elem.data(),rule=eval('('+data.rule+')'),message=eval('('+data.message+')');rules[name]=rule,$.each(message,function(e,t){'function'==typeof options.messageFilter&&(message[e]=options.messageFilter(name,t)||''),message[e]='<b></b><s></s><i class="iconfont">&#xe605;</i>'+message[e]}),messages[name]=message});var opts={rules:rules,messages:messages,errorClass:'s-err',onkeyup:!1,focusInvalid:!1,onfocusout:!1,focusCleanup:!0,ignore:'',success:function(e,t){e.remove(),$(t).addClass('s-succ')},errorPlacement:function(e,t){t.removeClass('s-succ'),e.text()&&t.closest(options.itemWrap||'.ui-item').find(options.errorWrap||'.ui-err').html(e)},submitHandler:function(){var e={};if(options.ajax&&'function'==typeof options.ajax.getData)e=options.ajax.getData(form);else{var t=form.serializeArray();$.each(t,function(t,n){e[n.name]||(e[n.name]=[]),e[n.name].push(n.value)});for(var n in e)e[n]=e[n].join(',')}if('function'==typeof options.onBeforeSubmit&&!1===(e=options.onBeforeSubmit.call(that,main,id,e)))return!1;var i=layer.loading({content:options.loading||'正在保存数据...',under:that});$.ajax($.extend({url:form.attr('action'),dataType:'json',type:form.attr('method')||'POST',data:e,success:function(e,t){i.hide(),'function'==typeof options.onSuccess&&options.onSuccess.call(that,main,id,e,t)},error:function(e){i.hide(),'function'==typeof options.onError&&options.onError.call(that,main,id,e)}},options.ajax||{}),null)}};validator=form.validate($.extend(!0,opts,setting||{},valid||{})),'function'==typeof onInit&&onInit.call(that,main,id,validator)}},options||{}));return formLayer.validator=validator,formLayer},layer}),Nui.define('src/components/router',['component','template','events'],function(e,t,n){var i={_paths:{},_init:function(){var e=this;Nui.doc.on('click','.nui-router-back',function(){return e.back()}).on('click','.nui-router-forward',function(){return e.forward()})},_setpaths:function(e,t){this._paths[e]||(this._paths[e]=t)},_replace:function(e){return e.replace(location.protocol+'//'+location.host,'').replace(/\s+/g,'').replace(/^\#\!?/,'').replace(/^([^\/])/,'/$1').replace(/\/$/,'')},_getWrapper:function(e){return $('<div class="wrapper"></div>').appendTo(e)},_split:function(e){var t={url:e,params:{}},n=e.match(/\?[^\/\s]+/);if(n){var i=n[0];t.url=e.replace(i,''),i=i.replace('?','').split('&'),Nui.each(i,function(e,n){var i=e.split('=');t.params[i[0]]=i[1]})}return t},_change:function(){var i=this;if(!$.isEmptyObject(i._paths)){var a=location.hash,o=this._split(a),r=i._replace(o.url),s=o.params;Nui.each(i._paths,function(o){if(r===o.path||0===r.indexOf(o.path)){var c=r.replace(o.path,'').replace(/^\//,''),l=i.__instances[o.id],u=l.options,d={};if(c=c?c.split('/'):[],'function'==typeof u.onChange&&c.length===o.params.length){if(Nui.each(o.params,function(e,t){d[e]=c[t]}),Nui.each(s,function(e,t){d[e]=s[t]}),l._send&&l._send.data&&'function'==typeof u.onData&&(u.onData.call(u,l._send.data),delete l._send),u.data.path=o.path+'/',u.data.url=r+'/',u.data.params=d,u.data.query=s,!0===l._isRrender||!l._wrapper){u.wrapper&&!l._wrapper?l._wrapper=i._getWrapper(l.container):i._wrapper||(i._wrapper=i._getWrapper(l.container)),!l._isRrender&&l._wrapper||e.destroy((l._wrapper||i._wrapper).off());var p=u.element=l._wrapper||i._wrapper,h=u.template;h&&('string'==typeof h?p.html(t.render(h,u.data)):p.html(t.render.call(h,h.layout,u.data))),u.onChange.call(u),n.call(u),e.init(p),delete l._isRrender}var p=l._wrapper||i._wrapper;return p.show().siblings('.wrapper').hide(),'function'==typeof u.onAfter&&u.onAfter.call(u),i._initialize=match=!0,Nui.bsie7&&i._setHistory(a),!1}}}),i._initialize||Nui.each(i.__instances,function(e){if(!i._isEntry&&!0===e.options.entry)return i._isEntry=!0,e.target&&e._render(e.target.eq(0)),i._initialize=!0,!1})}i._oldhash=a},_bindHashchange:function(){var e=this;if(Nui.bsie7){var t=function(t){var n=location.hash;return e._oldhash!==n&&!t};setInterval(function(){t()&&e._change()},100),t(!0)}else Nui.win.on('hashchange',function(){e._change()})},_$ready:null,_$fn:null,start:function(){this._initialize||this._change()},location:function(e,t,n){var i=this;if(e){arguments.length<=2&&'boolean'==typeof t&&(n=t,t=null);var a,o;e=this._replace(e),Nui.each(this._paths,function(t,n){if(n===e||0===e.indexOf(t.path)&&(a=e.replace(t.path+'/',''))&&a.split('/').length===t.params.length)return o=i.__instances[t.id],!1}),o&&(o._send={data:t},o._isRrender=n,o._render(e))}else i.start()},forward:function(e){return history.forward(e),!1},back:function(e){return history.back(e),!1}};return Nui.bsie7&&(i._history=[],i._setHistory=function(e){this._isHistory||(Nui.each(this._history,function(e){e.active=!1}),this._history.push({hash:e,active:!0})),this._isHistory=!1},Nui.each(['forward','back'],function(e){var t='forward'===e?1:-1;i[e]=function(){var n=this,a=n._history.length;return i._isHistory=!0,Nui.each(n._history,function(i,o){var r=o+t;if(i.active){if(-1===r||r===a)return window.history[e](),!1;var s=n._history[r];return s&&(location.hash=s.hash,s.active=!0),i.active=!1,!1}}),!1}})),this.extend(e,{static:i,options:{path:'',template:'',container:null,data:{},entry:!1,wrapper:!1,level:1,onBefore:null,onChange:null,onAfter:null,onData:null},_init:function(){var e=this,t=e.constructor;e._exec()&&!t._bind&&(t._bind=!0,t._bindHashchange())},_exec:function(){var e=this,t=e.options,n=e.constructor,i=e._getTarget();if(e.container=n._jquery(t.container),t.path&&e.container){e.path=n._replace(t.path);var a=e._getpath(),o=a.params.length;if((!o&&1===t.level||1!==t.level)&&n._setpaths(a.rule,a),o&&t.level>0)for(var r,s,c=[];r=a.params.shift();)c.push(r),s=c.join('/:'),n._setpaths(a.rule+'/:'+s,$.extend({},a,{params:s.split('/:')}));if(i)return e._event()}},_getpath:function(){var e=this,t=e.path,n=e.options,i=t.indexOf('/:'),a={id:e.__id,params:[],rule:t,path:t};return-1!==i&&(a.params=t.substr(i+2).split('/:'),a.path=t.substr(0,i),n.level>0&&(a.rule=a.path)),a},_render:function(e){var t=this,n=t.options,i=e instanceof jQuery?e.attr('href'):e;if(i){var a=!1,o=function(){a=!0,location.hash='#!'+t.constructor._replace(i)};if('function'==typeof n.onBefore&&!1===n.onBefore.call(n,o))return!1;a||o()}},_event:function(){var e=this;e.options;return e._on('click',Nui.doc,e.target,function(t,n){return e._render(n),!1}),e},_reset:function(){var e=this,t=e.constructor;return e._off(),Nui.each(t._paths,function(n,i){n.id===e.__id&&delete t._paths[i]}),e}})}),Nui.define('pages/components/router/script/menu',[{id:'recordVoucher',name:'录凭证',index:!0,icon:'',path:'/voucher/record/'},{id:'seeVoucher',name:'查凭证',icon:'',index:!0,path:'/voucher/list/aniu/jser/'},{name:'账簿',icon:'',subs:[{id:'summary',name:'总账',icon:'',path:'/books/summary/'},{id:'detailed',name:'明细账',icon:'',path:'/books/detailed/'},{id:'accountbalance',name:'科目余额表',icon:'',path:'/books/accountbalance/'}]}]),Nui.define('pages/components/router/script/tpls/index',function(){return this.renders('<div class="m-main ui-bgw"><h3 class="ui-bdb ui-fcb"><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run1">欢</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run2">迎</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run3">使</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run4">用</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run5">云</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run6">记</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run7">账</em><em class="ui-animate ui-animate-fadeInDown ui-animate-fadeInDown-run8">！</em></h3><ul><% each menu %><% if $value.index %><li><a href="javascript:void(0)" rel="<% $value.path %>"><em><i class="iconfont ui-animate">&#xe62a;</i></em><span class="ui-animate"><% $value.name %></span></a></li><% /if %><% /each %></ul></div>')}),Nui.define('pages/components/router/script/modules/index',['pages/components/router/script/tpls/index','template','pages/components/router/script/menu'],function(e,t,n){var i=this,a=i.require('src/components/router'),o=i.require('src/components/layer/layerExt');return i.imports('../../style/index'),{target:'#index',entry:!0,path:'/index/',template:e,data:{menu:n},onChange:function(){console.log(this.data)},mapping:{'click a':function(e,t){a.location(t.attr('rel'),{a:1})},'click h3':function(){var e=i.require('pages/components/router/script/modules/recordVoucher'),n=i.require('events'),a=o({content:t.render.call(e.template,e.template.layout,{params:{a:1}}),isFull:!0});e.element=a._main,n.call(e)}}}}),Nui.define('pages/components/router/script/router',['src/components/router'],function(e){var t=this;return function(){e.config({container:'.g-main',onAfter:function(){$('.m-menu-item a.s-crt').removeClass('s-crt'),$(this.target).addClass('s-crt')}}),e(t.require('pages/components/router/script/modules/index')),e(t.require('pages/components/router/script/modules/recordVoucher')),e.start()}}),Nui.define('pages/components/router/script/tpls/layout',function(){var e=this;return{head:e.renders('<div class="f-fl m-head-main"><% var data = list[0] %><p class="f-fl name"><% data.buname %></p><p class="f-fl month"><% data.buaddress %></p></div>'),
menu:e.renders('<% each menu %><dl class="m-menu-item"><dt><a href="<% $value.path || \'javascript:void(0)\' %>"<% if $value.id %> id="<% $value.id %>"<% /if %>><em><i class="iconfont"></i></em><span><% $value.name %></span>   </a></dt><% if $value.subs && $value.subs.length %><dd><% each $value.subs %><a href="<% $value.path %>"<% if $value.id %> id="<% $value.id %>"<% /if %>><span><% $value.name %></span></a><% /each %></dd><% /if %></dl><% /each %>')}}),Nui.define('pages/components/router/script/render',['pages/components/router/script/menu','pages/components/router/script/tpls/layout','template'],function(e,t,n){return function(i){$('.m-headbox').html(n.render(t.head,i)),i.menu=e,$('.m-menu').html(n.render(t.menu,i))}}),Nui.define('./script/page',function(require,imports,renders,extend){var e=this,t=require('pages/components/router/script/render'),n=require('pages/components/router/script/router'),i=require('pages/components/router/script/ajax');imports('../style/base'),imports('../style/page');i({url:'./script/data.json',success:function(e){t(e),n()}}),e.exports=function(){}});
//# sourceMappingURL=page-min.js.map?v=921a813