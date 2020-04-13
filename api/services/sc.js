import SmartContract from '../../api/repositories/SmartContract';
import SC from '../../api/contracts/SC';

require('dotenv').config();

class SCService {
  constructor() {
    this.SCContract = new SmartContract(SC, process.env.contractAddress);
    this.eventualText = this.SCContract.get('text');
  }

  /**
   * writes a message on SC contract
   * @param text
   * @returns {Promise<{txHash}>}
   */
  write(text) {
    return new Promise((resolve, reject) => {
      this.SCContract.post('write', text)
        .then(resolve)
        .catch(e => reject(e));
    });
  }

  /**
   * returns the text on SC contract
   * @returns {Promise<any>}
   */
  get text() {
    return this.eventualText;
  }
}

module.exports = SCService;
