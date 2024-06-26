import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import {createMemoryHistory, MemoryHistory} from 'history';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import HistoryRouter from '../components/history-route/history-route';
import {createAPI} from '../services/api';
import {Store} from '../types/store-type';


type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export const withHistory = (component: JSX.Element, history?: MemoryHistory) => {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
};

export const withStore = (
  component: JSX.Element,
  initialState: Partial<Store> = {}
): ComponentWithMockStore => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    Store,
    Action<string>,
    ThunkDispatch<
      Store,
      ReturnType<typeof createAPI>,
      Action
    >
  >(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter
  });
};
