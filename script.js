
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

//ball speed on axis
let xSpeed = 5;
let ySpeed = 5;

//speed of the CPU paddle
let cpuSpeed = 4.5; 

//menu and game music
let inMenuSound, inGameSound, toggleAudio_game, toggleAudio_menu;

//restart button 
let restart_game

//preloader
function preload(){
    stage = new createjs.Stage("gameArea");
    stage.mouseEventsEnabled = true;


    pText = new createjs.Text("Loading", "30px VT323", "#FFF");
    pText.textBaseline="middle";
    pText.textAlign="center";
    pText.x=stage.canvas.width/2;
    pText.y=stage.canvas.height/2;
    stage.addChild(pText);

    function FontLoader(loadItem, preferXHR) {
		this.AbstractLoader_constructor(loadItem, preferXHR, loadItem.type);
		this._faces = {};
		this._watched = [];
		this._count = 0;
		this._watchInterval = null;
		this._loadTimeout = null;
		
		this._injectCSS = (loadItem.injectCSS === undefined) ? true : loadItem.injectCSS;
 
		this.dispatchEvent("initialize");
	}
	var p = createjs.extend(FontLoader, createjs.AbstractLoader);
    FontLoader.canLoadItem = function (item) {
        return item.type == createjs.Types.FONT || item.type == createjs.Types.FONTCSS;
    };
    
    queue = new createjs.LoadQueue(true);
    queue.installPlugin(createjs.Sound);
    queue.loadManifest([
			{id:"cpuPaddle", src:"gfx/img/paddle.png"},
			{id:"playerPaddle", src:"gfx/img/paddle.png"},
			{id:"ball", src:"gfx/img/ball.png"},
			{id:"win", src:"gfx/img/win.png"},
            {id:"lose", src:"gfx/img/lose.png"},
            {id:"start", src:"gfx/img/start.png"},
            {id:"title", src:"gfx/img/title.png"},  
            {id:"start_game", src:"gfx/img/instructions_start.png"}, 
            {id:"howTo", src:"gfx/img/howTo.png"},              
            {id:"instruction", src:"gfx/img/howToPlay.png"},          
			{id:"playerScore", src:"gfx/sound/playerScore.mp3"},
            {id:"enemyScore", src:"gfx/sound/enemyScore.mp3"},
            {id:"winScreen", src:"gfx/sound/win.mp3"},
            {id:"loseScreen", src:"gfx/sound/lose.mp3"},
			{id:"hitPaddle", src:"gfx/sound/hitPaddle.mp3"},
            {id:"wall", src:"gfx/sound/hit.mp3"},
            {id:"inMenu", src:"gfx/sound/inMenu.mp3"},
            {id:"inGame", src:"gfx/sound/inGame.mp3"},
            {id:"audioButton", src:"gfx/img/audio_button.png"},
            {id:"restart", src:"gfx/img/restart_button.png"}
    ]);

    queue.addEventListener('progress', progress);
    queue.addEventListener('complete', loaded);

} 

//visual loading progress
function progress(e){
    let percent = Math.round(e.progress*100);
    pText.text = "Loading: "+percent+"%";
    
    stage.update();
}

//pausing the menu audio
function inMenuPause(){
    inMenuSound.paused ? inMenuSound.paused = false : inMenuSound.paused = true;
}

//pausing the game audio
function inGamePause(){
    inGameSound.paused ? inGameSound.paused = false : inGameSound.paused = true;
}

//restarts the game while playing it. Only while playing it.
function restartGame(){
    stage.removeChild(player, ball, cpu, playerScore, cpuScore, restart_game, toggleAudio_game);
    createjs.Sound.stop();
    reset();
    startGame();
}

//loading completed, do this
function loaded() {
    stage.removeChild(pText);
    
    inMenuSound = createjs.Sound.play("inMenu", {loop:-1});
     inMenuSound.volume = 0.05;
     
    //title
    let title = new createjs.Bitmap(queue.getResult('title'));
     title.x = 5;
     title.y = -10;
    

    //start button
    let button = new createjs.Bitmap(queue.getResult('start'));
     button.x = 180;
     button.y = 140;
    
    //instruction button
    let instruction = new createjs.Bitmap(queue.getResult('instruction'));
     instruction.x = 180;
     instruction.y = 200;
    
     //audio stop/start button
    toggleAudio_menu = new createjs.Bitmap(queue.getResult('audioButton'));
     toggleAudio_menu.x = 440;
     toggleAudio_menu.y = 280;

      
    stage.addChild(button, instruction, title, toggleAudio_menu);
    
    //click to stop or start the audio
    toggleAudio_menu.addEventListener('click', function(e){
      inMenuPause();
    });


    //click on the start game button => start the game
    button.addEventListener('click', function(e){
     stage.removeChild(e.target, instruction, title, toggleAudio_menu);
      inMenuPause();
      startGame();
    });

    //click on the instruction button => go to the instruction screen
    instruction.addEventListener('click', function(e){
     stage.removeChild(e.target, button, instruction, title)

      let instruction_pannel = new createjs.Bitmap(queue.getResult('howTo'));
       instruction_pannel.x = -7;
       instruction_pannel.y = -10;

      let start_game = new createjs.Bitmap(queue.getResult('start_game'));
       start_game.x = 180;
       start_game.y = 265;
         
     stage.addChild(start_game, instruction_pannel )  
        
    //new button on the instruction screen, click it => starts the game
     start_game.addEventListener('click', function(e){  
      stage.removeChild(start_game, title, instruction_pannel, toggleAudio_menu)
       inMenuPause();
       startGame();
      });
    });

    createjs.Ticker.framerate=30;
    createjs.Ticker.addEventListener("tick", tock);    
    }


    //game running
function startGame(){

  
  stage.mouseMoveOutside = true;
  stage.on("stagemousemove", function(evt) {

    player.y=evt.stageY;
      console.log("stageX/Y: "+evt.stageX+","+evt.stageY); // always in bounds
      console.log("rawX/Y: "+evt.rawX+","+evt.rawY); // could be < 0, or > width/height
  });


    settings.gameRunning=true;

    inGameSound = createjs.Sound.play("inGame", {loop:-1});
    inGameSound.volume = 0.02;
      
    window.addEventListener('keyup', fingerLifted);
    window.addEventListener('keydown', fingerDown);

    player = new createjs.Bitmap(queue.getResult('playerPaddle'));
     player.x = 2;
     player.y = 160 - 37.5;

    cpu = new createjs.Bitmap(queue.getResult('cpuPaddle'));
     cpu.x = 480 - 25;
     cpu.y = 160 - 37.5;

    ball = new createjs.Bitmap(queue.getResult('ball'));
     ball.x = 240 - 15;
     ball.y = 160 - 15;

    playerScore = new createjs.Text('0', ' 30px VT323', '#fff');
     playerScore.x = 211;
     playerScore.y = 20;
     
    cpuScore = new createjs.Text('0', ' 30px VT323', '#fff');
     cpuScore.x = 262;
     cpuScore.y = 20;

    //audio stop/start button
    toggleAudio_game = new createjs.Bitmap(queue.getResult('audioButton'));
     toggleAudio_game.x = 210;
     toggleAudio_game.y = 290;

    toggleAudio_game.addEventListener('click', function(e){
        inGamePause();
      });

    //restart button
    restart_game = new createjs.Bitmap(queue.getResult('restart'));
    restart_game.x = 260;
    restart_game.y = 290;

    restart_game.addEventListener('click', function(e){
        restartGame();
      });
       
    stage.addChild(toggleAudio_game, playerScore, cpuScore, player, cpu, ball, restart_game );
}
    
function movePaddle(){
    if(keys.u){
      player.y-=settings.speed;
    }
    if(keys.d){
      player.y+=settings.speed;
    }
    if(player.y >= 245) //stop the paddle from going out of canvas 
    {
      player.y = 245;
    }
    if(player.y <= 0)
    {
      player.y = 0;
    }
}

//reset funciton for when a point is scored. Basically resets the position of everything
function reset(){
  ball.x = 240 - 15;
  ball.y = 160 - 15;
  player.y = 160 - 37.5;
  cpu.y = 160 - 37.5;    
}

//ball movement 
function moveBall(){
  ball.x = ball.x + xSpeed;
  ball.y = ball.y + ySpeed;
}

//when ball hits the wall
function hitWall(){
 if((ball.y) < 0) { //top wall
    ySpeed = -ySpeed; 
    
 let wallHitSound = createjs.Sound.play("wall");
 wallHitSound.volume = 0.1;
 };

 if((ball.y + (30)) > 320) { //bottom wall
  ySpeed = -ySpeed; 
    
 let wallHitSound = createjs.Sound.play("wall");
 wallHitSound.volume = 0.1;
  };
}

function trackScore(){
  if((ball.x) < 0){
    xSpeed = -xSpeed;
    cpuScore.text = parseInt(cpuScore.text + 1);
    settings.speed--;
    
    reset();
    let enemyScoreSound = createjs.Sound.play("enemyScore");
    enemyScoreSound.volume = 0.1;
  }

  if((ball.x + (30)) > 480){
    xSpeed = -xSpeed;
    playerScore.text = parseInt(playerScore.text + 1);
    
    reset();
    let playerScoreSound = createjs.Sound.play("playerScore");
    playerScoreSound.volume = 0.1;
  }
}

function moveCpu() {
  //Cpu Movement / computer AI 
    if((cpu.y+32) < (ball.y-14)){
      cpu.y = cpu.y + cpuSpeed;
   }else if((cpu.y+32) > (ball.y+14)){
      cpu.y = cpu.y - cpuSpeed;
  }
}

function hitTest() {
    if(ball.x + 30 > cpu.x && ball.x + 30 < cpu.x + 22 && ball.y >= cpu.y && ball.y < cpu.y + 75){
        xSpeed *= -1;
    
    let paddleHitSound = createjs.Sound.play("hitPaddle");
    paddleHitSound.volume = 0.1;
        
    }
    if(ball.x <= player.x + 22 && ball.x > player.x && ball.y >= player.y && ball.y < player.y + 75){       
        xSpeed *= -1;
    
    let paddleHitSound = createjs.Sound.play("hitPaddle");
    paddleHitSound.volume = 0.1;
        
        
    }
}

//dealing with the win/lose pop-ups
function alert(e){     
    if(e == 'win') {
        settings.gameRunning=false;
        createjs.Sound.stop();
        win = new createjs.Bitmap(queue.getResult('win'));
        win.x = 15;
        win.y = -150;
        Tween.get(win).to({y: 10}, 500);
        stage.addChild(win);
        stage.removeChild(toggleAudio_game, restart_game);
        
    }else{
        settings.gameRunning=false;
        createjs.Sound.stop();
        lose = new createjs.Bitmap(queue.getResult('lose'));
        lose.x = 15;
        lose.y = -150;        
        Tween.get(lose).to({y: 10}, 500);      
        stage.addChild(lose);
        stage.removeChild(toggleAudio_game, restart_game);
        
    }
    
}

//score tracking to know if we should pop a win screen, a lose one or nothing 
function gameStatus() {
  if(playerScore.text == '3'){
   alert('win');
   
   let winSound = createjs.Sound.play("winScreen");
   winSound.volume = 0.1;
 }       
  if(cpuScore.text == '3'){
   alert('lose');
   
   let loseSound = createjs.Sound.play("loseScreen");
   loseSound.volume = 0.1;
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