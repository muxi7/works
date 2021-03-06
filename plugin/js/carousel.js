;(function($){
  var Carousel=function(carousel){
    var _this=this;
    this.carousel=carousel;
    this.picList=this.carousel.find('.carousel-pic');
    this.preBtn=this.carousel.find('.carousel-btn>.pre');
    this.nextBtn=this.carousel.find('.carousel-btn>.next');
    this.barList=this.carousel.find('.carousel-bar');
    this.pics=this.picList.children();
    this.picCount=this.pics.size();
    this.picwidth=this.pics.width();
    this.curIdx=0; //当前图片在数组中位置；
    this.isAnimate=false; //判断是够正在执行动画；
    this.timer=null;  //实现自动轮播的计时器；
    this.flag=false;  //判断是触发了mouseenter事件还是mouseleave()事件；解决自动轮播和手动切换的时候造成多余的setInternal;

    this.init();
  }

  Carousel.prototype={
    init:function(){
      this.playAuto();
      this.bind();
    },
  //事件绑定
    bind:function(){
      var _this=this;
      this.picList.css({'width':this.picCount*this.picwidth});

      this.preBtn.on('click',function(e){
        e.preventDefault();
        _this.playPre();
      });
      this.nextBtn.on('click',function(e){
        e.preventDefault();
        _this.playNext();
      });

      this.barList.children().on('click',function(){
        var index=$(this).index();
        var curIdx=_this.curIdx;
        if(index>curIdx){
          _this.playNext(index-curIdx);
        }else{
          _this.playPre(curIdx-index);
        }
      });

      this.carousel.on('mouseenter',function(){
        _this.flag=true;
        _this.stopAuto();
      }).on('mouseleave',function(){
        _this.flag=false;
        _this.playAuto();
      });
    },

  //向前滑动
    playPre:function(step){
      var _this=this;
      var index=step || 1;
      if(!this.isAnimate){
        this.isAnimate=true;
        this.stopAuto();
        for(var i=0;i<index;i++){
          this.picList.prepend(this.picList.children().last());
        };    
        this.picList.css({'left':-this.picwidth*index});
        this.picList.animate({'left':'+='+this.picwidth*index},function(){
          _this.curIdx=(_this.picCount+_this.curIdx-index)%_this.picCount;
          _this.setList();
          _this.isAnimate=false;
          if(!_this.flag){
            _this.playAuto();
          };
        })
      }

    },
  //向后滑动
    playNext:function(step){
      var _this=this;
      var index=step || 1;
      if(!this.isAnimate){
        this.isAnimate=true;
        this.stopAuto();
        this.picList.animate({'left':'-='+this.picwidth*index},function(){
          for(var i=0;i<index;i++){
            _this.picList.append(_this.picList.children().first());
          };          
          _this.picList.css({'left':0});
          _this.curIdx=(_this.curIdx+index)%_this.picCount;
          _this.setList();
          _this.isAnimate=false;
          if(!_this.flag){
            _this.playAuto();
          };
        });
      };
    },
  //小圆点的隧动切换
    setList:function(){
      this.barList.children().removeClass('active').eq(this.curIdx).addClass('active');
    },
    playAuto:function(){
      var _this=this;
      this.timer=window.setInterval(function(){
        _this.playNext();
      },2000);
    },
    stopAuto:function(){ 
      window.clearInterval(this.timer);
    }
  };

//注册为jQuery插件
  $.fn.Carousel=function(){
    this.each(function(){
      new Carousel($(this));
    })
    return this;
  };

  window.Carousel=Carousel;
 
})(jQuery);

