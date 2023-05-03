import React from 'react'
import PropTypes from 'prop-types'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import createEmotionCache from '@/utility/createEmotionCache'
import lightTheme from '@/styles/theme/lightTheme'
import darkTheme from '@/styles/theme/darkTheme'
import '@/styles/globals.css'
const clientCache = createEmotionCache()

const App = ({ Component, emotionCache = clientCache, pageProps }) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
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
