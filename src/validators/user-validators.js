import { objectYup, stringYup } from 'story-bootstrap';

export const validateUserCreate = (translate) => {
  return objectYup().shape({
    userName: stringYup()
      .required(translate('validation.required'))
      .max(100, translate('validation.maxLength', { max: 100 })),
    email: stringYup()
      .required(translate('validation.required'))
      .email(translate('validation.email')),
    realmName: stringYup().required(translate('validation.required'))
  });
};

export const validateUserUpdate = (translate) => {
  return objectYup().shape({
    userName: stringYup()
      .required(translate('validation.required'))
      .max(100, translate('validation.maxLength', { max: 100 })),
    email: stringYup()
      .required(translate('validation.required'))
      .email(translate('validation.email'))
  });
};
