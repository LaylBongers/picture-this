use std::thread;
use std::sync::Mutex;
use std::sync::mpsc::{self, Sender};
use rand::{self, Rng, XorShiftRng};
use connection_manager::{ClientToken, ClientSendEvent};

#[derive(Debug)]
enum GameTokenEvent {
    JoinGame(ClientToken),
    #[doc(hidden)]
    __DontMatchMe,
}

pub struct GameToken {
    sender: Sender<GameTokenEvent>
}

impl GameToken {
    pub fn join_game(&self, client: ClientToken) {
        self.sender.send(GameTokenEvent::JoinGame(client)).unwrap();
    }
}

pub struct GameManager {
    rng: Mutex<XorShiftRng>
}

impl GameManager {
    pub fn new() -> Self {
        GameManager {
            rng: Mutex::new(rand::weak_rng())
        }
    }

    pub fn create_game(&self) -> GameToken {
        // Set up a channel to send events to the game
        let (sender, receiver) = mpsc::channel();

        // Generate a key for this game
        // TODO: Gurentuee its uniqueness so we can use it for lookup
        let key = self.rng
            .lock().unwrap()
            .gen_ascii_chars().take(4).collect::<String>()
            .to_uppercase();

        // Spawn the game loop thread
        thread::Builder::new()
            .name(format!("Game{}", key))
            .spawn(move || {
                info!("Spawned new game thread");

                // Handle all incoming events from game tokens
                for evt in receiver.iter() {
                    match evt {
                        GameTokenEvent::JoinGame(mut client) => {
                            info!("Handling join game request for {}", client.address());
                            client.send(ClientSendEvent::JoinGame);
                        },
                        e => warn!("Received unhandled: {:?}", e)
                    }
                }
            })
            .unwrap();

        // Assemble the token to communicate with it
        GameToken {
            sender: sender
        }
    }
}
