var ctx = document.getElementById("canvas").getContext("2d");

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var colors = new Array();
var widths = new Array();

var paint;
var lwidth = 5;

var color = "#000000";

document.getElementById("canvas").addEventListener("mouseup", function(e)
{
	paint = false;
});

document.getElementById("canvas").addEventListener("mouseleave", function(e)
{
	paint = false;
});

document.getElementById("canvas").addEventListener("mousemove", function(e)
{
	if(paint)
	{
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
		redraw();
	}
});

document.getElementById("canvas").addEventListener("mousedown", function(e)
{
	paint = true;
	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	redraw();
});

function addClick(x, y, dragging)
{
	colors.push(color);
	widths.push(lwidth);
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
}

function redraw()
{
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.lineJoin = "round";
	for(var i = 0; i < clickX.length; ++i)
	{
		ctx.strokeStyle = colors[i];
		ctx.lineWidth = widths[i];
		ctx.beginPath();
		if(clickDrag[i] && i)
		{
			ctx.moveTo(clickX[i-1], clickY[i-1]);
		}
		else
		{
			ctx.moveTo(clickX[i]-1, clickY[i]);
		}

		ctx.lineTo(clickX[i], clickY[i]);
		ctx.closePath();
		ctx.stroke();
	}
}

document.body.addEventListener("resize", function()
{
	ctx.canvas.width  = window.innerWidth;
	redraw();
});

var icolor = document.getElementById("icolor");
var icolor_wrapper = document.getElementById("icolor-wrapper");

var iclear = document.getElementById("iclear");
var isave = document.getElementById("isave");
var isize = document.getElementById("isize");

icolor.onchange = function()
{
	color = this.value;
};

iclear.onclick = function()
{
	clickX = [];
	clickY = [];
	clickDrag = [];
	colors = [];
	widths = [];
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height, 500);
};

isave.onclick = function()
{
	var dataURL = canvas.toDataURL("image/png");
	this.href = dataURL;
};

isize.onchange = function()
{
	lwidth = this.value;
};

