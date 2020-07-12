import React from "react";

class SearchForm extends React.Component{
  constructor(props){
    super(props);
    let msg = 'Busca en ' + props.ciudad + ', ' + props.pais;

    this.state = {txt_busqueda: '', msg: msg};
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  render() {
    return (
      <div className="searchForm" >
        <label id="screenReaderText" className="screenReaderText">{this.state.msg}</label>
        <input  className="searchInput" autoFocus 
                value={this.state.txt_busqueda} 
                onChange={this.onSearchChange}
                ref = {(input)=>{this.searchInput = input}}>
        </input>
      </div>
    );
  }
  componentWillReceiveProps(props) {
    let msg = 'Busca en ' + props.ciudad + ', ' + props.pais;
    this.setState({txt_busqueda:this.state.txt_busqueda, msg: msg})
    }
  componentDidMount(){
    this.searchInput.focus();
  }
  onSearchChange(event){
    let txt = event.target.value;
    let msg = 'Busca en ' + this.props.ciudad + ', ' + this.props.pais;
    if (txt !== '') {
      this.setState({txt_busqueda:txt, msg: ''});
    }
    else {
      this.setState({txt_busqueda:txt, msg: msg});
    }
  }
}
export default SearchForm;