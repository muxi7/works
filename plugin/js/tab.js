;(function($){

  var Tab=function(tab){
    var _this_=this;
    this.tab=tab;
    this.tabItems=this.tab.find('ul.tab-nav li');
    this.contentItems=this.tab.find('.content-wrap .content-item');

    //默认配置参数
    this.config={
      'triggerType':'click', //定义鼠标的事件类型click or mouseover
      'effect':'default',  //定义tab选项卡的切换方式
      'invoke':1,       //定义初始化是显示的tab选项卡
      'auto':false      //定义自动切换的时间间隔,false表示不进行自动切换
    };

    //扩展默认的配置参数
    if(this.getConfig()){
      $.extend(this.config,this.getConfig());
    };

    var config=this.config; //将当前配置参数赋值给一个变量，减少后续使用this.config进行查询；

    //设置默认事件类型
    if(config.triggerType==='click'){
      this.tabItems.on(config.triggerType,function(e){
        var currentTarget=$(e.currentTarget);
        _this_.invoke(currentTarget);
      })
    }else if(config.triggerType==='mouseover' || config.triggerType!='click'){
      this.tabItems.on('mouseover',function(e){
        var currentTarget=$(e.currentTarget);
        e.stopPropagation(); //此处必须事件冒泡，不然会触发父元素上的moaseenter事件将timer定时器清除掉；
        _this_.invoke(currentTarget);

      })
    };

    //设置自动轮播
    if(config.auto){

      this.timer=null;
      this.loop=0;
      this.autoPlay();

      this.tab.on('mouseenter',function(){
        window.clearInterval(_this_.timer);
      }).on('mouseleave',function(){
        _this_.autoPlay();
      })
    };

    //设置默认显示第几个tab
    if(config.invoke){
      var invokeEle=this.tabItems.eq(config.invoke-1);
      this.invoke(invokeEle);
    }

  }


  Tab.prototype={

    //自动播放函数
    autoPlay:function(){
      var _this_=this,
          tabItems=this.tabItems,
          tabLength=tabItems.size(),
          config=this.config;
      this.timer=window.setInterval(function(){
        _this_.loop++;
        if(_this_.loop>=tabLength){
          _this_.loop=0;
        };
        console.log(1);
        tabItems.eq(_this_.loop).trigger(config.triggerType);
      },config.auto);
    },

    //tab切换效果
    invoke:function(currentEle){
      var _this_=this;
      var index=currentEle.index();
      currentEle.addClass('active').siblings().removeClass('active');

      var effect=this.config.effect;

      if(effect==='default'||effect!='fade'){  
        _this_.contentItems.removeClass('current').eq(index).addClass('current');
      }else if(effect==='fade'){
        _this_.contentItems.stop().fadeOut().eq(index).fadeIn();
      }

      if(this.config.auto){
        this.loop=index;
      }
    },

    //获取自定义的配置参数
    getConfig:function(){
      var config=this.tab.attr('data-config');

      if(config&&config!=''){
        return JSON.parse(config);
      }else{
        return null;
      }
    }

  }

  window.Tab=Tab;

}(jQuery));