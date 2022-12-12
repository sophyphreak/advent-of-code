const doTheThing = monkeys => {
  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      while (monkey.items.length) {
        let current = monkey.items.shift()
        current = monkey.operation(current)
        current = Math.floor(current / 3)
        const throwTo = monkey.test(current)
        monkeys[throwTo].items.push(current)
        monkey.times++
      }
    }
  }
  console.log(monkeys.map(m => m.times))
  return monkeys
    .sort((a, b) => b.times - a.times)
    .slice(0, 2)
    .reduce((acc, cur) => cur.times * acc, 1)
}

console.log(
  doTheThing([
    {
      items: [79, 98],
      operation: old => old * 19,
      test: item => (item % 23 === 0 ? 2 : 3),
      times: 0,
    },
    {
      items: [54, 65, 75, 74],
      operation: old => old + 6,
      test: item => (item % 19 === 0 ? 2 : 0),
      times: 0,
    },
    {
      items: [79, 60, 97],
      operation: old => old * old,
      test: item => (item % 13 === 0 ? 1 : 3),
      times: 0,
    },
    {
      items: [74],
      operation: old => old + 3,
      test: item => (item % 17 === 0 ? 0 : 1),
      times: 0,
    },
  ])
)
