import DraggableSprite from 'core/sprite/draggable-sprite';
import box from 'assets/sprites/sample/box.png';
import boxCoin from 'assets/sprites/sample/boxCoin.png';
import castleLeft from 'assets/sprites/sample/castleLeft.png';
import castleRight from 'assets/sprites/sample/castleRight.png';
import castleMid from 'assets/sprites/sample/castleMid.png';
import grassLeft from 'assets/sprites/sample/grassLeft.png';
import grassMid from 'assets/sprites/sample/grassMid.png';
import grassRight from 'assets/sprites/sample/grassRight.png';
import ladderMid from 'assets/sprites/sample/ladderMid.png';
import ladderTop from 'assets/sprites/sample/ladderTop.png';
import signExit from 'assets/sprites/sample/signExit.png';

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
    <draggable-sprite sprite="${ladderMid}"></draggable-sprite>
    <draggable-sprite sprite="${ladderTop}"></draggable-sprite>
    <draggable-sprite sprite="${signExit}"></draggable-sprite>
  </div>
`;

export default class SpriteGallery extends HTMLElement {
  constructor() {
    super();
    // Shadow root element
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(template.content.cloneNode(true));
  }
}
