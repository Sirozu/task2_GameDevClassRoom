import Triangle from './triangle'

describe('Triangle getters', () => {
    it('should calculate borders cortrinly', () => {
        const trin = new Triangle(3, 3, 2)
        expect(trin.left).toBe(1)
        expect(trin.right).toBe(5)
        expect(trin.top).toBe(1)
        expect(trin.bottom).toBe(4)             
    })

    it('should calculate borders cortrinly', () => {
        const trin = new Triangle(3, 3, 2)
        expect(trin.side).toBe(3.464101615137755)          
        expect(trin.height).toBe(3) 
    })
})

describe('Triangle.contains()', () => {
    let trin = new Triangle(3, 3, 2)
    beforeEach(() => {
        const trin = new Triangle(3, 3, 2)
    })

    it('should returns true if point is inside the trin', () => {
        expect(trin.contains({x: 4, y: 3})).toBeTruthy()
    })

    it('should returns false if point located on trins left or top border', () => {
        expect(trin.contains({x: 4, y: 3})).toBeTruthy()
        expect(trin.contains({x: 3, y: 3})).toBeTruthy()
    })

    it('should returns false if point located on trins right or bottom border', () => {
        expect(trin.contains({x: 10, y: 0})).toBeFalsy()
        expect(trin.contains({x: 0, y: 10})).toBeFalsy()
        expect(trin.contains({x: 10, y: 10})).toBeFalsy()
        expect(trin.contains({x: 15, y: 15})).toBeFalsy()
    })

    it('should returns false if point is out of trin', () => {
        expect(trin.contains({x: 10, y: 10})).toBeFalsy()
    })
 })

 
describe('Triangle.intersects()', () => {
    let trin
    beforeEach(() => {
        trin = new Triangle(3, 3, 2)
    })

    it('should returns true if trins are intersected', () => {
        const othertrin = new Triangle(5, 4, 2)
        expect(trin.intersects(othertrin)).toBeTruthy()
    })

    it('should returns true if one trin contains other', () => {
        const othertrin = new Triangle(5, 4, 2)
        expect(trin.intersects(othertrin)).toBeTruthy()
    })

    it('should returns false if trins are not intersected', () => {
        const othertrin = new Triangle(10, 10, 1)
        expect(trin.intersects(othertrin)).toBeFalsy()
    })
})