let move = (function() {
    let hasPlayed = false;
    const directions = {
        diagonally,
        vertically,
        horizontally
    };

    let getDirection = (pawn, finalPosition) => {


    }

    function playDiagonally(pawn, finalPosition) {

        return true;
    }

    function playVertically(pawn, finalPosition) {

        return true;
    }

    function playHorizontally(pawn, finalPosition) {

        return true;
    }

    return {
        play(pawn, finalPosition) {
            let move = getDirection(pawn, finalPosition);
            switch(move) {
                case directions.diagonally:
                    hasPlayed = playDiagonally(pawn, finalPosition)
                    break;

                case directions.vertically:
                    hasPlayed = playVertically(pawn, finalPosition);
                    break;

                case directions.horizontally:
                    hasPlayed = playHorizontally(pawn, finalPosition);
                    break;

                default:    //si les mouvements ne sont pas valides le joueur ne joue pas
                    hasPlayed = false;
            }
            return hasPlayed;
        }
    }
})();

let board = [
    1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 
    1, 1, 1, 1, 1, 1, 1, 1
]

move.diagonally(4, 23);