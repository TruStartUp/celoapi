import {expect} from '../base';
import ProcurementService from "../../api/services/procurement";
import {config} from 'dotenv';
import SmartContract from "../../api/repositories/SmartContract";
import Procurement from "../../api/contracts/Procurement";

config();

const procurementService = new ProcurementService();

describe('Service: Procurement',() =>{
  it(' Procurement contract should be initialized', () => {
    return expect(procurementService.procurementContract).to.be.instanceOf(SmartContract)
  });
  it('should have and instance of Procurement', () => {
    return expect(procurementService).to.be.instanceOf(ProcurementService);
  });
  it('should return an array of tender addresses', () => {
    return procurementService.tenders
      .then((tenders) => {
        expect(tenders).not.to.be.null;
        expect(tenders.length).to.be.above(0);
        tenders.forEach(address => {
          expect(address).to.match(/0x[a-fA-F0-9]{40}/)
        })
      });
  });
});
