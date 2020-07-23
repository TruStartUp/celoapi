import {expect, request} from '../base';
import fs from 'fs';
require('dotenv').config();

describe('Controller: Hub', () => {
  describe('Hub:', () => {
    it('Should create a new hashing space', () => {
      return request
        .post('/hashingSpace')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('name','test name')
        .field('logo', fs.createReadStream('api/assets/davivienda.png'))
        .then(res => res.body.txHash)
        .then(txHash => expect(txHash).to.match(/0x[a-fA-F0-9]{64}/))
    });
  });
});
