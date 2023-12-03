const doTheThing = num => {
  let i = 0
  let j = 1
  const visited = { [c(0, 0)]: 1, [c(0, 1)]: 1 }
  let dir = "N"
  let current = 1
  while (current <= num) {
    if (dir === "E" && c(i - 1, j) in visited) j++
    else if (dir === "E") {
      dir = "N"
      i--
    } else if (dir === "N" && c(i, j - 1) in visited) i--
    else if (dir === "N") {
      dir = "W"
      j--
    } else if (dir === "W" && c(i + 1, j) in visited) j--
    else if (dir === "W") {
      dir = "S"
      i++
    } else if (dir === "S" && c(i, j + 1) in visited) i++
    else if (dir === "S") {
      dir = "E"
      j++
    }
    visited[c(i, j)] =
      (visited[c(i - 1, j)] ?? 0) +
      (visited[c(i - 1, j - 1)] ?? 0) +
      (visited[c(i, j - 1)] ?? 0) +
      (visited[c(i + 1, j - 1)] ?? 0) +
      (visited[c(i + 1, j)] ?? 0) +
      (visited[c(i + 1, j + 1)] ?? 0) +
      (visited[c(i, j + 1)] ?? 0) +
      (visited[c(i - 1, j + 1)] ?? 0)
    current = visited[c(i, j)]
  }
  return current
}

const c = (i, j) => `${i}_${j}`

let actual = doTheThing(1)
let expected = 2
console.assert(
  actual === expected,
  `1. expected: ${expected}, but received: ${actual}`
)

actual = doTheThing(12)
expected = 23
console.assert(
  actual === expected,
  `2. expected: ${expected}, but received: ${actual}`
)

actual = doTheThing(23)
expected = 25
console.assert(
  actual === expected,
  `3. expected: ${expected}, but received: ${actual}`
)

actual = doTheThing(747)
expected = 806
console.assert(
  actual === expected,
  `4. expected: ${expected}, but received: ${actual}`
)

console.log("Answer:", doTheThing(361527))
