import * as qt from './quad-tree';

export default class Circle {
    /* istanbul ignore next */
    static generate({ width, height }, id) {
        const minR = height / 200;
        const maxR = height / 100;
        const r = minR + Math.random() * (maxR - minR);

        const x = Math.random() * (width - maxR);
        const y = Math.random() * (height - maxR);

        const minV = 2;
        const maxV = 2;
        const vx = minV + Math.random() * (maxV - minV);
        const vy = minV + Math.random() * (maxV - minV);

        const fig = new Circle(x, y, r);
        fig.id = id;
        fig.vx = vx;
        fig.vy = vy;
        fig.type = qt.FigTypes.Circle;

        return fig;
    }

    constructor(x, y, radius, colors = ["black", "red", "yellow"]) {
        this.x = x;
        this.y = y;
        this.r = radius;

        this.colors = colors;
        this.collisions = 0;
    }

    /* istanbul ignore next */
    get isAlive() {
        return this.collisions < 3;
    }

    get left() {
        return this.x - this.r
    }

    get right() {
        return this.x + this.r
    }

    get top() {
        return this.y - this.r
    }

    get bottom() {
        return this.y + this.r
    }

    contains(point) {
        return ((this.x - point.x) * (this.x - point.x) + (this.y - point.y) * (this.y - point.y)) < this.r * this.r;
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

    intersects(circ) {

        const distance = this.distance(this, circ)
        const maxRadius = Math.max(this.r, circ.r)
        // r - this радиус
        // R - circle радиус
        // d - расстояние между центрами
        if ((distance < maxRadius && distance < this.r + circ.r)    // d<R+r две точки пересечения
        || (distance < maxRadius && distance == this.r + circ.r)   // d = r+R касание
        || (distance >= maxRadius && this.r + distance == circ.r)   // d+r = R касание внутри большей окружности
        || (distance >= maxRadius && circ.r + distance == this.r)   // d+R = r касание внутри большей окружности
            )
            return true

        // d < R - r или d+r < R окружность внутри окружности и не имею точек соприкосновения
        // d > r+R окружности не имеют общих точек

        return false
    }

    distance(p1, p2) 
    {
        return Math.sqrt(((p2.x - p1.x) ** 2) + ((p2.y - p1.y) ** 2));
    }

    /* istanbul ignore next */
    move(canvas, figures) {
        qt.checkWalls(this, canvas);
        this.CollisionsCheck(figures);

        this.x += this.vx;
        this.y += this.vy;
    }

    /* istanbul ignore next */
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fillStyle = this.colors[this.collisions];
        context.fill();
        context.strokeStyle = "black";
        context.lineWidth = 3;
        context.stroke();
        context.closePath();
    }
}