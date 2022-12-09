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
      case str[i + 2]:
      case str[i + 3]:
      case str[i + 4]:
      case str[i + 5]:
      case str[i + 6]:
      case str[i + 7]:
      case str[i + 8]:
      case str[i + 9]:
      case str[i + 10]:
      case str[i + 11]:
      case str[i + 12]:
      case str[i + 13]:
        continue
    }
    switch (str[i + 1]) {
      case str[i + 2]:
      case str[i + 3]:
      case str[i + 4]:
      case str[i + 5]:
      case str[i + 6]:
      case str[i + 7]:
      case str[i + 8]:
      case str[i + 9]:
      case str[i + 10]:
      case str[i + 11]:
      case str[i + 12]:
      case str[i + 13]:
        continue
    }
    switch (str[i + 2]) {
      case str[i + 3]:
      case str[i + 4]:
      case str[i + 5]:
      case str[i + 6]:
      case str[i + 7]:
      case str[i + 8]:
      case str[i + 9]:
      case str[i + 10]:
      case str[i + 11]:
      case str[i + 12]:
      case str[i + 13]:
        continue
    }
    switch (str[i + 3]) {
      case str[i + 4]:
      case str[i + 5]:
      case str[i + 6]:
      case str[i + 7]:
      case str[i + 8]:
      case str[i + 9]:
      case str[i + 10]:
      case str[i + 11]:
      case str[i + 12]:
      case str[i + 13]:
        continue
    }
    switch (str[i + 4]) {
      case str[i + 5]:
      case str[i + 6]:
      case str[i + 7]:
      case str[i + 8]:
      case str[i + 9]:
      case str[i + 10]:
      case str[i + 11]:
      case str[i + 12]:
      case str[i + 13]:
        continue
    }
    switch (str[i + 5]) {
      case str[i + 6]:
      case str[i + 7]:
      case str[i + 8]:
      case str[i + 9]:
      case str[i + 10]:
      case str[i + 11]:
      case str[i + 12]:
      case str[i + 13]:
        continue
    }
    switch (str[i + 6]) {
      case str[i + 7]:
      case str[i + 8]:
      case str[i + 9]:
      case str[i + 10]:
      case str[i + 11]:
      case str[i + 12]:
      case str[i + 13]:
        continue
    }
    switch (str[i + 7]) {
      case str[i + 8]:
      case str[i + 9]:
      case str[i + 10]:
      case str[i + 11]:
      case str[i + 12]:
      case str[i + 13]:
        continue
    }
    switch (str[i + 8]) {
      case str[i + 9]:
      case str[i + 10]:
      case str[i + 11]:
      case str[i + 12]:
      case str[i + 13]:
        continue
    }
    switch (str[i + 9]) {
      case str[i + 10]:
      case str[i + 11]:
      case str[i + 12]:
      case str[i + 13]:
        continue
    }
    switch (str[i + 10]) {
      case str[i + 11]:
      case str[i + 12]:
      case str[i + 13]:
        continue
    }
    switch (str[i + 11]) {
      case str[i + 12]:
      case str[i + 13]:
        continue
    }
    switch (str[i + 12]) {
      case str[i + 13]:
        continue
    }

    return i + 14
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
