let running = false;
let nextStep = 0;
let minLevel = 1;
let maxLevel = 5;
let timeout;

function run() {
	if (running) {
		clearInterval(timeout);
		running = false;
		stepAreaResize();
		showMainStart();
	}
	else {
		timeout = setInterval(nextDanceStep, document.getElementById("timer").value * 1000);
		running = true;
		hideMainStart();
	}
}
function nextDanceStep() {
	nextStep = Math.floor(Math.random()*1000)%stepsData.length;
	let nextLevel = stepsData[nextStep].level;
	((nextLevel>maxLevel) || (nextLevel<minLevel)) ? nextDanceStep() : displayStep();
}
function configLevels() {
	maxLevel = document.getElementById("maxlevel").value;
	minLevel = document.getElementById("minlevel").value;
	
	if (maxLevel < minLevel || minLevel<1 || minLevel=="") document.getElementById("minlevel").value = minLevel = maxLevel;
	if (minLevel > maxLevel || maxLevel>9 || maxLevel=="") document.getElementById("maxlevel").value = maxLevel = minLevel;
}
function configTimer() {
	const timerElement = document.getElementById("timer");
	if (timerElement.value=="") timerElement.value = 10;
	if (timerElement.value>90) timerElement.value = 90;
	if (timerElement.value<1) timerElement.value = 1;
}
function stepAreaResize() {
	const width = window.innerWidth;
	const height = window.innerHeight;

	let heightMain = ((width>height) ? landscape() : portrait());
	let heightConfig = 1 - heightMain;

	const configWidth = height * heightConfig;
	document.getElementById("steplevel").style.width = configWidth;
	document.getElementById("timer").style.width = configWidth;
	document.getElementById("timer").style.fontSize = "--webkit-xxx-large";	
	document.querySelectorAll("input.level").forEach(e => e.style.width = configWidth/2);
	
	const length = Math.min(width, height) * heightMain;
	const circleStyle = document.getElementById("steparea").style;
	circleStyle.width = circleStyle.height = circleStyle.maxHeight = length;
	circleStyle.fontSize = "--webkit-xxx-large";	
}
function landscape() {
	document.getElementById("main").style.height = "80%";
	document.getElementById("config").style.height = "20%";
	document.getElementById("config").style.fontSize = "1em";	
	document.getElementById("steparea").style.fontSize = "2em";
	return 0.8;
}
function portrait() {
	document.getElementById("main").style.height = "87%";
	document.getElementById("config").style.height = "13%";
	document.getElementById("config").style.fontSize = "2.4em";	
	document.getElementById("steparea").style.fontSize = "4em";
	return 0.87;
}
function displayStep() {
	document.getElementById("steparea").style.width = "auto";
	document.getElementById("steparea").style.height = "auto";
	document.getElementById("stepname").innerHTML = stepsData[nextStep].name;
	document.getElementById("description").innerHTML = stepsData[nextStep].description;
	document.getElementById("steplevel").innerHTML = stepsData[nextStep].level;
}
function showMainStart() {
	document.getElementById("stepname").innerHTML = "Start";
	document.getElementById("description").innerHTML = "";
	document.getElementById("steplevel").innerHTML = "L";
	document.getElementById("steparea").style.borderRadius = "50%";
	document.getElementById("steparea").style.backgroundColor = "MediumSeaGreen";
	document.querySelectorAll("input").forEach(e => e.style.display = "inherit");
}
function hideMainStart() {
	document.getElementById("stepname").innerHTML = "Let's Rock!";
	document.getElementById("steparea").style.borderRadius = "25%";
	document.getElementById("steparea").style.backgroundColor = "White";
	document.querySelectorAll("input").forEach(e => e.style.display = "none");
}
