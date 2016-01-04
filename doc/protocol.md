# Drawless Protocol
Drawless uses websockets for its client-server communication.

## Server-to-Client Messages
Valid event names with meaning:

| Event    | Meaning |
|----------|---------|
| JoinGame | The CreateGame or JoinGame send by the client has been accepted. |

## Client-to-Server Messages
Valid event names with meaning:

| Event      | Meaning |
|------------|---------|
| CreateGame | Create a new game and join it. |
| JoinGame   | Join an existing game with the given key. |
