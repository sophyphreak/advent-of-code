require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2022/day/16/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const buildAdjList = arr => {
  const adjList = {}
  for (const line of arr) {
    let [
      Valve,
      valve,
      has,
      flow,
      rateEqualsNumber,
      tunnels,
      lead,
      to2,
      Values,
      ...to
    ] = line.split(" ")
    to = to.map(v => v.slice(0, 2))
    const rate = +rateEqualsNumber.slice(5, rateEqualsNumber.length - 1)
    adjList[valve] = { rate, to }
  }
  return adjList
}

const buildDistancesInAdjList = adjList => {
  const distances = {}
  for (const vertex in adjList) {
    const q = [{ vertex, distance: 0 }]
    const seen = new Set([vertex])
    distances[vertex] = {}
    while (q.length) {
      const cur = q.shift()
      for (const v of adjList[cur.vertex].to) {
        if (seen.has(v)) continue
        seen.add(v)
        q.push({ vertex: v, distance: cur.distance + 1 })
        distances[vertex][v] = cur.distance + 1
      }
    }
    adjList[vertex].distances = distances[vertex]
  }
  return adjList
}

// const decideWhereToGo = (adjList, current, timeLeft) => {
//   let maxTarget = null
//   let maxRelease = 0
//   for (const target in adjList) {
//     if (target === current) continue
//     const distance = adjList[current].distances[target]
//     const targetRelease = adjList[target].rate
//     const totalRelease = (timeLeft - distance) * targetRelease
//     if (maxRelease === totalRelease) {
//       console.log("tied")
//       console.log("current:", current)
//       console.log("target:", target)
//       console.log("distance:", distance)
//       console.log("totalRelease:", totalRelease)
//       console.log("maxTarget:", maxTarget)
//       console.log("maxRelease:", maxRelease)
//       console.log("")
//     }
//     if (maxRelease < totalRelease) {
//       maxTarget = target
//       maxRelease = totalRelease
//     }
//   }
//   return { target: maxTarget, release: maxRelease }
// }

const buildToVisit = adjList => {
  const toVisit = new Set()
  for (const v in adjList) {
    if (adjList[v].rate) {
      toVisit.add(v)
    }
  }
  return toVisit
}

const memo = {}

const releaseValves = ({
  adjList,
  current,
  timeLeft,
  pressureReleasedSoFar,
  toVisit,
}) => {
  const state = current + timeLeft + [...toVisit].sort((a, b) => a - b).join("")
  // if (state in memo) return memo[state]

  if (!toVisit.size || !timeLeft) return pressureReleasedSoFar

  let maxPressureReleased = 0
  for (const target in adjList) {
    if (!toVisit.has(target)) continue
    const { rate } = adjList[target]
    const distance = adjList[current].distances[target]
    const totalRelease = (timeLeft - distance) * rate
    const newToVist = new Set([...toVisit])
    newToVist.delete(target)
    const pressureReleasedTotal = releaseValves({
      adjList,
      current: target,
      timeLeft: timeLeft - distance - 1,
      pressureReleasedSoFar: pressureReleasedSoFar + totalRelease,
      toVisit: newToVist,
    })
    maxPressureReleased = Math.max(maxPressureReleased, pressureReleasedTotal)
  }
  memo[state] = maxPressureReleased
  return maxPressureReleased
}

const doTheThing = async getArr => {
  const arr = await getArr()
  let adjList = buildAdjList(arr)
  adjList = buildDistancesInAdjList(adjList)
  const toVisit = buildToVisit(adjList)
  const pressureReleased = releaseValves({
    adjList,
    current: "AA",
    timeLeft: 29,
    pressureReleasedSoFar: 0,
    toVisit,
  })
  return pressureReleased
}

doTheThing(() =>
  Promise.resolve(
    `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
      Valve BB has flow rate=13; tunnels lead to valves CC, AA
      Valve CC has flow rate=2; tunnels lead to valves DD, BB
      Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
      Valve EE has flow rate=3; tunnels lead to valves FF, DD
      Valve FF has flow rate=0; tunnels lead to valves EE, GG
      Valve GG has flow rate=0; tunnels lead to valves FF, HH
      Valve HH has flow rate=22; tunnel leads to valve GG
      Valve II has flow rate=0; tunnels lead to valves AA, JJ
      Valve JJ has flow rate=21; tunnel leads to valve II`
      .split("\n")
      .map(r => r.trim())
  )
).then(console.log)

doTheThing(getInput).then(console.log)
