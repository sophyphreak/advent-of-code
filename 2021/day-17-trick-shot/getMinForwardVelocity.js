const getForwardStartingVelocity = cols => {
  for (let startingVelocity = 0; ; startingVelocity++) {
    let position = 0
    for (
      let forwardVelocity = startingVelocity;
      forwardVelocity >= 0;
      forwardVelocity--
    ) {
      position += forwardVelocity
    }
    if (position <= cols[1] && position >= cols[0]) {
      return startingVelocity
    }
  }
}

module.exports = getForwardStartingVelocity
