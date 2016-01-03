var React = require('react');

export class LoadingPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: []};
    }

    componentDidMount = () => {
        var socket = new WebSocket("ws://127.0.0.1:5468", "drawless-websockets");
		socket.onmessage = (event) => {
            console.log("Data!");
			this.state.messages.push(event.data);
            this.setState(this.state);
		};

		/*function send(element) {
			socket.send(value);
		}*/
    }

    render = () => {
        var chat_rows = [];
        for (var i = 0; i < this.state.messages.length; i++) {
            chat_rows.push(<li>{this.state.messages[i]}</li>);
        }

        return (
            <section className="content-panel">
                <p>Connecting to Game... Meanwhile enjoy this chat app.</p>
                <ul>
                    {chat_rows}
                </ul>
            </section>
        );
    }
}
