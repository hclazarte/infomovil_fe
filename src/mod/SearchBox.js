import React from "react";

class SearchBox extends React.Component{
  constructor(props){
    super(props);

    this.state = {ciudad: {}, 
                  txt_busqueda: '', 
                  codigos_comercio: [], 
                  cga_id: '0', 
                  zonas_activas: [], 
                  zna_id:'0',
                  msg: 'Busca en...', 
                  clearClass: "svgClear-hidden"};
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onClearClick = this.onClearClick.bind(this);
  }
  render() {
    return (
      <div className="searchForm">
        <input className="searchInput" autoFocus 
                value={this.state.txt_busqueda} 
                onChange={this.onSearchChange}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
                ref = {(input)=>{this.searchInput = input}}
                placeholder={this.state.msg}>
        </input>
        <div onClick={this.onClearClick} className={this.state.clearClass}>
          <svg x="0px" y="0px" viewBox="0 0 340.8 340.8"  width="20px" height="20px">
            <g>
              <g>
                <path d="M170.4,0C76.4,0,0,76.4,0,170.4s76.4,170.4,170.4,170.4s170.4-76.4,170.4-170.4S264.4,0,170.4,0z M170.4,323.6
                  c-84.4,0-153.2-68.8-153.2-153.2S86,17.2,170.4,17.2S323.6,86,323.6,170.4S254.8,323.6,170.4,323.6z"/>
              </g>
            </g>
            <g>
              <g>
                <path d="M182.4,169.6l50-50c3.2-3.2,3.2-8.8,0-12c-3.2-3.2-8.8-3.2-12,0l-50,50l-50-50c-3.2-3.2-8.8-3.2-12,0
                  c-3.2,3.2-3.2,8.8,0,12l50,50l-50,49.6c-3.2,3.2-3.2,8.8,0,12c1.6,1.6,4,2.4,6,2.4s4.4-0.8,6-2.4l50-50l50,50c1.6,1.6,4,2.4,6,2.4
                  s4.4-0.8,6-2.4c3.2-3.2,3.2-8.8,0-12L182.4,169.6z"/>
              </g>
            </g>
          </svg>
        </div>
      </div>
    );
  }
  static getDerivedStateFromProps(props, state) {    
    let msg = ''
    if (props.cga_id !== undefined  && props.cga_id !== '' && props.cga_id !== '0') {
      let categoria = props.codigos_comercio.filter((categoria) => {return categoria.ID === props.cga_id})[0].DESCRIPCION
      msg += categoria.split('-').join(' ').trim() + ', '
    }
    if (props.zna_id !== undefined && props.zna_id !== '' && props.zna_id !== '0') {
      let zona = props.zonas_activas.filter((zona) => {return zona.ID === props.zna_id})[0].DESCRIPCION
      msg += zona.split('-').join(' ').trim() + ', '
    }
    if (props.ciudad.PAIS !== undefined) {
      msg += props.ciudad.CIUDAD + ', ' + props.ciudad.PAIS
    }

    if (props.ciudad !== state.ciudad || 
        props.txt_busqueda !== state.txt_busqueda ||
        props.codigos_comercio !== state.codigos_comercio ||
        props.cga_id !== state.cga_id || 
        props.zonas_activas !== state.zonas_activas ||
        props.zna_id !== state.zna_id ) {
      
        if (msg.length===0){
        msg = 'Busca en...';
      } 

      return {ciudad: props.ciudad, 
              txt_busqueda: props.txt_busqueda, 
              codigos_comercio: props.codigos_comercio, 
              cga_id: props.cga_id, 
              zonas_activas: props.zonas_activas, 
              zna_id: props.zna_id,
              msg: msg }
    }
    return null;
  }
  componentDidMount(){
    this.searchInput.focus();
  }
  onSearchChange(event){
    this.props.onSearchTextChanged(event.target.value);
  }
  onInputFocus(){
    this.setState({clearClass: "svgClear"})
  }
  onInputBlur(){
    this.setState({clearClass: "svgClear-hidden"})
  }
  onClearClick(){
    this.props.onSearchTextChanged("");
    this.searchInput.focus();
  }
}
export default SearchBox;