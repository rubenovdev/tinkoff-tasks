'use strict'

const isPromise = (obj) => {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}

const promisify = (fn) => {
  return (...args) => {
    try {
      const result = fn(...args)

      return CustomPromise.resolve(result)
    } catch (error) {
      return CustomPromise.reject(error)
    }
  }
}

class CustomPromise {
  static resolve(value) {
    return new CustomPromise((resolve) => {
      if (isPromise(value)) {
        value.then((data) => {
          resolve(data)
        })
      } else {
        resolve(value)
      }
    })
  }

  static reject(error) {
    return new CustomPromise((_, reject) => {
      if (isPromise(error)) {
        error.then((data) => {
          reject(data)
        })
      } else {
        reject(error)
      }
    })
  }

  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  status = 'pending'
  result = undefined
  stack = []

  changeParameters(status, value) {
    if (this.status !== 'pending') {
      return
    }

    this.status = status
    this.result = value

    this.stack.forEach((fn) => fn())
  }

  resolve = (value) => {
    this.changeParameters('resolved', value)
  }

  reject = (error) => {
    this.changeParameters('rejected', error)
  }

  checkStatus(fn) {
    if (this.status === 'pending') {
      this.stack.push(fn)
    } else {
      fn()
    }
  }

  then(onResolved, onRejected) {
    const normalizedOnResolved = promisify(onResolved)
    const normalizedOnRejected = onRejected && promisify(onRejected)

    return new CustomPromise((resolve, reject) => {
      const check = () => {
        if (this.status === 'resolved') {
          try {
            const result = normalizedOnResolved(this.result)

            result.then((data) => {
              resolve(data)
            })
          } catch (error) {
            reject(error)
          }
        }
        if (this.status === 'rejected') {
          if (normalizedOnRejected) {
            const result = normalizedOnRejected(this.result)

            result.then((data) => {
              resolve(data)
            })
          } else {
            reject(this.result)
          }
        }
      }

      this.checkStatus(check)
    })
  }

  catch(onRejected) {
    return new CustomPromise((resolve, reject) => {
      const check = () => {
        if (this.status === 'rejected') {
          try {
            resolve(onRejected(this.result))
          } catch (error) {
            reject(error)
          }
        } else if (this.status === 'resolved') {
          resolve(this.result)
        }
      }

      this.checkStatus(check)
    })
  }
}

const promise = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('value in executor')
    resolve('value in executor2')
  }, 100)
})
  .then(() => {
    console.log('hey 111')
    return new CustomPromise((resolve) => resolve('first value'))
  })
  .then((value) => {
    console.log(value)
    console.log('hey 222')
    return 'heeeeeeey'
  })
  .then((value) => {
    console.log(value)
    console.log('hey 333')
  })
  .catch((error) => {
    console.log('зашли в первый catch')
    throw new Error('вызвали новую ошибку')
  })
  .then(() => {
    console.log('hey 444')
  })
  .catch((error) => {
    console.log('решили ошибку во втором catch')
  })

console.log(promise)
