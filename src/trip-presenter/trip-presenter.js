import { render, RenderPosition } from '../render.js';

import InfoView from '../view/info-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventsList from '../view/events-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import AddNewPointView from '../view/add-new-point.js';


export default class TripPresenter {

  constructor({ mainContainer, filterContainer, tripContainer }) {
    this.mainContainer = mainContainer;
    this.filterContainer = filterContainer;
    this.tripContainer = tripContainer;
  }

  init() {
    const tripList = new EventsList();

    render(new InfoView(), this.mainContainer, RenderPosition.AFTERBEGIN);
    render(new SortView(), this.tripContainer);

    render(tripList, this.tripContainer);

    render(new EditPointView(), tripList.element);
    render(new FiltersView(), this.filterContainer);

    for (let i = 0; i < 3; i++) {
      render(new PointView(), tripList.element);
    }

    render(new AddNewPointView(), tripList.element, RenderPosition.AFTEREND);
  }
}
