var data = require('./data');
var suggest = require('../../../src/components/suggest');

$(':text').suggest({
    //url:'http://127.0.0.1:8001/data/?callback=?',
    data:data,
    field:'buname',
    empty:'<%value%> 暂无数据',
    foot:'<a>aaaaaaaa</a>',
    nullable:true,
    //cache:true,
    focus:true,
    match:[{
        field:'buname',
        like:function(data, value){
            return data.indexOf(value) === 0
        }
    }, {
        field:'id',
        like:function(data, value){
            return data.indexOf(value) === 0
        }
    }],
    events:{
        'click a':function(){
            
        }
    },
    item:function(){
        return '<span title="<%$data.buname%>"><%$data.buname%></span>'
    },
    query:function(self, value){
        return {
            keywords:encodeURI(value)
        }
    },
    onRequest:function(self, res){
        return res.list
    }
})

