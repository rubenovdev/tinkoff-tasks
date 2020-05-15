'use strict'

class CustomPromise {
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

  resolve = (value) => {
    this.status = 'resolved'
    this.result = value

    this.stack.forEach((fn) => fn())
  }

  reject = (error) => {
    this.status = 'rejected'
    this.result = error

    this.stack.forEach((fn) => fn())
  }

  then(onResolved, onRejected) {
    return new CustomPromise((resolve, reject) => {
      const check = () => {
        if (this.status === 'resolved') {
          try {
            resolve(onResolved(this.result))
          } catch (error) {
            reject(error)
          }
        }
        if (this.status === 'rejected') {
          onRejected ? resolve(onRejected(this.result)) : reject(this.result)
        }
      }

      if (this.status === 'pending') {
        this.stack.push(check)
      } else {
        check()
      }
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

      if (this.status === 'pending') {
        this.stack.push(check)
      } else {
        check()
      }
    })
  }
}

const promise = new CustomPromise((resolve, reject) => {
  setTimeout(() => resolve('value in executor'), 100)
})
  .then(() => {
    console.log('hey 111')
  })
  .then(() => {
    console.log('hey 222')
    throw new Error('блин, ошибка во втором then..')
  })
  .then(() => {
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

// const customPromise = new CustomPromise((resolve, reject) => {
//   setTimeout(() => reject(new Error('Whoops1!')), 1000)
// })
//   .then(() => {
//     console.log('hey 111')
//   })
//   .then(() => {
//     console.log('hey 222')
//   })
//   .then(() => {
//     console.log('hey 333')
//   })
//   .catch((error) => {
//     console.log('решили ошибку')
//   })
//   .then(() => {
//     console.log('hey 444')
//   })

// console.log(customPromise)
