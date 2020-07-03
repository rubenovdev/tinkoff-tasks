// сложность 5N
function sortArray(arr) {
  const arr2 = []
  const arr3 = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) arr2.push(arr[i])
    else arr3.push(arr[i])
  }

  return [...arr2, ...arr3]
}

// сложность N
const getSumArray = (arr) => {
  let sum = 0

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }

  return sum
}

const checkElement = (arr, elem) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === elem) {
      return true
    }
  }

  return false
}

const arr = []

for (let i = 0; i <= 10000000; i++) {
  arr.push(i)
}

// бинарный поиск
const checkElementInSortedArr = (arr, num) => {
  let indexBeginArr = 0
  let indexEndArr = arr.length - 1

  while (indexBeginArr <= indexEndArr) {
    const index = Math.round((indexEndArr + indexBeginArr) / 2)

    if (num > arr[index]) {
      indexBeginArr = index + 1
    } else if (num < arr[index]) {
      indexEndArr = index - 1
    } else {
      return true
    }
  }

  return false
}

// интерполяционный поиск
const checkElementInSortedArr2 = (arr, target) => {
  let start = 0
  let end = arr.length - 1

  while (start <= end) {
    const index =
      start + ((end - start) * (target - arr[start])) / (arr[end] - arr[start])

    if (target > arr[index]) {
      start = index + 1
    } else if (target < arr[index]) {
      end = index - 1
    } else {
      return index
    }
  }

  return -1
}

console.time('бинарный поиск')
checkElementInSortedArr(arr, 101110)
console.timeEnd('бинарный поиск')

console.time('интерполяционный поиск')
checkElementInSortedArr2(arr, 101110)
console.timeEnd('интерполяционный поиск')
