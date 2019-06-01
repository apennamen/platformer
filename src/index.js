import SpriteGallery from 'containers/sprite-gallery';
import GameGrid from 'components/grid/grid';
import ValueSelector from 'components/value-selector/value-selector';

window.customElements.define('sprite-gallery', SpriteGallery);
window.customElements.define('game-grid', GameGrid);
window.customElements.define('value-selector', ValueSelector);

window.onload = () => {
  const grid = document.createElement('game-grid');
  grid.width = 15;
  grid.height = 7;

  const setGridHeight = ({ detail }) => {
    grid.height = detail;
  };

  const setGridWidth = ({ detail }) => {
    grid.width = detail;
  };

  const heightSelector = document.createElement('value-selector');
  heightSelector.addEventListener('onSelectValue', setGridHeight);
  heightSelector.initialValue = grid.height;
  heightSelector.label = 'Height:';

  const widthSelector = document.createElement('value-selector');
  widthSelector.addEventListener('onSelectValue', setGridWidth);
  widthSelector.initialValue = grid.width;
  widthSelector.label = 'Width:';

  const gallery = document.createElement('sprite-gallery');

  document.body.appendChild(heightSelector);
  document.body.appendChild(widthSelector);
  document.body.appendChild(gallery);
  document.body.appendChild(grid);
};
