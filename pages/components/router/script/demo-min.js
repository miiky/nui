Nui.define('src/components/router',['component','template','events'],function(t,e,a){var n={_paths:{},_init:function(){var t=this;Nui.doc.on('click','.nui-router-back',function(){return t.back()}).on('click','.nui-router-forward',function(){return t.forward()})},_setpaths:function(t,e){this._paths[t]||(this._paths[t]=e)},_replace:function(t){return t.replace(location.protocol+'//'+location.host,'').replace(/\s+/g,'').replace(/^\#\!?/,'').replace(/^([^\/])/,'/$1').replace(/\/$/,'')},_getWrapper:function(t){return $('<div class="nui-router-wrapper"></div>').appendTo(t)},_split:function(t){var e={url:t,params:{}},a=t.match(/\?[^\/\s]+/);if(a){var n=a[0];e.url=t.replace(n,''),n=n.replace('?','').split('&'),Nui.each(n,function(t,a){var n=t.split('=');e.params[n[0]]=n[1]})}return e},_change:function(){var n=this;if(!$.isEmptyObject(n._paths)){var r=location.hash,i=this._split(r),o=n._replace(i.url),s=i.params;Nui.each(n._paths,function(i){if(o===i.path||0===o.indexOf(i.path)){var l=o.replace(i.path,'').replace(/^\//,''),p=n.__instances[i.id],c=p.options,u={};if(l=l?l.split('/'):[],l.length===i.params.length){var h=!0===p._isRrender;if((!p._wrapper||p._wrapper&&h)&&(c.data=$.extend(!0,{},p._defaultOptions.data)),Nui.each(i.params,function(t,e){u[t]=l[e]}),Nui.each(s,function(t,e){u[t]=s[e]}),p._send&&p._send.data&&'function'==typeof c.onData&&(c.onData.call(c,p._send.data),delete p._send),c.data.path=i.path+'/',c.data.url=o+'/',c.data.params=u,c.data.query=s,'function'==typeof c.onChange&&c.onChange.call(c),h||!p._wrapper){c.wrapper&&!p._wrapper?p._wrapper=n._getWrapper(p.container):n._wrapper||(n._wrapper=n._getWrapper(p.container)),!p._isRrender&&p._wrapper||t.destroy((p._wrapper||n._wrapper).off());var _=c.element=p._wrapper||n._wrapper,f=c.template;f&&('string'==typeof f?_.html(e.render(f,c.data)):_.html(e.render.call(f,f.main,c.data))),'function'==typeof c.onInit&&c.onInit.call(c),a.call(c),t.init(_),delete p._isRrender}var _=p._wrapper||n._wrapper;return _.show().siblings('.nui-router-wrapper').hide(),'function'==typeof c.onAfter&&c.onAfter.call(c),n._initialize=match=!0,Nui.bsie7&&n._setHistory(r),!1}}}),n._initialize||Nui.each(n.__instances,function(t){if(!n._isEntry&&!0===t.options.entry)return n._isEntry=!0,t.target?t._render(t.target.eq(0)):t.path&&t._render(t.path),n._initialize=!0,!1})}n._oldhash=r},_bindHashchange:function(){var t=this;if(Nui.bsie7){var e=function(e){var a=location.hash;return t._oldhash!==a&&!e};setInterval(function(){e()&&t._change()},100),e(!0)}else Nui.win.on('hashchange',function(){t._change()})},_$ready:null,_$fn:null,init:null,start:function(){this._initialize||this._change()},location:function(t,e,a){var n=this;if(t){arguments.length<=2&&'boolean'==typeof e&&(a=e,e=null);var r,i;t=this._replace(t),Nui.each(this._paths,function(e,a){if(a===t||0===t.indexOf(e.path)&&(r=t.replace(e.path+'/',''))&&r.split('/').length===e.params.length)return i=n.__instances[e.id],!1}),i&&(i._send={data:e},i._isRrender=a,i._render(t))}else n.start()},forward:function(t){return history.forward(t),!1},back:function(t){return history.back(t),!1}};return Nui.bsie7&&(n._history=[],n._setHistory=function(t){this._isHistory||(Nui.each(this._history,function(t){t.active=!1}),this._history.push({hash:t,active:!0})),this._isHistory=!1},Nui.each(['forward','back'],function(t){var e='forward'===t?1:-1;n[t]=function(){var a=this,r=a._history.length;return n._isHistory=!0,Nui.each(a._history,function(n,i){var o=i+e;if(n.active){if(-1===o||o===r)return window.history[t](),!1;var s=a._history[o];return s&&(location.hash=s.hash,s.active=!0),n.active=!1,!1}}),!1}})),this.extend(t,{static:n,options:{path:'',template:'',container:null,data:{},entry:!1,wrapper:!1,level:1,onBefore:null,onChange:null,onData:null,onInit:null,onAfter:null},_init:function(){var t=this,e=t.constructor;t._exec()&&!e._bind&&(e._bind=!0,e._bindHashchange())},_exec:function(){var t=this,e=t.options,a=t.constructor;if(t.container=a._jquery(e.container),e.path&&t.container){t.path=a._replace(e.path);var n=t._getpath(),r=n.params.length;if((!r&&1===e.level||1!==e.level)&&a._setpaths(n.rule,n),r&&e.level>0)for(var i,o,s=[];i=n.params.shift();)s.push(i),o=s.join('/:'),a._setpaths(n.rule+'/:'+o,$.extend({},n,{params:o.split('/:')}));return t._getTarget()&&t._event(),t}},_getpath:function(){var t=this,e=t.path,a=t.options,n=e.indexOf('/:'),r={id:t.__id,params:[],rule:e,path:e};return-1!==n&&(r.params=e.substr(n+2).split('/:'),r.path=e.substr(0,n),a.level>0&&(r.rule=r.path)),r},_render:function(t){var e=this,a=e.options,n=t instanceof jQuery?t.attr('href'):t;if(n){var r=!1,i=function(){r=!0,location.hash='#!'+e.constructor._replace(n)};if('function'==typeof a.onBefore&&!1===a.onBefore.call(a,i))return!1;r||i()}},_event:function(){var t=this;t.options;return t._on('click',Nui.doc,t.target,function(e,a){t._render(a),e.preventDefault()}),t},_reset:function(){var t=this,e=t.constructor;return t._off(),Nui.each(e._paths,function(a,n){a.id===t.__id&&delete e._paths[n]}),t},option:null,reset:null})}),Nui.define('./script/demo',['src/components/router'],function(t){t({target:'#home',entry:!0,path:'/home/',container:'#main',template:'<p>这是首页</p>'}),t({target:'#news, .news',entry:!0,path:'/news/:id/:title',container:'#main',level:2,template:{list:'<ul><%each list%><li><a href="<%$value.url%>/<%$value.title%>" class="news"><%$value.title%></a></li><%/each%></ul>',detail:'<div><h3><%params.title%></h3><p>这是<%params.title%>详情，id是<%params.id%>。</p></div>'},data:{list:[{url:'/news/1',title:'资讯1'},{url:'/news/2',title:'资讯2'},{url:'/news/3',title:'资讯3'}]},onChange:function(){var t=this.template,e=this.data.params;e.id&&e.title?t.main=t.detail:t.main=t.list}}),t.start()});
//# sourceMappingURL=demo-min.js.map?v=3367f06