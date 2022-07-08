import { objectYup, stringYup, numberYup } from 'story-bootstrap';

export const validateKey = (translate) => {
  return objectYup().shape({
    name: stringYup()
      .strict(true)
      .required(translate('validation.required'))
      .trim(translate('validation.trim')),
    priority: numberYup().max(
      100,
      translate('validation.maxValue', { max: 100 })
    )
  });
};
