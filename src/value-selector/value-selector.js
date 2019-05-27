const template = document.createElement('template');
template.innerHTML = `
  <input type="range" min="1" max="30" class="slider" />
`;

export default class ValueSelector extends HTMLElement {
  set initialValue(val) {
    this._shadowRoot.querySelector('input').setAttribute('value', val);
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$input = this._shadowRoot.querySelector('input');

    this.$input.addEventListener('input', (e) => {
      this.dispatchEvent(new CustomEvent('onSelectValue', { detail: this.$input.value }));
    });
  }
}
