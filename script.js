//let timeout;
let counter = 0;
let timeout;
let timer_on = 0;


"use strict";

//global 
let stage, queue, pText;

//game settings
let settings = {
    gameRunning:false,
    speed: 4.5 //how fast the player's paddle is moving 
};

let keys = {
    u: false,
    d: false,
    space:false,
}

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


//menu and game music
//let inMenuSound, inGameSound, toggleAudio_game, toggleAudio_menu;

//restart button 
//let restart_game;

//preloader

// function resiize(){
//   var scale = newWidth/myCanvas.width;
// myCanvas.width = newWidth;
// myStage.scaleX = myStage.scaleY = scale;
// myStage.update(); // draw at the new size.
// }






function preload(){


    stage = new createjs.Stage("gameArea");
    stage.mouseEventsEnabled = true;
    createjs.Touch.enable(stage);



    // Rotates the canvas 90 degrees
    //context.rotate(90 * (Math.PI / 180));

    // pText = new createjs.Text("Loading", "4rem Arial", "#FFF");
    // pText.textBaseline="middle";
    // pText.textAlign="center";
    // pText.x=stage.canvas.width/2;
    // pText.y=stage.canvas.height/2;
    // stage.addChild(pText);

  //   function FontLoader(loadItem, preferXHR) {
	// 	this.AbstractLoader_constructor(loadItem, preferXHR, loadItem.type);
	// 	this._faces = {};
	// 	this._watched = [];
	// 	this._count = 0;
	// 	this._watchInterval = null;
	// 	this._loadTimeout = null;
		
	// 	this._injectCSS = (loadItem.injectCSS === undefined) ? true : loadItem.injectCSS;
 
	// 	this.dispatchEvent("initialize");
	// }
	// var p = createjs.extend(FontLoader, createjs.AbstractLoader);
  //   FontLoader.canLoadItem = function (item) {
  //       return item.type == createjs.Types.FONT || item.type == createjs.Types.FONTCSS;
  //   };
    
    queue = new createjs.LoadQueue(true);
    queue.installPlugin(createjs.Sound);
    queue.loadManifest([
			{id:"cpuPaddle", src:"gfx/img/paddleai12.1.png"},
			{id:"playerPaddle", src:"gfx/img/paddleai12.1.png"},
			{id:"ball", src:"gfx/img/ballai1.png"},
			//{id:"win", src:"gfx/img/win.png"},
      // {id:"lose", src:"gfx/img/lose.png"},
      //{id:"start", src:"gfx/img/start.png"},
      //{id:"title", src:"gfx/img/title.png"},  
      {id:"start_game", src:"gfx/img/instructions_start.png"}, 
      //{id:"howTo", src:"gfx/img/howTo.png"},              
      // {id:"instruction", src:"gfx/img/howToPlay.png"},          
			//  {id:"playerScore", src:"gfx/sound/playerScore.mp3"},
      //   {id:"enemyScore", src:"gfx/sound/enemyScore.mp3"},
      // {id:"winScreen", src:"gfx/sound/win.mp3"},
      // {id:"loseScreen", src:"gfx/sound/lose.mp3"},
			{id:"hitPaddle", src:"gfx/sound/hitPaddle.mp3"},
      {id:"wall", src:"gfx/sound/hit.mp3"},
      // {id:"inMenu", src:"gfx/sound/inMenu.mp3"},
      // {id:"inGame", src:"gfx/sound/inGame.mp3"},
      {id:"audioButton", src:"gfx/img/audio_button.png"},
      {id:"restart", src:"gfx/img/restart_button.png"},
      {id:"timesup", src:"gfx/img/timesUp.png"}
    ]);

  //  queue.addEventListener('progress', progress);
  queue.addEventListener('complete', loaded);

} 

//visual loading progress
// function progress(e){
//     let percent = Math.round(e.progress*100);
//     pText.text = "Loading: "+percent+"%";
    
//     stage.update();
// }

//pausing the menu audio
// function inMenuPause(){
//     inMenuSound.paused ? inMenuSound.paused = false : inMenuSound.paused = true;
// }

//pausing the game audio
// function inGamePause(){
//     inGameSound.paused ? inGameSound.paused = false : inGameSound.paused = true;
// }

//restarts the game while playing it. Only while playing it.



//rmv, toggleAudio_game, restart_game
// function restartGame(){
//     stage.removeChild(player, ball, cpu, playerScore, cpuScore, timer, time);
//     createjs.Sound.stop();
//     reset();
//     startGame();
// }

//loading completed, do this


// function fitToContainer(canvas){
//   // Make it visually fill the positioned parent
//   canvas.style.width ='100%';
//   canvas.style.height='100%';
//   // ...then set the internal size to match
//   canvas.width  = canvas.offsetWidth;
//   canvas.height = canvas.offsetHeight;
// }

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


  
 



    //stage.removeChild(pText);
    
    // inMenuSound = createjs.Sound.play("inMenu", {loop:-1});
    //  inMenuSound.volume = 0.05;
     
    //title
    // let title = new createjs.Bitmap(queue.getResult('title'));
    //  title.x = 5;
    //  title.y = -10;

    //  let title = new createjs.Text('PONG', ' 5rem Arial', '#fff');
    //  title.x=stage.canvas.width/2;
    //  title.textAlign="center";
    //  title.y = 20;
    
    //  let title2 = new createjs.Text('Legends Never Die', ' 2rem Arial', '#fff');
    //  title2.x=stage.canvas.width/2;
    //  title2.textAlign="center";
    //  title2.y = 90;     //title2.style.display = "block"; 
    // title2.style.backgroundColor= "red";
    //start button

    let button = new createjs.Text('Start', ' 4rem 	Arial', '#fff');

    button.x= mywidth/2;
    button.textAlign="center";
    button.textBaseline="middle";
    button.y = myheight/1.7;
    button.outline = 2;
    var bounds = button.getBounds();
    console.log(bounds);
   
//button.setBounds(0,0,400,500);


    // let button = new createjs.Bitmap(queue.getResult('start'));
    //  button.x = 180;
    //  button.y = 140;
    
    //instruction button
    // let instruction = new createjs.Bitmap(queue.getResult('instruction'));
    //  instruction.x = 180;
    //  instruction.y = 200;
    
    //  let instruction = new createjs.Text('How To Play', ' 4rem Arial', '#fff');
    //  instruction.textAlign="center";
    //  instruction.x=stage.canvas.width/2;
    //  instruction.y = 200;

     //audio stop/start button
    // toggleAudio_menu = new createjs.Bitmap(queue.getResult('audioButton'));
    //  toggleAudio_menu.x = 440;
    //  toggleAudio_menu.y = 280;


    //add , toggleAudio_menu, instruction , title,title2

      
    stage.addChild(button);

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
    //click to stop or start the audio
    // toggleAudio_menu.addEventListener('click', function(e){
    //   inMenuPause();
    // });

//rmv , toggleAudio_menu instruction, title,title2,
    //click on the start game button => start the game
    bg.addEventListener('click', function(e){
     stage.removeChild(e.target,  button);
    //  inMenuPause();
      startGame();
    });

    // //click on the instruction button => go to the instruction screen
    // instruction.addEventListener('click', function(e){
    //  stage.removeChild(e.target, button, instruction, title, title2)

    //   let instruction_pannel = new createjs.Text('The game is simple! \n Move the paddle to prevent te ball from falling \n to your side. Instead, direct it to pass enemy paddle.\n Score 3 points and win!!', ' 2rem Arial', '#fff');
    //   //instruction_pannel.textBaseline="middle";
    //   instruction_pannel.textAlign="center";
    //   instruction_pannel.x=stage.canvas.width/2;
    //   //instruction_pannel.y=stage.canvas.height/2;

    //   //instruction_pannel.x = -7;
    //   instruction_pannel.y = 140;
    //   stage.addChild(instruction_pannel);
   
    //   let start_game = new createjs.Text('Lets Start!', ' 4rem Arial', '#fff');
    //   start_game.textAlign="center";
    //   start_game.x=stage.canvas.width/2;

    //    start_game.y = 265;
         
    //  stage.addChild(start_game, instruction_pannel )  
        

    //  //rmv , toggleAudio_menu
    // //new button on the instruction screen, click it => starts the game
    //  start_game.addEventListener('click', function(e){  
    //   stage.removeChild(start_game, title, title2, instruction_pannel)
    //   // inMenuPause();
    //    startGame();
    //   });
    // }); 

    createjs.Ticker.framerate=30;
    createjs.Ticker.addEventListener("tick", tock);    
    }




    //game running
function startGame(){

  stage.mouseMoveOutside = true;
  stage.on("stagemousemove", function(evt) {

    player.x=evt.stageX;
    //coordinates
    //  console.log("stageX/Y: "+evt.stageX+","+evt.stageY); // always in bounds
    //  console.log("rawX/Y: "+evt.rawX+","+evt.rawY); // could be < 0, or > width/height
  });


    settings.gameRunning=true;

    // inGameSound = createjs.Sound.play("inGame", {loop:-1});
    // inGameSound.volume = 0.02;
      
    window.addEventListener('keyup', fingerLifted);
    window.addEventListener('keydown', fingerDown);

    player = new createjs.Bitmap(queue.getResult('playerPaddle'));
    // player.scaleX=1.5;
    // player.scaleY=0.5;
     player.x = (mywidth/2) - ((player.image.width*1.5)/2);//2;
     player.y = myheight - 25; //230 - 25;//160 - 37.5;

    cpu = new createjs.Bitmap(queue.getResult('cpuPaddle'));
    // cpu.scaleX=1.5;
    // cpu.scaleY=0.5;
     cpu.x = (mywidth/2)  - ((cpu.image.width*1.5)/2);//480 - 25;
     cpu.y = 55;//160 - 37.5;

     //console.log(cpu.image.width);

    ball = new createjs.Bitmap(queue.getResult('ball'));
    // ball.scaleX=0.75;
    // ball.scaleY=0.75;
    ball.x = (mywidth/2) - (ball.image.width/2);;
     ball.y = (myheight/2) - (ball.image.width/2);

    playerScore = new createjs.Text('0', ' 2rem Arial', '#fff');
    //  playerScore.x = (mywidth/2) - 40;
    //  playerScore.y = 5;
     
    cpuScore = new createjs.Text('0', ' 2rem Arial', '#fff');
    //  cpuScore.x = (mywidth/2) + 40;
    //  cpuScore.y = 5;

     timer = new createjs.Text('Timer: ', ' 2rem Arial', '#fff');
     timer.x = (mywidth/2) - 50;
     timer.y = 5;

     seconds = new createjs.Text('00',  ' 2rem Arial', '#fff');
     seconds.x = (mywidth/2) + 95;//100;
     seconds.y = 5;

     split = new createjs.Text(':',  ' 2rem Arial', '#fff');
     split.x = (mywidth/2) + 85;//100;
     split.y = 5;

     minutes = new createjs.Text('01',  ' 2rem Arial', '#fff');
     minutes.x = (mywidth/2) + 50;//100;
     minutes.y = 5;

    //audio stop/start button
    // toggleAudio_game = new createjs.Bitmap(queue.getResult('audioButton'));
    //  toggleAudio_game.x = 210;
    //  toggleAudio_game.y = 290;

    // toggleAudio_game.addEventListener('click', function(e){
    //     inGamePause();
    //   });

    //restart button
    // restart_game = new createjs.Bitmap(queue.getResult('restart'));
    // restart_game.x = 420;
    // restart_game.y = 7;

    // restart_game.addEventListener('click', function(e){
    //     restartGame();
    //   });
       


      //add toggleAudio_game, , restart_game, playerScore, cpuScore, 
    stage.addChild(timer, seconds , split , minutes, player, cpu, ball );

  //  alert('win');
}
    
function movePaddle(){
    if(keys.u){
      player.x-=settings.speed;
    }
    if(keys.d){
      player.x+=settings.speed;
    }
    //if(player.y >= 245) //stop the paddle from going out of canvas 

    if(player.x >= mywidth - (player.image.width*1.5)) //stop the paddle from going out of canvas 
    {
      player.x = mywidth - (player.image.width*1.5);
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

  //player.y = 160 - 37.5;
  //cpu.y = 160 - 37.5;    
}

//ball movement 
function moveBall(){
  ball.x = ball.x + xSpeed;
  ball.y = ball.y + ySpeed;


}

//when ball hits the wall
function hitWall(){
//  if((ball.y) < 0) { //top wall
//     ySpeed = -ySpeed; 
    
//  let wallHitSound = createjs.Sound.play("wall");
//  wallHitSound.volume = 0.1;
//  };

//  if((ball.y + (30)) > 320) { //bottom wall
//   ySpeed = -ySpeed; 
    
//  let wallHitSound = createjs.Sound.play("wall");
//  wallHitSound.volume = 0.1;
//   };

  if((ball.x) < 0) { //left wall
    xSpeed = -xSpeed; 
    
 let wallHitSound = createjs.Sound.play("wall");
 wallHitSound.volume = 0.1;
 };

 if((ball.x + (ball.image.width)) > mywidth) { //right wall
  xSpeed = -xSpeed; 
    
 let wallHitSound = createjs.Sound.play("wall");
 wallHitSound.volume = 0.1;
  };


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

 //console.log("loop");

}

  if(timer_on == 0)
  {reset();
    clearTimeout(timeout);
    
    minutes.text=parseInt(01);
  }

 timeout = setTimeout(timedCount, 1000);
}

function trackScore(){


  // if((ball.x) < 0){
  //   xSpeed = -xSpeed;
  //   cpuScore.text = parseInt(cpuScore.text + 1);
  //   settings.speed--;
    
  //   reset();
  //   let enemyScoreSound = createjs.Sound.play("enemyScore");
  //   enemyScoreSound.volume = 0.1;
  // }

  // if((ball.x + (30)) > 480){
  //   xSpeed = -xSpeed;
  //   playerScore.text = parseInt(playerScore.text + 1);
    
  //   reset();
  //   let playerScoreSound = createjs.Sound.play("playerScore");
  //   playerScoreSound.volume = 0.1;
  // }

 if((ball.y - (20)) > myheight){

ySpeed=10;
xSpeed=5;
cpuSpeed=4;

    ySpeed = -ySpeed;
    cpuScore.text = parseInt(cpuScore.text + 1);
    settings.speed--;

    
    reset();
    // let enemyScoreSound = createjs.Sound.play("enemyScore");
    // enemyScoreSound.volume = 0.1;
  }

   if((ball.y) < 40){

    ySpeed=10;
    xSpeed=5;
    cpuSpeed=4;

    ySpeed = -ySpeed;
    playerScore.text = parseInt(playerScore.text + 1);
    
    reset();
    // let playerScoreSound = createjs.Sound.play("playerScore");
    // playerScoreSound.volume = 0.1;
  }
}

function moveCpu() {
  // //Cpu Movement / computer AI 
  //   if((cpu.y+32) < (ball.y-14)){
  //     cpu.y = cpu.y + cpuSpeed;
  //  }else if((cpu.y+32) > (ball.y+14)){
  //     cpu.y = cpu.y - cpuSpeed;
  // }

   //Cpu Movement / computer AI 
   if((cpu.x + ((cpu.image.width*1.5)/2)) < (ball.x - ball.image.width)){
    cpu.x = cpu.x + cpuSpeed;
 }
 
 else if((cpu.x + ((cpu.image.width*1.5)/2)) > (ball.x + ball.image.width)){
    cpu.x = cpu.x - cpuSpeed;
}
}

function hitTest() {
    // if(ball.x + 30 > cpu.x && ball.x + 30 < cpu.x + 22 && ball.y >= cpu.y && ball.y < cpu.y + 75){
    //     xSpeed *= -1;
    
    // let paddleHitSound = createjs.Sound.play("hitPaddle");
    // paddleHitSound.volume = 0.1;
        
    // }
    // if(ball.x <= player.x + 22 && ball.x > player.x && ball.y >= player.y && ball.y < player.y + 75){       
    //     xSpeed *= -1;
    
    // let paddleHitSound = createjs.Sound.play("hitPaddle");
    // paddleHitSound.volume = 0.1;
        
        
    // }


    if(ball.y + 30 -22 > cpu.y 
      && ball.y + 30 -22< cpu.y + 22 
      && ball.x >= cpu.x 
      && ball.x < cpu.x + (cpu.image.width*1.5))
      
      {
      ySpeed *= -1;
  
  let paddleHitSound = createjs.Sound.play("hitPaddle");
  paddleHitSound.volume = 0.1;
  
      
  }
  if(ball.y +22 <= player.y + 22
    && ball.y +22 > player.y 
    && ball.x >= player.x 
    && ball.x < player.x + (player.image.width*1.5))
    
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
//hide  playerScore, cpuScore, 
        Tween.get(win, restartt).to({y: myheight/6}, myheight);
        stage.removeChild(timer, seconds , split , minutes, player, cpu, ball );
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


        // win = new createjs.Text('Congratulations! \n\n\n You Won!', ' 4rem Arial', '#fff');
        // win.textAlign="center";
        // win..textBaseline="middle";
        //   win.y=stage.canvas.height/2;
        //   win.x=stage.canvas.width/2;

        
        // press_space = new createjs.Text('Press Space to Restart', ' 2rem Arial', '#fff');
        // press_space.textAlign="center";
        // win.x=stage.canvas.width/2;
        // win.y = 200;


        //rmv toggleAudio_game,
       // stage.removeChild( restart_game);
        
    }
    else if(e == 'lose'){
      settings.gameRunning=false;
      timer_on = 0;
      createjs.Sound.stop();
      // lose = new createjs.Bitmap(queue.getResult('lose'));
      // lose.x = (mywidth/2) - (lose.image.width/2) ;
      // lose.y = myheight;  

      //Tween.get(lose).to({y: myheight/6}, myheight);      
      //stage.addChild(lose);

      //lose = new createjs.Bitmap(queue.getResult('lose'));
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
      stage.removeChild( timer, seconds , split , minutes, player, cpu, ball );
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

           //rmv toggleAudio_game,
      //stage.removeChild(restart_game);
      
  }

    else if(e == 'timesup'){
      settings.gameRunning=false;
      timer_on = 0;
      createjs.Sound.stop();
//       timesup = new createjs.Bitmap(queue.getResult('timesup'));
//       timesup.x = (mywidth/2) - (timesup.image.width/2) ;
//       timesup.y =  myheight;        
//       Tween.get(timesup).to({y:myheight/6}, myheight);  
//       stage.addChild(timesup);    
// console.log('time up')



        //timesup = new createjs.Bitmap(queue.getResult('timesup'));
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
        stage.removeChild(timer, seconds , split , minutes, player, cpu, ball );
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


    //   if(playerScore.text > cpuScore.text) {
    //     console.log('time up win')

    //     win = new createjs.Bitmap(queue.getResult('win'));
    //     win.x = 15;
    //     win.y = -150;
    //     Tween.get(win).to({y: 70}, 500);
    //     stage.addChild(timesup, win);
    
    // }else {
    //   console.log('time up lose')

    //     lose = new createjs.Bitmap(queue.getResult('lose'));
    //     lose.x = 15;
    //     lose.y = -150;        
    //     Tween.get(lose).to({y: 70}, 500);      
    //     stage.addChild(timesup, lose);        
    // }
     //rmv toggleAudio_game,restart_game,
//  stage.removeChild( timer, time);

//  console.log('run stop');
//  stage.on("dblclick", function(evt) {
//    location.reload();
//    console.log('dblclick');
      
//   });
      
       
         
}}


function restartGame(){
    stage.removeChild(player, ball, cpu, timer,seconds , split , minutes);
    createjs.Sound.stop();
    reset();
    startGame();
}

//score tracking to know if we should pop a win screen, a lose one or nothing 
function gameStatus() {

  if(settings.gameRunning == true){
  if (!timer_on) {
    timer_on = 1;
    timedCount();
  } 
}
  if(playerScore.text == '1'){
   alert('win');
   
  //  let winSound = createjs.Sound.play("winScreen");
  //  winSound.volume = 0.1;
 }       
  if(cpuScore.text == '1'){
   alert('lose');
   
   
  //  let loseSound = createjs.Sound.play("loseScreen");
  //  loseSound.volume = 0.1;
  //  createjs.Touch.disable(stage);
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