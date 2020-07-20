import React from "react";
import SidebarMenu from './SidebarMenu';
import SearchIcon from './SearchIcon';
import SearchBox from './SearchBox';
import Inicio from './Inicio';
import Ayuda from './Ayuda';
import Servicios from './Servicios';
import Error from './Error';
import Search from './Search';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import {FacadeClient} from '../facadeclient';
import wait_img from '../img/waiting2.gif'

class App extends React.Component {
  
  constructor(props){
    super(props);
    
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
            <Route path="/*">
              <Search path={this.state.path}></Search>
            </Route>
          </Switch>)
      }
    }

    this.renderRedirect = () => {
      if (this.state.path !== undefined) {
        return <Redirect to={this.state.path}/>;
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

    this.onSearchClick = this.onSearchClick.bind(this);

    this.state = {txt_error: '', redirect:false, lockScreen: "lockScreen", ciudad:[], ciudades: [], 
                  codigos_comercio: [], cga_id: '0', zonas_activas: [], zna_id:'0', txt_busqueda: '', 
                  path: decodeURI(window.location.pathname)};
  }
  render() {
    return (
      <Router>
        {this.renderRedirect()}
        <div className="main">
          <div className={this.state.lockScreen}>
            <img className="waitingImg" src={wait_img} width="100px"  height="100px" alt="Cargando..."></img>
          </div>
          <div className="topBarDiv">
            <table className="topBar">
              <tbody>
                <tr>
                  <td className="iconCell">
                    <SidebarMenu onCiudadChanged={this.onCiudadChanged} 
                                 onZonaChanged={this.onZonaChanged} 
                                 onCategoriaChanged={this.onCategoriaChanged}
                                 ciudad={this.state.ciudad} ciudades={this.state.ciudades} 
                                 codigos_comercio={this.state.codigos_comercio} cga_id={this.state.cga_id}
                                 zonas_activas={this.state.zonas_activas} zna_id={this.state.zna_id} />
                  </td>
                  <td>
                    <SearchBox onSearchTextChanged={this.onSearchTextChanged} 
                                onEnterPress={this.onEnterPress} ciudad={this.state.ciudad}
                                txt_busqueda={this.state.txt_busqueda}/>
                  </td>
                  <td className="iconCell">
                    <Link to={this.linkBuilder()}><SearchIcon onSearchClick={this.onSearchClick}/></Link>
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
    );
  }

  componentDidMount(){
    let paths = this.state.path.split('/').filter((aux_p) => {return aux_p !== ''});
    
    let query_val = '';
    if (paths.length > 1) { query_val = unescape(paths[1]).split('-').join(' ');}   
    let parametros = {mensaje: '', strCiudad: query_val};
    FacadeClient.RunService(FacadeClient.Services.UsRecuperaCiudad, parametros, null, undefined, (obj) => {
      this.setState({ciudad: obj[0]});
      if (obj[0].CIUDAD.toLowerCase() === query_val.toLowerCase()) {paths.shift(); paths.shift();} 
      let parametros = {mensaje: '', OrdenarPor: 'CIUDAD'};
      FacadeClient.RunService(FacadeClient.Services.UsRecuperaTodosCiudades, parametros, null, undefined, (obj) => {
        this.setState({ciudades: obj});
        
        let parametros = { mensaje: ''};
        let ejemplo = {ID_CDD: this.state.ciudad.ID};
        FacadeClient.RunService(FacadeClient.Services.UsRecuperaTablaBuscarZonasActivas, parametros, ejemplo, undefined, (obj) => {
          if (paths.length > 0) { query_val = unescape(paths[0]).split('-').join(' ');}
          let selected = obj.filter((zna) => { 
            let str = zna.DESCRIPCION.split(' ').join('-');
            return (str.toLowerCase() === query_val.toLowerCase())
          });
          obj.unshift({ID:"0", DESCRIPCION: "Todas las Zonas"});
          let aux_id = '0';
          if (selected.length > 0) { aux_id = selected[0].ID; paths.shift();}
          
          this.setState({zonas_activas: obj, zna_id: aux_id});
          
          let parametros = {OrdenarPor: 'DESCRIPCION', mensaje: ''};
          let  ejemplo = {ID_CDD: this.state.ciudad.ID};
          FacadeClient.RunService(FacadeClient.Services.UsRecuperaTablaBuscarCodigos_comercio, parametros, ejemplo, undefined, (obj) => {
            if (paths.length > 0) { query_val = unescape(paths[0]).split('-').join(' ');}
            let selected = obj.filter((cga) => {
              let str = cga.DESCRIPCION;
              if (str.substr(0,3) === ' - ') {
                str = str.substr(3, str.length);
              }
              return (str.toLowerCase() === query_val.toLowerCase())
            });
            
            obj.unshift({ID:"0", DESCRIPCION: "Todas las Categorías"});
            let aux_id = '0';
            if (selected.length > 0) { aux_id = selected[0].ID; paths.shift();}
            this.setState({codigos_comercio: obj, cga_id: aux_id});
            
            let aux_text = '';
            if (paths.length > 0 ){ aux_text = paths.join(' ');}
            aux_text = aux_text.split('-').join(' ');

            this.setState({codigos_comercio: obj, cga_id: aux_id, txt_busqueda: aux_text,  lockScreen: "unlockScreen", redirect: false, txt_error: ''});  
          }, (errMsg) => { // error al recuperar las zonas activas
            this.setState({lockScreen: "unlockScreen", redirect: true, txt_error: errMsg});
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

  onSearchClick = () => {
    this.setState({path: this.linkBuilder()})
  }

  onEnterPress = () => {
    let aux = this.linkBuilder();
    this.setState({path: aux});
  }
}

export default App;
