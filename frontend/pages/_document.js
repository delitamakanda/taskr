import * as React from'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '@/utility/createEmotionCache'

export default class MUIDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        </Head>
        <body id="app">
            <Main />
            <NextScript />
        </body>
      </Html>
    )
  }
}

MUIDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage

  const emotionCache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(emotionCache)

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => (
      <App
        emotionCache={emotionCache}
        {...props}/>
      )
  })

  const initialProps = await Document.getInitialProps(ctx)

  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
  ...initialProps,
   styles: [
    ...React.Children.toArray(initialProps.styles),
    ...emotionStyleTags,
   ]
  }
}