import {expect} from '../base';
import SmartContract from '../../api/repositories/SmartContract';
import SC from '../../api/contracts/SC';
import {config} from 'dotenv';

config();

const sc = new SmartContract(SC, process.env.contractAddress);

describe('Repository: SmartContract', () => {
  it('should create a SmartContract instance', () => {
    return expect(sc).to.be.instanceOf(SmartContract);
  });
});
