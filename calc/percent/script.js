document.getElementById("rechnen").onclick = function()
{
	var gw = document.getElementById("gw");
	var pw = document.getElementById("pw");
	var ps = document.getElementById("ps");

	if(gw.value == "")
	{
		gw.value = grundwert(pw.value, ps.value);
	}

	if(pw.value == "")
	{
		pw.value = prozentwert(gw.value, ps.value);
	}

	if(ps.value == "")
	{
		ps.value = prozentsatz(pw.value, gw.value);
	}
};

function prozentsatz(pw, gw)
{
	return pw / gw * 100;
}

function prozentwert(gw, ps)
{
	return gw / 100 * ps;
}

function grundwert(pw, ps)
{
	return pw / ps * 100;
}
