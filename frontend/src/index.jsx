'use strict';

// Static resources
require('./index.html');
require('./semantic_custom.scss');
require('file?name=semantic.js!../semantic/dist/semantic.js');

// Bootstrap the site
var React = require('react');
var ReactDOM = require('react-dom');
var DrawlessApp = require('./DrawlessApp');

ReactDOM.render(
    <DrawlessApp />,
    document.getElementById('app')
);
