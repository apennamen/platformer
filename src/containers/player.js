import player from 'assets/sprites/character/player2.png';
import AnimatedSprite from 'components/sprite/animated-sprite';

window.customElements.define('animated-sprite', AnimatedSprite);

const template = document.createElement('template');
template.innerHTML = `
  <animated-sprite
    img-url="${player}"
    sprite-width="52px"
    sprite-height="68px"
    steps-number="11"
    animation-rate="0.9s"
    total-img-width="574px"
  ></animated-sprite>
`;

export default class AnimatedPlayer extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._shadowRoot.querySelector('animated-sprite').addEventListener('onSpriteDragStart', (e) => {
      e.detail.dataTransfer.setData("text/html", template.innerHTML);
    })
  }
}
