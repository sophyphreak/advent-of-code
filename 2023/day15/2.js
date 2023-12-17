require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/15/input",
    {
      headers: {
        Cookie: `session=${process.env.SESSION}`,
      },
    }
  )
  return data.slice(0, data.length - 1).split("\n")
}

const doTheThing = async getArr => {
  let arr = await getArr()
  arr = arr.join("").split(",")
  const boxes = new Array(256).fill(null).map(_ => [])
  for (const s of arr) {
    if (s.includes("-")) {
      const label = s.slice(0, s.length - 1)
      const h = hash(label)
      for (let i = 0; i < boxes[h].length; i++) {
        const content = boxes[h][i]
        if (content.label === label) {
          boxes[h].splice(i, 1)
          break
        }
      }
    } else if (s.includes("=")) {
      const [label, focalLength] = s.split("=")
      const h = hash(label)
      let found = false
      for (let i = 0; i < boxes[h].length; i++) {
        const content = boxes[h][i]
        if (content.label === label) {
          boxes[h][i].focalLength = focalLength
          found = true
          break
        }
      }
      if (found) continue
      boxes[h].push({ label, focalLength })
    }
  }
  let total = 0
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i]
    for (let j = 0; j < box.length; j++) {
      total += (i + 1) * (j + 1) * box[j].focalLength
    }
  }
  return total
}

const hash = s => {
  let current = 0
  for (const c of s) {
    current += c.charCodeAt(0)
    current *= 17
    current %= 256
  }
  return current
}



doTheThing(() =>
  Promise.resolve(
    `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 145, "1. expected 145 and got " + actual)
).then(_ => console.log("finished sample"))

doTheThing(getInput).then(console.log)
