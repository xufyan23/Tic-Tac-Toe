
const cells = document.querySelectorAll('.box');
const play = document.getElementById('heading');
const strategy = document.getElementById('strategy');
const reset = document.getElementById('reset');
const winText = document.getElementById('statergy');
const resetBtn = document.getElementById('reset');
const winingCombinations = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
]
const tick = 'tick';
const cross = 'cross';
let currentPlayer;
let playerWin = false;
// let winningMessageElement = document.querySelector('#heading');
let winningMessageTextElement = document.querySelector('.win-text');

startGame();

resetBtn.addEventListener('click', () => {
	startGame();
	winningMessageTextElement.innerText= 'Play';
})

function startGame() {
	cells.forEach(cell => {
				cell.classList.remove(tick);
		cell.classList.remove(cross);
		cell.removeEventListener('click', handleClick);
		cell.addEventListener('click', handleClick, {once: true})
	});
	playerWin = false;
}

function handleClick(e) {
	if(playerWin) {
		return false;
	}
	const cell = e.target;
	const currentClass = currentPlayer ? tick : cross;

	placeMark(cell, currentClass);

	if(checkWins(currentClass)) {
		endGame(false);
	}
	else if (isDraw()) {
		endGame(true)
	}

	// else {
	// 	switchTurns();
	// }
}

function placeMark(cell, currentClass) {
	//place marks
	cell.classList.add(currentClass);
	console.log(cell);

	//switch turns
	switchTurns();
}

function switchTurns () {
	currentPlayer = !currentPlayer;
}

function checkWins(currentClass) {
	return winingCombinations.some(combination => {
		return combination.every(index => {
			return cells[index].classList.contains(currentClass);
		})
	})
}

function isDraw() {
	return [...cells].every(cell => {
		return cell.classList.contains(tick) || 
		cell.classList.contains(cross); 
	})
}

function endGame(draw) {
	if(draw) {
		winningMessageTextElement.innerText='Draw';
	}
	else {
		winningMessageTextElement.innerText = `${currentPlayer ? "cross" : "tick"} wins`;
		playerWin = true;
	}
}

