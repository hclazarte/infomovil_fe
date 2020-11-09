import { FacadeClient } from '../src/facadeclient'
const fetch = require('node-fetch')
global.Headers = fetch.Headers
global.fetch = fetch

test('Ninguna tipo de comercio debe contener guiones - o / ', () => {
  const parametros = {
    mensaje: '',
    Clausula: "DESCRIPCION LIKE('%-%') OR DESCRIPCION LIKE('%-%')",
    ConnStr: 'User ID=INFOMOVIL;Password=INFO'
  }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.CuentaTipos_comercioQue,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(obj.CuentaTipos_comercioQueResult).toBe('0')
    })
    .catch((e) => {
      console.error(e)
    })
})

test('No se puede grabar descripciones con  - o / ', () => {
  const parametros = {
    mensaje: '',
    tipo_comercioEditada: { DESCRIPCION: '-' },
    ConnStr: 'User ID=INFOMOVIL;Password=INFO'
  }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.GrabaTipo_comercio,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(true).toBe(false)
    })
    .catch((e) => {
      expect(e.message).toBe(
        'Negocio: Caracter no válido, la descripción de un tipo de comercio no puede contener - o / '
      )
    })
})
