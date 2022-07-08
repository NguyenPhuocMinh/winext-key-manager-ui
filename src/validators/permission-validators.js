import { objectYup, stringYup } from 'story-bootstrap';

export const validatePermission = (translate) => {
  return objectYup().shape({
    name: stringYup()
      .strict(true)
      .required(translate('validation.required'))
      .trim(translate('validation.trim'))
      .uppercase(translate('validation.uppercase'))
      .max(100, translate('validation.maxLength', { max: 100 }))
  });
};
