//Obtaining DOM handles
var r_value = document.querySelector("#r_value");
var g_value = document.querySelector("#g_value");
var b_value = document.querySelector("#b_value");

var jumbotron = document.querySelector("#jumbotron"); 
var new_color = document.querySelector("#new_color"); 
var easy = document.querySelector("#easy"); 
var hard = document.querySelector("#hard"); 
var hard_space = document.querySelector("#hard_space"); 

var color_fields = document.querySelectorAll(".color");
var userfeedback = document.querySelector("#feedback"); 


//Resetting Game State
var isGameEasy = true;

var rd_color_R = 0;
var rd_color_G = 0; 
var rd_color_B = 0; 
var rd_color = "rgb(" + rd_color_R + ", " + rd_color_G + ", " + rd_color_B + ")";

var colors = [];

resetGame();
resetGameMode();


//Adding Events Listeners
color_fields.forEach(function(field, index, fields){
	field.addEventListener("click", function(){
		checkResult(index);
	});
});

new_color.addEventListener("click", function(){
	resetGame();
});

easy.addEventListener("click", function(){
	isGameEasy = true;
	resetGame();
});

hard.addEventListener("click", function(){
	isGameEasy = false;
	resetGame();
});



//Application Utilities
function resetGameMode(){
	if(isGameEasy){	
		easy.classList.add("bg-primary");
		easy.classList.add("mytext-primary");

		hard.classList.remove("bg-primary");
		hard.classList.remove("mytext-primary");

		hard_space.classList.add("invisible");

	}else{
		easy.classList.remove("bg-primary");
		easy.classList.remove("mytext-primary");

		hard.classList.add("bg-primary");
		hard.classList.add("mytext-primary");	

		hard_space.classList.remove("invisible");
	}	
}


function checkResult(index){
	var display = "";
	var feedback_duration = 1000;
	var isGameWon = (index === rd_color_idx);

	if(isGameWon){
		//Display success
		display = "You have won!";
		userfeedback.classList.remove("invisible");
	    userfeedback.classList.add("bg-success");
	    userfeedback.classList.remove("bg-danger");

	    feedback_duration = 2000;
	}
	else{
		//Display failed try again
		display = "You failed! Try Again";
		userfeedback.classList.remove("invisible");
	    userfeedback.classList.remove("bg-success");
	    userfeedback.classList.add("bg-danger");

	    feedback_duration = 1000;
	}

	userfeedback.innerHTML = "<h1>" + display + "</h1>";

	window.setTimeout(function(){ resetUI(isGameWon); }, feedback_duration);
};

function resetUI(isGameWon){
	userfeedback.classList.add("invisible");

	if(isGameWon)
		resetGame();

	clearInterval();
};

function resetGame(){

	var nColors = 6;
	if(isGameEasy)
		nColors = 3;

	for(var i = 0; i < nColors; i++){
		var aColor = {};

		aColor.R = Math.round(255 * Math.random());
		aColor.G = Math.round(255 * Math.random());
		aColor.B = Math.round(255 * Math.random());
		aColor.rgb = "rgb(" + aColor.R + ", " + aColor.G + ", " + aColor.B + ")";

		colors[i] = aColor;
	}

	rd_color_idx = Math.round((nColors - 1) * Math.random());

	r_value.textContent = colors[rd_color_idx].R;
	g_value.textContent = colors[rd_color_idx].G;
	b_value.textContent = colors[rd_color_idx].B;

	resetGameMode();

	for(var i = 0; i < nColors; i++){
		color_fields[i].style.backgroundColor = colors[i].rgb;
	}
}