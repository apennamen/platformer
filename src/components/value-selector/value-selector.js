const template = document.createElement('template');
template.innerHTML = `
  <label for"selector"></label>
  <input type="range" id="selectorInput" name="selector" min="1" max="30" class="slider" />
  <output id="selectorDisplayValue" />
`;

export default class ValueSelector extends HTMLElement {
  set initialValue(val) {
    this.$input.setAttribute('value', val);
    this.$display.innerHTML = val;
  }

  set label(val) {
    this.$label.innerHTML = val;
  }

  set minRangeValue(val) {
    this.$input.setAttribute('min', val);
  }

  set maxRangeValue(val) {
    this.$input.setAttribute('max', val);
  }

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$input = this._shadowRoot.querySelector('#selectorInput');
    this.$display = this._shadowRoot.querySelector('#selectorDisplayValue');
    this.$label = this._shadowRoot.querySelector('label');

    this.$input.addEventListener('input', (e) => {
      this.dispatchEvent(new CustomEvent('onSelectValue', { detail: this.$input.value }));
      this.$display.innerHTML = this.$input.value;
    });
  }
}
