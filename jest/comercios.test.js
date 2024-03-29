import { FacadeClient } from '../src/facadeclient'
const fetch = require('node-fetch')
global.Headers = fetch.Headers
global.fetch = fetch

test('Búsqueda con letras minúsculas ', () => {
  const parametros = {
    ruta: '/bolivia/la-paz',
    cantidad: 0,
    mensaje: '',
    OrdenarPor: '',
    GruposDe: 1,
    Grupo: 1
  }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.UsBuscaComercios,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(parseInt(obj.cantidad)).toBeGreaterThan(0)
      expect(obj.UsBuscaComerciosResult.Comercio.length).toBe(1)
    })
    .catch((e) => {
      console.error(e)
      expect(true).toBe(false)
    })
})

test('Búsqueda filtrado por laboratorio ', () => {
  const parametros = {
    ruta: '/Bolivia/La-Paz/laboratorio',
    cantidad: 0,
    mensaje: '',
    OrdenarPor: '',
    GruposDe: 2,
    Grupo: 1
  }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.UsBuscaComercios,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(parseInt(obj.cantidad)).toBeGreaterThan(0)
      expect(obj.UsBuscaComerciosResult.Comercio.length).toBe(2)
    })
    .catch((e) => {
      console.error(e)
      expect(true).toBe(false)
    })
})

test('Búsqueda Santa Cruz Taxi sin guion ', () => {
  const parametros = {
    ruta: '/Bolivia/Santa Cruz/taxi',
    cantidad: 0,
    mensaje: '',
    OrdenarPor: '',
    GruposDe: 3,
    Grupo: 2
  }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.UsBuscaComercios,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(parseInt(obj.cantidad)).toBeGreaterThan(0)
      expect(obj.UsBuscaComerciosResult.Comercio.length).toBe(3)
    })
    .catch((e) => {
      console.error(e)
      expect(true).toBe(false)
    })
})

test('Búsqueda Asesores en Cochabamba ', () => {
  const parametros = {
    ruta: '/Bolivia/Cochabamba/Asesores',
    cantidad: 0,
    mensaje: '',
    OrdenarPor: '',
    GruposDe: 1,
    Grupo: 1
  }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.UsBuscaComercios,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(parseInt(obj.cantidad)).toBeGreaterThan(0)
      expect(obj.UsBuscaComerciosResult.Comercio.length).toBe(1)
    })
    .catch((e) => {
      console.error(e)
      expect(true).toBe(false)
    })
})

test('Compara cantidad de hoteles en Tarija con espacio y sin espacio ', () => {
  const parametros = {
    ruta: '/Bolivia/Tarija/hotel',
    cantidad: 0,
    mensaje: '',
    OrdenarPor: '',
    GruposDe: 1,
    Grupo: 1
  }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.UsBuscaComercios,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      let can = parseInt(obj.cantidad)
      const parametros = {
        ruta: '/Bolivia/Tarija/hotel ',
        cantidad: 0,
        mensaje: '',
        OrdenarPor: '',
        GruposDe: 1,
        Grupo: 1
      }
      return FacadeClient.RunSrvPromise(
        FacadeClient.Services.UsBuscaComercios,
        parametros,
        null,
        undefined
      )
        .then((obj) => {
          expect(parseInt(obj.cantidad)).toBe(can)
        })
        .catch((e) => {
          console.error(e)
          expect(true).toBe(false)
        })
    })
    .catch((e) => {
      console.error(e)
      expect(true).toBe(false)
    })
})

test('Nombre largo en Pando ', () => {
  const parametros = {
    ruta: '/bolivia/cobija/gerson-enrique-chavez-valdivia',
    cantidad: 0,
    mensaje: '',
    OrdenarPor: '',
    GruposDe: 1,
    Grupo: 1
  }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.UsBuscaComercios,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(parseInt(obj.cantidad)).toBeGreaterThan(0)
      expect(obj.UsBuscaComerciosResult.Comercio.length).toBe(1)
    })
    .catch((e) => {
      console.error(e)
      expect(true).toBe(false)
    })
})

test('textos con palabra de un caracter ', () => {
  const parametros = {
    ruta: '/bolivia/cochabamba/productos-ecologicos-naturaleza-s.a.-pensa',
    cantidad: 0,
    mensaje: '',
    OrdenarPor: '',
    GruposDe: 1,
    Grupo: 1
  }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.UsBuscaComercios,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(parseInt(obj.cantidad)).toBeGreaterThan(0)
      expect(obj.UsBuscaComerciosResult.Comercio.length).toBe(1)
    })
    .catch((e) => {
      console.error(e)
      expect(true).toBe(false)
    })
})
