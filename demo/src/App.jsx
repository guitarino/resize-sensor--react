import React from 'react';
import ReactDOM from 'react-dom';
import ResizeSensor from '../../build/resize-sensor';

import './App.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      example1: {width: 0, height: 0, refresh: Math.random()},
      example2_shown: false,
      example2: {width: 0, height: 0, refresh: Math.random()}
    };
  }
  render() {
    return (
      <div className='App'>

        <div className='App__example-1 App__example'>
          <ResizeSensor
            onResize={(width, height) => {
              this.setState({
                example1: {width: width, height: height, refresh: Math.random()},
                example2_shown: this.state.example2_shown,
                example2: this.state.example2
              })
            }}
          />
          <div className='App_container'>
            <p>Width: {this.state.example1.width}px</p>
            <p>Height: {this.state.example1.height}px</p>
            <p>Random: {this.state.example1.refresh}</p>
          </div>
        </div>

        <button onClick={() => {
          let shown = this.state.example2_shown;
          this.setState({
            example1: this.state.example1,
            example2_shown: !shown,
            example2: this.state.example2
          });
        }}>Toggle another example</button>

        { this.state.example2_shown ?
          <div className='App__example-2 App__example'>
            <ResizeSensor
              onResize={(width, height) => {
                this.setState({
                  example1: this.state.example1,
                  example2_shown: this.state.example2_shown,
                  example2: {width: width, height: height, refresh: Math.random()}
                })
              }}
            />
            <div className='App_container'>
              <p>Width: {this.state.example2.width}px</p>
              <p>Height: {this.state.example2.height}px</p>
              <p>Random: {this.state.example2.refresh}</p>
            </div>
          </div> : null }

      </div>
    );
  }
};

export function renderApp(where) {
  ReactDOM.render(
    <App />,
    where
  );
}