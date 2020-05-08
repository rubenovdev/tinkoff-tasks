
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})

const promiseResolve = Promise.resolve(1)
const promiseReject = Promise.reject(2)

promise
  .then(() => 1)
  .catch(() => 2)
  .finally(() => 3)

class CustomPromise {
  private resolve = (value) => {}
  private reject = () => {}
  private result

  constructor(
    callback: (resolve: (params: any) => void, reject: (params: any) => void) => void
  ) {
    callback(this.resolve, this.reject)
  }

  then(onResolve) {
    return new CustomPromise((resolve) => {
      // TODO: дождаться , пока наш промис зарезолвится
      resolve(onResolve(this.result))
    })
  }

  catch(onReject) {
    return new CustomPromise((resolve) => {
      // TODO: дождаться , пока наш промис зареджектится
      resolve(onReject(this.result))
    })
  }


}
