use std::thread;
use std::sync::mpsc::{self, Sender};
use connection_manager::ClientToken;

#[derive(Debug)]
enum GameTokenEvent {
    JoinGame(ClientToken)
}

pub struct GameToken {
    sender: Sender<GameTokenEvent>
}

impl GameToken {
    pub fn join_game(&self, client: ClientToken) {
        self.sender.send(GameTokenEvent::JoinGame(client)).unwrap();
    }
}

pub struct GameManager;

impl GameManager {
    pub fn new() -> Self {
        GameManager
    }

    pub fn create_game(&self) -> GameToken {
        // Set up a channel to send events to the game
        let (sender, receiver) = mpsc::channel();

        // Spawn the game loop thread
        thread::spawn(move || {
            info!("Spawned new game thread");

            for e in receiver.iter() {
                info!("Received: {:?}", e);
            }
        });

        // Assemble the token to communicate with it
        GameToken {
            sender: sender
        }
    }
}
