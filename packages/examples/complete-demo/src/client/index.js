import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.react';

export const render = (element, props = {}) => {
  ReactDOM.render(<App {...props}/>, element);
}
