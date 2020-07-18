import React from "react";

class SearchForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {txt_busqueda: '', msg: 'Busca en...'};
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  render() {
    return (
      <div className="searchForm" >
        <input id="searchInput" className="searchInput" autoFocus 
                value={this.state.txt_busqueda} 
                onChange={this.onSearchChange}
                ref = {(input)=>{this.searchInput = input}}
                placeholder={this.state.msg}>
        </input>
      </div>
    );
  }
  UNSAFE_componentWillReceiveProps(props) {
    let msg = '';
    if (this.props.ciudad.length===0){
      msg = 'Busca en...';
    } else {
      msg = 'Busca en ' + this.props.ciudad.CIUDAD + ', ' + this.props.ciudad.PAIS;
    }
    this.setState({msg: msg})
    }
  componentDidMount(){
    this.searchInput.focus();
  }
  onSearchChange(event){
    this.setState({txt_busqueda: event.target.value})
    this.props.onSearchTextChanged(event.target.value);
  }
}
export default SearchForm;