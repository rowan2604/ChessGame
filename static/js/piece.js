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
        
    }

    setPosition(x, y){                          // x and y are chess coordinates (ex: 1, 1)
        if(x < 0 || y < 0 || x > 7 || y > 7){
            console.log("Wrong coordinates");
        }
        else{
            this.coord.x = x;
            this.coord.y = y;
            /*this.sprite.x = this.tile_dimension*x + grid.graphics.x;
            this.sprite.y = this.tile_dimension*y + grid.graphics.y;
            console.log(this.sprite.x);
            console.log(this.sprite.y);*/
            game.physics.arcade.moveToXY(this.sprite, this.tile_dimension*x + grid.graphics.x, this.tile_dimension*y + grid.graphics.y, 0, 500);
            game.time.events.add(500, function() {
                this.sprite.body.velocity.setTo(0,0);
                if(this.isMoving && this.sprite.y <= (this.tile_dimension*this.coord.y + grid.graphics.y + 2) && this.sprite.y > (this.tile_dimension*this.coord.y + grid.graphics.y - 2)){
                    if(this.sprite.x <= (this.tile_dimension*this.coord.x + grid.graphics.x + 2) && this.sprite.x > (this.tile_dimension*this.coord.x + grid.graphics.x - 2)){
                        console.log(this.id);
                        this.sprite.body.velocity.x = 0;
                        this.sprite.body.velocity.y = 0;
                        console.log(this.sprite.x);
                        console.log(this.sprite.y);
                        this.sprite.x = this.tile_dimension*this.coord.x + grid.graphics.x;
                        this.sprite.y = this.tile_dimension*this.coord.y + grid.graphics.y;
                        this.isMoving = false;
                    }
                }
            }, this);
            this.isMoving = true;
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

    kill(){
        this.isAlive = false;
        this.sprite.visible = false;
    }
    
    update(){
        // Stops the sprite 
        /*
        if(this.isMoving && this.sprite.y <= (this.tile_dimension*this.coord.y + grid.graphics.y + 2) && this.sprite.y > (this.tile_dimension*this.coord.y + grid.graphics.y - 2)){
            if(this.sprite.x <= (this.tile_dimension*this.coord.x + grid.graphics.x + 2) && this.sprite.x > (this.tile_dimension*this.coord.x + grid.graphics.x - 2)){
                console.log(this.id);
                this.sprite.body.velocity.x = 0;
                this.sprite.body.velocity.y = 0;
                console.log(this.sprite.x);
                console.log(this.sprite.y);
                this.sprite.x = this.tile_dimension*this.coord.x + grid.graphics.x;
                this.sprite.y = this.tile_dimension*this.coord.y + grid.graphics.y;
                this.isMoving = false;
            }
        }*/
    }
}