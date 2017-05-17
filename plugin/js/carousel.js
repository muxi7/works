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

    console.log(this.preBtn,this.nextBtn);
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

//    this.playAuto();

//     this.carousel.on('mouseenter',function(e){
//       e.stopPropagation();
//       _this.stopAuto();
//     }).on('mouseleave',function(e){
//       e.stopPropagation();
//       _this.playAuto();
//     });

  }

  Carousel.prototype={

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
          _this.playAuto();
        })
      }

    },

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
          _this.playAuto();
        });
      };
    },
    
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
      clearInterval(this.timer);
      this.timer=null;
    }
  };

  window.Carousel=Carousel;
 
})(jQuery);

