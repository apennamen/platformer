import SpriteGallery from 'level-design/sprite-gallery';
import GameGrid from 'level-design/grid/grid';
import ValueSelector from 'level-design/value-selector/value-selector';

window.customElements.define('sprite-gallery', SpriteGallery);
window.customElements.define('game-grid', GameGrid);
window.customElements.define('value-selector', ValueSelector);

window.onload = () => {
  const levelDesigner = document.createElement('template');
  levelDesigner.innerHTML = `
    <div class="levelDesigner" style="display: flex; overflow: auto;"></div>
  `;

  const level1 = document.createElement('game-grid');
  const level2 = document.createElement('game-grid');

  const setGridHeight = ({ detail }) => {
    level1.height = detail;
    level2.height = detail;
  };

  const setGridWidth = ({ detail }) => {
    level1.width = detail;
    level2.width = detail;
  };

  const heightSelector = document.createElement('value-selector');
  heightSelector.addEventListener('onSelectValue', setGridHeight);
  heightSelector.initialValue = 7;
  heightSelector.label = 'Height:';
  level1.height = heightSelector.value;
  level2.height = heightSelector.value;

  const widthSelector = document.createElement('value-selector');
  widthSelector.addEventListener('onSelectValue', setGridWidth);
  widthSelector.initialValue = 15;
  widthSelector.label = 'Width:';
  level1.width = widthSelector.value;
  level2.width = widthSelector.value;

  const gridToggle = document.createElement('input');
  gridToggle.type = 'checkbox';
  gridToggle.id = 'gridCheckbox';
  gridToggle.checked = true;
  level1.show(gridToggle.checked);
  level2.show(gridToggle.checked);
  gridToggle.addEventListener('change', function toggleGrid() {
    level1.show(this.checked);
    level2.show(this.checked);
  });

  const label = document.createElement('label');
  label.setAttribute('for', gridToggle.id);
  label.innerHTML = 'Show grid';

  const gallery = document.createElement('sprite-gallery');

  levelDesigner.content.querySelector('.levelDesigner').appendChild(level1);
  levelDesigner.content.querySelector('.levelDesigner').appendChild(level2);
  document.body.appendChild(heightSelector);
  document.body.appendChild(widthSelector);
  document.body.appendChild(gridToggle);
  document.body.appendChild(label);
  document.body.appendChild(gallery);
  document.body.appendChild(levelDesigner.content);
};
