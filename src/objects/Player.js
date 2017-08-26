class Player {

	constructor(game, x, y, baseFrame) {
		this.game = game
        this.baseFrame = baseFrame
		this.sprite = this.game.add.sprite(x, y, 'tiles')
		this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE)
    	
        this.sprite.anchor.setTo(0.5)
        this.sprite.body.collideWorldBounds = true
        this.sprite.frame = this.baseFrame
        this.sprite.animations.add('left', [this.baseFrame + 1], 10, true)
        this.sprite.animations.add('right', [this.baseFrame + 2], 10, true)
        this.maxSpeed = 240
        this.acceleration = 30
        if (baseFrame == 4) {
            this.sprite.body.collideWorldBounds = false
        }
        this.sprite.body.setSize(10,10,3,3);

	}

	update(cursors, hitPlatform) {
        if (cursors.left.isDown) {       
            this.sprite.body.velocity.x -= this.acceleration
            if (this.sprite.body.velocity.x < -this.maxSpeed) {
            	this.sprite.body.velocity.x = -this.maxSpeed
            }
            this.sprite.animations.play('left')
            //this.sprite.scale.setTo(1,1)
        } 
        else if (cursors.right.isDown) {
            this.sprite.body.velocity.x += this.acceleration
            if (this.sprite.body.velocity.x > this.maxSpeed) {
            	this.sprite.body.velocity.x = this.maxSpeed
            }
        	this.sprite.animations.play('right')
        	//this.sprite.scale.setTo(-1,1)
        }
        else {
        	this.sprite.body.velocity.x = 0
        	this.sprite.animations.stop()
        	this.sprite.frame = this.baseFrame
        }


	}

}


export default Player