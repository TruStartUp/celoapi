import HubService from '../services/hub';
import controllerHelper from '../helpers/controller';
import {error, errors} from "../helpers/error";


const addHashingSpace = (req, res) => {
  const hubService = new HubService();
  hubService.addHashingSpace(req.swagger.params.logo.value, req.swagger.params.name.value)
    .then(txHash => res.status(201)
      .send({txHash}))
    .catch(e => controllerHelper
      .handleError(error(errors.INTERNAL_SERVER_ERROR, e), res));
};

module.exports = {
  addHashingSpace,
};
