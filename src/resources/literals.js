const languages = {
  es: {
    //Traducciones analizables con i18n-extract
    informacion: "Información",
    galeria: "Galería",
    comisarios: "Comisarios",
    ordenarPor: "Ordenar por",
    entrarExpo: "Entrar a la exposición",
    sinopsisObra: "Sinopsis de la obra",
    bioArtista: "Bio del artista",
    titulo: "Título",
    autor: "Autor",
    pais: "País",
    ano: "Año",
    aleatorio: "Aleatorio",
    scrollParaMas: "Scroll para ver más",
    textoComisarios:
      "<p>Con la itinerancia de estos trabajos por los Centros Culturales de Cooperación de América Latina mostraremos el trabajo de un total de 70 artistas en los que podremos apreciar una gran variedad de voces; de este modo se dibujará una cartografía amplia que hará más rica las exhibiciones.</p><br><p>Descubre los textos de los comisarios.</p>",
    spa: "España",
    ita: "Italia",
    gec: "Guinea Ecuatorial",
    arg: "Argentina",
    az: "(A-Z)",
    canepaBio:
      "Andrea Canepa (Lima-1980) estudió en la Universidad Politécnica de Valencia y obtuvo una Maestría en Artes Visuales y Multimedia. Ha sido becada por el Departamento de Cultura del Senado de Berlín y por la Fundación Endesa. Ha ganado los premios: ARCO para Jóvenes Artistas, Miquel Casablancas y Generaciones 2014. Ha sido artista residente en Gasworks, MATADERO, Cité des Arts, Tokyo Wonder Site, Beta Local, Bauhaus Masters Houses, Jan Van Eyck Academie y en La Academia de España en Roma.",
    canepaVideo:
      "<p>El vídeo <em>The tale of the mass, the grid and the mesh</em> (El cuento de la masa, la cuadrícula y la red) es un estudio táctil de la historia de la abstracción. Relatos sobre la evolución de la escritura, la arquitectura, el trabajo y la pedagogía se vinculan asociativamente en una antología visual de los bloques de construcción del siglo XX.</p>",
    laramascotoBio:
      "Laramascoto es un colectivo formado por Bea Coto (1977) y Santi Lara (1975). Trabajan la instalación audiovisual y han realizado intervenciones en lugares como la New Media Gallery (Vancouver), la Bethanien Kunstraum (Berlín), Museo San Ildefonso (México DF) o el Museo ABC (Madrid). Han realizado residencias en lugares como la Kunstlerhaus Glogauer de Berlín y recibido varios premios entre los que destacan el “Premio joven JustMAG” o “Arte40” entre otros.",
    laramascotoVideo:
      "El futuro que imaginamos no pasa por un desarrollo tecnológico de largo alcance, sino por un retorno a la conciencia de la tierra como agente vivo y con capacidad de acción. Este escenario de ciencia ficción sin vestigios de lo humano, acompañado de un “fósil del futuro” cuya forma orgánica es irreconocible para nosotros, sirve para interpelarnos sobre nuestro sistema y su evolución hacia nuestra propia extinción. El espectador podría estar ante una era geológica incipiente o un tiempo posterior al antropoceno.",
    abadBio:
      "Antoni Abad (Lleida, 1956) ha participado en las Bienales de Venecia, Lima, Sevilla, Porto Alegre y Berlín. Entre 2004 y 2014 desarrolla el proyecto megafone.net, con participantes en riesgo de exclusión de Europa, el Sahara y las Américas. Desde 2015 desarrolla cartografías sonoras en BlindWiki, con personas ciegas de Berlín, Breslavia, Roma, Sídney y Venecia. En 2006 recibió el Premio Nacional de Artes Visuales de Cataluña y el Golden Nica Digital Communities Ars Electronica en Linz, Austria.",
    abadVideo:
      "Se trata de una proyección de software en la que una multitud de cucarachas dibujan con sus cuerpos el símbolo del Euro. Al terminar, las cucarachas se dispersan para volver a configurarlo de nuevo. Una realización de vida artificial donde los insectos se sitúan aleatoriamente cada vez que configuran el símbolo, de manera que las combinaciones que van creando sucesivamente, son siempre distintas. La cualidad de lo aleatorio juega un papel fundamental en esta obra.",
    santomeBio:
      "Se gradúa en Bellas Artes en la Universidad de Vigo. Sus trabajos de animación han estado presentes en exposiciones y festivales de cine como el BAFICI Buenos Aires Festival Internacional de Cine o el Festival de Cine Europeo de Sevilla entre otros. En 2019 termina su último cortometraje Joven y Carmen gracias a la Beca para la Real Academia de España en Roma, y es galardonado con la beca FormARTE 2019 para realizar su quinta pieza de animación en París, donde reside actualmente.",
    santomeVideo:
      "Joven y Carmen nos habla de un extraño personaje y su peripecia trascendental en el medio de la gran ciudad. Es un relato psicodélico en el que se plasma el espíritu de la periferia urbana utilizando una mirada onírica y surrealista. Me interesa hablar de Roma inspirándome en su sonido y su atmósfera de una manera cercana a mis experiencias.",
    bonadiesBio:
      "<p>Su trabajo se centra en la memoria, el archivo, la visibilidad e invisibilidad de estructuras culturales y el espacio urbano. Ha expuesto, entre otros, en la Cinemateca Distrital de Bogotá, SITELines Santa Fe, Stanford University, LACMA, 18th Street Arts Center, MACBA, WKV, Es Baluard, ZKM.</p><p>Beca 2018 Real Academia de España en Roma; Artist Residency Program, Goethe-Institut Salvador-Bahia/Vila Sul 2017; Beca Latinoamericana Experimenta-Sur 2017; Residency Award 2016 en 18th Street Arts Center.</p>",
    bonadiesVideo:
      "Parte de mi trabajo remite a la revisión de archivo. En el caso de estos días, ha sido práctica diaria revisar algunas memorias guardadas, husmear en vídeos y fotografías. De manera aleatoria abro carpetas, recorro imágenes y sonidos y produzco estos “archivos expiatorios”, que cargan con la culpa de quien los produce e incluyen errores, atropellos técnicos, ruidos y lagunas. Pedazos de tiempo encerrados en los límites acotados de una carpeta.",
    higinioBio:
      "Multidisciplinar. Interesado en la transformación del paisaje suburbano, en la inserción de lo artificial en lo natural, en los procesos industriales, en los procesos de construcción y destrucción y en definitiva en la relación entre la actividad humana y el medio en el que se desarrolla.",
    higinioVideo:
      "<p>Durante los años 60 y 70 se abordaron en Roma y gracias a la Ley 167 importantes proyectos urbanísticos en lo que respecta al número de viviendas y a la calidad misma de los proyectos. La suma de múltiples factores  da como resultado obras de gran valor arquitectónico que pronto empezarán a mostrar situaciones problemáticas.</p><br><p>Roma 167/62 explora la relación entre los planteamientos ejemplares que conducen a la concepción y ejecución de estos desarrollos urbanos y el resultado de los mismos.</p>",
    isasiBio:
      "Miriam Isasi es Doctora en Bellas Artes por la Universidad del País Vasco y la UNAM de Ciudad de México. El territorio, la memoria o el archivo son constantes en su trabajo. Ha recibido el apoyo de diferentes instituciones como: Gobierno Vasco, Diputaciones Forales de Álava y Bizkaia, Ayuntamientos de Bilbao, Vitoria o Irún, Azkuna Zentroa, Tabakalera, C.C. Montehermoso, Fundación BilbaoArte, MAEC-AECID, Academia de España en Roma, MUSAC o ARTIUM entre otras.",
    isasiVideo:
      "<p>Pieza audiovisual generada a partir de las sensaciones de la pérdida de visión temporal. Los sonidos emitidos en una resonancia magnética cerebral son traducidos a partituras e interpretados por una orquesta como banda sonora.</p><p>La relación que se establece entre la utopía y el fracaso es permeable.</p><p>Una colección de imágenes, de experiencias y decodificación de estímulos, que recogen un imaginario personal. En la repetición tropezamos con la acción imposible, meta invisible pero tangible.</p>",
    banetBio:
      "Doctora en Bellas Artes por la Universidad de Vigo, 2003. Desde su trabajo analiza, reflexiona y critica la sociedad actual. Trata de mostrar sus excesos y desigualdades. Utiliza el cuerpo humano y sus enfermedades como metáforas para representar un sistema que considera caótico, alienador y deshumanizado. La comida es otra de las constantes en sus proyectos. A través del sistema alimentario abarca temas que van desde lo nutricional a cuestiones sociales, políticas, económicas y medioambientales.",
    banetVideo:
      "En un ambiente aséptico, una cocinera-cirujana abre una tarta de carne y le extirpa los ojos (símbolos de control) que crecen en su interior. Mientras realiza la operación va purgando su dolor, va cerrando sus propias heridas. La tarta simboliza por tanto su propio cuerpo, es el reflejo de su propio sufrimiento. Comestible 04 cuenta con la colaboración de la cantante Christina Rosenvinge, quien compuso e interpretó la canción ex profeso para el vídeo.",
    sadaba00:
      "Son ya más de cincuenta años desde que el arte del vídeo apareció por vez primera en el entorno del arte, y cuarenta de cuando el contexto del arte español empezó tímidamente a mostrar interés por unas obras siempre relacionadas de forma exótica con la innovación y aquello que de forma difusa se llamaban “nuevas tecnologías”. No será hasta finales de los años noventa cuando las obras de vídeo comenzarán a verse con cierta normalidad en galerías y museos, inmersas en el proceso de audiovisualización generalizada de nuestras formas de vida: las cada vez mayores posibilidades de acceso por parte de los y las artistas a las formas de grabación y procesado de las imágenes, de un lado, y la también cada vez más asequible posibilidad de proyección de las mismas, por otro, son algunas de las razones que contribuyeron a facilitar este proceso. Sin embargo el mundo del arte no siempre ha respondido con la misma inmediatez a estas nuevas formas de producción y exhibición de las y los artistas: aún hoy resulta común ver las proyecciones de los trabajos en vídeo en contextos escindidos de los de otras formas de creación, mientras que paradójicamente el vídeo como soporte narrativo se nos aparece de manera cotidiana en todos los momentos del día. Con la idea de paliar en parte este déficit, y poder así visibilizar en diferentes contextos expositivos este tipo de trabajos, la Academia de España en Roma presenta en esta ocasión una selección de trabajos videográficos de algunos de los artistas que han pasado por sus instalaciones, de tal modo que en el dispositivo ideado para ello las diferentes obras se retroalimenten entre sí. Frecuentemente se ha hablado también del problema de la adecuación temporal de los trabajos de base tecnológica y/o audiovisual (Time Based Arts) a los dispositivos expositivos propios de la sala o galería, estáticos por definición. Es por ello también por lo que hemos hecho un esfuerzo por tomar en consideración una serie de obras cuya concepción narrativa se adapte a las características exhibitivas de la sala de exposición. Tras esta primera experiencia romana, el AECID quiere mantener este impulso más allá, para llevar a conocer estos y otros trabajos a otras sedes amigas: por ello habrá una serie más extensa de obras circulando durante los dos próximos años (2020, 2021) por diversas ciudades iberoamericanas. Tanto en esta primera presentación en Roma, como en las otras ciudades por las que circulen estas muestras, se invitará a comisarios/as locales para que seleccionen algunos trabajos procedentes de sus propias ciudades que puedan dialogar con las obras seleccionadas de los/as artistas de la Academia.<br>Esta selección se complementa en este arranque de proyecto con la obra de tres artistas comisariada por Anita Calá en el que veremos los trabajos de artistas como Francesca Arri, Matteo Attruia y Lamberto Teotino, será muy interesante ver como conviven y dialogan las obras de estos seis artistas en La Academia de España en Roma.",
    cala01:
      "<p>La simetría acompaña a menudo la idea de una visión equilibrada y armónica en una composición figurativa. Utilizada sobretodo en la Pintura Medieval, conseguía dar un sentido de estatismo, inmovilizando la escena retratada en una eterna instantánea, pero al mismo tiempo equilibrando el ritmo visual de la misma.</p><p>Este paralelismo estético nace cuando una o más formas colocadas en el espacio presentan repeticiones regulares, siempre con un eje en el centro del que irradian elementos más o menos especulares.</p><p>En contraposición, en el lenguaje artístico contemporáneo, existe una búsqueda obsesiva por desestabilizar la serenidad que generan las imágenes reconfortantes de lo cotidiano, explorando las dinámicas generadas a partir de la descomposición de una estructura reconocible.</p><p>En el 1985 Peter Greenaway realiza el “El zoo”, una obra cinematográfica en la que consigue provocar un cortocircuito en la percepción del observador, contrastando la simetría rígida y reconfortante de las imágenes con una historia surreal y llena de movimiento creando un colapso visual, a través de formas y colores que se descomponen en un <em> loop </em> sincopado.</p><p>Y es precisamente del desafío de jugar con dos lenguajes distintos, simetría y caos, que nace la idea de confrontar a los tres artistas elegidos: Francesca Arri, Matteo Attruia e Lamberto Teotino.</p><p>Sus obras giran entorno a un eje central, tanto en el plano estructural como el plano visual.</p><p>En el video-performance <strong> <em> Self Portrait </em> </strong> di <strong> Francesca Arri </strong> (2012) es la carne: el cuerpo, situado inicialmente como el núcleo, desnudo y solo, en el centro y bien visible en su totalidad, pierde lentamente la propia unicidad y fragilidad cuando el observador, que sufre la potencia visual de la imagen a medida que la observa, dándose cuenta de que el objetivo es él mismo, puesto en medio, ridiculizado, observado y burlado por ese mismo cuerpo, que al principio divierte y cautiva, y después avergüenza hasta llegar a molestar de un modo grotesco al ojo que lo observa.</p><p><strong> Matteo Attruia </strong> presenta la obra inédita <strong> <em> All I Need Is All I Need Is All </em> </strong> (2020), un video alienante que nos reta con el instrumento de la palabra: se trata de una boca en primer plano, que con una voz sintética nos hipnotiza a través de la repetición de una frase sin solución de continuidad, haciéndonos entrar en el loop de la búsqueda y de la satisfacción de nuestros deseos, donde todo aquello que necesito coincide exactamente con la totalidad de lo que necesito, que es todo aquello que necesito…</p><p><strong> Lamberto Teotino </strong> desestructura el objeto en <strong> <em> non-physical entities </em> </strong> (2018-2020), da a luz nuevas formas inexistentes, suscita curiosidad y nos empuja a analizar sus reelaboraciones de la estética primordial: criaturas metálicas suspendidas en un limbo amniótico hecho de aire, vibran en un juego caleidoscópico con una simetría delirante.</p><p>Los tres artistas utilizan el video como medio para crear un tejido de lenguajes que van más allá de la simple observación de la imagen.</p><p>Envuelven al espectador en una danza de sentidos emocionales, excavando en nuestros recuerdos en busca del por qué. Detrás de estas composiciones de fácil lectura, encontramos esa sensación de malestar que sólo el instinto percibe, haciendo atractivo lo que en la cotidianeidad rechaza.</p>",
  },
  it: {
    informacion: "",
    galeria: "",
    comisarios: "",
    ordenarPor: "",
    entrarExpo: "",
    sinopsisObra: "",
    bioArtista: "",
    titulo: "",
    autor: "",
    pais: "",
    ano: "",
    aleatorio: "",
    scrollParaMas: "",
    textoComisarios: "",
    descrubreComisarios: "",
    spa: "Spagna",
    az: "(A-Z)",
  },
};

module.exports = languages;