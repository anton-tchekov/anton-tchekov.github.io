			if(level[y][x].indexOf("/,") != -1)
			{
				if(nonsolidCollision(player.x, player.y, blocksize, blocksize, rX, rY, blocksize, blocksize) == true)
				{
					level[y][x] = "/,50";
				}
				var time = level[y][x].split(",")[1];
				time--;
				level[y][x] = "/," + time;
				if(time == 0)
				{
					level[y][x] = "/";
				}
				var alpha = 1 / 50 * time;
				obj.FillRect(context, "rgba(128,128,128," + alpha + ")", rX, rY, blocksize, blocksize);
				solidCollision(player.x, player.y, blocksize, blocksize, rX, rY, blocksize, blocksize);
			}



				case "/":
					if(nonsolidCollision(player.x, player.y, blocksize, blocksize, rX, rY, blocksize, blocksize) == true)
					{
						obj.FillRect(context, "gray", rX, rY, blocksize, blocksize);
						level[y][x] = "/,50";
					}
					solidCollision(player.x, player.y, blocksize, blocksize, rX, rY, blocksize, blocksize);
					break;
				
				case "-":
					obj.FillRect(context, "blue", rX, rY, blocksize, blocksize);
					if(player.newlevel == true)
					{
						player.x = rX;
						player.y = rY;
						player.newlevel = false;
					}
					break;
					
				case "+":
					obj.FillRect(context, "lime", rX, rY, blocksize, blocksize);					
					if(nonsolidCollision(player.x, player.y, blocksize, blocksize, rX, rY, blocksize, blocksize) == true)
					{
						gotonext = true;
					}
					break;



	if(gotonext == true)
	{
		player.newlevel = true;
		currentlevel++;
		if(currentlevel == 12)
		{
			player.antigravity = true;
		}
		if(currentlevel == maxlevel)
		{
			win = true;
		}
		else
		{
			level = eval("level" + currentlevel);
		}
	}

		if(win == true)
	{
		context.textAlign = "center"; 
		context.textBaseLine = "middle";
		context.fillStyle = "black";
		context.font = "100px Arial";
		context.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2);
	}
	else
	{
		movement();
		draw();
		requestAnimationFrame(update);	
	}

			if(player.antigravity == false)
			{
			}
			else
			{
				if(!player.jumping && player.grounded)
				{
						player.jumping = true;
						player.grounded = false;
						player.vY = +player.speed * 2;
				}	
			}


		if(player.antigravity == false)
		{
			
		}
		else
		{
			player.vY -= gravity;
		}