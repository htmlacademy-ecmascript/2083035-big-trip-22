import {destinations} from '../mock/destinations.js';
import {offers} from '../mock/offers.js';
import {getRandomTrip} from '../mock/points.js';

export default class PointModel {
  #points = null;
  #destinations = null;
  #offers = null;

  consrtuctor() {
    this.#destinations = [];
    this.#offers = [];
    this.#points = [];
  }

  init() {
    this.#destinations = destinations;
    this.#offers = offers;
    this.#points = getRandomTrip();
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

}
