import {useCallback, useState} from 'react';
import {cities, sortTypes} from '../../const';
import Location from '../../components/location/location';
import PlacesOption from '../../components/places-option/places-option';
import PlaceCard from '../../components/place-card/place-card';
import Layout from '../../components/layout/layout';

type HomePageProps = {
  placeCount: number;
};

const HomePage = ({placeCount}: HomePageProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkedFilter, setCheckedFilter] = useState<null | string>(null);
  const [checkedOption, setCheckedOption] = useState<null | string>(null);
  const sortClickHandler = () => setIsOpen(() => !isOpen);
  const filterClickHandler = useCallback((name: string) => setCheckedFilter(name), []);
  const optionClickHandler = useCallback((name: string) => setCheckedOption(name), []);
  const optionsOpen = isOpen ? 'places__options--opened' : '';

  return (
    <Layout>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map(({id, name}) => (
              <Location
                key={id}
                name={name}
                isActive={checkedFilter === name}
                onClick={filterClickHandler}
              />
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{placeCount} places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get" onClick={sortClickHandler}>
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width={7} height={4}>
                  <use xlinkHref="#icon-arrow-select" />
                </svg>
              </span>
              <ul className={`places__options places__options--custom ${optionsOpen}`}>
                {sortTypes.map(({id, name}) => (
                  <PlacesOption
                    key={id}
                    name={name}
                    isActive={checkedOption === name}
                    onClick={optionClickHandler}
                  />
                ))}
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              <PlaceCard />
              <PlaceCard />
              <PlaceCard />
              <PlaceCard />
              <PlaceCard />
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
