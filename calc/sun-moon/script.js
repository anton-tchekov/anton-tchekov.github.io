/* Copyright (c) 2021 Anton Tchekov */
/* Simulation von Sonne, Erde und Mond */
/* Basierend auf dem Newtonschen Gravitationsgesetz */

/* Eingabeelemente */
var i_mass_sun0 = document.getElementById("mass_sun0");
var i_mass_sun1 = document.getElementById("mass_sun1");
var i_mass_earth0 = document.getElementById("mass_earth0");
var i_mass_earth1 = document.getElementById("mass_earth1");
var i_mass_moon0 = document.getElementById("mass_moon0");
var i_mass_moon1 = document.getElementById("mass_moon1");
var i_dist_sun_earth0 = document.getElementById("dist_sun_earth0");
var i_dist_sun_earth1 = document.getElementById("dist_sun_earth1");
var i_dist_earth_moon0 = document.getElementById("dist_earth_moon0");
var i_dist_earth_moon1 = document.getElementById("dist_earth_moon1");

var b_calc = document.getElementById("calc");

/* Ausgabeelemente */
var o_vel_earth_sun = document.getElementById("vel_earth_sun");
var o_vel_moon_earth = document.getElementById("vel_moon_earth");
var o_vel_moon_sun = document.getElementById("vel_moon_sun");
var o_vel_moon_min = document.getElementById("vel_moon_min");
var o_vel_moon_max = document.getElementById("vel_moon_max");

var o_accel_sun = document.getElementById("accel_sun");
var o_accel_earth = document.getElementById("accel_earth");
var o_accel_ratio = document.getElementById("accel_ratio");

var o_time_earth = document.getElementById("time_earth");
var o_time_moon = document.getElementById("time_moon");

/* Canvas */
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

/* Breite und Höhe des Canvas */
var width = canvas.clientWidth;
var height = canvas.clientHeight;

/* Mittelpunkt des Canvas */
var centerX = width / 2;
var centerY = height / 2;

/* Gravitationskonstante */
var gravConst = new Decimal(6.674e-11); /* m3 / (kg * s2) */

/* Daten über die Himmelskörper */

/* Entfernung */
var distanceEarthMoon = 0; /* m */
var distanceSunEarth = 0; /* m */

/* Masse */
var massMoon = 0; /* kg */
var massEarth = 0; /* kg */
var massSun = 0; /* kg */

/* Bahngeschwindigkeit */
var velEarthSun = 0;
var velMoonEarth = 0;
var velMoonSunPercent = 0;
var velMoonSunMin = 0;
var velMoonSunMax = 0;

/* Beschleunigung */
var accel_earth = 0;
var accel_sun = 0;

/* Time */
var orbitEarthTime = 0.0;
var orbitMoonTime = 0.0;

/* Die Sonne ist der Bezugspunkt und bleibt immer bei (0;0)

/* Startposition der Erde */
var xEarth = distanceSunEarth;
var yEarth = 0;

/* Startposition des Mondes */
var xMoon = xEarth + distanceEarthMoon;
var yMoon = 0;

/* Quadrieren */
function square(n)
{
return Decimal.mul(n, n);
}

/* Abstand zwischen zwei Punkten (Satz des Pythagoras) */
function distance(x0, y0, x1, y1)
{
return Math.sqrt(square(x1 - x0) + square(y1 - y0));
}

/* Gravitationskraft berechnen Fg = */
function gforce(m1, m2, r)
{
return Decimal.mul(gravConst, Decimal.div(Decimal.mul(m1, m2), square(r)));
}

/* Beschleunigung berechnen */
/* a = F / m */
function accel(f, m)
{
return Decimal.div(f, m);
}

function deg2rad(degrees)
{
return degrees * (Math.PI / 180);
}

/* Bahnausschnitt zeichnen */
function draw()
{
ctx.clearRect(0, 0, width, height);

var step = 0.1;
var range = 20.0;
var x = 0, y = 0;
var i;

var r = width / Math.sin(deg2rad(range)) / 2;
var s = r - Math.sqrt(r * r + (width / 2) * (width / 2));

ctx.font = "12px monospace";
ctx.fillStyle = "black";
ctx.fillText("Render: [ -" + range + "°, " + range + "° ]", 0, 15);

/* Bahn der Erde */
ctx.strokeStyle = "red";
ctx.beginPath();
i = -range;
x = r * Math.cos(deg2rad(i + 270.0)) + centerX;
y = r * Math.sin(deg2rad(i + 270.0)) + centerY + r + s / 2;
ctx.moveTo(x, y);
for(; i < range; i += step)
{
ctx.lineWidth = 2;

x = r * Math.cos(deg2rad(i + 270.0)) + centerX;
y = r * Math.sin(deg2rad(i + 270.0)) + centerY + r + s / 2;

ctx.lineTo(x, y);
}

ctx.stroke();
ctx.closePath();

/* Bahn des Mondes */
var rM = 10;
var sRat = orbitEarthTime / orbitMoonTime * 360.0;
var rangeM = sRat / (360.0 / (range));
var stepM = rangeM / (range / step);

var iM = -rangeM;

ctx.strokeStyle = "blue";
ctx.beginPath();
i = -range;
x = r * Math.cos(deg2rad(i + 270.0)) + centerX;
y = r * Math.sin(deg2rad(i + 270.0)) + centerY + r + s / 2;
ctx.moveTo(x, y);
for(; i < range; i += step, iM += stepM)
{
ctx.lineWidth = 2;

x = r * Math.cos(deg2rad(i + 270.0)) + centerX;
y = r * Math.sin(deg2rad(i + 270.0)) + centerY + r + s / 2;

x += rM * Math.cos(deg2rad(iM + 270.0));
y += rM * Math.sin(deg2rad(iM + 270.0));

ctx.lineTo(x, y);
}

ctx.stroke();
ctx.closePath();
}

/* Berechnungen Aktualisieren */
function update()
{
/* Geschwindigkeiten berechnen */
velEarthSun = Decimal.sqrt(Decimal.mul(gravConst, Decimal.div(massSun, distanceSunEarth)));
velMoonEarth = Decimal.sqrt(Decimal.mul(gravConst, Decimal.div(massEarth, distanceEarthMoon)));

velMoonSunPercent = velMoonEarth.toNumber() / velEarthSun.toNumber() * 100;
velMoonSunMin = velEarthSun.toNumber() - velMoonEarth.toNumber();
velMoonSunMax = velEarthSun.toNumber() + velMoonEarth.toNumber();

/* Geschwindigkeiten ausgeben */
o_vel_earth_sun.value = Math.round(velEarthSun.toNumber());
o_vel_moon_earth.value = Math.round(velMoonEarth.toNumber());
o_vel_moon_sun.value = velMoonSunPercent.toFixed(2);
o_vel_moon_min.value = Math.round(velMoonSunMin);
o_vel_moon_max.value = Math.round(velMoonSunMax);

/* Beschleunigung berechnen */
accel_sun = accel(gforce(massSun, massMoon, distanceSunEarth), massMoon);
accel_earth = accel(gforce(massEarth, massMoon, distanceEarthMoon), massMoon);

o_accel_sun.value = accel_sun.toNumber().toFixed(6);
o_accel_earth.value = accel_earth.toNumber().toFixed(6);
o_accel_ratio.value = (accel_sun.toNumber() / accel_earth.toNumber()).toFixed(6);

orbitEarthTime = (2 * Math.PI * distanceSunEarth) / velEarthSun;
orbitMoonTime = (2 * Math.PI * distanceEarthMoon) / velMoonEarth;

o_time_earth.value = (orbitEarthTime / (3600 * 24)).toFixed(4);
o_time_moon.value = (orbitMoonTime / (3600 * 24)).toFixed(4);
}

/* Eingabewerte holen */
function get_inputs()
{
if(isNaN(i_mass_sun0.value) ||
isNaN(i_mass_sun1.value) ||
isNaN(i_mass_earth0.value) ||
isNaN(i_mass_earth1.value) ||
isNaN(i_mass_moon0.value) ||
isNaN(i_mass_moon1.value) ||
isNaN(i_dist_sun_earth0.value) ||
isNaN(i_dist_sun_earth1.value) ||
isNaN(i_dist_earth_moon0.value) ||
isNaN(i_dist_earth_moon1.value))
{
return;
}

massSun = new Decimal(i_mass_sun0.value * Math.pow(10, i_mass_sun1.value));
massEarth = new Decimal(i_mass_earth0.value * Math.pow(10, i_mass_earth1.value));
massMoon = new Decimal(i_mass_moon0.value * Math.pow(10, i_mass_moon1.value));

distanceEarthMoon = new Decimal(i_dist_earth_moon0.value * Math.pow(10, i_dist_earth_moon1.value));
distanceSunEarth = new Decimal(i_dist_sun_earth0.value * Math.pow(10, i_dist_sun_earth1.value));

update();
draw();
}

get_inputs();
b_calc.onclick = get_inputs;
