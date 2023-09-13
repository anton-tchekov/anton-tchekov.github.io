var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var gSize = 5;
var auswahl = 1;
var clicked = false;

var array2d;

function step()
{
	var newArray = array2d;
	for(var y = 2; y < array2d.length - 2; y++)
	{
		for(var x = 2; x < array2d[0].length - 2; x++)
		{
			switch(array2d[y][x])
			{
				case 1:
					ctx.fillStyle = "#000000";
					ctx.fillRect(x * gSize, y * gSize, gSize, gSize);
					newArray[y][x] = 1;
					break;

				case 4:
					if(array2d[y + 1][x] == 0)
					{
						newArray[y][x] = 0;
						newArray[y + 1][x] = 4;
					}
					else
					{
						if(Math.random() < 0.5)
						{
							if(array2d[y][x - 1] == 0)
							{
								newArray[y][x] = 0;
								newArray[y][x - 1] = 4;
							}
						}
						else
						{
							if(array2d[y][x + 1] == 0)
							{
								newArray[y][x] = 0;
								newArray[y][x + 1] = 4;
							}
						}
					}

					ctx.fillStyle = "#0000ff";
					ctx.fillRect(x * gSize, y * gSize, gSize, gSize);
					break;
			}
		}
	}

	array2d = newArray;
}

function redraw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	step();
	step();
	step();
	step();
	step();

	requestAnimationFrame(redraw);
}

function init2DArray(width, height)
{
	var array = new Array(height);
	for(var i = 0; i < height; ++i)
	{
		array[i] = new Array(width);
	}

	for(var y = 0; y < array.length; ++y)
	{
		for(var x = 0; x < array[0].length; ++x)
		{
			array[y][x] = 0;
		}
	}

	return array;
}

function moveMouse(e)
{
	if(clicked)
	{
		var rect = canvas.getBoundingClientRect();
		var x = Math.round((e.clientX - rect.left) / gSize);
		var y = Math.round((e.clientY - rect.top) / gSize);
		switch(auswahl)
		{
			case 0:
				rectangle(x - 2, y - 2, 4, 4, 0, 2);
				break;

			case 1:
				rectangle(x - 2, y - 2, 4, 4, 1);
				break;

			case 2:
				rectangle(x - 1, y - 1, 3, 3, 4);
				break;
		}
	}
}

function rectangle(x, y, w, h, t, r = false)
{
	for(var i = x; i < x + w; i++)
	{
		for(var j = y; j < y + h; j++)
		{
			if(r == false)
			{
				if(array2d[j][i] == 0)
				{
					array2d[j][i] = t;
				}
			}
			else if (r == 1)
			{
				if(array2d[j][i] == 0 || array2d[j][i] == 4)
				{
					array2d[j][i] = t;
				}
			}
			else
			{
				array2d[j][i] = t;
			}
		}
	}
}

function change(t)
{
	auswahl = t;
}

array2d = init2DArray(200, 150);
redraw();

canvas.addEventListener("mousedown", function() { clicked = true; });
canvas.addEventListener("mouseup", function() { clicked = false; });
canvas.addEventListener("mousemove", function(e) { moveMouse(e); });
