let game = new Phaser.Game(1366, 657, Phaser.AUTO, 'Phaser', { preload: preload, create: create, update: update, render: render }); 

let black_tile;
let white_tile;
let grid;
let pieces = [];
let winner_text;

function preload() {+
    game.load.image('black_tile', '../assets/black_tile.png');
    game.load.image('white_tile', '../assets/white_tile.png');
    game.load.spritesheet('pieces', '../assets/pieces2.png', 64, 64, 12); 
    game.load.image('background', '../assets/wood.jpg');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.tileSprite(0, 0, 1366, 657, 'background');
    grid = new Grid(pieces);

    client.send("requestPlayerNames", "");

    let columns_id = game.add.text(grid.getPosition().x + 32, grid.getPosition().y + 4 + grid.getSize().height, '', {font: "16px Arial", fontStyle: 'bold', fill: "#000000", tabs: 64});
    let lines_id = game.add.text(grid.getPosition().x - 20, grid.getPosition().y + 26, '8\n7\n6\n5\n4\n3\n2\n1', {font: "16px Arial", fontStyle: 'bold', fill: "#000000"});
    let numbers = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    columns_id.parseList(numbers);
    lines_id.lineSpacing = 40;

    winner_text = game.add.text(grid.getPosition().x, grid.getPosition().y, '', {font: "20px Arial", fontStyle: 'bold', fill: "#000000"});
    winner_text.anchor.setTo(0.5, 0.5);
    winner_text.x = grid.getPosition().x + grid.getSize().width/2;
    winner_text.y = grid.getPosition().y + grid.getSize().height + 50;
    
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
    if(!grid.isPlaying){
        winner_text.text = grid.winner + " won the game";
    }
}

function render () {
}