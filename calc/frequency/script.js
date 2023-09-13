var stellen = 3;

var inputU = document.getElementById("inputu");
var inputR = document.getElementById("inputr");
var inputI = document.getElementById("inputi");

var resultU = document.getElementById("resultu");
var resultR = document.getElementById("resultr");
var resultI = document.getElementById("resulti");

var selectU = document.getElementById("unitu");
var selectR = document.getElementById("unitr");
var selectI = document.getElementById("uniti");

var inputStellen = document.getElementById("inputn");

var valueU = "";
var valueR = "";
var valueI = "";

var calcBtn = document.getElementById("btncalc");

var U = 0, R = 0, I = 0;

var mulU, mulR, mulI;

calcBtn.addEventListener("click", function() {
	valueU = inputU.value;
	valueR = inputR.value;
	valueI = inputI.value;

	stellen = parseInt(inputStellen.value);

	mulU = parseFloat(selectU.value);
	mulR = parseFloat(selectR.value);
	mulI = parseFloat(selectI.value);

	if(valueU.length > 0 && valueI.length > 0)
	{
		U = parseFloat(valueU) * mulU;
		I = parseFloat(valueI) * mulI;
		R = (U / I) * (1 / mulR);

		resultU.innerText = roundFixed(U, stellen) + " V";
		resultI.innerText = roundFixed(I, stellen) + " A";

		resultR.innerText = roundFixed(R, stellen) + " " + getP(mulR) + "Ohm";

	}
	else if(valueU.length > 0 && valueR.length > 0)
	{
		U = parseFloat(valueU) * mulU;
		R = parseFloat(valueR) * mulR;
		I = (U / R) * (1 / mulI);

		resultU.innerText = roundFixed(U, stellen) + " V";
		resultR.innerText = roundFixed(R, stellen) + " Ohm";

		resultI.innerText = roundFixed(I, stellen) + " " + getP(mulI) + "A";
	}
	else if(valueI.length > 0 && valueR.length > 0)
	{
		I = parseFloat(valueI) * mulI;
		R = parseFloat(valueR) * mulR;
		U = (R * I)  * (1 / mulU);

		resultR.innerText = roundFixed(R, stellen) + " Ohm";
		resultI.innerText = roundFixed(I, stellen) + " A";

		resultU.innerText = roundFixed(U, stellen) + " " + getP(mulU) + "V";
	}

	valueU = "";
	valueR = "";
	valueI = "";
}, false);

function roundFixed(num, x)
{
	var n = Math.pow(10, x);
	return (Math.round(num * n)/n).toFixed(x);
}

function getP(n)
{
	switch(n)
	{
		case 0.000001:
			return "u";

		case 0.001:
			return "m";

		case 1000:
			return "k";

		case 1000000:
			return "M";

		default:
			return "";
	}
}
