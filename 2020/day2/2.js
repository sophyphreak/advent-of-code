require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/2/input",
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
  const games = []
  for (const line of arr) {
    if (!line.trim()) return
    const [_, meat] = line.split(": ")
    let sets = meat.split("; ")
    sets = sets.map(text => {
      const arr = text.split(", ")
      const amounts = {}
      for (const amount of arr) {
        let [n, color] = amount.split(" ")
        n = +n
        amounts[color] = n
      }
      return amounts
    })
    games.push(sets)
  }
  return games
    .map(game =>
      game.reduce((acc, set) => {
        for (const color in set) {
          if (!(color in acc)) acc[color] = 0
          if (set[color] > acc[color]) acc[color] = set[color]
        }
        return acc
      }, {})
    )
    .map(mins => {
      let power = 1
      for (const color in mins) {
        power *= mins[color]
      }
      return power
    })
    .reduce((acc, cur) => acc + cur, 0)
}

doTheThing(() =>
  Promise.resolve(
    `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`
      .split("\n")
      .map(r => r.trim())
  )
).then(console.log)

// doTheThing(() => Promise.resolve(``.split("\n").map(r => r.trim()))).then(
//   console.log
// )

doTheThing(getInput).then(console.log)
