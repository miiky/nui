/**
 * @author Aniu[2017-12-23 16:50]
 * @update Aniu[2017-12-23 16:50]
 * @version 1.0.1
 * @description 搜索下拉
 */

Nui.define(['../core/component', '../core/util'], function(component, util){
    this.imports('../style/components/search/index');
    return this.extend(component, {
        _static:{
            _init:function(){
                var self = this, timer = null;
                Nui.win.resize(function(){
                    clearTimeout(timer);
                    timer = setTimeout(function(){
                        Nui.each(self.__instances, function(obj){
                            if(obj._show){
                                obj.resize()
                            }
                        })
                    }, 100)
                })
            }
        },
        _options:{
            /**
             * @func 请求url
             * @type <String>
             */
            url:'',
            /**
             * @func 查询参数
             * @type <String>
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param value <String> 文本框输入值
             * @return <Object> 查询参数对象集合
             */
            query:'keyword',
            /**
             * @func 设置层级
             * @type <Number>
             */
            zIndex:19920604,
            /**
             * @func 定义列表模版
             * @type <String>
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @return <String> 返回列表模版
             * @desc 模版中可以使用<%$data%>获取当前行数据，<%$index%>获取当前行索引
             */
            item:'',
            /**
             * @func 定义空数据模版
             * @type <String>
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @return <String> 返回空数据模版
             * @desc 模版中可以使用<%value%>获取当前输入值
             */
            empty:'',
            /**
             * @func 定义顶部模版
             * @type <String>
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @return <String> 返回顶部模版
             */
            head:'',
            /**
             * @func 定义底部模版
             * @type <String>
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @return <String> 返回底部模版
             */
            foot:'',
            /**
             * @func 列表内容字段名
             * @type <String>
             */
            field:'',
            /**
             * @func 是否在文本获取焦点时展示下拉
             * @type <Boolean>
             * @desc 设置true后组件内部会绑定focus事件，因此不建议手动绑定focus事件调用组件的同时将该参数设置为true，那样会导致事件重复绑定
             */
            focus:false,
            /**
             * @func 是否允许文本框内容为空时展示下拉
             * @type <Boolean> 
             */
            nullable:false,
            /**
             * @func 异步请求数据时，是否缓存
             * @type <Boolean>
             */
            cache:false,
            /**
             * @func 生成html容器
             * @type <String> 字符串选择器
             * @type <Object> dom、jQuery对象
             */
            container:'body',
            /**
             * @func 下拉列表的数量，超过出现滚动条
             * @type <Number>
             */
            limit:5,
            /**
             * @func 增加高宽
             * @type <Object>
             */
            size:null,
            /**
             * @func 设置位置偏移
             * @type <Object>
             */
            offset:null,
            /**
             * @func 设置样式
             * @type <Object>
             */
            style:null,
            /**
             * @func jQuery ajax配置
             * @type <Object>
             */
            ajax:null,
            /**
             * @func 列表原始数据
             * @type <Array>
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @return <Array> 返回原始数据
             */
            data:null,
            /**
             * @func 选中值为标签形式
             * @type <Object>
             */
            tag:{
                /**
                 * @func 是否多选
                 * @type <Boolean>
                 */
                multiple:false,
                /**
                 * @func 当输入框焦点在起始位置时，按回格键是否删除前一个标签
                 * @type <Boolean>
                 */
                dele:false,
                /**
                 * @func 是否设置提示
                 * @type <Boolean>
                 */
                title:false,
                /**
                 * @func 标签填充容器
                 * @type <DOM, jQuery Object, Selector>
                 * @type <Function>
                 * @param self <Object> 组件实例对象
                 * @param target <jQuery Object> 调用组件对象
                 * @return <Selector, DOM, jQuery Object>
                 */
                container:null,
                /**
                 * @func 关闭按钮内容
                 * @type <String>
                 */
                close:'',
                /**
                 * @func 设置标签数据
                 * @type <Function>
                 * @param self <Object> 组件实例对象
                 * @param tags <jQuery Object> 标签元素对象
                 * @return 返回数组
                 */
                getData:null
            },
            /**
             * @func 设置多菜单
             * @type <Array>
             * [{
             *     title:'',
             *     content:'',
             *     active:true,
             *     onShow:function(){
             * 
             *     }
             * }]
             */
            tabs:null,
            /**
             * @func 
             * @type <Object>
             * {
             *     field:'name',
             *     like:/^\d/
             * }
             * @type <Array>
             * [{
             *     field:'name',
             *     like:/^\d/,
             *     like:'^{value}',
             *     like:function(data, value){
             *          return data.indexOf(value) !== -1
             *     }
             * }]
             */
            match:null,
            /**
             * @func 定义选中列表后的文本框内容
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param data <Object> 当前选中数据
             * @return <String> 返回自定义填充值
             * @desc 未设置该值时，默认取field中的数据
             */
            setValue:null,
            /**
             * @func 列表渲染时判断某一行是否被选中
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param data <Object> 列表选中数据
             * @return <Boolean> 
             */
            selected:null,
            /**
             * @func 过滤数据
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @return <Array> 返回过滤后的数组
             */
            filter:null,
            /**
             * @func 请求返回数据时触发回调
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param response <Anything> 接口返回数据
             * @return <Array> 返回列表数据
             */
            onRequest:null,
            /**
             * @func 选择前触发回调
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param data <Object> 选中项数据
             * @param event <Object> 事件对象
             * @param elem <jQuery Object> 选中项对象
             * @return <Boolean> 返回false则不会触发setValue以及onSelect
             */
            onSelectBefore:null,
            /**
             * @func 选择后触发回调
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param data <Object> 选中项数据
             * @param event <Object> 事件对象
             * @param elem <jQuery Object> 选中项对象
             */
            onSelect:null,
            /**
             * @func 输入框失焦后触发
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param target <jQuery Object> 调用组件对象
             */
            onBlur:null
        },
        _template:{
            wrap:
                '<div class="<% className %>"<%if style%> style="<%include \'style\'%>"<%/if%>>'+
                    '<div class="com-search-body<%if tabs.length > 1%> com-search-body-tab<%/if%>">'+
                        '<%include "tabs"%>'+
                        '<div class="com-search-inner">'+
                            '<%each tabs%>'+
                                '<div class="com-search-content<%if $index === 0%> com-search-result<%/if%>" style="display:none;"></div>'+
                            '<%/each%>'+
                        '</div>'+
                    '</div>'+
                    '<%include "foot"%>'+
                '</div>',
            result:
                '<%if data && data.length%>'+
                    '<%if head && value%>'+
                        '<div class="com-search-detail">'+
                            '<%include "head"%>'+
                            '<%include "list"%>'+
                        '</div>'+
                    '<%else%>'+
                        '<%include "list"%>'+
                    '<%/if%>'+
                '<%elseif value%>'+
                    '<%include "empty"%>'+
                '<%/if%>',
            list:
                '<ul class="com-search-list">'+
                    '<%each data $data $index%>'+
                        '<%include "item"%>'+
                    '<%/each%>'+
                '</ul>',
            tabs:
                '<%if tabs.length > 1%>'+
                    '<div class="com-search-tab">'+
                        '<%each tabs tab%>'+
                            '<span class="com-search-tab-nav"<%if $index === 0%> style="display:none;"<%/if%>><%tab.title%></span>'+
                        '<%/each%>'+
                    '</div>'+
                '<%/if%>',
            tag:
                '<span class="nui-tag">'+
                    '<em class="nui-tag-text"<%if title%> title="<%text%>"<%/if%>><%text%></em>'+
                    '<%if close%>'+
                    '<b class="nui-tag-close"><%close%></b>'+
                    '<%/if%>'+
                    '<%if fields?? && fields%>'+
                        '<%each fields%>'+
                            '<input type="hidden" class="com-search-hidden" name="<%$index%>" value="<%$value%>">'+
                        '<%/each%>'+
                    '<%/if%>'+
                '</span>'
        },
        _events:{
            'mouseenter':'_searchMouseover',
            'mouseleave':'_searchMouseout',
            'mouseenter .com-search-item':'_searchMouseover _itemMouseover',
            'mouseleave .com-search-item':'_itemMouseout',
            'click .com-search-item':'_select',
            'click .com-search-tab-nav':'_toggle'
        },
        _toggle:function(e, elem){
            var self = this, opts = self._options, index = elem.index();
            if(index < 0){
                index = 0
            }
            var data = self._elemData[index];
            var container = data.$container;
            if(!container.is(':visible')){
                if(index !== 0){
                    if(container.is(':empty') && data.content){
                        var content = '';
                        if(typeof data.content === 'function'){
                            content = data.content.call(opts, self, elem, container)
                        }
                        else{
                            content = data.content
                        }
                        if(content === false){
                            return
                        }
                        else if(typeof content === 'string'){
                            container.html(content)
                        }
                    }
                }
                elem.addClass('s-crt');
                container.show();
                Nui.each(self._elemData, function(v, i){
                    if(i !== index){
                        v.$elem.removeClass('s-crt')
                        v.$container.hide()
                    }
                })
                if(typeof data.onShow === 'function'){
                    data.onShow.call(opts, self, elem, container)
                }
                self._activeTab = data;
            }
        },
        _searchMouseover:function(e, elem){
            this._hover = true
        },
        _searchMouseout:function(e, elem){
            delete this._hover;
        },
        _itemMouseover:function(e, elem){
            this._activeItem = elem.addClass('s-hover');
            this._activeIndex = this._activeItem.data('index');
        },
        _itemMouseout:function(e, elem){
            elem.removeClass('s-hover')
        },
        _select:function(e){
            var self = this, opts = self._options, data = self.queryData[self._activeIndex], args = [data, e, this._activeItem], value = '';
            if(self._callback('SelectBefore', args) === false){
                return false
            }

            if(typeof opts.setValue === 'function'){
                value = opts.setValue.call(opts, self, data)
            }
            else if(opts.field){
                value = data[opts.field]
            }

            self.value(value);
            self.hide();
            self._callback('Select', args);
        },
        _match:function(data){
            var self = this, opts = self._options, match = false;
            Nui.each(self._matchs, function(val){
                var field = val.field, like = val.like, fieldValue;
                if(field && like && (fieldValue = data[field])){
                    if(Nui.type(like, 'RegExp') && fieldValue.match(like)){
                        match = true
                    }
                    else if(typeof like === 'string'){
                        like = like.replace(/\{value\}/g, self.val);
                        if(fieldValue.match(new RegExp(like))){
                            match = true
                        }
                    }
                    else if(typeof like === 'function'){
                        match = !!like(fieldValue, self.val)
                    }
                    if(match){
                        return false
                    }
                }
            })
            return match
        },
        _storage:function(data){
            var self = this, opts = self._options;
            if(!Nui.type(data, 'Array')){
                data = []
            }
            if(opts.cache === true){
                self._caches[self.val] = data
            }
            self.queryData = data;
            self.show(true)
        },
        _filter:function(){
            var self = this, opts = self._options, data = [], _data = self._setData();
            if(typeof opts.filter === 'function'){
                data = opts.filter.call(opts, self, self.val, _data);
            }
            else if(_data.length && self._matchs && self._matchs.length){
                Nui.each(_data, function(val){
                    if(self._match(val)){
                        data.push(val)
                    }
                })
            }
            else{
                data = _data
            }
            self._storage(data)
        },
        _request:function(){
            var self = this, opts = self._options, data = {}, value = self.val;
            if(opts.query && typeof opts.query === 'string'){
                data[opts.query] = value
            }
            else if(typeof opts.query === 'function'){
                var ret = opts.query.call(opts, self, value);
                if(ret){
                    if(typeof ret === 'object'){
                        data = ret
                    }
                    else if(typeof ret === 'string'){
                        data[ret] = value
                    }
                }
            }
            
            var success;
            if(typeof opts.ajax === 'function'){
                success = opts.ajax.success;
                delete opts.ajax.success
            }

            clearTimeout(self._timer);

            if(self._ajax){
                self._ajax.abort()
            }

            self._timer = setTimeout(function(){
                self._ajax = jQuery.ajax(jQuery.extend(true, {
                    url:opts.url,
                    data:data,
                    type:'get',
                    dataType:'json',
                    cache:false,
                    async:true,
                    success:function(res, status, xhr){
                        var _data = res;
                        if(typeof success === 'function'){
                            success.call(this, res, status, xhr)
                        }
                        if(typeof opts.onRequest === 'function'){
                            _data = opts.onRequest.call(opts, self, res)
                        }
                        self._storage(_data);
                    }
                }, opts.ajax||{}))
            }, 50)
        },
        //按上
        _code38:function(){

        },
        //按下
        _code40:function(){
            
        },
        //回车
        _code13:function(e){
            // var self = this;
            // if(self._activeIndex !== undefined){
            //     self._select(e)
            // }
        },
        //删除
        _code8:function(e){
            var self = this;
            //光标位置在输入框起始处时删除末尾的标签
            if(self.$tags && self.$tags.length && self._tag.dele === true && !util.getFocusIndex(self.target.get(0))){
                self.$tags.last().remove();
                self._setTagsData();
                self._update();
                self.resize()
            }
        },
        _bindEvent:function(){
            var self = this, opts = self._options;
            self._on('keyup', self.target, function(e, elem){
                if(self.val = Nui.trim(elem.val())){
                    var cache;
                    if(self.val && opts.cache === true && (cache = self._caches[self.val])){
                        self._storage(cache);
                    }
                    else if(opts.url){
                        self._request()
                    }
                    else{
                        self._filter()
                    }
                }
                else{
                    self.show(true)
                }
            })

            self._on('click', self.target, function(e, elem){
                if(!self._show){
                    self.target.focus()
                }
            })

            //若失去焦点但是悬停在组件相关的元素上，则不允许失去焦点
            self._on('blur', self.target, function(e, elem){
                if(!self._hover){
                    self._callback('Blur', [elem])
                    self.hide()
                }
                else{
                    elem.focus()
                }
            })

            if(opts.focus === true){
                self._on('focus', self.target, function(e, elem){
                    self.show()
                })
            }

            self._on('keydown', self.target, function(e, elem){
                if(self._show === true){
                    var method = self['_code'+e.keyCode];
                    if(typeof method === 'function'){
                        method.call(self, e);
                        e.stopPropagation()
                    }
                }
            })

            if(self.$tagContainer){
                self._on('mouseover', self.$tagContainer, '.nui-tag', function(){
                    if(self._show){
                        self._hover = true
                    }
                })
                self._on('mouseout', self.$tagContainer, '.nui-tag', function(){
                    delete self._hover
                })
                self._on('click', self.$tagContainer, '.nui-tag-close', function(e, elem){
                    elem.closest('.nui-tag').remove();
                    self._setTagsData();
                    delete self._hover;
                    if(!self._show){
                        self.target.focus()
                    }
                    else{
                        self._update();
                        self.resize()
                    }
                })
            }
        },
        _create:function(){
            var self = this, data = self._tplData(), opts = self._options;
            data.style = opts.style || {};
            data.style.display = 'none';
            if(data.style['z-index'] === undefined){
                data.style['z-index'] = opts.zIndex || 0
            }
            self._elemData = [{
                title:'结果'
            }];
            if(Nui.isArray(opts.tabs) && opts.tabs.length){
                self._isTab = true;
                self._elemData = self._elemData.concat(opts.tabs);
            }
            data.tabs = self._elemData;
            self.element = $(self._tpl2html('wrap', data)).appendTo(self.$container);
            self._setElemData();

            self.$body = self.element.children();
            self.$inner = self.$body.children('.com-search-inner');
            self.$result = self.$inner.children('.com-search-result');

            self._elemData[0].$elem = $();
            self._elemData[0].$container = self.$result;
            
            if(self._isTab){
                var tabs = self.$body.children('.com-search-tab').children();
                var containers = self.$inner.children();
                Nui.each(self._elemData, function(v, i){
                    v.$elem = tabs.eq(i);
                    v.$container = containers.eq(i);
                    if(!self._defaultTab && v.active === true){
                        self._defaultTab = v
                    }
                })
                //没有设置默认显示标签则取第一个
                if(!self._defaultTab){
                    self._defaultTab = self._elemData[1]
                }
            }
            
            self._event()
        },
        _initTemplate:function(name){
            var self = this, opts = self._options, content = opts[name];
            if(typeof content === 'function'){
                content = content.call(opts, self)
            }

            if(typeof content !== 'string'){
                if(name === 'item' && opts.field){
                    content = '<li class="com-search-item<%selected($data)%>" data-index="<%$index%>"><%$data["'+ opts.field +'"]??%></li>'
                }
                else{
                    content = ''
                }
            }
            else if(name === 'item' && content && !/^\s*\<li\s+/i.test(content)){
                content = '<li class="com-search-item<%selected($data)%>" data-index="<%$index%>">'+ content +'</li>'
            }

            if(name !== 'item' && content){
                content = '<div class="com-search-'+ name +'">'+ content +'</div>'
            }

            self._template[name] = content;
        },
        _setData:function(){
            var self = this, opts = self._options, data = opts.data;
            if(typeof opts.data === 'function'){
                data = opts.data.call(opts, self)
            }

            if(!Nui.type(data, 'Array')){
                data = []
            }

            return self.data = data
        },
        _setElemData:function(){
            var self = this, elem = self.element, _class = self.constructor;
            self.elementData = {
                btbWidth:_class._getSize(elem, 'tb', 'border'),
                blrWidth:_class._getSize(elem, 'lr', 'border'),
                ptbWidth:_class._getSize(elem, 'tb', 'padding'),
                plrWidth:_class._getSize(elem, 'lr', 'padding')
            }
        },
        _setTargetData:function(){
            var self = this, target = self.target, _class = self.constructor;
            self.targetData = {
                width:target.width(),
                height:target.height(),
                oWidth:target.outerWidth(),
                oHeight:target.outerHeight(),
                blWidth:_class._getSize(target, 'l', 'border'),
                brWidth:_class._getSize(target, 'r', 'border'),
                btWidth:_class._getSize(target, 't', 'border'),
                bbWidth:_class._getSize(target, 'b', 'border')
            }
        },
        _setTagsData:function(){
            var self = this, opts = self._options;
            self.$tags = self.$tagContainer.children();
            self.tagData = [];
            if(typeof self._tag.getData === 'function'){
                self.tagData = self._tag.getData.call(opts, self, self.$tags)
            }
            else{
                self.$tags.each(function(){
                    self.tagData.push($(this).children('.nui-tag-text').text())
                })
            }
            if(!Nui.type(self.tagData, 'Array')){
                self.tagData = []
            }
        },
        _initData:function(){
            var self = this, opts = self._options, data = opts.data, match = opts.match;
            self._caches = {};

            self.queryData = [];

            self.data = [];

            self._setTargetData();

            self._size = opts.size || {};

            self._offset = opts.offset || {};

            self._isTab = false;

            self._defaultTab = null;

            Nui.each(['item', 'empty', 'head', 'foot'], function(name){
                self._initTemplate(name);
            })

            if(match && Nui.type(match, 'Object')){
                match = [match]
            }

            if(Nui.type(match, 'Array')){
                self._matchs = match
            }
        },
        _getSelected:function(){
            var self = this, opts = self._options;
            var selected = function(){
                return '';
            }
            if(typeof opts.selected === 'function'){
                selected = function(data){
                    if(opts.selected.call(opts, self, data) === true){
                        return ' s-crt'
                    }
                    return ''
                }
            }
            else if(opts.field){
                selected = function(data){
                    var cls = '';
                    if(self.tagData){
                        Nui.each(self.tagData, function(v){
                            if(data[opts.field] === v){
                                cls = ' s-crt';
                                return false
                            }
                        })
                    }
                    else if(self.val && data[opts.field] === self.val){
                        cls = ' s-crt'
                    }
                    return cls;
                }
            }
            return selected
        },
        _render:function(input){
            var self = this, opts = self._options, _class = self.constructor, result = self._elemData[0];
            result.$elem.hide();
            result.$container.hide();
            _class._active = self;
            //输入的时候才会显示
            if((self._isTab && self.val && input) || !self._isTab){
                self.$result.html(self._tpl2html('result', {
                    data:self.queryData,
                    value:self.val,
                    selected:self._getSelected(),
                    head:!!self._template.head
                }));
                result.$elem.show();
                if(self._defaultTab){
                    self._defaultTab.$elem.hide()
                }
                self._toggle(null, result.$elem)
            }
            else if(self._defaultTab){
                self._toggle(null, self._defaultTab.$elem.show())
            }
            self.element.show();
            self._show = true;
            self.resize()
        },
        _exec:function(){
            var self = this, opts = self._options, _class = self.constructor, tagContainer;
            self.$container = _class._jquery(opts.container);
            if(self._getTarget() && (self.$container = _class._jquery(opts.container))){
                self._tag = opts.tag;
                if(typeof self._tag !== 'object'){
                    self._tag = {}
                }
                if(typeof self._tag.container === 'function'){
                    tagContainer = _class._jquery(self._tag.container.call(opts, self, self.target))
                }
                else{
                    tagContainer = _class._jquery(self._tag.container)
                }
                if(self.$tagContainer = tagContainer){
                    self._setTagsData();
                }
                self._initData();
                self._bindEvent();
            }
        },
        _update:function(){
            var self = this, opts = self._options;
            if(self._activeTab && typeof self._activeTab.onShow === 'function'){
                self._activeTab.onShow.call(opts, self, self._activeTab.$elem, self._activeTab.$container)
            }
        },
        resize:function(){
            var self = this, opts = self._options, target = self.target, elem = self.element, targetData = self.targetData, elemData = self.elementData,
            width = 0, oWidth = elem.outerWidth(), oHeight = elem.outerHeight(), offset = target.offset(), top = offset.top, left = offset.left,
            _class = self.constructor, wWidth = Nui.win.width(), wHeight = Nui.win.height();

            top = top + targetData.oHeight - targetData.bbWidth + (self._offset.top||0);
            left = left + (self._offset.left||0);
            width = targetData.oWidth - elemData.blrWidth - elemData.plrWidth + (self._size.width || 0);

            //内容在可视区域底部显示不全，则在输入框上方显示
            var diff = wHeight - top - oHeight;
            if(diff < 0){
                var _top = offset.top - oHeight - (self._offset.top||0) + targetData.btWidth;
                if(_top >= 0){
                    top = _top
                }
            }

            //内容在可视区域右侧显示不全，则与输入框居右对齐
            diff = wWidth - left - targetData.oWidth - (self._size.width || 0);
            if(diff < 0){
                diff = targetData.oWidth + (self._size.width || 0) - targetData.oWidth;
                if(diff > 0){
                    var _left = offset.left - diff;
                    if(_left >= 0){
                        left = _left
                    }
                }
            }

            self.element.css({
                top:top,
                left:left,
                width:width
            })
        },
        show:function(input){
            var self = this, opts = self._options, _class = self.constructor;
            self.val = Nui.trim(this.target.val());
            if(self._hover && !input){
                return
            }
            if(_class._active && _class._active !== self){
                _class._active.hide()
            }
            else if(opts.nullable !== true && !self.val){
                self.hide()
            }
            else{
                if(!self.element){
                    self._create()
                }
                //文本框没内容，还原默认数据
                if(!self.val && opts.nullable === true){
                    if(!opts.url){
                        self.queryData = self._setData()
                    }
                    else{
                        self.queryData = []
                    }
                }
                
                self._render(input);
            }
        },
        hide:function(){
            var self = this, _class = self.constructor;
            delete self._hover;
            delete self._show;
            if(_class._active === self){
                delete _class._active
            }
            if(self.element){
                self.element.hide()
            }
        },
        /**
         * @func 设置文本框内容值或者添加tag标签
         * @param <String>
         * @param <Object>
         * {
         *     text:'',
         *     fields:{
         *         field1:value1,
         *         field2:value2,
         *         ...
         *     }
         * }
         */
        value:function(val){
            var self = this, target = self.target, opts = self._options, name = self.constructor.__component_name;
            if(target){
                if(typeof val === 'string'){
                    val = Nui.trim(val)
                }
                if(self.$tagContainer && val){
                    var data = {}, exist = false;
                    if(typeof val === 'object'){
                        data = val;
                        if(data.text){
                            data.text = Nui.trim(data.text);
                        }
                    }
                    else{
                        data.text = val
                    }
                    if(opts.tag.multiple === true){
                        self.$tags.each(function(){
                            var $elem = $(this), text = Nui.trim($elem.children('.nui-tag-text').text());
                            if(data.text === text){
                                $elem.remove();
                                exist = true;
                                return false
                            }
                        })
                    }
                    else{
                        self.$tags.remove()
                    }
                    if(!exist && data.text){
                        data.title = self._tag.title || false;
                        data.close = self._tag.close || false;
                        self.$tagContainer.append(self._tpl2html('tag', data))
                    }
                    self._setTagsData();
                    self.value('');
                    self._update();
                    self.resize()
                }
                else{
                    var dom = target.get(0), obj;
                    if(dom && dom.nui){
                        Nui.each(dom.nui, function(v, k){
                            if(k !== name && typeof v.value === 'function' && v._setStyle && v._createRules){
                                obj = v;
                                return false
                            }
                        })
                    }
                    if(obj){
                        obj.value(val)
                    }
                    else{
                        target.val(val)
                    }
                }
            }
        }
    })
}); 