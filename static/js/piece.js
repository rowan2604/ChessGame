class Piece{
    constructor(type, color, frame, id){            // Id is a unique ID on each piece of the game
        this.color = color;
        this.type = type;
        this.id = id;

        this.coord = {}

        this.isAlive = true;

        this.sprite = game.add.sprite(0, 0, 'pieces', frame);
        // Utilities
        this.tile_dimension = game.cache.getImage('white_tile').width;
        this.firstMove = true;
        
    }

    setPosition(x, y){                          // x and y are chess coordinates (ex: 1, 1)
        if(x < 0 || y < 0 || x > 7 || y > 7){
            console.log("Wrong coordinates");
        }
        else{
            this.coord.x = x;
            this.coord.y = y;
            this.sprite.x = this.tile_dimension*x + grid.graphics.x;
            this.sprite.y = this.tile_dimension*y + grid.graphics.y;
        }
    }

    getPosition(){
        return this.coord;
    }
    
    getType(){
        return this.type;
    }

    getColor(){
        return this.color;
    }

    update(){
        if(!this.isAlive){
            this.sprite.visible = false;
        }
    }
}