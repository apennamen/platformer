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

/**
 * Draggable sprite, basically an image that put its html into the drag event
 *
 * @param {string] sprite - url of the sprite
 *
 * import DraggableSprite from 'path/to/draggable-sprite';
 * window.customElements.define('draggable-sprite', DraggableSprite);
 *
 * <draggable-sprite sprite="url/to/sprite"></draggable-sprite>
 *
 *
 * On the element that receives the draggable sprite, use:
 * this.innerHtml = e.dataTransfer.getData("text/html");
 */
export default class DraggableSprite extends HTMLElement {
  static get observedAttributes() {
    return ['sprite'];
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$img = this._shadowRoot.querySelector('img');
  }

  connectedCallback() {
    this.addEventListener('dragstart', this._attachHtmlToDragStartEvent);
    this._upgradeProperty('sprite');
  }

  disconnectedCallback() {
    this.removeEventListener('dragstart', this._attachHtmlToDragStartEvent);
  }

  set sprite(url) {
    // Reflects property to attribute
    this.setAttribute('sprite', url);
  }

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case 'sprite':
        this.$img.setAttribute('src', newValue);
        break;
    }
  }

  _attachHtmlToDragStartEvent(e) {
    e.dataTransfer.setData("text/html", this._shadowRoot.innerHTML);
  };

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
}
