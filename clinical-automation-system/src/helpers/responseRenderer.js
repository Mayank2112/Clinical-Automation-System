/**
 * Render page with status code and message
 * @param {httpResponse} res
 * @param {Number} statusCode
 * @param {String} page File name
 * @param {String} message
 * @param {Object} details
 */
const renderPageWithMessage = (res, statusCode, page, message = null, details = null) => {
  res.status(statusCode);
  return res.render(page, { message, details });
};

export default renderPageWithMessage;
