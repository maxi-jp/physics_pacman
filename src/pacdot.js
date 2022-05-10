
class PacDot
{
    constructor(sprite, position, score)
    {
        this.sprite = sprite;
        this.position = position;
        this.score = score;

        this.toDestroy = false;
        this.ondestroy = null;

        this.body = null;
    }

    Start()
    {
        this.body = CreateCircle(world, (this.position.x + 4) / scale, (canvas.height - (this.position.y + 4)) / scale, .01, { type : b2Body.b2_kinematicBody, userData: this, isSensor: true });
    }

    Update(deltaTime)
    {
        if (this.toDestroy)
        {
            world.DestroyBody(this.body);
            this.body.SetUserData(null);
            this.body = null;

            this.ondestroy();
        }
    }

    Draw(ctx)
    {
        ctx.drawImage(this.sprite, 8, 8, 8, 8, this.position.x, this.position.y, 8, 8);
    }

    Remove(callback)
    {
        this.toDestroy = true;
        this.ondestroy = callback;
    }
}