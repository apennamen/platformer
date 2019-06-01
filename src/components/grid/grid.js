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
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));
    this.$wrapper = this.shadow.querySelector('.wrapper');
  }

  set width(val) {
    this.gridWidth = val;
    this.computeGrid(this.gridWidth, this.gridHeight);
  }

  set height(val) {
    this.gridHeight = val;
    this.computeGrid(this.gridWidth, this.gridHeight);
  }

  computeGrid(width, height) {
    this.$wrapper.innerHTML = null;

    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    for (let i = 1; i <= width * height; i++) {
      const tile = document.createElement('game-tile');
      tile.setAttribute('class', 'tile');
      this.$wrapper.appendChild(tile);
    }
    // Update width
    this.style.setProperty('--grid-width', width, '');
  }
}
