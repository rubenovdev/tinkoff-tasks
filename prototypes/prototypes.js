function Person(firstName, secondName) {
  this.firstName = firstName
  this.secondName = secondName

  console.log('Create Person')
}

Person.prototype.fullName = () => {
  return `${this.firstName} ${this.secondName}`
}

function Employee(firstName, secondName, role) {
  Person.call(this, firstName, secondName)
  this.role = role
}

Employee.prototype = Object.create(Person.prototype)

Employee.prototype.fullName = () => {
  return `${Person.prototype.fullName.call(this)} (${this.role})`
}

const person = new Person('Maxim', 'Berezin')
person.fullName()

const employee = new Employee('Maxim', 'Berezin', 'developer')
employee.fullName()

// Написание Object.create
// Вариант 1
Object.create = (linkToProto) => ({
  __proto__: linkToProto,
})

// Вариант 2
Object.create = (linkToProto) => {
  const f = function () {}
  f.prototype = linkToProto
  return new f()
}

// finally не принимает аргументов и мы игнорируем возвращаемое им значение
Promise.resolve(3).finally(() => {})

// Задача 1
getPromise1()
  .then(function () {
    return getPromise2()
  })
  .then(finalHandler)
// -1-
//    -2-
//       -f-

// Задача 2
getPromise1()
  .then(function () {
    getPromise2()
  })
  .then(finalHandler)
// -1-
//    -2-
//    -f-

// Задача 3
getPromise1().then(getPromise2()).then(finalHandler)
// -1-
// -2-
//    -f-

// Задача 4
getPromise1().then(getPromise2).then(finalHandler)
// -1-
//    -2-
//       -f-

// Задача 5
Promise.reject('a') // или Bluebird.reject('a') или $q.reject('a')
  .catch((p) => p + 'b') // 'ab'
  .catch((p) => p + 'с')
  .then((p) => p + 'd') // 'abd'
  .finally((p) => p + 'e')
  .then((p) => console.log(p)) // 'abd'
console.log('f')
// 'f'
// 'abd'

// Задача 6
console.log(1)
setTimeout(function () {
  console.log(2)
})
Promise.resolve(3).then(console.log)
console.log(4)
setTimeout(function () {
  console.log(5)
}, 0)
console.log(6)
// 1
// 4
// 6
// 3
// 2
// 5
