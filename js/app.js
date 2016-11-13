// Enemies our player must avoid
var Enemy = function(x, y, movement) {
    this.x = x;
    this.y = y;
    this.movement = movement;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Move the enemy bug accross the screen
    this.x = this.x + (this.movement * dt);

    if (this.y === player.y) {
        // If player exisits at point A and a bug exists anywhere
        // on the line between A - 78 and A + 80, then the bug and
        // the player have touched and the game should reset.
        if (((player.x - 78) <= this.x) && ((player.x + 80)) >= this.x) {
            player.x = 202;
            player.y = 392;
        }
    }
    // reset bug to left side of screen, once right side is reached
    if (this.x > 505) {
        this.x = -101;
    }


    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//Player avatar
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};
//Binding the key input to a variable
Player.prototype.handleInput = function(arrow) {
    this.arrow = arrow;
};
// Moving the player avatar in the correct direction
// Also making sure the avatar is confined to the
// game screen
Player.prototype.update = function(arrow) {
    if (this.arrow === 'left' && this.x > 0) {
        this.x = this.x - 101;
        this.arrow = null;
    } else if (this.arrow === 'up') {
        this.y = this.y - 83;
        // reseting the game if the player wins
        if (this.y < 60) {
            this.x = 202;
            this.y = 392;
        }
        this.arrow = null;
    } else if (this.arrow === 'right' && this.x < 404) {
        this.x = this.x + 101;
        this.arrow = null;
    } else if (this.arrow === 'down' && this.y < 392) {
        this.y = this.y + 83;
        this.arrow = null;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemyOne = new Enemy(-101, 60, 75);
var enemyTwo = new Enemy(-101, 143, 52);
var enemyThree = new Enemy(-101, 226, 36);
//Player start = (202,392)
allEnemies.push(enemyOne, enemyTwo, enemyThree);

var player = new Player(202, 392);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
