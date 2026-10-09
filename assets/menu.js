/* =====================================================================
   CHARLY'S — CARTA, PRECIOS Y DATOS DEL LOCAL
   ---------------------------------------------------------------------
   Este es el único archivo que hace falta tocar para cambiar precios,
   productos, agregados, costo de envío, alias de pago u horario.

   Precios tomados de la carta de Charly's (octubre 2026).
   Lo marcado "// EJEMPLO" todavía es provisorio: costo del delivery
   y alias de pago.
   ===================================================================== */
window.CHARLYS = {
  local: {
    nombre: "Charly's",
    whatsapp: '5493813690561',          // formato internacional, sin + ni espacios
    whatsappVisible: '381 369-0561',
    instagram: 'charlyburgerfama',
    barrio: 'B° San Nicolás',
    ciudad: 'Famaillá, Tucumán',
    zonaHoraria: 'America/Argentina/Tucuman'
  },

  /* Turnos por día: 0 = domingo, 1 = lunes … 6 = sábado.
     Si cierra después de medianoche, el turno sigue contando para el día que abrió.
     Un día sin turno es un día cerrado. */
  horario: {
    2: ['21:30', '01:00'],
    3: ['21:30', '01:00'],
    4: ['21:30', '01:00'],
    5: ['21:30', '01:30'],
    6: ['21:30', '01:30'],
    0: ['21:30', '01:30']
  },

  entrega: {
    delivery: { activo: true, costo: 1500, confirmado: false },   // EJEMPLO: costo fijo del envío
    retiro: { activo: true }
  },

  pagos: [
    { id: 'efectivo', nombre: 'Efectivo', detalle: 'Te llevamos el vuelto' },
    { id: 'transferencia', nombre: 'Transferencia', alias: 'charlys.burger.ej' },  // EJEMPLO: alias
    { id: 'mercadopago', nombre: 'Mercado Pago', alias: 'charlys.mp.ej' }          // EJEMPLO: alias
  ],

  /* Agregados que se suman al armar una burger o un lomo.
     capa: qué se dibuja en el armador (una o varias capas). */
  agregados: [
    { id: 'carne', nombre: 'Carne y feta de cheddar', precio: 2500, capa: ['carne', 'cheddar'] },
    { id: 'huevo', nombre: 'Huevo frito', precio: 1500, capa: 'huevo' },
    { id: 'cheddar-papas', nombre: 'Cheddar en las papas', precio: 2500 },
    { id: 'papas-extra', nombre: 'Papas extra', precio: 2500 }
  ],

  /* Todo sale con papas.
     tamanos: precio por tamaño (simple = 1 carne, doble = 2).
     capas: cómo se dibuja en el armador, de abajo hacia arriba.
     "CARNES" se reemplaza por las carnes del tamaño elegido (cada una con su queso).
     quitar: ingredientes que el cliente puede sacar (id de capa + nombre).
     flyer: se muestra como flyer, con la foto recortada. */
  productos: [
    {
      id: 'queso', categoria: 'burgers', nombre: "Charly's con Queso", corto: 'Con Queso',
      descripcion: 'Pan de papa, carne y cheddar.',
      tamanos: { simple: 7700, doble: 8500 }, queso: 'cheddar',
      capas: ['CARNES'],
      quitar: [],
      extras: ['carne', 'huevo', 'cheddar-papas', 'papas-extra'],
      flyer: { titulo: 'Queso', foto: 'img/food/queso.webp', alto: 843 }
    },
    {
      id: 'bbq', categoria: 'burgers', nombre: "Charly's BBQ", corto: 'BBQ',
      descripcion: 'Pan de papa, carne, cheddar, cebolla caramelizada, salsa barbacoa y bacon.',
      tamanos: { simple: 8500, doble: 9500 }, queso: 'cheddar',
      capas: ['barbacoa', 'caramelizada', 'CARNES', 'panceta'],
      quitar: [{ id: 'panceta', nombre: 'bacon' }, { id: 'caramelizada', nombre: 'cebolla caramelizada' }, { id: 'barbacoa', nombre: 'barbacoa' }],
      extras: ['carne', 'huevo', 'cheddar-papas', 'papas-extra'],
      flyer: { titulo: 'BBQ', foto: 'img/food/bbq.webp', alto: 929 }
    },
    {
      id: 'crunchy', categoria: 'burgers', nombre: "Charly's Crunchy", corto: 'Crunchy',
      descripcion: 'Pan de papa, carne, cheddar, cebolla crunchy, salsa especial y bacon.',
      tamanos: { simple: 8500, doble: 9500 }, queso: 'cheddar',
      capas: ['salsa', 'CARNES', 'panceta', 'cebolla'],
      quitar: [{ id: 'panceta', nombre: 'bacon' }, { id: 'cebolla', nombre: 'cebolla crunchy' }, { id: 'salsa', nombre: 'salsa especial' }],
      extras: ['carne', 'huevo', 'cheddar-papas', 'papas-extra'],
      flyer: { titulo: 'Crunchy', foto: 'img/food/crunchy.webp', alto: 1014 }
    },
    {
      id: 'criolla', categoria: 'burgers', nombre: "Charly's Criolla", corto: 'Criolla',
      descripcion: 'Pan de papa, carne, queso tybo y salsa criolla.',
      tamanos: { simple: 8500, doble: 9500 }, queso: 'tybo',
      capas: ['CARNES', 'criolla'],
      quitar: [{ id: 'criolla', nombre: 'salsa criolla' }],
      extras: ['carne', 'huevo', 'cheddar-papas', 'papas-extra']
    },
    {
      id: 'clasica', categoria: 'burgers', nombre: "Charly's Clásica", corto: 'Clásica',
      descripcion: 'Pan de papa, carne, queso tybo, lechuga y tomate, mayonesa y huevo frito.',
      tamanos: { simple: 9500, doble: 10000 }, queso: 'tybo',
      capas: ['mayonesa', 'lechuga', 'tomate', 'CARNES', 'huevo'],
      quitar: [{ id: 'lechuga', nombre: 'lechuga' }, { id: 'tomate', nombre: 'tomate' }, { id: 'mayonesa', nombre: 'mayonesa' }, { id: 'huevo', nombre: 'huevo' }],
      extras: ['carne', 'huevo', 'cheddar-papas', 'papas-extra']
    },
    {
      id: 'magnus', categoria: 'burgers', nombre: "Charly's Magnus", corto: 'Magnus',
      descripcion: 'Pan de papa, carne, cheddar, ketchup, pepinillos y cebolla morada.',
      tamanos: { simple: 8500, doble: 9500 }, queso: 'cheddar',
      capas: ['ketchup', 'CARNES', 'pepinillos', 'morada'],
      quitar: [{ id: 'ketchup', nombre: 'ketchup' }, { id: 'pepinillos', nombre: 'pepinillos' }, { id: 'morada', nombre: 'cebolla morada' }],
      extras: ['carne', 'huevo', 'cheddar-papas', 'papas-extra']
    },
    {
      id: 'egg', categoria: 'burgers', nombre: "Charly's Egg", corto: 'Egg',
      descripcion: 'Pan de papa, carne, cheddar, huevo frito y mucho bacon.',
      tamanos: { simple: 8500, doble: 9500 }, queso: 'cheddar',
      capas: ['CARNES', 'panceta', 'panceta', 'huevo'],
      quitar: [{ id: 'huevo', nombre: 'huevo' }, { id: 'panceta', nombre: 'bacon' }],
      extras: ['carne', 'huevo', 'cheddar-papas', 'papas-extra']
    },

    /* Lomitos */
    {
      id: 'lomo', categoria: 'lomitos', nombre: 'Lomo común',
      descripcion: 'Pan, lomito, lechuga y tomate, mayonesa y mostaza.',
      precio: 9500, pan: 'lomo',
      capas: ['mayonesa', 'lechuga', 'tomate', 'lomo', 'mostaza'],
      quitar: [{ id: 'lechuga', nombre: 'lechuga' }, { id: 'tomate', nombre: 'tomate' }, { id: 'mayonesa', nombre: 'mayonesa' }, { id: 'mostaza', nombre: 'mostaza' }],
      extras: ['huevo', 'cheddar-papas', 'papas-extra']
    },
    {
      id: 'lomo-especial', categoria: 'lomitos', nombre: 'Lomo especial',
      descripcion: 'Pan, lomito, huevo, jamón y queso, lechuga y tomate, mayonesa y mostaza.',
      precio: 10000, pan: 'lomo',
      capas: ['mayonesa', 'lechuga', 'tomate', 'lomo', 'jamon', 'tybo', 'huevo', 'mostaza'],
      quitar: [{ id: 'huevo', nombre: 'huevo' }, { id: 'jamon', nombre: 'jamón' }, { id: 'tybo', nombre: 'queso' }, { id: 'lechuga', nombre: 'lechuga' }, { id: 'tomate', nombre: 'tomate' }, { id: 'mayonesa', nombre: 'mayonesa' }, { id: 'mostaza', nombre: 'mostaza' }],
      extras: ['huevo', 'cheddar-papas', 'papas-extra']
    },
    {
      id: 'lomo-bbq', categoria: 'lomitos', nombre: 'Lomo BBQ',
      descripcion: 'Pan, lomito, cebolla caramelizada, salsa barbacoa y mucho queso cheddar.',
      precio: 10500, pan: 'lomo',
      capas: ['barbacoa', 'lomo', 'cheddar', 'cheddar', 'caramelizada'],
      quitar: [{ id: 'caramelizada', nombre: 'cebolla caramelizada' }, { id: 'barbacoa', nombre: 'barbacoa' }],
      extras: ['huevo', 'cheddar-papas', 'papas-extra']
    },
    {
      id: 'lomo-charlys', categoria: 'lomitos', nombre: "Charly's Lomo",
      descripcion: 'Pan, doble lomito, doble huevo, doble jamón y queso, y salsa especial.',
      precio: 14000, pan: 'lomo',
      capas: ['salsa', 'lomo', 'jamon', 'tybo', 'lomo', 'jamon', 'tybo', 'huevo', 'huevo'],
      quitar: [{ id: 'huevo', nombre: 'huevo' }, { id: 'jamon', nombre: 'jamón' }, { id: 'salsa', nombre: 'salsa especial' }],
      extras: ['huevo', 'cheddar-papas', 'papas-extra'],
      destaque: 'El más completo'
    },

    /* Porciones de papas */
    { id: 'papas-simples', categoria: 'papas', nombre: 'Papas simples', precio: 7500 },
    { id: 'papas-cheddar', categoria: 'papas', nombre: 'Papas cheddar', precio: 8500 },
    { id: 'papas-picantes', categoria: 'papas', nombre: 'Papas picantes', precio: 9000 },

    /* Para sumar al pedido */
    { id: 'pote-salsa', categoria: 'sueltos', nombre: 'Pote de salsa especial', precio: 1500 },
    { id: 'pote-cheddar', categoria: 'sueltos', nombre: 'Pote de cheddar', precio: 2500 },
    { id: 'pote-barbacoa', categoria: 'sueltos', nombre: 'Pote de barbacoa', precio: 1500 },
    { id: 'pepsi', categoria: 'sueltos', nombre: 'Pepsi lata', precio: 2000 }
  ]
};
