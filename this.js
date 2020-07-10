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

const sum = () => {}

sum() // 0
sum(1)(2)() // 3
sum(1)(2)(3)() // 6
