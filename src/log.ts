export const consoleLog = console.log
const startDate = new Date()
console.log = (() => {
  let i = 0
  return (...str: string[]) => {
    i++
    consoleLog(i + '. ', ...str, (new Date().getTime() - startDate.getTime()) / 1000, 'sec')
  }
})()
