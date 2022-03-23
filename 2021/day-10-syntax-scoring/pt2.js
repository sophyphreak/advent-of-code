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

const getCompletionBrackets = str => {
  const pair = { "[": "]", "(": ")", "{": "}", "<": ">" }
  const stack = []
  for (const char of str) {
    if (isOpeningBracket(char)) {
      stack.push(char)
    }
    if (isClosingBracket(char)) {
      const top = stack.pop()
      if (pair[top] !== char) {
        return []
      }
    }
  }
  const completionBrackets = []
  while (stack.length) {
    const top = stack.pop()
    completionBrackets.push(pair[top])
  }
  return completionBrackets
}

const getScore = brackets => {
  const scores = { ")": 1, "]": 2, "}": 3, ">": 4 }
  let totalScore = 0
  for (const bracket of brackets) {
    totalScore *= 5
    totalScore += scores[bracket]
  }
  return totalScore
}

const doTheThing = async getArr => {
  const arr = await getArr()
  const scores = []
  for (const str of arr) {
    const completionBrackets = getCompletionBrackets(str)
    const score = getScore(completionBrackets)
    if (score === 0) {
      continue
    }
    scores.push(score)
  }
  scores.sort((a, b) => a - b)
  const middle = scores[Math.floor(scores.length / 2)]
  return middle
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
