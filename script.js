let boxes = Array.from(document.querySelectorAll(".box"));
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;

let turnO = true;

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
        if (turnO) {
            box.style.color = "#9d4edd";
            box.innerText = 'O';
            turnO = false;
            count++;
        } else {
            box.style.color = '#4a4e69';
            box.innerText = 'X';
            turnO = true;
            count++;
        }
        box.classList.add("disabled");

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";  
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    if (count === 9) {
        msg.innerText = "Game Draw";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
    for (let pattern of winPatterns) {
        let posn1Val = boxes[pattern[0]].innerText;
        let posn2Val = boxes[pattern[1]].innerText;
        let posn3Val = boxes[pattern[2]].innerText;

        if (posn1Val !== "" && posn1Val === posn2Val && posn2Val === posn3Val) {
            showWinner(posn1Val);
            count = 0;
        }
    }
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
  