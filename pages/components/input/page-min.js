;(function(__define){
    function __requireDefaultModule(module){
        if(module && module.defaults !== undefined){
            return module.defaults
        }
        return module
    }
/**
 * @author Aniu[2016-11-11 16:54]
 * @update Aniu[2016-11-11 16:54]
 * @version 1.0.1
 * @description 实用工具集
 */

__define('lib/core/util',{
    
    /**
     * @func 常用正则表达式
     */
    regex:{
        //手机
        mobile:/^0?1[3-9][0-9]{9}$/,
        //电话
        tel:/^[0-9-()（）]{7,18}$/,
        //邮箱
        email:/^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
        //身份证
        idcard:/^\d{17}[\d|x]|\d{15}$/,
        //中文
        cn:/^[\u4e00-\u9fa5]+$/,
        //税号
        taxnum:/^[a-zA-Z0-9]{15,20}$/
    },

    /**
     * @func 四舍五入保留小数，原生toFixed会有精度问题
     * @return <String>
     * @param digit <String, Number> 待转换数字
     * @param decimal <Number> 保留位数
     * @param number <Number> 小数部分末尾最多显示0的数量
     */
    toFixed:function(digit, decimal, number){
        if(isNaN(digit) || digit === ''){
            return digit
        }

        //默认末尾只保留2个0
        if(number === undefined){
            number = 2
        }

        decimal = decimal || 0;

        //将数字转换为字符串，用于分割
        var value = digit.toString();

        //补零
        var mend = function(num){
            var zero = '';
            while(num > 0){
                zero += '0';
                num--
            }
            return zero
        }

        //正负数
        var pre = '';
        if(value < 0){
            value = value.replace('-', '');
            pre = '-';
        }

        //获取小数点所在位置
        var i = value.indexOf('.');
        //存在小数点
        if(i !== -1 && decimal >= 0){
            var integer = parseInt(value.substr(0, i));
            //小数部分转为0.xxxxx
            var _decimal = '0' + value.substr(i);
            var num = '1' + mend(decimal);
            _decimal = (Math.round(_decimal*num)/num).toFixed(decimal);
            //小数四舍五入后，若大于等于1，整数部分需要加1
            if(_decimal >= 1){
                integer = (integer + 1).toString()
            }
            value = pre + integer + _decimal.substr(1)
        }
        //整数就直接补零
        else if(decimal > 0){
            value = pre + value + '.' + mend(decimal)
        }

        if(number !== null && number >= 0 && number < decimal){
            value = value.replace(/0+$/, '');
            var i = value.indexOf('.'), len = 0;
            if(i !== -1){
                len = value.substr(i+1).length;
            }
            while(len < number){
                value = value + '0';
                len++;
            }
            value = value.replace(/\.$/, '');
        }
        
        return value
    },

    /**
     * @func 获取url参数值
     * @return <String, Object>
     * @param name <String, Undefined> 参数名，不传则以对象形式返回全部参数
     * @param urls <String, Undefined> url地址，默认为当前访问地址
     */
    getParam:function(name, urls){
        var url = decodeURI(urls||location.href), value = {};
        startIndex = url.indexOf('?');
        if(startIndex++ > 0){
            var param = url.substr(startIndex).split('&'), temp;
            Nui.each(param, function(val){
                temp = val.split('=');
                value[temp[0]] = temp[1];
            });
        }
        if(typeof name === 'string' && name){
            value = (temp = value[name]) !== undefined ? temp : '';
        }
        return value;
    },

    /**
     * @func 设置url参数值
     * @return <String> 设置后的url
     * @param name <String, Object> 参数名或者{key:value, ...}参数集合
     * @param value <String> 参数值或者url
     * @param urls <String, Undefined> url，没有则获取浏览器url
     */
    setParam:function(name, value, urls){
        var self = this, url;
        if(Nui.type(name, 'Object')){
            url = value||location.href;
            Nui.each(name, function(val, key){
                if(val || val === 0){
                    url = self.setParam(key, val, url);
                }
            });
        }
        else{
            url = urls||location.href;
            if(url.indexOf('?') === -1){
                url += '?';
            }
            if(url.indexOf(name+'=') !== -1){
                var reg = new RegExp('('+name+'=)[^&]*');
                url = url.replace(reg, '$1'+value);
            }
            else{
                var and = '';
                if(url.indexOf('=') !== -1){
                    and = '&';
                }
                url += and+name+'='+value;
            }
        }
        return url;
    },

    /**
     * @func 检测浏览器是否支持CSS3属性
     * @return <Boolean>
     * @param style <String> 样式属性
     */
    supportCss3:function(style){
        var prefix = ['webkit', 'Moz', 'ms', 'o'],
            i, humpString = [],
            htmlStyle = document.documentElement.style,
            _toHumb = function (string) {
                return string.replace(/-(\w)/g, function ($0, $1) {
                    return $1.toUpperCase();
                });
            };
        for (i in prefix)
            humpString.push(_toHumb(prefix[i] + '-' + style));
        humpString.push(_toHumb(style));
        for (i in humpString)
            if (humpString[i] in htmlStyle) return true;
        return false;
    },

    /**
     * @func 检测浏览器是否支持Html5属性
     * @return <Boolean>
     * @param attr <String> 属性
     * @param element <String> DOM元素标签
     */
    supportHtml5:function(attr, element){
        return attr in document.createElement(element);
    },

    /**
     * @func 模拟location.href跳转
     * @return <Undefined>
     * @param url <String> 跳转的url
     * @param target <String> 跳转类型，默认为_self
     */
    location:function(url, target){
        if(url){
            jQuery('<a href="'+ url +'"'+ (target ? 'target="'+ (target||'_self') +'"' : '' ) +'><span></span></a>')
                .appendTo('body').children().click().end().remove();
        }
    },

    /**
     * @func 格式化日期
     * @return <String>
     * @param timestamp <String, Number> 时间戳，为空返回横杠“-”
     * @param format <String, Undefined> 输出格式，为空则返回时间戳
     */
    formatDate:function(timestamp, format){
        if(timestamp = parseInt(timestamp)){
            if(!format){
                return timestamp;
            }
            var date = new Date(timestamp);
            var map = {
                'M':date.getMonth()+1,
                'd':date.getDate(),
                'h':date.getHours(),
                'm':date.getMinutes(),
                's':date.getSeconds()
            }
            format = format.replace(/([yMdhms])+/g, function(all, single){
                var value = map[single];
                if(value !== undefined){
                    if(all.length > 1){
                       value = '0' + value;
                       value = value.substr(value.length-2);
                   }
                   return value;
                }
                else if(single === 'y'){
                    return (date.getFullYear() + '').substr(4-all.length);
                }
                return all;
            });
            return format;
        }
        return '-';
    },

    /**
     * @func 获取表单数据集合
     * @return <Object>
     * @param element <jQuery Object> 表单元素集合或者form元素
     * @param item <String> 将name相同表单元素值分隔，当设置为jquery选择器时，配合field参数使用，用于获取item中表单元素的数据集合
     * @param field <String> 字段名，配合item参数使用，返回对象中会包含该字段
     * @example
     * <form id="form">
     *  <input type="hidden" name="name0" value="0">
     * <div>
     *  <input type="hidden" name="name1" value="1">
     *  <input type="hidden" name="name2" value="2">
     * </div>
     * <div>
     *  <input type="hidden" name="name1" value="3">
     *  <input type="hidden" name="name2" value="4">
     * </div>
     * <form>
     * getData($('#form'), 'div', 'list').result => 
     * {
     *  name0:'0',
     *  list:[{
     *      name1:'1',
     *      name2:'2'
     *  }, {
     *      name1:'3',
     *      name2:'4'
     *  }]
     * }
     */
    getData:function(element, item, field){
        var that = this;
    	var data = {
    		'result':{},
    		'voids':0, //字段中空值数量
            'total':0 //总计多少个字段
        }
        if(element.length){
            var arr = element.serializeArray();
            if(!arr.length){
                arr = element.find('[name]').serializeArray();
            }
            var div = ',';
            if(item && typeof item === 'string' && !field){
                div = item
            }
            Nui.each(arr, function(v, i){
                var val = Nui.trim(v.value)
                data.total++;
                if(!val){
                    data.voids++
                }
                var name = v.name;
                if(!Nui.isArray(data.result[name])){
                    data.result[name] = [];
                }
                data.result[name].push(val)
            })
            Nui.each(data.result, function(v, k){
                data.result[k] = v.join(div)
            })
            if(item && field){
                var once = false;
                data.result[field] = [];
                element.find(item).each(function(){
                    var result = that.getData($(this).find('[name]')).result;
                    if(item !== true && !once){
                        Nui.each(result, function(v, k){
                            delete data.result[k];
                        });
                        once = true
                    }
                    data.result[field].push(result)
                })
            }
        }
        return data;
    },
    /**
     * @func 获取输入框内光标位置
     * @return <Number>
     * @param element <DOM Object> 表单元素dom对象
     */
    getFocusIndex:function(element){
        var val = Nui.trim(element.value);
        var index = val.length;
        if(element.setSelectionRange){
            index = element.selectionStart;
        }
        else{
            //ie
            try{
                var temp = document.selection.createRange();
                var textRange = element.createTextRange();
                textRange.setEndPoint('endtoend', temp);
                index = textRange.text.length;
            }
            catch(e){}
        }
        return index;
    },
    /**
     * @func 检测页面是否有文本被选择
     * @return <Boolean>
     */
    isTextSelect:function(){
        var text = '';
        //ie10以及以下浏览器
        if(document.selection){
            text =  document.selection.createRange().text;
        }
        //火狐和ie11浏览器getSelection无法获取表单元素选中文本
        else if(navigator.userAgent.toLowerCase().indexOf('gecko') !== -1){
            var textArea = document.activeElement;
            text = textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
        }
        //chrome safari opera
        else if(window.getSelection){
            text = window.getSelection().toString();
        }
        //低版本chrome
        else if(document.getSelection){
            text = document.getSelection().toString();
        }
        return !!text;
    },
    /**
     * @func 检测是否需要安装PDF阅读器
     * @return <Boolean>
     */
    isInstallPDF:function(){
        var i, len;

        var flag = true;

        if(Nui.browser.webkit || (Nui.browser.mozilla && Nui.browser.version > 19)){
            flag = false;
        }

        if(navigator.plugins && (len = navigator.plugins.length)){
            for(i = 0; i < len; i++){
                if(/Adobe Reader|Adobe PDF|Acrobat|Chrome PDF Viewer/.test(navigator.plugins[i].name)){
                    flag = false;
                    break;
                }
            }
        }
        try{
            if(window.ActiveXObject || window.ActiveXObject.prototype){
                for(i = 1; i < 10; i++){
                    try{
                        if(eval("new ActiveXObject('PDF.PdfCtrl." + i + "');")){
                            flag = false;
                            break;
                        }
                    }
                    catch(e){
                        flag = true;
                    }
                }

                var arr = ['PDF.PdfCtrl', 'AcroPDF.PDF.1', 'FoxitReader.Document', 'Adobe Acrobat', 'Adobe PDF Plug-in'];
                len = arr.length;
                for(i = 0; i < len; i++){
                    try{
                        if(new ActiveXObject(arr[i])){
                            flag = false;
                            break;
                        }

                    }
                    catch(e){
                        flag = true;
                    }
                }
            }
        }
        catch(e){}

        return flag;
    },
    /**
     * @func 检测是否需要安装flash，没有安装则返回安装路径
     * @return <Boolean, String>
     */
    isInstallFlash:function(){
        if(typeof window.ActiveXObject != 'undefined'){
            try{
                if(!!new ActiveXObject('ShockwaveFlash.ShockwaveFlash')){
                    return false
                }
            }
            catch(e){}
        }
        else{
            if(!!navigator.plugins['Shockwave Flash']){
                return false
            }
        }
        if(Nui.browser.msie){
            return 'http://rj.baidu.com/soft/detail/17153.html'
        }
        else{
            return 'http://rj.baidu.com/soft/detail/15432.html'
        }
    },
    /**
     * @func 将数字转换为逗号千分位分隔
     * @param number <String> 数字
     * @return <String>
     */
    formatNumber:function(number){
        var integer = parseInt(number);
        if(!isNaN(integer) && integer && (number = number.toString())){
            var dot = number.indexOf('.');
            var decimal = '';
            if(dot > 0){
                decimal = number.substr(dot);
            }
            return integer.toLocaleString().replace(/\.\d+$/, '') + decimal
        }
        return number
    },
    /**
     * @func 将数字转换为中文大写
     * @param number <String> 数字
     * @return <String>
     */
    numberToCN:function(number){
        //汉字的数字
        var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
        //基本单位
        var cnIntRadice = new Array('', '拾', '佰', '仟');
        //对应整数部分扩展单位
        var cnIntUnits = new Array('', '万', '亿', '兆');
        //对应小数部分单位
        var cnDecUnits = new Array('角', '分', '毫', '厘');
        //整数金额时后面跟的字符
        var cnInteger = '整';
        //整型完以后的单位
        var cnIntLast = '元';
        //最大处理的数字
        var maxNum = 999999999999999.9999;
        //金额整数部分
        var integerNum;
        //金额小数部分
        var decimalNum;
        //输出的中文金额字符串
        var chineseStr = '';
        //分离金额后用的数组，预定义
        var parts;
        if (number == '') { return ''; }
        var isMinus = number < 0;
        number = Math.abs(parseFloat(number));
        if (number >= maxNum) {
            //超出最大处理数字
            return '';
        }
        if (number == 0) {
            chineseStr = cnNums[0] + cnIntLast + cnInteger;
            return chineseStr;
        }
        //转换为字符串
        number = number.toString();
        if (number.indexOf('.') == -1) {
            integerNum = number;
            decimalNum = '';
        } else {
            parts = number.split('.');
            integerNum = parts[0];
            decimalNum = parts[1].substr(0, 4);
        }
        //获取整型部分转换
        if (parseInt(integerNum, 10) > 0) {
            var zeroCount = 0;
            var IntLen = integerNum.length;
            for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == '0') {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                chineseStr += cnNums[0];
                }
                //归零
                zeroCount = 0;
                chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
                chineseStr += cnIntUnits[q];
            }
            }
            chineseStr += cnIntLast;
        }
        //小数部分
        if (decimalNum != '') {
            var decLen = decimalNum.length;
            for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n != '0') {
                chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
            }
        }
        if (chineseStr == '') {
            chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == '') {
            chineseStr += cnInteger;
        }
        if(isMinus){
            chineseStr = '负' + chineseStr
        }
        return chineseStr;
    }
})

/**
 * @author Aniu[2016-11-11 16:54]
 * @update Aniu[2016-01-12 04:33]
 * @version 1.0.2
 * @description 模版引擎
 */

__define('lib/core/template',['lib/core/util'], function(util){

    var template = function(tplid, data, opts){
        if(this.tplid = tplid){
            if(caches[tplid]){
                return render.call(this, caches[tplid], data, opts)
            }
            var ele = document.getElementById(tplid);
            if(ele && ele.nodeName==='SCRIPT' && ele.type === 'text/html'){
                return render.call(this, caches[tplid] = ele.innerHTML, data, opts)
            }
        }
        return ''
    }

    var caches = {};

    var options = {
        openTag:'<%',
        closeTag:'%>'
    }

    var methods = {
        trim:Nui.trim,
        formatDate:util.formatDate,
        formatNumber:util.formatNumber,
        setParam:util.setParam,
        toFixed:util.toFixed,
        numberToCN:util.numberToCN
    }

    var isstr = !!''.trim;

    var snippet = ';$that.out = function(){return $that.code';

    //低版本IE用push拼接字符串效率更高
    snippet = (isstr ? '""'+snippet : '[]'+snippet+'.join("")')+'}';

    var join = function(iscode){
        if(isstr){
            if(iscode){
                return function(code){
                    return '$that.code += '+code+';'
                }
            }
            return function(code, snippet){
                return code += snippet
            }
        }
        if(iscode){
            return function(code){
                return '$that.code.push('+code+');'
            }
        }
        return function(code, snippet){
            code.push(snippet);
            return code
        }
    }

    var joinCode = join(true);

    var joinSnippet = join();

    var replaceInclude = function(tpl, openTag, closeTag, opts){
        var that = this;
        var regs = openTag.replace(/([^\s])/g, '\\$1');
        var rege = closeTag.replace(/([^\s])/g, '\\$1');
        return tpl.replace(new RegExp(regs+'\\s*include\\s+[\'\"]([^\'\"]*)[\'\"]\\s*'+rege, 'g'), function(str, tid){
            if(tid){
                var tmp;
                Nui.each(tid.split('.'), function(attr){
                    tmp = (tmp||that)[attr];
                    if(tmp === undefined){
                        return false
                    }
                })
                if(typeof tmp === 'function'){
                    tmp = tmp()
                }
                if(typeof tmp === 'string'){
                    return render.call(that, tmp, null, opts)
                }
                else{
                    return template(tid, null, opts)
                }
            }
            return ''
        })
    }

    //部分浏览器中表单对象name属性如果和模版中需要使用的变量重名，而这个变量又不存在，返回值就会变成该dom....
    var isNode = typeof HTMLElement === 'object' ? 
    function(obj){
        return obj instanceof HTMLElement;
    } : 
    function(obj){
        return obj.nodeType === 1 && typeof obj.nodeName === 'string';
    };
    var isDom = function(obj){
        if(obj && typeof obj === 'object'){
            //元素集合
            var ele = obj[0];
            if(ele){
                return isNode(ele)
            }
            //元素
            return isNode(obj)
        }
    }

    var render = function(tpl, data, opts){
        var that = this;
        if(typeof tpl === 'string' && tpl){
            opts = opts || {};
            var openTag = opts.openTag || options.openTag, closeTag = opts.closeTag || options.closeTag;
            tpl = replaceInclude.call(that, tpl, openTag, closeTag);
            if(data && typeof data === 'object'){
                if(Nui.isArray(data)){
                    data = {
                        $list:data
                    }
                }
                var code = isstr ? '' : [];
                tpl = tpl.replace(/\s+/g, ' ');
                Nui.each(tpl.split(openTag), function(val, key){
                    val = val.split(closeTag);
                    if(key >= 1){
                        code = joinSnippet(code, compile(Nui.trim(val[0]), true))
                    }
                    else{
                        val[1] = val[0];
                    }
                    code = joinSnippet(code, compile(val[1].replace(/'/g, "\\'").replace(/"/g, '\\"')))
                });

                var variables = isstr ? '' : [];

                for(var k in data){
                    variables = joinSnippet(variables, k+'=$data.'+k+',')
                }

                if(!isstr){
                    code = code.join('');
                    variables = variables.join('');
                }

                code = 'var '+ variables +'$that=this,$method=$that.methods; $that.line=4; $that.code='+ snippet +';\ntry{\n' + code + ';}\ncatch(e){\n$that.error(e, $that.line)\n};';
                
                try{
                    var Rander = new Function('$data', code);
                    Rander.prototype.methods = methods;
                    Rander.prototype.error = error(code, data, that.tplid);
                    Rander.prototype.dom = isDom;
                    tpl = new Rander(data).out();
                    Rander = null
                }
                catch(e){
                    error(code, data, that.tplid)(e)
                }
                
            }
            return tpl
        }
        return ''
    }

    var error = function(code, data, tplid){
        return function(e, line){
            var msg = '\n';
            var codes = [];
            code = 'function anonymous($data){\n'+code+'\n}';
            code = code.split('\n');
            Nui.each(code, function(v, k){
                codes.push((k+1)+ '      ' +v.replace('$that.line++;', ''))
            })
            msg += 'code\n';
            msg += codes.join('\n')+'\n\n';
            if(typeof JSON !== undefined){
                msg += 'data\n';
                msg += JSON.stringify(data)+'\n\n'
            }
            if(tplid){
                msg += 'templateid\n';
                msg += tplid+'\n\n'
            }
            if(line){
                msg += 'line\n';
                msg += line+'\n\n'
            }
            msg += 'message\n';
            msg += e.message;
            console.error(msg)
        }
    }

    var compile = function(tpl, logic){
        if(!tpl){
            return ''
        }
        var code,res;
        if(logic){
            if((res = match(tpl, 'if')) !== undefined){
                code = 'if('+exists(res)+'){'
            }
            else if((res = match(tpl, 'elseif')) !== undefined){
                code = '\n}\nelse if('+exists(res)+'){'
            }
            else if(tpl === 'else'){
                code = '\n}\nelse{'
            }
            else if(tpl === '/if'){
                code = '}'
            }
            else if((res = match(tpl, 'each ', /\s+/)) !== undefined){
                code = 'Nui.each('+ res[0] +', function('+(res[1]||'$value')+','+(res[2]||'$index')+'){'
            }
            else if(tpl === '/each'){
                code = '});'
            }
            else if((res = match(tpl, ' | ', /\s*,\s*/)) !== undefined){
                var str = res[0];
                var i = str.lastIndexOf('(');
                var _call = '(' +exists(res.slice(1).toString()) +')';
                //赋值操作必须要用括号包裹起来
                if(i !== -1){
                    var start = str.substr(0, i);
                    var end = Nui.trimLeft(str.substr(i+1));
                    code = joinCode(start+'($that.methods.' + end + _call)
                }
                else{
                    code = joinCode('$that.methods.'+ str + _call)
                }
            }
            else if(/^(var|let|const|return|delete)\s+/.test(tpl)){
                code = exists(tpl)+';'
            }
            else{
                code = joinCode(exists(tpl, true))
            }
        }
        else{
            code = joinCode('\''+tpl+'\'')
        }
        return code + '\n' + '$that.line++;'
    }

    //判断变量是否存在
    //a.b??  a[b]??  a['b']??  a[b['c']]??
    var exists = function(code, isVal){
        return code.replace(/([\.\$\w]+\s*(\[[\'\"\[\]\w\.\$\s]+\])?)\?\?/g, function(a, b){
            var rep = '(typeof '+ b + '!=="undefined"&&'+ b +'!==null&&'+ b +'!==undefined&&!$that.dom('+ b +')';
            if(isVal){
                rep += '?' + b + ':' + '""';
            }
            return rep + ')'
        })
    }

    var match = function(str, syntax, regexp){
        var replace;
        if(str.indexOf(syntax) === 0){
            replace = ''
        }
        else if(syntax === ' | ' && str.indexOf(syntax) > 0){
            replace = ','
        }
        if(replace !== undefined){
            str = Nui.trimLeft(str.replace(syntax, replace));
            return regexp ? str.split(regexp) : str
        }
    }

    template.method = function(name, callback){
        if(!methods[name]){
            methods[name] = callback
        }
    }

    template.config = function(){
        var args = arguments;
        if(Nui.type(args[0], 'Object')){
            Nui.each(args[0], function(v, k){
                options[k] = v
            })
        }
        else if(args.length > 1 && typeof args[0] === 'string'){
            options[args[0]] = args[1]
        }
    }

    template.render = render;

    return template
})

__define('lib/core/events',function(){
    return function(opts){
        var self = this, that = opts || self,
            constr = that.constructor,
            isComponent = constr && constr.__component_name,
            elem = self.element || that.element || Nui.doc, 
            events = isComponent ? that._events : that.events;
        if(!elem || !events){
            return that
        }

        if(typeof events === 'function'){
            events = events.call(that)
        }

        if(!(elem instanceof jQuery)){
            elem = jQuery(elem)
        }

        var evt, ele, ret;
        var callback = function(e, elem, cbs){
            if(typeof cbs === 'function'){
                cbs.call(that, e, elem);
            }
            else{
                var _cb, _that;
                Nui.each(cbs, function(cb, i){
                    if(typeof (_cb = that[cb]) === 'function'){
                        _that = that;
                    }
                    else if(typeof (_cb = self[cb]) === 'function'){
                        _that = self;
                    }
                    if(_that){
                        return ret = _cb.call(_that, e, elem, ret);
                    }
                })
            }
        }

        Nui.each(events, function(cbs, evts){
            if(cbs && (typeof cbs === 'string' || typeof cbs === 'function')){
                if(typeof cbs === 'string'){
                    cbs = Nui.trim(cbs).split(/\s+/);
                }
                evts = Nui.trim(evts).split(/\s+/);
                // keyup:kupdown:focus a => elem.on('keyup kupdown focus', 'a', callback)
                evt = evts.shift().replace(/:/g, ' ');
                ele = evts.join(' ');
                //组件内部处理
                if(isComponent){
                    that._on(evt, elem, ele, function(e, elem){
                        callback(e, elem, cbs)
                    })
                }
                else{
                    elem.on(evt, ele, function(e){
                        callback(e, jQuery(this), cbs)
                    })
                }
            }
        })
        return that
    }
})
/**
 * @author Aniu[2016-11-11 16:54]
 * @update Aniu[2016-11-11 16:54]
 * @version 1.0.1
 * @description 组件基类
 */

__define('lib/core/component',['lib/core/template', 'lib/core/events'], function(tpl, events){
    var module = this;
    var require = this.require;
    var extend = this.extend;
    var callMethod = function(method, args, obj){
        //实参大于形参，最后一个实参表示id
        if(args.length > method.length){
            var id = args[args.length-1];
            if(id && Nui.type(id, ['String', 'Number']) && obj._options.id !== id && obj.__id !== id){
                return
            }
        }
        method.apply(obj, args)
    }
    //去除IE67按钮点击黑边
    if(Nui.bsie7){
        Nui.doc.on('focus', 'button, input[type="button"]', function(){
            this.blur()
        })
    }
    /**
     * 单和双下划线开头表示私有方法或者属性，只能在内部使用，
     * 单下划线继承后可重写或修改，双下划线为系统预置无法修改
     * 系统预置属性方法：__id, __instances, __eventList, __parent, __component_name, __setMethod
     */
    var statics = {
        //实例对象唯一标记
        __id:0,
        //实例对象容器
        __instances:{},
        /*
        * 将实例方法接口设置为静态方法，这样可以操作多个实例，
        * 默认有 init, option, reset, destroy
        * init表示初始化组件，会查询容器内包含属性为 data-组件名-options的dom元素，并调用组件
        */
        __setMethod:function(apis, components){
            var self = this;
            Nui.each(apis, function(val, methodName){
                if(self[methodName] === undefined){
                    self[methodName] = function(){
                        var self = this, args = arguments, container = args[0], name = self.__component_name;
                        if(name && name !== 'component'){
                            if(container && container instanceof jQuery){
                                if(methodName === 'init'){
                                    var mod = components[name];
                                    if(mod){
                                        container.find('[data-'+name+'-options]').each(function(){
                                            //不能重复调用
                                            if(this.nui && this.nui[name]){
                                                return
                                            }
                                            var elem = jQuery(this);
                                            var options = elem.data(name+'Options');
                                            var _mod;
                                            if(options && typeof options === 'string'){
                                                if(/^{[\s\S]*}$/.test(options)){
                                                    options = eval('('+ options +')');
                                                }
                                                else if(_mod = require(options, true)){
                                                    if(typeof _mod.exports === 'function'){
                                                        options = _mod.exports(elem)
                                                    }
                                                    else{
                                                        options = _mod.exports;
                                                    }
                                                }
                                            }
                                            if(typeof options !== 'object'){
                                                options = {};
                                            }
                                            mod(extend(options, {
                                                target:elem
                                            }))
                                        })
                                    }
                                }
                                else{
                                    container.find('[nui_component_'+ name +']').each(function(){
                                        var obj, method;
                                        if(this.nui && (obj = this.nui[name]) && typeof (method = obj[methodName]) === 'function'){
                                            callMethod(method, Array.prototype.slice.call(args, 1), obj)
                                        }
                                    })
                                }
                            }
                            else{
                                Nui.each(self.__instances, function(obj){
                                    var method = obj[methodName];
                                    if(typeof method === 'function'){
                                        callMethod(method, args, obj)
                                    }
                                })
                            }
                        }
                        else{
                            Nui.each(components, function(v, k){
                                if(k !== 'component' && typeof v[methodName] === 'function'){
                                    v[methodName].apply(v, args)
                                }
                            })
                        }
                    }
                }
            })
            return self
        },
        //对所有实例设置默认选项
        _options:{},
        //创建组件模块时会调用一次，可用于在document上绑定事件操作实例
        _init:jQuery.noop,
        _jquery:function(elem){
            if(!elem){
                return
            }
            if(elem instanceof jQuery){
                return elem
            }
            return jQuery(elem)
        },
        _getSize:function(selector, dir, attr){
            var size = 0;
            attr = attr || 'border';
            dir = dir || 'tb';
            if(attr === 'all'){
                return (this._getSize(selector, dir) + 
                        this._getSize(selector, dir, 'padding') +
                        this._getSize(selector, dir, 'margin'))
            }
            var group = {
                l:['Left'],
                r:['Right'],
                lr:['Left', 'Right'],
                t:['Top'],
                b:['Bottom'],
                tb:['Top', 'Bottom']
            }
            var arr = [{
                border:{
                    l:['LeftWidth'],
                    r:['RightWidth'],
                    lr:['LeftWidth', 'RightWidth'],
                    t:['TopWidth'],
                    b:['BottomWidth'],
                    tb:['TopWidth', 'BottomWidth']
                }
            }, {
                padding:group
            }, {
                margin:group
            }];
            Nui.each(arr, function(val){
                if(val[attr]){
                    Nui.each(val[attr][dir], function(v){
                        var value = parseFloat(selector.css(attr+v));
                        size += isNaN(value) ? 0 : value
                    });
                }
            });
            return size
        },
        _$fn:function(name, module){
            jQuery.fn[name] = function(){
                var args = arguments;
                return this.each(function(){
                    var object, options = args[0];
                    var execMethod = function(){
                        if(typeof options === 'string'){
                            
                            if(options === 'options'){
                                object.option(args[1], args[2])
                            }
                            else if(options.indexOf('_') !== 0){
                                var attr = object[options];
                                
                                if(typeof attr === 'function'){
                                    attr.apply(object, Array.prototype.slice.call(args, 1))
                                }
                            }
                        }
                    }
                    if(this.nui && (object = this.nui[name])){
                        execMethod()
                    }
                    else if(!object){
                        if(Nui.type(options, 'Object')){
                            options.target = this
                        }
                        else{
                            options = {
                                target:this
                            }
                        }
                        object = module(options);
                        execMethod()
                    }
                })
            }
        },
        _$ready:function(name, module){
            if(typeof this.init === 'function'){
                this.init(Nui.doc)
            }
        },
        config:function(){
            var args = arguments;
            var len = args.length;
            var attr = args[0];
            if(Nui.type(attr, 'Object')){
                return this._options = jQuery.extend(true, this._options, attr)
            }
            else if(Nui.type(attr, 'String')){
                if(args.length === 1){
                    return this._options[attr]
                }
                return this._options[attr] = args[1]
            }
        },
        hasInstance:function(id){
            var exist = false;
            var instances = this.__instances;
            if(id !== undefined){
                Nui.each(instances, function(v){
                    if(v.__id === id || v._options.id === id){
                        exist = v;
                        return false
                    }
                })
            }
            else{
                for(i in instances){
                    return true
                }
            }
            return exist
        }
    }

    return ({
        _static:statics,
        _options:{
            target:null,
            //组件id，element会增加class 组件名-组件id
            id:'',
            //组件皮肤，element会增加class nui-组件名-皮肤名
            skin:'',
            //element增加一个或多个类
            className:'',
            onInit:null,
            onReset:null,
            onDestroy:null
        },
        _template:{
            style:'<%each style%><%$index%>:<%$value%>;<%/each%>'
        },
        _init:function(){
            this._exec()
        },
        _exec:jQuery.noop,
        _getTarget:function(){
            var self = this;
            if(!self.target){
                var target = self._options.target;
                var _class = self.constructor;
                target = _class._jquery(target);
                if(!target){
                    return
                }
                self.target = self._bindComponentName(target);
            }
            return self.target
        },
        _bindComponentName:function(element){
            var self = this, _class = self.constructor;
            var attr = 'nui_component_'+_class.__component_name;
            element.attr(attr, '').each(function(){
                if(!this.nui){
                    this.nui = {};
                }
                this.nui[_class.__component_name] = self
            })
            return element
        },
        _tplData:function(data){
            var opts = this._options, 
                _class = this.constructor,
                name = 'nui-' + _class.__component_name, 
                skin = Nui.trim(opts.skin),
                getName = function(_class, arrs){
                    if(_class.__parent){
                        var _pclass = _class.__parent.constructor;
                        var _name = _pclass.__component_name;
                        if(_name !== 'component'){
                            if(skin){
                                arrs.unshift('nui-'+_name+'-'+skin);
                            }
                            arrs.unshift('nui-'+_name);
                            return getName(_pclass, arrs)
                        }
                    }
                    return arrs
                }, className = getName(_class, []);

            className.push(name);
            if(skin){
                className.push(name+'-'+skin)
            }
            if(opts.id){
                className.push(_class.__component_name + '-' + opts.id)
            }
            if(!data){
                data = {}
            }
            if(opts.className){
                className.push(opts.className)
            }
            data.className = className.join(' ');
            return data
        },
        _event:function(){
            var self = this, opts = self._options;
            if(self.element && opts.events){
                opts.element = self.element;
                events.call(self, opts)
            }
            return events.call(self)
        },
        _on:function(type, dalegate, selector, callback, trigger){
            var self = this;
            if(typeof selector === 'function'){
                trigger = callback;
                callback = selector;
                selector = dalegate;
                dalegate = null;
                selector = self.constructor._jquery(selector)
            }

            var _callback = function(e){
                return callback.call(this, e, jQuery(this))
            }

            if(dalegate){
                if(typeof selector !== 'string'){
                    selector = selector.selector;
                    if(!selector){
                        selector = self._options.target
                    }
                }
                dalegate.on(type, selector, _callback);
                if(trigger){
                    dalegate.find(selector).trigger(type)
                }
            }
            else{
                selector.on(type, _callback);
                if(trigger){
                    selector.trigger(type)
                }
            }

            self.__eventList.push({
                dalegate:dalegate,
                selector:selector,
                type:type,
                callback:_callback
            });

            return self
        },
        _off:function(){
            var self = this, _eventList = self.__eventList;
            Nui.each(_eventList, function(val, key){
                if(val.dalegate){
                    val.dalegate.off(val.type, val.selector, val.callback)
                }
                else{
                    val.selector.off(val.type, val.callback)
                }
                _eventList[key] = null;
                delete _eventList[key]
            });
            self.__eventList = [];
            return self
        },
        _delete:function(){
            var self = this, _class = self.constructor;
            if(self.target){
                var attr = 'nui_component_'+_class.__component_name;
                self.target.removeAttr(attr).each(function(){
                    if(this.nui){
                        this.nui[_class.__component_name] = null;
                        delete this.nui[_class.__component_name];
                    }
                })
            }
            _class.__instances[self.__id] = null;
            delete _class.__instances[self.__id]
        },
        _reset:function(){
            this._off();
            if(this.element){
                this.element.remove();
                this.element = null;
            }
            return this
        },
        _tpl2html:function(id, data){
            var opts = {
                openTag:'<%',
                closeTag:'%>'
            }
            if(arguments.length === 1){
                return tpl.render(this._template, id, opts)
            }
            return tpl.render.call(this._template, this._template[id], data, opts)
        },
        _callback:function(method, args){
            var self = this, opts = self._options;
            var callback = opts['on'+method];
            if(typeof callback === 'function'){
                if(args){
                    Array.prototype.unshift.call(args, self);
                    return callback.apply(opts, args);
                }
                return callback.call(opts, self)
            }
        },
        option:function(opts, isOriginal){
            var args = arguments;
            var isdef = false;
            var options;
            if(args[0] === true){
                isdef = true
            }
            else if(jQuery.isPlainObject(args[0])){
                options = args[0]
                isdef = args[1]
            }
            else if(args.length > 1 && typeof args[0] === 'string'){
                options = {};
                options[args[0]] = args[1]
                isdef = args[2]
            }
            if(options||isdef){
                this._options = jQuery.extend(true, {}, this[isdef === true ? '_defaultOptions' : '_options'], options)
                this._reset();
                this._exec();
            }
            return this
        },
        reset:function(){
            this.option(true);
            this._callback('Reset');
            return this;
        },
        destroy:function(){
            this._delete();
            this._reset();
            this._callback('Destroy');
        }
    })
})

/**
 * @author Aniu[2016-11-10 22:39]
 * @update Aniu[2016-11-10 22:39]
 * @version 1.0.1
 * @description layer弹出层
 */

__define('lib/components/layer/layer',['lib/core/component', 'lib/core/util', 'lib/core/template'], function(component, util, template){
    var module = this;

    var statics = {
        _maskzIndex:10000,
        _zIndex:10000,
        _init:function(){
            var _class = this;
            var timer = null;
            Nui.win.on('resize', function(){
                clearTimeout(timer);
                timer = setTimeout(function(){
                    Nui.each(_class.__instances, function(val){
                        var opts = val._options;
                        if(opts.position || opts.isCenter === true){
                            val.resize()
                        }
                    })
                })
            })
        },
        _$fn:null,
        _$ready:null,
        init:null
    }

    var options = {
        //内容
        content:'',
        //内容模版
        template:'',
        //模版数据
        data:{},
        //高度
        width:320,
        //宽度
        height:'auto',
        //弹出层层级
        zIndex:null,
        //最大宽度
        maxWidth:0,
        //最大高度
        maxHeight:0,
        //定时器，N毫秒后自动关闭
        timer:0,
        //弹窗四周距离窗口边缘距离
        edge:0,
        //弹窗容器
        container:'body',
        //弹窗标题
        title:'温馨提示',
        //是否可以拖动
        isMove:false,
        //是否有遮罩
        isMask:true,
        //是否只能在窗口内拖动
        isInnerMove:false,
        //点击遮罩是否关闭弹窗
        isClickMask:false,
        //是否使用遮罩拖动
        isMoveMask:false,
        //是否能用hide方法关闭遮罩
        isHide:true,
        //弹窗是否浏览器改变大小时显示在窗口中央
        isCenter:true,
        //是否全屏显示
        isFull:false,
        //是否在点击弹窗时将其置顶
        isTop:false,
        //是否以提示框展示，没有标题，按钮
        isTips:false,
        //是否拖动滚动条固定位置
        isFixed:true,
        //当内容超过弹出层容器，是否显示滚动条
        scrollbar:true,
        //是否点击弹窗或者点击遮罩层是否阻止事件冒泡
        isStopProp:false,
        //按钮对齐方式
        align:'center',
        //是否以气泡形式展示，弹出层边缘会多出箭头
        bubble:{
            enable:false,
            dir:'top'
        },
        //弹出层内容展示iframe，不建议跨域使用
        iframe:{
            enable:false,
            cache:false,
            src:''
        },
        //关闭按钮
        close:{
            enable:true,
            text:'×'
        },
        //确定按钮
        confirm:{
            enable:false,
            name:'normal',
            text:'确定',
            callback:function(){
                return true
            }
        },
        //取消按钮
        cancel:{
            enable:true,
            text:'取消'
        },
        /*弹出层定位 top/left/right/bottom
        position:{
            top:10,
            left:10
        }
        */
        position:null,
        /*将弹出层置于遮罩层底部
        under:[layer1, layer2]
        */
        under:null,
        /*配置按钮，若id为confirm/cancel/close将会覆盖内置按钮参数
        button:[{
            id:'confirm',
            text:'确定',
            name:'normal',
            callback:function(){

            }
        }]
        */
        button:null,
        //onInit：弹出层显示时回调
        //onDestroy：弹出层注销时回调
        //当拖动弹出层移动后回调
        onMove:null,
        //窗口改变大小位置时回调
        onResize:null,
        //容器滚动时回调
        onScroll:null,
        //弹窗隐藏前回调，若返回false则不能隐藏
        onHideBefore:null,
        //弹窗销毁前回调，若返回false则不能销毁
        onDestroyBefore:null,
        //定时关闭弹窗回调
        onTimer:null
    }

    return this.extend(component, {
        _static:statics,
        _options:options,
        _template:{
            layout:
                '<div class="<% className %>" style="<% include \'style\' %>">'+
                    '<div class="layer-box">'+
                        '<%if close%>'+
                            '<% var btn = close %>'+
                            '<% include "button" %>'+
                        '<%/if%>'+
                        '<%if bubble%>'+
                        '<span class="layer-bubble layer-bubble-<%bubble.dir||"top"%>"'+
                        '<%if bubble.style%>'+
                        ' style="<%each bubble.style v n%><%n%>:<%v%>;<%/each%>"'+
                        '<%/if%>'+
                        '><b></b><i></i></span>'+
                        '<%/if%>'+
                        '<%if title%>'+
                        '<div class="layer-head">'+
                            '<span class="layer-title"><%title%></span>'+
                        '</div>'+
                        '<%/if%>'+
                        '<div class="layer-body">'+
                            '<div class="layer-main">'+
                            '<%content%>'+
                            '</div>'+
                        '</div>'+
                        '<%if button && button.length%>'+
                        '<div class="layer-foot" style="text-align:<%align%>">'+
                        '<div class="layer-inner">'+
                        '<%each button btn%>'+
                            '<%include "button"%>'+
                        '<%/each%>'+
                        '</div>'+
                        '</div>'+
                        '<%/if%>'+
                    '</div>'+
                '</div>',
            button:
                '<button class="ui-button'+
                    '<%if btn.name%>'+
                    '<%each [].concat(btn.name) name%> ui-button-<%name%><%/each%>'+
                    '<%/if%> layer-button-<%btn.id%>"'+
                    '<%if btn.style%>'+
                    ' style="<%each btn.style v n%><%n%>:<%v%>;<%/each%>"'+
                    '<%/if%>><%btn.text || "按钮"%></button>',
            iframe:
                '<iframe<%each attr%> <%$index%>="<%$value%>"<%/each%>></iframe>',
            mask:
                '<div class="nui-layer-mask'+
                    '<%if skin%> nui-layer-mask-<%skin%><%/if%>" style="<%include \'style\'%>">'+
                    '<div class="layer-mask"></div>'+
                '</div>',
            movemask:
                '<div class="nui-layer-movemask'+
                    '<%if skin%> nui-layer-movemask-<%skin%><%/if%>" style="<%include \'style\'%>">'+
                '</div>',
            style:
                '<%each style%><%$index%>:<%$value%>;<%/each%>'
        },
        /*
        top:弹窗距离窗口顶部距离
        left:弹窗距离窗口左边距离
        width:弹窗宽度
        height:弹窗高度
        */
        data:{},
        _init:function(){
            this._zIndex = ++this.constructor._zIndex;
            this._exec()
        },
        _exec:function(){
            var self = this, opts = self._options, _class = self.constructor;
            self._container = _class._jquery(opts.container);
            if(self._container.length){
                self._containerDOM = self._container.get(0);
                if(self._containerDOM.tagName !== 'BODY'){
                    self._window = self._container;
                    self._isWindow = false;
                    var pos = self._container.css('position');
                    if('absolute relative fixed'.indexOf(pos) === -1){
                        self._container.css('position', 'relative')
                    }
                }
                else{
                    self._window = Nui.win;
                    self._isWindow = true;
                }
                self._isFixed = opts.isFixed && !Nui.bsie6 && self._isWindow;
                self._create();
            }
        },
        _create:function(){
            var self = this, opts = self._options;
            var buttons = self._createButton(), isTitle = false;
            if(opts.isTips !== true){
                isTitle = typeof opts.title === 'string';
            }
            var data = self._tplData({
                content:self._getContent(),
                close:buttons.close,
                button:buttons.button,
                title:isTitle ? (opts.title||'温馨提示') : null,
                bubble:opts.bubble.enable === true ? opts.bubble : null,
                align:opts.align || 'center',
                style:{
                    'z-index':isNaN(parseInt(opts.zIndex)) ? self._zIndex : opts.zIndex,
                    'position':'absolute',
                    'display':'block'
                }
            });
            if(self._isFixed){
                data.style.position = 'fixed';
            }
            self._setTop();
            self.element = self._bindComponentName($(self._tpl2html('layout', data)).appendTo(self._container));
            self._box = self.element.children('.layer-box');
			self.head = self._box.children('.layer-head');
			self._body = self._box.children('.layer-body');
			self.main = self._body.children('.layer-main');
			self.foot = self._box.children('.layer-foot');
            if(opts.isTips !== true){
                if(opts.iframe.enable === true){
                    self._iframe = self.main.children('iframe');
                    self._iframeOnload()
                }
                if(opts.isMove === true && isTitle){
                    self._bindMove();
                }
                if(opts.isStopProp === true){
                    self._stopProp();
                }
                if(opts.isTop === true){
                    self._bindTop();
                }
            }
            if(self._button.length){
                self._buttonEvent();
            }
            if(opts.isFixed === true && !self._isFixed === true){
                self._bindScroll()
            }
            self._event();
            self._show()
        },
        _getContent:function(){
            var self = this, opts = self._options, content = '', tpl = opts.template;
            if(opts.isTips !== true && opts.iframe.enable === true){
                content = self._createIframe();
            }
            else{
                if(tpl){
                    if(typeof tpl === 'string'){
                        content = template.render(tpl, opts.data)
                    }
                    else if(Nui.type(opts.template, 'Object')){
                        content = template.render.call(tpl, tpl.main, opts.data)
                    }
                }
                else if(typeof opts.content === 'string'){
                    content = opts.content
                }
                else if(opts.content instanceof jQuery){
                    content = opts.content.prop('outerHTML')
                }
            }
            return content
        },
        _createIframe:function(){
            var self = this, opts = self._options, name = 'layer-iframe'+self.__id, src = opts.iframe.src;
            if(opts.iframe.cache === false){
                src = util.setParam('_', new Date().getTime(), src)
            }
            return self._tpl2html('iframe', {
                attr:{
                    frameborder:'0',
                    name:name,
                    id:name,
                    src:src,
                    scroll:'hidden',
                    style:'width:100%;'
                }
            })
        },
        _iframeOnload:function(){
            var self = this;
            self._iframe.load(function(){
                self._iframeDocument = self._iframe.contents();
                self._resize()
            })
        },
        _createButton:function(){
            var self = this, opts = self._options, defaults = {}, buttons = {}, caches = {}, isTips = opts.isTips === true;
            var add = function(id, btn){
                self._button[id === 'close' ? 'unshift' : 'push'](btn)
            }
            self._button = [];

            Nui.each(['close', 'confirm', 'cancel'], function(id){
                var btn = opts[id];
                if(btn && btn.enable === true && (!isTips || id === 'close')){
                    defaults[id] = {
                        id:id,
                        name:btn.name,
                        style:btn.style,
                        text:btn.text,
                        callback:btn.callback
                    }
                }
            });

            if(!isTips && opts.button && opts.button.length){
                Nui.each(opts.button, function(val){
                    var id = val.id, btn = val, def;
                    if(!caches[id]){
                        caches[id] = true;
                        if(def = defaults[id]){
                            btn = $.extend(true, {}, def, val);
                            delete defaults[id]
                        }
                        add(id, btn)
                    }
                })
            }

            Nui.each(defaults, function(val, id){
                add(id, val)
            });

            if(self._button[0] && self._button[0].id === 'close'){
                buttons.close = self._button[0],
                buttons.button = self._button.slice(1);
            }
            else{
                buttons.button = self._button
            }

            return buttons
        },
        _buttonEvent:function(){
            var self = this, opts = self._options;
            Nui.each(self._button, function(val){
                self._on('click', self.element, '.layer-button-'+val.id, function(e, button){
                    if(!button.hasClass('nui-button-disabled')){
                        var id = val.id, callback = val.callback;
                        var isCall = typeof callback === 'function' ? callback.call(opts, self, e, button) : null;
                        if((id === 'confirm' && isCall === true) || (id !== 'confirm' && isCall !== false)){
                            self.destroy()
                        }
                    }
                })
            })
        },
        _stopProp:function(){
            this._on('click', this.element, function(e){
                e.stopPropagation()
            });
        },
        _bindTop:function(){
            var self = this;
            self._on('click', self.element, function(){
                self._setzIndex();
            });
        },
        _bindMove:function(){
            var self = this, opts = self._options, element = self.element;
            var _class = self.constructor, elem = element, isMove = false, x, y, _x, _y;
            self._on('mousedown', self.head, function(e, ele){
                isMove = true;
                self._setzIndex();
                if(opts.isMoveMask === true){
                    elem = self._moveMask = $(self._tpl2html('movemask', {
                        skin:opts.skin,
                        style:{
                            'z-index':self._zIndex+1,
                            'cursor':'move',
                            'position':self._isFixed ? 'fixed' : 'absolute'
                        }
                    })).appendTo(self._container);
                    elem.css({
                        width:self.data.outerWidth - _class._getSize(elem, 'lr', 'all'),
                        height:self.data.outerHeight - _class._getSize(elem, 'tb', 'all'),
                        top:self.data.top,
                        left:self.data.left
                    });
                }
                ele.css('cursor','move');
                x = e.pageX - self.data.left;
                y = e.pageY - self.data.top;
                e.stopPropagation();
            });
            self._on('mousemove', Nui.doc, function(e){
                var width = self._container.outerWidth(), height = self._container.outerHeight();
                if(isMove){
                    _x = e.pageX - x;
                    _y = e.pageY - y;
                    _x < 0 && (_x = 0);
                    _y < 0 && (_y = 0);
                    if(opts.isInnerMove === true){
                        _x + self.data.outerWidth > width && (_x = width - self.data.outerWidth);
                        _y + self.data.outerHeight > height && (_y = height - self.data.outerHeight);
                    }
                    self.data.top = _y;
                    self.data.left = _x;
                    elem.css({top:_y, left:_x});
                    return !isMove;
                }
            });
            self._on('mouseup', Nui.doc, function(e){
                if(isMove){
                    isMove = false;
                    self.head.css('cursor','default');
                    if(opts.isMoveMask === true){
                        element.css(self.data);
                        self._moveMask.remove();
                        self._moveMask = null;
                    }
                    self._callback('Move');
                    self.data.offsetTop = self.data.top - self._window.scrollTop();
                    self.data.offsetLeft = self.data.left - self._window.scrollLeft();
                }
            });
        },
        _bindScroll:function(){
            var self = this, opts = self._options;
            self._on('scroll', self._window, function(e, elem){
                var top = self.data.offsetTop + self._window.scrollTop();
                var left = self.data.offsetLeft + self._window.scrollLeft();
                self.data.top = top;
                self.data.left = left;
                self.element.css(self.data);
                self._callback('Scroll', [e, elem, {top:top, left:left}]);
            })
        },
        //鼠标点击弹出层将弹出层层级设置最大
        _setzIndex:function(){
            var self = this, _class = self.constructor;
            if(self._isTop && self.element){
                self._isTop = false;
                self._zIndex = ++_class._zIndex;
                self.element.css('zIndex', self._zIndex);
                self._setTop();
            }
        },
        _setLower:function(destroy){
            var self = this, _class = self.constructor, opts = self._options, unders = [];
            if(opts.under){
                unders = unders.concat(opts.under);
                if(unders.length){
                    Nui.each(unders, function(obj, k){
                        if(obj && obj.element){
                            obj.element.css('z-index', destroy ? (isNaN(parseInt(obj._options.zIndex)) ? obj._zIndex : obj._options.zIndex) : _class._maskzIndex-1)
                        }
                    })
                }
            }
        },
        _setTop:function(){
            var self = this, _class = self.constructor;
            Nui.each(_class.__instances, function(val){
                if(val && val !== self && val._options.isTop === true){
                    val._isTop = true;
                }
            });
        },
        _position:function(){
            var self = this, data = self.data, pos = self._options.position;
            var _pos = {
                top:pos.top,
                left:pos.left,
                right:pos.right,
                bottom:pos.bottom
            }, _v;

            if(_pos.top !== undefined && _pos.bottom !== undefined){
                delete _pos.bottom
            }

            if(_pos.left !== undefined && _pos.right !== undefined){
                delete _pos.right
            }

            Nui.each(_pos, function(v, k){
                if(v === undefined){
                    delete _pos[k];
                    return true;
                }
                _v = v;
                if(typeof v === 'string'){
                    if(!v){
                        _v = 0
                    }
                    else{
                        if(k === 'top' || k === 'bottom'){
                            if(v === 'self'){
                                _v = data.outerHeight
                            }
                            else if(/[\+\-\*\/]/.test(v)){
                                _v = (new Function('var self = '+data.outerHeight+'; return '+v))()
                            }
                        }
                        else{
                            if(v === 'self'){
                                _v = data.outerWidth
                            }
                            else if(/[\+\-\*\/]/.test(v)){
                                _v = (new Function('var self = '+data.outerWidth+'; return '+v))()
                            }
                        }
                    }
                }
                _pos[k] = _v === 'auto' ? 'auto' : parseFloat(_v)+'px'
            })

            return _pos
        },
        _resize:function(type){
            var self = this, _class = self.constructor, opts = self._options, element = self.element;
            var wWidth = self._window.outerWidth();
            var wHeight = self._window.outerHeight();
            var stop = 0;
            var sleft = 0;
            if(!self._isFixed){
                sleft = self._window.scrollLeft();
                stop = self._window.scrollTop();
            }
            self._setSize();
            if(opts.position){
                var pos = element.css(self._position()).position();
                if(Nui.bsie6){
                    sleft = 0;
                    stop = 0;
                }
                self.data.left = pos.left + sleft;
                self.data.top = pos.top + stop;
            }
            else{
                if(type === 'init' || opts.isCenter === true){
                    var left = (wWidth - self.data.outerWidth) / 2 + sleft;
                    var top = (wHeight - self.data.outerHeight) / 2 + stop;
                    var edge = opts.edge > 0 ? opts.edge : 0;
                    self.data.left = left > 0 ? left : edge;
                    self.data.top = top > 0 ? top : edge;
                }
            }
            self.data.offsetTop = self.data.top - self._window.scrollTop();
            self.data.offsetLeft = self.data.left - self._window.scrollLeft();
            element.css(self.data);
        },
        _setSize:function(){
            var self = this, _class = self.constructor, opts = self._options, element = self.element;
            var edge = opts.edge > 0 ? opts.edge*2 : 0;
            var wWidth = self._window.outerWidth() - edge;
            var wHeight = self._window.outerHeight() - edge;
            var scrollbar = opts.scrollbar;

            self._body.css({height:'auto', overflow:'visible'});
            element.css({top:'auto', left:'auto', width:'auto', height:'auto'});
            
            var edgeSize = _class._getSize(self._box, 'tb', 'all') +
                self.head.outerHeight() + 
                _class._getSize(self.head, 'tb', 'margin') + 
                _class._getSize(self._body, 'tb', 'all') + 
                self.foot.outerHeight() + 
                _class._getSize(self.foot, 'tb', 'margin');

            var width = element.outerWidth();
            if(opts.isFull !== true){
                if(opts.width > 0){
                    width = opts.width
                }
                else if(opts.width === '100%' || (opts.scrollbar === true && width > wWidth)){
                    width = wWidth;
                }
                if(opts.maxWidth > 0 && width >= opts.maxWidth){
                    scrollbar = true;
                    width = opts.maxWidth
                }
            }
            else{
                width = wWidth;
            }

            var ws = 'nowrap';
            if(opts.width > 0 || width == opts.maxWidth || width == wWidth){
                ws = 'normal';
            }

            self.data.width = width - _class._getSize(element, 'lr', 'all');
            self.main.css('white-space', ws);
            element.width(self.data.width);

            var height = element.outerHeight();
            if(self._iframeDocument){
                self._iframeDocument[0].layer = self;
                height = edgeSize + self._iframeDocument.find('body').outerHeight();
            }

            if(opts.isFull !== true){
                if(opts.height > 0){
                    height = opts.height
                }
                else if(opts.height === '100%' || ((opts.scrollbar === true || self._iframeDocument) && height > wHeight)){
                    height = wHeight
                }
                if(opts.maxHeight > 0 && height >= opts.maxHeight){
                    scrollbar = true;
                    height = opts.maxHeight
                }
            }
            else{
                height = wHeight
            }

            self.data.outerWidth = width;
            self.data.outerHeight = height;
            self.data.height = height - _class._getSize(element, 'tb', 'all');
            element.height(self.data.height);
            var _height = self.data.height - edgeSize;

            if(self.main.outerHeight() > _height && !self._iframe && scrollbar === true){
                self._body.css('overflow', 'auto')
            }
            if(self._iframe){
                self._iframe.height(_height);
            }
            self._body.height(self.data.contentHeight = _height)
        },
        _showMask:function(){
            var self = this, _class = self.constructor, opts = self._options;
            if(!self._containerDOM.__layermask__){
                self._containerDOM.__layermask__ = $(self._tpl2html('mask', {
                    skin:opts.skin,
                    style:{
                        'z-index':_class._maskzIndex,
                        'position':self._isFixed ? 'fixed' : 'absolute',
                        'top':'0px',
                        'left':'0px',
                        'width':'100%',
                        'height':self._isFixed ? '100%' : self._container.outerHeight()+'px'
                    }
                })).appendTo(self._container);
            }
            if(opts.isStopProp === true){
                self._on('click', self._containerDOM.__layermask__, function(e){
                    e.stopPropagation()
                })
            }
            if(opts.isClickMask === true){
                self._on('click', self._containerDOM.__layermask__, function(){
                    self.hide()
                })
            }
        },
        _show:function(){
            var self = this, opts = self._options;
            component.init(self.main);
            self._resize('init');
            self._setLower();
            if(opts.isMask === true){
                self._showMask()
            }
            if(opts.timer > 0){
                self._time = opts.timer;
                self._timer();
            }
            self._callback('Init');
            return self
        },
        _timer:function(){
            var self = this, opts = self._options;
            if(self._time > 0){
                self._callback('Timer', [self._time]);
                self._timerid = setTimeout(function(){
                    self._time -= 1000;
                    self._timer();
                }, self._time > 1000 ? 1000 : self._time)
            }
            else{
                self.hide()
            }
        },
        _reset:function(){
            var self = this, _class = self.constructor, noMask = true;
            component.exports._reset.call(this);
            component('destroy', self.main);
            Nui.each(_class.__instances, function(val){
                if(val && val._options.isMask === true && val !== self && val._containerDOM === self._containerDOM){
                    return (noMask = false);
                }
            });
            if(noMask && self._containerDOM.__layermask__){
                self._containerDOM.__layermask__.remove();
                self._containerDOM.__layermask__  = null;
            }
            if(self._options.timer > 0){
                self.timer = 0;
                clearTimeout(self._timerid);
            }
        },
        resize:function(){
            var self = this, opts = self._options, element = self.element;
            self._resize();
            self._callback('Resize');
            return self
        },
        hide:function(){
            if(this._options.isHide === true){
                if(this._callback('HideBefore') === false){
                    return
                }
                this.destroy()
            }
        },
        destroy:function(){
            var self = this, _class = self.constructor, opts = self._options;
            if(self._callback('DestroyBefore') === false){
                return
            }
            self._delete();
            self._reset();
            self._setLower(true);
            if(!self._isdestroy){
                _class._zIndex--;
                self._isdestroy = true;
            }
            self._callback('Destroy');
        }
    })
});
__define('lib/components/layer/alert',['lib/components/layer/layer'], function(layer){
    return function(content, title, width, height){
        var opts;
        if(typeof content === 'object'){
            opts = content;
            content = opts.content;
            delete opts.content;
        }
        return layer(Nui.extend({
            content:'<div style="padding:10px; line-height:20px;">'+(content||'')+'</div>',
            title:title,
            width:width,
            height:height,
            cancel:{
                text:'关闭'
            }
        }, opts||{}))
    }
})
/**
 * @author Aniu[2016-11-10 22:39]
 * @update Aniu[2017-12-22 10:17]
 * @version 1.0.1
 * @description 输入框占位符
 */

__define('lib/components/placeholder',['lib/core/component', 'lib/core/util'], function(component, util){
    var supportPlaceholder = util.supportHtml5('placeholder', 'input');
    return this.extend(component, {
        _options:{
            /**
             * @func 输入框占位提示文本，若元素上含有placeholder属性将会覆盖该值
             * @type <String>
             */
            text:'',
            /**
             * @func 是否启用动画形式展示
             * @type <Boolean>
             */
            animate:false,
            /**
             * @func 输入框值是否可以和占位符相同
             * @type <Boolean>
             */
            equal:true,
            /**
             * @func 销毁或者重置组件是否还原默认值
             * @type <Boolean>
             */
            restore:true,
            /**
             * @func 占位符文本颜色
             * @type <String>
             */
            color:'#ccc',
            /**
             * @func 调用value方法后执行回调
             * @type <Function>
             */
            onChange:null
        },
        _template:{
            wrap:'<strong class="<% className %>" style="<%include \'style\'%>" />',
            elem:'<b style="<%include \'style\'%>"><%text%></b>'
        },
        _events:{
            'click b':'_focus',
            'focus :input':'_indent',
            'blur :input':'_blur _input',
            'keyup :input':'_input'
        },
        _data:{},
        _exec:function(){
            var self = this, opts = self._options, target = self._getTarget();
            if(target){
                var text = self._defaultText = target.attr('placeholder');
                if(!self._defaultText && opts.text){
                    target.attr('placeholder', text = opts.text)
                }
                self._val = target.val();
                if(self._defaultValue === undefined){
                    self._defaultValue = self._val;
                }
                self._text = Nui.trim(text||'');
                self._setData();
                self._create()
            }
        },
        _setData:function(){
            var self = this, _class = self.constructor;
            var isText = self.target.is('textarea');
            var height = self.target.height();
            self._data = {
                top:_class._getSize(self.target, 't', 'padding')+_class._getSize(self.target, 't')+'px',
                height:isText ? 'auto' : height+'px',
                position:'absolute',
                'line-height':isText ? 'normal' : height+'px'
            }
        },
        _create:function(){
            var self = this, opts = self._options, _class = self.constructor;
            if(self._condition()){
                var data = self._tplData();
                data.style = {
                    'position':'relative',
                    'display':'inline-block',
                    'width':self.target.outerWidth()+'px',
                    'overflow':'hidden',
                    'cursor':'text'
                }
                self.element = self.target.wrap(self._tpl2html('wrap', data)).parent();
                self._createElems();
                self._event()
            }
            else if(self._text && opts.color){
                self._setStyle()
            }
        },
        _focus:function(){
            this.target.focus()
        },
        _blur:function(){
            delete this.constructor._active;
        },
        _indent:function(){
            var _class = this.constructor;
            if(this._options.animate && this.$text){
                _class._active = this.target;
                this.$text.stop(true, false).animate({left:this._pLeft+10, opacity:'0.5'});
            }
        },
        _input:function(){
            var val = this.target.val(), _class = this.constructor;
            if((!this._options.equal && val === this._text) || !val){
                this.target.val('');
                if(this.$text){
                    this.$text.show();
                    if(this._options.animate){
                        if(_class._active){
                            this.$text.css({left:this._pLeft+10, opacity:'0.5'})
                        }
                        else{
                            this.$text.stop(true, false).animate({left:this._pLeft, opacity:'1'})
                        }
                    }
                }
            }
            else if(this.$text){
                this.$text.hide()
            }
        },
        _condition:function(){
            return this._options.animate || !supportPlaceholder
        },
        _createElems:function(){
            var opts = this._options;
            if(this._text){
                if(opts.animate || !supportPlaceholder){
                    this.target.removeAttr('placeholder');
                    this._createText();
                }
                else if(opts.color){
                    this._setStyle()
                }
            }
        },
        _createText:function(){
            var self = this, opts = self._options, _class = self.constructor;
            self._pLeft = _class._getSize(this.target, 'l', 'padding') + _class._getSize(this.target, 'l');
            self.$text = $(self._tpl2html('elem', {
                text:self._text,
                style:Nui.extend({
                    left:_class._getSize(self.target, 'l', 'padding')+_class._getSize(self.target, 'l')+'px',
                    color:opts.color,
                    display:self._val ? 'none' : 'inline'
                }, self._data)
            })).appendTo(self.element)
        },
        _setStyle:function(){
            var self = this, opts = self._options;
            self.className = '_nui_'+ self.constructor.__component_name +'_'+self.__id;
            self.target.addClass(self.className);
            if(!self.constructor.style){
                self._createStyle()
            }
            self._createRules()
        },
        _createStyle:function(){
            var self = this;
            var style = document.createElement('style');
            document.head.appendChild(style);
            self.constructor.style = style.sheet
        },
        _createRules:function(){
            var self = this;
            var sheet = self.constructor.style;
            var id = self.__id;
            try{
                sheet.deleteRule(id)
            }
            catch(e){}
            Nui.each(['::-webkit-input-placeholder', ':-ms-input-placeholder', '::-moz-placeholder'], function(v){
                var selector = '.'+self.className+v;
                var rules = 'opacity:1; color:'+(self._options.color||'');
                try{
                    if('addRule' in sheet){
                        sheet.addRule(selector, rules, id)
                    }
                    else if('insertRule' in sheet){
                        sheet.insertRule(selector + '{' + rules + '}', id)
                    }
                }
                catch(e){}
            })
        },
        _reset:function(){
            var self = this;
            self._off();
            if(self.$text){
                self.$text.remove()
            }
            if(self.target){
                self.target.removeClass(self.className);
                if(self.element){
                    self.target.unwrap();
                    self.element = null
                }
                if(self._options.restore === true){
                    self.target.val(self._defaultValue)
                }
                if(self._defaultText){
                    self.target.attr('placeholder', self._defaultText)
                }
                else{
                    self.target.removeAttr('placeholder')
                }
            }
        },
        value:function(val){
            var _class = this.constructor, target = this.target;
            if(arguments.length){
                target.val(val)
            }
            this._input();
            this._callback('Change');
        }
    })
})

/**
 * @author Aniu[2017-12-21 15:12]
 * @update Aniu[2017-12-22 10:17]
 * @version 1.0.1
 * @description input增强
 */

__define('lib/components/input',['lib/components/placeholder'], function(placeholder){
    return this.extend(placeholder, {
        _options:{
            /**
             * @func 按钮文本是否是图标编码
             * @type <Boolean,String>
             */
            iconfont:false,
            /**
             * @func 是否默认隐藏，鼠标悬停时才显示
             * @type <Boolean>
             */
            hover:false,
            /**
             * @func 按钮始终显示
             * @type <Boolean>
             */
            show:false,
            /**
             * @func 是否显示查看密码按钮
             * @type <Boolean,String,Object>
             */
            reveal:null,
            /**
             * @func 是否显示清除按钮
             * @type <Boolean,String,Object>
             */
            clear:null,
            /**
             * @func 按钮集合
             * @type <Array>
             */
            button:null
        },
        _template:{
            'button':
                '<span style="<%include \'style\'%>">'+
                '<%each button%>'+
                    '<%var style = $value.style%>'+
                    '<i style="<%include \'style\'%>" class="input-button input-<%$value.id%> input-button-<%type%>'+
                    '<%if $value.iconfont%> '+
                    '<%$value.iconfont === true ? "iconfont" : $value.iconfont%>'+
                    '<%/if%>'+
                    '"'+
                    '<%if $value.title%> title="'+
                        '<%if $value.title === true%>'+
                            '<%include \'content\'%>'+
                        '<%elseif typeof $value.title === "object"%>'+
                            '<%$value.title[type]||""%>'+
                        '<%else%>'+
                            '<%$value.title%>'+
                        '<%/if%>"'+
                    '<%/if%>'+
                    '>'+
                    '<%include \'content\'%>'+
                    '</i>'+
                '<%/each%>'+
                '</span>',
            'content':
                '<%if $value.content && typeof $value.content === "object"%>'+
                '<%$value.content[type]||""%>'+
                '<%else%>'+
                '<%$value.content||""%>'+
                '<%/if%>'
        },
        _events:{
            'click .input-clear':'_clear',
            'click .input-reveal':'_reveal',
            'mouseenter':'_mouseover',
            'mouseleave':'_mouseout'
        },
        _input:function(){
            placeholder.exports._input.call(this);
            var self = this, opts = this._options, val = self.target.val();
            var isHide = (!opts.equal && val === self._text) || !val;
            var type = !isHide ? 'show' : 'hide';
            self._hideElem[type]()
        },
        _mouseover:function(){
            var target = this.target;
            if(!target.prop('readonly') && !target.prop('disabled') && target.val()){
                this._hoverElem.show()
            }
        },
        _mouseout:function(){
            this._hoverElem.hide()
        },
        _condition:function(){
            var opts = this._options;
            if(
                placeholder.exports._condition.call(this) || 
                opts.clear || 
                opts.reveal ||
                opts.button
            ){
                return true
            }
        },
        _createButton:function(hides, hovers){
            var self = this, opts = self._options, button = [], defaults = {}, buttons = {}, caches = {};
            var readonly = self.target.prop('readonly') || self.target.prop('disabled');

            Nui.each(['reveal', 'clear'], function(id){
                var btn = opts[id];
                if(btn){
                    if(typeof btn === 'boolean'){
                        btn = {}
                    }
                    else if(typeof btn === 'string'){
                        btn = {
                            content:btn
                        }
                    }
                    defaults[id] = Nui.extend(true, {}, btn, {id:id})
                }
            })

            if(Nui.type(opts.button, 'Array')){
                Nui.each(opts.button, function(val){
                    if(val){
                        if(typeof val === 'string'){
                            val = {
                                id:val
                            }
                        }
                        var id = val.id, btn = val, def;
                        if(!caches[id]){
                            caches[id] = true;
                            if(def = defaults[id]){
                                btn = $.extend(true, {}, def, val);
                                delete defaults[id]
                            }
                            button.push(btn)
                        }
                    }
                })
            }

            Nui.each(defaults, function(val, id){
                button.push(val)
            })

            Nui.each(button, function(btn){
                if(btn.iconfont === undefined){
                    btn.iconfont = opts.iconfont
                }
                if(btn.hover === undefined){
                    btn.hover = opts.hover
                }
                if(btn.show === undefined){
                    btn.show = opts.show
                }
                if(!btn.style){
                    btn.style = {}
                }
                delete btn.style.display;
                btn.style.display = btn.show === true || (self._val && !readonly) ? 'inline' : 'none';
                if(btn.show !== true){
                    hides.push('.input-'+btn.id)
                    if(btn.hover === true){
                        hovers.push('.input-'+btn.id)
                    }
                }
                self._bindEvent(btn)
            })

            return self._button = button
        },
        _bindEvent:function(btn){
            var self = this, opts = self._options;
            if(typeof btn.callback === 'function'){
                var method = '_callback_'+btn.id;
                self[method] = function(e, elem){
                    btn.callback.call(opts, self, e, elem)
                }
                var methods = self._events['click .input-'+btn.id];
                if(methods){
                    method = Nui.trim(methods.split(method)[0]) + ' ' + method
                }
                self._events['click .input-'+btn.id] = method;
            }
        },
        _createElems:function(){
            var self = this, opts = self._options, _class = self.constructor, hides = [], hovers = [];
            placeholder.exports._createElems.call(self);
            self.$button = $(self._tpl2html('button', {
                button:self._createButton(hides, hovers),
                iconfont:opts.iconfont,
                type:self.target.attr('type') === 'password' ? 'password' : 'text',
                style:Nui.extend({
                    right:_class._getSize(self.target, 'r')+'px'
                }, self._data)
            })).appendTo(self.element);
            self._hideElem = self.element.find(hides.toString());
            self._hoverElem = self.element.find(hovers.toString());
        },
        _option:function(type){
            var data = {};
            Nui.each(this._button, function(v){
                if(v.id === type){
                    data = v;
                    return false
                }
            })
            return data
        },
        _clear:function(e, elem){
            this.value('');
            this.target.focus();
            if(this._option('clear').show !== true){
                elem.hide();
            }
        },
        _reveal:function(e, elem){
            var self = this, type = 'text', data = this._option('reveal');
            if(this.target.attr('type') === 'text'){
                type = 'password'
            }
            //IE8-不允许修改type，因此重新创建新元素
            if(Nui.browser.msie && Nui.browser.version <= 8){
                var html = self.target.prop('outerHTML');
                var regexp = /(type=['"]?)(text|password)(['"]?)/i;
                //IE6下input没有type="text"属性
                if(!regexp.test(html)){
                    html = html.replace(/^(<input)/i, '$1 type="'+ type +'"')
                }   
                else{
                    html = html.replace(regexp, '$1'+type+'$3')
                }
                var newInput = $(html).insertAfter(self.target);
                newInput.val(self.target.val());
                self.target.remove();
                self.target = newInput;
            }
            else{
                this.target.attr('type', type);
            }
            elem.removeClass('input-button-text input-button-password').addClass('input-button-' + type);
            if(data.content && typeof data.content === 'object'){
                elem.html(data.content[type]||'')
            }
            if(data.title && typeof data.title === 'object'){
                elem.attr('title', data.title[type]||'')
            }
        },
        _reset:function(){
            if(this.$button){
                this.$button.remove()
            }
            placeholder.exports._reset.call(this)
        }
    })
}); 
__define('./page',function(require,imports,renders,extend,exports){
	var module=this;
	var input=__requireDefaultModule(require('lib/components/input'));
	var alert=__requireDefaultModule(require('lib/components/layer/alert'));
	
	$('#demo').input({
	    clear:'清除',
	    reveal:{
	        content:{
	            text:'隐藏',
	            password:'显示'
	        },
	        title:true
	    },
	    button:[{
	        id:'click',
	        content:'点我',
	        show:true,
	        callback:function(){
	            alert('让你点你就点，你是不是傻？')
	        }
	    }]
	})
});

})(Nui['_module_2_define']);