require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2021/day/7/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1).split(",")
}

const toArrOfInts = arr => arr.map(s => +s)

const buildEmptyCrabs = max => {
  const crabs = {}
  for (let i = 0; i <= max; i++) {
    crabs[i] = 0
  }
  return crabs
}

const populateCrabs = (crabs, crabArr) => {
  for (const crab of crabArr) {
    crabs[crab]++
  }
  return crabs
}

const getTotalFuelFromPosition = (crabs, position) => {
  let totalFuel = 0
  for (let p in crabs) {
    p = parseInt(p)
    const distance = Math.abs(position - p)
    totalFuel += distance * crabs[p]
  }
  return totalFuel
}

const doTheThing = async getArr => {
  const arr = await getArr()
  const crabArr = toArrOfInts(arr)
  const max = Math.max(...crabArr)
  let crabs = buildEmptyCrabs(max)
  crabs = populateCrabs(crabs, crabArr)

  let minFuel = 99999999
  // the following section can be optimized by using binary search,
  //  that would change this from O(n^2) time to O(nlog(n)) time
  for (let p in crabs) {
    p = +p
    const currentFuel = getTotalFuelFromPosition(crabs, p)
    minFuel = Math.min(minFuel, currentFuel)
  }
  return minFuel
}

doTheThing(() =>
  Promise.resolve(["16", "1", "2", "0", "4", "2", "7", "1", "2", "14"])
).then(console.log)

doTheThing(getInput).then(console.log)
