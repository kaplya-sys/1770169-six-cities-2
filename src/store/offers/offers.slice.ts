import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CITIES, NameSpace, SORT_TYPES} from '../../const';
import {LocationName, SortTypeName} from '../../types/app-type';
import {Offer} from '../../types/offer-type';
import {getFavoriteOffersAction, getOffersAction, updateFavoriteOfferAction} from '../api-actions';

type InitialState = {
  location: LocationName;
  sortType: SortTypeName;
  offers: Offer[];
  isLoading: boolean;
};

const initialState: InitialState = {
  location: CITIES[0].name,
  sortType: SORT_TYPES[0].name,
  offers: [],
  isLoading: false,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeLocation: (state, action: PayloadAction<LocationName>) => {
      state.location = action.payload;
    },
    changeSortType: (state, action: PayloadAction<SortTypeName>) => {
      state.sortType = action.payload;
    },
    clearOffers: (state) => {
      state.offers = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(getOffersAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateFavoriteOfferAction.fulfilled, (state, action) => {
        const index = state.offers.findIndex((offer) => offer.id === action.payload.id);

        if (index !== -1) {
          state.offers = [
            ...state.offers.slice(0, index),
            action.payload,
            ...state.offers.slice(index + 1)
          ];
        }
      })
      .addCase(getFavoriteOffersAction.fulfilled, (state, action) => {
        action.payload.forEach((element) => {
          const index = state.offers.findIndex((offer) => offer.id === element.id);

          if (index !== -1) {
            state.offers = [
              ...state.offers.slice(0, index),
              element,
              ...state.offers.slice(index + 1)
            ];
          }
        });
      });
  },
});

export const {changeLocation, changeSortType, clearOffers} = offersSlice.actions;
