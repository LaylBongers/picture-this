extern crate websocket;

use std::thread;
use websocket::{Server, Message, Sender, Receiver};
use websocket::message::Type;
use websocket::header::WebSocketProtocol;

fn main() {
	let server = Server::bind("127.0.0.1:5468").unwrap();

	for connection in server {
		// Spawn a new thread for each connection.
		thread::spawn(move || {
            // Get data from the request so we can use it
			let request = connection.unwrap().read_request().unwrap();
			let headers = request.headers.clone();

            // Validate the request, crash the thread if it's not correct
			request.validate().unwrap();
			let mut response = request.accept();

            // Handshake the protocol (or ignore it if there is none set? I'm not quite sure honestly)
			if let Some(&WebSocketProtocol(ref protocols)) = headers.get() {
                let protocol = "drawless-websockets".to_string();
				if protocols.contains(&protocol) {
					response.headers.set(WebSocketProtocol(vec!(protocol)));
				}
			}

            // Send the response, completing the websockets handshake
			let mut client = response.send().unwrap();

            // Log the connection
			let ip = client.get_mut_sender().get_mut().peer_addr().unwrap();
			println!("Connection from {}", ip);

            // Send a test message
			let message: Message = Message::text(format!("Hello, {}!", ip));
			client.send_message(&message).unwrap();

            // Split our client into sender and receiver so we can work with it
			let (mut sender, mut receiver) = client.split();

            // Start listening for messages from the client
			for message in receiver.incoming_messages() {
				let message: Message = message.unwrap();

				match message.opcode {
					Type::Close => {
						let message = Message::close();
						sender.send_message(&message).unwrap();
						println!("Client {} disconnected", ip);
						return;
					},
					Type::Ping => {
						let message = Message::pong(message.payload);
						sender.send_message(&message).unwrap();
					}
					_ => sender.send_message(&message).unwrap(),
				}
			}
		});
	}
}
