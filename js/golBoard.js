function GolBoard(w, h, wrap) {
	this.width = w;
	this.height = h;
	this.boardWrap = wrap;

	// sets up board, a 2d array of boolean values with the size set when executing the constructor
	// sets up a virtualBoard which initialises as a copy of board
	// calls this.makeBoard to construct DOMBoard 
	this.init = function() {
		this.board = [];
		this.virtualBoard = [];
		for (i = 0;i < this.width; i++) {
			this.board[i] = [];
			this.virtualBoard[i] = [];
			for (j = 0;j < this.height; j++) {
				this.board[i][j] = false;
				this.virtualBoard[i][j] = false;
			}
		}
		
		//this.virtualBoard = this.board.slice(0);

		this.DOMBoard = document.createElement('div');
		this.DOMBoard.setAttribute('id', 'golBoard');
		this.DOMBoard.setAttribute('class', 'golboard');

		for (var i = 0; i < this.width; i++) {
			var column = document.createElement('div');
			column.setAttribute('class', 'golboard-column');
			for (var j = 0; j < this.height; j++) {
				var cell = document.createElement('div');
				cell.setAttribute('class', 'golboard-cell');
				cell.addEventListener('click', function(e) {
					e.target.classList.toggle('active');
				});
				column.appendChild(cell);
			}
			this.DOMBoard.appendChild(column);
		}
		document.getElementById('body').appendChild(this.DOMBoard);
	}
	this.randomSeed = function() {
		for (i = 0;i < this.width; i++) {
			for (j = 0;j < this.height; j++) {
				if (Math.random() < 0.5) {
					this.board[i][j] = false;
				} else {
					this.board[i][j] = true;
				}
				
			}
		}
	}

	// updates DOMBoard, DOM representation of board, from board
	this.updateDOMBoard = function() {
		for (var i = 0; i < this.width; i++) {
			for (var j = 0; j < this.height; j++) {
				var cell = this.DOMBoard.childNodes[i].childNodes[j];
				if(this.board[i][j]) {
					if( ! cell.classList.contains('active') ) {
						cell.classList.add('active');
					}
				} else {
					if( cell.classList.contains('active') ) {
						cell.classList.remove('active');
					}
				}
			}
		}
	}

	// updates board (primary board object) from DOMBoard
	this.updateBoard = function() {
		for (var i = 0; i < this.width; i++) {
			for (var j = 0; j < this.height; j++) {
				var cell = this.DOMBoard.childNodes[i].childNodes[j];
				if( cell.classList.contains('active') ) {
					this.board[i][j] = true;
				} else {
					this.board[i][j] = false;
				}
			}
		}
	}

	// updates board from DOMBoard
	// updates virtualBoard to match board
	// calculates which cells live and which cells die
	// updates board from virtualBoard which holds next generation settings
	this.calculateNextGeneration = function() {
		this.updateBoard();
		for (i = 0;i < this.width; i++) {
			this.virtualBoard[i] = this.board[i].slice(0);
		}
		for (var i = 0;i < this.width; i++) {
			for (var j = 0;j < this.height; j++) {
				var population = this.countPopulatedCells(i, j);

				if (population < 2) {
					// console.log("cell " + i + " " + j + " dies");
					// cell dies
					this.virtualBoard[i][j] = false;
				} else if (population == 3) {
					// console.log("cell " + i + " " + j + " becomes alive(r)");
					// cell lives
					this.virtualBoard[i][j] = true;
				} else if (population > 3) {
					// console.log("cell " + i + " " + j + " dies");
					// cell dies
					this.virtualBoard[i][j] = false;
				}
			}
		}
		for (i = 0;i < this.width; i++) {
			this.board[i] = this.virtualBoard[i].slice(0);
		}
	}
	// count the surrounding active cells of a specified cell with optional wrapping enabled
	// return number of cells
	this.countPopulatedCells = function(x, y) {
		//console.log(x);
		//console.log(y);
		var count = 0;
		var debug = "primary cell: " + x + " " + y + " - surrounding cells: ";
		for (var i = x - 1;i < x + 2; i++) {
			for (var j = y - 1;j < y + 2; j++) {
				if (i == x && j == y ) {
					//console.log("skipped");
				} else {
					var xPosition = i;
					var yPosition = j;
					if(this.boardWrap) {
						if (xPosition < 0) {
							// console.log("1");
							xPosition = this.width - 1;
						}
						if (xPosition == this.width) {
							// console.log("2");
							xPosition = 0;
						}
						if (yPosition < 0) {
							// console.log("3");
							yPosition = this.height - 1;
						}
						if (yPosition == this.height) {
							// console.log("4");
							yPosition = 0;
						}
					}
					debug += xPosition + " " + yPosition + " | "
					if (this.board[xPosition][yPosition]) {
						//console.log(xPosition + '.' + yPosition + ' is true');
						count++;
					}
				}
			}
		}
		/*
		if (this.board[x][y] || count == 3) {
			console.log(debug);
			console.log(count);
		}*/
		return count;
	}
	this.start = function() {
		this.startInterval = setInterval(function() {
			golBoard.calculateNextGeneration();
            golBoard.updateDOMBoard();
		}, 100);
	}
	this.stop = function() {
		clearInterval(this.startInterval);
	}
	this.clearBoard = function() {
		for (i = 0;i < this.width; i++) {
			for (j = 0;j < this.height; j++) {
				this.board[i][j] = false;
			}
		}
	}
}

var golBoard = new GolBoard(50, 50, true);
golBoard.init();