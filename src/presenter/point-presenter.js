import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {

  #eventsListlistComponent = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #handleFavoriteClick = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({ eventsListlistComponent, onDataChange, onModeChange }) {
    this.#eventsListlistComponent = eventsListlistComponent;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, destinations, offers) {

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;


    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.#replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    this.#pointComponent = new PointView({
      point,
      destinations,
      offers,
      onEditClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onFavoriteClick: () => {
        // eslint-disable-next-line no-unused-expressions
        this.#handleFavoriteClick;
      },
    });

    this.#pointEditComponent = new EditPointView({
      point,
      destinations,
      offers,
      onFormClick: () => {
        this.#replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#eventsListlistComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #onFavoriteClick = () => {
    this.#handleDataChange({ ...this.point, isFavorite: !this.point.isFavorite });
  };
}
