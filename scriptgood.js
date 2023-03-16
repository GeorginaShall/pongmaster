const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleHeight = 10;
const paddleWidth = 100;
const ballSize = 10;

let myheight, mywidth;

//window.onload = function () {
    // Make it visually fill the positioned parent
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
  
    mywidth = canvas.width;
  //console.log("my width" + mywidth);
    canvas.height = canvas.offsetHeight;


    myheight = canvas.height;
    //    console.log("my height"+ myheight);
  //};

  //alert(myheight);
  
  // Change values when window is resized
  window.onresize = function () {
    // Make it visually fill the positioned parent
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  
    location.reload();
  };

  let playerX =mywidth / 2 - paddleWidth / 2;
  let playerY = myheight - 25 ;
  let aiX = mywidth / 2 - paddleWidth / 2 ;
  let aiY = 55;
let ballX = mywidth / 2 - ballSize / 2;
let ballY = myheight / 2 - ballSize / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;


function draw() {
  ctx.clearRect(0, 0, mywidth, myheight);

  // Draw paddles
  ctx.fillStyle = "white";
  ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
  ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fill();

  ballX += ballSpeedX;
  ballY += ballSpeedY;
  console.log("bx"+ballX);
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
    ballY = myheight / 2 - ballSize / 2;
    ballX = mywidth / 2 - ballSize / 2;
  
    cpuX = mywidth / 2 - paddleWidth / 2;
    playerX =mywidth / 2 - paddleWidth / 2;
  }

  // Update AI paddle position
  aiX += (ballX - (aiX + paddleWidth / 2)) * 0.1;

 


  requestAnimationFrame(draw);
}

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

draw();