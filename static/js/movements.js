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
    console.log(moves);
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

