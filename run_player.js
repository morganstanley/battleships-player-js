const readline = require('readline');

function main() {
  const playerImplementation = process.argv[2] ? process.argv[2] : 'random';
  runPlayer(playerImplementation);
}

function runPlayer(playerImplementation) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Load player's code
  const playerString = `./players/${playerImplementation}.js`;
  console.log('Player with player: ', playerString);
  const PlayerImplementation = require(playerString);
  let player = new PlayerImplementation(1);

  rl.on('line', function (input) {
    const parts = input.split(' ');
    const action = parts[0];

    let next, coords;

    //console.log('RECEIVED MESSAGE', input);

    switch (action) {
      case 'init':
        player.init();
        break;
      case 'place-ships':
        const shipPlacement = player.placeShips(JSON.parse(parts[1]));
        writeToServer(`placed-ships ${JSON.stringify(shipPlacement)}`);
        break;
      case 'move':
        try {
          coords = player.getMove();
          writeToServer(`shoot ${coords.x},${coords.y}`);
        } catch (e) {
          console.error('Player Error: Failed to get a move', e);
        }
        break;
      case 'opponent':
        // the move will be in the format row,col format
        const opponentMove = parts[1].split(',');
        player.onOpponentMove(
          [
            opponentMove[0],
            opponentMove[1],
            opponentMove[2]
          ]
        );
        coords = player.getMove();
        writeToServer(`shoot ${coords.x},${coords.y}`);
        
        break;
      case 'result':
        // the move will be in the format row,col format
        const shotResult = parts[1].split(',');
        player.onShotResult(
          [
            shotResult[0],
            shotResult[1],
            shotResult[2]
          ]
        );
        break;
        case 'you-win':
          // the move will be in the format row,col format
          player.onWin();
          break;
        case 'you-lose':
            // the move will be in the format row,col format
            const losingShotResult = parts[1].split(',');
            // this is the opponent shot that sinks your last ship
            player.onLost(
              [
                losingShotResult[0],
                losingShotResult[1],
                losingShotResult[2]
              ]
            );
            break;
    }
  });
}

function writeToServer(output) {
  if (output) {
    // Need to have "send:" here for uabc to direct the output towards the server
    console.log('send:', output);
  }
}         

main();