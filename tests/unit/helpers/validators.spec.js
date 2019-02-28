import * as validators from '@/helpers/validators';

describe('Validators', () => {
  describe('isEmpty', () => {
    it('1', () => {
      expect(validators.isEmpty('1')).toBe(false);
    });

    it('0', () => {
      expect(validators.isEmpty(0)).toBe(false);
    });

    it('empty string', () => {
      expect(validators.isEmpty('')).toBe(true);
    });

    it('undefined', () => {
      expect(validators.isEmpty(undefined)).toBe(true);
    });

    it('null', () => {
      expect(validators.isEmpty(null)).toBe(true);
    });
  });

  describe('isNotEmpty', () => {
    it('1', () => {
      expect(validators.isNotEmpty('1')).toBe(true);
    });

    it('0', () => {
      expect(validators.isNotEmpty(0)).toBe(true);
    });

    it('empty string', () => {
      expect(validators.isNotEmpty('')).toBe(false);
    });

    it('undefined', () => {
      expect(validators.isNotEmpty(undefined)).toBe(false);
    });

    it('null', () => {
      expect(validators.isNotEmpty(null)).toBe(false);
    });
  });
});
