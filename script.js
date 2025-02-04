let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper; // Store the specific paper element
    this.holdingPaper = false;
    this.mouseTouchX = 0;
    this.mouseTouchY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.rotating = false;

    this.init();
  }

  init() {
    this.paper.addEventListener("mousedown", (e) => this.onMouseDown(e));
    window.addEventListener("mouseup", () => this.onMouseUp());
    window.addEventListener("mousemove", (e) => this.onMouseMove(e));
  }

  onMouseDown(e) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    this.paper.style.zIndex = highestZ++;
    this.mouseTouchX = e.clientX;
    this.mouseTouchY = e.clientY;
    this.prevMouseX = e.clientX;
    this.prevMouseY = e.clientY;

    if (e.button === 2) {
      this.rotating = true;
    }
  }

  onMouseUp() {
    this.holdingPaper = false;
    this.rotating = false;
  }

  onMouseMove(e) {
    if (!this.holdingPaper) return;

    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    this.velX = this.mouseX - this.prevMouseX;
    this.velY = this.mouseY - this.prevMouseY;

    if (!this.rotating) {
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;
    } else {
      const dirX = this.mouseX - this.mouseTouchX;
      const dirY = this.mouseY - this.mouseTouchY;
      const angle = Math.atan2(dirY, dirX);
      this.rotation = (180 * angle) / Math.PI;
    }

    this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;

    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;
  }
}

document.querySelectorAll(".paper").forEach((paper) => {
  new Paper(paper);
});
