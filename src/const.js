const CITY = ['Geneva', 'Chamonix', 'Amsterdam'];

const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restauran'];

export { CITY, EVENT_TYPES };

export const getDefaultPoint = () => ({
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: EVENT_TYPES[0],
});
