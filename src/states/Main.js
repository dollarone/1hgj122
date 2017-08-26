import Map from 'objects/Map'
import Particle from 'objects/Particle'
import Player from 'objects/Player'

class Main extends Phaser.State {

	create() {

		this.game.physics.startSystem(Phaser.Physics.ARCADE)

		this.game.stage.backgroundColor = '#000'

		this.step = -1

		this.statusLabel = this.add.text(this.game.world.width/2 - 360, 10, '')
		this.timeLabel = this.add.text(10, this.game.world.height-20, '', { font: "11px Monospace", fill: "#999"})
		this.speed = 1

        this.gameover = false

        this.rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R)
    	this.rKey.onDown.add(this.restart, this)
    	this.enemies = this.game.add.group()
    	this.particles = this.game.add.group()

    	this.player = new Player(this.game, this.game.world.width/2, this.game.world.height - 50, 0)
    	this.cursors = this.game.input.keyboard.createCursorKeys()

	}

	restart() {
		this.game.state.restart()
	}

	endgame() {
		this.gameover = true
	}
	killparticle(part, wall) {
		part.kill()
	}
	update() {
		this.step += 1

		this.hitPlatform = this.game.physics.arcade.collide(this.player.sprite, this.enemies)
//		this.game.physics.arcade.collide(this.particles, this.bucket.walls, this.killparticle, null, this);
		if (this.gameover) {
			return
		}

		this.player.update(this.cursors, this.hitPlatform)

		if (this.hitPlatform) {
			this.gameover = true
			this.player.sprite.kill()
		}
		
//		this.timeUsed.setTime(this.game.time.totalElapsedSeconds());
		this.timeLabel.text = "Seconds survived: " + this.game.time.totalElapsedSeconds().toFixed(0)

		if (this.step % 5 == 0) {
			this.generateEnemy()
		}
		if (this.game.rnd.integerInRange(1, 10) == this.step/1000) {
			this.generateEnemy()
		}

	}

	generateEnemy() {
		let enemy = new Player(this.game, this.game.rnd.integerInRange(0, this.game.world.width), -40, 4)
		enemy.sprite.body.velocity.x = this.game.rnd.integerInRange(-200, 200)
		enemy.sprite.body.velocity.y = this.game.rnd.integerInRange(50, 100) + this.step/2
		this.enemies.add(enemy.sprite)

	}

	
	render() {
//		this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00")
		//this.game.debug.body(this.player.sprite)
	}
}

export default Main