import {GameStartPanel} from './GameStartPanel.jsx';
import {LoadingPanel} from './LoadingPanel.jsx';

var React = require('react');

export class DrawlessApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {panelNum: 0};
    }

    onJoinGameRequest = (event) => {
        this.state.panelNum = 1;
        this.setState(this.state);
    }

    render = () => {
        var panels = [
            <GameStartPanel key="0" onJoinGameRequest={this.onJoinGameRequest} />,
            <LoadingPanel key="1" />
        ];

        return (
            <div className="dl-app">
                <header>
                    <h1>Drawless</h1>
                    <h2>Yet another way to make your friends hate you!</h2>
                </header>
                <main className="panels-container">
                    {panels[this.state.panelNum]}
                </main>
                <footer>
                    <p>Copyright &copy; 2015 Layl</p>
                    <p>Available under MIT License on GitHub.</p>
                </footer>
            </div>
        );
    }
}
