var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 480;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var keys =
{
	left: false,
	right: false,
	pause: false
};

var ball =
{
	speed: 6,
	vX: 3,
	vY: 3,
	x: 0,
	y: 0,
	w: 20,
	h: 20
};

var paddle =
{
	vX: 0,
	vY: 0,
	x: 0,
	y: 0,
	w: 100,
	h: 20
};

var blk =
{
	x: 0,
	y: 0,
	w: 122,
	h: 20
};

var blocks = new Array(25);

var colors =
[
	"#FF0000",
	"#FF8000",
	"#FFFF00",
	"#00FF00",
	"#0000FF"
];

for(var i = 0; i < 25; i++)
{
	blocks[i] = 1;
}

paddle.y = CANVAS_HEIGHT - paddle.h - 5;
ball.x = CANVAS_WIDTH / 2 + ball.w / 2;
ball.y = CANVAS_HEIGHT / 2 + ball.h / 2;

function ptInRect(x0, y0, x1, y1, w1, h1)
{
	if(x0 >= x1 && x0 < x1 + w1 && y0 >= y1 && y0 < y1 + h1)
	{
		return true;
	}

	return false;
}

function colCheck(obj0, obj1)
{
	if(
		ptInRect(obj0.x,          obj0.y,          obj1.x, obj1.y, obj1.w, obj1.h) ||
		ptInRect(obj0.x + obj0.w, obj0.y,          obj1.x, obj1.y, obj1.w, obj1.h) ||
		ptInRect(obj0.x,          obj0.y + obj0.h, obj1.x, obj1.y, obj1.w, obj1.h) ||
		ptInRect(obj0.x + obj0.w, obj0.y + obj0.h, obj1.x, obj1.y, obj1.w, obj1.h))
	{
		return true;
	}

	return false;
}

function draw()
{
	if(keys.right)
	{
		paddle.vX++;
	}
	else if(keys.left)
	{
		paddle.vX--;
	}

	paddle.x += paddle.vX;
	paddle.vX *= 0.8;

	if(paddle.x < 5)
	{
		paddle.x = 5;
	}
	else if(paddle.x > CANVAS_WIDTH - paddle.w - 5)
	{
		paddle.x = CANVAS_WIDTH - paddle.w - 5;
	}

	ball.x += ball.vX;
	ball.y += ball.vY;

	/* ball collision with paddle */
	if(colCheck(ball, paddle))
	{
		var a = ((paddle.x + paddle.w / 2) - ball.x - (ball.w / 2)) / (paddle.w / 2);
		console.log(a);
		ball.vX = ball.speed * (a - 0.5);
		ball.vY = -(ball.speed - Math.abs(ball.vX));
	}

	if(ball.y < 5)
	{
		ball.vY *= -1;
	}
	else if(ball.x <= 5 || ball.x > CANVAS_WIDTH - ball.w - 5)
	{
		ball.vX *= -1;
	}
	else if(ball.y > CANVAS_HEIGHT - ball.h - 5)
	{
		ball.vX = 3;
		ball.vY = 3;
		ball.x = CANVAS_WIDTH / 2 + ball.w;
		ball.y = CANVAS_HEIGHT / 2 + ball.h;
	}

	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	for(var i = 0; i < 5; i++)
	{
		ctx.fillStyle = colors[i];
		for(var j = 0; j < 5; j++)
		{
			if(blocks[5 * i + j] == 1)
			{
				blk.x = j * 127 + 5;
				blk.y = i * 25 + 5;

				if(colCheck(ball, blk))
				{
					blocks[5 * i + j] = 0;
					ball.vY *= -1;
				}

				ctx.fillRect(blk.x, blk.y, blk.w, blk.h);
			}
		}
	}

	ctx.fillStyle = "#000000";
	ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);	
	ctx.beginPath();
	ctx.arc(ball.x + ball.w / 2, ball.y + ball.h / 2, ball.w / 2, 0, 2 * Math.PI);
	ctx.fill();
	requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

/* events */
window.addEventListener("keydown", function(event)
{
	switch(event.which)
	{
		case 39:
		case 68:
			keys.right = true;
			break;

		case 37:
		case 65:
			keys.left = true;
			break;

		case 32:
			keys.pause = true;
			break;
	}
}, false);

window.addEventListener("keyup", function(event)
{
	switch(event.which)
	{
		case 39:
		case 68:
			keys.right = false;
			break;

		case 37:
		case 65:
			keys.left = false;
			break;

		case 32:
			keys.pause = false;
			break;
	}
}, false);
