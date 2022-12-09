require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data } = await axios.get(
    "https://adventofcode.com/2022/day/6/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return data.slice(0, data.length - 1)
}

const doTheThing = async getStr => {
  const str = await getStr()
  for (let i = 0; i < str.length; i++) {
    switch (str[i]) {
      case str[i + 1]:
        continue
      case str[i + 2]:
        continue
      case str[i + 3]:
        continue
    }
    switch (str[i + 1]) {
      case str[i + 2]:
        continue
      case str[i + 3]:
        continue
    }
    if (str[i + 2] === str[i + 3]) {
      continue
    }
    return i + 4
  }
}

doTheThing(() => Promise.resolve("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).then(
  console.log
)

doTheThing(() => Promise.resolve("bvwbjplbgvbhsrlpgdmjqwftvncz")).then(
  console.log
)

doTheThing(() => Promise.resolve("nppdvjthqldpwncqszvftbrmjlhg")).then(
  console.log
)

doTheThing(() => Promise.resolve("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).then(
  console.log
)

doTheThing(() => Promise.resolve("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).then(
  console.log
)

doTheThing(getInput).then(console.log)
