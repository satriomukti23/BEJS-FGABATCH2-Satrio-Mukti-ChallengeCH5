const GREETING = require('../utils/hello.utils')

test('Greeting Funcion Test', () => {
    expect (GREETING("Rio")).toBe("Hello, Rio")
})

