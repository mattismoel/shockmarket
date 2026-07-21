/**
 * @description Returns whether or not the current device is a touch device based on its touch capabilities.
 */
export const isTouchDevice = (): boolean => {
  return matchMedia("(pointer:coarse)").matches
}
