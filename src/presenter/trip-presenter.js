import InfoView from '../view/info-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import createNoPointView from '../view/no-point-view.js';
import { render, RenderPosition, replace } from '../framework/render.js';

export default class TripPresenter {
  #mainContainer = null;
  #filterContainer = null;
  #listContainer = null;
  #sortContainer = null;
  #pointModel = null;

  #addListComponent = new EventsListView();
  #sortComponent = new SortView();
  #filterComponent = new FiltersView();
  #infoComponent = new InfoView();
  #addNewPointComponent = new AddNewPointView();

  constructor({ mainContainer, filterContainer, listContainer, sortContainer, pointModel }) {
    this.#mainContainer = mainContainer;
    this.#filterContainer = filterContainer;
    this.#listContainer = listContainer;
    this.#sortContainer = sortContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#renderApp();
  }

  #renderTripPoint(point, destinations, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      destinations,
      offers,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditPointView({
      point,
      destinations,
      offers,
      onFormClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#addListComponent.element);
  }

  #renderApp() {
    const offers = this.#pointModel.offers;
    const destinations = this.#pointModel.destinations;
    const points = this.#pointModel.points;

    render(this.#infoComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
    render(this.#sortComponent, this.#sortContainer);
    render(this.#filterComponent, this.#filterContainer);
    render(this.#addListComponent, this.#listContainer);
    // render(this.#addNewPointComponent, this.#listContainer, RenderPosition.AFTEREND);

    if (points.length === 0) {
      render(new createNoPointView(), this.#sortContainer);
      return;
    }

    for (const point of points) {
      this.#renderTripPoint(point, destinations, offers);
    }

  }
}

