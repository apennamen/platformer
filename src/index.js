import GameGrid from 'components/grid/grid';
import ValueSelector from 'components/value-selector/value-selector';

window.customElements.define('game-grid', GameGrid);
window.customElements.define('value-selector', ValueSelector);

window.onload = () => {
  const INITIAL_GRID_HEIGHT = 10, INITIAL_GRID_WIDTH = 10;

  const heightSelector = document.createElement('value-selector');
  heightSelector.addEventListener('onSelectValue', (e) => setGridHeight(e.detail));
  heightSelector.initialValue = INITIAL_GRID_HEIGHT;
  heightSelector.label = "Height:";
  document.body.appendChild(heightSelector);

  const widthSelector = document.createElement('value-selector');
  widthSelector.addEventListener('onSelectValue', (e) => setGridWidth(e.detail));
  widthSelector.initialValue = INITIAL_GRID_WIDTH;
  widthSelector.label = "Width:";
  document.body.appendChild(widthSelector);

  const grid = document.createElement('game-grid');
  grid.width = INITIAL_GRID_WIDTH;
  grid.height = INITIAL_GRID_HEIGHT;
  document.body.appendChild(grid);

  const setGridHeight = (height) => {
    grid.height = height;
  };

  const setGridWidth = (width) => {
    grid.width = width;
  }
};

