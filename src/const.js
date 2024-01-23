const CITY = ['Geneva', 'Chamonix', 'Amsterdam'];
const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restauran'];
const POINTS_COUNT = 3;

const FilterType = {
  EVERTHING: 'everthing',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export { CITY, EVENT_TYPES, FilterType, POINTS_COUNT, SortType };
