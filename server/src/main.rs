#[macro_use] extern crate log;
extern crate log4rs;
extern crate rand;
extern crate rustc_serialize;
extern crate thread_scoped;
extern crate websocket;

mod connection_manager;
mod game_manager;

use connection_manager::ConnectionManager;
use game_manager::GameManager;

fn main() {
    //  Data flow:
    // Client sends data, arrives in thread in ConnectionManager.
    // ConnectionManager parses data and turns it into client events, sending them through a
    //  channel.
    // The GameManager owns the receiving channels, kept grouped together with game-specific data.
    // When a tick is run, the GameManager first gathers all received events, then pushes them to
    //  the update function on the game.
    // The update function in turn returns events that have happened to the game that clients
    //  should know about.
    // The GameManager uses the helper object also used for receiving events per client to send
    //  events back to the clients, this may be done immediately or queued up. I don't know yet.

    // Set up logging
    log4rs::init_file("config/Log4rs.toml", Default::default()).unwrap();

    // Initialize managers
    let connections = ConnectionManager::new();
    let games = GameManager::new();

    // Start the connection manager (blocking)
    connections.start(|handshake_msg, client| {
        // Handle the specific message we're sent and get a game token
        let game = if handshake_msg.event == "CreateGame" {
            info!("Game creation requested by {}", client.address());

            // Create the game
            games.create_game()
        }
        else if handshake_msg.event == "JoinGame" {
            info!("Game joining requested by {}", client.address());

            // Look up the game
            unimplemented!();
        }
        else {
            panic!("Unexpected event in handshake!");
        };

        // Actually join the game
        game.join_game(client);
    });
}
