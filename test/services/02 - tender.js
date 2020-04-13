import {expect} from '../base';
import TenderService from '../../api/services/tender';
import ProcurementService from '../../api/services/procurement';
import fs from 'fs';

describe('Service: Tender', () => {
  const procurementService = new ProcurementService();
  const eventualFirstTenderAddress = procurementService.tenders.then((tenders) => tenders[0]);
  const eventualTenderService = eventualFirstTenderAddress
    .then(tenderAddress => new TenderService(tenderAddress));
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
    return eventualTenderService
      .then(tenderService => expect(tenderService).to.be.instanceOf(TenderService))
  });
  describe('Tender: Gets', () => {
    describe('Tender: Description',() => {
      it('should return the description of the tender process',() => {
        return eventualTenderService
          .then(tenderService => tenderService.description)
          .then(description => expect(description).to.be.a('string'));
      });
    });
    describe('Tender: BiddingPeriod',() => {
      it('should return the biddingPeriod of a tender process',() => {
        return eventualTenderService
          .then(tenderService => tenderService.biddingPeriod)
          .then(biddingPeriod => expect(biddingPeriod).to.be.a('boolean'));
      });
    });
  });

  describe('Tender: Messages', () => {
    it('should allow people to submit messages about the tender process', () => {
      return eventualTenderService
        .then(tenderService => tenderService.sendMessage('This is a test message to the tender process'))
        .then(txHash => expect(txHash).to.match(/0x[a-fA-F0-9]{64}/));
    });
    it('should return an array of messages of a tender process', () => {
      return eventualTenderService
        .then( tenderService => tenderService.messages)
        .then((messages) => {
          expect(messages).not.to.be.null;
          expect(messages.length).to.be.above(0);
          messages.forEach(message => {
            expect(message).to.be.a('string');
          })
        });
    });
  });
  describe('Tender: Observations', () => {
    describe('Observations: Tender process', () => {
      it('should allow people to submit both plain and file observations about the tender process', () => {
        return eventualTenderService
          .then(tenderService => tenderService.submitObservation(plainObservation1, dummyFile))
          .then(sendObservationResponse => {
            expect(sendObservationResponse.tx).to.match(/0x[a-fA-F0-9]{64}/);
            expect(sendObservationResponse.hash).to.match(/([a-zA-Z0-9]{46}|)/);
          });
      });
      it('should allow people to submit plain observations about the tender process', () => {
        return eventualTenderService
          .then(tenderService => tenderService.submitObservation(plainObservation2))
          .then(result =>  {
            expect(result.tx).to.match(/0x[a-fA-F0-9]{64}/);
            expect(result.hash).to.be.null;
          });
      });
      it('should return an array of observations of a tender process', () => {
        return eventualTenderService
          .then(tenderService => tenderService.observations)
          .then((observations) => {
            expect(observations).not.to.be.null;
            expect(observations.length).to.be.above(0);
            observations.forEach(observation => {
              expect(observation.plain).to.be.a('string');
              expect(observation.hash).to.match(/([a-zA-Z0-9]{46}|)/);
              if(observation.resPlain) {
                expect(observation.resPlain).to.be.a('string');
                expect(observation.resHash).to.match(/([a-zA-Z0-9]{46}|)/);
              }
            });
          })
      });
    });
    describe('Observations: Winner of Tender process', () => {
      it('should allow people to submit both plain and file observations about the winner of a tender process', () => {
        return eventualTenderService
          .then(tenderService => tenderService.submitWinnerObservation(plainObservation1, dummyFile))
          .then(result => {
            expect(result.tx).to.match(/0x[a-fA-F0-9]{64}/);
            expect(result.hash).to.match(/([a-zA-Z0-9]{46}|)/);
          });
      });
      it('should allow people to submit plain text observations about the winner of a tender process', () => {
        return eventualTenderService
          .then(tenderService => tenderService.submitWinnerObservation(plainObservation1))
          .then(result => {
            expect(result.tx).to.match(/0x[a-fA-F0-9]{64}/);
            expect(result.hash).to.be.null;
          });
      });
    });
    describe('Observations: get winner observations', () => {
      it('should return an array of observations of the winner of a tender process', () => {
        return eventualTenderService
          .then(tenderService => tenderService.winnerObservations)
          .then((winnerObservations) => {
            expect(winnerObservations).not.to.be.null;
            expect(winnerObservations.length).to.be.above(0);
            winnerObservations.forEach(winnerObservation => {
              expect(winnerObservation.plain).to.be.a('string');
              expect(winnerObservation.hash).to.match(/([a-zA-Z0-9]{46}|)/);
              if(winnerObservation.resPlain) {
                expect(winnerObservation.resPlain).to.be.a('string');
                expect(winnerObservation.resHash).to.match(/([a-zA-Z0-9]{46}|)/);
              }
            });
          });
      });
    });
    describe('Tender: Bids', () => {
      it('should return an array of bids of a tender process', () => {
        return eventualTenderService
          .then(tenderService => tenderService.bids)
          .then((bids) => {
            expect(bids).not.to.be.null;
            expect(bids.length).to.be.above(0);
            bids.forEach(bid => {
              expect(bid).to.match(/0x[a-fA-F0-9]{40}/)
            })
          });
      });
    });
  });
});
