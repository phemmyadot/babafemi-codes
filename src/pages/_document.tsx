import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="description"
          content="Babafemi Adojutelegan Portfolio"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@femiadot" />
        <meta name="twitter:title" content="Babafemi Codes" />
        <meta
          name="twitter:description"
          content="Babafemi Adojutelegan Portfolio"
        />
        <meta name="twitter:image" content="/static/ogImage.png" />

        <meta property="og:title" content="Babafemi Codes" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://babafemi-codes.com/"
        />
        <meta property="og:image" content="/static/ogImage.png" />
        <meta
          property="og:description"
          content="Babafemi Adojutelegan Portfolio"
        />
        <meta property="og:site_name" content="Babafemi Codes" />
      </Head>
      <title>Babafemi codes</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
