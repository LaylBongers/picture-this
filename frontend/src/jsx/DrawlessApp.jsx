import {GameStartPanel} from './GameStartPanel.jsx';

var React = require('react');

export class DrawlessApp extends React.Component {
    render = () => {
        return (
            <div className="dl-app">
                <header>
                    <h1>Drawless</h1>
                    <h2>Yet another way to make your friends hate you!</h2>
                </header>
                <GameStartPanel />
                <footer>
                    <p>Copyright &copy; 2015 Layl</p>
                    <p>Available under MIT License on GitHub.</p>
                </footer>
            </div>
        );
    }
}
