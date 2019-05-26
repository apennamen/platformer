export default class GameGrid extends HTMLElement {
  constructor() {
    super();
    // Shadow root element
    this.shadow = this.attachShadow({mode: 'open'});

    // Wrapper of the grid
    this.wrapper = document.createElement('div');
    this.wrapper.setAttribute('class', 'wrapper');

    const elem1 = document.createElement('div');
    elem1.innerHTML = 'Elem 1';
    elem1.setAttribute('class', 'elem');
    this.wrapper.appendChild(elem1);
    const elem2 = document.createElement('div');
    elem2.setAttribute('class', 'elem');
    elem2.innerHTML = 'Elem 2';
    this.wrapper.appendChild(elem2);
    const elem3 = document.createElement('div');
    elem3.innerHTML = 'Elem 3';
    elem3.setAttribute('class', 'elem');
    this.wrapper.appendChild(elem3);

    const style = document.createElement('style');
    style.textContent =`
      .wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        grid-auto-rows: minmax(100px, auto);
      }
      
      .elem {
        border: 1px solid red;
      }
    `;

    this.shadow.appendChild(style);
    this.shadow.appendChild(this.wrapper);
  }

  connectedCallback() {
    const width = this.getAttribute('width');
    const height = this.getAttribute('height');

    console.log(`Width; ${width}`);
    console.log(`Height; ${height}`);
  }
}
