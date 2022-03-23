require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2021/day/6/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1).split(",")
}

const toArrayOfInts = arr => arr.map(s => +s)

const buildEmptyFish = () => {
  const fish = {}
  for (let i = 0; i <= 8; i++) {
    fish[i] = 0
  }
  return fish
}

const buildFish = fishArr => {
  const fish = buildEmptyFish()
  for (const f of fishArr) {
    fish[f]++
  }
  return fish
}

const incrementDay = fish => {
  const babyFish = fish[0]
  const motherFish = fish[0]
  fish[0] = 0
  for (let f = 1; f <= 8; f++) {
    fish[f - 1] = fish[f]
  }
  fish[6] += motherFish
  fish[8] = babyFish
  return fish
}

const incrementDays = (fish, days) => {
  for (let i = 0; i < days; i++) {
    fish = incrementDay(fish)
  }
  return fish
}

const countFish = fish => {
  let totalFish = 0
  for (const f in fish) {
    totalFish += fish[f]
  }
  return totalFish
}

const doTheThing = async (getArr, targetDays) => {
  const arr = await getArr()
  const fishArr = toArrayOfInts(arr)
  let fish = buildFish(fishArr)
  fish = incrementDays(fish, targetDays)
  const totalFish = countFish(fish)
  return totalFish
}

doTheThing(() => Promise.resolve(["3", "4", "3", "1", "2"]), 18).then(
  console.log
)

doTheThing(() => Promise.resolve(["3", "4", "3", "1", "2"]), 80).then(
  console.log
)

doTheThing(getInput, 80).then(console.log)
