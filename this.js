'use strict'

// const name = 'Alexander'

// function fn1() {
//   const fn = () => {
//     console.log(`hello!, ${this.name}`)
//   }

//   fn()
// }

// const fn = () => {
//   console.log(`hello!, ${this.name}`)
// }

// const obj = {
//   name: 'Maxim',
//   sayHello: fn1,
// }

// obj.sayHello()

// ========== Задача 1

// var userService = {
//   currentFilter: 'active',
//   users: [
//     { name: 'Alex', status: 'active' },
//     { name: 'Nick', status: 'deleted' },
//   ],
//   getFilteredUsers: function () {
//     return this.users.filter(function (user) {
//       return user.status === this.currentFilter
//     }, this)
//   },
// }

// console.log(userService.getFilteredUsers())
// Alex

// ========== Задача 2

// const obj = {
//   a: function () {
//     console.log(this.prop)
//   },
//   prop: 1,
// }

// obj.a.prop = 2
// obj.a() // 1
// var fn = obj.a
// fn() // undefined

// ========== Задача 3 (написать функцию isStrictMode)

// const isStrictMode = () => {
//   function checkThis() {
//     return this
//   }

//   return checkThis() === undefined
// }

// ========== Задача 4

// const sum = (a) => {
//   let currentSum = 0

//   function innerSum(b) {
//     if (b === undefined) {
//       return currentSum
//     }

//     currentSum += b
//     return innerSum
//   }

//   innerSum.valueOf = () => currentSum

//   return innerSum(a)
// }

// // console.log(sum) // 0
// // console.log(sum(1)(2) + 2) // 5
// // console.log(sum(1)(2)(3)) // 6

// ========== Задача 5

// function plus(a, b, c, d) {
//   return a + b + c + d
// }

// function curry(fn) {
//   const argsLength = fn.length

//   return function innerFn(...newArgs) {
//     if (newArgs.length >= argsLength) {
//       return fn(...newArgs)
//     }

//     return innerFn.bind(undefined, ...newArgs)
//   }
// }

// const curryPlus = curry(plus)

// const plusFive = curryPlus(5)
// console.log(plusFive(4, 3, 5)) // 17
// console.log(plusFive(10, 1)(3)) // 19
// console.log(curryPlus(1, 2)(2)(4)) // 9

// ========== Задача 6

// const compareArrays = (arr1, arr2) => {
//   return (
//     arr1 &&
//     arr2 &&
//     arr1.length === arr2.length &&
//     arr1.every((elem, index) => elem === arr2[index])
//   )
// }

// const memoize = (fn) => {
//   let currentArgs = null
//   let fnResult

//   return (...args) => {
//     if (!compareArrays(currentArgs, args)) {
//       fnResult = fn(...args)
//       currentArgs = args
//     }

//     return fnResult
//   }
// }

// const plus = memoize((a, b) => {
//   console.log('зашли в plus')
//   return a + b
// })

// console.log(plus(1, 2))
// console.log(plus(1, 2))
// console.log(plus(2, 3))

// const alwaysFive = memoize(() => 5)

// console.log(alwaysFive())

