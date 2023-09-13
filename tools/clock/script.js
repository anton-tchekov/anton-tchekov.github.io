function update()
{
	var date = new Date();
	var s = "";
	var m = "";
	var h = "";

	if(String(date.getSeconds()).length == 1)
	{
		s = "0" + date.getSeconds();
	}
	else
	{
		s = date.getSeconds();
	}

	if(String(date.getMinutes()).length == 1)
	{
		m = "0" + date.getMinutes();
	}
	else
	{
		m = date.getMinutes();
	}

	if(String(date.getHours()).length == 1)
	{
		h = "0" + date.getHours();
	}
	else
	{
		h = date.getHours();
	}

	document.getElementById("datum").innerHTML = h + ":" + m + ":" + s;
	setTimeout(update, 1000);
}

update();
