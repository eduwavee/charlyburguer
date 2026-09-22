/* =====================================================================
   CHARLY'S — CARTA, PRECIOS Y DATOS DEL LOCAL
   ---------------------------------------------------------------------
   Este es el único archivo que hace falta tocar para cambiar precios,
   productos, extras, costo de envío, alias de pago u horario.

   IMPORTANTE: los precios marcados con "// EJEMPLO" son provisorios.
   Cuando tengas todos los precios reales, cambiá `preciosDeEjemplo`
   a false y desaparece el aviso de la web.
   ===================================================================== */
window.CHARLYS = {
  preciosDeEjemplo: true,

  local: {
    nombre: "Charly's",
    whatsapp: '5493813690561',          // formato internacional, sin + ni espacios
    whatsappVisible: '381 369-0561',
    instagram: 'charlyburgerfama',
    ciudad: 'Famaillá, Tucumán',
    zonaHoraria: 'America/Argentina/Tucuman'
  },

  /* Días: 0 = domingo, 1 = lunes … 6 = sábado.
     Si cierra después de medianoche, el turno sigue contando para el día que abrió. */
  horario: {
    dias: [2, 3, 4, 5, 6, 0],
    abre: '21:00',
    cierra: '01:30'
  },

  entrega: {
    delivery: { activo: true, costo: 1500 },   // EJEMPLO: costo fijo del envío
    retiro: { activo: true }
  },

  pagos: [
    { id: 'efectivo', nombre: 'Efectivo', detalle: 'Te llevamos el vuelto' },
    { id: 'transferencia', nombre: 'Transferencia', alias: 'charlys.burger.ej' },  // EJEMPLO: alias
    { id: 'mercadopago', nombre: 'Mercado Pago', alias: 'charlys.mp.ej' }          // EJEMPLO: alias
  ],

  /* Precio por carne extra: se suma por cada carne arriba de la que trae la burger.
     Simple = 1 carne, Doble = 2, Triple = 3. */
  carneExtra: 1200,                     // EJEMPLO (con Crunchy simple a $6.000 da la doble a $7.200)

  extras: [
    { id: 'cheddar', nombre: 'Cheddar extra', precio: 700, capa: 'cheddar' },          // EJEMPLO
    { id: 'panceta', nombre: 'Panceta extra', precio: 900, capa: 'panceta' },          // EJEMPLO
    { id: 'huevo', nombre: 'Huevo frito', precio: 600, capa: 'huevo' },                // EJEMPLO
    { id: 'cebolla-crunchy', nombre: 'Cebolla crunchy', precio: 600, capa: 'cebolla' }, // EJEMPLO
    { id: 'salsa', nombre: 'Salsa especial extra', precio: 400, capa: 'salsa' }         // EJEMPLO
  ],

  /* banner: subtítulo sobre trazo de pincel (como en los flyers). nota: nota a mano con flecha.
     capas: cómo se dibuja la burger en el armador, de abajo hacia arriba.
     "CARNES" se reemplaza por las carnes elegidas (cada una con su queso).
     quitar: ingredientes que el cliente puede sacar (id de capa + nombre). */
  productos: [
    {
      id: 'clasica', categoria: 'burgers', nombre: 'Clásica', foto: 'img/cut/clasica.webp',
      descripcion: 'Pan de papa, carne de 100 g, queso tybo derretido, lechuga, tomate y huevo frito.',
      precio: 6000,                     // EJEMPLO (simple)
      carnes: { incluidas: 1, max: 4, queso: 'tybo' },
      capas: ['lechuga', 'tomate', 'CARNES', 'huevo'],
      quitar: [{ id: 'lechuga', nombre: 'lechuga' }, { id: 'tomate', nombre: 'tomate' }, { id: 'huevo', nombre: 'huevo' }],
      extras: ['cheddar', 'panceta', 'huevo', 'salsa']
    },
    {
      id: 'cheese', categoria: 'burgers', nombre: 'Cheese', foto: 'img/cut/cheese.webp',
      descripcion: 'Pan de papa, carne de 100 g y queso cheddar derretido. Simple y perfecta.',
      precio: 5500,                     // EJEMPLO (simple)
      carnes: { incluidas: 1, max: 4, queso: 'cheddar' },
      capas: ['CARNES'],
      quitar: [],
      extras: ['cheddar', 'panceta', 'huevo', 'cebolla-crunchy', 'salsa']
    },
    {
      id: 'crunchy', categoria: 'burgers', nombre: 'Crunchy', foto: 'img/cut/crunchy.webp',
      descripcion: 'Pan de papa, carne de 100 g, cheddar derretido, panceta crujiente, cebolla crunchy y salsa especial.',
      precio: 6000,                     // EJEMPLO (simple). Doble confirmada: $7.200
      carnes: { incluidas: 1, max: 4, queso: 'cheddar' },
      capas: ['salsa', 'CARNES', 'panceta', 'cebolla'],
      quitar: [{ id: 'panceta', nombre: 'panceta' }, { id: 'cebolla', nombre: 'cebolla crunchy' }, { id: 'salsa', nombre: 'salsa' }],
      extras: ['cheddar', 'panceta', 'huevo', 'cebolla-crunchy', 'salsa'],
      destaque: true,                   // se muestra grande, en el panel azul
      banner: 'Cheddar, panceta y cebolla crunchy',
      nota: '¿La probaste doble?'
    },
    {
      id: 'bbq', categoria: 'burgers', nombre: 'BBQ', foto: 'img/cut/bbq.webp',
      descripcion: 'Pan de papa, carne de 100 g, cheddar derretido, panceta crujiente, cebolla caramelizada y barbacoa especial.',
      precio: 6200,                     // EJEMPLO (simple)
      carnes: { incluidas: 1, max: 4, queso: 'cheddar' },
      capas: ['barbacoa', 'caramelizada', 'CARNES', 'panceta'],
      quitar: [{ id: 'panceta', nombre: 'panceta' }, { id: 'caramelizada', nombre: 'cebolla caramelizada' }, { id: 'barbacoa', nombre: 'barbacoa' }],
      extras: ['cheddar', 'panceta', 'huevo', 'cebolla-crunchy']
    },
    {
      id: 'chicken', categoria: 'pollo', nombre: 'Chicken Burger', foto: 'img/cut/chicken.webp', fotoTipo: 'foto',
      descripcion: 'Pollo frito extra crocante, salsa especial de la casa, cheddar derretido y pan suave tostadito. Viene con papas.',
      precio: 8999,                     // confirmado
      capas: ['salsa', 'pollo', 'cheddar'],
      quitar: [{ id: 'salsa', nombre: 'salsa' }, { id: 'cheddar', nombre: 'cheddar' }],
      extras: ['cheddar', 'panceta', 'salsa'],
      banner: 'Con papas y salsa especial',
      precioEtiqueta: 'por solo',
      nota: '¡La combi perfecta!'
    },
    {
      id: 'box', categoria: 'pollo', nombre: 'Box Pollo Frito', foto: 'img/cut/box.webp', fotoTipo: 'foto',
      descripcion: 'Pollo frito extra crocante, papas doradas y nuestra salsa especial. Ideal para compartir (¡o no!).',
      precio: 10000,                    // confirmado
      extras: ['salsa'],
      banner: 'Papas y salsa especial',
      precioEtiqueta: 'a solo',
      limitado: 'Unidades limitadas por noche'
    },

    /* Papas y bebidas */
    {
      id: 'papas', categoria: 'extras', nombre: 'Papas fritas', descripcion: 'Porción de papas doradas.',
      precio: 3000                      // EJEMPLO
    },
    {
      id: 'papas-cheddar', categoria: 'extras', nombre: 'Papas cheddar y panceta', descripcion: 'Papas con cheddar derretido y panceta crujiente.',
      precio: 4500                      // EJEMPLO
    },
    {
      id: 'gaseosa', categoria: 'extras', nombre: 'Gaseosa 500 ml', descripcion: 'Fría, para acompañar.',
      precio: 1800,                     // EJEMPLO
      opciones: { titulo: 'Sabor', valores: ['Coca-Cola', 'Coca-Cola Zero', 'Sprite', 'Fanta'] }
    },
    {
      id: 'agua', categoria: 'extras', nombre: 'Agua 500 ml', descripcion: 'Con o sin gas.',
      precio: 1300,                     // EJEMPLO
      opciones: { titulo: 'Tipo', valores: ['Sin gas', 'Con gas'] }
    }
  ]
};
