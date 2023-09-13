var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "black";

var fieldW = 250, fieldH = 250;
var pxWidth = 2, pxHeight = 2;
var field = new Array(fieldW);
var bits = new Array(8);

function update()
{
	for(var i = 0; i < 8; ++i)
	{
		bits[i] = document.getElementById("bit" + i).checked;
	}

	document.getElementById("rule").value =
		((bits[7] << 7) |
		(bits[6] << 6) |
		(bits[5] << 5) |
		(bits[4] << 4) |
		(bits[3] << 3) |
		(bits[2] << 2) |
		(bits[1] << 1) |
		(bits[0] << 0));
}

function draw()
{
	update();
	for(var i = 0; i < fieldW; ++i)
	{
		if(Math.random() < 0.5)
		{
			field[i] = 1;
		}
		else
		{
			field[i] = 0;
		}
	}

	ctx.clearRect(0, 0, fieldW * pxWidth, fieldH * pxHeight);
	for(var n = 0; n < fieldH; ++n)
	{
		var newArray = new Array(fieldW);
		for(var i = 0; i < fieldW; ++i)
		{
			if(field[i] == 1)
			{
				ctx.fillRect(i * pxWidth, n * pxHeight, pxWidth, pxHeight);
			}

			var lft = getVal(i - 1);
			var mdl = getVal(i);
			var rht = getVal(i + 1);

			newArray[i] =
				(bits[7] && lft == 1 && mdl == 1 && rht == 1) ||
				(bits[6] && lft == 1 && mdl == 1 && rht == 0) ||
				(bits[5] && lft == 1 && mdl == 0 && rht == 1) ||
				(bits[4] && lft == 1 && mdl == 0 && rht == 0) ||
				(bits[3] && lft == 0 && mdl == 1 && rht == 1) ||
				(bits[2] && lft == 0 && mdl == 1 && rht == 0) ||
				(bits[1] && lft == 0 && mdl == 0 && rht == 1) ||
				(bits[0] && lft == 0 && mdl == 0 && rht == 0);
		}

		field = newArray;
	}
}

function getVal(x)
{
	return (x >= 0 && x < fieldW) ? field[x] : 0;
}

draw();

document.getElementById("update").onclick = function()
{
	draw();
};

for(var i = 0; i < 8; ++i)
{
	document.getElementById("bit" + i).onchange = update;
}
