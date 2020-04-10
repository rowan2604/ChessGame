var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Phaser', { preload: preload, create: create, render: render }); 

var test;

function preload() {

}  

function create() {
    test = new Phaser.Rectangle(0, 300, 600, 200);
}

function render () {
    game.debug.geom(test,'#0fffff');
}

function update() {
    
}