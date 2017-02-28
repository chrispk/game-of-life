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
		this.board = this.virtualBoard;
		for (var i = 0; i < this.width; i++) {
			for (var j = 0; j < this.height; j++) {
				var cell = domBoard.childNodes[i].childNodes[j];
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
		this.updateVirtualBoard();
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
				cell.setAttribute('class', 'golboard-cell');
				cell.addEventListener('click', function(e) {
					e.target.classList.toggle('active');
				});
				column.appendChild(cell);
			}
			domBoard.appendChild(column);
		}
		document.getElementById('body').appendChild(domBoard);
	}

	this.updateVirtualBoard = function() {
		for (var i = 0;i < this.width; i++) {
			for (var j = 0;j < this.height; j++) {
				var population = this.countPopulatedCells(i, j);
						
				if (population < 2) {
					// cell dies
					this.virtualBoard[i][j] = false;
				} else if (population == 3) {
					// cell lives
					this.virtualBoard[i][j] = true;
				} else if (population > 3) {
					// cell dies
					this.virtualBoard[i][j] = false;
				}
			}
		}
	}
	this.countPopulatedCells = function(x, y) {
		var count = 0;

		for (var i = x - 1;i < x + 1; i++) {
			for (var j = y - 1;j < y + 1; j++) {
				if (i != x && j != y) {
					var xPosition = i;
					var yPosition = j;
					if(this.boardWrap) {
						if (xPosition < 0) {
							xPosition = this.width - 1;
						}
						if (xPosition == this.width) {
							xPosition = 0;
						}
						if (yPosition < 0) {
							yPosition = this.height - 1;
						}
						if (yPosition == this.height) {
							yPosition = 0;
						}
					}
					if (this.board[xPosition][yPosition] ) {
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

golBoard.updateBoard();