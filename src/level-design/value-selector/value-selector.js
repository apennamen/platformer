const template = document.createElement('template');
template.innerHTML = `
  <label for"selector"></label>
  <input type="range" id="selectorInput" name="selector" min="1" max="30" class="slider" />
  <output id="selectorDisplayValue" />
`;

export default class ValueSelector extends HTMLElement {
  static get observedAttributes() {
    return [
      'initial-value',
      'label',
      'min-range-value',
      'max-range-value',
    ];
  }

  set initialValue(val) {
    this.setAttribute('initial-value', val);
  }

  get value() {
    return this.$input.value;
  }

  set label(val) {
    this.setAttribute('label', val);
  }

  set minRangeValue(val) {
    this.setAttribute('min-range-value', val);
  }

  set maxRangeValue(val) {
    this.setAttribute('max-range-value', val);
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));
    this.$input = this.shadow.querySelector('#selectorInput');
    this.$display = this.shadow.querySelector('#selectorDisplayValue');
    this.$label = this.shadow.querySelector('label');
  }

  connectedCallback() {
    this.$input.addEventListener('input', () => this.dispatchInputValue());
  }

  discconnectedCallback() {
    this.$input.removeEventListener('input', () => this.dispatchInputValue());
  }

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case 'initial-value':
        this.$input.setAttribute('value', newValue);
        this.$display.innerHTML = newValue;
        break;
      case 'label':
        this.$label.innerHTML = newValue;
        break;
      case 'min-range-value':
        this.$input.setAttribute('min', newValue);
        break;
      case 'max-range-value':
        this.$input.setAttribute('max', newValue);
        break;
      default:
        break;
    }
  }

  dispatchInputValue() {
    this.dispatchEvent(new CustomEvent('onSelectValue', { detail: this.$input.value }));
    this.$display.innerHTML = this.$input.value;
  }
}
