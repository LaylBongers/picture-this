use std::thread;
use std::borrow::Borrow;
use std::str;
use websocket::{Server, Message, Sender, Receiver};
use websocket::message::Type;
use websocket::header::WebSocketProtocol;

pub struct ConnectionManager;

impl ConnectionManager {
    pub fn new() -> Self {
        ConnectionManager
    }

    /// Runs the connection listen loop. `binder` should be used to pass the connection handle to
    /// other systems that need to use it. Do not block on `binder`, as the thread it runs on will
    /// be used to listen for network messages.
    pub fn start<F>(&self, binder: F) where
        F: Fn(bool/*websocket::sender::Sender*/, bool/*websocket::receiver::Receiver*/)
    {
        // Start listening for connections
    	let server = Server::bind("127.0.0.1:5468").unwrap();

    	for connection in server {
    		// Spawn a new thread for each connection
            // Unfortunately, this is how the websocket library works
    		thread::spawn(move || {
                // Get some data on the client that is requesting to talk to us
    			let request = connection.unwrap().read_request().unwrap();
    			let headers = request.headers.clone();

                // Validate the request, crash the thread if it's not correct
    			request.validate().unwrap();
    			let mut response = request.accept();

                // Handshake the protocol
                // TODO: or ignore it if there is none set? I'm not quite sure honestly
    			if let Some(&WebSocketProtocol(ref protocols)) = headers.get() {
                    let protocol = "drawless-websockets".to_string();
    				if protocols.contains(&protocol) {
    					response.headers.set(WebSocketProtocol(vec!(protocol)));
    				}
    			}

                // Complete the websockets handshake
    			let mut client = response.send().unwrap();

                // Log the connection
    			let ip = client.get_mut_sender().get_mut().peer_addr().unwrap();
    			println!("Connection from {}", ip);

                // Split our client into sender and receiver so we can work with it
    			let (mut sender, mut receiver) = client.split();

                // Receive the first message from the client so we know what it wants
                let message: Message = receiver.recv_message().unwrap();
                if message.opcode != Type::Text {
                    panic!("Unexpected message opcode in handshake!");
                }

                // Actually receive the text data and parse it
                let json = str::from_utf8(message.payload.borrow()).unwrap();
                println!("Received {}", json);

                /*// Send a test message
    			let message: Message = Message::text(format!("Hello, {}!", ip));
    			client.send_message(&message).unwrap();

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
    			}*/
    		});
    	}
    }
}
