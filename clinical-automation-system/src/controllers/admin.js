import { filename } from 'config';
import renderPageWithMessage from '../helpers/responseRenderer';

/**
 * Redirect to dashboard page
 * @param {httpRequest} req
 * @param {httResponse} res
 */
export const redirectDashboard = (req, res) => renderPageWithMessage(
  req,
  res,
  200,
  filename.admin.dashboard
);
