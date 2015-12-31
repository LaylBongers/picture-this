'use strict';

// Static resources
require('./index.html');
require('./semantic_custom.scss');
require('./logo.png');
require('file?name=semantic.js!../semantic/dist/semantic.js');

// Bootstrap the site
var React = require('react');
var ReactDOM = require('react-dom');
var CountersApp = require('./CountersApp');

ReactDOM.render(
    <CountersApp />,
    document.getElementById('app')
);
