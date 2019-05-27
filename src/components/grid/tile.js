export default class GameTile extends HTMLElement {
  connectedCallback() {
    this.addEventListener('dragover', allowDrop, false);
    this.addEventListener('drop', handleDrop, false);
    this.addEventListener('click', handleClick, false);
  }
}

const handleDrop = (e) => {
  const imgUrl = e.dataTransfer.getData("text/plain");
  e.target.style.setProperty('background-image', `url(${imgUrl})`);
  e.preventDefault();
  e.stopPropagation();
};

const allowDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const handleClick = (e) => {
  e.preventDefault();
  e.target.style.removeProperty('background-image');
};
