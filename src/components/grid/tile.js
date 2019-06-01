export default class GameTile extends HTMLElement {
  connectedCallback() {
    this.addEventListener('dragover', this.allowDrop, false);
    this.addEventListener('drop', this.handleDrop, false);
    this.addEventListener('click', this.handleClick, false);
  }

  disconnectedCallback() {
    this.removeEventListener('dragover', this.allowDrop, false);
    this.removeEventListener('drop', this.handleDrop, false);
    this.removeEventListener('click', this.handleClick, false);
  }

  handleDrop(e) {
    this.innerHTML = e.dataTransfer.getData('text/html');
    e.preventDefault();
    e.stopPropagation();
  }

  /* eslint class-methods-use-this: ["error", { "exceptMethods": ["allowDrop"] }] */
  allowDrop(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleClick(e) {
    e.preventDefault();
    this.innerHTML = null;
  }
}
