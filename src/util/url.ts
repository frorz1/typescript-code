export const log = (...args: Parameters<typeof console.log>) => {
  console.log(args)
}

export const wait = (delay: number) => {
  log([12,222,222].includes(delay))
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, delay)
  })
}