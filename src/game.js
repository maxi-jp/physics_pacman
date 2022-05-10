var game = {
    
    maze: null,
    pacMan: null,

    currentLives: 4,
    score: 0,

    ghosts: [],
    blinky: null,
    pinky: null,
    inky: null,
    clyde: null,

    edibleTime: 10,

    Start: function() {
       this.maze = new Maze();
       this.maze.Start();

       this.pacMan = new PacMan(graphicAssets.pacman.image, new Vector2(6, 6));

       this.blinky = new Ghost(graphicAssets.blinky.image, new Vector2(200, 10), this.pacMan);
       this.ghosts.push(this.blinky);
    },

    Update: function(deltaTime) {
       this.maze.Update(deltaTime);
       this.pacMan.Update(deltaTime);

       this.ghosts.forEach(ghost => ghost.Update(deltaTime));
    },

    Draw: function(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.maze.Draw(ctx);
        this.pacMan.Draw(ctx);
        
       this.ghosts.forEach(ghost => ghost.Draw(ctx));

       ctx.fillStyle = "white";
       ctx.font = "8px PressStart2P";
       ctx.fillText("SCORE: " + this.score, 8, 274);
    },

    CollisionBetweenPacManAndGhost: function() {
        //currentLives--;
    },

    CollisionBetweenPacManAndPacDot: function(pacdot) {
        this.score += pacdot.score;

        // remove the pacdot from the game
        this.maze.RemovePacDot(pacdot);
    },

    CollisionBetweenPacManAndPowerPellet: function(powerpellet) {
        this.score += powerpellet.score;

        // remove the pacdot from the game
        this.maze.RemovePowerPellet(powerpellet);
    }

}
