var canvas = document.getElementById("canvas");
var blockSize = 30;
var blocksW = 10;
var blocksH = 20;
var cRow = 19;
var anz_blocks = 3;
var moving_blocks = new Array(anz_blocks);
var mov_dir = 1;
var mov_speed = 340;
var first_row = true;
var game_over = false;

canvas.width = blockSize * blocksW;
canvas.height = blockSize * blocksH;

var ctx = canvas.getContext("2d");

var blocks = new Array(blocksH);

for(var i = 0; i < blocksH; i++)
{
	blocks[i] = new Array(blocksW);
	for(var j = 0; j < blocksW; j++)
	{
		blocks[i][j] = 0;
	}
}

for(var b = 0; b < anz_blocks; b++)
{
	moving_blocks[b] = {
		x: b,
		y: cRow
	};
}

function draw()
{
	ctx.clearRect(0,0,canvas.width,canvas.height)
	for(var y = 0; y < blocksH; y++)
	{
		for(var x = 0; x < blocksW; x++)
		{
			if(blocks[y][x] == 1)
			{
				ctx.fillStyle = "#f33";
				ctx.fillRect(x*blockSize+1, y*blockSize+1, blockSize-2, blockSize-2);
			}
		}
	}

	for(var b = 0; b < anz_blocks; b++)
	{
		if(mov_dir)
		{
			moving_blocks[b].x++;
		}
		else
		{
			moving_blocks[b].x--;
		}

		ctx.fillStyle = "#33f";
		ctx.fillRect(moving_blocks[b].x*blockSize+1, moving_blocks[b].y*blockSize+1, blockSize-2, blockSize-2);
	}

	if(moving_blocks[anz_blocks-1].x == 9) mov_dir = 0;
	if(moving_blocks[0].x == 0) mov_dir = 1;

	if(game_over)
	{
		ctx.fillStyle = "black";
		ctx.font = "50px Arial";
		ctx.fillText("Game Over", 20, 100);
		ctx.fillText("Points: " + (19-cRow), 20, 150);
		ctx.fillText("Press ", 20, 200);
		ctx.fillText("[Space]", 100, 250);
	}
	else if(cRow == 0)
	{
		ctx.fillStyle = "black";
		ctx.font = "50px Arial";
		ctx.fillText("You Win", 20, 100);
		ctx.fillText("Press ", 20, 200);
		ctx.fillText("[Space]", 100, 250);
	}
	else
	{
		setTimeout(draw, mov_speed);
	}
}

draw();

window.addEventListener("keydown", function(e)
{
	if(e.keyCode == 32) // Space
	{
		if(game_over || cRow == 0)
		{
			cRow = 19;
			anz_blocks = 3;
			mov_dir = 1;
			mov_speed = 300;
			first_row = true;

			for(var i = 0; i < blocksH; i++)
			{
				for(var j = 0; j < blocksW; j++)
				{
					blocks[i][j] = 0;
				}
			}

			for(var b = 0; b < anz_blocks; b++)
			{
				moving_blocks[b] = {
					x: b,
					y: cRow
				};
			}

			game_over = false;
			draw();
		}
		else
		{
			mov_speed-=10;
			if(first_row)
			{
				first_row = false;
				cRow--;
				mov_dir = 1;
				for(var b = 0; b < anz_blocks; b++)
				{
					blocks[moving_blocks[b].y][moving_blocks[b].x] = 1;
					moving_blocks[b].y = cRow;
					moving_blocks[b].x = b;
				}
			}
			else
			{
				var nAnz = anz_blocks;
				for(var b = 0; b < anz_blocks; b++)
				{
					if(blocks[moving_blocks[b].y+1][moving_blocks[b].x] == 1)
					{
						blocks[moving_blocks[b].y][moving_blocks[b].x] = 1;
					}
					else
					{
						nAnz--;
					}
				}

				if(nAnz > 0)
				{
					cRow--;
					mov_dir = 1;

					anz_blocks = nAnz;
					for(var b = 0; b < anz_blocks; b++)
					{
						moving_blocks[b].y = cRow;
						moving_blocks[b].x = b;
					}
				}
				else
				{
					game_over = true;
				}
			}
		}
	}
}, false);
