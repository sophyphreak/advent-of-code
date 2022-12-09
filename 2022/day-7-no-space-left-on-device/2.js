require("dotenv").config()
const axios = require("axios").default

const getInput = async () => {
  try {
    const { data } = await axios.get(
      "https://adventofcode.com/2022/day/7/input",
      {
        headers: { Cookie: `session=${process.env.SESSION}` },
      }
    )
    return data
      .slice(0, data.length - 1)
      .split("\n")
      .slice(1)
  } catch (e) {
    console.error(e)
  }
}

const newId = () => Math.random()

const changeDirectory = (current, folderName, fileDirectory) => {
  if (folderName === "..") {
    return fileDirectory[current.parent]
  }

  const [targetFolder] = current.folders.filter(
    f => fileDirectory[f].name === folderName
  )
  if (targetFolder) {
    return fileDirectory[targetFolder]
  }

  throw new Error("aahhh")

  // const newFolder = {
  //   id: newId(),
  //   name: folderName,
  //   parent: current.id,
  //   files: [],
  //   folders: [],
  // }
  // current.folders.push(newFolder.id)
  // fileDirectory[newFolder.id] = newFolder
  // return newFolder
}

const buildFileDirectory = arr => {
  const root = { id: "root", name: "/", parent: null, files: [], folders: [] }
  const fileDirectory = { root }
  let current = root
  let ls = false
  for (const line of arr) {
    if (line[0] === "$") {
      const [_, command, folderName] = line.split(" ")
      ls = false
      if (command === "cd") {
        current = changeDirectory(current, folderName, fileDirectory)
        continue
      }
      ls = true
      continue
    }

    if (line.slice(0, 3) === "dir") {
      const [_, folderName] = line.split(" ")
      if (
        current.folders.filter(f => fileDirectory[f].name === folderName).length
      ) {
        continue
      }
      const newFolder = {
        id: newId(),
        name: folderName,
        parent: current.id,
        files: [],
        folders: [],
      }
      current.folders.push(newFolder.id)
      fileDirectory[newFolder.id] = newFolder
      continue
    }

    const [size, name] = line.split(" ")
    current.files.push({ name, size: +size })
  }

  return fileDirectory
}

const calculateFolderSizes = (current, fileDirectory) => {
  let sum = 0
  for (const file of current.files) {
    sum += file.size
  }
  for (const folderId of current.folders) {
    calculateFolderSizes(fileDirectory[folderId], fileDirectory)
    const size = fileDirectory[folderId].size
    sum += size
  }
  current.size = sum
}

const getSizesSum = (fileDirectory, maxSize) => {
  let sum = 0
  for (const id in fileDirectory) {
    folder = fileDirectory[id]
    if (folder.size <= maxSize) {
      sum += folder.size
    }
  }
  return sum
}

const doTheThing = async getArr => {
  const arr = await getArr()
  const fileDirectory = buildFileDirectory(arr)
  calculateFolderSizes(fileDirectory.root, fileDirectory)

  const currentUnusedSpace = 70000000 - fileDirectory.root.size
  const neededSpaceToFreeUp = 30000000 - currentUnusedSpace

  const directories = []
  for (const id in fileDirectory) {
    const directory = fileDirectory[id]
    directories.push(directory)
  }
  console.log("currentUnusedSpace:", currentUnusedSpace)
  console.log("neededSpaceToFreeUp:", neededSpaceToFreeUp)
  return (
    directories
      .sort((a, b) => b.size - a.size)
      // .map(f => f.size)
      .filter(f => f.size >= neededSpaceToFreeUp)
  )
  return directories.map(f => f.size)
  // return directories.filter(f => f.size >= neededSpaceToFreeUp)
  // return directories
}

doTheThing(() =>
  Promise.resolve(
    `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`
      .split("\n")
      .slice(1)
  )
).then(console.log)

doTheThing(getInput).then(console.log)

// guessed 29001698, too high
