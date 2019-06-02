import GameTile from './tile';

window.customElements.define('game-tile', GameTile);

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
        --grid-width: 10;
        --grid-height: 10;
    }
    
    .wrapper {
      display: grid;
      position: relative;
      grid-template-columns: repeat(var(--grid-width), 70px);
      grid-template-rows: repeat(var(--grid-height), 70px);
      grid-gap: 0;
    }
    
    .tile {
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
    this.style.setProperty('--grid-width', val);
    this.computeGrid(this.width, this.height);
  }

  get width() {
    return +this.style.getPropertyValue('--grid-width');
  }

  set height(val) {
    this.style.setProperty('--grid-height', val);
    this.computeGrid(this.width, this.height);
  }

  get height() {
    return +this.style.getPropertyValue('--grid-height');
  }

  computeGrid(width, height) {
    this.$wrapper.innerHTML = null;

    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    for (let i = height; i > 0; i--) {
      /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
      for (let j = 1; j <= width; j++) {
        const tile = document.createElement('game-tile');
        tile.setAttribute('class', 'tile');
        tile.setAttribute('id', `${i}-${j % (width + 1)}`);
        this.$wrapper.appendChild(tile);
      }
    }
  }

  show(showGrid) {
    const tiles = this.shadow.querySelectorAll('.tile');
    if (showGrid) {
      tiles.forEach(tile => tile.style.setProperty('border', '1px dashed grey'));
    } else {
      tiles.forEach(tile => tile.style.removeProperty('border'));
    }
  }
}
