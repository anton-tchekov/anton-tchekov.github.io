if(!Array.prototype.equals)
{
	Array.prototype.equals = function(array)
	{
		if(!array)
		{
			return false;
		}

		if(this.length != array.length)
		{
			return false;
		}

		for(var i = 0, l = this.length; i < l; ++i)
		{
			if(this[i] instanceof Array && array[i] instanceof Array)
			{
				if(!this[i].equals(array[i]))
				{
					return false;
				}
			}
			else if(this[i] != array[i])
			{
				return false;
			}
		}

		return true;
	}

	Object.defineProperty(Array.prototype, "equals", { enumerable: false });
}

var turn;
var array;

newGame();

var info = document.createElement("p");
info.id = "info";
document.body.appendChild(info);
updateInfo();

var table = document.createElement("div");
table.id = "container";

for(var i = 0; i < 3; i++)
{
	var tr = document.createElement("div");
	tr.id = "row" + i;
	tr.className = "row";
	for(var j = 0; j < 3; j++)
	{
		var td = document.createElement("div");
		td.className = "col col" + j;
		td.id = "lf" + i + "f" + j;
		td.onclick = function()
		{
			var mid = this.id.split("f");
			var row = mid[1];
			var col = mid[2];
			if(array[row][col] == 0)
			{
				array[row][col] = turn;
				if(turn == 1)
				{
					turn = 2;
					this.innerText = "✕";
					this.style.color = "green";
				}
				else
				{
					turn = 1;
					this.innerText = "○";
					this.style.color = "red";
				}

				var cw = checkWin();
				if(cw)
				{
					switch(cw)
					{
						case 1:
							alert("X wins");
							break;

						case 2:
							alert("O wins")
							break;

						case 3:
							alert("Draw");
							break;
					}

					newgame();
				}

				updateInfo();
			}
		};

		tr.appendChild(td);
	}

	table.appendChild(tr);
}

document.body.appendChild(table);

function updateInfo()
{
	if(turn == 1)
	{
		info.innerText = "✕'s turn";
	}
	else
	{
		info.innerText = "○'s turn";
	}
}

function checkWin()
{
	// Horizontal
	for(var k = 0; k < 3; k++)
	{
		if(array[k].equals([1,1,1]))
		{
			return 1;
		}

		if(array[k].equals([2,2,2]))
		{
			return 2;
		}
	}

	// Vertical
	if(array[0][0] == 1 && array[1][0] == 1 && array[2][0] == 1)
	{
		return 1;
	}

	if(array[0][1] == 1 && array[1][1] == 1 && array[2][1] == 1)
	{
		return 1;
	}

	if(array[0][2] == 1 && array[1][2] == 1 && array[2][2] == 1)
	{
		return 1;
	}

	if(array[0][0] == 2 && array[1][0] == 2 && array[2][0] == 2)
	{
		return 2;
	}

	if(array[0][1] == 2 && array[1][1] == 2 && array[2][1] == 2)
	{
		return 2;
	}

	if(array[0][2] == 2 && array[1][2] == 2 && array[2][2] == 2)
	{
		return 2;
	}

	// Diagonal
	if(array[0][0] == 1 && array[1][1] == 1 && array[2][2] == 1)
	{
		return 1;
	}

	if(array[2][0] == 1 && array[1][1] == 1 && array[0][2] == 1)
	{
		return 1;
	}

	if(array[0][0] == 2 && array[1][1] == 2 && array[2][2] == 2)
	{
		return 2;
	}

	if(array[2][0] == 2 && array[1][1] == 2 && array[0][2] == 2)
	{
		return 2;
	}

	return 0;
}

function newGame()
{
	turn = 1;
	if(Math.random() > 0.5)
	{
		turn = 2;
	}

	array = [
		[0,0,0],
		[0,0,0],
		[0,0,0]
	];
}
