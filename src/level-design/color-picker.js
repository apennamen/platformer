const template = document.createElement('template');
template.innerHTML = `
  <style>
      :host {
          display: block;
          --red: 255;
          --green: 255;
          --blue: 255;
      }
      
      .color-result {
        background-color: rgb(var(--red), var(--green), var(--blue));
        width: 48px;
        height: 48px;
        border: 1px solid black;
      }
  </style>
  <value-selector min-range-value="0" max-range-value="255" initial-value="255" id="red"></value-selector>
  <value-selector min-range-value="0" max-range-value="255" initial-value="255" id="green"></value-selector>
  <value-selector min-range-value="0" max-range-value="255" initial-value="255" id="blue"></value-selector>
  <div class="color-result"></div>
`;

export default class ColorPicker extends HTMLElement {
  constructor() {
    super();
    // Shadow root element
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));
    this.$red = this.shadow.querySelector('#red');
    this.$green = this.shadow.querySelector('#green');
    this.$blue = this.shadow.querySelector('#blue');
  }

  connectedCallback() {
    this.$red.addEventListener('onSelectValue', ({ detail }) => this.changeRedColor(detail));
    this.$green.addEventListener('onSelectValue', ({ detail }) => this.changeGreenColor(detail));
    this.$blue.addEventListener('onSelectValue', ({ detail }) => this.changeBlueColor(detail));
  }

  changeRedColor(red) {
    this.style.setProperty('--red', red);
    this.updateColor(red,
      getComputedStyle(this).getPropertyValue('--green'),
      getComputedStyle(this).getPropertyValue('--blue'));
  }

  changeGreenColor(green) {
    this.style.setProperty('--green', green);
    this.updateColor(getComputedStyle(this).getPropertyValue('--red'),
      green,
      getComputedStyle(this).getPropertyValue('--blue'));
  }

  changeBlueColor(blue) {
    this.style.setProperty('--blue', blue);
    this.updateColor(getComputedStyle(this).getPropertyValue('--red'),
      getComputedStyle(this).getPropertyValue('--green'),
      blue);
  }

  updateColor(red, green, blue) {
    this.dispatchEvent(new CustomEvent('onColorChange', { detail: `rgb(${red}, ${green}, ${blue})` }));
  }
}
