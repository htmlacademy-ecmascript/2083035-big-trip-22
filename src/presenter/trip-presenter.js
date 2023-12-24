import { render, RenderPosition } from '../render.js';
import { getDefaultPoint } from '../const.js';

import InfoView from '../view/info-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import AddNewPointView from '../view/add-new-point-view.js';

export default class TripPresenter {

  constructor({ mainContainer, filterContainer, listContainer, sortContainer, pointModel }) {
    this.mainContainer = mainContainer;
    this.filterContainer = filterContainer;
    this.listContainer = listContainer;
    this.sortContainer = sortContainer;
    this.pointModel = pointModel;
  }

  init() {
    const offers = this.pointModel.getOffers();
    const destinations = this.pointModel.getDestinations();
    const points = this.pointModel.getPoints();

    const addListComponent = new EventsListView();

    render(new InfoView(), this.mainContainer, RenderPosition.AFTERBEGIN);
    render(new SortView(), this.sortContainer);
    render(new FiltersView(), this.filterContainer);
    render(addListComponent, this.listContainer);
    render(new EditPointView(getDefaultPoint(), destinations, offers), addListComponent.element);
    render(new EditPointView(points[2], destinations, offers), addListComponent.element);

    for (const point of points) {
      render(new PointView(point, destinations, offers), addListComponent.element);
    }

    render(new AddNewPointView(), addListComponent.element, RenderPosition.AFTEREND);
  }


}
