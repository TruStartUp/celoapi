import {expect, request} from '../base';

require('dotenv').config();

describe('Controller: Procurement', () => {
  describe('Tenders:', () => {
    it('should return an array of Tenders', () => {
      return request
        .get('/tenders')
        .then(res => res.body.tenders)
        .then(tenders => {
          expect(tenders.length).to.be.above(0)
          tenders.forEach(tender => {
            expect(tender).to.match(/0x[a-fA-F0-9]{40}/);
          })
        });
    });
  });
});
