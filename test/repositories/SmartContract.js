import {expect} from '../base';
import SmartContract from '../../api/repositories/SmartContract';
import Procurement from '../../api/contracts/Procurement';
import Tender from '../../api/contracts/Tender';
import {config} from 'dotenv';

config();

const procurement = new SmartContract(Procurement, process.env.procurementAddress);

describe('Repository: SmartContract', () => {
  it('should create a SmartContract instance', () => {
    return expect(procurement).to.be.instanceOf(SmartContract);
  });
});
