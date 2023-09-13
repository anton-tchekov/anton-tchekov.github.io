var inputRadius = document.getElementById("inputr");
var inputDurchmesser = document.getElementById("inputd");
var inputUmfang = document.getElementById("inputu");
var inputFlaeche = document.getElementById("inputa");

var resultRadius = document.getElementById("resultr");
var resultDurchmesser = document.getElementById("resultd");
var resultUmfang = document.getElementById("resultu");
var resultFlaeche = document.getElementById("resulta");

var calcBtn = document.getElementById("btncalc");

var valueRadius;
var valueDurchmesser;
var valueUmfang;
var valueFlaeche;

calcBtn.addEventListener("click", function()
{
	valueRadius = inputRadius.value;
	valueDurchmesser = inputDurchmesser.value;
	valueUmfang = inputUmfang.value;
	valueFlaeche = inputFlaeche.value;

	if(valueRadius != "")
	{
		valueRadius = parseFloat(valueRadius);
		valueDurchmesser = 2 * valueRadius;
		valueUmfang = valueDurchmesser * Math.PI;
		valueFlaeche = valueRadius * valueRadius * Math.PI;
	}
	else if(valueDurchmesser != "")
	{
		valueDurchmesser = parseFloat(valueDurchmesser);
		valueRadius = valueDurchmesser / 2;
		valueUmfang = valueDurchmesser * Math.PI;
		valueFlaeche = valueRadius * valueRadius * Math.PI;
	}
	else if(valueUmfang != "")
	{
		valueUmfang = parseFloat(valueUmfang);
		valueDurchmesser = valueUmfang / Math.PI;
		valueRadius = valueDurchmesser / 2;
		valueFlaeche = valueRadius * valueRadius * Math.PI;
	}
	else if(valueFlaeche != "")
	{
		valueFlaeche = parseFloat(valueFlaeche);
		valueRadius = Math.sqrt(valueFlaeche / Math.PI);
		valueDurchmesser = valueRadius * 2;
		valueUmfang = valueDurchmesser * Math.PI;
	}

	resultRadius.innerText = round3(valueRadius).toString();
	resultDurchmesser.innerText = round3(valueDurchmesser).toString();
	resultUmfang.innerText = round3(valueUmfang).toString();
	resultFlaeche.innerText = round3(valueFlaeche).toString();

	valueRadius = 0;
	valueDurchmesser = 0;
	valueUmfang = 0;
	valueFlaeche = 0;
}, false);

function round3(number)
{
	return (Math.round(number * 1000) / 1000).toFixed(3);
}

