import GameTile from './tile';

window.customElements.define('game-tile', GameTile);

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
        --grid-width: 10;
    }
    
    .wrapper {
      display: grid;
      grid-template-columns: repeat(var(--grid-width), 70px);
      grid-gap: 0;
      grid-auto-rows: 70px;
    }
    
    .tile {
      border: 1px dashed grey;
      cursor: pointer;
    }
  </style>
  <div class="wrapper"></div>
`;

export default class GameGrid extends HTMLElement {
  constructor() {
    super();
    // Shadow root element
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$wrapper = this._shadowRoot.querySelector('.wrapper');
  }

  set width(val) {
    this._width = val;
    this._computeGrid(this._width, this._height);
  }

  set height(val) {
    this._height = val;
    this._computeGrid(this._width, this._height);
  }

  _computeGrid(width, height) {
    this.$wrapper.innerHTML = null;

    for (let i = 1; i <= width * height; i++) {
      const tile = document.createElement('game-tile');
      tile.setAttribute('class', 'tile');
      this.$wrapper.appendChild(tile);
    }
    // Update width
    this.style.setProperty('--grid-width', width, "");
  }
}
