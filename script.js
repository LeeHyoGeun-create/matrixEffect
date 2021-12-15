"use strict";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.canvasHeight = canvasHeight;
  }
  draw(context) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
  #initialize() {
    // private(은닉)프리픽스 이름 자체의 일부기 떄문에
    // 생성자에서 접근할 때 #을 붙이고 접근해야함
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }
  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 15;
const nextFrame = 1000 / fps; //트리거하고 그릴 때 까지 기다리는 밀리초의 양
// 다음 초는 초당 30 프레임을 원하므로 nextFrame만큼 공백이 있어야함
let timer = 0; // 델타타임 누적변수
// deltaTime ins the difference in milliseconds between the
// previous animation frame and the current animation frame

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if (timer > nextFrame) {
    ctx.fillStyle = "rgba(0,0,0,0.05)"; // 투명한 레이어가 덧씌워지면서 위에게 투명해짐
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.fillStyle = "#0aff0a";
    ctx.font = effect.fontSize + "px monospace"; // monospace 동일한 양의 수평 공간 차지함
    effect.symbols.forEach((symbol) => symbol.draw(ctx));
    timer = 0;
    // 보통은 모니터 주사율에 맞추어 실행
    // 스택에 연산이 쌓여있으면 한번에 확 이동할 수 도 있음
  } else {
    timer += deltaTime;
  }
  requestAnimationFrame(animate); // 기본적으로 1초에 60번,
  console.log(`timeStamp: ${timeStamp}`);
  console.log(`deltaTime: ${deltaTime}`);
  console.log(`timer: ${timer}`);
}
animate(0); // 원하는 timeStamp 값을 넣어줘야 함

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  effect.resize(canvas.width, canvas.height);
});
