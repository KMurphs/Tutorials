var isPlaying = false;
var isGameWon = false;
var nbrMatches = 5;

//Making sure that values start with correct initialization
document.querySelector("#target").textContent = nbrMatches;
document.querySelector("#player1").textContent = 0;
document.querySelector("#player2").textContent = 0;

//Making sure that the update number of match button is enabled
document.querySelector("#updateMatchCount").disabled = false;

//Adding Events Listeners
document.querySelector("#player1Score").addEventListener("click", function () { newScore(1); });
document.querySelector("#player2Score").addEventListener("click", function () { newScore(2); });

document.querySelector("#updateMatchCount").addEventListener("click",function(){
	//Handling click event on update match count
	//if game is playing, quit
	if(isPlaying === true){
		document.querySelector("#newtarget").value = "";
		return;
	}

	//get current value from the text input control on the page
	var newTarget = document.querySelector("#newtarget").value;
	document.querySelector("#newtarget").value = "";

	//sanity check the value
	newTarget = Number(newTarget);
	if(newTarget < 1)
		newTarget = 1;
	else if(newTarget > 10)
		newTarget = 10;

	//update the number of matches
	nbrMatches = newTarget;
	document.querySelector("#target").textContent = nbrMatches;
});

document.querySelector("#resetMatch").addEventListener("click",function(){
	//Handling click event on reset match

	//Reset game is playing varaible
	isPlaying = false;
	isGameWon = false;

	//enable update match count button
	document.querySelector("#updateMatchCount").disabled = false;
	//set match count to current value
	document.querySelector("#target").textContent = nbrMatches;;

	//reset player 1 and 2 scores to 0, and styles to normal
	document.querySelector("#player1").textContent = 0;
	document.querySelector("#player2").textContent = 0;
	document.querySelector("#player1").classList.remove("winner");
	document.querySelector("#player1").classList.remove("loser");
	document.querySelector("#player2").classList.remove("winner");
	document.querySelector("#player2").classList.remove("loser");
	document.querySelector("#player1Name").classList.remove("winner");
	document.querySelector("#player1Name").classList.remove("loser");
	document.querySelector("#player2Name").classList.remove("winner");
	document.querySelector("#player2Name").classList.remove("loser");
});

//function that handle new scores
function newScore(player){
	
	//sanity check on current player, it must be 1 or 2
	if((player != 1) && (player != 2)){
		console.log("Invalid Player");
		return;	
	}

	if(isGameWon == true)
		return;

	isPlaying = true;
	document.querySelector("#updateMatchCount").disabled = true;

	//add 1 to the player's current score
    var currentScore = document.querySelector("#player" + player).textContent;
    currentScore = Number(currentScore) + 1;
    document.querySelector("#player" + player).textContent = currentScore;

	//if player won update player style to win, and the other to fail
	if(currentScore >= nbrMatches){
		isGameWon = true;

		//find selector for the other player
		oPlayer = 1;
		if(oPlayer === player)
			oPlayer = 2;

		//winner and loser styles
		document.querySelector("#player" + player).classList.add("winner");
		document.querySelector("#player" + oPlayer).classList.add("loser");
		document.querySelector("#player" + player +"Name").classList.add("winner");
		document.querySelector("#player" + oPlayer +"Name").classList.add("loser");		
	}
}

