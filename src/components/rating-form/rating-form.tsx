import {ChangeEvent} from 'react';

import {ratings} from '../../const';
import RatingItem from '../rating-item/rating-item';

type RatingFormProps = {
  selectedValue: string;
  isFormsDisabled: boolean;
  onFieldChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

const RatingForm = ({selectedValue, isFormsDisabled, onFieldChange}: RatingFormProps) => (
  <div className="reviews__rating-form form__rating">
    {ratings.map((rating) => (
      <RatingItem
        key={rating.id}
        rating={rating}
        selectedValue={selectedValue}
        isFormsDisabled={isFormsDisabled}
        onFieldChange={onFieldChange}
      />))}
  </div>
);

export default RatingForm;
