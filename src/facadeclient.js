export var FacadeClient = {

  // baseUrl: "http://infomovil.shop/fachada/servicios.asmx",
  baseUrl: "http://192.168.1.205/Fachada/Servicios.asmx",
  xmlns: "http://infomovil.com.bo/",
  Services: {
    UsRecuperaCiudad: {name:'UsRecuperaCiudad', array_types:['Ciudade']},
    UsRecuperaTodosCiudades:{name:'UsRecuperaTodosCiudades', array_types:['Ciudade']},
    UsRecuperaTablaBuscarCodigos_comercio: {name:'UsRecuperaTablaBuscarCodigos_comercio', array_types:['TablaBuscarRow']},
    UsRecuperaTablaBuscarZonasActivas: {name:'UsRecuperaTablaBuscarZonasActivas', array_types:['TablaBuscarRow']},
    UsCuentaBusqueda: {name:'UsCuentaBusqueda'},
    UsBuscaComercios: {name:'UsBuscaComercios', array_types:['Comercio']}
  }
};

FacadeClient.RunService = (service, parameters, ejemplo, xmlns_ = FacadeClient.xmlns, when_fetched, when_err) => {
  
  let soapMessage = FacadeClient.SoapWrap(service.name, parameters, ejemplo, xmlns_);
  
  let hd = new Headers();
  hd.append('Content-Type', 'text/xml; charset=utf-8');
  
  fetch(FacadeClient.baseUrl + "?op=" + service.name, {
    method: 'POST',
    body: soapMessage,
    headers: hd
  }).then(res => {
      if (res.ok) {
        return res.text();
      } else {
        return "Error: no se encuentra el servidor, por favor reintente";
      }
    }).then( xml_text => {
      if (xml_text === "Error: no se encuentra el servidor, por favor reintente") {
        when_err(xml_text);
      } else {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xml_text, 'text/xml');
        let response = xmlDoc.getElementsByTagName(service.name + "Response")[0];
        
        let objsRes = FacadeClient.Deserialize({},response,service);
        
        if (objsRes.mensaje === undefined)
        {
          when_err("Error: no se reconoce la respuesta del servidor");
        } else {
          if (objsRes.mensaje !== '')
          {
            if ( objsRes.mensaje === 'Negocio: No existen datos para la consulta') {
              if (service.array_types !== undefined)
              { // Agregando objeto vacio con array vacio cuando no hay registros de respuesta
                if (Reflect.get(objsRes, service.name + 'Result') !== undefined) {
                  Reflect.deleteProperty(objsRes, service.name + 'Result');
                }
                Reflect.defineProperty(objsRes, service.name + 'Result', {value: {}, writable: true});
                Reflect.set(objsRes, service.name + 'Result', {value: {}});
                let aux_obj = Reflect.get(objsRes, service.name + 'Result');
                Reflect.defineProperty(aux_obj, service.array_types[0] , {value: [], writable: true});
              }
              when_fetched(objsRes);
            } else {
              when_err(objsRes.mensaje);
            }
          } else {
            when_fetched(objsRes);
          }
        }
      }
    })
  return;
}

FacadeClient.SoapWrap = (webService, parameters, ejemplo, xmlns_ = this.xmlns) => {
  let soapMessage = '';
  soapMessage += '<?xml version="1.0" encoding="utf-8"?>\n';
  soapMessage += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n';
  soapMessage += '<soap:Body>\n';
  soapMessage += '<' + webService + ' xmlns="' + xmlns_ + '">\n';
  if (parameters !== null) {
    soapMessage += FacadeClient.Serialize(parameters);
  }
  if (ejemplo !== null) {
    soapMessage += '<ejemplo>\n';
    soapMessage += FacadeClient.Serialize(ejemplo);
    soapMessage += '</ejemplo>\n';  
  }
  soapMessage += '</' + webService + '>\n';
  soapMessage += '</soap:Body>\n';
  soapMessage += '</soap:Envelope>\n';

  return soapMessage;
} 

FacadeClient.Serialize = (businessObj)  => {
  let serie = '';
  
  let _xmlns_ = '';
  Object.entries(businessObj).forEach((entry) => {
    if (entry[0] === 'xmlns' ) {
      _xmlns_ = entry[1];
    }
  });
  Object.entries(businessObj).forEach((entry) => {
    if (entry[0] !== 'xmlns') {
      if (_xmlns_ === '') {
        serie += '<' + entry[0] + '>' + entry[1] + '</' + entry[0] + '>\n';
      } else {
        serie += '<' + entry[0] + ' xmlns="' + _xmlns_ + '">' + entry[1] + '</' + entry[0] + '>\n';
      }
    }
  });
  return serie;
}

FacadeClient.Deserialize =  (obj, xmlDoc, service)  => {
  
  var currentArrayTag = '';
  var ObjArray = [];
  
  xmlDoc.childNodes.forEach(function(node) {
    
    if (FacadeClient.isArrayTag(service, node.tagName)) {
      currentArrayTag = node.tagName;
      ObjArray.push(FacadeClient.Deserialize({},node,service));
    }
    else {
      if (currentArrayTag !== '') {
        Reflect.defineProperty(obj, currentArrayTag, { value: ObjArray})
        currentArrayTag = '';
        ObjArray = [];
      }
      if (FacadeClient.hasChildren(node)) {
        Reflect.defineProperty(obj, node.tagName, { value: FacadeClient.Deserialize({},node,service), writable: true})
      } else {
        if (node.tagName !== service.name + 'Result' || !FacadeClient.isEmptyTag(node)) { 
          //Para evitar que se cree string vacio cuando no hay respuesta
          Reflect.defineProperty(obj, node.tagName, { value: node.innerHTML, writable: true })
        }
      }     
    }
  })
  if (currentArrayTag !== '') {
    Reflect.defineProperty(obj, currentArrayTag, { value: ObjArray, writable: true})
  }
  return obj;
}

FacadeClient.hasChildren = (node) => {
  return (node.children.length > 0);
}

FacadeClient.isArrayTag = (service, value) => {
  let ret_val = false;
  if (service.array_types !== undefined) {
    service.array_types.forEach(element => {
      if (element === value) ret_val = true;
    });  
  }
  return ret_val
}

FacadeClient.isEmptyTag = (node) => {
  return (node.innerHTML ==='')
}
