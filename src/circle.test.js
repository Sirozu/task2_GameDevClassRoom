import Circle from './circle'

describe('Circle getters', () => {
    it('should calculate borders corcircly', () => {
        const circ = new Circle(5, 5, 5)
        expect(circ.left).toBe(0)
        expect(circ.right).toBe(10)
        expect(circ.top).toBe(0)
        expect(circ.bottom).toBe(10)

        //    0             5                10
        // 0  ┼──────────────○────────────────○
        //    │               
        //    │               
        //    │               
        // 5  ○              ○ (5, 5)         ○
        //    │
        //    │
        //    |
        // 10 |              ○                  
    })
})

describe('Circle.contains()', () => {
    let circ
    beforeEach(() => {
        circ = new Circle(5, 5, 5)
    })

    it('should returns true if point is inside the circ', () => {
        expect(circ.contains({x: 2, y: 2})).toBeTruthy()

        //    0   2          5                10
        // 0  ┼──────────────○────────────────○
        //    │               
        //  2 │    ○          
        //    │               
        // 5  ○              ○ (5, 5)         ○
        //    │
        //    │
        //    |
        // 10 |              ○   
    })

    it('should returns false if point located on circs left or top border', () => {
        expect(circ.contains({x: 5, y: 1})).toBeTruthy()
        expect(circ.contains({x: 1, y: 5})).toBeTruthy()

        //    0             5                10
        // 0  ┼──────────────○────────────────○
        //    │               
        //    │               
        //    │               
        // 5  ○              ○ (5, 5)         ○
        //    │
        //    │
        //    |
        // 10 |              ○   
    })

    it('should returns false if point located on circs right or bottom border', () => {
        expect(circ.contains({x: 10, y: 0})).toBeFalsy()
        expect(circ.contains({x: 0, y: 10})).toBeFalsy()
        expect(circ.contains({x: 10, y: 10})).toBeFalsy()
        expect(circ.contains({x: 1, y: 1})).toBeFalsy()

        //    0  1          5                10
        // 0  ┼──────────────○────────────────○
        //  1 │ ○             
        //    │               
        //    │               
        // 5  ○              ○ (5, 5)         ○
        //    │
        //    │
        //    |
        // 10 ○              ○                ○
    })

    it('should returns false if point is out of circ', () => {
        expect(circ.contains({x: 10, y: 10})).toBeFalsy()

        
        //    0  1          5                10
        // 0  ┼──────────────○────────────────○
        //  1 │             
        //    │               
        //    │               
        // 5  ○              ○ (5, 5)         ○
        //    │
        //    │
        //    |
        // 10 ○              ○                ○
    })
 })

describe('Circle.intersects()', () => {
    let circ
    beforeEach(() => {
        circ = new Circle(5, 5, 5)
    })

    it('should returns true if circs are intersected', () => {
        const othercirc = new Circle(7, 5, 7)
        expect(circ.intersects(othercirc)).toBeTruthy()
    })

    it('should returns true if circs are intersected', () => {
        const othercirc = new Circle(6, 6, 5)
        expect(circ.intersects(othercirc)).toBeTruthy()
    })

    it('should returns true if one circ contains other', () => {
        const othercirc = new Circle(8, 5, 5)
        expect(circ.intersects(othercirc)).toBeTruthy()
    })

    it('should returns false if circs are not intersected', () => {
        const othercirc = new Circle(11, 5, 5)
        expect(circ.intersects(othercirc)).toBeFalsy()
    })
})