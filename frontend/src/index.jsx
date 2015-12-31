'use strict';

// Static resources
require('./index.html');
require('./index.scss');

// Bootstrap the site
var React = require('react');
var ReactDOM = require('react-dom');
var CountersApp = require('./CountersApp');

ReactDOM.render(
    <CountersApp />,
    document.getElementById('content')
);
