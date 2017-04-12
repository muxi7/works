function showNumWidthAnimation(i,j,randNum){
  var numberCell=$('#number-cell-'+i+'-'+j);
  numberCell.css({
    'background-color':getNumberBgColor(randNum),
    'color':getNumberColor(randNum),
    'font-size':0.6*cellSideLength
  });
  numberCell.text(randNum);
  numberCell.animate({
    width:cellSideLength,
    height:cellSideLength,
    top:getPosTop(i,j),
    left:getPosLeft(i,j)
  },50);
}

function showMoveAnimation(fromX,fromY,toX,toY){
  var numberCell=$("#number-cell-"+fromX+"-"+fromY);
  numberCell.animate({
    top:getPosTop(toX,toY),
    left:getPosLeft(toX,toY)
  },200);
}

function updateScore(score){
  $('#score').text(score);
}