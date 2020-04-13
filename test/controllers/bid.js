import {expect, request} from '../base';
import ProcurementService from "../../api/services/procurement";
import TenderService from '../../api/services/tender';
import fs from 'fs';

require('dotenv').config();

describe('Controller: Bid', () => {
  const procurementService = new ProcurementService();
  const eventualFirstTenderAddress = procurementService.tenders.then(tenders => tenders[0]);
  const eventualFirstBidAddress = eventualFirstTenderAddress.then(tenderAddress => {
    const tender = new TenderService(tenderAddress);
    return tender.bids.then(bids => bids[0]);
  });

  describe('Bid Observations:', () => {
    describe('Observations: Evaluation', () => {
      it('should allow people to send both plain and file observations about the bid evaluation', () => {
        return eventualFirstBidAddress
          .then(bidAddress => request
            .post('/sendScoreObservation')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('address', bidAddress)
            .field('text', 'this is some test observation')
            .field('file', fs.createReadStream('dummy.pdf')))
          .then(result => {
            expect(result.body.tx).to.match(/0x[a-f0-9]{64}/);
            expect(result.body.hash).to.match(/[a-zA-Z0-9]{46}/);
          })
      });
      it('should allow people to send plain text observations about the bid evaluation', () => {
        return eventualFirstBidAddress
          .then(bidAddress => request
            .post('/sendScoreObservation')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('address', bidAddress)
            .field('text', 'this is some test observation'))
          .then(result => {
            expect(result.body.tx).to.match(/0x[a-f0-9]{64}/);
            expect(result.body.hash).to.be.null;
          })
      });
    });
    describe('Observations: Bid', () => {
      it('should allow people to send both plain and file observations about the bid', () => {
        return eventualFirstBidAddress
          .then(bidAddress => request
            .post('/sendBidObservation')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('address', bidAddress)
            .field('text', 'this is some test observation')
            .field('file', fs.createReadStream('dummy.pdf')))
          .then(result => {
            expect(result.body.tx).to.match(/0x[a-f0-9]{64}/);
            expect(result.body.hash).to.match(/[a-zA-Z0-9]{46}/);
          })
      });
      it('should allow people to send plain text observations about the bid', () => {
        return eventualFirstBidAddress
          .then(bidAddress => request
            .post('/sendBidObservation')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('address', bidAddress)
            .field('text', 'this is some test observation'))
          .then(result => {
            expect(result.body.tx).to.match(/0x[a-f0-9]{64}/);
            expect(result.body.hash).to.be.null;
          })
      });
    });
  });
  describe('Bid gets',() => {
    describe('Bid Observations: ',() => {
      it('should allow people to get all the bid observations', () => {
        return eventualFirstBidAddress
          .then(bid => request
            .get(`/bidObservations?address=${bid}`))
          .then(res => expect(res.body.bidObservations.length).to.be.above(0))
      });
    });
    describe('Score Observations: ', () =>{
      it('should allow people to get all the score observations', () => {
        return eventualFirstBidAddress
          .then(bid => request
            .get(`/bidScoreObservations?address=${bid}`))
          .then(res => expect(res.body.scoreObservations.length).to.be.above(0))
      });
    });
  });
});

