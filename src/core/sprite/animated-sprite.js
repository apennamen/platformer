/* The 'play' keyframe rule will be updated in JS depending on the size of the sprite  */
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      --sprite-width: 0px;
      --sprite-height: 0px;
      --steps-number: 0;
      --total-img-width: 802px;
      --animation-rate: 0.5s;
    }
    
    :host([hidden]) {
      display: none;
    }
    
    @keyframes play {
      100% { background-position: -0px; }
    }
    
    .animated-sprite {
      width: var(--sprite-width);
      height: var(--sprite-height);
    }
    
    .animated-sprite:hover {
      cursor: pointer;
    }
  </style>
  <div class="animated-sprite" ></div>
`;

/**
 * Animated sprite, from a continuous 'tape' sprite:
 * each picture of the animation must be the same size.
 *
 * @param {number] totalImgWidth - the total size of the image containing the animation
 * @param {string] imgUrl - the URL to this image
 * @param {string}stepsNumber - the number of animations in the image
 * @param {number] spriteWidth - the width of one animation (must be the same for every animation)
 * @param {number] spriteHeight - the width of one animation (must be the same for every animation)
 * @param {string} animationRate - in second
 *
 * ## Usage:
 * import AnimatedSprite from 'path/to/draggable-sprite';
 * window.customElements.define('animated-sprite', AnimatedSprite);
 *
 * <animated-sprite
 *   img-url="/path/to/img"
 *   sprite-width="52px"
 *   sprite-height="68px"
 *   steps-number="11"
 *   animation-rate="0.9s"
 *   total-img-width="574px"
 * ></animated-sprite>
 *
 * On the element that receives the draggable sprite, use:
 * this.innerHtml = e.dataTransfer.getData("text/html");
 */
export default class AnimatedSprite extends HTMLElement {
  static get observedAttributes() {
    return [
      'total-img-width',
      'sprite-width',
      'sprite-height',
      'img-url',
      'animation-rate',
      'steps-number',
    ];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));
    this.$animatedSprite = this.shadow.querySelector('.animated-sprite');
  }

  connectedCallback() {
    this.upgradeProperty('total-img-width');
    this.upgradeProperty('sprite-width');
    this.upgradeProperty('sprite-height');
    this.upgradeProperty('img-url');
    this.upgradeProperty('animation-rate');
    this.upgradeProperty('steps-number');
  }

  disconnectedCallback() {
    this.$animatedSprite.removeEventListener('animationend', this.onAnimationEnd);
  }

  set totalImgWidth(totalImgWidth) {
    this.setAttribute('total-img-width', totalImgWidth);
  }

  set spriteWidth(spriteWidth) {
    this.setAttribute('sprite-width', spriteWidth);
  }

  set spriteHeight(spriteHeight) {
    this.setAttribute('sprite-height', spriteHeight);
  }

  set imgUrl(imgUrl) {
    this.setAttribute('img-url', imgUrl);
  }

  set animationRate(animationRate) {
    this.setAttribute('animation-rate', animationRate);
  }

  set stepsNumber(stepsNumber) {
    this.setAttribute('steps-number', stepsNumber);
  }

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case 'img-url':
        this.$animatedSprite.style.setProperty('background', `url(${newValue}) left center`, '');
        break;
      case 'total-img-width':
        this.updatePlayKeyframeRule(newValue);
        break;
      default:
        this.style.setProperty(`--${name}`, newValue, '');
    }
  }

  play() {
    this.$animatedSprite.style.setProperty('animation', 'play var(--animation-rate) steps(var(--steps-number))');
    this.$animatedSprite.addEventListener('animationend', this.onAnimationEnd.bind(this));
  }

  onAnimationEnd() {
    this.$animatedSprite.style.removeProperty('animation');
  }

  updatePlayKeyframeRule(imgWidth) {
    const { cssRules } = this.shadow.styleSheets[0];
    // We need to find the keyframe rule to modify, it's name is defined in CSS as 'play'
    const playRule = [...cssRules].find(rule => rule.name && rule.name === 'play');
    if (playRule) {
      playRule.cssRules[0].style.setProperty('background-position', `-${imgWidth}`, '');
    }
  }

  upgradeProperty(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
}
