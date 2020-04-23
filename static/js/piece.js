class Piece{
    constructor(type, color, frame, id){            // Id is a unique ID on each piece of the game
        this.color = color;
        this.type = type;
        this.id = id;

        this.coord = {}

        this.isAlive = true;
        this.isMoving = false;
        this.sprite = game.add.sprite(0, 0, 'pieces', frame);
        game.physics.arcade.enable(this.sprite);
        // Utilities
        this.tile_dimension = game.cache.getImage('white_tile').width;
        this.firstMove = true;
        this.tween = undefined;
    }

    setPosition(x, y){                          // x and y are chess coordinates (ex: 1, 1)
        if(x < 0 || y < 0 || x > 7 || y > 7){
            console.log("Wrong coordinates");
        }
        else{
            this.coord.x = x;
            this.coord.y = y;
            this.tween = game.add.tween(this.sprite).to({x: this.tile_dimension*x + grid.graphics.x, y: this.tile_dimension*y + grid.graphics.y}, 500);
            this.tween.start();
        }
    }

    getPosition(){
        return this.coord;
    }

    getId() {
        return this.id;
    }
    
    getType(){
        return this.type;
    }

    getColor(){
        return this.color;
    }

    kill(){
        this.isAlive = false;
        this.sprite.visible = false;
    }
    
    update(){
        // Stops the sprite
        if(this.tween.isRunning){
            grid.allowMoving = false;
        }
        else{
            grid.allowMoving = true;
        }
    }
}