import React from 'react';
import style from './resize-sensor.css';

var
  styleInitialized = false,
  animStart = [
    'webkitAnimationStart',
    'animationstart',
    'oAnimationStart',
    'MSAnimationStart'
  ],
  insertCSS = function(css) {
    var where = (
      document.head ||
      document.body ||
      document.documentElement
    );
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    where.appendChild(style);
  }
;

export default class ResizeSensor extends React.Component {
  constructor() {
    super();
    // initial values
    this.dimensions = {
      width: 0,
      height: 0
    };
    // binding for requestAnimationFrame callback
    this.onElementResize = this.onElementResize.bind(this);
  }

  render() {
    return (
      <div className='resize-sensor-react' ref={(e) => {this.self = e}}>
        <div className="resize-sensor-react__expand" ref={(e) => {this.expand = e}}>
          <div className="resize-sensor-react__expand-child" ref={(e) => {this.expandChild = e}}></div>
        </div>
        <div className="resize-sensor-react__contract" ref={(e) => {this.contract = e}}>
          <div className="resize-sensor-react__contract-child"></div>
        </div>
      </div>
    );
  }

  // insert style into DOM initially
  componentWillMount() {
    if(!styleInitialized) {
      styleInitialized = true;
      insertCSS(style);
    }
  }

  // never update element, just render initially
  shouldComponentUpdate() {
    return false;
  }
  
  // overriding onResize once props are received
  componentWillReceiveProps(props) {
    this.setOnResize(props);
  }

  componentDidMount() {
    this.setOnResize(this.props);
    this.self.addEventListener('scroll', this, true);
    for(var i=0; i<animStart.length; i++) {
      this.self.addEventListener(animStart[i], this);
    }
    // Initial value reset of all triggers
    this.resetTriggers();
  }

  componentWillUnmount() {
    for(var i=0; i<animStart.length; i++) {
      this.self.removeEventListener(animStart[i], this);
    }
    this.self.removeEventListener('scroll', this, true);
  }

  // do nothing by default
  onResize() { }

  setOnResize(props) {
    if('onResize' in props) {
      this.onResize = props.onResize;
    }
  }

  handleEvent(e) {
    // on scroll
    if(e.type === 'scroll') {
      this.resetTriggers();
      if (this.resizeRAF) {
        window.cancelAnimationFrame(
          this.resizeRAF
        );
      }
      this.resizeRAF = window.requestAnimationFrame(
        this.onElementResize
      );
    }
    // on animation start event
    else {
      if (e.animationName === 'resize-sensor-react-animation') {
        this.resetTriggers();
      }
    }
  }

  onElementResize() {
    var currentDimensions = this.getDimensions();
    if (this.isResized(currentDimensions)) {
      this.dimensions.width = currentDimensions.width;
      this.dimensions.height = currentDimensions.height;
      this.onResize(currentDimensions.width, currentDimensions.height);
    }
  }

  isResized(currentDimensions) {
    return (
      currentDimensions.width !== this.dimensions.width ||
      currentDimensions.height !== this.dimensions.height
    );
  }

  getDimensions() {
    return {
      width: this.self.offsetWidth,
      height: this.self.offsetHeight
    };
  }

  resetTriggers() {
    this.contract.scrollLeft = this.contract.scrollWidth;
    this.contract.scrollTop = this.contract.scrollHeight;
    this.expandChild.style.width = (this.expand.offsetWidth + 1) + 'px';
    this.expandChild.style.height = (this.expand.offsetHeight + 1) + 'px';
    this.expand.scrollLeft = this.expand.scrollWidth;
    this.expand.scrollTop = this.expand.scrollHeight;
  }
}