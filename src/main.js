import TripPresenter from './trip-presenter/trip-presenter.js';

const filters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');

const tripPresenter = new TripPresenter({
  mainContainer: tripMain,
  filterContainer: filters,
  tripContainer: tripEvents
});

tripPresenter.init();
