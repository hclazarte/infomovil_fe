const { renderIntoDocument } = require("react-dom/test-utils")

let OnePromise = (a, b, c) => {
  let s = a + b

  return new Promise((resolver,rechazar) => {
    if (c == s) {
      resolver('Success')
    } else {
      rechazar('Failed')
    }
  })
} 

OnePromise(1, 2, 3).then((message) => {
  console.log('This is in the then ' + message)
} ).catch((message) => {
  console.log('This is in the catch ' + message)
})