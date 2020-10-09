import React from 'react'
import errorImg from '../img/Error.png'

class Error extends React.Component {
  constructor(props) {
    super(props)

    this.state = { txt_error: props.txt_error }
  }

  render() {
    return (
      <div id='Error'>
        <img
          className='imgError'
          src={errorImg}
          width='100px'
          height='100px'
          alt='Error'
        />
        <p className='txtError'>
          Algo anormal a ocurrido. Perdone las molestias
        </p>
        <br />
        <p className='txtError'>el último mensaje que recibimos dice:</p>
        <br />
        <p className='txtError'>{this.state.txt_error}</p>
      </div>
    )
  }
}

export default Error
