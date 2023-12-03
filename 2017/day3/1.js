const doTheThing = num => {
  if (num === 1) return 0
  if (num === 2) return 1
  let i = 0
  let j = 1
  let current = 2
  const visited = new Set([c(0, 0), c(0, 1)])
  let dir = "N"
  while (current < num) {
    if (dir === "E" && visited.has(c(i - 1, j))) j++
    else if (dir === "E") {
      dir = "N"
      i--
    } else if (dir === "N" && visited.has(c(i, j - 1))) i--
    else if (dir === "N") {
      dir = "W"
      j--
    } else if (dir === "W" && visited.has(c(i + 1, j))) j--
    else if (dir === "W") {
      dir = "S"
      i++
    } else if (dir === "S" && visited.has(c(i, j + 1))) i++
    else if (dir === "S") {
      dir = "E"
      j++
    }
    visited.add(c(i, j))
    current++
  }
  return Math.abs(i) + Math.abs(j)
}

const c = (i, j) => `${i}_${j}`

let actual = doTheThing(1)
let expected = 0
console.assert(
  actual === expected,
  `1. expected: ${expected}, but received: ${actual}`
)

actual = doTheThing(12)
expected = 3
console.assert(
  actual === expected,
  `2. expected: ${expected}, but received: ${actual}`
)

actual = doTheThing(23)
expected = 2
console.assert(
  actual === expected,
  `3. expected: ${expected}, but received: ${actual}`
)

actual = doTheThing(1024)
expected = 31
console.assert(
  actual === expected,
  `4. expected: ${expected}, but received: ${actual}`
)

console.log("Answer:", doTheThing(361527))
