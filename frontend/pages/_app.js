import React from 'react'
import PropTypes from 'prop-types'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/lib/providers/next-theme-provider'
import RootLayout from './layout'
import '@/styles/globals.css'

const App = ({ Component, pageProps: { session, pageProps } }) => {

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default App;

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
