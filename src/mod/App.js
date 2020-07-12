import React from "react";
import ReactDOM from 'react-dom';
import MenuIcon from './MenuIcon';
import SearchIcon from './SearchIcon';
import SearchForm from './SearchForm';
import Inicio from './Inicio';
import Ayuda from './Ayuda';
import Servicios from './Servicios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {FacadeClient} from '../facadeclient';


const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>Inicio</div>,
    main: () => <Inicio/>
  },
  {
    path: "/ayuda",
    sidebar: () => <div>Ayuda</div>,
    main: () => <Ayuda/>
  },
  {
    path: "/servicios",
    sidebar: () => <div>Servicios</div>,
    main: () => <Servicios/>
  }
];

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {lockScreen: "lockScreen", id_cdd: '', ciudad: '', pais: ''};
  }
  render() {
    return (
      <Router>
        <div id="main">
          <div className={this.state.lockScreen}></div>
          <table className="topBar">
            <tbody>
              <tr>
                <td className="iconCell">
                  <MenuIcon/>
                </td>
                <td>
                  <div id="centerPanel">
                    <SearchForm id_cdd={this.state.id_cdd} ciudad = {this.state.ciudad} pais={this.state.pais}/>
                  </div>
                </td>
                <td className="iconCell"> 
                  <Link to="/busqueda"><SearchIcon/></Link>
                </td>
              </tr>
            </tbody>
          </table>
          <div id="content">
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.main />}
                />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
  componentDidMount(){
    let parametros = {mensaje: '', strCiudad: ''};
    FacadeClient.RunService(FacadeClient.Services.RecuperaCiudad, parametros, null, "http://www.infomovil.com.bo/", (obj) => {

    this.setState({lockScreen: "lockScreen", id_cdd: obj[0].ID, ciudad: obj[0].CIUDAD, pais: obj[0].PAIS});
    
    let parametros = { mensaje: '', ID_CDD: obj[0].ID};
    FacadeClient.RunService(FacadeClient.Services.RecuperaTablaBuscarCodigos_comercio, parametros, null, "http://www.infomovil.com.bo/", (obj) => {
        console.log(obj);
        this.setState({lockScreen: "unlockScreen", id_cdd: this.state.id_cdd, ciudad: this.state.ciudad, pais: this.state.pais});
      }, (errMsg) => {
        console.log(errMsg); // error al recuoperar la ciudad
      });
    }, (errMsg) => {
      console.log(errMsg); // Error al recuperar categorias
    });
  }
}

export default App;
