const OnePromise = (a, b, c) => {
  const s = a + b

  return new Promise((resolve, reject) => {
    if (c === s) {
      resolve('Success')
    } else {
      reject(new Error('Failed'))
    }
  })
}

OnePromise(1, 2, 3)
  .then((message) => {
    console.log('This is in the then ' + message)
  })
  .catch((message) => {
    console.log('This is in the catch ' + message)
  })
