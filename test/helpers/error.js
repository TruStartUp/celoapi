import {expect} from '../base';
import {error, errors} from '../../api/helpers/error';

describe('Helper: Error', () => {
  describe('Method error', () => {
    const notFound = errors.NOT_FOUND;
    const detailed = `I couldn't find that`;
    it('should return an object with three parameters if no detailed info provided', () => {
      const result = error(notFound);
      expect(result).to.not.include({detailed});
      expect(result).to.have.all.keys('code', 'msg', 'error');
    });
    it('should return an object with four parameters if detailed info is provided', () => {
      const result = error(notFound, detailed);
      expect(result).to.include({detailed});
      expect(result).to.have.all.keys('code', 'msg', 'error', 'detailed');
      expect(result.code).to.eq(404);
      expect(result.error).to.eq('Not found');
    });
  });
});
