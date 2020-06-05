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

Employee.prototype = Person.prototype

Employee.prototype.fullName = () => {
  return `${Person.prototype.fullName.call(this)} (${this.role})`
}

const person = new Person('Maxim', 'Berezin')
person.fullName() // Stack Overflow

const employee = new Employee('Maxim', 'Berezin', 'developer')
employee.fullName() // Stack Overflow
