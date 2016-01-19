import {GameStartPanel} from './GameStartPanel.jsx';
import {NameAvatarInputPanel} from './NameAvatarInputPanel.jsx';
import {LoadingPanel} from './LoadingPanel.jsx';

var React = require('react');

export class PictureThisApp extends React.Component {
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
    };

    connect = (handshake_evt, handshake_data) => {
        // Switch to the loading panel
        this.displayLoading('Connecting to server...');

        // Connect to the server and set up our network responses
        this.socket = new WebSocket("ws://127.0.0.1:5468", "picturethis-websockets");

        this.socket.onopen = (event) => {
            // The first message should be ours, to tell the server what we want
            this.sendNetworkMessage(handshake_evt, handshake_data);
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
    };

    sendNetworkMessage = (event, data) => {
        var message = {
            event: event,
            data: JSON.stringify(data)
        };
        var json = JSON.stringify(message);
        this.socket.send(json);
    };

    onJoinGameRequest = (event) => {
        this.connect("JoinGame", {key: event.key});
    };

    onCreateGameRequest = (event) => {
        this.connect("CreateGame", {});
    };

    onJoinGame = (event) => {
        alert("handshake!");

        // Switch to the name & avatar input panel
        this.state.panelNum = 2;
        this.setState(this.state);
    };

    render = () => {
        // Create the correct panel to be inserted into the page
        var panel;
        if (this.state.panelNum == 0) {
            panel = <GameStartPanel
                key="0"
                onJoinGameRequest={this.onJoinGameRequest}
                onCreateGameRequest={this.onCreateGameRequest} />;
        }
        else if (this.state.panelNum == 1) {
            panel = <LoadingPanel key="1" text={this.state.loadingText} />;
        }
        else if (this.state.panelNum == 2) {
            panel = <NameAvatarInputPanel key="2" />;
        }
        else {
            throw "panelNum does not correspond to a panel";
        }

        // Build up the full page
        return (
            <div className="dl-app">
                <header>
                    <h1>Picture This</h1>
                    <h2>Yet another way to make your friends hate you!</h2>
                </header>
                <main className="panels-container">
                    {panel}
                </main>
                <footer>
                    <p>Copyright &copy; 2016 Carbide Games</p>
                    <p><a href="https://github.com/LaylConway/picture-this">Source Code on GitHub</a></p>
                </footer>
            </div>
        );
    };
}
