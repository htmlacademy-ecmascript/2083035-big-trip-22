import InfoView from '../view/info-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import NoPointView from '../view/no-point-view.js';
import { RenderPosition, render, replace } from '../framework/render.js';

export default class TripPresenter {
  #sortContainer = null;
  #listContainer = null;
  #infoContainer = null;
  #pointModel = null;

  #listComponent = new EventsListView();

  #sortComponent = new SortView();
  #infoComponent = new InfoView();

  constructor({sortContainer, listContainer, infoContainer, pointModel}) {
    this.#sortContainer = sortContainer;
    this.#listContainer = listContainer;
    this.#infoContainer = infoContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#renderApp();
  }

  #renderTrip(point, destinations, offers) {
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

    render(pointComponent, this.#listComponent.element);

  }

  #renderApp() {
    const offers = this.#pointModel.offers;
    const destinations = this.#pointModel.destinations;
    const points = this.#pointModel.points;

    render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
    render(this.#sortComponent, this.#sortContainer);
    render(this.#listComponent, this.#listContainer);


    if (points.length === 0) {
      render(new NoPointView(), this.#sortContainer);
      return;
    }

    for (const point of points) {
      this.#renderTrip(point, destinations, offers);
    }
  }
}
