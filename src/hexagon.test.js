import Hexagon from './hexagon'

describe('Sixangle getters', () => {
    it('should calculate borders corsangly', () => {
        const sang = new Hexagon(8,8,1)
        expect(sang.left).toBe(7.133974596215562)
        expect(sang.right).toBe(8.86602540378444)
        expect(sang.top).toBe(7)
        expect(sang.bottom).toBe(9)             
    })

    it('should calculate borders corsangly', () => {
        const sang = new Hexagon(8,8,1)
        expect(sang.side).toBe(1)         
    })
})

describe('Sixangle.contains()', () => {
    let sang = new Hexagon(8,8,1)
    beforeEach(() => {
        const sang = new Hexagon(8,8,1)
    })

    it('should returns true if point is inside the sang', () => {
        expect(sang.contains({x: 7.2, y: 8})).toBeTruthy()
    })

    it('should returns false if point located on sangs left or top border', () => {
        expect(sang.contains({x: 7.3, y: 8.1})).toBeTruthy()
        expect(sang.contains({x: 7.5, y: 8.2})).toBeTruthy()
    })

    it('should returns false if point located on sangs right or bottom border', () => {
        expect(sang.contains({x: 10, y: 0})).toBeFalsy()
        expect(sang.contains({x: 0, y: 10})).toBeFalsy()
        expect(sang.contains({x: 10, y: 10})).toBeFalsy()
        expect(sang.contains({x: 3, y: 3})).toBeFalsy()
    })

    it('should returns false if point is out of sang', () => {
        expect(sang.contains({x: 10, y: 10})).toBeFalsy()
    })
})

 
describe('Sixangle.intersects()', () => {
    let sang
    beforeEach(() => {
        sang = new Hexagon(8,8,1)
    })

    it('should returns true if sangs are intersected', () => {
        const othersang = new Hexagon(8,8,2)
        expect(sang.intersects(othersang)).toBeTruthy()
    })

    it('should returns true if one sang contains other', () => {
        const othersang = new Hexagon(8,8,3)
        expect(sang.intersects(othersang)).toBeTruthy()
    })

    it('should returns false if sangs are not intersected', () => {
        const othersang = new Hexagon(15,15,1)
        expect(sang.intersects(othersang)).toBeFalsy()
    })
})