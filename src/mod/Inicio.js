import React from 'react'

class Inicio extends React.Component {
  render() {
    return (
      <div id='inicio'>
        <p className='inicio_titulo'>Infomóvil</p>
        <p className='inicio_contenido'>
          Infomóvil es una guía de comercios ligada a un mapa que nos ayuda a
          localizar los bienes o servicios que demandamos en la ciudad. En su
          Base de Datos se pueden encontrar los comercios organizados por zonas
          y categorías. Infomóvil cuenta con un poderoso motor de búsquedas que
          en cuestión de segundos puede localizar y mostrarnos en el mapa la
          dirección de los comercios más cercanos que coinciden con nuestra
          búsqueda. Nos brinda datos sobre teléfonos, servicios, ofertas
          horarios de atención y enlaces a los comercios más importantes. Si es
          la primera vez que utilizas Infomóvil revisa la Ayuda
        </p>
      </div>
    )
  }
}

export default Inicio
