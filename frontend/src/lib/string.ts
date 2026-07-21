/**
 * @description Returns input number x, adding the proper sign before, i.e. "+3.44", "-2.5", "0.0" etc.
  */
export const signNumber = (x: number, fixed?: number): string => {
  if (x > 0.0) {
    return fixed !== undefined ? "+" + x.toFixed(fixed) : "+" + x
  } else {
    return fixed !== undefined ? x.toFixed(fixed) : x.toString()
  }
}

export const calculateLineHeight = (element: HTMLElement) => {
  const lineHeight = element.style.getPropertyValue("line-height")
  console.log("line-height", lineHeight)
  return parseFloat(lineHeight)
}
