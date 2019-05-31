const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
    }
    :host([hidden]) {
      display: none;
    }
    .draggable-sprite:hover {
        cursor:pointer;
    }
  </style>
  <img class="draggable-sprite" draggable="true" />  
`;

export default class DraggableSprite extends HTMLElement {
  static get observedAttributes() {
    return ['sprite'];
  }

  constructor() {
    super();
    // Shadow root element
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$img = this._shadowRoot.querySelector('img');
  }

  connectedCallback() {
    this._upgradeProperty('sprite');
  }

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case 'sprite':
        // Handles side effect
        this.$img.setAttribute('src', newValue);
        this.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData("text/html", this._shadowRoot.innerHTML);
        });
        break;
    }
  }

  disconnectedCallback() {
    this.removeEventListener('dragstart');
  }

  set sprite(url) {
    // Reflects property to attribute
    this.setAttribute('sprite', url);
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
}
