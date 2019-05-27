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

  attributeChangedCallback(name, _, newValue) {
    const $wrapper = this._shadowRoot.querySelector('.wrapper');
    $wrapper.innerHTML = null;

    switch(name) {
      case 'width':
        const height = this.getAttribute('height');
        for (let i = 1; i <= newValue * height; i++) {
          const elem = document.createElement('div');
          elem.innerHTML = i;
          elem.setAttribute('class', 'elem');
          $wrapper.appendChild(elem);
        }
        // Update width
        this.style.setProperty('--grid-width', newValue, "");
        break;

      case 'height':
        const width = this.getAttribute('width');
        for (let i = 1; i <= width * newValue; i++) {
          const elem = document.createElement('div');
          elem.innerHTML = i;
          elem.setAttribute('class', 'elem');
          $wrapper.appendChild(elem);
        }
        // Update width
        this.style.setProperty('--grid-width', width, "");
        break;
    }
  }
}
