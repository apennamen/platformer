import GameTile from './tile';

window.customElements.define('game-tile', GameTile);

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
        --grid-width: 0;
        --grid-height: 0;
        --tile-background-color: #fff;
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
      background-color: var(--tile-background-color);
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

  set tileColor(val) {
    this.style.setProperty('--tile-background-color', val);
  }

  computeGrid(width, height) {
    this.$wrapper.innerHTML = null;
    const fragment = document.createDocumentFragment();

    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    for (let i = height; i > 0; i--) {
      /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
      for (let j = 1; j <= width; j++) {
        const tile = document.createElement('game-tile');
        tile.setAttribute('class', 'tile');
        tile.setAttribute('id', `${i}-${j % (width + 1)}`);
        tile.style.setProperty('border', '1px dashed grey');
        fragment.appendChild(tile);
      }
    }
    this.$wrapper.appendChild(fragment);
  }

  show(showGrid) {
    const tiles = this.shadow.querySelectorAll('.tile');
    if (showGrid) {
      this.$wrapper.style.setProperty('border', '1px solid black');
      tiles.forEach(tile => tile.style.setProperty('border', '1px dashed grey'));
    } else {
      this.$wrapper.style.removeProperty('border');
      tiles.forEach(tile => tile.style.removeProperty('border'));
    }
  }

  save(screenIndex) {
    const tiles = this.shadow.querySelectorAll('.tile');
    tiles.forEach((tile) => {
      localStorage.setItem(`${screenIndex}-${tile.id}`, tile.innerHTML);
    });
  }

  load(screenIndex) {
    const tiles = this.shadow.querySelectorAll('.tile');
    tiles.forEach((tile) => {
      tile.innerHTML = localStorage.getItem(`${screenIndex}-${tile.id}`);
    });
  }
}
