function golBoard(w, h) {
	this.width = w;
	this.height = h;

	this.boardWrap = true;

	this.board = [];
	this.initBoard = function() {
		for (i = 0;i < w; i++) {
			this.board[i] = [];
			for (j = 0;j < y; j++) {
				this.board[i][j] = false;
			}
		}
		this.makeBoard();
	}

	this.virtualBoard = this.board;

	this.updateBoard = function() {
		this.updateVirtualBoard();
		this.board = this.virtualBoard;
	}

	this.makeBoard = function() {
		var domBoard = document.createElement('div');
		domBoard.setAttribute('id', 'golBoard');

		for (i = 0;i < w;i++) {
			var column = document.createElement('div');
			column.setAttribute('class', 'golBoardColumn');
			domBoard.appendChild(column);
			for (i = 0;i < w;i++) {
				var cell = document.createElement('div');
				cell.setAttribute('class', 'golBoardCell');
				cell.setAttribute('class', 'inactive');
				column.appendChild(cell);
			}
		}
		document.getElementById('body').appendChild(domBoard);
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