import { default as Rectangle } from './rectangle.js'

export default class QuadTree {
    constructor(boundary, capacity = 4) {
        if (!boundary) {
            throw TypeError('boundary is null or undefined')
        }

        if (!(boundary instanceof Rectangle)) {
            throw TypeError('boundary should be a Rectangle')
        }

        this._points = [];
        this._boundary = boundary;
        this._capacity = capacity;
        this._hasChildren = false;
        this._children = [];
    }

    insert(point) {
        if (!this._boundary.contains(point)) {
            return false;
        }
        if (this._points.length <= this._capacity) {
            this._points.push(point);
            return true;
        } else {
            if (!this._hasChildren) {
                this._subdivide();
            }
            if (this.topLeft.insert(point)) {
                return true;
            }
            if (this.topRight.insert(point)) {
                return true;
            }
            if (this.bottomLeft.insert(point)) {
                return true;
            } 
            if (this.bottomRight.insert(point)) { 
                return true;
            }
        }
        return false;
    }

    _subdivide() {

        let x = this._boundary.x;
        let y = this._boundary.y;
        let w = this._boundary.w;
        let h = this._boundary.h;

        let rectangleTopLeft = new Rectangle(x, y, w / 2, h / 2);
        let rectangleTopRight = new Rectangle(x + w / 2, y, w / 2, h / 2);
        let rectangleBottomLeft = new Rectangle(x, y + h / 2, w / 2, h / 2);
        let rectangleBottomRight = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);

        this.topLeft = new QuadTree(rectangleTopLeft, this._capacity);
        this.topRight = new QuadTree(rectangleTopRight, this._capacity);
        this.bottomLeft = new QuadTree(rectangleBottomLeft, this._capacity);
        this.bottomRight = new QuadTree(rectangleBottomRight, this._capacity);

        this._children.push(this.topLeft, this.topRight, this.bottomLeft, this.bottomRight); 
        this._hasChildren = true;
    }

    get length() {
        let count = this._points.length
        if (this._hasChildren) {
            // handle childrens somehow
        }
        return count
    }

    /* istanbul ignore next */
    draw(context, color = "darkmagenta") {
        context.beginPath();
        context.strokeStyle = color;
        context.rect(this._boundary.x, this._boundary.y, this._boundary.w, this._boundary.h);
        context.stroke();
        if (this._hasChildren) {
            this.topLeft.draw(context, color);
            this.topRight.draw(context, color);
            this.bottomLeft.draw(context, color);
            this.bottomRight.draw(context, color);
        }
        context.closePath();
    }

    /* istanbul ignore next */
    queryRange(rect, found) {
        if (!found) {
            found = [];
        }
        if (!this._boundary.intersects(rect)) {
            return found;
        }
        for (let point of this._points) {
            if (rect.contains(point)) {
                found.push(point);
            }
        }
        if (this._hasChildren){
            this.topLeft.queryRange(rect, found);
            this.topRight.queryRange(rect, found);
            this.bottomLeft.queryRange(rect, found);
            this.bottomRight.queryRange(rect, found);
        }
        return found; 
    }


    clear() {
        // clear _points and _children arrays
        // see https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
        this._points = []
        this._children = []
        this._hasChildren = false
    }
}


export const FigTypes = { Rect: 0, Circle: 1, Triangle: 2, Hexagon: 3 };

/* istanbul ignore next */
export function checkWalls(fig, { width, height }) {
    checkLeftWall(fig);
    checkTopWall(fig);
    checkRightWall(fig, width);
    checkBottomWall(fig, height);
}
/* istanbul ignore next */
export function checkLeftWall(fig) {
    if (fig.left <= 0) {
        fig.vx *= -1;
    }
}
/* istanbul ignore next */
export function checkTopWall(fig) {
    if (fig.top <= 0) {
        fig.vy *= -1;
    }
}
/* istanbul ignore next */
export function checkRightWall(fig, width) {
    if (fig.right >= width) {
        fig.vx *= -1;
    }
}
/* istanbul ignore next */
export function checkBottomWall(fig, height) {
    if (fig.bottom >= height) {
        fig.vy *= -1;
    }
}

export function rectWithRect(r1, r2) {
    return (r1.x < r2.x + r2.w
        && r1.x + r1.w > r2.x
        && r1.y < r2.y + r2.h
        && r1.y + r1.h > r2.y);
}

export function circleWithCircle(c1, c2) {
    var dx = c1.x - c2.x;
    var dy = c1.y - c2.y;
    var distance = Math.sqrt(dx*dx + dy*dy);
    return (distance < c1.r + c2.r);
}

export function triangleWithTriangle(t1, t2) {
    if ((t1.leftPoint.x <= t2.right && t1.leftPoint.x >= t2.left && t1.leftPoint.y >= t2.top && t1.leftPoint.y <= t2.bottom)  
    || (t1.topPoint.x <= t2.right && t1.topPoint.x >= t2.left && t1.topPoint.y >= t2.top && t1.topPoint.y <= t2.bottom)  
    || (t1.rightPoint.x <= t2.right && t1.rightPoint.x >= t2.left && t1.rightPoint.y >= t2.top && t1.rightPoint.y <= t2.bottom)  
    )
        return true

    return false
}

export function hexagonWithHexagon(h1, h2) {
    if ((h1.p1.x <= h2.right && h1.p1.x >= h2.left && h1.p1.y >= h2.top && h1.p1.y <= h2.bottom)  
    || (h1.p2.x <= h2.right && h1.p2.x >= h2.left && h1.p2.y >= h2.top && h1.p2.y <= h2.bottom)  
    || (h1.p3.x <= h2.right && h1.p3.x >= h2.left && h1.p3.y >= h2.top && h1.p3.y <= h2.bottom)
    || (h1.p4.x <= h2.right && h1.p4.x >= h2.left && h1.p4.y >= h2.top && h1.p4.y <= h2.bottom)  
    || (h1.p5.x <= h2.right && h1.p5.x >= h2.left && h1.p5.y >= h2.top && h1.p5.y <= h2.bottom)  
    || (h1.p6.x <= h2.right && h1.p6.x >= h2.left && h1.p6.y >= h2.top && h1.p6.y <= h2.bottom)    
)
    return true

return false;
}

export function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

export function rectWithCircle(r, c) {
    let closestX = clamp(c.x, r.x, r.x + r.w);
    let closestY = clamp(c.y, r.y, r.y + r.h);
    let dx = c.x - closestX;
    let dy = c.y - closestY;

    return (dx*dx + dy*dy) < (c.r * c.r);
}

export function rectWithTriangle(r, t) {
    if ((t.leftPoint.x <= r.right && t.leftPoint.x >= r.left && t.leftPoint.y >= r.top && t.leftPoint.y <= r.bottom)  
    || (t.topPoint.x <= r.right && t.topPoint.x >= r.left && t.topPoint.y >= r.top && t.topPoint.y <= r.bottom)  
    || (t.rightPoint.x <= r.right && t.rightPoint.x >= r.left && t.rightPoint.y >= r.top && t.rightPoint.y <= r.bottom)  
    )
        return true

    return false
}

export function rectWithHexagon(r, h) {
    if ((h.p1.x <= r.right && h.p1.x >= r.left && h.p1.y >= r.top && h.p1.y <= r.bottom)  
    || (h.p2.x <= r.right && h.p2.x >= r.left && h.p2.y >= r.top && h.p2.y <= r.bottom)  
    || (h.p3.x <= r.right && h.p3.x >= r.left && h.p3.y >= r.top && h.p3.y <= r.bottom)
    || (h.p4.x <= r.right && h.p4.x >= r.left && h.p4.y >= r.top && h.p4.y <= r.bottom)  
    || (h.p5.x <= r.right && h.p5.x >= r.left && h.p5.y >= r.top && h.p5.y <= r.bottom)  
    || (h.p6.x <= r.right && h.p6.x >= r.left && h.p6.y >= r.top && h.p6.y <= r.bottom)    
)
    return true

return false;
}

export function circleWithTriangle(c, t) {
    let dist1 = distance(c, t.leftPoint)  < c.r
    let dist2 = distance(c, t.rightPoint)  < c.r
    let dist3 = distance(c, t.topPoint)  < c.r
    let dist4 = distance(c, t) < c.r + t.r

    return dist1 || dist2 || dist3 || dist4;
}


function distance(p1, p2) 
{
    return Math.sqrt(((p2.x - p1.x) ** 2) + ((p2.y - p1.y) ** 2));
}

export function circleWithHexagon(c, h) {
    let dist1 = distance(c, h.p1)  < c.r
    let dist2 = distance(c, h.p2)  < c.r
    let dist3 = distance(c, h.p3)  < c.r
    let dist4 = distance(c, h.p4)  < c.r
    let dist5 = distance(c, h.p5)  < c.r
    let dist6 = distance(c, h.p6)  < c.r

    return dist1 || dist2 || dist3 || dist4 || dist5 || dist6;
}

export function triangleWithHexagon(t, h) {
    if ((h.p1.x <= t.right && h.p1.x >= t.left && h.p1.y >= t.top && h.p1.y <= t.bottom)  
    || (h.p2.x <= t.right && h.p2.x >= t.left && h.p2.y >= t.top && h.p2.y <= t.bottom)  
    || (h.p3.x <= t.right && h.p3.x >= t.left && h.p3.y >= t.top && h.p3.y <= t.bottom)
    || (h.p4.x <= t.right && h.p4.x >= t.left && h.p4.y >= t.top && h.p4.y <= t.bottom)  
    || (h.p5.x <= t.right && h.p5.x >= t.left && h.p5.y >= t.top && h.p5.y <= t.bottom)  
    || (h.p6.x <= t.right && h.p6.x >= t.left && h.p6.y >= t.top && h.p6.y <= t.bottom)    
)
    return true

return false;
}

/* istanbul ignore next */
export function intersects(fig1, fig2) {
    switch (fig1.type) {
        case FigTypes.Rect: {
            switch (fig2.type) {
                case FigTypes.Rect: {
                    return rectWithRect(fig1, fig2);
                }
                case FigTypes.Circle: {
                    return rectWithCircle(fig1, fig2);
                }
                case FigTypes.Triangle: {
                    return rectWithTriangle(fig1, fig2);
                }
                case FigTypes.Hexagon: {
                    return rectWithHexagon(fig1, fig2);
                }
            }
        }
        case FigTypes.Circle: {
            switch (fig2.type) {
                case FigTypes.Rect: {
                    return rectWithCircle(fig2, fig1);
                }
                case FigTypes.Circle: {
                    return circleWithCircle(fig1, fig2);
                }
                case FigTypes.Triangle: {
                    return circleWithTriangle(fig1, fig2);
                }
                case FigTypes.Hexagon: {
                    return circleWithHexagon(fig1, fig2);
                }
            }
        }
        case FigTypes.Triangle: {
            switch (fig2.type) {
                case FigTypes.Rect: {
                    return rectWithTriangle(fig2, fig1);
                }
                case FigTypes.Circle: {
                    return circleWithTriangle(fig2, fig1);
                }
                case FigTypes.Triangle: {
                    return triangleWithTriangle(fig1, fig2);
                }
                case FigTypes.Hexagon: {
                    return triangleWithHexagon(fig1, fig2);
                }
            }
        }
        case FigTypes.Hexagon: {
            switch (fig2.type) {
                case FigTypes.Rect: {
                    return rectWithHexagon(fig2, fig1);
                }
                case FigTypes.Circle: {
                    return circleWithHexagon(fig2, fig1);
                }
                case FigTypes.Triangle: {
                    return triangleWithHexagon(fig2, fig1);
                }
                case FigTypes.Hexagon: {
                    return hexagonWithHexagon(fig1, fig2);
                }
            }
        }
    }
}

export function sign(p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

export function pointInTriangle(pt, v1, v2, v3) {
    const d1 = sign(pt, v1, v2);
    const d2 = sign(pt, v2, v3);
    const d3 = sign(pt, v3, v1);
    const has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    const has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

    return !(has_neg && has_pos);
}