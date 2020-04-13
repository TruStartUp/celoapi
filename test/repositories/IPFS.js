import { expect } from '../base';
import ipfs from '../../api/repositories/IPFS';
import fs from 'fs';

describe('Repository: IPFS', () => {
  describe('Testing operations on files', () => {
    it('should retrieve the hash of a buffer without saving it', () => {
      return ipfs.add(fs.readFileSync('dummy.pdf'))
        .then(({hash}) => expect(hash).to.match(/[0-9a-zA-Z]{46}/));
    });
    it('should return an error when the received file its not a buffer', () => {
      return ipfs.add('Something')
        .catch(error => {
          expect(error).to.be.an('error');
          expect(error.message).to.eq('Not a buffer');
        });
    });
    it('should recover a file with a valid hash', () => {
      return ipfs.get('QmSAdbek1DDb91BM8no29LeRxapusH72pmMZWs8zokGt6p')
        .then(response => {
          expect(response.type.ext).to.eq('pdf');
          expect(response.content).to.be.instanceOf(Buffer)
        });
    });
    it('should return an error with a invalid hash', () => {
      return ipfs.get('28SAdbek1DDb91BM8no29LeRxapusH72pmMZWs8zokGt6p')
        .catch(error => {
          expect(error).to.be.an('error');
          expect(error.message).to.eq('Not a valid IPFS hash');
        });
    });
  });
});
