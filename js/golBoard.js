function GolBoard(w, h) {
	this.width = w;
	this.height = h;

	this.boardWrap = true;
	this.domBoard;

	this.board = [];
	this.init = function() {
		for (i = 0;i < this.width; i++) {
			this.board[i] = [];
			for (j = 0;j < this.height; j++) {
				this.board[i][j] = false;
			}
		}
		this.makeBoard();
	}

	this.virtualBoard = this.board;

	this.updateBoard = function() {
		this.updateVirtualBoard();
		this.board = this.virtualBoard;
		// update visual board -------------------- START HERE
		for (var i = 0; i < this.width; i++) {
			for (var j = 0; j < this.height; j++) {
				if(this.board[i][j]) {
					var cell = domBoard.childNodes[i].childNodes[j];
					cell.classList.remove('inactive');
					cell.classList.add('active');
				}
			}
		}
	}

	this.makeBoard = function() {
		domBoard = document.createElement('div');
		domBoard.setAttribute('id', 'golBoard');
		domBoard.setAttribute('class', 'golboard');

		for (var i = 0; i < this.width; i++) {
			var column = document.createElement('div');
			column.setAttribute('class', 'golboard-column');
			for (var j = 0; j < this.height; j++) {
				var cell = document.createElement('div');
				cell.setAttribute('class', 'golboard-cell inactive');
				column.appendChild(cell);
			}
			domBoard.appendChild(column);
		}
		document.getElementsByTagName("BODY")[0].appendChild(domBoard);
	}

	this.updateVirtualBoard = function() {
		for (i = 0;i < w; i++) {
			for (j = 0;j < y; j++) {
				var population = this.countPopulatedCells(i, j);
						
				if (population < 2) {
					// cell dies
					this.virtualBoard[i][j] = false;
				} else if (population == 3) {
					// cell lives
					this.virtualBoard[i][j] = true;
				} else if (population > 3) {
					// cell lives
					this.virtualBoard[i][j] = false;
				}
			}
		}
	}
	this.countPopulatedCells = function(x, y) {
		var count = 0;

		for (i = x - 1;i < i + 2; i++) {
			for (j = y - 1;j < y + 2; j++) {
				if (i != x && j != y) {
					if(this.boardWrap) {
						if (x < 0) {
							x = this.width - 1;
						}
						if (x == width) {
							x = 0;
						}
						if (y < 0) {
							y = this.height - 1;
						}
						if (y == height) {
							y = 0;
						}
					}
					if (this.board[i][j] == true) {
						count++;
					}
				}
			}
		}

		return count;
	}


}

var golBoard = new GolBoard(10, 10);
golBoard.init();

golBoard.virtualBoard[4][4] = true;
golBoard.virtualBoard[4][5] = true;
golBoard.virtualBoard[5][4] = true;
golBoard.virtualBoard[5][5] = true;

