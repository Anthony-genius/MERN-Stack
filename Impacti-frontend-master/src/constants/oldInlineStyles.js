/**
 *
 * This file works as an intersection between post css and inline styles config,
 * so it can be imported as a regular js module, but also referenced in css file like:
 *
 * .myCssClass {
 *  background: $primaryColor;
 * }
 *
 * please keep in mind that the current post css config relies only on first level properties
 * of an export object, so constructions like these:
 *
 * .myCssClass {
 *  background: $impactiOrange(500); // doesn't work at all, use top level vars instead
 * }
 *
 * would not work.
 * */

const impactiOrange = {
  50: '#fbe9e7',
  100: '#ffccbc',
  200: '#ffab91',
  300: '#ff8a65',
  400: '#ff7043',
  500: '#ff6d00',
  600: '#f4511e',
  700: '#e64a19',
  800: '#d84315',
  900: '#bf360c',
  A100: '#ff9e80',
  A200: '#ff6e40',
  A400: '#ff3d00',
  A700: '#dd2c00',
  contrastDefaultColor: 'light'
}

const breakpoints = {
  xs: '360px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px'
}

module.exports = {
  impactiOrange,
  breakpointMD: breakpoints.md,
  primaryColor: impactiOrange[500],
  contentBackgroundColor: '#fafafa',
  contentBackgroundColorLight: '#fcfcfc',
  grayBlueColor: '#8aa8b0',
  lighterGray: '#f5f5f5',
  defaultTextColor: '#212121',
  halfTransparentWhite: 'rgba(255, 255, 255, 0.5)',
  footerAndHeaderHeight: '60px'
}
