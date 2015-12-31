var React = require('react');

class CountersApp extends React.Component {
    render = () => {
        return (
            <div>
                <header>
                    <h1><img src="logo.png"/></h1>
                    <h2>Yet another way to make your friends hate you!</h2>
                </header>
                <div className="row">
                    <div className="medium-6 small-12 column">Left</div>
                    <div className="medium-6 small-12 column">Right</div>
                </div>
            </div>
        );
    }
}

module.exports = CountersApp;
