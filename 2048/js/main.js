var board=[];
var score=0;
var hasConflicted = [];
var lock=false;

var startX=0,
    startY=0,
    endX=0,
    endY=0;



$(function(){
  newGame();
});

//点击按钮重新开始游戏
function newGame(){
  init();
  updateBoardView();
  generateANum();
  generateANum();
}


function init(){
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      var gridCell=$('#row'+i+'-col'+j);
      gridCell.css({
        'top':getPosTop(i,j),
        'left':getPosLeft(i,j)
      });
    }
  }

  for(var i=0;i<4;i++){
    board[i]=[];
    hasConflicted[i]=[];
    for(var j=0;j<4;j++){
      board[i][j]=0;
      hasConflicted[i][j] = false;
    }
  }

  updateScore(0);
  $('.gameover').remove();

}

//更新数字表格
function updateBoardView(){
  $('.number-cell').remove();
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      var id='number-cell-'+i+'-'+j;
      $('main').append('<div class="number-cell" id='+ id +'></div>');
      var theNumberCell = $('#number-cell-'+i+'-'+j);

      if(board[i][j] === 0){
        theNumberCell.css({
          'width':0,
          'height':0,
          'top':getPosTop(i,j)+cellSideLength/2,
          'left':getPosLeft(i,j)+cellSideLength/2
        }); 
      }else{
        theNumberCell.css({
          'width':cellSideLength,
          'height':cellSideLength,
          'top':getPosTop(i,j),
          'left':getPosLeft(i,j),
          'background-color':getNumberBgColor(board[i][j]),
          'color':getNumberColor(board[i][j])
        });

        if(board[i][j]>1000){
          theNumberCell.css({
            'line-height':cellSideLength+'px',
            'font-size':0.45*cellSideLength+'px'
          });
        }else{
          theNumberCell.css({
            'line-height':cellSideLength+'px',
            'font-size':0.6*cellSideLength+'px',
          })
        }

        theNumberCell.text(board[i][j]);
      }

      hasConflicted[i][j]=false; 

    } 
  }
  lock=false;
}

//在随机的位子插入一个随机数(2或4)
function generateANum(){
  if(nospace(board)){
    return false;
  }

  var randx=parseInt(Math.floor(Math.random()*4));
  var randy=parseInt(Math.floor(Math.random()*4));
  var times=0;
  while(times<50){
    if(board[randx][randy]===0){
      break;
    }
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
    times++;
  }

  if(times === 50){
    for(var i=0;i<4;i++){
      for(var j=0;j<4;j++){
        if(board[i][j]===0){
          randx=i;
          randy=j;
          i = 4;
          j = 4;
        }
      }
    }
  }

  //随机增加的数，2 或者 4
  var randNum=Math.random()>0.5 ? 2 : 4;

  board[randx][randy]=randNum;

  showNumWidthAnimation(randx,randy,randNum);

  return true;
}

//游戏结束时，展示结束信息
function showGameOver(){
  if(nospace(board) && noMove(board)){
    var $endMessage=$('<div class="gameover"><div class="message"><p>好可惜！不要气馁，</p><p>请大侠重新来过</p></div></div>');
    $('main').append($endMessage);
  }
}


function nospace(board){
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      if(board[i][j] === 0){
        return false;
      }
    }
  }
  return true;
}


//分别向上下左右移动的操作
function moveLeft(){
  if(!canMoveLeft(board)){
    return false;
  }
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      if(board[i][j] !== 0){
        for(var k=0;k<j;k++){
          if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
            showMoveAnimation(i,j,i,k);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            break;
          }
          else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
            showMoveAnimation(i,j,i,k);
            // 相同数合并
            board[i][k] += board[i][j];
            board[i][j] = 0;

            //更新总分数
            score += board[i][k]
            updateScore(score);

            hasConflicted[i][k] = true;
            break;
          }
        }
      }
    }
  }
  setTimeout(function(){
    updateBoardView();
    generateANum();
  },250);
  return true;
}


function moveRight(){
  if(!canMoveRight(board)){
    return false;
  }
  for(var i=0;i<4;i++){
    for(var j=2;j>=0;j--){
      if(board[i][j] !== 0){
        for(var k=3;k>j;k--){
          if(board[i][k]===0 && noBlockHorizontal(i,k,j,board)){
            showMoveAnimation(i,j,i,k);
            board[i][k]=board[i][j];
            board[i][j]=0;
            break;
          }
          else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
            showMoveAnimation(i,j,i,k);
            board[i][k] += board[i][j];
            board[i][j] = 0;
            score += board[i][k]
            updateScore(score);

            hasConflicted[i][k] = true;
            break;
          }
        }
      }
    }
  }
  setTimeout(function(){
    updateBoardView();
    generateANum();
  },250);
  return true;
}

function moveUp(){
  if(!canMoveUp(board)){
    return false;
  }
  for(var i=1;i<4;i++){
    for(var j=0;j<4;j++){
      if(board[i][j] !== 0){
        for(var k=0;k<i;k++){
          if(board[k][j] === 0 && noBlockVertical(j,k,i,board)){
            showMoveAnimation(i,j,k,j);
            board[k][j]=board[i][j];
            board[i][j]=0;
            break;
          }
          else if(board[k][j]== board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){
            showMoveAnimation(i,j,k,j);
            board[k][j] += board[i][j];
            board[i][j] = 0;
            score+=board[k][j];
            updateScore(score);
            hasConflicted[k][j]=true;
            break;
          }
        }
      }
    }
  }
  setTimeout(function(){
    updateBoardView();
    generateANum();
  },250);
  return true;
}


function moveDown(){
  if(!canMoveDown(board)){
    return false;
  }
  for(var i=2;i>=0;i--){
    for(var j=0;j<4;j++){
      if(board[i][j] !== 0){
        for(var k=3;k>i;k--){
          if(board[k][j]===0 && noBlockVertical(j,i,k,board)){
            showMoveAnimation(i,j,k,j);
            board[k][j]=board[i][j];
            board[i][j]=0;
            break;
          }
          else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
            showMoveAnimation(i,j,k,j);
            board[k][j] += board[i][j];
            board[i][j] = 0;
            score+=board[k][j];
            updateScore(score);
            hasConflicted[k][j]=true;
            break;
          }
        }
      }
    }
  }
  setTimeout(function(){
    updateBoardView();
    generateANum();
  },250);
  return true;
}

//绑定键盘上的方向按键的事件函数
$(document).on("keyup",function(e){
  e.preventDefault();
  var code=e.keyCode;
  lock = true;
  switch(code){
    case 37:
      if(moveLeft()){
        setTimeout(showGameOver,300);
      }
      break;
    case 38:
      if(moveUp()){
        setTimeout(showGameOver,300);
      }
      break;
    case 39:
      if(moveRight()){
        setTimeout(showGameOver,300);
      }
      break;
    case 40:
      if(moveDown()){
        setTimeout(showGameOver,300);
      }
      break;
    default : break;
  }
});

$(document).on('keydown',function(e){
  e.preventDefault();
})

//兼容移动端触摸操作
document.addEventListener('touchstart',function(e){
  startX=e.touches[0].pageX;
  startY=e.touches[0].pageY;
})
document.addEventListener('touchend',function(e){
  lock=true;
  endX=e.changedTouches[0].pageX;
  endY=e.changedTouches[0].pageY;

  var detalX=endX-startX;
  var detalY=endY-startY;

  if(Math.abs(detalX)<0.1*documentWidth && Math.abs(detalY)<0.1*documentWidth){
    return 
  }
  if(Math.abs(detalX)>=Math.abs(detalY)){
    if(detalX>0){
      if(moveRight()){
        setTimeout(showGameOver,300);
      }
    }else{
      if(moveLeft()){
        setTimeout(showGameOver,300);
      }
    }
  }else{
    if(detalY>0){
      if(moveDown()){
        setTimeout(showGameOver,300);
      }
    }else{
      if(moveUp()){
        setTimeout(showGameOver,300);
      }
    }
  }
});
document.addEventListener('touchmove',function(e){
  e.preventDefault();
})
