(function ()
{
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();
var canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d"), width = 1000, height = 600,
player = {
		x: width / 2,
		y: height - 15,
		width: 30,
		height: 50,
		speed: 4,
		velX: 0,
		velY: 0,
		jumping: false,
		grounded: false,
		shield: 50,
		maxshield: 50,
		invincible: false
}, keys = [], friction = 0.8, gravity = 0.3, boxes = [], fallen = [], enemys = [];

var stop = false;
var bullets = [];
var score = 0;

boxes.push({
	x: 0,
	y: 0,
	width: 1,
	height: height
});

boxes.push({
	x: 0,
	y: height - 1,
	width: width,
	height: 50
});

boxes.push({
	x: width - 1,
	y: 0,
	width: 50,
	height: height
});

boxes.push({
	x: 0,
	y: 0,
	width: width,
	height: 1
});

var ms = 500;

setTimeout(addobj, ms);

canvas.width = width;
canvas.height = height;

function update()
{
	requestAnimationFrame(update);
	score++;
	if(keys[38] || keys[87])
	{
		if(!player.jumping && player.grounded)
		{
			player.jumping = true;
			player.grounded = false;
			player.velY = -player.speed * 2;
		}
	}

	if(keys[32])
	{
		if(player.shield > 0)
		{
			player.invincible = true;
			player.shield -= 2;
		}
		else
		{
			player.invincible = false;
		}
	}
	else
	{
		if(player.shield < player.maxshield)
		{
			player.shield++;
		}
		player.invincible = false;
	}

	if(keys[39] || keys[68])
	{
		if(player.velX < player.speed)
		{
			player.velX++;
		}
	}

	if(keys[37] || keys[65])
	{
		if(player.velX > -player.speed)
		{
			player.velX--;
		}
	}

	player.velX *= friction;
	player.velY += gravity;
	ctx.clearRect(0, 0, width, height);

	player.grounded = false;

	for(var i = 0; i < boxes.length; i++)
	{
		if(i >= 4)
		{
			ctx.beginPath();
			ctx.fillStyle = "black";
			ctx.moveTo(boxes[i].x, boxes[i].y);
			ctx.lineTo(boxes[i].x + boxes[i].width, boxes[i].y);
			ctx.lineTo(boxes[i].x + boxes[i].width / 2, boxes[i].y + boxes[i].height);
			ctx.fill();
			ctx.closePath();
		}

		if(boxes[i].moving == true)
		{
			if(boxes[i].y > canvas.height)
			{
				boxes.splice(i, 1);
				i--;
			}

			boxes[i].velY += gravity;
			boxes[i].velX *= friction;

			boxes[i].y += boxes[i].velY;
			boxes[i].x += boxes[i].velX;

			if(boxes[i].x > player.x)
			{
				boxes[i].velX -= 0.5;
			}
			else
			{
				boxes[i].velX += 0.5;
			}

			var dir = colCheck(player, boxes[i]);
			if(dir !== null)
			{
				if(!player.invincible)
				{
					if(player.height > 20)
					{
						player.height -= 20;
					}
					else
					{
						alert("You Lose! Score: " + score);
						reset();
					}
				}

				boxes.splice(i, 1);
				i--;
			}
		}
		else
		{
			var dir = colCheck(player, boxes[i]);
			if(dir === "l" || dir === "r")
			{
				player.velX = 0;
				player.jumping = false;
			}
			else if(dir === "b")
			{
				player.grounded = true;
				player.jumping = false;
			}
			else if(dir === "t")
			{
				player.velY *= -1;
			}
		}
	}

	if(player.grounded)
	{
		player.velY = 0;
	}

	for(var j = 0; j < bullets.length; j++)
	{
		for(var k = 4; k < boxes.length - 4; k++)
		{
			var dir = colCheck(bullets[j], boxes[k]);

			if(dir !== null)
			{
				bullets.splice(j, 1);
				j--;

				boxes.splice(k, 1);
				k--;
			}
		}

		bullets[j].x += bullets[j].deltaX;
		bullets[j].y += bullets[j].deltaY;
		ctx.fillStyle = "red";
		ctx.fillRect(Math.round(bullets[j].x), Math.round(bullets[j].y), bullets[j].width, bullets[j].height);
	}

	player.x += player.velX;
	player.y += player.velY;

	if(player.invincible)
	{
		var r = Math.round(Math.random() * 255);
		var g = Math.round(Math.random() * 255);
		var b = Math.round(Math.random() * 255);

		var rndcol = "rgba(" + r + ", " + g + ", " + b + ", 1)";
		ctx.fillStyle = rndcol;

		ctx.fillRect(player.x - 30, player.y - 50, player.width + 60, 20);
	}
	else
	{
		ctx.fillStyle = "black";
	}

	ctx.fillRect(5, 5, player.shield * (200 / player.maxshield), 30);

	ctx.fillStyle = "black";
	ctx.fillRect(player.x, player.y, player.width, player.height);
	ctx.font = "40px Arial";
	ctx.textAlign = "right";
	ctx.fillText(score, 1000, 30);
}

function colCheck(shapeA, shapeB)
{
	var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
		vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
		hWidths = (shapeA.width / 2) + (shapeB.width / 2),
		hHeights = (shapeA.height / 2) + (shapeB.height / 2),
		colDir = null;

	if(Math.abs(vX) < hWidths && Math.abs(vY) < hHeights)
	{
		var oX = hWidths - Math.abs(vX), oY = hHeights - Math.abs(vY);
		if(oX >= oY)
		{
			if(vY > 0)
			{
				colDir = "t";
				shapeA.y += oY;
			}
			else
			{
				colDir = "b";
				shapeA.y -= oY;
			}
		}
		else
		{
			if(vX > 0)
			{
				colDir = "l";
				shapeA.x += oX;
			}
			else
			{
				colDir = "r";
				shapeA.x -= oX;
			}
		}
	}

	return colDir;
}

function addobj()
{
	var posx = rnd(0, canvas.width);

	boxes.push({
		x: posx,
		y: 0,
		width:20,
		height:50,
		moving: true,
		velX:0,
		velY:0,
		desdir: "left"
	});

	ms -= ms / 200;
	setTimeout(addobj, ms);
}

function rnd(s, e)
{
	return s + Math.round(Math.random() * (e));
}

function reset()
{
	player.x = canvas.width / 2;
	player.y = canvas.height - 100;
	keys = [];
	score = 0;
	player.height = 50;
	ms = 500;
}

canvas.addEventListener("click", function(e){
	var x;
	var y;
	if (e.pageX || e.pageY) {
		x = e.pageX;
		y = e.pageY;
	}
	else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	var step = 50;
	var entfX = x - player.x;
	var entfY = y - player.y;

	var dX = entfX / step;
	var dY = entfY / step;

	bullets.push({
		x: player.x,
		y: player.y,
		width:10,
		height:10,
		deltaX: dX,
		deltaY: dY,
		velX:0,
		velY:0
	});
});

document.body.addEventListener("keydown", function (e) {keys[e.keyCode] = true;});
document.body.addEventListener("keyup", function (e) {keys[e.keyCode] = false;});
update();
