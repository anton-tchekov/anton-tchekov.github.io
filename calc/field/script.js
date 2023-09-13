var fld_mass = document.getElementById("fld_mass");
var fld_charge = document.getElementById("fld_charge");
var fld_v0 = document.getElementById("fld_v0");
var fld_field = document.getElementById("fld_field");
var fld_time_step = document.getElementById("fld_time_step");
var fld_time_end = document.getElementById("fld_time_end");
var fld_scale_x = document.getElementById("fld_scale_x");
var fld_scale_y = document.getElementById("fld_scale_y");

var btn_update = document.getElementById("btn_update");
var btn_reset = document.getElementById("btn_reset");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var m, q, b, v0, t_step, t_end, scale_x, scale_y;

function init()
{
	m = 6.645e-27;
	q = 3.204e-19;
	b = 0.15;
	v0 = 10000000;
	t_step = 1e-11;
	t_end = 2e-8;
	scale_x = 5000;
	scale_y = 5000;

	fld_mass.value = m;
	fld_charge.value = q;
	fld_v0.value = v0;
	fld_field.value = b;
	fld_time_step.value = t_step;
	fld_time_end.value = t_end;
	fld_scale_x.value = scale_x;
	fld_scale_y.value = scale_y;

	update();
}

init();

function update()
{
	m = parseFloat(fld_mass.value);
	q = parseFloat(fld_charge.value);
	v0 = parseFloat(fld_v0.value);
	b = parseFloat(fld_field.value);
	t_step = parseFloat(fld_time_step.value);
	t_end = parseFloat(fld_time_end.value);
	scale_x = parseFloat(fld_scale_x.value);
	scale_y = parseFloat(fld_scale_y.value);

	render();
}

btn_reset.onclick = init;
btn_update.onclick = update;

function render()
{
	var t = 0;

	var B = new Vector(0, 0, b);
	var F = new Vector(0, 0, 0);
	var A = new Vector(0, 0, 0);
	var V = new Vector(0, v0, 0);
	var P = new Vector(0, 0, 0);

	ctx.clearRect(0, 0, 500, 500);

	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.moveTo(250, 0);
	ctx.lineTo(250, 500);
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.moveTo(250, 500);

	while(t < t_end)
	{
		/* F = q * V x B; */
		F = V.cross(B).multiply(q);

		/* A = F / m; */
		A = F.divide(m);

		/* V += A * delta_t; */
		V = V.add(A.multiply(t_step));

		/* P += V * delta_t; */
		P = P.add(V.multiply(t_step));

		console.log(P);

		ctx.lineTo(250 + P.x * scale_x, 500 - P.y * scale_y);

		t += t_step;
	}

	ctx.stroke();
}

update();
