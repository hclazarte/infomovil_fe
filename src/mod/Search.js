import React from "react";
import {FacadeClient} from '../facadeclient';

class Search  extends React.Component {
  constructor(props){
    super(props);

    this.state = {path: props.path};
  }
  render() {
    return (
      <div>
        Hola INFO, esta seria la primera busqueda del nuevo info <br/>
        <span>{this.state.path}</span>
      </div>
    )
  }
  UNSAFE_componentWillReceiveProps(props) {
    this.setState({path: props.path});
  }
}
export default  Search;