import {GameStartPanel} from './GameStartPanel.jsx';
import {LoadingPanel} from './LoadingPanel.jsx';

var React = require('react');

export class DrawlessApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            panelNum: 0,
            socket: null
        };
    }

    displayLoading = (text) => {
        this.state.panelNum = 1;
        this.state.loadingText = text;
    }

    sendNetworkMessage = (event, data) => {
        var message = {
            event: event,
            data: JSON.stringify(data)
        };
        var json = JSON.stringify(message);
        this.socket.send(json);
    }

    onJoinGameRequest = (event) => {
        // Switch to the loading panel
        this.displayLoading('Connecting to server...');

        // Connect to the server and set up our network responses
        this.socket = new WebSocket("ws://127.0.0.1:5468", "picturethis-websockets");

        this.socket.onopen = (event) => {
            // The first message should be ours, to tell the server what we want
            // TODO: Actually make this a join game instead of a create game
            this.sendNetworkMessage("CreateGame", {});
        }

		this.socket.onmessage = (event) => {
			// Get the data we need from the network message
            var parsed_data = JSON.parse(event.data);
            var inner_event = parsed_data.event;
            var inner_data = JSON.parse(parsed_data.data);

            // Find what event we need to trigger and trigger it
            switch (inner_event) {
                case "JoinGame":
                    this.onJoinGame(inner_data);
                    break;
                default:
                    alert('Unknown network event received from server!');
            }
		};

        // Finally apply the state changes
        this.setState(this.state);
    }

    onJoinGame = (event) => {
        alert('Handshake!');
    }

    render = () => {
        var panels = [
            <GameStartPanel key="0" onJoinGameRequest={this.onJoinGameRequest} />,
            <LoadingPanel key="1" text={this.state.loadingText} />
        ];

        return (
            <div className="dl-app">
                <header>
                    <h1>Picture This</h1>
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
