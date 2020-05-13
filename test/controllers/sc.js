import {expect, request} from '../base';

require('dotenv').config();

describe('Controller: SC', () => {
  describe('SC:', () => {
    it('Should return the contract text', () => {
      return request
        .get('/scText')
        .then(res => res.body.text)
        .then(text => expect(text).to.be.eq('this is just a test'))
    });
    it('Should update the contract text', () => {
      return request
        .post('/scText')
        .send({
          text: 'this is just a test',
        })
        .then(res => res.body.txHash)
        .then(txHash => expect(txHash).to.match(/0x[a-fA-F0-9]{64}/))
    });
  });
});
