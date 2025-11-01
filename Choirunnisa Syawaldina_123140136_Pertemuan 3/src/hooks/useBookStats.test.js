import { renderHook } from '@testing-library/react';
import useBookStats from './useBookStats';

const mockBooks = [
  { id: 1, status: 'milik' },
  { id: 2, status: 'milik' },
  { id: 3, status: 'baca' },
  { id: 4, status: 'beli' },
];

describe('useBookStats Hook', () => {
  test('should return correct initial stats', () => {
    // Render hook dengan mock data [cite: 755]
    const { result } = renderHook(() => useBookStats(mockBooks));

    expect(result.current.total).toBe(4);
    expect(result.current.milik).toBe(2);
    expect(result.current.baca).toBe(1);
    expect(result.current.beli).toBe(1);
  });

  test('should return zero stats for empty array', () => {
    const { result } = renderHook(() => useBookStats([]));

    expect(result.current.total).toBe(0);
    expect(result.current.milik).toBe(0);
  });
});