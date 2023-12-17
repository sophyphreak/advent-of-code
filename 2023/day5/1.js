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
  // for (let k = 0;k< arr2[0][0].length; k+=2) {
  //   let start = arr2[0][0][k]
  //   let end = arr2[0][0][k+1]
  //   for (let m = start; m <= start+end; m++) {
  //     let current = m
  for (let j = 1; j < arr2.length; j++) {
    current = convert(current, arr2[j])
  }
  results.push(current)
  min = Math.min(min, current)
  //   }
  // }
  return min
}

const convert = (n, maps) => {
  for (const map of maps) {
    const [dest, source, len] = map
    if (!(n >= source && n < source + len)) continue
    return n - (source - dest)
  }
  return n
}

doTheThing(() =>
  Promise.resolve(
    `seeds: 79 14 55 13

    seed-to-soil map:
    50 98 2
    52 50 48
    
    soil-to-fertilizer map:
    0 15 37
    37 52 2
    39 0 15
    
    fertilizer-to-water map:
    49 53 8
    0 11 42
    42 0 7
    57 7 4
    
    water-to-light map:
    88 18 7
    18 25 70
    
    light-to-temperature map:
    45 77 23
    81 45 19
    68 64 13  
    
    temperature-to-humidity map:
    0 69 1
    1 0 69
    
    humidity-to-location map:
    60 56 37
    56 93 4`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 46, "1. expected 46 and got " + actual)
)


doTheThing(getInput).then(console.log)
