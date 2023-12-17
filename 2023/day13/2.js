require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/13/input",
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
  let result = 0
  let current = []
  const answers = []
  for (let i = 0; i < arr.length; i++) {
    const line = arr[i]
    if (line === "" || i === arr.length - 1) {
      let found = false
      for (let i = 0; i < current.length; i++) {
        for (let j = 1; j < current.length; j++) {
          const copy1 = current.slice()
          const copy2 = current.slice()
          if (current[i].split("").reduce((acc, cur, index) => cur === current[j][index] ? acc : acc + 1, 0) === 1) {
            copy1[i] = current[j]
            copy2[j] = current[i]
            let k = i
            let m = j
            let save = null
            while (copy1[k] === copy1[m]) {
              k++
              m--
              if (m === k - 1) save = k
              if (m < 0 || k === copy1.length) {
                if (!save) break
                result += 100 * save
                answers.push([save, "h"])
                found = true
                break
              }
            }
            k = i
            m = j
            if (found) break
            while (copy2[k] === copy2[m]) {
              k++
              m--
              if (m === k - 1) save = k
              if (m < 0 || k === copy2.length) {
                if (!save) break
                result += 100 * save
                answers.push([save, "h"])
                found = true
                break
              }
            }
          }
        }
        if (found) break
      }
      for (let i = 0; i < current[0].length; i++) {
        if (found) break
        for (let j = 1; j < current[0].length; j++) {
          let copy1 = current.slice()
          let copy2 = current.slice()
          const a = current.reduce((acc, cur) => acc + cur[i], "")
          const b = current.reduce((acc, cur) => acc + cur[j], "")
          if (a.split("").reduce((acc, cur, index) => cur === b[index] ? acc : acc + 1, 0) === 1) {
            copy1 = current.map((row, rowIndex) => row.split("").map((c, index) => index === i ? current[rowIndex][j] : c).join(""))
            copy2 = current.map((row, rowIndex) => row.split("").map((c, index) => index === j ? current[rowIndex][i] : c).join(""))
            let k = i
            let m = j
            let save = null
            while (copy1.reduce((acc, cur) => acc + cur[k], "") === copy1.reduce((acc, cur) => acc + cur[m], "")) {
              k++
              m--
              if (m === k - 1) save = k
              if (m < 0 || k === copy1[0].length) {
                result += save
                answers.push([save, "v"])
                found = true
                break
              }
            }
            if (found) break
            k = i
            m = j
            while (copy2.reduce((acc, cur) => acc + cur[k], "") === copy2.reduce((acc, cur) => acc + cur[m], "")) {
              k++
              m--
              if (m === k - 1) save = k
              if (m < 0 || k === copy2[0].length) {
                result += save
                answers.push([save, "v"])
                found = true
                break
              }
            }
            if (found) break
          }
        }
        if (found) break
      }
      // let i = 0
      // let j = 1
      // let found = false
      // while (j < current.length) {
      //   const save = j
      //   while (current[i] === current[j]) {
      //     i--
      //     j++
      //     if (i < 0 || j === current.length) {
      //       result += 100 * save
      //       answers.push([save, "h"])
      //       found = true
      //       break
      //     }
      //   }
      //   i = save
      //   j = save + 1
      //   if (found) break
      // }
      // i = 0
      // j = 1
      // while (!found && j < current[0].length) {
      //   const save = j
      //   while (current.reduce((acc, cur) => acc + cur[i], "") === current.reduce((acc, cur) => acc + cur[j], "")) {
      //     i--
      //     j++
      //     if (i < 0 || j === current[0].length) {
      //       result += save
      //       answers.push([save, "v"])
      //       found = true
      //       break
      //     }
      //   }
      //   i = save
      //   j = save + 1
      //   if (found) break
      // }
      current = []
      continue
    }
    current.push(line)
  }
  console.log(answers)
  return result
}


// doTheThing(() =>
//   Promise.resolve(
//     `#.##..##.
//     ..#.##.#.
//     ##......#
//     ##......#
//     ..#.##.#.
//     ..##..##.
//     #.#.##.#.

//     #...##..#
//     #....#..#
//     ..##..###
//     #####.##.
//     #####.##.
//     ..##..###
//     #....#..#`
//       .split("\n")
//       .map(r => r.trim())
//   )
// ).then(actual =>
//   console.assert(actual === 400, "1. expected 400 and got " + actual)
// )

doTheThing(getInput).then(console.log)
