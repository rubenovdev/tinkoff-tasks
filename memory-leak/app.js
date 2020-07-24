// class App extends Component {
//   count = 0

//   componentDidMount() {
//     var _this = this

//     setInterval(function() {
//       _this.count++
//       _this.forceUpdate()
//     }, 1000)
//   }

//   render() {
//     return <span>{this.count}<span>
//   }
// }

class Infaksldfj {}

const obj = new Infaksldfj()

function fn() {
  const obj1 = new Infaksldfj()
  const obj2 = new Infaksldfj()

  obj1.a = obj2
  obj2.a = obj1
  obj.a = obj1
}

const obj3 = new Infaksldfj()
const obj4 = new Infaksldfj()

setInterval(fn, 1000)
