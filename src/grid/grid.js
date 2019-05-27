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
    }
  </style>
  <div class="wrapper"></div>
`;

export default class GameGrid extends HTMLElement {
  constructor() {
    super();
    // Shadow root element
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const width = this.getAttribute('width');
    const height = this.getAttribute('height');

    const $wrapper = this._shadowRoot.querySelector('.wrapper');

    const hostStyle = this.style.setProperty('--grid-width', height);

    for (let i = 1; i <= width * height; i++) {
      const elem = document.createElement('div');
      elem.innerHTML = i;
      elem.setAttribute('class', 'elem');
      $wrapper.appendChild(elem);
    }
  }
}
