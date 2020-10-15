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
