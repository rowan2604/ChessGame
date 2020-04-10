let move = (function() {
    let hasPlayed = false;
    const directions = {
        none: -1,
        topLeftDiagonally: 0,
        topRightDiagonally: 1,
        vertically: 2,
        horizontally: 3
    };

    let getDirection = (initialPosition, finalPosition) => {
        let direction = directions.none;

    }

    function playDiagonally(initialPosition, finalPosition) {
        
        return true;
    }

    function playVertically(initialPosition, finalPosition) {

        return true;
    }

    function playHorizontally(initialPosition, finalPosition) {

        return true;
    }

    return {
        play(initialPosition, finalPosition) {
            let move = getDirection(initialPosition, finalPosition);
            switch(move) {
                case directions.diagonally:
                    hasPlayed = playDiagonally(initialPosition, finalPosition)
                    break;

                case directions.vertically:
                    hasPlayed = playVertically(initialPosition, finalPosition);
                    break;

                case directions.horizontally:
                    hasPlayed = playHorizontally(initialPosition, finalPosition);
                    break;

                default:    //si les mouvements ne sont pas valides le joueur ne joue pas
                    hasPlayed = false;
            }
            return hasPlayed;
        }
    }
})();

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

board[2][6] = 4;
board[0][4] = 3;

console.log(board);
move.play(4, 23);