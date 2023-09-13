var minField = document.getElementById("min");
var maxField = document.getElementById("max");
var resField = document.getElementById("res");
var submitBtn = document.getElementById("submitBtn");

var option = document.getElementById("options");
var result = document.getElementById("results");

submitBtn.addEventListener("click", function()
{
	rndNumber();
});

document.body.addEventListener("click", function()
{
	if(option.style.display == "none")
	{
		rndNumber();
	}
});

document.body.addEventListener("keydown", function(e)
{
	if(e.keyCode == 13)
	{
		rndNumber();
	}
});

function rndNumber()
{
	option.style.display = "none";
	var valMin = parseInt(minField.value);
	var valMax = parseInt(maxField.value);

	var rand = Math.floor(valMin + (Math.random() * (valMax - valMin + 1)));
	resField.innerText = rand;
}
