import {getFilteredOffers, getRandomElement, getRatingPercent} from './app-utils';
import {cities} from '../const';
import {getMockOffer} from './mock-utils';

describe('Utils: App utils', () => {
  describe('Filter offers by name', () => {
    it('should return an array of cities filtered by city name', () => {
      const cityNames = [cities[1].name, cities[3].name, cities[1].name, cities[0].name, cities[1].name];
      const sortedCityNames = [cities[1].name, cities[1].name, cities[1].name];
      const offer = getMockOffer();
      const offers = cityNames.map((city) => ({...offer, city: {...offer.city, name: city}}));
      const expectedOffers = sortedCityNames.map((city) => ({...offer, city: {...offer.city, name: city}}));
      const result = getFilteredOffers(offers, cities[1].name);

      expect(result).toMatchObject(expectedOffers);

      expect(result).toMatchObject(expectedOffers);
    });
  });

  describe('Get the amount of percent', () => {
    it('should return a string as a percentage', () => {
      const mockValue = 4;
      const expectedValue = '80%';
      const result = getRatingPercent(mockValue);

      expect(result).toMatchObject(expectedValue);
    });
  });

  describe('Get random element from array', () => {
    it('should return random element from array', () => {
      const mockArray = ['Get', 'random', 'element', 'from', 'array'];
      const result = getRandomElement(mockArray);

      expect(mockArray).toContain(result);
    });
  });
});
