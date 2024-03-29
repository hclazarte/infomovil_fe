import React from 'react'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import i18n from '../i18n'

class SidebarMenu extends React.Component {
  derivedStateChanged = false

  constructor(props) {
    super(props)
    this.state = {
      style: 'hamMenuCanvasHide',
      ciudad: [],
      ciudades: [],
      codigos_comercio: [],
      zonas_activas: [],
      zna_id: '0',
      cga_id: '0'
    }
    this.onMenuClick = this.onMenuClick.bind(this)
    this.onPanellClick = this.onPanellClick.bind(this)
    this.onMenuOptClick = this.onMenuOptClick.bind(this)
    this.onCiudadChanged = this.onCiudadChanged.bind(this)
    this.onZonasActivasChanged = this.onZonasActivasChanged.bind(this)
    this.onCategoriasActivasChanged = this.onCategoriasActivasChanged.bind(this)
  }

  render() {
    this.renderZonas = () => {
      if (this.state.zonas_activas.length > 3) {
        return (
          <li>
            <div className='hamMenuDiv'>
              <svg
                className='menuIcon'
                x='0px'
                y='0px'
                viewBox='0 0 390 390'
                width='20px'
                height='20px'
              >
                <g>
                  <g>
                    <path
                      d='M362.072,63c0.1-0.3-0.1-0.6-0.1-0.9V10c0.2-5.3-4-9.8-9.4-10c-0.1,0-0.2,0-0.3,0h-314.7c-5.3,0-9.7,4.4-9.6,9.7
                    c0,0.1,0,0.2,0,0.3v52.1c0,0.3-0.2,0.6-0.1,0.9c0,0.1-0.1,0.3,0,0.4c0,0.2,0,0.4,0,0.5c0,0.2,0,0.3,0.1,0.5
                    c0.1,0.2,0.1,0.3,0.1,0.4c0,0.1,0.1,0.3,0.1,0.5c0,0.1,0.1,0.3,0.1,0.4c0.1,0.2,0.1,0.3,0.2,0.5c0.1,0.1,0.1,0.3,0.2,0.4
                    c0.1,0.1,0.1,0.3,0.2,0.4c0.1,0.1,0.2,0.3,0.2,0.4c0,0.1,0.2,0.3,0.2,0.4c0.1,0.1,0.2,0.3,0.3,0.4s0.2,0.2,0.2,0.3
                    c0,0,0.2,0,0.3,0.1l119.9,141V380c-0.1,3.8,2,7.3,5.5,9c1.3,0.6,2.7,1,4.2,1c2.3,0,4.5-0.8,6.2-2.2l70.6-57.3
                    c2.3-1.9,3.6-4.8,3.5-7.8V209.6l119.8-141c0,0,0.1,0,0.2-0.1c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.2-0.3,0.3-0.4s0.2-0.3,0.3-0.4
                    c0.1-0.1,0.2-0.3,0.2-0.4c0.1-0.1,0.2-0.3,0.2-0.4c0.1-0.1,0.1-0.3,0.2-0.4c0.1-0.2,0.1-0.3,0.2-0.5c0.1-0.1,0.1-0.3,0.1-0.4
                    c0.1-0.2,0.1-0.3,0.1-0.5s0.1-0.3,0.1-0.4c0-0.1,0.1-0.3,0.1-0.5c0-0.2,0.1-0.4,0.1-0.5C362.172,63.3,361.972,63.1,362.072,63z
                    M222.572,199.4c-1.6,1.8-2.5,4.1-2.6,6.5v112l-50,41.1V205.9c-0.1-2.4-1-4.7-2.6-6.5L59.172,72h271.6L222.572,199.4z M341.972,52
                    h-294V20h294V52z'
                    />
                  </g>
                </g>
              </svg>
              <select
                className='hamMenuDropdown'
                value={this.state.zna_id}
                onChange={this.onZonasActivasChanged}
              >
                {this.state.zonas_activas.map((item) => (
                  <option value={item.ID} key={item.ID}>
                    {item.DESCRIPCION}
                  </option>
                ))}
              </select>
            </div>
          </li>
        )
      }
    }
    this.renderCategorias = () => {
      if (this.state.codigos_comercio.length > 3) {
        return (
          <li>
            <div className='hamMenuDiv'>
              <svg
                className='menuIcon'
                x='0px'
                y='0px'
                viewBox='0 0 390 390'
                width='20px'
                height='20px'
              >
                <g>
                  <g>
                    <path
                      d='M362.072,63c0.1-0.3-0.1-0.6-0.1-0.9V10c0.2-5.3-4-9.8-9.4-10c-0.1,0-0.2,0-0.3,0h-314.7c-5.3,0-9.7,4.4-9.6,9.7
                    c0,0.1,0,0.2,0,0.3v52.1c0,0.3-0.2,0.6-0.1,0.9c0,0.1-0.1,0.3,0,0.4c0,0.2,0,0.4,0,0.5c0,0.2,0,0.3,0.1,0.5
                    c0.1,0.2,0.1,0.3,0.1,0.4c0,0.1,0.1,0.3,0.1,0.5c0,0.1,0.1,0.3,0.1,0.4c0.1,0.2,0.1,0.3,0.2,0.5c0.1,0.1,0.1,0.3,0.2,0.4
                    c0.1,0.1,0.1,0.3,0.2,0.4c0.1,0.1,0.2,0.3,0.2,0.4c0,0.1,0.2,0.3,0.2,0.4c0.1,0.1,0.2,0.3,0.3,0.4s0.2,0.2,0.2,0.3
                    c0,0,0.2,0,0.3,0.1l119.9,141V380c-0.1,3.8,2,7.3,5.5,9c1.3,0.6,2.7,1,4.2,1c2.3,0,4.5-0.8,6.2-2.2l70.6-57.3
                    c2.3-1.9,3.6-4.8,3.5-7.8V209.6l119.8-141c0,0,0.1,0,0.2-0.1c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.2-0.3,0.3-0.4s0.2-0.3,0.3-0.4
                    c0.1-0.1,0.2-0.3,0.2-0.4c0.1-0.1,0.2-0.3,0.2-0.4c0.1-0.1,0.1-0.3,0.2-0.4c0.1-0.2,0.1-0.3,0.2-0.5c0.1-0.1,0.1-0.3,0.1-0.4
                    c0.1-0.2,0.1-0.3,0.1-0.5s0.1-0.3,0.1-0.4c0-0.1,0.1-0.3,0.1-0.5c0-0.2,0.1-0.4,0.1-0.5C362.172,63.3,361.972,63.1,362.072,63z
                    M222.572,199.4c-1.6,1.8-2.5,4.1-2.6,6.5v112l-50,41.1V205.9c-0.1-2.4-1-4.7-2.6-6.5L59.172,72h271.6L222.572,199.4z M341.972,52
                    h-294V20h294V52z'
                    />
                  </g>
                </g>
              </svg>
              <select
                className='hamMenuDropdown'
                value={this.state.cga_id}
                onChange={this.onCategoriasActivasChanged}
              >
                {this.state.codigos_comercio.map((item) => (
                  <option value={item.ID} key={item.ID}>
                    {item.DESCRIPCION}
                  </option>
                ))}
              </select>
            </div>
          </li>
        )
      }
    }
    //i18n.changeLanguage('en');
    return (
      <div>
        <button className='headerButton' onClick={this.onMenuClick}>
          <svg className='svgIcon' viewBox='0 0 100 100' width='24' height='24'>
            <rect y='10' width='100' height='12'></rect>
            <rect y='45' width='100' height='12'></rect>
            <rect y='80' width='100' height='12'></rect>
          </svg>
        </button>
        <div className={this.state.style}>
          <table className='tb'>
            <tbody>
              <tr>
                <td>
                  <div className='hamMenu'>
                    <ul>
                      <li>
                        <Link to='/' onClick={this.onMenuOptClick}>
                          <div className='hamMenuDiv'>
                            <svg
                              className='menuIcon'
                              x='0px'
                              y='0px'
                              width='20px'
                              height='20px'
                              viewBox='0 0 477.846 477.846'
                            >
                              <g>
                                <g>
                                  <path
                                    d='M472.847,226.846l-34.116-34.116L250.998,4.997c-6.664-6.663-17.468-6.663-24.132,0L39.132,192.73L4.999,226.864
                                  c-6.548,6.78-6.361,17.584,0.419,24.132c6.614,6.388,17.099,6.388,23.713,0l4.983-5.018v214.801
                                  c0,9.426,7.641,17.067,17.067,17.067h375.467c9.426,0,17.067-7.641,17.067-17.067V245.978l5,5.001
                                  c6.78,6.548,17.584,6.36,24.132-0.419C479.235,243.946,479.235,233.46,472.847,226.846z M290.115,443.713h-102.4V307.179h102.4
                                  V443.713z M409.581,443.713h-85.333v-153.6c0-9.426-7.641-17.067-17.067-17.067H170.648c-9.426,0-17.067,7.641-17.067,17.067
                                  v153.6H68.248V211.845L238.914,41.178l170.667,170.667V443.713z'
                                  />
                                </g>
                              </g>
                            </svg>
                            {i18n.t('inicio')}
                            {/* Inicio */}
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to='/ayuda' onClick={this.onMenuOptClick}>
                          <div className='hamMenuDiv'>
                            <svg
                              className='menuIcon'
                              version='1.1'
                              x='0px'
                              y='0px'
                              width='20px'
                              height='20px'
                              viewBox='0 0 512 512'
                            >
                              <g>
                                <g>
                                  <g>
                                    <circle cx='256' cy='378.5' r='25' />
                                    <path
                                      d='M256,0C114.516,0,0,114.497,0,256c0,141.484,114.497,256,256,256c141.484,0,256-114.497,256-256
                                    C512,114.516,397.503,0,256,0z M256,472c-119.377,0-216-96.607-216-216c0-119.377,96.607-216,216-216
                                    c119.377,0,216,96.607,216,216C472,375.377,375.393,472,256,472z'
                                    />
                                    <path
                                      d='M256,128.5c-44.112,0-80,35.888-80,80c0,11.046,8.954,20,20,20s20-8.954,20-20c0-22.056,17.944-40,40-40
                                    c22.056,0,40,17.944,40,40c0,22.056-17.944,40-40,40c-11.046,0-20,8.954-20,20v50c0,11.046,8.954,20,20,20
                                    c11.046,0,20-8.954,20-20v-32.531c34.466-8.903,60-40.26,60-77.469C336,164.388,300.112,128.5,256,128.5z'
                                    />
                                  </g>
                                </g>
                              </g>
                            </svg>
                            {i18n.t('ayuda')}
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to='/servicios' onClick={this.onMenuOptClick}>
                          <div className='hamMenuDiv'>
                            <svg
                              className='menuIcon'
                              width='20px'
                              height='20px'
                              viewBox='0 0 512 512'
                            >
                              <g>
                                <path d='m483.615 289.944c-5.432-1.048-10.668 2.505-11.712 7.927-19.878 103.161-110.679 178.035-215.903 178.035-103.007 0-192.191-71.753-214.552-171.553l2.61 2.61c1.953 1.953 4.512 2.93 7.071 2.93s5.118-.977 7.07-2.929c3.906-3.905 3.906-10.236.001-14.142l-20.565-20.566c-1.875-1.876-4.419-2.93-7.071-2.93s-5.196 1.054-7.071 2.93l-20.564 20.566c-3.905 3.905-3.905 10.236.001 14.142 3.904 3.906 10.237 3.905 14.142-.001l3.702-3.702c22.317 111.726 120.979 192.645 235.226 192.645 114.793 0 213.853-81.694 235.542-194.25 1.045-5.423-2.504-10.667-7.927-11.712z' />
                                <path d='m509.07 205.036c-3.904-3.906-10.237-3.905-14.142.001l-3.702 3.702c-22.317-111.726-120.979-192.645-235.226-192.645-114.793 0-213.853 81.694-235.542 194.25-1.045 5.424 2.504 10.667 7.927 11.712 5.43 1.043 10.667-2.506 11.712-7.927 19.879-103.161 110.68-178.035 215.903-178.035 103.007 0 192.191 71.753 214.552 171.553l-2.61-2.61c-3.904-3.905-10.235-3.906-14.142-.001-3.906 3.905-3.906 10.236-.001 14.142l20.564 20.566c1.875 1.876 4.419 2.93 7.071 2.93s5.196-1.054 7.071-2.93l20.564-20.566c3.908-3.905 3.908-10.237.001-14.142z' />
                                <path d='m256 425.039c93.208 0 169.039-75.831 169.039-169.039s-75.831-169.039-169.039-169.039-169.039 75.831-169.039 169.039 75.831 169.039 169.039 169.039zm0-318.078c82.181 0 149.039 66.858 149.039 149.039s-66.858 149.039-149.039 149.039-149.039-66.858-149.039-149.039 66.858-149.039 149.039-149.039z' />
                                <path d='m266.552 300.082c1.212.483 2.462.711 3.692.711 3.976 0 7.736-2.388 9.295-6.308l27.675-69.579c2.041-5.132-.465-10.947-5.596-12.988-5.13-2.04-10.947.464-12.988 5.597l-27.675 69.579c-2.041 5.132.465 10.947 5.597 12.988z' />
                                <path d='m323.063 231.21h22.96l-24.423 55.556c-2.223 5.056.074 10.956 5.13 13.179 1.31.576 2.675.849 4.02.849 3.846-.001 7.513-2.232 9.159-5.978l30.588-69.58c1.359-3.093 1.066-6.662-.78-9.49-1.847-2.829-4.996-4.534-8.374-4.534h-38.279c-5.522 0-10 4.478-10 10-.001 5.52 4.476 9.998 9.999 9.998z' />
                                <path d='m195.058 275.338c1.799 3.047 5.073 4.916 8.611 4.916h24.728c-.028 3.686-.057 7.217-.085 10.45-.047 5.523 4.392 10.038 9.914 10.086h.088c5.482 0 9.95-4.421 9.998-9.914.023-2.617.053-6.331.087-10.675 5.036-.519 8.965-4.774 8.965-9.947 0-5.128-3.859-9.354-8.832-9.933.09-16.277.124-32.664-.08-35.118-.535-6.431-4.463-11.694-10.007-13.412-5.536-1.712-11.357.354-15.574 5.528-3.96 4.857-20.87 35.259-27.957 48.104-1.71 3.099-1.655 6.868.144 9.915zm33.533-29.048c-.015 4.319-.036 9.072-.063 13.964h-7.85c2.779-4.951 5.48-9.722 7.913-13.964z' />
                                <path d='m189.009 301.31c5.522-.069 9.942-4.603 9.873-10.125-.068-5.479-4.532-9.874-9.996-9.874-.043 0-.086 0-.129.001-5.475.068-11.227.119-16.424.144 3.598-4.871 8.217-11.254 14.052-19.591 4.603-6.576 7.612-12.828 8.946-18.581.328-1.276.6-3.081.603-4.95.022-15.332-12.473-27.805-27.805-27.805-13.256 0-24.729 9.432-27.283 22.426-1.064 5.419 2.465 10.675 7.885 11.74 5.423 1.067 10.676-2.465 11.74-7.885.715-3.64 3.936-6.281 7.658-6.281 4.133 0 7.525 3.23 7.788 7.297l-.175 1.369c-.597 2.281-2.086 5.977-5.742 11.201-10.997 15.712-17.557 24.301-21.081 28.915-4.519 5.917-7.008 9.176-5.345 14.588.979 3.181 3.477 5.719 6.69 6.791 1.335.445 2.404.801 16.061.801 5.362-.001 12.664-.055 22.684-.181z' />
                              </g>
                            </svg>
                            {i18n.t('servicios')}
                          </div>
                        </Link>
                      </li>
                      <li>
                        <div className='hamMenuSep'></div>
                      </li>
                      <li>
                        <div className='hamMenuDiv'>
                          <svg
                            className='menuIcon'
                            width='20px'
                            height='20px'
                            x='0px'
                            y='0px'
                            viewBox='0 0 512 512'
                          >
                            <g>
                              <g>
                                <path
                                  d='M437.019,74.98C388.667,26.629,324.38,0,256,0C187.619,0,123.331,26.629,74.98,74.98C26.628,123.332,0,187.62,0,256
                              s26.628,132.667,74.98,181.019C123.332,485.371,187.619,512,256,512c68.38,0,132.667-26.629,181.019-74.981
                              C485.371,388.667,512,324.38,512,256S485.371,123.333,437.019,74.98z M256,482C131.383,482,30,380.617,30,256S131.383,30,256,30
                              s226,101.383,226,226S380.617,482,256,482z'
                                />
                              </g>
                            </g>
                            <g>
                              <g>
                                <path
                                  d='M378.305,173.859c-5.857-5.856-15.355-5.856-21.212,0.001L224.634,306.319l-69.727-69.727
                              c-5.857-5.857-15.355-5.857-21.213,0c-5.858,5.857-5.858,15.355,0,21.213l80.333,80.333c2.929,2.929,6.768,4.393,10.606,4.393
                              c3.838,0,7.678-1.465,10.606-4.393l143.066-143.066C384.163,189.215,384.163,179.717,378.305,173.859z'
                                />
                              </g>
                            </g>
                          </svg>
                          <select
                            className='hamMenuDropdown'
                            value={this.state.ciudad.ID}
                            onChange={this.onCiudadChanged}
                          >
                            {this.state.ciudades.map((item) => (
                              <option value={item.ID} key={item.ID}>
                                {item.CIUDAD}
                              </option>
                            ))}
                          </select>
                        </div>
                      </li>
                      {this.renderZonas()}
                      {this.renderCategorias()}
                    </ul>
                  </div>
                </td>
                <td className='scapeArea' onClick={this.onPanellClick}>
                  <div></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  onMenuClick() {
    this.setState({ style: 'hamMenuCanvasShow' })
    this.derivedStateChanged = false
  }
  onPanellClick() {
    this.setState({ style: 'hamMenuCanvasHide' })
    if (this.derivedStateChanged) {
      this.props.onPanelDismiss()
    }
  }
  onMenuOptClick() {
    this.setState({ style: 'hamMenuCanvasHide' })
  }
  onCiudadChanged(event) {
    let selected = this.state.ciudades.filter((ciudad) => {
      return ciudad.ID === event.target.value
    })[0]
    this.setState({ zna_id: '0', cga_id: '0' })
    this.setState({ ciudad: selected })
    this.props.onCiudadChanged(selected)
  }
  onZonasActivasChanged(event) {
    this.setState({ zna_id: event.target.value })
    this.props.onZonaChanged(event.target.value)
  }
  onCategoriasActivasChanged(event) {
    this.setState({ cga_id: event.target.value })
    this.props.onCategoriaChanged(event.target.value)
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.style === 'hamMenuCanvasShow' &&
      (nextProps.ciudad !== this.props.ciudad ||
        nextProps.cga_id !== this.props.cga_id ||
        nextProps.zna_id !== this.props.zna_id)
    ) {
      this.derivedStateChanged = true
    }
    return true
  }
  static getDerivedStateFromProps(props, state) {
    if (
      props.ciudad !== state.ciudad ||
      props.ciudades !== state.ciudades ||
      props.codigos_comercio !== state.codigos_comercio ||
      props.cga_id !== state.cga_id ||
      props.zonas_activas !== state.zonas_activas ||
      props.zna_id !== state.zna_id
    ) {
      return {
        ciudad: props.ciudad,
        ciudades: props.ciudades,
        codigos_comercio: props.codigos_comercio,
        cga_id: props.cga_id,
        zonas_activas: props.zonas_activas,
        zna_id: props.zna_id
      }
    }
    return null
  }
}

export default withTranslation()(SidebarMenu)
