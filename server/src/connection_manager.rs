use std::borrow::Borrow;
use std::str;
use std::net::SocketAddr;
use rustc_serialize::json;
use websocket::{Server, Message, Receiver};
use websocket::message::Type;
use websocket::header::WebSocketProtocol;
use websocket::server::Connection;
use websocket::stream::WebSocketStream;
use thread_scoped;
use thread_scoped::{JoinGuard};

#[derive(RustcDecodable, RustcEncodable)]
pub struct NetworkMessage {
    pub event: String,
    pub data: String
}

pub struct ConnectionManager;

impl ConnectionManager {
    pub fn new() -> Self {
        ConnectionManager
    }

    /// Runs the connection listen loop. `binder` should be used to pass the connection handle to
    /// other systems that need to use it. Do not block on `binder`, as the thread it runs on will
    /// be used to listen for network messages.
    pub fn start<F>(&self, binder: F) where
        F: Fn(NetworkMessage, SocketAddr) + Sync
    {
        // Start listening for connections
    	let server = Server::bind("127.0.0.1:5468").unwrap();

        // We need to keep track of threads' join guards, if they drop inside the loop we'll never
        // have more than one connection
        let mut threads: Vec<JoinGuard<()>> = Vec::new();

    	for connection in server {
            // Get some local copies for the thread to use
            let local_binder = &binder;
            let local_connection = connection.unwrap();

    		// Spawn a new thread for each connection, unfortunately this is required by rust-websocket
            // TODO: Handle errors more gracefully
    		let thread = unsafe {
                thread_scoped::scoped(move || Self::handle_connection(local_connection, local_binder))
            };

            // TODO: This is never cleaned up yet, `handle_connection` should clean itself up and
            // this thread should wait for all threads before returning if in the process of stopping.
            threads.push(thread);
    	}
    }

    pub fn handle_connection<F>(connection: Connection<WebSocketStream, WebSocketStream>, binder: &F) where
        F: Fn(NetworkMessage, SocketAddr)
    {
        // Get some data on the client that is requesting to talk to us
        let request = connection.read_request().unwrap();
        let headers = request.headers.clone();

        // Validate the request, crash the thread if it's not correct
        request.validate().unwrap();
        let mut response = request.accept();

        // Handshake the protocol
        // TODO: or ignore it if there is none set? I'm not quite sure honestly
        if let Some(&WebSocketProtocol(ref protocols)) = headers.get() {
            let protocol = "picturethis-websockets".to_string();
            if protocols.contains(&protocol) {
                response.headers.set(WebSocketProtocol(vec!(protocol)));
            }
        }

        // Complete the websockets handshake
        let mut client = response.send().unwrap();

        // Log the connection
        let ip = client.get_mut_sender().get_mut().peer_addr().unwrap();
        info!("Incoming connection from {}", ip);

        // Split our client into sender and receiver so we can work with it
        let (mut _sender, mut receiver) = client.split();

        // Receive the first message from the client so we know what it wants
        let message: Message = receiver.recv_message().unwrap();
        if message.opcode != Type::Text {
            panic!("Unexpected message opcode in handshake!");
        }

        // Actually receive the text data and parse it
        let json = str::from_utf8(message.payload.borrow()).unwrap();
        let msg: NetworkMessage = json::decode(&json).unwrap();

        // Run the binder so the the values can be used
        binder(msg, ip);
    }
}
