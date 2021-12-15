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
      Math.floor(Math.random()) * this.characters.length
    );
    context.fillStyle = "#0aff0a";
    context.fillText(this.text, this.x, this.fontSize, this.y, this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight) {
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
  }
  #initialize() {
    // private(은닉)프리픽스 이름 자체의 일부기 떄문에
    // 생성자에서 접근할 때 #을 붙이고 접근해야함
    for (let i = 0; i < this.columns.length; i++) {
      this.symbols[i] = new Symbols();
    }
  }
}

function animate() {}
