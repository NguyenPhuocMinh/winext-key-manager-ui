import { toNumber, toString, isEmpty, get } from 'lodash';
import moment from 'moment';

const UNITS_VI = ['N', 'Tr', 'Tỉ', 'T'];
const UNITS_EN = ['K', 'M', 'B', 'T'];

const formatQuantity = (string, locale = 'vi-VN') => {
  const number = toNumber(string);
  const UNITS = locale === 'vi-VN' ? UNITS_VI : UNITS_EN;
  const shouldShowDecimalPlace = UNITS.some((element, index) => {
    const lowerBound = Math.pow(1000, index + 1);
    const upperBound = lowerBound + lowerBound * 10;
    return number > lowerBound && number < upperBound;
  });
  const digits = shouldShowDecimalPlace ? 1 : 0;
  for (let i = UNITS.length - 1; i >= 0; i--) {
    const decimal = Math.pow(1000, i + 1);
    if (number >= decimal) {
      return (
        (number / decimal).toLocaleString(locale, {
          maximumFractionDigits: digits
        }) +
        ' ' +
        UNITS[i]
      );
    }
  }
  return number.toString();
};

const formatDateTime = (dateTime) => {
  return !isEmpty(toString(dateTime))
    ? moment(new Date(dateTime)).format('DD-MM-YYYY h:mm:ss A')
    : moment(new Date()).format('DD-MM-YYYY h:mm:ss A');
};

/**
 *
 * @param {*} err
 * @returns {String}
 */
const formatErrorMsg = (err) => {
  const errorMsg = get(err, 'response.data.message') || err.message;

  return errorMsg;
};

export { formatQuantity, formatDateTime, formatErrorMsg };
