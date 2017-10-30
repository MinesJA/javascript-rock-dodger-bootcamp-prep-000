// rocks are 20px high
// DODGER is 20px high
// GAME_HEIGHT - 20 - 20 = 360px;



const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const RIGHT_WALL = 360
const LEFT_WALL = 0
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

//CODE BELOW

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    //360 is where the rock starts to be on the same line as the dodger
    //DODGER is 40 pixels wide. Position + 40 = right corner of DODGER
    //rock is 20 pixel's wide. Position + 20 = right corner of rock

    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = (positionToInteger(DODGER.style.left)) + 40
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = (positionToInteger(rock.style.left))+ 20

    if (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerRightEdge ||
      rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge ||
      rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) {
      return true
    }
  }
}

function createRock(x) {
  console.log("1/5 Entered createRock")
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0
  rock.style.top = top

  $('#game').append(rock);

  console.log("2/5 Reached end of createRock")

   moveRock()

  function moveRock() {
    console.log("3/5 Entered moveRock")

    var rockPositionTop = positionToInteger(rock.style.top)
    rock.style.top = `${top + 2}px`

    if(checkCollision === true){
        endGame();
      } else if (rockPositionTop === 380){
        GAME.removeChild(rock);
      } else {
        window.requestAnimationFrame(moveRock)

        //rockPositionTop = rockPositionTop + 2
        //window.requestAnimationFrame(function move(){
        //top = `${top + 2}px`
      }
        console.log("4/5 At end of moveRock")

        ROCKS.push(rock)
        return rock
    }
    console.log("5/5 END END")
    window.requestAnimationFrame(moveRock)

  }

}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */

function endGame() {
}

function moveDodger(e) {
  var position = positionToInteger(DODGER.style.left)

  if(e.which === LEFT_ARROW){
    if(position > LEFT_WALL){
      moveDodgerLeft();
    }
  } else if(e.which === RIGHT_ARROW){
    if(position < RIGHT_WALL){
      moveDodgerRight();
    }
  }
}


function moveDodgerLeft() {
  var position = positionToInteger(DODGER.style.left)
	window.requestAnimationFrame(function dodge(){dodger.style.left = `${position - 4}px`})
}

function moveDodgerRight() {
  var position = positionToInteger(DODGER.style.left)
	window.requestAnimationFrame(function dodge(){dodger.style.left = `${position + 4}px`})
}

/*
 @param {string} p The position property
 @returns {number} The position as an integer (without 'px')
*/

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}


function start() {
  console.log("Start clicked")
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
