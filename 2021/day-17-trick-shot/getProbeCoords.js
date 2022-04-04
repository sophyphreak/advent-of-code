const getProbeCoords = ({ forward, upward, rows, cols }) => {
  const probeCoords = []
  let forwardVelocity = forward
  let upwardVelocity = upward
  let i = 0
  let j = 0
  while (i < rows[1] && j < cols[1]) {
    j += forwardVelocity
    i -= upwardVelocity
    probeCoords.push([i, j])
    forwardVelocity = Math.max(forwardVelocity - 1, 0)
    upwardVelocity -= 1
  }
  return probeCoords
}

module.exports = getProbeCoords
