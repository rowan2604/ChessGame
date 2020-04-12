let move = (function() {
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
        
        /*if (difference <= board[initialPositionY][initialPositionX].maxDistance) {
            //move
            hasPlayed = true;
        }*/
        return hasPlayed;
    }

    function playTopRightDiagonally(initialPositionX, initialPositionY, finalPositionX, finalPositionY) {
        console.log("topri")
        let hasPlayed = false;
        let difference = Math.abs(initialPositionX - finalPositionX);

        /*if (difference <= board[initialPositionY][initialPositionX].maxDistance) {
            //move
            hasPlayed = true;
        }*/
        return hasPlayed;
    }

    function playVertically(initialPositionX, initialPositionY, finalPositionX, finalPositionY) {
        console.log("vert")
        let hasPlayed = false;
        let difference = Math.abs(initialPositionY - finalPositionY);

        /*if (difference <= board[initialPositionY][initialPositionX].maxDistance) {
            //move
            hasPlayed = true;
        }*/
        return hasPlayed;
    }

    function playHorizontally(initialPositionX, initialPositionY, finalPositionX, finalPositionY) {
        console.log("horizo")
        let hasPlayed = false;
        let difference = Math.abs(initialPositionX - finalPositionX);
        
        /*if (difference <= board[initialPositionY][initialPositionX].maxDistance) {
            //move
            hasPlayed = true;
        }*/
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
    [0, 0, 0, 0, 0, 0, 0, 0], 
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
move.play(message);
