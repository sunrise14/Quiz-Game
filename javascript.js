//if we click on start -> timer should start, questions should appear, score should be displayed.
var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
document.getElementById("startreset").onclick = function(){
if(playing==true){ //if you are playing the game
	location.reload();//reload page
}else{
	playing=true;
score = 0;
document.getElementById("scorevalue").innerHTML=score;
show("timeremaining");
timeremaining=60;
hide("gameOver");
document.getElementById("timeremainingvalue").innerHTML=timeremaining;
document.getElementById("startreset").innerHTML="Reset Game";
countDown();
generateQA();
}
}
//clicking on answer box
for(var i=1;i<5;i++){
	document.getElementById("box"+i).onclick=function(){
		if(playing==true){
			if(this.innerHTML==correctAnswer){
				score++;
				document.getElementById("scorevalue").innerHTML=score;
				hide("wrong");
				show("correct");
				setTimeout(function(){
					hide("correct");
				},1000)
				generateQA();

			}
			else{
				hide("correct");
				show("wrong");
				setTimeout(function(){hide("wrong")},1000)
			}
		}
		
	}
}
function countDown(){
	action = setInterval(function(){
		timeremaining-=1;
		document.getElementById("timeremainingvalue").innerHTML=timeremaining;
		if(timeremaining==0){
			stopCountDown();
			show("gameOver");
			document.getElementById("gameOver").innerHTML="<p>Game over!</p><p>Your score is"+score+".</p>"
			hide("timeremaining");
			hide("correct");
			hide("wrong");
			playing=false;
			document.getElementById("startreset").innerHTML="Start Game";
		}
	},1000)
}
function stopCountDown(){
	clearInterval(action);
}
function hide(Id){
	document.getElementById(Id).style.display="none";
}
function show(Id){
	document.getElementById(Id).style.display="block";
}
function generateQA(){
	var x = 1+Math.round(Math.random()*8);
	var y = 1+Math.round(Math.random()*8);
	correctAnswer = x*y;
	document.getElementById("question").innerHTML=x+"x"+y;
	var correctPosition = 1+Math.round(Math.random()*3);
	document.getElementById("box"+correctPosition).innerHTML=correctAnswer;
	var answers=[correctAnswer];
	for(i=1;i<5;i++){
		if(i!= correctPosition){
			var wrongAnswer;
			do{
				wrongAnswer=((1+Math.round(Math.random()*8))*(1+Math.round(Math.random()*8)));
			}
			while(answers.indexOf(wrongAnswer)>-1)
			document.getElementById("box"+i).innerHTML=wrongAnswer;
			answers.push(wrongAnswer);
		}
	}


}

//if we are playing
//reload
//else set score to zero,change button to reset, generate new Q&A