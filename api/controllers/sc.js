import SCService from '../../api/services/sc';
import controllerHelper from '../helpers/controller';
import {error, errors} from "../helpers/error";

const write = (req, res) => {
  const sc = new SCService();
  sc.write(req.body.text)
    .then(txHash => res.status(201)
      .send({txHash}))
    .catch(e => controllerHelper
      .handleError(error(errors.INTERNAL_SERVER_ERROR, e), res));
};

const getText = (req, res) => {
  const sc = new SCService();
  sc.text
    .then(text => res.status(200)
      .send({text}))
    .catch((e) => controllerHelper
      .handleError(error(errors.SERVICE_UNAVAILABLE,e),res));
};


module.exports = {
  write,
  getText,
};
