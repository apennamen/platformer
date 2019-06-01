import DraggableSprite from 'components/sprite/draggable-sprite';
import shiningcarpet from 'assets/sprites/shining/carpet1.png';
import shiningcarpet2 from 'assets/sprites/shining/carpet2.png';
import wall1 from 'assets/sprites/shining/wall1.png';
import wall2 from 'assets/sprites/shining/wall2.png';
import wall3 from 'assets/sprites/shining/wall3.png';
import door1 from 'assets/sprites/shining/door1.png';
import door2 from 'assets/sprites/shining/door2.png';
import door3 from 'assets/sprites/shining/door3.png';
import door4 from 'assets/sprites/shining/door4.png';
import door5 from 'assets/sprites/shining/door5.png';
import door6 from 'assets/sprites/shining/door6.png';
import photo from 'assets/sprites/shining/photo.png';
import axe1 from 'assets/sprites/shining/axe1.png';
import axe2 from 'assets/sprites/shining/axe2.png';

window.customElements.define('draggable-sprite', DraggableSprite);

const template = document.createElement('template');
template.innerHTML = `
  <div>
    <draggable-sprite sprite="${wall1}"></draggable-sprite>
    <draggable-sprite sprite="${wall2}"></draggable-sprite>
    <draggable-sprite sprite="${wall3}"></draggable-sprite>
    <draggable-sprite sprite="${shiningcarpet}"></draggable-sprite>
    <draggable-sprite sprite="${shiningcarpet2}"></draggable-sprite>
    <draggable-sprite sprite="${door1}"></draggable-sprite>
    <draggable-sprite sprite="${door2}"></draggable-sprite>
    <draggable-sprite sprite="${door3}"></draggable-sprite>
    <draggable-sprite sprite="${door4}"></draggable-sprite>
    <draggable-sprite sprite="${door5}"></draggable-sprite>
    <draggable-sprite sprite="${door6}"></draggable-sprite>
    <draggable-sprite sprite="${photo}"></draggable-sprite>
    <draggable-sprite sprite="${axe1}"></draggable-sprite>
    <draggable-sprite sprite="${axe2}"></draggable-sprite>
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
