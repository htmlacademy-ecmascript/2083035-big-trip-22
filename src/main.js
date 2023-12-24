import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';

const tripFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');

const pointModel = new PointModel();
pointModel.init();

const tripPresenter = new TripPresenter({
  mainContainer: tripMain,
  filterContainer: tripFilters,
  listContainer: tripEvents,
  sortContainer: tripEvents,
  pointModel: pointModel,
});

tripPresenter.init();
