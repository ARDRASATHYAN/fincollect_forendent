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
  },
});
export default theme;
