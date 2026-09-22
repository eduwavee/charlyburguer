# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Vecinos de Famaillá (Tucumán) que piden comida de noche desde el celular, casi siempre llegando desde el Instagram @charlyburgerfama o un link compartido por WhatsApp. Piden para ellos, para la familia o para una juntada con amigos, y quieren resolver el pedido rápido y sin errores: qué burger, cómo la quieren, si la retiran o se la llevan, y cuánto sale.

El otro usuario es el local: recibe el pedido por WhatsApp y necesita que llegue completo y legible (productos, modificaciones, entrega, dirección, pago, vuelto) para no tener que repreguntar.

## Product Purpose

Sitio móvil de Charly's (hamburguesería y sandwichería) que convierte la visita en un pedido listo para la cocina: carta con fotos reales, personalización de cada burger, carrito, un asistente guiado que toma el pedido paso a paso, y el envío del pedido armado al WhatsApp del local. Éxito = más pedidos completos por WhatsApp y menos idas y vueltas para confirmar detalles.

## Positioning

Burgers 100% caseras, armadas al momento con pan de papa y carne de 100 g, en Famaillá. El pedido se arma en la web y llega al WhatsApp del local como una comanda completa.

## Operating Context

- Horario: martes a domingo de 21:00 a 01:30 hs. Lunes cerrado. Zona horaria America/Argentina/Tucuman.
- Pedidos por WhatsApp al 381 369-0561 (wa.me/5493813690561). Retiro en el local o delivery.
- Delivery con costo fijo único (monto real pendiente; hoy hay un valor de ejemplo).
- Medios de pago: efectivo (con cálculo de vuelto), transferencia y Mercado Pago (alias real pendiente).
- Box y combos limitados por noche.
- Se publica como sitio estático (index.html + carpetas) en cualquier hosting; se abre también con doble clic.

## Capabilities and Constraints

- Asistente de pedidos guiado (sin IA ni backend): conversación con botones y texto simple que termina abriendo WhatsApp con el pedido redactado.
- Carrito compartido entre la carta y el asistente; personalización por burger (tamaño simple/doble/triple, extras, ingredientes a quitar, nota).
- Estado abierto/cerrado en vivo según horario; se puede armar el pedido fuera de horario con aviso.
- Repetir último pedido: se guarda en el dispositivo del cliente (localStorage), sin cuentas.
- Papas y bebidas como agregados.
- Toda la carta, precios, extras, costo de envío, alias y número viven en un único archivo de configuración editable.
- **Pendiente (segunda etapa):** que el pedido entre automáticamente al chat de WhatsApp del local (API de WhatsApp Business / integración tipo MCP). El envío está aislado en una sola función para poder reemplazarlo.
- **Precios:** solo están confirmados Chicken Burger $8.999 (con papas), Box Pollo Frito $10.000 y Crunchy doble "desde $7.200". El resto de precios, extras, papas, bebidas y envío son de ejemplo y deben reemplazarse antes de publicar.

## Brand Commitments

- Nombre: Charly's. Logo existente (img/logo.png): wordmark azul redondeado con subrayado.
- Sistema real de los flyers de Instagram: tinta azul sobre papel claro, cuadrillé azul y blanco, títulos en mayúsculas pesadas, precios sobre trazo de pincel, sellos circulares "100% sabor casero", íconos de línea en círculos azules, anotaciones a mano con flechas ("¡La combi perfecta!", "¡Irresistible!").
- Voz: rioplatense, directa, cercana, sin vueltas ("Pedí la tuya y disfrutá", "Nada de vueltas").

## Evidence on Hand

- Fotos reales de producto en img/ (Clásica, Cheese, Crunchy, BBQ sobre fondo blanco con cuadrillé; flyers de Chicken Burger y Box Pollo Frito; foto de la Crunchy en mano). Son capturas de Instagram, algunas de baja resolución.
- Descripciones de ingredientes de las seis burgers (en index.html original).
- No hay testimonios, reseñas, dirección exacta del local ni cantidad verificada de seguidores: no inventarlos.

## Product Principles

1. El pedido que llega al local tiene que ser inequívoco: cada modificación, entrega y pago por escrito.
2. Todo se resuelve con el pulgar en un celular, de noche, en menos de un minuto.
3. Ser honesto con el horario y los precios: mostrar cuándo está abierto y marcar lo que es de ejemplo.
4. La marca es la de los flyers: la web tiene que sentirse como un flyer de Charly's que funciona.

## Accessibility & Inclusion

Uso con una mano en pantallas chicas y conexiones móviles lentas: objetivos táctiles ≥44 px, contraste AA, navegación por teclado y lector de pantalla en el asistente y el carrito, respeto de "reducir movimiento".
