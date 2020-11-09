import { FacadeClient } from '../src/facadeclient'
const fetch = require('node-fetch')
global.Headers = fetch.Headers
global.fetch = fetch

test('Zonas activas de La Paz mayor a cero ', () => {
  const parametros = { OrdenarPor: 'DESCRIPCION', mensaje: '' }
  const ejemplo = { ID_CDD: 'AA0000000000001' }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.UsRecuperaTablaBuscarZonasActivas,
    parametros,
    ejemplo,
    undefined
  )
    .then((obj) => {
      expect(
        obj.UsRecuperaTablaBuscarZonasActivasResult.TablaBuscarRow.length
      ).toBeGreaterThan(0)
    })
    .catch((e) => {
      console.error(e)
    })
})

test('Ninguna zonas debe contener guiones - o / ', () => {
  const parametros = {
    mensaje: '',
    Clausula: "DESCRIPCION LIKE('%-%') OR DESCRIPCION LIKE('%-%')",
    ConnStr: 'User ID=INFOMOVIL;Password=INFO'
  }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.CuentaZonasQue,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(obj.CuentaZonasQueResult).toBe('0')
    })
    .catch((e) => {
      console.error(e)
    })
})

test('No se puede grabar descripciones con  - o / ', () => {
  const parametros = {
    mensaje: '',
    zonaEditada: { DESCRIPCION: '-' },
    ConnStr: 'User ID=INFOMOVIL;Password=INFO'
  }

  return FacadeClient.RunSrvPromise(
    FacadeClient.Services.GrabaZona,
    parametros,
    null,
    undefined
  )
    .then((obj) => {
      expect(true).toBe(false)
    })
    .catch((e) => {
      expect(e.message).toBe(
        'Negocio: Caracter no válido, la descripción de una zona no puede contener - o / '
      )
    })
})
