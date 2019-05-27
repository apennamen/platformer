import GameGrid from 'grid/grid';
import ValueSelector from 'value-selector/value-selector';

window.customElements.define('game-grid', GameGrid);
window.customElements.define('value-selector', ValueSelector);

window.onload = () => {
  const INITIAL_GRID_HEIGHT = 10, INITIAL_GRID_WIDTH = 10;

  const heightSelector = document.createElement('value-selector');
  heightSelector.initialValue = INITIAL_GRID_HEIGHT;
  heightSelector.addEventListener('onSelectValue', (e) => setGridHeight(e.detail));
  document.body.appendChild(heightSelector);

  const widthSelector = document.createElement('value-selector');
  widthSelector.addEventListener('onSelectValue', (e) => setGridWidth(e.detail));
  widthSelector.initialValue = INITIAL_GRID_WIDTH;
  document.body.appendChild(widthSelector);

  const grid = document.createElement('game-grid');
  grid.setAttribute('width', 5);
  grid.setAttribute('height', 5);
  document.body.appendChild(grid);

  const setGridHeight = (height) => {
    grid.setAttribute('height', height);
  };

  const setGridWidth = (width) => {
    grid.setAttribute('width', width);
  }
};

