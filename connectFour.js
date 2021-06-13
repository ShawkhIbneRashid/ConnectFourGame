var player1Color = 'rgb(51, 102, 204)';

var player2Color = 'rgb(0, 204, 255)';

var game_on = true;
var table = $('table tr');

// Change the color of a button
function changeColor(rowIndex,colIndex,color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

// Report Back to current color of a button
function returnColor(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// Take in column index, returns the bottom row that is still gray
function checkBottom(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row,colIndex);
    if (colorReport === 'rgb(255, 255, 255)') {
      return row
    }
  }
}

// Check to see if 4 inputs are the same color
function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(255, 255, 255)' && one !== undefined);
}

// Check for Horizontal Wins
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        return true;
      }else {
        continue;
      }
    }
  }
}

// Game End
function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(winningPlayer+" has won! Browser will refresh after 5 seconds.").css("fontSize", "50px")
      setTimeout(() => {  window.location.reload(true); }, 5000);
    }
  }
}



var buttonPressed = document.querySelector('#button1');
buttonPressed.addEventListener('click', function(){
  alert("Let the game begin");
  // Start with Player One
  var player1 = prompt("Player One Name: ");

  var player2 = prompt("Player Two Name: ");

  $('#button1').fadeOut('fast');

  var currentPlayer = 1;
  var currentName = player1;
  var currentColor = player1Color;

  $('h3').text(player1+"'s turn.");

  $('.board button').on('click',function() {

    // Recognize what column was chosen
    var col = $(this).closest("td").index();

    // Get back bottom available row to change
    var bottomAvail = checkBottom(col);

    // Drop the chip in that column at the bottomAvail Row
    changeColor(bottomAvail,col,currentColor);

    // Check for a win or a tie.
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
      gameEnd(currentName);
    }

    // If no win or tie, continue to next player
    currentPlayer = currentPlayer * -1 ;

    // Re-Check who the current Player is.
    if (currentPlayer === 1) {
      currentName = player1;
      $('h3').text(currentName+"'s turn.");
      currentColor = player1Color;
    }else {
      currentName = player2
      $('h3').text(currentName+"'s turn.");
      currentColor = player2Color;
    }

  })
});
