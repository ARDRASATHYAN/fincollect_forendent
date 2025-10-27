// theme.js
import { createTheme } from "@mui/material/styles";
import "@fontsource/inter";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Inter, sans-serif",
          letterSpacing: "0.2px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#BDB9B9",
         
          "&.Mui-focused": {
            color: "#000000",
          },
          "&.MuiInputLabel-shrink": {
            color: "#000000",
          },
          "&.Mui-disabled": {
            color: "#9ca3af",
          },
        },
      },
    },
  },
});
export default theme;
