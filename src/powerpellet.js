
class PowerPellet extends PacDot
{
    constructor(sprite, position, score)
    {
        super(sprite, position, score);
    }

    Start()
    {
        this.body = CreateCircle(world, (this.position.x + 4) / scale, (canvas.height - (this.position.y + 4)) / scale, .03, { type : b2Body.b2_kinematicBody, userData: this, isSensor: true });
    }

    Draw(ctx)
    {
        ctx.drawImage(this.sprite, 8, 24, 8, 8, this.position.x, this.position.y, 8, 8);
    }
}