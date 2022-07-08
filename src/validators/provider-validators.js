import { objectYup, stringYup } from 'story-bootstrap';

export const validateProvider = (translate) => {
  return objectYup().shape({
    name: stringYup().required(translate('validation.required'))
  });
};
