import * as React from'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MUIDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
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

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => (
      <App
        {...props}/>
      )
  })

  const initialProps = await Document.getInitialProps(ctx)

  return {
  ...initialProps,
  }
}