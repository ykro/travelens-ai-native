export interface Destination {
  id: number; name: string; description: string; image: string;
  category: string; activities: string[]; isFavorite?: boolean;
}

export const destinations: Destination[] = [
  { id: 1, name: 'Tikal', description: 'Majestuosas ruinas mayas en la selva de Petén', image: 'https://picsum.photos/seed/tikal/400/300', category: 'Arqueología', activities: ['Explorar templos', 'Observar aves', 'Tour guiado'] },
  { id: 2, name: 'Lago Atitlán', description: 'El lago más hermoso del mundo rodeado de volcanes', image: 'https://picsum.photos/seed/atitlan/400/300', category: 'Naturaleza', activities: ['Kayak', 'Visitar pueblos', 'Senderismo'] },
  { id: 3, name: 'Antigua Guatemala', description: 'Ciudad colonial patrimonio de la humanidad', image: 'https://picsum.photos/seed/antigua/400/300', category: 'Cultura', activities: ['Tour de iglesias', 'Gastronomía', 'Mercado de artesanías'] },
  { id: 4, name: 'Semuc Champey', description: 'Piscinas naturales de agua turquesa en la selva', image: 'https://picsum.photos/seed/semuc/400/300', category: 'Aventura', activities: ['Nadar en pozas', 'Tubing', 'Cuevas'] },
  { id: 5, name: 'Volcán Acatenango', description: 'Caminata épica con vista al Volcán de Fuego', image: 'https://picsum.photos/seed/acatenango/400/300', category: 'Aventura', activities: ['Hiking', 'Campamento', 'Fotografía'] },
  { id: 6, name: 'Río Dulce', description: 'Navegación por el río tropical hacia el Caribe', image: 'https://picsum.photos/seed/riodulce/400/300', category: 'Naturaleza', activities: ['Paseo en lancha', 'Aguas termales', 'Castillo San Felipe'] },
  { id: 7, name: 'Chichicastenango', description: 'El mercado indígena más grande de Centroamérica', image: 'https://picsum.photos/seed/chichi/400/300', category: 'Cultura', activities: ['Compras', 'Ceremonia maya', 'Gastronomía local'] },
  { id: 8, name: 'Flores, Petén', description: 'Isla pintoresca en el lago Petén Itzá', image: 'https://picsum.photos/seed/flores/400/300', category: 'Cultura', activities: ['Paseo por la isla', 'Atardecer', 'Gastronomía'] },
  { id: 9, name: 'Playa Blanca, Izabal', description: 'Playas de arena blanca en el Caribe guatemalteco', image: 'https://picsum.photos/seed/izabal/400/300', category: 'Playa', activities: ['Snorkel', 'Descanso', 'Kayak'] },
  { id: 10, name: 'Quetzaltenango', description: 'La ciudad de los Altos con aguas termales', image: 'https://picsum.photos/seed/xela/400/300', category: 'Cultura', activities: ['Fuentes Georginas', 'Mercado', 'Volcán Santa María'] },
  { id: 11, name: 'Livingston', description: 'Cultura garífuna en el Caribe de Guatemala', image: 'https://picsum.photos/seed/livingston/400/300', category: 'Cultura', activities: ['Playa', 'Tapado', 'Música garífuna'] },
  { id: 12, name: 'Yaxhá', description: 'Ruinas mayas con vista al lago al atardecer', image: 'https://picsum.photos/seed/yaxha/400/300', category: 'Arqueología', activities: ['Explorar ruinas', 'Atardecer', 'Vida silvestre'] },
];
