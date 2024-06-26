
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Route, Routes} from 'react-router-dom';

import Header from './header';
import {ApiRoute, AppRoute, AuthorizationStatus} from '../../const';
import {getOffersAction, logoutAction} from '../../store/api-actions';
import {withHistory, withStore} from '../../utils/mock-component-utils';
import {extractActionsTypes, getMockStore} from '../../utils/mock-utils';
import {clearOffers} from '../../store/offers/offers.slice';
import {clearFavoriteOffers} from '../../store/favorite-offers/favorite-offers.slice';
import {store} from '../../store';


describe('Component: Header', () => {
  const login = 'Sign in';
  const logout = 'Sign out';
  const imageAlt = '6 cities logo';
  const title = 'Login page';

  it('should render Header component, when user authorized', () => {
    const withHistoryComponent = withHistory(<Header />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore({
      USER: {user: null, authorizationStatus: AuthorizationStatus.Auth}
    }));

    render(withStoreComponent);

    expect(screen.getByAltText(imageAlt)).toBeInTheDocument();
    expect(screen.getByText(logout)).toBeInTheDocument();
  });

  it('should render Header component, when user not authorized', () => {
    const withHistoryComponent = withHistory(<Header />);
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());

    render(withStoreComponent);

    expect(screen.getByAltText(imageAlt)).toBeInTheDocument();
    expect(screen.getByText(login)).toBeInTheDocument();
  });

  it('should dispatch "logoutAction", when user click "Sing out"', async() => {
    const withHistoryComponent = withHistory(<Header />);
    const {withStoreComponent, mockAxiosAdapter, mockStore} = withStore(withHistoryComponent, getMockStore({
      USER: {user: null, authorizationStatus: AuthorizationStatus.Auth}
    }));
    mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(200);

    render(withStoreComponent);

    await userEvent.click(screen.getByText(logout));
    await store.dispatch(getOffersAction());
    const actionsType = extractActionsTypes(mockStore.getActions());

    expect(actionsType).toEqual([
      logoutAction.pending.type,
      clearOffers.type,
      clearFavoriteOffers.type,
      getOffersAction.pending.type,
      logoutAction.fulfilled.type,
      getOffersAction.rejected.type
    ]);
  });

  it('should redirect to login route, when user click "Sign in"', async() => {
    const withHistoryComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{title}</span>} />
        <Route path={AppRoute.Home} element={<Header />} />
      </Routes>
    );
    const {withStoreComponent} = withStore(withHistoryComponent, getMockStore());

    render(withStoreComponent);

    await userEvent.click(screen.getByText(login));

    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
