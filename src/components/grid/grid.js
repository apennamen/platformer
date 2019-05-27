const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
        --grid-width: 10;
    }
    
    .wrapper {
      display: grid;
      grid-template-columns: repeat(var(--grid-width), 1fr);
      grid-gap: 0;
      grid-auto-rows: minmax(50px, auto);
    }
    
    .elem {
      border: 1px dashed grey;
      cursor: pointer;
      text-align: center;
    }
  </style>
  <div class="wrapper"></div>
`;

export default class GameGrid extends HTMLElement {
  static get observedAttributes() {
    return ['height', 'width'];
  }

  constructor() {
    super();
    // Shadow root element
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  set width(val) {
    this._width = val;
    this._computeGrid(this._width, this._height);
  }

  set height(val) {
    this._height = val;
    this._computeGrid(this._width, this._height);
  }

  _computeGrid(width, height) {
    const $wrapper = this._shadowRoot.querySelector('.wrapper');
    $wrapper.innerHTML = null;

    for (let i = 1; i <= width * height; i++) {
      const elem = document.createElement('div');
      elem.innerHTML = i;
      elem.setAttribute('class', 'elem');
      $wrapper.appendChild(elem);
    }
    // Update width
    this.style.setProperty('--grid-width', width, "");
  }
}
