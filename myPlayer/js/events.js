//点击开始于暂停事件
$('.play').on("click",function(){
	$(this).hide();
	$('.pause').show();
})
$('.pause').on("click",function(){
	$(this).hide();
	$('.play').show();
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
		url:'http://api.jirengu.com/fm/getChannels.php',
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
		// $ul=$('ul').append($(str));
		$('.styleList').append($(str));
	}
}