const canvas1 = document.getElementById("gameCanvas");
const ctx = canvas1.getContext("2d");
const image = document.getElementById("source");


var myFont = new FontFace('myFont', 'url(css/font/pmft85-webfont.ttf)');

myFont.load().then(function(font){

  // with canvas, if this is ommited won't work
  document.fonts.add(font);

  console.log('Font loaded');
});

var img = new Image();



let myheight, mywidth;

//console.log("canvas");
// fitToContainer(canvas);

// Insert values on load of page
//window.onload = function () {
  // Make it visually fill the positioned parent
  canvas1.style.width = "100%";
  canvas1.style.height = "100%";
  // ...then set the internal size to match
  canvas1.width = canvas1.offsetWidth;

  mywidth = canvas1.width;

  console.log("my w"+ mywidth);

  canvas1.height = canvas1.offsetHeight;

  myheight = canvas1.height;
//};
  console.log("my height"+ myheight);






// Change values when window is resized
window.onresize = function () {
  // Make it visually fill the positioned parent
  canvas1.style.width = "100%";
  canvas1.style.height = "100%";
  // ...then set the internal size to match
  canvas1.width = canvas1.offsetWidth;
  mywidth = canvas1.width;

  canvas1.height = canvas1.offsetHeight;
  myheight = canvas1.height;

  //location.reload();
};

const paddleHeight = 10;
const paddleWidth = 100;
const ballSize = 10;

let ballSpeedX = 4;
let ballSpeedY = 4;


let playerX =mywidth / 2 - paddleWidth / 2;
let playerY = myheight - 25 ;
let aiX = mywidth / 2 - paddleWidth / 2 ;
let aiY = 55;
let ballX = mywidth / 2 - ballSize / 2;
let ballY = myheight / 2 - ballSize / 2;


//let timeout;
let timeout;
let timer_on = 0;

let counter_on = 0;
let countertimeout;

("use strict");

//global
let stage, queue, pText;

//game settings
let settings = {
  gamecountdown: false,
  gameRunning: false,
  speed: 4.5, //how fast the player's paddle is moving
};

let keys = {
  u: false,
  d: false,
  space: false,
};

let player; //player paddle graphic
let ball; //ball graphic
let cpu; //CPU paddle

// let lose; //lose pop-up screen
// let win; //win pop-up screen

let playerScore; //player player score
let cpuScore; //CPU score
let timer;

let counternumber=4;
let seconds = 30;
let split =":";
let minutes = "0"+0 ;
var addNew=true;

//ball speed on axis
let xSpeed = 5;
let ySpeed = 10;

//speed of the CPU paddle
let cpuSpeed = 4; // 4.5;





function loaded() {
  stage = new createjs.Stage("gameCanvas");
  stage.mouseEventsEnabled = true;
  createjs.Touch.enable(stage);

  createjs.Ticker.framerate = 30;
  createjs.Ticker.addEventListener("tick", tock);
}


// function drawPaddles(){

//   ctx.clearRect(0, 0, mywidth, myheight);

// ctx.fillStyle = "white";
// ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
// ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
// requestAnimationFrame(drawPaddles);

// }

function drawcounter(){
  if(settings.gamecountdown){


   


// Draw paddles
ctx.fillStyle = "blue";
// ctx.roundRect(playerX, playerY, paddleWidth, paddleHeight, [400]);


ctx.beginPath();
ctx.roundRect(playerX, playerY, paddleWidth, paddleHeight, [40]);
ctx.fill();

ctx.beginPath();
ctx.roundRect(aiX, aiY, paddleWidth, paddleHeight, [40]);
ctx.fill();

//ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);

  ctx.font = "50px myFont"; 
ctx.textAlign = "center"

ctx.fillStyle="white",
ctx.fillText( counternumber , mywidth / 2 , myheight/2)



//ctx.drawImage(image, 0, 0, 10, 12);
img.src = "gfx/img/logo.svg";
//img.onload = function() {
    ctx.drawImage(img, mywidth / 2 - (img.width /2), 0);
//}


requestAnimationFrame(drawcounter);
 console.log("draaaaaw countttt")
  }

}
// function countdown() {
// console.log("countdown");
// //   button = new createjs.Text("4", " 2rem Arial", "#fff");

// //   button.x = mywidth / 2;
// //   button.textAlign = "center";
// //   button.textBaseline = "middle";
// //   button.y = myheight / 2;
// //   stage.addChild(button);
// //  // console.log(stage);

// //ctx.clearRect(0, 0, mywidth, myheight);

//   //counter_on = 1;

//   ///settings.gamecountdown = true;

//   console.log(counter_on);


//     if(counter_on == 1)
//     {

//       gamecountdownf();
//   //  }

//     else{
//       clearTimeout(countertimeout);
//       ctx.clearRect(0, 0, mywidth, myheight);

//     }
// }



function gamecountdownf() {

  console.log("here func");

  console.log(parseInt(counternumber));
  console.log("counter"+counter_on);

  if (parseInt(counternumber) > 0 && counter_on == 1) {
    console.log("minus");
//console.log("TIMEOUT"+countertimeout);
    counternumber = parseInt(counternumber - 1);

    countertimeout = setTimeout(gamecountdownf, 1000);
  }



  if (parseInt(counternumber) == 0) {
    
    console.log("done");
    ctx.clearRect(0, 0, mywidth, myheight);

    //stage.removeChild(button);
console.log("TIMEOUT"+countertimeout);
    clearTimeout(countertimeout);

     counter_on = 0;
   settings.gamecountdown=false;


  }

 

}



function draw() {

  if(settings.gameRunning){

    



console.log("draw");
  ctx.clearRect(0, 0, mywidth, myheight);


  // Draw paddles
  ctx.fillStyle = "blue";
  // ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
  // ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);

  ctx.beginPath();
ctx.roundRect(playerX, playerY, paddleWidth, paddleHeight, [40]);
ctx.fill();

ctx.beginPath();
ctx.roundRect(aiX, aiY, paddleWidth, paddleHeight, [40]);
ctx.fill();

ctx.fillStyle = "mediumvioletred";
  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "mediumvioletred";
  ctx.moveTo(0, img.height + 25);
  // End point (180,47)
  ctx.lineTo(mywidth, img.height + 25);
  // Make the line visible
  ctx.stroke();


  img.src = "gfx/img/logo.svg";
  ctx.drawImage(img, mywidth / 2 - (img.width /2), 0);

  ctx.fillStyle='mediumvioletred';
 // ctx.fillRect( mywidth / 2 - 50 , img.height , 100, 50)


  ctx.beginPath();
  ctx.roundRect( mywidth / 2 - 50 , img.height , 100, 50, 3);
  ctx.fill();




  ctx.font = "32 px  myFont" + "white"
  ctx.textAlign = "center"

  ctx.fillStyle="white",
  ctx.fillText( minutes + " : " + seconds, mywidth / 2 , img.height*1.5)


  console.log(seconds);
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  //console.log("bx"+ballX);
  console.log("by"+ballY);

  // Collision with left and right walls
  if (ballX <= ballSize || ballX >= mywidth - ballSize) {
    ballSpeedX = -ballSpeedX;
  }

  // Collision with paddles

  if (
   ( ballY + 55 > aiY &&  ballY + 30 - 22 < aiY + 22 &&   ballX >= aiX && ballX < aiX + paddleWidth) ||
   ( ballY  <= playerY &&  ballY + ballSize> playerY && ballX >= playerX && ballX < playerX + paddleWidth)
  )

  {
    ballSpeedY = -ballSpeedY;
  }

  // Ball out of bounds //score
  if (ballY < 0 || ballY > myheight) {
    // Reset ball position
    // ballY = myheight / 2 - ballSize / 2;
    // ballX = mywidth / 2 - ballSize / 2;
    // cpuX = mywidth / 2 - paddleWidth / 2;
    // playerX =mywidth / 2 - paddleWidth / 2;
console.log("oooooooooooooooooooouuuuuuuuuuuuuuuuuuuuuttttttt");
console.log(ballY , myheight);
    if(ballY < aiY + paddleHeight ){


    //  alert("win");
    //  console.log("wwwwwwwwwwwwwwwwiiiiiiiiiiinnnnnnnnnnnn");


      settings.gameRunning = false;
      timer_on = 0;

      $("#windiv").show();
      counter_on = 0;

  }
    if(ballY > myheight  ){

      //alert("lose");
      //console.log("loooooooooooooooooooouuuuuuuuuuuuuuuuuuuuuse");

      settings.gameRunning = false;
      timer_on = 0;

      console.log("lose");

      $("#losediv").show();
      
  counter_on = 0;



  }
  }



  // Update AI paddle position
  aiX += (ballX - (aiX + paddleWidth / 2)) * 0.1;

  requestAnimationFrame(draw);}
}


//game running
function startGame() {
  // stage.mouseEventsEnabled = true;

  // canvas1.addEventListener("mousemove", (event) => {

  //   console.log("detectedddddddddddddddddddddddd");
  //   const rect = canvas1.getBoundingClientRect();
  //   playerX = event.clientX - rect.top - paddleWidth / 2;
  
  //   if (playerX >= mywidth - paddleWidth) {
  //     //stop the paddle from going out of canvas *1.5
  //     playerX = mywidth - paddleWidth; //*1.5
  //   }
  //   if (playerX <= 0) {
  //     playerX = 0;
  //   }
  // });
  
  stage.mouseMoveOutside = true;
  stage.on("stagemousemove", function(evt) {

    playerX=evt.stageX;
  

    });
   
  settings.gamecountdown = true;

  console.log("start "+ settings.gamecountdown + counter_on) ;
   // remove this cmnt
   if(counter_on ==1)
  {

    drawcounter();
    gamecountdownf();
      }
  
      else{
        clearTimeout(countertimeout);
        ctx.clearRect(0, 0, mywidth, myheight);
  
      }

 setTimeout(function () {
  //stage.update();

     settings.gameRunning = true;
     timer_on = 1;
    if(timer_on)
    {
      draw();

      timedCount();
    }

    playerScore = new createjs.Text("0", " 2rem ", "#fff");
    //  playerScore.x = (mywidth/2) - 40;
    //  playerScore.y = 5;

    cpuScore = new createjs.Text("0", " 2rem ", "#fff");
    //  cpuScore.x = (mywidth/2) + 40;
    //  cpuScore.y = 5;


 }, 3000);
}



function timedCount() {


  if(settings.gameRunning){
  console.log("time count" +timeout)
console.log(addNew);
console.log(seconds);
console.log(minutes);




  if (parseInt(seconds) == 0 && parseInt(minutes) == 0) {
    //alert("timesup");


    console.log("timeup"  + timeout);
    settings.gameRunning = false;
    clearTimeout(timeout);
   console.log("hhhhhhhhhheeeeeeeeeeeeeeeeeeeeeereeeeeeeeeeeeeeeee"  + timeout)
  //  reset();

    $("#timesupdiv").show();
      timer_on = 0;

  }

  else{
console.log("tiiimmeeeee outtttt" + timeout)
  if (
    parseInt(seconds) == 0 &&
    parseInt(minutes) > 0
    && timer_on == 1
  ) {
    minutes = parseInt(minutes - 1);
    seconds = parseInt(59);

    if ((minutes) < 10) {
      minutes = "0" + minutes;
    }
  } else if (
    (parseInt(seconds) > 0 || parseInt(minutes) > 0) &&
    timer_on == 1
  ) {
    seconds = parseInt(seconds - 1);

    if ((seconds) < 10) {
      seconds = "0" + seconds;
    }

  //   cpuSpeed++;

  //   if (ySpeed > 0) ySpeed = ySpeed + 0.5;
  //   if (ySpeed < 0) ySpeed = ySpeed - 0.5;

  //   console.log(xSpeed);

  //   if (xSpeed > 0) xSpeed = xSpeed + 0.5;
  //   if (xSpeed < 0) xSpeed = xSpeed - 0.5;


  if(ballSpeedX>0) ballSpeedX+=0.2;
  if(ballSpeedX<0) ballSpeedX-=0.2;

  if(ballSpeedY>0) ballSpeedY+=0.2;
  if(ballSpeedY<0) ballSpeedY-=0.2;

   }


  timeout = setTimeout(timedCount, 1000);
  }

  }
}
function reset(){
      ctx.clearRect(0, 0, mywidth, myheight);

      ballSpeedX = 4;
 ballSpeedY = 4;

 timer_on = 0;
counternumber =4;
 counter_on = 0;
 minutes = "0"+0 ;
 seconds = 30;
 settings.gameRunning= false;

  playerX =mywidth / 2 - paddleWidth / 2;
 playerY = myheight - 25 ;
 aiX = mywidth / 2 - paddleWidth / 2 ;
 aiY = 55;
 ballX = mywidth / 2 - ballSize / 2;
 ballY = myheight / 2 - ballSize / 2;
}

function win(){
 
  if(ballY < aiY + paddleHeight ){ 




    //  alert("win");
    //  console.log("wwwwwwwwwwwwwwwwiiiiiiiiiiinnnnnnnnnnnn");


      settings.gameRunning = false;
      timer_on = 0;

      $("#windiv").show();
  }
}

function lose(){
 if(ballY > myheight  ){
  ctx.clearRect(0, 0, mywidth, myheight);

 timer_on = 0;

 counter_on = 0;
 minutes = "0"+0 ;
 seconds = 30;
 settings.gameRunning= false;
 
 

    //alert("lose");
    //console.log("loooooooooooooooooooouuuuuuuuuuuuuuuuuuuuuse");

    settings.gameRunning = false;
    timer_on = 0;

    console.log("lose");

    $("#losediv").show();



}}



//score tracking to know if we should pop a win screen, a lose one or nothing
function gameStatus() {
  console.log("gamestts");
  if (settings.gameRunning == true) {

    console.log("game running true");

    if (timer_on == 0) {
      timer_on = 1;
      console.log(timer_on);

         // remove this cmnt

    //  timedCount();
    }
  }


}

//reloads the page. Couldn't figure out something that will restart the game
function resetGame() {
  if (keys.space) {
    location.reload();
  }
}

function fingerLifted(e) {
  switch (e.key) {
    case "ArrowUp":
      keys.u = false;
      break;
    case "ArrowDown":
      keys.d = false;
      break;
    case " ":
      keys.space = false;
      break;
  }
}

function fingerDown(e) {
  switch (e.key) {
    case "ArrowUp":
      keys.u = true;
      break;
    case "ArrowDown":
      keys.d = true;
      break;
    case " ":
      keys.space = true;
      break;
  }
}

function tock(e) {
  if (settings.gameRunning) {
   // movePaddle();
   // moveBall();
   // moveCpu();
   // hitWall();
   // trackScore();
    //hitTest();
    gameStatus();
    win();
    lose();
  }
  //resetGame();

  stage.update(e);
}
window.addEventListener("load", loaded);
//window.addEventListener("load", startGame);

