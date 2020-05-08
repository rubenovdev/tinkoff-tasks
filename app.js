"use strict"

class CustomPromise {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }

  status = "pending"
  result = undefined
  stack = []

  resolve = (value) => {
    this.status = "resolved"
    this.result = value

    this.stack.forEach((fn) => fn())
  }

  reject = (error) => {
    this.status = "rejected"
    this.result = error

    this.stack.forEach((fn) => fn())
  }

  then(onResolved, onRejected) {
    return new CustomPromise((resolve, reject) => {
      const check = () => {
        if (this.status === "resolved") {
          resolve(onResolved(this.result))
        }
        if (this.status === "rejected") {
          onRejected ? resolve(onRejected(this.result)) : reject(this.result)
        }
      }

      if (this.status === "pending") {
        this.stack.push(check)
      } else {
        check()
      }
    })
  }

  // catch() {}
}

const first = new CustomPromise((resolve, reject) => {
  setTimeout(() => reject("fail2"), 0)
})

const customPromise = first
  .then((result) => console.log("fd", result))
  .then(
    () => undefined,
    (error) => console.log("error2: ", error)
  )
  .then((result) => console.log("new result", result))

const customPromise2 = first
  .then(
    (result) => console.log("fd2", result),
    (error) => (console.log("error: ", error), "result")
  )
  .then(
    (res) => console.log(res),
    (res) => console.log("still error", res)
  )

console.log(customPromise)
console.log(customPromise2)
