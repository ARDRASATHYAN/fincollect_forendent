import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from "./theme";

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ThemeProvider theme={theme}>
      <CssBaseline /> {/* ensures consistent global MUI styling */}
      <App />
    </ThemeProvider>
  </StrictMode>,
)
