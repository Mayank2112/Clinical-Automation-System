/**
 * Render page with status code and message
 * @param {httpResponse} res
 * @param {Number} statusCode
 * @param {String} page File name
 * @param {String} message
 */
const renderPageWithMessage = (res, statusCode, page, message) => {
  res.status(statusCode);
  return res.render(page, { messageHolder: { message } });
};

export default renderPageWithMessage;
