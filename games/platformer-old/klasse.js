function AntonKlasse()

{

	this.Random = function(min, max)

	{

		return Math.round(min + (Math.random() * max)); 

	}

	

	this.CreateCanvas = function(id, width, height, alt)

	{

		var canvas = document.createElement("canvas");        // Create a <button> element

		canvas.id = id;

		canvas.width = width;

		canvas.height = height;

		canvas.innerHTML = alt;

		document.querySelector(".center").appendChild(canvas); 

		console.log("Antonklasse: Canvas erstellt!");

		return canvas;

	}

	

	this.GetContext = function(canvas, context)

	{

		console.log("Antonklasse: Kontext " + context + " des Canvases " + canvas.id + " wurde erstellt!");

		return canvas.getContext(context);

	}

	

	this.GetContextById = function(canvasid, context)

	{

		var canvas = document.getElementById(canvasid); 

		console.log("Antonklasse: Canvas erstellt!");

		return canvas.getContext(context);

	}

	

	this.FillRect = function(context, color, x, y, width, height)

	{

		context.fillStyle = color;

		context.fillRect(x, y, width, height);

		//console.log("Antonklasse: Rechteck gefüllt: X: " + x + ", Y: " + y + ", Breite: " + width + ", Höhe: " + height + "!");

		return canvas.getContext(context);

	}

	

	this.DrawRect = function(context, color, linewidth, x, y, width, height)

	{

		ctx.beginPath();

		context.strokeStyle = color;

		context.lineWidth = linewidth;

		context.rect(x, y, width, height);

		ctx.stroke();

		//console.log("Antonklasse: Rechteck gemalt: X: " + x + ", Y: " + y + ", Breite: " + width + ", Höhe: " + height + "!");

		return canvas.getContext(context);

	}

		

	this.DrawEllipse = function(context, color, linewidth, x, y, width, height)

	{

		ctx.beginPath();

		context.strokeStyle = color;

		context.lineWidth = linewidth;

		context.rect(x, y, width, height);

		ctx.stroke();

		//console.log("Antonklasse: Rechteck gemalt: X: " + x + ", Y: " + y + ", Breite: " + width + ", Höhe: " + height + "!");

		return canvas.getContext(context);

	}

}



/*

 Die Verwendung von this ist abhängig Kontext, 

 in der es verwendet wird.

 Allerdings ist dieses Tohuwabohu das Ergebnis einer meiner Meinung nach völlig idiotischen Spezifikation von ECMA-Script,

 auf die JavaScript (bekanntlicherweise) aufbaut.

 Entweder hat da jemand gepennt, sich vorher das Hirn mit zu viel Alkohol weggeballert oder der Typ war ein Sadist. 

*/