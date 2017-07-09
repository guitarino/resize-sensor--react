import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ResizeSensor from '../src/resize-sensor';

const html = ReactDOMServer.renderToString(
  <ResizeSensor />
);

console.log(
  `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Resize Sensor Test</title>
  </head>
  <body>
    <div id="root-content">${html}</div>
  </body>
  </html>`
);