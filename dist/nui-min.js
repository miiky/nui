!function(t,e,n){if(!t.Nui){var i=t.Nui={type:function(t,e){if(null===t||void 0===t)return!1;if(o(e)){var n=!1;return i.each(e,function(e){if(r(e)(t))return n=!0,!1}),n}return r(e)(t)},each:function(t,e){var n;if(o(t)){var i=t.length;for(n=0;n<i&&!1!==e(t[n],n);n++);}else for(n in t)if(!1===e(t[n],n))break},browser:function(){var t=navigator.userAgent.toLowerCase(),e=/(edge)[ \/]([\w.]+)/.exec(t)||/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[],n=e[1]||"",i=e[2]||"0",r={};return"mozilla"===n&&/trident/.test(t)&&(n="msie",i="11.0"),n&&(r[n]=!0,r.version=i),r.chrome||r.edge?r.webkit=!0:r.webkit&&(r.safari=!0),r}()},r=function(t){return function(e){return{}.toString.call(e)==="[object "+t+"]"}},o=i.isArray=Array.isArray||r("Array");i.each({trim:/^\s+|\s+$/g,trimLeft:/^\s+/g,trimRight:/\s+$/g},function(t,e){i[e]=function(){return String.prototype[e]?function(t){return t[e]()}:function(e){return e.replace(t,"")}}()});var a=function(){};i.bsie6=i.browser.msie&&i.browser.version<=6,i.bsie7=i.browser.msie&&i.browser.version<=7;var s,u,c=function(t){var e=[],n={};return i.each(t,function(t){n[t]||(n[t]=!0,e.push(t))}),e},l=function(){var t,e,n,r,a,s,u=arguments[0]||{},c=1,p=arguments.length,d=!1;for("boolean"==typeof u&&(d=u,u=arguments[1]||{},c=2),"object"==typeof u||i.type(u,"Function")||(u={}),p===c&&(u={},--c);c<p;c++)if(null!=(a=arguments[c]))for(r in a)t=u[r],n=a[r],u!==n&&(d&&n&&(f(n)||(e=o(n)))?(e?(e=!1,s=t&&o(t)?t:[]):s=t&&f(t)?t:{},u[r]=l(d,s,n)):void 0!==n&&(u[r]=n));return u},f=function(t){return!(!i.type(t,"Object")||t.constructor!==Object)},p=function(t){var e;for(e in t)return!1;return!0},d=location.protocol+"//"+location.host,h=function(t){if(/^((https?|file):)?\/\//i.test(t))return!0},m=function(){var t=(d+location.pathname).replace(/\\/g,"/"),e=t.lastIndexOf("/");return t.substr(0,e+1)}(),v=function(){return"_module_"+ ++b},g=function(t){return t.replace(/(\.(js|css))?(\?[\s\S]*)?$/i,"")},y=e.head||e.getElementsByTagName("head")[0]||e.documentElement,_="onload"in e.createElement("script"),b=0,N={},x={},$={},j={},w={skin:null,min:!0,paths:{},alias:{},maps:{}};if(i.browser.msie&&i.browser.version<=9)var O,S=function(){return u||(O&&"interactive"===O.readyState?O:(i.each(y.getElementsByTagName("script"),function(t){if("interactive"===t.readyState)return O=t,!1}),O))};t.console=t.console||{log:a,debug:a,error:a,info:a},i.bsie7&&e.execCommand("BackgroundImageCache",!1,!0),"undefined"!=typeof jQuery&&(i.win=jQuery(t),i.doc=jQuery(e));var k=function(t,e){var n=this;n.deps=e||[],n.alldeps=n.deps,n.depmodules={},n.id=t[0],n.name=t[1],n.version="",n.suffix=t[2],n.uri=n.id.substr(0,n.id.lastIndexOf("/")+1)};k.prototype.load=function(){var t=this;if(t.loaded||t.name==="_module_"+b)return t.onload();if(!t.url){var n=e.createElement("script");t.url=t.id+t.suffix+".js"+t.version,n.src=t.url,n.async=!0,n.id=t.id,u=n,y.appendChild(n),u=null,_?n.onload=n.onerror=t.onload(n):n.onreadystatechange=function(){/loaded|complete/.test(n.readyState)&&t.onload(n)()}}return t.resolve()},k.prototype.loadcss=function(){var t=this;return t.styles&&t.styles.length&&i.each(t.styles,function(n){var i=k.getAttrs(n,t.uri)[0];if(!x[i]){x[i]=!0;var r=e.createElement("link");i=i+".css"+t.version,r.rel="stylesheet",r.href=i,y.appendChild(r)}}),t},k.prototype.resolve=function(){var t=this;return t.alldeps.length&&p(t.depmodules)&&i.each(t.alldeps,function(e){var n=k.getModule(e,[],t.uri);n.version=t.version,t.depmodules[e]=n.loaded?n:n.load()}),t},k.prototype.onload=function(t){var e=this;return t?function(){return s=t.moduleData||s,t.onload=t.onerror=t.onreadystatechange=null,y.removeChild(t),t=null,e.loaded=!0,s&&(i.each(s,function(t,n){t&&(e[n]=t)}),s=null),e.resolve().rootCallback()}:(e.loaded=!0,e.resolve().rootCallback())},k.prototype.rootCallback=function(){return i.each($,function(t,e){var n=t.getData(),i=c(n.ids);n.loaded&&t.callback&&t.callback(i)}),this},k.prototype.getData=function(t){return t||(t={ids:[],loaded:!0}),t.ids.unshift(this.id),this.loaded||(t.loaded=!1),this.alldeps.length&&i.each(this.depmodules,function(e){t=e.getData(t)}),t},k.prototype.methods=function(){var t=this,e={};return e.require=function(e,n){var i=t.depmodules[e];if(i)return"function"==typeof n&&n(i.module),i.module},e.extend=function(t,n,r){var s;if(t){if("string"==typeof t){var u=e.require(t);if(void 0===u)return t;t=u}return o(t)?(s=l(!0,[],t),!0===r&&(o(n)?s=s.concat(n):s.push(n))):i.type(t,"Function")?t.exports?(s=l(!0,{},t.exports,n),s.static.__parent=new k.Class.parent(t)):s=l(!0,a,t,n):s=i.type(t,"Object")?l(!0,{},t,n):t,o(r)&&i.type(s,["Object","Function"])&&i.each(r,function(t){if(t.method&&t.content){for(var e,n,r=t.method.split("->"),o=r[r.length-1];(n=r.shift())&&(e=e||s,n!==o);)e=e[n];var a=e[o];if(i.type(a,"Function")){var u=a.toString().replace(/(\})$/,";"+t.content+"$1");a=new Function("return "+u),e[o]=a()}}}),s}},e.imports=a,e.renders=function(t){return t},e.exports={},e},k.prototype.exec=function(){var t=this;if(!t.module&&"function"==typeof t.factory){var e,n=t.methods();t.deps.length?(e=[],i.each(t.deps,function(t){e.push(n.require(t))})):e=[n.require,n.imports,n.renders,n.extend];var r=t.factory.apply(n,e);if(void 0===r&&(r=n.exports),"component"===t.name||r.static&&r.static.__parent instanceof k.Class.parent){var o={statics:{},propertys:{},methods:{},apis:{init:!0}};w.skin&&!r.options.skin&&(r.options.skin=w.skin),i.each(r,function(t,e){"static"===e?o.statics=t:"function"==typeof t?(o.methods[e]=t,/^_/.test(e)||(o.apis[e]=!0)):o.propertys[e]=t});var a=t.name.substr(t.name.lastIndexOf("/")+1).replace(/\W/g,"");if(j[a])t.module=j[a];else if(o.statics.__component_name=a,t.module=j[a]=k.Class(t,o),delete r.static.__parent,t.module.exports=r,"component"!==t.name){var s,u=t.module.constructor;i.each(["_$fn","_$ready"],function(e){"function"==typeof(s=u[e])&&s.call(u,a,t.module)})}}else t.module=r}return t},k.normalize=function(t){t=t.replace(/([^:])\/{2,}/g,"$1/"),t=t.replace(/\.{2,}/g,"..");var e=function(t){return/([\w]+\/?)(\.\.\/)/g.test(t)?(t=t.replace(/([\w]+\/?)(\.\.\/)/g,function(t,e,n){return t==e+n?"":t}),e(t)):t};return t=e(t),t.replace(/([\w]+)\/?(\.\/)+/g,"$1/")},k.Class=function(t,e){var n=function(t){var i=this;l(!0,i,e.propertys,{__id:n.__id++,_eventList:[]}),i.options=l(!0,{},i.options,n._options,t||{}),i._defaultOptions=l(!0,i.options),n.__instances[i.__id]=i,i._init()};l(!0,n,e.statics),l(!0,n.prototype,e.methods),n.__setMethod(e.apis,j),"function"==typeof n._init&&n._init();var r=function(t){return new n(t)};return r.constructor=n,i.each(n,function(t,e){"function"!=typeof t||/^_/.test(e)||"constructor"===e||"function"==typeof t&&(r[e]=function(){return n[e].apply(n,arguments)})}),r},k.Class.parent=function(t){this.exports=t.exports,this.constructor=t.constructor},k.setPath=function(t){var e=/\{([^\{\}]+)\}/.exec(t);if(e){var n=w.paths[e[1]];n&&(t=g(t.replace(e[0],n)))}return t},k.getAttrs=function(t,e){var n,i=g(t),r=i.match(/-min$/g),o="";return r&&(i=i.replace(/-min$/g,""),o=r[0]),t=k.setPath(w.alias[i]||i),h(t)||(n=k.normalize(m+t),t=(e||m)+t),t=k.normalize(t),[t,i,o,n]},k.getModule=function(t,e,n){var i=k.getAttrs(t,n),r=i[0];return N[i[1]]||N[r]||N[i[3]]||(N[r]=new k(i,e))},k.load=function(t,e,n,r){if(i.type(t,"String")&&i.trim(t)){var o=t.match(/(\?[\s\S]*)$/);!0===w.min&&!0===r&&(t=g(t),/-min$/.test(t)||(t+="-min"));var a=k.getModule(n,[t]);o&&(a.version=o[0]);var s=a.alldeps[0],u=w.maps[s.replace(/(-min)?(\.js)?$/,"")];u&&(/^\?/.test(u)||(u="?v="+u),a.version=u),a.callback=function(t){var r=a.depmodules[s],o=r.suffix;i.each(t,function(t){var e=N[t].exec();o||e.loadcss()}),i.type(e,"Function")&&e.call(i,r.module),delete $[n],delete a.callback},$[n]=a,a.load()}},k.getdeps=function(t){var e=[],n=[],r=t.match(/(require|extend|imports)\(('|")[^'"]+\2/g);return r&&i.each(r,function(t){/^(require|extend)/.test(t)?e.push(t.replace(/^(require|extend)|[\('"]/g,"")):n.push(t.replace(/^imports|[\('"]/g,""))}),[c(e),c(n)]},k.define=function(t,e,n){i.type(t,"Function")?(n=t,t=void 0,e=[]):i.type(e,"Function")&&(n=e,i.type(t,"String")?e=[]:(e=t,t=void 0));var r=k.getdeps(n.toString()),o=e.concat(r[0]),a=r[1];if(t&&!N[t]&&!N[k.getAttrs(t)[0]]){var u=k.getModule(t,o);u.deps=e,u.styles=a,u.factory=n,u.loaded=!0,u.load()}if(s={name:t,deps:e,styles:a,alldeps:o,factory:n},void 0!==S){var c=S();c&&(c.moduleData=s)}},i.load=function(t,e){return t&&"string"==typeof t&&k.load(t,e,v(),!0),i},i.use=function(t,e){return t&&"string"==typeof t&&k.load(t,e,v()),i},i.define=function(){var t=arguments,e=t.length,n=[];!e||1===e&&!i.type(t[0],"Function")?n.push(function(){return t[0]}):2===e&&!i.type(t[1],"Function")||3==e&&!i.type(t[2],"Function")?(n.push(t[0]),n.push(function(){return t[1]})):2===e&&!i.type(t[0],["Array","String"])&&i.type(t[1],"Function")?n.push(t[1]):3===e&&!o(t[1])&&i.type(t[2],"Function")?(n.push(t[0]),n.push(t[2])):n=t,k.define.apply(k,n)},i.config=function(t,e){if(i.type(t,"Object"))w=l({},w,t);else{if(!e||!i.type(t,"String"))return;if(w[t]=e,"paths"!==t)return}var n=w.base||w.paths.base||"";h(n)||(n=w.paths.base=d+n),i.each(w.paths,function(t,e){"base"===e||h(t)||(w.paths[e]=n+"/"+t)})}}}(this,document),Nui.define("util",{regex:{mobile:/^0?(13|14|15|17|18)[0-9]{9}$/,tel:/^[0-9-()（）]{7,18}$/,email:/^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,idcard:/^\d{17}[\d|x]|\d{15}$/,cn:/^[\u4e00-\u9fa5]+$/,taxnum:/^[a-zA-Z0-9]{15,20}$/},toFixed:function(t,e,n){if(isNaN(t))return t;void 0===n&&(n=2),e=e||0;var i=t.toString(),r=function(t){for(var e="";t>0;)e+="0",t--;return e},o="";i<0&&(i=i.replace("-",""),o="-");var a=i.indexOf(".");if(-1!==a&&e>=0){var s=parseInt(i.substr(0,a)),u="0"+i.substr(a),c="1"+r(e);u=(Math.round(u*c)/c).toFixed(e),u>=1&&(s=(s+1).toString()),i=o+s+u.substr(1)}else e>0&&(i=o+i+"."+r(e));if(null!==n&&n>=0&&n<e){i=i.replace(/0+$/,"");var a=i.indexOf("."),l=0;for(-1!==a&&(l=i.substr(a+1).length);l<n;)i+="0",l++}return i},getParam:function(t,e){var n=decodeURI(e||location.href),i={};if(startIndex=n.indexOf("?"),startIndex++>0){var r,o=n.substr(startIndex).split("&");Nui.each(o,function(t){r=t.split("="),i[r[0]]=r[1]})}return"string"==typeof t&&t&&(i=void 0!==(r=i[t])?r:""),i},setParam:function(t,e,n){var i;if(Nui.type(t,"Object"))i=e||location.href,Nui.each(t,function(t,e){t&&(Nui.type(t,"Object")&&(t=tools.getJSON(t)),i=tools.setParam(e,t,i))});else if(i=n||location.href,-1===i.indexOf("?")&&(i+="?"),Nui.type(e,"Object")&&(e=tools.getJSON(e)),-1!==i.indexOf(t+"=")){var r=new RegExp("("+t+"=)[^&]*");i=i.replace(r,"$1"+e)}else{var o="";-1!==i.indexOf("=")&&(o="&"),i+=o+t+"="+e}return i},supportCss3:function(t){var e,n=["webkit","Moz","ms","o"],i=[],r=document.documentElement.style,o=function(t){return t.replace(/-(\w)/g,function(t,e){return e.toUpperCase()})};for(e in n)i.push(o(n[e]+"-"+t));i.push(o(t));for(e in i)if(i[e]in r)return!0;return!1},supportHtml5:function(t,e){return t in document.createElement(e)},location:function(t,e){t&&jQuery('<a href="'+t+'"'+(e?'target="'+(e||"_self")+'"':"")+"><span></span></a>").appendTo("body").children().click().end().remove()},formatDate:function(t,e){if(t=parseInt(t)){if(!e)return t;var n=new Date(t),i={"M":n.getMonth()+1,"d":n.getDate(),"h":n.getHours(),"m":n.getMinutes(),"s":n.getSeconds()};return e=e.replace(/([yMdhms])+/g,function(t,e){var r=i[e];return void 0!==r?(t.length>1&&(r="0"+r,r=r.substr(r.length-2)),r):"y"===e?(n.getFullYear()+"").substr(4-t.length):t})}return"-"},getData:function(t,e,n){var i=this,r={"result":{},"voids":0,"total":0},o=t.serializeArray(),a=",";if(e&&"string"==typeof e&&!n&&(a=e),Nui.each(o,function(t,e){var n=Nui.trim(t.value);r.total++,n||r.voids++;var i=t.name;Nui.isArray(r.result[i])||(r.result[i]=[]),r.result[i].push(n)}),Nui.each(r.result,function(t,e){r.result[e]=t.join(a)}),e&&n){var s=!1;r.result[n]=[],t.find(e).each(function(){var t=i.getData($(this).find("[name]")).result;s||(Nui.each(t,function(t,e){delete r.result[e]}),s=!0),r.result[n].push(t)})}return r}}),Nui.define("template",["util"],function(t){var e=function(t,e,i){if(this.tplid=t){if(n[t])return d.call(this,n[t],e,i);var r=document.getElementById(t);if(r&&"SCRIPT"===r.nodeName&&"text/html"===r.type)return d.call(this,n[t]=r.innerHTML,e,i)}return""},n={},i={openTag:"<%",closeTag:"%>"},r={trim:Nui.trim,formatDate:t.formatDate,setParam:t.setParam,toFixed:t.toFixed},o=!!"".trim,a=";$that.out = function(){return $that.code";a=(o?'""'+a:"[]"+a+'.join("")')+"}";var s=function(t){return o?t?function(t){return"$that.code += "+t+";"}:function(t,e){return t+=e}:t?function(t){return"$that.code.push("+t+");"}:function(t,e){return t.push(e),t}},u=s(!0),c=s(),l=function(t,n,i,r){var o=this,a=n.replace(/([^\s])/g,"\\$1"),s=i.replace(/([^\s])/g,"\\$1");return t.replace(new RegExp(a+"\\s*include\\s+['\"]([^'\"]*)['\"]\\s*"+s,"g"),function(t,n){if(n){var i=o[n];return"function"==typeof i&&(i=i()),"string"==typeof i?d.call(o,i,null,r):e(n,null,r)}return""})},f="object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return 1===t.nodeType&&"string"==typeof t.nodeName},p=function(t){if(t&&"object"==typeof t){var e=t[0];return f(e?e:t)}},d=function(t,e,n){var s=this;if("string"==typeof t){n=n||{};var u=n.openTag||i.openTag,f=n.closeTag||i.closeTag;if(t=l.call(s,t,u,f),e&&"object"==typeof e){Nui.isArray(e)&&(e={$list:e});var d=o?"":[];t=t.replace(/\s+/g," "),Nui.each(t.split(u),function(t,e){t=t.split(f),e>=1?d=c(d,m(Nui.trim(t[0]),!0)):t[1]=t[0],d=c(d,m(t[1].replace(/'/g,"\\'").replace(/"/g,'\\"')))});var v=o?"":[];Nui.each(e,function(t,e){v=c(v,e+"=$data."+e+",")}),o||(d=d.join(""),v=v.join("")),d="var "+v+"$that=this; $that.line=4; $that.code="+a+";\ntry{\n"+d+";}\ncatch(e){\n$that.error(e, $that.line)\n};";try{var g=new Function("$data",d);g.prototype.methods=r,g.prototype.error=h(d,e,s.tplid),g.prototype.dom=p,t=new g(e).out(),g=null}catch(t){h(d,e,s.tplid)(t)}}return t}return""},h=function(t,e,n){return function(i,r){var o="\n",a=[];t="function anonymous($data){\n"+t+"\n}",t=t.split("\n"),Nui.each(t,function(t,e){a.push(e+1+"      "+t.replace("$that.line++;",""))}),o+="code\n",o+=a.join("\n")+"\n\n",void 0!==typeof JSON&&(o+="data\n",o+=JSON.stringify(e)+"\n\n"),n&&(o+="templateid\n",o+=n+"\n\n"),r&&(o+="line\n",o+=r+"\n\n"),o+="message\n",o+=i.message,console.error(o)}},m=function(t,e){if(!t)return"";var n,i;if(e)if(void 0!==(i=g(t,"if")))n="if("+v(i)+"){";else if(void 0!==(i=g(t,"elseif")))n="\n}\nelse if("+v(i)+"){";else if("else"===t)n="\n}\nelse{";else if("/if"===t)n="}";else if(void 0!==(i=g(t,"each ",/\s+/)))n="Nui.each("+i[0]+", function("+(i[1]||"$value")+","+(i[2]||"$index")+"){";else if("/each"===t)n="});";else if(void 0!==(i=g(t," | ",/\s*,\s*/))){var r=i[0],o=r.lastIndexOf("("),a="("+v(i.slice(1).toString())+")";if(-1!==o){var s=r.substr(0,o),c=Nui.trimLeft(r.substr(o+1));n=u(s+"($that.methods."+c+a)}else n=u("$that.methods."+r+a)}else n=/^(var|let|const|return)\s+/.test(t)?v(t)+";":u(v(t,!0));else n=u("'"+t+"'");return n+"\n$that.line++;"},v=function(t,e){return t.replace(/([\.\$\w]+\s*(\[[\'\"\[\]\w\.\$\s]+\])?)\?\?/g,function(t,n){var i="(typeof "+n+'!=="undefined"&&'+n+"!==null&&"+n+"!==undefined&&!$that.dom("+n+")";return e&&(i+="?"+n+':""'),i+")"})},g=function(t,e,n){var i;if(0===t.indexOf(e)?i="":" | "===e&&t.indexOf(e)>0&&(i=","),void 0!==i)return t=Nui.trimLeft(t.replace(e,i)),n?t.split(n):t};return e.method=function(t,e){r[t]||(r[t]=e)},e.config=function(){var t=arguments;Nui.type(t[0],"Object")?Nui.each(t[0],function(t,e){i[e]=t}):t.length>1&&"string"==typeof t[0]&&(i[t[0]]=t[1])},e.render=d,e}),Nui.define("events",function(){return function(t){var e=t||this,n=e.constructor,i=n&&n.__component_name,r=e.element||Nui.doc,o=i?e._events:e.events;if(!r||!o)return e;"function"==typeof o&&(o=o.call(e)),r instanceof jQuery||(r=jQuery(r));var a,s,u,c=function(t,n,i){"function"==typeof i?i.call(e,t,n):Nui.each(i,function(i,r){if("function"==typeof(i=e[i]))return u=i.call(e,t,n,u)})};return Nui.each(o,function(t,n){!t||"string"!=typeof t&&"function"!=typeof t||("string"==typeof t&&(t=Nui.trim(t).split(/\s+/)),n=Nui.trim(n).split(/\s+/),a=n.shift().replace(/:/g," "),s=n.join(" "),i?e._on(a,r,s,function(e){c(e,$(this),t)}):r.on(a,s,function(e){c(e,$(this),t)}))}),e}}),function(window,undefined){"undefined"!=typeof jQuery&&Nui.define("component",["template","events"],function(tpl,events){var module=this,callMethod=function(t,e,n){if(e.length>t.length){var i=e[t.length];if(i&&n.options.id!==i&&n.__id!==i)return}t.apply(n,e)};Nui.bsie7&&Nui.doc.on("focus",'button, input[type="button"]',function(){this.blur()});var statics={__id:0,__instances:{},__setMethod:function(apis,components){var self=this;return Nui.each(apis,function(val,methodName){self[methodName]===undefined&&(self[methodName]=function(){var self=this,args=arguments,container=args[0],name=self.__component_name;if(name&&"component"!==name)if(container&&container instanceof jQuery)if("init"===methodName){var mod=components[name];mod&&container.find("[data-"+name+"-options]").each(function(){if(!this.nui||!this.nui[name]){var elem=jQuery(this),options=elem.data(name+"Options")||{};"string"==typeof options&&(options=eval("("+options+")")),options.target=elem,mod(options)}})}else container.find("[nui_component_"+name+"]").each(function(){var t,e;this.nui&&(t=this.nui[name])&&"function"==typeof(e=t[methodName])&&callMethod(e,Array.prototype.slice.call(args,1),t)});else Nui.each(self.__instances,function(t){var e=t[methodName];"function"==typeof e&&callMethod(e,args,t)});else Nui.each(components,function(t,e){"component"!==e&&"function"==typeof t[methodName]&&t[methodName].apply(t,args)})})}),self},_options:{},_init:jQuery.noop,_jquery:function(t){return t instanceof jQuery?t:jQuery(t)},_getSize:function(t,e,n){var i=0;if(n=n||"border",e=e||"tb","all"===n)return this._getSize(t,e)+this._getSize(t,e,"padding")+this._getSize(t,e,"margin");var r={l:["Left"],r:["Right"],lr:["Left","Right"],t:["Top"],b:["Bottom"],tb:["Top","Bottom"]},o=[{border:{l:["LeftWidth"],r:["RightWidth"],lr:["LeftWidth","RightWidth"],t:["TopWidth"],b:["BottomWidth"],tb:["TopWidth","BottomWidth"]}},{padding:r},{margin:r}];return Nui.each(o,function(r){r[n]&&Nui.each(r[n][e],function(e){var r=parseFloat(t.css(n+e));i+=isNaN(r)?0:r})}),i},_$fn:function(t,e){jQuery.fn[t]=function(){var n=arguments,i=n[0];return this.each(function(){if("string"!=typeof i)Nui.type(i,"Object")?i.target=this:i={target:this},e(i);else if(i){var r;if(this.nui&&(r=this.nui[t])&&0!==i.indexOf("_"))if("options"===i)r.set(n[1],n[2]);else{var o=r[i];"function"==typeof o&&o.apply(r,Array.prototype.slice.call(n,1))}}})}},_$ready:function(t,e){"function"==typeof this.init&&this.init(Nui.doc)},config:function(t,e){jQuery.isPlainObject(t)?jQuery.extend(!0,this._options,t):t&&Nui.type(t,"String")&&(this._options[t]=e)}};return{static:statics,options:{target:null,id:"",skin:"",onInit:null,onReset:null,onDestroy:null},_template:{},_init:jQuery.noop,_exec:jQuery.noop,_getTarget:function(){var t=this;if(!t.target){var e=t.options.target,n=t.constructor;if(!e)return null;e=n._jquery(e);var i="nui_component_"+n.__component_name;t.target=e.attr(i,""),t.target.each(function(){this.nui||(this.nui={}),this.nui[n.__component_name]=t})}return t.target},_tplData:function(t){var e=this.options,n=this.constructor,i="nui-"+n.__component_name,r=Nui.trim(e.skin),o=function(t,e){if(t.__parent){var n=t.__parent.constructor,i=n.__component_name;if("component"!==i)return r&&e.unshift("nui-"+i+"-"+r),e.unshift("nui-"+i),o(n,e)}return e},a=o(n,[]);return a.push(i),r&&a.push(i+"-"+r),e.id&&a.push(n.__component_name+"-"+e.id),t||(t={}),t.className=a.join(" "),t},_event:function(){return events.call(this)},_on:function(t,e,n,i,r){var o=this;"function"==typeof n&&(r=i,i=n,n=e,e=null,n=o.constructor._jquery(n));var a=function(t){return i.call(this,t,jQuery(this))};return e?("string"!=typeof n&&((n=n.selector)||(n=o.options.target)),e.on(t,n,a),r&&e.find(n).trigger(t)):(n.on(t,a),r&&n.trigger(t)),o._eventList.push({dalegate:e,selector:n,type:t,callback:a}),o},_off:function(){var t=this,e=t._eventList;return Nui.each(e,function(t,n){t.dalegate?t.dalegate.off(t.type,t.selector,t.callback):t.selector.off(t.type,t.callback),e[n]=null,delete e[n]}),t._eventList=[],t},_delete:function(){var t=this,e=t.constructor;if(t.target){var n="nui_component_"+e.__component_name;t.target.removeAttr(n).each(function(){this.nui&&(this.nui[e.__component_name]=null,delete this.nui[e.__component_name])})}e.__instances[t.__id]=null,delete e.__instances[t.__id]},_reset:function(){return this._off(),this.element&&(this.element.remove(),this.element=null),this},_tpl2html:function(t,e){var n={openTag:"<%",closeTag:"%>"};return 1===arguments.length?tpl.render(this._template,t,n):tpl.render.call(this._template,this._template[t],e,n)},option:function(t,e){var n=!1;return jQuery.isPlainObject(t)?(jQuery.extend(!0,this.options,t),n=!0):t&&"string"==typeof t&&(this.options[t]=e,n=!0),n&&(this._reset(),this._exec()),this},reset:function(){return this.option(this._defaultOptions),"function"==typeof this.options.onReset&&this.options.onReset.call(this),this},destroy:function(){this._delete(),this._reset(),"function"==typeof this.options.onDestroy&&this.options.onDestroy.call(this)}}})}(this);