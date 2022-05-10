
class Ghost
{
    constructor(sprite, initialPosition, pacman)
    {
        this.sprite = sprite;
        this.position = initialPosition;
        this.pacman = pacman;

        this.edibleTime = 0;

        this.animation = new SSAnimation(sprite, this.position, 16, 16, [2, 2, 2, 2], 1 / 12);
        this.animation.PlayAnimationLoop(0);

        this.direction = -1;

        this.movementForce = .05;

        this.body = CreateCircle(world, (initialPosition.x + 8) / scale, (canvas.height - (initialPosition.y + 7)) / scale, .06, {linearDamping: 5, userData: this});
    }

    Update(deltaTime)
    {
        if (this.edibleTime >= 0)
        {
            

            this.edibleTime -= deltaTime;
        }

        this.direction = -1;

        const difX = this.pacman.position.x - this.position.x;
        const difY = this.pacman.position.y - this.position.y;

        if (Math.abs(difX) > Math.abs(difY))
        {
            this.direction = (difX > 0) ? 1 : 3
        }
        else
        {
            this.direction = (difY > 0) ? 2 : 0
        }

        switch (this.direction)
        {
            case 0:
                //this.position.y -= this.speed * deltaTime;
                this.body.ApplyForce(new b2Vec2(0, this.movementForce), this.body.GetWorldCenter());
                this.animation.PlayAnimationLoop(2, false);
                break;
            case 1:
                //this.position.x += this.speed * deltaTime;
                this.body.ApplyForce(new b2Vec2(this.movementForce, 0), this.body.GetWorldCenter());
                this.animation.PlayAnimationLoop(0, false);
                break;
            case 2:
                //this.position.y += this.speed * deltaTime;
                this.body.ApplyForce(new b2Vec2(0, -this.movementForce), this.body.GetWorldCenter());
                this.animation.PlayAnimationLoop(3, false);
                break;
            case 3:
                //this.position.x -= this.speed * deltaTime;
                this.body.ApplyForce(new b2Vec2(-this.movementForce, 0), this.body.GetWorldCenter());
                this.animation.PlayAnimationLoop(1, false);
                break;
        }

        const currentPosition = this.body.GetPosition();
        this.animation.position.x = (currentPosition.x * scale) - 8;
        this.animation.position.y = canvas.height - (currentPosition.y * scale) - 7;

        this.animation.Update(deltaTime);
    }

    Draw(ctx)
    {
        this.animation.Draw(ctx);        
    }

    SetEdibleTime(edibleTime)
    {
        this.edibleTime = edibleTime;
    }
}