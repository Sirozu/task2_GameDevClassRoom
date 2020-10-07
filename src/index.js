const { default: Rectangle } = require("./rectangle");
const {  default: Circle } = require("./circle");
const {  default: Triangle } = require("./triangle");
const {  default: Hexagon } = require("./hexagon");
const {  default: Point } = require("./point");
const { default: QuadTree } = require("./quad-tree");
import * as qt from "./quad-tree";

const N = 100;

const canvas = document.getElementById("cnvs");

const mainRectangle = new Rectangle(0, 0, canvas.width + 2000, canvas.height + 2000);
let particles = [];
let tree = new QuadTree(mainRectangle, 4);

const obstacleUp = new Rectangle(0, 0, canvas.width, 10);
const obstacleDown = new Rectangle(0, canvas.height - 10, canvas.width, 10);
const obstacleLeft = new Rectangle(0, 0, 10, canvas.height);
const obstacleRight = new Rectangle(canvas.width - 10, 0, 10, canvas.height);

const gameState = {};

function queueUpdates(numTicks) {
    for (let i = 0; i < numTicks; i++) {
        gameState.lastTick = gameState.lastTick + gameState.tickLength
        update(gameState.lastTick)
    }
}

function draw(tFrame) {
    const context = canvas.getContext('2d');

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)

    // draw
    drawFigures(context);

    //draw tree
    tree.draw(context);
}

function drawFigures(context) {
    for (let fig of gameState.figures) {
        fig.draw(context);
    }
}

function update(tick) {
    cleareFigures();
    updateQuadTree();
    moveFigures();
}

function updateQuadTree()
{
    particles = gameState.figures
    //console.log(particles)
    //console.log(tree)
    //console.log(gameState.figures)
    const quadTree = new QuadTree(mainRectangle, 4);
    for(let particle of particles)
    {
        let point = new Point(particle.x, particle.y, particle)
        quadTree.insert(point);
    }

    for(let particle of particles)
    {
        if(particle instanceof Rectangle)
        {
            let range = new Rectangle(particle.x, particle.y, particle.w, particle.h)
            let point = quadTree.queryRange(range);
            for(let points of point)
            {
                let other = points.figure;
                if(particle != other && qt.intersects(particle, other))// particle.CollisionsCheck(other))
                {
                    particles.color = "blue";
                }
            }
        }

        if(particle instanceof Triangle)
        {
            let range = new Triangle(particle.x, particle.y, particle.r);
            let point = quadTree.queryRange(range);
            for(let points of point)
            {
                let other = points.figure;
                if(particle != other && qt.intersects(particle, other))
                {
                    particles.color = "blue";
                }
            }
        }

        if(particle instanceof Circle)
        {
            let range = new Circle(particle.x, particle.y, particle.r);
            let point = quadTree.queryRange(range);
            for(let points of point)
            {
                let other = points.figure;
                if(particle != other && qt.intersects(particle, other))
                {
                    particles.color = "blue";
                }
            }
        }

        if(particle instanceof Hexagon)
        {
            let range = new Hexagon(particle.x, particle.y, particle.r);
            let point = quadTree.queryRange(range);
            for(let points of point)
            {
                let other = points.figure;
                if(particle != other && qt.intersects(particle, other))
                {
                    particles.color = "blue";
                }
            }
        }
    }
    tree = quadTree;
}

function cleareFigures() {
    if (gameState.figures.length > 0) {
        gameState.figures = gameState.figures.filter(fig => fig.isAlive)
    }
}

function moveFigures() {
    for (let fig of gameState.figures) {
        fig.move(canvas, gameState.figures);
    }
}

function run(tFrame) {
    gameState.stopCycle = window.requestAnimationFrame(run)

    const nextTick = gameState.lastTick + gameState.tickLength
    let numTicks = 0

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - gameState.lastTick
        numTicks = Math.floor(timeSinceTick / gameState.tickLength)
    }
    queueUpdates(numTicks)
    draw(tFrame)
    gameState.lastRender = tFrame
}

function stopGame(handle) {
    window.cancelAnimationFrame(handle);
}

function setup() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.lastRender = gameState.lastTick
    gameState.tickLength = 15 //ms
    gameState.figures = [];

    for (let i = 0; i < N; ++i) {
        let circ = Circle.generate(canvas, "circ"+i);
        let rect = Rectangle.generate(canvas, "rect"+i);
        let trin = Triangle.generate(canvas, "tria"+i);
        let hexa = Hexagon.generate(canvas, "hexa"+i);

        gameState.figures.push(circ);
        gameState.figures.push(rect);
        gameState.figures.push(trin);
        gameState.figures.push(hexa);
        particles.push(circ);
        particles.push(rect);
        particles.push(trin);
        particles.push(hexa);
    }
}

setup();
run();
