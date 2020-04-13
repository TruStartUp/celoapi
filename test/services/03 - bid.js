import {expect} from '../base';
import ProcurementService from "../../api/services/procurement";
import TenderService from "../../api/services/tender";
import BidService from '../../api/services/bid';
import fs from 'fs';

require('dotenv').config();

describe('Service: Bid', () => {
  const procurementService = new ProcurementService();
  const eventualFirstTenderAddress = procurementService.tenders
    .then(tenders => tenders[0]);
  const eventualFirstBidAddress = eventualFirstTenderAddress
    .then(tenderAddress => new TenderService(tenderAddress))
    .then(tenderService =>  tenderService.bids)
    .then(bids => bids[0]);
  const eventualBidService = eventualFirstBidAddress
    .then(bidAddress => new BidService(bidAddress));
  const plainObservation1 = 'Test Observation 1';
  const plainObservation2 = 'Test Observation 2';
  const dummyFile = {
    fieldname:'file',
    originalname: 'dummy.pdf',
    encoding:'7bit',
    mimetype:'application/pdf',
    buffer: fs.readFileSync('dummy.pdf')
  };

  it('should be initialized', () => {
    return eventualBidService
      .then(bidService => expect(bidService).to.be.instanceOf(BidService));
  });
  describe('Bid: Observations', () => {
    describe('Observations: Evaluation', () => {
      it('should allow people to submit both plain and file observations about the bid evaluation', () => {
        return eventualBidService
          .then(bidService => bidService.submitScoreObservation(plainObservation1, dummyFile))
          .then(result => {
            expect(result.tx).to.match(/0x[a-fA-F0-9]{64}/);
            expect(result.hash).to.match(/[a-zA-Z0-9]{46}/);
          });
      });
      it('should allow people to submit plain text observations about the bid evaluation', () => {
        return eventualBidService
          .then(bidService => bidService.submitScoreObservation(plainObservation2))
          .then(result => {
            expect(result.tx).to.match(/0x[a-fA-F0-9]{64}/);
            expect(result.hash).to.be.null;
          });
      });
    });
    describe('Observations: Bid', () => {
      it('should allow people to submit both plain and file observations about the bid', () => {
        return eventualBidService
          .then(bidService => bidService.submitObservation(plainObservation1, dummyFile))
          .then(result => {
            expect(result.tx).to.match(/0x[a-fA-F0-9]{64}/);
            expect(result.hash).to.match(/[a-zA-Z0-9]{46}/);
          });
      });
      it('should allow people to submit plain text observations about the bid', () => {
        return eventualBidService
          .then(bidService => bidService.submitObservation(plainObservation2))
          .then(result => {
            expect(result.tx).to.match(/0x[a-fA-F0-9]{64}/);
            expect(result.hash).to.be.null;
          });
      });
    });
  });
  describe('Bid: Gets', () => {
    describe('Bid observations', () => {
      it('should get all the bids observations', () => {
        return eventualBidService
          .then(bidService => {
            return [
              bidService,
              bidService.submitObservation(plainObservation1),
            ]
          })
          .then(promises => Promise.all(promises))
          .then((bidService) => bidService[0].observations)
          .then((observations) => {
            expect(observations).not.to.be.null;
            expect(observations.length).to.be.above(0)
            observations.forEach(observation => {
              expect(observation.plain).to.be.a('string');
              expect(observation.hash).to.match(/([a-zA-Z0-9]{46}|)/);
              if(observation.resPlain) {
                expect(observation.resPlain).to.be.a('string');
                expect(observation.resHash).to.match(/([a-zA-Z0-9]{46}|)/);
              }
            });
          });
      });
    });
    describe('Bid Score observations', () => {
      it('should get all the bids score observations', () => {
        return eventualBidService
          .then(bidService => {
            return [
              bidService,
              bidService.submitObservation(plainObservation2),
            ]
          })
          .then(promises => Promise.all(promises))
          .then((bidService) => bidService[0].scoreObservations)
          .then((scoreObservations) => {
            expect(scoreObservations).not.to.be.null;
            expect(scoreObservations.length).to.be.above(0);
            scoreObservations.forEach(scoreObservation => {
              expect(scoreObservation.plain).to.be.a('string');
              expect(scoreObservation.hash).to.match(/([a-zA-Z0-9]{46}|)/);
              if(scoreObservation.resPlain) {
                expect(scoreObservation.resPlain).to.be.a('string');
                expect(scoreObservation.resHash).to.match(/([a-zA-Z0-9]{46}|)/);
              }
            });
          });
      });
    });
  });
});
