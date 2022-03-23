require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2021/day/10/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  const arr = data.split("\n")
  arr.pop() // remove `""` at the end
  return arr
}

const isOpeningBracket = bracket => {
  switch (bracket) {
    case "[":
    case "(":
    case "{":
    case "<":
      return true
  }
  return false
}

const isClosingBracket = bracket => {
  switch (bracket) {
    case "]":
    case ")":
    case "}":
    case ">":
      return true
  }
  return false
}

const findIllegalCharacter = str => {
  const pair = { "[": "]", "(": ")", "{": "}", "<": ">" }
  const stack = []
  for (const char of str) {
    if (isOpeningBracket(char)) {
      stack.push(char)
    }
    if (isClosingBracket(char)) {
      const top = stack.pop()
      if (pair[top] !== char) {
        return char
      }
    }
  }
  return null
}

const doTheThing = async getArr => {
  const arr = await getArr()
  const illegalCharacters = { "]": 0, ")": 0, "}": 0, ">": 0 }
  for (const str of arr) {
    const illegalCharacter = findIllegalCharacter(str)
    if (illegalCharacter == null) {
      continue
    }
    illegalCharacters[illegalCharacter]++
  }
  const sum =
    illegalCharacters[")"] * 3 +
    illegalCharacters["]"] * 57 +
    illegalCharacters["}"] * 1197 +
    illegalCharacters[">"] * 25137
  return sum
}

doTheThing(() =>
  Promise.resolve([
    "[({(<(())[]>[[{[]{<()<>>",
    "[(()[<>])]({[<{<<[]>>(",
    "{([(<{}[<>[]}>{[]{[(<()>",
    "(((({<>}<{<{<>}{[]{[]{}",
    "[[<[([]))<([[{}[[()]]]",
    "[{[{({}]{}}([{[{{{}}([]",
    "{<[[]]>}<{[{[{[]{()[[[]",
    "[<(<(<(<{}))><([]([]()",
    "<{([([[(<>()){}]>(<<{{",
    "<{([{{}}[<[[[<>{}]]]>[]]",
  ])
).then(console.log)

doTheThing(getInput).then(console.log)
