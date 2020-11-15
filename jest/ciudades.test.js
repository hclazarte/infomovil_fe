import { FacadeClient } from '../src/facadeclient'
const fetch = require('node-fetch')
global.Headers = fetch.Headers
global.fetch = fetch

test('Ciudad Simple ', () => {
  const parametros = { mensaje: '', strCiudad: 'La Paz' }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.UsRecuperaCiudad,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(obj.UsRecuperaCiudadResult.Ciudade[0].CIUDAD).toBe('La Paz')
    })
    .catch((e) => {
      console.error(e)
      expect(true).toBe(false)
    })
})

test('Ciudad Con guiones ', () => {
  const parametros = { mensaje: '', strCiudad: 'Santa Cruz' }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.UsRecuperaCiudad,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(obj.UsRecuperaCiudadResult.Ciudade[0].CIUDAD).toBe('Santa Cruz')
    })
    .catch((e) => {
      console.error(e)
      expect(true).toBe(false)
    })
})

test('Ciudad Caracter especiales; acento ', () => {
  const parametros = { mensaje: '', strCiudad: 'Potosí' }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.UsRecuperaCiudad,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(obj.UsRecuperaCiudadResult.Ciudade[0].CIUDAD).toBe('Potosí')
    })
    .catch((e) => {
      console.error(e)
      expect(true).toBe(false)
    })
})

test('Ciudad Mayúsculas y minusculas mezcladas ', () => {
  const parametros = { mensaje: '', strCiudad: 'cOCHABAMBA' }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.UsRecuperaCiudad,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(obj.UsRecuperaCiudadResult.Ciudade[0].CIUDAD).toBe('Cochabamba')
    })
    .catch((e) => {
      console.error(e)
      expect(true).toBe(false)
    })
})

test('Ciudades Recupera todas ', () => {
  const parametros = { mensaje: '', OrdenarPor: 'CIUDAD' }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.UsRecuperaTodosCiudades,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(obj.UsRecuperaTodosCiudadesResult.Ciudade.length).toBeGreaterThan(
        0
      )
    })
    .catch((e) => {
      console.error(e)
      expect(true).toBe(false)
    })
})
