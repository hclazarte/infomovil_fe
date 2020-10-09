import React from 'react'
import '../css/SearchResult.css'
import wait_img from '../img/waiting3.gif'

class SearchResult extends React.Component {
  constructor (props) {
    super(props)

    this.state = { comercios: undefined }

    this.renderResultado = () => {
      if (this.state.comercios === undefined) {
        return (
          <div className='waitingDivCom'>
            <img className='waitingCom' src={wait_img} width='10px' alt='Cargando...' />
          </div>
        )
      } else if (this.state.comercios.UsBuscaComerciosResult.Comercio.length === 0) {
        return (
          <p>No existen coincidencias para su búsqueda</p>
        )
      }
    }
    this.renderComercios = () => {
      if (this.state.comercios !== undefined) {
        if (this.state.comercios.UsBuscaComerciosResult.Comercio.map !== undefined) {
          return (
            <ol>
              {this.state.comercios.UsBuscaComerciosResult.Comercio.map(item =>
                <li className='resultList' key={item.ID}>
                  <div className='resultListBox'>
                    <div className='empresa'>{item.EMPRESA}</div>
                    {item.SERVICIOS}<br />
                    {item.CALLE_NUMERO}  {item.ZONA}<br />
                    {item.TELEFONO1}  {item.TELEFONO2}  {item.TELEFONO3}
                  </div>
                </li>)}
            </ol>
          )
        }
      } else {

      }
    }
  }

  render () {
    return (
      <div>
        {this.renderResultado()}
        {this.renderComercios()}
      </div>
    )
  }

  static getDerivedStateFromProps (props, state) {
    if (props.comercios !== state.comercios) {
      return { comercios: props.comercios }
    }
    return null
  }
}
export default SearchResult
