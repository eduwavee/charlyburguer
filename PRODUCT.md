# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Vecinos de Famaillá (Tucumán) que piden comida de noche desde el celular, casi siempre llegando desde el Instagram @charlyburgerfama o un link compartido por WhatsApp. Piden para ellos, para la familia o para una juntada con amigos, y quieren resolver el pedido rápido y sin errores: qué burger, cómo la quieren, si la retiran o se la llevan, y cuánto sale.

El otro usuario es el local: recibe el pedido por WhatsApp y necesita que llegue completo y legible (productos, modificaciones, entrega, dirección, pago, vuelto) para no tener que repreguntar.

## Product Purpose

Sitio móvil de Charly's (hamburguesería y sandwichería) que convierte la visita en un pedido listo para la cocina: la carta del local con sus precios, fotos de los flyers, personalización de cada burger y lomo, carrito, un asistente guiado que toma el pedido paso a paso, y el envío del pedido armado al WhatsApp del local. Éxito = más pedidos completos por WhatsApp y menos idas y vueltas para confirmar detalles.

## Positioning

Burgers con pan de papa, lomitos y papas, armados al momento en Famaillá. Todo sale con papas. El pedido se arma en la web y llega al WhatsApp del local como una comanda completa.

## Operating Context

- Horario (octubre 2026): martes a jueves de 21:30 a 01:00, viernes a domingo de 21:30 a 01:30. Lunes cerrado. Zona horaria America/Argentina/Tucuman.
- Local en B° San Nicolás, Famaillá. Pedidos por WhatsApp al 381 369-0561 (wa.me/5493813690561). Delivery o take away.
- Delivery con costo fijo único (monto real pendiente; hoy hay un valor de ejemplo).
- Medios de pago: efectivo (con cálculo de vuelto), transferencia y Mercado Pago (alias real pendiente).
- Se publica como sitio estático (index.html + carpetas) en cualquier hosting; se abre también con doble clic.

## Capabilities and Constraints

- Asistente de pedidos guiado (sin IA ni backend): conversación con botones y texto simple que termina abriendo WhatsApp con el pedido redactado.
- Carrito compartido entre la carta y el asistente; personalización por burger y lomo (tamaño simple o doble en burgers, agregados de la carta, ingredientes a quitar, nota).
- Estado abierto/cerrado en vivo según horario; se puede armar el pedido fuera de horario con aviso.
- Repetir último pedido: se guarda en el dispositivo del cliente (localStorage), sin cuentas.
- Porciones de papas, potes de salsa y Pepsi como productos sueltos.
- Toda la carta, precios, extras, costo de envío, alias y número viven en un único archivo de configuración editable.
- **Pendiente (segunda etapa):** que el pedido entre automáticamente al chat de WhatsApp del local (API de WhatsApp Business / integración tipo MCP). El envío está aislado en una sola función para poder reemplazarlo.
- **Precios:** los de la carta impresa de octubre 2026 (burgers, lomitos, papas y agregados). El delivery cuesta $500 (pedido mínimo $7.500). Transferencia y Mercado Pago van al alias charlyburgerfama (Naranja X, a nombre de Damian Hector Leal).

## Brand Commitments

- Nombre: Charly's Hamburguesería. Identidad nueva (octubre 2026): logo con una burger de línea sobre el wordmark "Charly's" con colita y "HAMBURGUESERÍA" entre guiones; mascota gato de línea estilo dibujo animado de los años 30 (cara en círculo y cuerpo entero con delantal, burger y pulgar arriba).
- Sistema real de la marca: cobalto #1446A9 y amarillo #FEB905 en los flyers (nombre del producto en amarillo condensado gigante sobre cobalto, foto recortada, pie con @ y WhatsApp); carta blanca con bordes de cuadrillé cobalto, renglones en letra redondeada pesada y precios en cajas cobalto macizas; lettering cursivo ("Nuestra carta", "Nuestros horarios", "Todo sale con papas"); horarios en cajas con borde doble y fila de cuadrillé.
- Voz: rioplatense, directa, cercana, sin vueltas ("Pedila en Charly's", "¡No te la pierdas!").

## Evidence on Hand

- Flyers nuevos de Queso, BBQ y Crunchy (1440×1800) recortados en img/food; logo, mascota y lettering vectorizados desde el perfil, la historia de horarios y la carta impresa (img/brand).
- Carta impresa completa con precios (dos imágenes que pasó el dueño).
- Modelo 3D de una burger doble con cheddar (assets/3d).
- No hay testimonios, reseñas ni dirección exacta (solo el barrio): no inventarlos.

## Product Principles

1. El pedido que llega al local tiene que ser inequívoco: cada modificación, entrega y pago por escrito.
2. Todo se resuelve con el pulgar en un celular, de noche, en menos de un minuto.
3. Ser honesto con el horario y los precios: mostrar cuándo está abierto y marcar lo que es de ejemplo.
4. La marca es la del local: la web tiene que sentirse como los flyers y la carta de Charly's, funcionando.

## Accessibility & Inclusion

Uso con una mano en pantallas chicas y conexiones móviles lentas: objetivos táctiles ≥44 px, contraste AA, navegación por teclado y lector de pantalla en el asistente y el carrito, respeto de "reducir movimiento".
