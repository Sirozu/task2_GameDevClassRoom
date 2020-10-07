import * as qt from './quad-tree';

export default class Triangle {
    /* istanbul ignore next */
    static generate({width, height}, id) {
        const minR = width / 300;
        const maxR = width / 200;
        const r = minR + Math.random() * (maxR - minR);

        const x = Math.random() * (width - maxR);
        const y = Math.random() * (height - maxR);

        const minV = 2;
        const maxV = 2;
        const vx = minV + Math.random() * (maxV - minV);
        const vy = minV + Math.random() * (maxV - minV);

        const fig = new Triangle(x, y, r);
        fig.id = id;
        fig.vx = vx;
        fig.vy = vy;
        fig.type = qt.FigTypes.Triangle;

        return fig;
    }

    // (x,y) - center of the trinumscribed trinle
    // r - radius of the trinumscribed trinle
    constructor(x, y, r, colors = ["black", "red", "yellow"]) {
        this.x = x;
        this.y = y;
        this.r = r;

        this.collisions = 0;
        this.colors = colors;
    }

    get side() {
        return this.r * 3 / Math.sqrt(3);
    }

    get smallR() {
        return this.r / 2;
    }

    get height() {
        return this.r * 3 / 2;
    }

    get topPoint() {
        return { x: this.x, y: this.y - this.r };
    }

    get leftPoint() {
        return { x: this.x - this.r, y: this.y + this.smallR };
    }

    get rightPoint() {
        return { x: this.x + this.r, y: this.y + this.smallR };
    }

    get left() {
        return this.x - this.r;
    }

    get right() {
        return this.x + this.r;
    }

    get top() {
        return this.y - this.r;
    }

    get bottom() {
        return this.y + this.smallR;
    }

    /* istanbul ignore next */
    get isAlive() {
        return this.collisions < 3;
    }

    contains(point) {
        let s = this.square(point.x,  point.y, this.leftPoint.x, this.leftPoint.y, this.rightPoint.x, this.rightPoint.y) 
        + this.square(point.x,  point.y , this.rightPoint.x, this.rightPoint.y, this.topPoint.x, this.topPoint.y) 
        + this.square(point.x,  point.y, this.topPoint.x, this.topPoint.y, this.leftPoint.x, this.leftPoint.y);
        return Math.abs(this.square(this.leftPoint.x, this.leftPoint.y, this.rightPoint.x, this.rightPoint.y, this.topPoint.x, this.topPoint.y) - s) <= 0.01; 
    }

    square(aAx, aAy, aBx, aBy, aCx, aCy)
    {
        return Math.abs(aBx*aCy - aCx*aBy - aAx*aCy + aCx*aAy + aAx*aBy - aBx*aAy);
    }

    /* istanbul ignore next */
    CollisionsCheck(figures) {
        for (const fig of figures) {
            if (fig.isAlive && fig !== this && qt.intersects(this, fig)) {
                
                this.collisions += 1;

                this.vx *= -1;
                this.vy *= -1;
            }
        }
    }

    intersects(trin) {

        if ((trin.leftPoint.x <= this.right && trin.leftPoint.x >= this.left && trin.leftPoint.y >= this.top && trin.leftPoint.y <= this.bottom)  
            || (trin.rightPoint.x <= this.right && trin.rightPoint.x >= this.left && trin.rightPoint.y >= this.top && trin.rightPoint.y <= this.bottom)  
            || (trin.topPoint.x <= this.right && trin.topPoint.x >= this.left && trin.topPoint.y >= this.top && trin.topPoint.y <= this.bottom)  
            )
            return true

        return false
    }

    /* istanbul ignore next */
    move(canvas, figures) {
        if (this.isAlive) {
            qt.checkWalls(this, canvas);
            this.CollisionsCheck(figures);

            this.x += this.vx;
            this.y += this.vy;
        }
    }

    /* istanbul ignore next */
    draw(context) {
        if (this.isAlive) {
            context.beginPath();
            context.fillStyle = this.colors[this.collisions];
            context.moveTo(this.topPoint.x, this.topPoint.y);
            for (const p of [this.rightPoint, this.leftPoint, this.topPoint]) {
                context.lineTo(p.x, p.y);
            }
        
            context.fill();
            context.strokeStyle = "black";
            context.lineWidth = 3;
            context.stroke();
            context.closePath();
        }
    }
}