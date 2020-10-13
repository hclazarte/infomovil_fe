import { FacadeClient } from '../src/facadeclient'
const fetch = require('node-fetch')
global.Headers = fetch.Headers
global.fetch = fetch

it('Ciudad Simple ', () => {
  let parametros = { mensaje: '', strCiudad: 'La Paz' }

  FacadeClient.RunSrvPromise(
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
    })
})

it('Ciudad Con guiones', () => {
  let parametros = { mensaje: '', strCiudad: 'Santa-Cruz' }

  FacadeClient.RunSrvPromise(
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
    })
})

it('Ciudad Caracter especiales (acento)', () => {
  let parametros = { mensaje: '', strCiudad: 'Potosí' }

  FacadeClient.RunSrvPromise(
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
    })
    .catch((e) => {
      console.error(e)
    })
})

it('Ciudad Mayúsculas y minusculas mezcladas ', () => {
  let parametros = { mensaje: '', strCiudad: 'cOCHABAMBA' }

  FacadeClient.RunSrvPromise(
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
    })
})
