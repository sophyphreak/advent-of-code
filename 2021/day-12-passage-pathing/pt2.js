require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2021/day/12/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  const arr = data.split("\n")
  arr.pop() // remove `""` at the end
  return arr
}

// use DFS to get every possible path from start to end, use recursion
// use adjacency list, which can be looped through easily to get every possible next place to go
// need to pass `seen` **set** around to keep track of having visited start, small caves
// sets need to be copied immediately when they enter a function, otherwise mutations will affect outside function

// global variable, some other parts of the code exist solely for debugging

// GLOBAL VARIABLE
finishedPaths = []

const buildAdjacencyList = arr => {
  const adjacencyList = new Map()

  for (const str of arr) {
    const [a, b] = str.split("-")

    // add b to a's list
    if (adjacencyList.has(a)) {
      const list = adjacencyList.get(a)
      list.add(b)
      adjacencyList.set(a, list)
    } else {
      adjacencyList.set(a, new Set([b]))
    }

    // add a to b's list
    if (adjacencyList.has(b)) {
      const list = adjacencyList.get(b)
      list.add(a)
      adjacencyList.set(b, list)
    } else {
      adjacencyList.set(b, new Set([a]))
    }
  }

  return adjacencyList
}

const isSmallCave = destination => destination === destination.toLowerCase()

const depthFirstSearch = ({
  position = "start",
  adjacencyList,
  seen = new Set(),
  paths = 0,
  currentPath = ["start"],
  isRevisitedOneSmallCaveAlready = false,
}) => {
  if (seen.has(position)) {
    isRevisitedOneSmallCaveAlready = true
  }
  if (isSmallCave(position)) {
    seen.add(position)
  }
  if (position === "end") {
    finishedPaths.push(currentPath.join())

    return paths + 1
  }

  let list = adjacencyList.get(position)
  for (const destination of list) {
    if (destination === "start") {
      continue
    }
    if (seen.has(destination) && isRevisitedOneSmallCaveAlready) {
      continue
    }
    paths = depthFirstSearch({
      position: destination,
      adjacencyList,
      seen: new Set(seen), // to avoid affecting other pathfinding
      paths,
      currentPath: currentPath.concat(destination), // to avoid affecting other pathfinding
      isRevisitedOneSmallCaveAlready,
    })
  }
  return paths
}

const doTheThing = async getArr => {
  const arr = await getArr()
  const adjacencyList = buildAdjacencyList(arr)
  const paths = depthFirstSearch({ adjacencyList })
  return paths
}

doTheThing(() =>
  Promise.resolve(["start-A", "start-b", "A-b", "A-c", "b-d", "A-end", "b-end"])
).then(console.log)

doTheThing(() =>
  Promise.resolve([
    "dc-end",
    "HN-start",
    "start-kj",
    "dc-start",
    "dc-HN",
    "LN-dc",
    "HN-end",
    "kj-sa",
    "kj-HN",
    "kj-dc",
  ])
).then(console.log)

doTheThing(() =>
  Promise.resolve([
    "fs-end",
    "he-DX",
    "fs-he",
    "start-DX",
    "pj-DX",
    "end-zg",
    "zg-sl",
    "zg-pj",
    "pj-he",
    "RW-he",
    "fs-DX",
    "pj-RW",
    "zg-RW",
    "start-pj",
    "he-WI",
    "zg-he",
    "pj-fs",
    "start-RW",
  ])
).then(console.log)

doTheThing(getInput).then(console.log)
