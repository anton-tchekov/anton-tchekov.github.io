var matrix = [0,0,0,0,0];
var clicked = false;
var colCount = 5;
var mouseBtn = 0;
var result = "";

var colOutput = document.getElementById("numcols");
var addColBtn = document.getElementById("addcol");
var resOutput = document.getElementById("result");
var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();

canvas.width = 100;
canvas.height = 160;

function grid()
{
	var hx;
	var i;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "black";
	ctx.beginPath();

	for(i = 0; i < canvas.height / 20 + 20; i++)
	{
		ctx.fillRect(0, i * 20 - 1, canvas.width, 2);
	}

	for(i = 0; i < canvas.width / 20 + 20; i++)
	{
		ctx.fillRect(i * 20 - 1, 0, 2, canvas.height);
	}

	ctx.fill();
	ctx.fillStyle = "#c00";
	result = "";

	for(var x = 0; x < matrix.length; x++)
	{
		for(var y = 0; y < 8; y++)
		{
			if((matrix[x]>>y) % 2 != 0)
			{
				ctx.fillRect(x * 20 + 1, y * 20 + 1, 18, 18);
			}
		}

		hx = matrix[x].toString(16).toUpperCase();

		if(hx.length < 2)
		{
			hx = "0" + hx;
		}

		result += "0x" + hx + ", ";
	}

	resOutput.innerText = result;
}

function addCol()
{
	canvas.width += 20;
	matrix.push(0);
	colCount++;
	colOutput.innerText = "Cols: " + colCount;
	grid();
}

function changeMatrix(e, mov)
{
	if(clicked)
	{
		var x = Math.floor((e.clientX - rect.left) / 20);
		var y = Math.floor((e.clientY - rect.top) / 20);

		if(!mov)
		{
			mouseBtn = e.button;
		}

		switch(mouseBtn)
		{
			case 0:
				matrix[x] = matrix[x] | (1 << y);
				break;

			case 2:
				matrix[x] = matrix[x] & ~(1 << y);
				break;
		}

		grid();
	}
}

grid();

canvas.addEventListener("mousedown", function(e)
{
	clicked = true;
	changeMatrix(e, false);
});

addColBtn.addEventListener("mouseup", function(e)
{
	addCol();
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
