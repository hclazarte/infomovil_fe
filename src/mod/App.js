import React from 'react'
import SidebarMenu from './SidebarMenu'
import SearchIcon from './SearchIcon'
import SearchBox from './SearchBox'
import Inicio from './Inicio'
import Ayuda from './Ayuda'
import Servicios from './Servicios'
import Error from './Error'
import SearchResult from './SearchResult'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import { FacadeClient } from '../facadeclient'
import wait_img from '../img/waiting2.gif'

class App extends React.Component {
  counter = 0
  render_offset = 250
  grupo = 0
  gr_aux = 0
  gr_tam = 15
  intervalId = null

  constructor(props) {
    super(props)

    this.renderError = () => {
      if (this.state.redirect) {
        return <Error txt_error={this.state.txt_error}></Error>
      }
    }

    this.renderRoute = () => {
      if (!this.state.redirect) {
        return (
          <Switch>
            <Route exact path="/">
              <Inicio />
            </Route>
            <Route path="/ayuda">
              <Ayuda />
            </Route>
            <Route path="/servicios">
              <Servicios />
            </Route>
            <Route path="/error">
              <Error />
            </Route>
            <Route path="/*">
              <SearchResult comercios={this.state.comercios}></SearchResult>
            </Route>
          </Switch>
        )
      }
    }

    this.renderRedirect = () => {
      if (this.state.path !== undefined) {
        return <Redirect to={this.state.path} />
      }
    }

    this.onCiudadChanged = (new_ciudad) => {
      this.setState({ ciudad: new_ciudad, lockScreen: 'lockScreen' })

      let parametros = { OrdenarPor: 'DESCRIPCION', mensaje: '' }
      let ejemplo = { ID_CDD: new_ciudad.ID }
      FacadeClient.RunService(
        FacadeClient.Services.UsRecuperaTablaBuscarCodigos_comercio,
        parametros,
        ejemplo,
        undefined,
        (obj) => {
          obj.UsRecuperaTablaBuscarCodigos_comercioResult.TablaBuscarRow.unshift(
            { ID: '0', DESCRIPCION: 'Todas las Categorías' }
          )
          this.setState({
            codigos_comercio:
              obj.UsRecuperaTablaBuscarCodigos_comercioResult.TablaBuscarRow,
            cga_id: '0',
          })

          let parametros = { mensaje: '' }
          let ejemplo = { ID_CDD: new_ciudad.ID }
          FacadeClient.RunService(
            FacadeClient.Services.UsRecuperaTablaBuscarZonasActivas,
            parametros,
            ejemplo,
            undefined,
            (obj) => {
              obj.UsRecuperaTablaBuscarZonasActivasResult.TablaBuscarRow.unshift(
                { ID: '0', DESCRIPCION: 'Todas las Zonas' }
              )
              this.setState({
                zonas_activas:
                  obj.UsRecuperaTablaBuscarZonasActivasResult.TablaBuscarRow,
                lockScreen: 'unlockScreen',
                redirect: false,
                txt_error: '',
                zna_id: '0',
              })
            },
            (errMsg) => {
              // error al recuperar las zonas activas
              if (errMsg === 'Negocio: No existen datos para la consulta') {
                this.setState({
                  zonas_activas: [],
                  lockScreen: 'unlockScreen',
                  redirect: false,
                  txt_error: '',
                })
              } else {
                this.setState({
                  lockScreen: 'unlockScreen',
                  redirect: true,
                  txt_error: errMsg,
                })
              }
            }
          )
        },
        (errMsg) => {
          // error al recuperar codigos de comercio
          if (errMsg === 'Negocio: No existen datos para la consulta') {
            this.setState({
              codigos_comercio: [],
              lockScreen: 'unlockScreen',
              redirect: false,
              txt_error: '',
            })
          } else {
            this.setState({
              lockScreen: 'unlockScreen',
              redirect: true,
              txt_error: errMsg,
            })
          }
          this.setState({
            lockScreen: 'unlockScreen',
            redirect: true,
            txt_error: errMsg,
          })
        }
      )
    }

    this.onZonaChanged = (new_zna_id) => {
      this.setState({ zna_id: new_zna_id })
    }

    this.onCategoriaChanged = (new_cga_id) => {
      this.setState({ cga_id: new_cga_id })
    }
    this.onPanelDismiss = () => {
      let aux = this.linkBuilder(this.state.txt_busqueda)
      this.setState({ path: aux })
      this.counter = -1
    }

    this.onSearchTextChanged = (search_text) => {
      let aux = this.linkBuilder(search_text)
      this.setState({ path: aux, txt_busqueda: search_text })
      this.counter = -10
    }

    this.linkBuilder = (text = this.state.txt_busqueda) => {
      let aux = ''
      if (this.state.ciudad.PAIS !== undefined) {
        aux +=
          '/' +
          this.state.ciudad.PAIS.split(' ').join('-') +
          '/' +
          this.state.ciudad.CIUDAD.split(' ').join('-')
      }
      if (
        this.state.zna_id !== undefined &&
        this.state.zna_id !== '' &&
        this.state.zna_id !== '0'
      ) {
        let zona = this.state.zonas_activas.filter((zona) => {
          return zona.ID === this.state.zna_id
        })
        if (zona.length > 0) {
          aux += '/' + zona[0].DESCRIPCION.split(' ').join('-')
        }
      }
      if (
        this.state.cga_id !== undefined &&
        this.state.cga_id !== '' &&
        this.state.cga_id !== '0'
      ) {
        let categoria = this.state.codigos_comercio.filter((categoria) => {
          return categoria.ID === this.state.cga_id
        })
        if (categoria.length > 0) {
          let str = categoria[0].DESCRIPCION
          if (str.substr(0, 3) === ' - ') {
            str = str.substr(3, str.length)
          }
          aux += '/' + str.split(' ').join('-')
        }
      }
      if (text !== '') {
        aux += '/' + text.split(' ').join('-')
      }
      return aux
    }

    this.onSearchClick = this.onSearchClick.bind(this)
    this.timer = this.timer.bind(this)
    this.handleScroll = this.handleScroll.bind(this)

    this.state = {
      txt_error: '',
      redirect: false,
      lockScreen: 'lockScreen',
      ciudad: [],
      ciudades: [],
      codigos_comercio: [],
      cga_id: '0',
      zonas_activas: [],
      zna_id: '0',
      txt_busqueda: '',
      path: decodeURI(window.location.pathname),
      comercios: undefined,
    }
  }
  render() {
    return (
      <Router>
        {this.renderRedirect()}
        <div className="main" onScroll={this.handleScroll}>
          <div className={this.state.lockScreen}>
            <img
              className="waitingImg"
              src={wait_img}
              width="100px"
              height="100px"
              alt="Cargando..."
            ></img>
          </div>
          <div className="topBarDiv">
            <table className="topBar">
              <tbody>
                <tr>
                  <td className="iconCell">
                    <SidebarMenu
                      onCiudadChanged={this.onCiudadChanged}
                      onZonaChanged={this.onZonaChanged}
                      onCategoriaChanged={this.onCategoriaChanged}
                      onPanelDismiss={this.onPanelDismiss}
                      ciudad={this.state.ciudad}
                      ciudades={this.state.ciudades}
                      codigos_comercio={this.state.codigos_comercio}
                      cga_id={this.state.cga_id}
                      zonas_activas={this.state.zonas_activas}
                      zna_id={this.state.zna_id}
                    />
                  </td>
                  <td>
                    <SearchBox
                      onSearchTextChanged={this.onSearchTextChanged}
                      ciudad={this.state.ciudad}
                      txt_busqueda={this.state.txt_busqueda}
                      codigos_comercio={this.state.codigos_comercio}
                      cga_id={this.state.cga_id}
                      zonas_activas={this.state.zonas_activas}
                      zna_id={this.state.zna_id}
                    />
                  </td>
                  <td className="iconCell">
                    <Link to={this.linkBuilder()}>
                      <SearchIcon onSearchClick={this.onSearchClick} />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="contenido">
            {this.renderError()}
            {this.renderRoute()}
          </div>
        </div>
      </Router>
    )
  }

  componentDidMount() {
    this.counter = 0
    this.intervalId = setInterval(this.timer, 100)
    let paths = this.state.path.split('/').filter((aux_p) => {
      return aux_p !== ''
    })

    let query_val = ''
    if (paths.length > 1) {
      query_val = unescape(paths[1]).split('-').join(' ')
    }
    let parametros = { mensaje: '', strCiudad: query_val }
    FacadeClient.RunService(
      FacadeClient.Services.UsRecuperaCiudad,
      parametros,
      null,
      undefined,
      (obj) => {
        this.setState({ ciudad: obj.UsRecuperaCiudadResult.Ciudade[0] })
        if (
          obj.UsRecuperaCiudadResult.Ciudade[0].CIUDAD.toLowerCase() ===
          query_val.toLowerCase()
        ) {
          paths.shift()
          paths.shift()
        }
        let parametros = { mensaje: '', OrdenarPor: 'CIUDAD' }
        FacadeClient.RunService(
          FacadeClient.Services.UsRecuperaTodosCiudades,
          parametros,
          null,
          undefined,
          (obj) => {
            this.setState({
              ciudades: obj.UsRecuperaTodosCiudadesResult.Ciudade,
            })

            let parametros = { OrdenarPor: 'DESCRIPCION', mensaje: '' }
            let ejemplo = { ID_CDD: this.state.ciudad.ID }
            FacadeClient.RunService(
              FacadeClient.Services.UsRecuperaTablaBuscarZonasActivas,
              parametros,
              ejemplo,
              undefined,
              (obj) => {
                if (paths.length > 0) {
                  query_val = unescape(paths[0]).split('-').join(' ')
                }
                let selected = obj.UsRecuperaTablaBuscarZonasActivasResult.TablaBuscarRow.filter(
                  (zna) => {
                    let str = zna.DESCRIPCION.trim()
                    return str.toLowerCase() === query_val.toLowerCase()
                  }
                )
                obj.UsRecuperaTablaBuscarZonasActivasResult.TablaBuscarRow.unshift(
                  { ID: '0', DESCRIPCION: 'Todas las Zonas' }
                )
                let aux_id = '0'
                if (selected.length > 0) {
                  aux_id = selected[0].ID
                  paths.shift()
                }

                this.setState({
                  zonas_activas:
                    obj.UsRecuperaTablaBuscarZonasActivasResult.TablaBuscarRow,
                  zna_id: aux_id,
                })

                let parametros = { mensaje: '' }
                let ejemplo = { ID_CDD: this.state.ciudad.ID }
                FacadeClient.RunService(
                  FacadeClient.Services.UsRecuperaTablaBuscarCodigos_comercio,
                  parametros,
                  ejemplo,
                  undefined,
                  (obj) => {
                    if (paths.length > 0) {
                      query_val = unescape(paths[0]).split('-').join(' ')
                    }
                    let selected = obj.UsRecuperaTablaBuscarCodigos_comercioResult.TablaBuscarRow.filter(
                      (cga) => {
                        let str = cga.DESCRIPCION
                        if (str.substr(0, 3) === ' - ') {
                          str = str.substr(3, str.length)
                        }
                        return str.toLowerCase() === query_val.toLowerCase()
                      }
                    )

                    obj.UsRecuperaTablaBuscarCodigos_comercioResult.TablaBuscarRow.unshift(
                      { ID: '0', DESCRIPCION: 'Todas las Categorías' }
                    )
                    let aux_id = '0'
                    if (selected.length > 0) {
                      aux_id = selected[0].ID
                      paths.shift()
                    }
                    this.setState({
                      codigos_comercio:
                        obj.UsRecuperaTablaBuscarCodigos_comercioResult
                          .TablaBuscarRow,
                      cga_id: aux_id,
                    })

                    let aux_text = ''
                    if (paths.length > 0) {
                      aux_text = paths.join(' ')
                    }
                    aux_text = aux_text.split('-').join(' ')

                    this.setState({
                      codigos_comercio:
                        obj.UsRecuperaTablaBuscarCodigos_comercioResult
                          .TablaBuscarRow,
                      cga_id: aux_id,
                      txt_busqueda: aux_text,
                      lockScreen: 'unlockScreen',
                      redirect: false,
                      txt_error: '',
                    })
                    this.loadSearch(0)
                  },
                  (errMsg) => {
                    // error al recuperar las zonas activas
                    this.setState({
                      lockScreen: 'unlockScreen',
                      redirect: true,
                      txt_error: errMsg,
                    })
                  }
                )
              },
              (errMsg) => {
                // error al recuperar codigos de comercio
                if (errMsg === 'Negocio: No existen datos para la consulta') {
                  this.setState({
                    codigos_comercio: [],
                    lockScreen: 'unlockScreen',
                    redirect: false,
                    txt_error: '',
                  })
                } else {
                  this.setState({
                    lockScreen: 'unlockScreen',
                    redirect: true,
                    txt_error: errMsg,
                  })
                }
                this.setState({
                  lockScreen: 'unlockScreen',
                  redirect: true,
                  txt_error: errMsg,
                })
              }
            )
          },
          (errMsg) => {
            // Error al reuperar ciudades
            this.setState({
              lockScreen: 'unlockScreen',
              redirect: true,
              txt_error: errMsg,
            })
          }
        )
      },
      (errMsg) => {
        // Error al recuperar ciudad
        this.setState({
          lockScreen: 'unlockScreen',
          redirect: true,
          txt_error: errMsg,
        })
      }
    )
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  timer() {
    this.counter++
    if (this.counter === 0) {
      this.loadSearch(0)
    }
  }

  loadSearch = (gr = null) => {
    if (gr !== null) this.grupo = gr
    this.gr_aux = this.grupo + 1
    if (this.gr_aux === 1) {
      this.setState({ comercios: undefined })
    }

    if (
      this.state.comercios === undefined ||
      this.gr_aux <= Math.ceil(this.state.comercios.cantidad / this.gr_tam)
    ) {
      let parametros = {
        ruta: this.state.path,
        cantidad: 0,
        mensaje: '',
        OrdenarPor: '',
        GruposDe: this.gr_tam.toString(),
        Grupo: this.gr_aux.toString(),
      }
      FacadeClient.RunService(
        FacadeClient.Services.UsBuscaComercios,
        parametros,
        null,
        undefined,
        (obj) => {
          if (this.gr_aux === 1) {
            this.setState({ comercios: obj })
          } else {
            let aux_obj = this.state.comercios
            let aux_mat = aux_obj.UsBuscaComerciosResult.Comercio.concat(
              obj.UsBuscaComerciosResult.Comercio
            )
            aux_obj.UsBuscaComerciosResult.Comercio = aux_mat
            this.setState({ comercios: aux_obj })
          }
          this.grupo = this.gr_aux
        },
        (errMsg) => {
          console.log('Error al recuperar comercios ' + errMsg)
        }
      )
    }
  }

  onSearchClick = () => {
    this.counter = -1
    let aux = this.linkBuilder(this.state.txt_busqueda)
    this.setState({ path: aux })
  }

  handleScroll = (e) => {
    let element = e.target
    if (
      element.scrollHeight - element.scrollTop - element.clientHeight <=
      this.render_offset
    ) {
      if (this.gr_aux === this.grupo) {
        this.loadSearch()
      }
    }
  }
}

export default App
