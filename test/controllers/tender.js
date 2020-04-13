import {expect, request} from '../base';
import fs from 'fs';
import ProcurementService from "../../api/services/procurement";

describe('Controller: Tender', () => {
  const procurementService = new ProcurementService();
  const eventualFirstTenderAddress = procurementService.tenders
    .then((tenders) => tenders[0]);

  describe('Tender Messages:', () => {
    it('should allow people to send messages', () => {
      return eventualFirstTenderAddress
        .then(tenderAddress => request
          .post('/sendMessage')
          .send({
            message: 'this is a test message',
            address: tenderAddress,
          })
        )
        .then(result => expect(result.body.txHash).to.match(/0x[a-f0-9]{64}/))
    });
    it('should allow people to get all the messages', () => {
      return eventualFirstTenderAddress
        .then(tenderAddress => request
          .get(`/messages?address=${tenderAddress}`))
        .then(res => {
          expect(res.body.messages.length).to.be.above(0);
          res.body.messages.forEach(message => expect(message).to.be.a('string'));
        })
    });
  });
  describe('Tender observations:', () => {
    describe('Tender: Observations of a tender process', () => {
      it('should allow people to send both plain and file observations', () => {
        return eventualFirstTenderAddress
          .then(tenderAddress => request
            .post('/sendObservation')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('address', tenderAddress)
            .field('text', 'this is some test observation')
            .field('file', fs.createReadStream('dummy.pdf')))
          .then(result => {
            expect(result.body.tx).to.match(/0x[a-f0-9]{64}/);
            expect(result.body.hash).to.match(/[a-zA-Z0-9]{46}/);
          });
      });
      it('should allow people to send plain text observations', () => {
        return eventualFirstTenderAddress
          .then(tenderAddress => request
            .post('/sendObservation')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('address', tenderAddress)
            .field('text', 'this is some test observation'))
          .then(result => {
            expect(result.body.tx).to.match(/0x[a-f0-9]{64}/);
            expect(result.body.hash).to.be.null;
          })
      });
      it('should allow people to get all the observations', () => {
        return eventualFirstTenderAddress
          .then(tender => request
            .get(`/observations?address=${tender}`))
          .then(res => expect(res.body.observations.length).to.be.above(0));
      });
    });
    describe('Tender: Winner of Tender process observations', () => {
      it('should allow people to send both plain and file observations about the winner of a tender process', () => {
        return eventualFirstTenderAddress
          .then(tenderAddress => request
            .post('/sendWinnerObservation')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('address', tenderAddress)
            .field('text', 'this is some test observation about a winner')
            .field('file', fs.createReadStream('dummy.pdf')))
          .then(result => {
            expect(result.body.tx).to.match(/0x[a-f0-9]{64}/);
            expect(result.body.hash).to.match(/[a-zA-Z0-9]{46}/);
          });
      });
      it('should allow people to send plain text observations about the winner of a tender process', () => {
        return eventualFirstTenderAddress
          .then(tenderAddress => request
            .post('/sendWinnerObservation')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('address', tenderAddress)
            .field('text', 'this is some test observation about a winner'))
          .then(result => {
            expect(result.body.tx).to.match(/0x[a-f0-9]{64}/);
            expect(result.body.hash).to.be.null;
          });
      });
    });
    describe('Tender: Get winner observations', () => {
      it('should allow people to get all the winner of a tender process observations', () => {
        return eventualFirstTenderAddress
          .then(tenderAddress => request
            .get(`/winnerObservations?address=${tenderAddress}`))
          .then(res => expect(res.body.winnerObservations.length).to.be.above(0));
      });
    });
  });
  describe('Tender: Bids', () => {
    it('should allow people to get all the bids of a tender process', () => {
      return eventualFirstTenderAddress
        .then(tenderAddress => request
          .get(`/bids?address=${tenderAddress}`))
        .then(res => expect(res.body.bids.length).to.be.above(0));
    });
  });
  describe('Tender: Description', () => {
    it('should get the tender process description', () => {
      return eventualFirstTenderAddress
        .then(tenderAddress => request
          .get(`/description?address=${tenderAddress}`))
        .then(res => expect(res.body.description).to.be.a('string'));
    });
  });
  describe('Tender: BiddingPeriod', () => {
    it('should get the tender process biddingPeriod', () => {
      return eventualFirstTenderAddress
        .then(tenderAddress => request
          .get(`/biddingPeriod?address=${tenderAddress}`))
        .then(res => expect(res.body.biddingPeriod).to.be.a('boolean'));
    });
  });

});
