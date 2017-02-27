//点击开始于暂停事件
$('.play').on("click",function(){
	$(this).hide();
	$('.pause').show();
	$('.needle').addClass('needleOn');
	$('.pic').addClass('picAnimate');
})
$('.pause').on("click",function(){
	$(this).hide();
	$('.play').show();
	$('.needle').removeClass('needleOn');
	$('.pic').removeClass('picAnimate');
})

//点击歌曲类别列表与歌词页面切换
var comeOutL=true;
var comeOutR=true;
$(".headL").on("click",function(e){
	if(comeOutL){
		if(!comeOutR){
			$(".lyric").animate({right:-300},500,function(){comeOutR=!comeOutR;});
		}
		$(".styleList").animate({left:0},500,function(){comeOutL=!comeOutL;});
	}else{
		$(".styleList").animate({left:-200},500,function(){comeOutL=!comeOutL;});
	}
})
$(".headR").on("click",function(e){
	if (comeOutR){
		if(!comeOutL){
			$(".styleList").animate({left:-200},500,function(){comeOutL=!comeOutL;});
		}
		$(".lyric").animate({right:0},500,function(){comeOutR=!comeOutR;});
	}else{
		$(".lyric").animate({right:-300},500,function(){comeOutR=!comeOutR;});
	}	
})

function getSong(){
	$.ajax({
		url:'http://api.jirengu.com/fm/getChannels.php', //如何在https页面下请求http的资源？？？
		type:'get',
		dataType:'json',
		success:function(data){
			dealWith(data.channels);
			console.log(data);
		},
		error:function(){
			console.log('error');
		}

	})
	function dealWith(data){
		var str='';
		$('.styleList').empty();
		data.forEach(function(e,i,a){
			str+='<p data-chanel="'+e['channel_id'];
			str+='">'+e.name+'</p>';
		});
		$('.styleList').append($(str));
	}
}

//styleList侧边栏事件代理,点击选项切换频道
$(".styleList").on("click",'p',function(e){
	e.stopParpagation();
	e.preventDefaule();
	

})

//以下是请求歌曲文件的
function getSongInfo(channel){
	var channel=channel || 'public_tuijian_spring';
	$.ajax({
		url:'http://api.jirengu.com/fm/getSong.php',
		type:'get',
		dataType:'json',
		data:{
			channel:channel
		},
		success:function(data){
			// console.log(data);
			fillInfo(data);
		},
		error:function(){
			console.log('error');
		}
	})

}
function fillInfo(data){
	console.log(data.song[0].title)
	console.log(data.song[0].artist)
	console.log(data.song[0].lrc)
	console.log(data.song[0].picture)
	console.log(data.song[0].url)
	$('.songName').html(data.song[0].title)
	$('.artist').html(data.song[0].artist)
	$('.pic>img').attr('src',data.song[0].picture)
	$('main>audio').attr('src',data.song[0].url)
	$('.lyric').html('src',data.song[0].lrc)

}