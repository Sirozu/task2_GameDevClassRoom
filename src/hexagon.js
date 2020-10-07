import * as qt from './quad-tree';

export default class Hexagon {
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

        const fig = new Hexagon(x, y, r);
        fig.id = id;
        fig.vx = vx;
        fig.vy = vy;
        fig.type = qt.FigTypes.Hexagon;

        return fig;
    }
    
    constructor(x, y, r, colors = ["black", "red", "yellow"]) {
        this.x = x;
        this.y = y;
        this.r = r;

        this.collisions = 0;
        this.colors = colors;
    }

    get side() {
        return this.r;
    }

    get smallR() {
        return this.r * Math.sqrt(3) / 2;
    }

    get p1() {
        return { x: this.x, y: this.y - this.r };
    }

    get p2() {
        return { x: this.x + this.smallR, y: this.y - this.r / 2 };
    }

    get p3() {
        return { x: this.x + this.smallR, y: this.y + this.r / 2  };
    }

    get p4() {
        return { x: this.x, y: this.y + this.r };
    }

    get p5() {
        return { x: this.x - this.smallR, y: this.y + this.r / 2  };
    }

    get p6() {
        return { x: this.x - this.smallR, y: this.y - this.r / 2  };
    }

    get left() {
        return this.x - this.smallR;
    }

    get right() {
        return this.x + this.smallR;
    }

    get top() {
        return this.y - this.r;
    }

    get bottom() {
        return this.y + this.r;
    }

    /* istanbul ignore next */
    get isAlive() {
        return this.collisions < 3;
    }

    contains(point) {
        const center = { x: this.x, y: this.y };
        const t1 = qt.pointInTriangle(point, this.p1, this.p2, center);
        const t2 = qt.pointInTriangle(point, this.p2, this.p3, center);
        const t3 = qt.pointInTriangle(point, this.p3, this.p4, center);
        const t4 = qt.pointInTriangle(point, this.p4, this.p5, center);
        const t5 = qt.pointInTriangle(point, this.p5, this.p6, center);
        const t6 = qt.pointInTriangle(point, this.p6, this.p1, center);
        return t1 || t2 || t3 || t4 || t5 || t6;
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

    intersects(h2) {
        if ((this.p1.x <= h2.right && this.p1.x >= h2.left && this.p1.y >= h2.top && this.p1.y <= h2.bottom)  
        || (this.p2.x <= h2.right && this.p2.x >= h2.left && this.p2.y >= h2.top && this.p2.y <= h2.bottom)  
        || (this.p3.x <= h2.right && this.p3.x >= h2.left && this.p3.y >= h2.top && this.p3.y <= h2.bottom)
        || (this.p4.x <= h2.right && this.p4.x >= h2.left && this.p4.y >= h2.top && this.p4.y <= h2.bottom)  
        || (this.p5.x <= h2.right && this.p5.x >= h2.left && this.p5.y >= h2.top && this.p5.y <= h2.bottom)  
        || (this.p6.x <= h2.right && this.p6.x >= h2.left && this.p6.y >= h2.top && this.p6.y <= h2.bottom)    
    )
        return true
    
    return false;
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
            context.moveTo(this.p1.x, this.p1.y);

            context.lineTo(this.p2.x, this.p2.y);
            context.lineTo(this.p3.x, this.p3.y);
            context.lineTo(this.p4.x, this.p4.y);
            context.lineTo(this.p5.x, this.p5.y);
            context.lineTo(this.p6.x, this.p6.y);
            context.lineTo(this.p1.x, this.p1.y);
            
        
            context.fill();
            context.strokeStyle = "black";
            context.lineWidth = 3;
            context.stroke();
            context.closePath();
        }
    }
}