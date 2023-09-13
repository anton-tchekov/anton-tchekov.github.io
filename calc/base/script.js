window.addEventListener("load", function() {
	var decInput = document.getElementById("decInput");
	var binInput = document.getElementById("binInput");
	var hexInput = document.getElementById("hexInput");
	var charInput = document.getElementById("charInput");

	var decOutput = document.getElementById("decOutput");
	var binOutput = document.getElementById("binOutput");
	var hexOutput = document.getElementById("hexOutput");
	var asciiOutput = document.getElementById("asciiOutput");

	var btnDec = document.getElementById("btnDec");
	var btnBin = document.getElementById("btnBin");
	var btnHex = document.getElementById("btnHex");
	var btnASCII = document.getElementById("btnASCII");

	btnDec.addEventListener("click", function() {
		decIn();
	}, false);

	btnBin.addEventListener("click", function() {
		binIn();
	}, false);

	btnHex.addEventListener("click", function() {
		hexIn();
	}, false);
	
	btnASCII.addEventListener("click", function() {
		charIn();
	}, false);

	decInput.addEventListener("keydown", function(e) {
		if(e.keyCode == 13) decIn();
	}, false);

	binInput.addEventListener("keydown", function(e) {
		if(e.keyCode == 13) binIn();
	}, false);

	hexInput.addEventListener("keydown", function(e) {
		if(e.keyCode == 13) hexIn();
	}, false);

	charInput.addEventListener("keydown", function(e) {
		if(e.keyCode == 13) charIn();
	}, false);
}, false);

function decIn()
{
	var decVal = decInput.value;
	var dec = parseInt(decVal, 10);
	var bin = dec.toString(2);
	var hex = dec.toString(16).toUpperCase();
	var ascii = sign_from_ascii(dec);

	decOutput.innerText = dec;
	binOutput.innerText = bin;
	hexOutput.innerText = hex;
	asciiOutput.innerText = ascii;
}

function binIn()
{
	var binVal = binInput.value;

	var dec = parseInt(binVal, 2);
	var bin = binVal;
	var hex = dec.toString(16).toUpperCase();
	var ascii = sign_from_ascii(dec);

	decOutput.innerText = dec;
	binOutput.innerText = bin;
	hexOutput.innerText = hex;
	asciiOutput.innerText = ascii;
}

function hexIn()
{
	var hexVal = hexInput.value;

	var dec = parseInt(hexVal, 16);
	var bin = dec.toString(2);
	var hex = dec.toString(16).toUpperCase();
	var ascii = sign_from_ascii(dec);

	decOutput.innerText = dec;
	binOutput.innerText = bin;
	hexOutput.innerText = hex;
	asciiOutput.innerText = ascii;
}

function charIn()
{
	var asciiVal = charInput.value;

	var dec = asciiVal.charCodeAt(0);
	var bin = dec.toString(2);
	var hex = dec.toString(16).toUpperCase();

	decOutput.innerText = dec;
	binOutput.innerText = bin;
	hexOutput.innerText = hex;
	asciiOutput.innerText = asciiVal;
}

function sign_from_ascii(dec)
{
	var ascii = "N/A";
	if(dec > 32 && dec < 127) ascii = String.fromCharCode(dec);
	else if(dec == 0)   ascii = "NUL (null)";
	else if(dec == 1)   ascii = "SOH (start of heading)";
	else if(dec == 2)   ascii = "STX (start of text)";
	else if(dec == 3)   ascii = "ETX (end of text)";
	else if(dec == 4)   ascii = "EOT (end of transmisson)";
	else if(dec == 5)   ascii = "ENQ (enquiry)";
	else if(dec == 6)   ascii = "ACK (acknowledge)";
	else if(dec == 7)   ascii = "BEL (bell)";
	else if(dec == 8)   ascii = "BS (backspace)";
	else if(dec == 9)   ascii = "TAB (horizontal tab)";
	else if(dec == 10)  ascii = "LF (NL line feed, new line)";
	else if(dec == 11)  ascii = "VT (vertical tab)";
	else if(dec == 12)  ascii = "FF (NP form feed, new page)";
	else if(dec == 13)  ascii = "CR (carriage return)";
	else if(dec == 14)  ascii = "SO (shift out)";
	else if(dec == 15)  ascii = "SI (shift in)";
	else if(dec == 16)  ascii = "DLE (data link escape)";
	else if(dec == 17)  ascii = "DC1 (device control 1)";
	else if(dec == 18)  ascii = "DC2 (device control 2)";
	else if(dec == 19)  ascii = "DC3 (device control 3)";
	else if(dec == 20)  ascii = "DC4 (device control 4)";
	else if(dec == 21)  ascii = "NAK (negative acknowledge)";
	else if(dec == 22)  ascii = "SYN (synchronous idle)";
	else if(dec == 23)  ascii = "ETB (end of transmission block)";
	else if(dec == 24)  ascii = "CAN (cancel)";
	else if(dec == 25)  ascii = "EM (end of medium)";
	else if(dec == 26)  ascii = "SUB (substitute)";
	else if(dec == 27)  ascii = "ESC (escape)";
	else if(dec == 28)  ascii = "FS (file separator)";
	else if(dec == 29)  ascii = "GS (group separator)";
	else if(dec == 30)  ascii = "RS (record separator)";
	else if(dec == 31)  ascii = "US (unit separator)";
	else if(dec == 32)  ascii = "SPACE";
	else if(dec == 127) ascii = "DEL (delete)";

	return ascii;
}
