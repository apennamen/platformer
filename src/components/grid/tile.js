export default class GameTile extends HTMLElement {
  connectedCallback() {
    this.addEventListener('dragover', this._allowDrop, false);
    this.addEventListener('drop', this._handleDrop, false);
    this.addEventListener('click', this._handleClick, false);
  }

  _handleDrop(e) {
    this.innerHTML =  e.dataTransfer.getData("text/html");
    e.preventDefault();
    e.stopPropagation();
  };

  _allowDrop(e) {
    e.preventDefault();
    e.stopPropagation();
  };

  _handleClick(e) {
    e.preventDefault();
    this.innerHTML = null;
  };
}

