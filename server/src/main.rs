#[macro_use] extern crate log;
extern crate log4rs;
extern crate rustc_serialize;
extern crate websocket;
extern crate thread_scoped;

mod connection_manager;

use connection_manager::ConnectionManager;

fn main() {
    //  Data flow:
    // Client sends data, arrives in thread in ConnectionManager.
    // ConnectionManager parses data and turns it into client events, sending them through a channel.
    // The GameManager owns the receiving channels, kept grouped together with game-specific data.
    // When a tick is run, the GameManager first gathers all received events, then pushes them to
    //  the update function on the game.
    // The update function in turn returns events that have happened to the game that clients
    //  should know about.
    // The GameManager uses the helper object also used for receiving events per client to send
    //  events back to the clients, this may be done immediately or queued up. I don't know yet.

    // Set up logging
    log4rs::init_file("config/Log4rs.toml", Default::default()).unwrap();

    let manager = ConnectionManager::new();
    manager.start(|handshake_msg, ip| {
        // Handle the specific message we're sent and get a game key to join on
        let _key = if handshake_msg.event == "CreateGame" {
            info!("Game creation requested by {}", ip);
        }
        else if handshake_msg.event == "JoinGame" {
            info!("Game joining requested by {}", ip);
            unimplemented!();
        }
        else {
            panic!("Unexpected event in handshake!");
        };
    });
}
