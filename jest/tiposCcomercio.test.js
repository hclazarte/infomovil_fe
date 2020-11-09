import { FacadeClient } from '../src/facadeclient'
const fetch = require('node-fetch')
global.Headers = fetch.Headers
global.fetch = fetch

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
