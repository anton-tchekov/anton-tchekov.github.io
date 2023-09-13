var canvas = document.getElementById("canvas");
var result = document.getElementById("result");
var colLabel = document.getElementById("numcols");
var addColBtn = document.getElementById("addcol");

var ctx = canvas.getContext("2d");

var BLOCK_SIZE = 20;
var BLOCK_COUNT = 16;
var CANVAS_SIZE = BLOCK_SIZE * BLOCK_COUNT;

var rect = canvas.getBoundingClientRect();
var clicked = false;

var matrix = new Array(32);

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

for(var i = 0; i < 32; i++)
{
	matrix[i] = 0;
}

function draw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;

	for(var x = 0; x <= canvas.width; x += BLOCK_SIZE)
	{
		ctx.moveTo(x, 0);
		ctx.lineTo(x, canvas.height);
	}

	for(var y = 0; y <= canvas.height; y += BLOCK_SIZE)
	{
		ctx.moveTo(0, y);
		ctx.lineTo(canvas.width, y);
	}

	ctx.stroke();

	ctx.fillStyle = "#CC0000";

	for(var i = 0; i < BLOCK_COUNT; i++)
	{
		for(var b = 0; b < 8; b++)
		{
			if((matrix[i*2] >> b) & 1)
			{
				ctx.fillRect(BLOCK_SIZE * i + 1, BLOCK_SIZE * b + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
			}

			if((matrix[i*2+1] >> b) & 1)
			{
				ctx.fillRect(BLOCK_SIZE * i + 1, BLOCK_SIZE * (8 + b) + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
			}
		}
	}

	var r = "";
	var hr = "";
	var hx = "ff";

	for(var k = 0; k < 2 * BLOCK_COUNT; ++k)
	{
		hx = matrix[k].toString(16).toUpperCase();

		if(hx.length < 2)
		{
			hx = "0" + hx;
		}

		r += "0x" + hx + ", ";
		hr += hx;
	}

	result.innerText = r + "\n\n" + hr;
}

function changeMatrix(e, mov)
{
	if(clicked)
	{
		var x = Math.floor((e.clientX - rect.left) / BLOCK_SIZE);
		var y = Math.floor((e.clientY - rect.top) / BLOCK_SIZE);

		if(!mov)
		{
			mouseBtn = e.button;
		}

		if(y < 8)
		{
			switch(mouseBtn)
			{
				case 0:
					matrix[x*2] |= (1 << y);
					break;

				case 2:
					matrix[x*2] &= ~(1 << y);
					break;
			}
		}
		else
		{
			switch(mouseBtn)
			{
				case 0:
					matrix[x*2+1] |= (1 << (y - 8));
					break;

				case 2:
					matrix[x*2+1] &= ~(1 << (y - 8));
					break;
			}
		}

		draw();
	}
}

draw();

canvas.addEventListener("mousedown", function(e)
{
	clicked = true;
	changeMatrix(e, false);
});

canvas.addEventListener("mouseup", function()
{
	clicked = false;
});

canvas.addEventListener("contextmenu", function(e)
{
	e.preventDefault();
});

canvas.addEventListener("mousemove", function(e)
{
	changeMatrix(e, true);
});

addColBtn.addEventListener("mouseup", function(e)
{
	canvas.width += BLOCK_SIZE;
	matrix.push(0);
	matrix.push(0);
	++BLOCK_COUNT;
	colLabel.innerText = "Cols: " + BLOCK_COUNT;
	draw();
});