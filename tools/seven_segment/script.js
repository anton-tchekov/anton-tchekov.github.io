var divs = document.getElementsByClassName("segment");
var decOutput = document.getElementById("dec");
var hexOutput = document.getElementById("hex");
var binOutput = document.getElementById("bin");
var stat = [];

for(var i = 0; i < divs.length; i++)
{
	stat.push(0);
	divs[i].onclick = function()
	{
		var color = "red";
		var id;
		if(this.id == "dp")
		{
			id = 7;
		}
		else
		{
			id = this.id.charCodeAt(0) - 97;
		}

		if(stat[id] == 1)
		{
			stat[id] = 0;
			color = "gray";
		}
		else
		{
			stat[id] = 1;
			color = "red";
		}

		if(this.classList[1] == "horizontal")
		{
			this.children[0].style.borderBottom = "10px solid " + color;
			this.children[1].style.borderTop = "10px solid " + color;
		}

		if(this.classList[1] == "vertical")
		{
			this.children[0].style.borderRight = "10px solid " + color;
			this.children[1].style.borderLeft = "10px solid " + color;
		}

		if(id == 7)
		{
			this.style.backgroundColor = color;
		}

		display();
  };
}

function display()
{
	var collector = "";
	for(var i = 7; i >= 0; i--)
	{
		collector += stat[i];
	}

	var dec = parseInt(collector, 2);
	var bin = dec.toString(2);
	var hex = dec.toString(16).toUpperCase();
	var hexZero = 2-hex.length;
	var binZero = 8-bin.length;
	if(hexZero == 1)
	{
		hex = "0" + hex;
	}

	hex = "0x" + hex;
	var str = "";
	for(var j = 0; j < binZero; j++)
	{
		str += "0";
	}

	bin = "0b" + str + bin;
	binOutput.innerText = bin;
	decOutput.innerText = dec;
	hexOutput.innerText = hex;
}

display();
