import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import createEmotionCache from '@/utility/createEmotionCache'
import lightTheme from '@/styles/theme/lightTheme'
import darkTheme from '@/styles/theme/darkTheme'
import '@/styles/globals.css'
const clientCache = createEmotionCache()

const App = ({ Component, emotionCache = clientCache, pageProps }) => {
  const [activeTheme, setActiveTheme ] = useState(lightTheme);
  const [selectedTheme, setSelectedTheme ] = useState('light');

  const getActiveTheme = (theme) => {
    return theme === 'light' ? lightTheme : darkTheme;
  }

  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme));
  }, [selectedTheme]);

  const toggleTheme = () => {
    const theme = selectedTheme === 'light' ? 'dark' : 'light';
    setSelectedTheme(theme);
  }

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        <Component {...pageProps} toggleTheme={toggleTheme} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default App;

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
}
