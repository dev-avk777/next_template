// Test file with duplicate code - updated
export function calculateTotal(numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0)
}

// Duplicate implementation
export function calculateTotal(numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0)
}
