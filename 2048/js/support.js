var documentWidth=window.screen.availWidth;
var gridContailWidth=460; 
var cellSideLength=100; 
var cellSpace=12;  


function getPosTop(i,j){
  return cellSpace+(cellSpace+cellSideLength)*i;
}

function getPosLeft(i,j){
  return cellSpace+(cellSpace+cellSideLength)*j;
}

function getNumberBgColor(num){
  switch(num){
    case 2:
      return '#eee4da';
      break;
    case 4:
      return '#ede0c8';
      break;
    case 8:
      return '#f2b179';
      break;
    case 16:
      return '#f59563';
      break;
    case 32:
      return '#f67c5f';
      break;
    case 64:
      return '#f65e3b';
      break;
    case 128:
      return '#edcf72';
      break;
    case 256:
      return '#edcc61';
      break;
    case 512:
      return '#9c0';
      break;
    case 1024:
      return '#33b5e5';
      break;
    case 2048:
      return '#09c';
      break;
    case 4096:
      return '#a6c';
      break;
    case 8192:
      return '#93e';
      break;
    default :
      return 'black';
  }
}

function getNumberColor(num){
  if(num<=4){
    return '#776a65';
  }else{
    return 'white';
  }
}

function canMoveLeft(board){
  for (var i=0;i<4;i++){
    for(var j=1;j<4;j++){
      var flag = board[i][j]!==0 && (board[i][j-1]===0 || board[i][j-1]===board[i][j]);
      if(flag){
        return true;
      }
    }
  }
  return false;
}

function canMoveRight(board){
  for (var i=0;i<4;i++){
    for(var j=2;j>=0;j--){
      var flag = board[i][j]!==0 && (board[i][j+1]===0 || board[i][j+1]===board[i][j]);
      if(flag){
        return true;
      }
    }
  }
  return false; 
}

function canMoveUp(board){
  for (var i=1;i<4;i++){
    for(var j=0;j<4;j++){
      var flag = board[i][j]!==0 && (board[i-1][j]===0 || board[i-1][j]===board[i][j]);
      if(flag){
        return true;
      }
    }
  }
  return false;  
}

function canMoveDown(board){
  for (var i=2;i>=0;i--){
    for(var j=0;j<4;j++){
      var flag = board[i][j]!==0 && (board[i+1][j]===0 || board[i+1][j]===board[i][j]);
      if(flag){
        return true;
      }
    }
  }
  return false;
}

function noBlockHorizontal(i,k,j,board){
  for(k=k+1;k<j;k++){
    if(board[i][k]!==0){
      return false;
    }
  }
  return true;
}

function noBlockVertical(i,k,j,board){
  for(k=k+1;k<j;k++){
    if(board[k][i]!==0){
      return false;
    }
  }
  return true;
}

function noMove(board){
  if(canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)){
    return false;
  }
  return true;
}
