import {expect} from '../base';
import HubService from "../../api/services/hub";
import {config} from 'dotenv';
import SmartContract from "../../api/repositories/SmartContract";

config();

const hubService = new HubService();
const imageHash = '0xdde9efca1ecfbadf34253c9a6ab6812280da630a1d96087e64f87b3935bfcfef';

describe('Service: Hub',() =>{
  it(' Hub contract should be initialized', () => {
    return expect(hubService.hubContract).to.be.instanceOf(SmartContract)
  });
  it('should have and instance of HubService', () => {
    return expect(hubService).to.be.instanceOf(HubService);
  });
  it('should allow to create a new hashing space', () => {
    return hubService.addHashingSpace(imageHash, 'test name')
      .then((tx) => expect(tx).to.match(/0x[a-fA-F0-9]{64}/));
  });
});
