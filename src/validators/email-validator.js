import { objectYup, stringYup } from 'story-bootstrap';

export const validateEmail = (translate) => {
  return objectYup().shape({
    host: stringYup()
      .strict(true)
      .required(translate('validation.required'))
      .trim(translate('validation.trim')),
    from: stringYup()
      .strict(true)
      .required(translate('validation.required'))
      .trim(translate('validation.trim'))
  });
};
