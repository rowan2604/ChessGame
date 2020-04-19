let game = new Phaser.Game(900, 600, Phaser.AUTO, 'Phaser', { preload: preload, create: create, update: update, render: render }); 

let black_tile;
let white_tile;
let grid;
let pieces = [];

function preload() {+
    game.load.image('black_tile', '../assets/black_tile.png');
    game.load.image('white_tile', '../assets/white_tile.png');
    game.load.spritesheet('pieces', '../assets/pieces2.png', 64, 64, 12);
}

function create() {
    game.stage.backgroundColor = '#CD9261';

    grid = new Grid(pieces);

    initPieces();

}

function initPieces(){
    pieces.push(new Piece('rook', 'black', 2, 0));
    pieces.push(new Piece('knight', 'black', 3, 1));
    pieces.push(new Piece('bishop', 'black', 4, 2));
    pieces.push(new Piece('queen', 'black', 1, 3));
    pieces.push(new Piece('king', 'black', 0, 4));
    pieces.push(new Piece('bishop', 'black', 4, 5));
    pieces.push(new Piece('knight', 'black', 3, 6));
    pieces.push(new Piece('rook', 'black', 2, 7));
    for(let i = 0; i < 8; i++){
        pieces.push(new Piece('pawn', 'black', 5, 8+i));
    }
    for(let i = 0; i < 8; i++){
        pieces.push(new Piece('pawn', 'white', 11, 16+i));
    }
    pieces.push(new Piece('rook', 'white', 8, 24));
    pieces.push(new Piece('knight', 'white', 9, 25));
    pieces.push(new Piece('bishop', 'white', 10, 26));
    pieces.push(new Piece('queen', 'white', 7, 27));
    pieces.push(new Piece('king', 'white', 6, 28));
    pieces.push(new Piece('bishop', 'white', 10, 29));
    pieces.push(new Piece('knight', 'white', 9, 30));
    pieces.push(new Piece('rook', 'white', 8, 31));

    let row_number = 0;

    for(let i = 0; i < pieces.length/2; i++){
        if(i % 8 == 0 && i != 0){
            row_number++;
        }
        pieces[i].setPosition(i-(row_number*8), row_number);
        pieces[i+16].setPosition(i-(row_number*8), row_number+6)
    }
}  

function update() {
    grid.update();
}

function render () {
}