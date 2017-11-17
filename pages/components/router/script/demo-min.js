!function(define){Nui[define]('pages/components/router/script/options',function(){return{text:'1111',color:'#f60'}}),Nui[define]('src/core/events',function(){return function(t){var e=this,n=t||e,i=n.constructor,r=i&&i.__component_name,a=e.element||n.element||Nui.doc,o=r?n._events:n.events;if(!a||!o)return n;'function'==typeof o&&(o=o.call(n)),a instanceof jQuery||(a=jQuery(a));var s,c,l,u=function(t,i,r){if('function'==typeof r)r.call(n,t,i);else{var a,o;Nui.each(r,function(r,s){if('function'==typeof(a=n[r])?o=n:'function'==typeof(a=e[r])&&(o=e),o)return l=a.call(o,t,i,l)})}};return Nui.each(o,function(t,e){!t||'string'!=typeof t&&'function'!=typeof t||('string'==typeof t&&(t=Nui.trim(t).split(/\s+/)),e=Nui.trim(e).split(/\s+/),s=e.shift().replace(/:/g,' '),c=e.join(' '),r?n._on(s,a,c,function(e,n){u(e,n,t)}):a.on(s,c,function(e){u(e,jQuery(this),t)}))}),n}}),Nui[define]('src/core/util',{regex:{mobile:/^0?(13|14|15|17|18)[0-9]{9}$/,tel:/^[0-9-()（）]{7,18}$/,email:/^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,idcard:/^\d{17}[\d|x]|\d{15}$/,cn:/^[\u4e00-\u9fa5]+$/,taxnum:/^[a-zA-Z0-9]{15,20}$/},toFixed:function(t,e,n){if(isNaN(t)||''===t)return t;void 0===n&&(n=2),e=e||0;var i=t.toString(),r=function(t){for(var e='';t>0;)e+='0',t--;return e},a='';i<0&&(i=i.replace('-',''),a='-');var o=i.indexOf('.');if(-1!==o&&e>=0){var s=parseInt(i.substr(0,o)),c='0'+i.substr(o),l='1'+r(e);c=(Math.round(c*l)/l).toFixed(e),c>=1&&(s=(s+1).toString()),i=a+s+c.substr(1)}else e>0&&(i=a+i+'.'+r(e));if(null!==n&&n>=0&&n<e){i=i.replace(/0+$/,'');var o=i.indexOf('.'),u=0;for(-1!==o&&(u=i.substr(o+1).length);u<n;)i+='0',u++;i=i.replace(/\.$/,'')}return i},getParam:function(t,e){var n=decodeURI(e||location.href),i={};if(startIndex=n.indexOf('?'),startIndex++>0){var r,a=n.substr(startIndex).split('&');Nui.each(a,function(t){r=t.split('='),i[r[0]]=r[1]})}return'string'==typeof t&&t&&(i=void 0!==(r=i[t])?r:''),i},setParam:function(t,e,n){var i,r=this;if(Nui.type(t,'Object'))i=e||location.href,Nui.each(t,function(t,e){t&&(i=r.setParam(e,t,i))});else if(i=n||location.href,-1===i.indexOf('?')&&(i+='?'),-1!==i.indexOf(t+'=')){var a=new RegExp('('+t+'=)[^&]*');i=i.replace(a,'$1'+e)}else{var o='';-1!==i.indexOf('=')&&(o='&'),i+=o+t+'='+e}return i},supportCss3:function(t){var e,n=['webkit','Moz','ms','o'],i=[],r=document.documentElement.style,a=function(t){return t.replace(/-(\w)/g,function(t,e){return e.toUpperCase()})};for(e in n)i.push(a(n[e]+'-'+t));i.push(a(t));for(e in i)if(i[e]in r)return!0;return!1},supportHtml5:function(t,e){return t in document.createElement(e)},location:function(t,e){t&&jQuery('<a href="'+t+'"'+(e?'target="'+(e||'_self')+'"':'')+'><span></span></a>').appendTo('body').children().click().end().remove()},formatDate:function(t,e){if(t=parseInt(t)){if(!e)return t;var n=new Date(t),i={'M':n.getMonth()+1,'d':n.getDate(),'h':n.getHours(),'m':n.getMinutes(),'s':n.getSeconds()};return e=e.replace(/([yMdhms])+/g,function(t,e){var r=i[e];return void 0!==r?(t.length>1&&(r='0'+r,r=r.substr(r.length-2)),r):'y'===e?(n.getFullYear()+'').substr(4-t.length):t})}return'-'},getData:function(t,e,n){var i=this,r={'result':{},'voids':0,'total':0};if(t.length){var a=t.serializeArray();a.length||(a=t.find('[name]').serializeArray());var o=',';if(e&&'string'==typeof e&&!n&&(o=e),Nui.each(a,function(t,e){var n=Nui.trim(t.value);r.total++,n||r.voids++;var i=t.name;Nui.isArray(r.result[i])||(r.result[i]=[]),r.result[i].push(n)}),Nui.each(r.result,function(t,e){r.result[e]=t.join(o)}),e&&n){var s=!1;r.result[n]=[],t.find(e).each(function(){var t=i.getData($(this).find('[name]')).result;!0===e||s||(Nui.each(t,function(t,e){delete r.result[e]}),s=!0),r.result[n].push(t)})}}return r},getFocusIndex:function(t){var e=Nui.trim(t.value),n=e.length;if(t.setSelectionRange)n=t.selectionStart;else try{var i=document.selection.createRange(),r=t.createTextRange();r.setEndPoint('endtoend',i),n=r.text.length}catch(t){}return n},isTextSelect:function(){var t='';if(document.selection)t=document.selection.createRange().text;else if(-1!==navigator.userAgent.toLowerCase().indexOf('gecko')){var e=document.activeElement;t=e.value.substring(e.selectionStart,e.selectionEnd)}else window.getSelection?t=window.getSelection().toString():document.getSelection&&(t=document.getSelection().toString());return!!t},isInstallPDF:function(){var i,len,flag=!0;if((Nui.browser.webkit||Nui.browser.mozilla&&Nui.browser.version>19)&&(flag=!1),navigator.plugins&&(len=navigator.plugins.length))for(i=0;i<len;i++)if(/Adobe Reader|Adobe PDF|Acrobat|Chrome PDF Viewer/.test(navigator.plugins[i].name)){flag=!1;break}try{if(window.ActiveXObject||window.ActiveXObject.prototype){for(i=1;i<10;i++)try{if(eval('new ActiveXObject(\'PDF.PdfCtrl.'+i+'\');')){flag=!1;break}}catch(t){flag=!0}var arr=['PDF.PdfCtrl','AcroPDF.PDF.1','FoxitReader.Document','Adobe Acrobat','Adobe PDF Plug-in'];for(len=arr.length,i=0;i<len;i++)try{if(new ActiveXObject(arr[i])){flag=!1;break}}catch(t){flag=!0}}}catch(t){}return flag},isInstallFlash:function(){if(void 0!==window.ActiveXObject)try{if(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'))return!1}catch(t){}else if(navigator.plugins['Shockwave Flash'])return!1;return Nui.browser.msie?'http://rj.baidu.com/soft/detail/17153.html':'http://rj.baidu.com/soft/detail/15432.html'},formatNumber:function(t){var e=parseInt(t);if(!isNaN(e)&&e&&(t=t.toString())){var n=t.indexOf('.'),i='';return n>0&&(i=t.substr(n)),e.toLocaleString().replace(/\.\d+$/,'')+i}return t},numberToCN:function(t){var e,n,i,r=new Array('零','壹','贰','叁','肆','伍','陆','柒','捌','玖'),a=new Array('','拾','佰','仟'),o=new Array('','万','亿','兆'),s=new Array('角','分','毫','厘'),c='';if(''==t)return'';var l=t<0;if((t=Math.abs(parseFloat(t)))>=1e15)return'';if(0==t)return c=r[0]+'元整';if(t=t.toString(),-1==t.indexOf('.')?(e=t,n=''):(i=t.split('.'),e=i[0],n=i[1].substr(0,4)),parseInt(e,10)>0){for(var u=0,f=e.length,p=0;p<f;p++){var h=e.substr(p,1),d=f-p-1,_=d/4,m=d%4;'0'==h?u++:(u>0&&(c+=r[0]),u=0,c+=r[parseInt(h)]+a[m]),0==m&&u<4&&(c+=o[_])}c+='元'}if(''!=n)for(var v=n.length,p=0;p<v;p++){var h=n.substr(p,1);'0'!=h&&(c+=r[Number(h)]+s[p])}return''==c?c+=r[0]+'元整':''==n&&(c+='整'),l&&(c='负'+c),c}}),Nui[define]('src/core/template',['src/core/util'],function(t){var e=function(t,e,i){if(this.tplid=t){if(n[t])return h.call(this,n[t],e,i);var r=document.getElementById(t);if(r&&'SCRIPT'===r.nodeName&&'text/html'===r.type)return h.call(this,n[t]=r.innerHTML,e,i)}return''},n={},i={openTag:'<%',closeTag:'%>'},r={trim:Nui.trim,formatDate:t.formatDate,formatNumber:t.formatNumber,setParam:t.setParam,toFixed:t.toFixed,numberToCN:t.numberToCN},a=!!''.trim,o=';$that.out = function(){return $that.code';o=(a?'""'+o:'[]'+o+'.join("")')+'}';var s=function(t){return a?t?function(t){return'$that.code += '+t+';'}:function(t,e){return t+=e}:t?function(t){return'$that.code.push('+t+');'}:function(t,e){return t.push(e),t}},c=s(!0),l=s(),u=function(t,n,i,r){var a=this,o=n.replace(/([^\s])/g,'\\$1'),s=i.replace(/([^\s])/g,'\\$1');return t.replace(new RegExp(o+'\\s*include\\s+[\'"]([^\'"]*)[\'"]\\s*'+s,'g'),function(t,n){if(n){var i=a[n];return'function'==typeof i&&(i=i()),'string'==typeof i?h.call(a,i,null,r):e(n,null,r)}return''})},f='object'==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return 1===t.nodeType&&'string'==typeof t.nodeName},p=function(t){if(t&&'object'==typeof t){var e=t[0];return f(e?e:t)}},h=function(t,e,n){var s=this;if('string'==typeof t){n=n||{};var c=n.openTag||i.openTag,f=n.closeTag||i.closeTag;if(t=u.call(s,t,c,f),e&&'object'==typeof e){Nui.isArray(e)&&(e={$list:e});var h=a?'':[];t=t.replace(/\s+/g,' '),Nui.each(t.split(c),function(t,e){t=t.split(f),e>=1?h=l(h,_(Nui.trim(t[0]),!0)):t[1]=t[0],h=l(h,_(t[1].replace(/'/g,'\\\'').replace(/"/g,'\\"')))});var m=a?'':[];for(var v in e)m=l(m,v+'=$data.'+v+',');a||(h=h.join(''),m=m.join('')),h='var '+m+'$that=this,$method=$that.methods; $that.line=4; $that.code='+o+';\ntry{\n'+h+';}\ncatch(e){\n$that.error(e, $that.line)\n};';try{var g=new Function('$data',h);g.prototype.methods=r,g.prototype.error=d(h,e,s.tplid),g.prototype.dom=p,t=new g(e).out(),g=null}catch(t){d(h,e,s.tplid)(t)}}return t}return''},d=function(t,e,n){return function(i,r){var a='\n',o=[];t='function anonymous($data){\n'+t+'\n}',t=t.split('\n'),Nui.each(t,function(t,e){o.push(e+1+'      '+t.replace('$that.line++;',''))}),a+='code\n',a+=o.join('\n')+'\n\n',void 0!==typeof JSON&&(a+='data\n',a+=JSON.stringify(e)+'\n\n'),n&&(a+='templateid\n',a+=n+'\n\n'),r&&(a+='line\n',a+=r+'\n\n'),a+='message\n',a+=i.message,console.error(a)}},_=function(t,e){if(!t)return'';var n,i;if(e)if(void 0!==(i=v(t,'if')))n='if('+m(i)+'){';else if(void 0!==(i=v(t,'elseif')))n='\n}\nelse if('+m(i)+'){';else if('else'===t)n='\n}\nelse{';else if('/if'===t)n='}';else if(void 0!==(i=v(t,'each ',/\s+/)))n='Nui.each('+i[0]+', function('+(i[1]||'$value')+','+(i[2]||'$index')+'){';else if('/each'===t)n='});';else if(void 0!==(i=v(t,' | ',/\s*,\s*/))){var r=i[0],a=r.lastIndexOf('('),o='('+m(i.slice(1).toString())+')';if(-1!==a){var s=r.substr(0,a),l=Nui.trimLeft(r.substr(a+1));n=c(s+'($that.methods.'+l+o)}else n=c('$that.methods.'+r+o)}else n=/^(var|let|const|return|delete)\s+/.test(t)?m(t)+';':c(m(t,!0));else n=c('\''+t+'\'');return n+'\n$that.line++;'},m=function(t,e){return t.replace(/([\.\$\w]+\s*(\[[\'\"\[\]\w\.\$\s]+\])?)\?\?/g,function(t,n){var i='(typeof '+n+'!=="undefined"&&'+n+'!==null&&'+n+'!==undefined&&!$that.dom('+n+')';return e&&(i+='?'+n+':""'),i+')'})},v=function(t,e,n){var i;if(0===t.indexOf(e)?i='':' | '===e&&t.indexOf(e)>0&&(i=','),void 0!==i)return t=Nui.trimLeft(t.replace(e,i)),n?t.split(n):t};return e.method=function(t,e){r[t]||(r[t]=e)},e.config=function(){var t=arguments;Nui.type(t[0],'Object')?Nui.each(t[0],function(t,e){i[e]=t}):t.length>1&&'string'==typeof t[0]&&(i[t[0]]=t[1])},e.render=h,e}),Nui[define]('src/core/component',['src/core/template','src/core/events'],function(tpl,events){var module=this,require=this.require,extend=this.extend,callMethod=function(t,e,n){if(e.length>t.length){var i=e[e.length-1];if(i&&Nui.type(i,['String','Number'])&&n._options.id!==i&&n.__id!==i)return}t.apply(n,e)};Nui.bsie7&&Nui.doc.on('focus','button, input[type="button"]',function(){this.blur()});var statics={__id:0,__instances:{},__setMethod:function(apis,components){var self=this;return Nui.each(apis,function(val,methodName){void 0===self[methodName]&&(self[methodName]=function(){var self=this,args=arguments,container=args[0],name=self.__component_name;if(name&&'component'!==name)if(container&&container instanceof jQuery)if('init'===methodName){var mod=components[name];mod&&container.find('[data-'+name+'-options]').each(function(){if(!this.nui||!this.nui[name]){var elem=jQuery(this),options=elem.data(name+'Options'),_mod;options&&'string'==typeof options&&(/^{[\s\S]*}$/.test(options)?options=eval('('+options+')'):(_mod=require(options,!0))&&(options='function'==typeof _mod.exports?_mod.exports(elem):_mod.exports)),'object'!=typeof options&&(options={}),mod(extend(options,{target:elem}))}})}else container.find('[nui_component_'+name+']').each(function(){var t,e;this.nui&&(t=this.nui[name])&&'function'==typeof(e=t[methodName])&&callMethod(e,Array.prototype.slice.call(args,1),t)});else Nui.each(self.__instances,function(t){var e=t[methodName];'function'==typeof e&&callMethod(e,args,t)});else Nui.each(components,function(t,e){'component'!==e&&'function'==typeof t[methodName]&&t[methodName].apply(t,args)})})}),self},_options:{},_init:jQuery.noop,_jquery:function(t){return t instanceof jQuery?t:jQuery(t)},_getSize:function(t,e,n){var i=0;if(n=n||'border',e=e||'tb','all'===n)return this._getSize(t,e)+this._getSize(t,e,'padding')+this._getSize(t,e,'margin');var r={l:['Left'],r:['Right'],lr:['Left','Right'],t:['Top'],b:['Bottom'],tb:['Top','Bottom']},a=[{border:{l:['LeftWidth'],r:['RightWidth'],lr:['LeftWidth','RightWidth'],t:['TopWidth'],b:['BottomWidth'],tb:['TopWidth','BottomWidth']}},{padding:r},{margin:r}];return Nui.each(a,function(r){r[n]&&Nui.each(r[n][e],function(e){var r=parseFloat(t.css(n+e));i+=isNaN(r)?0:r})}),i},_$fn:function(t,e){jQuery.fn[t]=function(){var n=arguments,i=n[0];return this.each(function(){if('string'!=typeof i)Nui.type(i,'Object')?i.target=this:i={target:this},e(i);else if(i){var r;if(this.nui&&(r=this.nui[t])&&0!==i.indexOf('_'))if('options'===i)r.option(n[1],n[2]);else{var a=r[i];'function'==typeof a&&a.apply(r,Array.prototype.slice.call(n,1))}}})}},_$ready:function(t,e){'function'==typeof this.init&&this.init(Nui.doc)},config:function(){var t=arguments,e=(t.length,t[0]);return Nui.type(e,'Object')?this._options=jQuery.extend(!0,this._options,e):Nui.type(e,'String')?1===t.length?this._options[e]:this._options[e]=t[1]:void 0},hasInstance:function(t){var e=!1,n=this.__instances;if(t)Nui.each(n,function(n){if(n._options.id===t)return e=!0,!1});else for(i in n)return!0;return e}};return{_static:statics,_options:{target:null,id:'',skin:'',className:'',onInit:null,onReset:null,onDestroy:null},_template:{},_init:function(){this._exec()},_exec:jQuery.noop,_getTarget:function(){var t=this;if(!t.target){var e=t._options.target,n=t.constructor;if(!e)return null;e=n._jquery(e),t.target=t._bindComponentName(e)}return t.target},_bindComponentName:function(t){var e=this,n=e.constructor,i='nui_component_'+n.__component_name;return t.attr(i,'').each(function(){this.nui||(this.nui={}),this.nui[n.__component_name]=e}),t},_tplData:function(t){var e=this._options,n=this.constructor,i='nui-'+n.__component_name,r=Nui.trim(e.skin),a=function(t,e){if(t.__parent){var n=t.__parent.constructor,i=n.__component_name;if('component'!==i)return r&&e.unshift('nui-'+i+'-'+r),e.unshift('nui-'+i),a(n,e)}return e},o=a(n,[]);return o.push(i),r&&o.push(i+'-'+r),e.id&&o.push(n.__component_name+'-'+e.id),t||(t={}),e.className&&o.push(e.className),t.className=o.join(' '),t},_event:function(){var t=this,e=t._options;return t.element&&e.events&&(e.element=t.element,events.call(t,e)),events.call(t)},_on:function(t,e,n,i,r){var a=this;'function'==typeof n&&(r=i,i=n,n=e,e=null,n=a.constructor._jquery(n));var o=function(t){return i.call(this,t,jQuery(this))};return e?('string'!=typeof n&&((n=n.selector)||(n=a._options.target)),e.on(t,n,o),r&&e.find(n).trigger(t)):(n.on(t,o),r&&n.trigger(t)),a.__eventList.push({dalegate:e,selector:n,type:t,callback:o}),a},_off:function(){var t=this,e=t.__eventList;return Nui.each(e,function(t,n){t.dalegate?t.dalegate.off(t.type,t.selector,t.callback):t.selector.off(t.type,t.callback),e[n]=null,delete e[n]}),t.__eventList=[],t},_delete:function(){var t=this,e=t.constructor;if(t.target){var n='nui_component_'+e.__component_name;t.target.removeAttr(n).each(function(){this.nui&&(this.nui[e.__component_name]=null,delete this.nui[e.__component_name])})}e.__instances[t.__id]=null,delete e.__instances[t.__id]},_reset:function(){return this._off(),this.element&&(this.element.remove(),this.element=null),this},_tpl2html:function(t,e){var n={openTag:'<%',closeTag:'%>'};return 1===arguments.length?tpl.render(this._template,t,n):tpl.render.call(this._template,this._template[t],e,n)},_callback:function(t,e){var n=this,i=n._options,r=i['on'+t];if('function'==typeof r)return e?(Array.prototype.unshift.call(e,n),r.apply(i,e)):r.call(i,n)},option:function(t,e){var n,i=arguments,r=!1;return!0===i[0]?r=!0:jQuery.isPlainObject(i[0])?(n=i[0],r=i[1]):i.length>1&&'string'==typeof i[0]&&(n={},n[i[0]]=i[1],r=i[2]),(n||r)&&(this._options=jQuery.extend(!0,{},this[!0===r?'_defaultOptions':'_options'],n),this._reset(),this._exec()),this},reset:function(){return this.option(!0),this._callback('Reset'),this},destroy:function(){this._delete(),this._reset(),this._callback('Destroy')}}}),Nui[define]('src/components/router',['src/core/component','src/core/template','src/core/events'],function(t,e,n){var i={_paths:{},_init:function(){var t=this;Nui.doc.on('click','.nui-router-back',function(){return t.back()}).on('click','.nui-router-forward',function(){return t.forward()})},_setpaths:function(t,e){this._paths[t]||(this._paths[t]=e)},_replace:function(t){return t.replace(location.protocol+'//'+location.host,'').replace(/\s+/g,'').replace(/^\#\!?/,'').replace(/^([^\/])/,'/$1').replace(/\/$/,'')},_getWrapper:function(t){return $('<div class="nui-router-wrapper"></div>').appendTo(t)},_split:function(t){var e={url:t,params:{}},n=t.match(/\?[^\/\s]+$/);if(n){var i=n[0];e.url=t.replace(i,''),i=i.replace('?','').split('&'),Nui.each(i,function(t,n){var i=t.split('=');e.params[i[0]]=i[1]})}return e},_change:function(){var i=this;if(delete i._active,!$.isEmptyObject(i._paths)){var r=location.hash,a=this._split(r),o=i._replace(a.url),s=a.params;Nui.each(i._paths,function(a){if(o===a.path||0===o.indexOf(a.path)){var c=o.replace(a.path,'').replace(/^\//,''),l=i.__instances[a.id],u=l._options,f={};if(c=c?c.split('/'):[],c.length===a.params.length){var p=!0===l._isRender,h=!1!==l._isRender&&!l._wrapper,d=!l.loaded||p||h;delete l._isRender,(h||l._wrapper&&p)&&(u.data=$.extend(!0,{},l._defaultOptions.data)),Nui.each(a.params,function(t,e){f[t]=c[e]}),Nui.each(s,function(t,e){f[t]=s[e]}),i._active={path:a.path+'/',url:o+'/',params:f,query:s},u.data=$.extend(!0,u.data,i._active),l._send&&l._send.data&&'function'==typeof u.onData&&(u.onData.call(u,l._send.data),delete l._send),d&&(u.wrapper&&!l._wrapper?'boolean'!=typeof u.wrapper?l._wrapper=l.container.children(u.wrapper):l._wrapper=i._getWrapper(l.container):i._wrapper||(i._wrapper=i._getWrapper(l.container)),t.destroy((l._wrapper||i._wrapper).off()));var _=u.element=l._wrapper||i._wrapper;if('function'==typeof u.onChange&&!1===u.onChange.call(u))return!1;if(d){var m=u.template;m&&('string'==typeof m?_.html(e.render(m,u.data)):_.html(e.render.call(m,m.main,u.data))),'function'==typeof u.onInit&&u.onInit.call(u),n.call(u),t.init(_),l.loaded=!0}return _.show().siblings('.nui-router-wrapper').hide(),'function'==typeof u.onAfter&&u.onAfter.call(u),i._initialize=!0,Nui.bsie7&&i._setHistory(r),!1}}}),i._initialize||Nui.each(i.__instances,function(t){if(!i._isEntry&&!0===t._options.entry)return i._isEntry=!0,t.target?t._render(t.target.eq(0)):t.path&&t._render(t.path),i._initialize=!0,!1})}i._oldhash=r},_bindHashchange:function(){var t=this;if(Nui.bsie7){var e=function(e){var n=location.hash;return t._oldhash!==n&&!e};setInterval(function(){e()&&t._change()},100),e(!0)}else Nui.win.on('hashchange',function(){t._change()})},_$ready:null,_$fn:null,init:null,start:function(){this._initialize||this._change()},location:function(t,e,n){var i=this;if(t){arguments.length<=2&&'boolean'==typeof e&&(n=e,e=null);var r,a,o='',s=t.match(/\?[^\/\s]+$/);s&&(o=s[0]),t=this._replace(t.replace(/\?[^\/\s]+$/,'')),Nui.each(this._paths,function(e,n){if(n===t||0===t.indexOf(e.path)&&(r=t.replace(new RegExp('^'+e.path),'').replace(/^\//,''))&&r.split('/').length===e.params.length)return a=i.__instances[e.id],!1}),a&&(a._send={data:e},a._isRender=n,a._render(t+o))}else i.start()},active:function(){return this._active},forward:function(t){return history.forward(t),!1},back:function(t){return history.back(t),!1}};return Nui.bsie7&&(i._history=[],i._setHistory=function(t){this._isHistory||(Nui.each(this._history,function(t){t.active=!1}),this._history.push({hash:t,active:!0})),this._isHistory=!1},Nui.each(['forward','back'],function(t){var e='forward'===t?1:-1;i[t]=function(){var n=this,r=n._history.length;return i._isHistory=!0,Nui.each(n._history,function(i,a){var o=a+e;if(i.active){if(-1===o||o===r)return window.history[t](),!1;var s=n._history[o];return s&&(location.hash=s.hash,s.active=!0),i.active=!1,!1}}),!1}})),this.extend(t,{_static:i,_options:{path:'',template:'',container:null,data:{},entry:!1,wrapper:!1,level:2,onBefore:null,onChange:null,onData:null,onInit:null,onAfter:null},_init:function(){var t=this,e=t.constructor;t._exec()&&!e._bind&&(e._bind=!0,e._bindHashchange())},_exec:function(){var t=this,e=t._options,n=t.constructor;if(t.container=n._jquery(e.container),e.path&&t.container){t.path=n._replace(e.path);var i=t._getpath(),r=i.params.length;if((!r&&1===e.level||1!==e.level)&&n._setpaths(i.rule,i),r&&e.level>0)for(var a,o,s=[];a=i.params.shift();)s.push(a),o=s.join('/:'),n._setpaths(i.rule+'/:'+o,$.extend({},i,{params:o.split('/:')}));return t._getTarget()&&t._event(),t}},_getpath:function(){var t=this,e=t.path,n=t._options,i=e.indexOf('/:'),r={id:t.__id,params:[],rule:e,path:e};return-1!==i&&(r.params=e.substr(i+2).split('/:'),t.path=r.path=e.substr(0,i),n.level>0&&(r.rule=r.path)),r},_render:function(t){var e=this,n=e._options,i=t instanceof jQuery?t.attr('href'):t;if(i){var r=!1,a=function(t){r=!0;var n='#!'+e.constructor._replace(i);'function'==typeof t&&(n=t(n)||n),location.hash=n};if('function'==typeof n.onBefore&&!1===n.onBefore.call(n,a))return!1;r||a()}},_event:function(){var t=this;t._options;return t._on('click',Nui.doc,t.target,function(e,n){t._render(n),e.preventDefault()}),t},_reset:function(){var t=this,e=t.constructor;return t._off(),Nui.each(e._paths,function(n,i){n.id===t.__id&&delete e._paths[i]}),t},option:null,reset:null})}),Nui[define]('src/components/placeholder',['src/core/component'],function(t){return this.extend(t,{_options:{text:'',animate:!1,equal:!1,restore:!0,color:'#ccc',onChange:null},_template:{list:'<%each style%><%$index%>:<%$value%>;<%/each%>',wrap:'<strong class="<% className %>" style="<%include \'list\'%>" />',elem:'<b style="<%include \'list\'%>"><%text%></b>'},_exec:function(){var t=this,e=t._options,n=t._getTarget();if(n){var i=t._deftext=n.attr('placeholder');!t._deftext&&e.text&&n.attr('placeholder',i=e.text),void 0===t._val&&(t._val=Nui.trim(n.val())),(t._text=Nui.trim(i))&&t._create()}},_create:function(){var t=this,e=t._options,n=t.constructor;if(!e.animate&&(e.animate||'placeholder'in document.createElement('input')))t._setStyle();else{e.animate&&t.target.removeAttr('placeholder');var i=t._tplData();i.style={'position':'relative','display':'inline-block','width':t.target.outerWidth()+'px','overflow':'hidden','cursor':'text'},t.target.wrap(t._tpl2html('wrap',i)),t.element=$(t._tpl2html('elem',{text:t._text,style:function(){var i=t.target.outerHeight(),r=t.target.is('textarea');return{'display':Nui.trim(t.target.val())?'none':'inline','position':'absolute','left':n._getSize(t.target,'l','padding')+n._getSize(t.target,'l')+'px','top':n._getSize(t.target,'t','padding')+n._getSize(t.target,'t')+'px','height':r?'auto':i+'px','line-height':r?'normal':i+'px','color':e.color}}()})).insertAfter(t.target),t._events()}},_setStyle:function(){var t=this;t._options;t.className='_placeholder-'+t.__id,t.target.addClass(t.className),t.constructor.style||t._createStyle(),t._createRules()},_createStyle:function(){var t=this,e=document.createElement('style');document.head.appendChild(e),t.constructor.style=e.sheet},_createRules:function(){var t=this,e=t.constructor.style,n=t.__id;try{e.deleteRule(n)}catch(t){}Nui.each(['::-webkit-input-placeholder',':-ms-input-placeholder','::-moz-placeholder'],function(i){var r='.'+t.className+i,a='opacity:1; color:'+(t._options.color||'');try{'addRule'in e?e.addRule(r,a,n):'insertRule'in e&&e.insertRule(r+'{'+a+'}',n)}catch(t){}})},_events:function(){var t=this,e=t._options,n=t.constructor,i=n._getSize(t.target,'l','padding')+n._getSize(t.target,'l');t._on('click',t.element,function(){t.target.focus()}),t._on('focus',t.target,function(){e.animate&&t.element.stop(!0,!1).animate({left:i+10,opacity:'0.5'})}),t._on('blur change',t.target,function(e,n){t.value()}),t._on('keyup keydown',t.target,function(e,n){Nui.trim(n.val())?t.element.hide():t.element.show()})},_reset:function(){var t=this;t._off(),t.element&&(t.element.remove(),t.target.unwrap()),!0===t._options.restore&&t.target.val(t._val),t.target.removeClass(t.className),t._deftext?t.target.attr('placeholder',t._deftext):t.target.removeAttr('placeholder')},value:function(t){var e=this.constructor,n=this.target,i=e._getSize(n,'l','padding')+e._getSize(n,'l'),r=Nui.trim(arguments.length?n.val(t).val():n.val());!this._options.equal&&r===this.text||!r?(n.val(''),this.element&&this.element.show(),this._options.animate&&this.element.stop(!0,!1).animate({left:i,opacity:'1'})):this.element&&this.element.hide(),this._callback('Change')}})}),Nui[define]('./script/demo',function(){var require=(this.renders,this.require),t=(require('src/components/placeholder'),require('src/components/router'));require.async('./a',function(t){}),t({target:'#home',entry:!0,path:'/home/',wrapper:'#aa',container:'#main'}),t({target:'#news, .news',entry:!0,path:'/news/:id/:title',container:'#main',level:2,template:{list:'<ul><%each list%><li><a href="<%$value.url%>/<%$value.title%>" class="news"><%$value.title%></a></li><%/each%></ul>',detail:'<div><h3><%params.title%></h3><p>这是<%params.title%>详情，id是<%params.id%>。<input type="text" data-placeholder-options="'+require('pages/components/router/script/options',!0).id+'"></p></div>'},data:{list:[{url:'/news/1',title:'资讯1'},{url:'/news/2',title:'资讯2'},{url:'/news/3',title:'资讯3'}]},onChange:function(){var t=this.template,e=this.data.params;e.id&&e.title?t.main=t.detail:t.main=t.list},onInit:function(){}}),t.start()})}('_module_1_define');
//# sourceMappingURL=demo-min.js.map?v=acce7c0