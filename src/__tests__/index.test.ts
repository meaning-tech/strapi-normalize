import { Normalize } from '../index';
import { data, result } from './data';

describe('Init', () => {
  test('should return true', () => {
    const resultData = Normalize(data);
    expect(resultData).toEqual(result);
  });

  test('should return true', () => {
    const resultData = Normalize({ data: null });
    expect(true).toBe(true);
    expect(resultData).toBeNull();
  });
  test('should return true', () => {
    const resultData = Normalize({ data: [] });
    expect(resultData).toEqual([]);
  });
});
