!function(e,t,n){if(!e.Nui){var r=e.Nui={version:"1.0.1",type:function(e,t){if(null===e||e===n)return!1;if(o("Array")(t)){var i=!1;return r.each(t,function(t){if(o(t)(e))return i=!0,!1}),i}return o(t)(e)},each:function(e,t){var n;if(r.type(e,"Array")){var o=e.length;for(n=0;n<o&&t(e[n],n)!==!1;n++);}else for(n in e)if(t(e[n],n)===!1)break},trim:function(e){return(e||"").replace(/^\s+|\s+$/g,"")},unique:function(e){var t=[],n={};return r.each(e,function(e){n[e]||(n[e]=!0,t.push(e))}),t},browser:function(){var e=navigator.userAgent.toLowerCase(),t=/(edge)[ \/]([\w.]+)/.exec(e)||/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[],n=t[1]||"",r=t[2]||"0",o={};return"mozilla"===n&&/trident/.test(e)&&(n="msie",r="11.0"),n&&(o[n]=!0,o.version=r),o.chrome||o.edge?o.webkit=!0:o.webkit&&(o.safari=!0),o}()};"undefined"!=typeof jQuery&&(r.win=jQuery(e),r.doc=jQuery(t));var o=function(e){return function(t){return{}.toString.call(t)==="[object "+e+"]"}},i=function(){var e,t,o,u,c,s,l=arguments[0]||{},f=1,p=arguments.length,d=!1;for("boolean"==typeof l&&(d=l,l=arguments[1]||{},f=2),"object"==typeof l||r.type(l,"Function")||(l={}),p===f&&(l={},--f);f<p;f++)if(null!=(c=arguments[f]))for(u in c)e=l[u],o=c[u],l!==o&&(d&&o&&(a(o)||(t=r.type(o,"Array")))?(t?(t=!1,s=e&&r.type(e,"Array")?e:[]):s=e&&a(e)?e:{},l[u]=i(d,s,o)):o!==n&&(l[u]=o));return l},a=function(e){return!(!e||!r.type(e,"Object")||e.nodeType)},u=function(e){var t;for(t in e)return!1;return!0},c=function(){};"undefined"==typeof console&&(e.console={log:c,debug:c,error:c,info:c}),r.browser.msie&&r.browser.version<=7&&t.execCommand("BackgroundImageCache",!1,!0);var s,l,f=function(){var e=(location.protocol+"//"+location.host+location.pathname).replace(/\\/g,"/"),t=e.lastIndexOf("/");return e.substr(0,t+1)},p=f(),d=function(){return"_module_"+m++},h=t.head||t.getElementsByTagName("head")[0]||t.documentElement,g="onload"in t.createElement("script"),m=0,v={},y={},b=[],$={paths:{},alias:{}};if(r.browser.msie&&r.browser.version<=9)var x,w=function(){return l?l:x&&"interactive"===x.readyState?x:(r.each(h.getElementsByTagName("script"),function(e){if("interactive"===e.readyState)return x=e,!1}),x)};var O=function(e,t){var n=this;n.deps=t||[],n.alldeps=n.deps,n.depmodules={},n.id=e[0],n.name=e[1],n.parameter="",n.suffix=e[2],n.uri=n.id.substr(0,n.id.lastIndexOf("/")+1)};O.prototype.load=function(){var e=this;if(e.loaded||/_module_\d+$/.test(e.id))return e.onload();var n=t.createElement("script");return e.url=e.id+e.suffix+".js"+e.parameter,n.src=e.url,n.id=e.id,l=n,h.appendChild(n),l=null,g?n.onload=n.onerror=e.onload(n):n.onreadystatechange=function(){/loaded|complete/.test(n.readyState)&&e.onload(n)()},e.resolve()},O.prototype.resolve=function(){var e=this;return e.alldeps.length&&u(e.depmodules)&&r.each(e.alldeps,function(t){var n=O.getModule(t,[],e.uri);n.parameter=e.parameter,e.depmodules[t]=n.loaded?n:n.load()}),e},O.prototype.onload=function(e){var t=this;return e?function(){if(s=e.moduleData||s,e.onload=e.onerror=e.onreadystatechange=null,h.removeChild(e),e=null,t.loaded=!0,s)return r.each(s,function(e,n){e&&(t[n]=e)}),s=null,t.resolve().runcallback()}:(t.loaded=!0,t.resolve().runcallback())},O.prototype.runcallback=function(){var e=this,t=e.getloaded();return t&&r.each(t,function(e){e.root.callback&&e.root.callback(e.modules)}),e},O.prototype.getModules=function(e){var t=this;return e||(e=[]),e.unshift(t.id),t.alldeps.length&&r.each(t.depmodules,function(t){e=t.getModules(e)}),e},O.prototype.getloaded=function(){var e=[],t=[];r.each(b,function(n){var o=r.unique(n.getModules());t=t.concat(o),e.push({root:n,modules:o})}),t=r.unique(t);for(var n;n=t.shift();)if(!v[n].loaded)return!1;return e},O.prototype.setFactory=function(){var e=this,t=e.factory;return t.require=function(t,n){return O.require(e.depmodules[t],n)},t.extands=function(e,o,a){var u;if(e){if("string"==typeof e){var s=t.require(e);if(s===n)return e;e=s}return r.type(e,"Array")?(u=i(!0,[],e),a===!0&&(r.type(o,"Array")?u=u.concat(o):u.push(o))):u=r.type(e,"Function")?e.exports?i(!0,{},e.exports,o):i(!0,c,e,o):r.type(e,"Object")?i(!0,{},e,o):e,r.type(a,"Array")&&r.type(u,["Object","Function"])&&r.each(a,function(e){if(e.method&&e.content){for(var t,n,o=e.method.split("->"),i=o[o.length-1];(n=o.shift())&&(t=t||u,n!==i);)t=t[n];var a=t[i];if(r.type(a,"Function")){var c=a.toString().replace(/(\})$/,";"+e.content+"$1");a=new Function("return "+c),t[i]=a()}}}),u}},t.imports=c,t},O.prototype.exec=function(){var e=this;if(!e.module&&r.type(e.factory,"Function")){var t=e.setFactory(),n=[];r.each(e.deps,function(e){n.push(t.require(e))});var o=t.apply(t,n);if("component"!==e.name&&r.type(o,"Object")&&r.type(o._init,"Function")){var i={attr:{},proto:{}};r.each(o,function(e,t){"static"===t&&(i[t]=e),r.type(e,"Function")?i.proto[t]=e:i.attr[t]=e});var a=e.module=O.createClass(e,i);e.module.exports=o;var u=e.name,c=u.lastIndexOf("/");u=u.substr(c+1).replace(/\{[^\{\}]+\}/g,""),r.each(["$","$fn","$ready"],function(e){r.type(a[e],"Function")&&a[e](u,a)})}else e.module=o}return e},O.prototype.loadcss=function(){var e=this;return e.styles&&e.styles.length&&r.each(e.styles,function(n){var r=O.getAttrs(n,e.uri)[0];if(!y[r]){y[r]=!0,r=r+".css"+e.parameter;var o=t.createElement("link");o.rel="stylesheet",o.href=r,h.appendChild(o)}}),e},O.replacePath=function(e){e=e.replace(/([^:])\/{2,}/g,"$1/"),e=e.replace(/\.{2,}/g,"..");var t=function(e){return/([\w]+\/?)(\.\.\/)/g.test(e)?(e=e.replace(/([\w]+\/?)(\.\.\/)/g,function(e,t,n){return e==t+n?"":e}),t(e)):e};return e=t(e),e.replace(/([\w]+)\/?(\.\/)+/g,"$1/")},O.createClass=function(e,t){var n=function(e){var r=this;i(r,t.attr,{index:n.index++,eventArray:[]}),r.options=i(!0,{},r.options,n.options,e||{}),r.optionsCache=i(r.options),n.box[r.index]=r,delete r.static,r._init()};return i(!0,n,t.static),i(!0,n.prototype,t.proto),n.prototype.constructor=n.prototype._self=n,n},O.require=function(e,t){if(e){var n=e.module;return r.type(t,"Object")?new n(factory):r.type(t,"String")?n[factory]:r.type(n,"Object")?i(n):r.type(n,"Array")?i([],n):n}},O.setPath=function(e){var t=/\{([^\{\}]+)\}/.exec(e);if(t){var n=$.paths[t[1]];n&&(e=e.replace(t[0],n).replace(/(\.(js|css))?(\?[\s\S]*)?$/g,""))}return e},O.getAttrs=function(e,t){var n,r=e.replace(/(\.(js|css))?(\?[\s\S]*)?$/g,""),o=r.match(/(-debug|-min)$/g),i="";return o&&(r=r.replace(/(-debug|-min)$/g,""),i=o[0]),e=O.setPath($.alias[r]||r),/^(http|https|file):\/\//.test(e)||(n=O.replacePath(p+e),e=(t||p)+e),e=O.replacePath(e),[e,r,i,n]},O.getModule=function(e,t,n){var r=O.getAttrs(e,n),o=r[0];return v[r[1]]||v[o]||v[r[3]]||(v[o]=new O(r,t))},O.load=function(e,t,n){if(r.type(e,"String")&&r.trim(e)){var o=e.match(/(\?[\s\S]+)$/),i=v[O.getAttrs(e)[0]]||O.getModule(n,[e]);o&&(i.parameter=o[0]),b.push(i),i.callback=function(e){var o=i,a=i.suffix;i.name===n&&r.each(i.depmodules,function(e){o=e,a=e.suffix}),r.each(e,function(e){var t=v[e].exec();a||t.loadcss()}),r.type(t,"Function")&&t.call(r,o.module),delete i.callback},i.load()}},O.getdeps=function(e){var t=[],n=[],o=e.match(/(require|extands|imports)\(('|")[^'"]+\2/g);return o&&r.each(o,function(e){/^(require|extands)/.test(e)?t.push(e.replace(/^(require|extands)|[\('"]/g,"")):n.push(e.replace(/^imports|[\('"]/g,""))}),[r.unique(t),r.unique(n)]},O.define=function(e,t,o){r.type(e,"Function")?(o=e,e=n,t=[]):r.type(t,"Function")&&(o=t,r.type(e,"String")?t=[]:(t=e,e=n));var i=O.getdeps(o.toString()),a=t.concat(i[0]),u=i[1];if(e&&!v[e]&&!v[O.getAttrs(e)[0]]){var c=O.getModule(e,a);c.deps=t,c.styles=u,c.factory=o,c.loaded=!0,c.load()}if(s={name:e,deps:t,styles:u,alldeps:a,factory:o},"undefined"!=typeof w){var l=w();l&&(l.moduleData=s)}},r.load=function(e,t){return O.load(e,t,d()),r},r.define=function(){var e=arguments,t=e.length,n=[];!t||1===t&&!r.type(e[0],"Function")?n.push(function(){return e[0]}):2===t&&!r.type(e[1],"Function")||3==t&&!r.type(e[2],"Function")?(n.push(e[0]),n.push(function(){return e[1]})):2===t&&!r.type(e[0],["Array","String"])&&r.type(e[1],"Function")?n.push(e[1]):3===t&&!r.type(e[1],"Array")&&r.type(e[2],"Function")?(n.push(e[0]),n.push(e[2])):n=e,O.define.apply(O,n)},r.config=function(e,t){r.type(e,"Object")?i(!0,$,e):r.type(e,"String")&&t&&i(!0,$[e],t),$.paths.base&&r.each($.paths,function(e,t){"base"===t||/^(http|https|file):\/\//.test(e)||($.paths[t]=$.paths.base+"/"+e)})}}}(this,document),Nui.define("util",{regex:{mobile:/^0?(13|14|15|17|18)[0-9]{9}$/,tel:/^[0-9-()（）]{7,18}$/,email:/^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,idcard:/^\d{17}[\d|x]|\d{15}$/,cn:/^[\u4e00-\u9fa5]+$/,taxnum:/^[a-zA-Z0-9]{15,20}$/},getParam:function(e,t){var n=decodeURI(t||location.href),r={};if(startIndex=n.indexOf("?"),startIndex++>0){var o,i=n.substr(startIndex).split("&");$.each(i,function(e,t){o=t.split("="),r[o[0]]=o[1]})}return"string"==typeof e&&e&&(r=void 0!==(o=r[e])?o:""),r},setParam:function(e,t,n){var r;if($.isPlainObject(e))r=t||location.href,$.each(e,function(e,t){t&&($.isPlainObject(t)&&(t=tools.getJSON(t)),r=tools.setParam(e,t,r))});else if(r=n||location.href,r.indexOf("?")===-1&&(r+="?"),$.isPlainObject(t)&&(t=tools.getJSON(t)),r.indexOf(e+"=")!==-1){var o=new RegExp("("+e+"=)[^&]*");r=r.replace(o,"$1"+t)}else{var i="";r.indexOf("=")!==-1&&(i="&"),r+=i+e+"="+t}return r},supportCss3:function(e){var t,n=["webkit","Moz","ms","o"],r=[],o=document.documentElement.style,i=function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})};for(t in n)r.push(i(n[t]+"-"+e));r.push(i(e));for(t in r)if(r[t]in o)return!0;return!1},supportHtml5:function(e,t){return e in document.createElement(t)},jumpUrl:function(e,t){e&&$('<a href="'+e+'"'+(t?'target="'+(t||"_self")+'"':"")+"><span></span></a>").appendTo("body").children().click().end().remove()},formatDate:function(e,t){if(e=parseInt(e)){if(!t)return e;var n=new Date(e),r={"M":n.getMonth()+1,"d":n.getDate(),"h":n.getHours(),"m":n.getMinutes(),"s":n.getSeconds()};return t=t.replace(/([yMdhms])+/g,function(e,t){var o=r[t];return void 0!==o?(e.length>1&&(o="0"+o,o=o.substr(o.length-2)),o):"y"===t?(n.getFullYear()+"").substr(4-e.length):e})}return"-"},getJSON:function(e){if("undefined"!=typeof JSON){var t=JSON.stringify(e);return $.browser.msie&&"8.0"==$.browser.version?t.replace(/\\u([0-9a-fA-F]{2,4})/g,function(e,t){return String.fromCharCode(parseInt(t,16))}):t}if($.isArray(e)){var n=[];return $.each(e,function(e,t){n.push(tools.getJSON(t))}),"["+n.join(",")+"]"}if($.isPlainObject(e)){var r=[];return $.each(e,function(e,t){r.push('"'+e+'":'+tools.getJSON(t))}),"{"+r.join(",")+"}"}return'"'+e+'"'},getData:function(e){var t={result:{},total:0,voidTotal:0},n=e.serializeArray(),r=n.length,o=0;for(o;o<r;o++){var i=$.trim(n[o].value);t.all++,i||t.voidTotal++,t.result[n[o].name]=i}return t},getSize:function(e,t,n){var r=0;if(n=n||"border",t=t||"tb","all"===n)return this.getSize(e,t)+this.getSize(e,t,"padding");var o={l:["Left"],r:["Right"],lr:["Left","Right"],t:["Top"],b:["Bottom"],tb:["Top","Bottom"]},i=[{border:{l:["LeftWidth"],r:["RightWidth"],lr:["LeftWidth","RightWidth"],t:["TopWidth"],b:["BottomWidth"],tb:["TopWidth","BottomWidth"]}},{padding:o},{margin:o}];return $.each(i,function(o,i){i[n]&&$.each(i[n][t],function(t,o){var i=parseInt(e.css(n+o));r+=isNaN(i)?0:i})}),r}}),Nui.define("template",["util"],function(e){var t=function(e,t){var n=document.getElementById(e);return n&&"SCRIPT"===n.nodeName?(t=t||{},r(n.innerHTML,t)):""},n={"each":Nui.each,"trim":Nui.trim,"format":e.formatDate,"seturl":e.setParam};t.method=function(e,t){n[e]||(n[e]=t)},t.config={startTag:"{{",endTag:"}}"};var r=function(e,r){var i=t.config.startTag,a=t.config.endTag,u="";Nui.each(Nui.trim(e).split(i),function(e,t){e=Nui.trim(e).split(a),t>=1?u+=o(Nui.trim(e[0]),!0):e[1]=e[0],u+=o(e[1].replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/[\n\r]+/g,""))}),u='var that=this, code=""; with(data){'+u,u+="};that.echo=function(){return code;}";var c=new Function("data",u);return c.prototype=n,new c(r).echo()},o=function(e,t){var n,r;return t?(n=i(e,"if"))!==!1?r="if("+n+"){":(n=i(e,"elseif"))!==!1?r="}else if("+n+"){":(n=i(e,"else"))!==!1?r="}else{":i(e,"/if")!==!1?r="}":(n=i(e,"each"))!==!1?(n=n.split(/\s+/),r="that.each("+n[0]+", function("+n[1],n[2]&&(r+=", "+n[2]),r+="){"):i(e,"/each")!==!1?r="});":(n=i(e,"|"))!==!1?(n=n.split(/\s+/),r="code+=that."+n[0]+"("+n.slice(1).toString()+");"):r="code+="+e+";":r="code+='"+e+"';",r},i=function(e,t){return(0===e.indexOf(t)||"|"===t&&e.indexOf(t)>0)&&Nui.trim(e.replace(t,""))};return t.render=r,t}),Nui.define("component",["template"],function(tpl){return{static:{index:0,box:{},options:{},config:function(e,t){Nui.type(e,"Object")?$.extend(!0,this.options,e):Nui.type(e,"String")&&(this.options[e]=t)},$:function(e,t){$[e]=function(e){if(e&&e.target)return new t(e)}},$fn:function(e,t){$.fn[e]=function(){var n=arguments,r=n.length>1?Array.prototype.slice.call(n,1):[],o=n[0]||{};return this.each(function(){var i=this;i.nui||(i.nui={});var a=($(i),i.nui[e]);if(!a){var u=o;"object"==typeof o?o.target=i:u={target:i},a=i.nui[e]=new t(u)}"string"==typeof o&&0!==o.indexOf("_")&&("options"===o?"object"==typeof n[1]?a.set(n[1]):"string"==typeof n[1]&&a.set(n[1],n[2]):a[o].apply(a,r))})}},$ready:function(name,module){var attr=name+"-options",_$fn=$.fn[name],_$=$[name];$("["+attr+"]").each(function(index,item){var ele=$(item),options=ele.attr(attr);options=options?eval("("+ele.attr(attr)+")"):{},options.target=item,_$fn?ele[name](options):_$&&$[name](options)})}},options:{target:null,theme:""},_init:$.noop,_getTarget:function(){return $(this.options.target)},_on:function(e,t,n,r){var o=this;t.on(e,n),r===!0&&t[e](),o.eventArray.push({target:t,eventType:e,callback:n})},_off:function(){var e=this;$.each(e.eventArray,function(e,t){t&&t.target.off(t.eventType,t.callback)}),e.eventArray=[]},_delete:function(){var e=that.target[0].nui;e&&delete e[that.moduleName],delete that._self.box[that.index]},_reset:function(){var e=this;e._off(),e.elem&&e.elem.remove()},_tpl2html:function(e,t){return tpl.render(e,t)},set:function(e,t){var n=this;n._reset(),(e||t)&&($.isPlainObject(e)?n.options=$.extend(n.options,e):n.options[e]=t,n._init())},get:function(){},reset:function(){var e=this;return e.options=$.extend(e.options,e.optionsCache),e},destroy:function(){var e=this;e._off(),e._reset(),e._delete()}}});