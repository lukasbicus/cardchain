import { add } from './logic';
import { describe, it, expect } from '@jest/globals';

describe('logic', () => {
  it('should add 2 numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
