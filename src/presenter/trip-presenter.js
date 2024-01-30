import InfoView from '../view/info-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoPointView from '../view/no-point-view.js';
import { RenderPosition, render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { sortDate, sortPrice } from '../utils/utils.js';
import { SortType } from '../const.js';

export default class TripPresenter {
  #sortContainer = null;
  #listContainer = null;
  #infoContainer = null;
  #pointModel = null;

  #eventsListlistComponent = new EventsListView();

  #infoComponent = new InfoView();
  #noPointComponent = new NoPointView();
  #pointPresenters = new Map();

  #sortComponent = null;
  #currentSortType = SortType.DEFAULT;
  #sourcedTripPoints = [];
  #tripPoints = [];

  constructor({ sortContainer, listContainer, infoContainer, pointModel }) {
    this.#sortContainer = sortContainer;
    this.#listContainer = listContainer;
    this.#infoContainer = infoContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#tripPoints = [...this.#pointModel.points];
    this.#sourcedTripPoints = [...this.#pointModel.points];
    this.#renderInfo();
    this.#renderSort();
    this.#renderListComponent();
    this.#renderPoints();
  }

  #renderPoint(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      eventsListlistComponent: this.#eventsListlistComponent.element,
      onDataChange: this.#handleDataChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, destinations, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleDataChange = (updatedPoint) => {
    this.#eventsListlistComponent = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#tripPoints.sort(sortDate);
        break;
      case SortType.PRICE:
        this.#tripPoints.sort(sortPrice);
        break;
      default:
        this.#tripPoints = [...this.#sourcedTripPoints];
    }
    this.#currentSortType = sortType;
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPoints();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#sortContainer);
  }

  #renderInfo() {
    render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderListComponent() {
    render(this.#eventsListlistComponent, this.#listContainer);
  }

  #renderNoPoint() {
    render(this.#noPointComponent, this.#sortContainer);
  }

  #renderPoints() {
    const offers = this.#pointModel.offers;
    const destinations = this.#pointModel.destinations;
    const points = this.#pointModel.points;

    if (points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#tripPoints.forEach((point) => {
      this.#renderPoint(point, destinations, offers);
    });
  }
}
