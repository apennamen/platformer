import walk from 'assets/sprites/player/walk.png';
import jump from 'assets/sprites/player/jump.png';
import AnimatedSprite from 'components/sprite/animated-sprite';

window.customElements.define('animated-sprite', AnimatedSprite);

export default class AnimatedPlayer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.animatedSprite = document.createElement('animated-sprite');
    this.shadow.appendChild(this.animatedSprite);
  }

  connectedCallback() {
    this.loadWalk();
  }

  walkRight() {
    this.loadWalk();
    this.animatedSprite.style.removeProperty('transform');
    this.animatedSprite.play();
  }

  walkLeft() {
    this.loadWalk();
    this.animatedSprite.style.setProperty('transform', 'scaleX(-1)');
    this.animatedSprite.play();
  }

  jump() {
    this.loadJump();
    this.animatedSprite.play();
  }

  loadJump() {
    this.animatedSprite.imgUrl = jump;
    this.animatedSprite.totalImgWidth = '260px';
    this.animatedSprite.stepsNumber = 5;
    this.animatedSprite.animationRate = '0.5s';
  }

  loadWalk() {
    this.animatedSprite.imgUrl = walk;
    this.animatedSprite.totalImgWidth = '574px';
    this.animatedSprite.spriteWidth = '52px';
    this.animatedSprite.spriteHeight = '68px';
    this.animatedSprite.stepsNumber = 11;
    this.animatedSprite.animationRate = '0.8s';
  }
}
