const canvas1 = document.getElementById("gameCanvas");
const ctx = canvas1.getContext("2d");

const paddleHeight = 10;
const paddleWidth = 100;
const ballSize = 10;

let ballSpeedX = 4;
let ballSpeedY = 4;


//let timeout;
let counter = 0;
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

let lose; //lose pop-up screen
let win; //win pop-up screen

let playerScore; //player player score
let cpuScore; //CPU score
let timer;

let button;
let seconds = 30;
let split =":";
let minutes = "0"+0 ;
var addNew=true;

//ball speed on axis
let xSpeed = 5;
let ySpeed = 10;

//speed of the CPU paddle
let cpuSpeed = 4; // 4.5;

let myheight, mywidth;

function preload() {
  stage = new createjs.Stage("gameCanvas");
  stage.mouseEventsEnabled = true;
  createjs.Touch.enable(stage);

 
  queue = new createjs.LoadQueue(true);
  queue.installPlugin(createjs.Sound);
  queue.loadManifest([
    { id: "cpuPaddle", src: "gfx/img/paddleai12.1.png" },
    { id: "playerPaddle", src: "gfx/img/paddleai12.1.png" },
    { id: "ball", src: "gfx/img/ballai1.png" },
    //{id:"win", src:"gfx/img/win.png"},
    // {id:"lose", src:"gfx/img/lose.png"},
    //{id:"start", src:"gfx/img/start.png"},
    //{id:"title", src:"gfx/img/title.png"},
    { id: "start_game", src: "gfx/img/instructions_start.png" },
    //{id:"howTo", src:"gfx/img/howTo.png"},
    // {id:"instruction", src:"gfx/img/howToPlay.png"},
    //  {id:"playerScore", src:"gfx/sound/playerScore.mp3"},
    //   {id:"enemyScore", src:"gfx/sound/enemyScore.mp3"},
    // {id:"winScreen", src:"gfx/sound/win.mp3"},
    // {id:"loseScreen", src:"gfx/sound/lose.mp3"},
    { id: "hitPaddle", src: "gfx/sound/hitPaddle.mp3" },
    { id: "wall", src: "gfx/sound/hit.mp3" },
    // {id:"inMenu", src:"gfx/sound/inMenu.mp3"},
    // {id:"inGame", src:"gfx/sound/inGame.mp3"},
    { id: "audioButton", src: "gfx/img/audio_button.png" },
    { id: "restart", src: "gfx/img/restart_button.png" },
    { id: "timesup", src: "gfx/img/timesUp.png" },
  ]);

  //  queue.addEventListener('progress', progress);
  queue.addEventListener("complete", loaded);
}

var canvas = document.getElementById("gameCanvas");

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
  canvas1.height = canvas1.offsetHeight;

  location.reload();
};

function loaded() {
 
  createjs.Ticker.framerate = 30;
  createjs.Ticker.addEventListener("tick", tock);
}

function countdown() {

  
console.log("countdown");

  button = new createjs.Text("4", " 2rem Arial", "#fff");

  button.x = mywidth / 2;
  button.textAlign = "center";
  button.textBaseline = "middle";
  button.y = myheight / 2;

  stage.addChild(button);
 // console.log(stage);

  counter_on = 1;

  settings.gamecountdown = true;

  console.log(counter_on);

  console.log("count1 function");

  setTimeout(function () {
    settings.gamecountdown = false;
  },10000);

  if(settings.gamecountdown){
    if(counter_on){
  gamecountdownf();}}

}


let playerX =mywidth / 2 - paddleWidth / 2;
let playerY = myheight - 25 ;
let aiX = mywidth / 2 - paddleWidth / 2 ;
let aiY = 55;
let ballX = mywidth / 2 - ballSize / 2;
let ballY = myheight / 2 - ballSize / 2;





// var overlay = function(colour, text, font, size, fontColour, oreintation, x, y){
//   ctx.font = size + "px " + font + " " + fontColour
//   ctx.textAlign = oreintation
//   ctx.fillStyle = colour
//   ctx.fillStyle='gold';
//   ctx.fillRect(0, 0, ctx.canvas.width, 50)
//   ctx.fillStyle=fontColour,
//   ctx.fillText(text, x, y)
// }

function draw() {
 
  if(settings.gameRunning){
console.log("draw");
  ctx.clearRect(0, 0, mywidth, myheight);

  
  // Draw paddles
  ctx.fillStyle = "white";
  ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
  ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = 48 + "px " + 'verdana' + " " + "white"
  ctx.textAlign = "center"
  ctx.fillStyle = "black"
  ctx.fillStyle='black';
  ctx.fillRect(0, 0, ctx.canvas.width, 50)
  ctx.fillStyle="white",
  ctx.fillText( minutes + " : " + seconds, mywidth / 2 , 50)
  
  
  //ctx.fillText(minutes, 620, 50)


  // overlay(
  //   "rgb(50, 50, 200)", 
  //   "00",
  //   'verdana', 
  //   48, 
  //   "white", 
  //   "center", 
  //   25,
  //   50
  // );
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
    if(ballY < aiY + paddleHeight ){ alert("win"); console.log("wwwwwwwwwwwwwwwwiiiiiiiiiiinnnnnnnnnnnn");
  }
    if(ballY > myheight  ){ alert("lose"); console.log("loooooooooooooooooooouuuuuuuuuuuuuuuuuuuuuse");
  }
  }



  // Update AI paddle position
  aiX += (ballX - (aiX + paddleWidth / 2)) * 0.1;

 

  

  requestAnimationFrame(draw);}
}


// function addTimer(){

//   console.log("addtimer");

//      // remove this cmnt

//   // seconds = new createjs.Text("00", " 2rem Arial", "#fff");
//   // seconds.x = mywidth / 2 - 40; //100;
//   // seconds.y = 50;
//   // seconds.name = "sec";
//   console.log( "sec "+ seconds);

// //   split = new createjs.Text(":", " 2rem Arial", "#fff");
// //   split.x = mywidth / 2; //100;
// //   split.y = 5;

// //   minutes = new createjs.Text("02", " 2rem Arial", "#fff");
// //   minutes.x = mywidth / 2 + 12; //100;
// //   minutes.y = 5;
// //   minutes.name = "min";
// //   console.log("mins "+minutes.text);
// // console.log(stage);


// //   stage.addChild(seconds, split, minutes);
//      // remove this cmnt

//   //console.log(stage.getChildByName("sec"));

// }

//game running
function startGame() {

  
canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  playerX = event.clientX - rect.top - paddleWidth / 2;

  if (playerX >= mywidth - paddleWidth) {
    //stop the paddle from going out of canvas *1.5
    playerX = mywidth - paddleWidth; //*1.5
  }
  if (playerX <= 0) {
    playerX = 0;
  }
});

  counter_on = 1;

  settings.gamecountdown = true;

   // remove this cmnt
   if(counter_on)
  { 
  countdown();
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
     
    // console.log("start");

    // stage.mouseMoveOutside = true;
    // stage.on("stagemousemove", function (evt) {
    //   playerX = evt.stageX;
    //   //coordinates
    //   //  console.log("stageX/Y: "+evt.stageX+","+evt.stageY); // always in bounds
    //   //  console.log("rawX/Y: "+evt.rawX+","+evt.rawY); // could be < 0, or > width/height
    // });

     

    // // inGameSound = createjs.Sound.play("inGame", {loop:-1});
    // // inGameSound.volume = 0.02;

    // window.addEventListener("keyup", fingerLifted);
    // window.addEventListener("keydown", fingerDown);

    // // player = new createjs.Bitmap(queue.getResult("playerPaddle"));
    // // // player.scaleX=1.5;
    // // // player.scaleY=0.5;
    // // player.x = mywidth / 2 - player.image.width / 2; //2;
    // // player.y = myheight - 25; //230 - 25;//160 - 37.5;

    // // cpu = new createjs.Bitmap(queue.getResult("cpuPaddle"));
    // // // cpu.scaleX=1.5;
    // // // cpu.scaleY=0.5;
    // // cpu.x = mywidth / 2 - cpu.image.width / 2; //480 - 25;
    // // cpu.y = 55; //160 - 37.5;

    // //console.log(cpu.image.width);

    // // ball = new createjs.Bitmap(queue.getResult("ball"));
    // // // ball.scaleX=0.75;
    // // // ball.scaleY=0.75;
    // // ball.x = mywidth / 2 - ball.image.width / 2;
    // // ball.y = myheight / 2 - ball.image.width / 2;

    playerScore = new createjs.Text("0", " 2rem Arial", "#fff");
     playerScore.x = (mywidth/2) - 40;
     playerScore.y = 5;

    cpuScore = new createjs.Text("0", " 2rem Arial", "#fff");
     cpuScore.x = (mywidth/2) + 40;
     cpuScore.y = 5;

    //  timer = new createjs.Text('Timer: ', ' 2rem Arial', '#fff');
    //  timer.x = (mywidth/2) - 50;
    //  timer.y = 5;

   

 }, 3000);
}

// function movePaddle() {
//   if (keys.u) {
//     playerX -= settings.speed;
//   }
//   if (keys.d) {
//     playerX += settings.speed;
//   }
//   //if(player.y >= 245) //stop the paddle from going out of canvas

//   if (playerX >= mywidth - paddleWidth) {
//     //stop the paddle from going out of canvas *1.5
//     playerX = mywidth - paddleWidth; //*1.5
//   }
//   if (playerX <= 0) {
//     playerX = 0;
//   }
// }

//reset funciton for when a point is scored. Basically resets the position of everything
// function reset() {
//   ballX = mywidth / 2 - 15;
//   ballY = myheight / 2 - 15;

//   cpuX = mywidth / 2 - 15; //480 - 25;
//   playerX = mywidth / 2 - 15; //2;

//   //player.y = 160 - 37.5;
//   //cpu.y = 160 - 37.5;
// }

//ball movement
function moveBall() {
  ballX = ballX + xSpeed;
  ballX = ballX + ySpeed;
}

//when ball hits the wall
// function hitWall() {
  

//   if (ballX < 0) {
//     //left wall
//     xSpeed = -xSpeed;

//     let wallHitSound = createjs.Sound.play("wall");
//     wallHitSound.volume = 0.1;
//   }

//   if (ballX + ballSize / 2 > mywidth) {
//     //right wall
//     xSpeed = -xSpeed;

//     let wallHitSound = createjs.Sound.play("wall");
//     wallHitSound.volume = 0.1;
//   }
// }

function gamecountdownf() {
  console.log("here func");

  console.log(parseInt(button.text));
  console.log("counter"+counter_on);

  if (parseInt(button.text) > 0 && counter_on == 1) {
    console.log("minus");
console.log("TIMEOUT"+countertimeout);
    button.text = parseInt(button.text - 1);
  }
  if (parseInt(button.text) == 0) {
    console.log("done");
    stage.removeChild(button);
     counter_on = 0;
   settings.gamecountdown=false;
  //   //startGame();
  // }
console.log("TIMEOUT"+countertimeout);
  // if (counter_on == 2) {
    clearTimeout(countertimeout);
  countertimeout = 0;
    //button.text=parseInt(03);
   
    //console.log("here 2");
    //counter_on = 0;
    // startGame();
  }

  countertimeout = setTimeout(gamecountdownf, 1000);
}

function timedCount() {


  if(settings.gameRunning){
  console.log("time count")
console.log(addNew);
console.log(seconds);
console.log(minutes);



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

    cpuSpeed++;

    // ySpeed++;
    //console.log(cpuSpeed);

    //console.log(ySpeed);

    if (ySpeed > 0) ySpeed = ySpeed + 0.5;
    if (ySpeed < 0) ySpeed = ySpeed - 0.5;

    console.log(xSpeed);

    if (xSpeed > 0) xSpeed = xSpeed + 0.5;
    if (xSpeed < 0) xSpeed = xSpeed - 0.5;
  }

  if (parseInt(seconds) == 0 && parseInt(minutes) == 0) {
    alert("timesup");
    //to avoid loop of timeout
    timer_on = 0;

    //console.log("loop");
  }

  //remove this comment
  if (timer_on == 0) {
  //  reset();
    clearTimeout(timeout);

    
  }

  console.log("down s "+parseInt(seconds));
  console.log("down m "+parseInt(minutes));
  console.log(timer_on);
    timeout = setTimeout(timedCount, 1000);


  }

 // stage.update();
  // console.log("time count")
  // if (
  //   parseInt(seconds.text) == 0 &&
  //   parseInt(minutes.text) > 0 
  //   && timer_on == 1
  // ) {
  //   minutes.text = parseInt(minutes.text - 1);
  //   seconds.text = parseInt(59);

  //   if (parseInt(minutes.text) < 10) {
  //     minutes.text = "0" + minutes.text;
  //   }
  // } else if (
  //   (parseInt(seconds.text) > 0 || parseInt(minutes.text) > 0) &&
  //   timer_on == 1
  // ) {
  //   seconds.text = parseInt(seconds.text - 1);

  //   cpuSpeed++;

  //   // ySpeed++;
  //   //console.log(cpuSpeed);

  //   //console.log(ySpeed);

  //   if (ySpeed > 0) ySpeed = ySpeed + 0.5;
  //   if (ySpeed < 0) ySpeed = ySpeed - 0.5;

  //   console.log(xSpeed);

  //   if (xSpeed > 0) xSpeed = xSpeed + 0.5;
  //   if (xSpeed < 0) xSpeed = xSpeed - 0.5;
  // }

  // if (parseInt(seconds.text) == 0 && parseInt(minutes.text) == 0) {
  //   alert("timesup");
  //   //to avoid loop of timeout
  //   timer_on = 0;

  //   //console.log("loop");
  // }

  // //remove this comment
  // if (timer_on == 0) {
  // //  reset();
  //   clearTimeout(timeout);

  //   minutes.text = parseInt(01);
  // }

  // console.log("down s "+parseInt(seconds.text));
  // console.log("down m "+parseInt(minutes.text));
  // console.log(timer_on);
  //   timeout = setTimeout(timedCount, 1000);
}

function trackScore() {
 

  if (ballY - 20 > myheight) {
    ySpeed = 10;
    xSpeed = 5;
    cpuSpeed = 4;

    ySpeed = -ySpeed;
    cpuScore.text = parseInt(cpuScore.text + 1);
    settings.speed--;

   // reset();
    // let enemyScoreSound = createjs.Sound.play("enemyScore");
    // enemyScoreSound.volume = 0.1;
  }

  if (ballY < 40) {
    ySpeed = 10;
    xSpeed = 5;
    cpuSpeed = 4;

    ySpeed = -ySpeed;
    playerScore.text = parseInt(playerScore.text + 1);

    //reset();
    // let playerScoreSound = createjs.Sound.play("playerScore");
    // playerScoreSound.volume = 0.1;
  }
}

// function moveCpu() {
 
//   if (cpuY + paddleWidth / 2 < ballX - paddleWidth) {
//     //
//     cpuX = cpuX + cpuSpeed;

//     console.log("cpux=" + cpuX);

  
//   } else if (cpuX + paddleWidth / 2 > ballX + ballSize) {
//     // ||((cpu.x + (cpu.image.width)) > mywidth)
//     cpuX = cpuX - cpuSpeed;
//   }

//   if (cpuX >= mywidth - paddleWidth) {
//     //stop the paddle from going out of canvas *1.5
//     cpuX = mywidth - paddleWidth; //*1.5
//   }
//   if (cpuX <= 0) {
//     cpuX = 0;
//   }
// }

// function hitTest() {

//   if (
//     ballY + 30 - 22 > cpuY &&
//     ballY + 30 - 22 < cpuY + 22 &&
//     ballY >= cpuX &&
//     ballY < cpuX + paddleWidth
//   ) {
//     ySpeed *= -1;

//     let paddleHitSound = createjs.Sound.play("hitPaddle");
//     paddleHitSound.volume = 0.1;
//   }
//   if (
//     ballY + 22 <= playerY + 22 &&
//     ballY + 22 > playerY &&
//     ballX >= playerX &&
//     ballX < playerX + paddleWidth
//   ) {
//     ySpeed *= -1;

//     let paddleHitSound = createjs.Sound.play("hitPaddle");
//     paddleHitSound.volume = 0.1;
//   }
// }

//dealing with the win/lose pop-ups
function alert(e) {
  if (e == "win") {

    
    console.log("win");

    settings.gameRunning = false;
    timer_on = 0;

    $("#windiv").show();
   
    /*
 remove this cmnt     add restart
    createjs.Sound.stop();

    //win = new createjs.Bitmap(queue.getResult('win'));
    win = new createjs.Text("You Won!\nCongrats!", " 4rem Arial", "#fff");
    win.x = stage.canvas.width / 2;
    win.y = stage.canvas.height / 4;

    win.textAlign = "center";
    win.textBaseline = "middle";
    // win.x=(mywidth/2) - (win.image.width/2) ;
    win.y = myheight;

    let restartt = new createjs.Text("Restart", " 2rem Arial", "#fff");
    restartt.x = stage.canvas.width / 2;
    restartt.textAlign = "center";
    restartt.y = stage.canvas.height / 2;
    restartt.textBaseline = "middle";

    var bounds = restartt.getBounds();
    console.log(bounds);
    //hide  playerScore, cpuScore, timer,
    Tween.get(win, restartt).to({ y: myheight / 6 }, myheight);
    stage.removeChild(seconds, split, minutes, player, cpu, ball);
    stage.addChild(win, restartt);

    var pad = 20; //innenrand, padding
    // Hier wird ein Graphics Objekt erzeugt
    //dann werden die Eigenschaften wie Füllung Linie etc zugewiesen

    var gr = new createjs.Graphics();
    gr.setStrokeStyle(1);
    gr.beginStroke("#000000");
    gr.beginLinearGradientFill(["#540", "black"], [0, 1], 0, 20, 0, 320);
    gr.drawRect(
      restartt.x - pad / 2 + bounds.x,
      restartt.y - pad + bounds.y,
      bounds.width + pad,
      bounds.height + pad
    );
    //Das Shape wird intialisiert und das Graphics Objekt in der Konstruktorfunktion
    //zugewiesen. Shape(g)
    var bgr = new createjs.Shape(gr);
    stage.addChildAt(bgr, 0);

    bgr.addEventListener("click", function (e) {
      stage.removeChild(e.target, win, restartt);
      restartGame();
    });
    */

  } else if (e == "lose") {
    settings.gameRunning = false;
    timer_on = 0;

    console.log("lose");

    $("#losediv").show();


/*
 remove this cmnt    
    createjs.Sound.stop();

    lose = new createjs.Text("GameOver!", " 4rem Arial", "#fff");
    lose.x = stage.canvas.width / 2;
    lose.y = stage.canvas.height / 4;

    lose.textAlign = "center";
    lose.textBaseline = "middle";
    // lose.x=(mywidth/2) - (lose.image.width/2) ;
    lose.y = myheight;

    let restartt = new createjs.Text("Restart", " 2rem Arial", "#fff");
    restartt.x = stage.canvas.width / 2;
    restartt.textAlign = "center";
    restartt.y = stage.canvas.height / 2;
    restartt.textBaseline = "middle";

    var bounds = restartt.getBounds();
    console.log(bounds);

    Tween.get(lose, restartt).to({ y: myheight / 6 }, myheight);
    stage.removeChild(seconds, split, minutes, player, cpu, ball);
    stage.addChild(lose, restartt);

    var pad = 20; //innenrand, padding
    // Hier wird ein Graphics Objekt erzeugt
    //dann werden die Eigenschaften wie Füllung Linie etc zugewiesen

    var gr = new createjs.Graphics();
    gr.setStrokeStyle(1);
    gr.beginStroke("#000000");
    gr.beginLinearGradientFill(["#540", "black"], [0, 1], 0, 20, 0, 320);
    gr.drawRect(
      restartt.x - pad / 2 + bounds.x,
      restartt.y - pad + bounds.y,
      bounds.width + pad,
      bounds.height + pad
    );
    //Das Shape wird intialisiert und das Graphics Objekt in der Konstruktorfunktion
    //zugewiesen. Shape(g)
    var bgr = new createjs.Shape(gr);
    stage.addChildAt(bgr, 0);

    bgr.addEventListener("click", function (e) {
      stage.removeChild(e.target, lose, restartt);
      restartGame();
    });

*/
    //rmv toggleAudio_game,
    //stage.removeChild(restart_game);
  } else if (e == "timesup") {

    //ctx.clearRect(0, 0, mywidth, myheight);
    // $("#gameCanvas").hide();
    
    // $("#resultCanvas").show();

    console.log("timeup");
    settings.gameRunning = false;
    timer_on = 0;

    $("#timesupdiv").show();


    /*
 remove this cmnt  
    timesup = new createjs.Text("Time is \n Up!", " 4rem Arial", "#fff");
    timesup.x = stage.canvas.width / 2;
    timesup.y = stage.canvas.height / 4;

    timesup.textAlign = "center";
    timesup.textBaseline = "middle";
    // timesup.x=(mywidth/2) - (timesup.image.width/2) ;
    timesup.y = myheight;

    let restartt = new createjs.Text("Restart", " 2rem Arial", "#fff");
    restartt.x = stage.canvas.width / 2;
    restartt.textAlign = "center";
    restartt.y = stage.canvas.height / 2;
    restartt.textBaseline = "middle";

    var bounds = restartt.getBounds();
    console.log(bounds);

    Tween.get(timesup, restartt).to({ y: myheight / 6 }, myheight);
    stage.removeChild(seconds, split, minutes, player, cpu, ball);
    stage.addChild(timesup, restartt);

    var pad = 20; //innenrand, padding
    // Hier wird ein Graphics Objekt erzeugt
    //dann werden die Eigenschaften wie Füllung Linie etc zugewiesen

    var gr = new createjs.Graphics();
    gr.setStrokeStyle(1);
    gr.beginStroke("#000000");
    gr.beginLinearGradientFill(["#540", "black"], [0, 1], 0, 20, 0, 320);
    gr.drawRect(
      restartt.x - pad / 2 + bounds.x,
      restartt.y - pad + bounds.y,
      bounds.width + pad,
      bounds.height + pad
    );
    //Das Shape wird intialisiert und das Graphics Objekt in der Konstruktorfunktion
    //zugewiesen. Shape(g)
    var bgr = new createjs.Shape(gr);
    stage.addChildAt(bgr, 0);

    bgr.addEventListener("click", function (e) {
      stage.removeChild(e.target, timesup, restartt);
      restartGame();
    });
    */

  }
}

function restartGame() {
  stage.removeChild(player, ball, cpu, seconds, split, minutes);
  createjs.Sound.stop();
 // reset();

  //counter_on = 1;
  // hwde aam tsir faster l count down
  //loaded();
  startGame();
  console.log("restart");
}

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

     // remove this cmnt

  // if (playerScore.text == "1") {
  //   alert("win");


  // }
  // if (cpuScore.text == "1") {
  //   alert("lose");

  // }
  // if (parseInt(seconds.text) == "0" && parseInt(minutes.text) == "0") {
  //   alert("timesup");
  // }
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
  }
  //resetGame();

  stage.update(e);
}
window.addEventListener("load", preload);
