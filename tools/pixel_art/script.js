var pixel_width = 16,
	pixel_height = 16,
	pixel_size = 30,
	preview_scale = 4,
	color_picker_count = 10;

var image_memory = [];

function blackwhite(r, g, b)
{
	return ((0.299 * r + 0.587 * g + 0.114 * b) > 186) ? "#000000" : "#ffffff";
}

function rgbtohex(color)
{
	var sr = color.r.toString(16);
	var sg = color.g.toString(16);
	var sb = color.b.toString(16);
	if(sr.length != 2) sr = "0" + sr;
	if(sg.length != 2) sg = "0" + sg;
	if(sb.length != 2) sb = "0" + sb;
	return(sr + sg + sb);
}

function hextorgb(hex)
{
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	var retval = {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	};

	return retval;
}

window.addEventListener("load", function()
{
	/* get elements */
	var canvas = document.getElementById("canvas");
	var preview = document.getElementById("preview");
	var result = document.getElementById("result");
	var sliderred = document.getElementById("sliderred");
	var slidergreen = document.getElementById("slidergreen");
	var sliderblue = document.getElementById("sliderblue");
	var inputred = document.getElementById("inputred");
	var inputgreen = document.getElementById("inputgreen");
	var inputblue = document.getElementById("inputblue");
	var selector_container = document.getElementById("choosecolor");
	var color_picker = document.getElementById("color_picker");
	var ictext = document.getElementById("ictext");
	var inputpxw = document.getElementById("inputpxw");
	var inputpxh = document.getElementById("inputpxh");
	var inputpxsize = document.getElementById("inputpxsize");
	var btnsave = document.getElementById("btnsave");
	var btnclear = document.getElementById("btnclear");
	var btnhelp = document.getElementById("btnhelp");
	var btnhelpclose = document.getElementById("btnhelpclose");
	var btnset = document.getElementById("btnset");
	var inputpxw = document.getElementById("inputpxw");
	var inputpxh = document.getElementById("inputpxh");
	var inputpxsize = document.getElementById("inputpxsize");
	var inputscale = document.getElementById("inputscale");
	var chkgrid = document.getElementById("chkgrid");
	var helpcont = document.getElementById("helpoverlay");

	var context = canvas.getContext("2d");
	var context_preview = preview.getContext("2d");
	var mousedown = 0, mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, color_index = 0;
	var x, y;
	var color_selectors = new Array(color_picker_count);

	for(x = 0; x < color_picker_count; x++)
	{
		var cpi = document.createElement("div");
		cpi.className = "showcolor";
		cpi.innerText = "#ffffff";
		color_selectors[x] = {
			color: { r: 255, g: 255, b: 255 },
			element: cpi
		};

		(function(x)
		{
			cpi.addEventListener("click", function(e)
			{
				color_selectors[color_index].element.classList.remove("selected");
				color_index = x;
				color_selectors[color_index].element.classList.add("selected");
				color_picker.value =
					"#" + rgbtohex(color_selectors[color_index].color);

				sliderred.value = inputred.value = color_selectors[color_index].color.r;
				slidergreen.value = inputgreen.value = color_selectors[color_index].color.g;
				sliderblue.value = inputblue.value = color_selectors[color_index].color.b;

				color_selectors[color_index].element.style.color =
				ictext.style.color =
					blackwhite(
					color_selectors[color_index].color.r,
					color_selectors[color_index].color.g,
					color_selectors[color_index].color.b);
			}, false);
		})(x);

		selector_container.appendChild(cpi);
	}

	color_selectors[color_index].element.classList.add("selected");
	color_selectors[color_index].color =
	{
		r: sliderred.value = inputred.value = 0,
		g: slidergreen.value = inputgreen.value = 0,
		b: sliderblue.value = inputblue.value = 0
	};

	inputpxw.value = pixel_width;
	inputpxh.value = pixel_height;
	inputpxsize.value = pixel_size;
	inputscale.value = preview_scale;
	preview.width = pixel_width;
	preview.height = pixel_height;
	canvas.width = pixel_width * pixel_size;
	canvas.height = pixel_height * pixel_size;
	helpcont.style.display = "none";
	setcolor();

	function draw()
	{
		var fnrect;
		if(chkgrid.checked)
		{
			context.fillStyle = "black";
			context.fillRect(0, 0, canvas.width, canvas.height);
			fnrect = function(x, y)
			{
				context.fillRect(pixel_size * x + 1, pixel_size * y + 1, pixel_size - 2, pixel_size - 2);
			};
		}
		else
		{
			fnrect = function(x, y)
			{
				context.fillRect(pixel_size * x, pixel_size * y, pixel_size, pixel_size);
			};
		}

		for(y = 0; y < pixel_height; y++)
		{
			for(x = 0; x < pixel_width; x++)
			{
				context.fillStyle = context_preview.fillStyle = "#" + rgbtohex(image_memory[y][x]);
				fnrect(x, y);
				context_preview.fillRect(preview_scale * x, preview_scale * y, preview_scale, preview_scale);
			}
		}

		/* draw cursor */
		var startX = cursorX * pixel_size - 1;
		var startY = cursorY * pixel_size - 1;
		context.fillStyle = "red";
		context.fillRect(startX, startY, pixel_size / 3, 2);
		context.fillRect(startX, startY, 2, pixel_size / 3);

		context.fillRect(startX, startY + pixel_size, pixel_size / 3, 2);
		context.fillRect(startX, startY + pixel_size / 3 * 2, 2, pixel_size / 3);

		context.fillRect(startX + pixel_size / 3 * 2, startY, pixel_size / 3, 2);
		context.fillRect(startX + pixel_size, startY, 2, pixel_size / 3);

		context.fillRect(startX + pixel_size / 3 * 2, startY + pixel_size, pixel_size / 3 + 2 , 2);
		context.fillRect(startX + pixel_size, startY + pixel_size / 3 * 2, 2, pixel_size / 3 + 2);
	}

	function update()
	{
		var newW = parseInt(inputpxw.value);
		var newH = parseInt(inputpxh.value);
		var newS = parseInt(inputpxsize.value);
		var newP = parseInt(inputscale.value);
		if(!isNaN(newW) && newW <= 64) pixel_width = newW;
		if(!isNaN(newW) && newH <= 64) pixel_height = newH;
		if(!isNaN(newS) && newS <= 32) pixel_size = newS;
		if(!isNaN(newP) && newP <= 32) preview_scale = newP;
		preview.width = preview_scale * pixel_width;
		preview.height = preview_scale * pixel_height;
		canvas.width = pixel_size * pixel_width;
		canvas.height = pixel_size * pixel_height;

		var oldH = image_memory.length;
		y = image_memory.length;
		while(y < pixel_height)
		{
			image_memory.push(new Array(pixel_width));
			for(x = 0; x < pixel_width; x++)
			{
				image_memory[y][x] = { r: 255, g: 255, b: 255 };
			}

			y++;
		}

		for(y = 0; y < oldH; y++)
		{
			for(x = 0; x < pixel_width; x++)
			{
				image_memory[y].push({ r: 255, g: 255, b: 255 });
			}
		}

		draw();
	}

	function setcolor()
	{
		color_selectors[color_index].element.style.backgroundColor =
		color_selectors[color_index].element.innerText =
		color_picker.value =
			"#" + rgbtohex(color_selectors[color_index].color);

		color_selectors[color_index].element.style.color =
		ictext.style.color =
			blackwhite(
			color_selectors[color_index].color.r,
			color_selectors[color_index].color.g,
			color_selectors[color_index].color.b);
	}

	function updatepixel(x, y)
	{
		if(x >= 0 && x < pixel_width && y >= 0 && y < pixel_height)
		{
			if(image_memory[y][x] != color_selectors[color_index].color)
			{
				image_memory[y][x].r = color_selectors[color_index].color.r;
				image_memory[y][x].g = color_selectors[color_index].color.g;
				image_memory[y][x].b = color_selectors[color_index].color.b;
				draw();
			}
		}
	}

	/* mouse events */
	canvas.addEventListener("mousedown", function(e) { mousedown = 1; });

	canvas.addEventListener("mouseup", function(e)
	{
		var canvasrect = canvas.getBoundingClientRect();
		mousedown = 0;
		mouseX = Math.floor((e.clientX - canvasrect.left) / pixel_size);
		mouseY = Math.floor((e.clientY - canvasrect.top) / pixel_size);
		updatepixel(mouseX, mouseY);
	});

	canvas.addEventListener("mousemove", function(e)
	{
		var canvasrect = canvas.getBoundingClientRect();
		mouseX = Math.floor((e.clientX - canvasrect.left) / pixel_size);
		mouseY = Math.floor((e.clientY - canvasrect.top) / pixel_size);
		if(mousedown) updatepixel(mouseX, mouseY);
	});

	btnsave.addEventListener("click", function()
	{
		btnsave.href = preview.toDataURL("image/png");
	});

	btnhelp.addEventListener("click", function()
	{
		helpcont.style.display = "block";
	});

	btnhelpclose.addEventListener("click", function()
	{
		helpcont.style.display = "none";
	});

	btnclear.addEventListener("click", function()
	{
		var r;
		if((r = confirm("All changes will be lost.")) == true)
		{
			for(y = 0; y < pixel_height; y++)
			{
				for(x = 0; x < pixel_width; x++)
				{
					image_memory[y][x].r = image_memory[y][x].g =
						image_memory[y][x].b = 255;
				}
			}
			draw();
		}
	});

	/* slider events */
	sliderred.addEventListener("input", function()
	{
		inputred.value = color_selectors[color_index].color.r = parseInt(sliderred.value);
		setcolor();
	});

	slidergreen.addEventListener("input", function()
	{
		inputgreen.value = color_selectors[color_index].color.g = parseInt(slidergreen.value);
		setcolor();
	});

	sliderblue.addEventListener("input", function()
	{
		inputblue.value = color_selectors[color_index].color.b = parseInt(sliderblue.value);
		setcolor();
	});

	/* number input events */
	inputred.addEventListener("input", function()
	{
		color_selectors[color_index].color.r = parseInt(inputred.value);
		if(isNaN(color_selectors[color_index].color.r))
			color_selectors[color_index].color.r = 0;

		sliderred.value = color_selectors[color_index].color.r;
		setcolor();
	});

	inputgreen.addEventListener("input", function()
	{
		color_selectors[color_index].color.g = parseInt(inputgreen.value);
		if(isNaN(color_selectors[color_index].color.g))
			color_selectors[color_index].color.g = 0;

		slidergreen.value = color_selectors[color_index].color.g;
		setcolor();
	});

	inputblue.addEventListener("input", function()
	{
		color_selectors[color_index].color.b = parseInt(inputblue.value);
		if(isNaN(color_selectors[color_index].color.b))
			color_selectors[color_index].color.b = 0;

		sliderblue.value = color_selectors[color_index].color.b;
		setcolor();
	});

	chkgrid.addEventListener("change", draw);
	btnset.addEventListener("click", update);

	btnclear.addEventListener("click", function()
	{
		for(y = 0; y < pixel_height; y++)
		{
			for(x = 0; x < pixel_width; x++)
			{
				image_memory[y][x] = { r: 255, g: 255, b: 255 };
				context_preview.fillStyle = context.fillStyle = "#" + rgbtohex(image_memory[y][x]);
				fnrect(x, y);
				context_preview.fillRect(preview_scale * x, preview_scale * y, preview_scale, preview_scale);
			}
		}
	});

	color_picker.addEventListener("change", function()
	{
		color_selectors[color_index].color = hextorgb(color_picker.value);
		sliderred.value = inputred.value = color_selectors[color_index].color.r;
		slidergreen.value = inputgreen.value = color_selectors[color_index].color.g;
		sliderblue.value = inputblue.value = color_selectors[color_index].color.b;
		setcolor();
	});

	window.addEventListener("keydown", function(event)
	{
		var c = event.which || event.keyCode;
		if(c >= 48 && c <= 57) /* 0 - 9 */
		{
			var v;
			if(c == 48) { v = 10; } /* 0 */
			else { v = c - 48; }
			--v;

			color_selectors[color_index].element.classList.remove("selected");
			color_index = v;
			color_selectors[color_index].element.classList.add("selected");

			sliderred.value = inputred.value = color_selectors[color_index].color.r;
			slidergreen.value = inputgreen.value = color_selectors[color_index].color.g;
			sliderblue.value = inputblue.value = color_selectors[color_index].color.b;

			ictext.style.color =
				blackwhite(
				color_selectors[color_index].color.r,
				color_selectors[color_index].color.g,
				color_selectors[color_index].color.b);
		}

		switch(c)
		{
			case 87: /* W */
				if(cursorY > 0)
				{
					cursorY--;
				}
				break;

			case 65: /* A */
				if(cursorX > 0)
				{
					cursorX--;
				}
				break;

			case 83: /* S */
				if(cursorY < pixel_height - 1)
				{
					cursorY++;
				}
				break;

			case 68: /* D */
				if(cursorX < pixel_width - 1)
				{
					cursorX++;
				}
				break;

			case 32: /* SPACE */
				updatepixel(cursorX, cursorY);
				break;

			case 82: /* R */
				sliderred.focus();
				break;

			case 71: /* G */
				slidergreen.focus();
				break;

			case 66: /* B */
				sliderblue.focus();
				break;

			case 67: /* C */
				color_picker.click();
				break;

			default:
				return;
		}

		draw();
	});

	update();
	draw();
});
