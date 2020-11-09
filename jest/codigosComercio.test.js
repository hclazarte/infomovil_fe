import { FacadeClient } from '../src/facadeclient'
const fetch = require('node-fetch')
global.Headers = fetch.Headers
global.fetch = fetch

test('Codigos de comercio simple ', () => {
  const parametros = { OrdenarPor: 'DESCRIPCION', mensaje: '' }
  const ejemplo = { ID_CDD: 'AA0000000000001' }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.UsRecuperaTablaBuscarCodigos_comercio,
    parametros,
    ejemplo,
    undefined
  )
    .then((obj) => {
      expect(
        obj.UsRecuperaTablaBuscarCodigos_comercioResult.TablaBuscarRow.length
      ).toBeGreaterThan(0)
    })
    .catch((e) => {
      console.error(e)
    })
})

test('Ningún código de comercio debe contener guiones - o / ', () => {
  const parametros = {
    mensaje: '',
    Clausula: "DESCRIPCION LIKE('%-%') OR DESCRIPCION LIKE('%-%')",
    ConnStr: 'User ID=INFOMOVIL;Password=INFO'
  }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.CuentaCodigos_comercioQue,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(obj.CuentaCodigos_comercioQueResult).toBe('0')
    })
    .catch((e) => {
      console.error(e)
    })
})

test('No se puede grabar descripciones con  - o / ', () => {
  const parametros = {
    mensaje: '',
    codigo_comercioEditada: { DESCRIPCION: '-' },
    ConnStr: 'User ID=INFOMOVIL;Password=INFO'
  }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.GrabaCodigo_comercio,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(true).toBe(false)
    })
    .catch((e) => {
      expect(e.message).toBe(
        'Negocio: Caracter no válido, la descripción de un código de comercio no puede contener - o / '
      )
    })
})
