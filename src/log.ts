export const consoleLog = console.log
console.log = (() => {
  let i = 0
  return (...str: string[]) => {
    i++
    consoleLog(i + '. ', ...str)
  }
})()
