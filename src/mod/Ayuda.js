import React from "react";

class Ayuda extends React.Component{
  render() {
    return (
      <div id="inicio">
        <p className="inicio_titulo">Ayuda Infomóvil</p>
        <p className="inicio_contenido">Infomóvil es un buscador que brinda datos al estilo de las guías de páginas amarillas, 
        te brinda un método facil de encontrar los bienes o servicios que buscas mostrandote un mapa iterativo de la ciudad 
        ligado a un buscador, para encontrar los bienes o servicios que deseas, selecciona "Buscar" y sigue los pasos a 
        continuación:<br/>
        1::: En las sección de "palabra clave" escribe una palabra que identifique lo que buscas, se pueden escribir el 
        nombre propio del comercio o empresa como Viva o Banco Económico, o nombres comunes como Tienda o Farmacia, o los 
        servicios como Cerrajero o Dentista, o simplemente los objetos como Pizza o Taxi. No es necesario incluir mayúsculas 
        ni signos ortográficos, es posible escribir palabras incompletas, por ejemplo si requieres un consultorio psicológico 
        bastará con escribir "psico".<br/>
        2::: Para restringir la búsqueda a una cierta clase selecciona de la lista de categorías la deseada.

        3::: Igualmente si quieres restringir la búsqueda a una zona dentro de la ciudad selecciónala de la lista.

        4::: Presiona buscar y espera unos segundos, Infomóvil creará una lista con los registros que coinciden con tu búsqueda.

        5::: Para ver la localización del comercio presiona el Título en azul de la lista.

        Infomóvil desplazará el mapa hasta localizar el comercio en el centro de la pantalla y te mostrará los datos del 
        comercio.

        Adicionalmente infomóvil te proporciona herramientas para Acercar, Alejar y Deslizar. Utiliza Infomóvil para emergencias, 
        descubre los teléfonos de los comercios, horarios de atención, servicios y mucho más. Diviértete buscando tus comercios 
        favoritos y descubre los comercios que hay en tu zona, empieza tu Búsqueda ahora.
        Promociona tu comercio en Internet, revisa nuestros Servicios y Regístrate te mandaremos información a tu e-mail o 
        te visitaremos. Si quieres información para iniciar tu nuevo comercio Contáctanos, y te informaremos sobre la cantidad 
        de comercios en la zona, la cantidad de consultas de comercios similares en la zona y en la ciudad.</p>
      </div>
    );
  }
}

export default Ayuda;