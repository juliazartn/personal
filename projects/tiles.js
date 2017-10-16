//Julia Zaratan
//This file creates tiles for a fifteen puzzle in addition to functionality so that the user
//can move the tiles around within the puzzle area appropriately to return them to their
//original state. Includes end of game message that displays when puzzle is solved.

(function () {
	"use strict";

	var emptyTop;  //Top position value of empty square
	var emptyLeft; //Left position value of empty square

	//When the page is loaded, immediately create the 15 tiles in sorted order
	//Also creates an empty div on page for the win message to appear in
	//Also allow shuffle button to be clicked at any time to shuffle pieces
	window.onload = function() {
		createTiles();
		createWinDiv();
		document.getElementById("shufflebutton").onclick = shuffle;
	};

	function createWinDiv() {
		var winMessage = document.createElement("div");
		winMessage.id = "winMessage";
		document.getElementById("instructions").appendChild(winMessage);
		document.getElementById("winMessage").innerHTML = "";				
	}

	//Creates 15 tiles that form a 4x4 square with an empty space in the bottom right corner
	//Make the background of each square show a different piece of the puzzle
	function createTiles() {
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++ ) {
				var tile = document.createElement("div"); //create tile
				tile.classList.add("tile");
				tile.id = "square_" + i + "_" + j;
				document.getElementById("puzzlearea").appendChild(tile);

				var p = document.createElement("p");
				p.innerHTML = (i*4) + j + 1; //Add ordered number to tile
				tile.appendChild(p);

				tile.style.top = i*100 + "px"; //position tile
				tile.style.left = j*100 + "px";
				tile.style.backgroundPosition = j*(-100) + "px " + i*(-100) + "px"; 

				tile.onmouseenter = mouseover;
				tile.onmouseleave = mouseleave;
				tile.onclick = squareClick;
			}
			document.getElementById("puzzlearea").appendChild(tile);
		}
		var empty = document.getElementById("puzzlearea").lastChild; 
		emptyLeft = window.getComputedStyle(empty).left; //get empty tile positions
		emptyTop = window.getComputedStyle(empty).top;
		document.getElementById("puzzlearea").removeChild(empty);
	}

	//Make the tile have a highlighted border and text upon hover if it is able to be moved
	function mouseover() {
		if(canMove(this)) {
			this.classList.add("highlight");
		}
	}

	//Make any tile that is not being hovered return to its original appearance
	function mouseleave() {
		this.classList.remove("highlight");
	}

	//When tile is clicked, moved to empty space if in correct position
	//Afterwards, checks whether user has solved puzzle
	function squareClick() {
		if(canMove(this)){
			moveSquare(this);
			checkWin();
		}
	}
	//Move the given square into the position of the empty space
	function moveSquare(square) {
		var pxleft = parseInt(window.getComputedStyle(square).left) + "px";
		var pxtop = parseInt(window.getComputedStyle(square).top) + "px";
		square.style.left = emptyLeft; //move tile
		square.style.top = emptyTop;
		emptyLeft = pxleft; //update empty square positions
		emptyTop = pxtop;
	}


	//Returns boolean of whether the given square is directly to the left, top, right, or bottom 
	//of the empty space
	function canMove(square) {
		var currentL = parseInt(window.getComputedStyle(square).left);
		var currentT = parseInt(window.getComputedStyle(square).top); 
		var newL = parseInt(emptyLeft);
		var newT = parseInt(emptyTop);
		var diffLeft =  currentL - newL;
		var diffTop =  currentT - newT;
		if((currentT == newT && Math.abs(diffLeft) == 100) || //if directly to the side
			(currentL == newL && Math.abs(diffTop) == 100)) { //or if directly on top/bottom
			return true;
		}
		return false;
	}

	//Checks if puzzle is in solved state
	//If so, displays congratulations message on page
	function checkWin() {
		var win = true;
		var tiles = document.querySelectorAll(".tile");
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				if(i !=3 || j != 3) {
					var tile = document.getElementById("square_" + i + "_" + j);
					var correctTop = parseInt(window.getComputedStyle(tile).top);
					var correctLeft = parseInt(window.getComputedStyle(tile).left);
					if(correctTop != i*100 || correctLeft != j*100) { //if not in correct position
						win = false;
					}
				}
			}
		}
		var winMessage = document.getElementById("winMessage");

		if(win) {
			winMessage.style.backgroundColor = 'rgb(129, 206, 129)';		
			winMessage.innerHTML = "Congrats! You won!";
		}
		else {
			winMessage.style.backgroundColor = 'transparent';					
			winMessage.innerHTML = "";
		}
	}

	//Shuffles the inital order of the tiles into a solvable form of the puzzle
	//by randomly moving pieces that directly neighbor the empty space
	function shuffle() {
		var tiles = document.querySelectorAll(".tile");
		for(var i = 0; i < 1000; i++) { //shuffle 1000 times
			var neighbors = [];
			for(var j = 0; j < tiles.length; j++) {
				if(canMove(tiles[j])) {
					neighbors.push(tiles[j]); //find movable tiles
				}
			}
			var random = parseInt(Math.random() * neighbors.length); 
			moveSquare(neighbors[random]);
		}
		checkWin();

	}
}());