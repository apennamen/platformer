const template = document.createElement('template');
template.innerHTML = `
  <img draggable="true" />  
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

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case 'sprite':
        this.sprite = newValue;
        break;
    }
  }

  set sprite(url) {
    this.$img.setAttribute('src', url);

    this.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData("text/plain", url);
    });
  }
}
