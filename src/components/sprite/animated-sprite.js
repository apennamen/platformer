/* The "play" keyframe rule will be updated in JS depending on the size of the sprite  */
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :root {
      --sprite-width: 0px;
      --sprite-height: 0px;
      --steps-number: 0;
      --total-img-width: 802px;
      --animation-rate: 0.5s;
    }
    
    @keyframes play {
      100% { background-position: -0px; }
    }
    
    #animated-sprite {
      width: var(--sprite-width);
      height: var(--sprite-height);
      animation: play var(--animation-rate) steps(var(--steps-number)) infinite;
    }
    
  </style>
  <div draggable="true" id="animated-sprite"></div>
`;

export default class AnimatedSprite extends HTMLElement {
  static get observedAttributes() {
    return [
      'total-img-width',
      'sprite-width',
      'sprite-height',
      'img-url',
      'animation-rate',
      'steps-number'
    ];
  }
  constructor() {
    super();
    // Shadow root element
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$animatedSprite = this._shadowRoot.querySelector('#animated-sprite');
  }

  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case 'img-url':
        this.$animatedSprite.style.setProperty('background', `url(${newValue}) left center`, "");
        break;
      case 'total-img-width':
        const cssRules = this._shadowRoot.styleSheets[0].cssRules;
        updatePlayKeyframeRule(cssRules, newValue);
        break;
      default:
        this.style.setProperty(`--${name}`, newValue, "");
    }
  }
}

function updatePlayKeyframeRule(cssRules, imgWidth) {
  // We need to find the keyframe rule to modify, it's name is defined in CSS as 'play'
  for(let rule of cssRules) {
    if(rule.name && rule.name === 'play') {
      // We update the CSSStyleSheetDeclaration to allow correct animation
      rule.cssRules[0].style.setProperty('background-position', `-${imgWidth}`, "");
      break;
    }
  }
}
