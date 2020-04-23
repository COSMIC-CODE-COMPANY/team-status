import { createMuiTheme } from '@material-ui/core';
import { ThemeState } from './Types';

const Theme = (themeState: ThemeState) => {
  const mainTheme = createMuiTheme({
    spacing: 4,
    palette: {
      type: themeState.type,
      primary: {
        light: '#ae52d4',
        main: '#7b1fa2',
        dark: '#4a0072',
        contrastText: '#fff',
      },
      secondary: {
        light: '#6ec6ff',
        main: '#2196f3',
        dark: '#0069c0',
        contrastText: '#000',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });
  return mainTheme;
};
export { Theme };
