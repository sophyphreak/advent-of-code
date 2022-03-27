require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2021/day/15/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  const arr = data.split("\n")
  arr.pop() // remove `""` at the end
  return arr
}

class Graph {
  constructor() {
    this.nodes = {}
  }
  addNode(node) {
    this.nodes[node.locationStr] = node
  }
}

class Node {
  constructor(value, location) {
    this.value = value
    this.location = location
    this.locationStr = `${location[0]}_${location[1]}`
    this.neighbors = new Set()
    this.parent = null
    this.distance = Infinity // distance from `start`
  }
  updateParent(parent) {
    this.parent = parent
  }
  addNeighbor(locationStr) {
    this.neighbors.add(locationStr)
  }
}

class PriorityQueue {
  constructor() {
    this.nodes = []
    this.nodeDistances = []
  }
  enqueue(enqueuedNodeLocationStr, chitonGraph) {
    const enqueuedNode = chitonGraph[enqueuedNodeLocationStr]
    for (let i = 0; i <= this.nodes.length; i++) {
      if (i === this.nodes.length) {
        this.nodes.push(enqueuedNodeLocationStr)
        this.nodeDistances.push(enqueuedNode.distance)
        break
      }
      if (enqueuedNode.distance > chitonGraph[this.nodes[i]].distance) {
        this.nodes = [
          ...this.nodes.slice(0, i),
          enqueuedNodeLocationStr,
          ...this.nodes.slice(i),
        ]
        this.nodeDistances = [
          ...this.nodes.slice(0, i),
          enqueuedNode.distance,
          ...this.nodes.slice(i),
        ]
        break
      }
    }
  }
  dequeue() {
    this.nodeDistances.pop()
    return this.nodes.pop()
  }
  isEmpty() {
    return this.nodes.length === 0
  }
}

const leftExists = j => j !== 0
const upExists = i => i !== 0
const rightExists = (j, chitonMatrix) => j !== chitonMatrix[0].length - 1
const downExists = (i, chitonMatrix) => i !== chitonMatrix.length - 1

const convertMatrixIntoGraph = chitonMatrix => {
  const chitonGraph = {}
  for (let i = 0; i < chitonMatrix.length; i++) {
    for (let j = 0; j < chitonMatrix[0].length; j++) {
      const isLeft = leftExists(j)
      const isUp = upExists(i)
      const isRight = rightExists(j, chitonMatrix)
      const isDown = downExists(i, chitonMatrix)

      const node = new Node(+chitonMatrix[i][j], [i, j])
      if (isLeft) {
        node.addNeighbor(`${i}_${j - 1}`)
      }
      if (isUp) {
        node.addNeighbor(`${i - 1}_${j}`)
      }
      if (isRight) {
        node.addNeighbor(`${i}_${j + 1}`)
      }
      if (isDown) {
        node.addNeighbor(`${i + 1}_${j}`)
      }
      chitonGraph[node.locationStr] = node
    }
  }
  return chitonGraph
}

const getDistanceFromStartToEnd = (chitonGraph, queue, endPoint) => {
  let current = queue.dequeue()

  while (current !== endPoint) {
    const node = chitonGraph[current]
    node.neighbors.forEach(neighbor => {
      if (
        node.distance + chitonGraph[neighbor].value <
        chitonGraph[neighbor].distance
      ) {
        chitonGraph[neighbor].distance =
          node.distance + chitonGraph[neighbor].value
        chitonGraph[neighbor].parent = node.locationStr
        queue.enqueue(neighbor, chitonGraph)
      }
    })
    current = queue.dequeue()
  }
  return chitonGraph[endPoint].distance
}

const doTheThing = async (getArr, steps) => {
  const chitonMatrix = await getArr()
  const chitronGraph = convertMatrixIntoGraph(chitonMatrix)
  const queue = new PriorityQueue()
  chitronGraph[`0_0`].distance = 0
  queue.enqueue(`0_0`, chitronGraph)
  const endPoint = `${chitonMatrix.length - 1}_${chitonMatrix[0].length - 1}`
  const distance = getDistanceFromStartToEnd(chitronGraph, queue, endPoint)
  // while currentNode !== endNode
  //  update neighbor nodes' distances from startNode
  //  if you update a distance, enqueue it
  // let currentNode = chitronGraph[endPoint]
  // while (currentNode.parent) {
  //   console.log(currentNode.locationStr, ":", currentNode.value)
  //   currentNode = chitronGraph[currentNode.parent]
  // }
  return distance
}

doTheThing(() =>
  Promise.resolve([
    "1163751742",
    "1381373672",
    "2136511328",
    "3694931569",
    "7463417111",
    "1319128137",
    "1359912421",
    "3125421639",
    "1293138521",
    "2311944581",
  ])
).then(console.log)

doTheThing(getInput).then(console.log)
