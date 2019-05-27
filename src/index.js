import GameGrid from './grid/grid';

window.customElements.define('game-grid', GameGrid);

window.onload = () => {
  const grid = document.createElement('game-grid');
  grid.setAttribute('width', 40);
  grid.setAttribute('height', 30);
  document.body.appendChild(grid);
};
