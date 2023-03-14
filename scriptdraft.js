let counter = 0;
let timeout;
let countertimeout;

let timer_on = 0;
let counter_on = 0;

"use strict";

//global 
let stage, queue, pText;

//game settings
let settings = {
  gamecountdown:false,
    gameRunning:false,
    speed: 4.5 //how fast the player's paddle is moving 
};

let keys = {
    u: false,
    d: false,
    space:false,
}

let button;
let player;//player paddle graphic
let ball;//ball graphic
let cpu;//CPU paddle

let lose;//lose pop-up screen
let win;//win pop-up screen

let playerScore;//player player score
let cpuScore; //CPU score
let timer;

let seconds , split , minutes;



//ball speed on axis
let xSpeed = 5;
let ySpeed = 10;

//speed of the CPU paddle
let cpuSpeed = 4;// 4.5; 

let myheight , mywidth;



function preload(){


    stage = new createjs.Stage("gameArea");
    stage.mouseEventsEnabled = true;
    createjs.Touch.enable(stage);

  
    queue = new createjs.LoadQueue(true);
    queue.installPlugin(createjs.Sound);
    queue.loadManifest([
			{id:"cpuPaddle", src:"gfx/img/paddleai12.1.png"},
			{id:"playerPaddle", src:"gfx/img/paddleai12.1.png"},
			{id:"ball", src:"gfx/img/ballai1.png"},
		
      {id:"start_game", src:"gfx/img/instructions_start.png"}, 
   
			{id:"hitPaddle", src:"gfx/sound/hitPaddle.mp3"},
      {id:"wall", src:"gfx/sound/hit.mp3"},
   
      {id:"audioButton", src:"gfx/img/audio_button.png"},
      {id:"restart", src:"gfx/img/restart_button.png"},
      {id:"timesup", src:"gfx/img/timesUp.png"}
    ]);

  queue.addEventListener('complete', loaded);

} 

var canvas = document.getElementById('gameArea');
    
    console.log('canvas');
   // fitToContainer(canvas);
      
    // Insert values on load of page
    window.onload = function() {
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;

    mywidth = canvas.width;


    canvas.height = canvas.offsetHeight;

    myheight = canvas.height;


    }; 


    // Change values when window is resized
    window.onresize = function() {   
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    location.reload();
    };



function loaded() {

   button = new createjs.Text('10',  ' 2rem Arial', '#fff');

    //let button = new createjs.Text('Start', ' 4rem 	Arial', '#fff');

    button.x= mywidth/2;
    button.textAlign="center";
    button.textBaseline="middle";
    button.y = myheight/2;
    button.outline = 2;
    var bounds = button.getBounds();
    console.log(bounds);
 
      
    stage.addChild(button);
console.log("button added");
    var pad = 20; //innenrand, padding
// Hier wird ein Graphics Objekt erzeugt
//dann werden die Eigenschaften wie Füllung Linie etc zugewiesen

var g = new createjs.Graphics();
g.setStrokeStyle(1);
g.beginStroke("#000000");
g.beginLinearGradientFill(["#540","black"], [0,1], 0, 20, 0, 320);
g.drawRect(button.x - (pad/2) + bounds.x, button.y - pad + bounds.y, bounds.width + pad , bounds.height + pad );
//Das Shape wird intialisiert und das Graphics Objekt in der Konstruktorfunktion
//zugewiesen. Shape(g)
var bg = new createjs.Shape(g);
stage.addChildAt(bg, 0);
   
  //   bg.addEventListener('click', function(e)
  //  {
  //    stage.removeChild(e.target,  button);
  //   //  inMenuPause();
  //     startGame();
  //   });
  counter_on = 1;
  console.log(counter_on);
  
  gamecountdownf();

  console.log("count1 function");
    createjs.Ticker.framerate=30;
    createjs.Ticker.addEventListener("tick", tock);    
    }


    


    function timedCount() {

      if ( (parseInt(seconds.text) == 0   && parseInt(minutes.text) > 0) && timer_on == 1)
      {
        minutes.text = parseInt(minutes.text - 1);
        seconds.text=parseInt(59);
    
        if ( parseInt(minutes.text) < 10)
        {
          minutes.text = ("0"+minutes.text); ;
        }
    
      }
      
      else if ( (parseInt(seconds.text) > 0   || parseInt(minutes.text) > 0) && timer_on == 1)
      
      {seconds.text = parseInt(seconds.text - 1);
      
      cpuSpeed++;
    
      
    // ySpeed++;
      console.log(cpuSpeed);
    
    
      console.log(ySpeed);
    
      if(ySpeed > 0 ) ySpeed = ySpeed+0.5;
      if(ySpeed < 0 ) ySpeed = ySpeed-0.5;
    
      console.log(xSpeed);
    
      if(xSpeed > 0 ) xSpeed = xSpeed+0.5;
      if(xSpeed < 0 ) xSpeed = xSpeed-0.5;
    }
    
    
     if(parseInt(seconds.text) == 0   && parseInt(minutes.text) == 0)
      { 
     alert('timesup');
          //to avoid loop of timeout
     timer_on = 0;
    
     console.log("loop");
    
    }
    
      if(timer_on == 0)
      {reset();
        clearTimeout(timeout);
        
        minutes.text=parseInt(01);
      }
    
     timeout = setTimeout(timedCount, 1000);
    }
    


    function gamecountdownf(){
      console.log("here");

      console.log(parseInt(button.text));
      console.log(counter_on);

      if ( (parseInt(button.text) > 0) && counter_on == 1)
      {  console.log("minus");
        button.text = parseInt(button.text - 1);
    
      }
        if ( parseInt(button.text) == 0)
        {  console.log("done");
          counter_on = 2; 
        //  settings.gamecountdown=false;
        //startGame();
        }
    
    if(counter_on == 2)
    {
      clearTimeout(countertimeout);
      
      //button.text=parseInt(03);
       stage.removeChild(button);
       console.log("here");
       counter_on=0;
       startGame();

    }
  
   countertimeout = setTimeout(gamecountdownf, 1000);
    }


    //game running
function startGame(){
  console.log("start");
  stage.mouseMoveOutside = true;
  stage.on("stagemousemove", function(evt) {

    player.x=evt.stageX;
  
  });


    settings.gameRunning=true;

    window.addEventListener('keyup', fingerLifted);
    window.addEventListener('keydown', fingerDown);

    player = new createjs.Bitmap(queue.getResult('playerPaddle'));

     player.x = (mywidth/2) - ((player.image.width)/2);//2;
     player.y = myheight - 25; //230 - 25;//160 - 37.5;

    cpu = new createjs.Bitmap(queue.getResult('cpuPaddle'));

     cpu.x = (mywidth/2)  - ((cpu.image.width)/2);//480 - 25;
     cpu.y = 55;//160 - 37.5;



    ball = new createjs.Bitmap(queue.getResult('ball'));

    ball.x = (mywidth/2) - (ball.image.width/2);;
     ball.y = (myheight/2) - (ball.image.width/2);

    playerScore = new createjs.Text('0', ' 2rem Arial', '#fff');

     
    cpuScore = new createjs.Text('0', ' 2rem Arial', '#fff');

     seconds = new createjs.Text('00',  ' 2rem Arial', '#fff');
     seconds.x = (mywidth/2) -40 ;//100;
     seconds.y = 5;

     split = new createjs.Text(':',  ' 2rem Arial', '#fff');
     split.x = (mywidth/2);//100;
     split.y = 5;

     minutes = new createjs.Text('01',  ' 2rem Arial', '#fff');
     minutes.x = (mywidth/2) + 12;//100;
     minutes.y = 5;

    stage.addChild( seconds , split , minutes, player, cpu, ball );

  //  alert('win');
}
    
function movePaddle(){
    if(keys.u){
      player.x-=settings.speed;
    }
    if(keys.d){
      player.x+=settings.speed;
    }

    if(player.x >= mywidth - (player.image.width)) //stop the paddle from going out of canvas *1.5
    {
      player.x = mywidth - (player.image.width); //*1.5
    }
    if(player.x <= 0)
    {
      player.x = 0;
    }
}

//reset funciton for when a point is scored. Basically resets the position of everything
function reset(){
  ball.x = (mywidth/2)  - 15;
  ball.y = (myheight/2) - 15;

  cpu.x = (mywidth/2)  - 15;//480 - 25;
  player.x = (mywidth/2)  - 15;//2;
    
}

//ball movement 
function moveBall(){
  ball.x = ball.x + xSpeed;
  ball.y = ball.y + ySpeed;


}

//when ball hits the wall
function hitWall(){

  if((ball.x) < 0) { //left wall
    xSpeed = -xSpeed; 
    
 let wallHitSound = createjs.Sound.play("wall");
 wallHitSound.volume = 0.1;
 };

 if((ball.x + (ball.image.width/2)) > mywidth) { //right wall
  xSpeed = -xSpeed; 
    
 let wallHitSound = createjs.Sound.play("wall");
 wallHitSound.volume = 0.1;
  };


}

function trackScore(){


 if((ball.y - (20)) > myheight){

ySpeed=10;
xSpeed=5;
cpuSpeed=4;

    ySpeed = -ySpeed;
    cpuScore.text = parseInt(cpuScore.text + 1);
    settings.speed--;

    
    reset();

  }

   if((ball.y) < 40){

    ySpeed=10;
    xSpeed=5;
    cpuSpeed=4;

    ySpeed = -ySpeed;
    playerScore.text = parseInt(playerScore.text + 1);
    
    reset();
  }
}

function moveCpu() {

   if((cpu.x  + ((cpu.image.width)/2)) < (ball.x - ball.image.width)  ){//
    cpu.x = cpu.x + cpuSpeed;

    console.log('cpux='+ cpu.x);

 }
 
 else if((cpu.x + ((cpu.image.width)/2)) > (ball.x + ball.image.width)){// ||((cpu.x + (cpu.image.width)) > mywidth) 
    cpu.x = cpu.x - cpuSpeed;
}

if(cpu.x >= mywidth - (cpu.image.width)) //stop the paddle from going out of canvas *1.5
{
  cpu.x = mywidth - (cpu.image.width); //*1.5
}
if(cpu.x <= 0)
{
  cpu.x = 0;
}
}

function hitTest() {


    if(ball.y + 30 -22 > cpu.y 
      && ball.y + 30 -22< cpu.y + 22 
      && ball.x >= cpu.x 
      && ball.x < cpu.x + (cpu.image.width))
      
      {
      ySpeed *= -1;
  
  let paddleHitSound = createjs.Sound.play("hitPaddle");
  paddleHitSound.volume = 0.1;
  
      
  }
  if(ball.y +22 <= player.y + 22
    && ball.y +22 > player.y 
    && ball.x >= player.x 
    && ball.x < player.x + (player.image.width))
    
    {       
      ySpeed *= -1;
  
  let paddleHitSound = createjs.Sound.play("hitPaddle");
  paddleHitSound.volume = 0.1;
      
      
  }
}

//dealing with the win/lose pop-ups
function alert(e){     


    if(e == 'win') {
        settings.gameRunning=false;
        timer_on = 0;
        createjs.Sound.stop();


        //win = new createjs.Bitmap(queue.getResult('win'));
        win = new createjs.Text('You Won!\nCongrats!', ' 4rem Arial', '#fff');
        win.x=stage.canvas.width/2;
        win.y = stage.canvas.height/4;
      
        win.textAlign="center";
        win.textBaseline="middle";
      // win.x=(mywidth/2) - (win.image.width/2) ;
        win.y = myheight;

        let restartt = new createjs.Text('Restart', ' 2rem Arial', '#fff');
        restartt.x=stage.canvas.width/2;
        restartt.textAlign="center";
        restartt.y = stage.canvas.height/2;
        restartt.textBaseline="middle";  

        var bounds = restartt.getBounds();
        console.log(bounds);
//hide  playerScore, cpuScore, timer,
        Tween.get(win, restartt).to({y: myheight/6}, myheight);
        stage.removeChild( seconds , split , minutes, player, cpu, ball );
        stage.addChild(win, restartt);

        var pad = 20; //innenrand, padding
        // Hier wird ein Graphics Objekt erzeugt
        //dann werden die Eigenschaften wie Füllung Linie etc zugewiesen
        
        var gr = new createjs.Graphics();
        gr.setStrokeStyle(1);
        gr.beginStroke("#000000");
        gr.beginLinearGradientFill(["#540","black"], [0,1], 0, 20, 0, 320);
        gr.drawRect(restartt.x - (pad/2) + bounds.x, restartt.y - pad + bounds.y, bounds.width + pad , bounds.height + pad );
        //Das Shape wird intialisiert und das Graphics Objekt in der Konstruktorfunktion
        //zugewiesen. Shape(g)
        var bgr = new createjs.Shape(gr);
        stage.addChildAt(bgr, 0);


        bgr.addEventListener('click', function(e){
          stage.removeChild(e.target,  win, restartt);
              restartGame();
            });

    }
    else if(e == 'lose'){
      settings.gameRunning=false;
      timer_on = 0;
      createjs.Sound.stop();
   
      lose = new createjs.Text('GameOver!', ' 4rem Arial', '#fff');
      lose.x=stage.canvas.width/2;
      lose.y = stage.canvas.height/4;
    
      lose.textAlign="center";
      lose.textBaseline="middle";
    // lose.x=(mywidth/2) - (lose.image.width/2) ;
      lose.y = myheight;

      let restartt = new createjs.Text('Restart', ' 2rem Arial', '#fff');
      restartt.x=stage.canvas.width/2;
      restartt.textAlign="center";
      restartt.y = stage.canvas.height/2;
      restartt.textBaseline="middle";  

      var bounds = restartt.getBounds();
      console.log(bounds);

      Tween.get(lose, restartt).to({y: myheight/6}, myheight);
      stage.removeChild( seconds , split , minutes, player, cpu, ball );
      stage.addChild(lose, restartt);

      var pad = 20; //innenrand, padding
      // Hier wird ein Graphics Objekt erzeugt
      //dann werden die Eigenschaften wie Füllung Linie etc zugewiesen
      
      var gr = new createjs.Graphics();
      gr.setStrokeStyle(1);
      gr.beginStroke("#000000");
      gr.beginLinearGradientFill(["#540","black"], [0,1], 0, 20, 0, 320);
      gr.drawRect(restartt.x - (pad/2) + bounds.x, restartt.y - pad + bounds.y, bounds.width + pad , bounds.height + pad );
      //Das Shape wird intialisiert und das Graphics Objekt in der Konstruktorfunktion
      //zugewiesen. Shape(g)
      var bgr = new createjs.Shape(gr);
      stage.addChildAt(bgr, 0);


      bgr.addEventListener('click', function(e){
        stage.removeChild(e.target,  lose, restartt);
            restartGame();
          });


      
  }

    else if(e == 'timesup'){
      settings.gameRunning=false;
      timer_on = 0;
      createjs.Sound.stop();

        timesup = new createjs.Text('Time is \n Up!', ' 4rem Arial', '#fff');
        timesup.x=stage.canvas.width/2;
        timesup.y = stage.canvas.height/4;
      
        timesup.textAlign="center";
        timesup.textBaseline="middle";
      // timesup.x=(mywidth/2) - (timesup.image.width/2) ;
        timesup.y = myheight;

        let restartt = new createjs.Text('Restart', ' 2rem Arial', '#fff');
        restartt.x=stage.canvas.width/2;
        restartt.textAlign="center";
        restartt.y = stage.canvas.height/2;
        restartt.textBaseline="middle";  

        var bounds = restartt.getBounds();
        console.log(bounds);

        Tween.get(timesup, restartt).to({y: myheight/6}, myheight);
        stage.removeChild(seconds , split , minutes, player, cpu, ball );
        stage.addChild(timesup, restartt);

        var pad = 20; //innenrand, padding
        // Hier wird ein Graphics Objekt erzeugt
        //dann werden die Eigenschaften wie Füllung Linie etc zugewiesen
        
        var gr = new createjs.Graphics();
        gr.setStrokeStyle(1);
        gr.beginStroke("#000000");
        gr.beginLinearGradientFill(["#540","black"], [0,1], 0, 20, 0, 320);
        gr.drawRect(restartt.x - (pad/2) + bounds.x, restartt.y - pad + bounds.y, bounds.width + pad , bounds.height + pad );
        //Das Shape wird intialisiert und das Graphics Objekt in der Konstruktorfunktion
        //zugewiesen. Shape(g)
        var bgr = new createjs.Shape(gr);
        stage.addChildAt(bgr, 0);


        bgr.addEventListener('click', function(e){
          stage.removeChild(e.target,  timesup, restartt);
              restartGame();
            });
}}


function restartGame(){
    stage.removeChild(player, ball, cpu, seconds , split , minutes);
    createjs.Sound.stop();
    reset();
    startGame();
}

//score tracking to know if we should pop a win screen, a lose one or nothing 
function gameStatus() {

  console.log("gamestts");


  if(settings.gameRunning == true){
  if (!timer_on) {
    timer_on = 1;
    timedCount();
  } 
}
  if(playerScore.text == '1'){
   alert('win');
   
 }       
  if(cpuScore.text == '1'){
   alert('lose');

  }
if(parseInt(seconds.text) == '0'   && parseInt(minutes.text) == '0'){
  alert('timesup');
}

} 


//reloads the page. Couldn't figure out something that will restart the game
function resetGame() {
    if(keys.space){
       location.reload()
      }
} 

function fingerLifted(e){
    switch(e.key){
        case "ArrowUp":
            keys.u=false;
            break;
        case "ArrowDown":
            keys.d=false;
            break;
        case " ":
            keys.space=false;
            break;
    }
}

function fingerDown(e){
    switch(e.key){
        case "ArrowUp":
            keys.u=true;
            break;
        case "ArrowDown":
            keys.d=true;
            break;
        case " ":
            keys.space=true;
            break;
    }
}



function tock(e){
// if(settings.gamecountdown){
//   gamecountdownf();
 
// }

    if(settings.gameRunning){
        movePaddle();
        moveBall();
        moveCpu();
        hitWall();
        trackScore();
        hitTest();
       gameStatus(); 
    }
resetGame();
    
stage.update(e);
} 
window.addEventListener("load", preload);