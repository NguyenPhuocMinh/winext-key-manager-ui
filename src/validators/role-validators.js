import { objectYup, stringYup } from 'story-bootstrap';

export const validateRole = (translate) => {
  return objectYup().shape({
    name: stringYup()
      .required(translate('validation.required'))
      .max(100, translate('validation.maxLength', { max: 100 }))
  });
};
