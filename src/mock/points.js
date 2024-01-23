import { nanoid } from 'nanoid';
import { getRandomArrayElement } from '../utils/common.js';
import { POINTS_COUNT } from '../const.js';

export const points = [
  {
    id: nanoid(),
    basePrice: 200,
    dateFrom: '2019-07-11T11:15:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: '1',
    isFavorite: true,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31',
      'b4c3e4e6-9053-42ce-b747-e281314baa41',
      'b4c3e4e6-9053-42ce-b747-e281314baa51',
    ],
    type: 'taxi'
  },
  {
    id: nanoid(),
    basePrice: 3000,
    dateFrom: '2019-02-10T02:55:56.845Z',
    dateTo: '2019-02-10T04:22:13.375Z',
    destination: '2',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa61',
      'b4c3e4e6-9053-42ce-b747-e281314baa71',
    ],
    type: 'flight'
  },
  {
    id: nanoid(),
    basePrice: 500,
    dateFrom: '2019-05-10T12:30:56.845Z',
    dateTo: '2019-05-10T14:30:13.375Z',
    destination: '3',
    isFavorite: false,
    offers: [],
    type: 'bus'
  }
];

function getRandomTrip() {
  const pointsRandom = Array.from({ length: 0 });

  while (pointsRandom.length < POINTS_COUNT) {
    const item = getRandomArrayElement(points);

    if (!pointsRandom.includes(item)) {
      pointsRandom.push(item);
    }
  }

  return pointsRandom;
}

export { getRandomTrip };
