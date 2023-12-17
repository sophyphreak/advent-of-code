require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/5/input",
    {
      headers: {
        Cookie: `session=${process.env.SESSION}`,
      },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const doTheThing = async getArr => {
  const arr = await getArr()
  let arr2 = [[]]
  for (const line of arr) {
    if (line === "") {
      arr2.push([])
      continue
    }
    arr2[arr2.length - 1].push(line)
  }
  arr2[0][0] = arr2[0][0].slice(7)
  for (let i = 1; i < arr2.length; i++)   arr2[i].shift()
  arr2 = arr2.map(a => a.map(s => s.split(/[ ]+/).map(s => +s)))

  let min = Infinity
  const results = []
  const seedRanges = []
  for (let k = 0; k < arr2[0][0].length; k += 2) {
    let start = arr2[0][0][k]
    let len = arr2[0][0][k + 1]
    seedRanges.push([start, len])
  }
  let current = seedRanges
  for (let j = 1; j < arr2.length; j++) {
    current = convert(current, arr2[j])
    console.log(current)
  }
  return current.sort((a, b) => a[0] - b[0])[0][0]
}

const convert = (arr, maps) => {
  if (!arr.length) return []
  let convertable = []
  for (const [source1Start, sourceLength] of arr) {
    if (!sourceLength) continue
    let found = false
    for (const map of maps) {
      const [destinationStart, source2Start, destSourceLen] = map
      if (source1Start + sourceLength <= source2Start) continue
      if (source1Start >= source2Start + destSourceLen) continue
      if (source2Start <= source1Start && (source1Start + sourceLength <= source2Start + destSourceLen)) { // seed enveloped
        convertable.push([source1Start, sourceLength])
        found = true
        continue
      }
      if (source1Start <= source2Start && source1Start + sourceLength > source2Start && (source1Start + sourceLength < source2Start + destSourceLen)) { // seed leans left
        convertable.push(...convert([[source1Start, sourceLength - (source2Start - source1Start)]], maps))
        if (false) {
          throw new Error()
        }
        convertable.push([source2Start, source2Start - source1Start])
        if (false) {
          throw new Error()
        }
        if (sourceLength - (source2Start - source1Start) + (source2Start - source1Start) !== sourceLength) {
          throw new Error()
        }
        found = true
        continue
      }
      if (source2Start <= source1Start && source2Start + destSourceLen > source1Start && (source2Start + destSourceLen <= source1Start + sourceLength)) { // seed leans right
        convertable.push([source1Start, (source2Start + destSourceLen) - source1Start])
        if (false) {
          throw new Error()
        }
        convertable.push(...convert([[source1Start + source1Start - source2Start, sourceLength - ((source2Start + destSourceLen) - source1Start)]], maps))
        if (false) {
          throw new Error()
        }
        if ((source1Start - source2Start) + sourceLength - (source1Start - source2Start) !== sourceLength) {
          throw new Error()
        }
        found = true
        continue
      }
      convertable.push(...convert([[source1Start, source2Start - source1Start]], maps))
      if (false) {
        throw new Error()
      }
      convertable.push([source2Start, destSourceLen])
      convertable.push(...convert([[source1Start + destSourceLen, sourceLength - (source1Start - source2Start) - destSourceLen]], maps))
      if (false) {
        throw new Error()
      }
      found = true
    }
    if (!found) convertable.push([source1Start, sourceLength])
  }
  const results = []
  // do actual conversion
  for (const [source1Start, sourceLength] of convertable) {
    let result = null
    for (const map of maps) {
      const [destinationStart, source2Start, destSourceLen] = map
      if (!(source1Start >= source2Start && source1Start < source2Start + destSourceLen)) continue
      result = source1Start - (source2Start - destinationStart)
    }
    result ??= source1Start
    results.push([result, sourceLength])
  }
  return results
}


// doTheThing(() =>
//   Promise.resolve(
//     `seeds: 79 14 55 13

//     seed-to-soil map:
//     50 98 2
//     52 50 48

//     soil-to-fertilizer map:
//     0 15 37
//     37 52 2
//     39 0 15

//     fertilizer-to-water map:
//     49 53 8
//     0 11 42
//     42 0 7
//     57 7 4

//     water-to-light map:
//     88 18 7
//     18 25 70

//     light-to-temperature map:
//     45 77 23
//     81 45 19
//     68 64 13  

//     temperature-to-humidity map:
//     0 69 1
//     1 0 69

//     humidity-to-location map:
//     60 56 37
//     56 93 4`
//       .split("\n")
//       .map(r => r.trim())
//   )
// ).then(actual =>
//   console.assert(actual === 46, "1. expected 46 and got " + actual)
// )

doTheThing(getInput).then(console.log)
