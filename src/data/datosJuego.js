// src/data/datosJuego.js
// Aquí guardamos todos los datos del juego en memoria (sin base de datos).
// Son arreglos normales de JavaScript que se modifican directamente.

const habilidades = [
  {
    id: 1,
    nombre: 'Espadazo',
    descripcion: 'Un ataque poderoso con la espada.',
    incremento_ataque: 10,
    incremento_defensa: 0,
    incremento_estamina: -5,
  },
  {
    id: 2,
    nombre: 'Escudo de Hierro',
    descripcion: 'Aumenta la defensa del guerrero.',
    incremento_ataque: 0,
    incremento_defensa: 15,
    incremento_estamina: -3,
  },
  {
    id: 3,
    nombre: 'Bola de Fuego',
    descripcion: 'Lanza una esfera mágica de fuego.',
    incremento_ataque: 20,
    incremento_defensa: -5,
    incremento_estamina: -10,
  },
  {
    id: 4,
    nombre: 'Regeneración',
    descripcion: 'Recupera estamina lentamente con el tiempo.',
    incremento_ataque: 0,
    incremento_defensa: 0,
    incremento_estamina: 20,
  },
  {
    id: 5,
    nombre: 'Flecha Rápida',
    descripcion: 'Dispara una flecha con gran velocidad.',
    incremento_ataque: 8,
    incremento_defensa: 0,
    incremento_estamina: -2,
  },
  {
    id: 6,
    nombre: 'Paso en las Sombras',
    descripcion: 'Se vuelve invisible por unos segundos.',
    incremento_ataque: 5,
    incremento_defensa: 10,
    incremento_estamina: -8,
  },
];

const personajes = [
  {
    id: 1,
    nombre: 'Diomedes-Díaz',
    tipo: 'guerrero',
    descripcion: 'Fuerte guerrero con habilidades asombrosas para preñar mujeres con la mirada.',
    ataque: 80,
    defensa: 70,
    estamina: 60,
    habilidades: [1, 2], // ids de habilidades que tiene este personaje
  },
  {
    id: 2,
    nombre: 'Amparo-Grisales',
    tipo: 'maga',
    descripcion: 'Hechicera con gran dominio en la magia de rejuvenecimiento (tiene 70 y aparenta 90).',
    ataque: 65,
    defensa: 40,
    estamina: 90,
    habilidades: [3, 4],
  },
  {
    id: 3,
    nombre: 'Tal-Cual',
    tipo: 'elfo',
    descripcion: 'Ágil arquero elfo con precisión excepcional y conocimiento de Bogotá.',
    ataque: 70,
    defensa: 50,
    estamina: 75,
    habilidades: [5],
  },
  {
    id: 4,
    nombre: 'Mariana-Tirado',
    tipo: 'asesina',
    descripcion: 'Maestra del sigilo y los ataques sorpresa, nunca se sabe cuando va a atacar.',
    ataque: 90,
    defensa: 35,
    estamina: 65,
    habilidades: [6, 5],
  },
  {
    id: 5,
    nombre: 'Niño-Jesús',
    tipo: 'sanador',
    descripcion: 'Un valiente hombre que daria su vida para salvarnos, bless jisus christ. Amen.',
    ataque: 75,
    defensa: 85,
    estamina: 55,
    habilidades: [2, 4],
  },
  {
    id: 6,
    nombre: 'Epa-Colombia',
    tipo: 'maga',
    descripcion: 'Aprendiz de magia con mucho potencial en romper transmilenios.',
    ataque: 50,
    defensa: 30,
    estamina: 95,
    habilidades: [3],
  },
];

// Exportamos los dos arreglos para usarlos en otros archivos
module.exports = { personajes, habilidades };