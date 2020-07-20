import React from "react";

class SearchBox extends React.Component{
  constructor(props){
    super(props);

    this.state = {txt_busqueda: '', msg: 'Busca en...'};
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  render() {
    return (
      <div className="searchForm" >
        <input id="searchInput" className="searchInput" autoFocus 
                value={this.state.txt_busqueda} 
                onChange={this.onSearchChange}
                onKeyPress={this.onKeyPress}
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
    this.setState({msg: msg, txt_busqueda: props.txt_busqueda})
  }
  componentDidMount(){
    this.searchInput.focus();
  }
  onSearchChange(event){
    this.setState({txt_busqueda: event.target.value})
    this.props.onSearchTextChanged(event.target.value);
  }
  onKeyPress(event){
    if (event.key === 'Enter') {
      this.props.onEnterPress();
    }
  }
}
export default SearchBox;