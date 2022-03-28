require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  const { data: hexString } = await axios.get(
    "https://adventofcode.com/2021/day/16/input",
    {
      headers: { Cookie: `session=${process.env.SESSION}` },
    }
  )
  return hexString
}

const hexToBinary = hexString => {
  const dictionary = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
  }
  let binaryString = ""
  for (const char of hexString) {
    binaryString += dictionary[char]
  }
  return binaryString
}

const binaryToPacket = binaryString => {
  const packet = {}
  let currentIndex = 0
  packet.version = parseInt(
    binaryString.slice(currentIndex, currentIndex + 3),
    2
  )
  currentIndex += 3
  packet.typeId = parseInt(
    binaryString.slice(currentIndex, currentIndex + 3),
    2
  )
  currentIndex += 3
  if (packet.typeId === 4) {
    packet.type = "literal value"
    let valueBinaryRepresentation = ""
    let nextIndex = currentIndex
    for (let i = currentIndex; i < binaryString.length; i += 5) {
      const currentSlice = binaryString.slice(i, i + 5)
      valueBinaryRepresentation += currentSlice.slice(1, 5)
      const lastGroup = currentSlice[0] === "0"
      if (lastGroup) {
        nextIndex = i + 5
        break
      }
    }
    packet.value = parseInt(valueBinaryRepresentation, 2)
    return { packet, nextIndex }
  }
  packet.type = "operator"
  packet.lengthTypeId = +binaryString[currentIndex]
  packet.lengthType =
    packet.lengthTypeId === 0
      ? "next 15 bits are a number that represents the total length in bits for the sub-packets contained by this packet"
      : "next 11 bits are a number that represents the number of sub-packets immediately contained by this packet"
  currentIndex++
  if (packet.lengthTypeId === 0) {
    packet.lengthOfSubPackets = parseInt(
      binaryString.slice(currentIndex, currentIndex + 15),
      2
    )
    currentIndex += 15
  } else {
    packet.numberOfSubPackets = parseInt(
      binaryString.slice(currentIndex, currentIndex + 11),
      2
    )
    currentIndex += 11
  }
  packet.subPackets = []
  while (parseInt(binaryString.slice(currentIndex), 2) !== 0) {
    const { packet: subPacket, nextIndex } = binaryToPacket(
      binaryString.slice(currentIndex)
    )
    currentIndex += nextIndex
    packet.subPackets.push(subPacket)
  }
  const nextIndex = currentIndex
  return { packet, nextIndex }
}

const getSumOfVersionNumbers = packet => {
  if (packet.typeId === 4) {
    return packet.version
  }
  let sum = 0
  sum += packet.version
  for (const subPacket of packet.subPackets) {
    sum += getSumOfVersionNumbers(subPacket)
  }
  return sum
}

const doTheThing = async getArr => {
  const hexString = await getArr()
  const binaryString = hexToBinary(hexString)
  const { packet } = binaryToPacket(binaryString)
  const sumOfVersionNumbers = getSumOfVersionNumbers(packet)
  return sumOfVersionNumbers
}

// doTheThing(() => Promise.resolve("D2FE28")).then(console.log)

// doTheThing(() => Promise.resolve("38006F45291200")).then(console.log)

// doTheThing(() => Promise.resolve("EE00D40C823060")).then(console.log)

// doTheThing(() => Promise.resolve("8A004A801A8002F478")).then(console.log)

// doTheThing(() => Promise.resolve("620080001611562C8802118E34")).then(
//   console.log
// )

// doTheThing(() => Promise.resolve("C0015000016115A2E0802F182340")).then(
//   console.log
// )

// doTheThing(() => Promise.resolve("A0016C880162017C3686B18A3D4780")).then(
//   console.log
// )

// doTheThing(() => Promise.resolve("C200B40A82")).then(console.log)

// doTheThing(() => Promise.resolve("04005AC33890")).then(console.log)

// doTheThing(() => Promise.resolve("880086C3E88112")).then(console.log)

// doTheThing(() => Promise.resolve("CE00C43D881120")).then(console.log)

// doTheThing(() => Promise.resolve("D8005AC2A8F0")).then(console.log)

// doTheThing(() => Promise.resolve("F600BC2D8F")).then(console.log)

// doTheThing(() => Promise.resolve("9C005AC2F8F0")).then(console.log)

// doTheThing(() => Promise.resolve("9C0141080250320F1802104A08")).then(
//   console.log
// )

// doTheThing(getInput).then(console.log)
