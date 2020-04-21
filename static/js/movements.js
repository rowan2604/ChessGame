/*let move = (function() {
    let hasPlayed = false;

    let isInRange = (positionX, positionY) => (positionX >= 0 && positionX < 8 && positionY >= 0 && positionY < 8); 

    let getDirection = (initialPositionX, initialPositionY, finalPositionX, finalPositionY) => {
        let direction = directions.none;

        let differenceX = finalPositionX - initialPositionX;
        let differenceY = finalPositionY - initialPositionY;

        if ((initialPositionX, initialPositionY) != (finalPositionX, finalPositionY)) {  //if final position is different from initial position
            if (finalPositionX == initialPositionX) {
                direction = directions.vertically;
            }
            if (finalPositionY == initialPositionY) {
                direction = directions.horizontally;
            }
            if ((finalPositionX > initialPositionX && finalPositionY > initialPositionY) || (finalPositionX < initialPositionX && finalPositionY < initialPositionY)) {
                if (differenceX == differenceY) {
                    direction = directions.topLeftDiagonally;
                }
            } else {
                if (Math.abs(differenceX) == Math.abs(differenceY)) {
                    direction = directions.topRightDiagonally;
                }
            }
        }
        return direction;
    }

    function playTopLeftDiagonally(initialPositionX, initialPositionY, finalPositionX, finalPositionY) {
        console.log("topleft")
        let hasPlayed = false;
        let difference = Math.abs(initialPositionX - finalPositionX);
        
        if (difference <= board[initialPositionY][initialPositionX].maxDistance) {
            //move
            hasPlayed = true;
        }
        return hasPlayed;
    }

    function playTopRightDiagonally(initialPositionX, initialPositionY, finalPositionX, finalPositionY) {
        console.log("topri")
        let hasPlayed = false;
        let difference = Math.abs(initialPositionX - finalPositionX);

        if (difference <= board[initialPositionY][initialPositionX].maxDistance) {
            //move
            hasPlayed = true;
        }
        return hasPlayed;
    }

    function playVertically(initialPositionX, initialPositionY, finalPositionX, finalPositionY) {
        console.log("vert")
        let hasPlayed = false;
        let difference = Math.abs(initialPositionY - finalPositionY);

        if (difference <= board[initialPositionY][initialPositionX].maxDistance) {
            //move
            hasPlayed = true;
        }
        return hasPlayed;
    }

    function playHorizontally(initialPositionX, initialPositionY, finalPositionX, finalPositionY) {
        console.log("horizo")
        let hasPlayed = false;
        let difference = Math.abs(initialPositionX - finalPositionX);
        
        if (difference <= board[initialPositionY][initialPositionX].maxDistance) {
            //move
            hasPlayed = true;
        }
        return hasPlayed;
    }

    return {
        play(message) {
            if (message.indexOf(",") == -1) {
                console.log("Please put a coma between positions");
            }
            else {
                positions = message.split(",");

                initialPosition = positions[0].replace(/\s/g, '');
                finalPosition = positions[1].replace(/\s/g, '');

                if (initialPosition.length == 2 && finalPosition.length == 2) {
                    initialPositionX = (initialPosition.charCodeAt(0) - 17) - 48;   //letter
                    initialPositionY = initialPosition.charCodeAt(1) - 49;   //number
                    finalPositionX = (finalPosition.charCodeAt(0) - 17) - 48;   //letter
                    finalPositionY = finalPosition.charCodeAt(1) - 49;   //number
                    if (!isInRange(initialPositionX, initialPositionY) || !isInRange(finalPositionX, finalPositionY)) {
                        return hasPlayed; // false
                    } else {
                        let direction = getDirection(initialPositionX, initialPositionY, finalPositionX, finalPositionY);
                        console.log("dir: " + direction);
                        switch(direction) {
                            case directions.topLeftDiagonally:
                                hasPlayed = playTopLeftDiagonally(initialPositionX, initialPositionY, finalPositionX, finalPositionY)
                                break;

                            case directions.topRightDiagonally:
                                hasPlayed = playTopRightDiagonally(initialPositionX, initialPositionY, finalPositionX, finalPositionY)
                                break;
                            case directions.vertically:
                                hasPlayed = playVertically(initialPositionX, initialPositionY, finalPositionX, finalPositionY);
                                break;

                            case directions.horizontally:
                                hasPlayed = playHorizontally(initialPositionX, initialPositionY, finalPositionX, finalPositionY);
                                break;

                            default:    //if move is not valid hasPlayed = false
                                hasPlayed = false;
                        }
                    }
                }  else {
                    console.log("Positions are invalid");
                }
            }
            return hasPlayed;
        }   
    }
})();

class Pion {
    constructor(availableDirections, maxDistance) {
        this.availableDirections = availableDirections;
        this.maxDistance = maxDistance;
    }
}

let board = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0,0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0], 
    [1, 1, 1, 1, 1, 1, 1, 1]
]
const directions = {
    none: -1,
    topLeftDiagonally: 0,
    topRightDiagonally: 1,
    vertically: 2,
    horizontally: 3
};

let dir = [directions.topLeftDiagonally, directions.topRightDiagonally];

board[2][2] = 2;
board[0][4] = 4;
message = "  C3   , E1";
move.play(message);*/


function getAvailableMoves(selectedPiece, state) {
    let moves = [];
    if (selectedPiece != undefined) {
        let type = selectedPiece.getType();
        let color = selectedPiece.getColor();
        let coordinates = selectedPiece.getPosition();

        let i = 1;
        let stop = false;
        let tmpMoves = [];
        let possibleMoves = [];

        switch (type)  {
            case 'pawn':
                let coeff = (color == 'black') ? 1 : -1;
                tmpMoves = [{x: coordinates.x, y: coordinates.y + 1*coeff}];
                if (selectedPiece.firstMove) {
                    tmpMoves.push({x: coordinates.x, y: coordinates.y + 2*coeff});
                }
                let potentialCapture = [{x: coordinates.x - 1, y: coordinates.y + 1*coeff}, {x: coordinates.x + 1, y: coordinates.y + 1*coeff}];
                for (let i = 0; i < tmpMoves.length; i++) {
                    let move = tmpMoves[i];
                    if (move.x > -1 && move.y > -1 && move.x < 8 && move.y < 8) {  //if coordinates are good
                        if (state[move.y][move.x] == -1) {  //we check if we can move
                            moves.push(move);
                        }
                    }
                }

                for (let i = 0; i < potentialCapture.length; i++) {
                    let move = potentialCapture[i];
                    if (move.x > -1 && move.y > -1 && move.x < 8 && move.y < 8) {
                        if (state[move.y][move.x] != -1) {
                            if (color == 'black' && state[move.y][move.x] > 15) {
                            moves.push(move);
                            }
                            if (color == 'white' && state[move.y][move.x] < 16) {
                                moves.push(move);
                            }
                        }
                    }
                }
                break;

            case 'rook':
                while (coordinates.y + i < 8 && !stop) {
                    stop = processBox({x: coordinates.x, y: coordinates.y + i}, color, state, moves); 
                    i++;
                }
                i = 1;
                stop = false;
                while (coordinates.y - i > -1 && !stop) {
                    stop = processBox({x: coordinates.x, y: coordinates.y - i}, color, state, moves);
                    i++;
                }
                i = 1;
                stop = false;
                while (coordinates.x + i < 8 && !stop) {
                    stop = processBox({x: coordinates.x + i, y: coordinates.y}, color, state, moves);
                    i++;
                }
                i = 1;
                stop = false;
                while (coordinates.x - i > -1 && !stop) {
                    stop = processBox({x: coordinates.x - i, y: coordinates.y},color,  state, moves);
                    i++;
                }
                break;

            case 'knight':
                tmpMoves = [
                    {x: coordinates.x - 2, y: coordinates.y - 1},
                    {x: coordinates.x - 2, y: coordinates.y + 1},
                    {x: coordinates.x + 2, y: coordinates.y - 1},
                    {x: coordinates.x + 2, y: coordinates.y + 1},
                    {x: coordinates.x - 1, y: coordinates.y - 2},
                    {x: coordinates.x + 1, y: coordinates.y - 2},
                    {x: coordinates.x - 1, y: coordinates.y + 2},
                    {x: coordinates.x + 1, y: coordinates.y + 2}
                ];
                for (let i = 0; i < tmpMoves.length; i++) {
                    let box = tmpMoves[i];
                    if (box.x > -1 && box.y > -1 && box.x < 8 && box.y < 8) { //we don't check wrong coordinates
                        possibleMoves.push(box);
                    }
                }
                for (let i = 0; i < possibleMoves.length; i++) {
                    let box = possibleMoves[i];
                    processBox(box, color, state, moves);
                }

                break;

            case 'bishop':
                while (coordinates.y + i < 8 && coordinates.y + i < 8 && !stop) {
                    stop = processBox({x: coordinates.x + i, y: coordinates.y + i}, color, state, moves); 
                    i++;
                }
                i = 1;
                stop = false;
                while (coordinates.y - i > -1 && coordinates.y - i > -1 && !stop) {
                    stop = processBox({x: coordinates.x - i, y: coordinates.y - i}, color, state, moves);
                    i++;
                }
                i = 1;
                stop = false;
                while (coordinates.x + i < 8 && coordinates.y - i > -1 && !stop) {
                    stop = processBox({x: coordinates.x + i, y: coordinates.y - i}, color, state, moves);
                    i++;
                }
                i = 1;
                stop = false;
                while (coordinates.x - i > -1 && coordinates.y + i < 8 && !stop) {
                    stop = processBox({x: coordinates.x - i, y: coordinates.y + i},color,  state, moves);
                    i++;
                }
                break;

            case 'queen':
                //rook moves
                while (coordinates.y + i < 8 && !stop) {
                    stop = processBox({x: coordinates.x, y: coordinates.y + i}, color, state, moves); 
                    i++;
                }
                i = 1;
                stop = false;
                while (coordinates.y - i > -1 && !stop) {
                    stop = processBox({x: coordinates.x, y: coordinates.y - i}, color, state, moves);
                    i++;
                }
                i = 1;
                stop = false;
                while (coordinates.x + i < 8 && !stop) {
                    stop = processBox({x: coordinates.x + i, y: coordinates.y}, color, state, moves);
                    i++;
                }
                i = 1;
                stop = false;
                while (coordinates.x - i > -1 && !stop) {
                    stop = processBox({x: coordinates.x - i, y: coordinates.y},color,  state, moves);
                    i++;
                }

                //bishop moves
                i = 1;
                stop = false;
                while (coordinates.y + i < 8 && coordinates.y + i < 8 && !stop) {
                    stop = processBox({x: coordinates.x + i, y: coordinates.y + i}, color, state, moves); 
                    i++;
                }
                i = 1;
                stop = false;
                while (coordinates.y - i > -1 && coordinates.y - i > -1 && !stop) {
                    stop = processBox({x: coordinates.x - i, y: coordinates.y - i}, color, state, moves);
                    i++;
                }
                i = 1;
                stop = false;
                while (coordinates.x + i < 8 && coordinates.y - i > -1 && !stop) {
                    stop = processBox({x: coordinates.x + i, y: coordinates.y - i}, color, state, moves);
                    i++;
                }
                i = 1;
                stop = false;
                while (coordinates.x - i > -1 && coordinates.y + i < 8 && !stop) {
                    stop = processBox({x: coordinates.x - i, y: coordinates.y + i},color,  state, moves);
                    i++;
                }
                break;

            case 'king':
                tmpMoves = [
                    {x: coordinates.x - 1, y: coordinates.y - 1},
                    {x: coordinates.x - 1, y: coordinates.y + 1},
                    {x: coordinates.x - 1, y: coordinates.y},
                    {x: coordinates.x, y: coordinates.y + 1},
                    {x: coordinates.x, y: coordinates.y - 1},
                    {x: coordinates.x + 1, y: coordinates.y - 1},
                    {x: coordinates.x + 1, y: coordinates.y},
                    {x: coordinates.x + 1, y: coordinates.y + 1}
                ];
                for (let i = 0; i < tmpMoves.length; i++) {
                    let box = tmpMoves[i];
                    if (box.x > -1 && box.y > -1 && box.x < 8 && box.y < 8) { //we don't check wrong coordinates
                        possibleMoves.push(box);
                    }
                }
                for (let i = 0; i < possibleMoves.length; i++) {
                    let box = possibleMoves[i];
                    processBox(box, color, state, moves);
                }
                break;

            default:
                console.log("The type doesn't exist");
        }
    }
    return moves;
}

function processBox(coordinates, color, state, moves) {
    let stateBox = state[coordinates.y][coordinates.x];
    let stop = false;
    if (color == 'black') {
        if (stateBox == -1) {
            moves.push({x: coordinates.x, y: coordinates.y});
        }
        else if (stateBox < 16) {
            stop = true;
        }
        if (stateBox > 15) {
            moves.push({x: coordinates.x, y: coordinates.y});
            stop = true;
        }
        
    } 
    if (color == 'white') {
        if (stateBox == -1) {
            moves.push({x: coordinates.x, y: coordinates.y});
        }
        else if (stateBox < 16) {
            moves.push({x: coordinates.x, y: coordinates.y});
            stop = true;
        }
        if (stateBox > 15) {
            stop = true;
        }
    }
    return stop;
}

function drawAvailableMoves(availableMoves, state, graphics, color, size) {
    for (let i = 0; i < availableMoves.length; i++) {
        let move = availableMoves[i];
        let stateBox = state[move.y][move.x];
        graphics.beginFill(0x05f215);
        if (color == 'black') {
            if (stateBox > 15) {
                graphics.beginFill(0xff0000);
            }
        } 
        else if (color == 'white') {
            if (stateBox < 16 && stateBox != -1) {
                graphics.beginFill(0xff0000);
            }
        }
        graphics.drawRect(move.x * size + 2, move.y * size + 2, size - 4, size - 4);
        graphics.endFill();
    }
}

function movementIsPossible(availableMoves, coordinates) {
    let playable = false;
    for (let i = 0; i < availableMoves.length; i++) {
        let availableCoord = availableMoves[i];
        if (coordinates.x == availableCoord.x && coordinates.y == availableCoord.y) {
            playable = true;
        }
    }
    return playable;
}

