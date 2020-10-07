const { default: Rectangle } = require("./rectangle");
const {  default: Circle } = require("./circle");
const {  default: Triangle } = require("./triangle");
const {  default: Hexagon } = require("./hexagon");
const {  default: Point } = require("./point");
import * as qt from "./quad-tree";
import QuadTree from './quad-tree'

describe('QuadTree', () => {
    it('should be empty in the initial state', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)

        expect(tree.length).toBe(0)
    })

    it('should throw an exception when boundary has not been passed', () => {
        expect(() => {
            const tree = new QuadTree()
        }).toThrow(TypeError)
    })

    it('should throw an exception when boundary is not a Rectangle', () => {
        expect(() => {
            const tree = new QuadTree(42)
        }).toThrow(TypeError)
    })

    it('should throw an exception when boundary has not been passed', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        expect(tree.insert({x: 4, y: 1})).toBeTruthy()
        expect(tree.length).toBe(1)
        expect(tree.insert({x: 5, y: 1})).toBeTruthy()
        expect(tree.insert({x: 10, y: 1})).toBeTruthy()
        expect(tree.length).toBe(3)
    })

    it('should throw an exception when boundary has not been 1', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        expect(tree.insert({x: 4, y: 1})).toBeTruthy()
        expect(tree.insert({x: 5, y: 1})).toBeTruthy()
        expect(tree.insert({x: 10, y: 1})).toBeTruthy()
        expect(tree.insert({x: 10, y: 5})).toBeTruthy()
        expect(tree.insert({x: 1, y: 1})).toBeTruthy()
        expect(tree.insert({x: 2, y: 1})).toBeTruthy()
        expect(tree.insert({x: 3, y: 1})).toBeTruthy()
        expect(tree.insert({x: 4, y: 5})).toBeTruthy()
        expect(tree.insert({x: 5, y: 1})).toBeTruthy()
        expect(tree.insert({x: 6, y: 1})).toBeTruthy()
        expect(tree.insert({x: 7, y: 1})).toBeTruthy()
        expect(tree.insert({x: 8, y: 5})).toBeTruthy()
        tree._subdivide();
    })

    it('should throw an exception when boundary has not been 1', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        expect(tree.insert({x: 4, y: 1})).toBeTruthy()
        expect(tree.insert({x: 5, y: 1})).toBeTruthy()
        expect(tree.insert({x: 10, y: 1})).toBeTruthy()
        expect(tree.insert({x: 10, y: 5})).toBeTruthy()
        expect(tree.insert({x: 4, y: 1})).toBeTruthy()
        expect(tree.insert({x: 5, y: 1})).toBeTruthy()
        expect(tree.insert({x: 10, y: 1})).toBeTruthy()
        expect(tree.insert({x: 10, y: 5})).toBeTruthy()
        expect(tree.insert({x: 4, y: 1})).toBeTruthy()
        expect(tree.insert({x: 5, y: 1})).toBeTruthy()
        expect(tree.insert({x: 10, y: 1})).toBeTruthy()
        expect(tree.insert({x: 10, y: 5})).toBeTruthy()
        tree._subdivide();
        tree.clear();
        expect(tree.length).toBe(0)
    })

    ////
    //// Test Figure
    ////
    // true

    it('should throw an exception when boundary has not been 2', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const tri = new Triangle(5, 5, 5);
        const hex = new Hexagon(6,6,6);
        expect(qt.triangleWithHexagon(tri, hex)).toBeTruthy()
    })

    it('should throw an exception when boundary has not been 3', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const cir = new Circle(5, 5, 5);
        const hex = new Hexagon(6,6,6);
        expect(qt.circleWithHexagon(cir, hex)).toBeTruthy()
    })

    it('should throw an exception when boundary has not 4', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const tri = new Triangle(5, 5, 5);
        const cir = new Circle(6,6,6);
        expect(qt.circleWithTriangle(cir, tri)).toBeTruthy()
    })

    it('should throw an exception when boundary has not 5', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const rec = new Rectangle(4, 4, 10, 10);
        const hex = new Hexagon(6,6,6);
        expect(qt.rectWithHexagon(rec, hex)).toBeTruthy()
    })

    it('should throw an exception when boundary has not 6', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const rec = new Rectangle(4, 4, 10, 10);
        const tri = new Triangle(5, 5, 5);
        expect(qt.rectWithTriangle(rec, tri)).toBeTruthy()
    })

    it('should throw an exception when boundary has not 7', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const rec = new Rectangle(4, 4, 10, 10);
        const cir = new Circle(6,6,6);
        expect(qt.rectWithCircle(rec, cir)).toBeTruthy()
    })

    it('should throw an exception when boundary has not 8', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const hex1 = new Hexagon(6,6,6);
        const hex2 = new Hexagon(6,6,6);
        expect(qt.hexagonWithHexagon(hex1, hex2)).toBeTruthy()
    })

    it('should throw an exception when boundary has not 9', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const tri1 = new Triangle(5, 5, 5);
        const tri2 = new Triangle(5, 5, 5);
        expect(qt.triangleWithTriangle(tri1, tri2)).toBeTruthy()
    })

    it('should throw an exception when boundary has not 10', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const cir1 = new Circle(6,6,6);
        const cir2 = new Circle(6,6,6);
        expect(qt.circleWithCircle(cir1, cir2)).toBeTruthy()
    })

    it('should throw an exception when boundary has not 11', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const rec1 = new Rectangle(4, 4, 10, 10);
        const rec2 = new Rectangle(4, 4, 10, 10);
        expect(qt.rectWithRect(rec1, rec2)).toBeTruthy()
    })

    // false

    it('should throw an exception when boundary has not been 2', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const tri = new Triangle(5, 5, 5);
        const hex = new Hexagon(15,15,6);
        expect(qt.triangleWithHexagon(tri, hex)).toBeFalsy()
    })

    it('should throw an exception when boundary has not been 3', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const cir = new Circle(5, 5, 5);
        const hex = new Hexagon(15,15,6);
        expect(qt.circleWithHexagon(cir, hex)).toBeFalsy()
    })

    it('should throw an exception when boundary has not 4', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const tri = new Triangle(5, 5, 5);
        const cir = new Circle(15,15,6);
        expect(qt.circleWithTriangle(cir, tri)).toBeFalsy()
    })

    it('should throw an exception when boundary has not 5', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const rec = new Rectangle(4, 4, 10, 10);
        const hex = new Hexagon(20,20,6);
        expect(qt.rectWithHexagon(rec, hex)).toBeFalsy()
    })

    it('should throw an exception when boundary has not 6', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const rec = new Rectangle(4, 4, 10, 10);
        const tri = new Triangle(515,15, 5);
        expect(qt.rectWithTriangle(rec, tri)).toBeFalsy()
    })

    it('should throw an exception when boundary has not 7', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const rec = new Rectangle(4, 4, 10, 10);
        const cir = new Circle(20,20,6);
        expect(qt.rectWithCircle(rec, cir)).toBeFalsy()
    })

    it('should throw an exception when boundary has not 8', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const hex1 = new Hexagon(6,6,6);
        const hex2 = new Hexagon(20,20,6);
        expect(qt.hexagonWithHexagon(hex1, hex2)).toBeFalsy()
    })

    it('should throw an exception when boundary has not 9', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const tri1 = new Triangle(5, 5, 5);
        const tri2 = new Triangle(15,15, 5);
        expect(qt.triangleWithTriangle(tri1, tri2)).toBeFalsy()
    })

    it('should throw an exception when boundary has not 10', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const cir1 = new Circle(6,6,6);
        const cir2 = new Circle(15,15,6);
        expect(qt.circleWithCircle(cir1, cir2)).toBeFalsy()
    })

    it('should throw an exception when boundary has not 11', () => {
        const boundary = new Rectangle(0, 0, 100, 100)
        const tree = new QuadTree(boundary)
        const rec1 = new Rectangle(4, 4, 10, 10);
        const rec2 = new Rectangle(15,15, 10, 10);
        expect(qt.rectWithRect(rec1, rec2)).toBeFalsy()
    })
})