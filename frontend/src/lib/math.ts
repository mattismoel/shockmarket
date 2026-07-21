/**
 * @description Returns the average of the input values.
 */
export const calculateAverage = (...values: number[]) => {
  let sum = 0.0

  values.map(v => sum += v)

  return sum / values.length
}
