import * as React from'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/types/create-instance'
import createEmotionCache from '@/utility/createEmotionCache'

export default class Document extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

Document.getInitialProps = async (ctx) => {
  const emotionCache = createEmotionCache()
  const emotionServer = createEmotionServer(emotionCache)

  const initialProps = await Document.getInitialProps(ctx)

  return {
  ...initialProps,
    emotionCache,
    emotionServer,
  }
}