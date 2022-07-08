import { objectYup, stringYup } from 'story-bootstrap';

export const validateGroup = (translate) => {
  return objectYup().shape({
    name: stringYup()
      .required(translate('validation.required'))
      .max(100, translate('validation.maxLength', { max: 100 })),
    realmName: stringYup().required(translate('validation.required'))
  });
};
