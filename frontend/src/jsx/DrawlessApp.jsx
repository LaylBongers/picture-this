var React = require('react');

class DrawlessApp extends React.Component {
    render = () => {
        return (
            <div className="dl-app">
                <header>
                    <h1>Drawless</h1>
                    <h2>Yet another way to make your friends hate you!</h2>
                </header>
            </div>
        );
    }
}

module.exports = DrawlessApp;
