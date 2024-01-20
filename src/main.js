import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import FiltersView from './view/filters-view.js';
import { generateFilter } from './mock/filter.js';
import { render } from './framework/render.js';

const tripFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');

const pointModel = new PointModel();
pointModel.init();

const tripPresenter = new TripPresenter({
  infoContainer: tripMain,
  sortContainer: tripEvents,
  listContainer: tripEvents,
  pointModel: pointModel
});

const filters = generateFilter(pointModel.points);
render(new FiltersView({ filters }), tripFilters);

tripPresenter.init();
