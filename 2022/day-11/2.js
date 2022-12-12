const doTheThing = (monkeys, divisor) => {
  for (let i = 0; i < 10000; i++) {
    for (const monkey of monkeys) {
      while (monkey.items.length) {
        let current = monkey.items.shift()
        current = monkey.operation(current)
        const throwTo = monkey.test(current)
        current = current % divisor
        monkeys[throwTo].items.push(current)
        monkey.times++
      }
    }
  }
  return monkeys
    .sort((a, b) => b.times - a.times)
    .slice(0, 2)
    .reduce((acc, cur) => cur.times * acc, 1)
}

console.log(
  doTheThing(
    [
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
    ],
    23 * 19 * 13 * 17
  )
)
