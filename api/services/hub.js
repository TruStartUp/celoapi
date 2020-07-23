import SmartContract from '../../api/repositories/SmartContract';
import HubContract from '../../api/contracts/Hub';

require('dotenv').config();

class HubService {
  constructor() {
    this.hubContract = new SmartContract(HubContract, process.env.contractAddress);
  };

  addHashingSpace(image, name) {
    return new Promise((resolve, reject) => {
      const imageHash = '0xdde9efca1ecfbadf34253c9a6ab6812280da630a1d96087e64f87b3935bfcfef';
      this.hubContract.post('addHashingSpace', imageHash, name)
        .then(resolve)
        .catch(reject);
    });
  }

  generateKey(name, logo) {
    return new Promise((resolve) => {
      resolve({
        name: name,
        logo: logo,
      });
    });
  };


}

module.exports = HubService;
