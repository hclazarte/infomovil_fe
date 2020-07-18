import React from "react";
import {FacadeClient} from '../facadeclient';

class Search  extends React.Component {
  constructor(props){
    super(props);

    this.state = {path: window.location.pathname};
  }
  render() {
      return (
        <div>
          Hola INFO, esta seria la primera busqueda del nuevo info
          {this.state.path}
        </div>
      )
    }
}
export default  Search;