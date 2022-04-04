const getMaxUpwardVelocity = rows => {
  let maxStartingVelocity = 0
  for (let startingVelocity = 0; ; startingVelocity++) {
    let position = 0
    let upwardVelocity = startingVelocity
    while (position < -rows[1]) {
      position += upwardVelocity
      upwardVelocity--
    }
    position -= upwardVelocity
    if (position <= -rows[0] && position > -rows[1]) {
      maxStartingVelocity = Math.max(maxStartingVelocity, startingVelocity)
    } else if (maxStartingVelocity > 0) {
      return maxStartingVelocity
    }
  }
}

module.exports = getMaxUpwardVelocity
