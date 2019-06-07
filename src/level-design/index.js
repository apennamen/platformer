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
  levelDesigner.screens = [];

  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  for (let i = 0; i < 3; i++) {
    levelDesigner.screens.push(document.createElement('game-grid'));
  }

  const setGridHeight = ({ detail }) => {
    levelDesigner.screens.forEach((screen) => { screen.height = detail; });
  };

  const setGridWidth = ({ detail }) => {
    levelDesigner.screens.forEach((screen) => { screen.width = detail; });
  };

  const heightSelector = document.createElement('value-selector');
  heightSelector.addEventListener('onSelectValue', setGridHeight);
  heightSelector.initialValue = 7;
  heightSelector.label = 'Height:';
  levelDesigner.screens.forEach((screen) => { screen.height = heightSelector.value; });

  const widthSelector = document.createElement('value-selector');
  widthSelector.addEventListener('onSelectValue', setGridWidth);
  widthSelector.initialValue = 15;
  widthSelector.label = 'Width:';
  levelDesigner.screens.forEach((screen) => { screen.width = widthSelector.value; });

  const gridToggle = document.createElement('input');
  gridToggle.type = 'checkbox';
  gridToggle.id = 'gridCheckbox';
  gridToggle.checked = true;
  levelDesigner.screens.forEach(screen => screen.show(gridToggle.checked));
  gridToggle.addEventListener('change', function toggleGrid() {
    levelDesigner.screens.forEach(screen => screen.show(this.checked));
  });

  const label = document.createElement('label');
  label.setAttribute('for', gridToggle.id);
  label.innerHTML = 'Show grid';

  const gallery = document.createElement('sprite-gallery');

  const saveButton = document.createElement('button');
  saveButton.innerHTML = 'Save';
  saveButton.type = 'button';
  saveButton.addEventListener('click', () => {
    levelDesigner.screens.forEach((screen, index) => screen.save(index));
  });

  const loadButton = document.createElement('button');
  loadButton.innerHTML = 'Load';
  loadButton.type = 'button';
  loadButton.addEventListener('click', () => {
    levelDesigner.screens.forEach((screen, index) => screen.load(index));
  });

  const clearButton = document.createElement('button');
  clearButton.innerHTML = 'Clear';
  clearButton.type = 'button';
  clearButton.addEventListener('click', () => {
    const confirm = window.confirm('This cannot be undone !');
    if (confirm) {
      localStorage.clear();
    }
  });

  levelDesigner.screens.forEach((screen) => {
    levelDesigner.content.querySelector('.levelDesigner').appendChild(screen);
  });
  document.body.appendChild(heightSelector);
  document.body.appendChild(widthSelector);
  document.body.appendChild(gridToggle);
  document.body.appendChild(label);
  document.body.appendChild(saveButton);
  document.body.appendChild(loadButton);
  document.body.appendChild(clearButton);
  document.body.appendChild(gallery);
  document.body.appendChild(levelDesigner.content);
};
