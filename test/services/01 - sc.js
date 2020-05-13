import {expect} from '../base';
import SCService from "../../api/services/sc";
import {config} from 'dotenv';
import SmartContract from "../../api/repositories/SmartContract";

config();

const scService = new SCService();

describe('Service: Procurement',() =>{
  it(' SC contract should be initialized', () => {
    return expect(scService.SCContract).to.be.instanceOf(SmartContract)
  });
  it('should have and instance of SCService', () => {
    return expect(scService).to.be.instanceOf(SCService);
  });
  it('Should allow to someone write a text', () => {
    return scService.write('this is just a test')
      .then(txHash => expect(txHash).to.match(/0x[a-fA-F0-9]{64}/))
  });
  it('should return the provided text', () => {
    return scService.text
      .then(text => expect(text).to.be.eq('this is just a test'))
  });
});
