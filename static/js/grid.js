class Grid{
    constructor(pieces){
        this.pieces = pieces;
        this.turn = 0;               // 0: Player 1 (BLACK) | 1: Player 2 (WHITE)
        this.selectedPiece = undefined;
        this.lastClickCoord = {};

        this.tile_dimension = game.cache.getImage('black_tile').width;

        this.graphics = game.add.group();     // All the graphics content of the grid
        this.graphics.inputEnableChildren = true;

        this.graphicsAvailableMove = game.add.graphics(200, 50);
        this.initGrid();
        // utilities

        this.graph = game.add.graphics(906, 331);
        this.graph.beginFill(0x000000);
        this.graph.drawRect(0,0, 300, 10);
        this.numberPiecesKilled = {black: {killedOnLastRow: 0, numberPerRow: 1, numberOfRow: 1}, white: {killedOnLastRow: 0, numberPerRow: 1, numberOfRow: 1}};

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

        this.winner = undefined;
        this.isPlaying = true;
        this.allowMoving = false;           // If the pieces sprites are moving, you have to wait she stops before the next turn

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

    getPosition(){
        let coord = {};
        coord.x = this.graphics.x;
        coord.y = this.graphics.y;
        return coord;
    }
    
    getSize(){
        let size = {};
        size.height = this.graphics.height;
        size.width = this.graphics.width;
        return size;
    }

    getPiece(x, y){                 // Get the piece at a given coord.
        let pieceID = this.state[y][x];
        if(pieceID != -1){
            return this.pieces[pieceID];
        }
        else{
            return undefined;
        }
        
    }

    kill(piece) {
        let color = piece.getColor();
        let x = 900;
        let y = 0;
        let numberKilled = 0;
        let numberPerRow = 1;
        let numberOfRow = 1;

        if (color == 'black') {
            this.numberPiecesKilled.black.killedOnLastRow++;
            numberKilled = this.numberPiecesKilled.black.killedOnLastRow;
            numberPerRow = this.numberPiecesKilled.black.numberPerRow;
            numberOfRow = this.numberPiecesKilled.black.numberOfRow;

            if (numberKilled > numberPerRow) {
                numberPerRow++;
                numberOfRow++;
                numberKilled = 1;
                this.numberPiecesKilled.black.numberPerRow++;
                this.numberPiecesKilled.black.numberOfRow++;
                this.numberPiecesKilled.black.killedOnLastRow = 1;
            }
            x += (2 - ((numberOfRow - 1 )* 0.5)) * this.tile_dimension +  (numberKilled-1) * this.tile_dimension;
            y += (4.5 + numberOfRow) * this.tile_dimension;
        }
        else {
            this.numberPiecesKilled.white.killedOnLastRow++;
            numberKilled = this.numberPiecesKilled.white.killedOnLastRow;
            numberPerRow = this.numberPiecesKilled.white.numberPerRow;
            numberOfRow = this.numberPiecesKilled.white.numberOfRow;

            if (numberKilled > numberPerRow) {
                numberPerRow++;
                numberOfRow++;
                numberKilled = 1;
                this.numberPiecesKilled.white.numberPerRow++;
                this.numberPiecesKilled.white.numberOfRow++;
                this.numberPiecesKilled.white.killedOnLastRow = 1;
            }
            x += (2 - ((numberOfRow -1 )* 0.5)) * this.tile_dimension +  (numberKilled-1) * this.tile_dimension;
            y +=  (5 - numberOfRow) * this.tile_dimension;
        }
        piece.goTo(x, y);
    }

    clickedOnTile(tile){                    // Updates the lest tile we clicked on. We will do stuff in update function
        if(this.isPlaying){
            this.lastClickCoord.x = tile.x / 64;             // 64: Size of a tile, sprite is the child of the group we clicked on. x is relative to the group, not the entire window
            this.lastClickCoord.y = tile.y / 64; 
            // Datas to send to the server
            let data = {
                x: this.lastClickCoord.x,
                y: this.lastClickCoord.y
            }
            client.send('clicked', data);
        }
    }

    clickingActions(tmp){
        if(tmp != undefined){           // We define the curret piece
            if(this.turn == 1 && tmp.getColor() == 'black'){           // White player can't select a black piece.
                if(tmp != this.selectedPiece){
                    this.selectedPiece = tmp;
                    this.graphicsAvailableMove.clear();
                }
                else if(tmp == this.selectedPiece){
                    this.selectedPiece = undefined;
                    this.graphicsAvailableMove.clear();
                }
            }
            else if(this.turn == 0 && tmp.getColor() == 'white'){
                if(tmp != this.selectedPiece){
                    this.selectedPiece = tmp;
                    this.graphicsAvailableMove.clear();
                }
                else if(tmp == this.selectedPiece){
                    this.selectedPiece = undefined;
                    this.graphicsAvailableMove.clear();
                }
            }
        }
        
        // move the piece
        if(this.selectedPiece != undefined){
            let data = {
                username: username[0],
                type: this.selectedPiece.getType(),
                color: this.selectedPiece.getColor(), 
                coordinates: this.selectedPiece.getPosition(),
                lastClickedCoordinates: this.lastClickCoord,
                isFirstMove: this.selectedPiece.isFirstMove(),
                size: this.tile_dimension,
                id: this.selectedPiece.getId()
            };
            client.send('sv_move', data);
        }
    }

    checkForWin(){
        let win_data;
        let types = [];
        let isFirstMoves = [];
        let coords = [];
        if(this.turn == 1){
            for(let i in this.pieces){
                if(this.pieces[i].getColor() == 'white'){
                    coords.push(this.pieces[i].getPosition());
                    isFirstMoves.push(this.pieces[i].isFirstMove());
                    types.push(this.pieces[i].getType());
                }
            }
            console.log(coords);
            win_data = {
                king_position: this.pieces[4].getPosition(),
                color: 'white',
                types : types,
                isFirstMoves: isFirstMoves,
                coords: coords,
                turn: this.turn
            };
        }
        else{
            for(let i in this.pieces){
                if(this.pieces[i].getColor() == 'black'){
                    coords.push(this.pieces[i].getPosition());
                    isFirstMoves.push(this.pieces[i].isFirstMove());
                    types.push(this.pieces[i].getType());
                }
            }
            win_data = {
                king_position: this.pieces[28].getPosition(),
                color: 'black',
                types : types,
                isFirstMoves: isFirstMoves,
                coords: coords,
                turn: this.turn
            };
        }
        client.send('checkForWin', win_data);
    }

    update(){
        // Updates the pieces of the grid
        for(let i = 0; i < this.pieces.length; i++){
            this.pieces[i].update();
        }
    }
}