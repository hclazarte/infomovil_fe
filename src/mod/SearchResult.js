import React from "react";
import '../css/SearchResult.css';

class SearchResult  extends React.Component {
  constructor(props){
    super(props);

    this.state = {comercios: undefined};

    this.renderResultado = () => {
      var coincidencias = 0;
      
      if (this.state.comercios !== undefined) coincidencias = parseInt(this.state.comercios.cantidad, 10);
      if (coincidencias === 0 ) {
        return (
          <p className="Resultado">No se encontraron coincidencias para su búsqueda</p>
        )
      }
    }
    this.renderComercios = () => {
      if (this.state.comercios !== undefined) {
        if ( this.state.comercios.UsBuscaComerciosResult.Comercio.map !== undefined) {
          return (
            <ol>
                {this.state.comercios.UsBuscaComerciosResult.Comercio.map(item => 
                <li className="resultList" key={item.ID}>
                  <div className="resultListBox">
                    <div className="empresa">{item.EMPRESA}</div>
                    {item.SERVICIOS}<br/>
                    {item.CALLE_NUMERO}  {item.ZONA}<br/>
                    {item.TELEFONO1}  {item.TELEFONO2}  {item.TELEFONO3}
                  </div>
                </li>)}
            </ol>
          )
        }
      } else {
        return
      }
    }
  }
  render() {
    return (
      <div> 
        {this.renderResultado()}
        {this.renderComercios()}
      </div>
    )
  }
  static getDerivedStateFromProps(props, state) {    
    if (props.comercios !== state.comercios) {
      return {comercios: props.comercios};
    }
    return null;
  }
}
export default  SearchResult;