const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("#reset");
const winnerDiv = document.querySelector("#winner");
const winnermsg = document.querySelector("#winner p");
const newbtn = document.createElement("button");

reset.style.display = "none";

let turnX = true;
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    reset.style.display = "";
    if(turnX){
      box.innerText = "X";
      turnX = false;
    } else{
      box.innerText = "O";
      turnX = true;
    }
    box.disabled = true;

    checkWinner();
  })
})

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  })
}

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  })
}

const showWinner = (winner) => {
  winnermsg.innerText = `Congratulations, ${winner}! You Win!!`;
  newGame();
  winnerDiv.style.display = "";
  reset.style.display = "none";
}

const newGame = () => {
  newbtn.innerText = "New Game";
  newbtn.classList.add("newGame");
  document.querySelector("#winner").appendChild(newbtn);
  newbtn.addEventListener("click", () => {
    enableBoxes();
    winnerDiv.style.display = "none";
    reset.style.display = "none";
  })
}

const checkWinner = () => {
  for(let pattern of winPatterns){
    let boxVal1 = boxes[pattern[0]].innerText;
    let boxVal2 = boxes[pattern[1]].innerText;
    let boxVal3 = boxes[pattern[2]].innerText;
    if(boxVal1 !== "" && boxVal2 !== "" && boxVal3 !== ""){
      if(boxVal1 === boxVal2 && boxVal2 === boxVal3){
        showWinner(boxVal1);
        disableBoxes();
        return;
      }
      else{
        let draw = true;
          boxes.forEach((box) => {
            if(!box.disabled) draw = false; 
          })
          if(draw) {
            winnermsg.innerText = "It's a draw!";
            newGame();
            winnerDiv.style.display = "";
            reset.style.display = "none";
          }
      }
    }
  }
}


reset.addEventListener("click", () => {
  enableBoxes();
  winnerDiv.style.display = "none";
  reset.style.display = "none";
})