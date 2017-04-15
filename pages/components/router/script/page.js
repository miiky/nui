Nui.define(['./render', './router', './ajax'], function(render, router, ajax){
    var module = this;
    module.imports('../style/base');
    module.imports('../style/page');
    ajax({
        url:'./script/data.json',
        success:function(res){
            render(res);
            router('run')
        }
    })
})