'use strict';

// Static resources
require('./index.html');

// Bootstrap the site
var React = require('react');
var ReactDOM = require('react-dom');
var Hello = require('./Hello');

ReactDOM.render(
    <Hello />,
    document.getElementById('content')
);
