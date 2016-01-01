var React = require('react');

class DrawlessApp extends React.Component {
    render = () => {
        return (
            <div className="dl-app">
                <header>
                    <h1 className="tutsFadeAnim">Drawless</h1>
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

module.exports = DrawlessApp;
