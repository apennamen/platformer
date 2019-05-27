import DraggableSprite from 'components/sprite/draggable-sprite';
import box from 'assets/sprites/box.png';
import boxCoin from 'assets/sprites/boxCoin.png';
import castleLeft from 'assets/sprites/castleLeft.png';
import castleMid from 'assets/sprites/castleMid.png';
import castleRight from 'assets/sprites/castleRight.png';
import grassLeft from 'assets/sprites/grassLeft.png';
import grassMid from 'assets/sprites/grassMid.png';
import grassRight from 'assets/sprites/grassRight.png';
import signExit from 'assets/sprites/signExit.png';
import ladderMid from 'assets/sprites/ladderMid.png';
import ladderTop from 'assets/sprites/ladderTop.png';

window.customElements.define('draggable-sprite', DraggableSprite);

const template = document.createElement('template');
template.innerHTML = `
  <div>
    <draggable-sprite sprite="${box}"></draggable-sprite>
    <draggable-sprite sprite="${boxCoin}"></draggable-sprite>
    <draggable-sprite sprite="${castleLeft}"></draggable-sprite>
    <draggable-sprite sprite="${castleMid}"></draggable-sprite>
    <draggable-sprite sprite="${castleRight}"></draggable-sprite>
    <draggable-sprite sprite="${grassLeft}"></draggable-sprite>
    <draggable-sprite sprite="${grassMid}"></draggable-sprite>
    <draggable-sprite sprite="${grassRight}"></draggable-sprite>
    <draggable-sprite sprite="${signExit}"></draggable-sprite>
    <draggable-sprite sprite="${ladderMid}"></draggable-sprite>
    <draggable-sprite sprite="${ladderTop}"></draggable-sprite>
  </div>
`;

export default class SpriteGallery extends HTMLElement {
  constructor() {
    super();
    // Shadow root element
    this._shadowRoot = this.attachShadow({mode: 'closed'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
