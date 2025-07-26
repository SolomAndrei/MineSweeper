MineSweeper Service Architecture
The MineSweeper service consists of two main parts:

1. Backend Service
Responsible for game logic, board generation, and move validation.

Two types of game logic are implemented:

Option 1:
The server generates the board with winning and losing elements placed on it and sends the complete board to the client. The gameplay and move checking happen entirely on the client side.

Option 2:
The server generates the board and returns only the unique board id and the amountPerWin parameter to the client.
The client sends the server the board id and the coordinates of the selected cell. The server responds with the result (win or lose).
This approach is implemented to prevent users from inspecting the board layout (e.g., via DevTools) and discovering the positions of winning elements.

2. Frontend Application
The user interface implemented to display the game board, handle user clicks, show animations, and communicate with the backend via API.

Also supports two game modes:
Option 1:
The client receives a fully generated board from the server and handles all gameplay logic locally.
Option 2:
The client sends the coordinates of the player’s choice to the server, receives the result, and updates the UI accordingly.
The app is designed with an atomic architecture that allows supporting multiple game scenarios without significantly increasing code complexity.
Game logic is separated into distinct React hooks—each scenario has its own dedicated hook.
All UI components are reusable and independent, simplifying maintenance and scalability.
Automated tests have been added for the main reusable React components to ensure reliability and ease of maintenance.


Running the Application
To start the application, use the command:

npm install
npm run start

This command simultaneously runs both the backend server (on port 5050) and the frontend client.

