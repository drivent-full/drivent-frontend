export function roomType(capacity) {
  const map = {
    1: 'Single',
    2: 'Double',
    3: 'Triple',
  };
  return map[capacity] || 'Outros';
}

export function roomOccupancyString(occupants) {
  if (occupants < 2) return 'Você';
  else return `Você e mais ${occupants - 1} pessoa${occupants > 2 ? 's' : ''}`;
}
