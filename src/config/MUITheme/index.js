import { createMuiTheme } from '@material-ui/core/styles';

// Themes
import themeLight from './themes/light';
import themeDark from './themes/dark';

// Overrides
import themeOverrides from './overrides';

// Props
import themeProps from './props';

const getTheme = ({ paletteType }) => {
  if (paletteType === 'light') {
    return createMuiTheme(themeLight);
  }
  if (paletteType === 'dark') {
    return createMuiTheme(themeDark);
  }

  return createMuiTheme({});
};

// Select default theme
const selectedTheme = getTheme({
  paletteType: 'light'
});

const overrides = themeOverrides(selectedTheme);
const props = themeProps;

const theme = { ...selectedTheme, overrides, props };

export default theme;
