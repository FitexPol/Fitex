import { type FormControl } from '../types';

export const ingredientsForm = [
  {
    type: 'text',
    name: 'ingredients[].name',
    placeholder: '_shared._shared.forms.selectIngredient',
    validators: {
      required: true,
      message: 'Ingredient name is required',
    },
  },
  {
    type: 'number',
    name: 'ingredients[].quantity',
    validators: {
      required: true,
      min: 1,
      max: 100,
      message: 'Must be at least 1',
    },
  },
  {
    type: 'text',
    name: 'ingredients[].unit',
    validators: {
      required: true,
      message: 'Unit is required',
    },
  },
] satisfies FormControl[];
