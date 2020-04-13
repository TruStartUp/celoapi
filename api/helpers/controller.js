/**
 * Build a json error message to be thrown upon errors
 * @param e Error object
 * @param res Response object.
 */
const handleError = (e, res) => {
  res.status(e.code).send(e);
};

export default {
  handleError,
}
