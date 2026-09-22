---
name: Charly's
description: Un flyer de Charly's que toma pedidos. Tinta azul, papel blanco, cuadrillé y precios sobre trazo de pincel.
colors:
  blue: "#2A5FAE"
  blue-ink: "#1E4C8F"
  blue-deep: "#143665"
  blue-soft: "#DCE6F4"
  blue-mist: "#EEF2F8"
  paper: "#FFFFFF"
  on-blue-soft: "#D6E3F7"
  ink-muted: "#4A5F80"
  line: "rgba(30,76,143,.22)"
  line-strong: "rgba(30,76,143,.4)"
typography:
  display:
    fontFamily: "League Spartan, Archivo, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.8rem, 12.4vw, 5.3rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "League Spartan, Archivo, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.8rem, 12.5vw, 5rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  title:
    fontFamily: "League Spartan, Archivo, ui-sans-serif, sans-serif"
    fontSize: "clamp(2rem, 8.4vw, 2.7rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  title-sm:
    fontFamily: "League Spartan, Archivo, ui-sans-serif, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 900
    lineHeight: 1
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.02em"
    fontVariation: "'wdth' 88"
  price:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.05rem"
    fontWeight: 900
    lineHeight: 0.88
    fontFeature: "tnum"
    fontVariation: "'wdth' 80"
  banner:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 80"
  hand:
    fontFamily: "Caveat Brush, Segoe Print, cursive"
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0"
rounded:
  xs: "8px"
  sm: "10px"
  md: "12px"
  lg: "14px"
  xl: "18px"
  bubble: "20px"
  sheet: "24px"
  pill: "999px"
  circle: "50%"
spacing:
  chip-gap: "8px"
  stack-gap: "10px"
  gutter: "16px"
  sheet-pad: "20px"
  sheet-pad-wide: "32px"
  section: "clamp(56px, 10vw, 110px)"
  topbar: "64px"
  checker: "24px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0 1.35rem"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.blue-ink}"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    height: "52px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.blue-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    height: "52px"
  button-ghost-hover:
    backgroundColor: "{colors.blue-mist}"
  button-ghost-light:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    height: "52px"
  button-sm:
    rounded: "{rounded.md}"
    padding: "0 1rem"
    height: "44px"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.blue-ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.1rem"
    height: "44px"
  tab-active:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
  chip-remove:
    backgroundColor: "transparent"
    textColor: "{colors.blue-ink}"
    rounded: "{rounded.pill}"
    padding: "0 1rem"
    height: "44px"
  chip-remove-checked:
    backgroundColor: "{colors.blue-ink}"
    textColor: "{colors.paper}"
  reply-chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue-ink}"
    rounded: "{rounded.pill}"
    padding: "0 1rem"
    height: "44px"
  reply-chip-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
  reply-chip-pressed:
    backgroundColor: "{colors.blue-soft}"
  reply-chip-whatsapp:
    backgroundColor: "{colors.blue-deep}"
    textColor: "{colors.paper}"
  price-tag:
    textColor: "{colors.paper}"
    typography: "{typography.price}"
    padding: ".62em 1.15em .72em .95em"
  price-tag-white:
    textColor: "{colors.blue-ink}"
  banner-label:
    textColor: "{colors.paper}"
    typography: "{typography.banner}"
    padding: ".5em 1.1em .56em .95em"
  banner-label-white:
    textColor: "{colors.blue-ink}"
  seal:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue-ink}"
    rounded: "{rounded.circle}"
    size: "96px"
  comanda:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue-ink}"
    padding: "24px 18px 26px"
  sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue-ink}"
    rounded: "{rounded.sheet}"
  chat-bubble-bot:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue-ink}"
    rounded: "{rounded.bubble}"
    padding: "11px 15px"
  chat-bubble-user:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
    rounded: "{rounded.bubble}"
    padding: "11px 15px"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue-ink}"
    rounded: "{rounded.lg}"
    padding: "0 16px"
    height: "48px"
  dock-button:
    backgroundColor: "{colors.blue-deep}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
    height: "60px"
  status-bar:
    backgroundColor: "{colors.blue-deep}"
    textColor: "{colors.paper}"
    padding: "6px 16px"
    height: "34px"
  feature-icon:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
    rounded: "{rounded.circle}"
    size: "64px"
---

# Design System: Charly's

## Overview

**Creative North Star: "El flyer que toma pedidos"**

El sistema es la gramática de los flyers de Instagram de Charly's llevada a una interfaz que funciona: tinta azul sobre papel blanco frío, franjas de cuadrillé, titulares geométricos pesados en mayúsculas, precios impresos sobre trazos de pincel reales recortados de los propios flyers, notas a mano con flechas y sellos circulares. La comida es el único otro color; todo lo demás es azul o papel.

La densidad es de flyer, no de dashboard: pocos elementos por pantalla, tipografía enorme, bloques de color a sangre alternando con papel. Los elementos impresos (precios, banners, sellos, notas) se apoyan levemente torcidos, entre -9° y 10°, como pegados a mano. La parte operativa (hojas, carrito, asistente) mantiene la misma tinta pero se ordena en filas limpias, separadas por líneas punteadas, y el carrito toma la forma de una comanda de cocina.

Mobile-first y de una mano: objetivos táctiles de 44 px o más, un dock fijo abajo en el celular, hojas que suben desde el borde inferior. El movimiento es expo ease-out en todo, con una sola excepción con rebote: las capas que caen en la pila del armador.

**Key Characteristics:**
- Dos tintas: familia azul y papel blanco; la fotografía de comida es el único color extra.
- Cuadrillé azul y blanco como borde, banda, piso y marco.
- Precios y banners sobre trazos de pincel raster, en Archivo itálica 900 condensada.
- Titulares League Spartan 900 en mayúsculas, interlineado por debajo de 1.
- Notas a mano en Caveat Brush con flecha dibujada.
- Rotaciones chicas en todo lo "impreso"; la UI operativa queda derecha.
- Comanda con bordes dentados como forma del carrito y de los resúmenes.

## Colors

Una paleta de dos tintas: un azul de imprenta en cinco tonos y papel blanco frío, sin ningún tono de acento ajeno.

### Primary
- **Azul Charly's** (blue): el campo de color. Fondo del hero, del panel destacado de la carta, de la sección "Dónde", de los botones primarios, de los íconos en círculo, de la burbuja del usuario en el chat y la mitad azul de todo cuadrillé.
- **Tinta Azul** (blue-ink): el color del texto sobre papel. Titulares, cuerpo principal, trazos de las capas de la pila, hover de los botones primarios y relleno de las chips "Sacale" marcadas.
- **Azul Profundo** (blue-deep): la tinta más oscura, reservada para superficies que tienen que distinguirse del campo azul: barra de estado, footer, botón del dock, respuesta "Enviar por WhatsApp", link de salto.

### Neutral
- **Papel** (paper): el fondo por defecto, el relleno de hojas, comanda, burbujas del bot, sellos y la mitad blanca del cuadrillé. También es el color de texto sobre azul.
- **Niebla Azul** (blue-mist): papel teñido. Fondo de "Nosotros", del escenario del armador, del chat, del carrito y los hovers suaves de botones fantasma y filas.
- **Azul Lavado** (blue-soft): anillo de foco de los campos, estado presionado de las respuestas del chat, contador vacío, relleno de capas (cheddar, tomate, panceta) en la pila.
- **Papel sobre Azul** (on-blue-soft): texto secundario sobre campos azules (bajadas, descripciones del plato destacado, horarios).
- **Tinta Apagada** (ink-muted): texto secundario sobre papel (descripciones, subtítulos, precios de extras).
- **Línea** (line) y **Línea Fuerte** (line-strong): divisores, bordes de chips, campos y filas. Siempre azul translúcido, nunca gris.

### Named Rules
**Regla de las Dos Tintas.** Todo color de interfaz sale de la familia azul o del papel. La única otra fuente de color permitida es la fotografía de producto. Un rojo, amarillo o verde de UI rompe el flyer.

**Regla del Campo y la Tinta.** El azul Charly's es para campos y botones; la tinta azul es para texto sobre papel. Texto largo sobre campo azul va en papel o en papel sobre azul, nunca en tinta azul.

## Typography

**Display Font:** League Spartan (con Archivo, ui-sans-serif)
**Body Font:** Archivo (con ui-sans-serif, system-ui)
**Hand Font:** Caveat Brush (con Segoe Print, cursive)

**Character:** League Spartan 900 da la voz geométrica y redonda de los flyers; Archivo carga todo lo funcional y, en itálica 900 condensada al 80%, se vuelve la letra de precio y de banner. Caveat Brush es la anotación del que armó el flyer, nunca un titular.

Las tres familias están autoalojadas en assets/fonts con la URL de Google Fonts como segundo src, para que el sitio tenga sus letras también abierto desde el disco.

### Hierarchy
- **Display** (League Spartan 900, clamp 2.8rem a 5.3rem, 0.92, mayúsculas): solo el titular del hero.
- **Headline** (League Spartan 900, clamp 2.6rem a 5rem, 0.95, mayúsculas): títulos de sección ("La carta", "Nosotros", "Dónde") y el nombre del plato destacado (hasta 5.4rem).
- **Title** (League Spartan 900, clamp 2rem a 2.7rem, mayúsculas): nombres de platos y títulos de hoja (hasta 2.9rem).
- **Title chico** (League Spartan 900, 1.2 a 1.5rem, mayúsculas): encabezado y renglones de la comanda, leyendas de opciones, total, cabecera del chat.
- **Body** (Archivo 400, 1rem, 1.55): descripciones con máximo 46 a 60ch; bajadas de 1.05 a 1.2rem con 38 a 56ch.
- **Label** (Archivo 800, ancho 88%, 0.95 a 1.05rem, +0.02em, mayúsculas): botones, pestañas, dock, carrito.
- **Price** (Archivo itálica 900, ancho 80%, 2.05rem, 0.88, cifras tabulares): precios sobre pincel; los precios en filas usan el mismo corte sin pincel (900, ancho 80 a 82%).
- **Banner** (Archivo itálica 900, ancho 80%, mayúsculas): rótulos de categoría (clamp 2rem a 3.4rem) y bajadas de plato o íconos (1rem).
- **Hand** (Caveat Brush 400, 1.25 a 1.9rem, 1): notas con flecha, "así va quedando", "¿lo de siempre?", pie de la comanda.

### Named Rules
**Regla del Titular Pesado.** Todo h1 a h4 es League Spartan 900 en mayúsculas, interlineado 0.95 o menos, tracking -0.01em y text-wrap balance. No hay titulares livianos.

**Regla de la Cifra Tabular.** Todo precio, contador, total y hora usa cifras tabulares.

**Regla de la Mano Escasa.** Caveat Brush aparece como nota corta (dos a cuatro palabras) y siempre en minúscula de oración; nunca en botones, títulos ni texto largo.

## Layout

Mobile-first en una columna con contenedor de hasta 1200px y márgenes laterales de 16px (respetando safe-area). Las secciones respiran con padding vertical clamp(56px, 10vw, 110px) y alternan papel, niebla azul y campo azul a sangre, separadas por bandas de cuadrillé en lugar de líneas.

Los platos de la carta rompen el contenedor: su escenario va a lo ancho de la pantalla (margin-inline calc(50% - 50vw)) con la banda arriba y el piso de cuadrillé abajo. Los platos se separan con una línea punteada de 2px; el panel destacado corta el ritmo con un bloque azul a sangre.

**Quiebres.** 760px: las hojas pasan de subir desde abajo a centrarse como modal, el chat se vuelve un panel lateral de 460px y las guarniciones pasan a dos columnas. 900px: aparece la navegación superior y el botón de pedido del header, el hero y los platos pasan a dos columnas (1.1fr / 0.9fr, alternando lado), y desaparece el dock. El chat compacta su cabecera por debajo de 460px.

**Ritmo.** Separación de 8px entre chips y pestañas, 10px entre acciones apiladas, 12 a 16px en filas, 26 a 48px entre bloques. La barra superior mide 64px y es pegajosa; las pestañas de la carta se pegan debajo.

## Elevation & Depth

La profundidad es de papel apoyado sobre papel: sombras suaves, largas y con spread negativo, siempre teñidas del azul profundo, nunca negras ni desplazadas en duro. La comida flota con drop-shadow sobre su piso de cuadrillé; los elementos pegados (sellos, comanda) proyectan sombra corta; las superficies superpuestas (hojas, chat, dock, tarjeta de info) proyectan la más larga. En reposo, los botones son planos.

### Shadow Vocabulary
- **Soft** (`box-shadow: 0 10px 28px -16px rgba(20,54,101,.35)`): hover de botones.
- **Lift** (`box-shadow: 0 18px 40px -18px rgba(20,54,101,.45)`): el aviso flotante (toast).
- **Food** (`filter: drop-shadow(0 16px 12px rgba(20,54,101,.28))`, en el panel destacado `0 26px 22px rgba(10,30,70,.5)`): recortes de comida sobre su escenario.
- **Pegado** (`box-shadow: 0 14px 26px -12px rgba(10,30,70,.6)` en sellos; `filter: drop-shadow(0 12px 16px rgba(20,54,101,.16))` en la comanda): lo que está pegado sobre el flyer.
- **Superpuesto** (`box-shadow: 0 -20px 60px -20px rgba(10,30,70,.5)` en hojas; `0 18px 40px -14px rgba(10,30,70,.65)` en el dock; `0 28px 50px -26px rgba(5,20,50,.6)` en la tarjeta de info): capas por encima de la página.

### Named Rules
**Regla de la Sombra Azul.** Toda sombra es azul marino translúcida con spread negativo o drop-shadow difuso. Nunca sombra negra, nunca sombra desplazada sin desenfoque.

## Shapes

Dos lenguajes conviven. La UI operativa es de esquinas suaves: 14px en botones, campos y opciones; 12px en botones chicos e íconos; 18px en el dock y la tarjeta de info; 20px en burbujas (con la esquina de origen a 6px); 24px en hojas; píldora completa en pestañas, chips y respuestas; círculo en sellos, íconos de característica y el punto de estado.

Lo "impreso" no tiene radio: sus bordes los dan los rasters de pincel (precios, banners, la palabra FAMA), el dentado de la comanda (máscara conic-gradient de 8px arriba y abajo) con dos muescas circulares de 22px a los lados del encabezado, y el cuadrillé (repeating-conic-gradient en módulos de 24, 20, 18, 14 y 12px). Los separadores internos son líneas punteadas de 2px; el anillo interior del sello es un trazo punteado de 2px.

Los íconos son de línea: 22px, trazo 2, extremos redondeados, currentColor.

## Components

### Buttons
Contundentes y de pulgar: mayúsculas, peso 800, ancho condensado al 88%.
- **Shape:** esquinas suaves (14px), altura mínima 52px; la variante chica mide 44px con 12px de radio. Borde de 2px siempre presente, del mismo color que el fondo en las variantes llenas.
- **Primario azul:** campo azul con texto papel; hover a tinta azul.
- **Claro (sobre azul):** papel con tinta azul; es la acción primaria dentro de campos azules.
- **Fantasma:** transparente con borde línea fuerte; hover a niebla azul con borde azul. **Fantasma claro:** transparente con borde blanco al 75% sobre campo azul.
- **Hover / Active:** sube 2px con sombra Soft (0.2s ease-out); al presionar vuelve a 0 y escala a 0.97 sin sombra. Deshabilitado al 45% de opacidad.
- **Botón agregar:** cuadrado azul de 48px con signo más, para guarniciones.

### Chips
- **Pestañas de la carta:** píldora de 44px con borde línea fuerte; la activa se llena de azul con texto papel.
- **Sacale (quitar ingrediente):** píldora con borde; marcada se llena de tinta azul y el texto se tacha con 2px.
- **Respuestas del chat:** píldora papel con borde azul de 2px, peso 800. Primaria llena de azul; la de WhatsApp en azul profundo; las alternables muestran un ícono de check y pasan a azul lavado cuando están presionadas.

### Cards / Containers
- **Comanda:** la firma del sistema. Ticket papel con bordes dentados arriba y abajo, muescas laterales del color del fondo, encabezado con logo azul, "Comanda" en Title chico y la hora en cifras tabulares separado por línea punteada; renglones con cantidad en azul, líneas de modificación en tinta apagada, precio condensado a la derecha y total con filete de 3px en tinta azul. Pie en Caveat Brush. Es la forma del carrito y de todo resumen del asistente.
- **Tarjeta de info:** papel, 18px, sombra superpuesta, filas separadas por punteado.
- **Tarjeta de elección (asistente):** 148px, 16px de radio, borde línea, imagen sobre niebla azul; hover a borde azul y sube 2px.

### Inputs / Fields
- **Style:** papel con borde línea fuerte de 2px y 14px de radio; 48px de alto en el chat, área de nota de 84px mínima.
- **Focus:** borde azul más anillo de 3px en azul lavado. En el resto del sitio el foco visible es un contorno azul de 3px con 3px de separación (blanco sobre campos azules).
- **Opciones:** tamaños en grilla de cuatro (64px, llenas de azul al elegir); filas de check de 54px con casilla de 26px que se llena de azul y hace aparecer el check con escala expo.

### Navigation
- **Barra de estado:** franja de azul profundo de 34px arriba de todo, con punto blanco que late cuando está abierto y el texto del horario en vivo.
- **Header:** blanco al 95% con blur, pegajoso, 64px, logo de 42px y botón de pedido con contador en píldora azul (azul lavado cuando está vacío; rebota al sumar). Desde 900px suma enlaces en Label con subrayado azul de 3px en hover.
- **Dock (solo celular):** botón de azul profundo de 60px y 18px de radio fijado abajo, con contador en cuadro papel, rótulo y total; entra deslizando cuando corresponde y desaparece desde 900px.

### Price Tag
Precio en Archivo itálica 900 al 80% sobre el trazo de pincel azul, girado -4°, con rótulo opcional en versalitas chicas. Variante blanca (pincel blanco, tinta azul) para campos azules; variante alternativa con el segundo trazo de pincel. Se ancla abajo a un lado del escenario del plato, invirtiendo lado y giro cuando el plato se espeja.

### Banner Label
Texto en mayúsculas sobre el trazo de pincel de banner, girado -2.5°. Rótulo de categoría grande, bajada corta de plato y rótulo de característica debajo de cada ícono en círculo. Variante blanca sobre campo azul.

### Seal
Sello circular papel de 96px (118px en escritorio en el hero), girado 10°, con anillo interior punteado azul, cifra grande en itálica 900 y dos renglones chicos. Entra con escala y giro expo. Se usa para "100% sabor casero" y "Limitado por noche".

### Checker
Cuadrillé azul y blanco con repeating-conic-gradient: banda de 24px con filete blanco bajo el header del hero, banda y piso de cada burger, marco rotado -1.2° en el plato limitado de pollo, borde superior de "Nosotros", del escenario del armador y de la cabecera del chat, y franja fina sobre el footer.

### Dish Layouts
- **Burger:** escenario a sangre con banda de cuadrillé arriba, recorte de comida con drop-shadow y piso de cuadrillé debajo; precio anclado abajo. Desde 900px, dos columnas alternando lado.
- **Destacada:** panel azul a sangre con banda blanca y azul, recorte más grande, nota a mano con flecha, precio blanco y nombre en Headline blanco.
- **Foto:** foto real 4:3 a lo ancho con nota a mano arriba y precio desbordando abajo.
- **Enmarcada:** la foto dentro de un marco de cuadrillé girado, con sello "Limitado" y precio con el segundo pincel.

### Builder Stack
La interacción firma. Una hamburguesa dibujada en línea (trazo tinta azul de 3px, rellenos papel, azul lavado o azul) que se arma de abajo hacia arriba sobre un escenario niebla con piso de cuadrillé y el precio en pincel arriba a la derecha. Cada capa nueva cae 70px con un leve giro y rebota con la curva drop en 0.6s. Es el único rebote del sistema.

### Bottom Sheets
Diálogos nativos papel con esquinas superiores de 24px, agarradera de 44px, cierre de 44px arriba a la derecha y pie fijo separado por línea. Suben en 0.45s ease-out y bajan en 0.24s ease-in sobre un fondo azul oscuro al 55% con blur de 2px. Desde 760px se centran como modal redondeado y entran con una escala sutil. El carrito usa fondo niebla para que la comanda se lea como papel.

### Chat Assistant
Pantalla completa en celular y panel lateral de 460px desde 760px. Cabecera azul con logo blanco y cuadrillé debajo; registro sobre niebla azul. Burbujas del bot en papel con sombra mínima y esquina inferior izquierda de 6px; del usuario en azul con la esquina inferior derecha de 6px. Entran subiendo 8px. Indicador de escritura de tres puntos azules. Respuestas en chips sobre una barra papel; campo y botón enviar de 48px abajo.

## Do's and Don'ts

### Do:
- **Hacé** que todo color de interfaz salga de la familia azul o del papel; dejá que la foto de comida sea el único color extra.
- **Hacé** los precios en Archivo itálica 900 al 80% sobre los trazos de pincel de img/brush, levemente girados.
- **Hacé** los titulares en League Spartan 900 en mayúsculas con interlineado de 0.95 o menos.
- **Hacé** que los bordes de sección y los escenarios de producto usen cuadrillé azul y blanco en módulos de 12 a 24px.
- **Hacé** que todo resumen de pedido tome la forma de la comanda dentada.
- **Hacé** las transiciones con expo ease-out (cubic-bezier(.16,1,.3,1) o (.19,1,.22,1)) y los cierres con ease-in corto.
- **Hacé** que todo objetivo táctil mida 44px o más y que toda animación se anule con reducir movimiento, incluido el giro automático del modelo 3D.
- **Hacé** las sombras en azul marino translúcido con spread negativo.

### Don't:
- **No** agregues un tercer color de interfaz (rojos de oferta, verdes de éxito, amarillos de aviso); los estados se resuelven con azul, papel y forma.
- **No** uses la curva de rebote fuera de la pila del armador.
- **No** reemplaces los trazos de pincel raster por fondos CSS planos o redondeados: el pincel real de los flyers es el material.
- **No** uses Caveat Brush para botones, títulos ni párrafos.
- **No** pongas sombras negras ni desplazadas sin desenfoque.
- **No** encierres la comida en tarjetas con sombra en grilla pareja; el plato vive sobre su escenario de cuadrillé o su panel azul.
- **No** gires la UI operativa (botones, campos, filas, hojas); la rotación es solo para lo impreso: precios, banners, sellos, notas y el marco de cuadrillé.
- **No** uses un botón flotante de WhatsApp; el pedido sale por el asistente y la comanda.
