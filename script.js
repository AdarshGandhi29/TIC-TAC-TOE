console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;
let vsComputer = false;

// Function to change the turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won";
      isgameover = true;
      document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "200px";
      document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "20vw";
    }
  });

  // Check for draw
  let draw = true;
  Array.from(boxtext).forEach((element) => {
    if (element.innerText === "") {
      draw = false;
    }
  });

  if (draw && !isgameover) {
    document.querySelector(".info").innerText = "Draw";
    isgameover = true;
  }
};

// Minimax function to evaluate the best move
const minimax = (newBoard, player) => {
  let boxtext = document.getElementsByClassName("boxtext");
  let availSpots = [];
  for (let i = 0; i < boxtext.length; i++) {
    if (newBoard[i] === "") {
      availSpots.push(i);
    }
  }

  if (checkWinForPlayer("X", newBoard)) {
    return { score: -10 };
  } else if (checkWinForPlayer("0", newBoard)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  let moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    let move = {};
    move.index = availSpots[i];
    newBoard[availSpots[i]] = player;

    if (player === "0") {
      let result = minimax(newBoard, "X");
      move.score = result.score;
    } else {
      let result = minimax(newBoard, "0");
      move.score = result.score;
    }

    newBoard[availSpots[i]] = "";
    moves.push(move);
  }

  let bestMove;
  if (player === "0") {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
};

// Check for win for a specific player
const checkWinForPlayer = (player, board) => {
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return wins.some((e) => {
    return (
      board[e[0]] === player &&
      board[e[1]] === player &&
      board[e[2]] === player
    );
  });
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && !isgameover) {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!isgameover) {
        document.querySelector(".info").innerText = "Turn for " + turn;
        if (turn === "0" && vsComputer) {
          let boxtexts = document.getElementsByClassName("boxtext");
          let board = [];
          for (let i = 0; i < boxtexts.length; i++) {
            board.push(boxtexts[i].innerText);
          }
          let bestMove = minimax(board, "0");
          boxtexts[bestMove.index].innerText = "0";
          turn = changeTurn();
          audioTurn.play();
          checkWin();
          if (!isgameover) {
            document.querySelector(".info").innerText = "Turn for " + turn;
          }
        }
      }
    }
  });
});

// Reset button event listener
document.getElementById("reset").addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  isgameover = false;
  document.querySelector(".line").style.width = "0";
  document.querySelector(".info").innerText = "";
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0";
  document.querySelector(".modeSelection").style.display = "flex";
  document.getElementById("reset").classList.add("hidden");
});

// Mode selection event listeners
document.getElementById("vsOther").addEventListener("click", () => {
  vsComputer = false;
  document.querySelector(".info").innerText = "Turn for X";
  document.querySelector(".modeSelection").style.display = "none";
  document.getElementById("reset").classList.remove("hidden");
});

document.getElementById("vsComputer").addEventListener("click", () => {
  vsComputer = true;
  document.querySelector(".info").innerText = "Turn for X";
  document.querySelector(".modeSelection").style.display = "none";
  document.getElementById("reset").classList.remove("hidden");
});

document.getElementById("vsComputer").addEventListener("click", () => {
  vsComputer = true;
  document.querySelector(".info").innerText = "Turn for X";
  document.querySelector(".modeSelection").style.display = "none";
  document.getElementById("reset").classList.remove("hidden");
});


