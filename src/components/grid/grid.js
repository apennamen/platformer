import AnimatedPlayer from 'containers/player';
import GameTile from './tile';

window.customElements.define('animated-player', AnimatedPlayer);
window.customElements.define('game-tile', GameTile);

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
        --grid-width: 10;
        --grid-height: 10;
        --player-column-pos: 1;
        --player-row-pos: 7;
    }
    
    .wrapper {
      display: grid;
      position: relative;
      grid-template-columns: repeat(var(--grid-width), 70px);
      grid-template-rows: repeat(var(--grid-height), 70px);
      grid-gap: 0;
    }
    
    .player {
      position:absolute;
      grid-row-start: var(--player-row-pos);
      grid-column-start: var(--player-column-pos);
    }
    
    .tile {
      cursor: pointer;
    }
    
    @keyframes up {
        0% {margin-top: 0; transform: scale(1, 1)}
        10% {margin-top: 5px; transform: scale(1, 0.95)}
        35% {margin-top: -60px; transform: scale(1, 1.05)}
        80% {margin-top: 0; transform: scale(1, 1)}
        90% {transform: scale(1, 0.95)}
        100% {margin-top: 0; transform: scale(1, 1)}
    }
    
    @keyframes down {
        0% {margin-top: 0}
        100% {margin-top: 70px}
    }
    
    @keyframes right {
        0% {margin-left: 0}
        100% {margin-left: 70px}
    }
    
    @keyframes left {
        0% {margin-left: 0}
        100% {margin-left: -70px}
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
    this.player = document.createElement('animated-player');
    this.player.setAttribute('class', 'player');
  }

  connectedCallback() {
    document.addEventListener('keydown', (e) => {
      const playerColumn = +getComputedStyle(this).getPropertyValue('--player-column-pos');
      const playerRow = +getComputedStyle(this).getPropertyValue('--player-row-pos');

      switch (e.key) {
        case 'ArrowUp':
          if (playerRow === 1) break;
          this.player.jump();
          this.player.style.setProperty('animation', 'up 0.9s linear');
          this.player.addEventListener('animationend', () => {
            this.player.style.removeProperty('animation');
          });
          break;
        case 'ArrowDown':
          if (playerRow === this.height) break;
          this.player.jump();
          this.player.style.setProperty('animation', 'down 0.5s ease');
          this.player.addEventListener('animationend', () => {
            this.style.setProperty('--player-row-pos', playerRow + 1, '');
            this.player.style.removeProperty('animation');
          });
          break;
        case 'ArrowLeft':
          if (playerColumn === 1) break;
          this.player.walkLeft();
          this.player.style.setProperty('animation', 'left 0.8s ease');
          this.player.addEventListener('animationend', () => {
            this.style.setProperty('--player-column-pos', playerColumn - 1, '');
            this.player.style.removeProperty('animation');
          });
          break;
        case 'ArrowRight':
          if (playerColumn === this.width) break;
          this.player.walkRight();
          this.player.style.setProperty('animation', 'right 0.8s ease');
          this.player.addEventListener('animationend', () => {
            this.style.setProperty('--player-column-pos', playerColumn + 1, '');
            this.player.style.removeProperty('animation');
          });
          break;
        default:
          break;
      }
    });
  }

  disconnectedCallback() {
    this.player.removeEventListener('animationend');
  }

  set playerPosition({ row, col }) {
    this.style.setProperty('--player-column-pos', col, '');
    this.style.setProperty('--player-row-pos', this.height - row - 1, '');
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
    this.$wrapper.appendChild(this.player);

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
