import { expect } from 'chai';
import { isDef } from './utils';

describe('utils', () => {
  describe('isDef()', () => {
    it('returns false for undefined value', () => {
      expect(isDef(undefined)).to.be.false; // eslint-disable-line no-unused-expressions
    });

    it('returns false for null value', () => {
      expect(isDef(null)).to.be.false; // eslint-disable-line no-unused-expressions
    });

    it('returns true for anything other than null or undefined', () => {
      expect(isDef('')).to.be.true; // eslint-disable-line no-unused-expressions
      expect(isDef(0)).to.be.true; // eslint-disable-line no-unused-expressions
      expect(isDef('string')).to.be.true; // eslint-disable-line no-unused-expressions
      expect(isDef([])).to.be.true; // eslint-disable-line no-unused-expressions
      expect(isDef({})).to.be.true; // eslint-disable-line no-unused-expressions
      expect(isDef(false)).to.be.true; // eslint-disable-line no-unused-expressions
      expect(isDef(true)).to.be.true; // eslint-disable-line no-unused-expressions
    });
  })
})
