let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Mouse events
    paper.addEventListener('mousedown', (e) => this.handleStart(e, paper));
    document.addEventListener('mousemove', (e) => this.handleMove(e, paper));
    document.addEventListener('mouseup', () => this.handleEnd());

    // Touch events
    paper.addEventListener('touchstart', (e) => this.handleStart(e, paper));
    document.addEventListener('touchmove', (e) => this.handleMove(e, paper));
    document.addEventListener('touchend', () => this.handleEnd());
  }

  handleStart(e, paper) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    paper.style.zIndex = highestZ;
    highestZ += 1;

    if (e.type === 'mousedown') {
      this.mouseTouchX = e.clientX;
      this.mouseTouchY = e.clientY;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
    } else if (e.type === 'touchstart') {
      this.mouseTouchX = e.touches[0].clientX;
      this.mouseTouchY = e.touches[0].clientY;
      this.prevMouseX = e.touches[0].clientX;
      this.prevMouseY = e.touches[0].clientY;
    }

    if (e.button === 2 || e.touches.length > 1) {
      this.rotating = true;
    }
  }

  handleMove(e, paper) {
    if (!this.holdingPaper) return;

    let clientX, clientY;
    if (e.type === 'mousemove') {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    this.velX = clientX - this.prevMouseX;
    this.velY = clientY - this.prevMouseY;

    const dirX = clientX - this.mouseTouchX;
    const dirY = clientY - this.mouseTouchY;
    const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
    const dirNormalizedX = dirX / dirLength;
    const dirNormalizedY = dirY / dirLength;

    const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
    let degrees = (180 * angle) / Math.PI;
    degrees = (360 + Math.round(degrees)) % 360;

    if (this.rotating) {
      this.rotation = degrees;
    }

    if (!this.rotating) {
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;
    }

    this.prevMouseX = clientX;
    this.prevMouseY = clientY;

    paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
  }

  handleEnd() {
    this.holdingPaper = false;
    this.rotating = false;
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
