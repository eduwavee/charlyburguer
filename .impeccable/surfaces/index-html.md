---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Surface brief: index.html (sitio movil de pedidos)

Scope: la landing movil completa de Charly's mas el flujo de pedido (carta con personalizacion, carrito, asistente guiado de pedido, checkout a WhatsApp). Modo del visitante: Persuade en la landing; Operate dentro del carrito y el asistente.

Audiencia y tarea: vecinos de Famailla, de noche, con el celular en una mano. Accion: armar el pedido y mandarlo al WhatsApp del local. Prueba: fotos reales de producto, ingredientes reales, horario en vivo, modelo 3D de la burger. Restricciones: sitio estatico, sin backend; precios de ejemplo marcados y editables en assets/menu.js.

Camino elegido: extension del mundo de marca existente (los flyers de Instagram), sin torneo de conceptos. Build code-led (sin generacion de imagenes en la sesion).

Cambios pedidos por el usuario durante el build: el hero usa su modelo 3D (hamburguesa doble con cheddar, Meshy AI) en lugar del recorte de la Crunchy.

## Direction contract

THESIS: El sitio es un flyer de Charly's que toma pedidos. Rechaza la landing de delivery generica (hero con foto en card, grilla de cards iguales, boton flotante de WhatsApp) y usa la gramatica de los flyers: tinta azul, papel blanco, cuadrille, precios sobre trazo de pincel.

OWN-WORLD: Dos tintas: azul Charly's (#2A5FAE campos, #1E4C8F texto, #143665 profundo) y papel blanco frio (#FFFFFF / #EEF2F8). La comida es el unico otro color. Titulos en League Spartan 900 (geometrica, O redonda, como los flyers); precios y banners en Archivo condensada italica sobre trazos de pincel raster sacados de los flyers; notas a mano en Caveat Brush con flechas; sellos circulares; iconos de linea en circulos azules; franjas de cuadrille. La comanda (ticket con borde dentado, muescas y encabezado con logo y hora) es la forma del carrito y de los resumenes del asistente.

STORY: En un vistazo el visitante sabe que es Charly's, si esta abierto y como pedir. Recorre la carta como un flyer (burgers sobre papel entre bandas de cuadrille, la Crunchy en panel azul, pollo con fotos reales), arma su burger y ve crecer la pila; el carrito es una comanda; el asistente pregunta entrega, nombre y pago y manda todo a WhatsApp ya redactado.

FIRST VIEWPORT (390 px): barra de estado (abierto/cerrado en vivo) - header blanco con logo y boton de pedido con contador - banda de cuadrille - campo azul con la burger 3D girando (poster fijo mientras carga, se puede girar con el dedo), nota a mano "¡girala!" con flecha y sello "100% sabor casero" - titular blanco enorme "EL SABOR QUE TE HIZO FAMA" con FAMA sobre pincel blanco - accion primaria "Arma tu pedido" (abre el asistente) blanca, secundaria "Ver la carta".

FORM: Extension del mundo incumbente (flyers de Instagram, 1ro de la lista de resonancia). Sin roll de concept-seed: camino de extension. Interaccion firma: el armador de burger, una pila dibujada en linea azul que suma capas con caida y rebote al elegir extras; vive en la hoja de personalizacion y en el asistente. Segunda interaccion (pedido del usuario): la burger 3D del hero.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
