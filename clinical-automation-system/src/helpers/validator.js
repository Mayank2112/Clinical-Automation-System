/**
 * Checks email is valid or not
 * @param {String} email
 */
export const isValidEmail = email => {
  const emailRegEx = /^[a-zA-Z0-9_\.-]+@[a-z]+\.\w{1,3}(\.\w{0,1}?)?\w$/;
  return emailRegEx.test(email);
};

/**
 * Checks password is of atleast 8 characters
 * @param {String} password
 */
export const isValidPassword = password => {
  const passwordRegEx = /^[a-zA-Z0-9]{8,}$/;
  return passwordRegEx.test(password);
};

/**
 * Checks phone number is of 10 digit
 * @param {number} phoneNumber
 */
export const isValidNumber = phoneNumber => {
  const phoneRegEx = /^[0-9]{10}$/;
  return phoneRegEx.test(phoneNumber);
};
