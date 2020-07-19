import React from "react";
import SidebarMenu from './SidebarMenu';
import SearchIcon from './SearchIcon';
import SearchForm from './SearchForm';
import Inicio from './Inicio';
import Ayuda from './Ayuda';
import Servicios from './Servicios';
import Error from './Error';
import Search from './Search';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {FacadeClient} from '../facadeclient';
import wait_img from '../img/waiting2.gif'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {txt_error: '', redirect:false, lockScreen: "lockScreen", ciudad:[], ciudades: [], codigos_comercio: [], 
                  zonas_activas: [], zna_id:'0', cga_id: '0', txt_busqueda: ''};

    this.renderError = () => {
      if (this.state.redirect) {
        return (<Error txt_error={this.state.txt_error}></Error>)
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
            <Route path="/:id">
              <Search ciudad={this.state.ciudad}></Search>
            </Route>
          </Switch>)
      }
    }

    this.onCiudadChanged = (new_ciudad) => {
      this.setState({ciudad: new_ciudad, lockScreen: "lockScreen"});

      let parametros = { mensaje: ''};
      let ejemplo = {ID_CDD: new_ciudad.ID};
      FacadeClient.RunService(FacadeClient.Services.UsRecuperaTablaBuscarCodigos_comercio, parametros, ejemplo, undefined, (obj) => {
        obj.unshift({ID:"0", DESCRIPCION: "Todas las Categorías"});
        this.setState({codigos_comercio: obj});

        let parametros = {OrdenarPor: 'DESCRIPCION', mensaje: ''};
        let  ejemplo = {ID_CDD: new_ciudad.ID};
        FacadeClient.RunService(FacadeClient.Services.UsRecuperaTablaBuscarZonasActivas, parametros, ejemplo, undefined, (obj) => {
          obj.unshift({ID:"0", DESCRIPCION: "Todas las Zonas"});
          this.setState({zonas_activas: obj, lockScreen: "unlockScreen", redirect: false, txt_error: ''});
          
        }, (errMsg) => {  // error al recuperar las zonas activas
          if (errMsg === "Negocio: No existen datos para la consulta") {
            this.setState({zonas_activas: [], lockScreen: "unlockScreen", redirect: false, txt_error: ''});
          } else {
            this.setState({lockScreen: "unlockScreen", redirect: true, txt_error: errMsg});
          }
        });
      }, (errMsg) => { // error al recuperar codigos de comercio
        if (errMsg === "Negocio: No existen datos para la consulta") {
          this.setState({codigos_comercio: [], lockScreen: "unlockScreen", redirect: false, txt_error: ''});
        } else {
          this.setState({lockScreen: "unlockScreen", redirect: true, txt_error: errMsg});
        }
        this.setState({lockScreen: "unlockScreen", redirect: true, txt_error: errMsg});
      });
    }

    this.onZonaChanged = (new_zna_id) => {
      this.setState({zna_id: new_zna_id});
    }

    this.onCategoriaChanged = (new_cga_id) => {
      this.setState({cga_id: new_cga_id});
    }

    this.onSearchTextChanged = (search_text) => {
      this.setState({txt_busqueda: search_text});
    }

    this.linkBuilder = () => {
      let aux = '';
      if (this.state.ciudad.PAIS !== undefined) {
        aux += '/'+this.state.ciudad.PAIS.split(' ').join('-')+'/'+this.state.ciudad.CIUDAD.split(' ').join('-');
      }
      if (this.state.zna_id !== undefined && this.state.zna_id !== '' && this.state.zna_id !== '0') {
        let zona = this.state.zonas_activas.filter((zona) => {return zona.ID === this.state.zna_id});
        if (zona.length > 0){
          aux += '/' + zona[0].DESCRIPCION.split(' ').join('-');
        }
      }
      if (this.state.cga_id !== undefined && this.state.cga_id !== '' && this.state.cga_id !== '0') {
        let categoria = this.state.codigos_comercio.filter((categoria) => {return categoria.ID === this.state.cga_id});
        if (categoria.length > 0) {
          let str = categoria[0].DESCRIPCION;
          if (str.substr(0,3) === ' - ') {
            str = str.substr(3, str.length);
          }
          aux += '/' + str.split(' ').join('-');
        }
      }
      if (this.state.txt_busqueda !== '') {
        aux += '/' + this.state.txt_busqueda.split(' ').join('-');
      }
      return aux;
    }
  }
  render() {
    return (
      <Router>
        <div id="main">
          <div className={this.state.lockScreen}>
            <img className="waitingImg" src={wait_img} width="100px"  height="100px" alt="Esperando..."></img>
          </div>
          <table className="topBar">
            <tbody>
              <tr>
                <td className="iconCell">
                  <SidebarMenu onCiudadChanged={this.onCiudadChanged} onZonaChanged={this.onZonaChanged} onCategoriaChanged={this.onCategoriaChanged}
                  ciudad={this.state.ciudad} ciudades={this.state.ciudades} codigos_comercio={this.state.codigos_comercio} zonas_activas={this.state.zonas_activas}/>
                </td>
                <td>
                  <SearchForm onSearchTextChanged={this.onSearchTextChanged} ciudad={this.state.ciudad}/>
                </td>
                <td className="iconCell">
                  <Link to={this.linkBuilder()}><SearchIcon/></Link>
                </td>
              </tr>
            </tbody>
          </table>
          <div id="content">
            {this.renderError()}
            {this.renderRoute()}
          </div>
        </div>
      </Router>
    );
  }
  componentDidMount(){
    let parametros = {mensaje: '', strCiudad: ''};
    FacadeClient.RunService(FacadeClient.Services.UsRecuperaCiudad, parametros, null, undefined, (obj) => {
      this.setState({ciudad: obj[0]});
      
      let parametros = {mensaje: '', OrdenarPor: 'CIUDAD'};
      FacadeClient.RunService(FacadeClient.Services.UsRecuperaTodosCiudades, parametros, null, undefined, (obj) => {
        this.setState({ciudades: obj});

        let parametros = { mensaje: ''};
        let ejemplo = {ID_CDD: this.state.ciudad.ID};
        FacadeClient.RunService(FacadeClient.Services.UsRecuperaTablaBuscarCodigos_comercio, parametros, ejemplo, undefined, (obj) => {
          obj.unshift({ID:"0", DESCRIPCION: "Todas las Categorías"});
          this.setState({codigos_comercio: obj});
             
          let parametros = {OrdenarPor: 'DESCRIPCION', mensaje: ''};
          let  ejemplo = {ID_CDD: this.state.ciudad.ID};
          FacadeClient.RunService(FacadeClient.Services.UsRecuperaTablaBuscarZonasActivas, parametros, ejemplo, undefined, (obj) => {
            obj.unshift({ID:"0", DESCRIPCION: "Todas las Zonas"});
            this.setState({zonas_activas: obj, lockScreen: "unlockScreen", redirect: false, txt_error: ''});
            
          }, (errMsg) => { // error al recuperar las zonas activas
            if (errMsg === "Negocio: No existen datos para la consulta") {
              this.setState({zonas_activas: [], lockScreen: "unlockScreen", redirect: false, txt_error: ''});
            } else {
              this.setState({lockScreen: "unlockScreen", redirect: true, txt_error: errMsg});
            }
          });
        }, (errMsg) => { // error al recuperar codigos de comercio
          if (errMsg === "Negocio: No existen datos para la consulta") {
            this.setState({codigos_comercio: [], lockScreen: "unlockScreen", redirect: false, txt_error: ''});
          } else {
            this.setState({lockScreen: "unlockScreen", redirect: true, txt_error: errMsg});
          }
          this.setState({lockScreen: "unlockScreen", redirect: true, txt_error: errMsg});
        });
      }, (errMsg) => { // Error al reuperar ciudades 
        this.setState({lockScreen: "unlockScreen", redirect: true, txt_error: errMsg});
      });
    }, (errMsg) => { // Error al recuperar ciudad
      this.setState({lockScreen: "unlockScreen", redirect: true, txt_error: errMsg});
    });
  }
}

export default App;
