import { objectYup, stringYup } from 'story-bootstrap';

export const validateUserLogin = (translate) => {
  return objectYup().shape({
    userName: stringYup().required(translate('validation.required')),
    password: stringYup().required(translate('validation.required'))
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   translate('validation.users.password')
    // )
  });
};
