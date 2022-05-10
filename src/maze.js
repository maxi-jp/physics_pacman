
const pacDotsPositions = [
    { x: 8, y: 8 },
    { x: 16, y: 8 },
    { x: 24, y: 8 },
    { x: 32, y: 8 },
    { x: 40, y: 8 },
    { x: 48, y: 8 },

    
    { x: 8, y: 16 },
    
    { x: 8, y: 32 },
];

const powerPelletsPositions = [
    { x: 8, y: 24 }
];

class Maze
{
    constructor()
    {
        this.matrix = [];

        this.width = 26;
        this.height = 28;

        this.cellWidth = 8;

        this.pacdots = [];
        this.powerpellets = [];
    }

    Start()
    {
        // initialize the physics colliders
        // up
        CreateBox(world, 1.12, 4.8, 2.3, .1, { type : b2Body.b2_staticBody });
        // down
        CreateBox(world, 1.12, 2.3, 2.3, .1, { type : b2Body.b2_staticBody });
        // left
        CreateBox(world, 0, 3.55, .1, 2.4, { type : b2Body.b2_staticBody });
        // right
        CreateBox(world, 2.25, 3.55, .1, 2.4, { type : b2Body.b2_staticBody });

        // inner boxes
        CreateBox(world, .32, 4.52, .24, .16, { type : b2Body.b2_staticBody });
        CreateBox(world, .76, 4.52, .31, .16, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.12, 4.61, .1, .35, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.48, 4.52, .31, .16, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.92, 4.52, .24, .16, { type : b2Body.b2_staticBody });

        CreateBox(world, .32, 4.24, .24, .08, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.12, 4.24, .54, .08, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.92, 4.24, .24, .08, { type : b2Body.b2_staticBody });
        
        CreateBox(world, .81, 4, .24, .08, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.43, 4, .24, .08, { type : b2Body.b2_staticBody });

        CreateBox(world, .64, 4, .08, .55, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.12, 4.08, .08, .25, { type : b2Body.b2_staticBody });
        CreateBox(world, 1.6, 4, .08, .55, { type : b2Body.b2_staticBody });
        
        CreateBox(world, .2, 3.88, .49, .32, { type : b2Body.b2_staticBody });
        CreateBox(world, 2.05, 3.88, .49, .32, { type : b2Body.b2_staticBody });

        // initialize the pills
        pacDotsPositions.forEach(pdp => {
            const pacdot = new PacDot(graphicAssets.general.image, new Vector2(pdp.x, pdp.y), 1);
            pacdot.Start();
            this.pacdots.push(pacdot);
        });

        powerPelletsPositions.forEach(pdp => {
            const powerpellet = new PowerPellet(graphicAssets.general.image, new Vector2(pdp.x, pdp.y), 4);
            powerpellet.Start();
            this.powerpellets.push(powerpellet);
        });
    }

    Update(deltaTime)
    {
        // pacdots
        this.pacdots.forEach(pacdot => pacdot.Update(deltaTime));
        // powerpellets
        this.powerpellets.forEach(pp => pp.Update(deltaTime));
    }

    Draw(ctx)
    {
        // background
        ctx.drawImage(graphicAssets.general.image, 228, 0, 228, 248, 0, 0, 228, 248);
        // pacdots
        this.pacdots.forEach(pacdot => pacdot.Draw(ctx));
        // powerpellets
        this.powerpellets.forEach(pp => pp.Draw(ctx));
    }

    RemovePacDot(pacdot)
    {
        pacdot.Remove(() => {
            const pacdotIndex = this.pacdots.indexOf(pacdot);
            this.pacdots.splice(pacdotIndex, 1);
        });
    }

    RemovePowerPellet(pp)
    {
        pp.Remove(() => {
            const ppIndex = this.powerpellets.indexOf(pp);
            this.powerpellets.splice(ppIndex, 1);
        });
    }
}