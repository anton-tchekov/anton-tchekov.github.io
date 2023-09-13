var btn_sim = document.getElementById("btn-draw");

var fld_u = document.getElementById("fld-u");
var fld_r = document.getElementById("fld-r");
var fld_l = document.getElementById("fld-l");
var fld_c = document.getElementById("fld-c");
var fld_delta_t = document.getElementById("fld-delta-t");
var fld_end_t = document.getElementById("fld-end-t");
var fld_step_x = document.getElementById("fld-step-x");
var fld_scale_y = document.getElementById("fld-scale-y");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var r = 20.0, /* Ohm */
	l = 0.2, /* Henry */
	c = 0.0001, /* Farad */
	u_start = 10, /* Volt */
	time_step = 0.001, /* Seconds */
	time_end = 0.16, /* Seconds */
	scale = 100000.0,
	step_x = 10;
	offset = 150;

function plot(which)
{
	var t, q0, q1, q2;
	var q_start = c * u_start;

	q0 = q_start;
	q1 = 0.0;
	q2 = 0.0;

	var x, q;
	x = 0;

	ctx.beginPath();

	if(which == 0)
	{
		q = q0;
	}
	else
	{
		scale *= time_step;
		q = q1;
	}

	ctx.moveTo(x, scale * -q + offset);

	for(t = 0.0; t < time_end; t += time_step)
	{
		q2 = (-1.0 / (l * c)) * (q0 + (r * c * q1));
		q1 += q2 * time_step;
		q0 += q1 * time_step;

		x += step_x;

		if(which == 0)
		{
			q = q0;
		}
		else
		{
			q = q1;
		}

		ctx.lineTo(x, scale * -q + offset);
	}

	ctx.stroke();
}

function sim()
{
	u_start = parseFloat(fld_u.value);
	r = parseFloat(fld_r.value);
	l = parseFloat(fld_l.value);
	c = parseFloat(fld_c.value);
	time_step = parseFloat(fld_delta_t.value);
	time_end = parseFloat(fld_end_t.value);
	step_x = parseFloat(fld_step_x.value);
	scale = parseFloat(fld_scale_y.value);

	ctx.clearRect(0, 0, 1000, 300);

	ctx.strokeStyle = "black";
	plot(0);

	ctx.strokeStyle = "red";
	plot(1);
}

btn_sim.onclick = sim;

fld_u.value = u_start;
fld_r.value = r;
fld_l.value = l;
fld_c.value = c;
fld_delta_t.value = time_step;
fld_end_t.value = time_end;
fld_step_x.value = step_x;
fld_scale_y.value = scale;

sim();

