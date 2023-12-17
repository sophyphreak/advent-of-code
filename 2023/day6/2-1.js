require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
    const { data } = await axios.get(
        "https://adventofcode.com/2023/day/6/input",
        {
            headers: {
                Cookie: `session=${process.env.SESSION}`,
            },
        }
    )
    return data.slice(0, data.length - 1).split("\n")
}

const doTheThing = async getArr => {
    const arr = await getArr()
    let [time, distance] = [arr[0], arr[1]]
    time = time.split(/[ ]+/).slice(1).join("")
    distance = distance.split(/[ ]+/).slice(1).join("")
    let low = 0
    let high = time
    let max = null
    const t = (mid) => mid * (time - mid)

    while (true) {
        const mid = low + Math.floor((high - low) / 2)
        if (t(mid - 1) < t(mid) && t(mid) > t(mid + 1)) {
            max = mid
            break
        }
        if (t(mid) < t(mid + 1)) {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }

    let lowerBound = null
    low = 0
    high = max
    while (true) {
        const mid = low + Math.floor((high - low) / 2)
        if (t(mid - 1) <= distance && t(mid) > distance) {
            lowerBound = mid
            break
        }
        if (t(mid) < distance) {
            low = mid
        } else {
            high = mid
        }
    }
    let upperBound = null
    low = max
    high = time
    while (true) {
        const mid = low + Math.floor((high - low) / 2)
        if (t(mid + 1) <= distance && t(mid) > distance) {
            upperBound = mid
            break
        }
        if (t(mid) < distance) {
            high = mid
        } else {
            low = mid
        }
    }
    return upperBound - lowerBound + 1
}



doTheThing(() =>
    Promise.resolve(
        `Time:      7  15   30
    Distance:  9  40  200`
            .split("\n")
            .map(r => r.trim())
    )
).then(actual =>
    console.assert(actual === 71503, "1. expected 71503 and got " + actual)
)


doTheThing(getInput).then(console.log)
