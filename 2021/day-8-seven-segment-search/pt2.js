require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2021/day/8/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  const arr = data.split("\n")
  arr.pop() // remove `""` at the end
  return arr
}

const makeAllStringsAlphabetical = arr =>
  arr.map(str =>
    str
      .split(" ")
      .map(str => str.split("").sort().join(""))
      .join(" ")
  )

const sortInputStringsByLength = arr =>
  arr.map(str => {
    let [inputs, outputs] = str.split(" | ")
    inputs = inputs
      .split(" ")
      .sort((a, b) => a.length - b.length)
      .join(" ")
    return [inputs, outputs].join(" | ")
  })

const findSixIndex = inputs => {
  const one = inputs[0]
  for (let i = 6; i <= 8; i++) {
    const set = new Set(inputs[i])
    if (!set.has(one[0]) || !set.has(one[1])) {
      return i
    }
  }
}

const findNineIndex = inputs => {
  const four = inputs[2]
  for (let i = 6; i <= 8; i++) {
    let notThisOne = false
    const set = new Set(inputs[i])
    for (const char of four) {
      if (!set.has(char)) {
        notThisOne = true
        break
      }
    }
    if (notThisOne) continue
    return i
  }
}

const findZeroIndex = (sixIndex, nineIndex) => {
  for (let i = 6; i <= 8; i++) {
    if (i !== sixIndex && i !== nineIndex) {
      return i
    }
  }
}

const findUniqueLengthIndexes = inputs => {
  key = {}
  key[inputs[0]] = 1
  key[inputs[1]] = 7
  key[inputs[2]] = 4
  key[inputs[9]] = 8
  return key
}

const findLength6Indexes = (inputs, key) => {
  const sixIndex = findSixIndex(inputs)
  key[inputs[sixIndex]] = 6
  const nineIndex = findNineIndex(inputs)
  key[inputs[nineIndex]] = 9
  const zeroIndex = findZeroIndex(sixIndex, nineIndex)
  key[inputs[zeroIndex]] = 0
  return { key, sixIndex }
}

const findFiveIndex = (inputs, sixIndex) => {
  const sixSet = new Set(inputs[sixIndex])
  for (let i = 3; i <= 5; i++) {
    let notThisOne = false
    for (const char of inputs[i]) {
      if (!sixSet.has(char)) {
        notThisOne = true
        break
      }
    }
    if (notThisOne) continue
    return i
  }
}

const findTwoIndex = (inputs, fiveIndex) => {
  const fiveSet = new Set(inputs[fiveIndex])
  for (let i = 3; i <= 5; i++) {
    if (i === fiveIndex) continue

    let numberCharsTheSame = 0
    for (const char of inputs[i]) {
      if (fiveSet.has(char)) {
        numberCharsTheSame++
      }
    }
    if (numberCharsTheSame === 3) {
      return i
    }
  }
}

const findThreeIndex = (fiveIndex, twoIndex) => {
  for (let i = 3; i <= 5; i++) {
    if (i !== fiveIndex && i !== twoIndex) {
      return i
    }
  }
}

const findLength5Indexes = (inputs, key, sixIndex) => {
  const fiveIndex = findFiveIndex(inputs, sixIndex)
  key[inputs[fiveIndex]] = 5
  const twoIndex = findTwoIndex(inputs, fiveIndex)
  key[inputs[twoIndex]] = 2
  const threeIndex = findThreeIndex(fiveIndex, twoIndex)
  key[inputs[threeIndex]] = 3
  return key
}

const buildKey = str => {
  const inputs = str.split(" | ")[0].split(" ")

  let key = findUniqueLengthIndexes(inputs)
  let sixIndex = -1

  ;({ key, sixIndex } = findLength6Indexes(inputs, key))

  key = findLength5Indexes(inputs, key, sixIndex)

  return key
}

const getOutputs = str => str.split(" | ")[1].split(" ")

const getNumber = (key, outputs) => {
  let numStr = ""
  for (const output of outputs) {
    numStr += key[output].toString()
  }
  return parseInt(numStr)
}

const doTheThing = async getArr => {
  let arr = await getArr()
  arr = makeAllStringsAlphabetical(arr)
  arr = sortInputStringsByLength(arr)
  let outputValuesSum = 0
  for (const str of arr) {
    const key = buildKey(str)
    const outputs = getOutputs(str)
    const number = getNumber(key, outputs)
    outputValuesSum += number
  }
  return outputValuesSum
}

doTheThing(() =>
  Promise.resolve([
    "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf",
  ])
).then(console.log)

doTheThing(() =>
  Promise.resolve([
    "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
    "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
    "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
    "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
    "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
    "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
    "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
    "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
    "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
    "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce",
  ])
).then(console.log)

doTheThing(getInput).then(console.log)

// 0 : 6
// 1 : 2
// 2 : 5
// 3 : 5
// 4 : 4
// 5 : 5
// 6 : 6
// 7 : 3
// 8 : 7
// 9 : 6

// 2 : 1
// 3 : 7
// 4 : 4
// 5 : 2, 3, 5
// 6 : 0, 6, 9
// 7 : 8

// all 1 in 7
// all 7 in 9 and 0
// all 4 in 9
// all 5 in 6
// all 3 in 9

// narrow down 6 using length 6 does not include one of 1's segments
// narrow down 9 using length 6 that totally includes 4
// narrow down 0 using length 6 that is not 6 or 9

// narrow down 5 using 6, minus one segment
// narrow down 2 using 5, 2 segments different
// narrow down 3 using length 5 that is not 2 or 5
