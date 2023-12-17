require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2023/day/12/input",
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

  return arr
}

const c = (i, j) => `${i}_${j}`

doTheThing(() =>
  Promise.resolve(
    `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`
      .split("\n")
      .map(r => r.trim())
  )
).then(actual =>
  console.assert(actual === 21, "1. expected 21 and got " + actual)
)

doTheThing(getInput).then(console.log)
