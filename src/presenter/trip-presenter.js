import InfoView from '../view/info-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import NoPointView from '../view/no-point-view.js';
import { RenderPosition, render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';

export default class TripPresenter {
  #sortContainer = null;
  #listContainer = null;
  #infoContainer = null;
  #pointModel = null;

  #eventsListlistComponent = new EventsListView();

  #sortComponent = new SortView();
  #infoComponent = new InfoView();
  #noPointComponent = new NoPointView();

  #pointPresenters = new Map();

  constructor({ sortContainer, listContainer, infoContainer, pointModel }) {
    this.#sortContainer = sortContainer;
    this.#listContainer = listContainer;
    this.#infoContainer = infoContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#renderApp();
  }

  #renderPoint(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      eventsListlistComponent: this.#eventsListlistComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, destinations, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#eventsListlistComponent = updateItem(this.#eventsListlistComponent, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort() {
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

  #renderApp() {
    const offers = this.#pointModel.offers;
    const destinations = this.#pointModel.destinations;
    const points = this.#pointModel.points;

    this.#renderInfo();
    this.#renderSort();
    this.#renderListComponent();

    if (points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    for (const point of points) {
      this.#renderPoint(point, destinations, offers);
    }
  }
}

