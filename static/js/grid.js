class Grid{
    constructor(pieces){
        this.pieces = pieces;
        this.turn = 0;               // 0: Player 1 (BLACK) | 1: Player 2 (WHITE)
        this.selectedPiece = undefined;
        this.lastClickCoord = {};
        this.justClicked = false;

        this.black_team = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];               // Unique ID of each piece in teams.
        this.white_team = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

        this.tile_dimension = game.cache.getImage('black_tile').width;

        this.graphics = game.add.group();     // All the graphics content of the grid
        this.graphics.inputEnableChildren = true;

        this.graphicsAvailableMove = game.add.graphics(200, 50);
        this.initGrid();

        this.state = [                              //-1: no piece spaces else, unique ID of each pieces
            [0, 1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10, 11, 12, 13, 14, 15],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [16, 17, 18, 19, 20, 21, 22, 23],
            [24, 25, 26, 27, 28, 29, 30, 31]
            ];
    }

    initGrid(){
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j+=2){
                if(i % 2 == 0){     // If odd number, white tile first
                    let tile1 = this.graphics.create(this.tile_dimension*j, this.tile_dimension*i, 'white_tile');
                    let tile2 = this.graphics.create(this.tile_dimension*(j+1), this.tile_dimension*i, 'black_tile');
                    tile1.events.onInputDown.add(this.clickedOnTile, this);
                    tile2.events.onInputDown.add(this.clickedOnTile, this);
                }
                else{               // else, black tile first
                    let tile1 = this.graphics.create(this.tile_dimension*j, this.tile_dimension*i, 'black_tile');
                    let tile2 = this.graphics.create(this.tile_dimension*(j+1), this.tile_dimension*i, 'white_tile');
                    tile1.events.onInputDown.add(this.clickedOnTile, this);
                    tile2.events.onInputDown.add(this.clickedOnTile, this);
                }
            }
        }
        // Place all the grid on the screen 
        this.graphics.x = 200;
        this.graphics.y = 50;

        
    }

    getSelectedPiece(x, y){
        let pieceID = this.state[y][x];
        if(pieceID != -1){
            return this.pieces[pieceID];
        }
        else{
            return undefined;
        }
        
    }

    clickedOnTile(tile){                    // Updates the lest tile we clicked on. We will do stuff in update function
        this.lastClickCoord.x = tile.x / 64;             // 64: Size of a tile, sprite is the child of the group we clicked on. x is relative to the group, not the entire window
        this.lastClickCoord.y = tile.y / 64; 
        this.justClicked = true;
    }

    update(){
        // Updates the pieces of the grid
        for(let i = 0; i < this.pieces.length; i++){
            this.pieces[i].update();
        }
        if(this.justClicked){                                       // Code exec when player clicked on a tile
            let tmp = this.getSelectedPiece(this.lastClickCoord.x, this.lastClickCoord.y);       // Represents the piece we just clicked on (If selectable).
 
            if(tmp != undefined){
                if(this.turn == 0 && tmp.getColor() == 'black'){           // White player can't select a black piece.
                    if(tmp != this.selectedPiece){
                        this.selectedPiece = tmp;
                        this.graphicsAvailableMove.clear();
                    }
                    else if(tmp == this.selectedPiece){
                        this.selectedPiece = undefined;
                    }
                }
                else if(this.turn == 1 && tmp.getColor() == 'white'){
                    if(tmp != this.selectedPiece){
                        this.selectedPiece = tmp;
                        this.graphicsAvailableMove.clear();
                    }
                    else if(tmp == this.selectedPiece){
                        this.selectedPiece = undefined;
                    }
                }
            }
            // move the piece
            if(this.selectedPiece != undefined){
                
                let availableMoves = getAvailableMoves(this.selectedPiece, this.state);
                let color = this.selectedPiece.getColor();
                drawAvailableMoves(availableMoves, this.state, this.graphicsAvailableMove, color, this.tile_dimension);

                if (movementIsPossible(availableMoves, {x: this.lastClickCoord.x, y: this.lastClickCoord.y})) {
                    if(tmp == undefined){
                        // swap the ids in state element
                        let a = this.state[this.lastClickCoord.y][this.lastClickCoord.x];
                        let b = this.state[this.selectedPiece.getPosition().y][this.selectedPiece.getPosition().x];
                        this.state[this.lastClickCoord.y][this.lastClickCoord.x] = b;
                        this.state[this.selectedPiece.getPosition().y][this.selectedPiece.getPosition().x] = a;
                        // Move action
                        this.selectedPiece.setPosition(this.lastClickCoord.x, this.lastClickCoord.y);
                        this.selectedPiece.firstMove = false;
                        this.selectedPiece = undefined;
                        this.turn == 0 ? this.turn = 1 : this.turn = 0;     // Swap turn
                        this.graphicsAvailableMove.clear();
                        console.log("Player turn: " + this.turn)
                    }
                    else if(tmp.getColor() != this.selectedPiece.getColor()){       // If we are on the tile of an ennemy team...
                        this.state[this.lastClickCoord.y][this.lastClickCoord.x] = this.state[this.selectedPiece.getPosition().y][this.selectedPiece.getPosition().x];
                        // Replace old location by -1
                        this.state[this.selectedPiece.getPosition().y][this.selectedPiece.getPosition().x] = -1;
                        // Move action
                        // Kill the other piece
                        tmp.kill();
                        this.selectedPiece.setPosition(this.lastClickCoord.x, this.lastClickCoord.y);
                        this.selectedPiece.firstMove = false;
                        this.selectedPiece = undefined;
                        this.turn == 0 ? this.turn = 1 : this.turn = 0;     // Swap turn
                        this.graphicsAvailableMove.clear();
                        console.log("Player turn: " + this.turn)
                    }
                } 
            }
            this.justClicked = false;
        }
    }
}