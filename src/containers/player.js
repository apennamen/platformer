import player from 'assets/sprites/player.png';
import AnimatedSprite from 'components/sprite/animated-sprite';

window.customElements.define('animated-sprite', AnimatedSprite);

const template = document.createElement('template');
template.innerHTML = `
  <animated-sprite
    img-url="${player}"
    sprite-width="73px"
    sprite-height="97px"
    steps-number="11"
    animation-rate="0.9s"
    total-img-width="802px"
  ></animated-sprite>
`;

export default class AnimatedPlayer extends HTMLElement {
  constructor() {
    super();
    // Shadow root element
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
