# Charly's · Burgers caseras en Famaillá

Sitio web móvil de **Charly's**, hamburguesería y sandwichería de Famaillá (Tucumán). Muestra la carta, deja armar cada burger o lomo a gusto y toma el pedido con un asistente guiado. Al final, el pedido completo llega al WhatsApp del local.

El diseño es la identidad nueva de [@charlyburgerfama](https://www.instagram.com/charlyburgerfama/) (octubre 2026): el logo con la burger, el gato mascota, los flyers cobalto con el nombre en amarillo y la carta blanca con cuadrillé y precios en cajas azules.

<p align="center">
  <img src="docs/celular-inicio.jpg" width="190" alt="Inicio en el celular: el gato de Charly's, la burger 3D y el botón Armá tu pedido">
  <img src="docs/celular-carta.jpg" width="190" alt="La carta: cada caja de precio arma esa burger en simple o doble">
  <img src="docs/celular-armador.jpg" width="190" alt="Armador: la pila dibujada crece con cada agregado">
  <img src="docs/celular-comanda.jpg" width="190" alt="Carrito con forma de comanda">
  <img src="docs/celular-asistente.jpg" width="190" alt="Asistente de pedidos con el resumen final y el botón Enviar por WhatsApp">
</p>

<p align="center">
  <img src="docs/foto-comanda.jpg" width="300" alt="Foto de la comanda que se comparte por WhatsApp (datos de ejemplo)"><br>
  <sub>Foto de la comanda que el cliente comparte por WhatsApp (datos de ejemplo).</sub>
</p>

---

## Qué hace

| | |
|---|---|
| **Burger 3D y mascota** | En el inicio, el gato de Charly's presenta un modelo 3D que gira solo y se puede girar con el dedo. Mientras carga se ve una foto fija. Si el teléfono tiene ahorro de datos, se queda con la foto. |
| **Flyers** | Queso, BBQ y Crunchy como en Instagram, con sus fotos y los precios simple y doble listos para tocar. Tocar la foto abre el armador en simple. |
| **Carta** | La carta del local con sus precios: hamburguesas (simple o doble), lomitos, porciones de papas y agregados. Cada caja de precio es un botón: abre el armador con ese tamaño elegido. |
| **Armador** | Un dibujo de la burger o del lomo que suma o quita capas a medida que sumás agregados (carne y cheddar, huevo, cheddar en las papas, papas extra) o sacás ingredientes. |
| **Carrito** | Tiene forma de comanda de cocina. Se guarda en el teléfono aunque cierres la página. |
| **Asistente de pedidos** | Te guía con botones o entiende texto simple (*"2 crunchy dobles"*, *"lomo especial"*, *"papas cheddar"*, *"terminar"*). Pregunta delivery o take away, dirección, nombre y forma de pago, y si pagás en efectivo calcula el vuelto. |
| **Envío por WhatsApp** | Abre WhatsApp con el pedido ya escrito: productos, cambios, total, entrega y pago. Cada pedido lleva un código corto (por ejemplo, #4YVH). |
| **Foto de la comanda** | Después de mandar el texto, el asistente arma una imagen de la comanda con el mismo código. En el celular se manda con el menú "Compartir" (se elige WhatsApp y el chat de Charly's); en la compu se copia para pegarla en WhatsApp Web o se descarga. WhatsApp no deja adjuntar imágenes desde un link, por eso va en un segundo paso. |
| **Horario en vivo** | Muestra "Abierto ahora" o "Cerrado · abrimos…" según la hora de Tucumán y el turno de cada día (martes a jueves hasta la 01:00, viernes a domingo hasta la 01:30). Si está cerrado, avisa, pero igual deja armar el pedido. |
| **¿Lo de siempre?** | Repite el último pedido con un toque (se guarda en el teléfono del cliente). |

## Estructura

```
index.html              página
assets/
  menu.js               ⭐ carta, precios, agregados, envío, pagos, horarios por día y WhatsApp (lo único que hay que editar)
  app.js                carrito, armador, asistente, horario y envío del pedido
  styles.css            estilos (colores de marca en :root)
  fonts/                tipografías alojadas en el sitio (Archivo, Lilita One, Pacifico)
  3d/burger.glb         modelo 3D optimizado (1,7 MB)
img/
  brand/                logo, gato, papas y lettering vectorizados de la marca (SVG), íconos del sitio
  food/                 burgers recortadas de los flyers nuevos
  cut/                  póster del 3D
docs/                   capturas para este README
PRODUCT.md, DESIGN.md   producto y sistema de diseño
```

No usa frameworks ni hace falta compilar nada: es HTML, CSS y JavaScript. Lo único externo es el visor 3D ([`<model-viewer>`](https://modelviewer.dev/) de Google), que se carga desde jsDelivr después de que la página ya se mostró.

## Verlo en tu compu

El 3D necesita que la página se sirva desde un servidor. Si abrís `index.html` con doble clic funciona todo, pero en lugar del 3D se ve la foto fija.

```bash
# con Python
python -m http.server 8000
# o con Node
npx serve .
```

Después abrí <http://localhost:8000>.

## Antes de publicar ✅

1. **Pagos:** transferencia y Mercado Pago van al alias `charlyburgerfama` (Naranja X, a nombre de Damian Hector Leal). Si cambia, se edita en `menu.js` (`pagos`).
2. **Precios, envío y horarios:** están cargados según la carta y la historia de horarios de octubre 2026. El delivery cuesta $500, con un pedido mínimo de $7.500 sin contar el envío. Si cambian, se editan en `menu.js` (`productos`, `agregados`, `entrega.delivery.costo`, `entrega.delivery.minimo` y `horario`).
3. **WhatsApp:** si cambia el número, editá `local.whatsapp` en `menu.js` y los links de `index.html` (buscá `5493813690561`).

## Publicar

Es un sitio estático: sirve cualquier hosting (GitHub Pages, Netlify, Vercel, Hostinger).

**GitHub Pages:** en el repo, andá a *Settings → Pages → Build and deployment*, elegí *Deploy from a branch* con la rama `main` y la carpeta `/ (root)`. En uno o dos minutos queda online en `https://eduwavee.github.io/charlyburguer/`.

## El modelo 3D

El modelo original (Meshy AI) pesaba 32 MB, con unos 880 mil triángulos y texturas 4K. Se optimizó con [glTF-Transform](https://gltf-transform.dev/):

```bash
npx @gltf-transform/cli optimize original.glb assets/3d/burger.glb \
  --compress meshopt --texture-compress webp --texture-size 2048 \
  --simplify true --simplify-ratio 0.2 --simplify-error 0.0005
```

Si cambiás el modelo, regenerá también el póster (`img/cut/burger-3d-poster.webp`) con la misma cámara, para que el cambio de foto a 3D no se note.

## Próxima etapa: pedido directo al WhatsApp del local

Hoy el pedido se abre en el WhatsApp del cliente ya escrito, y el cliente toca "enviar" (y opcionalmente comparte la foto de la comanda). Para que entre solo al chat del local hace falta un pequeño servidor (o una función serverless) conectado a la **API de WhatsApp Business (Cloud API)**. En `assets/app.js`, la función `sendOrder()` es el único punto a reemplazar: ya recibe el pedido completo (productos, entrega, nombre y pago), y `drawComanda()` genera la imagen, que la API puede mandar como adjunto.

## Créditos

- Fotos, logo y flyers: © Charly's (@charlyburgerfama).
- Modelo 3D: generado con Meshy AI para Charly's.
- Tipografías: Archivo, League Spartan y Caveat Brush (SIL Open Font License).
- Visor 3D: [model-viewer](https://github.com/google/model-viewer) (Apache 2.0).
