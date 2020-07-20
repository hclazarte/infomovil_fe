export var FacadeClient = {

  baseUrl: "http://infomovil.shop/fachada/servicios.asmx",
  xmlns: "http://infomovil.com.bo/",
  Services: {
    UsRecuperaCiudad: {name:'UsRecuperaCiudad', type:'Ciudade'},
    UsRecuperaTodosCiudades:{name:'UsRecuperaTodosCiudades', type:'Ciudade'},
    UsRecuperaTablaBuscarCodigos_comercio: {name:'UsRecuperaTablaBuscarCodigos_comercio', type:'TablaBuscarRow'},
    UsRecuperaTablaBuscarZonasActivas: {name:'UsRecuperaTablaBuscarZonasActivas', type:'TablaBuscarRow'}
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
        let response = xmlDoc.getElementsByTagName(service.name + "Response")[0]
        let arrObjs = FacadeClient.Deserialize(response,service.type);
        if (typeof(arrObjs) === 'string'){
          if ( arrObjs === 'Negocio: No existen datos para la consulta') {
            when_fetched([]);
          } else {
            when_err(arrObjs);
          }
        }
        else{
          when_fetched(arrObjs);
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

FacadeClient.Deserialize = (xmlDoc, type)  => {
  let ObjArray = [];
  
  let err = xmlDoc.getElementsByTagName("mensaje");
  let aux = xmlDoc.getElementsByTagName(type);
  
  if (err.length === 0) {
    ObjArray = "Error: no se reconoce la respuesta del servidor";
  } 
  else {
    if (err[0].innerHTML === '') {
      for (let i = 0; i < aux.length; i++) {
        ObjArray.push(FacadeClient.ObjDeserialize({},aux[i]));
      }  
    }
    else {
      ObjArray = err[0].innerHTML;
    }
  }

  return ObjArray;
}

FacadeClient.ObjDeserialize =  (obj, xmlDoc)  => {
  xmlDoc.childNodes.forEach(function(node) {
    Reflect.defineProperty(obj, node.tagName, { value: node.innerHTML })
  })
  return obj;
}
