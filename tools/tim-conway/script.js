var BLOCK_SIZE = 20;

var _canvas = document.getElementById("canvas");
var _lbl_result = document.getElementById("lbl_result");
var _lbl_info = document.getElementById("lbl_info");
var _btn_add_col = document.getElementById("btn_add_col");
var _btn_add_row = document.getElementById("btn_add_row");
var _btn_clipboard = document.getElementById("btn_clipboard");

var _context = _canvas.getContext("2d");
var _clicked = false;
var _matrix = null;
var _width = 10;
var _height = 10;
var _copy = "";

resize(_width, _height);

function resize(w, h)
{
	var mtx = new Array(h);
	for(var y = 0; y < h; ++y)
	{
		mtx[y] = new Array(w);
		for(var x = 0; x < w; ++x)
		{
			mtx[y][x] = 0;
		}
	}

	if(_matrix != null)
	{
		for(var y = 0; y < _height; ++y)
		{
			for(var x = 0; x < _width; ++x)
			{
				mtx[y][x] = _matrix[y][x];
			}
		}
	}

	_matrix = mtx;
	_canvas.width = BLOCK_SIZE * w;
	_canvas.height = BLOCK_SIZE * h;
	_width = w;
	_height = h;
	_lbl_info.innerText = "Cols: " + _width +  "; Rows: " + _height;
	_context.clearRect(0, 0, _canvas.width, _canvas.height);
	draw_grid();
	redraw();
}

function draw_grid()
{
	_context.strokeStyle = "black";
	_context.lineWidth = 2;

	for(var x = 0; x <= _canvas.width; x += BLOCK_SIZE)
	{
		_context.moveTo(x, 0);
		_context.lineTo(x, _canvas.height);
	}

	for(var y = 0; y <= _canvas.height; y += BLOCK_SIZE)
	{
		_context.moveTo(0, y);
		_context.lineTo(_canvas.width, y);
	}

	_context.stroke();
}

function redraw()
{
	_context.fillStyle = "#CC0000";
	for(var i = 0; i < _height; i++)
	{
		for(var b = 0; b < _width; b++)
		{
			if(_matrix[i][b])
			{
				_context.fillRect(BLOCK_SIZE * b + 1, BLOCK_SIZE * i + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
			}
		}
	}

	update_result();
}

function is_empty_row(row)
{
	var sum = 0;
	for(var x = 0; x < _width; ++x)
	{
		if(_matrix[row][x] == 0)
		{
			++sum;
		}
	}

	return sum == _width;
}

function is_empty_col(col)
{
	var sum = 0;
	for(var y = 0; y < _height; ++y)
	{
		if(_matrix[y][col] == 0)
		{
			++sum;
		}
	}

	return sum == _height;
}

function update_result()
{
	var startY = 0;
	for(; startY < _height; ++startY)
	{
		if(!is_empty_row(startY))
		{
			break;
		}
	}

	var endY = _height - 1;
	for(; endY >= 0; --endY)
	{
		if(!is_empty_row(endY))
		{
			break;
		}
	}

	var startX = 0;
	for(; startX < _width; ++startX)
	{
		if(!is_empty_col(startX))
		{
			break;
		}
	}

	var endX = _width - 1;
	for(; endX >= 0; --endX)
	{
		if(!is_empty_col(endX))
		{
			break;
		}
	}

	var out = "{\n\t\"type\": \"ENTER_NAME_HERE\",\n";

	out += "\t\"pattern\":\n\t[\n";
	for(var y = startY; y <= endY; ++y)
	{
		out += "\t\t\"";
		for(var x = startX; x <= endX; ++x)
		{
			out += _matrix[y][x] == 1 ? 'X' : ' ';
		}
		out += y != endY ? "\",\n" : "\"\n";
	}

	out += "\t]\n}";

	_lbl_result.innerText = _copy = out;
}

function change_matrix(e, mov)
{
	if(_clicked)
	{
		var rect = _canvas.getBoundingClientRect();
		var x = Math.floor((e.clientX - rect.left) / BLOCK_SIZE);
		var y = Math.floor((e.clientY - rect.top) / BLOCK_SIZE);

		if(!mov)
		{
			mouseBtn = e.button;
		}

		var fill = -1;
		if(mouseBtn == 0)
		{
			fill = 1;
		}
		else if(mouseBtn == 2)
		{
			fill = 0;
		}

		if(fill >= 0)
		{
			_matrix[y][x] = fill;
			_context.fillStyle = fill == 1 ? "#CC0000" : "#FFFFFF";
			_context.fillRect(BLOCK_SIZE * x + 1, BLOCK_SIZE * y + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
			update_result();
		}
	}
}

_canvas.onmousedown = function(e)
{
	_clicked = true;
	change_matrix(e, false);
};

_canvas.onmouseup = _canvas.onmouseleave = function()
{
	_clicked = false;
};

_canvas.onmousemove = function(e)
{
	change_matrix(e, true);
};

_canvas.oncontextmenu = function(e)
{
	e.preventDefault();
};

_btn_add_col.onclick = function()
{
	resize(_width + 1, _height);
};

_btn_add_row.onclick = function()
{
	resize(_width, _height + 1);
};

_btn_clipboard.onclick = function()
{
	navigator.clipboard.writeText(_copy);
	alert("COPIED TO CLIPBOARD!");
}
