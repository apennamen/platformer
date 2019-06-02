import GameLevel from './level';

window.customElements.define('game-level', GameLevel);

window.onload = () => {
  const grid = document.createElement('game-level');
  grid.width = 15;
  grid.height = 7;

  document.body.appendChild(grid);
};
