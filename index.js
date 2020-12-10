/**
 * returns a random integer from 0 to 3
 *
 * @return {number} the random number
 */
function rand0to3() {
  return Math.floor(Math.random() * 4);
}

/**
 * puts ships in 4 random spots on the player's board
 *
 * @param {object} the player
 */
function placeShips(p) {
  do {
    let x = rand0to3();
    let y = rand0to3();
    if (p.board[x][y]===0) {
      p.board[x][y] = 1;
      p.shipcount++;
    }
  } while (p.shipcount < 4);
}

/**
 * collects a 0 to 3 response from the user
 * if the user gives an unusable response, prompt again
 *
 * @param {string} the string to use in prompting the user
 * @return {number} the number from 0 to 3
 */
function get0to3(promptString) {
  let ans1 = 0;
  while (true) {
    let ans = prompt(promptString);
    ans1 = parseInt(ans);
    if (isNaN(ans1)) {
      continue;
    }
    if (ans1 < 0 || ans1 > 3) {
      continue;
    }
    break;
  }
  return ans1;
}

/**
 * collects the x and y coordinates from the player
 * Notifies if a hit has occurred, and clears that spot on the board
 * @param {object} the player
 * @return {boolean} true if the last ship has been sunk, false otherwise
 */
function collectMove(p) {
  console.log("column0",p.board[0]);
  console.log("column1",p.board[1]);
  console.log("column2",p.board[2]);
  console.log("column3",p.board[3]);
  let x = get0to3(`${p.name}, enter the x coordinate, from 0 to 3:`);
  let y = get0to3(`${p.name}, enter the y coordinate, from 0 to 3:`);
  if (p.board[x][y] === 1) {
    alert(`${p.name}, that's a hit!`);
    p.board[x][y] = 0;
    p.shipcount--;
    if (p.shipcount === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    alert(`${p.name}, you missed.`);
    return false;
  }
}

const battleship = () => {
  const player1 = {
    name: "",
    board: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
    shipcount:  0
  };
  const player2 = {
    name: "",
    board: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
    shipcount: 0
  };
  placeShips(player1);
  placeShips(player2);
  player1.name = prompt("Player 1, enter your name:");
  player2.name = prompt("Player 2, enter your name:");
  let turn = 1;
  let won = false;
  let winner = "";
  while (!won) {
    if (turn === 1) {
      won=collectMove(player1);
      if (won) {
        winner = player1.name;
      }
      turn = 2;
    } else {
      won=collectMove(player2);
      if (won) {
        winner = player2.name;
      }
      turn = 1;
    }
  };
  return `The winner is ${winner}!`;
}

const gameResult = battleship()

const htmlTarget = document.getElementById('result')
htmlTarget.innerHTML = gameResult
