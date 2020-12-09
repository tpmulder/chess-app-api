import { expect } from 'chai';
import 'mocha';

describe('First test', 
  () => { 
    it('should return true', () => { 
      const result = 3;
      expect(result).to.equal(3); 
  }); 
});