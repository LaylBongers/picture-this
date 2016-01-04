extern crate websocket;

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

    let manager = ConnectionManager::new();
    manager.start(|_sender, _receiver| {
        println!("Thing!");
    });
}
