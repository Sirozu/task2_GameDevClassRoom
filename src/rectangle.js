import * as qt from "./quad-tree";

export default class Rectangle {
    /* istanbul ignore next */
    static generate({width, height}, id) {
        const minW = width / 200;
        const maxW = width / 100;
        const w = minW + Math.random() * (maxW - minW);

        const minH = height / 200;
        const maxH = height / 100;
        const h = minH + Math.random() * (maxH - minH);

        const x = Math.random() * (width - maxW);
        const y = Math.random() * (height - maxH);

        const minV = 2;
        const maxV = 2;
        const vx = minV + Math.random() * (maxV - minV);
        const vy = minV + Math.random() * (maxV - minV);
        const fig = new Rectangle(x, y, w, h);
        fig.id = id;
        fig.vx = vx;
        fig.vy = vy;
        fig.type = qt.FigTypes.Rect;

        return fig;
    }

    constructor(x, y, w, h, colors = ["black", "red", "yellow"]) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.collisions = 0;
        this.colors = colors;
    }

    get left() {
        return this.x
    }

    get right() {
        return this.x + this.w
    }

    get top() {
        return this.y
    }

    get bottom() {
        return this.y + this.h
    }

    /* istanbul ignore next */
    get isAlive() {
        return this.collisions < 3;
    }

    contains(point) {
        return (point.x >= this.x &&
            point.x < this.x + this.w &&
            point.y >= this.y &&
            point.y < this.y + this.h)
    }

    /* istanbul ignore next */
    CollisionsCheck(figures) {
        for (let fig of figures) {
            if (fig.isAlive && fig !== this && qt.intersects(this, fig)) {
                              
                this.collisions += 1;
                this.vx *= -1;
                this.vy *= -1;
            }
        }
    }

    intersects(rect) {
        return (this.x < rect.x + rect.w)
            && (rect.x < this.x + this.w)
            && (this.y < rect.y + rect.h)
            && (rect.y < this.y + this.w)
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
            context.rect(this.left, this.top, this.w, this.h);
            context.fillStyle = this.colors[this.collisions];
            context.fill();
            context.strokeStyle = "black";
            context.lineWidth = 3;
            context.stroke();
            context.closePath();
        }
    }
}