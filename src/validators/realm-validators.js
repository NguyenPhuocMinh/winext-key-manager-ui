import { objectYup, stringYup } from 'story-bootstrap';

export const validateCreateRealm = (translate) => {
  return objectYup().shape({
    name: stringYup().required(translate('validation.required'))
  });
};
