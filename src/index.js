import React from 'react';
import ReactDOM from 'react-dom';
import {FacadeClient} from './facadeclient';
import App from './mod/App';
import styles from './css/main.css';

ReactDOM.render(<App />, document.getElementById('root'));

// var parametros = {mensaje: '', strCiudad: ''};

// FacadeClient.RunService(FacadeClient.Services.RecuperaCiudad, parametros, null, "http://www.infomovil.com.bo/", (obj) => {
  
  //ReactDOM.render(<div className="hamMenuCanvasHide"></div>, document.getElementById('canvas'))
  //   mensaje: '',
  //   ID_CDD: obj[0].ID
  // };
  
//   FacadeClient.RunService(FacadeClient.Services.RecuperaTablaBuscarCodigos_comercio, parametros, null, "http://www.infomovil.com.bo/", (obj) => {
//     console.log(obj);
//   }, (errMsg) => {
//     console.log(errMsg);
//   });

//   parametros = {
//     OrdenarPor: 'DESCRIPCION',
//     mensaje: '',
//     ID_CDD: obj[0].ID
//   };

//   var ejemplo = {
//     xmlns: "http://tempuri.org/", 
//     ID: '',
//     ID_CDD: '',
//     DESCRIPCION: '',
//     SHAPE: '',
//     CENTRO: ''
//   };
//   FacadeClient.RunService(FacadeClient.Services.RecuperaTablaBuscarZonasActivas, parametros, ejemplo, "http://www.infomovil.com.bo/", (obj) => {
//     console.log(obj);
//   }, (errMsg) => {
//     console.log(errMsg);
//   });

// }, (errMsg) => {
//   console.log(errMsg);
// });

// parametros = {
//   mensaje: '',
//   ConnStr: 'User ID=INFOMOVIL;Password=INFO'
// };

// FacadeClient.RunService(FacadeClient.Services.RecuperaInfoPath, parametros, null, "http://www.infomovil.com.bo/", (obj) => {
//   console.log(obj);
// }, (errMsg) => {
//   console.log(errMsg);
// });

// var ejemplo = {
//   xmlns: "http://tempuri.org/", 
//   ID: '',
//   CIUDAD: '',
//   CMO_CENTRO: '',
//   PAIS: '',
//   COD_PAIS: ''
// };
// parametros = {
//   mensaje: '',
//   OrdenarPor: 'CIUDAD'
// };

// FacadeClient.RunService(FacadeClient.Services.RecuperaTablaBuscarCiudades, parametros, ejemplo, "http://www.infomovil.com.bo/", (obj) => {
//   console.log(obj);
// }, (errMsg) => {
//   console.log(errMsg);
// });