var React = require('react');

class CountersApp extends React.Component {
    render = () => {
        return (
            <header >
                <h1>Hello React</h1>
                <h2 className="subheader">Such a Simple Blog Layout</h2>
            </header>
        );
    }
}

module.exports = CountersApp;
